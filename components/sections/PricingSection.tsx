'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Button } from '../Button'
import { Check, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Daily Poster',
    price: '$97',
    period: '/month',
    description: 'Perfect for solopreneurs and small businesses',
    features: [
      { text: '1 brand profile', included: true },
      { text: 'Daily posts (30/month)', included: true },
      { text: 'All 4 platforms', included: true },
      { text: 'Auto-generated captions', included: true },
      { text: 'Basic analytics dashboard', included: true },
      { text: 'Email support', included: true },
      { text: 'A/B testing', included: false },
      { text: 'Custom AI training', included: false },
    ],
    cta: 'Start 7-Day Trial',
    popular: false
  },
  {
    name: 'Growth Engine',
    price: '$297',
    period: '/month',
    description: 'For businesses serious about social growth',
    features: [
      { text: 'Up to 3 brand profiles', included: true },
      { text: '90 posts per month', included: true },
      { text: 'All platforms + newsletters', included: true },
      { text: 'Custom brand voice training', included: true },
      { text: 'A/B testing for captions', included: true },
      { text: 'Advanced analytics & reports', included: true },
      { text: 'Slack integration', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Start 7-Day Trial',
    popular: true
  },
  {
    name: 'Agency',
    price: '$797',
    period: '/month',
    description: 'Manage multiple clients with ease',
    features: [
      { text: '10+ brand profiles', included: true },
      { text: 'Unlimited posts', included: true },
      { text: 'White-label dashboard', included: true },
      { text: 'Custom AI for each brand', included: true },
      { text: 'Multi-user access & roles', included: true },
      { text: 'API access', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom integrations', included: true },
    ],
    cta: 'Book Demo',
    popular: false
  }
]

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <SectionContainer id="pricing" className="bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center space-x-2 bg-persimmon-peach/20 px-4 py-2 rounded-full mb-4">
          <Zap className="w-4 h-4 text-persimmon-coral" />
          <span className="text-sm font-semibold text-persimmon-red">Simple Pricing</span>
        </div>
        <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
          Choose your{' '}
          <span className="gradient-text">growth plan</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Start with a 7-day free trial. No credit card required. 
          Cancel anytime.
        </p>

        <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={cn(
              'px-6 py-2 rounded-md font-medium transition-all',
              billingCycle === 'monthly' 
                ? 'bg-persimmon-coral text-white' 
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={cn(
              'px-6 py-2 rounded-md font-medium transition-all',
              billingCycle === 'yearly' 
                ? 'bg-persimmon-coral text-white' 
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Yearly
            <span className="ml-2 text-xs bg-persimmon-peach/20 text-persimmon-red px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              'relative rounded-2xl p-8 bg-white shadow-lg',
              plan.popular && 'ring-2 ring-persimmon-coral scale-105'
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white text-sm font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold">
                  {plan.price}
                </span>
                <span className="text-gray-600 ml-1">{plan.period}</span>
              </div>
              <p className="text-gray-600">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature.text} className="flex items-start">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-persimmon-coral mt-0.5 mr-3 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
                  )}
                  <span className={cn(
                    feature.included ? 'text-gray-700' : 'text-gray-400'
                  )}>
                    {feature.text}
                  </span>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <p className="text-gray-600 mb-4">
          All plans include:
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {['SSL Security', 'GDPR Compliant', '99.9% Uptime', 'API Access', 'Mobile App'].map((feature) => (
            <div key={feature} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Check className="w-4 h-4 text-persimmon-coral" />
              <span className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  )
}