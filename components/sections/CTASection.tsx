'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../Button'
import { SectionContainer } from '../SectionContainer'
import { Calendar, ArrowRight, Clock, Users, TrendingUp } from 'lucide-react'

export const CTASection: React.FC = () => {
  return (
    <SectionContainer className="py-24 bg-gradient-to-br from-persimmon-orange to-persimmon-coral relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-4xl lg:text-5xl xl:text-6xl mb-6 text-white">
            Stop Losing Customers to Competitors Who Post More
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Every day you wait, your competitors are building stronger relationships with YOUR potential customers. 
            Let's automate your growth starting today.
          </p>

          {/* Value props */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center space-x-2 text-white/80">
              <Clock className="w-5 h-5" />
              <span>Setup in 5 days</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Users className="w-5 h-5" />
              <span>Limited spots available</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <TrendingUp className="w-5 h-5" />
              <span>3x ROI guaranteed</span>
            </div>
          </div>

          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="xl" className="bg-white text-persimmon-orange hover:bg-gray-100 group">
                <Calendar className="mr-2 h-5 w-5" />
                Claim Your Free Automation Audit
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          <p className="text-white/70 text-sm mt-6">
            Free 30-minute audit • No obligation • Only 5 spots left this month
          </p>
        </motion.div>

        {/* Urgency banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-white font-semibold mb-2">
              🔥 Special Launch Offer
            </p>
            <p className="text-white/90 text-sm">
              First 10 clients get 50% off first month + free custom AI voice training (worth $997)
            </p>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}