import React from 'react'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'default' | 'dark' | 'gradient' | 'light'
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  children, 
  className,
  id,
  background = 'default'
}) => {
  const backgroundClasses = {
    default: 'bg-gray-900',
    dark: 'bg-gray-950',
    gradient: 'bg-gradient-to-b from-neutral-950 via-gray-950 to-neutral-950',
    light: 'bg-gray-850'
  }

  return (
    <section 
      id={id}
      className={cn(
        // Consistent padding for ALL sections
        'section-spacing',
        // Consistent horizontal padding
        'section-padding',
        // Background
        backgroundClasses[background],
        // Custom classes if needed
        className
      )}
    >
      <div className="container-max">
        {children}
      </div>
    </section>
  )
}