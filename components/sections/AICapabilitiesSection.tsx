'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, FileText, Mail, Calendar, TrendingUp, BarChart3, Zap, Bot } from 'lucide-react'

export const AICapabilitiesSection: React.FC = () => {
  const capabilities = [
    {
      icon: FileText,
      title: 'Writes blog posts while you sleep',
      description: 'Wake up to fresh, SEO-optimized content ready to publish',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Creates social content during meetings',
      description: 'Stay present while AI handles your social presence',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Mail,
      title: 'Designs email campaigns over weekends',
      description: 'Monday morning campaigns ready without Sunday work',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Calendar,
      title: 'Schedules posts for optimal engagement',
      description: 'Hit peak times across all time zones automatically',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: TrendingUp,
      title: 'Responds to trends in real-time',
      description: 'Never miss a viral moment or industry shift',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: BarChart3,
      title: 'A/B tests everything automatically',
      description: 'Continuous optimization without manual analysis',
      gradient: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-persimmon-coral/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass px-6 py-2 rounded-full mb-8 border-persimmon-coral/20">
            <Bot className="w-4 h-4 text-persimmon-coral" />
            <span className="text-sm font-semibold text-persimmon-coral tracking-wider">AI CAPABILITIES</span>
          </div>

          {/* Headlines */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            Your AI Team That
            <span className="block gradient-text mt-2">Never Stops</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Six intelligent agents working 24/7 to create, optimize, and distribute your content
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="glass-dark rounded-3xl p-8 h-full hover-lift hover-glow">
                  {/* Icon */}
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-r ${capability.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {capability.description}
                  </p>

                  {/* Hover effect line */}
                  <div className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${capability.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}