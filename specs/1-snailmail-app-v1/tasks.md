# Tasks — Bring Back Snail Mail (v1)

## Phase 1: Setup
- [ ] T001 Create project structure per implementation plan
- [ ] T002 Configure `backend` logging (structured) in `backend/src/main.py`
- [ ] T003 Add `.env.example` with Postgres and storage settings at repo root
- [ ] T004 Initialize Alembic in `backend/alembic/` and generate base migration

## Phase 2: Foundation
- [ ] T010 [P] Frontend routing and global nav in `frontend/src/App.tsx`
- [ ] T011 Base responsive styles and accessibility baseline in `frontend/src/styles/base.css`
- [ ] T012 Backend `/health` endpoint in `backend/src/api/health.py`
- [ ] T013 Backend `/prompts` endpoint with friendly 404 in `backend/src/api/prompts.py`

## Phase 3: Get Started (US1)
- [ ] T020 [US1] Supplies list and addressing diagram in `frontend/src/pages/GetStarted.tsx`
- [ ] T021 [US1] Postage placement and mailing options in `frontend/src/pages/GetStarted.tsx`
- [ ] T022 [US1] Printable templates and checklist in `frontend/src/pages/GetStarted.tsx`

## Phase 4: Inspiration (US2)
- [ ] T030 [P] [US2] Toggle writing/drawing prompt type in `frontend/src/pages/Inspiration.tsx`
- [ ] T031 [US2] Prompt fetch with loading and error states in `frontend/src/pages/Inspiration.tsx`
- [ ] T032 [US2] Display prompt and refresh action in `frontend/src/pages/Inspiration.tsx`

## Phase 5: Auth & My Mailbox (US3)
- [ ] T040 [P] Backend User model and hashing in `backend/src/models/user.py`
- [ ] T041 Backend JWT register/login/logout in `backend/src/api/auth.py`
- [ ] T042 [P] Client auth store + route guards in `frontend/src/state/auth.ts`
- [ ] T043 Backend `archived_mail` model + migration in `backend/src/models/archived_mail.py`
- [ ] T044 Backend upload `/mail` (multipart) with type/size validation in `backend/src/api/mail.py`
- [ ] T045 [US3] Tabs (Sent/Received) + grid in `frontend/src/pages/MyMailbox.tsx`
- [ ] T046 [US3] Authenticated image streaming `/images/:id` in `backend/src/api/images.py`
- [ ] T047 [US3] Enlarge/zoom card modal in `frontend/src/components/MailCardModal.tsx`
- [ ] T048 [US3] Delete item and UI refresh in `frontend/src/pages/MyMailbox.tsx`

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
