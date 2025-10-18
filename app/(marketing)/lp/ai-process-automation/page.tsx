import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { aiAutomationData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'AI Process Automation UAE - Save 25+ Hours Weekly | UAE Digital Solution',
  description: 'Stop wasting 40% staff time on manual work. Get AI automation that saves 25+ hours weekly. 94% fewer errors. 3-month ROI.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'AI Automation - 25+ Hours Saved Weekly',
    description: 'Automate repetitive tasks. 94% error reduction. 3-month ROI guaranteed.',
    images: ['/og-images/ai-automation.jpg'],
  },
}

export default function AIAutomationLandingPage() {
  return <LandingPageTemplate data={aiAutomationData} />
}

