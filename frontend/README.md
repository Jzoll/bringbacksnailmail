# Bring Back Snail Mail — Frontend

React + Vite based single-page application for the Snail Mail project.

## Setup

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Run development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Build for production
```bash
npm run build
npm run preview
```

## Architecture

- **src/main.tsx** — React root entry point
- **src/App.tsx** — Root component with BrowserRouter, routes, global navigation, auth state management
- **src/pages/** — Page components (Home, GetStarted, Inspiration, Resources, Community, MyMailbox)
- **src/components/** — Reusable UI components (Snail with animation controls)
- **src/services/** — API client helpers (promptsClient, authClient, mailClient)
- **src/styles/** — CSS modules for pages and components (index.css for global styles)

## Accessibility

- Desktop-first, mobile-compatible layout (tested down to 360px width)
- WCAG AA color contrast ratios
- Keyboard navigation support with visible focus states
- Reduced motion support via `prefers-reduced-motion` media query
- Semantic HTML with proper heading hierarchy
- ARIA labels for interactive elements and form inputs
- 44px minimum touch target sizes for mobile

## Features Implemented

- ✅ Frontend routing and navigation scaffolding (React Router 6)
- ✅ Home page with animated snail mascot (progressive enhancement)
- ✅ Get Started page with 5-step checklist and envelope addressing guide
- ✅ Resources library with categorized postal guidelines and templates
- ✅ Inspiration page with writing/drawing prompt toggle
- ✅ Authentication flow (Register/Login/Logout with JWT token management)
- ✅ My Mailbox (upload mail photos, organize by tabs, view in modal, delete with confirmation)
- ✅ Community stub page explaining moderation-first roadmap
- [ ] Snail animation with controls
- [ ] Accessibility audit and fixes
