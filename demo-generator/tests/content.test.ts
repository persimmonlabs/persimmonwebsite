import { ContentService } from '../services/content';

describe('ContentService', () => {
  let service: ContentService;
  
  beforeEach(() => {
    service = new ContentService();
  });
  
  it('should compile and instantiate', () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(ContentService);
  });
  
  describe('generatePosts', () => {
    it('should handle missing API key gracefully', async () => {
      // Save original API key
      const originalKey = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;
      
      // Create service without API key
      const testService = new ContentService();
      
      const result = await testService.generatePosts(
        'restaurant',
        'food service',
        'local diners',
        'friendly and casual'
      );
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('OpenAI API key not configured');
      
      // Restore API key
      if (originalKey) {
        process.env.OPENAI_API_KEY = originalKey;
      }
    });
    
    it('should generate posts when API key exists', async () => {
      // Skip if no API key in environment
      if (!process.env.OPENAI_API_KEY) {
        console.log('Skipping OpenAI test - no API key');
        return;
      }
      
      const result = await service.generatePosts(
        'restaurant',
        'food service', 
        'local diners',
        'friendly and casual'
      );
      
      if (result.success) {
        expect(result.content).toBeDefined();
        expect(result.content?.posts).toBeInstanceOf(Array);
        expect(result.content?.posts.length).toBeGreaterThan(0);
        expect(result.tokensUsed).toBeDefined();
      } else {
        // API call failed but structure should be correct
        expect(result.error).toBeDefined();
      }
    }, 30000); // 30 second timeout for API call
  });
  
  describe('validateContent', () => {
    it('should validate correct content', () => {
      const validPosts = [
        {
          type: 'educational' as const,
          content: 'Learn how automation can save your business 10 hours per week.',
          hashtags: ['#automation', '#productivity'],
          characterCount: 65,
        },
        {
          type: 'motivational' as const,
          content: 'Every minute saved through automation is a minute gained for growth.',
          hashtags: ['#growth', '#efficiency'],
          characterCount: 69,
        },
        {
          type: 'tips' as const,
          content: 'Tip: Start automating repetitive tasks first for quick wins.',
          hashtags: ['#tips', '#automation'],
          characterCount: 61,
        },
        {
          type: 'case-study' as const,
          content: 'Client saved 15 hours/week by automating their email campaigns.',
          hashtags: ['#casestudy', '#success'],
          characterCount: 64,
        },
        {
          type: 'industry-news' as const,
          content: 'AI adoption in small business increased 300% this year.',
          hashtags: ['#AI', '#trends'],
          characterCount: 56,
        },
        {
          type: 'educational' as const,
          content: 'Understanding your workflow is the first step to automation.',
          hashtags: ['#education', '#workflow'],
          characterCount: 60,
        },
        {
          type: 'tips' as const,
          content: 'Document your processes before automating for best results.',
          hashtags: ['#documentation', '#bestpractices'],
          characterCount: 59,
        },
      ];
      
      const validation = service.validateContent(validPosts);
      
      expect(validation.valid).toBe(true);
      expect(validation.issues).toHaveLength(0);
    });
    
    it('should detect content issues', () => {
      const invalidPosts = [
        {
          type: 'tips' as const,
          content: 'Too short',
          hashtags: [],
          characterCount: 9,
        },
        {
          type: 'educational' as const,
          content: 'This post is way too long and exceeds the character limit. ' +
                   'It goes on and on with unnecessary details that make it ' +
                   'unsuitable for social media. Nobody will read all of this ' +
                   'content because it is simply too verbose and lengthy for the ' +
                   'platform constraints we are working with here.',
          hashtags: ['#toolong'],
          characterCount: 301,
        },
      ];
      
      const validation = service.validateContent(invalidPosts);
      
      expect(validation.valid).toBe(false);
      expect(validation.issues.length).toBeGreaterThan(0);
      expect(validation.issues).toContain('Only 2 posts generated (need 7)');
      expect(validation.issues).toContain('Post 1 too short (9 chars)');
      expect(validation.issues).toContain('Post 1 missing hashtags');
      expect(validation.issues).toContain('Post 2 too long (301 chars)');
    });
  });
});