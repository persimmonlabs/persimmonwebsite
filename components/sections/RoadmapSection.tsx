'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { 
  Sparkles, 
  Video, 
  BarChart3, 
  Briefcase, 
  Store,
  Zap,
  Lock,
  CheckCircle,
  Clock,
  Rocket
} from 'lucide-react'
import { cn } from '@/lib/utils'

const roadmapPhases = [
  {
    phase: 1,
    title: 'Core Content Engine',
    status: 'live',
    timeline: 'Available Now',
    icon: Zap,
    color: 'from-green-500 to-emerald-600',
    features: [
      'AI-powered post generation',
      'Brand voice customization',
      'Asset library management',
      'Simple dashboard & export'
    ]
  },
  {
    phase: 2,
    title: 'Smart Publishing',
    status: 'development',
    timeline: 'Q1 2025',
    icon: Rocket,
    color: 'from-persimmon-coral to-persimmon-orange',
    features: [
      'Cross-platform repurposing',
      'Auto content calendar',
      'Platform integrations (LinkedIn, IG, FB, X)',
      'A/B testing variants'
    ]
  },
  {
    phase: 3,
    title: 'Intelligence Layer',
    status: 'coming',
    timeline: 'Q2-Q3 2025',
    icon: BarChart3,
    color: 'from-purple-500 to-indigo-600',
    features: [
      'Brand fine-tuning on your content',
      'Persona-targeted variations',
      'Performance-based re-posting',
      'Competitor & SEO analysis'
    ]
  },
  {
    phase: 4,
    title: 'Multimedia Expansion',
    status: 'coming',
    timeline: 'Q4 2025',
    icon: Video,
    color: 'from-blue-500 to-cyan-600',
    features: [
      'Short-form video generation',
      'Webinar to highlights clipping',
      'AI-powered infographics',
      'Interactive post creation'
    ]
  },
  {
    phase: 5,
    title: 'Business Ops Suite',
    status: 'coming',
    timeline: '2026',
    icon: Briefcase,
    color: 'from-amber-500 to-orange-600',
    features: [
      'Sales automation & follow-ups',
      'Customer support AI replies',
      'Meeting notes & project management',
      'E-commerce workflows'
    ]
  },
  {
    phase: 6,
    title: 'Platform & Marketplace',
    status: 'coming',
    timeline: 'Future',
    icon: Store,
    color: 'from-pink-500 to-rose-600',
    features: [
      'White-label agency mode',
      'Template marketplace',
      'Developer API platform',
      'Community & ecosystem'
    ]
  }
]

export const RoadmapSection: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState(1)
  const selected = roadmapPhases.find(p => p.phase === selectedPhase)!

  return (
    <SectionContainer id="roadmap" className="bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center space-x-2 bg-persimmon-peach/20 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-persimmon-coral" />
          <span className="text-sm font-semibold text-persimmon-red">Product Roadmap</span>
        </div>
        <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
          The Future of{' '}
          <span className="gradient-text">Content Automation</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We\'re building the most comprehensive content automation platform ever created. 
          Join us early and shape the future.
        </p>
      </motion.div>

      {/* Timeline Navigation */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
          {roadmapPhases.map((phase, index) => (
            <motion.button
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => setSelectedPhase(phase.phase)}
              className={cn(
                'relative px-4 py-3 rounded-xl transition-all',
                selectedPhase === phase.phase
                  ? 'bg-white shadow-lg scale-105'
                  : 'hover:bg-white/50'
              )}
            >
              <div className="flex items-center space-x-2">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold',
                  phase.status === 'live' 
                    ? 'bg-green-500' 
                    : phase.status === 'development'
                    ? 'bg-persimmon-coral'
                    : 'bg-gray-400'
                )}>
                  {phase.status === 'live' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : phase.status === 'development' ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Phase {phase.phase}</div>
                  <div className="text-xs text-gray-600 hidden sm:block">{phase.title}</div>
                </div>
              </div>
              {phase.status === 'live' && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  LIVE
                </div>
              )}
              {phase.status === 'development' && (
                <div className="absolute -top-2 -right-2 bg-persimmon-coral text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                  IN DEV
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Selected Phase Details */}
      <motion.div
        key={selectedPhase}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className={cn(
            'p-8 lg:p-12 text-white bg-gradient-to-br',
            selected.color
          )}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <selected.icon className="w-8 h-8" />
                  <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
                    Phase {selected.phase} • {selected.timeline}
                  </span>
                </div>
                <h3 className="font-display font-bold text-3xl lg:text-4xl mb-3">
                  {selected.title}
                </h3>
                <div className="flex items-center space-x-4">
                  {selected.status === 'live' && (
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">Available Now</span>
                    </div>
                  )}
                  {selected.status === 'development' && (
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 animate-pulse" />
                      <span className="text-sm font-semibold">Coming Soon</span>
                    </div>
                  )}
                  {selected.status === 'coming' && (
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm font-semibold">Planned</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {selected.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <span className="text-sm leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Early Access CTA */}
          {selected.status !== 'live' && (
            <div className="p-8 bg-gradient-to-r from-persimmon-peach/10 to-persimmon-coral/10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    {selected.status === 'development' 
                      ? '🚀 Get Early Access' 
                      : '🔔 Get Notified When Ready'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {selected.status === 'development'
                      ? 'Be among the first to try these features. Limited spots available.'
                      : 'Join the waitlist and be first to know when this launches.'}
                  </p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-semibold rounded-lg hover:shadow-lg transition-all whitespace-nowrap">
                  {selected.status === 'development' ? 'Request Early Access' : 'Join Waitlist'}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 max-w-3xl mx-auto"
      >
        <div className="text-center mb-4">
          <span className="text-sm font-semibold text-gray-600">Overall Platform Progress</span>
        </div>
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '25%' }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-persimmon-coral to-persimmon-orange"
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>MVP Launch</span>
          <span>Full Platform</span>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-gray-600 mb-4">
          Want to influence our roadmap? Early customers get direct access to our product team.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-semibold rounded-lg hover:shadow-xl transition-all text-lg">
          Become a Founding Customer
        </button>
      </motion.div>
    </SectionContainer>
  )
}