'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Check, X, Sparkles, Zap, Phone, Calendar, Trophy, Shield, Star } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    subtitle: 'AI Demo Access',
    price: '$97',
    period: '/month',
    description: 'Try our AI with your own content',
    badge: 'COMING SOON',
    badgeColor: 'bg-gray-500',
    popular: false,
    features: [
      { text: 'AI content generator access', included: true },
      { text: '10 AI generations per month', included: true },
      { text: 'Basic templates', included: true },
      { text: 'Self-service dashboard', included: true },
      { text: 'Community support', included: true },
      { text: 'Done-for-you setup', included: false },
      { text: 'Custom AI training', included: false },
      { text: 'Multi-platform automation', included: false },
      { text: 'Dedicated success manager', included: false }
    ],
    cta: {
      text: 'Join Waitlist',
      action: 'waitlist',
      icon: Calendar
    }
  },
  {
    name: 'Growth',
    subtitle: 'Managed Setup & Automation',
    price: '$997',
    period: '/month',
    description: 'We build and manage your entire content system',
    badge: 'MOST POPULAR',
    badgeColor: 'bg-gradient-to-r from-persimmon-coral to-persimmon-orange',
    popular: true,
    features: [
      { text: 'Complete done-for-you setup', included: true },
      { text: '100+ posts generated monthly', included: true },
      { text: '5 platform automation', included: true },
      { text: 'Custom AI voice training', included: true },
      { text: 'Weekly optimization calls', included: true },
      { text: 'Content approval workflow', included: true },
      { text: 'Performance analytics dashboard', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Dashboard access (Q2 2025)', included: true }
    ],
    cta: {
      text: 'Book Strategy Call',
      action: 'call',
      icon: Phone
    }
  },
  {
    name: 'Enterprise',
    subtitle: 'White-Glove Service',
    price: 'Custom',
    period: 'Starting at $5k/mo',
    description: 'Full-service content automation at scale',
    badge: 'WHITE GLOVE',
    badgeColor: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    popular: false,
    features: [
      { text: 'Everything in Growth', included: true },
      { text: 'Unlimited content generation', included: true },
      { text: 'Unlimited platform integrations', included: true },
      { text: 'Dedicated account team', included: true },
      { text: 'Daily performance reviews', included: true },
      { text: 'Custom AI model training', included: true },
      { text: 'API access & webhooks', included: true },
      { text: 'White-label options available', included: true },
      { text: 'Priority dashboard beta access', included: true }
    ],
    cta: {
      text: 'Contact Sales',
      action: 'contact',
      icon: Star
    }
  }
]

const scrollToDemo = () => {
  document.getElementById('demo-generator')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

export const PricingSection: React.FC = () => {
  const handleCTA = (action: string) => {
    if (action === 'call') {
      window.open('https://calendly.com/persimmon-labs/strategy', '_blank')
    } else if (action === 'waitlist') {
      scrollToDemo()
    } else if (action === 'contact') {
      scrollToContact()
    }
  }

  return (
    <SectionContainer id="pricing" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-persimmon-coral/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-persimmon-coral/20">
            <Zap className="w-4 h-4 text-persimmon-coral" />
            <span className="text-sm font-semibold text-persimmon-coral">PRICING</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            From AI Demo to 
            <span className="gradient-text"> Enterprise Scale</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Start with our AI demo, upgrade to managed service when ready, or go enterprise for unlimited scale.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>30-day money back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-green-500" />
              <span>10x content guarantee</span>
            </div>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.cta.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`${plan.badgeColor} text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider flex items-center space-x-1`}>
                      {plan.popular && <Sparkles className="w-3 h-3" />}
                      <span>{plan.badge}</span>
                    </div>
                  </div>
                )}
                
                <div className={`glass-dark rounded-2xl p-8 h-full flex flex-col border ${
                  plan.popular ? 'border-persimmon-coral/50 shadow-2xl shadow-persimmon-coral/20' : 'border-gray-800'
                } hover:border-persimmon-coral/30 transition-all duration-300`}>
                  
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h3 className="font-bold text-2xl text-white mb-1">{plan.name}</h3>
                    <p className="text-persimmon-coral text-sm font-semibold mb-3">{plan.subtitle}</p>
                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-500 ml-2">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleCTA(plan.cta.action)}
                    className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white hover:shadow-xl hover:shadow-persimmon-coral/30 hover:scale-105'
                        : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{plan.cta.text}</span>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Comparison section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="font-bold text-2xl text-white mb-8 text-center">
              Why Businesses Choose Persimmon Labs
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 line-through mb-2">$5,000+</div>
                <p className="text-gray-400 text-sm">Traditional Agency</p>
                <p className="text-gray-500 text-xs mt-2">Long contracts, slow delivery, generic content</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 line-through mb-2">$3,000+</div>
                <p className="text-gray-400 text-sm">Full-Time Writer</p>
                <p className="text-gray-500 text-xs mt-2">Limited output, sick days, training required</p>
              </div>
              <div className="text-center relative">
                <div className="absolute -top-3 -right-3">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    80% LESS
                  </div>
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">$997</div>
                <p className="text-white text-sm font-semibold">Persimmon Labs</p>
                <p className="text-green-400 text-xs mt-2">Done-for-you, unlimited content, no contracts</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 mb-4">Not sure which plan is right for you?</p>
          <button
            onClick={() => scrollToDemo()}
            className="text-persimmon-coral font-bold hover:text-persimmon-orange transition-colors"
          >
            Try the 60-second demo first →
          </button>
        </motion.div>
      </div>
    </SectionContainer>
  )
}