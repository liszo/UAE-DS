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

// Helper to get service data by slug
export function getServiceDataBySlug(slug: string): ServiceLandingPageData | null {
  const dataMap: Record<string, ServiceLandingPageData> = {
    'google-ads-management': require('./google-ads-management').googleAdsData,
    'search-engine-optimization-seo': require('./search-engine-optimization-seo').seoData,
    'website-security-services': require('./website-security-services').websiteSecurityData,
    'website-migration-services': require('./website-migration-services').websiteMigrationData,
    'e-commerce-enhancement-marketing': require('./e-commerce-enhancement-marketing').ecommerceData,
    'ui-ux-design-branding': require('./ui-ux-design-branding').uiUxData,
    'website-performance-optimization': require('./website-performance-optimization').performanceData,
    'website-maintenance-support': require('./website-maintenance-support').maintenanceData,
    'ai-chatbot-implementation': require('./ai-chatbot-implementation').aiChatbotData,
    'custom-wordpress-plugin-development': require('./custom-wordpress-plugin-development').wordpressPluginData,
    'website-design-redesign': require('./website-design-redesign').websiteDesignData,
    'online-booking-systems': require('./online-booking-systems').bookingSystemData,
    'ai-process-automation': require('./ai-process-automation').aiAutomationData,
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

