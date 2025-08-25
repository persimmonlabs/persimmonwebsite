'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../Button'
import { SectionContainer } from '../SectionContainer'
import { ArrowRight, Sparkles } from 'lucide-react'

export const HeroSection: React.FC = () => {
  return (
    <SectionContainer className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-persimmon-peach/5 via-white to-persimmon-coral/5" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-persimmon rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full" />
              </div>
              <span className="font-display font-bold text-2xl">PersimmonLabs</span>
            </div>
          </div>

          {/* Main headline - broader vision */}
          <h1 className="font-display font-bold text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight">
            AI Agents That Run Your{' '}
            <span className="gradient-text">Business Operations</span>
          </h1>
          
          {/* Subheadline - current focus */}
          <p className="text-xl text-gray-600 mb-2 leading-relaxed max-w-2xl mx-auto">
            Starting with content automation. Expanding to everything.
          </p>
          
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Today: Social media posts. Tomorrow: Sales, support, operations.
          </p>

          {/* Simple CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="group">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary">
              View Roadmap
            </Button>
          </div>

          {/* Simple, honest metrics */}
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-persimmon-coral" />
                <span>Launching Q1 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-persimmon-coral" />
                <span>Early Access Open</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}