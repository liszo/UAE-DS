import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { websiteSecurityData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'Website Security Services UAE - Zero Breach Guarantee | UAE Digital Solution',
  description: 'One hack costs AED 180K+. Get military-grade 24/7 protection. Zero breaches across 200+ sites. 40% OFF first year.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Website Security - Zero Breach Guarantee',
    description: '99.99% uptime protection. 24/7 monitoring. Zero successful breaches ever.',
    images: ['/og-images/website-security.jpg'],
  },
}

export default function WebsiteSecurityLandingPage() {
  return <LandingPageTemplate data={websiteSecurityData} />
}

