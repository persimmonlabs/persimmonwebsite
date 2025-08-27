import express from 'express';
import cors from 'cors';
import { DemoOrchestrator } from './services/orchestrator';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5678'], // n8n default
  credentials: true,
}));

// Initialize orchestrator
const orchestrator = new DemoOrchestrator();

// Health check endpoint
app.get('/health', async (_req, res) => {
  try {
    const health = await orchestrator.healthCheck();
    res.json({
      timestamp: new Date().toISOString(),
      ...health,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    });
  }
});

// Main demo generation endpoint (for n8n webhook)
app.post('/api/generate-demo', async (req, res) => {
  const startTime = Date.now();
  
  try {
    console.log('Demo generation request received:', {
      businessName: req.body.businessName,
      industry: req.body.industry,
      timestamp: new Date().toISOString(),
    });
    
    // Generate demo
    const result = await orchestrator.generateDemo(req.body);
    
    // Log result
    console.log(`Demo ${result.demoId} completed:`, {
      success: result.success,
      processingTime: result.processingTime,
      errors: result.errors.length,
      warnings: result.warnings.length,
      cost: result.costs.estimatedCost,
    });
    
    // Return appropriate response
    if (result.success) {
      res.json({
        success: true,
        demoId: result.demoId,
        processingTime: result.processingTime,
        emailSent: result.emailSent,
        emailMessageId: result.emailMessageId,
        costs: result.costs,
        warnings: result.warnings,
        content: {
          postsCount: result.content?.posts.length || 0,
          graphicsCount: result.content?.graphics.length || 0,
          hasInsight: !!result.content?.insight,
          hasPdf: !!result.content?.pdf,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        demoId: result.demoId,
        processingTime: result.processingTime,
        errors: result.errors,
        warnings: result.warnings,
        costs: result.costs,
      });
    }
    
  } catch (error: any) {
    console.error('Demo generation error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
      processingTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  }
});

// Test endpoint for manual testing
app.post('/api/test-demo', async (req, res) => {
  const testRequest = {
    businessName: req.body.businessName || 'Test Restaurant',
    industry: req.body.industry || 'restaurant',
    businessType: req.body.businessType || 'local restaurant',
    targetAudience: req.body.targetAudience || 'local diners and families',
    brandVoice: req.body.brandVoice || 'friendly and welcoming',
    recipientEmail: req.body.recipientEmail || 'test@example.com',
    recipientName: req.body.recipientName || 'Test User',
    includeEmail: false, // Don't send emails in test mode
    includePdf: req.body.includePdf !== false,
    includeGraphics: req.body.includeGraphics !== false,
  };
  
  try {
    const result = await orchestrator.generateDemo(testRequest);
    
    res.json({
      success: result.success,
      demoId: result.demoId,
      processingTime: result.processingTime,
      content: result.content ? {
        posts: result.content.posts.map(p => ({
          type: p.type,
          content: p.content,
          hashtags: p.hashtags,
          characterCount: p.characterCount,
        })),
        graphicsGenerated: result.content.graphics.length,
        insight: result.content.insight ? {
          title: result.content.insight.title,
          description: result.content.insight.description,
          metric: result.content.insight.metric,
          source: result.content.insight.source,
        } : null,
        pdfSize: result.content.pdf ? `${Math.round(result.content.pdf.length / 1024)}KB` : null,
      } : null,
      errors: result.errors,
      warnings: result.warnings,
      costs: result.costs,
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Error handling middleware
app.use((error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Express error:', error);
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    method: req.method,
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Demo Generator API running on port ${port}`);
  console.log(`📋 Health check: http://localhost:${port}/health`);
  console.log(`🧪 Test endpoint: http://localhost:${port}/api/test-demo`);
  console.log(`🔗 n8n webhook: http://localhost:${port}/api/generate-demo`);
  
  // Test health on startup
  orchestrator.healthCheck().then(health => {
    console.log('🏥 Service health:', health);
  }).catch(error => {
    console.warn('⚠️ Health check failed:', error.message);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

export default app;