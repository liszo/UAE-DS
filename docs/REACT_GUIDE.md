# React Guide for UAE Digital Agency

## Overview
This project uses **React 18+** with Next.js App Router. This guide covers React patterns, hooks, and best practices specific to our agency website.

---

## Table of Contents
1. [Component Patterns](#component-patterns)
2. [React Hooks](#react-hooks)
3. [State Management](#state-management)
4. [Performance Optimization](#performance-optimization)
5. [Forms & Validation](#forms--validation)
6. [Error Handling](#error-handling)
7. [TypeScript with React](#typescript-with-react)

---

## Component Patterns

### Functional Components
Always use functional components with TypeScript:

```typescript
// ✅ Correct - Functional component with explicit types
interface ServiceCardProps {
  title: string
  description: string
  icon: string
  href: string
}

export function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  return (
    <div className="rounded-lg border p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <Link href={href} className="mt-4 inline-block">
        Learn More
      </Link>
    </div>
  )
}

// ❌ Avoid - Class components
class ServiceCard extends React.Component {
  render() {
    return <div>...</div>
  }
}
```

### Component Composition
Build complex UIs from simple components:

```typescript
// Small, focused components
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-lg border bg-white shadow-sm', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children }: CardHeaderProps) {
  return <div className="border-b p-6">{children}</div>
}

export function CardContent({ children }: CardContentProps) {
  return <div className="p-6">{children}</div>
}

// Compose them together
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card>
      <CardHeader>
        <h3>{service.title}</h3>
      </CardHeader>
      <CardContent>
        <p>{service.description}</p>
      </CardContent>
    </Card>
  )
}
```

### Render Props Pattern
For flexible, reusable logic:

```typescript
interface DataFetcherProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])
  
  return <>{children(data, loading, error)}</>
}

// Usage
<DataFetcher<Service[]> url="/api/services">
  {(services, loading, error) => {
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorMessage error={error} />
    if (!services) return null
    return <ServiceList services={services} />
  }}
</DataFetcher>
```

### Compound Components Pattern
For related components that work together:

```typescript
interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export function Tabs({ children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

export function TabList({ children }: TabListProps) {
  return <div className="flex gap-2 border-b">{children}</div>
}

export function Tab({ value, children }: TabProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')
  
  const { activeTab, setActiveTab } = context
  const isActive = activeTab === value
  
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn('px-4 py-2', isActive && 'border-b-2 border-blue-600')}
    >
      {children}
    </button>
  )
}

export function TabPanel({ value, children }: TabPanelProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabPanel must be used within Tabs')
  
  const { activeTab } = context
  if (activeTab !== value) return null
  
  return <div className="p-4">{children}</div>
}

// Usage
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

## React Hooks

### useState
Manage component state:

```typescript
'use client'

import { useState } from 'react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      await submitForm(formData)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setError('Failed to submit form')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

### useEffect
Handle side effects:

```typescript
'use client'

import { useState, useEffect } from 'react'

export function LiveStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  
  useEffect(() => {
    // Fetch initial data
    fetchStats().then(setStats)
    
    // Set up polling
    const interval = setInterval(() => {
      fetchStats().then(setStats)
    }, 30000) // Every 30 seconds
    
    // Cleanup
    return () => clearInterval(interval)
  }, []) // Empty deps - run once on mount
  
  return <StatsDisplay stats={stats} />
}

// ❌ Common mistake - missing dependencies
useEffect(() => {
  fetchData(userId) // userId should be in deps
}, []) // Missing userId

// ✅ Correct
useEffect(() => {
  fetchData(userId)
}, [userId])
```

### useRef
Access DOM elements or persist values:

```typescript
'use client'

import { useRef, useEffect } from 'react'

export function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const handlePlay = () => {
    videoRef.current?.play()
  }
  
  const handlePause = () => {
    videoRef.current?.pause()
  }
  
  return (
    <div>
      <video ref={videoRef} src={src} />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  )
}

// Persist value without triggering re-render
export function ScrollTracker() {
  const previousScrollY = useRef(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > previousScrollY.current
      
      // Do something based on scroll direction
      console.log(isScrollingDown ? 'Scrolling down' : 'Scrolling up')
      
      previousScrollY.current = currentScrollY
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return null
}
```

### useMemo
Memoize expensive computations:

```typescript
'use client'

import { useMemo } from 'react'

export function CasesList({ cases, filters }: CasesListProps) {
  // ✅ Memoize expensive filtering/sorting
  const filteredCases = useMemo(() => {
    return cases
      .filter(c => !filters.category || c.category === filters.category)
      .filter(c => !filters.search || c.title.includes(filters.search))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [cases, filters])
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredCases.map(case => (
        <CaseCard key={case.id} case={case} />
      ))}
    </div>
  )
}

// ❌ Don't memoize simple operations
const doubled = useMemo(() => value * 2, [value]) // Unnecessary

// ✅ Only memoize expensive operations
const processedData = useMemo(() => {
  return complexDataProcessing(largeDataset)
}, [largeDataset])
```

### useCallback
Memoize callback functions:

```typescript
'use client'

import { useState, useCallback } from 'react'

export function SearchableList({ items }: SearchableListProps) {
  const [query, setQuery] = useState('')
  
  // ✅ Memoize callback to prevent child re-renders
  const handleSearch = useCallback((value: string) => {
    setQuery(value)
    // Track analytics
    trackSearch(value)
  }, []) // No dependencies - function never changes
  
  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <ItemsList items={items} query={query} />
    </div>
  )
}

// Child component wrapped in React.memo won't re-render unnecessarily
const SearchInput = React.memo(({ onSearch }: SearchInputProps) => {
  return <input onChange={e => onSearch(e.target.value)} />
})
```

### Custom Hooks
Extract reusable logic:

```typescript
// hooks/useWindowSize.ts
'use client'

import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return windowSize
}

// Usage
export function ResponsiveComponent() {
  const { width } = useWindowSize()
  const isMobile = width < 768
  
  return <div>{isMobile ? <MobileView /> : <DesktopView />}</div>
}

// hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  return [storedValue, setValue] as const
}
```

---

## State Management

### Local State (useState)
For component-specific state:

```typescript
export function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}
```

### Context API
For shared state across components:

```typescript
// contexts/ThemeContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Usage in any component
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

### URL State (Search Params)
For shareable state:

```typescript
'use client'

import { useSearchParams, useRouter } from 'next/navigation'

export function FilteredList() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const category = searchParams.get('category') || 'all'
  
  const setCategory = (newCategory: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('category', newCategory)
    router.push(`?${params.toString()}`)
  }
  
  return (
    <div>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="web">Web Development</option>
        <option value="mobile">Mobile Apps</option>
      </select>
    </div>
  )
}
```

---

## Performance Optimization

### React.memo
Prevent unnecessary re-renders:

```typescript
import { memo } from 'react'

// ✅ Memoize expensive components
export const CaseCard = memo(function CaseCard({ case }: CaseCardProps) {
  return (
    <div className="case-card">
      <Image src={case.image} alt={case.title} width={400} height={300} />
      <h3>{case.title}</h3>
      <p>{case.description}</p>
    </div>
  )
})

// With custom comparison
export const ExpensiveComponent = memo(
  function ExpensiveComponent({ data }: Props) {
    return <div>{/* Complex rendering */}</div>
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.data.id === nextProps.data.id
  }
)
```

### Code Splitting
Lazy load components:

```typescript
import { lazy, Suspense } from 'react'

// Lazy load heavy components
const HeavyChart = lazy(() => import('@/components/HeavyChart'))
const VideoPlayer = lazy(() => import('@/components/VideoPlayer'))

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>
      
      <Suspense fallback={<div>Loading video...</div>}>
        <VideoPlayer />
      </Suspense>
    </div>
  )
}
```

### Virtualization
For long lists:

```typescript
'use client'

import { useWindowVirtualizer } from '@tanstack/react-virtual'

export function VirtualList({ items }: VirtualListProps) {
  const virtualizer = useWindowVirtualizer({
    count: items.length,
    estimateSize: () => 100,
    overscan: 5,
  })
  
  return (
    <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
      {virtualizer.getVirtualItems().map(virtualRow => (
        <div
          key={virtualRow.index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
          }}
        >
          <ListItem item={items[virtualRow.index]} />
        </div>
      ))}
    </div>
  )
}
```

---

## Forms & Validation

### React Hook Form + Zod
```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })
  
  const onSubmit = async (data: ContactFormData) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      reset()
    } catch (error) {
      console.error('Failed to submit form:', error)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name')}
          className="w-full rounded border px-4 py-2"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full rounded border px-4 py-2"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-600 px-6 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

---

## Error Handling

### Error Boundaries
```typescript
'use client'

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-900">
              Something went wrong
            </h2>
            <p className="mt-2 text-red-700">{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
            >
              Try again
            </button>
          </div>
        )
      )
    }
    
    return this.props.children
  }
}

// Usage
<ErrorBoundary>
  <SomeComponentThatMightError />
</ErrorBoundary>
```

---

## TypeScript with React

### Component Props
```typescript
// Basic props
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

// Extending HTML attributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

// Generic components
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string | number
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}
```

---

## Best Practices Checklist

### ✅ Do's
- ✅ Use functional components
- ✅ Extract reusable logic into custom hooks
- ✅ Memoize expensive computations with useMemo
- ✅ Use React.memo for expensive components
- ✅ Properly type all props and state
- ✅ Clean up effects (return cleanup function)
- ✅ Use key prop correctly in lists
- ✅ Handle loading and error states
- ✅ Use composition over prop drilling
- ✅ Keep components small and focused

### ❌ Don'ts
- ❌ Don't mutate state directly
- ❌ Don't use index as key in dynamic lists
- ❌ Don't forget dependencies in useEffect
- ❌ Don't over-optimize prematurely
- ❌ Don't create many unnecessary contexts
- ❌ Don't use useEffect for data fetching (use Server Components)
- ❌ Don't nest components definitions
- ❌ Don't use inline function definitions in JSX (for memoized components)
- ❌ Don't forget to handle edge cases
- ❌ Don't ignore console warnings

---

**Last Updated**: October 2025

