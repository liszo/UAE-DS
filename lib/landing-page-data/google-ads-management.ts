import { ServiceLandingPageData } from '@/lib/types/landing-page'

export const googleAdsData: ServiceLandingPageData = {
  slug: 'google-ads-management',
  name: 'Google Ads Management',
  servicePageUrl: '/services/google-ads-management',
  
  headline: 'Stop Burning Cash on Google Ads That Don\'t Convert',
  subtitle: 'Get 347% more ROI with data-driven Google Ads campaigns optimized for UAE market. Turn wasted ad spend into qualified leads in 14 days.',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual NotebookLM video
  heroStats: {
    clients: '200',
    yearsInBusiness: '5',
    spotsRemaining: 5
  },
  cta: {
    primary: 'Get My Free Audit',
    secondary: 'Watch Success Stories',
    primaryLink: '#contact',
    secondaryLink: '#results'
  },
  
  problemSectionTitle: 'The Google Ads Problem Costing UAE Businesses Millions',
  painPoints: [
    {
      icon: '💸',
      title: 'Wasting 70% of Ad Budget',
      description: 'Throwing money at wrong keywords, irrelevant searches, and unqualified clicks that never convert.',
      cost: 'AED 50,000+ monthly in wasted spend',
      highlight: 'Most businesses waste 3/4 of their ad budget on clicks that never turn into customers'
    },
    {
      icon: '📉',
      title: 'Getting Clicks But Zero Leads',
      description: 'High click-through rates mean nothing when landing pages don\'t convert and targeting is off.',
      cost: 'Lost revenue worth AED 100,000+ monthly',
      highlight: 'Your competitors are capturing leads while you\'re just getting expensive clicks'
    },
    {
      icon: '🎯',
      title: 'Competitors Dominating Your Terms',
      description: 'While you struggle with poor ad positioning and high costs per click, competitors steal your market share.',
      cost: 'Permanent customer loss to competition'
    }
  ],
  
  solutionTitle: 'How We Transform Your Google Ads in 14 Days',
  solutionSubtitle: 'Our proven 4-step system turns wasted ad spend into profitable campaigns',
  process: [
    {
      number: 1,
      title: 'Deep Dive Campaign Audit',
      description: 'We analyze your current campaigns, identify bleeding points, and uncover missed opportunities your competitors are exploiting.',
      outcome: 'Complete roadmap with exact fixes and expected ROI improvements',
      duration: '48 hours'
    },
    {
      number: 2,
      title: 'Strategic Restructure & Launch',
      description: 'We rebuild campaigns from scratch with laser-focused targeting, UAE market insights, and conversion-optimized landing pages.',
      outcome: 'New campaigns live with optimized keywords and compelling ad copy',
      duration: '7 days'
    },
    {
      number: 3,
      title: 'Continuous Optimization',
      description: 'Daily monitoring, A/B testing, bid adjustments, and real-time refinements based on performance data.',
      outcome: '3x improvement in cost per lead within 30 days',
      duration: 'Ongoing'
    },
    {
      number: 4,
      title: 'Monthly Strategy Sessions',
      description: 'Regular performance reviews, market trend updates, and strategic planning to scale winning campaigns.',
      outcome: 'Sustained growth and maximum ROI month after month',
      duration: 'Monthly'
    }
  ],
  
  resultsTitle: 'Real Results from UAE Businesses Using Our Google Ads Services',
  metrics: [
    {
      value: '347%',
      label: 'Average ROI Increase',
      icon: '📈',
      description: 'Clients see 3.5x better returns on ad spend'
    },
    {
      value: '68%',
      label: 'Reduced Cost Per Lead',
      icon: '💰',
      description: 'Same budget, more qualified leads'
    },
    {
      value: 'AED 2.4M',
      label: 'Generated for Clients in 2024',
      icon: '💵',
      description: 'Measurable revenue impact'
    },
    {
      value: '14 Days',
      label: 'Average Time to Results',
      icon: '⚡',
      description: 'See improvements in 2 weeks'
    }
  ],
  caseStudies: [
    {
      industry: 'E-commerce - Dubai',
      beforeMetrics: [
        '50 leads/month at AED 200/lead',
        '2% conversion rate',
        'AED 10,000 monthly ad spend'
      ],
      afterMetrics: [
        '340 leads/month at AED 65/lead',
        '8.5% conversion rate',
        'AED 10,000 monthly ad spend'
      ],
      timeframe: '60 days',
      testimonial: 'We went from barely breaking even to 4x ROI. The team knows exactly what works in the UAE market.',
      author: 'Ahmad K., E-commerce Director'
    },
    {
      industry: 'Professional Services - Abu Dhabi',
      beforeMetrics: [
        'AED 500 cost per qualified lead',
        '15 leads/month',
        'Competing with irrelevant searches'
      ],
      afterMetrics: [
        'AED 120 cost per qualified lead',
        '87 leads/month',
        'Top position for target keywords'
      ],
      timeframe: '45 days',
      testimonial: 'Finally, Google Ads that actually work for our business. ROI went through the roof.',
      author: 'Sara M., Marketing Manager'
    }
  ],
  testimonials: [
    {
      quote: 'Our Google Ads were a money pit until UAE Digital Solution took over. Now we\'re getting 5x more leads at half the cost. Game changer.',
      author: 'Mohammed Al-Hashimi',
      role: 'CEO',
      company: 'TechStart Dubai',
      location: 'Dubai',
      results: '5x more leads, 50% lower cost per lead'
    },
    {
      quote: 'I was about to quit Google Ads entirely. These guys turned it around in 2 weeks. Now it\'s our best performing channel.',
      author: 'Fatima Abdullah',
      role: 'Marketing Director',
      company: 'Luxury Retailer',
      location: 'Abu Dhabi',
      results: '320% ROI increase in 30 days'
    },
    {
      quote: 'Finally found a team that understands both Google Ads AND the UAE market. Results speak for themselves.',
      author: 'John Peterson',
      role: 'Business Owner',
      company: 'Service Company',
      location: 'Dubai',
      results: 'From AED 50K to AED 180K monthly revenue'
    }
  ],
  
  whyUsTitle: 'Why UAE Businesses Choose Us for Google Ads',
  differentiators: [
    {
      title: 'UAE Market Expertise',
      description: '5+ years optimizing campaigns specifically for UAE audience behavior, search patterns, and buying cycles.',
      icon: '🇦🇪',
      highlight: true
    },
    {
      title: 'Proven 347% ROI Track Record',
      description: 'Data-backed results across 200+ campaigns. We don\'t guess, we know what works.',
      icon: '📊',
      highlight: true
    },
    {
      title: 'Results in 14 Days',
      description: 'See measurable improvements in your first 2 weeks. No 6-month waiting period.',
      icon: '⚡'
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees. No surprises. You know exactly what you\'re paying and what you\'re getting.',
      icon: '💎'
    },
    {
      title: 'Money-Back Guarantee',
      description: 'If we don\'t improve your ROI by 200% in 90 days, get a full refund. Zero risk.',
      icon: '🛡️',
      highlight: true
    },
    {
      title: 'Dedicated Account Manager',
      description: 'Direct access to your expert (not a chatbot). Average response time: 2 hours.',
      icon: '👨‍💼'
    },
    {
      title: 'Advanced AI Optimization',
      description: 'We use cutting-edge AI tools for bid optimization, audience targeting, and predictive analysis.',
      icon: '🤖'
    },
    {
      title: 'Bilingual Support',
      description: 'Full support in English and Arabic for campaigns targeting both demographics.',
      icon: '🗣️'
    }
  ],
  
  offer: {
    discount: '30% OFF First Month',
    bonus: 'FREE Landing Page Optimization (Worth AED 2,500)',
    deadline: 'This Week Only',
    spotsRemaining: 5,
    guarantee: '90-Day Money-Back Guarantee'
  },
  
  faqs: [
    {
      question: 'How quickly can we start seeing results?',
      answer: 'Most clients see measurable improvements within 14 days of launch. We restructure campaigns immediately and begin optimization on day 1. Within the first month, you should see 200%+ ROI improvement. Full optimization takes 60-90 days as we gather data and refine targeting.'
    },
    {
      question: 'What does Google Ads management cost?',
      answer: 'Our management fee starts at AED 3,000/month (currently 30% off at AED 2,100 for new clients). This doesn\'t include your Google ad spend budget. We typically recommend a minimum ad spend of AED 5,000/month for effective campaigns. All pricing is transparent with no hidden fees.'
    },
    {
      question: 'Do you require a long-term contract?',
      answer: 'No long-term contracts required. We offer month-to-month service because we\'re confident you\'ll see results and want to continue. You can cancel anytime with 30 days notice. That said, 89% of our clients stay with us long-term because of the results.'
    },
    {
      question: 'What makes you different from other Google Ads agencies?',
      answer: 'Three things: (1) UAE market specialization - we know exactly what works here, (2) Speed - results in 14 days, not 6 months, and (3) Guarantee - 200% ROI improvement or your money back. Most agencies can\'t offer that level of confidence.'
    },
    {
      question: 'Will I have access to my campaign data?',
      answer: 'Absolutely. You\'ll have full access to your Google Ads account at all times. We provide weekly performance reports and monthly strategy sessions. Complete transparency - it\'s your data and your campaigns.'
    },
    {
      question: 'What if I\'m currently working with another agency?',
      answer: 'We can take over seamlessly. We\'ll audit your current campaigns, identify what\'s working (if anything), and restructure for better performance. Many clients come to us after disappointing experiences with other agencies. We make the transition smooth and risk-free.'
    },
    {
      question: 'Do you work with businesses outside Dubai?',
      answer: 'Yes! We work with businesses across all UAE emirates (Dubai, Abu Dhabi, Sharjah, Ajman, etc.) and even neighboring GCC countries. Our expertise is in the Middle East market, wherever your customers are located.'
    }
  ],
  
  trustBadges: [
    { text: 'Google Partner Certified', icon: '✓' },
    { text: '200+ Happy Clients', icon: '⭐' },
    { text: '5 Years in UAE', icon: '🇦🇪' },
    { text: '24/7 Support Available', icon: '🔔' }
  ]
}

