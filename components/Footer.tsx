'use client'

import React from 'react'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-persimmon-orange to-persimmon-coral rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-full" />
              </div>
              <span className="font-display font-bold text-xl">Persimmon Labs</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              AI-powered content automation that works 24/7. Set up once, publish everywhere, forever.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors text-sm">Services</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How It Works</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">API Docs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <a href="mailto:hello@persimmonlabs.io" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>hello@persimmonlabs.io</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Remote First • Global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-gradient-to-r from-persimmon-orange/20 to-persimmon-coral/20 rounded-xl p-6 text-center">
            <h3 className="font-display font-bold text-xl mb-2">Ready to automate your content?</h3>
            <p className="text-gray-300 mb-4">Join forward-thinking businesses saving 20+ hours per week</p>
            <button className="bg-gradient-to-r from-persimmon-orange to-persimmon-coral text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300">
              Start Your Free Trial →
            </button>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Persimmon Labs. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}