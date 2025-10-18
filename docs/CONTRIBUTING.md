# Contributing Guide - UAE Digital Agency

## Welcome! 👋

Thank you for considering contributing to the UAE Digital Agency project! This guide will help you understand how to contribute effectively to our codebase.

---

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Pull Request Process](#pull-request-process)
7. [Commit Guidelines](#commit-guidelines)
8. [Review Process](#review-process)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring environment for all contributors. We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Examples of behavior that contributes to a positive environment:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**

- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team. All complaints will be reviewed and investigated promptly and fairly.

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js**: v18.17+ or v20.0+
- **npm** or **pnpm**: Latest version
- **Git**: Latest version
- **Code editor**: VS Code recommended
- **Basic knowledge** of:
  - Next.js 14/15 App Router
  - React 18+
  - TypeScript
  - Tailwind CSS

### Setup Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/uae-digital-fresh.git
   cd uae-digital-fresh
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/uae-digital-fresh.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

5. **Create `.env.local`** (see `.env.example` if available)

6. **Start development server**:
   ```bash
   npm run dev
   ```

7. **Verify setup**: Open [http://localhost:3000](http://localhost:3000)

---

## How to Contribute

### Types of Contributions

We welcome many types of contributions:

#### 🐛 Bug Reports
Found a bug? Help us fix it!

**Before submitting:**
- Check if the issue already exists
- Verify it's reproducible
- Gather relevant information (browser, OS, steps to reproduce)

**Submit a bug report:**
1. Go to [GitHub Issues](https://github.com/org/repo/issues)
2. Click "New Issue"
3. Choose "Bug Report" template
4. Fill in all required information
5. Add screenshots/videos if helpful

#### ✨ Feature Requests
Have an idea for improvement?

**Before submitting:**
- Check if it's already been requested
- Consider if it fits the project scope
- Think about implementation details

**Submit a feature request:**
1. Go to [GitHub Issues](https://github.com/org/repo/issues)
2. Click "New Issue"
3. Choose "Feature Request" template
4. Describe the feature and its benefits
5. Suggest implementation approach (optional)

#### 📝 Documentation
Documentation improvements are always welcome!

**Areas to contribute:**
- Fix typos or unclear explanations
- Add missing documentation
- Improve code examples
- Update outdated information
- Translate documentation

#### 💻 Code Contributions

**Good first issues:**
Look for issues labeled `good first issue` or `help wanted`

**What we're looking for:**
- Bug fixes
- New features (discuss first in an issue)
- Performance improvements
- Code refactoring
- Test coverage improvements
- Accessibility improvements

---

## Development Workflow

### 1. Create a Branch

Always work on a separate branch:

```bash
# Sync with upstream
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `perf/` - Performance improvements
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Changes

Follow our [coding standards](#coding-standards) while making changes:

```bash
# Make your changes
# ...

# Test your changes locally
npm run dev

# Check types
npm run type-check

# Format code (if configured)
npm run format

# Run linter (if configured)
npm run lint
```

### 3. Commit Changes

Follow our [commit guidelines](#commit-guidelines):

```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat(services): add booking functionality to service pages"
```

### 4. Push Changes

```bash
# Push to your fork
git push origin feature/your-feature-name
```

### 5. Create Pull Request

1. Go to your fork on GitHub
2. Click "Pull Request"
3. Select base branch (usually `develop`)
4. Fill out the PR template
5. Submit for review

---

## Coding Standards

### TypeScript

```typescript
// ✅ Use explicit types for parameters
function getService(id: string): Promise<Service> {
  return fetch(`/api/services/${id}`).then(res => res.json())
}

// ✅ Use interfaces for object shapes
interface ServiceProps {
  id: string
  title: string
  description: string
}

// ✅ Avoid 'any' type
// ❌ function process(data: any) {}
// ✅ function process(data: unknown) {}

// ✅ Use type inference when obvious
const count = 5 // Inferred as number
const name = 'UAE Digital' // Inferred as string
```

### React Components

```typescript
// ✅ Use functional components
export function ServiceCard({ service }: ServiceCardProps) {
  return <div>{/* ... */}</div>
}

// ✅ Server Components by default
export default async function ServicesPage() {
  const services = await getServices()
  return <ServicesList services={services} />
}

// ✅ Add 'use client' only when needed
'use client'

import { useState } from 'react'

export function InteractiveComponent() {
  const [state, setState] = useState(false)
  return <button onClick={() => setState(!state)}>Toggle</button>
}

// ✅ Extract complex logic to custom hooks
export function useWindowSize() {
  // Hook logic
}
```

### Styling with Tailwind

```typescript
// ✅ Use Tailwind utility classes
<div className="flex items-center justify-between px-6 py-4">

// ✅ Use cn() utility for conditional classes
<button className={cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-600',
  isDisabled && 'opacity-50'
)}>

// ✅ Extract repeated patterns to components
// Instead of repeating:
<div className="rounded-lg border p-6 shadow-sm">
// Create:
<Card>

// ✅ Mobile-first responsive design
<div className="text-base md:text-lg lg:text-xl">

// ❌ Avoid arbitrary values when possible
<div className="w-[234px]"> // Use design system values

// ✅ Use design system values
<div className="w-56">
```

### File Organization

```typescript
// Component file structure:

// 1. Imports - External
import { useState } from 'react'
import Link from 'next/link'

// 2. Imports - Internal absolute
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

// 3. Imports - Relative
import { ServiceCard } from './ServiceCard'

// 4. Types
import type { Service } from '@/types/service'

// 5. Component
export function ServicesList({ services }: Props) {
  return <div>{/* ... */}</div>
}
```

### Naming Conventions

```typescript
// Components - PascalCase
ServiceCard, UserProfile, BookingForm

// Functions - camelCase
getServices, formatDate, handleSubmit

// Variables - camelCase
userName, isLoading, hasError

// Constants - UPPER_SNAKE_CASE
API_BASE_URL, MAX_ITEMS, DEFAULT_TIMEOUT

// Types/Interfaces - PascalCase
interface Service {}
type ServiceStatus = 'active' | 'inactive'

// Files - kebab-case (folders and non-component files)
service-card.test.ts, use-window-size.ts

// Component files - PascalCase
ServiceCard.tsx, UserProfile.tsx
```

---

## Pull Request Process

### Before Submitting

**Checklist:**
- [ ] Code follows project coding standards
- [ ] TypeScript types are correct (no errors)
- [ ] Code is formatted properly
- [ ] All new code has JSDoc comments (if complex)
- [ ] Components are responsive (mobile, tablet, desktop)
- [ ] Dark mode is supported (if applicable)
- [ ] Accessibility is considered (ARIA, keyboard nav)
- [ ] No console errors or warnings
- [ ] Code has been tested locally
- [ ] Branch is up to date with base branch

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Related Issue
Closes #123

## Changes Made
- Added booking functionality to service pages
- Implemented calendar component
- Added form validation with Zod

## Screenshots (if applicable)
[Add screenshots here]

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile devices
- [ ] Tested dark mode
- [ ] Tested keyboard navigation

## Additional Notes
Any additional context or notes for reviewers
```

### PR Guidelines

**Do's:**
- ✅ Keep PRs focused and small (< 400 lines when possible)
- ✅ Write clear, descriptive titles
- ✅ Include screenshots for UI changes
- ✅ Link related issues
- ✅ Respond to feedback promptly
- ✅ Keep PR updated with base branch
- ✅ Be open to suggestions

**Don'ts:**
- ❌ Don't submit PRs with unrelated changes
- ❌ Don't include commented-out code
- ❌ Don't ignore CI/CD failures
- ❌ Don't force push after review started
- ❌ Don't take feedback personally

---

## Commit Guidelines

### Conventional Commits

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring (no feature change)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, config)
- **ci**: CI/CD changes
- **build**: Build system changes

### Scope

Optional, but helps clarify what area is affected:

- **services**: Service-related changes
- **booking**: Booking functionality
- **api**: API endpoints
- **ui**: UI components
- **types**: TypeScript types
- **docs**: Documentation

### Examples

```bash
# Feature
feat(services): add booking button to service cards
feat(api): implement contact form endpoint
feat: add dark mode support

# Bug fix
fix(navigation): resolve mobile menu z-index issue
fix(booking): correct date validation logic
fix: resolve TypeScript build errors

# Documentation
docs(readme): update setup instructions
docs: add component usage examples

# Refactoring
refactor(api): simplify data fetching logic
refactor: extract repeated button styles to component

# Performance
perf(images): optimize hero image loading
perf: implement lazy loading for case studies

# Style
style: format code with Prettier
style: fix indentation in services page

# Chore
chore: update dependencies
chore(deps): upgrade Next.js to 14.2.0
```

### Commit Message Rules

1. **Use imperative mood**: "add" not "added" or "adds"
2. **Keep subject line < 72 characters**
3. **Capitalize first letter** of subject
4. **No period** at the end of subject
5. **Separate subject and body** with blank line
6. **Use body** to explain what and why, not how

**Good commits:**
```bash
feat(booking): add calendar component with date selection

- Implement calendar UI with Tailwind
- Add date validation logic
- Support disabled dates
- Include keyboard navigation

Closes #45
```

**Bad commits:**
```bash
# ❌ Too vague
git commit -m "fix stuff"

# ❌ Not following convention
git commit -m "Fixed the bug in the booking form"

# ❌ Multiple unrelated changes
git commit -m "add booking, fix navigation, update docs"
```

---

## Review Process

### What to Expect

1. **Initial Review**: Within 1-3 business days
2. **Feedback**: Constructive comments and suggestions
3. **Iterations**: You may need to make changes
4. **Approval**: At least one approval required
5. **Merge**: After approval and passing CI checks

### Responding to Feedback

**When you receive feedback:**
- Read comments carefully
- Ask questions if unclear
- Make requested changes
- Comment when changes are made
- Be professional and respectful

**Example responses:**
```markdown
✅ "Good catch! Fixed in latest commit."
✅ "I've updated the component as suggested. Let me know if it looks better."
✅ "I'm not sure I understand this comment. Could you elaborate?"
✅ "I considered this approach, but went with X because Y. Thoughts?"

❌ "This is fine as is."
❌ "I don't agree." (without explanation)
❌ "Whatever, changing it."
```

### Reviewer Guidelines

**When reviewing PRs:**
- Be constructive and specific
- Explain the "why" behind suggestions
- Acknowledge good work
- Focus on code, not the person
- Approve when ready, even if minor suggestions remain
- Be timely with reviews

**Example review comments:**
```markdown
✅ "This component could be more performant if we memoize it with React.memo, 
   since it's re-rendering on every parent update."

✅ "Great work on the accessibility! One suggestion: could we add 
   aria-label to the icon button for screen readers?"

✅ "Nice solution! Consider extracting this logic to a custom hook 
   for reusability."

❌ "This is wrong."
❌ "Why did you do it this way?"
❌ "Bad code."
```

---

## Testing Your Changes

### Manual Testing Checklist

Before submitting your PR:

#### Functionality
- [ ] Feature works as intended
- [ ] No console errors or warnings
- [ ] All interactions work correctly
- [ ] Form validation works (if applicable)
- [ ] API calls succeed (if applicable)

#### Responsive Design
- [ ] Mobile (< 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (> 1024px)
- [ ] Large screens (> 1920px)

#### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader friendly (test with NVDA/VoiceOver)
- [ ] Color contrast meets WCAG AA
- [ ] Alt text for images

#### Performance
- [ ] Page loads quickly (< 3s)
- [ ] No layout shift (CLS)
- [ ] Images optimized
- [ ] No unnecessary re-renders

---

## Additional Resources

### Documentation
- [Next.js Guide](./NEXTJS_GUIDE.md)
- [React Guide](./REACT_GUIDE.md)
- [TypeScript Guide](./TYPESCRIPT_GUIDE.md)
- [Tailwind Guide](./TAILWIND_GUIDE.md)
- [Architecture](./ARCHITECTURE.md)
- [Development Guide](./DEVELOPMENT.md)
- [Components](./COMPONENTS.md)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org)

### Getting Help

**Have questions?**
1. Check existing documentation
2. Search closed issues on GitHub
3. Ask in team chat (Slack/Discord)
4. Create a GitHub discussion
5. Reach out to maintainers

**Found a security issue?**
Please **DO NOT** create a public issue. Instead:
1. Email security@example.com
2. Include detailed description
3. Wait for response before disclosure

---

## Recognition

### Contributors

We appreciate all contributions! Contributors will be:
- Listed in our contributors page
- Mentioned in release notes
- Given credit in relevant documentation

### Becoming a Maintainer

Regular contributors may be invited to become maintainers. Maintainers have:
- Write access to the repository
- Ability to review and merge PRs
- Influence on project direction
- Additional responsibilities

**Criteria:**
- Consistent quality contributions
- Good understanding of codebase
- Helpful in reviews and discussions
- Aligned with project values

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

---

## Thank You! 🎉

Every contribution, no matter how small, makes a difference. We appreciate your time and effort in making this project better!

**Happy coding!** 💻

---

**Last Updated**: October 2025

---

## Quick Reference

### Common Tasks

```bash
# Setup
git clone https://github.com/USERNAME/uae-digital-fresh.git
cd uae-digital-fresh
npm install
npm run dev

# Create branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat(scope): description"

# Push and create PR
git push origin feature/my-feature
# Then create PR on GitHub

# Update branch with latest changes
git checkout develop
git pull upstream develop
git checkout feature/my-feature
git rebase develop

# Fix conflicts (if any)
# Edit conflicted files
git add .
git rebase --continue
git push origin feature/my-feature --force
```

### Useful Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run type-check   # Check TypeScript types
npm run lint         # Run linter (if configured)
npm run format       # Format code (if configured)
```

### Need Help?

- **Documentation**: Check `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/org/repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/org/repo/discussions)
- **Chat**: Team Slack/Discord channel

