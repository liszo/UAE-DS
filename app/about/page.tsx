'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiArrowRight, 
  FiUsers, 
  FiTrendingUp, 
  FiAward, 
  FiGlobe,
  FiStar,
  FiTarget,
  FiZap,
  FiHeart,
  FiShield,
  FiCoffee,
  FiCalendar,
  FiCode,
  FiMonitor,
  FiSmartphone,
  FiPlay,
  FiPause,
  FiMaximize2,
  FiMinimize2,
  FiShare2,
  FiBookmark,
  FiMessageCircle,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowLeft,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiCamera,
  FiVideo,
  FiMic
} from 'react-icons/fi';
import { getTeamMembers } from '@/lib/wordpress';
import React from 'react';

interface TeamMember {
  id: number;
  title: string;
  name: string;
  content: string;
  image?: string;
  bio?: string;
  acf?: {
    position?: string;
    bio?: string;
    experience?: string;
    skills?: string;
  };
  role?: string;
  social_links_array?: {
    [key: string]: string;
  };
}

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedValue, setExpandedValue] = useState<number | null>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

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
    async function fetchTeamMembers() {
      try {
        setLoading(true);
        const data = await getTeamMembers();
        console.log('Team members data:', data);
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTeamMembers();
  }, []);

  // Auto-play story carousel on mobile
  useEffect(() => {
    if (isMobile && isPlaying) {
      const interval = setInterval(() => {
        setCurrentStoryIndex((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, isPlaying]);

  const getTeamMemberName = (member: TeamMember) => {
    const name = member?.name || member?.title || 'Team Member';
    return name.replace(/&#038;/g, '&').replace(/&amp;/g, '&');
  };

  const getTeamMemberBio = (member: TeamMember) => {
    const bio = member?.bio || member?.acf?.bio || member?.content || '';
    return bio.replace(/<[^>]*>/g, '');
  };

  const getTeamMemberPosition = (member: TeamMember) => {
    return member?.role || member?.acf?.position || 'Team Member';
  };

  const getFeaturedImage = (member: TeamMember) => {
    if (member?.image && member.image !== '' && member.image !== '/api/placeholder/400/400') {
      return member.image;
    }
    
    const fallbackImages = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b332c1b4?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    ];
    
    const imageIndex = (member?.id || 0) % fallbackImages.length;
    return fallbackImages[imageIndex];
  };

  const getSocialIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      linkedin: 'fab fa-linkedin',
      twitter: 'fab fa-twitter',
      github: 'fab fa-github',
      instagram: 'fab fa-instagram',
      facebook: 'fab fa-facebook'
    };
    return icons[platform.toLowerCase()] || 'fas fa-link';
  };

  const stories = [
    {
      title: "Our Beginning",
      content: "Started with a vision to transform businesses through digital innovation",
      icon: FiZap,
      color: "from-purple-600 to-blue-600"
    },
    {
      title: "First Success",
      content: "Delivered our first major project and gained recognition in the industry",
      icon: FiAward,
      color: "from-blue-600 to-green-600"
    },
    {
      title: "Team Growth",
      content: "Expanded our team with talented professionals from diverse backgrounds",
      icon: FiUsers,
      color: "from-green-600 to-yellow-600"
    },
    {
      title: "Global Reach",
      content: "Now serving clients worldwide with cutting-edge digital solutions",
      icon: FiGlobe,
      color: "from-yellow-600 to-red-600"
    }
  ];

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
          <Link href="/">
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
      <section className={`relative ${isMobile ? 'min-h-screen pt-20' : 'pt-32 pb-20'} overflow-hidden`}>
        {/* Enhanced Mobile Background */}
        <div className="absolute inset-0">
          {isMobile ? (
            <>
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6), rgba(16, 185, 129, 0.4))',
                  backgroundSize: '400% 400%'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-gradient-to-tr from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </>
          ) : (
            <>
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </>
          )}
        </div>

        <div className={`max-w-7xl mx-auto px-4 md:px-6 relative z-10 ${isMobile ? 'pt-8' : ''}`}>
          <div className={`${isMobile ? 'space-y-8 text-center' : 'grid lg:grid-cols-2 gap-16 items-center'}`}>
            {/* Content - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`space-y-6 ${isMobile ? '' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`inline-flex items-center gap-2 ${isMobile ? 'mx-auto' : ''}`}
              >
                <FiUsers className="w-4 h-4 text-blue-400" />
                <span className={`px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-blue-300 border border-blue-500/30 font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>
                  About Our Team
                </span>
              </motion.div>

              <h1 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight ${
                isMobile ? 'text-4xl' : 'text-5xl md:text-7xl'
              }`}>
                UAE Digital Team
              </h1>
              
              <p className={`text-gray-300 leading-relaxed ${
                isMobile ? 'text-base px-2' : 'text-xl'
              }`}>
                We&apos;re a passionate team of digital innovators, strategists, and creators dedicated to transforming businesses through cutting-edge technology and creative excellence.
              </p>
              
              {/* Mobile: Key Points Grid */}
              {isMobile ? (
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                  {[
                    { icon: FiZap, text: 'Innovation Driven', color: 'purple' },
                    { icon: FiAward, text: 'Award Winning', color: 'blue' },
                    { icon: FiGlobe, text: 'Global Reach', color: 'green' },
                    { icon: FiHeart, text: 'Client Focused', color: 'red' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex flex-col items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                    >
                      <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                      <span className="text-gray-300 text-xs text-center font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Desktop: Key Points
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: FiZap, text: 'Innovation Driven', color: 'purple' },
                    { icon: FiAward, text: 'Award Winning', color: 'blue' },
                    { icon: FiGlobe, text: 'Global Reach', color: 'green' },
                    { icon: FiHeart, text: 'Client Focused', color: 'red' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons - Mobile Optimized */}
              <div className={`flex flex-wrap gap-4 ${isMobile ? 'justify-center' : ''}`}>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full flex items-center gap-2 hover:shadow-2xl transition-all duration-300 ${
                      isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4'
                    }`}
                  >
                    Work With Us
                    <FiArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full hover:border-purple-500/50 transition-all duration-300 ${
                      isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4'
                    }`}
                  >
                    Our Services
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`relative ${isMobile ? 'mt-8' : ''}`}
            >
              {isMobile ? (
                // Mobile: Story Carousel
                <div className="relative h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      {isPlaying ? <FiPause className="w-4 h-4 text-white/80" /> : <FiPlay className="w-4 h-4 text-white/80" />}
                    </motion.button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStoryIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${stories[currentStoryIndex].color} rounded-2xl flex items-center justify-center mb-4`}>
                        {React.createElement(stories[currentStoryIndex].icon, { className: "w-8 h-8 text-white" })}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{stories[currentStoryIndex].title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{stories[currentStoryIndex].content}</p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Story Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {stories.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStoryIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentStoryIndex ? 'bg-white w-4' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                // Desktop: Team Visualization
                <div className="relative h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10">
                  <div className="absolute inset-0">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                      alt="UAE Digital Team"
                      fill
                      className="object-cover opacity-80"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-purple-900/20 to-transparent" />
                  </div>
                  
                  {/* Floating Team Stats */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FiUsers className="w-6 h-6 text-blue-400" />
                      <span className="text-2xl font-bold text-white">10+</span>
                    </div>
                    <p className="text-white text-sm font-semibold">Expert Team</p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/2 left-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FiTrendingUp className="w-6 h-6 text-green-400" />
                      <span className="text-2xl font-bold text-white">200+</span>
                    </div>
                    <p className="text-white text-sm font-semibold">Projects Done</p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FiAward className="w-6 h-6 text-purple-400" />
                      <span className="text-2xl font-bold text-white">5+</span>
                    </div>
                    <p className="text-white text-sm font-semibold">Years Experience</p>
                  </motion.div>

                  {/* Tech Stack Icons */}
                  <div className="absolute bottom-8 left-8 flex gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
                    >
                      <FiCode className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center"
                    >
                      <FiMonitor className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 bg-gradient-to-r from-pink-600 to-red-600 rounded-xl flex items-center justify-center"
                    >
                      <FiSmartphone className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile-First Stats Section */}
      <section className={`${isMobile ? 'py-12' : 'py-20'} bg-gradient-to-b from-gray-900/50 to-black`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${
              isMobile 
                ? 'grid grid-cols-2 gap-4' 
                : 'grid grid-cols-2 md:grid-cols-4 gap-8'
            }`}
          >
            {[
              { icon: FiUsers, number: '10+', label: 'Team Members', gradient: 'from-purple-600 to-blue-600' },
              { icon: FiTrendingUp, number: '200+', label: 'Projects Completed', gradient: 'from-blue-600 to-green-600' },
              { icon: FiAward, number: '50+', label: 'Happy Clients', gradient: 'from-green-600 to-yellow-600' },
              { icon: FiGlobe, number: '5+', label: 'Years Experience', gradient: 'from-yellow-600 to-red-600' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                whileTap={isMobile ? { scale: 0.95 } : {}}
                className={`text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 ${
                  isMobile ? '' : 'p-6'
                }`}
              >
                <div className={`bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                  isMobile ? 'w-12 h-12' : 'w-16 h-16'
                }`}>
                  <stat.icon className={`text-white ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                </div>
                <div className={`font-bold text-white mb-1 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>{stat.number}</div>
                <div className={`text-gray-400 ${isMobile ? 'text-xs' : ''}`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile-First Team Section */}
      <section className={`${isMobile ? 'py-16' : 'py-20'} bg-gradient-to-b from-black to-gray-900/50`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 ${
              isMobile ? 'text-3xl' : 'text-4xl md:text-6xl'
            }`}>
              Meet The Team
            </h2>
            <p className={`text-gray-400 max-w-3xl mx-auto ${
              isMobile ? 'text-base px-4' : 'text-xl'
            }`}>
              Our diverse team of experts brings together years of experience in design, development, marketing, and strategy
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-6"
              />
              <p className="text-gray-400">Loading team members...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-20">
              <FiUsers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">No Team Members Found</h3>
              <p className="text-gray-400 mb-4">Team member profiles will appear here once added to WordPress</p>
            </div>
          ) : (
            <div className={`${
              isMobile 
                ? 'grid grid-cols-1 gap-4' 
                : 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
            }`}>
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={!isMobile ? { y: -10 } : {}}
                  whileTap={isMobile ? { scale: 0.98 } : {}}
                  className="group cursor-pointer"
                  onClick={() => isMobile && setSelectedTeamMember(member)}
                >
                  <div className={`bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 text-center h-full ${
                    isMobile ? 'p-4' : 'p-6'
                  }`}>
                    <div className={`relative mx-auto mb-4 rounded-full overflow-hidden ${
                      isMobile ? 'w-16 h-16' : 'w-24 h-24'
                    }`}>
                      <Image
                        src={getFeaturedImage(member)}
                        alt={getTeamMemberName(member)}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes={isMobile ? "64px" : "96px"}
                      />
                    </div>
                    <h3 className={`font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors ${
                      isMobile ? 'text-base' : 'text-xl'
                    }`}>
                      {getTeamMemberName(member)}
                    </h3>
                    <p className={`text-purple-400 font-semibold mb-3 ${
                      isMobile ? 'text-sm' : ''
                    }`}>
                      {getTeamMemberPosition(member)}
                    </p>
                    <p className={`text-gray-400 line-clamp-3 mb-4 ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}>
                      {getTeamMemberBio(member)}
                    </p>
                    
                    {/* Social Links */}
                    {member.social_links_array && Object.keys(member.social_links_array).length > 0 && (
                      <div className="flex justify-center gap-3">
                        {Object.entries(member.social_links_array).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300 ${
                              isMobile ? 'w-6 h-6' : 'w-8 h-8'
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <i className={`${getSocialIcon(platform)} text-white ${isMobile ? 'text-xs' : 'text-sm'}`}></i>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mobile Team Member Modal */}
      <AnimatePresence>
        {selectedTeamMember && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTeamMember(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 max-w-sm w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={getFeaturedImage(selectedTeamMember)}
                    alt={getTeamMemberName(selectedTeamMember)}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {getTeamMemberName(selectedTeamMember)}
                </h3>
                <p className="text-purple-400 font-semibold mb-4">
                  {getTeamMemberPosition(selectedTeamMember)}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {getTeamMemberBio(selectedTeamMember)}
                </p>
                
                {selectedTeamMember.social_links_array && Object.keys(selectedTeamMember.social_links_array).length > 0 && (
                  <div className="flex justify-center gap-3 mb-6">
                    {Object.entries(selectedTeamMember.social_links_array).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300"
                      >
                        <i className={`${getSocialIcon(platform)} text-white text-sm`}></i>
                      </a>
                    ))}
                  </div>
                )}
                
                <button
                  onClick={() => setSelectedTeamMember(null)}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile-First Values Section */}
      <section className={`${isMobile ? 'py-16' : 'py-20'} bg-gradient-to-b from-gray-900/50 to-black`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 ${
              isMobile ? 'text-3xl' : 'text-4xl md:text-6xl'
            }`}>
              Our Values
            </h2>
            <p className={`text-gray-400 max-w-3xl mx-auto ${
              isMobile ? 'text-base px-4' : 'text-xl'
            }`}>
              The principles that guide everything we do and drive our commitment to excellence
            </p>
          </motion.div>

          <div className={`${
            isMobile 
              ? 'space-y-4' 
              : 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
          }`}>
            {[
              {
                icon: FiTarget,
                title: 'Excellence',
                description: 'We strive for perfection in every project, delivering solutions that exceed expectations.',
                gradient: 'from-purple-600 to-blue-600'
              },
              {
                icon: FiHeart,
                title: 'Passion',
                description: 'We love what we do and it shows in the quality and creativity of our work.',
                gradient: 'from-blue-600 to-green-600'
              },
              {
                icon: FiShield,
                title: 'Integrity',
                description: 'We build trust through honest communication and reliable delivery on our promises.',
                gradient: 'from-green-600 to-yellow-600'
              },
              {
                icon: FiZap,
                title: 'Innovation',
                description: 'We embrace new technologies and creative approaches to solve complex challenges.',
                gradient: 'from-yellow-600 to-red-600'
              },
              {
                icon: FiUsers,
                title: 'Collaboration',
                description: 'We work closely with our clients as partners in their success journey.',
                gradient: 'from-red-600 to-pink-600'
              },
              {
                icon: FiTrendingUp,
                title: 'Growth',
                description: 'We are committed to continuous learning and helping our clients achieve sustainable growth.',
                gradient: 'from-pink-600 to-purple-600'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={!isMobile ? { y: -5, scale: 1.02 } : {}}
                whileTap={isMobile ? { scale: 0.98 } : {}}
                className={`bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 ${
                  isMobile ? 'p-4' : 'p-8'
                }`}
              >
                {isMobile ? (
                  // Mobile: Expandable Cards
                  <div>
                    <div 
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => setExpandedValue(expandedValue === index ? null : index)}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedValue === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FiChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedValue === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-400 leading-relaxed mt-4 text-sm">{value.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Desktop: Full Cards
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-4">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-First CTA Section */}
      <section className={`${isMobile ? 'py-16' : 'py-20'} bg-gradient-to-r from-purple-900/50 to-blue-900/50 relative overflow-hidden`}>
        <div className="absolute inset-0">
          {isMobile ? (
            <motion.div
              className="absolute inset-0 opacity-20"
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
          ) : (
            <>
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </>
          )}
        </div>

        <div className={`relative z-10 mx-auto px-4 md:px-6 text-center ${isMobile ? 'max-w-sm' : 'max-w-4xl'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
                  <FiHeart className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
                  Ready to Work Together?
                </h2>

                <p className="text-gray-300 mb-8 leading-relaxed px-4 text-base">
                  Let&apos;s create something amazing together. Get in touch and let&apos;s discuss how we can help transform your business.
                </p>
                
                <div className="space-y-4">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300"
                    >
                      <span>Start a Project</span>
                      <FiArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  
                  <Link href="/cases">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full hover:border-purple-500/50 transition-all duration-300"
                    >
                      View Our Work
                    </motion.button>
                  </Link>
                </div>
              </div>
            ) : (
              // Desktop CTA Layout
              <div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
                  Ready to Work Together?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Let&apos;s create something amazing together. Get in touch and let&apos;s discuss how we can help transform your business.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: '0 25px 50px rgba(139, 92, 246, 0.5)' 
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full flex items-center gap-2 hover:shadow-2xl transition-all duration-300"
                    >
                      Start a Project
                      <FiArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link href="/cases">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: 'rgba(255, 255, 255, 0.15)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full hover:border-purple-500/50 transition-all duration-300"
                    >
                      View Our Work
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