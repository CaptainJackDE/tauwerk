# Tauwerk - AI Development Guide

## Project Overview
Tauwerk is a modern German fetish community website built with Next.js 15 + App Router, featuring glassmorphic UI design and blue gradient theming. The site serves a fetish club in Mecklenburg-Vorpommern with events, gallery, and community features.

## Architecture & Key Patterns

### Design System
- **Glassmorphic UI**: Heavy use of `backdrop-blur-2xl`, `bg-black/10`, `border-white/10` for glass effects
- **Blue Gradient System**: All gradients defined in `config/gradients.ts` - use these constants, never inline gradients
- **Component Variants**: Uses `class-variance-authority` (CVA) pattern - see `components/ui/button.tsx` as reference
- **Utility Pattern**: Always use `cn()` utility from `lib/utils.ts` for className merging

### Component Architecture
```
components/
├── ui/           # Low-level design system components (Button, Input, etc.)
├── composites/   # Business logic components (Hero, Navigation, etc.)  
└── providers/    # Context providers (ThemeProvider)
```

### Configuration-Driven Content
- **Site Constants**: `config/constants.ts` - SITE object contains all site metadata
- **Navigation**: Centralized in `NAVIGATION.items` - always reference this array
- **Events**: Event data and utilities in `config/events.ts` with TypeScript interfaces and German locale formatting
- **FAQ**: Content managed in `config/faq.ts`

### Event Management System
- **Structured Events**: Events use TypeScript interfaces with categories (csd, fetish, private, other)
- **Flexible Dating**: Supports partial dates (year-only, month-year) with TBA handling
- **Registration Logic**: Built-in registration status with German text formatting
- **Utility Functions**: `getTodayEvent()`, `formatEventDate()`, `getUpcomingEvents()` for date handling

### Styling Conventions
- **German Language**: All UI text should be in German (no i18n system - German-only approach)
- **Responsive**: Mobile-first with `md:` breakpoints
- **Animations**: Use predefined animations from `tailwind.config.ts` (gradient-x, gradient-y)
- **Typography**: Headings use gradient text via `gradients.title.primary` class

### API & Data Patterns
- **File-Based Gallery**: `/api/gallery` route dynamically reads `public/gallery/` directory
- **Client-Side Fetching**: Gallery page uses `useEffect` + `fetch()` pattern for API calls
- **Error Handling**: German error messages with try-catch patterns

### File Conventions
- **Client Components**: Use `"use client"` directive for interactivity
- **Absolute Imports**: Always use `@/` path aliases
- **TypeScript**: Strict typing - see `types/index.ts` for shared types

## Development Workflow

### Commands
```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run lint         # ESLint with auto-fix
```

### Key Dependencies
- **UI Library**: Mixture of HeroUI (@heroui/*) and custom shadcn/ui components
- **Icons**: Lucide React exclusively
- **Animations**: Framer Motion for complex animations
- **Theme**: next-themes for dark/light mode

### Common Tasks
- **New Pages**: Create in `app/` directory following App Router conventions
- **Styling**: Extend `tailwind.config.ts` for new design tokens
- **Components**: Follow CVA pattern for variants, use TypeScript for props
- **Content**: Update relevant config files rather than hardcoding strings

## Integration Points
- **Analytics**: Vercel Analytics integrated in root layout
- **Themes**: ThemeProvider wraps entire app for dark/light mode
- **Navigation**: Fixed glassmorphic header with backdrop blur
- **Background**: Global Background component provides animated gradient backdrop

## Critical Files
- `app/layout.tsx`: Root layout with providers and footer
- `components/composites/Navigation.tsx`: Main navigation component
- `config/constants.ts`: Site metadata and navigation structure
- `config/gradients.ts`: Design system gradient definitions
- `tailwind.config.ts`: Extended Tailwind configuration