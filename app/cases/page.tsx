'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiArrowRight, 
  FiFilter, 
  FiExternalLink,
  FiCalendar,
  FiUsers,
  FiTrendingUp,
  FiZap,
  FiTarget,
  FiAward,
  FiGlobe,
  FiCode,
  FiShield,
  FiBarChart,
  FiSearch,
  FiGrid,
  FiList,
  FiStar,
  FiEye,
  FiHeart,
  FiShare2,
  FiMessageCircle
} from 'react-icons/fi';
import { FaRobot, FaPalette, FaWordpress, FaGoogle } from 'react-icons/fa';
import { getCases, cleanHtmlContent } from '@/lib/wordpress';

// Industry icons mapping
const getIndustryIcon = (industry: string) => {
  const industryLower = industry?.toLowerCase() || '';
  
  if (industryLower.includes('education') || industryLower.includes('e-learning')) return FiUsers;
  if (industryLower.includes('healthcare') || industryLower.includes('medical')) return FiShield;
  if (industryLower.includes('finance') || industryLower.includes('fintech')) return FiBarChart;
  if (industryLower.includes('technology') || industryLower.includes('tech')) return FiCode;
  if (industryLower.includes('retail') || industryLower.includes('e-commerce')) return FiTrendingUp;
  if (industryLower.includes('real estate')) return FiGlobe;
  if (industryLower.includes('marketing') || industryLower.includes('advertising')) return FiTarget;
  if (industryLower.includes('design') || industryLower.includes('creative')) return FaPalette;
  
  return FiZap;
};

