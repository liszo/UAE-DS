import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { uiUxData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'UI/UX Design & Branding UAE - 3x More Conversions | UAE Digital Solution',
  description: 'Stop losing visitors to poor design. Get modern, conversion-optimized design. 156% engagement increase. 14-day delivery.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'UI/UX Design - 3x More Conversions',
    description: 'Professional design that converts. 156% more engagement. 14-day delivery.',
    images: ['/og-images/ui-ux-design.jpg'],
  },
}

export default function UIUXLandingPage() {
  return <LandingPageTemplate data={uiUxData} />
}

