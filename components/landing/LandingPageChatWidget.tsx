'use client'

import dynamic from 'next/dynamic'

// Dynamically import ChatWidget (client-side only)
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { 
  ssr: false 
})

export function LandingPageChatWidget() {
  return (
    <div className="landing-page-widget">
      <ChatWidget />
    </div>
  )
}

