'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardProps {
  className?: string
  children: React.ReactNode
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({ className, children, hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-white rounded-2xl shadow-lg p-8 border border-gray-100',
        className
      )}
    >
      {children}
    </motion.div>
  )
}