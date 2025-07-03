'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiArrowRight,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiGithub,
  FiSend,
  FiExternalLink,
  FiCode,
  FiShoppingCart,
  FiCpu,
  FiZap,
  FiPenTool,
  FiCalendar,
  FiSearch,
  FiShield,
  FiHeart,
  FiStar,
  FiTrendingUp,
  FiGlobe,
  FiAward,
  FiUsers,
  FiMessageCircle,
  FiTarget,
  FiLayers,
  FiCheck
} from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Fix hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Newsletter subscription:', email);
    setEmail('');
    setIsSubmitting(false);
    setSubscriptionSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubscriptionSuccess(false), 3000);
  };

  // Services with icons and real links
  const services = [
    { name: 'Website Design & Redesign', href: '/services/website-design-redesign', icon: FiCode, color: 'from-blue-500 to-cyan-500' },
    { name: 'E-commerce Enhancement', href: '/services/ecommerce-enhancement-marketing', icon: FiShoppingCart, color: 'from-green-500 to-emerald-500' },
    { name: 'AI Process Automation', href: '/services/ai-process-automation', icon: FiCpu, color: 'from-purple-500 to-pink-500' },
    { name: 'Performance Optimization', href: '/services/website-performance-optimization', icon: FiZap, color: 'from-yellow-500 to-orange-500' },
    { name: 'UI/UX Design & Branding', href: '/services/ui-ux-design-branding', icon: FiPenTool, color: 'from-rose-500 to-red-500' },
    { name: 'Online Booking Systems', href: '/services/online-booking-systems', icon: FiCalendar, color: 'from-indigo-500 to-purple-500' },
    { name: 'SEO Services', href: '/services/search-engine-optimization-seo', icon: FiSearch, color: 'from-teal-500 to-cyan-500' },
    { name: 'Website Security', href: '/services/website-security-services', icon: FiShield, color: 'from-gray-500 to-slate-500' }
  ];

  // Company links - only existing pages
  const companyLinks = [
    { name: 'About Us', href: '/about', icon: FiUsers },
    { name: 'Contact Us', href: '/contact', icon: FiMessageCircle }
  ];

  // Quick links
  const quickLinks = [
    { name: 'Our Services', href: '/services', icon: FiLayers },
    { name: 'Portfolio', href: '/cases', icon: FiTarget }
  ];

  // Social media links with colors
  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/company/uae-digital-solutions', icon: FiLinkedin, color: 'hover:bg-blue-600' },
    { name: 'Twitter', href: 'https://twitter.com/uaedigital', icon: FiTwitter, color: 'hover:bg-sky-500' },
    { name: 'Instagram', href: 'https://instagram.com/uaedigital', icon: FiInstagram, color: 'hover:bg-pink-600' },
    { name: 'Facebook', href: 'https://facebook.com/uaedigital', icon: FiFacebook, color: 'hover:bg-blue-700' },
    { name: 'YouTube', href: 'https://youtube.com/uaedigital', icon: FiYoutube, color: 'hover:bg-red-600' },
    { name: 'GitHub', href: 'https://github.com/uaedigital', icon: FiGithub, color: 'hover:bg-gray-700' }
  ];

  // Contact information with enhanced styling
  const contactInfo = [
    { 
      icon: FiPhone, 
      label: 'Phone', 
      value: '+971 50 123 4567', 
      href: 'tel:+971501234567',
      color: 'from-green-500 to-emerald-500',
      description: 'Call us anytime'
    },
    { 
      icon: FiMail, 
      label: 'Email', 
      value: 'hello@uaedigital.com', 
      href: 'mailto:hello@uaedigital.com',
      color: 'from-blue-500 to-cyan-500',
      description: 'Drop us a line'
    },
    { 
      icon: FiMapPin, 
      label: 'Address', 
      value: 'Dubai, UAE', 
      href: 'https://maps.google.com/?q=Dubai,UAE',
      color: 'from-purple-500 to-pink-500',
      description: 'Visit our office'
    }
  ];

  if (!mounted) {
    return <div className="h-96 bg-gray-900"></div>;
  }

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-pink-500/25 to-orange-500/25 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      
      <div className="relative z-10">
        {/* Newsletter Section - Enhanced */}
        <div className="border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <FiSend className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Stay in the Loop
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Get exclusive insights, industry trends, and the latest updates from our digital experts delivered to your inbox.
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {subscriptionSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center justify-center space-x-3 text-green-400 text-lg font-semibold"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FiCheck className="w-5 h-5 text-white" />
                    </div>
                    <span>Successfully subscribed! Welcome aboard! 🎉</span>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 pr-12"
                      />
                      <FiMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 min-w-[140px]"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <FiSend className="w-5 h-5" />
                          <span>Subscribe</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Main Footer Content - Mobile App Cards Style */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Company Info - Enhanced */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full"
              >
                <Link href="/" className="flex items-center space-x-4 mb-6">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src="/logo.png"
                      alt="UAE Digital Solutions"
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain relative z-10"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">UAE Digital Solutions</h3>
                    <p className="text-purple-300 text-sm">Digital Innovation Partner</p>
                  </div>
                </Link>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Empowering businesses through cutting-edge digital solutions. We transform ideas into powerful web experiences, mobile applications, and AI-driven automation that accelerate growth and success.
                </p>

                {/* Contact Cards */}
                <div className="space-y-3">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{info.value}</div>
                        <div className="text-gray-400 text-sm">{info.description}</div>
                      </div>
                      <FiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Services - Card Style */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <FiLayers className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Our Services</h4>
                </div>
                
                <div className="space-y-3 mb-6">
                  {services.slice(0, 6).map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={service.href}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                      >
                        <div className={`w-8 h-8 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <service.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors flex-1 text-sm">{service.name}</span>
                        <FiArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <Link
                  href="/services"
                  className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl text-purple-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white transition-all duration-300 group"
                >
                  <span className="font-medium">View All Services</span>
                  <FiExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>

            {/* Quick Links & Social - Card Style */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FiTarget className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Quick Links</h4>
                </div>
                
                <div className="space-y-3 mb-8">
                  {[...companyLinks, ...quickLinks].map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                      >
                        <link.icon className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors" />
                        <span className="text-gray-300 group-hover:text-white transition-colors flex-1">{link.name}</span>
                        <FiArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h5 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <FiHeart className="w-5 h-5 text-red-400" />
                    <span>Follow Us</span>
                  </h5>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {socialLinks.slice(0, 6).map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center transition-all duration-300 group ${social.color}`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                      </motion.a>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 group mt-6"
                  >
                    <FiSend className="w-4 h-4" />
                    <span>Start Your Project</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 text-gray-400 text-sm"
              >
                <span>© {currentYear} UAE Digital Solutions.</span>
                <span className="flex items-center space-x-1">
                  <span>Made with</span>
                  <FiHeart className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>in Dubai</span>
                </span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center space-x-6 text-sm"
              >
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-1">
                  <span>Privacy Policy</span>
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-1">
                  <span>Terms of Service</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;