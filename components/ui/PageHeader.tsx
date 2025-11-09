'use client'

import { type ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description: string
  children?: ReactNode
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl mb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-90"></div>
      <div className="relative min-h-[300px] flex items-center justify-center text-white text-center p-8">
        {/* Geometric Accents */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{title}</h1>
          <p className="text-xl text-white/90">{description}</p>
          {children}
        </div>
      </div>
    </div>
  )
}