'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../Button'
import { SectionContainer } from '../SectionContainer'
import { ArrowRight, Calendar, Upload, Zap, Instagram, Linkedin, Twitter, Facebook, Mail, FileText } from 'lucide-react'

export const HeroSection: React.FC = () => {
  return (
    <SectionContainer className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-persimmon-orange/10 via-white to-persimmon-coral/10 animate-gradient" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main headline */}
          <h1 className="font-display font-bold text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight text-center">
            Your AI Content Team -{' '}
            <span className="gradient-text">Running 24/7 While You Sleep</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto text-center">
            We build custom n8n automations that handle your entire content workflow. 
            Upload once, publish everywhere, forever.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="group">
              Book Free Automation Audit
              <Calendar className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary">
              See Live Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Animated Flow Diagram */}
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              {/* Flow visualization */}
              <div className="flex items-center justify-between">
                {/* Source */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-persimmon-orange to-persimmon-coral rounded-xl flex items-center justify-center mb-2">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-sm font-medium">Upload Once</span>
                </motion.div>

                {/* Flow arrows */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex-1 px-4"
                >
                  <div className="relative h-2 bg-gradient-to-r from-persimmon-orange to-persimmon-coral rounded-full">
                    <motion.div
                      animate={{ x: [0, 100, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-persimmon-orange rounded-full shadow-lg"
                    />
                  </div>
                  <div className="flex items-center justify-center mt-2">
                    <div className="bg-persimmon-peach/20 px-3 py-1 rounded-full">
                      <span className="text-xs font-medium text-persimmon-red">AI Processing</span>
                    </div>
                  </div>
                </motion.div>

                {/* Destinations */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="grid grid-cols-3 gap-2"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                      <Instagram className="w-7 h-7 text-pink-600" />
                    </div>
                    <span className="text-xs">Instagram</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                      <Linkedin className="w-7 h-7 text-blue-700" />
                    </div>
                    <span className="text-xs">LinkedIn</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                      <Twitter className="w-7 h-7 text-sky-500" />
                    </div>
                    <span className="text-xs">Twitter/X</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                      <Facebook className="w-7 h-7 text-blue-600" />
                    </div>
                    <span className="text-xs">Facebook</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                      <Mail className="w-7 h-7 text-gray-600" />
                    </div>
                    <span className="text-xs">Newsletter</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                      <FileText className="w-7 h-7 text-green-600" />
                    </div>
                    <span className="text-xs">Blog</span>
                  </div>
                </motion.div>
              </div>

              {/* Status indicator */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 flex items-center justify-center"
              >
                <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Publishing Automatically 24/7</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}