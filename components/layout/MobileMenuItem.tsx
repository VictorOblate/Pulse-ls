"use client"

import { useRouter } from 'next/navigation'
import { type ReactNode } from 'react'

interface MobileMenuItemProps {
  href: string
  onClose: () => void
  children: ReactNode
}

export default function MobileMenuItem({ href, onClose, children }: MobileMenuItemProps) {
  const router = useRouter()

  const handleClick = () => {
    onClose()
    router.push(href)
  }

  return (
    <button
      onClick={handleClick}
      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-all"
    >
      {children}
    </button>
  )
}