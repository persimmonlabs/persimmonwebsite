'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../Card'
import { SectionContainer } from '../SectionContainer'
import { 
  Zap, 
  Brain, 
  TrendingUp,
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Zero Work',
    description: 'Upload assets. We handle everything else.',
    color: 'text-persimmon-orange'
  },
  {
    icon: Brain,
    title: 'Actually Smart',
    description: 'Learns your brand. Improves over time.',
    color: 'text-persimmon-coral'
  },
  {
    icon: TrendingUp,
    title: 'Real Results',
    description: 'A/B tests everything. Only posts winners.',
    color: 'text-persimmon-red'
  }
]

export const FeaturesSection: React.FC = () => {
  return (
    <SectionContainer id="features" className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
          What makes us{' '}
          <span className="gradient-text">different</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-persimmon-peach/10 to-persimmon-coral/10 mb-4`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}