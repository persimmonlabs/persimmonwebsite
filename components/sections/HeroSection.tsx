'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, Zap } from 'lucide-react'

export const HeroSection: React.FC = () => {
  const scrollToDemo = () => {
    document.getElementById('demo-generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 pt-20 pb-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50 -z-10" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-red-200/20 to-orange-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-gray-800">AI-Powered Content Automation</span>
            <Zap className="w-4 h-4 text-red-600" />
          </motion.div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Turn One Upload Into
            <span className="block mt-2 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
              Weeks of Content
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Try it free in 60 seconds. Upload an image or URL, get 3 professional social posts instantly.
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToDemo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="flex items-center space-x-2">
              <span>Try Free Demo Now</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </motion.button>

          {/* Trust indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500"
          >
            <span className="flex items-center space-x-1">
              <span className="text-green-600">✓</span>
              <span>No credit card required</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="text-green-600">✓</span>
              <span>60-second setup</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="text-green-600">✓</span>
              <span>Real AI generation</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Animated arrow pointing down */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </div>
    </section>
  )
}