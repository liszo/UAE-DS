# TypeScript Guide for UAE Digital Agency

## Overview
This project uses **TypeScript** in strict mode for type-safe development. This guide covers TypeScript patterns, best practices, and conventions specific to our Next.js/React project.

---

## Table of Contents
1. [TypeScript Configuration](#typescript-configuration)
2. [Type Definitions](#type-definitions)
3. [React Component Types](#react-component-types)
4. [API & Data Types](#api--data-types)
5. [Utility Types](#utility-types)
6. [Type Guards & Narrowing](#type-guards--narrowing)
7. [Best Practices](#best-practices)

---

## TypeScript Configuration

### tsconfig.json Settings
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    
    // Strict type checking
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    
    // Path aliases
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"]
    },
    
    // Next.js specific
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Type Definitions

### Basic Types
```typescript
// Primitives
const name: string = 'UAE Digital'
const count: number = 42
const isActive: boolean = true
const nothing: null = null
const notDefined: undefined = undefined

// Arrays
const numbers: number[] = [1, 2, 3]
const services: Array<string> = ['Web', 'Mobile', 'Cloud']

// Tuples
const coordinates: [number, number] = [51.5074, -0.1278]
type RGB = [number, number, number]

// Objects
const user: { name: string; age: number } = {
  name: 'John',
  age: 30,
}

// Any (avoid when possible)
const something: any = 'anything' // ❌ Avoid

// Unknown (safer alternative to any)
const value: unknown = getUserInput()
if (typeof value === 'string') {
  console.log(value.toUpperCase()) // ✅ Type-safe
}

// Never (for functions that never return)
function throwError(message: string): never {
  throw new Error(message)
}
```

### Interfaces vs Types
```typescript
// ✅ Use Interface for object shapes (preferred)
interface Service {
  id: string
  title: string
  description: string
  icon: string
  slug: string
  createdAt: Date
}

// Extending interfaces
interface FeaturedService extends Service {
  featured: boolean
  priority: number
}

// ✅ Use Type for unions, intersections, primitives
type Status = 'draft' | 'published' | 'archived'
type ID = string | number

// Intersection types
type Timestamped = {
  createdAt: Date
  updatedAt: Date
}

type ServiceWithTimestamps = Service & Timestamped

// Union types
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string }
```

### Enums (use sparingly)
```typescript
// ❌ String enums (prefer const objects or literal unions)
enum ServiceType {
  Web = 'web',
  Mobile = 'mobile',
  Cloud = 'cloud',
}

// ✅ Better: Const object with 'as const'
const SERVICE_TYPE = {
  WEB: 'web',
  MOBILE: 'mobile',
  CLOUD: 'cloud',
} as const

type ServiceType = typeof SERVICE_TYPE[keyof typeof SERVICE_TYPE]

// ✅ Best: String literal union
type ServiceType = 'web' | 'mobile' | 'cloud'
```

---

## React Component Types

### Function Component Props
```typescript
// Basic props interface
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

export function Button({ children, onClick, disabled, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

// With explicit return type
export function Button({ children, onClick }: ButtonProps): JSX.Element {
  return <button onClick={onClick}>{children}</button>
}
```

### Extending HTML Attributes
```typescript
// Extend native HTML props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
      {error && <span>{error}</span>}
    </div>
  )
}

// Other HTML element types
interface DivProps extends React.HTMLAttributes<HTMLDivElement> {}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}
```

### Generic Components
```typescript
// Generic list component
interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T) => string | number
  emptyMessage?: string
}

export function List<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  emptyMessage = 'No items found' 
}: ListProps<T>) {
  if (items.length === 0) {
    return <div>{emptyMessage}</div>
  }
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}

// Usage with type inference
<List
  items={services} // TypeScript infers Service[]
  renderItem={(service) => <ServiceCard service={service} />}
  keyExtractor={(service) => service.id}
/>
```

### Event Handlers
```typescript
// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // Handle form submission
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
}

const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setMessage(e.target.value)
}

const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setOption(e.target.value)
}

// Mouse events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.clientX, e.clientY)
}

const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
  setIsHovered(true)
}

// Keyboard events
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleSubmit()
  }
}

// Focus events
const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  setIsFocused(true)
}
```

### Children Types
```typescript
// Single child element
interface CardProps {
  children: React.ReactElement
}

// Any valid React child
interface ContainerProps {
  children: React.ReactNode
}

// Function as children (render prop)
interface ToggleProps {
  children: (isOpen: boolean, toggle: () => void) => React.ReactNode
}

export function Toggle({ children }: ToggleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  
  return <>{children(isOpen, toggle)}</>
}

// Usage
<Toggle>
  {(isOpen, toggle) => (
    <div>
      <button onClick={toggle}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  )}
</Toggle>
```

### Refs
```typescript
// useRef with DOM elements
const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  inputRef.current?.focus()
}, [])

<input ref={inputRef} />

// useRef with mutable values
const countRef = useRef<number>(0)

const increment = () => {
  countRef.current += 1
}

// forwardRef
interface InputProps {
  label: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} />
      </div>
    )
  }
)

Input.displayName = 'Input'
```

---

## API & Data Types

### API Response Types
```typescript
// Base API response
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Specific API responses
interface ServicesResponse {
  services: Service[]
  total: number
  page: number
  perPage: number
}

interface ServiceResponse {
  service: Service
}

// Error response
interface ApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
}

// Usage in API calls
async function getServices(): Promise<ApiResponse<ServicesResponse>> {
  const res = await fetch('/api/services')
  return res.json()
}

async function getService(id: string): Promise<ApiResponse<ServiceResponse>> {
  const res = await fetch(`/api/services/${id}`)
  return res.json()
}
```

### Form Data Types
```typescript
// Form input types
interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  message: string
  agreeToTerms: boolean
}

// Form state
interface FormState<T> {
  data: T
  errors: Partial<Record<keyof T, string>>
  isSubmitting: boolean
  isSubmitted: boolean
}

// Form validation
type ValidationRule<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined
}

// Example validator
const contactFormValidator: ValidationRule<ContactFormData> = {
  name: (value) => !value ? 'Name is required' : undefined,
  email: (value) => !value.includes('@') ? 'Invalid email' : undefined,
  phone: (value) => value.length < 10 ? 'Phone must be 10+ digits' : undefined,
}
```

### WordPress/CMS Types
```typescript
// WordPress post
interface WPPost {
  id: number
  date: string
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  featured_media: number
  categories: number[]
  tags: number[]
  author: number
}

// Normalized for frontend
interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  featuredImage: string
  categories: Category[]
  author: Author
  publishedAt: Date
}

// Transform function with types
function transformWPPost(wpPost: WPPost): Post {
  return {
    id: wpPost.id.toString(),
    title: wpPost.title.rendered,
    content: wpPost.content.rendered,
    excerpt: wpPost.excerpt.rendered,
    slug: wpPost.slug,
    featuredImage: '', // Fetch separately
    categories: [], // Fetch separately
    author: {} as Author, // Fetch separately
    publishedAt: new Date(wpPost.date),
  }
}
```

### Database/Model Types
```typescript
// Service model
interface Service {
  id: string
  title: string
  slug: string
  description: string
  content: string
  icon: string
  featuredImage: string
  category: ServiceCategory
  features: string[]
  technologies: string[]
  pricing: {
    starting: number
    currency: string
  }
  metadata: {
    seoTitle: string
    seoDescription: string
    ogImage: string
  }
  status: 'draft' | 'published' | 'archived'
  createdAt: Date
  updatedAt: Date
}

// Case study model
interface CaseStudy {
  id: string
  title: string
  slug: string
  client: {
    name: string
    logo: string
    industry: string
  }
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    description: string
  }[]
  images: string[]
  technologies: string[]
  services: string[]
  testimonial?: {
    text: string
    author: string
    position: string
    avatar: string
  }
  publishedAt: Date
}
```

---

## Utility Types

### Built-in Utility Types
```typescript
// Partial - Makes all properties optional
interface Service {
  id: string
  title: string
  description: string
}

type PartialService = Partial<Service>
// { id?: string; title?: string; description?: string }

// Required - Makes all properties required
type RequiredService = Required<PartialService>

// Pick - Select specific properties
type ServicePreview = Pick<Service, 'id' | 'title'>
// { id: string; title: string }

// Omit - Exclude specific properties
type ServiceInput = Omit<Service, 'id'>
// { title: string; description: string }

// Record - Create object type with specific keys
type ServiceMap = Record<string, Service>
// { [key: string]: Service }

// Extract - Extract types from union
type Status = 'draft' | 'published' | 'archived'
type PublicStatus = Extract<Status, 'published' | 'archived'>
// 'published' | 'archived'

// Exclude - Exclude types from union
type DraftOnly = Exclude<Status, 'published' | 'archived'>
// 'draft'

// NonNullable - Remove null and undefined
type MaybeString = string | null | undefined
type DefiniteString = NonNullable<MaybeString>
// string

// ReturnType - Get function return type
function getService() {
  return { id: '1', title: 'Web Dev' }
}

type ServiceResult = ReturnType<typeof getService>
// { id: string; title: string }

// Parameters - Get function parameters
function updateService(id: string, data: Partial<Service>) {
  // ...
}

type UpdateParams = Parameters<typeof updateService>
// [string, Partial<Service>]

// Awaited - Unwrap Promise type
type ServicePromise = Promise<Service>
type UnwrappedService = Awaited<ServicePromise>
// Service
```

### Custom Utility Types
```typescript
// Make specific properties optional
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type ServiceWithOptionalDescription = Optional<Service, 'description'>
// id and title required, description optional

// Make specific properties required
type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

// Deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Nullable
type Nullable<T> = T | null

// ValueOf - Get union of all values
type ValueOf<T> = T[keyof T]

const STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
} as const

type Status = ValueOf<typeof STATUS>
// 'draft' | 'published'
```

---

## Type Guards & Narrowing

### Type Guards
```typescript
// Type predicate
function isService(obj: unknown): obj is Service {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'description' in obj
  )
}

// Usage
function processData(data: unknown) {
  if (isService(data)) {
    // TypeScript knows data is Service here
    console.log(data.title)
  }
}

// Array type guard
function isServiceArray(arr: unknown): arr is Service[] {
  return Array.isArray(arr) && arr.every(isService)
}

// Discriminated unions
type Result = 
  | { success: true; data: Service }
  | { success: false; error: string }

function handleResult(result: Result) {
  if (result.success) {
    // TypeScript knows result.data exists
    console.log(result.data.title)
  } else {
    // TypeScript knows result.error exists
    console.error(result.error)
  }
}
```

### Type Narrowing
```typescript
// typeof narrowing
function processValue(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value.toFixed(2)
}

// Truthiness narrowing
function printName(name: string | null | undefined) {
  if (name) {
    // TypeScript knows name is string here
    console.log(name.toUpperCase())
  }
}

// Equality narrowing
function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    // TypeScript knows both are string here
    console.log(x.toUpperCase(), y.toUpperCase())
  }
}

// 'in' operator narrowing
type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    animal.swim()
  } else {
    animal.fly()
  }
}

// instanceof narrowing
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message)
  } else {
    console.error('Unknown error:', error)
  }
}
```

### Assertion Functions
```typescript
// Assert function
function assertIsService(obj: unknown): asserts obj is Service {
  if (!isService(obj)) {
    throw new Error('Not a service')
  }
}

// Usage
function processService(data: unknown) {
  assertIsService(data)
  // TypeScript knows data is Service after this line
  console.log(data.title)
}

// Assert non-null
function assertNonNull<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error('Value is null or undefined')
  }
}

const service: Service | null = getService()
assertNonNull(service)
// TypeScript knows service is Service (not null)
console.log(service.title)
```

---

## Best Practices

### Type Inference
```typescript
// ✅ Let TypeScript infer when obvious
const name = 'UAE Digital' // Inferred as string
const count = 42 // Inferred as number
const services = ['web', 'mobile'] // Inferred as string[]

// ✅ Add explicit types for function parameters
function getService(id: string): Service {
  // id needs explicit type
  // return type can be inferred, but explicit is better
}

// ✅ Add explicit types for complex objects
const config: AppConfig = {
  apiUrl: process.env.API_URL,
  timeout: 5000,
}

// ❌ Don't add obvious types
const name: string = 'UAE Digital' // Redundant
```

### Avoid 'any'
```typescript
// ❌ Don't use any
function processData(data: any) {
  return data.foo.bar // No type safety
}

// ✅ Use unknown and narrow
function processData(data: unknown) {
  if (isValidData(data)) {
    return data.foo.bar // Type-safe
  }
  throw new Error('Invalid data')
}

// ✅ Use generics
function processData<T>(data: T): T {
  return data
}
```

### Non-Null Assertions (use sparingly)
```typescript
// ❌ Avoid non-null assertion when possible
const service = services.find(s => s.id === id)!
console.log(service.title) // Runtime error if not found

// ✅ Handle null case properly
const service = services.find(s => s.id === id)
if (!service) {
  throw new Error('Service not found')
}
console.log(service.title) // Type-safe

// ✅ Only use ! when you're absolutely certain
const element = document.getElementById('root')!
// Only if you know the element exists
```

### Type vs Interface Decision
```typescript
// ✅ Use Interface for object shapes
interface Service {
  id: string
  title: string
}

// ✅ Use Type for unions, intersections, mapped types
type Status = 'draft' | 'published'
type Timestamped = { createdAt: Date; updatedAt: Date }
type ServiceWithTimestamps = Service & Timestamped

// ✅ Use Interface for declaration merging (rare)
interface Window {
  customProperty: string
}
```

### Organizing Types
```typescript
// types/service.ts - Domain-specific types
export interface Service {
  id: string
  title: string
}

export type ServiceStatus = 'draft' | 'published'
export type ServiceCategory = 'web' | 'mobile' | 'cloud'

// types/api.ts - API types
export interface ApiResponse<T> {
  data: T
  error?: string
}

// types/common.ts - Shared utility types
export type Nullable<T> = T | null
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Import in components
import type { Service, ServiceStatus } from '@/types/service'
import type { ApiResponse } from '@/types/api'
```

---

## Common Patterns

### API Fetch with Types
```typescript
async function fetchServices(): Promise<Service[]> {
  try {
    const res = await fetch('/api/services')
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    
    const data: ApiResponse<Service[]> = await res.json()
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch services')
    }
    
    return data.data
  } catch (error) {
    if (error instanceof Error) {
      console.error('Fetch error:', error.message)
    }
    throw error
  }
}
```

### Form Handling with Types
```typescript
interface FormData {
  name: string
  email: string
  message: string
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  
  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await submitForm(formData)
    if (result.success) {
      console.log('Success!')
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={e => handleChange('name', e.target.value)}
      />
      {/* ... */}
    </form>
  )
}
```

---

## Checklist

### ✅ Do's
- ✅ Enable strict mode in tsconfig.json
- ✅ Use explicit types for function parameters
- ✅ Use explicit return types for public functions
- ✅ Prefer interfaces for object shapes
- ✅ Use type guards for runtime checks
- ✅ Leverage type inference when obvious
- ✅ Use unknown instead of any
- ✅ Create domain-specific type files
- ✅ Use discriminated unions for complex states
- ✅ Document complex types with comments

### ❌ Don'ts
- ❌ Don't use any without good reason
- ❌ Don't ignore TypeScript errors
- ❌ Don't use non-null assertions carelessly
- ❌ Don't add redundant type annotations
- ❌ Don't use enums (prefer const objects or unions)
- ❌ Don't bypass type checking with @ts-ignore
- ❌ Don't create overly complex types
- ❌ Don't forget to handle null/undefined
- ❌ Don't use type assertions unless necessary
- ❌ Don't leave TODO types for production

---

**Last Updated**: October 2025

