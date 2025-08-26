'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { SectionContainer } from '../SectionContainer'

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // For now, just simulate form submission
    // TODO: Connect to actual email service or backend
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-spacing section-padding relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-6 py-3 glass rounded-full mb-8 border-persimmon-coral/30">
            <Mail className="w-5 h-5 text-persimmon-coral mr-3" />
            <span className="text-sm font-semibold text-persimmon-coral tracking-wider">SAVE 20+ HOURS/WEEK</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            Ready to Never Write
            <span className="block gradient-text mt-2">Social Content Again?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Tell us about your content goals and we'll show you exactly how to 10x your output while working less.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 px-8 lg:px-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Direct Contact</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:hello@persimmonlabs.com" 
                  className="flex items-center p-4 bg-brand-dark/20 border border-brand-wine/30 rounded-xl hover:bg-brand-dark/30 transition-all group"
                >
                  <Mail className="w-6 h-6 text-brand-primary mr-4 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm text-gray-400">Email Us</p>
                    <p className="text-white font-medium">hello@persimmonlabs.com</p>
                  </div>
                </a>

              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Help Us Help You Save Time</h3>
              <div className="space-y-2 text-gray-400">
                <p>• How many hours/week do you spend on content?</p>
                <p>• How many posts do you want to publish daily?</p>
                <p>• Which platforms are most important to you?</p>
                <p>• When do you want to stop writing captions?</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-brand-dark/20 border border-brand-wine/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-persimmon-coral focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-brand-dark/20 border border-brand-wine/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-persimmon-coral focus:border-transparent transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-dark/20 border border-brand-wine/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-persimmon-coral focus:border-transparent transition-all"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  How can we help you save 20+ hours per week? *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-dark/20 border border-brand-wine/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-persimmon-coral focus:border-transparent transition-all resize-none"
                  placeholder="Example: 'I spend 4 hours/day writing LinkedIn posts and Instagram captions for my agency. I want to publish 3x more content but have zero time. Help me automate this!'"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-persimmon-coral/30 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </span>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center p-4 bg-green-900/20 border border-green-500/30 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-green-200">Message sent successfully! We&apos;ll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center p-4 bg-red-900/20 border border-red-500/30 rounded-xl"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                  <span className="text-red-200">Something went wrong. Please try again or email us directly.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Email Capture CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 glass-dark rounded-3xl border border-persimmon-coral/20"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to See Results in 60 Seconds?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Skip the form and send us a quick email about your content goals. We'll show you exactly how to save 20+ hours per week with a personalized demo.
          </p>
          <a 
            href="mailto:hello@persimmonlabs.com?subject=Show Me How to Save 20+ Hours/Week&body=Hi Persimmon Labs team,%0D%0A%0D%0AI want to see how your AI can help me save 20+ hours per week on content creation.%0D%0A%0D%0ACurrent situation:%0D%0AI spend ___ hours/week writing social media content%0D%0AI want to post ___ times per day%0D%0AMy main platforms are: ____%0D%0A%0D%0APlease show me how to automate this!%0D%0A%0D%0AThanks!"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-persimmon-coral/30 transition-all transform hover:scale-105"
          >
            Get Personal Demo
            <Mail className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}