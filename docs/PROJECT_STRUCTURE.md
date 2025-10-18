# Project Structure Explained - UAE Digital Agency

## Overview

This document provides a detailed explanation of the **UAE Digital Fresh** project structure based on the actual codebase. This is a Next.js 15.3 application built with the App Router, React 19, TypeScript, and Tailwind CSS.

---

## 📁 Root Directory Structure

```
uae-digital-fresh/
├── app/                      # Next.js App Router (pages & API routes)
├── components/               # React components
├── lib/                      # Utility functions & API clients
├── messages/                 # Internationalization (i18n) files
├── public/                   # Static assets
├── docs/                     # Documentation
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── package.json             # Dependencies & scripts
└── .env.local              # Environment variables (not in repo)
```

---

## 🎯 App Directory (`/app`)

The `app/` directory uses **Next.js 15 App Router** architecture with Server Components by default.

### Core Layout Files

```
app/
├── layout.tsx              # Root layout (Header, Footer, ChatWidget)
├── page.tsx                # Homepage
├── globals.css             # Global styles
├── error.tsx               # Error boundary
├── not-found.tsx          # 404 page
└── favicon.ico            # Site favicon
```

#### **layout.tsx** - Root Layout
```typescript
// Wraps all pages with consistent layout
<html>
  <body>
    <Header />
    <main>{children}</main>
    <Footer />
    <ChatWidget />
  </body>
</html>
```

**Features:**
- Inter font from Google Fonts
- Global metadata (title, description)
- Persistent header, footer, and chat widget
- Hydration suppression for SSR optimization

#### **page.tsx** - Homepage
The homepage is composed of section components:
- `Hero` - Hero section with CTA
- `Services` - Services showcase
- `Cases` - Case studies/portfolio
- `Process` - Our process/methodology
- `Stats` - Statistics/achievements
- `Testimonials` - Client testimonials
- `FAQ` - Frequently asked questions
- `CTA` - Final call-to-action

---

### Public Pages Structure

```
app/
├── about/
│   └── page.tsx           # About page
├── services/
│   ├── page.tsx           # Services list
│   └── [slug]/
│       └── page.tsx       # Dynamic service detail (e.g., /services/web-development)
├── cases/
│   ├── page.tsx           # Case studies list
│   └── [slug]/
│       └── page.tsx       # Dynamic case study detail
├── solutions/
│   ├── page.tsx           # Solutions list
│   └── [slug]/
│       └── page.tsx       # Dynamic solution detail
├── tools/
│   ├── page.tsx           # Tools/technologies list
│   └── [slug]/
│       └── page.tsx       # Dynamic tool detail
├── contact/
│   └── page.tsx           # Contact form page
├── booking/
│   └── page.tsx           # Booking/consultation page
├── privacy/
│   └── page.tsx           # Privacy policy
└── terms/
    └── page.tsx           # Terms of service
```

**Dynamic Routes Pattern:**
- `[slug]` folders create dynamic routes
- Example: `/services/web-development` → `app/services/[slug]/page.tsx`
- The `slug` parameter is used to fetch specific content

---

### API Routes (`/app/api`)

API routes handle server-side logic and WordPress integration.

```
app/api/
├── contact/
│   └── route.ts           # Contact form submission
├── services/
│   └── route.ts           # Services data endpoint
├── cases/
│   └── route.ts           # Case studies data endpoint
├── posts/
│   └── route.ts           # Blog posts data endpoint
├── team/
│   └── route.ts           # Team members data endpoint
├── testimonials/
│   └── route.ts           # Testimonials data endpoint
├── placeholder/
│   └── [...params]/
│       └── route.ts       # Placeholder image generator
├── proxy/
│   └── route.ts           # API proxy for WordPress
└── wordpress/             # WordPress integration routes
    ├── [...path]/
    │   └── route.ts       # General WordPress proxy
    ├── solutions/
    │   └── route.ts       # Solutions from WordPress
    ├── solution_category/
    │   └── route.ts       # Solution categories
    ├── tools/
    │   └── route.ts       # Tools/technologies
    ├── tool_category/
    │   └── route.ts       # Tool categories
    ├── target_audience/
    │   └── route.ts       # Target audience taxonomy
    └── taxonomy/
        └── [...params]/
            └── route.ts   # General taxonomy handler
```

