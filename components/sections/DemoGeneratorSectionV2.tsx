'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Link2, 
  Sparkles, 
  ArrowRight, 
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  Copy,
  Mail
} from 'lucide-react'

export const DemoGeneratorSection: React.FC = () => {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    uploadedFile: null as File | null,
    url: '',
    description: '',
    contentGoal: 'brand_awareness',
    brandName: '',
    email: ''
  })

  const [generatedContent, setGeneratedContent] = useState<any>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, uploadedFile: file })
    }
  }

  const generateContent = async () => {
    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedContent({
        instagram: "🚀 Introducing our latest innovation! We're transforming the way businesses handle content creation with AI-powered automation that works 24/7.\n\n✨ Upload once, publish everywhere\n⚡ Save 20+ hours per week\n🎯 Consistent brand voice\n\n#ContentAutomation #AIMarketing #SocialMediaStrategy",
        linkedin: "Ever wished you had a content team that never sleeps? 🌙\n\nOur AI understands your brand voice and creates engaging content that resonates with your audience.\n\n📈 3x engagement increase\n⏰ Post at optimal times automatically\n🎨 On-brand, every time\n\nBook a demo and see the magic ✨",
        twitter: "Stop spending hours on content creation. Start focusing on what matters.\n\nOur AI-powered platform handles everything from ideation to publishing.\n\n💡 Smart suggestions\n🔄 Auto repurposing\n📊 Performance analytics\n\nGet started in 60 seconds →"
      })
      setIsGenerating(false)
      setStep(3)
    }, 3000)
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const sendEmail = () => {
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <section id="demo-generator" className="py-24 px-4 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 glass px-6 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-persimmon-coral" />
            <span className="text-sm font-semibold text-white">LIVE DEMO - TRY IT NOW</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white">
            See The Magic In <span className="gradient-text">60 Seconds</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Upload your content, set your preferences, and watch as Persimmon creates perfect posts for every platform instantly.
          </p>
        </motion.div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-dark rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-bold mb-8 text-white">
                Step 1: Your Content Source
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Upload an Image
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-2xl p-8 text-center hover:border-persimmon-coral/50 transition-all bg-black/30 hover:bg-black/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                      <p className="text-sm text-gray-400">
                        {formData.uploadedFile ? formData.uploadedFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-600 mt-2">PNG, JPG up to 10MB</p>
                    </label>
                  </div>
                </div>

                {/* URL Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Or Paste a URL
                  </label>
                  <div className="relative">
                    <Link2 className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                    <input
                      type="url"
                      placeholder="https://example.com/article"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border border-gray-700 bg-black/30 text-white rounded-2xl focus:ring-2 focus:ring-persimmon-coral focus:border-transparent placeholder-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  What would you like to create?
                </label>
                <textarea
                  placeholder="E.g., Promote our new coffee blend launch, share a customer success story..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-4 border border-gray-700 bg-black/30 text-white rounded-2xl focus:ring-2 focus:ring-persimmon-coral focus:border-transparent placeholder-gray-600 resize-none"
                  rows={3}
                />
              </div>

              {/* Content Goal */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Content Goal
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'brand_awareness', label: 'Brand Awareness' },
                    { value: 'lead_generation', label: 'Lead Generation' },
                    { value: 'product_launch', label: 'Product Launch' },
                    { value: 'promotion', label: 'Promotion' }
                  ].map((goal) => (
                    <button
                      key={goal.value}
                      onClick={() => setFormData({ ...formData, contentGoal: goal.value })}
                      className={`px-4 py-3 rounded-xl border transition-all font-medium ${
                        formData.contentGoal === goal.value
                          ? 'border-persimmon-coral bg-persimmon-coral/10 text-persimmon-coral'
                          : 'border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-persimmon-coral/30 transition-all duration-300 hover:scale-105 flex items-center justify-center mx-auto group"
              >
                Next: Brand Details
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-dark rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-bold mb-8 text-white">
                Step 2: Brand Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-4 py-4 border border-gray-700 bg-black/30 text-white rounded-2xl focus:ring-2 focus:ring-persimmon-coral focus:border-transparent placeholder-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Email (to receive your content)
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 border border-gray-700 bg-black/30 text-white rounded-2xl focus:ring-2 focus:ring-persimmon-coral focus:border-transparent placeholder-gray-600"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-4 glass border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={generateContent}
                  disabled={!formData.email}
                  className="px-8 py-4 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-persimmon-coral/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  Generate Content
                  <Sparkles className="inline ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark rounded-3xl p-16 text-center max-w-4xl mx-auto"
            >
              <Loader2 className="w-16 h-16 mx-auto mb-6 text-persimmon-coral animate-spin" />
              <h3 className="text-2xl font-bold mb-3 text-white">Creating Your Content...</h3>
              <p className="text-gray-400">Our AI is crafting the perfect posts for your brand</p>
              <div className="mt-8 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-persimmon-coral rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-persimmon-coral rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-persimmon-coral rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}

          {step === 3 && generatedContent && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-dark rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <CheckCircle2 className="w-6 h-6 mr-3 text-green-500" />
                  Your Content is Ready!
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={sendEmail}
                    className="px-4 py-2 glass rounded-xl hover:bg-white/10 transition-all text-white text-sm font-medium"
                  >
                    {emailSent ? '✓ Sent!' : 'Email Me'}
                  </button>
                  <button className="px-4 py-2 glass rounded-xl hover:bg-white/10 transition-all text-white text-sm font-medium">
                    Download All
                  </button>
                </div>
              </div>

              {/* Generated Content Display */}
              <div className="space-y-6">
                {Object.entries(generatedContent).map(([platform, content], index) => (
                  <div key={platform} className="bg-black/30 rounded-2xl p-6 border border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-white capitalize">{platform}</h4>
                      <button
                        onClick={() => copyToClipboard(content as string, index)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all"
                      >
                        {copiedIndex === index ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                      {content as string}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 p-6 bg-gradient-to-r from-persimmon-coral/10 to-persimmon-orange/10 rounded-2xl border border-persimmon-coral/20">
                <h4 className="text-lg font-bold mb-2 text-white">Ready to automate your content?</h4>
                <p className="text-gray-400 mb-4">
                  This is just a taste. Get content like this every day, automatically.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-persimmon-coral/30 transition-all">
                  Start 7-Day Free Trial
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}