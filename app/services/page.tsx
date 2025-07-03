'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiArrowRight, 
  FiFilter, 
  FiSearch,
  FiShield,
  FiRefreshCw,
  FiMessageCircle,
  FiCalendar,
  FiTool,
  FiZap,
  FiPenTool,
  FiCode,
  FiShoppingCart,
  FiX,
  FiGrid,
  FiList,
  FiStar,
  FiTrendingUp
} from 'react-icons/fi';
import { FaGoogle, FaWordpress, FaPalette, FaRobot } from 'react-icons/fa';
import { getServices } from '@/lib/wordpress';

// Service icons mapping
const getServiceIcon = (service: any) => {
  const title = service?.title?.toLowerCase() || '';
  
  if (title.includes('google ads')) return FaGoogle;
  if (title.includes('seo') || title.includes('search engine')) return FiSearch;
  if (title.includes('security')) return FiShield;
  if (title.includes('migration')) return FiRefreshCw;
  if (title.includes('e-commerce') || title.includes('ecommerce')) return FiShoppingCart;
  if (title.includes('ui/ux') || title.includes('branding')) return FaPalette;
  if (title.includes('performance')) return FiZap;
  if (title.includes('maintenance')) return FiTool;
  if (title.includes('chatbot') || title.includes('ai chatbot')) return FiMessageCircle;
  if (title.includes('wordpress plugin')) return FaWordpress;
  if (title.includes('website design') || title.includes('redesign')) return FiPenTool;
  if (title.includes('booking')) return FiCalendar;
  if (title.includes('ai process') || title.includes('automation')) return FaRobot;
  
  return FiCode;
};

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.9]);

  // Categories based on your WordPress taxonomy
  const categories = [
    { slug: 'all', name: 'All Services', icon: FiGrid, color: 'from-purple-500 to-blue-500' },
    { slug: 'marketing', name: 'Marketing', icon: FiTrendingUp, color: 'from-green-500 to-emerald-500' },
    { slug: 'ai-automation', name: 'AI & Automation', icon: FaRobot, color: 'from-orange-500 to-red-500' },
    { slug: 'design-development', name: 'Design & Development', icon: FiPenTool, color: 'from-blue-500 to-cyan-500' },
    { slug: 'maintenance-support', name: 'Maintenance & Support', icon: FiShield, color: 'from-purple-500 to-pink-500' }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const data = await getServices();
        console.log('Services data:', data);
        
        setServices(data);
        setFilteredServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchServices();
  }, []);

  // Filter services based on category and search
  useEffect(() => {
    let filtered = services;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = services.filter((service: any) => {
        const wpCategories = service?.categories || [];
        const categoryMap: { [key: string]: string[] } = {
          'marketing': ['marketing'],
          'ai-automation': ['ai-automation', 'automation', 'ai'],
          'design-development': ['design-development', 'design', 'development'],
          'maintenance-support': ['maintenance-support', 'maintenance', 'support']
        };
        
        const targetSlugs = categoryMap[activeCategory] || [];
        return wpCategories.some((cat: any) => 
          targetSlugs.includes(cat?.slug?.toLowerCase()) ||
          targetSlugs.some(slug => cat?.name?.toLowerCase().includes(slug))
        );
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((service: any) => 
        getServiceTitle(service).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getServiceExcerpt(service).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  }, [services, activeCategory, searchTerm]);

  const getServiceTitle = (service: any) => {
    const title = service?.title || 'Service';
    return title.replace(/&#038;/g, '&').replace(/&amp;/g, '&');
  };

  const getServiceExcerpt = (service: any) => {
    return service?.excerpt || service?.description || '';
  };

  const getServiceCategory = (service: any) => {
    const categories = service?.categories || [];
    if (categories.length > 0) {
      return categories[0]?.name || 'Service';
    }
    return 'Service';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 md:w-16 md:h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 text-sm md:text-lg"
          >
            Loading services...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black" ref={containerRef}>
      {/* Mobile-First Hero Section */}
      <motion.section 
        style={isMobile ? {} : { y: headerY, opacity: headerOpacity }}
        className={`${isMobile ? 'pt-24 pb-8' : 'pt-32 pb-20'} relative overflow-hidden`}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-blue-500/20 rounded-full blur-3xl" />
          {isMobile && (
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                backgroundSize: '400% 400%'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            {/* Mobile: Service Icon */}
            {isMobile && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6"
              >
                <FiGrid className="w-10 h-10 text-white" />
              </motion.div>
            )}

            <h1 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? 'text-4xl' : 'text-6xl md:text-8xl'}`}>
              {isMobile ? (
                <>
                  Our Digital
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    Services
                  </span>
                </>
              ) : (
                'Our Services'
              )}
            </h1>
            <p className={`text-gray-400 max-w-3xl mx-auto ${isMobile ? 'text-base leading-relaxed' : 'text-xl'}`}>
              {isMobile 
                ? 'Comprehensive digital solutions designed to transform your business'
                : 'Comprehensive digital solutions designed to transform your business and drive exceptional results'
              }
            </p>
          </motion.div>

          {/* Mobile: Search Bar */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
            </motion.div>
          )}

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 md:mb-16"
          >
            {isMobile ? (
              // Mobile Filter UI
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white"
                  >
                    <FiFilter className="w-5 h-5" />
                    <span>Filters</span>
                    {activeCategory !== 'all' && (
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    )}
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-xl transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      <FiGrid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-xl transition-all ${
                        viewMode === 'list' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      <FiList className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                        {categories.map((category) => {
                          const count = category.slug === 'all' 
                            ? services.length 
                            : services.filter(service => {
                                const wpCategories = service?.categories || [];
                                const categoryMap: { [key: string]: string[] } = {
                                  'marketing': ['marketing'],
                                  'ai-automation': ['ai-automation', 'automation', 'ai'],
                                  'design-development': ['design-development', 'design', 'development'],
                                  'maintenance-support': ['maintenance-support', 'maintenance', 'support']
                                };
                                const targetSlugs = categoryMap[category.slug] || [];
                                return wpCategories.some((cat: any) => 
                                  targetSlugs.includes(cat?.slug?.toLowerCase()) ||
                                  targetSlugs.some(slug => cat?.name?.toLowerCase().includes(slug))
                                );
                              }).length;

                          return (
                            <motion.button
                              key={category.slug}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setActiveCategory(category.slug);
                                setShowFilters(false);
                              }}
                              className={`p-3 rounded-xl transition-all text-left ${
                                activeCategory === category.slug
                                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                  : 'bg-white/10 text-gray-400 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <category.icon className="w-4 h-4" />
                                <span className="font-medium text-sm">{category.name}</span>
                              </div>
                              <div className="text-xs opacity-70">
                                {count} service{count !== 1 ? 's' : ''}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Desktop Filter UI
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap justify-center gap-4">
                  {categories.map((category) => {
                    const count = category.slug === 'all' 
                      ? services.length 
                      : services.filter(service => {
                          const wpCategories = service?.categories || [];
                          const categoryMap: { [key: string]: string[] } = {
                            'marketing': ['marketing'],
                            'ai-automation': ['ai-automation', 'automation', 'ai'],
                            'design-development': ['design-development', 'design', 'development'],
                            'maintenance-support': ['maintenance-support', 'maintenance', 'support']
                          };
                          const targetSlugs = categoryMap[category.slug] || [];
                          return wpCategories.some((cat: any) => 
                            targetSlugs.includes(cat?.slug?.toLowerCase()) ||
                            targetSlugs.some(slug => cat?.name?.toLowerCase().includes(slug))
                          );
                        }).length;

                    return (
                      <button
                        key={category.slug}
                        onClick={() => setActiveCategory(category.slug)}
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                          activeCategory === category.slug
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                            : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
                        }`}
                      >
                        {category.name} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid/List */}
      <section className="py-8 md:py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {filteredServices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <FiFilter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">No Services Found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
              {(searchTerm || activeCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          ) : (
            <div className={
              isMobile 
                ? viewMode === 'grid' 
                  ? 'grid grid-cols-1 gap-6' 
                  : 'space-y-4'
                : 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
            }>
              {filteredServices.map((service, index) => {
                const Icon = getServiceIcon(service);
                const category = getServiceCategory(service);
                
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={!isMobile ? { 
                      y: -10,
                      transition: { duration: 0.3 }
                    } : {}}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <Link href={`/services/${service.slug}`}>
                      {isMobile && viewMode === 'list' ? (
                        // Mobile List View
                        <div className="flex gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-white truncate">
                                {getServiceTitle(service)}
                              </h3>
                              <FiArrowRight className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            </div>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                              {getServiceExcerpt(service)}
                            </p>
                            <span className="inline-block px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                              {category}
                            </span>
                          </div>
                        </div>
                      ) : (
                        // Grid View (Mobile & Desktop)
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full">
                          {/* Service Image */}
                          <div className={`relative overflow-hidden ${isMobile ? 'h-40' : 'h-48'}`}>
                            <Image
                              src={service.featuredImage}
                              alt={getServiceTitle(service)}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            
                            {/* Service Icon */}
                            <div className={`absolute bottom-3 left-3 ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center`}>
                              <Icon className={`text-white ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                            </div>

                            {/* Category Badge */}
                            <div className="absolute top-3 right-3">
                              <span className="px-2 py-1 md:px-3 md:py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-xs text-purple-300 border border-purple-500/30 font-medium">
                                {category}
                              </span>
                            </div>

                            {/* Mobile: Quick Stats */}
                            {isMobile && (
                              <div className="absolute top-3 left-3 flex items-center gap-1">
                                <FiStar className="w-3 h-3 text-yellow-400" />
                                <span className="text-xs text-white">4.9</span>
                              </div>
                            )}
                          </div>

                          {/* Service Content */}
                          <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
                            <h3 className={`font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors ${isMobile ? 'text-lg' : 'text-xl'}`}>
                              {getServiceTitle(service)}
                            </h3>
                            <p className={`text-gray-400 mb-4 md:mb-6 line-clamp-3 ${isMobile ? 'text-sm' : ''}`}>
                              {getServiceExcerpt(service)}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className={`text-purple-400 font-semibold ${isMobile ? 'text-sm' : ''}`}>
                                {service?.acf?.service_cta || 'Learn More'}
                              </span>
                              <FiArrowRight className={`text-purple-400 group-hover:translate-x-2 transition-transform duration-300 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                            </div>

                            {/* Mobile: Additional Info */}
                            {isMobile && (
                              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                                <span>Starting from $999</span>
                                <span>2-4 weeks</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'}`}>
              {isMobile ? (
                <>
                  Ready to Transform
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    Your Business?
                  </span>
                </>
              ) : (
                'Ready to Transform Your Business?'
              )}
            </h2>
            <p className={`text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto ${isMobile ? 'text-base' : 'text-xl'}`}>
              {isMobile 
                ? "Let's discuss how our services can drive your success. Get started today."
                : "Let's discuss how our services can drive your success. Get started with a free consultation today."
              }
            </p>
            <div className={`${isMobile ? 'space-y-3' : 'flex flex-wrap gap-4 justify-center'}`}>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className={`${isMobile ? 'w-full' : ''} px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 text-sm md:text-base`}
                >
                  Get Free Consultation
                  <FiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </Link>
              <Link href="/cases">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${isMobile ? 'w-full' : ''} px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-sm md:text-base`}
                >
                  View Our Work
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}