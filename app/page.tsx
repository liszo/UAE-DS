import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Cases from '@/components/Cases';
import Process from '@/components/Process';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Cases />
      <Process />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}