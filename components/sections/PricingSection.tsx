'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../Button'
import { SectionContainer } from '../SectionContainer'
import { Check, X, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$497',
    period: '/month',
    description: 'Perfect for solopreneurs and small businesses',
    popular: false,
    features: [
      { text: '1 platform automation', included: true },
      { text: '30 posts/month', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Monthly check-in', included: true },
      { text: 'Email support', included: true },
      { text: 'Multiple platforms', included: false },
      { text: 'Unlimited posts', included: false },
      { text: 'Approval workflows', included: false },
      { text: 'Custom integrations', included: false },
      { text: 'Priority support', included: false }
    ],
    cta: 'Start with Starter'
  },
  {
    name: 'Growth',
    price: '$997',
    period: '/month',
    description: 'For growing businesses ready to scale',
    popular: true,
    features: [
      { text: '4 platform automation', included: true },
      { text: 'Unlimited posts', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Weekly optimization', included: true },
      { text: 'Approval workflows', included: true },
      { text: 'A/B testing', included: true },
      { text: 'Content calendar', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Custom integrations', included: false },
      { text: 'White-label options', included: false }
    ],
    cta: 'Scale with Growth'
  },
  {
    name: 'Scale',
    price: '$1,997',
    period: '/month',
    description: 'Enterprise-grade automation for serious players',
    popular: false,
    features: [
      { text: 'Everything in Growth', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Priority support', included: true },
      { text: 'A/B testing advanced', included: true },
      { text: 'White-label options', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom AI training', included: true },
      { text: 'API access', included: true },
      { text: 'SLA guarantee', included: true },
      { text: 'Quarterly strategy calls', included: true }
    ],
    cta: 'Dominate with Scale'
  }
]

export const PricingSection: React.FC = () => {
  return (
    <SectionContainer className="py-24 bg-gray-50">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
            Pricing That <span className="gradient-text">Makes Sense</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Save 80% compared to agencies. No setup fees. Cancel anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>No lock-in contracts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Setup in 5 days</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-persimmon-orange to-persimmon-coral text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}
            
            <div className={`bg-white rounded-2xl p-8 h-full flex flex-col ${
              plan.popular ? 'ring-2 ring-persimmon-coral shadow-xl' : 'shadow-lg'
            } hover:shadow-2xl transition-shadow duration-300`}>
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button 
                size="lg" 
                variant={plan.popular ? 'primary' : 'secondary'}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Value comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="font-display font-bold text-2xl mb-6 text-center">
            Compare to Traditional Solutions
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-2">Social Media Manager</p>
              <p className="text-3xl font-bold text-gray-400 line-through">$3,000-5,000</p>
              <p className="text-xs text-gray-500 mt-1">/month + benefits</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-2">Marketing Agency</p>
              <p className="text-3xl font-bold text-gray-400 line-through">$5,000-10,000</p>
              <p className="text-xs text-gray-500 mt-1">/month + setup fees</p>
            </div>
            <div className="text-center">
              <p className="text-persimmon-coral font-semibold text-sm mb-2">Persimmon Labs</p>
              <p className="text-3xl font-bold text-persimmon-orange">$497-1,997</p>
              <p className="text-xs text-green-600 mt-1">No setup fees, cancel anytime</p>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  )
}