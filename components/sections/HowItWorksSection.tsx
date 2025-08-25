'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Upload, Wand2, CheckCircle2, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Share Your Assets',
    description: 'Upload brand photos, product images, or let AI generate new visuals. Add your guidelines for perfect voice matching.',
    color: 'from-persimmon-peach to-persimmon-coral'
  },
  {
    number: '02',
    icon: Wand2,
    title: 'We Create Content',
    description: 'AI generates posts, captions, carousels, and stories. Each piece optimized for its platform.',
    color: 'from-persimmon-coral to-persimmon-orange'
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'You Approve or Edit',
    description: 'Review via dashboard or Slack. Quick approve, edit, or reject. Set to auto-publish if you prefer hands-off.',
    color: 'from-persimmon-orange to-persimmon-red'
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Automatic Publishing',
    description: 'Posts go live at optimal times. Track performance, A/B test captions, and watch your engagement grow.',
    color: 'from-persimmon-red to-persimmon-burgundy'
  }
]

export const HowItWorksSection: React.FC = () => {
  return (
    <SectionContainer id="how-it-works">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center space-x-2 bg-persimmon-peach/20 px-4 py-2 rounded-full mb-4">
          <Wand2 className="w-4 h-4 text-persimmon-coral" />
          <span className="text-sm font-semibold text-persimmon-red">Simple Process</span>
        </div>
        <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
          How PersimmonLabs{' '}
          <span className="gradient-text">Works</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Four simple steps to transform your content strategy. 
          Get started in minutes, see results in hours.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-persimmon-peach via-persimmon-coral to-persimmon-red opacity-20 hidden lg:block" />
        
        <div className="grid lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} p-0.5 mb-4`}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-persimmon-coral" />
                  </div>
                </div>
                <div className="text-sm font-bold text-persimmon-coral mb-2">{step.number}</div>
                <h3 className="font-display font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-persimmon-coral/30">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M12 8L20 16L12 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-display font-bold text-3xl mb-4">
              See PersimmonLabs in action
            </h3>
            <p className="text-gray-600 mb-6">
              Watch how a local café increased their social media engagement by 300% 
              in just 30 days using PersimmonLabs.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-persimmon-coral mt-0.5" />
                <div>
                  <div className="font-semibold">Daily posts across 5 platforms</div>
                  <div className="text-sm text-gray-600">Instagram, Facebook, Twitter, LinkedIn, TikTok</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-persimmon-coral mt-0.5" />
                <div>
                  <div className="font-semibold">100% on-brand content</div>
                  <div className="text-sm text-gray-600">Perfectly matched voice and visuals</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-persimmon-coral mt-0.5" />
                <div>
                  <div className="font-semibold">10 hours saved weekly</div>
                  <div className="text-sm text-gray-600">Focus on serving customers, not social media</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-persimmon-peach to-persimmon-coral rounded-2xl flex items-center justify-center group cursor-pointer hover:shadow-2xl transition-all">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-persimmon-coral ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 max-w-xs">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-persimmon-peach rounded-full" />
                <div>
                  <div className="font-semibold text-sm">JaboCafé</div>
                  <div className="text-xs text-gray-600">@jabocafe</div>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                "Our new latte art is getting so much love! ☕✨"
              </div>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>❤️ 2.3k</span>
                <span>💬 148</span>
                <span>↗️ 89</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  )
}