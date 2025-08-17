'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
 FiArrowRight, 
 FiFilter, 
 FiZap,
 FiCpu,
 FiClock,
 FiDollarSign,
 FiSearch,
 FiGrid,
 FiList,
 FiTool,
 FiPackage,
 FiPlay,
 FiExternalLink,
 FiCheck,
 FiX,
 FiChevronDown,
 FiShield,
 FiBarChart,
 FiMail,
 FiUsers,
 FiTrendingUp,
 FiGlobe,
 FiDatabase,
 FiCode,
 FiLayers,
 FiBookmark,
 FiShare2,
 FiEye,
 FiTarget,
 FiSettings,
 FiShoppingCart,
 FiBriefcase,
 FiUserCheck,
 FiActivity,
 FiPieChart
} from 'react-icons/fi';
import { getTools, getToolCategories, getTargetAudiences, cleanHtmlContent } from '@/lib/wordpress';

// Tool type icon mapping
const getToolTypeIcon = (type: string) => {
 const typeLower = type?.toLowerCase() || '';
 
 if (typeLower.includes('automation')) return FiCpu;
 if (typeLower.includes('dashboard')) return FiBarChart;
 if (typeLower.includes('ai')) return FiZap;
 if (typeLower.includes('widget')) return FiCode;
 if (typeLower.includes('integration')) return FiLayers;
 if (typeLower.includes('template')) return FiPackage;
 if (typeLower.includes('analytics')) return FiActivity;
 if (typeLower.includes('lead')) return FiTarget;
 if (typeLower.includes('email')) return FiMail;
 
 return FiTool;
};

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
 
 if (categoryLower.includes('lead-generation') || categoryLower.includes('lead generation')) return FiTarget;
 if (categoryLower.includes('operations-automation') || categoryLower.includes('automation')) return FiSettings;
 if (categoryLower.includes('marketing') || categoryLower.includes('email')) return FiMail;
 if (categoryLower.includes('analytics') || categoryLower.includes('reporting')) return FiBarChart;
 if (categoryLower.includes('sales') || categoryLower.includes('crm')) return FiBriefcase;
 if (categoryLower.includes('ecommerce') || categoryLower.includes('e-commerce')) return FiShoppingCart;
 if (categoryLower.includes('dashboard')) return FiActivity;
 if (categoryLower.includes('integration')) return FiLayers;
 if (categoryLower.includes('ai') || categoryLower.includes('artificial')) return FiZap;
 
 return FiTool;
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
 if (audienceLower.includes('enterprise')) return FiShield;
 if (audienceLower.includes('ecommerce') || audienceLower.includes('e-commerce')) return FiShoppingCart;
 if (audienceLower.includes('agencies') || audienceLower.includes('service-agencies')) return FiTarget;
 if (audienceLower.includes('digital-marketers') || audienceLower.includes('marketing')) return FiBarChart;
 if (audienceLower.includes('sales-teams') || audienceLower.includes('sales')) return FiTrendingUp;
 if (audienceLower.includes('freelancers')) return FiBriefcase;
 
 return FiUsers;
};

// Pricing model colors
const getPricingModelColor = (model: string) => {
 if (model === 'monthly') return 'from-blue-500 to-cyan-500';
 if (model === 'one_time') return 'from-green-500 to-emerald-500';
 if (model === 'freemium') return 'from-purple-500 to-pink-500';
 return 'from-gray-500 to-gray-600';
};

// Parse tool features from the formatted string
const parseToolFeatures = (featuresString: string | null | undefined): Array<{icon: string, title: string, description: string}> => {
 if (!featuresString || typeof featuresString !== 'string') return [];
 
 const lines = featuresString.split('\n').filter(Boolean);
 return lines.map(line => {
 const parts = line.split(' | ');
 if (parts.length >= 3) {
 return {
 icon: parts[0].trim(),
 title: parts[1].trim(),
 description: parts[2].trim()
 };
 }
 return {
 icon: 'fas fa-check',
 title: line.trim(),
 description: ''
 };
 });
};

