'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiEye, FiHeart } from 'react-icons/fi';
import { getCases } from '@/lib/wordpress';

export default function Cases() {
  const [cases, setCases] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function fetchCases() {
      try {
        const data = await getCases();
        if (data && data.length > 0) {
          setCases(data.slice(0, 6));
        }
      } catch (error) {
        console.log('Error fetching cases:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCases();
  }, []);

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < cases.length - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentIndex > 0) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, cases.length - (isMobile ? 0 : 1)));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, cases.length - (isMobile ? 0 : 1))) % Math.max(1, cases.length - (isMobile ? 0 : 1)));
  };

  // Helper functions (same as before)
  const getFeaturedImage = (caseItem: any) => {
    const imageSources = [
      caseItem?.featuredImage,
      caseItem?.featured_media_url,
      caseItem?._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      caseItem?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full?.source_url,
      caseItem?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.large?.source_url,
      caseItem?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url,
      caseItem?.acf?.featured_image?.url,
      caseItem?.acf?.featured_image,
      caseItem?.meta?.featured_image,
      caseItem?.featured_image_url
    ];

    for (const source of imageSources) {
      if (source && typeof source === 'string' && source.trim() !== '') {
        return source;
      }
    }
    return '/api/placeholder/600/400';
  };

  const getCaseTitle = (caseItem: any) => {
    const title = caseItem?.title?.rendered || caseItem?.title || 'Case Study';
    return title.replace(/&#038;/g, '&').replace(/&amp;/g, '&');
  };

  const getCaseExcerpt = (caseItem: any) => {
    const excerpt = caseItem?.excerpt?.rendered || caseItem?.excerpt || caseItem?.content?.rendered || '';
    const maxLength = isMobile ? 80 : 120;
    return excerpt.replace(/<[^>]*>/g, '').substring(0, maxLength) + '...';
  };

  const getCaseIndustry = (caseItem: any) => {
    return caseItem?.acf?.industry || caseItem?.industry || caseItem?.meta?.industry || 'Technology';
  };

  const getCaseTags = (caseItem: any) => {
    const tags = caseItem?.acf?.tags || caseItem?.tags || '';
    if (typeof tags === 'string') return tags;
    if (Array.isArray(tags)) return tags.join(', ');
    return 'Web Development, Design, Strategy';
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded mb-3 w-48 mx-auto"></div>
            <div className="h-8 bg-gray-700 rounded mb-6 w-80 mx-auto"></div>
            <div className={`${isMobile ? 'space-y-4' : 'grid md:grid-cols-2 gap-8'}`}>
              <div className="h-48 md:h-64 bg-gray-700 rounded-2xl"></div>
              {!isMobile && <div className="h-48 md:h-64 bg-gray-700 rounded-2xl"></div>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!cases.length) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-400">No case studies found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-purple-400 text-xs md:text-sm font-medium uppercase tracking-wider">
            Portfolio Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 md:mt-4 mb-4 md:mb-6 leading-tight">
            Success stories that
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              inspire growth
            </span>
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover how we've helped businesses transform their digital presence 
            and achieve remarkable results through innovative solutions.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div 
            className="overflow-hidden rounded-2xl md:rounded-3xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (isMobile ? 100 : 50)}%)` 
              }}
            >
              {cases.map((caseItem, index) => (
                <div
                  key={caseItem.id || index}
                  className={`${isMobile ? 'w-full' : 'w-1/2'} flex-shrink-0 ${isMobile ? 'px-0' : 'px-4'}`}
                >
                  <Link href={`/cases/${caseItem.slug}`}>
                    <motion.div
                      whileHover={!isMobile ? { scale: 1.02 } : {}}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
                    >
                      {/* Image */}
                      <div className="relative h-48 md:h-64 overflow-hidden">
                        <Image
                          src={getFeaturedImage(caseItem)}
                          alt={getCaseTitle(caseItem)}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes={isMobile ? "100vw" : "50vw"}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/api/placeholder/600/400';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 md:top-4 left-3 md:left-4">
                          <span className="px-2 py-1 md:px-3 md:py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-xs text-purple-300 border border-purple-500/30">
                            {getCaseIndustry(caseItem)}
                          </span>
                        </div>

                        {/* Mobile: Quick Action Icons */}
                        {isMobile && (
                          <div className="absolute top-3 right-3 flex gap-2">
                            <div className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <FiEye className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 md:p-6">
                        <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all leading-tight">
                          {getCaseTitle(caseItem)}
                        </h3>
                        
                        <p className="text-gray-400 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                          {getCaseExcerpt(caseItem)}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                          {getCaseTags(caseItem).split(',').slice(0, isMobile ? 2 : 3).map((tag: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-0.5 md:px-2 md:py-1 bg-white/10 rounded-full text-xs text-gray-300"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-purple-400 group-hover:gap-3 transition-all">
                            <span className="font-medium text-sm md:text-base">View Case Study</span>
                            <FiArrowRight className="w-4 h-4" />
                          </div>
                          
                          {isMobile && (
                            <div className="text-xs text-gray-500">
                              {index + 1}/{cases.length}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="p-2 md:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors disabled:opacity-50"
              disabled={cases.length <= (isMobile ? 1 : 2)}
            >
              <FiChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-1.5 md:gap-2">
              {Array.from({ length: Math.max(1, cases.length - (isMobile ? 0 : 1)) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-purple-400 w-6 md:w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="p-2 md:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors disabled:opacity-50"
              disabled={cases.length <= (isMobile ? 1 : 2)}
            >
              <FiChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-12">
          <Link href="/cases">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full flex items-center justify-center gap-2 mx-auto hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-sm md:text-base"
            >
              View All Case Studies
              <FiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}