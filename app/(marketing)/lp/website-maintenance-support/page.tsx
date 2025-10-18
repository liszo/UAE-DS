import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { maintenanceData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'Website Maintenance UAE - 99.99% Uptime Guarantee | UAE Digital Solution',
  description: 'Never worry about website disasters. 24/7 monitoring, daily backups, <30 min response time. Get 3 months FREE.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Website Maintenance - 99.99% Uptime',
    description: '24/7 protection. Daily backups. Instant response. 3 months FREE.',
    images: ['/og-images/website-maintenance.jpg'],
  },
}

export default function MaintenanceLandingPage() {
  return <LandingPageTemplate data={maintenanceData} />
}

