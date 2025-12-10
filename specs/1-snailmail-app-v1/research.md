# Phase 0 — Research

## Decisions & Clarifications

- Decision: Desktop-first, mobile-compatible design
  - Rationale: Faster iteration for MVP while ensuring small-screen usability.
  - Alternatives: Mobile-first; heavy CSS frameworks; Tailwind.

- Decision: FastAPI + Pydantic + SQLAlchemy + Postgres
  - Rationale: Clear, typed models; mature ecosystem; easy Dockerization.
  - Alternatives: Django; Flask; Node/Express + Prisma.

- Decision: Server-side image storage; authenticated streaming
  - Rationale: Privacy-first; avoid public URLs; simple file system storage per environment.
  - Alternatives: Object storage (S3) with signed URLs; CDN; client-side only.

- Decision: JWT-based auth (register/login/logout)
  - Rationale: Stateless; easy integration with frontend; standard.
  - Alternatives: Session cookies; OAuth; third-party auth.

- Decision: Prompt API with local seed data
  - Rationale: Simple, reliable; minimal DB write complexity.
  - Alternatives: External APIs; AI-generated; community-sourced prompts (future).

- Decision: Optional rate limiting on auth/uploads
  - Rationale: Reduce abuse without blocking MVP.
  - Alternatives: No rate limiting; WAF/proxy-level limits.

## Patterns & Best Practices

- FastAPI: structured logging, dependency-injected DB sessions, clear routers per domain.
- SQLAlchemy: migrations via Alembic; unique index on user email; FK `archived_mail.user_id`.
- Security: `passlib` for hashing; short-lived JWT access tokens; validate file type/size; limit upload concurrency.
- Accessibility: Semantic HTML, labels, focus order, reduced motion; WCAG AA color contrast.
- Performance: Cache headers for static assets; lean components; p95 ≤ 300ms for `/health` and `/prompts`.

## Resolved Unknowns

- Mobile approach: Not mobile-first; ensure compatibility ≤360px with touch targets.
- Image access: Only via authenticated streaming; no public URLs.
- Data model fields: `archived_mail.file_path`, optional `mail_date`; `prompts.active` boolean.
- API surface: As specified; aligns with FR1–FR16 and success criteria.
