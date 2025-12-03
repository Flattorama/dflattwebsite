# Dan Flatt Portfolio

## Overview
This is Dan Flatt's creative developer portfolio website. It's a React + TypeScript + Vite application featuring:
- Interactive 3D header with custom Scene component
- Scrollable card stack showcasing selected work
- Modern UI with Tailwind CSS
- Navigation menu with links to About, Services, Speaking, Blogs, and Contact sections
- Multi-page routing with React Router

## Project Structure
- `src/` - Application source code
  - `components/` - React components (Card, CardStack, Navigation, Scene)
  - `pages/` - Page components (Home, Blog, About, Services)
  - `App.tsx` - Main application router component
  - `index.tsx` - Application entry point
  - `constants.ts` - Application constants
  - `types.ts` - TypeScript type definitions
  - `index.css` - Global styles
- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

## Technology Stack
- **Framework**: React 18.2.0 with React Router 6.x
- **Language**: TypeScript 5.0.0
- **Build Tool**: Vite 5.0.0
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: Lucide React 0.300.0
- **Fonts**: Google Fonts (Anton, Inter)
- **Animation**: GSAP with ScrollTrigger for scroll-driven animations
- **Routing**: React Router DOM for multi-page navigation

## Recent Changes (November 30, 2025)

### Card Stack Redesign (December 3, 2025)
- Updated CardData interface with new schema: clientName, projectTitle, years, imageAlt, themeColor
- Expanded card stack to 13 case study cards covering Dan's full career history
- Added external link detection: Cards with http:// links become clickable <a> tags with "Read Case Study" button
- Internal placeholder links (#/case-study-details) render as static <div> cards without buttons
- External URLs configured for: Lumin8 (lumin8.agency), Sportball (sportball.com), Digital Corporate Reporting (reports.tafsik.com)
- Added jiggle animation to "Read Case Study" button in Tailwind config

### Services Page Implementation
- Created comprehensive Services page at /services with:
  - **Hero Section**: Massive "GROWTH ARCHITECTURE" typography with floating tech symbols (paragraph ¶, code brackets {}, growth arrow, chart)
  - **Sticky Sidebar Navigation**: Left-side nav that highlights current section (01-06) based on scroll position using GSAP ScrollTrigger
  - **6 Service Sections** with case study cards:
    - 01. Fractional CMO (Sportball Franchise case study)
    - 02. Corporate Reporting (ESG Visualization case study)
    - 03. Crisis Leadership (Tafsik Advocacy case study)
    - 04. Legal Ops (Lumin8 Compliance case study)
    - 05. VR/AR Strategy (Metavrse Agency case study)
    - 06. Community Growth (Naborino case study)
  - **Secondary Services Section**: Capital Raise Prep, SaaS Product Strategy
  - **Footer CTA**: "Which Problem Are We Solving?" with three action buttons (Scale My Startup, Build My Report, Fix My Crisis)
- Updated Navigation: Replaced "Archive" with "Services" and added route mapping
- Added /services route to App.tsx

### About Page Implementation
- Installed GSAP animation library for scroll-triggered animations
- Created comprehensive About page at /about with multiple sections:
  - **Hero Section**: Massive "DAN FLATT" typography with floating animated bubbles (emoji icons representing speaking, law, tech, development)
  - **About Me Section**: Biographical content with 3D-rotating portrait card effect
  - **Services Section**: List of offerings with hover-to-reveal image interaction
  - **Ventures Section**: Card stack with scroll-triggered fan animation (cards spread apart on scroll)
  - **Speaking Section**: Photo pile layout with stacked polaroid-style images
  - **Recognition Section**: Awards list with accent-colored dividers
  - **Footer CTA**: "Ready to Build?" with contact button and large email
- Built reusable StickyHeaderSection component for signature shrinking header effect (headers start large, shrink and stick on scroll)
- Updated Navigation component to route ABOUT link to /about page
- Added About route to App.tsx router configuration
- Menu font updated from Bueno (font-display) to Anton (font-anton) for better readability

## Previous Changes (November 28, 2025)

### Initial Setup
- Configured for Replit environment
- Updated Vite config to use port 5000, host 0.0.0.0, and allow all hosts for proxy support
- Created .gitignore for Node.js/Vite projects
- Configured workflow for frontend dev server
- Set up deployment configuration for static site (builds to dist folder)

### Header Styling Updates
- Changed header (menu, logo, email) color to match hero purple (#8082f8)
- Updated email from hello@danflatt.com to hi@danflatt.ca
- Removed "Available January 2026" text
- Added DF logo color change to white when mobile menu is open

### React Router Multi-Page Refactor
- Installed react-router-dom dependency
- Created `src/pages/` directory with Home.tsx and Blog.tsx
- Refactored App.tsx to set up BrowserRouter with Routes for "/" and "/blog"
- Moved homepage content from App.tsx to Home.tsx
- Created placeholder Blog page component
- Updated Navigation component to use Link component for routing
- Updated build script to: `vite build && cp dist/index.html dist/404.html` for GitHub Pages compatibility
- BLOGS navigation link now routes to /blog using React Router

## Development
- **Dev Server**: Runs on port 5000 at 0.0.0.0
- **Command**: `npm run dev`
- **Preview URL**: Available through Replit webview

## Deployment
- **Type**: Static site deployment
- **Build Command**: `npm run build` (includes 404.html generation for routing)
- **Output Directory**: `dist`
- **Routing**: SPA routing handled by index.html fallback (404.html copy ensures GitHub Pages compatibility)

## Navigation
- Home: "/" - Main portfolio page with hero and work showcase
- About: "/about" - Comprehensive about page with GSAP scroll animations
- Services: "/services" - Services index page with sticky sidebar navigation
- Blog: "/blog" - Blog section with placeholder content
- Other links (Speaking, Contact) currently use anchor navigation

## User Preferences
None recorded yet.

## Project Architecture
- Single-page application with multi-page routing via React Router
- Component-based architecture with separate files for each major UI element
- Dedicated pages directory for route components
- Navigation component handles both router-based navigation (Link) and anchor-based navigation
- 3D interactive hero section using custom Scene component
- Card stack section for project showcases
- Fixed navigation overlay
- Responsive design using Tailwind CSS utilities
- Mobile-responsive hamburger menu with dynamic logo color