#### API Route Examples:

**Contact Form Handler** (`api/contact/route.ts`):
- Handles form submissions
- Sends emails via EmailJS
- Returns success/error responses

**WordPress Proxy** (`api/wordpress/[...path]/route.ts`):
- Proxies requests to headless WordPress backend
- Handles GraphQL and REST API calls
- Provides data transformation

**Placeholder Image Generator** (`api/placeholder/[...params]/route.ts`):
- Generates dynamic placeholder images
- Used during development or when images are missing

---

## 🧩 Components Directory (`/components`)

React components organized by type and feature.

```
components/
├── Header.tsx              # Site navigation header
├── Footer.tsx              # Site footer
├── Hero.tsx                # Hero section
├── Services.tsx            # Services section
├── Cases.tsx               # Case studies section
├── Process.tsx             # Process/methodology section
├── Stats.tsx               # Statistics section
├── Testimonials.tsx        # Testimonials section
├── FAQ.tsx                 # FAQ section
├── CTA.tsx                 # Call-to-action section
├── Team.tsx                # Team section
├── LoadingSpinner.tsx      # Loading state component
├── ChatWidget.tsx          # Chat widget wrapper
├── BodylabChatWidget.tsx   # Bodylab chat integration
├── booking/                # Booking feature components
│   ├── BookingForm.tsx     # Main booking form
│   ├── Calendar.tsx        # Date picker calendar
│   └── TimeSlots.tsx       # Time slot selector
└── home/                   # Homepage-specific components
    └── HeroSection.tsx     # Alternative hero implementation
```

### Component Organization

#### **Layout Components**
- `Header.tsx` - Site navigation (logo, menu, mobile menu)
- `Footer.tsx` - Footer (links, social media, copyright)

#### **Section Components**
Reusable page sections used across multiple pages:
- `Hero.tsx` - Hero/banner sections
- `Services.tsx` - Services showcase grid
- `Cases.tsx` - Portfolio/case studies grid
- `Stats.tsx` - Statistics display
- `Testimonials.tsx` - Customer testimonials carousel
- `FAQ.tsx` - Accordion-style FAQ
- `CTA.tsx` - Call-to-action sections

#### **Feature Components**
Grouped by feature in subdirectories:

**Booking Feature** (`components/booking/`):
- `BookingForm.tsx` - Complete booking form with validation
- `Calendar.tsx` - Interactive date picker
- `TimeSlots.tsx` - Available time slot selection

#### **Utility Components**
- `LoadingSpinner.tsx` - Loading states
- `ChatWidget.tsx` - Chat integration wrapper
- `BodylabChatWidget.tsx` - Specific Bodylab chat implementation

---

## 📚 Lib Directory (`/lib`)

Utility functions, API clients, and helper modules.

```
lib/
├── api.ts                  # Main API client & data fetching
├── wordpress.ts            # WordPress GraphQL client
└── emailjs-contact.ts      # EmailJS integration for forms
```

### **api.ts** - API Client
Main API client with both GraphQL and REST support:

```typescript
// GraphQL client for WordPress
fetchAPI(query, variables)

// REST API client
fetchRestAPI(endpoint, options)

// Specific data fetchers
getServices()
getCases()
getTestimonials()
// ... etc
```

**Key Features:**
- GraphQL client using `graphql-request`
- REST API fallback
- Error handling and logging
- TypeScript typed responses
- Connection testing utilities

### **wordpress.ts** - WordPress Integration
Handles WordPress-specific GraphQL queries and data transformation.

### **emailjs-contact.ts** - Email Service
Integrates with EmailJS for contact form functionality.

---

## 🌍 Messages Directory (`/messages`)

Internationalization (i18n) files for multi-language support.

```
messages/
├── en.json                 # English translations
└── ar.json                 # Arabic translations
```

**Technology:** Uses `next-intl` for internationalization

**Current Languages:**
- English (en) - Primary language
- Arabic (ar) - Secondary language (RTL support)

**Usage:**
```typescript
import { useTranslations } from 'next-intl'

const t = useTranslations('HomePage')
<h1>{t('title')}</h1>
```

---

## 🎨 Public Directory (`/public`)

Static assets served directly by Next.js.

