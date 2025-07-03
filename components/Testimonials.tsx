'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import gsap from 'gsap';
import { FaQuoteLeft, FaStar, FaLinkedin, FaTwitter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import Image from 'next/image';
import { getTestimonials } from '@/lib/wordpress';

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);
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
    async function fetchTestimonials() {
      const fetchedTestimonials = await getTestimonials();
      setTestimonials(fetchedTestimonials);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0 && !isMobile) {
      const interval = setInterval(() => {
        if (isAutoPlaying) {
          setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length, isMobile]);

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

    if (isLeftSwipe && activeIndex < testimonials.length - 1) {
      setActiveIndex(activeIndex + 1);
      setIsAutoPlaying(false);
    }
    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setIsAutoPlaying(false);
    }
  };

  useEffect(() => {
    if (!loading && testimonials.length > 0 && !isMobile) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.testimonial-card',
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, testimonials, isMobile]);

  if (loading || testimonials.length === 0) {
    return (
      <section className="relative py-16 md:py-32 bg-black overflow-hidden">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative py-16 md:py-32 bg-black overflow-hidden">
      {/* 3D Background - Desktop Only */}
      {!isMobile && (
        <div className="absolute inset-0">
          <Canvas>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Canvas>
        </div>
      )}

      {/* Mobile Background */}
      {isMobile && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
            animate={{ 
              backgroundPosition: ['0px 0px', '40px 40px'] 
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-20"
        >
          <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-xs md:text-sm font-medium mb-4 md:mb-6 border border-white/20">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
            What our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              clients say
            </span>
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what industry leaders have to say about working with us.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div 
          className="relative mb-8 md:mb-16"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: isMobile ? 50 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isMobile ? -50 : -100 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card"
            >
              <div className={`relative bg-white/5 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/10 ${isMobile ? 'p-6' : 'p-8 md:p-12'} max-w-4xl mx-auto`}>
                {/* Quote Icon */}
                <div className={`absolute ${isMobile ? '-top-4 left-6 w-8 h-8' : '-top-6 left-12 w-12 h-12'} bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center`}>
                  <FaQuoteLeft className={`text-white ${isMobile ? 'text-sm' : 'text-xl'}`} />
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4 md:mb-6">
                    {[...Array(testimonials[activeIndex].rating || 5)].map((_, i) => (
                      <FaStar key={i} className={`text-yellow-500 ${isMobile ? 'text-sm' : 'text-lg md:text-xl'}`} />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className={`text-white font-light leading-relaxed mb-6 md:mb-8 ${isMobile ? 'text-base' : 'text-xl md:text-2xl lg:text-3xl'}`}>
                    "{testimonials[activeIndex].content}"
                  </p>

                  {/* Author */}
                  <div className={`flex items-center ${isMobile ? 'flex-col text-center gap-3' : 'justify-between'}`}>
                    <div className={`flex items-center gap-3 md:gap-4 ${isMobile ? 'flex-col text-center' : ''}`}>
                      <div className={`relative ${isMobile ? 'w-12 h-12' : 'w-14 h-14 md:w-16 md:h-16'} rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 p-[2px]`}>
                        <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
                          {testimonials[activeIndex].image ? (
                            <Image
                              src={testimonials[activeIndex].image}
                              alt={testimonials[activeIndex].name}
                              width={isMobile ? 44 : 60}
                              height={isMobile ? 44 : 60}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FiUser className={`text-white ${isMobile ? 'text-lg' : 'text-2xl'}`} />
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-white font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}>
                          {testimonials[activeIndex].name}
                        </h4>
                        <p className={`text-white/60 ${isMobile ? 'text-sm' : 'text-base'}`}>
                          {testimonials[activeIndex].role}
                          {testimonials[activeIndex].company && `, ${testimonials[activeIndex].company}`}
                        </p>
                        {testimonials[activeIndex].projectType && (
                          <p className={`text-white/40 mt-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            Project: {testimonials[activeIndex].projectType}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Social Links - Desktop Only */}
                    {!isMobile && (
                      <div className="flex gap-3">
                        {testimonials[activeIndex].linkedin && testimonials[activeIndex].linkedin !== '#' && (
                          <a
                            href={testimonials[activeIndex].linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
                          >
                            <FaLinkedin />
                          </a>
                        )}
                        {testimonials[activeIndex].twitter && testimonials[activeIndex].twitter !== '#' && (
                          <a
                            href={testimonials[activeIndex].twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
                          >
                            <FaTwitter />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile: Swipe Indicator */}
                {isMobile && (
                  <div className="absolute bottom-2 right-4 text-xs text-white/40">
                    {activeIndex + 1}/{testimonials.length}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mb-12 md:mb-20">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setActiveIndex(activeIndex > 0 ? activeIndex - 1 : testimonials.length - 1);
              setIsAutoPlaying(false);
            }}
            className={`${isMobile ? 'p-2' : 'p-3'} bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all text-white`}
          >
            <FaChevronLeft className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
          </motion.button>

          {/* Dots Navigation */}
          <div className="flex gap-1.5 md:gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? `${isMobile ? 'w-4' : 'w-6 md:w-8'} bg-gradient-to-r from-purple-600 to-blue-600`
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setActiveIndex((activeIndex + 1) % testimonials.length);
              setIsAutoPlaying(false);
            }}
            className={`${isMobile ? 'p-2' : 'p-3'} bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all text-white`}
          >
            <FaChevronRight className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
          </motion.button>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'}`}
        >
          {[
            { number: '98%', label: 'Client Satisfaction' },
            { number: '150+', label: 'Projects Completed' },
            { number: `${testimonials.length}+`, label: 'Happy Clients' },
            { number: '5★', label: 'Average Rating' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-1 md:mb-2 ${isMobile ? 'text-2xl' : 'text-2xl md:text-3xl lg:text-4xl'}`}>
                {stat.number}
              </div>
              <div className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}