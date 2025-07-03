'use client';

import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  FiArrowRight, 
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiTrendingUp,
  FiZap,
  FiTarget,
  FiGlobe,
  FiCode,
  FiShield,
  FiBarChart,
  FiCalendar,
  FiAward,
  FiCheckCircle,
  FiLayers,
  FiPlay,
  FiImage,
  FiClock,
  FiSettings,
  FiHeart,
  FiShare2,
  FiEye,
  FiStar,
  FiMessageCircle,
  FiArrowLeft,
  FiMaximize2,
  FiMinimize2
} from 'react-icons/fi';
import { FaRobot, FaPalette, FaWordpress, FaGoogle } from 'react-icons/fa';
import { getCaseBySlug, getCases, getServices, cleanHtmlContent } from '@/lib/wordpress';

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

// Services provided icons mapping
const getServiceProvidedIcon = (service: string) => {
  const serviceLower = service?.toLowerCase() || '';
  
  if (serviceLower.includes('web-development')) return FiCode;
  if (serviceLower.includes('ai-automation')) return FaRobot;
  if (serviceLower.includes('ui-ux-design')) return FaPalette;
  if (serviceLower.includes('seo')) return FiTrendingUp;
  if (serviceLower.includes('e-commerce')) return FiBarChart;
  if (serviceLower.includes('maintenance')) return FiSettings;
  if (serviceLower.includes('marketing')) return FiTarget;
  
  return FiLayers;
};

interface CasePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CasePage({ params }: CasePageProps) {
  // Fix Next.js 15 params issue
  const resolvedParams = use(params);
  
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [relatedCases, setRelatedCases] = useState<any[]>([]);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [servicesProvidedDetails, setServicesProvidedDetails] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function fetchCaseData() {
      try {
        setLoading(true);
        
        // Fetch current case
        const caseData = await getCaseBySlug(resolvedParams.slug);
        if (!caseData) {
          notFound();
          return;
        }
        
        console.log('Case Study Data:', caseData);
        console.log('Gallery Data:', caseData.gallery);
        console.log('ACF Data:', caseData.acf);
        
        setCaseStudy(caseData);
        
        // Fetch all cases for related cases - get more cases regardless of industry
        const allCases = await getCases();
        console.log('All Cases:', allCases.length);
        
        // Get related cases - first try same industry, then any other cases
        let related = allCases.filter((c: any) => c.id !== caseData.id && c.industry === caseData.industry);
        
        // If not enough related cases from same industry, add others
        if (related.length < 6) {
          const otherCases = allCases
            .filter((c: any) => c.id !== caseData.id && c.industry !== caseData.industry)
            .slice(0, 6 - related.length);
          related = [...related, ...otherCases];
        }
        
        related = related.slice(0, 6);
        console.log('Related Cases:', related.length);
        setRelatedCases(related);
        
        // Fetch all services
        const allServices = await getServices();
        
        // Find services that match case services provided
        const caseServices = caseData.servicesProvided || [];
        const matchingServices = allServices.filter((service: any) => {
          const serviceTitle = service.title.toLowerCase();
          return caseServices.some((cs: string) => {
            const caseService = cs.toLowerCase().replace('-', ' ');
            return serviceTitle.includes(caseService) || 
                   caseService.includes(serviceTitle.split(' ')[0]) ||
                   serviceTitle.includes(caseService.split(' ')[0]);
          });
        });
        
        setServicesProvidedDetails(matchingServices);
        
        // Set related services (different from services provided)
        const relatedServicesData = allServices
          .filter((service: any) => !matchingServices.find((ms: any) => ms.id === service.id))
          .slice(0, 6);
        
        setRelatedServices(relatedServicesData);
        
      } catch (error) {
        console.error('Error fetching case data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCaseData();
  }, [resolvedParams.slug]);

  const nextCase = () => {
    setCurrentCaseIndex((prev) => 
      prev >= Math.max(0, relatedCases.length - (isMobile ? 1 : 3)) ? 0 : prev + 1
    );
  };

  const prevCase = () => {
    setCurrentCaseIndex((prev) => 
      prev === 0 ? Math.max(0, relatedCases.length - (isMobile ? 1 : 3)) : prev - 1
    );
  };

  const nextService = () => {
    setCurrentServiceIndex((prev) => 
      prev >= Math.max(0, relatedServices.length - (isMobile ? 1 : 3)) ? 0 : prev + 1
    );
  };

  const prevService = () => {
    setCurrentServiceIndex((prev) => 
      prev === 0 ? Math.max(0, relatedServices.length - (isMobile ? 1 : 3)) : prev - 1
    );
  };

  // Get gallery images from multiple possible sources
  const getGalleryImages = (caseStudy: any) => {
    console.log('Getting gallery images for:', caseStudy?.title);
    console.log('Full case data:', caseStudy);

    let galleryImages: string[] = [];
    
    // Check different possible gallery sources
    if (caseStudy?._project_gallery_urls && Array.isArray(caseStudy._project_gallery_urls)) {
      galleryImages = caseStudy._project_gallery_urls;
      console.log('Found _project_gallery_urls:', galleryImages);
    } else if (caseStudy?.project_gallery_urls && Array.isArray(caseStudy.project_gallery_urls)) {
      galleryImages = caseStudy.project_gallery_urls;
      console.log('Found project_gallery_urls:', galleryImages);
    } else if (caseStudy?.gallery && Array.isArray(caseStudy.gallery)) {
      galleryImages = caseStudy.gallery;
      console.log('Found gallery:', galleryImages);
    } else if (caseStudy?.acf?.project_gallery && Array.isArray(caseStudy.acf.project_gallery)) {
      galleryImages = caseStudy.acf.project_gallery;
      console.log('Found acf.project_gallery:', galleryImages);
    } else if (caseStudy?.acf?.gallery && Array.isArray(caseStudy.acf.gallery)) {
      galleryImages = caseStudy.acf.gallery;
      console.log('Found acf.gallery:', galleryImages);
    }
    
    // Process images - handle both string URLs and object formats
    const processedImages = galleryImages
      .map((image: any) => {
        if (typeof image === 'string' && image.trim() !== '') {
          return image;
        } else if (typeof image === 'object' && image !== null) {
          return image.url || image.sizes?.large || image.sizes?.medium || image.source_url || '';
        }
        return '';
      })
      .filter(Boolean); // Remove empty strings
    
    console.log('Processed gallery images:', processedImages);
    
    // If no valid gallery images, create some demo images for testing
    if (processedImages.length === 0) {
      console.log('No gallery images found, using fallback');
      return [
        caseStudy?.featuredImage,
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=600&fit=crop'
      ].filter(Boolean);
    }
    
    return processedImages;
  };

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
            Loading case study...
          </motion.p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    notFound();
  }

