'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: "How is this different from Buffer or Hootsuite?",
    answer: "Those are scheduling tools - you still create all the content. We're an AI content creation system that generates, designs, and publishes everything automatically. You upload once, we create endless variations."
  },
  {
    question: "Will the content sound robotic or generic?",
    answer: "No. Our AI learns your brand voice and style. Each post is unique, on-brand, and engaging. You can review and edit anything before it goes live, or let it run fully automated."
  },
  {
    question: "What if I don't have any content to start with?",
    answer: "No problem! We can work with just your website URL, product descriptions, or even just a brief about your business. Our AI creates original content from minimal input."
  },
  {
    question: "Can I review posts before they go live?",
    answer: "Absolutely. You can choose full automation, approval mode (review everything), or smart mode (auto-approve certain types, review others). It's completely flexible."
  },
  {
    question: "How long does setup take?",
    answer: "The free demo takes 60 seconds. Full setup takes about 2-3 hours of your time spread over a few days. After that, it runs forever without you."
  },
  {
    question: "What platforms do you support?",
    answer: "Instagram, LinkedIn, Twitter/X, Facebook, TikTok, and Pinterest. We're adding YouTube Shorts and Threads soon. Everything posts from one upload."
  },
  {
    question: "Is there a contract or can I cancel anytime?",
    answer: "No contracts, cancel anytime. We offer a 7-day free trial and a 30-day money-back guarantee. We're confident you'll love it."
  },
  {
    question: "How much content can you generate?",
    answer: "Our Growth plan includes unlimited posts. Most clients post 1-2 times per day per platform. The AI can generate hundreds of variations from a single upload."
  }
]

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionContainer className="py-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-4">
          <HelpCircle className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-semibold">Frequently Asked Questions</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          Got Questions? We've Got Answers
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about automating your content
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
              className="w-full bg-white rounded-lg p-6 text-left hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
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
                    <p className="text-gray-600 mt-4 leading-relaxed">
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
          className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
        >
          Email us at hello@persimmonlabs.cc
        </a>
      </motion.div>
    </SectionContainer>
  )
}