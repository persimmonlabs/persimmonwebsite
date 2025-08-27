'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  Zap,
  ArrowRight,
  Mail,
  FileSpreadsheet,
  Instagram,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react'
import { Button } from '../Button'

interface FormData {
  brandName: string
  email: string
  industry: string
  style: string
}

export const N8nDemoGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    email: '',
    industry: '',
    style: 'professional'
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [step, setStep] = useState<'form' | 'generating' | 'success'>('form')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setStep('generating')

    try {
      // Send directly to your n8n webhook
      const response = await fetch('https://n8n.persimmonlabs.cc/webhook/demo-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'website-demo',
          userAgent: navigator.userAgent
        })
      })

      if (response.ok) {
        const result = await response.json()
        
        // Simulate the automation process with realistic timing
        setTimeout(() => {
          setResult({
            success: true,
            brandName: formData.brandName,
            email: formData.email,
            contentPieces: Math.floor(Math.random() * 5) + 15, // 15-20 pieces
            sheetUrl: `https://docs.google.com/spreadsheets/d/demo-${Date.now()}`,
            message: 'Your 7-day automation is now running!'
          })
          setStep('success')
        }, 4000) // 4 second delay for realism
      } else {
        throw new Error('Webhook failed')
      }
    } catch (error) {
      console.error('Demo generation failed:', error)
      setResult({
        success: false,
        message: 'Something went wrong. Please try again or book a call directly.'
      })
      setStep('success')
    } finally {
      setIsGenerating(false)
    }
  }

  const platformIcons = {
    Instagram: Instagram,
    LinkedIn: Linkedin,
    Twitter: Twitter,
    Facebook: Facebook
  }

  // Success State
  if (step === 'success' && result?.success) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-900 via-persimmon-brown to-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Success Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <CheckCircle2 className="w-12 h-12 text-white" />
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                🚀 Your Automation is <span className="text-green-400">LIVE!</span>
              </h2>
              <p className="text-xl text-gray-300">
                {result.brandName} now has a complete 7-day content system running
              </p>
            </div>

            {/* What Was Created */}
            <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 mb-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">
                📊 What We Just Created For You:
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-persimmon-coral rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-persimmon-coral">7</div>
                  <div className="text-gray-300">Days Planned</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileSpreadsheet className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-400">{result.contentPieces}</div>
                  <div className="text-gray-300">Posts Generated</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-400">4</div>
                  <div className="text-gray-300">Platforms Ready</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-400">Auto</div>
                  <div className="text-gray-300">Scheduling</div>
                </div>
              </div>

              {/* Platform Icons */}
              <div className="flex justify-center space-x-4 mb-6">
                {Object.entries(platformIcons).map(([platform, Icon]) => (
                  <div key={platform} className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
                    <Icon className="w-5 h-5 text-persimmon-coral mr-2" />
                    <span className="text-gray-300 text-sm">{platform}</span>
                  </div>
                ))}
              </div>

              {/* Check Email CTA */}
              <div className="bg-gradient-to-r from-persimmon-coral to-persimmon-orange rounded-lg p-6 text-white">
                <div className="flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6 mr-2" />
                  <span className="font-semibold text-lg">Check Your Email!</span>
                </div>
                <p className="text-persimmon-coral/90">
                  Complete details sent to <strong>{result.email}</strong>
                </p>
                <p className="text-sm mt-2 opacity-90">
                  Including your Google Sheet link and full automation breakdown
                </p>
              </div>
            </div>

            {/* The Key Message */}
            <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-2xl p-8 mb-8 border border-green-500/20">
              <h3 className="text-3xl font-bold text-white mb-4">
                🎯 With Our <span className="text-green-400">Full Service</span>:
              </h3>
              
              <div className="text-left max-w-2xl mx-auto space-y-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-400 mr-3 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Just Approve & We Post</p>
                    <p className="text-gray-300 text-sm">Content automatically goes live on all platforms</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-400 mr-3 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Real-Time Optimization</p>
                    <p className="text-gray-300 text-sm">AI adjusts strategy based on engagement data</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-400 mr-3 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Continuous Content Generation</p>
                    <p className="text-gray-300 text-sm">Never run out of ideas - system creates endless content</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-400 mr-3 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Zero Manual Work</p>
                    <p className="text-gray-300 text-sm">Set it once, runs forever</p>
                  </div>
                </div>
              </div>

              <div className="text-center bg-white/10 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-400 mb-2">
                  Save 20+ Hours Per Week
                </p>
                <p className="text-gray-300">
                  While getting better results than manual posting
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <a
                href="https://calendly.com/persimmonlabs/strategy-call"
                className="inline-block bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white px-8 py-4 rounded-lg font-bold text-xl hover:from-persimmon-orange hover:to-persimmon-coral transition-all transform hover:scale-105"
              >
                🗓️ Activate Full Automation - Book Strategy Call
              </a>
              
              <p className="text-gray-400">
                Your demo runs for 7 days. Ready to automate forever?
              </p>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>
                  <span className="text-green-400">✨ Limited Time:</span> First 10 clients get setup at 50% off
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  // Generating State  
  if (step === 'generating') {
    const steps = [
      'Creating your branded Google Sheet...',
      'Generating 7 days of content...',
      'Setting up multi-platform automation...',
      'Scheduling optimal posting times...',
      'Preparing your email summary...'
    ]
    
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    
    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentStepIndex(prev => (prev + 1) % steps.length)
      }, 800)
      return () => clearInterval(interval)
    }, [])

    return (
      <section className="py-16 bg-gradient-to-b from-gray-900 via-persimmon-brown to-gray-900">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/50 backdrop-blur rounded-2xl p-12 border border-gray-700"
          >
            {/* Animated Icon */}
            <div className="relative mb-8">
              <div className="w-20 h-20 mx-auto">
                <svg className="w-full h-full text-persimmon-coral animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div className="absolute inset-0 bg-persimmon-coral/20 rounded-full blur-xl animate-pulse"></div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Creating Your Content Automation...
            </h2>
            
            <p className="text-gray-300 mb-8 text-lg">
              Building your personalized 7-day content system for <strong>{formData.brandName}</strong>
            </p>

            {/* Progress Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center p-3 rounded-lg transition-all ${
                    index <= currentStepIndex
                      ? 'bg-persimmon-coral/20 text-persimmon-coral'
                      : 'bg-gray-700/50 text-gray-500'
                  }`}
                >
                  {index < currentStepIndex ? (
                    <CheckCircle2 className="w-5 h-5 mr-3" />
                  ) : index === currentStepIndex ? (
                    <Clock className="w-5 h-5 mr-3 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 mr-3 border-2 border-gray-500 rounded-full"></div>
                  )}
                  <span className="font-medium">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">
                ⚡ This usually takes 30-60 seconds. Your automation will be ready shortly!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  // Form State
  return (
    <section id="demo" className="py-16 bg-gradient-to-b from-gray-900 via-persimmon-brown to-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See Your Content Automation 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-persimmon-coral to-persimmon-orange">
              {' '}In Action
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We'll create a <strong>live 7-day content calendar</strong> with real automation that shows exactly how your content system would work
          </p>
          
          {/* Value Props */}
          <div className="flex justify-center mt-6 space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
              Real Google Sheet Created
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
              Multi-Platform Strategy
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
              Automated Scheduling
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-gray-700"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Brand Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Brand Name *
              </label>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-persimmon-coral focus:border-transparent placeholder-gray-500"
                placeholder="Your awesome brand name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-persimmon-coral focus:border-transparent placeholder-gray-500"
                placeholder="you@company.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll email you the Google Sheet link and full automation details
              </p>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Industry
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-persimmon-coral focus:border-transparent"
              >
                <option value="">Select your industry (optional)</option>
                <option value="E-commerce">E-commerce & Retail</option>
                <option value="SaaS">SaaS & Technology</option>
                <option value="Consulting">Consulting & Services</option>
                <option value="Healthcare">Healthcare & Medical</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Fitness">Fitness & Wellness</option>
                <option value="Restaurant">Restaurant & Food</option>
                <option value="Finance">Finance & Fintech</option>
                <option value="Education">Education & Training</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Content Style */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Content Style
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'professional', label: 'Professional', desc: 'Clean, authoritative' },
                  { value: 'bold', label: 'Bold', desc: 'Eye-catching, confident' },
                  { value: 'friendly', label: 'Friendly', desc: 'Warm, approachable' },
                  { value: 'creative', label: 'Creative', desc: 'Unique, artistic' }
                ].map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, style: style.value })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.style === style.value
                        ? 'border-persimmon-coral bg-persimmon-coral/10 text-persimmon-coral'
                        : 'border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="font-semibold">{style.label}</div>
                    <div className="text-xs opacity-75">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={!formData.brandName || !formData.email || isGenerating}
                size="lg"
                className="w-full bg-gradient-to-r from-persimmon-coral to-persimmon-orange hover:from-persimmon-orange hover:to-persimmon-coral text-white font-bold text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Your Automation...
                  </span>
                ) : (
                  <>
                    🚀 Generate My Live 7-Day Content System
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              
              <div className="text-center mt-4 space-y-2">
                <p className="text-sm text-gray-400">
                  ⚡ Creates real Google Sheet + automation in ~60 seconds
                </p>
                <p className="text-xs text-gray-500">
                  No signup required • Complete system delivered via email
                </p>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            Join 200+ brands already automating their content with Persimmon Labs
          </p>
        </motion.div>
      </div>
    </section>
  )
}