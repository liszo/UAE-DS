'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { 
  FiArrowRight, 
  FiMonitor, 
  FiSmartphone, 
  FiLayers, 
  FiTrendingUp, 
  FiSearch, 
  FiShoppingCart, 
  FiSettings, 
  FiZap, 
  FiCode, 
  FiPenTool,
  FiChevronDown,
  FiGrid
} from 'react-icons/fi';
import { getServices } from '@/lib/wordpress';

// Service icons mapping (same as before)
const serviceIcons: { [key: string]: any } = {
  'website-design-redesign': FiMonitor,
  'e-commerce-enhancement-marketing': FiShoppingCart,
  'ai-process-automation': FiZap,
  'website-performance-optimization': FiTrendingUp,
  'ui-ux-design-branding': FiPenTool,
  'online-booking-systems': FiSettings,
  // ... rest of the mapping
};

const getServiceIcon = (service: any) => {
  // Same logic as before
  const id = service.id;
  const slug = service.slug?.toLowerCase() || '';
  const title = service.title?.rendered?.toLowerCase() || service.title?.toLowerCase() || '';
  
  const idIconMap: { [key: number]: any } = {
    64: FiMonitor,
    70: FiShoppingCart,
    47: FiZap,
    68: FiTrendingUp,
    69: FiPenTool,
    63: FiSettings,
  };

  if (idIconMap[id]) return idIconMap[id];
  if (serviceIcons[slug]) return serviceIcons[slug];
  
  if (title.includes('web') || title.includes('website')) return FiMonitor;
  if (title.includes('mobile') || title.includes('app')) return FiSmartphone;
  if (title.includes('design') || title.includes('ui') || title.includes('ux') || title.includes('brand')) return FiPenTool;
  if (title.includes('marketing') || title.includes('digital') || title.includes('ecommerce') || title.includes('e-commerce')) return FiShoppingCart;
  if (title.includes('seo') || title.includes('search') || title.includes('performance') || title.includes('optimization')) return FiTrendingUp;
  if (title.includes('maintenance') || title.includes('support') || title.includes('booking') || title.includes('system')) return FiSettings;
  if (title.includes('ai') || title.includes('automation') || title.includes('process')) return FiZap;
  return FiCode;
};

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showScrollCursor, setShowScrollCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const containerRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setViewMode('grid'); // Default to grid on mobile
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const data = await getServices();
        if (data && data.length > 0) {
          const targetIds = [64, 70, 47, 68, 69, 63];
          const filteredServices = data.filter(service => targetIds.includes(service.id));
          const sortedServices = targetIds.map(id => 
            filteredServices.find(service => service.id === id)
          ).filter(Boolean);
          setServices(sortedServices);
        }
      } catch (error) {
        console.log('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  // Custom cursor tracking - Desktop only
  useEffect(() => {
    if (isMobile) return;
    
    const rightColumn = rightColumnRef.current;
    if (!rightColumn) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setShowScrollCursor(true);
      document.body.style.cursor = 'none';
    };

    const handleMouseLeave = () => {
      setShowScrollCursor(false);
      document.body.style.cursor = 'auto';
    };

    rightColumn.addEventListener('mouseenter', handleMouseEnter);
    rightColumn.addEventListener('mouseleave', handleMouseLeave);
    rightColumn.addEventListener('mousemove', handleMouseMove);

    return () => {
      rightColumn.removeEventListener('mouseenter', handleMouseEnter);
      rightColumn.removeEventListener('mouseleave', handleMouseLeave);
      rightColumn.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [isMobile]);

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const getServiceTitle = (service: any) => {
    const title = service?.title?.rendered || service?.title || 'Service';
    return title.replace(/&#038;/g, '&').replace(/&amp;/g, '&');
  };

  const getServiceExcerpt = (service: any) => {
    const excerpt = service?.excerpt?.rendered || service?.excerpt || service?.description || 'Service description not available.';
    return excerpt.replace(/<[^>]*>/g, '').substring(0, isMobile ? 80 : 120) + '...';
  };

  return (
    <section ref={containerRef} className="relative bg-black py-12 md:py-20">
      {/* Custom Cursor Follower - Desktop Only */}
      {showScrollCursor && !isMobile && (
        <motion.div
          className="fixed pointer-events-none z-50"
          style={{
            left: cursorPosition.x - 40,
            top: cursorPosition.y - 40,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-20 h-20 bg-purple-600/20 backdrop-blur-sm rounded-full border border-purple-400/30 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <FiChevronDown className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-purple-400 font-medium">Scroll</span>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {isMobile ? (
          // Mobile Layout: Single Column
          <div className="space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="text-purple-400 text-xs font-medium uppercase tracking-wider">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4 leading-tight">
                Services that
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  drive growth
                </span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                We combine creativity, technology, and strategy to deliver digital solutions 
                that transform your business.
              </p>

              {/* View Toggle */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <FiLayers className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Services */}
            {loading ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="animate-pulse">
                      <div className="w-8 h-8 bg-gray-600 rounded-xl mb-3"></div>
                      <div className="h-4 bg-gray-600 rounded mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : services.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
                {services.map((service, index) => {
                  const Icon = getServiceIcon(service);
                  return (
                    <motion.div
                      key={service.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                      className="group"
                    >
                      <Link href={`/services/${service.slug || 'service'}`}>
                        <div className="relative p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                          {/* Background Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Content */}
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <FiArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
                            </div>
                            
                            <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all leading-tight">
                              {getServiceTitle(service)}
                            </h3>
                            
                            {viewMode === 'list' && (
                              <p className="text-gray-400 text-xs leading-relaxed">
                                {getServiceExcerpt(service)}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No services found.</p>
              </div>
            )}

            {/* CTA Button */}
            <div className="text-center">
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-black font-semibold rounded-full flex items-center gap-2 mx-auto hover:gap-4 transition-all text-sm"
                >
                  View All Services
                  <FiArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        ) : (
          // Desktop Layout: Two Columns (existing layout)
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Sticky */}
            <motion.div 
              style={{ y }}
              className="lg:sticky lg:top-32 lg:h-fit"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">
                  What We Do
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                  Services that
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    drive growth
                  </span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  We combine creativity, technology, and strategy to deliver digital solutions 
                  that transform your business and exceed expectations.
                </p>
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:gap-4 transition-all"
                  >
                    View All Services
                    <FiArrowRight />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Scroll Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex items-center gap-3 text-gray-500"
              >
                <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1 h-3 bg-gray-600 rounded-full mt-2"
                  />
                </div>
                <span className="text-sm">Scroll to explore services</span>
              </motion.div>
            </motion.div>

            {/* Right Column - Services */}
            <div 
              ref={rightColumnRef} 
              className="space-y-6"
              style={{ cursor: showScrollCursor ? 'none' : 'auto' }}
            >
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="animate-pulse">
                      <div className="w-12 h-12 bg-gray-600 rounded-xl mb-4"></div>
                      <div className="h-6 bg-gray-600 rounded mb-3"></div>
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                ))
              ) : services.length > 0 ? (
                services.map((service, index) => {
                  const Icon = getServiceIcon(service);
                  return (
                    <motion.div
                      key={service.id || index}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="group"
                    >
                      <Link href={`/services/${service.slug || 'service'}`}>
                        <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <motion.div
                                animate={{ x: hoveredIndex === index ? 0 : -10, opacity: hoveredIndex === index ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <FiArrowRight className="w-6 h-6 text-white" />
                              </motion.div>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all">
                              {getServiceTitle(service)}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                              {getServiceExcerpt(service)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No services found.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}