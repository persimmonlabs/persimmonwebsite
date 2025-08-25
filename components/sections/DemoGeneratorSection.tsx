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
type ContentGoal = 'awareness' | 'lead_gen' | 'launch' | 'promo'
type VoiceTone = 'professional' | 'friendly' | 'playful' | 'bold'
type PostType = 'photo_caption' | 'carousel' | 'long_post' | 'infographic' | 'auto'

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
  const [formData, setFormData] = useState({
    uploadedFile: null as File | null,
    url: '',
    description: '',
    contentGoal: 'awareness' as ContentGoal,
    brandName: '',
    brandColors: '',
    voiceTone: 'friendly' as VoiceTone,
    postType: 'auto' as PostType,
    platforms: ['instagram'] as Platform[],
    email: ''
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, uploadedFile: file })
    }
  }

  const togglePlatform = (platform: Platform) => {
    const platforms = formData.platforms.includes(platform)
      ? formData.platforms.filter(p => p !== platform)
      : [...formData.platforms, platform]
    setFormData({ ...formData, platforms })
  }

  const generateContent = async () => {
    setIsGenerating(true)
    setStep(3)

    // Simulate API call
    setTimeout(() => {
      const mockContent: GeneratedContent[] = formData.platforms.map(platform => ({
        platform,
        variants: [
          {
            caption: `🚀 Introducing ${formData.brandName || 'our latest innovation'}! We're transforming the way businesses handle content creation with AI-powered automation that works 24/7.\n\n✨ Upload once, publish everywhere\n⚡ Save 20+ hours per week\n🎯 Consistent brand voice across all platforms\n\nReady to revolutionize your content strategy?`,
            hashtags: ['#ContentAutomation', '#AIMarketing', '#SocialMediaStrategy', '#DigitalTransformation', '#MarketingAutomation'],
            cta: 'Start your free trial today →'
          },
          {
            caption: `Ever wished you had a content team that never sleeps? 🌙\n\n${formData.brandName || 'Persimmon Labs'} makes it possible. Our AI understands your brand voice and creates engaging content that resonates with your audience.\n\n📈 3x engagement increase\n⏰ Post at optimal times automatically\n🎨 On-brand, every time`,
            hashtags: ['#ContentMarketing', '#AI', '#Automation', '#GrowthHacking', '#BusinessGrowth'],
            cta: 'Book a demo and see the magic ✨'
          },
          {
            caption: `Stop spending hours on content creation. Start focusing on what matters.\n\n${formData.brandName || 'Your brand'} deserves consistent, high-quality content without the hassle. Our AI-powered platform handles everything from ideation to publishing.\n\n💡 Smart content suggestions\n🔄 Automatic repurposing\n📊 Performance analytics`,
            hashtags: ['#Productivity', '#Marketing', '#ContentCreation', '#Innovation', '#TechSolution'],
            cta: 'Get started in 60 seconds'
          }
        ]
      }))
      
      setGeneratedContent(mockContent)
      setIsGenerating(false)
      setStep(4)
    }, 3000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const sendEmail = () => {
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <section id="demo-generator" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold">Free Demo Generator</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Try It Now - <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">60 Seconds</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                    step >= num ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
                </motion.div>
                {num < 4 && (
                  <div className={`w-20 h-1 rounded ${step > num ? 'bg-orange-600' : 'bg-gray-200'}`} />
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
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-2 text-orange-600" />
                Step 1: Upload Your Content
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {formData.uploadedFile ? formData.uploadedFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </label>
                  </div>
                </div>

                {/* URL Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or Paste a URL
                  </label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      placeholder="https://example.com/article"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to create?
                </label>
                <textarea
                  placeholder="E.g., Promote our new coffee blend launch, share a customer success story, announce a workshop..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Content Goal */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Target className="inline w-4 h-4 mr-1" />
                  Content Goal
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['awareness', 'lead_gen', 'launch', 'promo'] as ContentGoal[]).map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setFormData({ ...formData, contentGoal: goal })}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        formData.contentGoal === goal
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {goal.replace('_', ' ').charAt(0).toUpperCase() + goal.replace('_', ' ').slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  size="lg"
                  onClick={() => setStep(2)}
                  className="group"
                >
                  Next: Brand Details
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
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Palette className="w-6 h-6 mr-2 text-orange-600" />
                Step 2: Brand & Platforms
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Brand Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Brand Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Colors (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="#FF6B35, #004E98"
                    value={formData.brandColors}
                    onChange={(e) => setFormData({ ...formData, brandColors: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Voice Tone */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Type className="inline w-4 h-4 mr-1" />
                  Voice Tone
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['professional', 'friendly', 'playful', 'bold'] as VoiceTone[]).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setFormData({ ...formData, voiceTone: tone })}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        formData.voiceTone === tone
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {tone.charAt(0).toUpperCase() + tone.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Platforms
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => togglePlatform('instagram')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.platforms.includes('instagram')
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Instagram className="w-6 h-6 mx-auto mb-1 text-pink-600" />
                    <span className="text-sm">Instagram</span>
                  </button>
                  <button
                    onClick={() => togglePlatform('linkedin')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.platforms.includes('linkedin')
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Linkedin className="w-6 h-6 mx-auto mb-1 text-blue-700" />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                  <button
                    onClick={() => togglePlatform('twitter')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.platforms.includes('twitter')
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Twitter className="w-6 h-6 mx-auto mb-1 text-sky-500" />
                    <span className="text-sm">Twitter/X</span>
                  </button>
                  <button
                    onClick={() => togglePlatform('facebook')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.platforms.includes('facebook')
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Facebook className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                    <span className="text-sm">Facebook</span>
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (to receive your content)
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
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
                  disabled={!formData.email || formData.platforms.length === 0}
                  className="group"
                >
                  Generate Content
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
              <Loader2 className="w-16 h-16 mx-auto mb-4 text-orange-600 animate-spin" />
              <h3 className="text-2xl font-bold mb-2">Cooking Your Content...</h3>
              <p className="text-gray-600">Our AI is crafting the perfect posts for your brand</p>
              <div className="mt-6 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}

          {step === 4 && generatedContent.length > 0 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
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
                        ? 'text-orange-600 border-b-2 border-orange-600'
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
                              ? 'bg-orange-600 text-white'
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
                        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-3 inline-block">
                          <span className="text-sm font-medium text-gray-800">
                            {content.variants[selectedVariant].cta}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {/* CTAs */}
              <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
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