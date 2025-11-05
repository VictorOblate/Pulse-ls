import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ query helpers
export const postFields = `
  _id,
  title,
  slug,
  excerpt,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  "category": category->{
    _id,
    title,
    slug,
    color
  },
  "author": author->{
    _id,
    name,
    slug,
    "image": image.asset->url,
    bio
  },
  tags,
  featuredVideo,
  body,
  featured,
  publishedAt,
  seo
`
