'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Button } from '../Button'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Starter',
    price: '$97',
    period: '/month',
    description: 'For solopreneurs',
    features: [
      '1 brand',
      '30 posts/month',
      'All platforms',
      'Basic analytics'
    ],
    cta: 'Start Trial',
    popular: false
  },
  {
    name: 'Growth',
    price: '$297',
    period: '/month',
    description: 'For growing businesses',
    features: [
      '3 brands',
      'Unlimited posts',
      'A/B testing',
      'Priority support'
    ],
    cta: 'Start Trial',
    popular: true
  },
  {
    name: 'Scale',
    price: 'Custom',
    period: '',
    description: 'For agencies',
    features: [
      'Unlimited brands',
      'White label',
      'API access',
      'Dedicated support'
    ],
    cta: 'Contact Us',
    popular: false
  }
]

export const PricingSection: React.FC = () => {
  return (
    <SectionContainer id="pricing" className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
          Simple{' '}
          <span className="gradient-text">pricing</span>
        </h2>
        <p className="text-gray-600">
          7-day free trial. Cancel anytime.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              'relative rounded-2xl p-8 bg-white border-2',
              plan.popular ? 'border-persimmon-coral shadow-xl scale-105' : 'border-gray-200'
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Popular
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="font-display font-bold text-xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-600 ml-1">{plan.period}</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{plan.description}</p>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="w-5 h-5 text-persimmon-coral mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              variant={plan.popular ? 'primary' : 'secondary'}
              className="w-full"
            >
              {plan.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}