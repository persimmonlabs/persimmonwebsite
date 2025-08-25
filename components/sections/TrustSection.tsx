'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Shield, Lock, RefreshCw, DollarSign } from 'lucide-react'

// Logos of tools we integrate with
const integrations = [
  { name: 'n8n', logo: 'n8n' },
  { name: 'OpenAI', logo: 'OpenAI' },
  { name: 'Claude', logo: 'Claude' },
  { name: 'Meta', logo: 'Meta' },
  { name: 'LinkedIn', logo: 'LinkedIn' },
  { name: 'Twitter/X', logo: 'X' },
  { name: 'Zapier', logo: 'Zapier' },
  { name: 'Make', logo: 'Make' }
]

const trustFeatures = [
  {
    icon: Shield,
    title: 'Enterprise-Grade Infrastructure',
    description: 'Built on n8n, the same automation platform trusted by Fortune 500 companies'
  },
  {
    icon: Lock,
    title: 'GDPR Compliant & Secure',
    description: 'Your data is encrypted, protected, and never shared with third parties'
  },
  {
    icon: RefreshCw,
    title: '30-Day Money-Back Guarantee',
    description: 'Not satisfied? Get a full refund within 30 days, no questions asked'
  },
  {
    icon: DollarSign,
    title: 'No Lock-In Contracts',
    description: 'Cancel anytime, keep your workflows, no hidden fees or penalties'
  }
]

export const TrustSection: React.FC = () => {
  return (
    <SectionContainer className="py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
              Built on <span className="gradient-text">Trust & Technology</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade automation infrastructure that you can rely on.
            </p>
          </motion.div>
        </div>

        {/* Trust Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-persimmon-orange/10 to-persimmon-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-persimmon-coral" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Integration Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t pt-12"
        >
          <p className="text-center text-gray-500 mb-8 font-medium">
            Powered by industry-leading platforms
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 px-6 py-3 rounded-lg"
              >
                <span className="text-gray-600 font-semibold">{integration.logo}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-3 bg-green-50 px-6 py-3 rounded-full">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Bank-level encryption • SOC 2 compliant infrastructure • 99.9% uptime SLA
            </span>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}