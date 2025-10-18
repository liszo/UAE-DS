# Tailwind CSS Guide for UAE Digital Agency

## Overview
This project uses **Tailwind CSS 4.x** for styling with a custom design system. This guide covers Tailwind best practices, our design tokens, and styling patterns.

---

## Table of Contents
1. [Design System](#design-system)
2. [Class Organization](#class-organization)
3. [Responsive Design](#responsive-design)
4. [Dark Mode](#dark-mode)
5. [Custom Components](#custom-components)
6. [Animation & Transitions](#animation--transitions)
7. [Best Practices](#best-practices)

---

## Design System

### Color Palette
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        // Neutral colors
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          600: '#525252',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a', // Dark mode background
        },
      },
    },
  },
}
```

### Typography Scale
```typescript
// Font families
font-sans // Default: Inter, system fonts
font-heading // Headings: Cabinet Grotesk (if added)

// Font sizes (semantic naming)
text-xs      // 12px - Fine print
text-sm      // 14px - Captions, labels
text-base    // 16px - Body text (default)
text-lg      // 18px - Large body text
text-xl      // 20px - Subheadings
text-2xl     // 24px - Section titles
text-3xl     // 30px - Page subtitles
text-4xl     // 36px - Page titles
text-5xl     // 48px - Hero subtitles
text-6xl     // 60px - Hero titles
text-7xl     // 72px - Large hero titles
text-8xl     // 96px - Extra large hero titles

// Font weights
font-light      // 300
font-normal     // 400
font-medium     // 500
font-semibold   // 600
font-bold       // 700
```

### Spacing Scale
Use consistent spacing throughout:

```typescript
// Spacing values
space-{size}  // Use for gap, space-x, space-y
p-{size}      // Padding
m-{size}      // Margin

// Common spacing
gap-4         // 16px - Default component spacing
gap-6         // 24px - Section spacing
gap-8         // 32px - Large section spacing
gap-12        // 48px - Extra large spacing

// Vertical rhythm
mt-8          // 32px - Small section margin
mt-16         // 64px - Medium section margin
mt-24         // 96px - Large section margin
mt-32         // 128px - Extra large section margin
```

### Container Widths
```typescript
// Layout containers
max-w-7xl    // 1280px - Default container
max-w-6xl    // 1152px - Narrow container
max-w-4xl    // 896px - Content container
max-w-2xl    // 672px - Text container
max-w-prose  // 65ch - Optimal reading width

// Example usage
<div className="mx-auto max-w-7xl px-6 lg:px-8">
  {/* Content */}
</div>
```

---

## Class Organization

### Recommended Order
Organize classes for readability:

```typescript
// 1. Layout & Display
// 2. Positioning
// 3. Box Model (margin, padding)
// 4. Sizing (width, height)
// 5. Typography
// 6. Visual (colors, backgrounds, borders)
// 7. Effects (shadow, opacity, transforms)
// 8. Transitions & Animations
// 9. Interactions (cursor, pointer-events)

// ✅ Good - Organized
<div className="
  flex items-center justify-between
  relative
  px-6 py-4
  w-full max-w-7xl
  text-lg font-semibold
  bg-white text-gray-900 border border-gray-200 rounded-lg
  shadow-sm
  transition-all duration-300
  hover:shadow-lg
  cursor-pointer
">
  Content
</div>

// ❌ Bad - Random order
<div className="cursor-pointer text-lg px-6 shadow-sm flex bg-white w-full border">
  Content
</div>
```

### cn() Utility for Conditional Classes
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage
<button
  className={cn(
    'px-4 py-2 rounded-lg font-medium transition-colors',
    'bg-blue-600 text-white',
    'hover:bg-blue-700',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    isLoading && 'animate-pulse',
    variant === 'secondary' && 'bg-gray-200 text-gray-900'
  )}
>
  Click me
</button>
```

---

## Responsive Design

### Mobile-First Approach
Always design for mobile first, then add larger breakpoints:

```typescript
// Breakpoints
sm: 640px   // Small devices (tablets)
md: 768px   // Medium devices (small laptops)
lg: 1024px  // Large devices (desktops)
xl: 1280px  // Extra large devices
2xl: 1536px // 2X large devices

// ✅ Correct - Mobile first
<div className="
  text-2xl           // Mobile: 24px
  sm:text-3xl        // Tablet: 30px
  lg:text-5xl        // Desktop: 48px
">
  Hero Title
</div>

// ✅ Correct - Mobile first layout
<div className="
  grid grid-cols-1   // Mobile: 1 column
  md:grid-cols-2     // Tablet: 2 columns
  lg:grid-cols-3     // Desktop: 3 columns
  gap-6
">
  {items.map(item => <Card key={item.id} item={item} />)}
</div>
```

### Common Responsive Patterns

#### Responsive Container
```typescript
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content with responsive padding */}
</div>
```

#### Responsive Grid
```typescript
// Auto-fit grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>

// Bento grid (asymmetric)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="md:col-span-2">Large card</div>
  <div>Small card</div>
  <div>Small card</div>
  <div className="lg:col-span-2">Medium card</div>
</div>
```

#### Responsive Typography
```typescript
<h1 className="
  text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
  font-bold
  leading-tight
">
  Responsive Hero Title
</h1>

<p className="
  text-base sm:text-lg lg:text-xl
  leading-relaxed
  max-w-prose
">
  Responsive body text with optimal reading width
</p>
```

#### Show/Hide on Breakpoints
```typescript
// Hide on mobile, show on desktop
<div className="hidden lg:block">
  Desktop Navigation
</div>

// Show on mobile, hide on desktop
<div className="block lg:hidden">
  Mobile Menu Button
</div>
```

---

## Dark Mode

### Dark Mode Classes
```typescript
// Enable dark mode in tailwind.config.ts
export default {
  darkMode: 'class', // or 'media' for system preference
}

// Usage
<div className="
  bg-white dark:bg-neutral-950
  text-gray-900 dark:text-white
  border-gray-200 dark:border-neutral-800
">
  Content adapts to dark mode
</div>
```

### Dark Mode Toggle
```typescript
'use client'

import { useState, useEffect } from 'react'

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])
  
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
    >
      {isDark ? '🌞' : '🌙'}
    </button>
  )
}
```

### Dark Mode Color Strategy
```typescript
// ✅ Semantic color tokens
<div className="bg-background text-foreground">
  {/* Colors adapt automatically */}
</div>

// ✅ Explicit dark mode variants
<div className="
  bg-white dark:bg-neutral-950
  text-gray-900 dark:text-gray-50
  border-gray-200 dark:border-neutral-800
">
  Content
</div>

// ✅ Gradients in dark mode
<div className="
  bg-gradient-to-r from-blue-500 to-purple-600
  dark:from-blue-600 dark:to-purple-700
">
  Gradient
</div>
```

---

## Custom Components

### Class Variance Authority (CVA)
Create reusable component variants:

```typescript
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  // Base classes
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
        ghost: 'text-gray-700 hover:bg-gray-100',
      },
      size: {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3',
        xl: 'text-xl px-8 py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

export function Button({ children, variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
}

// Usage
<Button variant="primary" size="lg">Click me</Button>
<Button variant="outline" size="sm">Small button</Button>
```

### Extracting Repeated Patterns
```typescript
// ❌ Repeated classes everywhere
<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">...</div>
<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">...</div>
<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">...</div>

// ✅ Extract to reusable component
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-6 shadow-sm', className)}>
      {children}
    </div>
  )
}

// Usage
<Card>Content 1</Card>
<Card>Content 2</Card>
<Card className="p-8">Content 3 with more padding</Card>
```

---

## Animation & Transitions

### Transitions
```typescript
// Hover transitions
<button className="
  bg-blue-600 text-white
  transition-colors duration-300
  hover:bg-blue-700
">
  Hover me
</button>

// Multiple properties
<div className="
  transform
  transition-all duration-500 ease-in-out
  hover:scale-105 hover:shadow-xl
">
  Card with hover effect
</div>

// Specific properties
<div className="
  transition-opacity duration-300
  opacity-0 hover:opacity-100
">
  Fade in on hover
</div>
```

### Keyframe Animations
```typescript
// Built-in animations
animate-spin      // Loading spinners
animate-pulse     // Loading states
animate-bounce    // Attention grabbers

// Usage
<div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />

// Custom animations in tailwind.config.ts
export default {
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideIn: 'slideIn 0.3s ease-out',
      },
    },
  },
}

// Usage
<div className="animate-fadeIn">
  Fades in on mount
</div>
```

### Motion-Safe (Accessibility)
Respect user's motion preferences:

```typescript
<div className="
  motion-safe:animate-fadeIn
  motion-reduce:animate-none
">
  Animates only if user hasn't disabled animations
</div>

<button className="
  transition-transform
  motion-safe:hover:scale-105
  motion-reduce:hover:scale-100
">
  Respects motion preferences
</button>
```

---

## Best Practices

### Performance

#### Avoid Arbitrary Values
```typescript
// ❌ Avoid arbitrary values (not optimized, inconsistent)
<div className="w-[234px] h-[157px] text-[17px]">
  Content
</div>

// ✅ Use design system values
<div className="w-56 h-40 text-lg">
  Content
</div>

// ✅ If you need custom values, add them to config
// tailwind.config.ts
export default {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem',  // 352px
      },
    },
  },
}
```

#### Purge Unused Classes
```typescript
// tailwind.config.ts
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

### Accessibility

#### Focus States
```typescript
// Always include focus states
<button className="
  rounded bg-blue-600 text-white
  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
">
  Accessible button
</button>

<input className="
  rounded border border-gray-300
  focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50
" />
```

#### Color Contrast
```typescript
// ✅ Good contrast (4.5:1 minimum)
<div className="bg-blue-600 text-white">
  High contrast text
</div>

// ❌ Poor contrast
<div className="bg-gray-200 text-gray-300">
  Hard to read
</div>

// Check contrast in dark mode too
<div className="
  bg-white text-gray-900
  dark:bg-neutral-950 dark:text-gray-50
">
  Good contrast in both modes
</div>
```

### Code Organization

#### Group Related Classes
```typescript
// ✅ Good - Grouped by concern
<div className="
  // Layout
  flex items-center justify-between
  // Spacing
  px-6 py-4
  // Visual
  bg-white border border-gray-200 rounded-lg shadow-sm
  // Interactive
  transition-shadow hover:shadow-md
">
  Content
</div>
```

#### Extract Component Classes
```typescript
// ❌ Long className strings everywhere
<button className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
  Button
</button>

// ✅ Extract to component with CVA
<Button>Button</Button>
```

---

## Common Patterns

### Hero Section
```typescript
<section className="relative h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90" />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
      Hero Title
    </h1>
    <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
      Subtitle text
    </p>
    <Button size="lg">Get Started</Button>
  </div>
</section>
```

### Card Grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id} className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
      <p className="text-gray-600">{item.description}</p>
    </div>
  ))}
</div>
```

### Gradient Text
```typescript
<h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  Gradient Text
</h1>
```

### Glass morphism
```typescript
<div className="
  backdrop-blur-lg bg-white/10
  border border-white/20
  rounded-xl shadow-xl
">
  Glassmorphism effect
</div>
```

---

## Checklist

### ✅ Do's
- ✅ Use mobile-first responsive design
- ✅ Follow consistent class ordering
- ✅ Use design system values (no arbitrary)
- ✅ Add proper focus states
- ✅ Test in dark mode
- ✅ Use semantic color tokens
- ✅ Extract repeated patterns to components
- ✅ Respect motion preferences (motion-safe)
- ✅ Ensure color contrast meets WCAG standards
- ✅ Use cn() utility for conditional classes

### ❌ Don'ts
- ❌ Don't use arbitrary values excessively
- ❌ Don't forget responsive breakpoints
- ❌ Don't ignore focus states
- ❌ Don't use inline styles
- ❌ Don't forget dark mode variants
- ❌ Don't create inconsistent spacing
- ❌ Don't repeat long className strings
- ❌ Don't use !important
- ❌ Don't skip accessibility testing
- ❌ Don't forget to purge unused styles

---

**Last Updated**: October 2025