```
public/
├── logo.png                # Company logo
├── grid-pattern.svg        # Background patterns
├── abstract-clip-art-icons_1197721-52781.jpg
├── Far_4K_Motion_Background_Loop.mp4  # Background video
├── file.svg               # Icon assets
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg
```

**Access in code:**
```typescript
<Image src="/logo.png" alt="Logo" width={200} height={50} />
<video src="/Far_4K_Motion_Background_Loop.mp4" autoPlay loop />
```

---

## ⚙️ Configuration Files

### **package.json**

```json
{
  "name": "uae-digital-fresh",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev --turbopack",    // Dev with Turbopack
    "build": "next build",             // Production build
    "start": "next start",             // Production server
    "lint": "next lint"                // ESLint
  }
}
```

**Key Dependencies:**
- **Next.js 15.3.3** - Framework
- **React 19.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3** - Styling
- **Framer Motion 12.16** - Animations
- **GraphQL & graphql-request** - API queries
- **next-intl 4.3** - Internationalization
- **react-hook-form 7.59** - Form management
- **EmailJS Browser 4.4** - Email service
- **date-fns 4.1** - Date utilities
- **react-icons 5.5** - Icon library
- **GSAP 3.13** - Advanced animations
- **Three.js & React Three Fiber** - 3D graphics
- **react-countup 6.5** - Animated counters

### **next.config.js**

Key configurations:

```javascript
{
  // Image optimization
  images: {
    remotePatterns: [
      { hostname: 'api.uaedigitalsolution.agency' },
      { hostname: 'images.unsplash.com' }
    ]
  },
  
  // ESLint disabled during builds
  eslint: { ignoreDuringBuilds: true },
  
  // Turbopack configuration
  turbopack: { /* SVG loader rules */ },
  
  // CORS headers for API routes
  headers: [/* CORS configuration */],
  
  // Standalone build for deployment
  output: 'standalone'
}
```

### **tsconfig.json**

TypeScript configuration:

```json
{
  "compilerOptions": {
    "strict": true,              // Strict type checking
    "target": "ES2017",          // ES2017 target
    "module": "esnext",          // ESNext modules
    "jsx": "preserve",           // Preserve JSX for Next.js
    "paths": {
      "@/*": ["./*"]             // Path alias (@/)
    }
  }
}
```

**Path Alias:**
- `@/` maps to project root
- Example: `import { Button } from '@/components/Button'`

### **tailwind.config.ts**

Tailwind CSS configuration with custom design system (colors, spacing, typography).

---

## 🗂️ Data Flow Architecture

### Content Management Flow

```
WordPress (Headless CMS)
         ↓
   WPGraphQL API
         ↓
app/api/wordpress/* (Proxy Routes)
         ↓
   lib/api.ts (Client)
         ↓
Server Components (Fetch Data)
         ↓
  Component Rendering
         ↓
     HTML Response
```

### Form Submission Flow

```
User Interaction
      ↓
BookingForm / ContactForm (Client Component)
      ↓
app/api/contact/route.ts
      ↓
EmailJS Service
      ↓
Email Sent + Response
```

---

## 🎭 Component Rendering Strategy

### Server Components (Default)
Most components are **Server Components**:
- `app/page.tsx` - Homepage
- `app/services/page.tsx` - Services list
- `app/cases/[slug]/page.tsx` - Case detail
- All layout components

**Benefits:**
- Zero JavaScript to client
- Direct data fetching
- SEO-friendly
- Fast initial load

### Client Components ('use client')
Components with interactivity:
- `components/booking/BookingForm.tsx` - Forms with state
- `components/booking/Calendar.tsx` - Interactive calendar
- `components/ChatWidget.tsx` - Chat widget with events
- Any component using hooks (useState, useEffect)

**When to use:**
- React hooks needed
- Event handlers (onClick, onChange)
- Browser APIs (window, localStorage)
- Framer Motion animations

---

## 🔄 Data Fetching Patterns

### Pattern 1: Server Component Direct Fetch
```typescript
// app/services/page.tsx
export default async function ServicesPage() {
  const services = await getServices() // Direct fetch
  return <ServicesList services={services} />
}
```

### Pattern 2: API Route + Client Fetch
```typescript
// app/api/services/route.ts
export async function GET() {
  const services = await fetchFromWordPress()
  return NextResponse.json(services)
}

// Client component
const { data } = await fetch('/api/services')
```

