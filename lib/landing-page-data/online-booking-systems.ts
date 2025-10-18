import { ServiceLandingPageData } from '@/lib/types/landing-page'

export const bookingSystemData: ServiceLandingPageData = {
  slug: 'online-booking-systems',
  name: 'Online Booking System Integration',
  servicePageUrl: '/services/online-booking-systems',
  
  headline: 'Automate Appointments & Bookings - Add 40% More Revenue',
  subtitle: 'Stop losing bookings to phone tag and email delays. Get automated system that captures appointments 24/7.',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  heroStats: { clients: '200', yearsInBusiness: '5', spotsRemaining: 6 },
  cta: {
    primary: 'Get Booking Demo',
    secondary: 'See It Live',
    primaryLink: '#contact',
    secondaryLink: '#results'
  },
  
  problemSectionTitle: 'The Booking Problem Costing You Daily',
  painPoints: [
    {
      icon: '📞',
      title: 'Losing Bookings to Phone Tag',
      description: 'Customers call, you miss it, they never call back. Email back-and-forth takes days. They book elsewhere.',
      cost: '40% of potential bookings lost'
    },
    {
      icon: '🤦',
      title: 'Double Bookings & Chaos',
      description: 'Manual scheduling leads to errors. Double bookings destroy customer trust and waste everyone\'s time.',
      cost: 'Hours weekly fixing scheduling disasters'
    },
    {
      icon: '⏰',
      title: 'Staff Wasting 15+ Hours Weekly',
      description: 'Team spends hours on phone managing bookings. That\'s time not spent serving customers or growing business.',
      cost: 'AED 5,000+ monthly in wasted staff time'
    }
  ],
  
  solutionTitle: 'How We Automate Your Bookings in 5 Days',
  solutionSubtitle: 'Professional booking system that works 24/7 while you sleep',
  process: [
    {
      number: 1,
      title: 'Booking Requirements Analysis',
      description: 'We understand your services, availability, booking rules, and payment needs.',
      outcome: 'Complete booking system specification',
      duration: '1 day'
    },
    {
      number: 2,
      title: 'System Setup & Configuration',
      description: 'We configure booking system with your services, staff, hours, and business rules.',
      outcome: 'Customized booking system ready for testing',
      duration: '2 days'
    },
    {
      number: 3,
      title: 'Website Integration',
      description: 'We integrate booking system seamlessly into your website. Mobile-optimized and branded.',
      outcome: 'Live booking system on your website',
      duration: '1 day'
    },
    {
      number: 4,
      title: 'Training & Launch',
      description: 'We train your team, test all scenarios, and launch. Provide documentation and support.',
      outcome: '40% more bookings captured automatically',
      duration: '1 day'
    }
  ],
  
  resultsTitle: 'Real Booking System Results',
  metrics: [
    {
      value: '40%',
      label: 'More Bookings Captured',
      icon: '📈'
    },
    {
      value: 'Zero',
      label: 'Double-Bookings',
      icon: '✅'
    },
    {
      value: '15 Hours',
      label: 'Staff Time Saved Weekly',
      icon: '⏰'
    },
    {
      value: '24/7',
      label: 'Accepting Bookings',
      icon: '🌙'
    }
  ],
  caseStudies: [
    {
      industry: 'Medical Clinic - Abu Dhabi',
      beforeMetrics: ['Phone/email bookings only', 'Double bookings weekly', 'Staff overwhelmed'],
      afterMetrics: ['70% online bookings', 'Zero double bookings', 'Staff freed for patient care'],
      timeframe: 'Implemented in 4 days',
      testimonial: 'Booking system transformed our operations. Staff love it, patients love it, we\'re booking 40% more appointments.',
      author: 'Dr. Maryam Al-Rashid, Clinic Director'
    }
  ],
  testimonials: [
    {
      quote: 'We were missing bookings daily. Now system captures them 24/7 automatically. Revenue up 40% without adding staff.',
      author: 'Omar Hassan',
      role: 'Owner',
      company: 'Salon Business',
      location: 'Dubai',
      results: '40% revenue increase, 15 hours saved weekly'
    }
  ],
  
  whyUsTitle: 'Why Choose Our Booking Solutions',
  differentiators: [
    {
      title: 'Industry-Specific Solutions',
      description: 'Booking systems tailored for your industry: medical, beauty, consulting, fitness, rentals.',
      icon: '🎯',
      highlight: true
    },
    {
      title: '5-Day Implementation',
      description: 'Live booking system in 5 days. Fast setup, zero downtime.',
      icon: '⚡'
    },
    {
      title: '40% More Bookings',
      description: 'Clients capture 40% more bookings with 24/7 automated system.',
      icon: '📈',
      highlight: true
    },
    {
      title: 'Payment Integration',
      description: 'Accept payments, deposits, or full payment at booking. All major payment methods.',
      icon: '💳'
    },
    {
      title: 'Automated Reminders',
      description: 'Automatic SMS/email reminders reduce no-shows by 60%.',
      icon: '📱'
    },
    {
      title: 'Calendar Sync',
      description: 'Syncs with Google Calendar, Outlook, Apple Calendar. Staff always updated.',
      icon: '📅'
    }
  ],
  
  offer: {
    discount: '35% OFF Setup Fee',
    bonus: 'FREE 6 Months Premium Features (Worth AED 2,400)',
    deadline: 'Next 6 Clients',
    spotsRemaining: 6,
    guarantee: '40% More Bookings or Money Back'
  },
  
  faqs: [
    {
      question: 'How quickly can booking system be live?',
      answer: 'Complete implementation takes 5 days from start to launch. Simple setups can be ready in 3 days. You\'ll be accepting automated bookings within a week.'
    },
    {
      question: 'What types of businesses use booking systems?',
      answer: 'Medical/dental clinics, salons/spas, consultants, fitness studios, equipment rentals, photographers, tutors, any appointment-based business.'
    },
    {
      question: 'Can customers book from mobile phones?',
      answer: 'Yes! Fully mobile-optimized. Customers can book from any device. 70% of bookings happen on mobile.'
    },
    {
      question: 'Does it integrate with my calendar?',
      answer: 'Yes. Syncs with Google Calendar, Outlook, Apple Calendar. Your schedule stays updated automatically.'
    },
    {
      question: 'Can I accept payments at booking?',
      answer: 'Yes. Integrate with payment gateways. Accept full payment, deposits, or later payment. Your choice.'
    },
    {
      question: 'How much does it cost?',
      answer: 'One-time setup fee: AED 4,000 (currently 35% off at AED 2,600). Monthly platform fee: AED 200/month (first 6 months free). Includes unlimited bookings.'
    },
    {
      question: 'What if I need to customize booking rules?',
      answer: 'Fully customizable: booking windows, buffer times, service duration, staff assignments, pricing rules. We configure everything for your specific needs.'
    }
  ],
  
  trustBadges: [
    { text: '200+ Booking Systems', icon: '📅' },
    { text: '40% More Bookings', icon: '📈' },
    { text: '5-Day Setup', icon: '⚡' },
    { text: '24/7 Availability', icon: '🌙' }
  ]
}

