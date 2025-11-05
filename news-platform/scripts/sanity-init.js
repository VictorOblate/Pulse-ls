#!/usr/bin/env node

/**
 * This script helps initialize sample data in Sanity CMS
 * Run after setting up your Sanity project
 */

const sampleCategories = [
  {
    _type: 'category',
    title: 'Politics',
    slug: { current: 'politics' },
    description: 'Latest political news and analysis',
    color: '#dc2626',
  },
  {
    _type: 'category',
    title: 'Business',
    slug: { current: 'business' },
    description: 'Business and economy news',
    color: '#059669',
  },
  {
    _type: 'category',
    title: 'Technology',
    slug: { current: 'technology' },
    description: 'Tech news and innovations',
    color: '#2563eb',
  },
  {
    _type: 'category',
    title: 'Sports',
    slug: { current: 'sports' },
    description: 'Sports news and updates',
    color: '#ea580c',
  },
  {
    _type: 'category',
    title: 'Entertainment',
    slug: { current: 'entertainment' },
    description: 'Entertainment and celebrity news',
    color: '#9333ea',
  },
  {
    _type: 'category',
    title: 'World',
    slug: { current: 'world' },
    description: 'International news',
    color: '#0891b2',
  },
]

const sampleAuthor = {
  _type: 'author',
  name: 'John Doe',
  slug: { current: 'john-doe' },
  bio: 'Senior journalist with over 10 years of experience covering technology and business.',
  email: 'john.doe@newshub.com',
}

console.log('📝 Sample Sanity Data Structure')
console.log('================================\n')
console.log('Copy and paste these into your Sanity Studio:\n')
console.log('CATEGORIES:')
console.log(JSON.stringify(sampleCategories, null, 2))
console.log('\n\nAUTHOR:')
console.log(JSON.stringify(sampleAuthor, null, 2))
console.log('\n\n💡 TIP: Go to http://localhost:3000/admin to create these manually')
console.log('or use Sanity CLI to import this data.\n')
