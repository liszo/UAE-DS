import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { performanceData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'Website Speed Optimization UAE - 47% More Sales | UAE Digital Solution',
  description: 'Slow site killing conversions? Get <1s load time. 90+ PageSpeed score guaranteed. 47% revenue increase average.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Website Speed - 90+ PageSpeed Guaranteed',
    description: 'Lightning-fast site in 7 days. 47% revenue increase. 90+ PageSpeed guaranteed.',
    images: ['/og-images/website-performance.jpg'],
  },
}

export default function PerformanceLandingPage() {
  return <LandingPageTemplate data={performanceData} />
}

