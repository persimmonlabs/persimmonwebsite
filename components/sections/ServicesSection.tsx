'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../Card'
import { SectionContainer } from '../SectionContainer'
import { Instagram, Linkedin, Twitter, Facebook, Mail, FileText, Image, Calendar, BarChart, Bot, MessageSquare, Sparkles, Lock, TrendingUp, Users, DollarSign, FileCheck, Phone } from 'lucide-react'

export const ServicesSection: React.FC = () => {
  const [activePhase, setActivePhase] = useState<'phase1' | 'phase2'>('phase1')

  const phase1Services = [
    {
      icon: Instagram,
      title: 'Social Media Posts',
      description: 'Instagram, LinkedIn, Twitter/X, Facebook - all platforms, one workflow',
      features: ['Auto-posting', 'Platform optimization', 'Hashtag research']
    },
    {
      icon: Sparkles,
      title: 'AI Caption Generation',
      description: 'Your brand voice captured perfectly in every post',
      features: ['Brand voice training', 'Emoji optimization', 'CTA creation']
    },
    {
      icon: Image,
      title: 'Carousel & Story Creation',
      description: 'Multi-slide content that drives engagement',
      features: ['Template library', 'Auto-resizing', 'Brand consistency']
    },
    {
      icon: Mail,
      title: 'Newsletter Automation',
      description: 'Email campaigns that nurture and convert',
      features: ['Segmentation', 'A/B testing', 'Analytics']
    },
    {
      icon: Calendar,
      title: 'Content Calendar',
      description: 'Strategic scheduling for maximum impact',
      features: ['Optimal timing', 'Bulk scheduling', 'Holiday planning']
    },
    {
      icon: BarChart,
      title: 'Analytics & Reporting',
      description: 'Know what works with detailed insights',
      features: ['Engagement metrics', 'Growth tracking', 'ROI analysis']
    }
  ]

  const phase2Services = [
    {
      icon: MessageSquare,
      title: 'Email Sequences',
      description: 'Automated follow-ups that close deals',
      features: ['Trigger-based', 'Personalization', 'Smart timing']
    },
    {
      icon: Users,
      title: 'Lead Routing & CRM',
      description: 'Never lose a lead again',
      features: ['Auto-assignment', 'Lead scoring', 'Pipeline automation']
    },
    {
      icon: Bot,
      title: 'Customer Support AI',
      description: '24/7 responses to common questions',
      features: ['Instant replies', 'Escalation rules', 'Multi-channel']
    },
    {
      icon: Calendar,
      title: 'Meeting Scheduling',
      description: 'Calendar automation that saves hours',
      features: ['Availability sync', 'Reminders', 'Timezone handling']
    },
    {
      icon: FileCheck,
      title: 'Invoice & Proposals',
      description: 'Professional documents in seconds',
      features: ['Template engine', 'E-signatures', 'Payment links']
    },
    {
      icon: TrendingUp,
      title: 'Sales Automation',
      description: 'Full pipeline management on autopilot',
      features: ['Deal tracking', 'Commission calc', 'Forecasting']
    }
  ]

  return (
    <SectionContainer className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
            Services That <span className="gradient-text">Transform Your Business</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start with content automation today. Expand to full business automation tomorrow.
          </p>

          {/* Phase Toggle */}
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActivePhase('phase1')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activePhase === 'phase1'
                  ? 'bg-white text-persimmon-orange shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Phase 1: Content Automation</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full ml-2">Available Now</span>
              </span>
            </button>
            <button
              onClick={() => setActivePhase('phase2')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activePhase === 'phase2'
                  ? 'bg-white text-persimmon-orange shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Phase 2: Business Automation</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full ml-2">Coming Q2 2025</span>
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activePhase === 'phase1' ? phase1Services : phase2Services).map((service, index) => (
          <motion.div
            key={`${activePhase}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className={`h-full ${activePhase === 'phase2' ? 'opacity-75' : ''} hover:shadow-xl transition-all duration-300 group`}>
              <div className="flex flex-col h-full">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-12 h-12 ${activePhase === 'phase1' ? 'bg-gradient-to-br from-persimmon-orange to-persimmon-coral' : 'bg-gray-200'} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-6 h-6 ${activePhase === 'phase1' ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="border-t pt-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Includes:</p>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-persimmon-coral rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {activePhase === 'phase2' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 italic">
            Phase 2 services are under development. Join our waitlist to get early access and special pricing.
          </p>
        </motion.div>
      )}
    </SectionContainer>
  )
}