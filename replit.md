# Dan Flatt Portfolio

## Overview
This is Dan Flatt's creative developer portfolio website. It's a React + TypeScript + Vite application featuring:
- Interactive 3D header with custom Scene component
- Scrollable card stack showcasing selected work
- Modern UI with Tailwind CSS
- Navigation menu with links to About, Archive, Speaking, Blogs, and Contact sections

## Project Structure
- `src/` - Application source code
  - `components/` - React components (Card, CardStack, Navigation, Scene)
  - `App.tsx` - Main application component
  - `index.tsx` - Application entry point
  - `constants.ts` - Application constants
  - `types.ts` - TypeScript type definitions
- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

## Technology Stack
- **Framework**: React 18.2.0
- **Language**: TypeScript 5.0.0
- **Build Tool**: Vite 5.0.0
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: Lucide React 0.300.0
- **Fonts**: Google Fonts (Anton, Inter)

## Recent Changes (November 28, 2025)
- Configured for Replit environment
- Updated Vite config to use port 5000, host 0.0.0.0, and allow all hosts for proxy support
- Created .gitignore for Node.js/Vite projects
- Configured workflow for frontend dev server
- Set up deployment configuration for static site (builds to dist folder)

## Development
- **Dev Server**: Runs on port 5000 at 0.0.0.0
- **Command**: `npm run dev`
- **Preview URL**: Available through Replit webview

## Deployment
- **Type**: Static site deployment
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- The site is configured to deploy as a static site with production-optimized builds

## User Preferences
None recorded yet.

## Project Architecture
- Single-page application with smooth scroll navigation
- Component-based architecture with separate files for each major UI element
- 3D interactive hero section using custom Scene component
- Card stack section for project showcases
- Fixed navigation overlay
- Responsive design using Tailwind CSS utilities
