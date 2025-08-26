'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-persimmon-brown via-gray-950 to-brand-dark flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-[150px] font-bold text-brand-primary/20">404</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
            Looks like this content got lost in automation. Let&apos;s get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-persimmon-coral/30 transition-all"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link
              href="/#demo-generator"
              className="inline-flex items-center px-6 py-3 bg-brand-dark/30 border border-brand-wine/30 text-white font-semibold rounded-xl hover:bg-brand-dark/50 transition-all"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Try Demo Instead
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}