import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { websiteMigrationData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'Website Migration Services UAE - Zero Downtime Migration | UAE Digital Solution',
  description: 'Migrate to faster hosting in 48 hours with zero downtime. 3x speed improvement average. SEO rankings protected.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Website Migration - Zero Downtime Guarantee',
    description: 'Safe, fast migration. 3x speed increase. Zero downtime. 48-hour turnaround.',
    images: ['/og-images/website-migration.jpg'],
  },
}

export default function WebsiteMigrationLandingPage() {
  return <LandingPageTemplate data={websiteMigrationData} />
}

