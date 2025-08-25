'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Clock, TrendingDown, Moon, DollarSign, CheckCircle, Zap, RefreshCw, PiggyBank } from 'lucide-react'

export const ProblemSolutionSection: React.FC = () => {
  const problems = [
    {
      icon: Clock,
      title: "20+ hours/week on content",
      description: "Manually creating and posting content across multiple platforms"
    },
    {
      icon: TrendingDown,
      title: "Inconsistent posting schedule",
      description: "Missing peak engagement times, losing momentum"
    },
    {
      icon: Moon,
      title: "Missing opportunities while sleeping",
      description: "Your competitors are posting 24/7, you're not"
    },
    {
      icon: DollarSign,
      title: "$3-5k/month for social media managers",
      description: "Expensive agencies that still require your input"
    }
  ]

  const solutions = [
    {
      icon: Zap,
      title: "Set up once, runs forever",
      description: "Automated workflows that never need manual intervention"
    },
    {
      icon: RefreshCw,
      title: "Posts while you sleep",
      description: "24/7 content distribution across all platforms"
    },
    {
      icon: PiggyBank,
      title: "Fraction of the cost",
      description: "Save 80% compared to agencies and VAs"
    },
    {
      icon: CheckCircle,
      title: "Custom-built for your brand",
      description: "AI trained on your voice, style, and messaging"
    }
  ]

  return (
    <SectionContainer className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Problem Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <span className="text-persimmon-red font-semibold text-sm uppercase tracking-wider">The Problem</span>
              <h2 className="text-4xl font-display font-bold mt-2 mb-4">Your Current State</h2>
              <p className="text-gray-600">You're drowning in content tasks that eat up your time and money.</p>
            </div>
            
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 bg-red-50 rounded-xl border border-red-100"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <problem.icon className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{problem.title}</h3>
                    <p className="text-sm text-gray-600">{problem.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solution Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">The Solution</span>
              <h2 className="text-4xl font-display font-bold mt-2 mb-4">With Persimmon Labs</h2>
              <p className="text-gray-600">Automated content systems that work harder than any human team.</p>
            </div>
            
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-100"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <solution.icon className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{solution.title}</h3>
                    <p className="text-sm text-gray-600">{solution.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Transformation Arrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-4 bg-gradient-to-r from-persimmon-orange to-persimmon-coral text-white px-8 py-4 rounded-full">
            <span className="font-semibold">Transform your content workflow in 5 days</span>
            <Zap className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}