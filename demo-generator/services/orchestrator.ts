import { GraphicsService } from './graphics';
import { ContentService } from './content';
import { InsightsService } from './insights';
import { PdfService } from './pdf';
import { EmailService } from './email';

interface DemoRequest {
  // Required fields
  businessName: string;
  industry: string;
  businessType: string;
  targetAudience: string;
  brandVoice: string;
  
  // Contact info
  recipientEmail: string;
  recipientName: string;
  
  // Optional customization
  primaryColor?: string;
  secondaryColor?: string;
  includeGraphics?: boolean;
  includePdf?: boolean;
  includeEmail?: boolean;
}

interface DemoResult {
  success: boolean;
  demoId: string;
  generatedAt: Date;
  processingTime: number;
  
  // Generated content
  content?: {
    posts: any[];
    graphics: Buffer[];
    insight: any;
    pdf?: Buffer;
  };
  
  // Delivery info
  emailSent?: boolean;
  emailMessageId?: string;
  
  // Error info
  errors: string[];
  warnings: string[];
  
  // Cost tracking
  costs: {
    openaiTokens: number;
    estimatedCost: number;
  };
}

export class DemoOrchestrator {
  private graphicsService: GraphicsService;
  private contentService: ContentService;
  private insightsService: InsightsService;
  private pdfService: PdfService;
  private emailService: EmailService;
  
  constructor() {
    this.graphicsService = new GraphicsService();
    this.contentService = new ContentService();
    this.insightsService = new InsightsService();
    this.pdfService = new PdfService();
    this.emailService = new EmailService();
  }
  
  /**
   * Generate complete demo package
   */
  async generateDemo(request: DemoRequest): Promise<DemoResult> {
    const startTime = Date.now();
    const demoId = this.generateDemoId();
    const errors: string[] = [];
    const warnings: string[] = [];
    let totalTokens = 0;
    
    console.log(`[${demoId}] Starting demo generation for ${request.businessName}`);
    
    try {
      // Step 1: Validate input
      const validation = this.validateRequest(request);
      if (!validation.valid) {
        return {
          success: false,
          demoId,
          generatedAt: new Date(),
          processingTime: Date.now() - startTime,
          errors: validation.errors,
          warnings,
          costs: { openaiTokens: 0, estimatedCost: 0 },
        };
      }
      
      // Step 2: Generate social media content
      console.log(`[${demoId}] Generating social media posts...`);
      const contentResult = await this.contentService.generatePosts(
        request.businessType,
        request.industry,
        request.targetAudience,
        request.brandVoice
      );
      
      if (!contentResult.success) {
        errors.push(`Content generation failed: ${contentResult.error}`);
        return this.buildErrorResult(demoId, startTime, errors, warnings, totalTokens);
      }
      
      totalTokens += contentResult.tokensUsed || 0;
      const posts = contentResult.content!.posts;
      
      // Step 3: Get industry insight
      console.log(`[${demoId}] Fetching industry insight...`);
      const insightResult = await this.insightsService.getInsight(request.industry);
      
      if (!insightResult.success) {
        warnings.push(`Could not fetch industry insight: ${insightResult.error}`);
      }
      
      // Step 4: Generate graphics (if requested)
      const graphics: Buffer[] = [];
      if (request.includeGraphics !== false) {
        console.log(`[${demoId}] Generating graphics...`);
        
        try {
          // Initialize browser pool for performance
          await this.graphicsService.initBrowserPool(3);
          
          // Generate 3 quote cards from top posts
          const topPosts = posts.slice(0, 3);
          for (const [index, post] of topPosts.entries()) {
            try {
              const graphic = await this.graphicsService.generateQuoteCard(
                post.content,
                `${request.businessName}`,
                request.primaryColor || '#F5793B',
                request.secondaryColor || '#FFFFFF'
              );
              graphics.push(graphic);
              console.log(`[${demoId}] Generated graphic ${index + 1}/3`);
            } catch (error: any) {
              warnings.push(`Failed to generate graphic ${index + 1}: ${error.message}`);
            }
          }
        } catch (error: any) {
          warnings.push(`Graphics generation failed: ${error.message}`);
        }
      }
      
      // Step 5: Generate PDF (if requested)
      let pdf: Buffer | undefined;
      if (request.includePdf !== false) {
        console.log(`[${demoId}] Generating PDF report...`);
        
        try {
          const pdfResult = await this.pdfService.generateReport({
            businessName: request.businessName,
            industry: request.industry,
            posts: posts.map(p => ({ content: p.content, hashtags: p.hashtags })),
            insight: insightResult.insight,
            generatedAt: new Date(),
          });
          
          if (pdfResult.success && pdfResult.pdf) {
            pdf = pdfResult.pdf;
            console.log(`[${demoId}] PDF generated (${pdfResult.sizeKb}KB)`);
          } else {
            warnings.push(`PDF generation failed: ${pdfResult.error}`);
          }
        } catch (error: any) {
          warnings.push(`PDF generation error: ${error.message}`);
        }
      }
      
      // Step 6: Send email (if requested)
      let emailSent = false;
      let emailMessageId: string | undefined;
      
      if (request.includeEmail !== false && request.recipientEmail) {
        console.log(`[${demoId}] Sending delivery email...`);
        
        try {
          const emailResult = await this.emailService.sendDemoEmail({
            recipientEmail: request.recipientEmail,
            recipientName: request.recipientName || 'there',
            businessName: request.businessName,
            demoUrl: `https://demo.persimmonlabs.io/${demoId}`,
            pdfAttachment: pdf,
          });
          
          if (emailResult.success) {
            emailSent = true;
            emailMessageId = emailResult.messageId;
            console.log(`[${demoId}] Email sent successfully`);
          } else {
            warnings.push(`Email delivery failed: ${emailResult.error}`);
          }
        } catch (error: any) {
          warnings.push(`Email error: ${error.message}`);
        }
      }
      
      const processingTime = Date.now() - startTime;
      const estimatedCost = this.calculateCost(totalTokens, graphics.length, emailSent);
      
      console.log(`[${demoId}] Demo completed in ${processingTime}ms (${(processingTime/1000).toFixed(1)}s)`);
      
      return {
        success: true,
        demoId,
        generatedAt: new Date(),
        processingTime,
        content: {
          posts,
          graphics,
          insight: insightResult.insight,
          pdf,
        },
        emailSent,
        emailMessageId,
        errors,
        warnings,
        costs: {
          openaiTokens: totalTokens,
          estimatedCost,
        },
      };
      
    } catch (error: any) {
      errors.push(`Unexpected error: ${error.message}`);
      return this.buildErrorResult(demoId, startTime, errors, warnings, totalTokens);
    } finally {
      // Cleanup resources
      await this.cleanup();
    }
  }
  
