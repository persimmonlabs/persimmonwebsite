'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Linkedin, Twitter, Calendar } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollToDemo = () => {
    document.getElementById('demo-generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-black border-t border-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/logo.svg" alt="Persimmon Labs" width={32} height={32} />
              <span className="font-bold text-xl">Persimmon Labs</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              AI-powered content automation that works while you sleep. 
              Upload once, publish everywhere, forever.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:hello@persimmonlabs.cc"
                className="text-gray-400 hover:text-brand-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/persimmonlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/persimmonlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="md:text-right">
            <h3 className="font-bold text-lg mb-2">Ready to automate?</h3>
            <p className="text-gray-400 mb-4">
              Start with a free demo in 60 seconds
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
              <button
                onClick={scrollToDemo}
                className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full font-semibold hover:shadow-lg hover:shadow-brand-primary/50 transition-all"
              >
                Try Free Demo
              </button>
              <a
                href="https://calendly.com/persimmonlabs/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gray-700 rounded-full font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Call
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2024 Persimmon Labs. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="hover:text-brand-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-brand-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}