# Tauwerk - Modern Web Application

A modern, responsive web application built with Next.js 15, featuring glassmorphic UI design and blue gradient theming. This project serves as a website for Tauwerk, a fetish community club in Mecklenburg-Vorpommern, providing event management, gallery features, and community information.

## 🚀 Features

- **Modern Tech Stack**
  - Next.js 15 with App Router and Turbopack
  - TypeScript with strict typing
  - Tailwind CSS with custom glassmorphic design system
  - Lucide-React icons
  - Dark/Light mode support via next-themes
  - Hybrid UI library (HeroUI + custom shadcn/ui components)

- **Core Functionality**
  - 🗓️ Dynamic event management with flexible date handling
  - � iCal export and Google Calendar integration
  - �🖼️ File-based gallery system with lightbox viewer
  - ✨ Responsive glassmorphic UI with blue gradient theming
  - 🔍 SEO-optimized with structured data (Schema.org)
  - 🎨 Configuration-driven content management
  - 🎯 Component variants using class-variance-authority (CVA)
  - 🗺️ Dynamic sitemap generation for better indexing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CaptainJackDE/tauwerk.git
   cd tauwerk
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev      # Starts dev server with Turbopack
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🛠️ Development Commands

```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint with auto-fix
```

## 🎨 Design System

The project uses a configuration-driven design system with:
- **Glassmorphic Components**: `backdrop-blur-2xl`, `bg-black/10`, `border-white/10`
- **Blue Gradient System**: All gradients centralized in `config/gradients.ts`
- **Component Variants**: CVA pattern for consistent styling (see `components/ui/button.tsx`)
- **German Language**: All content in German (no internationalization)

## 🏗️ Project Structure

```
tauwerk/
├── app/                     # Next.js 15 app directory (App Router)
│   ├── (routes)/           # Route groups for pages
│   ├── api/                # API routes (gallery, etc.)
│   ├── globals.css         # Global styles and CSS variables
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Homepage
├── components/             # React components
│   ├── ui/                 # Design system primitives (Button, Input, etc.)
│   ├── composites/         # Business logic components (Hero, Navigation, etc.)
│   └── providers/          # Context providers (ThemeProvider)
├── config/                 # Configuration and content
│   ├── constants.ts        # Site metadata and navigation
│   ├── events.ts           # Event data and utilities
│   ├── gradients.ts        # Design system gradient definitions
│   └── faq.ts              # FAQ content
├── lib/                    # Utility functions
│   └── utils.ts            # className merging and helpers
├── public/                 # Static assets
│   ├── gallery/            # Dynamic gallery images
│   └── images/             # Static images and icons
└── types/                  # TypeScript type definitions
    └── index.ts            # Shared interfaces and types
```

