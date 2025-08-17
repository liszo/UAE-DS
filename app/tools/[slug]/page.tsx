'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiArrowRight, 
  FiCheck, 
  FiZap,
  FiCpu,
  FiDollarSign,
  FiClock,
  FiUsers,
  FiBarChart,
  FiShield,
  FiAward,
  FiBookmark,
  FiShare2,
  FiExternalLink,
  FiChevronRight,
  FiLayers,
  FiPackage,
  FiSettings,
  FiActivity,
  FiTarget,
  FiTool,
  FiMonitor,
  FiBox,
  FiGrid,
  FiCreditCard,
  FiHeadphones,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiMessageCircle,
  FiTag,
  FiInfo,
  FiCode,
  FiPlay
} from 'react-icons/fi';
import { getToolBySlug, getRelatedTools, getRelatedSolutions, cleanHtmlContent, getTargetAudienceName, getCategoryName } from '@/lib/wordpress';

// Tool type icons
const getToolTypeIcon = (type: string) => {
  const typeLower = type?.toLowerCase() || '';
  
  if (typeLower.includes('automation')) return FiCpu;
  if (typeLower.includes('dashboard')) return FiBarChart;
  if (typeLower.includes('ai')) return FiZap;
  if (typeLower.includes('widget')) return FiGrid;
  if (typeLower.includes('integration')) return FiLayers;
  if (typeLower.includes('template')) return FiPackage;
  if (typeLower.includes('analytics')) return FiActivity;
  if (typeLower.includes('lead')) return FiTarget;
  
  return FiTool;
};

// Pricing model colors
const getPricingModelColor = (model: string) => {
  if (model === 'monthly') return 'from-blue-500 to-cyan-500';
  if (model === 'one_time') return 'from-green-500 to-emerald-500';
  if (model === 'freemium') return 'from-purple-500 to-pink-500';
  return 'from-gray-500 to-gray-600';
};

// Parse tool features with icons
const parseToolFeatures = (featuresString: string | string[] | null | undefined): Array<{icon: string, title: string, description: string}> => {
  if (!featuresString) return [];
  
  const features: Array<{icon: string, title: string, description: string}> = [];
  
  if (typeof featuresString === 'string') {
    // Split by newlines
    const lines = featuresString.split('\n').filter(Boolean);
    
    lines.forEach(line => {
      // Check if line contains | separator for icon format
      if (line.includes('|')) {
        const parts = line.split('|').map(p => p.trim());
        if (parts.length >= 3) {
          features.push({
            icon: parts[0],
            title: parts[1],
            description: parts[2]
          });
        }
      } else {
        // Simple feature without icon
        features.push({
          icon: 'fas fa-check',
          title: line.trim(),
          description: ''
        });
      }
    });
  }
  
  return features;
};

// Parse technology stack
const parseTechStack = (techString: string | string[] | null | undefined): string[] => {
  if (!techString) return [];
  
  if (Array.isArray(techString)) return techString;
  
  if (typeof techString === 'string') {
    return techString.split(',').map(t => t.trim()).filter(Boolean);
  }
  
  return [];
};

