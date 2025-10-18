# Development Guide - UAE Digital Agency

## Overview
This guide covers the development workflow, setup instructions, coding standards, and best practices for contributing to the UAE Digital Agency project.

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Coding Standards](#coding-standards)
4. [Testing](#testing)
5. [Debugging](#debugging)
6. [Common Tasks](#common-tasks)
7. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites
- **Node.js**: v18.17+ or v20.0+
- **npm**: v9.0+ or **pnpm**: v8.0+
- **Git**: Latest version
- **Code Editor**: VS Code (recommended with extensions)

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Initial Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/your-org/uae-digital-fresh.git
cd uae-digital-fresh
```

#### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using pnpm (recommended for faster installs)
pnpm install
```

#### 3. Environment Variables
Create a `.env.local` file in the root directory:

```bash
# .env.local

# WordPress Backend
WORDPRESS_URL=https://your-wordpress-backend.com
WORDPRESS_API_KEY=your_api_key_here

# EmailJS (Contact Forms)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

#### 4. Start Development Server
```bash
npm run dev
# or
pnpm dev

# Server starts at http://localhost:3000
```

#### 5. Verify Setup
Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the homepage.

---

## Development Workflow

### Branch Strategy

```
main (production)
  ├── develop (staging)
  │   ├── feature/service-page
  │   ├── feature/booking-system
  │   ├── fix/navigation-bug
  │   └── refactor/api-client
```

#### Branch Naming Convention
- **Features**: `feature/descriptive-name`
- **Bugs**: `fix/bug-description`
- **Refactoring**: `refactor/what-is-refactored`
- **Documentation**: `docs/documentation-update`
- **Performance**: `perf/optimization-description`

### Development Cycle

#### 1. Create a New Branch
```bash
# Pull latest changes
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/new-service-page
```

#### 2. Development Process
```bash
# Make changes
# Test locally
npm run dev

# Check types
npm run type-check

# Format code
npm run format

# Commit changes
git add .
git commit -m "feat: add new service page with booking integration"
```

#### 3. Commit Message Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(services): add booking functionality to service pages
fix(navigation): resolve mobile menu closing issue
docs(readme): update setup instructions
refactor(api): simplify data fetching logic
perf(images): optimize hero image loading
```

#### 4. Push and Create Pull Request
```bash
# Push to remote
git push origin feature/new-service-page

# Create Pull Request on GitHub
# Target: develop branch
# Add description, screenshots, and testing notes
```

#### 5. Code Review
- Wait for review from team members
- Address feedback
- Push additional commits if needed
- Get approval

#### 6. Merge and Deploy
```bash
# After approval, merge to develop
# CI/CD pipeline automatically deploys to staging

# For production deployment:
# Merge develop → main
# Triggers production deployment
```

---

## Coding Standards

### File Organization

#### Component File Structure
```typescript
// 1. Imports - External libraries first
import { useState } from 'react'
import Link from 'next/link'

// 2. Imports - Internal absolute imports
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

// 3. Imports - Relative imports
import { ServiceCard } from './ServiceCard'

// 4. Imports - Types
import type { Service } from '@/types/service'

// 5. Types/Interfaces
interface ServicesPageProps {
  initialServices: Service[]
}

// 6. Constants
const ITEMS_PER_PAGE = 12

// 7. Component
export function ServicesPage({ initialServices }: ServicesPageProps) {
  const [services, setServices] = useState(initialServices)
  
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

// 8. Sub-components (if small and not reusable)
function ServiceCardSkeleton() {
  return <div className="animate-pulse">...</div>
}
```

### Naming Conventions

```typescript
// ✅ Components - PascalCase
export function ServiceCard() {}

// ✅ Functions - camelCase
export function formatDate(date: Date) {}

// ✅ Variables - camelCase
const userName = 'John Doe'

// ✅ Constants - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'

// ✅ Types/Interfaces - PascalCase
interface UserProfile {}
type ServiceStatus = 'active' | 'inactive'

// ✅ Private functions - prefix with underscore
function _internalHelper() {}

// ✅ Boolean variables - is/has/should prefix
const isLoading = true
const hasError = false
const shouldRender = true

// ✅ Event handlers - handle prefix
const handleClick = () => {}
const handleSubmit = () => {}
```

### Code Quality Rules

#### 1. Component Size
```typescript
// ✅ Keep components focused and small (<150 lines)
export function ServiceCard({ service }: ServiceCardProps) {
  // Single responsibility
  return <div>...</div>
}

// ❌ Avoid large components with multiple responsibilities
export function HugeComponent() {
  // 500+ lines of mixed logic
}
```

#### 2. Function Length
```typescript
// ✅ Functions should be <50 lines
function calculateTotal(items: Item[]) {
  // Clear, focused logic
}

// ❌ Extract long functions
function doEverything() {
  // 200 lines of code
}
```

#### 3. DRY Principle
```typescript
// ❌ Repeated code
<button className="rounded bg-blue-600 px-4 py-2 text-white">Save</button>
<button className="rounded bg-blue-600 px-4 py-2 text-white">Submit</button>
<button className="rounded bg-blue-600 px-4 py-2 text-white">Confirm</button>

// ✅ Extract to component
<Button>Save</Button>
<Button>Submit</Button>
<Button>Confirm</Button>
```

#### 4. Type Safety
```typescript
// ✅ Always provide explicit types for parameters
function getService(id: string): Promise<Service> {
  return fetch(`/api/services/${id}`).then(res => res.json())
}

// ❌ Avoid implicit any
function getData(id) { // Parameter 'id' implicitly has 'any' type
  return fetch(`/api/data/${id}`)
}
```

#### 5. Error Handling
```typescript
// ✅ Always handle errors
async function fetchServices(): Promise<Service[]> {
  try {
    const res = await fetch('/api/services')
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    
    return await res.json()
  } catch (error) {
    console.error('Failed to fetch services:', error)
    throw error // Re-throw or handle appropriately
  }
}

// ❌ Don't ignore errors
async function fetchServices() {
  const res = await fetch('/api/services')
  return res.json() // No error handling
}
```

### TypeScript Rules

```typescript
// ✅ Use explicit return types for exported functions
export function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// ✅ Use type inference for simple cases
const count = 5 // Inferred as number

// ✅ Use interfaces for object shapes
interface User {
  id: string
  name: string
  email: string
}

// ✅ Use type for unions and intersections
type Status = 'active' | 'inactive' | 'pending'
type UserWithTimestamps = User & Timestamps

// ❌ Avoid 'any' without justification
function process(data: any) {} // Bad

// ✅ Use 'unknown' for truly unknown data
function process(data: unknown) {
  if (typeof data === 'string') {
    // Type-safe usage
  }
}
```

---

## Testing

### Testing Strategy

#### 1. Type Checking
```bash
# Check TypeScript types
npm run type-check

# Watch mode during development
npm run type-check:watch
```

#### 2. Manual Testing Checklist
Before committing, test:
- ✅ Component renders correctly
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode (if applicable)
- ✅ Loading states
- ✅ Error states
- ✅ Accessibility (keyboard navigation, screen readers)
- ✅ Performance (no console errors, reasonable load time)

#### 3. Browser Testing
Test on:
- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

#### 4. Accessibility Testing
```bash
# Run Lighthouse audit
npm run lighthouse

# Or use Chrome DevTools > Lighthouse
# Target: 90+ accessibility score
```

### Test Cases Template

```markdown
## Test Plan: Contact Form

### Functional Tests
- [ ] Form submits with valid data
- [ ] Form shows validation errors for invalid data
- [ ] Success message displays after submission
- [ ] Form clears after successful submission
- [ ] Error message displays on submission failure

### UI Tests
- [ ] Form renders correctly on mobile
- [ ] Form renders correctly on tablet
- [ ] Form renders correctly on desktop
- [ ] Dark mode styles apply correctly
- [ ] Loading state shows during submission

### Accessibility Tests
- [ ] All form fields have labels
- [ ] Form can be navigated with keyboard
- [ ] Error messages are announced to screen readers
- [ ] Focus management is correct
```

---

## Debugging

### Development Tools

#### Next.js DevTools
```typescript
// Enable React DevTools profiler
// next.config.js
module.exports = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
```

#### Debug Logging
```typescript
// Development logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}

// Use debugger statement
function complexFunction() {
  debugger // Execution pauses here in DevTools
  // ... rest of function
}
```

#### Network Debugging
```typescript
// Log fetch requests
const originalFetch = global.fetch
global.fetch = (...args) => {
  console.log('Fetch:', args[0])
  return originalFetch(...args)
}
```

### Common Issues and Solutions

#### Issue: Build Fails with Type Errors
```bash
# Solution 1: Check tsconfig.json
# Solution 2: Run type check
npm run type-check

# Solution 3: Check for missing dependencies
npm install
```

#### Issue: Styles Not Applying
```bash
# Solution 1: Clear Next.js cache
rm -rf .next

# Solution 2: Restart dev server
npm run dev

# Solution 3: Check Tailwind configuration
npx tailwindcss --help
```

#### Issue: Images Not Loading
```typescript
// Solution: Check next.config.js domains
module.exports = {
  images: {
    domains: ['your-wordpress-domain.com'],
  },
}
```

---

## Common Tasks

### Creating a New Page

#### 1. Create Page File
```typescript
// app/new-page/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Page | UAE Digital',
  description: 'Page description',
}

export default function NewPage() {
  return (
    <div className="container mx-auto py-24">
      <h1 className="text-4xl font-bold">New Page</h1>
    </div>
  )
}
```

#### 2. Add Navigation Link
```typescript
// components/Header.tsx
<Link href="/new-page">New Page</Link>
```

#### 3. Test the Page
```bash
# Visit http://localhost:3000/new-page
npm run dev
```

### Creating a New Component

#### 1. Create Component File
```typescript
// components/ui/NewComponent.tsx
interface NewComponentProps {
  title: string
  description?: string
}

export function NewComponent({ title, description }: NewComponentProps) {
  return (
    <div className="rounded-lg border p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
    </div>
  )
}
```

#### 2. Export from Index (if using barrel exports)
```typescript
// components/ui/index.ts
export { NewComponent } from './NewComponent'
```

#### 3. Use the Component
```typescript
import { NewComponent } from '@/components/ui/NewComponent'

<NewComponent title="Hello" description="World" />
```

### Adding a New API Route

#### 1. Create Route Handler
```typescript
// app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Fetch data
    const data = await fetchData()
    
    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Process data
  const result = await processData(body)
  
  return NextResponse.json({ success: true, result })
}
```

#### 2. Create API Client Function
```typescript
// lib/api.ts
export async function getNewData(): Promise<DataType[]> {
  const res = await fetch('/api/new-endpoint')
  const data = await res.json()
  return data.data
}
```

#### 3. Use in Component
```typescript
export default async function Page() {
  const data = await getNewData()
  return <DataList data={data} />
}
```

### Adding Environment Variables

#### 1. Add to .env.local
```bash
# .env.local
NEW_API_KEY=your_key_here

# Public variables (exposed to browser)
NEXT_PUBLIC_NEW_FEATURE_FLAG=true
```

#### 2. Update TypeScript Types (optional)
```typescript
// next-env.d.ts or types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEW_API_KEY: string
    NEXT_PUBLIC_NEW_FEATURE_FLAG: string
  }
}
```

#### 3. Use in Code
```typescript
// Server-side only
const apiKey = process.env.NEW_API_KEY

// Client-side (NEXT_PUBLIC_ prefix required)
const featureFlag = process.env.NEXT_PUBLIC_NEW_FEATURE_FLAG
```

---

## Troubleshooting

### Build Issues

#### "Module not found" Error
```bash
# Solution 1: Install missing dependency
npm install missing-package

# Solution 2: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Solution 3: Check path aliases in tsconfig.json
```

#### "Type Error" During Build
```bash
# Solution: Run type check to see specific errors
npm run type-check

# Fix errors and rebuild
npm run build
```

### Runtime Issues

#### Page Not Found (404)
```bash
# Solution 1: Check file structure
# app/your-page/page.tsx (correct)
# app/your-page.tsx (incorrect)

# Solution 2: Restart dev server
# Ctrl+C then npm run dev
```

#### Styles Not Loading
```bash
# Solution 1: Check Tailwind config includes the file
# tailwind.config.ts content: ['./app/**/*.{ts,tsx}']

# Solution 2: Clear Next.js cache
rm -rf .next
npm run dev
```

#### Environment Variables Not Working
```bash
# Solution 1: Restart dev server after adding .env.local

# Solution 2: Check variable name (NEXT_PUBLIC_ prefix for client-side)

# Solution 3: Verify .env.local is in .gitignore
```

### Performance Issues

#### Slow Page Load
```typescript
// Solution 1: Check image optimization
<Image src="..." width={800} height={600} /> // Specify dimensions

// Solution 2: Use dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'))

// Solution 3: Check network tab for slow API calls
```

#### Large Bundle Size
```bash
# Solution 1: Analyze bundle
npm run build
npm run analyze # If configured

# Solution 2: Use dynamic imports
# Solution 3: Remove unused dependencies
npm prune
```

---

## Quick Reference

### Useful Commands
```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server
npm run type-check       # Check TypeScript types

# Code Quality
npm run lint             # Run ESLint (if configured)
npm run format           # Format with Prettier (if configured)

# Utilities
npm run clean            # Clear .next and cache
npm outdated            # Check for outdated packages
npm update              # Update packages
```

### File Templates Location
- Components: `components/ui/`
- Pages: `app/[route]/page.tsx`
- API Routes: `app/api/[route]/route.ts`
- Types: `types/`
- Utils: `lib/`

### Key Documentation Files
- `docs/NEXTJS_GUIDE.md` - Next.js patterns
- `docs/REACT_GUIDE.md` - React patterns
- `docs/TAILWIND_GUIDE.md` - Styling guide
- `docs/TYPESCRIPT_GUIDE.md` - TypeScript patterns
- `docs/ARCHITECTURE.md` - System architecture
- `docs/COMPONENTS.md` - Component library
- `docs/CONTRIBUTING.md` - Contribution guidelines

---

## Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Internal Resources
- Design System: Figma (link to be added)
- API Documentation: Swagger/OpenAPI (link to be added)
- Team Communication: Slack/Discord

---

## Getting Help

### Where to Ask Questions
1. **Check Documentation**: Start with these docs
2. **Search Existing Issues**: GitHub Issues
3. **Ask Team**: Slack/Discord channel
4. **Stack Overflow**: For general questions

### Reporting Bugs
1. Check if issue already exists
2. Create new GitHub issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (browser, OS, Node version)

---

**Last Updated**: October 2025

