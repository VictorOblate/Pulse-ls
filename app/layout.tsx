import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SessionProvider from '@/components/providers/SessionProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MobileStickyAd } from '@/components/ads/AdPlacements'
import { client } from '@/lib/sanity'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Pulse LS - Your Source for Breaking News',
    template: '%s | Pulse LS',
  },
  description: 'Stay informed with the latest news, in-depth analysis, and compelling stories from around the world.',
  keywords: ['news', 'breaking news', 'world news', 'politics', 'business', 'technology'],
  authors: [{ name: 'Pulse LS' }],
  creator: 'Pulse LS',
  publisher: 'Pulse LS',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Pulse LS',
    title: 'Pulse LS - Your Source for Breaking News',
    description: 'Stay informed with the latest news, in-depth analysis, and compelling stories from around the world.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulse LS - Your Source for Breaking News',
    description: 'Stay informed with the latest news, in-depth analysis, and compelling stories from around the world.',
    creator: '@Pulse LS',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

async function getCategories() {
  try {
    const categories = await client.fetch(`
      *[_type == "category"] | order(title asc) {
        _id,
        title,
        slug,
        color
      }
    `)
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const categories = await getCategories()

  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="flex flex-col min-h-screen">
            <Navbar categories={categories} />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <MobileStickyAd />
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
