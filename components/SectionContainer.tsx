import React from 'react'
import { cn } from '@/lib/utils'

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className,
  id
}) => {
  return (
    <section id={id} className={cn('py-20 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}