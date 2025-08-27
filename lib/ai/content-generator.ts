import OpenAI from 'openai';

// Initialize OpenAI client (only if API key is available)
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null;

// Types
export interface BrandBrief {
  voice_traits: string[];
  target_audience: string;
  key_messages: string[];
  hashtag_style: string;
  cta_examples: string[];
}

export interface PlatformContent {
  platform: string;
  caption: string;
  hashtags: string[];
  cta?: string;
}

/**
 * Generate a brand brief based on the provided information
 */
export async function generateBrandBrief({
  brandName,
  industry,
  tone,
  website
}: {
  brandName: string;
  industry: string;
  tone: string;
  website?: string;
}): Promise<BrandBrief> {
  const prompt = `
    Create a brand brief for ${brandName} in the ${industry} industry.
    Tone: ${tone}
    ${website ? `Website: ${website}` : ''}
    
    Return JSON with:
    - voice_traits: 3-5 brand voice characteristics based on the ${tone} tone
    - target_audience: Brief description of typical customers in ${industry}
    - key_messages: 3 main value propositions to emphasize
    - hashtag_style: How to use hashtags (professional, trendy, minimal, etc.)
    - cta_examples: 2 sample calls-to-action that fit the ${tone} tone
    
    Ensure all content is appropriate for the ${industry} industry.
  `;
  
  if (!openai) {
    throw new Error('OpenAI not configured');
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: [
        { 
          role: 'system', 
          content: 'You are a social media strategist. Return only valid JSON without markdown formatting.' 
        },
        { 
          role: 'user', 
          content: prompt 
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });
    
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content returned from OpenAI');
    }
    
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating brand brief:', error);
    // Return a fallback brand brief
    return {
      voice_traits: [tone, 'engaging', 'authentic'],
      target_audience: `Businesses and professionals in the ${industry} sector`,
      key_messages: [
        'Innovation and efficiency',
        'Customer-focused solutions',
        'Industry expertise'
      ],
      hashtag_style: 'professional',
      cta_examples: [
        'Learn more →',
        'Get started today'
      ]
    };
  }
}

/**
 * Generate platform-specific content
 */
export async function generatePlatformContent(
  platform: string,
  brandBrief: BrandBrief,
  brandName: string,
  industry: string
): Promise<PlatformContent> {
  const platformPrompts: Record<string, string> = {
    instagram: `Create an Instagram post for ${brandName}:
      - Hook (first line, <125 chars, attention-grabbing)
      - Body (3-4 lines with relevant emojis)
      - 5-8 relevant hashtags for ${industry}
      - CTA line that encourages engagement
      Keep under 2200 chars total.
      Make it visual and engaging.`,
    
    linkedin: `Create a LinkedIn post for ${brandName}:
      - Professional hook that establishes authority
      - 3-4 short paragraphs (use line breaks)
      - Thought leadership angle for ${industry}
      - 1-3 professional hashtags maximum
      - Professional CTA that drives business action
      Focus on value and insights.`,
    
    twitter: `Create a Twitter/X post for ${brandName}:
      - Single tweet (max 280 chars including spaces)
      - Punchy, shareable message
      - 1-2 hashtags if space allows
      - Include compelling stat, question, or bold statement
      Make every character count.`,
    
    facebook: `Create a Facebook post for ${brandName}:
      - Engaging question or relatable statement
      - 2-3 conversational paragraphs
      - Friendly, community-focused tone
      - 3-5 hashtags that build community
      - Clear CTA with value proposition
      Build connection and trust.`
  };
  
  const systemPrompt = `
    You are creating social media content with these brand traits: ${brandBrief.voice_traits.join(', ')}.
    Target audience: ${brandBrief.target_audience}
    Key messages to convey: ${brandBrief.key_messages.join(', ')}
    Use ${brandBrief.hashtag_style} hashtag style.
    Industry context: ${industry}
  `;
  
  if (!openai) {
    throw new Error('OpenAI not configured');
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: [
        { 
          role: 'system', 
          content: systemPrompt 
        },
        { 
          role: 'user', 
          content: platformPrompts[platform] || platformPrompts.instagram 
        }
      ],
      temperature: 0.8,
      max_tokens: 400
    });
    
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content returned from OpenAI');
    }
    
    return parseContent(content, platform);
  } catch (error) {
    console.error(`Error generating ${platform} content:`, error);
    // Return fallback content
    return {
      platform,
      caption: `Discover how ${brandName} is transforming the ${industry} industry. Connect with us to learn more about our innovative solutions.`,
      hashtags: [`#${industry}`, '#Innovation', '#BusinessGrowth'],
      cta: brandBrief.cta_examples[0]
    };
  }
}

/**
 * Parse the raw content from OpenAI into structured format
 */
function parseContent(rawContent: string, platform: string): PlatformContent {
  const lines = rawContent.split('\n').filter(line => line.trim());
  
  // Extract hashtags (look for lines with # or words starting with #)
  const hashtagLine = lines.find(line => line.includes('#')) || '';
  const hashtags = hashtagLine.match(/#\w+/g) || [];
  
  // Extract CTA (usually last line or line with arrow/emoji)
  const ctaLine = lines.find(line => 
    line.includes('→') || 
    line.includes('👉') || 
    line.includes('CTA:') ||
    line.toLowerCase().includes('learn more') ||
    line.toLowerCase().includes('get started')
  );
  
  // Remove hashtag and CTA lines from main content
  const contentLines = lines.filter(line => 
    line !== hashtagLine && 
    line !== ctaLine &&
    !line.startsWith('CTA:')
  );
  
  // Join remaining lines for caption
  let caption = contentLines.join('\n');
  
  // For Twitter, ensure we're under 280 chars
  if (platform === 'twitter' && caption.length > 280) {
    caption = caption.substring(0, 277) + '...';
  }
  
  return {
    platform,
    caption: caption.trim(),
    hashtags: hashtags.map(tag => tag.trim()),
    cta: ctaLine?.replace('CTA:', '').trim()
  };
}

/**
 * Generate multiple content variants for better options
 */
export async function generateContentVariants(
  platform: string,
  brandBrief: BrandBrief,
  brandName: string,
  industry: string,
  count: number = 3
): Promise<PlatformContent[]> {
  const variants = await Promise.all(
    Array(count).fill(null).map(() => 
      generatePlatformContent(platform, brandBrief, brandName, industry)
    )
  );
  
  return variants;
}