import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { googleAdsData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'Google Ads Management in UAE - Limited Time 30% OFF | UAE Digital Solution',
  description: 'Stop wasting 70% of your ad budget. Get 347% more ROI with expert Google Ads management. Only 5 spots available this month. Money-back guarantee.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Google Ads Management - Special UAE Offer',
    description: 'Transform wasted ad spend into qualified leads. 347% average ROI increase. Limited time offer.',
    images: ['/og-images/google-ads-management.jpg'],
  },
}

export default function GoogleAdsLandingPage() {
  return <LandingPageTemplate data={googleAdsData} />
}

