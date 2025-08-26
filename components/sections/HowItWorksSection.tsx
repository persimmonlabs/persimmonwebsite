'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Sparkles, Users, Rocket, BarChart3, Shield, Zap } from 'lucide-react'

const steps = [
  {
    icon: Users,
    title: "1. Strategy Call",
    description: "We analyze your brand, content goals, and target audience to create a custom automation strategy.",
    highlight: "15-minute consultation"
  },
  {
    icon: Zap,
    title: "2. We Build Your System",
    description: "Our team configures your AI workflows, trains on your brand voice, and sets up multi-platform publishing.",
    highlight: "48-hour setup"
  },
  {
    icon: Rocket,
    title: "3. Launch & Optimize",
    description: "Your content starts publishing automatically while we monitor, optimize, and ensure quality.",
    highlight: "Live in 3 days"
  },
  {
    icon: BarChart3,
    title: "4. Scale & Dashboard Access",
    description: "Track performance, adjust strategies, and soon access your personal dashboard (pilot program).",
    highlight: "Dashboard coming Q2 2025"
  }
]

export const HowItWorksSection: React.FC = () => {
  return (
    <SectionContainer className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-persimmon-coral/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-persimmon-orange/10 rounded-full blur-[120px]" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-persimmon-coral/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-persimmon-coral/20">
            <Sparkles className="w-4 h-4 text-persimmon-coral" />
            <span className="text-sm font-semibold text-persimmon-coral">HOW IT WORKS</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            From Strategy Call to 
            <span className="gradient-text"> Automated Content</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We handle everything. No technical setup, no learning curve. 
            Your custom content automation system is live in 72 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass-dark rounded-2xl p-6 hover-lift h-full border border-gray-800 hover:border-persimmon-coral/50 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-persimmon-coral/20 to-persimmon-orange/20 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-persimmon-coral" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{step.description}</p>
                  <div className="inline-flex items-center px-3 py-1 bg-persimmon-coral/10 rounded-full">
                    <span className="text-xs font-semibold text-persimmon-coral">{step.highlight}</span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-700">
                    →
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Shield className="w-8 h-8 text-persimmon-coral mx-auto mb-3" />
              <h4 className="font-bold text-white mb-1">White-Glove Service</h4>
              <p className="text-gray-400 text-sm">Dedicated success manager for setup and optimization</p>
            </div>
            <div>
              <Zap className="w-8 h-8 text-persimmon-coral mx-auto mb-3" />
              <h4 className="font-bold text-white mb-1">No Tech Skills Needed</h4>
              <p className="text-gray-400 text-sm">We handle all technical configuration and integration</p>
            </div>
            <div>
              <BarChart3 className="w-8 h-8 text-persimmon-coral mx-auto mb-3" />
              <h4 className="font-bold text-white mb-1">Results Guaranteed</h4>
              <p className="text-gray-400 text-sm">30-day money back if you don't see 10x content output</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}