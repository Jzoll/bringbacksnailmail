# Changelog

All notable changes to the Bring Back Snail Mail project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [Unreleased] - 2026-01-14

### Added
- Frontend: Created `.env.local` with `VITE_GOOGLE_CLIENT_ID` for Google OAuth 2.0 integration
- Frontend: Google OAuth infrastructure ready in `authClient.ts` with `googleLogin()` function

### Fixed
- Frontend: Resolved 2 moderate severity esbuild vulnerabilities (GHSA-67mh-4wv8-2f99) via `npm audit fix --force`
  - Updated Vite to 7.3.1 (breaking change)
  - Updated esbuild to patched version

### Security
- Added `.env.local` to `.gitignore` to prevent committing sensitive OAuth credentials

## [Unreleased] - 2026-01-01

### Added
- Frontend: Inspiration child page “Famous Letters” available at `/inspiration/famous-letters`
- Frontend: Resources child pages added for task-based organization
  - Getting Started (basics, addressing, starter kits)
  - Design & Craft (materials, decorative touches, durability)
  - Sending International (addressing formats, customs, delivery windows)
  - Archiving & Preservation (storage, digitization, handling)

### Fixed
- Frontend: Cleaned unused imports in `App.tsx` and `ResourcesMain.tsx`

### Changed
- Frontend: Resources navigation now includes an accessible dropdown exposing child pages
- Frontend: Resources refactored to nested routes; Postal Guidelines remain on the main Resources index
- Frontend: Inspiration navigation now includes a dropdown exposing “Famous Letters”
- Frontend: Famous Letters refactored under Inspiration as a standalone page (removed nested Outlet render)

## [Unreleased] - 2025-12-29

### Added
- Documentation: UI Pain Points framework (`uiPainPoints.md`) for tracking and prioritizing UI/UX issues by page
  - Get Started page: 1 issue (clutter)
  - Sign In page: 1 issue (404 error - P0)
  - Home / Dashboard: 3 issues (redundant nav, constrained snail graphic, unlinked features)
  - Community page: 1 issue (clutter and lack of inviting design - P1)
  - Resources page: 1 issue (clutter and non-functional download buttons - P1)
  - **Total: 7 logged issues across 5 pages**
- Documentation: Sign In page section in UI Pain Points documenting critical 404 error
- Documentation: Community page section in UI Pain Points documenting clutter and lack of inviting design
- Documentation: Resources page section in UI Pain Points documenting clutter and non-functional buttons


### Updated
- Documentation: Home / Dashboard pain points expanded with 3 logged issues
- Documentation: Get Started page pain point added to framework

### Fixed
- Frontend: Sign In page 404 resolved by adding `/login` route and `SignIn` page wired to `authClient.login()`
- Frontend: Resources page non-functional buttons replaced with disabled "Coming soon" links to avoid broken actions
- Frontend: Home page feature cards now link to destination pages (Get Started, Inspiration, Mailbox)

### Changed
- Frontend: Removed redundant "Home" nav item; brand logo routes to home
- Frontend: Snail hero decoration positioned beneath content for visual depth (absolute positioning, z-index)
- Frontend: Get Started page decluttered using expandable `details/summary` for steps
- Frontend: Community page made more inviting with welcoming hero section and clear CTAs
- Frontend: Get Started page spacing increased (left margin 40px; wider horizontal padding) to avoid edge crowding

## [0.1.3] - 2025-12-19

### Added
- Documentation: GitHub Project board structure (`github-project-structure.md`) with 15 epics, 47+ features, and 200+ tasks
- Documentation: AI-assisted development workflow documentation with Speckit phases (analyze, specify, plan, tasks, constitution, implement)
- Documentation: AI code review checklist with 40+ items covering security, functionality, accessibility, performance, and quality
- Project Management: Epic 0 for AI-Assisted Specification & Planning with 5 features
- Project Management: Epic E1.F4 for AI-Assisted Code Generation (speckit.implement) with 18 implementation tasks
- Project Management: Epic E12.F4 for AI Workflow Documentation with 8 governance tasks
- GitHub Setup: Created 24 project labels (area, type, phase, priority, status)
- GitHub Setup: Created initial epic issues (#3-#6) for E0-E3

### Updated
- Project Management: Added `ai-generated` labels to 16 features (E4, E6, E7, E8)
- Project Management: Added security review tasks to E2.F4 and E7.F1
- Project Management: All 15 epics now include complete label sets
- Project Management: All 47+ features include type, phase, area, priority, and size labels
- Project Management: All 200+ tasks ready for GitHub Projects board

## [0.1.2] - 2025-12-10

### Fixed
- Backend: Added `python-dotenv==1.0.0` to requirements.txt for environment variable loading
- Backend: Fixed `alembic/env.py` to load `.env` file using `python-dotenv`
- Backend: Fixed `src/seeds.py` to load `.env` file for database connection
- Backend: Created missing `backend/alembic.ini` configuration file in correct location
- Backend: Fixed Python 3.9 compatibility by replacing `str | None` union syntax with `Optional[str]` in auth.py
- Backend: Added `pydantic[email]` dependency for EmailStr validation support

## [0.1.1] - 2025-12-09

### Added
- Frontend: Get Started page with 5-step checklist (Write, Address, Stamp, Seal, Mail) and CTAs to Inspiration and Mailbox
- Frontend: Resources library page with categorized guides (Postal Guidelines, Templates, Supplies, How-To, Legal/Privacy, External Links, Glossary)
- Frontend: Community Wall stub page with moderation-first roadmap and safety principles
- Frontend: Navigation updated with links to Get Started, Resources, and Community pages
- Frontend: Shared styling for Get Started and Resources pages with responsive breakpoints
- Frontend: Snail animation component with Fast/Slow speed controls and prefers-reduced-motion support
- Frontend: Snail integrated into Home page hero section as progressive enhancement
- Accessibility: Animation respects user's reduced motion preferences with graceful degradation
- Documentation: Comprehensive root README.md with tech stack overview, setup instructions, project structure, and API catalog
- Documentation: Updated backend/README.md with complete endpoint documentation
- Documentation: Updated frontend/README.md with architecture details and feature completion status
- Documentation: Accessibility audit checklist (`specs/1-snailmail-app-v1/checklists/accessibility.md`) with WCAG AA compliance tracking
- Documentation: Performance validation checklist (`specs/1-snailmail-app-v1/checklists/performance.md`) with benchmarking plan and optimization strategies

## [0.1.0] - 2026-01-14
### Added


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
