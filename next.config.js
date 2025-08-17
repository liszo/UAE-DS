/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
 dangerouslyAllowSVG: true,
 contentDispositionType: 'attachment',
 contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
 remotePatterns: [
 {
 protocol: 'https',
 hostname: 'api.uaedigitalsolution.agency',
 port: '',
 pathname: '/**',
 },
 {
 protocol: 'https',
 hostname: 'images.unsplash.com',
 port: '',
 pathname: '/**',
 },
 {
 protocol: 'http',
 hostname: 'localhost',
 port: '3000',
 pathname: '/api/placeholder/**',
 },
 ],
 },
 eslint: {
 // Disable ESLint during builds to prevent deployment failures
 ignoreDuringBuilds: false,
 // Custom ESLint rules
 rules: {
 'react/no-unescaped-entities': 'off',
 '@next/next/no-img-element': 'off',
 'react-hooks/exhaustive-deps': 'warn',
 },
 },
 // Move turbo config from experimental to turbopack (as per the warning)
 turbopack: {
 rules: {
 '*.svg': {
 loaders: ['@svgr/webpack'],
 as: '*.js',
 },
 },
 },
 // Remove the deprecated experimental.turbo
 experimental: {
 // Keep other experimental features here if needed
 },
 // Add headers for better CORS handling
 async headers() {
 return [
 {
 source: '/api/:path*',
 headers: [
 { key: 'Access-Control-Allow-Origin', value: '*' },
 { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
 { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
 ],
 },
 ]
 },
 // Add output for standalone builds (better for deployment)
 output: 'standalone',
};

module.exports = nextConfig;