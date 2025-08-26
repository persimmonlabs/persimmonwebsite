'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: "How is this different from hiring an agency or freelancer?",
    answer: "Traditional agencies charge $5,000-10,000/month and take weeks to deliver. Freelancers are unreliable and produce inconsistent quality. We provide agency-level service at 80% less cost, with content live in 72 hours. Plus, our AI learns your exact brand voice and works 24/7."
  },
  {
    question: "Do you really handle everything, or do I need technical skills?",
    answer: "We handle 100% of the technical setup. You just approve the strategy on our initial call. Our team configures the AI, sets up all platform integrations, trains the system on your brand voice, and manages ongoing optimization. You literally just review results."
  },
  {
    question: "What happens after the initial setup?",
    answer: "Your content system runs automatically, publishing 100+ posts monthly across all platforms. We monitor performance, optimize AI outputs, and have weekly check-ins. When our dashboard launches in Q2 2025, you'll get early access to control everything yourself if desired."
  },
  {
    question: "How does the dashboard pilot program work?",
    answer: "Our self-service dashboard is launching Q2 2025. Current Growth and Enterprise clients get priority beta access. You'll be able to approve posts, adjust schedules, view analytics, and control your entire content system. Until then, we handle everything for you."
  },
  {
    question: "Can I review content before it posts?",
    answer: "Absolutely. Choose between: Full Automation (posts automatically), Approval Mode (review everything first), or Smart Mode (auto-approve certain content types, review others). Most clients start with Approval Mode then switch to Full Automation after seeing the quality."
  },
  {
    question: "What if I'm not happy with the results?",
    answer: "We offer a 30-day money-back guarantee. If you don't see 10x more content output or aren't completely satisfied, we'll refund every penny. No questions asked. But with our white-glove setup and ongoing optimization, this rarely happens."
  },
  {
    question: "How quickly will I see results?",
    answer: "Initial setup takes 48 hours. First posts start publishing within 72 hours. Most clients see engagement increase by 50% in the first two weeks and 3x by month two. The 60-second demo shows you results instantly with your own content."
  },
  {
    question: "Which platforms do you support?",
    answer: "Currently: LinkedIn, Twitter/X, Instagram, Facebook, Pinterest, and TikTok. We're adding YouTube Shorts, Threads, and Reddit in Q1 2025. Enterprise clients can request custom platform integrations."
  },
  {
    question: "How does pricing compare to hiring someone?",
    answer: "A social media manager costs $3,000-5,000/month plus benefits. A content writer adds another $2,000-3,000. That's $60,000+ yearly for limited output. Our Growth plan at $997/month provides unlimited content, works 24/7, never takes vacation, and scales instantly."
  },
  {
    question: "What kind of businesses do you work with?",
    answer: "We work with ambitious businesses that understand the value of consistent content but don't want to manage it. Our clients include SaaS companies, e-commerce brands, coaches, agencies, real estate firms, and B2B service providers. If you need content, we can help."
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
          <span className="text-sm font-semibold">FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
          Everything About Our <span className="gradient-text">Done-For-You Service</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Real answers about how we build and manage your content automation system
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
              className="w-full bg-gray-800 rounded-lg p-6 text-left hover:bg-gray-800/80 transition-all border border-gray-700 hover:border-persimmon-coral/50"
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
        <p className="text-gray-600 mb-4">Ready to automate your content?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://calendly.com/persimmon-labs/strategy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-bold rounded-xl hover:shadow-xl hover:shadow-persimmon-coral/30 transition-all"
          >
            Book Your Strategy Call
          </a>
          <a
            href="mailto:hello@persimmonlabs.cc"
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-all border border-gray-700"
          >
            Email hello@persimmonlabs.cc
          </a>
        </div>
      </motion.div>
    </SectionContainer>
  )
}