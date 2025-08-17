'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
 FiArrowRight, 
 FiFilter, 
 FiZap,
 FiTarget,
 FiClock,
 FiTrendingUp,
 FiDollarSign,
 FiSearch,
 FiGrid,
 FiList,
 FiBriefcase,
 FiShoppingCart,
 FiUsers,
 FiPackage,
 FiGlobe,
 FiLayers,
 FiCheckCircle,
 FiMaximize,
 FiMinimize,
 FiPieChart,
 FiSettings,
 FiShield,
 FiBookmark,
 FiShare2,
 FiInfo,
 FiMail,
 FiBarChart,
 FiTool,
 FiChevronDown,
 FiX
} from 'react-icons/fi';
import { getSolutions, getSolutionCategories, getTargetAudiences, cleanHtmlContent } from '@/lib/wordpress';
import React from 'react';

// Category icon mapping
const getCategoryIcon = (category: any) => {
 let categoryName = '';
 
 if (typeof category === 'string') {
 categoryName = category;
 } else if (category && typeof category === 'object' && category.name) {
 categoryName = category.name;
 } else if (category && typeof category === 'object' && category.slug) {
 categoryName = category.slug;
 } else {
 return FiTool;
 }
 
 const categoryLower = categoryName.toLowerCase();
 
 if (categoryLower.includes('business growth') || categoryLower.includes('business-growth')) return FiBriefcase;
 if (categoryLower.includes('lead management') || categoryLower.includes('lead-management')) return FiTarget;
 if (categoryLower.includes('customer experience') || categoryLower.includes('customer-experience')) return FiUsers;
 if (categoryLower.includes('e-commerce') || categoryLower.includes('ecommerce')) return FiShoppingCart;
 if (categoryLower.includes('operations') || categoryLower.includes('automation')) return FiSettings;
 if (categoryLower.includes('marketing') || categoryLower.includes('digital-marketing') || categoryLower.includes('marketing-sales')) return FiTrendingUp;
 if (categoryLower.includes('analytics') || categoryLower.includes('reporting')) return FiPieChart;
 if (categoryLower.includes('sales') || categoryLower.includes('lead-generation')) return FiBarChart;
 if (categoryLower.includes('communication') || categoryLower.includes('email')) return FiMail;
 if (categoryLower.includes('security') || categoryLower.includes('protection')) return FiShield;
 if (categoryLower.includes('performance') || categoryLower.includes('optimization')) return FiZap;
 if (categoryLower.includes('web') || categoryLower.includes('website')) return FiGlobe;
 
 return FiLayers;
};

// Audience icon mapping
const getAudienceIcon = (audience: any) => {
 let audienceName = '';
 
 if (typeof audience === 'string') {
 audienceName = audience;
 } else if (audience && typeof audience === 'object' && audience.name) {
 audienceName = audience.name;
 } else if (audience && typeof audience === 'object' && audience.slug) {
 audienceName = audience.slug;
 } else {
 return FiUsers;
 }
 
 const audienceLower = audienceName.toLowerCase();
 
 if (audienceLower.includes('startup') || audienceLower.includes('small-business')) return FiZap;
 if (audienceLower.includes('enterprise') || audienceLower.includes('enterprise-companies')) return FiShield;
 if (audienceLower.includes('ecommerce') || audienceLower.includes('e-commerce') || audienceLower.includes('ecommerce-stores')) return FiShoppingCart;
 if (audienceLower.includes('agencies') || audienceLower.includes('service-agencies')) return FiTarget;
 if (audienceLower.includes('saas') || audienceLower.includes('software') || audienceLower.includes('saas-companies')) return FiSettings;
 if (audienceLower.includes('marketers') || audienceLower.includes('marketing-teams')) return FiBarChart;
 if (audienceLower.includes('sales') || audienceLower.includes('sales-teams')) return FiTrendingUp;
 
 return FiUsers;
};

// Pricing range colors
const getPricingColor = (range: string) => {
 if (range === 'budget') return 'from-green-500 to-emerald-500';
 if (range === 'standard') return 'from-blue-500 to-cyan-500';
 if (range === 'premium') return 'from-purple-500 to-pink-500';
 return 'from-gray-500 to-gray-600';
};

