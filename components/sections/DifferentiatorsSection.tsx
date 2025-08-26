'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Brain, Globe, Settings2, TrendingUp, Rocket, CheckCircle, ArrowRight } from 'lucide-react'

export const DifferentiatorsSection: React.FC = () => {
  const differentiators = [
    {
      number: '01',
      title: 'Intelligent Creation',
      description: 'Creates original content, not templates. Every piece is unique, engaging, and tailored to your audience.',
      icon: Brain,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      number: '02',
      title: 'Brand Memory',
      description: 'Learns your voice, style, and messaging perfectly. Consistency across every piece of content.',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'Multi-Channel Native',
      description: 'Optimized for each platform, not copy-paste. LinkedIn posts, Twitter threads, Instagram captions - all native.',
      icon: Globe,
      color: 'from-green-500 to-emerald-500'
    },
    {
      number: '04',
      title: 'Zero Management',
      description: 'Runs completely autonomous, no babysitting required. Set it up once, let it run forever.',
      icon: Settings2,
      color: 'from-orange-500 to-red-500'
    },
    {
      number: '05',
      title: 'Always Improving',
      description: 'Gets smarter with every piece of content. Learning from engagement, refining approach.',
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      number: '06',
      title: 'Instant Scale',
      description: 'From 10 to 1000 pieces without hiring anyone. Scale your content as fast as your ambition.',
      icon: Rocket,
      color: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <section className="py-32 px-4 bg-black relative overflow-hidden">
      {/* Background design */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-persimmon-coral/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-persimmon-orange/5 rounded-full blur-[100px]" />
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
            <CheckCircle className="w-4 h-4 text-persimmon-coral" />
            <span className="text-sm font-semibold text-persimmon-coral tracking-wider">KEY DIFFERENTIATORS</span>
          </div>

          {/* Headlines */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            What Makes Persimmon
            <span className="block gradient-text mt-2">Different</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Not just another AI tool - a complete content automation ecosystem
          </p>
        </motion.div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {differentiators.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="glass-dark rounded-3xl p-8 h-full hover-lift relative overflow-hidden">
                  {/* Number background */}
                  <div className="absolute top-4 right-4 text-8xl font-bold text-white/5">
                    {item.number}
                  </div>
                  
                  {/* Icon and number */}
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-persimmon-coral font-bold text-lg">{item.number}</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed relative z-10">
                    {item.description}
                  </p>

                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Tagline & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-dark rounded-3xl p-12 max-w-4xl mx-auto mb-12">
            <h3 className="text-4xl font-bold text-white mb-6">
              One system. Every platform. Zero effort.
            </h3>
            <p className="text-xl text-gray-400 mb-8">
              The only content automation platform that truly runs itself
            </p>
            <button 
              onClick={() => document.getElementById('demo-generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-10 py-5 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-persimmon-coral/40 transition-all duration-300 hover:scale-105"
            >
              See It In Action
              <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-gray-500 text-sm">
              60-second demo • No credit card required
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}