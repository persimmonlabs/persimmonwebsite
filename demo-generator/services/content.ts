import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

interface GeneratedContent {
  success: boolean;
  content?: {
    posts: SocialPost[];
    summary: string;
  };
  error?: string;
  tokensUsed?: number;
}

interface SocialPost {
  type: 'educational' | 'motivational' | 'case-study' | 'tips' | 'industry-news';
  content: string;
  hashtags: string[];
  characterCount: number;
}

export class ContentService {
  private openai: OpenAI | null = null;
  private maxTokens = 3700; // GPT-4o-mini limit
  
  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }
  
  /**
   * Generate social media posts for demo
   */
  async generatePosts(
    businessType: string, 
    industry: string, 
    targetAudience: string,
    brandVoice: string
  ): Promise<GeneratedContent> {
    if (!this.openai) {
      // Use fallback content when API key not available
      return this.generateFallbackContent(businessType, industry, targetAudience, brandVoice);
    }
    
    try {
      const prompt = this.buildPrompt(businessType, industry, targetAudience, brandVoice);
      
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a social media content expert. Generate engaging, professional content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: this.maxTokens,
      });
      
      const response = completion.choices[0].message.content;
      const posts = this.parsePosts(response || '');
      
      return {
        success: true,
        content: {
          posts,
          summary: `Generated ${posts.length} posts for ${businessType} in ${industry} industry`,
        },
        tokensUsed: completion.usage?.total_tokens,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to generate content',
      };
    }
  }
  
  /**
   * Build prompt for OpenAI
   */
  private buildPrompt(
    businessType: string,
    industry: string,
    targetAudience: string,
    brandVoice: string
  ): string {
    return `Generate 7 social media posts for a ${businessType} in the ${industry} industry.

Target Audience: ${targetAudience}
Brand Voice: ${brandVoice}

Requirements:
1. Mix of educational, motivational, tips, and industry insights
2. Each post 100-280 characters
3. Include 3-5 relevant hashtags per post
4. Professional but engaging tone
5. No emojis in main content
6. Actionable and valuable content

Format each post as:
POST [number]:
Type: [educational/motivational/tips/case-study/industry-news]
Content: [post text]
Hashtags: [#hashtag1 #hashtag2 ...]

Generate exactly 7 posts.`;
  }
  
  /**
   * Parse AI response into structured posts
   */
  private parsePosts(response: string): SocialPost[] {
    const posts: SocialPost[] = [];
    const postBlocks = response.split(/POST \d+:/i).filter(block => block.trim());
    
    for (const block of postBlocks) {
      const typeMatch = block.match(/Type:\s*([^\n]+)/i);
      const contentMatch = block.match(/Content:\s*([^\n]+)/i);
      const hashtagsMatch = block.match(/Hashtags:\s*([^\n]+)/i);
      
      if (contentMatch) {
        const content = contentMatch[1].trim();
        const type = this.normalizeType(typeMatch?.[1]?.trim() || 'tips');
        const hashtags = hashtagsMatch?.[1]?.trim().split(/\s+/).filter(h => h.startsWith('#')) || [];
        
        posts.push({
          type,
          content,
          hashtags,
          characterCount: content.length,
        });
      }
    }
    
    // Fallback if parsing fails
    if (posts.length === 0) {
      posts.push({
        type: 'tips',
        content: 'Automation transforms your business. Start with one process and scale from there.',
        hashtags: ['#automation', '#efficiency', '#growth'],
        characterCount: 83,
      });
    }
    
    return posts;
  }
  
  /**
   * Normalize post type
   */
  private normalizeType(type: string): SocialPost['type'] {
    const normalized = type.toLowerCase();
    if (normalized.includes('education')) return 'educational';
    if (normalized.includes('motivat')) return 'motivational';
    if (normalized.includes('case') || normalized.includes('study')) return 'case-study';
    if (normalized.includes('news') || normalized.includes('industry')) return 'industry-news';
    return 'tips';
  }
  
  /**
   * Generate fallback content for demo mode
   */
  private async generateFallbackContent(
    businessType: string,
    industry: string,
    targetAudience: string,
    brandVoice: string
  ): Promise<GeneratedContent> {
    // Industry-specific fallback templates
    const templates = this.getFallbackTemplates(industry);
    
    const posts: SocialPost[] = templates.map(template => ({
      type: template.type,
      content: this.personalizeTemplate(template.content, businessType, targetAudience),
      hashtags: template.hashtags,
      characterCount: template.content.length,
    }));
    
    return {
      success: true,
      content: {
        posts,
        summary: `Generated ${posts.length} demo posts for ${businessType} in ${industry} industry (FALLBACK MODE)`,
      },
      tokensUsed: 0, // No API usage
    };
  }
  
  /**
   * Get fallback templates by industry
   */
  private getFallbackTemplates(industry: string) {
    const industryTemplates = {
      restaurant: [
        {
          type: 'motivational' as const,
          content: 'Every meal tells a story. What story will yours tell today?',
          hashtags: ['#restaurant', '#dining', '#foodlove', '#localfood']
        },
        {
          type: 'educational' as const,
          content: 'Did you know? Fresh ingredients make all the difference in taste and nutrition.',
          hashtags: ['#freshfood', '#nutrition', '#quality', '#cooking']
        },
        {
          type: 'tips' as const,
          content: 'Pro tip: Call ahead during peak hours to reserve your table and avoid the wait.',
          hashtags: ['#protip', '#dining', '#reservation', '#customerservice']
        },
        {
          type: 'case-study' as const,
          content: 'Thanks to Sarah M. for her 5-star review! "Best pasta in town with amazing service."',
          hashtags: ['#review', '#5star', '#pasta', '#service']
        },
        {
          type: 'industry-news' as const,
          content: 'Local restaurants are embracing farm-to-table practices for fresher, sustainable dining.',
          hashtags: ['#farmtotable', '#sustainable', '#local', '#fresh']
        },
        {
          type: 'educational' as const,
          content: 'Our chef sources ingredients from local farms within 50 miles for maximum freshness.',
          hashtags: ['#local', '#fresh', '#chef', '#farm']
        },
        {
          type: 'motivational' as const,
          content: 'Great food brings people together. Join us for an unforgettable experience.',
          hashtags: ['#community', '#dining', '#experience', '#together']
        }
      ],
      ecommerce: [
        {
          type: 'tips' as const,
          content: 'Shopping tip: Add items to your wishlist to track price drops and availability.',
          hashtags: ['#shopping', '#tips', '#savings', '#wishlist']
        },
        {
          type: 'educational' as const,
          content: 'Free shipping on orders over $50. Stock up and save on delivery costs.',
          hashtags: ['#freeshipping', '#savings', '#deals', '#online']
        },
        {
          type: 'case-study' as const,
          content: 'Customer spotlight: "Fast delivery and exactly as described. Will shop again!" - Mike T.',
          hashtags: ['#review', '#delivery', '#quality', '#customer']
        },
        {
          type: 'industry-news' as const,
          content: 'E-commerce trends show customers prefer brands with easy return policies.',
          hashtags: ['#ecommerce', '#returns', '#customer', '#trends']
        },
        {
          type: 'motivational' as const,
          content: 'Your perfect product is just a click away. Browse our curated collection today.',
          hashtags: ['#shopping', '#curated', '#perfect', '#browse']
        },
        {
          type: 'educational' as const,
          content: 'Secure checkout with multiple payment options including PayPal and Apple Pay.',
          hashtags: ['#secure', '#payment', '#paypal', '#applepay']
        },
        {
          type: 'tips' as const,
          content: 'Sign up for our newsletter and get 10% off your first order plus exclusive deals.',
          hashtags: ['#newsletter', '#discount', '#exclusive', '#deals']
        }
      ],
      healthcare: [
        {
          type: 'educational' as const,
          content: 'Preventive care saves money and improves health outcomes. Schedule your annual checkup.',
          hashtags: ['#preventive', '#health', '#checkup', '#wellness']
        },
        {
          type: 'tips' as const,
          content: 'Bring a list of current medications to every appointment for accurate care.',
          hashtags: ['#appointment', '#medications', '#care', '#tips']
        },
        {
          type: 'motivational' as const,
          content: 'Your health is your greatest asset. Invest in it with regular preventive care.',
          hashtags: ['#health', '#asset', '#preventive', '#invest']
        },
        {
          type: 'educational' as const,
          content: 'Telemedicine appointments available for routine consultations and follow-ups.',
          hashtags: ['#telemedicine', '#consultation', '#followup', '#convenient']
        },
        {
          type: 'industry-news' as const,
          content: 'New studies show regular exercise reduces healthcare costs by up to 40%.',
          hashtags: ['#exercise', '#healthcare', '#costs', '#studies']
        },
        {
          type: 'tips' as const,
          content: 'Prepare for appointments by writing down symptoms and questions in advance.',
          hashtags: ['#preparation', '#symptoms', '#questions', '#appointment']
        },
        {
          type: 'educational' as const,
          content: 'Most insurance plans cover annual wellness visits at 100% with no copay.',
          hashtags: ['#insurance', '#wellness', '#covered', '#nocopy']
        }
      ]
    };
    
    // Get industry-specific templates or use general business templates
    return industryTemplates[industry as keyof typeof industryTemplates] || [
      {
        type: 'motivational' as const,
        content: 'Success comes from serving customers better than they expect.',
        hashtags: ['#success', '#customers', '#service', '#excellence']
      },
      {
        type: 'educational' as const,
        content: 'Automation can save businesses 20% on operational costs while improving quality.',
        hashtags: ['#automation', '#savings', '#efficiency', '#quality']
      },
      {
        type: 'tips' as const,
        content: 'Focus on solving real problems for your customers, and success will follow.',
        hashtags: ['#focus', '#problems', '#customers', '#success']
      },
      {
        type: 'case-study' as const,
        content: 'Client achieved 300% growth after implementing our strategic recommendations.',
        hashtags: ['#growth', '#strategy', '#results', '#client']
      },
      {
        type: 'industry-news' as const,
        content: 'Small businesses adopting digital tools see 25% faster growth than competitors.',
        hashtags: ['#digital', '#tools', '#growth', '#business']
      },
      {
        type: 'educational' as const,
        content: 'Consistent branding across all channels increases revenue by up to 33%.',
        hashtags: ['#branding', '#consistent', '#revenue', '#channels']
      },
      {
        type: 'motivational' as const,
        content: 'Every challenge is an opportunity to innovate and improve your business.',
        hashtags: ['#challenge', '#opportunity', '#innovate', '#improve']
      }
    ];
  }
  
  /**
   * Personalize template content
   */
  private personalizeTemplate(template: string, businessType: string, targetAudience: string): string {
    return template
      .replace(/\bour\b/gi, 'your')
      .replace(/\bwe\b/gi, 'you')
      .replace(/\bus\b/gi, 'you');
  }
  
  /**
   * Validate content meets requirements
   */
  validateContent(posts: SocialPost[]): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    if (posts.length < 7) {
      issues.push(`Only ${posts.length} posts generated (need 7)`);
    }
    
    posts.forEach((post, index) => {
      if (post.characterCount < 50) {
        issues.push(`Post ${index + 1} too short (${post.characterCount} chars)`);
      }
      if (post.characterCount > 280) {
        issues.push(`Post ${index + 1} too long (${post.characterCount} chars)`);
      }
      if (post.hashtags.length === 0) {
        issues.push(`Post ${index + 1} missing hashtags`);
      }
    });
    
    return {
      valid: issues.length === 0,
      issues,
    };
  }
}