'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  FiMenu, 
  FiX, 
  FiChevronDown, 
  FiArrowRight,
  FiGlobe,
  FiMessageCircle,
  FiCode,
  FiShoppingCart,
  FiCpu,
  FiZap,
  FiPenTool,
  FiCalendar,
  FiSearch,
  FiShield,
  FiHome,
  FiBriefcase,
  FiUser,
  FiMail,
  FiPhone,
  FiSend
} from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [caseCategories, setCaseCategories] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Fix hydration by ensuring component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll handling with proper progress calculation
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setIsScrolled(scrollTop > 10);
      setScrollProgress(scrollPercent);
    };

    // Initial call
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Fetch case categories
  useEffect(() => {
    const fetchCaseCategories = async () => {
      try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/case-studies?per_page=50&_embed`);
        
        if (!response.ok) {
          response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/case_study?per_page=50&_embed`);
        }
        
        if (!response.ok) {
          response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/cases?per_page=50&_embed`);
        }

        if (response.ok) {
          const casesData = await response.json();
          const allCategories: string[] = [];
          casesData.forEach((case_item: any) => {
            if (case_item.acf?.case_categories) {
              if (Array.isArray(case_item.acf.case_categories)) {
                allCategories.push(...case_item.acf.case_categories);
              } else {
                allCategories.push(case_item.acf.case_categories);
              }
            }
            if (case_item.acf?.industry) {
              allCategories.push(case_item.acf.industry);
            }
          });
          
          const uniqueCategories = [...new Set(allCategories.filter(Boolean))];
          setCaseCategories(uniqueCategories.slice(0, 6));
        } else {
          setCaseCategories(['Healthcare', 'E-commerce', 'Finance', 'Education', 'Real Estate', 'Technology']);
        }
      } catch (error) {
        setCaseCategories(['Healthcare', 'E-commerce', 'Finance', 'Education', 'Real Estate', 'Technology']);
      }
    };

    fetchCaseCategories();
  }, []);

  // Services with proper titles and unique icons
  const services = [
    { 
      id: 64, 
      title: 'Website Design & Redesign', 
      slug: 'website-design-redesign',
      icon: FiCode
    },
    { 
      id: 70, 
      title: 'E-commerce Enhancement & Marketing', 
      slug: 'ecommerce-enhancement-marketing',
      icon: FiShoppingCart
    },
    { 
      id: 47, 
      title: 'AI Process Automation', 
      slug: 'ai-process-automation',
      icon: FiCpu
    },
    { 
      id: 68, 
      title: 'Website Performance Optimization', 
      slug: 'website-performance-optimization',
      icon: FiZap
    },
    { 
      id: 69, 
      title: 'UI/UX Design & Branding', 
      slug: 'ui-ux-design-branding',
      icon: FiPenTool
    },
    { 
      id: 63, 
      title: 'Online Booking Systems', 
      slug: 'online-booking-systems',
      icon: FiCalendar
    },
    { 
      id: 73, 
      title: 'Search Engine Optimization (SEO)', 
      slug: 'search-engine-optimization-seo',
      icon: FiSearch
    },
    { 
      id: 72, 
      title: 'Website Security Services', 
      slug: 'website-security-services',
      icon: FiShield
    }
  ];

  // Function to decode HTML entities
  const decodeHtmlEntities = (text: string): string => {
    if (!mounted) return text;
    
    const entities: { [key: string]: string } = {
      '&#038;': '&',
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': "'",
      '&apos;': "'"
    };
    
    return text.replace(/&#?\w+;/g, (match) => entities[match] || match);
  };

  const navigation = [
    { name: 'Home', href: '/', icon: FiHome },
    { 
      name: 'Services', 
      href: '/services',
      icon: FiBriefcase,
      hasDropdown: true,
      dropdownType: 'services'
    },
    { 
      name: 'Portfolio', 
      href: '/cases',
      icon: FiBriefcase,
      hasDropdown: true,
      dropdownType: 'portfolio'
    },
    { name: 'About Us', href: '/about', icon: FiUser },
    { name: 'Contact Us', href: '/contact', icon: FiMail }
  ];

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'AR', name: 'العربية', flag: '🇦🇪' }
  ];

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="h-20"></div>;
  }

  return (
    <div>
      {/* DESKTOP VERSION - Hidden on mobile */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden lg:block fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 pt-4">
          {/* Left Column - Logo and Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`flex items-center space-x-7 px-3 py-0 rounded-2xl transition-all duration-500 ${
              isScrolled 
                ? 'bg-white/80 backdrop-blur-xl border border-gray-100 shadow-lg shadow-gray-900/10' 
                : 'bg-white/90 backdrop-blur-sm border border-gray-100 shadow-md'
            }`}
          >
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="UAE Digital Solutions"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-medium text-gray-900 leading-tight font-sans">UAE Digital</h1>
                  <h2 className="text-lg font-medium text-gray-900 leading-tight font-sans">Solutions</h2>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-0.5">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? 'text-purple-600 bg-purple-50'
                        : item.name === 'Home'
                        ? 'text-purple-600 hover:text-purple-700 hover:bg-purple-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>

                  {/* Desktop Dropdowns */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && item.dropdownType === 'services' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-[600px] bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-4">
                            {services.map((service, index) => {
                              const IconComponent = service.icon;
                              const cleanTitle = decodeHtmlEntities(service.title);
                              
                              return (
                                <motion.div
                                  key={service.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <Link
                                    href={`/services/${service.slug}`}
                                    className="flex items-start p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                  >
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                                      <IconComponent className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="text-gray-900 font-semibold text-sm group-hover:text-purple-600 transition-colors">
                                        {cleanTitle}
                                      </h3>
                                      <p className="text-gray-500 text-xs mt-1 group-hover:text-gray-600 transition-colors">
                                        Professional {cleanTitle.toLowerCase()} services
                                      </p>
                                    </div>
                                    <FiArrowRight className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 p-4">
                          <Link
                            href="/services"
                            className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                          >
                            View All Services
                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && item.dropdownType === 'portfolio' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-[500px] bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-6">
                          <h4 className="text-sm font-semibold text-gray-900 mb-4">Browse by Category</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {caseCategories.length > 0 ? caseCategories.map((category, index) => (
                              <motion.div
                                key={category}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  href={`/cases?category=${encodeURIComponent(category)}`}
                                  className="block p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-gray-900 font-semibold text-sm group-hover:text-purple-600 transition-colors">
                                      {category}
                                    </h3>
                                    <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full">
                                      View
                                    </span>
                                  </div>
                                  <p className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors">
                                    {category} industry projects
                                  </p>
                                </Link>
                              </motion.div>
                            )) : (
                              <div className="col-span-2 text-center py-4">
                                <p className="text-gray-500 text-sm">Loading portfolio categories...</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 p-4">
                          <Link
                            href="/cases"
                            className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                          >
                            View All Cases
                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </motion.div>

          {/* Right Column - Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`flex items-center space-x-4 px-6 py-3 rounded-2xl transition-all duration-500 ${
              isScrolled 
                ? 'bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg shadow-gray-900/10' 
                : 'bg-white/90 backdrop-blur-sm border border-gray-100 shadow-md'
            }`}
          >
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-300"
              >
                <FiGlobe className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700 font-medium">English</span>
                <FiChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${
                  isLanguageOpen ? 'rotate-180' : ''
                }`} />
              </motion.button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setIsLanguageOpen(false)}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lang.name}</div>
                          <div className="text-xs text-gray-500">{lang.code}</div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Live Chat Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-300 group relative"
            >
              <FiMessageCircle className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </motion.button>

            {/* Get In Touch Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Say Hello!
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* MOBILE VERSION - Fixed Horizontal Scroll + Smaller Buttons */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-gradient-to-r from-purple-600/95 via-blue-600/95 to-indigo-600/95 backdrop-blur-xl shadow-2xl shadow-purple-500/20' 
            : 'bg-gradient-to-r from-purple-500/90 via-blue-500/90 to-indigo-500/90 backdrop-blur-sm'
        }`}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.1)_50%,transparent_70%)]"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Mobile Header Bar - Constrained Width with Smaller Buttons */}
        <div className="relative z-10 w-full px-3 py-3">
          <div className="flex items-center justify-between max-w-full">
            {/* Enhanced Logo Section - Smaller */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <Link href="/" className="flex items-center space-x-2">
                {/* Smaller Logo */}
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 flex items-center justify-center shadow-lg">
                    <Image
                      src="/logo.png"
                      alt="UAE Digital Solutions"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  {/* Animated ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-white/50"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>
                
                {/* Smaller Company Name */}
                <div className="min-w-0">
                  <h1 className="text-sm font-bold text-white leading-tight">
                    UAE Digital
                  </h1>
                  <p className="text-xs text-white/80 leading-tight -mt-0.5">
                    Solutions
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Action Buttons - Much Smaller */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-1.5 flex-shrink-0"
            >
              {/* Smaller CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="flex items-center space-x-1 px-2.5 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium text-xs shadow-lg hover:bg-white/30 transition-all duration-300"
                >
                  <FiSend className="w-3 h-3 flex-shrink-0" />
                  <span>Quote</span>
                </Link>
              </motion.div>

              {/* Much Smaller Burger Menu */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-9 h-9 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center shadow-lg hover:bg-white/30 transition-all duration-300 flex-shrink-0"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="relative"
                    >
                      <FiX className="w-4 h-4 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="relative"
                    >
                      {/* Smaller Animated Burger Lines */}
                      <div className="w-4 h-4 flex flex-col justify-center items-center space-y-0.5">
                        <motion.div
                          className="w-3.5 h-0.5 bg-white rounded-full"
                          animate={{ 
                            scaleX: [1, 0.8, 1],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        />
                        <motion.div
                          className="w-3 h-0.5 bg-white rounded-full"
                          animate={{ 
                            scaleX: [1, 1.2, 1],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 0.2
                          }}
                        />
                        <motion.div
                          className="w-2.5 h-0.5 bg-white rounded-full"
                          animate={{ 
                            scaleX: [1, 0.9, 1],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 0.4
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Smaller Notification Dot */}
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Fixed Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full origin-left"
            style={{ 
              scaleX: scrollProgress / 100,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          />
        </div>
      </motion.div>

      {/* Mobile Full-Screen Menu - Fixed Width Issues */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 top-[61px] bg-white z-40 overflow-y-auto"
          >
            <div className="px-4 py-6 max-w-full">
              {/* Navigation Items */}
              <nav className="space-y-1 mb-8">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                        pathname === item.href
                          ? 'bg-purple-50 text-purple-600 border-2 border-purple-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        pathname === item.href
                          ? 'bg-purple-100'
                          : 'bg-white'
                      }`}>
                        <item.icon className={`w-6 h-6 ${
                          pathname === item.href ? 'text-purple-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                        <p className="text-sm text-gray-500 truncate">
                          {item.name === 'Home' && 'Welcome to UAE Digital'}
                          {item.name === 'Services' && 'Our digital solutions'}
                          {item.name === 'Portfolio' && 'Our latest work'}
                          {item.name === 'About Us' && 'Learn about our team'}
                          {item.name === 'Contact Us' && 'Get in touch with us'}
                        </p>
                      </div>
                      <FiArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Services Quick Access */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.slice(0, 4).map((service, index) => {
                    const IconComponent = service.icon;
                    const cleanTitle = decodeHtmlEntities(service.title);
                    
                    return (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                          {cleanTitle}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          Professional {cleanTitle.toLowerCase()} services
                        </p>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/services"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center mt-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl"
                >
                  View All Services
                </Link>
              </motion.div>

              {/* Contact Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Get In Touch</h3>
                
                <a
                  href="tel:+971501234567"
                  className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl border border-green-200"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiPhone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900">Call Now</h4>
                    <p className="text-sm text-gray-600 truncate">+971 50 123 4567</p>
                  </div>
                </a>

                <a
                  href="mailto:hello@uaedigital.com"
                  className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl border border-blue-200"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900">Email Us</h4>
                    <p className="text-sm text-gray-600 truncate">hello@uaedigital.com</p>
                  </div>
                </a>

                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-4 p-4 bg-purple-50 rounded-2xl border border-purple-200"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiMessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900">Contact Form</h4>
                    <p className="text-sm text-gray-600 truncate">Send us a message</p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;