  const Icon = getIndustryIcon(caseStudy.industry);
  const galleryImages = getGalleryImages(caseStudy);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Mobile Back Button */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-20 left-4 z-50"
        >
          <Link href="/cases">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <FiArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
          </Link>
        </motion.div>
      )}

      {/* Mobile-First Hero Section */}
      <section className={`relative ${isMobile ? 'min-h-screen pt-20' : 'min-h-screen'} flex items-center justify-center overflow-hidden`}>
        {/* Enhanced Mobile Background */}
        <div className="absolute inset-0">
          {isMobile ? (
            <>
              <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                  background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.5), rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5))',
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
            </>
          )}
        </div>

        <div className={`relative z-10 max-w-7xl mx-auto px-4 md:px-6 ${isMobile ? 'pt-8' : 'pt-32'}`}>
          <div className={`${isMobile ? 'space-y-8' : 'grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]'}`}>
            {/* Left Content - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`space-y-6 ${isMobile ? 'text-center' : ''}`}
            >
              {/* Industry Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`inline-flex items-center gap-2 ${isMobile ? 'mx-auto' : ''}`}
              >
                <Icon className="w-4 h-4 text-blue-400" />
                <span className={`px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-blue-300 border border-blue-500/30 font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>
                  {cleanHtmlContent(caseStudy.industry)}
                </span>
              </motion.div>

              {/* Main Title - Mobile Optimized */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight ${
                  isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'
                }`}
              >
                {cleanHtmlContent(caseStudy.title)}
              </motion.h1>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`text-gray-300 leading-relaxed ${isMobile ? 'text-base px-2' : 'text-lg'}`}
              >
                {cleanHtmlContent(caseStudy.excerpt)}
              </motion.p>

              {/* Client Info - Mobile Optimized */}
              {caseStudy.client && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className={`flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 ${isMobile ? 'max-w-sm mx-auto' : ''}`}
                >
                  <FiUsers className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-sm'}`}>Client</div>
                    <div className={`font-semibold text-white ${isMobile ? 'text-base' : 'text-lg'}`}>{cleanHtmlContent(caseStudy.client)}</div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`flex flex-wrap gap-4 ${isMobile ? 'justify-center' : ''}`}
              >
                {caseStudy.projectUrl && (
                  <a href={caseStudy.projectUrl} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full flex items-center gap-3 hover:shadow-2xl transition-all duration-300 ${
                        isMobile ? 'px-5 py-3 text-sm' : 'px-6 py-3'
                      }`}
                    >
                      <span>View Live Project</span>
                      <FiExternalLink className="w-4 h-4" />
                    </motion.button>
                  </a>
                )}
                
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full hover:border-purple-500/50 transition-all duration-300 ${
                      isMobile ? 'px-5 py-3 text-sm' : 'px-6 py-3'
                    }`}
                  >
                    Start Similar Project
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visual - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className={`relative flex items-center justify-center ${isMobile ? 'mt-8' : ''}`}
            >
              <div className={`relative rounded-3xl overflow-hidden ${
                isMobile ? 'h-64 w-full max-w-sm mx-auto' : 'h-[500px] w-full max-w-lg'
              }`}>
                <Image
                  src={caseStudy.featuredImage}
                  alt={cleanHtmlContent(caseStudy.title)}
                  fill
                  className="object-cover"
                  sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Mobile: Quick Actions */}
                {isMobile && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                      onClick={() => setShowFullImage(true)}
                    >
                      <FiMaximize2 className="w-4 h-4 text-white/80" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <FiHeart className="w-4 h-4 text-white/80" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <FiShare2 className="w-4 h-4 text-white/80" />
                    </motion.button>
                  </div>
                )}
                
                {/* Floating Industry Icon */}
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
                  className={`absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl ${
                    isMobile ? 'w-12 h-12' : 'w-16 h-16'
                  }`}
                >
                  <Icon className={`text-white ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                </motion.div>

                {/* Year Badge */}
                <div className={`absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 ${isMobile ? 'hidden' : ''}`}>
                  <div className="text-white font-semibold text-center">
                    <div className="text-xl">{caseStudy.year}</div>
                    <div className="text-xs text-gray-300">Project Year</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile Full Image Modal */}
      <AnimatePresence>
        {showFullImage && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFullImage(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-w-sm max-h-96"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={caseStudy.featuredImage}
                alt={cleanHtmlContent(caseStudy.title)}
                fill
                className="object-contain rounded-2xl"
                sizes="100vw"
              />
              <button
                onClick={() => setShowFullImage(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
              >
                <FiMinimize2 className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services Provided Section - Mobile Optimized */}
      {servicesProvidedDetails.length > 0 && (
        <section className={`${isMobile ? 'py-12' : 'py-20'} bg-gradient-to-b from-gray-900/30 to-black relative`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 ${
                isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'
              }`}>
                Services Provided
              </h2>
              <p className={`text-gray-400 ${isMobile ? 'text-sm px-4' : 'text-lg'}`}>Technologies and services used in this project</p>
            </motion.div>

            <div className={`${
              isMobile 
                ? 'grid grid-cols-1 gap-4' 
                : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
            }`}>
              {servicesProvidedDetails.map((service: any, index: number) => {
                const ServiceIcon = getServiceIcon(service);

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={!isMobile ? { y: -5, scale: 1.02 } : {}}
                    whileTap={isMobile ? { scale: 0.98 } : {}}
                    className="group"
                  >
                    <Link href={`/services/${service.slug}`}>
                      <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full cursor-pointer ${
                        isMobile ? 'p-4' : 'p-6'
                      }`}>
                        <div className="flex items-start gap-4">
                          <div className={`bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ${
                            isMobile ? 'w-10 h-10' : 'w-12 h-12'
                          }`}>
                            <ServiceIcon className={`text-white ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 mb-2 ${
                              isMobile ? 'text-base' : 'text-lg'
                            }`}>
                              {cleanHtmlContent(service.title)}
                            </h3>
                            <p className={`text-gray-400 line-clamp-2 mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {cleanHtmlContent(service.excerpt)}
                            </p>
                            <div className={`flex items-center gap-2 text-purple-400 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              <span>Learn More</span>
                              <FiArrowRight className={`group-hover:translate-x-1 transition-transform duration-300 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Mobile-First Case Details Tabs */}
      <section className={`${isMobile ? 'py-16' : 'py-32'} bg-gradient-to-b from-gray-900/50 to-black relative`}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          {/* Mobile-First Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`mb-12 md:mb-20 ${isMobile ? 'px-2' : ''}`}
          >
            {isMobile ? (
              // Mobile: Scrollable Tab Navigation
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 pb-2 min-w-max">
                  {[
                    { id: 'overview', label: 'Overview', icon: FiGlobe },
                    { id: 'challenge', label: 'Challenge', icon: FiTarget },
                    { id: 'solution', label: 'Solution', icon: FiZap },
                    { id: 'results', label: 'Results', icon: FiAward },
                    { id: 'process', label: 'Process', icon: FiClock },
                    { id: 'gallery', label: 'Gallery', icon: FiImage }
                  ].map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold transition-all duration-500 whitespace-nowrap text-sm ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              // Desktop: Centered Tab Navigation
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: 'overview', label: 'Overview', icon: FiGlobe },
                  { id: 'challenge', label: 'Challenge', icon: FiTarget },
                  { id: 'solution', label: 'Solution', icon: FiZap },
                  { id: 'results', label: 'Results', icon: FiAward },
                  { id: 'process', label: 'Process', icon: FiClock },
                  { id: 'gallery', label: 'Gallery', icon: FiImage }
                ].map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group px-6 py-3 rounded-2xl font-semibold transition-all duration-500 flex items-center gap-3 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/25'
                        : 'bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 transition-transform duration-300 ${
                      activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Enhanced Tab Content - Mobile Optimized */}
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
                <div className={`bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 ${
                  isMobile ? 'p-6' : 'p-12'
                }`}>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div 
                      className={`text-gray-300 leading-relaxed ${isMobile ? 'text-base' : 'text-lg'}`}
                      dangerouslySetInnerHTML={{ 
                        __html: caseStudy.content?.replace(/&#038;/g, '&').replace(/&amp;/g, '&') 
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'challenge' && (
                <div className={`bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl border border-red-500/20 ${
                  isMobile ? 'p-6' : 'p-12'
                }`}>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div 
                      className={`text-gray-300 leading-relaxed ${isMobile ? 'text-base' : 'text-lg'}`}
                      dangerouslySetInnerHTML={{ 
                        __html: caseStudy.challenge?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/\n/g, '<br>').replace(/•/g, '<br>•') || 'Challenge details will be available soon.'
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'solution' && (
                <div className={`bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl border border-blue-500/20 ${
                  isMobile ? 'p-6' : 'p-12'
                }`}>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div 
                      className={`text-gray-300 leading-relaxed ${isMobile ? 'text-base' : 'text-lg'}`}
                      dangerouslySetInnerHTML={{ 
                        __html: caseStudy.solution?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/\n/g, '<br>').replace(/•/g, '<br>•') || 'Solution details will be available soon.'
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'results' && (
                <div className={`bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-3xl border border-green-500/20 ${
                  isMobile ? 'p-6' : 'p-12'
                }`}>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div 
                      className={`text-gray-300 leading-relaxed ${isMobile ? 'text-base' : 'text-lg'}`}
                      dangerouslySetInnerHTML={{ 
                        __html: caseStudy.impact?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/\n/g, '<br>').replace(/•/g, '<br>•') || 'Results will be available soon.'
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'process' && (
                <div className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl border border-purple-500/20 ${
                  isMobile ? 'p-6' : 'p-12'
                }`}>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div 
                      className={`text-gray-300 leading-relaxed [&>br]:leading-[1.2] [&>br]:mb-1 ${isMobile ? 'text-base' : 'text-lg'}`}
                      style={{ lineHeight: '1.4' }}
                      dangerouslySetInnerHTML={{ 
                        __html: caseStudy.process?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/\n/g, '<br>').replace(/Month \d+:/g, '<br><strong>$&</strong>').replace(/•/g, '<br>• ') || 'Process details will be available soon.'
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-8">
                  {galleryImages.length > 0 ? (
                    <>
                      <div className="text-center mb-8">
                        <h3 className={`font-bold text-white mb-2 ${isMobile ? 'text-xl' : 'text-2xl'}`}>Project Gallery</h3>
                        <p className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>Click on any image to view in full size</p>
                      </div>

                      <div className={`${
                        isMobile 
                          ? 'grid grid-cols-1 gap-4' 
                          : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                      }`}>
                        {galleryImages.map((imageUrl: string, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                            whileTap={isMobile ? { scale: 0.98 } : {}}
                            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                              isMobile ? 'h-48' : 'h-64'
                            }`}
                            onClick={() => setSelectedGalleryImage(imageUrl)}
                          >
                            <Image
                              src={imageUrl}
                              alt={`Project gallery ${index + 1}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <FiPlay className={`text-white ${isMobile ? 'w-8 h-8' : 'w-12 h-12'}`} />
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Gallery Modal - Mobile Optimized */}
                      <AnimatePresence>
                        {selectedGalleryImage && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedGalleryImage(null)}
                          >
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0.8 }}
                              className={`relative w-full h-full ${
                                isMobile ? 'max-w-sm max-h-96' : 'max-w-4xl max-h-[80vh]'
                              }`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Image
                                src={selectedGalleryImage}
                                alt="Gallery image"
                                fill
                                className="object-contain rounded-2xl"
                                sizes="100vw"
                              />
                              <button
                                onClick={() => setSelectedGalleryImage(null)}
                                className={`absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300 ${
                                  isMobile ? 'w-10 h-10' : 'w-10 h-10'
                                }`}
                              >
                                ×
                              </button>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <FiImage className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className={`text-gray-400 ${isMobile ? 'text-base' : 'text-lg'}`}>Project gallery will be available soon.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Mobile-First Related Services Carousel */}
      {relatedServices.length > 0 && (
        <section className={`${isMobile ? 'py-16' : 'py-32'} bg-gradient-to-b from-black to-gray-900/50 relative overflow-hidden`}>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-16"
            >
              <h2 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 ${
                isMobile ? 'text-3xl' : 'text-5xl md:text-7xl'
              }`}>
                Related Services
              </h2>
              <p className={`text-gray-400 max-w-2xl mx-auto ${isMobile ? 'text-base px-4' : 'text-xl'}`}>
                Discover services that can complement your project
              </p>
            </motion.div>

            <div className="relative">
              {isMobile ? (
                // Mobile: Simple scroll view
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-4 pb-4">
                    {relatedServices.map((service) => {
                      const ServiceIcon = getServiceIcon(service);
                      return (
                        <Link
                          key={service.id}
                          href={`/services/${service.slug}`}
                          className="flex-shrink-0 w-72"
                        >
                          <motion.div
                            whileTap={{ scale: 0.98 }}
                            className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full"
                          >
                            <div className="relative h-40 overflow-hidden">
                              <Image
                                src={service.featuredImage}
                                alt={cleanHtmlContent(service.title)}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="288px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                              <div className="absolute bottom-3 left-3 w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <ServiceIcon className="w-5 h-5 text-white" />
                              </div>
                              <div className="absolute bottom-3 right-3">
                                <FiArrowRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-300" />
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                                {cleanHtmlContent(service.title)}
                              </h3>
                              <p className="text-gray-400 text-sm line-clamp-2">
                                {cleanHtmlContent(service.excerpt)}
                              </p>
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Desktop: Carousel with navigation
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
                      {relatedServices.map((service) => {
                        const ServiceIcon = getServiceIcon(service);
                        return (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="flex-shrink-0 w-96"
                          >
                            <motion.div
                              whileHover={{ y: -10, scale: 1.02 }}
                              className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full"
                            >
                              <div className="relative h-56 overflow-hidden">
                                <Image
                                  src={service.featuredImage}
                                  alt={cleanHtmlContent(service.title)}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                                  sizes="400px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                  <ServiceIcon className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute bottom-4 right-4">
                                  <FiArrowRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                                </div>
                              </div>
                              <div className="p-8">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                                  {cleanHtmlContent(service.title)}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2">
                                  {cleanHtmlContent(service.excerpt)}
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

      {/* Mobile-First Related Cases Carousel */}
      <section className={`${isMobile ? 'py-16' : 'py-32'} bg-gradient-to-b from-gray-900/50 to-black relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 ${
              isMobile ? 'text-3xl' : 'text-5xl md:text-7xl'
            }`}>
              Similar Projects
            </h2>
            <p className={`text-gray-400 max-w-2xl mx-auto ${isMobile ? 'text-base px-4' : 'text-xl'}`}>
              {relatedCases.length > 0 
                ? `Explore other successful projects${caseStudy.industry ? ` in the ${caseStudy.industry} industry` : ''}`
                : 'More case studies coming soon'
              }
            </p>
          </motion.div>

          {relatedCases.length > 0 ? (
            <div className="relative">
              {isMobile ? (
                // Mobile: Simple scroll view
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-4 pb-4">
                    {relatedCases.map((relatedCase) => {
                      const RelatedIcon = getIndustryIcon(relatedCase.industry);
                      return (
                        <Link
                          key={relatedCase.id}
                          href={`/cases/${relatedCase.slug}`}
                          className="flex-shrink-0 w-72"
                        >
                          <motion.div
                            whileTap={{ scale: 0.98 }}
                            className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full"
                          >
                            <div className="relative h-40 overflow-hidden">
                              <Image
                                src={relatedCase.featuredImage}
                                alt={cleanHtmlContent(relatedCase.title)}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="288px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                              <div className="absolute top-3 left-3">
                                <span className="px-2 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs text-blue-300 border border-blue-500/30 font-medium flex items-center gap-1">
                                  <RelatedIcon className="w-3 h-3" />
                                  {cleanHtmlContent(relatedCase.industry)}
                                </span>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                                {cleanHtmlContent(relatedCase.title)}
                              </h3>
                              <p className="text-gray-400 mb-3 line-clamp-2 text-sm">
                                {cleanHtmlContent(relatedCase.excerpt)}
                              </p>
                              {relatedCase.client && (
                                <div className="flex items-center gap-2">
                                  <FiUsers className="w-3 h-3 text-purple-400" />
                                  <p className="text-purple-400 text-xs font-medium">
                                    {cleanHtmlContent(relatedCase.client)}
                                  </p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Desktop: Carousel with navigation
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
                      {relatedCases.map((relatedCase) => {
                        const RelatedIcon = getIndustryIcon(relatedCase.industry);
                        return (
                          <Link
                            key={relatedCase.id}
                            href={`/cases/${relatedCase.slug}`}
                            className="flex-shrink-0 w-96"
                          >
                            <motion.div
                              whileHover={{ y: -10, scale: 1.02 }}
                              className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full"
                            >
                              <div className="relative h-56 overflow-hidden">
                                <Image
                                  src={relatedCase.featuredImage}
                                  alt={cleanHtmlContent(relatedCase.title)}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                                  sizes="400px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute top-4 left-4">
                                  <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs text-blue-300 border border-blue-500/30 font-medium flex items-center gap-2">
                                    <RelatedIcon className="w-3 h-3" />
                                    {cleanHtmlContent(relatedCase.industry)}
                                  </span>
                                </div>
                              </div>
                              <div className="p-8">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                                  {cleanHtmlContent(relatedCase.title)}
                                </h3>
                                <p className="text-gray-400 mb-4 line-clamp-2">
                                  {cleanHtmlContent(relatedCase.excerpt)}
                                </p>
                                {relatedCase.client && (
                                  <div className="flex items-center gap-2">
                                    <FiUsers className="w-4 h-4 text-purple-400" />
                                    <p className="text-purple-400 text-sm font-medium">
                                      {cleanHtmlContent(relatedCase.client)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </Link>
                        );
                      })}
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
            </div>
          ) : (
            <div className="text-center py-20">
              <FiTarget className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className={`text-gray-400 ${isMobile ? 'text-base' : 'text-lg'}`}>More related case studies coming soon!</p>
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
                  Ready for Similar Success?
                </h2>

                <p className="text-gray-300 mb-8 leading-relaxed px-4">
                  Let's create your next success story with a comprehensive consultation.
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
                    <Link href="/cases">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-sm"
                      >
                        View All Cases
                      </motion.button>
                    </Link>
                    
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <FiMessageCircle className="w-4 h-4" />
                        Let's Talk
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              // Desktop CTA Layout
              <div>
                <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-8">
                  Ready for Similar Success?
                </h2>
                <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Let's create your next success story. Get started with a comprehensive consultation and transform your business today.
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
                  
                  <Link href="/cases">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderColor: 'rgba(139, 92, 246, 0.5)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-full hover:border-purple-500/50 transition-all duration-300 text-lg"
                    >
                      View All Cases
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