'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Button } from '../Button'
import { ArrowRight } from 'lucide-react'

export const CTASection: React.FC = () => {
  return (
    <SectionContainer className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="gradient-bg-animated rounded-3xl p-12 lg:p-16 text-center text-white"
      >
        <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
          Ready to automate?
        </h2>
        <p className="text-xl text-white/90 max-w-xl mx-auto mb-8">
          Join the early access list. Be first when we launch.
        </p>

        <Button size="lg" className="bg-white text-persimmon-red hover:bg-gray-100 group">
          Get Early Access
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </SectionContainer>
  )
}