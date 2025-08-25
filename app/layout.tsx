import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PersimmonLabs - Your Brand\'s Content Team, On Autopilot',
  description: 'We create, schedule, and publish high-quality posts across Instagram, LinkedIn, Facebook, and Twitter/X. Stay consistent, on-brand, and top-of-mind with your audience.',
  keywords: 'content automation, social media automation, AI content creation, automated posting, content marketing, social media management, brand consistency, content scheduling',
  authors: [{ name: 'PersimmonLabs' }],
  creator: 'PersimmonLabs',
  publisher: 'PersimmonLabs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://persimmonlabs.cc'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PersimmonLabs - Your Brand\'s Content Team, On Autopilot',
    description: 'Never miss a post again. We create and publish on-brand content across all your social channels. Focus on your business while your content engine runs 24/7.',
    url: 'https://persimmonlabs.cc',
    siteName: 'PersimmonLabs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PersimmonLabs - Automated Content Generation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PersimmonLabs - Automated Content Generation',
    description: 'Your brand\'s content team, on autopilot. Consistent, on-brand posts across all platforms.',
    images: ['/twitter-image.png'],
    creator: '@persimmonlabs',
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}