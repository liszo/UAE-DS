import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { aiChatbotData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'AI Chatbot Implementation UAE - 340% More Leads | UAE Digital Solution',
  description: 'Stop missing 73% of leads after hours. Get 24/7 AI chatbot that converts. 340% more leads captured. Bilingual English/Arabic.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'AI Chatbot - 340% More Leads 24/7',
    description: '24/7 lead capture. Instant responses. 87% support reduction. Bilingual.',
    images: ['/og-images/ai-chatbot.jpg'],
  },
}

export default function AIChatbotLandingPage() {
  return <LandingPageTemplate data={aiChatbotData} />
}

