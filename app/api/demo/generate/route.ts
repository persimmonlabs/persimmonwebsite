import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + 60000 // 1 minute window
    })
    return true
  }
  
  if (limit.count >= 5) { // 5 requests per minute
    return false
  }
  
  limit.count++
  return true
}

function generatePlatformContent(
  platform: string,
  brandName: string,
  voiceTone: string,
  contentGoal: string,
  description: string
) {
  // Voice tone variations
  const toneStyles = {
    professional: {
      prefix: '📊',
      style: 'formal and authoritative',
      cta: 'Learn more →'
    },
    friendly: {
      prefix: '👋',
      style: 'warm and conversational',
      cta: 'Join us today! 🎉'
    },
    playful: {
      prefix: '🎨',
      style: 'fun and energetic',
      cta: 'Let\'s go! 🚀'
    },
    bold: {
      prefix: '⚡',
      style: 'confident and direct',
      cta: 'Take action now.'
    }
  }

  // Content goal templates
  const goalTemplates = {
    awareness: {
      focus: 'introducing and educating',
      hashtags: ['#BrandAwareness', '#DiscoverMore', '#Innovation', '#TechTrends']
    },
    lead_gen: {
      focus: 'capturing interest and contact info',
      hashtags: ['#FreeDemo', '#GetStarted', '#LimitedOffer', '#TryItNow']
    },
    launch: {
      focus: 'announcing new products or features',
      hashtags: ['#ProductLaunch', '#NewRelease', '#ComingSoon', '#Innovation']
    },
    promo: {
      focus: 'promoting special offers',
      hashtags: ['#SpecialOffer', '#LimitedTime', '#Discount', '#DealOfTheDay']
    }
  }

  const tone = toneStyles[voiceTone as keyof typeof toneStyles] || toneStyles.friendly
  const goal = goalTemplates[contentGoal as keyof typeof goalTemplates] || goalTemplates.awareness

  // Platform-specific content generation
  const platformTemplates = {
    instagram: [
      {
        caption: `${tone.prefix} ${brandName} is ${goal.focus} about ${description || 'something amazing'}!\n\n✨ Discover what makes us different\n🎯 Built with your needs in mind\n💫 Join our growing community\n\n${tone.cta}`,
        hashtags: [...goal.hashtags, '#Instagram', '#InstaGood'],
        cta: tone.cta
      },
      {
        caption: `Looking for ${description || 'innovation'}? ${brandName} has you covered! 🌟\n\n• Trusted by forward-thinkers\n• Designed for real results\n• Ready when you are\n\n${tone.cta}`,
        hashtags: [...goal.hashtags, '#InstaBusiness', '#Success'],
        cta: tone.cta
      },
      {
        caption: `Transform your ${contentGoal === 'launch' ? 'experience' : 'workflow'} with ${brandName}! 💡\n\n${description || 'Discover the difference'}\n\n${tone.cta}`,
        hashtags: [...goal.hashtags, '#Transformation', '#Growth'],
        cta: tone.cta
      }
    ],
    linkedin: [
      {
        caption: `${brandName} is proud to announce: ${description || 'our latest innovation'}.\n\nIn today's fast-paced business environment, staying ahead means embracing change. That's why we've developed solutions that adapt to your needs.\n\nKey benefits:\n• Increased efficiency\n• Measurable ROI\n• Seamless integration\n\n${tone.cta}`,
        hashtags: [...goal.hashtags, '#LinkedIn', '#B2B', '#BusinessGrowth'],
        cta: tone.cta
      },
      {
        caption: `Exciting developments at ${brandName}! We're ${goal.focus} about ${description || 'transformative solutions'}.\n\nOur approach combines innovation with practicality, delivering results that matter to your bottom line.\n\n${tone.cta}`,
        hashtags: [...goal.hashtags, '#ProfessionalGrowth', '#Industry'],
        cta: tone.cta
      },
      {
        caption: `${brandName} insight: ${description || 'The future of business is here'}.\n\nJoin industry leaders who are already benefiting from our innovative approach.\n\n${tone.cta}`,
        hashtags: [...goal.hashtags, '#ThoughtLeadership', '#Innovation'],
        cta: tone.cta
      }
    ],
    twitter: [
      {
        caption: `🔥 ${brandName}: ${description || 'Making waves in the industry'}!\n\n${tone.cta}`,
        hashtags: goal.hashtags.slice(0, 3), // Twitter has hashtag limits
        cta: tone.cta
      },
      {
        caption: `Big news from ${brandName}! 📢 ${description || 'Something exciting is coming'}. Don't miss out!\n\n${tone.cta}`,
        hashtags: goal.hashtags.slice(0, 3),
        cta: tone.cta
      },
      {
        caption: `${tone.prefix} ${description || 'Innovation delivered'} - ${brandName}\n\n${tone.cta}`,
        hashtags: goal.hashtags.slice(0, 2),
        cta: tone.cta
      }
    ],
    facebook: [
      {
        caption: `${tone.prefix} Friends, we're excited to share ${description || 'something special'} from ${brandName}!\n\nWe believe in ${goal.focus} that truly makes a difference in your life. Come see what we're all about!\n\n${tone.cta}`,
        hashtags: [...goal.hashtags, '#Facebook', '#Community'],
        cta: tone.cta
      },
      {
        caption: `${brandName} update! 🎉\n\n${description || 'Great things are happening'}, and we want you to be part of it. Join our community and discover the difference.\n\n${tone.cta}`,
        hashtags: [...goal.hashtags, '#FacebookBusiness'],
        cta: tone.cta
      },
      {
        caption: `Your journey with ${brandName} starts here! ${tone.prefix}\n\n${description || 'Experience innovation like never before'}.\n\n${tone.cta}`,
        hashtags: [...goal.hashtags, '#JoinUs'],
        cta: tone.cta
      }
    ]
  }

  return platformTemplates[platform as keyof typeof platformTemplates] || platformTemplates.instagram
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const {
      description,
      brandName,
      voiceTone,
      contentGoal,
      platforms,
      url
    } = body

    // Validate required fields
    if (!platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one platform' },
        { status: 400 }
      )
    }

    // Generate content for each platform
    const generatedContent = platforms.map((platform: string) => ({
      platform,
      variants: generatePlatformContent(
        platform,
        brandName || 'Your Brand',
        voiceTone || 'friendly',
        contentGoal || 'awareness',
        description
      )
    }))

    // In a real implementation, you would:
    // 1. Call OpenAI or Claude API here for actual AI generation
    // 2. Store the generated content in a database
    // 3. Track usage for analytics

    return NextResponse.json({
      success: true,
      content: generatedContent,
      generated_at: new Date().toISOString()
    })

  } catch (error) {
    console.error('Content generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}