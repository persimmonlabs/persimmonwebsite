'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface EmailCaptureFormProps {
  source?: string
  buttonText?: string
  placeholder?: string
  className?: string
  onSuccess?: () => void
}

export const EmailCaptureForm: React.FC<EmailCaptureFormProps> = ({
  source = 'inline-form',
  buttonText = 'Get Early Access',
  placeholder = 'Enter your email',
  className = '',
  onSuccess,
}) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email')
      return
    }

    setStatus('loading')
    
    try {
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
          type: 'email-capture',
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage(data.message || 'Success! Check your inbox.')
        setEmail('')
        onSuccess?.()
        
        // Reset after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      } else {
        throw new Error(data.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to submit. Please try again.')
      console.error('Email submission error:', error)
      
      // Reset error after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-persimmon-coral/50 transition-all disabled:opacity-50"
              required
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${
              status === 'success'
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-gradient-to-r from-persimmon-coral to-persimmon-orange text-white hover:shadow-xl hover:shadow-persimmon-coral/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
            }`}
          >
            {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
            {status === 'success' && <CheckCircle className="w-5 h-5" />}
            {status === 'idle' && buttonText}
            {status === 'loading' && 'Submitting...'}
            {status === 'success' && 'Success!'}
            {status === 'error' && buttonText}
          </button>
        </div>
        
        {/* Status message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-3 text-sm ${
              status === 'success' ? 'text-green-400' : 
              status === 'error' ? 'text-red-400' : 
              'text-gray-400'
            }`}
          >
            <div className="flex items-center gap-2">
              {status === 'error' && <AlertCircle className="w-4 h-4" />}
              {message}
            </div>
          </motion.div>
        )}
      </div>
    </form>
  )
}