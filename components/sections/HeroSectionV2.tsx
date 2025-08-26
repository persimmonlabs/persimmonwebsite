'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Clock, Users, Sparkles } from 'lucide-react'

export const HeroSection: React.FC = () => {
  const scrollToDemo = () => {
    document.getElementById('demo-generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  const bookCall = () => {
    window.open('https://calendly.com/persimmon-labs/strategy', '_blank')
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
          {/* Agency Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center justify-center mb-8"
          >
            <div className="glass px-6 py-2 rounded-full border-persimmon-coral/20">
              <span className="text-persimmon-coral font-semibold text-sm tracking-wider">AI-POWERED CONTENT AGENCY</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-tight leading-[0.9]"
          >
            <span className="block">We Build Your</span>
            <span className="block gradient-text mt-2">Content Automation System</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Done-for-you AI content systems that generate 100+ posts monthly.
            <span className="block mt-2 text-white">No tech skills needed. We handle everything.</span>
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
              <h3 className="text-white font-semibold text-lg mb-2">Live in 72 Hours</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Complete setup and first posts publishing within 3 days</p>
            </div>

            <div className="glass-dark rounded-2xl p-8 hover-lift group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-persimmon-coral/20 to-persimmon-orange/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-persimmon-coral" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">White-Glove Service</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Dedicated team handles everything from strategy to execution</p>
            </div>

            <div className="glass-dark rounded-2xl p-8 hover-lift group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-persimmon-coral/20 to-persimmon-orange/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-persimmon-coral" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Dashboard Coming Q2</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Join the pilot program for early access to our control panel</p>
            </div>
          </motion.div>

          {/* Dual CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <button
              onClick={bookCall}
              className="group relative px-10 py-5 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-persimmon-coral/40 transition-all duration-300 hover:scale-105 animate-pulse-glow"
            >
              <span className="flex items-center justify-center">
                <Phone className="mr-3 w-5 h-5" />
                Book Strategy Call
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button
              onClick={scrollToDemo}
              className="group relative px-10 py-5 bg-gray-800 text-white font-bold text-lg rounded-2xl hover:bg-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700"
            >
              <span className="flex items-center justify-center">
                Try 60-Second Demo
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
              ✨ Done-for-you setup • 📊 100+ posts monthly • 🚀 30-day money back guarantee
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}