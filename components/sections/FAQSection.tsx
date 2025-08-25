'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "What is n8n and why does it matter?",
    answer: "n8n is an enterprise-grade workflow automation platform used by Fortune 500 companies. Unlike consumer tools like Hootsuite or Buffer that just schedule posts, n8n creates intelligent workflows that can make decisions, transform content, and integrate with unlimited platforms. It's the difference between a scheduler and a true automation system."
  },
  {
    question: "How is this different from Hootsuite/Buffer?",
    answer: "Traditional scheduling tools require you to manually create every post. Our n8n automations actually generate content using AI, adapt it for each platform, and post automatically. You upload once, and the system creates hundreds of variations. It's like having a content team vs. just a publishing calendar."
  },
  {
    question: "Can I still post manually if I want?",
    answer: "Absolutely! You maintain full control. Set up approval workflows to review before posting, manually override any scheduled content, or post directly whenever you want. The automation handles the routine work while you focus on special campaigns."
  },
  {
    question: "What if I don't like the AI-generated content?",
    answer: "During setup, we train the AI on your brand voice using your existing content and guidelines. You can adjust the tone, style, and messaging anytime. Plus, with approval workflows, nothing goes live without your say-so. Most clients are surprised how well the AI captures their voice after training."
  },
  {
    question: "How fast can you set this up?",
    answer: "5 business days from start to launch. Day 1: discovery call and asset collection. Days 2-3: we build your custom workflows. Day 4: testing and refinement with your feedback. Day 5: go live. Some clients with simple needs can be live in 3 days."
  },
  {
    question: "Do you work with my industry?",
    answer: "Yes! We've automated content for restaurants, real estate agents, e-commerce stores, coaches, consultants, SaaS companies, local services, and more. If you create content for your business, we can automate it. The system adapts to any industry."
  },
  {
    question: "What happens if I want to cancel?",
    answer: "No contracts, no penalties. Cancel anytime with 30 days notice. You keep access to your workflows and can export them to run on your own n8n instance if desired. We'll even help with the transition. Plus, 30-day money-back guarantee if you're not satisfied."
  },
  {
    question: "Do I need technical skills to use this?",
    answer: "Zero technical skills required. We handle all the setup, and you get a simple dashboard to monitor performance. Want to make changes? Just tell us what you need. It's like having a tech team on demand without hiring anyone."
  },
  {
    question: "What about data security and privacy?",
    answer: "Your data is encrypted at rest and in transit. We're GDPR compliant and never share your information with third parties. Content is processed on secure servers, and you maintain full ownership of all your content and data. We can sign custom NDAs if needed."
  },
  {
    question: "Can you integrate with my existing tools?",
    answer: "Yes! n8n connects with 400+ apps including CRMs (HubSpot, Salesforce), email platforms (Mailchimp, ConvertKit), e-commerce (Shopify, WooCommerce), and more. If it has an API, we can probably connect it."
  }
]

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <SectionContainer className="py-24 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about automating your content workflow.
            </p>
          </motion.div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-display font-semibold text-lg pr-4">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="text-persimmon-orange font-semibold hover:text-persimmon-coral transition-colors">
            Book a free consultation call →
          </button>
        </motion.div>
      </div>
    </SectionContainer>
  )
}