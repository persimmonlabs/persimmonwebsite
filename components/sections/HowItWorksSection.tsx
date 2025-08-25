'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Phone, Briefcase, Rocket, Settings, CheckCircle } from 'lucide-react'

const steps = [
  {
    day: 'Day 0',
    title: 'Discovery Call',
    duration: '15 minutes',
    description: 'Quick call to understand your needs, current pain points, and content goals.',
    icon: Phone,
    tasks: ['Understand your business', 'Identify key platforms', 'Set success metrics']
  },
  {
    day: 'Day 1',
    title: 'Asset Collection',
    duration: '2 hours of your time',
    description: 'You share brand materials, past content, and style preferences.',
    icon: Briefcase,
    tasks: ['Brand guidelines', 'Content samples', 'Access credentials']
  },
  {
    day: 'Days 2-3',
    title: 'Automation Build',
    duration: 'We work, you relax',
    description: 'We create your custom n8n workflows and AI training.',
    icon: Settings,
    tasks: ['n8n workflow creation', 'AI voice training', 'Platform integration']
  },
  {
    day: 'Day 4',
    title: 'Testing & Refinement',
    duration: '1 hour review',
    description: 'Test runs, adjustments, and ensuring perfect output quality.',
    icon: CheckCircle,
    tasks: ['Quality checks', 'Your feedback', 'Final adjustments']
  },
  {
    day: 'Day 5+',
    title: 'Launch & Support',
    duration: 'Ongoing',
    description: 'Go live with 24/7 automation and continuous monitoring.',
    icon: Rocket,
    tasks: ['System launch', 'Performance monitoring', 'Weekly optimization']
  }
]

export const HowItWorksSection: React.FC = () => {
  return (
    <SectionContainer className="py-24 bg-white">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
            How It Works - <span className="gradient-text">5 Days to Freedom</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From manual chaos to automated excellence in less than a week.
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Timeline line for desktop */}
        <div className="hidden lg:block absolute left-0 right-0 top-32 h-0.5 bg-gradient-to-r from-persimmon-coral via-persimmon-orange to-persimmon-red" />
        
        {/* Timeline steps */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
                {/* Icon and day */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-persimmon-orange to-persimmon-coral rounded-lg flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-persimmon-coral">{step.day}</span>
                </div>
                
                {/* Timeline dot for desktop */}
                <div className="hidden lg:block absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-4 bg-white border-4 border-persimmon-coral rounded-full" />
                  <div className="w-0.5 h-8 bg-persimmon-coral mx-auto" />
                </div>
                
                {/* Content */}
                <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-xs text-persimmon-orange font-semibold mb-2">{step.duration}</p>
                <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                
                {/* Tasks */}
                <div className="space-y-2">
                  {step.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-persimmon-coral rounded-full mt-1.5 mr-2 flex-shrink-0" />
                      <span className="text-xs text-gray-500">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-persimmon-orange/10 to-persimmon-coral/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="font-display font-bold text-2xl mb-4">
              Your Time Investment: <span className="text-persimmon-orange">Less than 4 hours total</span>
            </h3>
            <p className="text-gray-600">
              Discovery call (15 min) + Asset sharing (2 hours) + Review session (1 hour) = Done forever
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Compare that to the 20+ hours per week you're currently spending on content
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}