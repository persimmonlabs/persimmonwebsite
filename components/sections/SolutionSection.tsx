'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react'

const beforeAfter = [
  {
    before: "Spending 20+ hours/week creating content",
    after: "0 hours - fully automated content creation"
  },
  {
    before: "Inconsistent posting schedule",
    after: "Perfect timing, every single day"
  },
  {
    before: "Paying $5,000+/month for agencies",
    after: "$997/month all-inclusive"
  },
  {
    before: "Generic, templated content",
    after: "AI trained specifically on your brand voice"
  },
  {
    before: "Manual posting to each platform",
    after: "One upload → publishes everywhere"
  },
  {
    before: "Constant context switching",
    after: "Focus on your business, not social media"
  }
]

export const SolutionSection: React.FC = () => {
  const scrollToDemo = () => {
    document.getElementById('demo-generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="solution" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The Solution
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            With Persimmon Labs, you get automated content systems that work harder than any human team.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6">
            {beforeAfter.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-4"
              >
                {/* Before */}
                <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6 flex items-start space-x-4">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300 font-medium">Without Persimmon</p>
                    <p className="text-gray-400 mt-1">{item.before}</p>
                  </div>
                </div>

                {/* After */}
                <div className="bg-green-950/20 border border-green-900/30 rounded-lg p-6 flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300 font-medium">With Persimmon Labs</p>
                    <p className="text-gray-400 mt-1">{item.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={scrollToDemo}
            className="group px-8 py-4 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-semibold text-lg rounded-lg hover:shadow-2xl hover:shadow-persimmon-coral/50 transition-all duration-300"
          >
            <span className="flex items-center">
              See It In Action
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <p className="text-gray-500 text-sm mt-4">
            60-second demo • No credit card required
          </p>
        </motion.div>
      </SectionContainer>
    </section>
  )
}