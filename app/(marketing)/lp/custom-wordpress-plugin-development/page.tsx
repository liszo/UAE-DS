import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { wordpressPluginData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'Custom WordPress Plugin Development UAE - No Monthly Fees | UAE Digital Solution',
  description: 'Stop paying monthly for plugins that almost work. Get custom solution built perfectly for you. 50% faster, zero fees.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Custom WordPress Plugin - Perfect Fit',
    description: 'Custom functionality. One-time cost. 50% faster. Perfect workflow match.',
    images: ['/og-images/wordpress-plugin.jpg'],
  },
}

export default function WordPressPluginLandingPage() {
  return <LandingPageTemplate data={wordpressPluginData} />
}

