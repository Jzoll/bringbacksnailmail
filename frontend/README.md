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

- **src/pages/** — Page components (Home, GetStarted, Inspiration, MyMailbox, Community, etc.)
- **src/components/** — Reusable UI components (Snail, Navigation, etc.)
- **src/services/** — API client helpers and utilities
- **src/styles/** — Plain CSS modules for styling

## Accessibility

- Desktop-first, mobile-compatible layout (≤360px tested)
- WCAG AA color contrast
- Keyboard navigation support
- Reduced motion support via `prefers-reduced-motion`
- Semantic HTML and ARIA labels

## Progress

- [ ] Frontend routing and navigation scaffolding
- [ ] Get Started content and checklist
- [ ] Resources library
- [ ] Inspiration page with prompt toggle
- [ ] Authentication UI (Register/Login)
- [ ] My Mailbox (archive upload, view, delete)
- [ ] Community stub page
- [ ] Snail animation with controls
- [ ] Accessibility audit and fixes
