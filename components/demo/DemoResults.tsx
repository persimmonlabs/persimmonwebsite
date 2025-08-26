'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Copy, Download, Send, Star, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react'
import type { Platform } from './DemoForm'

export interface GeneratedContent {
  platform: Platform
  variants: Array<{
    caption: string
    hashtags: string[]
    imageUrl?: string
    cta?: string
  }>
}

interface DemoResultsProps {
  generatedContent: GeneratedContent[]
  onReset: () => void
  onEmailSend?: (email: string) => void
}

const platformIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook
}

export const DemoResults: React.FC<DemoResultsProps> = ({
  generatedContent,
  onReset,
  onEmailSend
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(generatedContent[0]?.platform || 'instagram')
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [copiedVariant, setCopiedVariant] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedVariant(id)
    setTimeout(() => setCopiedVariant(null), 2000)
  }

  const handleEmailSend = () => {
    if (email && onEmailSend) {
      onEmailSend(email)
      setEmailSent(true)
      setTimeout(() => setEmailSent(false), 3000)
    }
  }

  const currentContent = generatedContent.find(c => c.platform === selectedPlatform)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <CheckCircle2 className="w-8 h-8 text-green-500 mr-3" />
          Your Content is Ready!
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              const content = currentContent?.variants[selectedVariant]
              if (content) {
                handleCopy(
                  `${content.caption}\n\n${content.hashtags.join(' ')}\n\n${content.cta || ''}`,
                  'all'
                )
              }
            }}
            className="p-2 bg-brand-dark/20 rounded-lg hover:bg-brand-dark/30 transition-colors group relative"
          >
            <Copy className="w-5 h-5 text-gray-300" />
            {copiedVariant === 'all' && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                Copied!
              </span>
            )}
          </button>
          <button className="p-2 bg-brand-dark/20 rounded-lg hover:bg-brand-dark/30 transition-colors">
            <Download className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {generatedContent.map((content) => {
          const Icon = platformIcons[content.platform]
          return (
            <button
              key={content.platform}
              onClick={() => {
                setSelectedPlatform(content.platform)
                setSelectedVariant(0)
              }}
              className={`flex items-center px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                selectedPlatform === content.platform
                  ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg'
                  : 'bg-brand-dark/20 text-gray-300 hover:bg-brand-dark/30'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
            </button>
          )
        })}
      </div>

      {/* Content Display */}
      {currentContent && (
        <div className="space-y-4">
          {/* Variant Selector */}
          <div className="flex gap-2">
            {currentContent.variants.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(index)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  selectedVariant === index
                    ? 'bg-brand-primary text-white'
                    : 'bg-brand-dark/20 text-gray-300 hover:bg-brand-dark/30'
                }`}
              >
                Variant {index + 1}
              </button>
            ))}
          </div>

          {/* Content Preview */}
          <motion.div
            key={`${selectedPlatform}-${selectedVariant}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-brand-dark/10 border border-brand-wine/20 rounded-xl p-6"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-200 whitespace-pre-wrap">
                {currentContent.variants[selectedVariant].caption}
              </p>
              {currentContent.variants[selectedVariant].cta && (
                <p className="text-brand-primary font-semibold mt-4">
                  {currentContent.variants[selectedVariant].cta}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                {currentContent.variants[selectedVariant].hashtags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-brand-accent text-sm cursor-pointer hover:text-brand-primary transition-colors"
                    onClick={() => handleCopy(tag, `tag-${i}`)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Email CTA */}
          <div className="bg-gradient-to-r from-brand-dark to-persimmon-red/20 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-3">
              Want this content delivered to your inbox?
            </h4>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 border border-brand-wine/30 bg-brand-dark/20 text-white rounded-lg focus:ring-2 focus:ring-persimmon-coral focus:border-transparent placeholder-gray-500"
              />
              <button
                onClick={handleEmailSend}
                disabled={!email || emailSent}
                className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-persimmon-coral/30 transition-all disabled:opacity-50"
              >
                {emailSent ? (
                  <>
                    <CheckCircle2 className="inline w-4 h-4 mr-1" />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send className="inline w-4 h-4 mr-1" />
                    Send
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={onReset}
              className="flex-1 px-6 py-3 border-2 border-brand-wine/30 text-gray-300 font-semibold rounded-xl hover:border-brand-primary/50 hover:bg-brand-dark/20 transition-all"
            >
              Try Another
            </button>
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-persimmon-coral/30 transition-all transform hover:scale-105">
              Start Free Trial
              <Star className="inline ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}