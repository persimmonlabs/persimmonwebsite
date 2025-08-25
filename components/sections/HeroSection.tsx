'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../Button'
import { SectionContainer } from '../SectionContainer'
import { ArrowRight, Play } from 'lucide-react'

export const HeroSection: React.FC = () => {
  return (
    <SectionContainer className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-persimmon-peach rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-persimmon-coral rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-persimmon-orange rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-4000" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{}}
        >
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 gradient-persimmon rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full" />
            </div>
            <span className="font-display font-bold text-2xl">PersimmonLabs</span>
          </div>
          
          <h1 className="font-display font-bold text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight">
            Your Brand's Content Team,{' '}
            <span className="gradient-text">On Autopilot.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We create, schedule, and publish high-quality posts across Instagram, 
            LinkedIn, Facebook, and Twitter/X — so you stay consistent, on-brand, 
            and top-of-mind with your audience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="group">
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary" className="group">
              <Play className="mr-2 h-5 w-5" />
              See Examples
            </Button>
          </div>

          <div className="mt-12 flex items-center space-x-8">
            <div>
              <div className="text-3xl font-bold gradient-text">24/7</div>
              <div className="text-sm text-gray-600">Content Engine</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">4+</div>
              <div className="text-sm text-gray-600">Platforms Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">100%</div>
              <div className="text-sm text-gray-600">On-Brand Voice</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
          style={{}}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="gradient-bg-animated p-1">
              <div className="bg-white rounded-xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-600">AI generating content...</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="h-2 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-2 bg-gray-200 rounded animate-pulse mb-2 w-4/5" />
                    <div className="h-2 bg-gray-200 rounded animate-pulse w-3/5" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="h-32 bg-gradient-to-br from-persimmon-peach/20 to-persimmon-coral/20 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}