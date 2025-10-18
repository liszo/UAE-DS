# Architecture Guide - UAE Digital Agency

## Overview
This document outlines the architecture, design decisions, and technical structure of the UAE Digital Agency website. The project is built with Next.js 14/15 App Router, headless WordPress CMS, and modern frontend technologies.

---

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Project Structure](#project-structure)
3. [Data Flow](#data-flow)
4. [Rendering Strategy](#rendering-strategy)
5. [API Architecture](#api-architecture)
6. [State Management](#state-management)
7. [Performance Strategy](#performance-strategy)
8. [Security](#security)

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │          Next.js Frontend (React 18+)                 │  │
│  │  - Server Components (SSR/ISR)                        │  │
│  │  - Client Components (Interactivity)                  │  │
│  │  - Framer Motion (Animations)                         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER (Vercel)                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  App Router (Next.js 14/15)                           │  │
│  │  - Route Handlers (/api/*)                            │  │
│  │  - Server Actions                                     │  │
│  │  - ISR/SSR Pages                                      │  │
│  │  - Edge Functions                                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                    HEADLESS CMS (WordPress)                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  WPGraphQL API                                        │  │
│  │  - Services, Cases, Posts                             │  │
│  │  - Solutions, Tools                                   │  │
│  │  - Taxonomies, Custom Fields                          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│  - EmailJS (Contact forms)                                   │
│  - Bodylab Chat (Support widget)                             │
│  - Analytics                                                 │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend
- **Next.js 14/15**: React framework with App Router
- **React 18+**: UI library with Server Components
- **TypeScript**: Type-safe development
- **Tailwind CSS 4.x**: Utility-first CSS framework
- **Framer Motion**: Animation library

#### Forms & Validation
- **React Hook Form**: Performant form library
- **Zod**: Schema validation

#### CMS & Data
- **WordPress**: Headless CMS (backend only)
- **WPGraphQL**: GraphQL API for WordPress
- **REST API**: Custom endpoints for specialized data

#### Deployment & Hosting
- **Vercel**: Primary deployment platform (or Netlify)
- **Edge Functions**: For dynamic content
- **CDN**: Automatic asset optimization

---

## Project Structure

### Directory Organization

```
uae-digital-fresh/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── page.tsx             # Homepage
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   ├── services/
│   │   │   ├── page.tsx         # Services list
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Dynamic service page
│   │   ├── cases/               # Case studies
│   │   ├── solutions/           # Digital solutions
│   │   ├── tools/               # Tools & technologies
│   │   ├── contact/             # Contact page
│   │   └── booking/             # Booking page
│   ├── api/                     # API route handlers
│   │   ├── contact/
│   │   │   └── route.ts        # Contact form endpoint
│   │   ├── services/
│   │   │   └── route.ts        # Services API
│   │   └── wordpress/          # WordPress proxy routes
│   ├── layout.tsx               # Root layout
│   ├── error.tsx                # Error boundary
│   ├── not-found.tsx            # 404 page
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── sections/                # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Cases.tsx
│   │   └── CTA.tsx
│   ├── booking/                 # Booking-specific components
│   │   ├── BookingForm.tsx
│   │   ├── Calendar.tsx
│   │   └── TimeSlots.tsx
│   ├── home/                    # Homepage components
│   │   └── HeroSection.tsx
│   ├── Header.tsx               # Site header
│   ├── Footer.tsx               # Site footer
│   └── LoadingSpinner.tsx       # Loading states
│
├── lib/                          # Utilities & helpers
│   ├── api.ts                   # API client functions
│   ├── wordpress.ts             # WordPress integration
│   ├── emailjs-contact.ts       # Email service
│   └── utils.ts                 # Utility functions
│
├── types/                        # TypeScript definitions
│   ├── service.ts
│   ├── case.ts
│   ├── api.ts
│   └── common.ts
│
├── hooks/                        # Custom React hooks
│   ├── useWindowSize.ts
│   ├── useScrollPosition.ts
│   └── useMediaQuery.ts
│
├── messages/                     # i18n translations
│   ├── en.json                  # English
│   └── ar.json                  # Arabic
│
├── public/                       # Static assets
│   ├── images/
│   ├── videos/
│   └── icons/
│
├── docs/                         # Documentation
│   ├── NEXTJS_GUIDE.md
│   ├── REACT_GUIDE.md
│   ├── TAILWIND_GUIDE.md
│   ├── TYPESCRIPT_GUIDE.md
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT.md
│   ├── COMPONENTS.md
│   └── CONTRIBUTING.md
│
├── .env.local                    # Environment variables
├── .gitignore
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
└── README.md
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `ServiceCard.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Routes**: kebab-case folders, `page.tsx` files
- **Types**: Singular PascalCase (e.g., `service.ts` exports `Service`)
- **Constants**: UPPER_SNAKE_CASE

---

## Data Flow

### Content Delivery Flow

```
1. User Request
   ↓
2. Next.js Router (App Router)
   ↓
3. Server Component (SSR/ISR)
   ↓
4. Data Fetching Layer (lib/api.ts)
   ↓
5. WordPress API / Route Handlers
   ↓
6. Data Transformation
   ↓
7. Component Rendering
   ↓
8. HTML Response + Client Hydration
   ↓
9. Client Interactivity (if Client Component)
```

### Example: Service Page Flow

```typescript
// 1. User visits /services/web-development
// 2. Next.js matches route: app/services/[slug]/page.tsx

// 3. Server Component fetches data
export default async function ServicePage({ params }: PageProps) {
  // 4. Fetch from WordPress via API
  const service = await getService(params.slug) // lib/api.ts
  
  // 5. Generate metadata for SEO
  const metadata = generateMetadata({ params })
  
  // 6. Render Server Component
  return (
    <div>
      <ServiceHero service={service} />
      <ServiceContent service={service} />
      <ContactCTA /> {/* Client Component for interactivity */}
    </div>
  )
}

// 7. HTML sent to browser with minimal JavaScript
// 8. Client-side hydration for interactive components
```

---

## Rendering Strategy

### Rendering Modes by Route

| Route | Strategy | Reason |
|-------|----------|--------|
| Homepage (`/`) | ISR (revalidate: 3600s) | Frequent updates, good performance |
| Services List (`/services`) | ISR (revalidate: 3600s) | Dynamic but cacheable |
| Service Detail (`/services/[slug]`) | SSG + ISR | Pre-render common pages, ISR for new |
| Cases (`/cases`) | ISR (revalidate: 3600s) | Portfolio updates regularly |
| Case Detail (`/cases/[slug]`) | SSG + ISR | Static case studies with updates |
| About (`/about`) | SSG | Rarely changes |
| Contact (`/contact`) | SSR | Dynamic (user-specific) |
| Booking (`/booking`) | SSR | Highly dynamic |
| API Routes | Dynamic | Always fresh data |

### Server vs Client Components

#### Server Components (Default)
```typescript
// app/services/page.tsx
// ✅ Server Component - No 'use client'
export default async function ServicesPage() {
  const services = await getServices() // Direct data fetching
  
  return (
    <div>
      <h1>Our Services</h1>
      <ServiceGrid services={services} />
    </div>
  )
}
```

#### Client Components (When Needed)
```typescript
// components/ContactForm.tsx
// ✅ Client Component - Uses hooks and interactivity
'use client'

import { useState } from 'react'

export function ContactForm() {
  const [formData, setFormData] = useState({ ... })
  // Interactive form logic
  return <form>...</form>
}
```

#### Composition Pattern
```typescript
// ✅ Server Component with Client Island
// app/services/[slug]/page.tsx
import { ServiceDetails } from '@/components/ServiceDetails' // Server
import { BookingButton } from '@/components/BookingButton' // Client

export default async function ServicePage({ params }) {
  const service = await getService(params.slug)
  
  return (
    <div>
      <ServiceDetails service={service} /> {/* Server */}
      <BookingButton serviceId={service.id} /> {/* Client only */}
    </div>
  )
}
```

---

## API Architecture

### Route Handlers

#### Services API
```typescript
// app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const services = await fetchServicesFromWordPress()
    
    return NextResponse.json({
      success: true,
      data: services,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}
```

#### Contact API
```typescript
// app/api/contact/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Validate input
  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { success: false, errors: result.error.errors },
      { status: 400 }
    )
  }
  
  // Send email via EmailJS
  await sendEmail(result.data)
  
  return NextResponse.json({ success: true })
}
```

### WordPress Proxy Routes
```typescript
// app/api/wordpress/[...path]/route.ts
// Proxy requests to WordPress backend
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const wpUrl = `${process.env.WORDPRESS_URL}/${params.path.join('/')}`
  const response = await fetch(wpUrl)
  const data = await response.json()
  
  return NextResponse.json(data)
}
```

### API Client Layer
```typescript
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${API_BASE}/api/services`, {
    next: { revalidate: 3600 }, // ISR - revalidate every hour
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch services')
  }
  
  const data = await res.json()
  return data.data
}

export async function getService(slug: string): Promise<Service> {
  const res = await fetch(`${API_BASE}/api/services/${slug}`, {
    next: { revalidate: 3600 },
  })
  
  if (!res.ok) {
    throw new Error(`Service not found: ${slug}`)
  }
  
  const data = await res.json()
  return data.data
}
```

---

## State Management

### State Management Strategy

#### 1. Server State (Default)
Use Server Components for data that doesn't need client interactivity:
```typescript
// ✅ No state management needed
async function ServicesPage() {
  const services = await getServices()
  return <ServicesList services={services} />
}
```

#### 2. URL State (Search Params)
For shareable, bookmarkable state:
```typescript
'use client'

export function FilteredCases() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || 'all'
  
  // State lives in URL: /cases?category=web
}
```

#### 3. Local Component State (useState)
For component-specific UI state:
```typescript
'use client'

export function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  // State lives in component only
}
```

#### 4. Context (For Shared State)
For state shared across multiple components:
```typescript
'use client'

export const ThemeContext = createContext<ThemeContextType>(...)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

#### 5. Form State (React Hook Form)
For complex form management:
```typescript
'use client'

export function ContactForm() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  // Form state managed by React Hook Form
}
```

### State Location Decision Tree
```
Is the data from server?
  ├─ Yes → Use Server Components (no state)
  └─ No → Does it need to be shared?
      ├─ Yes → Does it need to be in URL?
      │   ├─ Yes → URL State (searchParams)
      │   └─ No → Context or props
      └─ No → Local state (useState)
```

---

## Performance Strategy

### Optimization Techniques

#### 1. Image Optimization
```typescript
import Image from 'next/image'

// ✅ Always use next/image
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority // For above-fold images
/>
```

#### 2. Code Splitting
```typescript
import dynamic from 'next/dynamic'

// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // Client-only if needed
})
```

#### 3. Font Optimization
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default function RootLayout({ children }) {
  return <html className={inter.className}>{children}</html>
}
```

