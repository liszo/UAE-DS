import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { ecommerceData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'E-commerce Enhancement UAE - Add AED 100K Monthly | UAE Digital Solution',
  description: 'Stop losing 68% cart abandonment. Get 2-3x conversion rate increase. 42% cart recovery. Transform your online store.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'E-commerce Enhancement - 2-3x Conversions',
    description: 'Reduce cart abandonment. Increase conversions. AED 850K generated in 2024.',
    images: ['/og-images/ecommerce-enhancement.jpg'],
  },
}

export default function EcommerceLandingPage() {
  return <LandingPageTemplate data={ecommerceData} />
}

