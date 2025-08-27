import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

/**
 * n8n Webhook Handler
 * 
 * This endpoint can be called by n8n workflows to:
 * 1. Process email queue
 * 2. Get demo details
 * 3. Trigger follow-up actions
 */

// GET endpoint to fetch pending emails or demo data
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');
  const demoId = searchParams.get('demoId');
  const publicToken = searchParams.get('token');
  
  try {
    // Fetch demo by ID or token
    if (action === 'get-demo') {
      if (!demoId && !publicToken) {
        return NextResponse.json(
          { error: 'Demo ID or token required' },
          { status: 400 }
        );
      }
      
      const demo = await prisma.demo.findFirst({
        where: demoId ? { id: demoId } : { publicToken: publicToken! },
        include: {
          results: {
            orderBy: [
              { platform: 'asc' },
              { variantIndex: 'asc' }
            ]
          }
        }
      });
      
      if (!demo) {
        return NextResponse.json(
          { error: 'Demo not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        demo,
        shareableLink: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/demo/${demo.publicToken}`
      });
    }
    
    // Fetch pending emails from queue
    if (action === 'get-pending-emails') {
      const limit = parseInt(searchParams.get('limit') || '10');
      
      const emails = await prisma.emailQueue.findMany({
        where: {
          status: 'PENDING',
          attempts: { lt: 3 }
        },
        take: limit,
        orderBy: { createdAt: 'asc' }
      });
      
      return NextResponse.json({ emails });
    }
    
    // Get webhook logs for monitoring
    if (action === 'get-webhook-logs') {
      const logs = await prisma.webhookLog.findMany({
        where: demoId ? { demoId } : {},
        orderBy: { createdAt: 'desc' },
        take: 50
      });
      
      return NextResponse.json({ logs });
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('n8n webhook GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint to update email status or trigger actions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;
    
    // Update email status after n8n processes it
    if (action === 'update-email-status') {
      const { emailId, status, error } = data;
      
      if (!emailId || !status) {
        return NextResponse.json(
          { error: 'Email ID and status required' },
          { status: 400 }
        );
      }
      
      const updatedEmail = await prisma.emailQueue.update({
        where: { id: emailId },
        data: {
          status: status,
          attempts: { increment: 1 },
          lastAttempt: new Date(),
          sentAt: status === 'SENT' ? new Date() : undefined,
          error: error || undefined
        }
      });
      
      return NextResponse.json({ 
        success: true, 
        email: updatedEmail 
      });
    }
    
    // Process demo results (called after demo generation)
    if (action === 'process-demo') {
      const { demoId } = data;
      
      if (!demoId) {
        return NextResponse.json(
          { error: 'Demo ID required' },
          { status: 400 }
        );
      }
      
      // Get demo with results
      const demo = await prisma.demo.findUnique({
        where: { id: demoId },
        include: {
          results: true
        }
      });
      
      if (!demo) {
        return NextResponse.json(
          { error: 'Demo not found' },
          { status: 404 }
        );
      }
      
      // Format content for n8n processing
      const formattedContent = {
        demoId: demo.id,
        brandName: demo.brandName,
        email: demo.email,
        industry: demo.industry,
        tone: demo.tone,
        platforms: demo.platforms,
        publicToken: demo.publicToken,
        shareableLink: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/demo/${demo.publicToken}`,
        content: demo.results.reduce((acc, result) => {
          if (!acc[result.platform]) {
            acc[result.platform] = [];
          }
          acc[result.platform].push({
            caption: result.caption,
            hashtags: result.hashtags,
            cta: result.cta
          });
          return acc;
        }, {} as Record<string, any[]>)
      };
      
      return NextResponse.json(formattedContent);
    }
    
    // Log webhook activity
    if (action === 'log-activity') {
      const { demoId, message, metadata } = data;
      
      await prisma.webhookLog.create({
        data: {
          demoId: demoId || 'system',
          webhookType: 'N8N',
          status: 'SUCCESS',
          payload: { message, metadata },
          response: { logged: true },
          attempts: 1,
          lastAttempt: new Date(),
          completedAt: new Date()
        }
      });
      
      return NextResponse.json({ 
        success: true,
        message: 'Activity logged'
      });
    }
    
    // Batch update multiple emails
    if (action === 'batch-update-emails') {
      const { emailIds, status } = data;
      
      if (!emailIds || !Array.isArray(emailIds) || !status) {
        return NextResponse.json(
          { error: 'Email IDs array and status required' },
          { status: 400 }
        );
      }
      
      const result = await prisma.emailQueue.updateMany({
        where: {
          id: { in: emailIds }
        },
        data: {
          status: status,
          lastAttempt: new Date(),
          sentAt: status === 'SENT' ? new Date() : undefined
        }
      });
      
      return NextResponse.json({ 
        success: true,
        updated: result.count
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('n8n webhook POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}