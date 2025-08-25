'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Upload, Wand2, Rocket } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: Upload,
    title: 'Upload',
    description: 'Your photos, brand guide, or nothing at all.',
  },
  {
    number: '2',
    icon: Wand2,
    title: 'Generate',
    description: 'AI creates posts optimized for each platform.',
  },
  {
    number: '3',
    icon: Rocket,
    title: 'Publish',
    description: 'Auto-post or review first. Your choice.',
  }
]

export const HowItWorksSection: React.FC = () => {
  return (
    <SectionContainer id="how-it-works" className="bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
          Three steps to{' '}
          <span className="gradient-text">freedom</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4">
              <step.icon className="w-8 h-8 text-persimmon-coral" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}