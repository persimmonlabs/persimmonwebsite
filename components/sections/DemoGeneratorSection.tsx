'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Link2, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle2,
  Image,
  Type,
  Target,
  Palette,
  Send,
  Copy,
  Download,
  Mail,
  Calendar
} from 'lucide-react'
import { Button } from '../Button'

type Platform = 'instagram' | 'linkedin' | 'twitter' | 'facebook'
type Tone = 'professional' | 'friendly' | 'playful' | 'bold'
type Industry = 'ecommerce' | 'saas' | 'agency' | 'fitness' | 'restaurant' | 'services' | 'realestate' | 'healthcare' | 'education' | 'other'

interface DemoFormData {
  // Required
  brandName: string
  email: string
  industry: Industry
  tone: Tone
  platforms: Platform[]
  
  // Optional
  imageUrls?: string[]
  website?: string
  consent: boolean
  otherIndustry?: string // For when 'other' is selected
}

interface GeneratedContent {
  platform: Platform
  variants: Array<{
    caption: string
    hashtags: string[]
    imageUrl?: string
    cta?: string
  }>
}

export const DemoGeneratorSection: React.FC = () => {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('instagram')
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [emailSent, setEmailSent] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState<DemoFormData>({
    brandName: '',
    email: '',
    industry: 'saas' as Industry,
    tone: 'friendly' as Tone,
    platforms: ['instagram'] as Platform[],
    website: '',
    consent: false,
    otherIndustry: ''
  })

  const togglePlatform = (platform: Platform) => {
    const platforms = formData.platforms.includes(platform)
      ? formData.platforms.filter(p => p !== platform)
      : [...formData.platforms, platform]
    setFormData({ ...formData, platforms })
  }

  const industryOptions: { value: Industry; label: string }[] = [
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'saas', label: 'SaaS/Technology' },
    { value: 'agency', label: 'Marketing Agency' },
    { value: 'fitness', label: 'Fitness/Wellness' },
    { value: 'restaurant', label: 'Restaurant/Food' },
    { value: 'services', label: 'Professional Services' },
    { value: 'realestate', label: 'Real Estate' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' }
  ]

  const generateContent = async () => {
    setIsGenerating(true)
    setStep(3)

    try {
      // Call the API endpoint
      const response = await fetch('/api/demo/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate content')
      }

      const data = await response.json()
      
      // Transform API response to match our GeneratedContent interface
      const generatedContent: GeneratedContent[] = data.content.map((item: any) => ({
        platform: item.platform,
        variants: item.variants
      }))
      
      setGeneratedContent(generatedContent)
      setIsGenerating(false)
      setStep(4)
      
      // Show success message if available
      if (data.message) {
        console.log(data.message)
      }
      
    } catch (error) {
      console.error('Error generating content:', error)
      setIsGenerating(false)
      // You could set an error state here to show to the user
      alert(error instanceof Error ? error.message : 'Failed to generate content. Please try again.')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const sendEmail = () => {
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <section id="demo-generator" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/20">
            <Sparkles className="w-4 h-4 text-persimmon-coral" />
            <span className="text-sm font-semibold">Free Demo Generator</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Try It Now - <span className="bg-gradient-to-r from-persimmon-coral to-persimmon-orange bg-clip-text text-transparent">60 Seconds</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upload your content, tell us about your brand, and watch AI create professional social posts instantly.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((num) => (
              <React.Fragment key={num}>
                <motion.div
                  animate={{
                    scale: step >= num ? 1 : 0.8,
                    opacity: step >= num ? 1 : 0.5
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= num ? 'bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
                </motion.div>
                {num < 4 && (
                  <div className={`w-20 h-1 rounded ${step > num ? 'bg-persimmon-coral' : 'bg-gray-700'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center text-white">
                <Sparkles className="w-6 h-6 mr-2 text-persimmon-coral" />
                Step 1: Tell Us About Your Brand
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Brand Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Brand/Company Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Acme Coffee Co."
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-persimmon-coral focus:border-transparent"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-persimmon-coral focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Industry */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Target className="inline w-4 h-4 mr-1" />
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value as Industry })}
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-persimmon-coral focus:border-transparent"
                  required
                >
                  {industryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formData.industry === 'other' && (
                  <input
                    type="text"
                    placeholder="Please specify your industry"
                    value={formData.otherIndustry || ''}
                    onChange={(e) => setFormData({ ...formData, otherIndustry: e.target.value })}
                    className="w-full mt-2 px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-persimmon-coral focus:border-transparent"
                  />
                )}
              </div>

              {/* Website (Optional) */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Link2 className="inline w-4 h-4 mr-1" />
                  Website (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://yourcompany.com"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-persimmon-coral focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">We&apos;ll use this for additional context about your brand</p>
              </div>

              {/* Marketing Consent */}
              <div className="mt-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 mr-3 w-4 h-4 text-persimmon-coral bg-gray-800 border-gray-700 rounded focus:ring-persimmon-coral focus:ring-2"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to receive my generated content via email and accept marketing communications from Persimmon Labs
                  </span>
                </label>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={!formData.brandName || !formData.email || !formData.consent}
                  className="group"
                >
                  Next: Choose Platforms
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center text-white">
                <Palette className="w-6 h-6 mr-2 text-persimmon-coral" />
                Step 2: Voice Tone & Platforms
              </h3>

              {/* Voice Tone */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <Type className="inline w-4 h-4 mr-1" />
                  Choose Your Brand Voice *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['professional', 'friendly', 'playful', 'bold'] as Tone[]).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setFormData({ ...formData, tone })}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        formData.tone === tone
                          ? 'border-persimmon-coral bg-persimmon-coral/10 text-persimmon-coral'
                          : 'border-gray-700 hover:border-gray-600 text-gray-400'
                      }`}
                    >
                      <span className="font-medium">{tone.charAt(0).toUpperCase() + tone.slice(1)}</span>
                      <p className="text-xs mt-1 opacity-80">
                        {tone === 'professional' && 'Formal, authoritative'}
                        {tone === 'friendly' && 'Warm, approachable'}
                        {tone === 'playful' && 'Fun, casual'}
                        {tone === 'bold' && 'Strong, confident'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Select Platforms (Choose 1-4) *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => togglePlatform('instagram')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.platforms.includes('instagram')
                        ? 'border-persimmon-coral bg-persimmon-coral/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Instagram className={`w-8 h-8 mx-auto mb-2 ${
                      formData.platforms.includes('instagram') ? 'text-persimmon-coral' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.platforms.includes('instagram') ? 'text-persimmon-coral' : 'text-gray-400'
                    }`}>Instagram</span>
                  </button>
                  <button
                    onClick={() => togglePlatform('linkedin')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.platforms.includes('linkedin')
                        ? 'border-persimmon-coral bg-persimmon-coral/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Linkedin className={`w-8 h-8 mx-auto mb-2 ${
                      formData.platforms.includes('linkedin') ? 'text-persimmon-coral' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.platforms.includes('linkedin') ? 'text-persimmon-coral' : 'text-gray-400'
                    }`}>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => togglePlatform('twitter')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.platforms.includes('twitter')
                        ? 'border-persimmon-coral bg-persimmon-coral/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Twitter className={`w-8 h-8 mx-auto mb-2 ${
                      formData.platforms.includes('twitter') ? 'text-persimmon-coral' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.platforms.includes('twitter') ? 'text-persimmon-coral' : 'text-gray-400'
                    }`}>Twitter/X</span>
                  </button>
                  <button
                    onClick={() => togglePlatform('facebook')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.platforms.includes('facebook')
                        ? 'border-persimmon-coral bg-persimmon-coral/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Facebook className={`w-8 h-8 mx-auto mb-2 ${
                      formData.platforms.includes('facebook') ? 'text-persimmon-coral' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.platforms.includes('facebook') ? 'text-persimmon-coral' : 'text-gray-400'
                    }`}>Facebook</span>
                  </button>
                </div>
                {formData.platforms.length === 0 && (
                  <p className="text-sm text-red-400 mt-2">Please select at least one platform</p>
                )}
                {formData.platforms.length > 4 && (
                  <p className="text-sm text-red-400 mt-2">Please select up to 4 platforms maximum</p>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={generateContent}
                  disabled={formData.platforms.length === 0 || formData.platforms.length > 4}
                  className="group"
                >
                  Generate AI Content
                  <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && isGenerating && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
            >
              <Loader2 className="w-16 h-16 mx-auto mb-4 text-persimmon-coral animate-spin" />
              <h3 className="text-2xl font-bold mb-2">Cooking Your Content...</h3>
              <p className="text-gray-600">Our AI is crafting the perfect posts for your brand</p>
              <div className="mt-6 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-persimmon-coral rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-persimmon-coral rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-persimmon-coral rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}

          {step === 4 && generatedContent.length > 0 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <CheckCircle2 className="w-6 h-6 mr-2 text-green-600" />
                  Your Content is Ready!
                </h3>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={sendEmail}
                    className="group"
                  >
                    {emailSent ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Sent!
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-1" />
                        Email Me
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="group"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download All
                  </Button>
                </div>
              </div>

              {/* Platform Tabs */}
              <div className="flex space-x-2 mb-6 border-b">
                {generatedContent.map((content) => (
                  <button
                    key={content.platform}
                    onClick={() => setSelectedPlatform(content.platform)}
                    className={`px-4 py-2 font-medium transition-all ${
                      selectedPlatform === content.platform
                        ? 'text-persimmon-coral border-b-2 border-persimmon-coral'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content Display */}
              {generatedContent
                .filter(c => c.platform === selectedPlatform)
                .map((content) => (
                  <div key={content.platform}>
                    {/* Variant Selector */}
                    <div className="flex space-x-2 mb-4">
                      {content.variants.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedVariant(index)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            selectedVariant === index
                              ? 'bg-persimmon-coral text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          Variant {index + 1}
                        </button>
                      ))}
                    </div>

                    {/* Content Preview */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2">
                          {selectedPlatform === 'instagram' && <Instagram className="w-5 h-5 text-pink-600" />}
                          {selectedPlatform === 'linkedin' && <Linkedin className="w-5 h-5 text-blue-700" />}
                          {selectedPlatform === 'twitter' && <Twitter className="w-5 h-5 text-sky-500" />}
                          {selectedPlatform === 'facebook' && <Facebook className="w-5 h-5 text-blue-600" />}
                          <span className="font-medium">{formData.brandName || 'Your Brand'}</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(content.variants[selectedVariant].caption)}
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <p className="text-gray-800 whitespace-pre-wrap mb-4">
                        {content.variants[selectedVariant].caption}
                      </p>
                      
                      {content.variants[selectedVariant].hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {content.variants[selectedVariant].hashtags.map((tag, i) => (
                            <span key={i} className="text-blue-600 text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {content.variants[selectedVariant].cta && (
                        <div className="bg-gradient-to-r from-persimmon-peach/20 to-persimmon-coral/20 rounded-lg p-3 inline-block">
                          <span className="text-sm font-medium text-gray-800">
                            {content.variants[selectedVariant].cta}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {/* CTAs */}
              <div className="mt-8 p-6 bg-gradient-to-r from-persimmon-peach/10 to-persimmon-coral/10 rounded-lg border border-persimmon-coral/20">
                <h4 className="text-lg font-bold mb-2">Ready to automate your content?</h4>
                <p className="text-gray-600 mb-4">
                  This is just a taste of what Persimmon Labs can do. Get content like this every day, automatically.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="group">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book 15-min Setup Call
                  </Button>
                  <Button size="lg" variant="secondary">
                    Start 7-Day Free Trial
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}