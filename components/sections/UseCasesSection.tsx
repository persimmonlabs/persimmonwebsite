'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Coffee, Dumbbell, Building2, Briefcase, Camera, ShoppingBag } from 'lucide-react'

const useCases = [
  {
    icon: Coffee,
    title: 'Local Coffee Shop',
    name: 'Daily Grind Café',
    problem: 'Owner too busy making coffee to post consistently',
    solution: 'Daily Instagram posts from their photo folder, automatic',
    result: '3x more foot traffic from locals'
  },
  {
    icon: Dumbbell,
    title: 'Fitness Coach',
    name: 'Peak Body Online',
    problem: 'Writing motivational captions takes hours',
    solution: 'AI generates educational, motivational, and CTA posts',
    result: 'More inbound leads → online program sales'
  },
  {
    icon: Building2,
    title: 'Real Estate Agent',
    name: 'Sunset Realty',
    problem: 'Forgets to showcase new listings consistently',
    solution: 'Automated property posts with location hashtags',
    result: 'Every listing gets maximum exposure'
  },
  {
    icon: Briefcase,
    title: 'Tech Startup',
    name: 'Series A SaaS',
    problem: 'Founders have no time for thought leadership',
    solution: 'LinkedIn posts from blog content, automatic',
    result: 'Building credibility with investors'
  },
  {
    icon: Camera,
    title: 'Wedding Photographer',
    name: 'Lens & Love',
    problem: 'Beautiful photos, zero time to share',
    solution: 'Portfolio posts from Google Drive albums',
    result: 'Booked solid from Instagram discovery'
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Brand',
    name: 'Boutique Fashion',
    problem: 'Product launches feel chaotic',
    solution: 'Coordinated multi-platform campaigns',
    result: 'Higher direct social → store conversions'
  }
]

export const UseCasesSection: React.FC = () => {
  return (
    <SectionContainer className="py-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          Perfect For Businesses Like Yours
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Real examples of how we help different businesses automate their content
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{useCase.title}</h3>
                  <p className="text-sm text-orange-600 font-medium mb-3">{useCase.name}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Problem:</span>
                      <p className="text-gray-600">{useCase.problem}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Solution:</span>
                      <p className="text-gray-600">{useCase.solution}</p>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Result:</span>
                      <p className="text-green-600">{useCase.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-gray-600">
          And 14+ more business types we actively support
        </p>
      </motion.div>
    </SectionContainer>
  )
}