import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import VideoEmbed from '@/components/video/VideoEmbed'
import { InArticleAd } from '@/components/ads/AdPlacements'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <div className="relative w-full h-auto overflow-hidden rounded-lg">
            <Image
              src={value.asset.url}
              alt={value.alt || 'Article image'}
              width={1200}
              height={675}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-sm text-gray-600 text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    videoEmbed: ({ value }) => {
      if (!value?.url) return null
      return <VideoEmbed url={value.url} caption={value.caption} />
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-8 mb-3 text-gray-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mt-6 mb-2 text-gray-900">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-lg leading-relaxed mb-6 text-gray-700">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-500 pl-6 py-2 my-6 italic text-gray-700 bg-gray-50 rounded-r">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-primary-600">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary-600 hover:text-primary-700 underline"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
        {children}
      </ol>
    ),
  },
}

interface PortableTextContentProps {
  value: any
  insertAds?: boolean
}

export default function PortableTextContent({ value, insertAds = true }: PortableTextContentProps) {
  if (!insertAds) {
    return <PortableText value={value} components={components} />
  }

  // Insert ads every 3 paragraphs
  const blocks = value || []
  const contentWithAds: any[] = []
  let paragraphCount = 0

  blocks.forEach((block: any, index: number) => {
    contentWithAds.push(block)

    if (block._type === 'block' && block.style === 'normal') {
      paragraphCount++
      if (paragraphCount % 3 === 0 && index < blocks.length - 1) {
        contentWithAds.push({
          _type: 'ad',
          _key: `ad-${index}`,
        })
      }
    }
  })

  return (
    <>
      {contentWithAds.map((block, index) => {
        if (block._type === 'ad') {
          return <InArticleAd key={block._key} />
        }
        return <PortableText key={block._key || index} value={[block]} components={components} />
      })}
    </>
  )
}
