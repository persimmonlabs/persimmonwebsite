'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, Clock, Sparkles, TrendingUp, Users, Award, CheckCircle, ArrowRight } from 'lucide-react'

export const SocialProofSection: React.FC = () => {
  const capabilities = [
    { icon: Clock, title: 'Create Content While You Sleep', description: 'Wake up to 20+ ready-to-publish posts every morning', color: 'from-blue-500 to-cyan-500' },
    { icon: Sparkles, title: 'Never Lose Your Brand Voice', description: 'AI learns your style and maintains perfect consistency', color: 'from-purple-500 to-pink-500' },
    { icon: Zap, title: '10x Your Reach Instantly', description: 'One upload becomes posts for every major platform', color: 'from-green-500 to-emerald-500' },
    { icon: TrendingUp, title: 'Eliminate Content Stress Forever', description: 'Set once and never worry about posting again', color: 'from-orange-500 to-red-500' },
    { icon: Shield, title: 'Get Better Results Every Month', description: 'AI analyzes engagement and improves automatically', color: 'from-indigo-500 to-purple-500' },
    { icon: Award, title: 'Scale Without Hiring Anyone', description: 'Go from 10 posts to 1000 with the same effort', color: 'from-pink-500 to-rose-500' }
  ]

  return (
    <section className="py-32 px-4 bg-black relative overflow-hidden">
      {/* Background design */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-persimmon-coral/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-persimmon-orange/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass px-6 py-2 rounded-full mb-8 border-persimmon-coral/20">
            <Award className="w-4 h-4 text-persimmon-coral" />
            <span className="text-sm font-semibold text-persimmon-coral tracking-wider">LAUNCH PHASE</span>
          </div>

          {/* Headlines */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            How We Save You
            <span className="block gradient-text mt-2">20+ Hours Per Week</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Six intelligent systems working together to create, optimize, and publish content while you sleep.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="glass-dark rounded-2xl p-6 hover-lift hover-glow">
                  <div className={`w-14 h-14 mb-4 bg-gradient-to-r ${capability.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{capability.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{capability.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>


        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-dark rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              One System. Every Platform. Zero Effort.
            </h3>
            <p className="text-gray-400 mb-6">
              The only content automation platform that truly runs itself
            </p>
            <button 
              onClick={() => document.getElementById('demo-generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-persimmon-coral/40 transition-all duration-300 hover:scale-105"
            >
              Try Free Demo
              <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}