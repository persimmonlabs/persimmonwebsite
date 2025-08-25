'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X, ArrowRight } from 'lucide-react'

export const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToDemo = () => {
    document.getElementById('demo-generator')?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <Image src="/logo.svg" alt="Persimmon Labs" width={40} height={40} />
            <span className="font-semibold text-xl text-white">Persimmon Labs</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={scrollToDemo}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Demo
            </button>
            <a
              href="#solution"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Solution
            </a>
            <a
              href="#faq"
              className="text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </a>
            <button
              onClick={scrollToDemo}
              className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-accent text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-300 flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={scrollToDemo}
                className="block w-full text-left py-2 text-gray-300 hover:text-white transition-colors"
              >
                Demo
              </button>
              <a
                href="#solution"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
              >
                Solution
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
              >
                FAQ
              </a>
              <button
                onClick={scrollToDemo}
                className="w-full px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white font-semibold rounded-lg"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}