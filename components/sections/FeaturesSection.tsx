'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../Card'
import { SectionContainer } from '../SectionContainer'
import { 
  Zap, 
  Palette, 
  Brain, 
  Calendar,
  TrendingUp,
  Shield,
  Sparkles,
  Users,
  CheckCircle
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Consistency Without Effort',
    description: 'Never miss a post again. Automated scheduling across Instagram, LinkedIn, Facebook, and Twitter/X.',
    color: 'text-persimmon-orange'
  },
  {
    icon: Palette,
    title: 'On-Brand Voice & Visuals',
    description: 'Every caption and graphic matches your style. AI learns your brand guidelines perfectly.',
    color: 'text-persimmon-coral'
  },
  {
    icon: Brain,
    title: 'Fresh, Relevant Content',
    description: 'AI agents pull from your library or create new visuals. Always timely, always engaging.',
    color: 'text-persimmon-red'
  },
  {
    icon: Calendar,
    title: 'Multi-Platform Reach',
    description: 'One idea repurposed into posts across all channels. Maximize your content ROI.',
    color: 'text-persimmon-burgundy'
  },
  {
    icon: TrendingUp,
    title: 'Smarter Growth',
    description: 'Track performance and improve automatically with built-in analytics and A/B testing.',
    color: 'text-persimmon-peach'
  },
  {
    icon: Shield,
    title: 'Flexible Approval Options',
    description: 'Choose auto-publish or quick approve/deny via Slack. You stay in control.',
    color: 'text-persimmon-brown'
  }
]

export const FeaturesSection: React.FC = () => {
  return (
    <SectionContainer id="features" className="bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center space-x-2 bg-persimmon-peach/20 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-persimmon-coral" />
          <span className="text-sm font-semibold text-persimmon-red">Powerful Features</span>
        </div>
        <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
          Outcomes You{' '}
          <span className="gradient-text">Actually Get</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Focus on your business while your content engine runs 24/7. 
          Real results, not just features.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br from-persimmon-peach/10 to-persimmon-coral/10 mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="flex items-center text-persimmon-coral text-sm font-semibold group cursor-pointer">
                Learn more
                <motion.span 
                  className="ml-1"
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 bg-gradient-to-r from-persimmon-burgundy to-persimmon-red rounded-3xl p-12 text-white"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-display font-bold text-3xl mb-4">
              Trusted by industry leaders
            </h3>
            <p className="text-white/80 mb-6">
              Join 500+ businesses that have transformed their content strategy with Persimmon.
            </p>
            <div className="flex flex-wrap gap-4">
              {['E-commerce', 'SaaS', 'Agencies', 'Restaurants', 'Healthcare'].map((industry) => (
                <div key={industry} className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">{industry}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">2.5x</div>
              <div className="text-sm text-white/80">Engagement Increase</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">87%</div>
              <div className="text-sm text-white/80">Time Saved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">4.8★</div>
              <div className="text-sm text-white/80">Customer Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-sm text-white/80">Support Available</div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  )
}