import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Regain Clinic & Rehabilitation | Advanced Physiotherapy in Siliguri',
  description: 'Expert physiotherapy care for pain management, stroke rehabilitation, neurological conditions, and post-surgical recovery. Dr. Sanjeeb Bhattacharjee - 15+ years experience in Siliguri, West Bengal.',
  keywords: 'physiotherapy, rehabilitation, Siliguri, stroke recovery, pain management, neurological rehabilitation, Dr. Sanjeeb Bhattacharjee',
  authors: [{ name: 'Regain Clinic & Rehabilitation' }],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Regain Clinic & Rehabilitation | Advanced Physiotherapy in Siliguri',
    description: 'Expert physiotherapy care for pain management, stroke rehabilitation, and post-surgical recovery.',
    type: 'website',
    locale: 'en_IN',
  },
}

export const viewport: Viewport = {
  themeColor: '#1F4E8C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
