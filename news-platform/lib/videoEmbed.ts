export function getVideoEmbedUrl(url: string): string | null {
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // TikTok
  const tiktokRegex = /tiktok\.com\/.*\/video\/(\d+)/
  const tiktokMatch = url.match(tiktokRegex)
  if (tiktokMatch) {
    return `https://www.tiktok.com/embed/${tiktokMatch[1]}`
  }

  // Facebook
  const facebookRegex = /facebook\.com\/.*\/videos\/(\d+)/
  const facebookMatch = url.match(facebookRegex)
  if (facebookMatch) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`
  }

  // Instagram
  const instagramRegex = /instagram\.com\/(p|reel)\/([a-zA-Z0-9_-]+)/
  const instagramMatch = url.match(instagramRegex)
  if (instagramMatch) {
    return `https://www.instagram.com/${instagramMatch[1]}/${instagramMatch[2]}/embed`
  }

  return null
}

export function getVideoPlatform(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
  if (url.includes('tiktok.com')) return 'tiktok'
  if (url.includes('facebook.com')) return 'facebook'
  if (url.includes('instagram.com')) return 'instagram'
  return 'unknown'
}
