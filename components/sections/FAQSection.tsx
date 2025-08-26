'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: "How will this save me 20+ hours per week?",
    answer: "Instead of spending hours writing captions, finding hashtags, and posting to each platform, you upload once and we create 50+ unique posts automatically. Most users go from 3 hours/day on content to 10 minutes/week."
  },
  {
    question: "Will people know it's AI-generated content?",
    answer: "No. Our AI learns your exact writing style, brand voice, and personality. Each post is unique and sounds like you wrote it. You can review everything or let it run fully automated."
  },
  {
    question: "How is this different from hiring a content writer?",
    answer: "A content writer costs $3,000-5,000/month and creates 20-30 posts. We create unlimited content for $49/month, work 24/7, never get sick, and learn your brand voice perfectly."
  },
  {
    question: "What if I don't have much content to start with?",
    answer: "Perfect! We work with just your website, a few blog posts, or even a simple description of your business. Our AI creates original, engaging content from minimal input."
  },
  {
    question: "Can I still control what gets posted?",
    answer: "Absolutely. Choose full automation, approval mode (review everything), or smart mode (auto-approve certain types, review others). It's your brand, your control."
  },
  {
    question: "How quickly can I see results?",
    answer: "The demo works in 60 seconds. Full setup takes 2-3 hours over a few days. Once configured, you'll have weeks of content ready and posting automatically."
  },
  {
    question: "Which platforms will this work with?",
    answer: "Instagram, LinkedIn, Twitter/X, Facebook, TikTok, and Pinterest. One upload creates optimized posts for every platform. We're adding YouTube Shorts and Threads soon."
  },
  {
    question: "What if I don't like the results?",
    answer: "We offer a 7-day free trial and 30-day money-back guarantee. No contracts, cancel anytime. Most users see 3x more engagement within the first week."
  }
]

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionContainer className="py-20 bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/20">
          <HelpCircle className="w-4 h-4 text-persimmon-coral" />
          <span className="text-sm font-semibold">Frequently Asked Questions</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
          Your Questions About Saving 20+ Hours/Week
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Real answers about how our AI creates content that sounds like you
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full bg-gray-800 rounded-lg p-6 text-left hover:bg-gray-800/80 transition-all border border-gray-700"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg pr-4 text-white">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 mt-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <a
          href="mailto:hello@persimmonlabs.cc"
          className="text-persimmon-coral font-semibold hover:text-persimmon-orange transition-colors"
        >
          Email us at hello@persimmonlabs.cc
        </a>
      </motion.div>
    </SectionContainer>
  )
}