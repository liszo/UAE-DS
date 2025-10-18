# Next.js Guide for UAE Digital Agency

## Overview
This project uses **Next.js 14/15 with App Router** for optimal performance, SEO, and developer experience. This guide covers Next.js best practices specific to our agency website.

---

## Table of Contents
1. [App Router Fundamentals](#app-router-fundamentals)
2. [Server vs Client Components](#server-vs-client-components)
3. [Data Fetching](#data-fetching)
4. [Routing & Navigation](#routing--navigation)
5. [Image Optimization](#image-optimization)
6. [Metadata & SEO](#metadata--seo)
7. [Performance Optimization](#performance-optimization)
8. [API Routes](#api-routes)

---

## App Router Fundamentals

### File-Based Routing
```
app/
├── page.tsx              # Homepage (/)
├── layout.tsx            # Root layout
├── about/
│   └── page.tsx         # About page (/about)
├── services/
│   ├── page.tsx         # Services list (/services)
│   └── [slug]/
│       └── page.tsx     # Dynamic service (/services/web-development)
└── api/
    └── contact/
        └── route.ts     # API endpoint (/api/contact)
```

### Special Files
- **`layout.tsx`** - Shared UI for segments (persists across navigation)
- **`page.tsx`** - Unique page content (makes route publicly accessible)
- **`loading.tsx`** - Loading UI with Suspense
- **`error.tsx`** - Error UI with error boundaries
- **`not-found.tsx`** - 404 UI

---

## Server vs Client Components

### Default to Server Components
```typescript
// ✅ Server Component (default)
// app/services/page.tsx
export default async function ServicesPage() {
  const services = await getServices() // Direct data fetching
  
  return (
    <div className="container">
      <h1>Our Services</h1>
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
```

### Client Components - Use Only When Needed
Add `'use client'` directive only for:
- **React Hooks**: `useState`, `useEffect`, `useContext`
- **Event Handlers**: `onClick`, `onChange`, `onSubmit`
- **Browser APIs**: `window`, `document`, `localStorage`
- **Framer Motion**: Animations and interactions
- **Third-party libraries**: That require client-side

```typescript
// ✅ Client Component (when necessary)
// components/booking/BookingForm.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  
  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Form content */}
    </motion.form>
  )
}
```

### Composition Pattern
Keep interactivity isolated to minimize client JavaScript:

```typescript
// ✅ Server Component with Client Island
// app/services/[slug]/page.tsx
import { ServiceDetails } from '@/components/ServiceDetails' // Server
import { ContactButton } from '@/components/ContactButton' // Client

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug)
  
  return (
    <div>
      <ServiceDetails service={service} /> {/* Server Component */}
      <ContactButton /> {/* Client Component - only this is interactive */}
    </div>
  )
}
```

---

## Data Fetching

### Server Components (Preferred)
Fetch data directly in Server Components using async/await:

```typescript
// ✅ Direct data fetching in Server Components
export default async function CasesPage() {
  // Parallel data fetching
  const [cases, categories] = await Promise.all([
    getCases(),
    getCategories()
  ])
  
  return <CasesList cases={cases} categories={categories} />
}
```

### Incremental Static Regeneration (ISR)
Use revalidation for dynamic content:

```typescript
// Revalidate every hour
export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getPosts()
  return <PostsList posts={posts} />
}
```

### Dynamic Rendering
Force dynamic rendering when needed:

```typescript
// Force dynamic
export const dynamic = 'force-dynamic'

// Or use dynamic functions
import { cookies, headers } from 'next/headers'

export default async function ProfilePage() {
  const cookieStore = cookies()
  const token = cookieStore.get('session')
  
  return <Profile token={token} />
}
```

### Caching Strategies
```typescript
// No caching
fetch(url, { cache: 'no-store' })

// Cache for 1 hour
fetch(url, { next: { revalidate: 3600 } })

// Cache forever (default)
fetch(url, { cache: 'force-cache' })
```

---

## Routing & Navigation

### Link Component
Always use Next.js Link for client-side navigation:

```typescript
import Link from 'next/link'

// ✅ Correct
<Link href="/services" className="button">
  View Services
</Link>

// ❌ Don't use <a> for internal links
<a href="/services">View Services</a>
```

### useRouter Hook (Client Components Only)
```typescript
'use client'

import { useRouter } from 'next/navigation'

export function NavigationButton() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/contact')
    // router.back()
    // router.refresh()
  }
  
  return <button onClick={handleClick}>Contact Us</button>
}
```

### Route Groups
Organize routes without affecting URL:

```
app/
├── (marketing)/
│   ├── layout.tsx       # Marketing layout
│   ├── page.tsx         # Homepage
│   └── about/
│       └── page.tsx     # About page
└── (dashboard)/
    ├── layout.tsx       # Dashboard layout
    └── profile/
        └── page.tsx     # Profile page
```

### Dynamic Routes
```typescript
// app/services/[slug]/page.tsx
interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ServicePage({ params, searchParams }: PageProps) {
  const service = await getService(params.slug)
  return <ServiceDetail service={service} />
}

// Generate static paths (optional)
export async function generateStaticParams() {
  const services = await getServices()
  
  return services.map((service) => ({
    slug: service.slug,
  }))
}
```

---

## Image Optimization

### Always Use next/image
```typescript
import Image from 'next/image'

// ✅ Correct - Local image
<Image
  src="/logo.png"
  alt="UAE Digital Agency Logo"
  width={200}
  height={50}
  priority // Use for above-fold images
/>

// ✅ Correct - Remote image
<Image
  src="https://cms.example.com/image.jpg"
  alt="Project showcase"
  width={800}
  height={600}
  className="rounded-lg"
/>

// ✅ Correct - Fill container
<div className="relative h-96 w-full">
  <Image
    src="/hero-bg.jpg"
    alt="Hero background"
    fill
    className="object-cover"
    priority
  />
</div>
```

### Image Configuration
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cms.example.com', 'wordpress.uae-digital.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

### Best Practices
- Use `priority` prop for above-the-fold images (LCP)
- Specify `width` and `height` to prevent layout shift (CLS)
- Use `fill` for responsive images with unknown dimensions
- Always include descriptive `alt` text

---

## Metadata & SEO

### Static Metadata
```typescript
// app/services/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | UAE Digital Agency',
  description: 'Comprehensive digital solutions for your business growth',
  openGraph: {
    title: 'Our Services',
    description: 'Comprehensive digital solutions',
    images: ['/og-services.jpg'],
  },
}

export default function ServicesPage() {
  return <div>Services content</div>
}
```

### Dynamic Metadata
```typescript
// app/services/[slug]/page.tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getService(params.slug)
  
  return {
    title: `${service.title} | UAE Digital Agency`,
    description: service.excerpt,
    openGraph: {
      title: service.title,
      description: service.excerpt,
      images: [service.featuredImage],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.excerpt,
      images: [service.featuredImage],
    },
  }
}
```

### JSON-LD Structured Data
```typescript
export default function ServicePage({ service }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'UAE Digital Agency',
    },
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>{/* Service content */}</div>
    </>
  )
}
```

---

## Performance Optimization

### Code Splitting with Dynamic Imports
```typescript
import dynamic from 'next/dynamic'

// Lazy load heavy components
const BookingForm = dynamic(() => import('@/components/booking/BookingForm'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Disable SSR for client-only components
})

export default function BookingPage() {
  return (
    <div>
      <h1>Book a Consultation</h1>
      <BookingForm />
    </div>
  )
}
```

### Suspense Boundaries
```typescript
import { Suspense } from 'react'

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Show fallback while loading */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics />
      </Suspense>
      
      <Suspense fallback={<ChartSkeleton />}>
        <Chart />
      </Suspense>
    </div>
  )
}
```

### Streaming with loading.tsx
```typescript
// app/cases/loading.tsx
export default function Loading() {
  return (
    <div className="container py-24">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg" />
            <div className="mt-4 h-6 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Font Optimization
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

---

## API Routes

### Route Handlers (App Router)
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Process contact form
    const result = await sendEmail(body)
    
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  
  const data = await fetchData(query)
  
  return NextResponse.json(data)
}
```

### Server Actions (Recommended for Forms)
```typescript
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  
  try {
    await saveToDatabase({ name, email })
    revalidatePath('/contact')
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to submit form' }
  }
}
```

```typescript
// components/ContactForm.tsx
'use client'

import { submitContactForm } from '@/app/actions'

export function ContactForm() {
  return (
    <form action={submitContactForm}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
    </form>
  )
}
```

---

## Best Practices Checklist

### ✅ Do's
- ✅ Use Server Components by default
- ✅ Fetch data in Server Components
- ✅ Use `next/image` for all images
- ✅ Use `next/link` for navigation
- ✅ Generate metadata with generateMetadata()
- ✅ Use ISR with appropriate revalidate times
- ✅ Lazy load heavy components
- ✅ Add loading and error states
- ✅ Use route groups for organization
- ✅ Optimize fonts with next/font

### ❌ Don'ts
- ❌ Don't add 'use client' unnecessarily
- ❌ Don't use useEffect for data fetching
- ❌ Don't use <img> tags
- ❌ Don't use <a> for internal links
- ❌ Don't fetch data in Client Components
- ❌ Don't forget to add error boundaries
- ❌ Don't skip image optimization
- ❌ Don't ignore TypeScript errors
- ❌ Don't use Pages Router conventions
- ❌ Don't bypass Next.js caching without reason

---

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

**Last Updated**: October 2025

