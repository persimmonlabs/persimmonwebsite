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
      return {
        success: false,
        error: 'OpenAI API key not configured',
      };
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