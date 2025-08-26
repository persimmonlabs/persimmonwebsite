'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Clock, DollarSign, Sparkles } from 'lucide-react'
import Image from 'next/image'

export const HeroSection: React.FC = () => {
  const scrollToDemo = () => {
    document.getElementById('demo-generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-persimmon-coral/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-persimmon-orange/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-persimmon-red/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Beta Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center justify-center mb-8"
          >
            <div className="glass px-6 py-2 rounded-full border-persimmon-coral/20">
              <span className="text-persimmon-coral font-semibold text-sm tracking-wider">BETA</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-tight leading-[0.9]"
          >
            <span className="block">Turn 1 Blog Post Into</span>
            <span className="block gradient-text mt-2">100 Social Media Posts</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Never write social content again. Our AI creates unique posts for every platform, 
            <span className="block mt-2 text-white">learns your brand voice, and publishes automatically.</span>
          </motion.p>

          {/* Value props */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-16"
          >
            <div className="glass-dark rounded-2xl p-8 hover-lift group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-persimmon-coral/20 to-persimmon-orange/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-persimmon-coral" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Save 20+ Hours/Week</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Stop writing captions and focus on growing your business</p>
            </div>

            <div className="glass-dark rounded-2xl p-8 hover-lift group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-persimmon-coral/20 to-persimmon-orange/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-persimmon-coral" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">10x Your Content Output</h3>
              <p className="text-gray-400 text-sm leading-relaxed">From 1 post per week to 50+ posts automatically</p>
            </div>

            <div className="glass-dark rounded-2xl p-8 hover-lift group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-persimmon-coral/20 to-persimmon-orange/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <DollarSign className="w-7 h-7 text-persimmon-coral" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Replace $5,000/mo Writer</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Get consistent content for a fraction of the cost</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center items-center"
          >
            <button
              onClick={scrollToDemo}
              className="group relative px-10 py-5 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-persimmon-coral/40 transition-all duration-300 hover:scale-105 animate-pulse-glow"
            >
              <span className="flex items-center justify-center">
                Try Free Demo
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <p className="text-gray-500 text-sm tracking-wide">
              🎯 60-second demo • ✅ No credit card required • 🚀 Works with any content
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}