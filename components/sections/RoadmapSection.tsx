'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { 
  CheckCircle,
  Clock,
  Lock
} from 'lucide-react'

const roadmapPhases = [
  {
    phase: 'Phase 1',
    title: 'Content Automation',
    status: 'live',
    timeline: 'Now',
    description: 'AI-powered social media posts'
  },
  {
    phase: 'Phase 2',
    title: 'Smart Publishing',
    status: 'development',
    timeline: 'Q1 2025',
    description: 'Cross-platform scheduling & analytics'
  },
  {
    phase: 'Phase 3',
    title: 'Sales Automation',
    status: 'planned',
    timeline: 'Q2 2025',
    description: 'Lead generation & follow-ups'
  },
  {
    phase: 'Phase 4',
    title: 'Support Automation',
    status: 'planned',
    timeline: 'Q3 2025',
    description: 'Customer service AI agents'
  },
  {
    phase: 'Phase 5',
    title: 'Operations Suite',
    status: 'planned',
    timeline: 'Q4 2025',
    description: 'Complete business automation'
  },
  {
    phase: 'Phase 6',
    title: 'Platform APIs',
    status: 'planned',
    timeline: '2026',
    description: 'Build your own automations'
  }
]

export const RoadmapSection: React.FC = () => {
  return (
    <SectionContainer id="roadmap" className="bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
          Where we&apos;re{' '}
          <span className="gradient-text">going</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Content is just the beginning. We&apos;re building the operating system for modern business.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {roadmapPhases.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm font-semibold text-gray-500 mb-1">{phase.phase}</div>
                <h3 className="font-display font-bold text-lg">{phase.title}</h3>
              </div>
              <div className="flex items-center">
                {phase.status === 'live' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : phase.status === 'development' ? (
                  <Clock className="w-5 h-5 text-persimmon-coral animate-pulse" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{phase.description}</p>
            <div className="text-xs font-semibold text-persimmon-coral">{phase.timeline}</div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}