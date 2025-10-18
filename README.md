# UAE Digital Agency - Modern Digital Solutions Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=for-the-badge&logo=tailwind-css)

**A cutting-edge digital agency website built with Next.js 15, featuring headless WordPress integration, multi-language support, and modern web technologies.**

[Live Demo](#) · [Documentation](./docs/README.md) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 🌟 Features

### ✨ Core Capabilities
- 🚀 **Next.js 15 App Router** - Latest Next.js with Server Components
- ⚡ **Turbopack** - Lightning-fast builds and hot reload
- 🎨 **Tailwind CSS** - Modern utility-first styling
- 🔒 **TypeScript** - Type-safe development
- 🌍 **Multi-language** - English & Arabic (RTL support)
- 📱 **Fully Responsive** - Mobile-first design

### 🎯 Key Features
- 📝 **Headless WordPress** - WPGraphQL & REST API integration
- 🎭 **Dynamic Routes** - Services, Cases, Solutions, Tools
- 📧 **Contact System** - EmailJS integration
- 📅 **Booking System** - Interactive calendar & time slots
- 💬 **Live Chat** - Bodylab chat widget integration
- 🎬 **Animations** - Framer Motion & GSAP
- 🌓 **Dark Mode Ready** - Dark mode support
- ♿ **Accessible** - WCAG 2.1 AA compliant

### ⚡ Performance
- ⚡ **Server Components** - Zero JS for static content
- 🔄 **ISR** - Incremental Static Regeneration
- 🖼️ **Image Optimization** - Automatic next/image optimization
- 📦 **Code Splitting** - Optimized bundle sizes
- 🚀 **Edge Ready** - Standalone build for deployment

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17+ or 20.0+
- **npm** 9.0+ or **pnpm** 8.0+
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/uae-digital-fresh.git
cd uae-digital-fresh

# Install dependencies
npm install
# or
pnpm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

---

## 📁 Project Structure

```
uae-digital-fresh/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Public pages
│   └── api/               # API endpoints
├── components/            # React components
├── lib/                   # Utilities & API clients
├── messages/              # i18n translations (en, ar)
├── public/                # Static assets
└── docs/                  # Documentation
```

**📖 Detailed structure explanation:** [Project Structure Documentation](./docs/PROJECT_STRUCTURE.md)

---

## 🛠️ Technology Stack

### Core
- **[Next.js 15.3](https://nextjs.org/)** - React framework
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 3](https://tailwindcss.com/)** - Styling

### Features & Integrations
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[GraphQL](https://graphql.org/)** - API queries
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[EmailJS](https://www.emailjs.com/)** - Email service
- **[Three.js](https://threejs.org/)** - 3D graphics
- **[GSAP](https://greensock.com/gsap/)** - Advanced animations

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# WordPress Backend
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://your-wordpress-site.com/graphql
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

**📖 Full configuration guide:** [Development Guide](./docs/DEVELOPMENT.md)

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking (if configured)
```

---

## 📚 Documentation

Comprehensive documentation is available in the [`/docs`](./docs) directory:

### 🎯 Getting Started
- **[Project Overview](./PROJECT_OVERVIEW.md)** - High-level project summary
- **[Project Structure](./docs/PROJECT_STRUCTURE.md)** - Detailed codebase explanation ⭐
- **[Development Guide](./docs/DEVELOPMENT.md)** - Setup & workflow
- **[Contributing Guide](./docs/CONTRIBUTING.md)** - How to contribute

### 📖 Technology Guides
- **[Next.js Guide](./docs/NEXTJS_GUIDE.md)** - App Router, Server Components, ISR
- **[React Guide](./docs/REACT_GUIDE.md)** - Component patterns & hooks
- **[TypeScript Guide](./docs/TYPESCRIPT_GUIDE.md)** - Type patterns & best practices
- **[Tailwind Guide](./docs/TAILWIND_GUIDE.md)** - Styling system & design tokens

### 🏗️ Architecture
- **[Architecture](./docs/ARCHITECTURE.md)** - System design & decisions
- **[Components](./docs/COMPONENTS.md)** - Component library reference

**📖 Full documentation index:** [Documentation README](./docs/README.md)

---

## 🎨 Design System

### Color Palette
- **Primary:** Blue (#2563eb)
- **Neutral:** Grays (50-950)
- **Dark Mode:** Neutral-950 backgrounds

### Typography
- **Font:** Inter (Google Fonts)
- **Scale:** text-xs (12px) to text-8xl (96px)

### Breakpoints
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px

**📖 Complete design system:** [Tailwind Guide](./docs/TAILWIND_GUIDE.md)

---

## 🗺️ Roadmap

### Current (v0.1.0)
- ✅ Next.js 15 App Router setup
- ✅ WordPress headless CMS integration
- ✅ Multi-language support (EN/AR)
- ✅ Booking & contact systems
- ✅ Responsive design
- ✅ Comprehensive documentation

### Planned
- [ ] Unit & integration tests
- [ ] Storybook component library
- [ ] Performance monitoring
- [ ] Advanced analytics
- [ ] Blog functionality
- [ ] Admin dashboard

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

**📖 Contribution guidelines:** [Contributing Guide](./docs/CONTRIBUTING.md)

### Code of Conduct
We follow a [Code of Conduct](./docs/CONTRIBUTING.md#code-of-conduct) to ensure a welcoming environment for all contributors.

---

## 📊 Project Stats

- **Lines of Code:** ~15,000+
- **Components:** 20+
- **API Endpoints:** 13+
- **Routes:** 8 main routes + dynamic
- **Languages:** 2 (English, Arabic)
- **Documentation:** 10 comprehensive guides

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea?

- **Bug Reports:** [Create an issue](../../issues/new?template=bug_report.md)
- **Feature Requests:** [Create an issue](../../issues/new?template=feature_request.md)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For hosting and deployment tools
- **Tailwind Labs** - For Tailwind CSS
- **WordPress Community** - For the headless CMS ecosystem
- **All Contributors** - Thank you for your contributions!

---

## 📞 Contact & Support

- **Website:** [https://uaedigitalsolution.agency](https://uaedigitalsolution.agency)
- **Email:** contact@uaedigitalsolution.agency
- **Issues:** [GitHub Issues](../../issues)
- **Discussions:** [GitHub Discussions](../../discussions)

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐!

---

<div align="center">

**Built with ❤️ by UAE Digital Agency Team**

[Documentation](./docs/README.md) · [Project Structure](./docs/PROJECT_STRUCTURE.md) · [Contributing](./docs/CONTRIBUTING.md)

**© 2025 UAE Digital Agency. All rights reserved.**

</div>