### Pattern 3: GraphQL Fetch
```typescript
// lib/api.ts
const query = `
  query GetServices {
    services {
      title
      description
    }
  }
`
const data = await fetchAPI(query)
```

---

## 🚀 Development Workflow

### Local Development
```bash
# Start dev server with Turbopack
npm run dev

# Access at http://localhost:3000

# Hot reload enabled
# TypeScript checking in real-time
```

### Building for Production
```bash
# Type check
tsc --noEmit

# Build
npm run build

# Test production build
npm run start
```

### Deployment
```bash
# Build output: standalone
# Optimized for Docker/Vercel/Netlify
npm run build
```

---

## 📊 Project Statistics

**Total Structure:**
- **8 main routes** (about, services, cases, solutions, tools, contact, booking, etc.)
- **13+ API endpoints** (WordPress integration, contact, data fetching)
- **20+ components** (sections, features, utilities)
- **3 library modules** (api, wordpress, emailjs)
- **2 languages** (English, Arabic)

**Technology Stack:**
- **Framework:** Next.js 15.3 with App Router
- **Frontend:** React 19, TypeScript 5
- **Styling:** Tailwind CSS 3, Framer Motion
- **CMS:** Headless WordPress with GraphQL
- **3D Graphics:** Three.js, React Three Fiber
- **Forms:** React Hook Form
- **Internationalization:** next-intl
- **Deployment:** Standalone build (Docker-ready)

---

## 🎯 Key Features

### Implemented Features
✅ **Headless WordPress Integration** - WPGraphQL API  
✅ **Multi-language Support** - English & Arabic (next-intl)  
✅ **Dynamic Routing** - Services, Cases, Solutions, Tools  
✅ **Contact & Booking System** - EmailJS integration  
✅ **API Proxy Layer** - WordPress data transformation  
✅ **Responsive Design** - Mobile-first Tailwind CSS  
✅ **Server Components** - Optimized performance  
✅ **3D Graphics Support** - Three.js integration  
✅ **Chat Widget** - Bodylab integration  
✅ **SEO Optimization** - Metadata API, Open Graph  

### Architectural Highlights
- **Standalone Build** - Docker/containerization ready
- **Turbopack** - Fast development builds
- **Path Aliases** - Clean imports with `@/`
- **TypeScript Strict Mode** - Type safety
- **CORS Headers** - Configured for API routes
- **Image Optimization** - Remote patterns for CMS images
- **Error Handling** - Error boundaries and not-found pages

---

## 📝 File Naming Conventions

- **Pages:** `page.tsx` (Next.js convention)
- **API Routes:** `route.ts` (Next.js convention)
- **Components:** `PascalCase.tsx` (e.g., `BookingForm.tsx`)
- **Utilities:** `camelCase.ts` (e.g., `api.ts`)
- **Dynamic Routes:** `[param]` (e.g., `[slug]`)
- **Catch-all Routes:** `[...param]` (e.g., `[...path]`)

---

## 🔗 Related Documentation

- [Next.js Guide](./NEXTJS_GUIDE.md) - Next.js patterns
- [React Guide](./REACT_GUIDE.md) - React patterns
- [TypeScript Guide](./TYPESCRIPT_GUIDE.md) - TypeScript usage
- [Architecture](./ARCHITECTURE.md) - System architecture
- [Development Guide](./DEVELOPMENT.md) - Development workflow
- [Components Guide](./COMPONENTS.md) - Component library

---

## 📞 Quick Reference

### Path Aliases
```typescript
@/components/Header       → components/Header.tsx
@/lib/api                → lib/api.ts
@/app/services/page      → app/services/page.tsx
```

### Important Files
- Configuration: `next.config.js`, `tsconfig.json`, `tailwind.config.ts`
- Entry point: `app/layout.tsx`, `app/page.tsx`
- API client: `lib/api.ts`
- Styles: `app/globals.css`

### Environment Variables
```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.example.com/graphql
NEXT_PUBLIC_WORDPRESS_URL=https://api.example.com
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=public_key
```

---

**Last Updated:** October 2025  
**Project Version:** 0.1.0  
**Next.js Version:** 15.3.3

