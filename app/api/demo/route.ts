import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract form data
    const {
      description,
      contentGoal,
      brandName,
      brandColors,
      voiceTone,
      platforms,
      email
    } = body

    // For now, return mock data - in production this would call your AI service
    const generatedContent = platforms.map((platform: string) => ({
      platform,
      variants: generateVariantsForPlatform(platform, brandName, voiceTone, contentGoal)
    }))

    // In production, you would:
    // 1. Call your n8n webhook or AI service
    // 2. Store the results in a database
    // 3. Send email with the content
    // 4. Track analytics

    return NextResponse.json({
      success: true,
      content: generatedContent,
      email: email
    })
  } catch (error) {
    console.error('Demo generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}

function generateVariantsForPlatform(
  platform: string,
  brandName: string,
  voiceTone: string,
  contentGoal: string
) {
  const brand = brandName || 'Your Brand'
  
  // Platform-specific content generation
  const platformConfig: Record<string, any> = {
    instagram: {
      maxLength: 2200,
      hashtagCount: 10,
      variants: [
        {
          caption: `🚀 ${brand} is transforming the game!\n\n✨ Here's what makes us different:\n• AI-powered automation that never sleeps\n• Content that connects with your audience\n• Results you can measure\n\nReady to level up your social media presence? We make it effortless.\n\n💡 One upload = weeks of content\n⚡ Save 20+ hours every week\n🎯 Stay consistent without the stress`,
          hashtags: ['#ContentAutomation', '#AIMarketing', '#SocialMediaStrategy', '#DigitalTransformation', '#MarketingAutomation', '#BusinessGrowth', '#ContentCreation', '#Innovation', '#Productivity', '#Automation'],
          cta: 'Start your free trial today - link in bio!'
        },
        {
          caption: `Ever feel like social media is a full-time job? 😅\n\n${brand} has your back. Our AI learns your brand voice and creates content that sounds like you - only better.\n\n📈 Triple your engagement\n⏰ Post at the perfect times\n🎨 Always on-brand\n\nStop stressing about content. Start focusing on growth.`,
          hashtags: ['#ContentMarketing', '#SmallBusiness', '#Entrepreneur', '#GrowthHacking', '#MarketingTips', '#BusinessOwner', '#TimeManagement', '#WorkSmarter', '#DigitalMarketing', '#Success'],
          cta: 'Book your free demo → link in bio'
        },
        {
          caption: `${brand} announcement! 🎉\n\nWe're making professional content creation accessible to every business.\n\n✅ No more content stress\n✅ No more inconsistent posting\n✅ No more wasted time\n\nJust upload once and watch your social presence transform.`,
          hashtags: ['#NewLaunch', '#ContentStrategy', '#MarketingSolution', '#BusinessTools', '#Efficiency', '#ModernBusiness', '#TechSolution', '#Marketing', '#Growth', '#Innovation'],
          cta: 'Get started in 60 seconds'
        }
      ]
    },
    linkedin: {
      maxLength: 3000,
      hashtagCount: 3,
      variants: [
        {
          caption: `${brand} is revolutionizing how businesses approach content marketing.\n\nThe challenge: Creating consistent, high-quality content across multiple platforms is time-consuming and expensive.\n\nThe solution: Our AI-powered automation platform that:\n• Generates on-brand content automatically\n• Adapts messaging for each platform\n• Publishes at optimal times\n• Learns and improves from performance data\n\nThe result: Businesses save 20+ hours per week while increasing their social media engagement by 300%.\n\nIn today's digital landscape, consistent content isn't optional - it's essential. But it doesn't have to consume your entire day.\n\nReady to transform your content strategy?`,
          hashtags: ['#ContentAutomation', '#DigitalTransformation', '#B2BMarketing'],
          cta: 'Schedule a personalized demo'
        },
        {
          caption: `After working with 50+ businesses, we've identified the #1 content marketing challenge:\n\nTime.\n\nBusiness owners and marketing teams spend 15-20 hours per week on content creation and posting. That's half a work week on a single marketing channel.\n\n${brand} changes this equation:\n\n1. Upload your assets once\n2. AI generates platform-specific variations\n3. Review and approve (or automate completely)\n4. Content publishes automatically\n\nOur clients report:\n• 80% time savings on content tasks\n• 3x increase in posting consistency\n• 250% improvement in engagement rates\n\nThe future of content marketing is here. Are you ready?`,
          hashtags: ['#MarketingInnovation', '#Productivity', '#BusinessGrowth'],
          cta: 'Learn more about our approach'
        },
        {
          caption: `"We need to be on social media" - Every business in 2024\n\n"But who has the time?" - Also every business in 2024\n\n${brand} bridges this gap with intelligent automation that maintains your authentic voice while eliminating the manual work.\n\nThink of it as your always-on content team that:\n• Never calls in sick\n• Never misses a deadline\n• Never runs out of ideas\n• Costs 80% less than traditional solutions\n\nThe question isn't whether you need consistent content. It's whether you want to spend your time creating it or growing your business.\n\nWhich will you choose?`,
          hashtags: ['#Automation', '#ContentStrategy', '#Efficiency'],
          cta: 'Start your 7-day free trial'
        }
      ]
    },
    twitter: {
      maxLength: 280,
      hashtagCount: 2,
      variants: [
        {
          caption: `${brand} just launched! 🚀\n\nUpload once → AI creates content → Posts everywhere automatically\n\nSave 20+ hours/week on social media while growing your audience.\n\nFree demo in 60 seconds:`,
          hashtags: ['#ContentAutomation', '#AIMarketing'],
          cta: 'Try it free →'
        },
        {
          caption: `Spending hours on social media content? There's a better way.\n\n${brand} uses AI to transform one upload into weeks of posts.\n\nYour time is worth more than content creation.`,
          hashtags: ['#Productivity', '#Marketing'],
          cta: 'Get started free'
        },
        {
          caption: `${brand} math:\n\n1 upload\n+ AI magic\n= 30 days of content\n\nStop creating. Start automating.`,
          hashtags: ['#Automation', '#GrowthHack'],
          cta: 'Demo it now'
        }
      ]
    },
    facebook: {
      maxLength: 2000,
      hashtagCount: 5,
      variants: [
        {
          caption: `🎯 Attention business owners!\n\n${brand} is here to solve your content creation headaches once and for all.\n\nWe know you're busy running your business. Social media shouldn't be another full-time job. That's why we built an AI system that handles everything for you.\n\n✅ Creates unique, engaging posts\n✅ Maintains your brand voice\n✅ Posts at the best times\n✅ Works 24/7 without breaks\n\nJoin hundreds of businesses already saving 20+ hours per week on content creation.\n\nSpecial offer: Try it free for 7 days. No credit card required.`,
          hashtags: ['#SmallBusiness', '#ContentMarketing', '#Automation', '#BusinessGrowth', '#Marketing'],
          cta: 'Claim your free trial'
        },
        {
          caption: `Is your competition more visible on social media? 🤔\n\n${brand} levels the playing field. Our AI creates professional content that rivals big marketing teams - without the big budget.\n\nPerfect for:\n• Local businesses\n• Online coaches\n• E-commerce stores\n• Service providers\n• Consultants\n\nGet the social media presence you deserve without sacrificing your schedule.`,
          hashtags: ['#LocalBusiness', '#MarketingHelp', '#ContentCreation', '#SocialMedia', '#Business'],
          cta: 'Start growing today'
        },
        {
          caption: `"${brand} transformed our social media game!"\n\nThat's what our clients say after automating their content with us.\n\nHere's what you get:\n📱 Content for all platforms\n🤖 AI that learns your style\n📅 Consistent posting schedule\n💰 80% cost savings vs agencies\n⏰ Your time back\n\nReady to join them?`,
          hashtags: ['#Success', '#Marketing', '#Testimonial', '#Business', '#Growth'],
          cta: 'See how it works'
        }
      ]
    }
  }

  const config = platformConfig[platform] || platformConfig.instagram
  
  // Adjust tone based on voiceTone parameter
  if (voiceTone === 'professional') {
    // Make content more formal
    config.variants = config.variants.map((v: any) => ({
      ...v,
      caption: v.caption.replace(/!/g, '.').replace(/🚀/g, '').replace(/😅/g, '')
    }))
  } else if (voiceTone === 'playful') {
    // Add more emojis and excitement
    config.variants = config.variants.map((v: any) => ({
      ...v,
      caption: v.caption.replace(/\./g, '! 🎉')
    }))
  }

  return config.variants
}