  /**
   * Validate demo request
   */
  private validateRequest(request: DemoRequest): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Required fields
    if (!request.businessName?.trim()) errors.push('Business name is required');
    if (!request.industry?.trim()) errors.push('Industry is required');
    if (!request.businessType?.trim()) errors.push('Business type is required');
    if (!request.targetAudience?.trim()) errors.push('Target audience is required');
    if (!request.brandVoice?.trim()) errors.push('Brand voice is required');
    
    // Email validation (if email delivery requested)
    if (request.includeEmail !== false && request.recipientEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(request.recipientEmail)) {
        errors.push('Valid recipient email is required');
      }
    }
    
    // Length limits
    if (request.businessName?.length > 100) errors.push('Business name too long (max 100 chars)');
    if (request.industry?.length > 50) errors.push('Industry too long (max 50 chars)');
    
    return {
      valid: errors.length === 0,
      errors,
    };
  }
  
  /**
   * Generate unique demo ID
   */
  private generateDemoId(): string {
    return `demo_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  }
  
  /**
   * Build error result
   */
  private buildErrorResult(
    demoId: string, 
    startTime: number, 
    errors: string[], 
    warnings: string[], 
    totalTokens: number
  ): DemoResult {
    return {
      success: false,
      demoId,
      generatedAt: new Date(),
      processingTime: Date.now() - startTime,
      errors,
      warnings,
      costs: {
        openaiTokens: totalTokens,
        estimatedCost: this.calculateCost(totalTokens, 0, false),
      },
    };
  }
  
  /**
   * Calculate estimated cost
   */
  private calculateCost(tokens: number, graphicsCount: number, emailSent: boolean): number {
    const openaiCost = (tokens / 1000) * 0.00015; // GPT-4o-mini cost
    const emailCost = emailSent ? 0.001 : 0;
    const computeCost = graphicsCount * 0.01; // Rough estimate for graphics
    
    return Math.round((openaiCost + emailCost + computeCost) * 100) / 100;
  }
  
  /**
   * Cleanup resources
   */
  private async cleanup(): Promise<void> {
    try {
      await Promise.all([
        this.graphicsService.close(),
        this.pdfService.close(),
      ]);
    } catch (error) {
      console.warn('Error during cleanup:', error);
    }
  }
  
  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string; services: Record<string, boolean> }> {
    const services = {
      openai: !!process.env.OPENAI_API_KEY,
      sendgrid: !!process.env.SENDGRID_API_KEY,
      supabase: !!process.env.SUPABASE_URL,
    };
    
    return {
      status: Object.values(services).some(v => v) ? 'healthy' : 'degraded',
      services,
    };
  }
}