#### 4. Caching Strategy
```typescript
// ISR with revalidation
export const revalidate = 3600 // 1 hour

// Per-request caching
fetch(url, { next: { revalidate: 3600 } })

// No caching for dynamic data
fetch(url, { cache: 'no-store' })
```

#### 5. Parallel Data Fetching
```typescript
async function Page() {
  // ✅ Fetch in parallel
  const [services, cases, testimonials] = await Promise.all([
    getServices(),
    getCases(),
    getTestimonials(),
  ])
}
```

### Performance Metrics Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTI** (Time to Interactive): < 3.5s
- **Bundle Size**: < 200KB initial JavaScript

---

## Security

### Security Measures

#### 1. Environment Variables
```bash
# .env.local
WORDPRESS_URL=https://cms.example.com
WORDPRESS_API_KEY=xxxxx
EMAILJS_SERVICE_ID=xxxxx
NEXT_PUBLIC_API_URL=https://api.example.com

# Only NEXT_PUBLIC_* variables are exposed to browser
```

#### 2. Input Validation
```typescript
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

// Validate all user input
const result = contactSchema.safeParse(input)
```

#### 3. API Route Protection
```typescript
// app/api/admin/route.ts
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  const headersList = headers()
  const apiKey = headersList.get('x-api-key')
  
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  // Process request
}
```

