import { ServiceLandingPageData } from '@/lib/types/landing-page'
import { 
  LandingHero, 
  UrgencyBar, 
  ProblemSection, 
  SolutionProcess,
  ResultsProof,
  WhyUsGrid,
  SpecialOffer,
  FAQAccordion,
  ContactForm
} from '@/components/landing'

interface LandingPageTemplateProps {
  data: ServiceLandingPageData
}

export function LandingPageTemplate({ data }: LandingPageTemplateProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Urgency Bar - Sticky at top */}
      <UrgencyBar
        message={`${data.offer.discount} - ${data.offer.deadline}`}
        ctaText="Claim Offer Now"
        ctaLink="#contact"
        spotsRemaining={data.offer.spotsRemaining}
      />

      {/* Hero Section */}
      <LandingHero
        headline={data.headline}
        subtitle={data.subtitle}
        videoUrl={data.videoUrl}
        videoPosterImage={data.videoPosterImage}
        cta={data.cta}
        heroStats={data.heroStats}
        trustBadges={data.trustBadges}
      />

      {/* Problem Section */}
      <ProblemSection
        title={data.problemSectionTitle}
        painPoints={data.painPoints}
        className="bg-neutral-50 dark:bg-neutral-900"
      />

      {/* Solution Process */}
      <SolutionProcess
        title={data.solutionTitle}
        subtitle={data.solutionSubtitle}
        steps={data.process}
      />

      {/* Results & Proof */}
      <ResultsProof
        title={data.resultsTitle}
        metrics={data.metrics}
        caseStudies={data.caseStudies}
        testimonials={data.testimonials}
        className="bg-neutral-50 dark:bg-neutral-900"
      />

      {/* Why Us Section */}
      <WhyUsGrid
        title={data.whyUsTitle}
        differentiators={data.differentiators}
      />

      {/* Special Offer */}
      <SpecialOffer
        offer={data.offer}
        ctaLink="#contact"
        className="bg-white dark:bg-neutral-950"
      />

      {/* FAQ Section */}
      <FAQAccordion
        faqs={data.faqs}
        className="bg-neutral-50 dark:bg-neutral-900"
      />

      {/* Contact Form - Final CTA */}
      <ContactForm
        serviceName={data.name}
      />

      {/* Minimal Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-neutral-900 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href={data.servicePageUrl} className="text-neutral-400 hover:text-white transition-colors">
                    Learn More About {data.name}
                  </a>
                </li>
                <li>
                  <a href="https://uaedigitalsolution.agency" className="text-neutral-400 hover:text-white transition-colors">
                    Visit Main Site
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-neutral-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-neutral-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>📧 info@uaedigitalsolution.agency</li>
                <li>📞 +971 XX XXX XXXX</li>
                <li>📍 Dubai, UAE</li>
              </ul>
            </div>

            {/* Social Proof */}
            <div>
              <h3 className="text-lg font-bold mb-4">Trusted By</h3>
              <p className="text-neutral-400 mb-4">
                Trusted by {data.heroStats.clients}+ UAE businesses
              </p>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-2xl">✅</span>
                <span>Money-Back Guarantee</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-neutral-800 text-center text-neutral-500">
            <p>&copy; {new Date().getFullYear()} UAE Digital Solution Agency. All rights reserved.</p>
            <p className="mt-2 text-sm">
              This is a limited-time landing page. Offer valid for outreach campaign only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

