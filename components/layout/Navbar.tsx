"use client"

import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import MobileMenuItem from './MobileMenuItem'

interface Category {
  _id: string
  title: string
  slug: { current: string }
  color?: string
}

interface NavbarProps {
  categories?: Category[]
}

export default function Navbar({ categories = [] }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <nav className="bg-white sticky top-0 z-50 overflow-hidden">
        {/* Pulsing intertwined SVG lines (solid colors, subtle end fades via blurred overlays) */}
        <div className="relative w-full h-6">
          {/* SVG lines */}
          <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="w-full h-6">
            <g style={{ transformOrigin: '50% 50%' }}>
              <path
                d="M0,12 C150,2 300,22 450,12 C600,2 750,22 900,12 C1050,2 1200,12 1200,12"
                stroke="#7dd3fc"
                strokeWidth={1.6}
                strokeLinecap="round"
                fill="none"
                className="animate-line-move"
                style={{ animationDuration: '9s', animationTimingFunction: 'ease-in-out' }}
              />

              <path
                d="M0,14 C150,6 300,18 450,14 C600,6 750,18 900,14 C1050,6 1200,14 1200,14"
                stroke="#38bdf8"
                strokeWidth={1.2}
                strokeLinecap="round"
                fill="none"
                className="animate-line-move"
                style={{ animationDuration: '10s', animationTimingFunction: 'ease-in-out', animationDelay: '1.2s' }}
              />

              <path
                d="M0,10 C150,0 300,20 450,10 C600,0 750,20 900,10 C1050,0 1200,10 1200,10"
                stroke="#0ea5e9"
                strokeWidth={1.0}
                strokeLinecap="round"
                fill="none"
                className="animate-line-move"
                style={{ animationDuration: '11s', animationTimingFunction: 'ease-in-out', animationDelay: '2.1s' }}
              />
            </g>
          </svg>

          {/* subtle pulsing overlay to increase contrast (applies to whole group) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 mix-blend-normal opacity-60 animate-line-pulse"></div>
          </div>

          {/* end fades — blurred white overlays to softly fade lines at the edges without gradients */}
          <div
            aria-hidden
            className="absolute left-0 top-0 h-full w-1/4 pointer-events-none"
            style={{ backgroundColor: 'rgba(255,255,255,1)', filter: 'blur(10px)', opacity: 0.9 }}
          />
          <div
            aria-hidden
            className="absolute right-0 top-0 h-full w-1/4 pointer-events-none"
            style={{ backgroundColor: 'rgba(255,255,255,1)', filter: 'blur(10px)', opacity: 0.9 }}
          />
        </div>
        
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Geometric logo */}
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-primary-500 rounded-sm transform rotate-45"></div>
                <div className="absolute inset-2 bg-white rounded-sm transform rotate-45"></div>
                <div className="absolute inset-3 bg-primary-500 rounded-sm transform rotate-45"></div>
              </div>
              <div className="text-2xl font-display font-bold text-gray-900">
                Pulse LS
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <Link
                href="/"
                className="group px-4 py-2 text-gray-700 font-medium relative"
              >
                <span>Home</span>
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug.current}`}
                  className="group px-4 py-2 text-gray-700 font-medium relative"
                >
                  <span>{category.title}</span>
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </Link>
              ))}
              <Link
                href="/about"
                className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-all"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-all"
              >
                Contact
              </Link>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="group p-2 relative"
                aria-label="Open search"
                aria-expanded={isSearchOpen}
              >
                <div className="absolute inset-0 bg-gray-100 transform scale-0 group-hover:scale-100 transition-transform origin-center rotate-45"></div>
                <FiSearch className="w-5 h-5 text-gray-700 relative z-10 transform group-hover:rotate-90 transition-transform" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 relative group"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className="absolute inset-0 bg-gray-100 transform scale-0 group-hover:scale-100 transition-transform origin-center rotate-45"></div>
                {isMenuOpen ? (
                  <FiX className="w-5 h-5 text-gray-700 relative z-10 transform group-hover:rotate-90 transition-transform" />
                ) : (
                  <FiMenu className="w-5 h-5 text-gray-700 relative z-10 transform group-hover:rotate-90 transition-transform" />
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {isSearchOpen && (
            <div className="py-4 border-t border-gray-100">
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gray-50 transform -rotate-1"></div>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search articles..."
                      className="w-full px-4 py-3 pl-12 bg-white border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-all"
                      autoFocus
                      aria-label="Search articles"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6">
                      <div className="absolute inset-0 bg-gray-100 transform rotate-45"></div>
                      <FiSearch aria-hidden className="absolute inset-0 w-full h-full p-1 text-gray-500" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div id="mobile-menu" role="menu" className="md:hidden border-t border-gray-100 bg-white">
            <div className="container mx-auto px-4 py-4 space-y-1">
              <MobileMenuItem href="/" onClose={() => setIsMenuOpen(false)}>
                Home
              </MobileMenuItem>
              {categories.map((category) => (
                <MobileMenuItem
                  key={category._id}
                  href={`/category/${category.slug.current}`}
                  onClose={() => setIsMenuOpen(false)}
                >
                  {category.title}
                </MobileMenuItem>
              ))}
              <MobileMenuItem href="/about" onClose={() => setIsMenuOpen(false)}>
                About
              </MobileMenuItem>
              <MobileMenuItem href="/contact" onClose={() => setIsMenuOpen(false)}>
                Contact
              </MobileMenuItem>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