export default function CasesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [filteredCases, setFilteredCases] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get unique industries for filtering with proper counting
  const getUniqueIndustries = (cases: any[]) => {
    const industries = cases
      .map(c => c.industry)
      .filter(Boolean)
      .filter((industry, index, arr) => arr.indexOf(industry) === index);
    return industries;
  };

  // Get count for each industry
  const getIndustryCount = (industry: string, allCases: any[]) => {
    if (industry === 'all') return allCases.length;
    return allCases.filter(c => c.industry?.toLowerCase() === industry.toLowerCase()).length;
  };

  useEffect(() => {
    async function fetchCases() {
      try {
        setLoading(true);
        const data = await getCases();
        console.log('Cases data:', data);
        
        setCases(data);
        setFilteredCases(data);
      } catch (error) {
        console.error('Error fetching cases:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCases();
  }, []);

  // Filter cases based on industry and search
  useEffect(() => {
    let filtered = cases;
    
    // Filter by industry
    if (activeFilter !== 'all') {
      filtered = filtered.filter((caseItem: any) => 
        caseItem.industry?.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((caseItem: any) => 
        caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.client?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCases(filtered);
  }, [cases, activeFilter, searchTerm]);

  const uniqueIndustries = getUniqueIndustries(cases);
  const filterOptions = [
    { slug: 'all', name: 'All Industries', count: getIndustryCount('all', cases) },
    ...uniqueIndustries.map(industry => ({
      slug: industry.toLowerCase().replace(/\s+/g, '-'),
      name: industry,
      count: getIndustryCount(industry, cases)
    }))
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-6"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 text-lg"
          >
            Loading case studies...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Mobile-First Hero Section */}
      <section className={`relative ${isMobile ? 'min-h-screen' : 'min-h-screen'} flex items-center justify-center overflow-hidden`}>
        {/* Enhanced Mobile Background */}
        <div className="absolute inset-0">
          {isMobile ? (
            <>
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4))',
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
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </>
          ) : (
            <>
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </>
          )}
          
          {/* Floating Particles - Reduced for mobile */}
          {[...Array(isMobile ? 8 : 15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className={`relative z-10 max-w-7xl mx-auto px-4 md:px-6 ${isMobile ? 'pt-24' : 'pt-32'} text-center`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`${isMobile ? 'mb-6' : 'mb-8'}`}
          >
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
              <span className={`px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-purple-300 border border-purple-500/30 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                Portfolio Showcase
              </span>
            </div>
            
            <h1 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight mb-4 md:mb-6 ${isMobile ? 'text-4xl' : 'text-6xl md:text-8xl'}`}>
              Case Studies
            </h1>
            
            <p className={`text-gray-300 max-w-3xl mx-auto leading-relaxed ${isMobile ? 'text-base px-4' : 'text-xl'}`}>
              {isMobile 
                ? 'Discover our successful projects and innovative solutions'
                : 'Explore our portfolio of successful projects and discover how we transform businesses through innovative digital solutions'
              }
            </p>
          </motion.div>

          {/* Mobile-First Search and Filter */}
          {isMobile ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-md mx-auto mb-8 space-y-4"
            >
              {/* Search Bar */}
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                />
              </div>

              {/* Filter Toggle Button */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300"
              >
                <FiFilter className="w-5 h-5" />
                <span>Filter by Industry</span>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiArrowRight className="w-5 h-5 rotate-90" />
                </motion.div>
              </motion.button>

              {/* Collapsible Filter Menu */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 space-y-2"
                  >
                    {filterOptions.map((filter, index) => (
                      <motion.button
                        key={filter.slug}
                        onClick={() => {
                          setActiveFilter(filter.slug === 'all' ? 'all' : filter.name);
                          setShowFilters(false);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-between ${
                          (activeFilter === 'all' && filter.slug === 'all') || 
                          (activeFilter !== 'all' && filter.name === activeFilter)
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span>{filter.name}</span>
                        <span className="text-sm opacity-75">({filter.count})</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-center gap-2 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            // Desktop Filter Tabs
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-5xl mx-auto mb-16"
            >
              <div className="flex flex-wrap justify-center gap-3">
                {filterOptions.map((filter, index) => (
                  <motion.button
                    key={filter.slug}
                    onClick={() => setActiveFilter(filter.slug === 'all' ? 'all' : filter.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group px-6 py-3 rounded-2xl font-semibold transition-all duration-500 flex items-center gap-2 ${
                      (activeFilter === 'all' && filter.slug === 'all') || 
                      (activeFilter !== 'all' && filter.name === activeFilter)
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/25'
                        : 'bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {filter.name} ({filter.count})
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Stats Section - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto ${isMobile ? 'mb-8' : ''}`}
          >
            <div className="text-center">
              <div className={`font-bold text-white mb-2 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>{cases.length}+</div>
              <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Projects</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-white mb-2 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>{uniqueIndustries.length}+</div>
              <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Industries</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-white mb-2 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>98%</div>
              <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Success Rate</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-white mb-2 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>5★</div>
              <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Rating</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Mobile-First Cases Grid */}
      <section className={`${isMobile ? 'py-16' : 'py-32'} bg-gradient-to-b from-gray-900/50 to-black relative`}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className={`font-semibold text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>
              {filteredCases.length} {filteredCases.length === 1 ? 'Case Study' : 'Case Studies'}
              {activeFilter !== 'all' && ` in ${activeFilter}`}
            </h3>
            
            {/* Desktop View Mode Toggle */}
            {!isMobile && (
              <div className="flex items-center gap-2 p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>

          {filteredCases.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <FiFilter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className={`font-semibold text-white mb-2 ${isMobile ? 'text-xl' : 'text-2xl'}`}>No Case Studies Found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <div className={`${
              viewMode === 'grid' 
                ? isMobile 
                  ? 'grid grid-cols-1 gap-6' 
                  : 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }`}>
              {filteredCases.map((caseStudy, index) => {
                const Icon = getIndustryIcon(caseStudy.industry);
                
                return (
                  <motion.div
                    key={caseStudy.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={!isMobile ? { y: -10, scale: 1.02 } : {}}
                    whileTap={isMobile ? { scale: 0.98 } : {}}
                    className="group"
                  >
                    <Link href={`/cases/${caseStudy.slug}`}>
                      <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full ${
                        viewMode === 'list' && !isMobile ? 'flex items-center' : ''
                      }`}>
                        {/* Case Image */}
                        <div className={`relative overflow-hidden ${
                          viewMode === 'list' && !isMobile 
                            ? 'w-80 h-48 flex-shrink-0' 
                            : isMobile 
                              ? 'h-48' 
                              : 'h-64'
                        }`}>
                          <Image
                            src={caseStudy.featuredImage}
                            alt={cleanHtmlContent(caseStudy.title)}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          
                          {/* Industry Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 border border-blue-500/30 font-medium flex items-center gap-2 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                              <Icon className="w-3 h-3" />
                              {cleanHtmlContent(caseStudy.industry)}
                            </span>
                          </div>

                          {/* Mobile: Quick Action Icons */}
                          {isMobile && (
                            <div className="absolute top-4 right-4 flex gap-2">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                                onClick={(e) => {
                                  e.preventDefault();
                                  // Add to favorites logic
                                }}
                              >
                                <FiHeart className="w-4 h-4 text-white/80" />
                              </motion.button>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                                onClick={(e) => {
                                  e.preventDefault();
                                  // Share logic
                                }}
                              >
                                <FiShare2 className="w-4 h-4 text-white/80" />
                              </motion.button>
                            </div>
                          )}

                          {/* External Link Icon - Desktop */}
                          {!isMobile && (
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <FiExternalLink className="w-5 h-5 text-white/80" />
                            </div>
                          )}

                          {/* Year Badge */}
                          <div className="absolute bottom-4 right-4">
                            <span className={`px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 border border-white/20 font-medium ${isMobile ? 'text-xs' : 'text-xs'}`}>
                              {caseStudy.year}
                            </span>
                          </div>
                        </div>

                        {/* Case Content */}
                        <div className={`${
                          viewMode === 'list' && !isMobile ? 'flex-1 p-8' : isMobile ? 'p-6' : 'p-8'
                        }`}>
                          <h3 className={`font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300 ${
                            isMobile ? 'text-lg' : 'text-xl'
                          }`}>
                            {cleanHtmlContent(caseStudy.title)}
                          </h3>
                          <p className={`text-gray-400 mb-4 line-clamp-2 ${isMobile ? 'text-sm' : ''}`}>
                            {cleanHtmlContent(caseStudy.excerpt)}
                          </p>
                          
                          {/* Client Info */}
                          {caseStudy.client && (
                            <div className="flex items-center gap-2 mb-4">
                              <FiUsers className="w-4 h-4 text-purple-400" />
                              <span className={`text-purple-400 font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>
                                {cleanHtmlContent(caseStudy.client)}
                              </span>
                            </div>
                          )}

                          {/* Services Tags */}
                          {caseStudy.servicesProvided && caseStudy.servicesProvided.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {caseStudy.servicesProvided.slice(0, isMobile ? 1 : 2).map((service: string, serviceIndex: number) => (
                                <span
                                  key={serviceIndex}
                                  className={`px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 ${isMobile ? 'text-xs' : 'text-xs'}`}
                                >
                                  {service.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </span>
                              ))}
                              {caseStudy.servicesProvided.length > (isMobile ? 1 : 2) && (
                                <span className={`px-2 py-1 bg-gray-500/20 text-gray-400 rounded-lg border border-gray-500/30 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                                  +{caseStudy.servicesProvided.length - (isMobile ? 1 : 2)}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Action Row */}
                          <div className="flex items-center justify-between">
                            <span className={`text-purple-400 font-semibold ${isMobile ? 'text-sm' : ''}`}>
                              View Case Study
                            </span>
                            <motion.div
                              whileHover={!isMobile ? { x: 5 } : {}}
                              transition={{ duration: 0.2 }}
                            >
                              <FiArrowRight className="w-5 h-5 text-purple-400" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Mobile-First CTA Section */}
      <section className={`${isMobile ? 'py-16' : 'py-32'} bg-gradient-to-r from-purple-900/50 via-black to-blue-900/50 relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {isMobile && (
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {isMobile ? (
              // Mobile CTA Layout
              <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <FiZap className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
                  Ready to Be Our Next Success Story?
                </h2>

                <p className="text-gray-300 mb-8 leading-relaxed px-4">
                  Join the ranks of successful businesses that have transformed their operations with our solutions.
                </p>
                
                <div className="space-y-4">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full max-w-sm mx-auto block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 text-lg"
                    >
                      <span>Start Your Project</span>
                      <FiArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  
                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    <Link href="/services">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-sm"
                      >
                        Our Services
                      </motion.button>
                    </Link>
                    
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <FiMessageCircle className="w-4 h-4" />
                        Let&apos;s Talk
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              // Desktop CTA Layout
              <div>
                <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-8">
                  Ready to Be Our Next Success Story?
                </h2>
                <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Join the ranks of successful businesses that have transformed their operations with our innovative solutions.
                </p>
                
                <div className="flex flex-wrap gap-6 justify-center">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: '0 25px 50px rgba(139, 92, 246, 0.6)',
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full flex items-center gap-3 hover:shadow-2xl transition-all duration-300 text-lg relative overflow-hidden"
                    >
                      <span className="relative z-10">Start Your Project</span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiArrowRight className="w-6 h-6" />
                      </motion.div>
                    </motion.button>
                  </Link>
                  
                  <Link href="/services">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderColor: 'rgba(139, 92, 246, 0.5)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-full hover:border-purple-500/50 transition-all duration-300 text-lg"
                    >
                      View Our Services
                    </motion.button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Mobile: Floating Action Button */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl"
            >
              <FiMessageCircle className="w-6 h-6 text-white" />
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}