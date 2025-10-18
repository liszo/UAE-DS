import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { seoData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'SEO Services UAE - Rank #1 in 90 Days or Money Back | UAE Digital Solution',
  description: 'Stop losing AED 50K+ monthly to competitors. Get proven SEO that ranks you on page 1 in 90 days. Guaranteed or full refund.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'SEO Services - Page 1 Guarantee',
    description: 'Dominate UAE search results. 247% organic traffic increase average. 90-day guarantee.',
    images: ['/og-images/seo-services.jpg'],
  },
}

export default function SEOLandingPage() {
  return <LandingPageTemplate data={seoData} />
}

