'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Card } from '../Card'
import { Coffee, Home, ShoppingBag, Dumbbell, ArrowRight, TrendingUp } from 'lucide-react'

const useCases = [
  {
    icon: Coffee,
    industry: 'Restaurant',
    before: 'Posting randomly when remembered',
    after: 'Daily specials, happy hour reminders, automated menu showcases',
    metric: '3x engagement',
    example: 'A local cafe went from 2 posts/week to daily content, increasing foot traffic by 40%'
  },
  {
    icon: Home,
    industry: 'Real Estate Agent',
    before: 'Manual listing posts taking hours',
    after: 'Automatic property showcases with virtual tours',
    metric: '5x more leads',
    example: 'Agent Sarah automated her listings and closed 2 extra deals/month'
  },
  {
    icon: ShoppingBag,
    industry: 'E-commerce',
    before: 'Sporadic product updates',
    after: 'Daily product features, flash sales, customer testimonials',
    metric: '2.5x sales',
    example: 'Fashion boutique increased online sales by automating social commerce'
  },
  {
    icon: Dumbbell,
    industry: 'Coach/Consultant',
    before: 'Forgetting to share expertise',
    after: 'Thought leadership content on autopilot',
    metric: '10x reach',
    example: 'Fitness coach built 5K following in 3 months with consistent content'
  }
]

export const UseCasesSection: React.FC = () => {
  return (
    <SectionContainer className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
              Real Results for <span className="gradient-text">Real Businesses</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how businesses like yours transformed their content game with automation.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-persimmon-orange to-persimmon-coral rounded-xl flex items-center justify-center">
                      <useCase.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl">{useCase.industry}</h3>
                      <div className="flex items-center space-x-2 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-semibold">{useCase.metric}</span>
                      </div>
                    </div>
                  </div>

                  {/* Before/After Comparison */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-xs font-semibold text-red-600 mb-1">BEFORE</p>
                      <p className="text-sm text-gray-700">{useCase.before}</p>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-xs font-semibold text-green-600 mb-1">AFTER</p>
                      <p className="text-sm text-gray-700">{useCase.after}</p>
                    </div>
                  </div>

                  {/* Success Story */}
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 italic">&ldquo;{useCase.example}&rdquo;</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-persimmon-orange/10 to-persimmon-coral/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="font-display font-bold text-2xl mb-4">
              Your Industry Not Listed?
            </h3>
            <p className="text-gray-600 mb-6">
              We work with any business that needs consistent content. From law firms to yoga studios, 
              from SaaS startups to local services. If you create content, we can automate it.
            </p>
            <button className="bg-gradient-to-r from-persimmon-orange to-persimmon-coral text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300">
              Let&apos;s Discuss Your Use Case
            </button>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}