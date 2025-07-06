import Link from 'next/link';
import { FaHome, FaSearch, FaEnvelope } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <p className="text-2xl font-semibold text-gray-800 -mt-8">Page Not Found</p>
        </div>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary flex items-center justify-center">
            <FaHome className="mr-2" />
            Back to Home
          </Link>
          <Link href="/services" className="btn-secondary flex items-center justify-center">
            <FaSearch className="mr-2" />
            Explore Services
          </Link>
          <Link href="/contact" className="btn-secondary flex items-center justify-center">
            <FaEnvelope className="mr-2" />
            Contact Us
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/services/web-design" className="text-primary hover:underline">
              Web Design
            </Link>
            <Link href="/services/ai-automation" className="text-primary hover:underline">
              AI Automation
            </Link>
            <Link href="/booking" className="text-primary hover:underline">
              Book Consultation
            </Link>
            <Link href="/cases" className="text-primary hover:underline">
              Case Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}