## 🛠️ Development

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom configuration
- **UI Components**: HeroUI (@heroui/*) + custom shadcn/ui components
- **Icons**: Lucide React exclusively
- **Animations**: Framer Motion for complex interactions
- **Type Safety**: TypeScript with strict configuration
- **Analytics**: Vercel Analytics integration

### Development Patterns
- **Configuration-Driven**: Content managed in `config/` files
- **Component Architecture**: Separation between UI primitives and business composites
- **Utility-First**: Use `cn()` utility for className merging
- **German-First**: All UI text in German language
- **File-Based APIs**: Gallery images served from `public/gallery/`

### Code Style
- Follow existing patterns and use ESLint for consistency
- Use TypeScript interfaces for all data structures
- Prefer configuration over hardcoded values
- Use absolute imports with `@/` path aliases

## 🚀 Deployment

### Vercel (Recommended)

This project is optimized for deployment on Vercel:

1. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy from project root
   vercel
   ```

2. **Automatic Deployments**
   - Connect your GitHub repository to Vercel
   - Automatic deployments on push to main branch
   - Preview deployments for pull requests

3. **Environment Configuration**
   - No environment variables required for basic functionality
   - Vercel Analytics automatically configured

### Manual Deployment

For other platforms (Netlify, Railway, etc.):

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Static Export (optional)**
   ```bash
   # Add to next.config.js: output: 'export'
   npm run build
   # Deploy the 'out' directory
   ```

### Gallery Setup

The gallery automatically discovers images from the `public/gallery/` folder:

1. **Add images to gallery folder**
   ```bash
   # Create gallery directory if it doesn't exist
   mkdir -p public/gallery
   
   # Add your images (supported: .jpg, .jpeg, .png, .gif, .webp, .avif)
   cp your-images/* public/gallery/
   ```

2. **How it works**
   - **Node.js Runtime**: API uses `runtime = 'nodejs'` for fs support on Vercel
   - **Automatic Discovery**: Images are dynamically read from the folder
   - **Smart Alt Text**: Filenames are converted to readable alt text
   - **Sorting**: Images sorted by modification date (newest first)

3. **Supported Formats**
   - JPG, JPEG, PNG, GIF, WebP, AVIF
   - Files are automatically discovered and optimized
   - Alt text generated from filename (underscores/dashes become spaces)

**Note**: The API now uses Node.js runtime on Vercel to enable filesystem access. This ensures the gallery works automatically without manual configuration.

### Events Setup (Dynamic)

Events can be edited in real-time via a JSON file, either locally or from a remote server.

1. **Local JSON (default)**
   - Edit `public/events.json`
   - The API route `/api/events` reads from this file

2. **Remote JSON (optional)**
   - Host a JSON at a URL returning either `{ events: [...] }` or `[...]`
   - Set environment variable:
     - `NEXT_PUBLIC_EVENTS_URL=https://example.com/events.json`
   - The API will fetch remotely with `cache: 'no-store'` for real-time updates

3. **Event Builder & Editor**
   - Navigate to `/events/builder` for single-event creation with JSON output
   - Navigate to `/events/editor` for batch upload/edit/download capabilities
   - Interactive UI with copy-to-clipboard and download features

4. **Calendar Export Features**
   - **iCal Download**: Each event card includes a `.ics` download button
   - **Google Calendar**: Direct "Add to Google Calendar" integration
   - **Utilities**: Calendar functions in `lib/calendar-utils.ts`

5. **SEO Optimization**
   - **Structured Data**: JSON-LD Schema.org Event markup on every event
   - **Open Graph**: Social media preview tags for sharing
   - **Dynamic Sitemap**: Auto-generated sitemap.xml including all events
   - **Robots.txt**: Configured for optimal search engine crawling

6. **Types and Utilities**
   - Event TypeScript interfaces remain defined in `config/events.ts`
   - Sorting helper in `lib/events-loader.ts` ensures consistent ordering
   - SEO utilities in `lib/seo-utils.ts` for structured data generation

7. **Notes**
   - Local JSON is served from `public/events.json` and is cache-bypassed in API
   - Remote URL has priority when `NEXT_PUBLIC_EVENTS_URL` is set
   - No server restart needed for remote updates
   - Builder/Editor pages excluded from search engine indexing

### Content Management

All site content is now centrally managed in a single configuration file:

- **Central Config**: `config/appsettings.json` - Contains all site configuration
  - Site metadata (name, description, social links)
  - Navigation structure
  - Legal/Imprint information
  - Events data
  - Alerts configuration
  - FAQ entries
  - About page content (values, team members)

- **TypeScript Accessors**: The following files provide typed access to appsettings.json:
  - `config/constants.ts` - Exports SITE, NAVIGATION, LEGAL
  - `config/events.ts` - Exports event data and utility functions
  - `config/alerts.ts` - Via `lib/alerts.ts` (loads from appsettings)
  - `config/faq.ts` - Exports FAQ with icon mapping
  - `config/about.ts` - Exports values and team members with icon mapping

- **Design System**: `config/gradients.ts` - Gradient definitions (unchanged)

**Migration**: The old separate files (`events.json`, `alerts.json`, `faq.ts`, `about.ts`) have been merged into `appsettings.json`. All components automatically reference the new structure via the existing TypeScript files.

### Performance Optimization

- Images are automatically optimized with Next.js Image component
- Vercel Analytics included for performance monitoring
- Turbopack for faster development builds

## 🐛 Troubleshooting

### Gallery shows "Oops" error on Vercel but works locally

**Problem**: Edge Runtime limitations with filesystem access.

**Solution**: The gallery now uses Node.js runtime (`export const runtime = 'nodejs'`) which enables filesystem access on Vercel.

**How it works**:
- **Local Development**: Direct filesystem access through Node.js
- **Vercel Production**: Node.js runtime maintains filesystem capability
- **Performance**: Images are cached and sorted automatically
- **Auto-Discovery**: Simply add images to `public/gallery/` folder

**Alternative Solutions** (if Node.js runtime causes issues):
1. Use the build-time generation script: `npm run gallery:generate`
2. Switch to the cached version in `route-cached.ts`
3. Use external image hosting (Cloudinary, etc.)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions about the Tauwerk community, visit the website or reach out via:
- Instagram: [@tauwerk_mv](https://instagram.com/tauwerk_mv)
- Telegram: [@tauwerk](https://t.me/tauwerk)
- Email: info@tauwerk.de

For technical issues with this website, please open an issue in the repository.

---

Built with ❤️ in Mecklenburg-Vorpommern using Next.js 15 and Tailwind CSS
