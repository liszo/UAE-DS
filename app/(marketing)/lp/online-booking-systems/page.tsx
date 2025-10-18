import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing/LandingPageTemplate'
import { bookingSystemData } from '@/lib/landing-page-data'

export const metadata: Metadata = {
  title: 'Online Booking System UAE - 40% More Revenue | UAE Digital Solution',
  description: 'Stop losing bookings to phone tag. Get automated 24/7 booking system. 40% more bookings, zero double-bookings, 15 hours saved weekly.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Online Booking - 40% More Bookings',
    description: '24/7 automated bookings. Zero double-bookings. 40% revenue increase.',
    images: ['/og-images/booking-system.jpg'],
  },
}

export default function BookingSystemLandingPage() {
  return <LandingPageTemplate data={bookingSystemData} />
}

