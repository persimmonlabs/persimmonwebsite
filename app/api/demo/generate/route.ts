import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateBrandBrief, generateContentVariants } from '@/lib/ai/content-generator';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/db/prisma';

// Validation schema
const DemoRequestSchema = z.object({
  brandName: z.string().min(2).max(50),
  email: z.string().email(),
  industry: z.enum([
    'ecommerce', 'saas', 'agency', 'fitness', 
    'restaurant', 'services', 'realestate', 
    'healthcare', 'education', 'other'
  ]),
  tone: z.enum(['professional', 'friendly', 'playful', 'bold']),
  platforms: z.array(
    z.enum(['instagram', 'linkedin', 'twitter', 'facebook'])
  ).min(1).max(4),
  website: z.string().url().optional().or(z.literal('')),
  consent: z.boolean(),
  otherIndustry: z.string().optional()
});

// Rate limiting (simple in-memory for now)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);
  
  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + 3600000 // 1 hour from now
    });
    return true;
  }
  
  if (limit.count >= 3) {
    return false; // Rate limit exceeded
  }
  
  limit.count++;
  return true;
}

// Trigger n8n webhook
async function triggerN8nWebhook(demoId: string, data: any) {
  if (!process.env.N8N_WEBHOOK_URL) return;
  
  try {
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        demoId,
        ...data,
        timestamp: new Date().toISOString()
      }),
    });
    
    const result = await response.json();
    
    // Log webhook attempt
    if (prisma) {
      await prisma.webhookLog.create({
        data: {
          demoId,
          webhookType: 'N8N',
          status: response.ok ? 'SUCCESS' : 'FAILED',
          url: process.env.N8N_WEBHOOK_URL,
          payload: data,
          response: result,
          attempts: 1,
          lastAttempt: new Date(),
          completedAt: response.ok ? new Date() : null
        }
      }).catch(console.error);
    }
    
    return result;
  } catch (error) {
    console.error('n8n webhook error:', error);
    
    // Log failed webhook
    if (prisma) {
      await prisma.webhookLog.create({
        data: {
          demoId,
          webhookType: 'N8N',
          status: 'FAILED',
          url: process.env.N8N_WEBHOOK_URL,
          payload: data,
          response: { error: error instanceof Error ? error.message : 'Unknown error' },
          attempts: 1,
          lastAttempt: new Date()
        }
      }).catch(console.error);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = DemoRequestSchema.parse(body);
    
    // Check consent
    if (!validatedData.consent) {
      return NextResponse.json(
        { error: 'Marketing consent is required' },
        { status: 400 }
      );
    }
    
    // Rate limiting by email
    if (!checkRateLimit(validatedData.email)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in an hour.' },
        { status: 429 }
      );
    }
    
    // Generate unique demo ID
    const demoId = uuidv4();
    const publicToken = uuidv4();
    
    // Determine industry context
    const industryContext = validatedData.industry === 'other' 
      ? validatedData.otherIndustry || 'business'
      : validatedData.industry;
    
    console.log(`Generating demo ${demoId} for ${validatedData.brandName}`);
    
    // Create demo record in database (if Prisma is configured)
    let demoRecord = null;
    const isDatabaseEnabled = process.env.DATABASE_URL && process.env.DATABASE_URL !== '';
    
    if (isDatabaseEnabled && prisma) {
      try {
        demoRecord = await prisma.demo.create({
          data: {
            id: demoId,
            email: validatedData.email,
            brandName: validatedData.brandName,
            industry: industryContext,
            tone: validatedData.tone,
            platforms: validatedData.platforms,
            website: validatedData.website || null,
            publicToken: publicToken,
            status: 'PROCESSING',
            metadata: {
              otherIndustry: validatedData.otherIndustry,
              userAgent: request.headers.get('user-agent'),
              ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
            }
          }
        });
      } catch (dbError) {
        console.error('Database error creating demo:', dbError);
        // Continue without database
      }
    }
    
    // Check if OpenAI is configured
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI not configured, returning enhanced demo data');
      const demoContent = generateDemoContent(validatedData);
      
      // Save demo results to database
      if (demoRecord && prisma) {
        try {
          for (const platformContent of demoContent) {
            for (let i = 0; i < platformContent.variants.length; i++) {
              const variant = platformContent.variants[i];
              await prisma.demoResult.create({
                data: {
                  demoId: demoId,
                  platform: platformContent.platform,
                  variantIndex: i,
                  caption: variant.caption,
                  hashtags: variant.hashtags,
                  cta: variant.cta
                }
              });
            }
          }
          
          await prisma.demo.update({
            where: { id: demoId },
            data: {
              status: 'COMPLETED',
              completedAt: new Date()
            }
          });
        } catch (dbError) {
          console.error('Database error saving results:', dbError);
        }
      }
      
      // Trigger n8n webhook
      await triggerN8nWebhook(demoId, {
        email: validatedData.email,
        brandName: validatedData.brandName,
        industry: industryContext,
        tone: validatedData.tone,
        platforms: validatedData.platforms,
        publicToken
      });
      
      return NextResponse.json({
        demoId,
        content: demoContent,
        shareableLink: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/demo/${publicToken}`,
        message: 'Demo mode - using sample content (OpenAI not configured)'
      });
    }
    
    // Generate brand brief
    const brandBrief = await generateBrandBrief({
      brandName: validatedData.brandName,
      industry: industryContext,
      tone: validatedData.tone,
      website: validatedData.website
    });
    
    console.log('Brand brief generated:', brandBrief);
    
    // Generate content for each platform in parallel
    const contentPromises = validatedData.platforms.map(async (platform) => {
      const variants = await generateContentVariants(
        platform,
        brandBrief,
        validatedData.brandName,
        industryContext,
        3 // Generate 3 variants per platform
      );
      
      return {
        platform,
        variants: variants.map(v => ({
          caption: v.caption,
          hashtags: v.hashtags,
          cta: v.cta
        }))
      };
    });
    
    const content = await Promise.all(contentPromises);
    
    console.log(`Generated content for ${content.length} platforms`);
    
    // Save results to database
    if (demoRecord && prisma) {
      try {
        for (const platformContent of content) {
          for (let i = 0; i < platformContent.variants.length; i++) {
            const variant = platformContent.variants[i];
            await prisma.demoResult.create({
              data: {
                demoId: demoId,
                platform: platformContent.platform,
                variantIndex: i,
                caption: variant.caption,
                hashtags: variant.hashtags,
                cta: variant.cta
              }
            });
          }
        }
        
        // Update demo status
        await prisma.demo.update({
          where: { id: demoId },
          data: {
            status: 'COMPLETED',
            completedAt: new Date(),
            metadata: {
              ...demoRecord.metadata as object,
              brandBrief
            }
          }
        });
      } catch (dbError) {
        console.error('Database error saving results:', dbError);
      }
    }
    
    // Queue email delivery
    if (prisma) {
      try {
        await prisma.emailQueue.create({
          data: {
            to: validatedData.email,
            subject: `Your AI-Generated Content for ${validatedData.brandName} is Ready!`,
            template: 'demo-results',
            data: {
              demoId,
              brandName: validatedData.brandName,
              publicToken,
              platforms: validatedData.platforms,
              content
            }
          }
        });
      } catch (dbError) {
        console.error('Database error queuing email:', dbError);
      }
    }
    
    // Trigger n8n webhook for AI-generated content
    await triggerN8nWebhook(demoId, {
      email: validatedData.email,
      brandName: validatedData.brandName,
      industry: industryContext,
      tone: validatedData.tone,
      platforms: validatedData.platforms,
      publicToken,
      brandBrief,
      content
    });
    
    // Return results
    const shareableLink = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/demo/${publicToken}`;
    
    return NextResponse.json({
      demoId,
      content,
      shareableLink,
      message: 'Content generated successfully!'
    });
    
  } catch (error) {
    console.error('Error in demo generation:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}

// Enhanced demo content generator for testing without OpenAI
function generateDemoContent(data: any) {
  const { brandName, industry, tone, platforms } = data;
  const industryContext = industry === 'other' ? data.otherIndustry || 'business' : industry;
  
  const toneVariations = {
    professional: {
      style: 'formal',
      emojis: ['📊', '💼', '🎯'],
      cta: 'Learn more about our solutions →'
    },
    friendly: {
      style: 'warm',
      emojis: ['🌟', '✨', '🤝'],
      cta: 'Let\'s connect and grow together!'
    },
    playful: {
      style: 'fun',
      emojis: ['🎉', '🚀', '💫'],
      cta: 'Jump in and join the fun!'
    },
    bold: {
      style: 'strong',
      emojis: ['💪', '⚡', '🔥'],
      cta: 'Take charge. Start now.'
    }
  };
  
  const toneData = toneVariations[tone as keyof typeof toneVariations] || toneVariations.friendly;
  
  return platforms.map((platform: string) => ({
    platform,
    variants: [
      {
        caption: tone === 'professional' 
          ? `${brandName} delivers cutting-edge solutions for the ${industryContext} industry. Our data-driven approach ensures measurable results and sustainable growth.\n\n${toneData.emojis[0]} Strategic innovation\n${toneData.emojis[1]} Proven expertise\n${toneData.emojis[2]} Exceptional ROI`
          : tone === 'playful'
          ? `Hey ${industryContext} friends! ${toneData.emojis[0]} ${brandName} is here to shake things up!\n\nWe're not your average solution - we're the game-changer you've been waiting for! ${toneData.emojis[1]}\n\nReady to revolutionize your world? ${toneData.emojis[2]}`
          : tone === 'bold'
          ? `${brandName} doesn't follow trends. We set them. ${toneData.emojis[0]}\n\nWhile others talk, we deliver results in the ${industryContext} space.\n\n${toneData.emojis[1]} Disrupting the status quo\n${toneData.emojis[2]} Leading the charge`
          : `Welcome to ${brandName}! ${toneData.emojis[0]} We're passionate about helping ${industryContext} businesses thrive.\n\nOur approach? Simple, effective, and tailored just for you. ${toneData.emojis[1]}\n\nTogether, we'll achieve amazing things! ${toneData.emojis[2]}`,
        hashtags: platform === 'linkedin' 
          ? ['#B2B', `#${industryContext.charAt(0).toUpperCase() + industryContext.slice(1)}`, '#Innovation', '#Leadership']
          : platform === 'twitter'
          ? ['#Innovation', `#${industryContext}`]
          : ['#BusinessGrowth', `#${industryContext.charAt(0).toUpperCase() + industryContext.slice(1)}Tech`, '#Success', '#Innovation', '#Transformation'],
        cta: toneData.cta
      },
      {
        caption: `${brandName} | Transforming ${industryContext} one success story at a time ${toneData.emojis[0]}\n\n✅ Trusted by industry leaders\n✅ Proven track record\n✅ Innovative solutions\n\nDiscover what makes us different.`,
        hashtags: ['#Success', `#${industryContext}`, '#Innovation', '#Growth'],
        cta: 'Book your personalized demo today'
      },
      {
        caption: `The future of ${industryContext} starts with ${brandName} ${toneData.emojis[1]}\n\nWe combine cutting-edge technology with deep industry expertise to deliver solutions that work.\n\nJoin the revolution.`,
        hashtags: ['#FutureReady', '#Technology', `#${industryContext}`, '#Excellence'],
        cta: 'Start your free trial'
      }
    ]
  }));
}

// OPTIONS method for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}