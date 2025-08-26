'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

export const DemoLoading: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="relative inline-flex">
        <div className="w-20 h-20 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full animate-ping absolute" />
        <div className="w-20 h-20 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full animate-pulse relative flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-white animate-spin" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mt-6 mb-2">Creating Your Content...</h3>
      <p className="text-gray-400">Our AI is crafting the perfect posts for your brand</p>
      
      {/* Progress indicators */}
      <div className="mt-8 max-w-md mx-auto">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Analyzing content...</span>
          <span className="text-brand-primary">✓</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Understanding brand voice...</span>
          <span className="text-brand-primary">✓</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Generating variations...</span>
          <span className="text-brand-primary animate-pulse">...</span>
        </div>
      </div>
    </div>
  )
}