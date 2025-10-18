import { ServiceLandingPageData } from '@/lib/types/landing-page'
import Link from 'next/link'
import { 
  LandingHero, 
  UrgencyModal, 
  ProblemSection, 
  SolutionProcess,
  ResultsProof,
  WhyUsGrid,
  SpecialOffer,
  FAQAccordion,
  SectionNavigator,
} from '@/components/landing'

interface LandingPageTemplateProps {
  data: ServiceLandingPageData
}

export function LandingPageTemplate({ data }: LandingPageTemplateProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-white">
      {/* Section Navigator */}
      <SectionNavigator />

      {/* Urgency Modal - Bottom Left */}
      <UrgencyModal
        message={`${data.offer.discount} - ${data.offer.deadline}`}
        ctaText="Claim Offer Now"
        ctaLink="https://uaedigitalsolution.agency/contact"
        spotsRemaining={data.offer.spotsRemaining}
      />

      {/* Hero Section */}
      <div id="hero">
        <LandingHero
          headline={data.headline}
          subtitle={data.subtitle}
          videoUrl={data.videoUrl}
          videoPosterImage={data.videoPosterImage}
          cta={{
            primary: data.cta.primary,
            secondary: 'Learn More',
            primaryLink: 'https://uaedigitalsolution.agency/contact',
            secondaryLink: data.servicePageUrl
          }}
          heroStats={data.heroStats}
          trustBadges={data.trustBadges}
        />
      </div>

      {/* Problem Section */}
      <div id="problem">
        <ProblemSection
          title={data.problemSectionTitle}
          painPoints={data.painPoints}
          className="bg-neutral-50"
        />
      </div>

      {/* Solution Process */}
      <div id="solution">
        <SolutionProcess
          title={data.solutionTitle}
          subtitle={data.solutionSubtitle}
          steps={data.process}
        />
      </div>

      {/* Results & Proof */}
      <div id="results">
        <ResultsProof
          title={data.resultsTitle}
          metrics={data.metrics}
          caseStudies={data.caseStudies}
          testimonials={data.testimonials}
          className="bg-neutral-50"
        />
      </div>

      {/* Why Us Section */}
      <div id="why-us">
        <WhyUsGrid
          title={data.whyUsTitle}
          differentiators={data.differentiators}
        />
      </div>

      {/* Special Offer */}
      <div id="offer">
        <SpecialOffer
          offer={data.offer}
          ctaLink="https://uaedigitalsolution.agency/contact"
          className="bg-white"
        />
      </div>

      {/* FAQ Section */}
      <div id="faq">
        <FAQAccordion
          faqs={data.faqs}
          className="bg-neutral-50"
        />
      </div>

      {/* Final CTA Section - Contact & Service Links */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-900 to-neutral-950">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-300 mb-12 max-w-2xl mx-auto">
            Stop losing to your competitors. Get started today with our proven {data.name} solutions.
          </p>

          {/* CTA Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Get Quote */}
            <Link href="https://uaedigitalsolution.agency/contact">
              <div className="group p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl hover:shadow-2xl transition-all cursor-pointer">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="text-xl font-bold text-white mb-2">Request Quote</h3>
                <p className="text-sm text-white/80">Get a custom proposal for your business</p>
              </div>
            </Link>

            {/* Book Meeting */}
            <Link href="https://uaedigitalsolution.agency/booking">
              <div className="group p-6 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl hover:shadow-2xl transition-all cursor-pointer">
                <div className="text-4xl mb-3">📅</div>
                <h3 className="text-xl font-bold text-white mb-2">Book Meeting</h3>
                <p className="text-sm text-white/80">Schedule a free consultation call</p>
              </div>
            </Link>

            {/* Learn More */}
            <Link href={data.servicePageUrl}>
              <div className="group p-6 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl hover:shadow-2xl transition-all cursor-pointer">
                <div className="text-4xl mb-3">📖</div>
                <h3 className="text-xl font-bold text-white mb-2">Learn More</h3>
                <p className="text-sm text-white/80">Full details about this service</p>
              </div>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-400 pt-8 border-t border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔒</span>
              <span>100% Secure & Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span>2-Hour Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💯</span>
              <span>No Credit Card Required</span>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-neutral-400">
            <Link href="https://uaedigitalsolution.agency" className="hover:text-white transition-colors">
              🏠 Visit Main Site
            </Link>
            <Link href="https://uaedigitalsolution.agency/about" className="hover:text-white transition-colors">
              👥 About Us
            </Link>
            <Link href="https://uaedigitalsolution.agency/services" className="hover:text-white transition-colors">
              🛠️ All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Note: Footer is handled by main site layout */}
    </div>
  )
}
