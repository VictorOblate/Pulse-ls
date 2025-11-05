'use client'

import { getVideoEmbedUrl, getVideoPlatform } from '@/lib/videoEmbed'

interface VideoEmbedProps {
  url: string
  caption?: string
  className?: string
}

export default function VideoEmbed({ url, caption, className = '' }: VideoEmbedProps) {
  const embedUrl = getVideoEmbedUrl(url)
  const platform = getVideoPlatform(url)

  if (!embedUrl) {
    return (
      <div className={`bg-gray-100 p-6 rounded-lg text-center ${className}`}>
        <p className="text-gray-600">Unable to embed video from this URL</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:underline mt-2 inline-block"
        >
          Watch video
        </a>
      </div>
    )
  }

  const getAspectRatio = () => {
    if (platform === 'tiktok' || platform === 'instagram') {
      return 'aspect-[9/16] max-w-md mx-auto' // Vertical videos
    }
    return 'aspect-video' // Standard 16:9
  }

  return (
    <figure className={`my-8 ${className}`}>
      <div className={`relative ${getAspectRatio()} w-full overflow-hidden rounded-lg`}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-600 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
