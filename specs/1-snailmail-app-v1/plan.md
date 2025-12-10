# Plan — Bring Back Snail Mail (Scalable, Accessible MVP)

## Technical Context
- Frontend: Vite + React, client-side routing; plain CSS/CSS modules; desktop-first, mobile-compatible; accessibility baseline (focus, labels, reduced-motion).
- Backend: FastAPI + Pydantic; stateless REST; structured logging; minimal middleware.
- Storage: Postgres via SQLAlchemy (users, archived_mail, prompts); images on server filesystem with authenticated streaming; no public URLs.
- Auth: Secure password hashing; JWT access tokens; input validation; enable lightweight rate limiting on auth and upload endpoints.
- Non-functional: Performance (cache-friendly assets), scalability-ready API, robust error messages, privacy-first.

## Constitution Check
- Documentation: Update README/CHANGELOG on feature changes per v0.2.1.
- Accessibility: WCAG AA checks (focus, labels, contrast, reduced motion).
- Privacy: Archive private; images only via authenticated streaming.
- Workflow: Keep backend stateless endpoints; add tests where practical.

## Gates
- G1: `/health` and `/prompts` p95 ≤ 300ms at ~50 RPS (test env).
- G2: 95% valid uploads (≤5MB JPEG/PNG) succeed; immediate UI reflection.
- G3: Auth-only access to images; verified by endpoint protections.
- G4: Mobile usability for key tasks without zoom (≤360px).
- G5: Accessibility audit passes core checks.

## Phase 0 — Research & Outline
- Clarify mobile approach (desktop-first, mobile-compatible): DECIDED.
- Confirm image storage (server filesystem) + streaming: DECIDED.
- Choose JWT vs sessions: DECIDED JWT.
- Migration tool: Alembic for SQLAlchemy: DECIDED.
- Rate limiting: Enabled (auth/uploads) via lightweight middleware or proxy: DECIDED enabled.
- Output: research.md (decisions, rationale, alternatives).

## Phase 1 — Design & Contracts
- Data model: `users`, `archived_mail`, `prompts` with fields and relationships.
- API contracts: OpenAPI covering `/health`, `/auth/*`, `/prompts`, `/mail`, `/images/:id`.
- Quickstart: Backend/Frontend setup steps; auth notes; .env for DB.
- Update agent context: reflect technologies and constraints.

## Phase 2 — Foundation
- Frontend: Routing/nav scaffolding; base responsive styles; accessibility baseline.
- Backend: `/health` endpoint; `/prompts` endpoint (random by type, friendly 404); structured logging.
- Success checks: G1 baseline metrics, accessibility focus order.

## Phase 3 — Inspiration
- UI: Toggle type (writing/drawing); loading/error states; refresh action.
- Backend: Seed prompts; activate flag; return random active by type.
- Tests: Prompt retrieval under load; friendly empty state.

## Phase 4 — Auth & My Mailbox
- Auth: Register/login/logout; JWT issuance/verification; client guards.
- Storage: Alembic migrations; models for `users`, `archived_mail`.
- Uploads: Multipart upload; validate JPEG/PNG ≤5MB; store file; write metadata.
- Views: Sent/Received tabs; grid; modal enlarge/zoom; delete item.
- Images: Authenticated streaming route; cache headers for images.
- Success checks: G2, G3, G4.

## Phase 5 — Resources & Get Started
- Content: Postal guidelines, addressing diagram, templates; visual checklist; postage examples; mailing options.
- UX: Scannable sections; accessible diagrams with text alternatives.

## Phase 6 — Community (Stub)
- Page: Explain moderation-first roadmap; submissions disabled.
- Safety: Clear messaging; no data collection.

## Phase 7 — Progressive Enhancement
- Snail animation on landing; Fast/Slow controls; respects reduced motion; graceful degradation.

## Phase 8 — Polish & Governance
- Documentation: Update README and CHANGELOG.
- Accessibility: Audit and fixes for WCAG AA.
- Performance: Validate cache headers; confirm p95s; basic logs review.

## Deliverables
- research.md, data-model.md, contracts/openapi.yaml, quickstart.md.
- Implemented endpoints and UI per phases; migrations and models.
- README/CHANGELOG updates.

## Risks & Mitigations
- Image storage growth: enforce size; guidance; consider object storage later.
- Accessibility gaps: audit; labeled diagrams; keyboard testing.
- Auth complexity: use well-known libraries; short-lived tokens; clear error states.

## Roadmap (Post-MVP)
- Community Wall: moderated submissions; viewing-only initially; privacy-first.
- Writing Buddy Matching: system-mediated; reporting/blocking; preference-based.
