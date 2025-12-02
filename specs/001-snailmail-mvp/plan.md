# Implementation Plan: Bring Back Snail Mail MVP

**Branch**: `001-snailmail-mvp` | **Date**: 2025-12-02 | **Spec**: `specs/001-snailmail-mvp/spec.md`
**Input**: Feature specification from `/specs/001-snailmail-mvp/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Teach beginners to send physical mail via a static-first web experience with clear steps, inspiration prompts, and a private client-side archive. Use a React frontend for all pages and interactions, and a FastAPI backend providing minimal REST endpoints (prompts, health, future community moderation). MVP stores archive images entirely on the client via IndexedDB; backend remains stateless initially but is structured to adopt Postgres later for community features.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: JavaScript/TypeScript (React), Python 3.11 (FastAPI)
**Primary Dependencies**: React, React Router, idb (IndexedDB helper) or minimal wrapper; FastAPI, Pydantic, Uvicorn
**Storage**: MVP: client-side IndexedDB for archive images and metadata; Backend: no persistent storage. Future: Postgres for community features (moderation, matching)
**Testing**: Frontend: Jest + React Testing Library (smoke tests). Backend: pytest (endpoint smoke tests)
**Target Platform**: Web (modern browsers), Backend on Linux server/container
**Project Type**: Web application (frontend + backend)
**Performance Goals**: Prompts endpoint p95 < 200ms (local), client gallery operations < 100ms typical; perceived prompt display < 1s
**Constraints**: Static-first UX; offline-capable archive (IndexedDB) for MVP; strict privacy (no backend image upload)
**Scale/Scope**: MVP pages: Home, About, Get Started, Resources, Inspiration, Archive, Contact; Minimal endpoints: /prompts, /health; Future: community moderation endpoints

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Gates (from constitution):
- Static-first public pages, minimal JS for enhancement → React pages must render core content without blocking on API.
- Accessibility baseline: >=16px base font, focus outlines, alt text → enforce in UI components.
- Private archive: no backend storage for MVP → all image storage in IndexedDB; owner-only access applies client-side.
- Lean API surface: prompts, health (MVP), community moderation (future) → avoid extra endpoints.
- Safety-first community: Showcase Wall with moderation queue; no personal data on public posts; no comments/DMs → defer to roadmap, design contracts now.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
frontend/
├── src/
│   ├── pages/            # Home, About, Get Started, Resources, Inspiration, Archive, Contact
│   ├── components/       # Nav, Checklist, PromptWidget, Gallery, EnvelopeDiagram
│   ├── services/         # idb client, prompts API client
│   └── styles/
└── tests/                # RTL/Jest smoke tests

backend/
├── src/
│   ├── api/              # FastAPI routers: /prompts, /health; future /community
│   ├── models/           # Pydantic schemas (Prompt, CommunityPost minimal)
│   └── services/         # prompt selection (random active)
└── tests/                # pytest smoke tests
```

**Structure Decision**: Web application with explicit `frontend` and `backend` folders to preserve portability and future Postgres adoption.

## Phase 0: Research

Create `research.md` consolidating choices:
- Decision: Client-side archive via IndexedDB for MVP; Backend stateless.
  - Rationale: Privacy-first and minimal scope; avoids backend PII/images.
  - Alternatives: Upload to S3 + backend metadata (rejected: violates MVP privacy, adds complexity).
- Decision: FastAPI for prompts; random selection from seeded list.
  - Rationale: Minimal dependency, quick JSON service.
  - Alternatives: External AI API (rejected: cost/complexity not needed for MVP).
- Decision: React Router for client navigation; progressive enhancement for interactivity.
  - Rationale: Lightweight and widely understood.
  - Alternatives: Full SSR/Next.js (rejected: exceeds static-first baseline).

## Phase 1: Design & Contracts

### Data Model (MVP + Future)
Document in `data-model.md`:
- User (future backend persistence)
- ArchivedMail (client-side schema in IndexedDB)
- Prompt (backend seed list)
- CommunityPost (future: moderated; pending/approved/rejected)
- BuddyPreference, SafetyReport (roadmap)

### API Contracts (`contracts/`)
OpenAPI snippets:
- GET /health → 200 { status: "ok" }
- GET /prompts?type=writing|drawing → 200 { prompt }
- POST /community/posts (future, auth) → 202 queued (pending)
- POST /community/posts/{id}/approve (moderator) → 204
- POST /community/posts/{id}/reject (moderator) → 204
- GET /community/feed → 200 [approved posts]

### Quickstart (`quickstart.md`)
Frontend dev:
- npm create react app (or Vite) with React Router and idb
Backend dev:
- FastAPI app with /health and /prompts; seed prompts; run via uvicorn

### Agent Context Update
Run `.specify/scripts/bash/update-agent-context.sh copilot` to record technologies used (React, FastAPI, IndexedDB) and future Postgres.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

No violations at MVP. Future community features will justify Postgres addition; until then, storage remains client-side.
