# Tasks: Bring Back Snail Mail MVP

**Input**: Design documents from `/specs/001-snailmail-mvp/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL. This MVP focuses on smoke-level checks only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create repo folders `frontend/` and `backend/` per plan
- [X] T002 Initialize React app in `frontend/` with Vite + TypeScript
- [X] T003 Initialize FastAPI app scaffold in `backend/` (`src/main.py`)
- [X] T004 [P] Add README skeleton at `README.md` linking spec, plan, quickstart
- [X] T004a [P] Add CHANGELOG at `CHANGELOG.md` (Keep a Changelog format)


---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T005 [P] Add client routing in `frontend/src/pages` via `react-router-dom`
- [X] T006 [P] Create global navigation `frontend/src/components/Nav.tsx`
- [X] T007 [P] Add base styles meeting accessibility baseline in `frontend/src/styles/base.css`
- [X] T008 Implement `/health` in `backend/src/main.py`
- [X] T009 Implement `/prompts` (random from seed) in `backend/src/api/prompts.py`
- [X] T010 [P] Wire frontend prompts client `frontend/src/services/promptsClient.ts`
- [X] T011 Configure IndexedDB wrapper in `frontend/src/services/idb.ts`
- [X] T012 [P] Document environment variables in `README.md` (backend host, prompt seed path)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Learn and act via Get Started (Priority: P1) 🎯 MVP

**Goal**: Scannable 5-step checklist with actionable CTA

**Independent Test**: Open Get Started, expand CTA, view all five steps without interacting with other features

### Implementation for User Story 1

- [X] T013 [P] [US1] Create `frontend/src/pages/GetStarted.tsx` with hero checklist
- [X] T014 [P] [US1] Implement CTA expand/modal in `frontend/src/components/ChecklistCTA.tsx`
- [X] T015 [P] [US1] Add envelope diagram component `frontend/src/components/EnvelopeDiagram.tsx`
- [X] T016 [US1] Link resource anchors to Resources page sections
- [X] T017 [US1] Accessibility: focus order, button labels, base font check

**Checkpoint**: User Story 1 independently functional

---

## Phase 4: User Story 2 - Generate inspiration prompts (Priority: P2)

**Goal**: Users request writing/drawing prompts and see results

**Independent Test**: Open Inspiration and generate prompts without Archive/auth

### Implementation for User Story 2

- [X] T018 [P] [US2] Create `frontend/src/pages/Inspiration.tsx` (tabs: writing/drawing)
- [X] T019 [P] [US2] Hook up promptsClient to backend `/prompts`
- [X] T020 [US2] Display prompt result with loading/fallback
- [X] T021 [US2] Error handling for empty seed (friendly fallback)

**Checkpoint**: User Story 2 independently functional

---

## Phase 5: User Story 3 - Archive mailed items privately (Priority: P3)

**Goal**: Client-side archive using IndexedDB; simple gallery

**Independent Test**: Add one item (JPEG/PNG) and view/delete in gallery

### Implementation for User Story 3

- [X] T022 [P] [US3] Create `frontend/src/pages/Archive.tsx` with gallery view
- [X] T023 [P] [US3] Implement upload form `frontend/src/components/ArchiveForm.tsx`
- [X] T024 [P] [US3] IndexedDB stores and queries in `frontend/src/services/idb.ts`
- [X] T025 [US3] Validate image type/size client-side; friendly errors
- [X] T026 [US3] Render thumbnails via object URLs; delete flow
- [X] T027 [US3] Owner-only logic (client-side visibility) and no cross-user exposure

**Checkpoint**: User Story 3 independently functional

---

## Phase 6: User Story 4 - Community Showcase Wall (Priority: P4)

**Goal**: Prepare future-enabled Showcase Wall with moderation (contracts only; UI stub)

**Independent Test**: Submit (stub) routed to moderation queue in mock; only approved shown in public stub feed

### Implementation for User Story 4

- [X] T028 [P] [US4] Add placeholder page `frontend/src/pages/Community.tsx` explaining moderation-first rollout
- [X] T029 [P] [US4] Define Pydantic models for CommunityPost in `backend/src/models/community.py`
- [X] T030 [US4] Add future routes (disabled by default) in `backend/src/api/community.py` matching `contracts/community.openapi.yaml`
- [X] T031 [US4] Add moderation states and stub service `backend/src/services/moderation.py`
- [X] T032 [US4] Public feed route returns approved only (disabled by default)
- [X] T033 [US4] Safety copy: submission rules (no addresses/full names) in UI stub

**Checkpoint**: User Story 4 contracts ready; UI communicates roadmap; no public interaction beyond viewing

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements affecting multiple stories

- [X] T034 [P] Documentation updates in `README.md`
- [X] T035 Logging baseline in backend `backend/src/main.py`
- [X] T036 Error handling consistency across frontend pages
- [X] T037 [P] Add minimal smoke tests: `/prompts`, `/health`, prompt generation UI
- [X] T038 Accessibility audit pass: focus, alt, color contrast
- [X] T039 Quickstart validation: follow quickstart to run both services

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies
- Foundational (Phase 2): Depends on Setup completion; BLOCKS all user stories
- User Stories (Phase 3+): Depend on Foundational completion
- Polish (Final): Depends on desired stories being complete

### User Story Dependencies

- US1 (Get Started): Independent after Phase 2
- US2 (Prompts): Independent after Phase 2
- US3 (Archive): Independent after Phase 2
- US4 (Community Showcase): Independent after Phase 2; contracts only

### Within Each User Story

- Models/services before pages
- Pages before integration
- Error and accessibility checks last

### Parallel Opportunities

- [P] tasks across phases: routing, nav, styles, prompts client, IndexedDB services, community models
- Different user stories can be implemented in parallel after Phase 2

---

## Implementation Strategy

- MVP first: Deliver US1 → US2 → US3 sequentially for demo value
- Incremental delivery: Enable US4 contracts without public interaction; roadmap communicated
- Keep dependencies minimal; prefer simple patterns and readable code

