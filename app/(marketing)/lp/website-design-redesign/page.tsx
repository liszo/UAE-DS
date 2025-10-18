import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { websiteDesignData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'Website Design & Redesign UAE - 3x More Leads | UAE Digital Solution',
  description: 'Outdated design killing credibility? Get modern website in 2-3 weeks. 3x more leads. Mobile-first. Unlimited revisions.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Website Design - Modern & Converting',
    description: '3x lead generation. 2-3 week launch. Mobile-first design. Unlimited revisions.',
    images: ['/og-images/website-design.jpg'],
  },
}

export default function WebsiteDesignLandingPage() {
  return <LandingPageTemplate data={websiteDesignData} />
}