#### 4. Content Security Policy
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

#### 5. Rate Limiting
```typescript
// lib/rate-limit.ts
import { RateLimiter } from 'limiter'

const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute',
})

export async function checkRateLimit() {
  const allowed = await limiter.removeTokens(1)
  if (!allowed) {
    throw new Error('Rate limit exceeded')
  }
}
```

---

## Design Patterns

### Component Patterns

#### Container-Presentational
```typescript
// Container (logic)
async function ServicesContainer() {
  const services = await getServices()
  return <ServicesList services={services} />
}

// Presentational (UI)
function ServicesList({ services }: { services: Service[] }) {
  return (
    <div className="grid">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
```

#### Compound Components
```typescript
<Tabs defaultTab="services">
  <TabList>
    <Tab value="services">Services</Tab>
    <Tab value="cases">Cases</Tab>
  </TabList>
  <TabPanel value="services">
    <ServicesList />
  </TabPanel>
  <TabPanel value="cases">
    <CasesList />
  </TabPanel>
</Tabs>
```

---

## Deployment Architecture

### Vercel Deployment

```
Git Push (main branch)
  ↓
Vercel Build Pipeline
  ├─ Install dependencies (npm ci)
  ├─ Type check (tsc)
  ├─ Build (next build)
  └─ Deploy to Edge Network
      ↓
  Edge Locations (Global CDN)
      ↓
  Users (Fast global access)
```

### Build Output
```
.next/
├── static/              # Static assets (hashed)
├── server/              # Server-side code
│   ├── app/            # App Router routes
│   └── chunks/         # Code-split chunks
└── cache/              # Build cache
```

---

## Monitoring & Analytics

### Performance Monitoring
- **Vercel Analytics**: Core Web Vitals
- **Real User Monitoring**: Track actual user performance
- **Error Tracking**: Log and monitor errors

### Logging Strategy
```typescript
// Development
console.log('Debug info')

// Production
if (process.env.NODE_ENV === 'production') {
  // Send to logging service
  logService.error(error)
}
```

---

## Future Considerations

### Scalability
- **Edge Functions**: Move more logic to edge
- **Database**: Add database for dynamic features
- **Authentication**: Add user authentication system
- **Real-time**: WebSocket for live features

### Internationalization
- Multi-language support (already structured with next-intl)
- RTL support for Arabic
- Currency and date localization

---

**Last Updated**: October 2025

