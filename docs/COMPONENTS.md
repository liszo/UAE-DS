# Components Guide - UAE Digital Agency

## Overview
This guide documents all reusable components in the UAE Digital Agency project. Each component includes usage examples, props documentation, and best practices.

---

## Table of Contents
1. [Component Structure](#component-structure)
2. [Layout Components](#layout-components)
3. [UI Components](#ui-components)
4. [Section Components](#section-components)
5. [Feature Components](#feature-components)
6. [Creating New Components](#creating-new-components)

---

## Component Structure

### Component Organization

```
components/
├── ui/                      # Reusable UI primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── ...
├── sections/                # Page sections
│   ├── Hero.tsx
│   ├── Services.tsx
│   └── ...
├── booking/                 # Feature-specific components
│   ├── BookingForm.tsx
│   ├── Calendar.tsx
│   └── TimeSlots.tsx
├── home/                    # Page-specific components
│   └── HeroSection.tsx
├── Header.tsx               # Global layout components
├── Footer.tsx
└── LoadingSpinner.tsx       # Utility components
```

### Component Anatomy

```typescript
// 1. Imports
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ComponentProps } from '@/types'

// 2. Type definitions
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
}

// 3. Component
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}: ButtonProps) {
  // 4. Logic and hooks
  const [isLoading, setIsLoading] = useState(false)
  
  // 5. Event handlers
  const handleClick = () => {
    if (onClick) onClick()
  }
  
  // 6. Render
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'rounded-lg font-medium transition-colors',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
      )}
    >
      {children}
    </button>
  )
}
```

---

## Layout Components

### Header

**Location**: `components/Header.tsx`

Global site navigation header.

```typescript
// Usage
import { Header } from '@/components/Header'

<Header />
```

**Features:**
- Responsive navigation
- Mobile menu toggle
- Logo and brand
- Navigation links
- CTA buttons

**Props:**
```typescript
interface HeaderProps {
  // Currently no props - uses global navigation config
}
```

### Footer

**Location**: `components/Footer.tsx`

Global site footer with links, contact info, and social media.

```typescript
// Usage
import { Footer } from '@/components/Footer'

<Footer />
```

**Features:**
- Company information
- Navigation links
- Social media links
- Copyright notice
- Newsletter signup (optional)

### Container

**Location**: `components/ui/Container.tsx` (create if not exists)

Wrapper component for consistent page width and padding.

```typescript
// Usage
import { Container } from '@/components/ui/Container'

<Container>
  <h1>Page Content</h1>
</Container>

// With custom max width
<Container maxWidth="4xl">
  <p>Narrow content</p>
</Container>
```

**Props:**
```typescript
interface ContainerProps {
  children: React.ReactNode
  maxWidth?: '2xl' | '4xl' | '6xl' | '7xl'
  className?: string
}
```

**Implementation:**
```typescript
export function Container({ 
  children, 
  maxWidth = '7xl',
  className 
}: ContainerProps) {
  return (
    <div className={cn(
      'mx-auto px-6 lg:px-8',
      maxWidth === '2xl' && 'max-w-2xl',
      maxWidth === '4xl' && 'max-w-4xl',
      maxWidth === '6xl' && 'max-w-6xl',
      maxWidth === '7xl' && 'max-w-7xl',
      className
    )}>
      {children}
    </div>
  )
}
```

---

## UI Components

### Button

**Location**: `components/ui/Button.tsx`

Primary button component with variants and sizes.

```typescript
// Usage
import { Button } from '@/components/ui/Button'

// Primary button
<Button onClick={handleClick}>Click Me</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>

// Large button
<Button size="lg">Get Started</Button>

// Disabled button
<Button disabled>Loading...</Button>

// With icon
<Button>
  <Icon className="mr-2" />
  Save Changes
</Button>
```

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  className?: string
}
```

**Variants:**
- `primary`: Blue background, white text
- `secondary`: Gray background, dark text
- `outline`: Transparent with border
- `ghost`: Transparent, hover effect only

### Card

**Location**: `components/ui/Card.tsx`

Container component for content cards.

```typescript
// Usage
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'

<Card>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Learn More</Button>
  </CardFooter>
</Card>
```

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean // Enable hover effect
}
```

**Implementation:**
```typescript
export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div className={cn(
      'rounded-lg border border-gray-200 bg-white shadow-sm',
      hover && 'transition-all hover:shadow-lg',
      className
    )}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: CardPartProps) {
  return (
    <div className={cn('border-b border-gray-200 p-6', className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }: CardPartProps) {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: CardPartProps) {
  return (
    <div className={cn('border-t border-gray-200 p-6', className)}>
      {children}
    </div>
  )
}
```

### Input

**Location**: `components/ui/Input.tsx`

Form input component with label and error states.

```typescript
// Usage
import { Input } from '@/components/ui/Input'

<Input
  label="Email Address"
  type="email"
  placeholder="john@example.com"
  error="Invalid email address"
/>
```

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
}
```

**Implementation:**
```typescript
export function Input({
  label,
  error,
  helperText,
  required,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        className={cn(
          'w-full rounded-lg border px-4 py-2 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
          error
            ? 'border-red-300 focus:ring-red-600'
            : 'border-gray-300 focus:border-blue-600',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}
```

### LoadingSpinner

**Location**: `components/LoadingSpinner.tsx`

Loading indicator component.

```typescript
// Usage
import { LoadingSpinner } from '@/components/LoadingSpinner'

<LoadingSpinner />
<LoadingSpinner size="lg" />
<LoadingSpinner text="Loading services..." />
```

**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}
```

**Implementation:**
```typescript
export function LoadingSpinner({ 
  size = 'md', 
  text,
  className 
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-gray-200 border-t-blue-600',
          size === 'sm' && 'h-6 w-6',
          size === 'md' && 'h-12 w-12',
          size === 'lg' && 'h-16 w-16',
        )}
      />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  )
}
```

---

## Section Components

### Hero

**Location**: `components/sections/Hero.tsx` or `components/Hero.tsx`

Hero section for landing pages.

```typescript
// Usage
import { Hero } from '@/components/Hero'

<Hero
  title="Transform Your Business"
  subtitle="Leading digital solutions provider in UAE"
  ctaText="Get Started"
  ctaHref="/contact"
  backgroundImage="/hero-bg.jpg"
/>
```

**Props:**
```typescript
interface HeroProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  backgroundImage?: string
  fullHeight?: boolean
}
```

### Services

**Location**: `components/Services.tsx`

Services showcase section.

```typescript
// Usage
import { Services } from '@/components/Services'

<Services services={servicesData} />
```

**Props:**
```typescript
interface ServicesProps {
  services: Service[]
  title?: string
  description?: string
}

interface Service {
  id: string
  title: string
  description: string
  icon: string
  href: string
}
```

### Cases

**Location**: `components/Cases.tsx`

Case studies / portfolio section.

```typescript
// Usage
import { Cases } from '@/components/Cases'

<Cases cases={casesData} />
```

**Props:**
```typescript
interface CasesProps {
  cases: CaseStudy[]
  title?: string
  viewAllHref?: string
}

interface CaseStudy {
  id: string
  title: string
  client: string
  image: string
  tags: string[]
  href: string
}
```

### Testimonials

**Location**: `components/Testimonials.tsx`

Customer testimonials section.

```typescript
// Usage
import { Testimonials } from '@/components/Testimonials'

<Testimonials testimonials={testimonialsData} />
```

**Props:**
```typescript
interface TestimonialsProps {
  testimonials: Testimonial[]
  title?: string
}

interface Testimonial {
  id: string
  text: string
  author: string
  position: string
  company: string
  avatar?: string
}
```

### CTA (Call to Action)

**Location**: `components/CTA.tsx`

Call-to-action section.

```typescript
// Usage
import { CTA } from '@/components/CTA'

<CTA
  title="Ready to Get Started?"
  description="Let's discuss your project and create something amazing together."
  primaryButton={{ text: "Contact Us", href: "/contact" }}
  secondaryButton={{ text: "View Our Work", href: "/cases" }}
/>
```

**Props:**
```typescript
interface CTAProps {
  title: string
  description?: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  variant?: 'default' | 'gradient'
}
```

### Stats

**Location**: `components/Stats.tsx`

Statistics/numbers section.

```typescript
// Usage
import { Stats } from '@/components/Stats'

<Stats stats={statsData} />
```

**Props:**
```typescript
interface StatsProps {
  stats: Stat[]
}

interface Stat {
  label: string
  value: string | number
  suffix?: string
  prefix?: string
}

// Example
const statsData = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 15, suffix: '+', label: 'Years Experience' },
]
```

---

## Feature Components

### Booking Components

#### BookingForm

**Location**: `components/booking/BookingForm.tsx`

Complete booking form with validation.

```typescript
// Usage
import { BookingForm } from '@/components/booking/BookingForm'

<BookingForm onSubmit={handleBooking} />
```

**Props:**
```typescript
interface BookingFormProps {
  onSubmit: (data: BookingData) => Promise<void>
  initialData?: Partial<BookingData>
}

interface BookingData {
  name: string
  email: string
  phone: string
  service: string
  date: Date
  time: string
  message?: string
}
```

#### Calendar

**Location**: `components/booking/Calendar.tsx`

Date picker calendar component.

```typescript
// Usage
import { Calendar } from '@/components/booking/Calendar'

<Calendar
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
  disabledDates={[...]}
/>
```

**Props:**
```typescript
interface CalendarProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  disabledDates?: Date[]
  minDate?: Date
  maxDate?: Date
}
```

#### TimeSlots

**Location**: `components/booking/TimeSlots.tsx`

Available time slots selector.

```typescript
// Usage
import { TimeSlots } from '@/components/booking/TimeSlots'

<TimeSlots
  date={selectedDate}
  selectedTime={selectedTime}
  onTimeSelect={setSelectedTime}
/>
```

**Props:**
```typescript
interface TimeSlotsProps {
  date: Date
  selectedTime: string | null
  onTimeSelect: (time: string) => void
  availableSlots?: string[]
}
```

### Chat Widget Components

#### BodylabChatWidget

**Location**: `components/BodylabChatWidget.tsx`

Bodylab chat integration widget.

```typescript
// Usage
import { BodylabChatWidget } from '@/components/BodylabChatWidget'

<BodylabChatWidget />
```

**Features:**
- Loads Bodylab chat script
- Configures chat widget
- Handles initialization

---

## Creating New Components

### Component Checklist

When creating a new component:

- [ ] Choose appropriate location (`ui/`, `sections/`, feature folder)
- [ ] Define TypeScript interface for props
- [ ] Add JSDoc comments for complex components
- [ ] Implement responsive design
- [ ] Add dark mode support (if applicable)
- [ ] Include loading and error states
- [ ] Add accessibility attributes (ARIA, alt text, etc.)
- [ ] Test keyboard navigation
- [ ] Test on mobile devices
- [ ] Add usage example in this documentation

### Component Template

```typescript
// components/ui/NewComponent.tsx

/**
 * Brief description of what this component does
 * 
 * @example
 * ```tsx
 * <NewComponent title="Hello" onAction={handleAction} />
 * ```
 */

import { cn } from '@/lib/utils'

interface NewComponentProps {
  /** Description of prop */
  title: string
  /** Optional description */
  description?: string
  /** Callback when action occurs */
  onAction?: () => void
  /** Additional CSS classes */
  className?: string
}

export function NewComponent({
  title,
  description,
  onAction,
  className,
}: NewComponentProps) {
  const handleAction = () => {
    if (onAction) {
      onAction()
    }
  }
  
  return (
    <div className={cn('base-classes', className)}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <button onClick={handleAction}>Action</button>
    </div>
  )
}
```

### Component Variants with CVA

For components with multiple variants, use Class Variance Authority:

```typescript
import { cva, type VariantProps } from 'class-variance-authority'

const componentVariants = cva(
  // Base classes
  'base-class-1 base-class-2',
  {
    variants: {
      variant: {
        default: 'variant-class-1',
        special: 'variant-class-2',
      },
      size: {
        sm: 'size-small',
        lg: 'size-large',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
)

interface ComponentProps extends VariantProps<typeof componentVariants> {
  children: React.ReactNode
  className?: string
}

export function Component({ variant, size, children, className }: ComponentProps) {
  return (
    <div className={cn(componentVariants({ variant, size }), className)}>
      {children}
    </div>
  )
}
```

---

## Component Best Practices

### 1. Props Interface
```typescript
// ✅ Clear, descriptive prop names
interface UserCardProps {
  user: User
  onEdit: (userId: string) => void
  showAvatar?: boolean
}

// ❌ Unclear prop names
interface UserCardProps {
  data: any
  handler: Function
  flag?: boolean
}
```

### 2. Default Props
```typescript
// ✅ Use default parameters
export function Component({ 
  size = 'md',
  variant = 'primary' 
}: Props) {
  // ...
}

// ❌ Avoid defaultProps (deprecated in TypeScript)
Component.defaultProps = {
  size: 'md'
}
```

### 3. Composition
```typescript
// ✅ Composable components
<Card>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
</Card>

// ❌ Monolithic components with many props
<Card 
  title="Title"
  content="Content"
  hasHeader={true}
  hasFooter={false}
  // ... 20 more props
/>
```

### 4. Accessibility
```typescript
// ✅ Accessible component
export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={typeof children === 'string' ? children : 'Button'}
      className="..."
    >
      {children}
    </button>
  )
}

// Input with proper labeling
<div>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" />
</div>
```

### 5. Loading and Error States
```typescript
export function DataComponent({ id }: Props) {
  const { data, loading, error } = useData(id)
  
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <EmptyState />
  
  return <div>{/* Render data */}</div>
}
```

---

## Component Library Goals

### Current State
- ✅ Basic UI components (Button, Card, Input)
- ✅ Layout components (Header, Footer)
- ✅ Section components (Hero, Services, Cases)
- ✅ Booking components
- ⚠️ Some components need standardization

### Future Improvements
- [ ] Complete UI component library
- [ ] Storybook for component documentation
- [ ] Unit tests for all components
- [ ] Accessibility audit for all components
- [ ] Component usage analytics
- [ ] Design system tokens integration

---

## Resources

- [React Component Patterns](https://react.dev/learn)
- [Tailwind CSS Components](https://tailwindui.com)
- [Radix UI](https://www.radix-ui.com) - Accessible component primitives
- [Shadcn/ui](https://ui.shadcn.com) - Component examples

---

**Last Updated**: October 2025

