<!--
Sync Impact Report
Version change: 0.2.0 → 0.2.1
Modified sections: Development Workflow & Quality Gates (added CHANGELOG and README requirements), Governance (added Documentation Requirements section)
Added sections: CHANGELOG requirements with Keep a Changelog format, update cadence rules
Removed sections: None
Templates reviewed: .specify/templates/plan-template.md ✅, spec-template.md ✅, tasks-template.md ✅
Deferred TODOs: None
-->

# Bring Back Snail Mail Constitution

## Core Principles

### I. Minimal App Foundation
The product MAY use a light SPA framework (e.g., React + Vite) with client-side routing for public pages (Home, About, Get Started,
Resources, Inspiration, Contact). Progressive enhancement remains REQUIRED. Client-side
JavaScript SHOULD be lean and focused on navigation state, prompt fetch, authentication,
and file upload helpers. This preserves simplicity, lowers cognitive load, and ensures early
content accessibility.

### II. Beginner-Friendly Accessibility
UI MUST use readable typography (>=16px base), clear hierarchy, high-contrast
colors meeting WCAG AA, keyboard-focus outlines, alt text for all non-decorative
images, and desktop-first layout with mobile compatibility (≤360px) and touch-accessible controls. Navigation MUST clearly expose all primary
sections plus "My Mailbox" and auth actions. Copy MUST emphasize slow, intentional
creativity and learning physical mail basics.

### III. Private Personal Archive
User-uploaded mail items (photos + metadata) MUST be strictly private to the
authenticated user. No sharing, feeds, comments, reactions, search across users,
or discovery features. Data captured MUST be minimal (title, notes, direction,
optional mail date, image). Privacy is default; expansion to community is a
future amendment, not implicit.

### IV. Lean API Surface
Backend MUST expose only essential JSON endpoints: auth (register, login, logout),
archived mail CRUD (create, list, get, delete), prompts retrieval, health. Each
endpoint MUST have stable request/response shapes and return appropriate HTTP
status codes. No hidden side effects. File uploads MUST validate type & size.
Images MUST NOT be accessible via public URLs; access MUST be via authenticated streaming routes.

### V. Portable Simplicity
Implementation MUST remain framework-agnostic: clear separation of static pages,
API handlers, and data persistence. Data schema MUST be minimal (users,
archived_mail, prompts). Code SHOULD avoid premature abstraction; refactors MUST
be justified by test coverage or duplication. Smoke tests MUST cover auth,
mail CRUD, prompt fetch, and health. Local dev MUST run with a single command.

## Product Scope & Minimal Requirements

### Static Pages
Pages: Home, About, Get Started, Resources, Inspiration, Contact. Content MUST
teach basics of sending physical mail (addressing, postage, pacing) and promote
slow creative practice. Each page SHOULD state its primary goal:
- Get Started: convert curiosity into action (low friction, scannable).
- Resources: be the authoritative library for deeper answers.
- Inspiration: provide AI writing/drawing prompt generation.

Landing page MAY include a progressive-enhancement "snail" interaction that
crawls within a specified section. Controls MUST be simple "Fast" and "Slow"
buttons that adjust the animation speed. The page MUST remain fully functional
without JavaScript; the snail interaction is optional and non-blocking.

### Navigation
Global navigation MUST include: Home, About, Get Started, Resources, Inspiration,
Contact, My Mailbox (authenticated), Sign In/Out. Footer SHOULD repeat core
links and show a brief privacy statement.

### My Mailbox Flow (Authenticated)
1. User logs in.
2. User opens My Mailbox (private list/grid of items).
3. User selects "Add Mail".
4. Chooses direction: sent | received.
5. Uploads photo (JPEG/PNG), optional title, notes, mail_date.
6. Saves item → appears in archive list.
7. User can view details, optionally delete.

### Backend API (HTTP + JSON)
Auth:
- POST /auth/register { email, username?, password }
- POST /auth/login { identifier, password }
- POST /auth/logout

Archived Mail:
- POST /mail (multipart: image, direction, title?, notes?, mail_date?) → 201
- GET /mail?limit=&cursor= → paginated list (current user)
- GET /mail/:id → single item (ownership enforced)
- DELETE /mail/:id → 204

Prompts:
- GET /prompts?type=writing|drawing → { prompt: { id, type, text } } (random active)

Health:
- GET /health → { status: "ok" }

### Data Model (Minimum)
users: id, email (unique), username (unique nullable), password_hash, created_at
archived_mail: id, user_id (fk), direction (sent|received), title?, notes?, mail_date?, file_path, created_at
prompts: id, type (writing|drawing), text, active (bool), created_at

### File Storage
Images MUST be validated (MIME image/jpeg or image/png) and stored on the server filesystem.
Only the file path is stored in the database, and images are served exclusively via authenticated streaming endpoints (no public URLs).

### Prompt Generation
Prompt generator SHOULD be a simple random selector of active prompts from seed data.
No AI model inference is required initially. Future expansion requires amendment.

### Tone & Content
Language MUST promote intentional slowing, letter craftsmanship, and learning
postal basics. No gamification or streak mechanics.

### Non-Goals / Placeholders
### Get Started (Structure)
Short, scannable, single page or short multi-step flow. Emphasize low friction.

