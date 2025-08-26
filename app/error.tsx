'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-persimmon-brown via-gray-950 to-brand-dark flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex"
        >
          <div className="w-24 h-24 bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Something Went Wrong
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
            Our automation hit a snag. Don&apos;t worry, we&apos;re on it!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-persimmon-coral/30 transition-all"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </button>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-brand-dark/30 border border-brand-wine/30 text-white font-semibold rounded-xl hover:bg-brand-dark/50 transition-all"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </a>
          </div>
        </motion.div>
        
        {error.digest && (
          <p className="mt-8 text-xs text-gray-600">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  )
}