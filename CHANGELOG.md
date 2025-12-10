# Changelog

All notable changes to the Bring Back Snail Mail project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Frontend: Get Started page with 5-step checklist (Write, Address, Stamp, Seal, Mail) and CTAs to Inspiration and Mailbox
- Frontend: Resources library page with categorized guides (Postal Guidelines, Templates, Supplies, How-To, Legal/Privacy, External Links, Glossary)
- Frontend: Community Wall stub page with moderation-first roadmap and safety principles
- Frontend: Navigation updated with links to Get Started, Resources, and Community pages
- Frontend: Shared styling for Get Started and Resources pages with responsive breakpoints
- Frontend: Snail animation component with Fast/Slow speed controls and prefers-reduced-motion support
- Frontend: Snail integrated into Home page hero section as progressive enhancement
- Accessibility: Animation respects user's reduced motion preferences with graceful degradation

## [0.1.0] - 2025-12-09

### Added
- **Phase 1 (Setup)**: Project structure and foundation
  - Backend: FastAPI app with structured JSON logging
  - Database: SQLAlchemy models (User, Prompt, ArchivedMail)
  - Migrations: Alembic setup with initial schema
  - Configuration: `.env.example` with all required settings
  - Dependencies: `requirements.txt` for Python packages
  - Frontend: Vite + React + TypeScript scaffolding
  - Documentation: Backend and frontend README files
  - Ignore files: `.gitignore`, `.dockerignore`, `.eslintignore`

- **Phase 2 (Foundation)**: Core endpoints and middleware
  - `GET /health` - Health check endpoint
  - `GET /prompts?type=writing|drawing` - Random prompt retrieval with friendly 404
  - Rate limiting middleware: 5 req/min for auth, 10 req/min for uploads
  - Seed script: 10 initial prompts (5 writing, 5 drawing)

- **Phase 3 (Inspiration)**: Frontend prompt UI
  - Inspiration page with writing/drawing toggle
  - Prompt fetching with loading, error, and empty states
  - Responsive CSS with WCAG AA touch targets (≥44px)
  - Reduced motion support via `prefers-reduced-motion`

- **Phase 4 (Auth & My Mailbox)**: Authentication and archive functionality
  - **Backend endpoints**:
    - `POST /auth/register` - User registration with email/username validation
    - `POST /auth/login` - JWT authentication with configurable expiration
    - `POST /auth/logout` - Sign out endpoint
    - `POST /mail` - Multipart image upload (JPEG/PNG, ≤5MB) with validation
    - `GET /mail` - List user's mail items with pagination and direction filtering
    - `DELETE /mail/:id` - Ownership-verified deletion with file cleanup
    - `GET /images/:id` - Authenticated image streaming with cache headers
  - **Frontend features**:
    - Auth service client with localStorage token management
    - Mail service client for uploads, listing, and deletion
    - My Mailbox page with Sent/Received tabs
    - Grid layout with responsive breakpoints (tested at ≤360px)
    - Modal for enlarged image view with zoom
    - Delete confirmation and immediate UI updates
    - AuthImage component with blob URL loading and cleanup
    - Home page with hero, features, and about sections
    - App routing with protected routes and navigation
    - Global nav with auth state and sticky positioning

- **Security**:
  - Bcrypt password hashing via passlib
  - JWT tokens with HS256 algorithm
  - Authenticated-only image access
  - Rate limiting on sensitive endpoints

- **Accessibility**:
  - WCAG AA color contrast
  - Keyboard navigation support with visible focus states
  - ARIA labels and semantic HTML
  - Touch targets ≥44px
  - Reduced motion support

- **Documentation**:
  - Specification: `specs/1-snailmail-app-v1/spec.md` (v1 with clarifications)
  - Implementation plan: `specs/1-snailmail-app-v1/plan.md`
  - Task breakdown: `specs/1-snailmail-app-v1/tasks.md`
  - Data model: `specs/1-snailmail-app-v1/data-model.md`
  - OpenAPI contract: `specs/1-snailmail-app-v1/contracts/openapi.yaml`
  - Quickstart guide: `specs/1-snailmail-app-v1/quickstart.md`
  - Constitution: `.specify/memory/constitution.md` (v0.2.2)

### Changed
- Constitution updated from v0.2.0 to v0.2.2
  - Added SPA allowance with progressive enhancement
  - Desktop-first, mobile-compatible approach
  - JWT authentication as default
  - Server-side image storage with authenticated streaming

### Security
- Password hashing with bcrypt
- JWT-based authentication
- Private image access with ownership verification
- Rate limiting on auth and upload endpoints

## [0.0.1] - 2025-12-05

### Added
- Initial project specification and governance
- Constitution v0.2.0 with core principles
- Specification templates and workflow prompts

[Unreleased]: https://github.com/Jzoll/bringbacksnailmail/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Jzoll/bringbacksnailmail/releases/tag/v0.1.0
[0.0.1]: https://github.com/Jzoll/bringbacksnailmail/releases/tag/v0.0.1