Sections:
- Quick Start Checklist (Hero): 5 steps — Write → Address → Stamp → Seal → Mail.
- Big CTA: "I'm ready — show me how" (opens small step modal/expands; progressive enhancement).
- Step 1 — Write: 3 simple letter structures; tiny examples (2–3 lines); "Use AI to get a starter" button (opens prompt generator).
- Step 2 — Addressing: envelope diagram with labeled fields (To, From, Return, ZIP); domestic vs international examples; accessibility note (large print, handwriting tips).
- Step 3 — Stamping & Postage: stamp placement image; link to Resources → postal guidelines; quick tip: "If in doubt, take it to the post office".
- Step 4 — Drop-off: options (mailbox, post office, pick-up); reminders: secure envelope, include return address.
- Step 5 — Follow-up (optional): save a photo to archive; set reminder; log in a time capsule.
- Mini-FAQ & Troubleshooting: common issues linking to Resources.

Primary CTAs:
- "Generate a writing prompt"
- "Upload a photo to My Mailbox"
- "Save this checklist"

Tone & UX: warm, encouraging, visual; icons and one-line instructions; minimal copy.

### Resources (Structure)
Longer-form content; searchable and linkable; destination for deep answers.

Sections:
- Postal Guidelines: how postage works (conceptual, no current prices); address formats (US, UK, Japan, EU templates); size/weight categories; customs forms overview + official links.
- Templates & Examples: downloadable PDFs (postcard front/back, letter layout, envelope printables); example letters (short, editable copy); handwriting practice templates.
- Supplies & Tools: paper types, envelopes, pens, stamps, glue/tape, sleeves; buying guides and curated starter kits at three price points.
- How-To Deep Dives: international addressing, photographing/archiving postcards for My Mailbox, preserving paper, beginner hand-lettering/calligraphy.
- Legal / Privacy & Safety: protecting addresses, consent for public sharing.
- External Links: official postal services, pen-pal content, where to buy stamps.
- Glossary: definitions (Postage, First-Class, Airmail, Registered Mail, Postmark, Return Receipt).

Tone & UX: authoritative but friendly; allow deep reading and downloadable assets; searchable and filterable.
Community features (profiles, sharing, comments, reactions) are explicitly NOT
implemented; MAY appear as stub text "Community coming later" only.

## Development Workflow & Quality Gates

### Documentation
README MUST include: setup, single run command, API endpoints catalog, schema, testing instructions, accessibility notes, and links to all governance/spec documents.

CHANGELOG MUST follow [Keep a Changelog](https://keepachangelog.com/) format and track all notable changes. Each entry MUST include:
- Version number (semantic versioning)
- Release date (YYYY-MM-DD)
- Changes categorized as: Added, Changed, Deprecated, Removed, Fixed, Security
- Links to compare versions in version control

CHANGELOG MUST be updated:
- REQUIRED: Before each tagged release
- RECOMMENDED: After completing each phase or user story
- REQUIRED: When constitution amendments are ratified

### Testing
Smoke tests MUST cover: register/login/logout, create/list/get/delete mail,
prompt fetch, health endpoint. Tests MAY be minimal script-based or framework
tests.

### Logging & Monitoring
Structured logs (timestamp, level, request id, message) MUST exist for each API
call and error. No verbose debug by default.

### Validation & Security
Inputs MUST be validated server-side (email format, image size/type, field
lengths). Auth endpoints SHOULD have basic rate limiting. Passwords MUST be
securely hashed. Authentication MUST use JWT access tokens by default with sensible expiration.

### Accessibility (Controls)
Interactive controls (e.g., snail speed buttons) MUST have accessible labels,
visible focus state, and keyboard operability. Motion preferences SHOULD honor
`prefers-reduced-motion` by reducing or disabling animation.

### Deployment Baseline
Environment variables for DB connection, storage path, and session secret MUST
be documented. Build MUST produce static assets + runnable API service.

### Change Control
New endpoints or tables REQUIRE constitution amendment if they expand scope
beyond defined minimal requirements.

## Governance

This constitution defines the minimal functional baseline for Bring Back Snail
Mail. All contributions MUST uphold the Core Principles. Amendments MUST:
1. Provide written proposal (motivation, scope delta, schema/API impacts).
2. Include migration plan (data + compatibility) if schema/API changes.
3. Maintain accessibility and privacy guarantees.
4. Justify added complexity (Principle V) with measurable value or risk reduction.

Versioning Policy:
- MAJOR: Principle redefinition/removal or scope expansion beyond non-goals.
- MINOR: New principle, new sanctioned page, new endpoint or table.
- PATCH: Clarifications, wording improvements, minor test scope changes.

Documentation Requirements:
- Constitution amendments MUST update version number and Last Amended date
- CHANGELOG MUST be updated to reflect constitution changes
- README MUST be kept in sync with current architecture and setup instructions

Compliance Review:
Every PR SHOULD self-list touched endpoints, schema changes, and confirm no
scope violations. Any deviation MUST cite amendment proposal or create one.

**Version**: 0.2.2 | **Ratified**: 2025-12-01 | **Last Amended**: 2025-12-09
