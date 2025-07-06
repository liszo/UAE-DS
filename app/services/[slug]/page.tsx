'use client';

import { useState, useEffect, use, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  FiArrowRight, 
  FiCheck, 
  FiPlay,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiCalendar,
  FiUsers,
  FiTrendingUp,
  FiZap,
  FiTarget,
  FiAward,
  FiClock,
  FiBarChart,
  FiShield,
  FiCode,
  FiLayers,
  FiGlobe,
  FiPhone,
  FiMail,
  FiShare2,
  FiBookmark,
  FiHeart,
  FiMessageCircle
} from 'react-icons/fi';
import { FaGoogle, FaWordpress, FaPalette, FaRobot, FaWhatsapp } from 'react-icons/fa';
import { getServiceBySlug, getServices, getCases, cleanHtmlContent } from '@/lib/wordpress';

// Service icons mapping
const getServiceIcon = (service: any) => {
  const title = service?.title?.toLowerCase() || '';
  
  if (title.includes('google ads')) return FaGoogle;
  if (title.includes('seo')) return FiTrendingUp;
  if (title.includes('security')) return FiShield;
  if (title.includes('migration')) return FiArrowRight;
  if (title.includes('e-commerce')) return FiBarChart;
  if (title.includes('ui/ux') || title.includes('branding')) return FaPalette;
  if (title.includes('performance')) return FiZap;
  if (title.includes('maintenance')) return FiShield;
  if (title.includes('chatbot')) return FaRobot;
  if (title.includes('wordpress')) return FaWordpress;
  if (title.includes('design')) return FaPalette;
  if (title.includes('booking')) return FiCalendar;
  if (title.includes('ai') || title.includes('automation')) return FaRobot;
  
  return FiCode;
};

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = use(params);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [service, setService] = useState<any>(null);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [relatedCases, setRelatedCases] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function fetchServiceData() {
      try {
        setLoading(true);
        
        const serviceData = await getServiceBySlug(resolvedParams.slug);
        if (!serviceData) {
          notFound();
          return;
        }
        
        setService(serviceData);
        
        const allServices = await getServices();
        const related = allServices
          .filter((s: any) => s.id !== serviceData.id)
          .slice(0, 8);
        setRelatedServices(related);
        
        const allCases = await getCases();
        const serviceCategories = serviceData.categories?.map((cat: any) => cat.name?.toLowerCase()) || [];
        const relatedCaseStudies = allCases
          .filter((caseItem: any) => {
            const caseServices = caseItem.servicesProvided?.map((s: string) => s.toLowerCase()) || [];
            return serviceCategories.some((cat: string) => 
              caseServices.some((cs: string) => cs.includes(cat) || cat.includes(cs))
            );
          })
          .slice(0, 8);
        
        setRelatedCases(relatedCaseStudies);
        
      } catch (error) {
        console.error('Error fetching service data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchServiceData();
  }, [resolvedParams.slug]);

  const nextService = () => {
    setCurrentServiceIndex((prev) => 
      prev >= relatedServices.length - (isMobile ? 1 : 3) ? 0 : prev + 1
    );
  };

  const prevService = () => {
    setCurrentServiceIndex((prev) => 
      prev === 0 ? Math.max(0, relatedServices.length - (isMobile ? 1 : 3)) : prev - 1
    );
  };

  const nextCase = () => {
    setCurrentCaseIndex((prev) => 
      prev >= relatedCases.length - (isMobile ? 1 : 3) ? 0 : prev + 1
    );
  };

  const prevCase = () => {
    setCurrentCaseIndex((prev) => 
      prev === 0 ? Math.max(0, relatedCases.length - (isMobile ? 1 : 3)) : prev - 1
    );
  };

  const getRelatedCaseCategory = () => {
    if (!service?.categories || service.categories.length === 0) {
      return '/cases';
    }
    
    const firstCategory = service.categories[0];
    const categorySlug = firstCategory.slug || firstCategory.name?.toLowerCase().replace(/\s+/g, '-');
    
    if (categorySlug) {
      return `/cases?category=${categorySlug}`;
    }
    
    return '/cases';
  };

  const handleShare = () => {
    if (navigator.share && isMobile) {
      navigator.share({
        title: cleanHtmlContent(service.title),
        text: cleanHtmlContent(service.excerpt),
        url: window.location.href,
      });
    } else {
      setShowShareMenu(!showShareMenu);
    }
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
            Loading service...
          </motion.p>
        </div>
      </div>
    );
  }

  if (!service) {
    notFound();
  }

  const Icon = getServiceIcon(service);

  return (
    <div className="min-h-screen bg-black overflow-hidden" ref={containerRef}>
      {/* Mobile-First Hero Section */}
      <motion.section 
        style={isMobile ? {} : { y: heroY, opacity: heroOpacity }}
        className={`relative ${isMobile ? 'min-h-screen' : 'min-h-screen'} flex items-center justify-center overflow-hidden`}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {isMobile && (
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }}
              animate={{ 
                backgroundPosition: ['0px 0px', '30px 30px'] 
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
            />
          )}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-20 md:pt-32">
          {isMobile ? (
            // Mobile Layout
            <div className="text-center space-y-8">
              {/* Service Category Badge */}
              {service.categories && service.categories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
                  <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-sm text-purple-300 border border-purple-500/30 font-medium">
                    {cleanHtmlContent(service.categories[0]?.name || 'Service')}
                  </span>
                </motion.div>
              )}

              {/* Service Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto"
              >
                <Icon className="w-12 h-12 text-white" />
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight"
              >
                {cleanHtmlContent(service.title)}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-gray-300 leading-relaxed text-base max-w-md mx-auto"
              >
                {cleanHtmlContent(service.excerpt)}
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-3 gap-4 max-w-sm mx-auto"
              >
                <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="text-2xl font-bold text-white mb-1">99%</div>
                  <div className="text-xs text-gray-400">Success</div>
                </div>
                <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="text-2xl font-bold text-white mb-1">24/7</div>
                  <div className="text-xs text-gray-400">Support</div>
                </div>
                <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="text-2xl font-bold text-white mb-1">500+</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="space-y-3"
              >
                <Link href={getRelatedCaseCategory()}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300"
                  >
                    <span>View Case Studies</span>
                    <FiArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-sm"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                  
                  <a href="https://wa.me/971501234567">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      WhatsApp
                    </motion.button>
                  </a>
                </div>
              </motion.div>

              {/* Mobile Actions Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center justify-center gap-4 pt-4"
              >
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3 rounded-full transition-all ${
                    isBookmarked 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <FiBookmark className="w-5 h-5" />
                </button>
                
                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="p-3 bg-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                  >
                    <FiShare2 className="w-5 h-5" />
                  </button>
                  
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20"
                    >
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/20 rounded-xl transition-all">
                          <FiMail className="w-4 h-4 text-white" />
                        </button>
                        <button className="p-2 hover:bg-white/20 rounded-xl transition-all">
                          <FiMessageCircle className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            // Desktop Layout (existing)
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Service Category Badge */}
                {service.categories && service.categories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-sm text-purple-300 border border-purple-500/30 font-medium">
                      {cleanHtmlContent(service.categories[0]?.name || 'Service')}
                    </span>
                  </motion.div>
                )}

                {/* Main Title with Gradient */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight"
                >
                  {cleanHtmlContent(service.title)}
                </motion.h1>
                
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl text-gray-300 leading-relaxed max-w-lg"
                >
                  {cleanHtmlContent(service.excerpt)}
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="grid grid-cols-3 gap-6"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">99%</div>
                    <div className="text-sm text-gray-400">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">24/7</div>
                    <div className="text-sm text-gray-400">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">500+</div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link href={getRelatedCaseCategory()}>
                    <motion.button
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: '0 25px 50px rgba(139, 92, 246, 0.5)',
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full flex items-center gap-3 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                    >
                      <span className="relative z-10">View Case Studies</span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiArrowRight className="w-5 h-5" />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </Link>
                  
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full hover:border-purple-500/50 transition-all duration-300"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative"
              >
                <div className="relative">
                  {/* Main Image Container */}
                  <div className="relative h-[600px] w-full rounded-3xl overflow-hidden transform perspective-1000 rotate-y-5">
                    <Image
                      src={service.featuredImage}
                      alt={cleanHtmlContent(service.title)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Floating Service Icon */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute bottom-8 left-8 w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl"
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    {/* Floating Stats Cards */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="absolute top-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                    >
                      <div className="flex items-center gap-3">
                        <FiTrendingUp className="w-6 h-6 text-green-400" />
                        <div>
                          <div className="text-white font-semibold">ROI</div>
                          <div className="text-green-400 text-sm">+250%</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="absolute top-32 -left-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                    >
                      <div className="flex items-center gap-3">
                        <FiClock className="w-6 h-6 text-blue-400" />
                        <div>
                          <div className="text-white font-semibold">Delivery</div>
                          <div className="text-blue-400 text-sm">On Time</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl" />
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Scroll Indicator - Desktop Only */}
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
      </motion.section>

      {/* Mobile-Optimized Service Details Tabs */}
      <section className={`${isMobile ? 'py-12' : 'py-32'} bg-gradient-to-b from-gray-900/50 to-black relative`}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`${isMobile ? 'mb-8' : 'mb-20'}`}
          >
            {isMobile ? (
              // Mobile Tab Navigation - Horizontal Scroll
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-2 min-w-max">
                  {[
                    { id: 'overview', label: 'Overview', icon: FiGlobe },
                    { id: 'features', label: 'Features', icon: FiLayers },
                    { id: 'process', label: 'Process', icon: FiTarget },
                    { id: 'faqs', label: 'FAQs', icon: FiUsers }
                  ].map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'bg-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              // Desktop Tab Navigation
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: 'overview', label: 'Overview', icon: FiGlobe },
                  { id: 'features', label: 'Features', icon: FiLayers },
                  { id: 'process', label: 'Process', icon: FiTarget },
                  { id: 'faqs', label: 'FAQs', icon: FiUsers }
                ].map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group px-8 py-4 rounded-2xl font-semibold transition-all duration-500 flex items-center gap-3 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/25'
                        : 'bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 transition-transform duration-300 ${
                      activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Enhanced Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              {activeTab === 'overview' && (
                <div className={`bg-white/5 backdrop-blur-sm rounded-3xl ${isMobile ? 'p-6' : 'p-12'} border border-white/10`}>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div 
                      className={`text-gray-300 leading-relaxed ${isMobile ? 'text-base' : 'text-lg'}`}
                      dangerouslySetInnerHTML={{ 
                        __html: service.content?.replace(/&#038;/g, '&').replace(/&amp;/g, '&') 
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className={`${isMobile ? 'space-y-4' : 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
                  {service.features && service.features.length > 0 ? (
                    service.features.map((feature: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={!isMobile ? { y: -5, scale: 1.02 } : {}}
                        whileTap={isMobile ? { scale: 0.98 } : {}}
                        className={`group ${isMobile ? 'p-4' : 'p-8'} bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-500`}
                      >
                        <div className={`${isMobile ? 'mb-3' : 'mb-6'}`}>
                          <div className={`${isMobile ? 'w-10 h-10' : 'w-14 h-14'} bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <FiCheck className={`text-white ${isMobile ? 'w-5 h-5' : 'w-7 h-7'}`} />
                          </div>
                        </div>
                        <p className={`text-gray-300 leading-relaxed ${isMobile ? 'text-sm' : 'text-lg'}`}>
                          {cleanHtmlContent(feature)}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20">
                      <FiLayers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">Service features will be available soon.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'process' && (
                <div className={`${isMobile ? 'space-y-4' : 'space-y-8'}`}>
                  {service.process && service.process.length > 0 ? (
                    service.process.map((step: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        whileHover={!isMobile ? { x: 10 } : {}}
                        whileTap={isMobile ? { scale: 0.98 } : {}}
                        className={`group flex gap-4 md:gap-8 ${isMobile ? 'p-4' : 'p-8'} bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-500`}
                      >
                        <div className="flex-shrink-0">
                          <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <span className={`text-white font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}>{index + 1}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-white mb-2 md:mb-4 group-hover:text-purple-300 transition-colors duration-300 ${isMobile ? 'text-lg' : 'text-2xl'}`}>
                            {cleanHtmlContent(step.title)}
                          </h3>
                          <p className={`text-gray-400 leading-relaxed ${isMobile ? 'text-sm' : 'text-lg'}`}>
                            {cleanHtmlContent(step.description)}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-20">
                      <FiTarget className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">Service process steps will be available soon.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className={`${isMobile ? 'space-y-3' : 'space-y-6'}`}>
                  {service.faqs && service.faqs.length > 0 ? (
                    service.faqs.map((faq: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`${isMobile ? 'p-4' : 'p-8'} bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-500`}
                      >
                        {isMobile ? (
                          // Mobile FAQ - Accordion Style
                          <div>
                            <button
                              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                              className="w-full text-left flex items-center justify-between"
                            >
                              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                                {cleanHtmlContent(faq.question)}
                              </h3>
                              <motion.div
                                animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <FiChevronRight className="w-5 h-5 text-gray-400" />
                              </motion.div>
                            </button>
                            
                            <AnimatePresence>
                              {expandedFaq === index && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-gray-400 text-sm leading-relaxed mt-3 pl-4">
                                    {cleanHtmlContent(faq.answer)}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          // Desktop FAQ
                          <div>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                              {cleanHtmlContent(faq.question)}
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed pl-5">
                              {cleanHtmlContent(faq.answer)}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-20">
                      <FiUsers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">Service FAQs will be available soon.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Related Cases Carousel - Mobile Optimized */}
      {relatedCases.length > 0 && (
        <section className={`${isMobile ? 'py-12' : 'py-32'} bg-gradient-to-b from-black to-gray-900/50 relative overflow-hidden`}>
          <div className="absolute inset-0">
            <div className="absolute top-0 right-1/3 w-48 md:w-96 h-48 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-1/3 w-48 md:w-96 h-48 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}
            >
              <h2 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 md:mb-6 ${isMobile ? 'text-3xl' : 'text-5xl md:text-7xl'}`}>
                Success Stories
              </h2>
              <p className={`text-gray-400 max-w-2xl mx-auto ${isMobile ? 'text-base' : 'text-xl'}`}>
                {isMobile 
                  ? 'See how we have delivered results for similar projects'
                  : 'See how we have delivered exceptional results for clients with similar needs'
                }
              </p>
            </motion.div>

            <div className="relative">
              {isMobile ? (
                // Mobile: Single Card with Swipe
                <div className="overflow-hidden">
                  <motion.div
                    className="flex gap-4"
                    animate={{ x: -currentCaseIndex * (window.innerWidth - 32) }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    {relatedCases.map((caseStudy, index) => (
                      <Link
                        key={caseStudy.id}
                        href={`/cases/${caseStudy.slug}`}
                        className="flex-shrink-0 w-full"
                        style={{ width: 'calc(100vw - 32px)' }}
                      >
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={caseStudy.featuredImage}
                              alt={cleanHtmlContent(caseStudy.title)}
                              fill
                              className="object-cover"
                              sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs text-blue-300 border border-blue-500/30 font-medium">
                                {cleanHtmlContent(caseStudy.industry)}
                              </span>
                            </div>
                            <div className="absolute bottom-4 right-4">
                              <FiExternalLink className="w-5 h-5 text-white/70" />
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-3">
                              {cleanHtmlContent(caseStudy.title)}
                            </h3>
                            <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
                              {cleanHtmlContent(caseStudy.excerpt)}
                            </p>
                            {caseStudy.client && (
                              <div className="flex items-center gap-2">
                                <FiUsers className="w-4 h-4 text-purple-400" />
                                <p className="text-purple-400 text-sm font-medium">
                                  {cleanHtmlContent(caseStudy.client)}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
                </div>
              ) : (
                // Desktop: Multiple Cards with Navigation
                <div className="flex items-center gap-8">
                  <motion.button
                    onClick={prevCase}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 92, 246, 0.8)' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white hover:border-purple-500/50 transition-all duration-300 z-10"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <div className="flex-1 overflow-hidden">
                    <motion.div
                      className="flex gap-8"
                      animate={{ x: -currentCaseIndex * 400 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      {relatedCases.map((caseStudy, index) => (
                        <Link
                          key={caseStudy.id}
                          href={`/cases/${caseStudy.slug}`}
                          className="flex-shrink-0 w-96"
                        >
                          <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full"
                          >
                            <div className="relative h-56 overflow-hidden">
                              <Image
                                src={caseStudy.featuredImage}
                                alt={cleanHtmlContent(caseStudy.title)}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="400px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs text-blue-300 border border-blue-500/30 font-medium">
                                  {cleanHtmlContent(caseStudy.industry)}
                                </span>
                              </div>
                              <div className="absolute bottom-4 right-4">
                                <FiExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                              </div>
                            </div>
                            <div className="p-8">
                              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                                {cleanHtmlContent(caseStudy.title)}
                              </h3>
                              <p className="text-gray-400 mb-4 line-clamp-2">
                                {cleanHtmlContent(caseStudy.excerpt)}
                              </p>
                              {caseStudy.client && (
                                <div className="flex items-center gap-2">
                                  <FiUsers className="w-4 h-4 text-purple-400" />
                                  <p className="text-purple-400 text-sm font-medium">
                                    {cleanHtmlContent(caseStudy.client)}
                                  </p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </motion.div>
                  </div>

                  <motion.button
                    onClick={nextCase}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 92, 246, 0.8)' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white hover:border-purple-500/50 transition-all duration-300 z-10"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
              )}

              {/* Mobile: Dots Indicator */}
              {isMobile && (
                <div className="flex justify-center gap-2 mt-6">
                  {relatedCases.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCaseIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentCaseIndex === index 
                          ? 'bg-purple-500 w-6' 
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Services Carousel - Mobile Optimized */}
      {relatedServices.length > 0 && (
        <section className={`${isMobile ? 'py-12' : 'py-32'} bg-gradient-to-b from-gray-900/50 to-black relative overflow-hidden`}>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}
            >
              <h2 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 md:mb-6 ${isMobile ? 'text-3xl' : 'text-5xl md:text-7xl'}`}>
                Related Services
              </h2>
              <p className={`text-gray-400 max-w-2xl mx-auto ${isMobile ? 'text-base' : 'text-xl'}`}>
                {isMobile 
                  ? 'Discover other services that can help your business'
                  : 'Discover other services that can amplify your success'
                }
              </p>
            </motion.div>

            <div className="relative">
              {isMobile ? (
                // Mobile: Grid Layout
                <div className="grid grid-cols-2 gap-4">
                  {relatedServices.slice(0, 4).map((relatedService, index) => {
                    const RelatedIcon = getServiceIcon(relatedService);
                    return (
                      <Link
                        key={relatedService.id}
                        href={`/services/${relatedService.slug}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full"
                        >
                          <div className="relative h-32 overflow-hidden">
                            <Image
                              src={relatedService.featuredImage}
                              alt={cleanHtmlContent(relatedService.title)}
                              fill
                              className="object-cover"
                              sizes="50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-2 left-2 w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                              <RelatedIcon className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">
                              {cleanHtmlContent(relatedService.title)}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-purple-400">Learn More</span>
                              <FiArrowRight className="w-3 h-3 text-purple-400" />
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                // Desktop: Carousel Layout
                <div className="flex items-center gap-8">
                  <motion.button
                    onClick={prevService}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 92, 246, 0.8)' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white hover:border-purple-500/50 transition-all duration-300 z-10"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <div className="flex-1 overflow-hidden">
                    <motion.div
                      className="flex gap-8"
                      animate={{ x: -currentServiceIndex * 400 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      {relatedServices.map((relatedService, index) => {
                        const RelatedIcon = getServiceIcon(relatedService);
                        return (
                          <Link
                            key={relatedService.id}
                            href={`/services/${relatedService.slug}`}
                            className="flex-shrink-0 w-96"
                          >
                            <motion.div
                              whileHover={{ y: -10, scale: 1.02 }}
                              className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full"
                            >
                              <div className="relative h-56 overflow-hidden">
                                <Image
                                  src={relatedService.featuredImage}
                                  alt={cleanHtmlContent(relatedService.title)}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                                  sizes="400px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                  <RelatedIcon className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute bottom-4 right-4">
                                  <FiArrowRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                                </div>
                              </div>
                              <div className="p-8">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                                  {cleanHtmlContent(relatedService.title)}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2">
                                  {cleanHtmlContent(relatedService.excerpt)}
                                </p>
                              </div>
                            </motion.div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  </div>

                  <motion.button
                    onClick={nextService}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 92, 246, 0.8)' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white hover:border-purple-500/50 transition-all duration-300 z-10"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Mobile-First CTA Section */}
      <section className={`${isMobile ? 'py-12' : 'py-32'} bg-gradient-to-r from-purple-900/50 via-black to-blue-900/50 relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {isMobile && (
            <motion.div
              className="absolute inset-0 opacity-10"
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

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4"
                >
                  Ready to Get Started?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-gray-300 mb-8 leading-relaxed"
                >
                  Let&apos;s discuss how this service can transform your business. Get started with a free consultation.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="space-y-4"
                >
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 text-lg"
                    >
                      <span>{service.cta || 'Get Started Now'}</span>
                      <FiArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/services">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-sm"
                      >
                        All Services
                      </motion.button>
                    </Link>
                    
                    <a href="tel:+971501234567">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <FiPhone className="w-4 h-4" />
                        Call Now
                      </motion.button>
                    </a>
                  </div>
                </motion.div>

                {/* Mobile: Quick Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="pt-6 border-t border-white/10"
                >
                  <p className="text-gray-400 text-sm mb-4">Or reach us directly</p>
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <FiPhone className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-400">+971 50 123 4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMail className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-400">hello@uaeds.com</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              // Desktop CTA Layout
              <div>
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-8"
                >
                  Ready to Transform Your Business?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                  Let&apos;s discuss how this service can revolutionize your operations and drive unprecedented growth. 
                  Get started with a comprehensive consultation today.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-6 justify-center"
                >
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
                      <span className="relative z-10">{service.cta || 'Get Started Now'}</span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiArrowRight className="w-6 h-6" />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                      Explore All Services
                    </motion.button>
                  </Link>
                </motion.div>
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