# Tasks — Bring Back Snail Mail (v1)

## Phase 1: Setup
- [X] T001 Create project structure per implementation plan
- [X] T002 Configure `backend` logging (structured) in `backend/src/main.py`
- [X] T003 Add `.env.example` with Postgres and storage settings at repo root
- [X] T004 Initialize Alembic in `backend/alembic/` and generate base migration

## Phase 2: Foundation
 - [X] T014 Implement basic rate limiting on `/auth/*` and `/mail` upload endpoints

## Phase 3: Get Started (US1)
 - [X] T044.1 Upload error states: friendly inline messages for type/size with retry guidance
- [X] T030 [P] [US2] Toggle writing/drawing prompt type in `frontend/src/pages/Inspiration.tsx`
- [X] T031 [US2] Prompt fetch with loading and error states in `frontend/src/pages/Inspiration.tsx`
 - [ ] T071.1 Mobile usability validation (axe + Lighthouse); map results to SC7
## Phase 5: Auth & My Mailbox (US3)
- [X] T040 [P] Backend User model and hashing in `backend/src/models/user.py`
 - [ ] T023 [US1] Acceptance checks for Get Started: user completes checklist ≤10 min (SC1)
- [X] T044 Backend upload `/mail` (multipart) with type/size validation in `backend/src/api/mail.py`
- [X] T045 [US3] Tabs (Sent/Received) + grid in `frontend/src/pages/MyMailbox.tsx`
 - [X] T049 [US3] Pagination for archive list targeting ~200 items per user

## Phase 6: Community (US4)
- [ ] T050 [US4] Stub page explaining moderation-first roadmap in `frontend/src/pages/Community.tsx`

## Phase 7: Snail Interaction (PE)
- [ ] T060 [P] Landing page snail animation; Fast/Slow controls in `frontend/src/components/Snail.tsx`
- [ ] T061 Reduced motion support and graceful degradation in `frontend/src/components/Snail.tsx`

## Phase 8: Polish & Governance
- [ ] T070 Documentation updates (README/CHANGELOG) at `README.md` and `CHANGELOG.md`
- [ ] T071 Accessibility audit and fixes; record results in `specs/1-snailmail-app-v1/checklists/accessibility.md`
- [ ] T072 Performance budgets; cache headers check in `backend/src/middleware/cache.py`

## Dependencies
- US2 depends on Phase 2 completion.
- US3 depends on Auth tasks (T040–T042) and models/migrations (T043).
- Snail PE (Phase 7) is independent and parallelizable.

## Parallel Execution Examples
- T010 + T012 + T013 can proceed in parallel.
- T040, T042, and T060 are parallel across different areas (backend model, frontend state, PE component).

## Implementation Strategy
- MVP first: Foundation → Inspiration → Auth + My Mailbox.
- Incremental delivery with measurable gates (SC1–SC9) and accessibility checks.
