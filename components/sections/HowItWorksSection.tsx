'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Upload, Sparkles, Send, Calendar } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Content',
    description: 'Drop images, paste URLs, or describe what you need'
  },
  {
    icon: Sparkles,
    title: 'AI Creates Variants',
    description: 'Get 3 professional versions optimized for each platform'
  },
  {
    icon: Send,
    title: 'Review & Approve',
    description: 'Quick approval workflow or let it run automatically'
  },
  {
    icon: Calendar,
    title: 'Publish Everywhere',
    description: 'Content posts automatically across all your platforms'
  }
]

export const HowItWorksSection: React.FC = () => {
  return (
    <SectionContainer className="py-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Four simple steps to content automation paradise
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-orange-600" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-200 to-red-200" />
                )}
              </div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          )
        })}
      </div>
    </SectionContainer>
  )
}