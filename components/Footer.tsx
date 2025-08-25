import React from 'react'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-persimmon rounded-full" />
            <span className="font-display font-bold text-xl">PersimmonLabs</span>
          </div>
          
          <div className="text-sm text-gray-600">
            © {currentYear} PersimmonLabs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}