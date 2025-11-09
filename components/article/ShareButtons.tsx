'use client'

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${url}`

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-semibold text-gray-700">Share:</span>
      
      <FacebookShareButton url={shareUrl} hashtag="#news">
        <FacebookIcon size={32} round className="hover:opacity-80 transition" />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round className="hover:opacity-80 transition" />
      </TwitterShareButton>

      <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={32} round className="hover:opacity-80 transition" />
      </LinkedinShareButton>

      <WhatsappShareButton url={shareUrl} title={title} separator=" - ">
        <WhatsappIcon size={32} round className="hover:opacity-80 transition" />
      </WhatsappShareButton>
    </div>
  )
}