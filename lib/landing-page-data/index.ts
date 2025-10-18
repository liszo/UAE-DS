// Export all landing page data
export { googleAdsData } from './google-ads-management'
export { seoData } from './search-engine-optimization-seo'
export { websiteSecurityData } from './website-security-services'
export { websiteMigrationData } from './website-migration-services'
export { ecommerceData } from './e-commerce-enhancement-marketing'
export { uiUxData } from './ui-ux-design-branding'
export { performanceData } from './website-performance-optimization'
export { maintenanceData } from './website-maintenance-support'
export { aiChatbotData } from './ai-chatbot-implementation'
export { wordpressPluginData } from './custom-wordpress-plugin-development'
export { websiteDesignData } from './website-design-redesign'
export { bookingSystemData } from './online-booking-systems'
export { aiAutomationData } from './ai-process-automation'

import { ServiceLandingPageData } from '@/lib/types/landing-page'
import { googleAdsData } from './google-ads-management'
import { seoData } from './search-engine-optimization-seo'
import { websiteSecurityData } from './website-security-services'
import { websiteMigrationData } from './website-migration-services'
import { ecommerceData } from './e-commerce-enhancement-marketing'
import { uiUxData } from './ui-ux-design-branding'
import { performanceData } from './website-performance-optimization'
import { maintenanceData } from './website-maintenance-support'
import { aiChatbotData } from './ai-chatbot-implementation'
import { wordpressPluginData } from './custom-wordpress-plugin-development'
import { websiteDesignData } from './website-design-redesign'
import { bookingSystemData } from './online-booking-systems'
import { aiAutomationData } from './ai-process-automation'

// Helper to get service data by slug
export function getServiceDataBySlug(slug: string): ServiceLandingPageData | null {
  const dataMap: Record<string, ServiceLandingPageData> = {
    'google-ads-management': googleAdsData,
    'search-engine-optimization-seo': seoData,
    'website-security-services': websiteSecurityData,
    'website-migration-services': websiteMigrationData,
    'e-commerce-enhancement-marketing': ecommerceData,
    'ui-ux-design-branding': uiUxData,
    'website-performance-optimization': performanceData,
    'website-maintenance-support': maintenanceData,
    'ai-chatbot-implementation': aiChatbotData,
    'custom-wordpress-plugin-development': wordpressPluginData,
    'website-design-redesign': websiteDesignData,
    'online-booking-systems': bookingSystemData,
    'ai-process-automation': aiAutomationData,
  }
  
  return dataMap[slug] || null
}

// Get all service slugs
export function getAllServiceSlugs(): string[] {
  return [
    'google-ads-management',
    'search-engine-optimization-seo',
    'website-security-services',
    'website-migration-services',
    'e-commerce-enhancement-marketing',
    'ui-ux-design-branding',
    'website-performance-optimization',
    'website-maintenance-support',
    'ai-chatbot-implementation',
    'custom-wordpress-plugin-development',
    'website-design-redesign',
    'online-booking-systems',
    'ai-process-automation',
  ]
}

