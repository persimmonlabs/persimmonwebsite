'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechStart Inc.',
    avatar: 'SC',
    content: 'Persimmon transformed our social media strategy. We went from posting sporadically to having a consistent, engaging presence across all platforms. Our engagement rates have tripled!',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Owner',
    company: 'The Daily Grind Café',
    avatar: 'MR',
    content: 'As a small business owner, I don\'t have time for social media. Persimmon handles everything - from creating beautiful posts to scheduling them at the perfect times. It\'s like having a full marketing team!',
    rating: 5
  },
  {
    name: 'Emily Watson',
    role: 'CEO',
    company: 'Bloom Digital Agency',
    avatar: 'EW',
    content: 'We use Persimmon for all our clients. The AI understands each brand\'s unique voice perfectly. It\'s saved us countless hours while delivering better results than we ever achieved manually.',
    rating: 5
  }
]

export const TestimonialsSection: React.FC = () => {
  return (
    <SectionContainer className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center space-x-2 bg-persimmon-peach/20 px-4 py-2 rounded-full mb-4">
          <Star className="w-4 h-4 text-persimmon-coral" />
          <span className="text-sm font-semibold text-persimmon-red">Customer Stories</span>
        </div>
        <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
          Loved by{' '}
          <span className="gradient-text">500+ businesses</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See how companies like yours are saving time and growing their audience with Persimmon.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-persimmon-coral/20" />
            
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-persimmon-coral text-persimmon-coral" />
              ))}
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-persimmon-peach to-persimmon-coral flex items-center justify-center text-white font-bold">
                {testimonial.avatar}
              </div>
              <div className="ml-4">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-600">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale"
      >
        {['TechCrunch', 'Forbes', 'The Verge', 'Wired', 'Fast Company'].map((brand) => (
          <div key={brand} className="text-2xl font-bold text-gray-400">
            {brand}
          </div>
        ))}
      </motion.div>
    </SectionContainer>
  )
}