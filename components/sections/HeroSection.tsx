'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Clock, DollarSign, Settings } from 'lucide-react'
import Image from 'next/image'

export const HeroSection: React.FC = () => {
  const scrollToDemo = () => {
    document.getElementById('demo-generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden bg-black">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-brand-primary/20 via-transparent to-transparent blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <Image src="/logo.svg" alt="Persimmon Labs" width={80} height={80} />
          </motion.div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Your AI Content Team
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
              Running 24/7 While You Sleep
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light">
            Automated content systems that work harder than any human team.
          </p>

          {/* Key value props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
            >
              <Settings className="w-8 h-8 text-brand-primary mb-3" />
              <h3 className="text-white font-semibold mb-2">Set up once, runs forever</h3>
              <p className="text-gray-400 text-sm">Automated workflows that never need manual intervention</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
            >
              <Clock className="w-8 h-8 text-brand-primary mb-3" />
              <h3 className="text-white font-semibold mb-2">Posts while you sleep</h3>
              <p className="text-gray-400 text-sm">24/7 content distribution across all platforms</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
            >
              <DollarSign className="w-8 h-8 text-brand-primary mb-3" />
              <h3 className="text-white font-semibold mb-2">Fraction of the cost</h3>
              <p className="text-gray-400 text-sm">Save 80% compared to agencies and VAs</p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={scrollToDemo}
              className="group px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-brand-primary/50 transition-all duration-300"
            >
              <span className="flex items-center justify-center">
                Try Free Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <a
              href="#dashboard"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Dashboard Coming Q2 2026
            </a>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-gray-500 text-sm"
          >
            <p>Custom-built for your brand • AI trained on your voice</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}