export default function ToolSinglePage() {
  const params = useParams();
  const [tool, setTool] = useState<any>(null);
  const [relatedTools, setRelatedTools] = useState<any[]>([]);
  const [relatedSolutions, setRelatedSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [audienceNames, setAudienceNames] = useState<Record<number, string>>({});
  const [categoryNames, setCategoryNames] = useState<Record<number, string>>({});

  // Fetch tool data
  useEffect(() => {
    async function fetchTool() {
      try {
        setLoading(true);
        const toolData = await getToolBySlug(params.slug as string);
        
        if (toolData) {
          console.log('Tool Data:', toolData);
          setTool(toolData);
          
          // Fetch audience names
          if (toolData.target_audience && toolData.target_audience.length > 0) {
            const names: Record<number, string> = {};
            for (const audienceId of toolData.target_audience) {
              const name = await getTargetAudienceName(audienceId);
              names[audienceId] = name;
            }
            setAudienceNames(names);
            
            // Fetch related solutions
            const relatedSolutionsData = await getRelatedSolutions(toolData.id, toolData.target_audience[0]);
            setRelatedSolutions(relatedSolutionsData.slice(0, 3));
          }
          
          // Fetch category names
          if (toolData.tool_category && toolData.tool_category.length > 0) {
            const names: Record<number, string> = {};
            for (const categoryId of toolData.tool_category) {
              const name = await getCategoryName(categoryId, 'tool_category');
              names[categoryId] = name;
            }
            setCategoryNames(names);
            
            // Fetch related tools
            const relatedToolsData = await getRelatedTools(toolData.id, toolData.tool_category[0]);
            setRelatedTools(relatedToolsData.slice(0, 3));
          }
        }
      } catch (error) {
        console.error('Error fetching tool:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (params.slug) {
      fetchTool();
    }
  }, [params.slug]);

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
            Loading tool...
          </motion.p>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Tool Not Found</h1>
          <p className="text-gray-400 mb-6">The tool you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/tools">
            <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl"
 >
 Back to Tools
 </motion.button>
 </Link>
 </div>
 </div>
 );
 }

 const toolFeatures = parseToolFeatures(tool.tool_features);
 const techStack = parseTechStack(tool.technology_stack);
 const ToolTypeIcon = getToolTypeIcon(tool.tool_type);

 return (
 <div className="min-h-screen bg-black">
 {/* Hero Section with Bento Grid */}
 <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
 {/* Animated Background */}
 <div className="absolute inset-0">
 <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
 </div>

 <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
 {/* Breadcrumb */}
 <motion.nav
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 className="flex items-center gap-2 text-sm text-gray-400 mb-8"
 >
 <Link href="/" className="hover:text-white transition-colors">Home</Link>
 <FiChevronRight className="w-4 h-4" />
 <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
 <FiChevronRight className="w-4 h-4" />
 <span className="text-white">{cleanHtmlContent(tool.title?.rendered || tool.title)}</span>
 </motion.nav>

 {/* Bento Grid Layout */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
 {/* Main Content - Large Card */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="lg:col-span-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
 >
 {/* Header */}
 <div className="mb-8">
 <div className="flex items-center gap-3 mb-4">
 <motion.div
 initial={{ scale: 0 }}
 animate={{ scale: 1 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center"
 >
 <ToolTypeIcon className="w-6 h-6 text-white" />
 </motion.div>
 <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
 Tool
 </span>
 {tool.demo_available === "1" && (
 <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30 flex items-center gap-2">
 <FiPlay className="w-3 h-3" />
 Demo Available
 </span>
 )}
 </div>
 
 <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
 {cleanHtmlContent(tool.title?.rendered || tool.title)}
 </h1>
 
 {tool.tool_tagline && (
 <p className="text-xl text-gray-300 mb-4">
 {cleanHtmlContent(tool.tool_tagline)}
 </p>
 )}
 
 <p className="text-lg text-gray-400 leading-relaxed">
 {cleanHtmlContent(tool.excerpt?.rendered || '')}
 </p>
 </div>

 {/* Main Tool Content */}
 <div className="space-y-8">
 {/* Description from content */}
 {tool.content?.rendered && (
 <div>
 <h3 className="text-2xl font-bold text-white mb-4">Description</h3>
 <div className="prose prose-lg prose-invert max-w-none">
 <div 
 dangerouslySetInnerHTML={{ __html: tool.content.rendered }}
 className="text-gray-300"
 />
 </div>
 </div>
 )}

 {/* Tool Type */}
 <div>
 <h3 className="text-2xl font-bold text-white mb-4">Tool Type</h3>
 <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/30">
 <ToolTypeIcon className="w-8 h-8 text-purple-400" />
 <span className="text-white text-lg font-semibold capitalize">{tool.tool_type}</span>
 </div>
 </div>

 {/* Key Features */}
 {toolFeatures.length > 0 && (
 <div>
 <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {toolFeatures.map((feature, index) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 whileHover={{ scale: 1.02, y: -5 }}
 className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all"
 >
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
 <FiCheckCircle className="w-5 h-5 text-white" />
 </div>
 <div>
 <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
 {feature.description && (
 <p className="text-gray-400 text-sm">{feature.description}</p>
 )}
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 )}

 {/* Technology Stack */}
 {techStack.length > 0 && (
 <div>
 <h3 className="text-2xl font-bold text-white mb-4">Technology Stack</h3>
 <div className="flex flex-wrap gap-3">
 {techStack.map((tech, index) => (
 <motion.span
 key={index}
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30 flex items-center gap-2"
 >
 <FiCode className="w-4 h-4" />
 {tech}
 </motion.span>
 ))}
 </div>
 </div>
 )}

 {/* Support Included */}
 {tool.support_included && (
 <div>
 <h3 className="text-2xl font-bold text-white mb-4">Support Included</h3>
 <div className="p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl border border-green-500/30">
 <div className="flex items-start gap-4">
 <FiHeadphones className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
 <div className="text-gray-300 leading-relaxed">
 {tool.support_included.split('\n').map((line: string, index: number) => (
 line.trim() && (
 <div key={index} className="flex items-center gap-2 mb-2">
 <FiCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
 <span>{line.trim()}</span>
 </div>
 )
 ))}
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Featured Image */}
 {tool.featured_image_url && (
 <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
 <Image
 src={tool.featured_image_url}
 alt={tool.title?.rendered || 'Tool image'}
 fill
 className="object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
 </div>
 )}
 </div>
 </motion.div>

 {/* Sidebar - Smaller Cards */}
 <div className="lg:col-span-4 space-y-6">
 {/* Pricing Card */}
 <motion.div
 initial={{ opacity: 0, x: 30 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className={`bg-gradient-to-br ${getPricingModelColor(tool.pricing_model)}/20 backdrop-blur-sm rounded-3xl p-6 border border-white/20`}
 >
 <div className="flex items-center justify-between mb-4">
 <h3 className="text-lg font-semibold text-white">Pricing</h3>
 <FiDollarSign className="w-6 h-6 text-green-400" />
 </div>
 
 <div className="space-y-4">
 {tool.base_price && (
 <div>
 <div className="text-3xl font-bold text-white mb-1">
 ${tool.base_price}
 </div>
 <p className="text-gray-300 text-sm capitalize">
 {tool.pricing_model === 'one_time' ? 'One-time payment' : 
 tool.pricing_model === 'monthly' ? 'Per month' : 
 tool.pricing_model === 'freemium' ? 'Freemium model' : 'Custom pricing'}
 </p>
 </div>
 )}
 
 {tool.setup_fee && (
 <div className="pt-4 border-t border-white/10">
 <div className="flex justify-between items-center">
 <span className="text-gray-400">Setup Fee</span>
 <span className="text-white font-semibold">${tool.setup_fee}</span>
 </div>
 </div>
 )}
 
 {tool.monthly_fee && (
 <div className="flex justify-between items-center">
 <span className="text-gray-400">Monthly Fee</span>
 <span className="text-white font-semibold">${tool.monthly_fee}</span>
 </div>
 )}
 </div>
 </motion.div>

 {/* Setup Time */}
 <motion.div
 initial={{ opacity: 0, x: 30 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.6, delay: 0.3 }}
 whileHover={{ scale: 1.02 }}
 className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-3xl p-6 border border-blue-500/30"
 >
 <div className="flex items-center justify-between mb-4">
 <h3 className="text-lg font-semibold text-white">Setup Time</h3>
 <FiClock className="w-6 h-6 text-blue-400" />
 </div>
 <div className="text-3xl font-bold text-blue-400 mb-2">{tool.setup_time}</div>
 <p className="text-gray-300 text-sm">From purchase to deployment</p>
 </motion.div>

 {/* Details Card */}
 <motion.div
 initial={{ opacity: 0, x: 30 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.6, delay: 0.4 }}
 className="space-y-4"
 >
 {/* Target Audiences - Show ALL */}
 {tool.target_audience && tool.target_audience.length > 0 && (
 <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
 <FiUsers className="w-5 h-5 text-purple-400" />
 Perfect For
 </h3>
 <div className="flex flex-wrap gap-2">
 {tool.target_audience.map((audienceId: number, index: number) => (
 <span
 key={index}
 className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30"
 >
 {audienceNames[audienceId] || `Loading...`}
 </span>
 ))}
 </div>
 </div>
 )}

 {/* Tool Categories */}
 {tool.tool_category && tool.tool_category.length > 0 && (
 <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
 <FiTag className="w-5 h-5 text-blue-400" />
 Categories
 </h3>
 <div className="flex flex-wrap gap-2">
 {tool.tool_category.map((categoryId: number, index: number) => (
 <span
 key={index}
 className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
 >
 {categoryNames[categoryId] || `Loading...`}
 </span>
 ))}
 </div>
 </div>
 )}
 </motion.div>

 {/* Action Buttons */}
 <motion.div
 initial={{ opacity: 0, x: 30 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.6, delay: 0.5 }}
 className="space-y-3"
 >
 <Link href="/contact">
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg transition-all"
 >
 <span>Get This Tool</span>
 <FiArrowRight className="w-5 h-5" />
 </motion.button>
 </Link>

 {/* Demo Button */}
 {tool.demo_available === "1" && tool.demo_link && (
 <Link href={tool.demo_link} target="_blank">
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg transition-all"
 >
 <FiPlay className="w-5 h-5" />
 <span>View Demo</span>
 <FiExternalLink className="w-4 h-4" />
 </motion.button>
 </Link>
 )}

 <div className="grid grid-cols-2 gap-3">
 <motion.button
 onClick={() => setBookmarked(!bookmarked)}
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
 >
 <FiBookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
 <span className="hidden sm:inline">Save</span>
 </motion.button>

 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
 >
 <FiShare2 className="w-4 h-4" />
 <span className="hidden sm:inline">Share</span>
 </motion.button>
 </div>
 </motion.div>
 </div>
 </div>

 {/* Related Solutions */}
 {relatedSolutions.length > 0 && (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 viewport={{ once: true }}
 className="mt-16"
 >
 <h2 className="text-3xl font-bold text-white mb-8">Related Solutions</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {relatedSolutions.map((solution, index) => (
 <motion.div
 key={solution.id}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: index * 0.1 }}
 viewport={{ once: true }}
 whileHover={{ y: -10 }}
 >
 <Link href={`/solutions/${solution.slug}`}>
 <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all h-full">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
 <FiZap className="w-5 h-5 text-white" />
 </div>
 <h3 className="text-lg font-semibold text-white line-clamp-1">
 {cleanHtmlContent(solution.title?.rendered || solution.title)}
 </h3>
 </div>
 <p className="text-gray-400 text-sm line-clamp-3 mb-4">
 {cleanHtmlContent(solution.problem_description || solution.excerpt?.rendered || '')}
 </p>
 <div className="flex items-center justify-between">
 <span className="text-blue-400 text-sm">{solution.implementation_time || '2-4 weeks'}</span>
 <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
 <span>Learn More</span>
 <FiArrowRight className="w-4 h-4" />
 </div>
 </div>
 </div>
 </Link>
 </motion.div>
 ))}
 </div>
 </motion.div>
 )}

 {/* Related Tools */}
 {relatedTools.length > 0 && (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 viewport={{ once: true }}
 className="mt-16"
 >
 <h2 className="text-3xl font-bold text-white mb-8">Similar Tools</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {relatedTools.map((relatedTool, index) => (
 <motion.div
 key={relatedTool.id}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: index * 0.1 }}
 viewport={{ once: true }}
 whileHover={{ y: -10 }}
 >
 <Link href={`/tools/${relatedTool.slug}`}>
 <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all h-full">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
 <FiTool className="w-5 h-5 text-white" />
 </div>
 <h3 className="text-lg font-semibold text-white line-clamp-1">
 {cleanHtmlContent(relatedTool.title?.rendered || relatedTool.title)}
 </h3>
 </div>
 <p className="text-gray-400 text-sm line-clamp-3 mb-4">
 {cleanHtmlContent(relatedTool.tool_tagline || relatedTool.excerpt?.rendered || '')}
 </p>
 <div className="flex items-center justify-between">
 <span className="text-purple-400 text-sm">
 {relatedTool.pricing_model === 'freemium' ? 'Free to Start' : 
 relatedTool.base_price ? `$${relatedTool.base_price}` : 'Custom'}
 </span>
 <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
 <span>Explore</span>
 <FiArrowRight className="w-4 h-4" />
 </div>
 </div>
 </div>
 </Link>
 </motion.div>
 ))}
 </div>
 </motion.div>
 )}
 </div>
 </section>

 {/* CTA Section */}
 <section className="py-24 bg-gradient-to-r from-purple-900/50 via-black to-pink-900/50 relative overflow-hidden">
 <div className="absolute inset-0">
 <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
 </div>

 <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 viewport={{ once: true }}
 >
 <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
 Ready to Get This Tool?
 </h2>
 <p className="text-xl text-gray-300 mb-8">
 Join thousands of professionals who are already using our tools to streamline their workflows.
 </p>
 <div className="flex flex-wrap gap-4 justify-center">
 <Link href="/contact">
 <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full flex items-center gap-3 hover:shadow-lg transition-all"
 >
 <FiMessageCircle className="w-6 h-6" />
 <span>Get Started Today</span>
 </motion.button>
 </Link>
 <Link href="/solutions">
 <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all"
 >
 Browse Solutions
 </motion.button>
 </Link>
 </div>
 </motion.div>
 </div>
 </section>
 </div>
 );
}