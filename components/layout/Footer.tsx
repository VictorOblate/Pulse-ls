'use client'

import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi'

interface Category {
  _id: string
  title: string
  slug: { current: string }
}

interface FooterProps {
  categories?: Category[]
}

export default function Footer({ categories = [] }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-dark-800 to-dark-900 text-white mt-16 relative">
      {/* Geometric Accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-display font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Pulse LS
              </h3>
              <p className="text-gray-400 mt-4">
                Your trusted source for breaking news, in-depth analysis, and compelling stories from Lesotho.
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-700 p-2 rounded-lg hover:bg-primary-600 transition-all"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-700 p-2 rounded-lg hover:bg-primary-600 transition-all"
                aria-label="Twitter"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-700 p-2 rounded-lg hover:bg-primary-600 transition-all"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-700 p-2 rounded-lg hover:bg-primary-600 transition-all"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-700 p-2 rounded-lg hover:bg-primary-600 transition-all"
                aria-label="YouTube"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white/90">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-gray-400 hover:text-white transition-colors">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white/90">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/category/${category.slug.current}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white/90">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">&copy; {currentYear} Pulse LS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
