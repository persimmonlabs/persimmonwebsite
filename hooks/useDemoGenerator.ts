'use client'

import { useState } from 'react'
import type { DemoFormData, Platform } from '@/components/demo/DemoForm'
import type { GeneratedContent } from '@/components/demo/DemoResults'

export const useDemoGenerator = () => {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState<DemoFormData>({
    uploadedFile: null,
    url: '',
    description: '',
    contentGoal: 'awareness',
    brandName: '',
    brandColors: '',
    voiceTone: 'friendly',
    postType: 'auto',
    platforms: ['instagram'],
    email: ''
  })

  const generateContent = async () => {
    setIsGenerating(true)
    setError(null)
    setSuccess(false)
    setStep(3)

    try {
      // Call the actual API endpoint
      const response = await fetch('/api/demo/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: formData.description || 'Create engaging social media content',
          brandName: formData.brandName || 'Our Brand',
          voiceTone: formData.voiceTone,
          contentGoal: formData.contentGoal,
          platforms: formData.platforms,
          url: formData.url
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const data = await response.json()
      
      if (data.content) {
        setGeneratedContent(data.content)
        setSuccess(true)
      } else {
        // Fallback to demo content if API doesn't return expected format
        const demoContent: GeneratedContent[] = formData.platforms.map(platform => ({
          platform,
          variants: [
            {
              caption: `🚀 Exciting news from ${formData.brandName || 'our team'}! We're thrilled to share our latest innovation that's changing the game.\n\n✨ Built with passion\n⚡ Designed for impact\n🎯 Ready to transform your experience\n\nDiscover how we're making a difference, one step at a time.`,
              hashtags: ['#Innovation', '#TechForGood', '#FutureIsNow', '#DigitalTransformation', '#BetaLaunch'],
              cta: 'Join our beta program today →'
            },
            {
              caption: `Behind every great product is a story of dedication. ${formData.brandName || 'We'}'re proud to unveil what we've been working on.\n\n📈 Measurable results\n⏰ Save valuable time\n🎨 Beautiful design\n\nReady to see the difference?`,
              hashtags: ['#ProductLaunch', '#StartupLife', '#TechInnovation', '#BetterTogether'],
              cta: 'Get early access now ✨'
            },
            {
              caption: `The future of ${formData.contentGoal === 'launch' ? 'innovation' : 'automation'} is here. ${formData.brandName || 'Our solution'} makes it simple.\n\n💡 Smart technology\n🔄 Seamless integration\n📊 Real results\n\nJoin thousands who are already benefiting.`,
              hashtags: ['#TechSolution', '#Automation', '#GrowthHacking', '#DigitalFirst'],
              cta: 'Start your free trial!'
            }
          ]
        }))
        setGeneratedContent(demoContent)
        setSuccess(true)
      }
    } catch (err) {
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      // Still provide demo content on error for demonstration purposes
      const fallbackContent: GeneratedContent[] = formData.platforms.map(platform => ({
        platform,
        variants: [
          {
            caption: `[Demo Mode] ${formData.brandName || 'Your brand'} content would appear here with AI-generated text tailored to your specifications.`,
            hashtags: ['#Demo', '#BetaTest', '#ComingSoon'],
            cta: 'This is a demo - Sign up for real AI generation'
          }
        ]
      }))
      setGeneratedContent(fallbackContent)
      setSuccess(true)
    } finally {
      setIsGenerating(false)
    }
  }

  const reset = () => {
    setStep(1)
    setGeneratedContent([])
    setFormData({
      uploadedFile: null,
      url: '',
      description: '',
      contentGoal: 'awareness',
      brandName: '',
      brandColors: '',
      voiceTone: 'friendly',
      postType: 'auto',
      platforms: ['instagram'],
      email: ''
    })
    setError(null)
    setSuccess(false)
  }

  const sendEmail = async (email: string) => {
    try {
      await fetch('/api/demo/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          content: generatedContent
        })
      })
    } catch (err) {
      console.error('Email send error:', err)
    }
  }

  return {
    step,
    setStep,
    isGenerating,
    generatedContent,
    error,
    setError,
    success,
    formData,
    setFormData,
    generateContent,
    reset,
    sendEmail
  }
}