// Generate random ROI and user numbers for demo
const generateRandomMetrics = (toolId: number) => {
 const seed = toolId * 12345;
 const random1 = (seed % 400) + 200;
 const random2 = ((seed * 2) % 50) + 10;
 
 return {
 roi: `${random1}%`,
 users: random2 > 30 ? `${Math.floor(random2)}k+` : `${random2 * 100}+`
 };
};

// Get unique tool types from tools data
const getUniqueToolTypes = (tools: any[]) => {
 const types = new Set<string>();
 tools.forEach(tool => {
 if (tool.toolType) {
 types.add(tool.toolType);
 }
 });
 return Array.from(types);
};

export default function ToolsPage() {
 const [tools, setTools] = useState<any[]>([]);
 const [filteredTools, setFilteredTools] = useState<any[]>([]);
 const [categories, setCategories] = useState<any[]>([]);
 const [audiences, setAudiences] = useState<any[]>([]);
 const [activeCategory, setActiveCategory] = useState('all');
 const [activeType, setActiveType] = useState('all');
 const [activeAudience, setActiveAudience] = useState('all');
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState('');
 const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
 const [showFilters, setShowFilters] = useState(false);
 const [isMobile, setIsMobile] = useState(false);
 const [selectedTool, setSelectedTool] = useState<any>(null);
 const [showAllAudiences, setShowAllAudiences] = useState(false);

 // Create lookup maps
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

 // Fetch tools and related data
 useEffect(() => {
 async function fetchData() {
 try {
 setLoading(true);
 
 const [toolsData, categoriesData, audiencesData] = await Promise.all([
 getTools(),
 getToolCategories(),
 getTargetAudiences()
 ]);

 // Transform tools data to match expected structure
 const transformedTools = toolsData.map((tool: any) => ({
 ...tool,
 title: tool.title?.rendered || tool.title,
 excerpt: tool.excerpt?.rendered || tool.excerpt,
 content: tool.content?.rendered || tool.content,
 tagline: tool.tool_tagline || tool.tagline,
 toolType: tool.tool_type || tool.toolType,
 keyFeatures: tool.tool_features || tool.keyFeatures,
 demoUrl: tool.demo_link || tool.demoUrl,
 featuredImage: tool.featured_image_url || tool.featuredMedia || tool.featuredImage,
 pricingModel: tool.pricing_model || tool.pricingModel,
 price: tool.base_price || tool.price,
 setupTime: tool.setup_time || tool.setupTime,
 technologyStack: (() => {
 if (!tool.technology_stack) return [];
 if (Array.isArray(tool.technology_stack)) return tool.technology_stack;
 if (typeof tool.technology_stack === 'string') {
 return tool.technology_stack.split(/[,;|]/).map((t: string) => t.trim()).filter(Boolean);
 }
 return [];
})(),
 categories: tool.tool_category || tool.categories || [],
 audiences: tool.target_audience || tool.audiences || []
 }));

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
 setTools(transformedTools);
 setFilteredTools(transformedTools);
 
 console.log('✅ Tools data loaded:', {
 tools: transformedTools.length,
 categories: categoriesData.length,
 audiences: audiencesData.length,
 sampleTool: transformedTools[0]
 });
 } catch (error) {
 console.error('Error fetching tools data:', error);
 } finally {
 setLoading(false);
 }
 }
 
 fetchData();
 }, []);

 // Get unique categories, types, and audiences from tools
 const getUniqueCategories = () => {
 const categorySet = new Set<string>();
 
 tools.forEach(tool => {
 if (tool.categories && Array.isArray(tool.categories)) {
 tool.categories.forEach((catId: number) => {
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
 
 tools.forEach(tool => {
 if (tool.audiences && Array.isArray(tool.audiences)) {
 tool.audiences.forEach((audId: number) => {
 const audience = audienceMap[audId];
 if (audience && audience.name) {
 audienceSet.add(audience.name);
 }
 });
 }
 });
 
 return Array.from(audienceSet);
 };

 // Filter tools
 useEffect(() => {
 let filtered = tools;
 
 // Filter by category
 if (activeCategory !== 'all') {
 filtered = filtered.filter(tool => {
 if (!tool.categories || !Array.isArray(tool.categories)) return false;
 
 return tool.categories.some((catId: number) => {
 const category = categoryMap[catId];
 return category && category.name === activeCategory;
 });
 });
 }
 
 // Filter by type
 if (activeType !== 'all') {
 filtered = filtered.filter(tool => 
 tool.toolType === activeType
 );
 }
 
 // Filter by audience
 if (activeAudience !== 'all') {
 filtered = filtered.filter(tool => {
 if (!tool.audiences || !Array.isArray(tool.audiences)) return false;
 
 return tool.audiences.some((audId: number) => {
 const audience = audienceMap[audId];
 return audience && audience.name === activeAudience;
 });
 });
 }
 
 // Filter by search
 if (searchTerm) {
 filtered = filtered.filter(tool => 
 tool.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
 tool.tagline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
 tool.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
 );
 }
 
 setFilteredTools(filtered);
 }, [tools, activeCategory, activeType, activeAudience, searchTerm, categoryMap, audienceMap]);

 if (loading) {
 return (
 <div className="min-h-screen bg-black flex items-center justify-center">
 <div className="text-center">
 <motion.div
 animate={{ rotate: 360 }}
 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
 className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-6"
 />
 <motion.p
 animate={{ opacity: [0.5, 1, 0.5] }}
 transition={{ duration: 2, repeat: Infinity }}
 className="text-gray-400 text-lg"
 >
 Loading tools...
 </motion.p>
 </div>
 </div>
 );
 }

 const uniqueCategories = getUniqueCategories();
 const uniqueTypes = getUniqueToolTypes(tools);
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
 background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(16, 185, 129, 0.4), rgba(59, 130, 246, 0.4))',
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
 <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-600/40 to-cyan-600/40 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-20 right-0 w-[250px] h-[250px] bg-gradient-to-tr from-green-600/30 to-emerald-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
 </>
 ) : (
 <>
 <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-600/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-teal-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
 </>
 )}
 
 {/* Floating Tool Icons */}
 <div className="absolute inset-0 overflow-hidden">
 {[FiTool, FiCpu, FiDatabase, FiCode, FiLayers, FiZap].map((Icon, i) => (
 <motion.div
 key={i}
 className="absolute"
 style={{
 left: `${Math.random() * 100}%`,
 top: `${Math.random() * 100}%`,
 }}
 animate={{
 y: [0, -30, 0],
 rotate: [0, -180, -360],
 opacity: [0.1, 0.3, 0.1],
 }}
 transition={{
 duration: 15 + Math.random() * 10,
 repeat: Infinity,
 delay: Math.random() * 5,
 }}
 >
 <Icon className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-blue-500/20`} />
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
 animate={{ rotate: -360 }}
 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
 className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
 />
 <span className={`px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full text-blue-300 border border-blue-500/30 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
 Automation Arsenal
 </span>
 </div>
 
 <h1 className={`font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent leading-tight mb-4 md:mb-6 ${isMobile ? 'text-4xl' : 'text-6xl md:text-8xl'}`}>
 Tools
 </h1>
 
 <p className={`text-gray-300 max-w-3xl mx-auto leading-relaxed ${isMobile ? 'text-base px-4' : 'text-xl'}`}>
 {isMobile 
 ? 'Powerful automation tools to supercharge your business'
 : 'Discover our arsenal of powerful automation tools designed to streamline your operations and accelerate growth'
 }
 </p>
 </motion.div>

 {/* Search and Filters */}
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
 placeholder="Search tools..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all duration-300"
 />
 </div>

 {/* Filter Toggle */}
 <motion.button
 onClick={() => setShowFilters(!showFilters)}
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full px-6 py-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300"
 >
 <FiFilter className="w-5 h-5" />
 <span>Filter Tools</span>
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
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
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
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
 : 'bg-white/5 text-gray-400 hover:text-white'
 }`}
 >
 {category}
 </button>
 ))}
 </div>
 </div>

 {/* Tool Type Filter */}
 <div>
 <h4 className="text-white font-semibold mb-2 text-sm">Tool Type ({uniqueTypes.length})</h4>
 <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
 <button
 onClick={() => setActiveType('all')}
 className={`w-full px-3 py-2 rounded-xl text-sm transition-all ${
 activeType === 'all'
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
 : 'bg-white/5 text-gray-400 hover:text-white'
 }`}
 >
 All Types
 </button>
 {uniqueTypes.map(type => (
 <button
 key={type}
 onClick={() => setActiveType(type)}
 className={`w-full px-3 py-2 rounded-xl text-sm transition-all text-left ${
 activeType === type
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
 : 'bg-white/5 text-gray-400 hover:text-white'
 }`}
 >
 {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
 </button>
 ))}
 </div>
 </div>

 {/* Audience Filter */}
 <div>
 <h4 className="text-white font-semibold mb-2 text-sm">Target Audience ({uniqueAudiences.length})</h4>
 <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
 <button
 onClick={() => setActiveAudience('all')}
 className={`w-full px-3 py-2 rounded-xl text-sm transition-all ${
 activeAudience === 'all'
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
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
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
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
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
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
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
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
 placeholder="Search tools..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all duration-300"
 />
 </div>

 <div className="flex items-center gap-2 p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
 <motion.button
 onClick={() => setViewMode('grid')}
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className={`p-2 rounded-lg transition-all duration-300 ${
 viewMode === 'grid' 
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
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
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
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
 <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent flex-1"></div>
 </div>
 <div className="flex flex-wrap gap-3">
 <button
 onClick={() => setActiveCategory('all')}
 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
 activeCategory === 'all'
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
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
 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
 : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 hover:border-blue-500/30'
 }`}
 >
 <Icon className="w-3 h-3" />
 <span className="truncate max-w-32">{category}</span>
 </motion.button>
 );
 })}
 </div>
 </div>

 {/* Tool Type Filter */}
 <div className="relative">
 <div className="flex items-center gap-3 mb-4">
 <span className="text-gray-400 text-sm font-medium">Tool Type ({uniqueTypes.length}):</span>
 <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-1"></div>
 </div>
 <div className="flex flex-wrap gap-3">
 <button
 onClick={() => setActiveType('all')}
 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
 activeType === 'all'
 ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
 : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
 }`}
 >
 All Types
 </button>
 {uniqueTypes.map((type, index) => {
 const Icon = getToolTypeIcon(type);
 return (
 <motion.button
 key={type}
 onClick={() => setActiveType(type)}
 whileHover={{ scale: 1.05, y: -2 }}
 whileTap={{ scale: 0.95 }}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: index * 0.05 }}
 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
 activeType === type
 ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
 : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 hover:border-cyan-500/30'
 }`}
 >
 <Icon className="w-3 h-3" />
 <span className="truncate max-w-32">{type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
 </motion.button>
 );
 })}
 </div>
 </div>

 {/* Audience Filter */}
 <div className="relative">
 <div className="flex items-center gap-3 mb-4">
 <span className="text-gray-400 text-sm font-medium">Target Audience ({uniqueAudiences.length}):</span>
 <div className="h-px bg-gradient-to-r from-green-500/50 to-transparent flex-1"></div>
 </div>
 
 <div className="relative">
 <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 transition-all duration-500 overflow-hidden ${
 showAllAudiences ? 'max-h-none' : 'max-h-32'
 }`}>
 <button
 onClick={() => setActiveAudience('all')}
 className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
 activeAudience === 'all'
 ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25'
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
 ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25'
 : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 hover:border-green-500/30'
 }`}
 title={audience}
 >
 <AudienceIcon className="w-3 h-3 flex-shrink-0" />
 <span className="truncate">{audience}</span>
 </motion.button>
 );
 })}
 </div>
 
 {/* Show More/Less Button - Updated Style */}
 {uniqueAudiences.length > 10 && (
 <div className="flex justify-center mt-4">
 <motion.button
 onClick={() => setShowAllAudiences(!showAllAudiences)}
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className="px-6 py-3 bg-gradient-to-r from-green-600/30 to-emerald-600/30 backdrop-blur-sm border border-green-500/40 rounded-full text-green-300 text-sm font-semibold hover:from-green-600/40 hover:to-emerald-600/40 transition-all duration-300 flex items-center gap-3 shadow-lg"
 >
 <span>{showAllAudiences ? 'Show Less Audiences' : `View All ${uniqueAudiences.length} Audiences`}</span>
 <motion.div
 animate={{ rotate: showAllAudiences ? 180 : 0 }}
 transition={{ duration: 0.3 }}
 className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center"
 >
 <FiChevronDown className="w-3 h-3" />
 </motion.div>
 </motion.button>
 </div>
 )}
 
 {!showAllAudiences && uniqueAudiences.length > 10 && (
 <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
 )}
 </div>
 </div>
 </div>
 </motion.div>
 )}

 {/* Results Count */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.6, delay: 0.5 }}
 className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}
 >
 <p className="text-gray-400">
 Showing <span className="text-white font-semibold">{filteredTools.length}</span> of{' '}
 <span className="text-white font-semibold">{tools.length}</span> tools
 </p>
 </motion.div>
 </div>
 </section>

 {/* Tools Grid Section */}
 <section className={`relative ${isMobile ? 'pb-24' : 'pb-32'}`}>
 <div className="max-w-7xl mx-auto px-4 md:px-6">
 {filteredTools.length === 0 ? (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center py-20"
 >
 <FiPackage className="w-16 h-16 text-gray-600 mx-auto mb-4" />
 <h3 className="text-2xl font-bold text-white mb-2">No tools found</h3>
 <p className="text-gray-400">Try adjusting your filters or search term</p>
 </motion.div>
 ) : (
 <div className={
 viewMode === 'grid' 
 ? `grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`
 : 'space-y-6'
 }>
 {filteredTools.map((tool, index) => {
 const TypeIcon = getToolTypeIcon(tool.toolType);
 const pricingColor = getPricingModelColor(tool.pricingModel);
 const toolFeatures = parseToolFeatures(tool.keyFeatures);
 const metrics = generateRandomMetrics(tool.id);
 
 // Get category and audience names for display
 const toolCategories = tool.categories?.map((catId: number) => categoryMap[catId]).filter(Boolean) || [];
 const toolAudiences = tool.audiences?.map((audId: number) => audienceMap[audId]).filter(Boolean) || [];
 
 return (
 <motion.div
 key={tool.id}
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
 <Link href={`/tools/${tool.slug}`}>
 <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 h-full ${
 viewMode === 'list' && !isMobile ? 'flex items-center' : ''
 }`}>
 {/* Tool Preview/Demo - Fixed for list view */}
 {tool.featuredImage && (
 <div className={`relative ${
 viewMode === 'list' && !isMobile ? 'w-80 h-48 flex-shrink-0' : 'h-48 md:h-56'
 } bg-gradient-to-br from-blue-900/50 to-cyan-900/50 overflow-hidden`}>
 <Image
 src={tool.featuredImage}
 alt={tool.title}
 fill
 className="object-cover group-hover:scale-110 transition-transform duration-700"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
 
 {/* Demo Button */}
 {tool.demoUrl && (
 <motion.button
 whileHover={{ scale: 1.1 }}
 whileTap={{ scale: 0.9 }}
 onClick={(e) => {
 e.preventDefault();
 window.open(tool.demoUrl, '_blank');
 }}
 className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
 title={`Demo: ${tool.demoUrl}`}
 >
 <FiPlay className="w-4 h-4 text-white ml-0.5" />
 </motion.button>
 )}

 {/* Tool Type Badge */}
 <div className="absolute bottom-4 left-4 flex items-center gap-2">
 <TypeIcon className="w-5 h-5 text-white" />
 <span className="text-white text-sm font-medium">
 {tool.toolType?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
 </span>
 </div>
 </div>
 )}

 {/* Tool Content */}
 <div className={`${
 viewMode === 'list' && !isMobile ? 'flex-1' : ''
 }`}>
 <div className={`p-6 ${viewMode === 'list' && !isMobile && tool.featuredImage ? '' : 'border-b border-white/10'}`}>
 <div className="flex items-start justify-between mb-4">
 <div className="flex-1">
 <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
 {cleanHtmlContent(tool.title)}
 </h3>
 <p className="text-gray-400 text-sm">
 {cleanHtmlContent(tool.tagline)}
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
 {tool.demoUrl && (
 <motion.button
 whileTap={{ scale: 0.9 }}
 className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
 onClick={(e) => {
 e.preventDefault();
 window.open(tool.demoUrl, '_blank');
 }}
 title={tool.demoUrl}
 >
 <FiExternalLink className="w-4 h-4 text-white/80" />
 </motion.button>
 )}
 </div>
 )}
 </div>

 {/* Key Features */}
 {toolFeatures && toolFeatures.length > 0 && (
 <div className="space-y-2 mb-4">
 {toolFeatures.slice(0, 3).map((feature, i: number) => (
 <div key={i} className="flex items-center gap-2">
 <FiCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
 <span className="text-gray-300 text-sm line-clamp-1">{feature.title}</span>
 </div>
 ))}
 </div>
 )}

 {/* Target Audiences */}
 {toolAudiences.length > 0 && (
 <div className="flex flex-wrap gap-2 mb-4">
 {toolAudiences.slice(0, 2).map((audience: any, i: number) => {
 const AudienceIcon = getAudienceIcon(audience);
 return (
 <span
 key={i}
 className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 text-xs flex items-center gap-1"
 >
 <AudienceIcon className="w-3 h-3" />
 {audience.name || audience}
 </span>
 );
 })}
 {toolAudiences.length > 2 && (
 <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-lg border border-gray-500/30 text-xs">
 +{toolAudiences.length - 2}
 </span>
 )}
 </div>
 )}

 {/* ROI Metrics - Updated with unique values */}
 <div className="grid grid-cols-3 gap-3 mb-4">
 <div className="text-center p-2 bg-white/5 rounded-lg">
 <FiClock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
 <div className="text-xs text-gray-400">Setup</div>
 <div className="text-xs font-bold text-white">{tool.setupTime || '< 5min'}</div>
 </div>
 <div className="text-center p-2 bg-white/5 rounded-lg">
 <FiTrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
 <div className="text-xs text-gray-400">ROI</div>
 <div className="text-xs font-bold text-white">{metrics.roi}</div>
 </div>
 <div className="text-center p-2 bg-white/5 rounded-lg">
 <FiUsers className="w-4 h-4 text-purple-400 mx-auto mb-1" />
 <div className="text-xs text-gray-400">Users</div>
 <div className="text-xs font-bold text-white">{metrics.users}</div>
 </div>
 </div>
 </div>

 {/* Tool Footer */}
 <div className="p-6 pt-0">
 {/* Pricing - Fixed triple dollar signs */}
 <div className="flex items-center justify-between mb-4">
 <div>
 <span className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${pricingColor} bg-opacity-20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20`}>
 <FiDollarSign className="w-3 h-3" />
 {tool.pricingModel === 'freemium' ? 'Free to Start' : 
 tool.pricingModel === 'monthly' ? (tool.price ? `${tool.price}/mo` : 'Contact Us') :
 tool.pricingModel === 'one_time' ? (tool.price || 'Custom') : 'Custom'}
 </span>
 </div>
 
 {/* Technology Stack Icons - Removed mystery letters */}
 {tool.technologyStack && tool.technologyStack.length > 0 && (
 <div className="flex gap-1">
 {tool.technologyStack.slice(0, 3).map((tech: string, i: number) => (
 <span
 key={i}
 className="px-2 py-1 bg-white/10 rounded text-xs text-white/80 font-medium"
 title={tech}
 >
 {tech}
 </span>
 ))}
 </div>
 )}
 </div>

 {/* CTA Buttons */}
 <div className="flex gap-3">
 <motion.div
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="flex-1"
 >
 <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 group-hover:shadow-lg transition-all duration-300">
 <span>Learn More</span>
 <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </button>
 </motion.div>
 
 {tool.demoUrl && !isMobile && (
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 onClick={(e) => {
 e.preventDefault();
 window.open(tool.demoUrl, '_blank');
 }}
 className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
 title={tool.demoUrl}
 >
 <FiPlay className="w-4 h-4" />
 </motion.button>
 )}
 </div>
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

 {/* CTA Section */}
 <section className={`${isMobile ? 'py-16' : 'py-32'} bg-gradient-to-r from-blue-900/50 via-black to-cyan-900/50 relative overflow-hidden`}>
 <div className="absolute inset-0">
 <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
 
 {isMobile && (
 <motion.div
 className="absolute inset-0 opacity-20"
 style={{
 background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))',
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
 className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
 >
 <FiTool className="w-8 h-8 text-white" />
 </motion.div>

 <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-4">
 Need a Custom Tool?
 </h2>

 <p className="text-gray-300 mb-8 leading-relaxed px-4">
 Let&apos;s build a custom automation tool tailored to your specific workflow.
 </p>
 
 <div className="space-y-4">
 <Link href="/contact">
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full max-w-sm mx-auto block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 text-lg"
 >
 <span>Request Custom Tool</span>
 <FiArrowRight className="w-5 h-5" />
 </motion.button>
 </Link>
 
 <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
 <Link href="/solutions">
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-sm"
 >
 View Solutions
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
 className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-8"
 >
 <FiCpu className="w-10 h-10 text-white" />
 </motion.div>

 <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-8">
 Need a Custom Tool?
 </h2>
 <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
 Our team can build custom automation tools designed specifically for your business processes and workflows.
 </p>
 
 <div className="flex flex-wrap gap-6 justify-center">
 <Link href="/contact">
 <motion.button
 whileHover={{ 
 scale: 1.05, 
 boxShadow: '0 25px 50px rgba(59, 130, 246, 0.6)',
 background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)'
 }}
 whileTap={{ scale: 0.95 }}
 className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full flex items-center gap-3 hover:shadow-2xl transition-all duration-300 text-lg relative overflow-hidden"
 >
 <span className="relative z-10">Request Custom Tool</span>
 <motion.div
 whileHover={{ x: 5 }}
 transition={{ duration: 0.2 }}
 >
 <FiArrowRight className="w-6 h-6" />
 </motion.div>
 </motion.button>
 </Link>
 
 <Link href="/solutions">
 <motion.button
 whileHover={{ 
 scale: 1.05,
 backgroundColor: 'rgba(255, 255, 255, 0.15)',
 borderColor: 'rgba(59, 130, 246, 0.5)'
 }}
 whileTap={{ scale: 0.95 }}
 className="px-10 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-full hover:border-blue-500/50 transition-all duration-300 text-lg"
 >
 Browse Solutions
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
 className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl"
 >
 <FiZap className="w-6 h-6 text-white" />
 </motion.button>
 </Link>
 </motion.div>
 )}

 {/* Tool Preview Modal (Mobile) */}
 {isMobile && selectedTool && (
 <AnimatePresence>
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end"
 onClick={() => setSelectedTool(null)}
 >
 <motion.div
 initial={{ y: '100%' }}
 animate={{ y: 0 }}
 exit={{ y: '100%' }}
 transition={{ type: 'spring', damping: 25 }}
 className="w-full bg-gradient-to-br from-gray-900 to-black rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
 onClick={(e) => e.stopPropagation()}
 >
 <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6" />
 
 <h3 className="text-2xl font-bold text-white mb-4">{selectedTool.title}</h3>
 <p className="text-gray-300 mb-6">{selectedTool.tagline}</p>
 
 <div className="space-y-4 mb-6">
 <Link href={`/tools/${selectedTool.slug}`}>
 <motion.button
 whileTap={{ scale: 0.98 }}
 className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-2xl"
 >
 View Full Details
 </motion.button>
 </Link>
 
 {selectedTool.demoUrl && (
 <motion.button
 whileTap={{ scale: 0.98 }}
 onClick={() => window.open(selectedTool.demoUrl, '_blank')}
 className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl"
 >
 Try Demo
 </motion.button>
 )}
 </div>
 </motion.div>
 </motion.div>
 </AnimatePresence>
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
 background: linear-gradient(to bottom, #3b82f6, #06b6d4);
 border-radius: 2px;
 }
 .custom-scrollbar::-webkit-scrollbar-thumb:hover {
 background: linear-gradient(to bottom, #2563eb, #0891b2);
 }
 `}</style>
 </div>
 );
}