export default function SolutionsPage() {
 const [solutions, setSolutions] = useState<any[]>([]);
 const [filteredSolutions, setFilteredSolutions] = useState<any[]>([]);
 const [categories, setCategories] = useState<any[]>([]);
 const [audiences, setAudiences] = useState<any[]>([]);
 const [activeCategory, setActiveCategory] = useState('all');
 const [activeAudience, setActiveAudience] = useState('all');
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState('');
 const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
 const [showFilters, setShowFilters] = useState(false);
 const [isMobile, setIsMobile] = useState(false);
 const [showAllCategories, setShowAllCategories] = useState(false);
 const [showAllAudiences, setShowAllAudiences] = useState(false);

 // Create category and audience lookup maps
 const [categoryMap, setCategoryMap] = useState<{[key: number]: any}>({});
 const [audienceMap, setAudienceMap] = useState<{[key: number]: any}>({});

 // Mobile detection
 useEffect(() => {
 const checkMobile = () => {
 setIsMobile(window.innerWidth < 768);
 };
 checkMobile();
 window.addEventListener('resize', checkMobile);
 return () => window.removeEventListener('resize', checkMobile);
 }, []);

 // Fetch solutions and related data
 useEffect(() => {
 async function fetchData() {
 try {
 setLoading(true);
 
 const [solutionsData, categoriesData, audiencesData] = await Promise.all([
 getSolutions(),
 getSolutionCategories(),
 getTargetAudiences()
 ]);

 // Create lookup maps
 const catMap: {[key: number]: any} = {};
 const audMap: {[key: number]: any} = {};
 
 categoriesData.forEach((cat: any) => {
 catMap[cat.id] = cat;
 });
 
 audiencesData.forEach((aud: any) => {
 audMap[aud.id] = aud;
 });

 setCategoryMap(catMap);
 setAudienceMap(audMap);
 setCategories(categoriesData);
 setAudiences(audiencesData);
 setSolutions(solutionsData);
 setFilteredSolutions(solutionsData);
 
 console.log('✅ Data loaded:', {
 solutions: solutionsData.length,
 categories: categoriesData.length,
 audiences: audiencesData.length,
 sampleSolution: solutionsData[0] // Debug: see the structure
 });
 } catch (error) {
 console.error('Error fetching data:', error);
 } finally {
 setLoading(false);
 }
 }
 
 fetchData();
 }, []);

 // Get unique categories and audiences from solutions - Updated for transformed data
 const getUniqueCategories = () => {
 const categorySet = new Set<string>();
 
 solutions.forEach(solution => {
 // Use the transformed categories array
 if (solution.categories && Array.isArray(solution.categories)) {
 solution.categories.forEach((catId: number) => {
 const category = categoryMap[catId];
 if (category && category.name) {
 categorySet.add(category.name);
 }
 });
 }
 });
 
 return Array.from(categorySet);
 };

 const getUniqueAudiences = () => {
 const audienceSet = new Set<string>();
 
 solutions.forEach(solution => {
 // Use the transformed audiences array
 if (solution.audiences && Array.isArray(solution.audiences)) {
 solution.audiences.forEach((audId: number) => {
 const audience = audienceMap[audId];
 if (audience && audience.name) {
 audienceSet.add(audience.name);
 }
 });
 }
 });
 
 return Array.from(audienceSet);
 };

 // Filter solutions - Updated for transformed data
 useEffect(() => {
 let filtered = solutions;
 
 // Filter by category
 if (activeCategory !== 'all') {
 filtered = filtered.filter(solution => {
 if (!solution.categories || !Array.isArray(solution.categories)) return false;
 
 return solution.categories.some((catId: number) => {
 const category = categoryMap[catId];
 return category && category.name === activeCategory;
 });
 });
 }
 
 // Filter by audience
 if (activeAudience !== 'all') {
 filtered = filtered.filter(solution => {
 if (!solution.audiences || !Array.isArray(solution.audiences)) return false;
 
 return solution.audiences.some((audId: number) => {
 const audience = audienceMap[audId];
 return audience && audience.name === activeAudience;
 });
 });
 }
 
 // Filter by search - Updated for transformed data
 if (searchTerm) {
 filtered = filtered.filter(solution => 
 solution.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
 solution.painPoint?.toLowerCase().includes(searchTerm.toLowerCase()) ||
 solution.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
 solution.problemDescription?.toLowerCase().includes(searchTerm.toLowerCase())
 );
 }
 
 setFilteredSolutions(filtered);
 }, [solutions, activeCategory, activeAudience, searchTerm, categoryMap, audienceMap]);

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
 Loading solutions...
 </motion.p>
 </div>
 </div>
 );
 }

 const uniqueCategories = getUniqueCategories();
 const uniqueAudiences = getUniqueAudiences();

 return (
 <div className="min-h-screen bg-black overflow-hidden">
 {/* Hero Section */}
 <section className={`relative ${isMobile ? 'min-h-screen' : 'min-h-screen'} flex items-center justify-center overflow-hidden`}>
 {/* Animated Background */}
 <div className="absolute inset-0">
 {isMobile ? (
 <>
 <motion.div
 className="absolute inset-0 opacity-30"
 style={{
 background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.4), rgba(236, 72, 153, 0.4))',
 backgroundSize: '400% 400%'
 }}
 animate={{
 backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
 }}
 transition={{
 duration: 10,
 repeat: Infinity,
 ease: 'linear'
 }}
 />
 <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-20 left-0 w-[250px] h-[250px] bg-gradient-to-tr from-blue-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
 </>
 ) : (
 <>
 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
 </>
 )}
 
 {/* Floating Icons */}
 <div className="absolute inset-0 overflow-hidden">
 {[FiTarget, FiZap, FiTrendingUp, FiShield, FiPieChart, FiSettings].map((Icon, i) => (
 <motion.div
 key={i}
 className="absolute"
 style={{
 left: `${Math.random() * 100}%`,
 top: `${Math.random() * 100}%`,
 }}
 animate={{
 y: [0, -30, 0],
 rotate: [0, 360],
 opacity: [0.1, 0.3, 0.1],
 }}
 transition={{
 duration: 10 + Math.random() * 10,
 repeat: Infinity,
 delay: Math.random() * 5,
 }}
 >
 <Icon className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-purple-500/20`} />
 </motion.div>
 ))}
 </div>
 </div>

 <div className={`relative z-10 max-w-7xl mx-auto px-4 md:px-6 ${isMobile ? 'pt-24' : 'pt-32'} text-center`}>
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 className={`${isMobile ? 'mb-6' : 'mb-8'}`}
 >
 <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
 <motion.div 
 animate={{ rotate: 360 }}
 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
 className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
 />
 <span className={`px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full text-purple-300 border border-purple-500/30 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
 Digital Solutions Hub
 </span>
 </div>
 
 <h1 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight mb-4 md:mb-6 ${isMobile ? 'text-4xl' : 'text-6xl md:text-8xl'}`}>
 Solutions
 </h1>
 
 <p className={`text-gray-300 max-w-3xl mx-auto leading-relaxed ${isMobile ? 'text-base px-4' : 'text-xl'}`}>
 {isMobile 
 ? 'Transform your business challenges into growth opportunities'
 : 'Discover tailored digital solutions that transform your business challenges into growth opportunities and competitive advantages'
 }
 </p>
 </motion.div>

 {/* Search and Filters - Mobile */}
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
 placeholder="Search solutions..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
 />
 </div>

 {/* Filter Toggle */}
 <motion.button
 onClick={() => setShowFilters(!showFilters)}
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full px-6 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300"
 >
 <FiFilter className="w-5 h-5" />
 <span>Filter Solutions</span>
 <motion.div
 animate={{ rotate: showFilters ? 180 : 0 }}
 transition={{ duration: 0.3 }}
 >
 <FiArrowRight className="w-5 h-5 rotate-90" />
 </motion.div>
 </motion.button>

 {/* Collapsible Filters */}
 <AnimatePresence>
 {showFilters && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 transition={{ duration: 0.3 }}
 className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 space-y-4"
 >
 {/* Category Filter */}
 <div>
 <h4 className="text-white font-semibold mb-2 text-sm">Category ({uniqueCategories.length})</h4>
 <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
 <button
 onClick={() => setActiveCategory('all')}
 className={`w-full px-3 py-2 rounded-xl text-sm transition-all ${
 activeCategory === 'all'
 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
 : 'bg-white/5 text-gray-400 hover:text-white'
 }`}
 >
 All Categories
 </button>
 {uniqueCategories.map(category => (
 <button
 key={category}
 onClick={() => setActiveCategory(category)}
 className={`w-full px-3 py-2 rounded-xl text-sm transition-all text-left ${
 activeCategory === category
 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
 : 'bg-white/5 text-gray-400 hover:text-white'
 }`}
 >
 {category}
 </button>
 ))}
 </div>
 </div>

 {/* Audience Filter */}
 <div>
 <h4 className="text-white font-semibold mb-2 text-sm">Target Audience ({uniqueAudiences.length})</h4>
 <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
 <button
 onClick={() => setActiveAudience('all')}
 className={`w-full px-3 py-2 rounded-xl text-sm transition-all ${
 activeAudience === 'all'
 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
 : 'bg-white/5 text-gray-400 hover:text-white'
 }`}
 >
 All Audiences
 </button>
 {uniqueAudiences.map(audience => (
 <button
 key={audience}
 onClick={() => setActiveAudience(audience)}
 className={`w-full px-3 py-2 rounded-xl text-sm transition-all text-left ${
 activeAudience === audience
 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
 : 'bg-white/5 text-gray-400 hover:text-white'
 }`}
 >
 {audience}
 </button>
 ))}
 </div>
 </div>
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
 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
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
 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
 : 'text-gray-400 hover:text-white'
 }`}
 >
 <FiList className="w-5 h-5" />
 </motion.button>
 </div>
 </motion.div>
 ) : (
 // Desktop Filters
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.3 }}
 className="max-w-6xl mx-auto mb-16 space-y-8"
 >
 {/* Search and View Mode */}
 <div className="flex items-center justify-between gap-8">
 <div className="relative flex-1 max-w-md">
 <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
 <input
 type="text"
 placeholder="Search solutions..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
 />
 </div>

 <div className="flex items-center gap-2 p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
 <motion.button
 onClick={() => setViewMode('grid')}
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className={`p-2 rounded-lg transition-all duration-300 ${
 viewMode === 'grid' 
 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
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
 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
 : 'text-gray-400 hover:text-white'
 }`}
 >
 <FiList className="w-4 h-4" />
 </motion.button>
 </div>
 </div>

 {/* Filter Tabs */}
 <div className="space-y-6">
 {/* Category Filter */}
 <div className="relative">
 <div className="flex items-center gap-3 mb-4">
 <span className="text-gray-400 text-sm font-medium">Category ({uniqueCategories.length}):</span>
 <div className="h-px bg-gradient-to-r from-purple-500/50 to-transparent flex-1"></div>
 </div>
 <div className="flex flex-wrap gap-3">
 <button
 onClick={() => setActiveCategory('all')}
 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
 activeCategory === 'all'
 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
 : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
 }`}
 >
 All Categories
 </button>
 {uniqueCategories.map((category, index) => {
 const Icon = getCategoryIcon(category);
 return (
 <motion.button
 key={category}
 onClick={() => setActiveCategory(category)}
 whileHover={{ scale: 1.05, y: -2 }}
 whileTap={{ scale: 0.95 }}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: index * 0.05 }}
 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
 activeCategory === category
 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
 : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 hover:border-purple-500/30'
 }`}
 >
 <Icon className="w-3 h-3" />
 <span className="truncate max-w-32">{category}</span>
 </motion.button>
 );
 })}
 </div>
 </div>

 {/* Audience Filter */}
 <div className="relative">
 <div className="flex items-center gap-3 mb-4">
 <span className="text-gray-400 text-sm font-medium">Target Audience ({uniqueAudiences.length}):</span>
 <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent flex-1"></div>
 </div>
 
 <div className="relative">
 <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 transition-all duration-500 overflow-hidden ${
 showAllAudiences ? 'max-h-none' : 'max-h-32'
 }`}>
 <button
 onClick={() => setActiveAudience('all')}
 className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
 activeAudience === 'all'
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
 : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
 }`}
 >
 All Audiences
 </button>
 {uniqueAudiences.map((audience, index) => {
 const AudienceIcon = getAudienceIcon(audience);
 return (
 <motion.button
 key={audience}
 onClick={() => setActiveAudience(audience)}
 whileHover={{ scale: 1.02, y: -1 }}
 whileTap={{ scale: 0.98 }}
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.3, delay: index * 0.02 }}
 className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
 activeAudience === audience
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
 : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 hover:border-blue-500/30'
 }`}
 title={audience}
 >
 <AudienceIcon className="w-3 h-3 flex-shrink-0" />
 <span className="truncate">{audience}</span>
 </motion.button>
 );
 })}
 </div>
 
 {/* Show More/Less Button */}
 {uniqueAudiences.length > 10 && (
 <motion.button
 onClick={() => setShowAllAudiences(!showAllAudiences)}
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="absolute bottom-0 right-0 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-lg text-blue-300 text-xs font-medium hover:bg-blue-600/30 transition-all duration-300 flex items-center gap-2"
 >
 <span>{showAllAudiences ? 'Show Less' : `Show All ${uniqueAudiences.length}`}</span>
 <motion.div
 animate={{ rotate: showAllAudiences ? 180 : 0 }}
 transition={{ duration: 0.3 }}
 >
 <FiChevronDown className="w-3 h-3" />
 </motion.div>
 </motion.button>
 )}
 
 {!showAllAudiences && uniqueAudiences.length > 10 && (
 <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
 )}
 </div>
 </div>
 </div>
 </motion.div>
 )}

 {/* Quick Stats */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.5 }}
 className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto ${isMobile ? 'mb-8' : ''}`}
 >
 <div className="text-center">
 <div className={`font-bold text-white mb-2 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>{solutions.length}+</div>
 <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Solutions</div>
 </div>
 <div className="text-center">
 <div className={`font-bold text-white mb-2 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>{uniqueCategories.length}</div>
 <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Categories</div>
 </div>
 <div className="text-center">
 <div className={`font-bold text-white mb-2 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>48hr</div>
 <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Avg Setup</div>
 </div>
 <div className="text-center">
 <div className={`font-bold text-white mb-2 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>5★</div>
 <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Rating</div>
 </div>
 </motion.div>
 </div>

 {/* Scroll Indicator */}
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

 {/* Solutions Grid */}
 <section className={`${isMobile ? 'py-16' : 'py-32'} bg-gradient-to-b from-gray-900/50 to-black relative`}>
 <div className="absolute inset-0">
 <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
 <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
 </div>

 <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
 {/* Results Header */}
 <div className="flex items-center justify-between mb-8">
 <h3 className={`font-semibold text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>
 {filteredSolutions.length} {filteredSolutions.length === 1 ? 'Solution' : 'Solutions'} Found
 {(activeCategory !== 'all' || activeAudience !== 'all') && ' (Filtered)'}
 </h3>
 </div>

 {filteredSolutions.length === 0 ? (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="text-center py-20"
 >
 <FiFilter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
 <h3 className={`font-semibold text-white mb-2 ${isMobile ? 'text-xl' : 'text-2xl'}`}>No Solutions Found</h3>
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
 {filteredSolutions.map((solution, index) => {
 // Get category and audience names for display - Updated for transformed data
 const solutionCategories = solution.categories?.map((catId: number) => categoryMap[catId]).filter(Boolean) || [];
 const solutionAudiences = solution.audiences?.map((audId: number) => audienceMap[audId]).filter(Boolean) || [];
 const primaryCategory = solutionCategories[0];
 const CategoryIcon = getCategoryIcon(primaryCategory);
 const pricingColor = getPricingColor(solution.pricingRange);
 
 return (
 <motion.div
 key={solution.id}
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
 <Link href={`/solutions/${solution.slug}`}>
 <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full ${
 viewMode === 'list' && !isMobile ? 'flex items-center' : ''
 }`}>
 {/* Solution Header */}
 <div className={`${
 viewMode === 'list' && !isMobile ? 'flex-1' : ''
 }`}>
 <div className={`p-6 ${viewMode === 'list' && !isMobile ? '' : 'border-b border-white/10'}`}>
 <div className="flex items-start justify-between mb-4">
 <div className="flex-1">
 <div className="flex items-center gap-3 mb-2">
 <CategoryIcon className="w-6 h-6 text-purple-400" />
 {/* Show title field as requested - Updated for transformed data */}
 <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
 {solution.title || 'Untitled Solution'}
 </h3>
 </div>
 <p className="text-gray-400 text-sm">
 {solution.painPointSubtitle || solution.excerpt || 'No description available'}
 </p>
 </div>
 
 {/* Mobile Action Icons */}
 {isMobile && (
 <div className="flex gap-2">
 <motion.button
 whileTap={{ scale: 0.9 }}
 className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
 onClick={(e) => {
 e.preventDefault();
 }}
 >
 <FiBookmark className="w-4 h-4 text-white/80" />
 </motion.button>
 <motion.button
 whileTap={{ scale: 0.9 }}
 className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
 onClick={(e) => {
 e.preventDefault();
 }}
 >
 <FiShare2 className="w-4 h-4 text-white/80" />
 </motion.button>
 </div>
 )}
 </div>

 {/* ROI Metrics */}
 <div className="grid grid-cols-3 gap-3">
 <div className="text-center p-3 bg-white/5 rounded-xl">
 <FiClock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
 <div className="text-xs text-gray-400">Time Saved</div>
 <div className="text-sm font-bold text-white">{solution.timeSaved || '10hrs/week'}</div>
 </div>
 <div className="text-center p-3 bg-white/5 rounded-xl">
 <FiTrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
 <div className="text-xs text-gray-400">Revenue</div>
 <div className="text-sm font-bold text-white">
 {solution.revenueIncrease ? 
 (solution.revenueIncrease.includes('%') ? solution.revenueIncrease : `+${solution.revenueIncrease}`) 
 : '+25%'
 }
 </div>
 </div>
 <div className="text-center p-3 bg-white/5 rounded-xl">
 <FiDollarSign className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
 <div className="text-xs text-gray-400">Cost Cut</div>
 <div className="text-sm font-bold text-white">{solution.costReduction || '30%'}</div>
 </div>
 </div>
 </div>

 {/* Solution Details */}
 <div className="p-6 pt-0">
 <p className="text-gray-300 mb-4 line-clamp-3">
 {solution.problemDescription || solution.excerpt || 'No description available'}
 </p>

 {/* Target Audiences */}
 {solutionAudiences.length > 0 && (
 <div className="flex flex-wrap gap-2 mb-4">
 {solutionAudiences.slice(0, 2).map((audience: any, i: number) => {
 const AudienceIcon = getAudienceIcon(audience);
 return (
 <span
 key={i}
 className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 text-xs flex items-center gap-1"
 >
 <AudienceIcon className="w-3 h-3" />
 {audience.name || audience}
 </span>
 );
 })}
 {solutionAudiences.length > 2 && (
 <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-lg border border-gray-500/30 text-xs">
 +{solutionAudiences.length - 2}
 </span>
 )}
 </div>
 )}

 {/* Pricing & Timeline */}
 <div className="flex items-center justify-between mb-4">
 <span className={`px-3 py-1 bg-gradient-to-r ${pricingColor} bg-opacity-20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20`}>
 {solution.pricingRange || 'Standard'} Pricing
 </span>
 <span className="text-xs text-gray-400 flex items-center gap-1">
 <FiClock className="w-3 h-3" />
 {solution.implementationTime || '2-3 days'}
 </span>
 </div>

 {/* CTA Button */}
 <motion.div
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full"
 >
 <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 group-hover:shadow-lg transition-all duration-300">
 <span>{solution.ctaText || 'Explore Solution'}</span>
 <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </button>
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

 {/* CTA Section - Same as before */}
 <section className={`${isMobile ? 'py-16' : 'py-32'} bg-gradient-to-r from-purple-900/50 via-black to-pink-900/50 relative overflow-hidden`}>
 <div className="absolute inset-0">
 <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
 
 {isMobile && (
 <motion.div
 className="absolute inset-0 opacity-20"
 style={{
 background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3))',
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
 <div className="space-y-6">
 <motion.div
 initial={{ scale: 0 }}
 whileInView={{ scale: 1 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
 >
 <FiZap className="w-8 h-8 text-white" />
 </motion.div>

 <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
 Can't Find Your Solution?
 </h2>

 <p className="text-gray-300 mb-8 leading-relaxed px-4">
 Let's create a custom solution tailored to your unique business challenges.
 </p>
 
 <div className="space-y-4">
 <Link href="/contact">
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full max-w-sm mx-auto block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 text-lg"
 >
 <span>Get Custom Solution</span>
 <FiArrowRight className="w-5 h-5" />
 </motion.button>
 </Link>
 
 <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
 <Link href="/tools">
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-sm"
 >
 Browse Tools
 </motion.button>
 </Link>
 
 <Link href="/services">
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-sm"
 >
 Our Services
 </motion.button>
 </Link>
 </div>
 </div>
 </div>
 ) : (
 <div>
 <motion.div
 initial={{ scale: 0 }}
 whileInView={{ scale: 1 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8"
 >
 <FiPackage className="w-10 h-10 text-white" />
 </motion.div>

 <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-8">
 Need a Custom Solution?
 </h2>
 <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
 Every business is unique. Let's discuss your specific challenges and create a tailored solution that delivers real results.
 </p>
 
 <div className="flex flex-wrap gap-6 justify-center">
 <Link href="/contact">
 <motion.button
 whileHover={{ 
 scale: 1.05, 
 boxShadow: '0 25px 50px rgba(168, 85, 247, 0.6)',
 background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)'
 }}
 whileTap={{ scale: 0.95 }}
 className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full flex items-center gap-3 hover:shadow-2xl transition-all duration-300 text-lg relative overflow-hidden"
 >
 <span className="relative z-10">Get Custom Solution</span>
 <motion.div
 whileHover={{ x: 5 }}
 transition={{ duration: 0.2 }}
 >
 <FiArrowRight className="w-6 h-6" />
 </motion.div>
 </motion.button>
 </Link>
 
 <Link href="/tools">
 <motion.button
 whileHover={{ 
 scale: 1.05,
 backgroundColor: 'rgba(255, 255, 255, 0.15)',
 borderColor: 'rgba(168, 85, 247, 0.5)'
 }}
 whileTap={{ scale: 0.95 }}
 className="px-10 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-full hover:border-purple-500/50 transition-all duration-300 text-lg"
 >
 Explore Our Tools
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
 className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl"
 >
 <FiInfo className="w-6 h-6 text-white" />
 </motion.button>
 </Link>
 </motion.div>
 )}

 {/* Custom Scrollbar Styles */}
 <style jsx global>{`
 .custom-scrollbar::-webkit-scrollbar {
 width: 4px;
 }
 .custom-scrollbar::-webkit-scrollbar-track {
 background: rgba(255, 255, 255, 0.1);
 border-radius: 2px;
 }
 .custom-scrollbar::-webkit-scrollbar-thumb {
 background: linear-gradient(to bottom, #a855f7, #ec4899);
 border-radius: 2px;
 }
 .custom-scrollbar::-webkit-scrollbar-thumb:hover {
 background: linear-gradient(to bottom, #9333ea, #db2777);
 }
 `}</style>
 </div>
 );
}