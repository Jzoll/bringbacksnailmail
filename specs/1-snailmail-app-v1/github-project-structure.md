# GitHub Project Board Structure - Bring Back Snail Mail MVP

## Project Organization

**Note:** This project was built using **Speckit**, an AI-assisted development framework. Epic 0 covers the AI workflow for specification and planning, while Epic 1 includes AI-assisted code generation (speckit.implement). All subsequent epics contain tasks tagged with `ai-generated` and `ai-workflow` labels to indicate AI involvement.

### Views
1. **Board View**: Group by Status (Backlog, In Progress, In Review, Done)
2. **Epic View**: Group by Epic
3. **Team View**: Group by Area (Frontend, Backend, Infrastructure, Design, AI Workflow)
4. **Priority View**: Group by Priority (P0-Critical, P1-High, P2-Medium, P3-Low)
5. **AI Workflow View**: Filter by `ai-workflow` label to track AI-assisted tasks

### Labels
- **Area**: `frontend`, `backend`, `infrastructure`, `design`, `documentation`, `ai-workflow`
- **Type**: `epic`, `feature`, `task`, `bug`, `enhancement`
- **Phase**: `mvp`, `post-mvp`, `future`
- **Size**: `xs` (1-2h), `s` (2-4h), `m` (1-2d), `l` (3-5d), `xl` (1-2w)
- **Priority**: `p0-critical`, `p1-high`, `p2-medium`, `p3-low`
- **Status**: `blocked`, `needs-review`, `ready-for-dev`, `ai-generated`

---

## 📋 EPICS

### Epic 0: AI-Assisted Specification & Planning (Speckit)
**Labels**: `epic`, `mvp`, `ai-workflow`, `documentation`  
**Description**: Use AI assistance to analyze requirements, create specifications, and generate implementation plans before coding

**Related Features**:
- E0.F1: Requirements Analysis (speckit.analyze)
- E0.F2: Specification Creation (speckit.specify)
- E0.F3: Implementation Planning (speckit.plan)
- E0.F4: Task Breakdown (speckit.tasks)
- E0.F5: Constitution Checks (speckit.constitution)

---

### Epic 1: Project Foundation & Infrastructure
**Labels**: `epic`, `mvp`, `infrastructure`  
**Description**: Set up project structure, tooling, database, and development environment with AI-generated scaffolding

**Related Features**:
- E1.F1: Development Environment Setup
- E1.F2: Database Schema & Migrations
- E1.F3: API Documentation & Contracts
- E1.F4: AI-Assisted Code Generation (speckit.implement)

---

### Epic 2: Core Backend API
**Labels**: `epic`, `mvp`, `backend`  
**Description**: Implement stateless REST API with authentication, prompts, and mail archive endpoints

**Related Features**:
- E2.F1: Health & Monitoring
- E2.F2: Authentication System
- E2.F3: Prompts API
- E2.F4: Mail Archive API
- E2.F5: Image Streaming

---

### Epic 3: Frontend Foundation
**Labels**: `epic`, `mvp`, `frontend`  
**Description**: Build responsive, accessible React application with routing and global navigation

**Related Features**:
- E3.F1: Application Shell & Routing
- E3.F2: Global Navigation
- E3.F3: Base Styles & Responsive Layout

---

### Epic 4: Educational Content Pages
**Labels**: `epic`, `mvp`, `frontend`, `design`  
**Description**: Create informative pages to teach users about physical mail

**Related Features**:
- E4.F1: Landing Page
- E4.F2: Get Started Page
- E4.F3: Resources Library
- E4.F4: About & Contact Pages

---

### Epic 5: Inspiration & Prompts
**Labels**: `epic`, `mvp`, `frontend`, `backend`  
**Description**: Generate and display creative prompts for letter writing

**Related Features**:
- E5.F1: Prompt Generation Backend
- E5.F2: Inspiration UI
- E5.F3: Prompt Management

---

### Epic 6: Authentication & User Management
**Labels**: `epic`, `mvp`, `frontend`, `backend`  
**Description**: Secure user registration, login, and session management

**Related Features**:
- E6.F1: User Registration
- E6.F2: User Login
- E6.F3: Session Management
- E6.F4: Protected Routes

---

### Epic 7: My Mailbox (Archive)
**Labels**: `epic`, `mvp`, `frontend`, `backend`  
**Description**: Private archive for uploading, organizing, and viewing mail photos

**Related Features**:
- E7.F1: Mail Upload
- E7.F2: Mail Gallery View
- E7.F3: Mail Detail View
- E7.F4: Mail Management (Delete)

---

### Epic 8: Accessibility & UX
**Labels**: `epic`, `mvp`, `frontend`  
**Description**: Ensure WCAG AA compliance and excellent mobile experience

**Related Features**:
- E8.F1: Accessibility Compliance
- E8.F2: Mobile Responsiveness
- E8.F3: Progressive Enhancement

---

### Epic 9: Community Wall (Stub)
**Labels**: `epic`, `mvp`, `frontend`  
**Description**: Display future community features with clear roadmap

**Related Features**:
- E9.F1: Community Wall Stub Page

---

### Epic 10: Performance & Security
**Labels**: `epic`, `mvp`, `backend`, `infrastructure`  
**Description**: Optimize performance, implement rate limiting, and secure the application

**Related Features**:
- E10.F1: Rate Limiting
- E10.F2: Image Optimization
- E10.F3: Caching Strategy
- E10.F4: Security Hardening

---

### Epic 11: Testing & Quality Assurance
**Labels**: `epic`, `mvp`  
**Description**: Ensure code quality, test coverage, and performance benchmarks

**Related Features**:
- E11.F1: Backend Testing
- E11.F2: Frontend Testing
- E11.F3: Performance Testing

---

### Epic 12: Documentation & Governance
**Labels**: `epic`, `mvp`, `documentation`  
**Description**: Maintain comprehensive documentation, project governance, and AI workflow artifacts

**Related Features**:
- E12.F1: Technical Documentation
- E12.F2: User Documentation
- E12.F3: Project Governance
- E12.F4: AI Workflow Documentation

---

### Epic 13: Community Features (Post-MVP)
**Labels**: `epic`, `post-mvp`, `frontend`, `backend`  
**Description**: Moderated community submissions and social features

**Related Features**:
- E13.F1: Submission System
- E13.F2: Moderation Tools
- E13.F3: Content Display

---

### Epic 14: Writing Buddy Matching (Future)
**Labels**: `epic`, `future`, `frontend`, `backend`  
**Description**: System-mediated pen pal matching with privacy controls

**Related Features**:
- E14.F1: Matching Algorithm
- E14.F2: Privacy Controls
- E14.F3: Reporting & Safety

---

## 🎯 FEATURES & TASKS

### E0.F1: Requirements Analysis (speckit.analyze)
**Labels**: `feature`, `mvp`, `ai-workflow`, `documentation`, `p0-critical`, `s`

**Tasks**:
- [ ] **E0.F1.T1**: Gather initial project idea and user pain points  
  `documentation`, `ai-workflow`, `mvp`, `xs`
  
- [ ] **E0.F1.T2**: Run speckit.analyze prompt to identify core problems  
  `ai-workflow`, `mvp`, `s`
  
- [ ] **E0.F1.T3**: Review AI-generated problem statement and validate with stakeholders  
  `documentation`, `mvp`, `xs`
  
- [ ] **E0.F1.T4**: Identify target users and personas  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F1.T5**: Document key decisions and rationale in research.md  
  `documentation`, `mvp`, `s`

---

### E0.F2: Specification Creation (speckit.specify)
**Labels**: `feature`, `mvp`, `ai-workflow`, `documentation`, `p0-critical`, `m`

**Tasks**:
- [ ] **E0.F2.T1**: Run speckit.specify prompt with requirements analysis  
  `ai-workflow`, `mvp`, `s`
  
- [ ] **E0.F2.T2**: Review AI-generated spec.md for completeness  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F2.T3**: Validate user scenarios (US1-US4) with acceptance tests  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F2.T4**: Confirm functional requirements (FR1-FR16)  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F2.T5**: Review success criteria and metrics  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F2.T6**: Identify out-of-scope items and assumptions  
  `documentation`, `mvp`, `xs`
  
- [ ] **E0.F2.T7**: Get stakeholder sign-off on specification  
  `documentation`, `mvp`, `xs`

---

### E0.F3: Implementation Planning (speckit.plan)
**Labels**: `feature`, `mvp`, `ai-workflow`, `documentation`, `p0-critical`, `m`

**Tasks**:
- [ ] **E0.F3.T1**: Run speckit.plan prompt with spec.md as input  
  `ai-workflow`, `mvp`, `s`
  
- [ ] **E0.F3.T2**: Review AI-generated plan.md with phases 0-8  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F3.T3**: Validate technical stack decisions (Vite+React, FastAPI, PostgreSQL)  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F3.T4**: Review quality gates (G1-G5) for measurability  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F3.T5**: Confirm phase order and dependencies  
  `documentation`, `mvp`, `xs`
  
- [ ] **E0.F3.T6**: Add constitution checks to plan (docs, accessibility, privacy)  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F3.T7**: Document post-MVP roadmap  
  `documentation`, `mvp`, `xs`

---

### E0.F4: Task Breakdown (speckit.tasks)
**Labels**: `feature`, `mvp`, `ai-workflow`, `documentation`, `p0-critical`, `m`

**Tasks**:
- [ ] **E0.F4.T1**: Run speckit.tasks prompt to generate tasks.md  
  `ai-workflow`, `mvp`, `s`
  
- [ ] **E0.F4.T2**: Review AI-generated task list for each phase  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F4.T3**: Map tasks to user scenarios and functional requirements  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F4.T4**: Add file paths and component names to tasks  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F4.T5**: Identify dependencies between tasks  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F4.T6**: Estimate effort for each task (optional)  
  `documentation`, `mvp`, `xs`

---

### E0.F5: Constitution Checks (speckit.constitution)
**Labels**: `feature`, `mvp`, `ai-workflow`, `documentation`, `p1-high`, `s`

**Tasks**:
- [ ] **E0.F5.T1**: Define project constitution principles  
  `documentation`, `mvp`, `s`
  
- [ ] **E0.F5.T2**: Run speckit.constitution prompt for governance checks  
  `ai-workflow`, `mvp`, `s`
  
- [ ] **E0.F5.T3**: Add documentation update requirements to plan  
  `documentation`, `mvp`, `xs`
  
- [ ] **E0.F5.T4**: Add accessibility baseline requirements  
  `documentation`, `mvp`, `xs`
  
- [ ] **E0.F5.T5**: Add privacy-first principles to plan  
  `documentation`, `mvp`, `xs`
  
- [ ] **E0.F5.T6**: Define testing and quality standards  
  `documentation`, `mvp`, `s`

---

### E1.F1: Development Environment Setup
**Labels**: `feature`, `mvp`, `infrastructure`, `p0-critical`, `m`

**Tasks**:
- [ ] **E1.F1.T1**: Initialize Git repository and branching strategy  
  `infrastructure`, `mvp`, `xs`
  
- [ ] **E1.F1.T2**: Set up backend project structure (FastAPI + Uvicorn)  
  `backend`, `mvp`, `s`
  
- [ ] **E1.F1.T3**: Set up frontend project structure (Vite + React + TypeScript)  
  `frontend`, `mvp`, `s`
  
- [ ] **E1.F1.T4**: Configure ESLint and TypeScript for frontend  
  `frontend`, `mvp`, `xs`
  
- [ ] **E1.F1.T5**: Create .env.example with all required variables  
  `infrastructure`, `mvp`, `xs`
  
- [ ] **E1.F1.T6**: Set up .gitignore, .dockerignore, .eslintignore  
  `infrastructure`, `mvp`, `xs`
  
- [ ] **E1.F1.T7**: Configure Vite proxy to backend  
  `frontend`, `mvp`, `xs`
  
- [ ] **E1.F1.T8**: Document local development setup in README  
  `documentation`, `mvp`, `s`
  
- [ ] **E1.F1.T9**: Set up Speckit agents and prompts in .github/  
  `ai-workflow`, `infrastructure`, `mvp`, `s`

---

### E1.F4: AI-Assisted Code Generation (speckit.implement)
**Labels**: `feature`, `mvp`, `ai-workflow`, `backend`, `frontend`, `p0-critical`, `xl`

**Tasks**:
- [ ] **E1.F4.T1**: Prepare context files (spec.md, plan.md, tasks.md) for AI  
  `ai-workflow`, `mvp`, `xs`
  
- [ ] **E1.F4.T2**: Run speckit.implement prompt for Phase 0 (Research)  
  `ai-workflow`, `mvp`, `s`
  
- [ ] **E1.F4.T3**: Review AI-generated research.md and validate decisions  
  `documentation`, `mvp`, `s`
  
- [ ] **E1.F4.T4**: Run speckit.implement for Phase 1 (Design & Contracts)  
  `ai-workflow`, `mvp`, `m`
  
- [ ] **E1.F4.T5**: Review AI-generated data model and OpenAPI contracts  
  `backend`, `documentation`, `mvp`, `s`
  
- [ ] **E1.F4.T6**: Run speckit.implement for Phase 2 (Foundation)  
  `ai-workflow`, `mvp`, `m`
  
- [ ] **E1.F4.T7**: Test AI-generated frontend routing and backend /health endpoint  
  `frontend`, `backend`, `mvp`, `s`
  
- [ ] **E1.F4.T8**: Run speckit.implement for Phase 3 (Inspiration)  
  `ai-workflow`, `mvp`, `m`
  
- [ ] **E1.F4.T9**: Test AI-generated prompts API and UI  
  `frontend`, `backend`, `mvp`, `s`
  
- [ ] **E1.F4.T10**: Run speckit.implement for Phase 4 (Auth & Mailbox)  
  `ai-workflow`, `mvp`, `l`
  
- [ ] **E1.F4.T11**: Test AI-generated authentication and upload features  
  `frontend`, `backend`, `mvp`, `m`
  
- [ ] **E1.F4.T12**: Run speckit.implement for Phase 5 (Resources & Get Started)  
  `ai-workflow`, `mvp`, `m`
  
- [ ] **E1.F4.T13**: Review AI-generated educational content pages  
  `frontend`, `mvp`, `s`
  
- [ ] **E1.F4.T14**: Run speckit.implement for Phase 6 (Community Stub)  
  `ai-workflow`, `mvp`, `s`
  
- [ ] **E1.F4.T15**: Run speckit.implement for Phase 7 (Progressive Enhancement)  
  `ai-workflow`, `mvp`, `m`
  
- [ ] **E1.F4.T16**: Test AI-generated Snail animation with reduced-motion support  
  `frontend`, `mvp`, `s`
  
- [ ] **E1.F4.T17**: Run speckit.implement for Phase 8 (Polish & Testing)  
  `ai-workflow`, `mvp`, `m`
  
- [ ] **E1.F4.T18**: Run all quality gates and acceptance tests  
  `mvp`, `m`

---

### E1.F2: Database Schema & Migrations
**Labels**: `feature`, `mvp`, `backend`, `p0-critical`, `m`

**Tasks**:
- [ ] **E1.F2.T1**: Set up PostgreSQL database locally  
  `infrastructure`, `mvp`, `xs`
  
- [ ] **E1.F2.T2**: Configure SQLAlchemy ORM  
  `backend`, `mvp`, `s`
  
- [ ] **E1.F2.T3**: Set up Alembic for migrations  
  `backend`, `mvp`, `s`
  
- [ ] **E1.F2.T4**: Create User model (id, email, username, password_hash)  
  `backend`, `mvp`, `s`
  
- [ ] **E1.F2.T5**: Create Prompt model (id, type, text, active)  
  `backend`, `mvp`, `s`
  
- [ ] **E1.F2.T6**: Create ArchivedMail model (id, user_id, direction, title, notes, mail_date, file_path, created_at)  
  `backend`, `mvp`, `m`
  
- [ ] **E1.F2.T7**: Create initial migration script  
  `backend`, `mvp`, `s`
  
- [ ] **E1.F2.T8**: Test migration up/down  
  `backend`, `mvp`, `xs`
  
- [ ] **E1.F2.T9**: Create seed script for prompts  
  `backend`, `mvp`, `s`

---

### E1.F3: API Documentation & Contracts
**Labels**: `feature`, `mvp`, `backend`, `documentation`, `p1-high`, `m`

**Tasks**:
- [ ] **E1.F3.T1**: Document data model with ERD  
  `documentation`, `mvp`, `s`
  
- [ ] **E1.F3.T2**: Create OpenAPI/Swagger spec  
  `backend`, `mvp`, `m`
  
- [ ] **E1.F3.T3**: Document all endpoints with request/response schemas  
  `documentation`, `mvp`, `m`
  
- [ ] **E1.F3.T4**: Create quickstart guide for developers  
  `documentation`, `mvp`, `s`

---

### E2.F1: Health & Monitoring
**Labels**: `feature`, `mvp`, `backend`, `p0-critical`, `s`

**Tasks**:
- [ ] **E2.F1.T1**: Implement GET /health endpoint  
  `backend`, `mvp`, `xs`
  
- [ ] **E2.F1.T2**: Set up structured JSON logging  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F1.T3**: Add request_id to all logs  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F1.T4**: Configure log levels (DEBUG, INFO, WARN, ERROR)  
  `backend`, `mvp`, `xs`

---

### E2.F2: Authentication System
**Labels**: `feature`, `mvp`, `backend`, `p0-critical`, `l`

**Tasks**:
- [ ] **E2.F2.T1**: Set up password hashing with bcrypt  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F2.T2**: Configure JWT with python-jose  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F2.T3**: Implement POST /auth/register endpoint  
  `backend`, `mvp`, `ai-generated`, `m`
  
- [ ] **E2.F2.T4**: Implement POST /auth/login endpoint  
  `backend`, `mvp`, `ai-generated`, `m`
  
- [ ] **E2.F2.T5**: Implement POST /auth/logout endpoint  
  `backend`, `mvp`, `ai-generated`, `xs`
  
- [ ] **E2.F2.T6**: Create JWT verification middleware  
  `backend`, `mvp`, `ai-generated`, `s`
  
- [ ] **E2.F2.T7**: Add email validation  
  `backend`, `mvp`, `xs`
  
- [ ] **E2.F2.T8**: Add username uniqueness validation  
  `backend`, `mvp`, `xs`
  
- [ ] **E2.F2.T9**: Return user object with token  
  `backend`, `mvp`, `xs`
  
- [ ] **E2.F2.T10**: Review AI-generated auth code for security vulnerabilities  
  `backend`, `ai-workflow`, `mvp`, `s`

---

### E2.F3: Prompts API
**Labels**: `feature`, `mvp`, `backend`, `p1-high`, `m`

**Tasks**:
- [ ] **E2.F3.T1**: Implement GET /prompts?type=writing|drawing endpoint  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F3.T2**: Add random selection logic  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F3.T3**: Handle empty prompts with friendly 404  
  `backend`, `mvp`, `xs`
  
- [ ] **E2.F3.T4**: Add active flag filtering  
  `backend`, `mvp`, `xs`
  
- [ ] **E2.F3.T5**: Validate type parameter  
  `backend`, `mvp`, `xs`

---

### E2.F4: Mail Archive API
**Labels**: `feature`, `mvp`, `backend`, `p0-critical`, `l`

**Tasks**:
- [ ] **E2.F4.T1**: Implement POST /mail endpoint (multipart upload)  
  `backend`, `mvp`, `m`
  
- [ ] **E2.F4.T2**: Validate image type (JPEG/PNG)  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F4.T3**: Validate file size (≤5MB)  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F4.T4**: Save file to server filesystem  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F4.T5**: Store metadata in database  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F4.T6**: Implement GET /mail endpoint (list with pagination)  
  `backend`, `mvp`, `m`
  
- [ ] **E2.F4.T7**: Add direction filter (sent/received)  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F4.T8**: Implement DELETE /mail/:id endpoint  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F4.T9**: Delete file on mail deletion  
  `backend`, `mvp`, `xs`
  
- [ ] **E2.F4.T10**: Verify ownership before delete  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F4.T11**: Review AI-generated upload code for security vulnerabilities  
  `backend`, `ai-workflow`, `mvp`, `s`

---

### E2.F5: Image Streaming
**Labels**: `feature`, `mvp`, `backend`, `p1-high`, `m`

**Tasks**:
- [ ] **E2.F5.T1**: Implement GET /images/:id endpoint  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F5.T2**: Verify authentication for image access  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F5.T3**: Verify ownership of image  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F5.T4**: Stream file with FileResponse  
  `backend`, `mvp`, `s`
  
- [ ] **E2.F5.T5**: Add Cache-Control headers  
  `backend`, `mvp`, `xs`
  
- [ ] **E2.F5.T6**: Handle missing files gracefully  
  `backend`, `mvp`, `xs`

---

### E3.F1: Application Shell & Routing
**Labels**: `feature`, `mvp`, `frontend`, `p0-critical`, `m`

**Tasks**:
- [ ] **E3.F1.T1**: Set up React Router v6  
  `frontend`, `mvp`, `s`
  
- [ ] **E3.F1.T2**: Create App.tsx with BrowserRouter  
  `frontend`, `mvp`, `s`
  
- [ ] **E3.F1.T3**: Define all routes  
  `frontend`, `mvp`, `s`
  
- [ ] **E3.F1.T4**: Create protected route component  
  `frontend`, `mvp`, `s`
  
- [ ] **E3.F1.T5**: Add 404 Not Found page  
  `frontend`, `mvp`, `xs`
  
- [ ] **E3.F1.T6**: Set up main.tsx entry point  
  `frontend`, `mvp`, `xs`

---

### E3.F2: Global Navigation
**Labels**: `feature`, `mvp`, `frontend`, `p0-critical`, `s`

**Tasks**:
- [ ] **E3.F2.T1**: Create navigation component  
  `frontend`, `mvp`, `s`
  
- [ ] **E3.F2.T2**: Add all navigation links  
  `frontend`, `mvp`, `s`
  
- [ ] **E3.F2.T3**: Show auth state (signed in/out)  
  `frontend`, `mvp`, `s`
  
- [ ] **E3.F2.T4**: Make navigation sticky on scroll  
  `frontend`, `mvp`, `xs`
  
- [ ] **E3.F2.T5**: Add mobile hamburger menu  
  `frontend`, `mvp`, `m`
  
- [ ] **E3.F2.T6**: Highlight active page  
  `frontend`, `mvp`, `xs`

---

### E3.F3: Base Styles & Responsive Layout
**Labels**: `feature`, `mvp`, `frontend`, `design`, `p1-high`, `m`

**Tasks**:
- [ ] **E3.F3.T1**: Create global CSS reset  
  `frontend`, `mvp`, `xs`
  
- [ ] **E3.F3.T2**: Define color variables  
  `frontend`, `mvp`, `xs`
  
- [ ] **E3.F3.T3**: Define typography scale  
  `frontend`, `mvp`, `xs`
  
- [ ] **E3.F3.T4**: Create responsive grid system  
  `frontend`, `mvp`, `s`
  
- [ ] **E3.F3.T5**: Define breakpoints (360px, 768px, 1024px, 1440px)  
  `frontend`, `mvp`, `xs`
  
- [ ] **E3.F3.T6**: Create button styles  
  `frontend`, `mvp`, `s`
  
- [ ] **E3.F3.T7**: Create form input styles  
  `frontend`, `mvp`, `s`
  
- [ ] **E3.F3.T8**: Ensure 44px touch targets  
  `frontend`, `mvp`, `s`

---

### E4.F1: Landing Page
**Labels**: `feature`, `mvp`, `frontend`, `design`, `ai-generated`, `p1-high`, `l`

**Tasks**:
- [ ] **E4.F1.T1**: Create Home page component  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F1.T2**: Design hero section with tagline  
  `frontend`, `design`, `mvp`, `s`
  
- [ ] **E4.F1.T3**: Add feature highlights section  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F1.T4**: Create "About" section  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F1.T5**: Add CTAs to Get Started and Inspiration  
  `frontend`, `mvp`, `xs`
  
- [ ] **E4.F1.T6**: Make hero responsive  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F1.T7**: Add Snail animation component (Phase 7)  
  `frontend`, `mvp`, `m`

---

### E4.F2: Get Started Page
**Labels**: `feature`, `mvp`, `frontend`, `design`, `ai-generated`, `p1-high`, `l`

**Tasks**:
- [ ] **E4.F2.T1**: Create GetStarted page component  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F2.T2**: Add supplies list section  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F2.T3**: Create envelope addressing diagram  
  `frontend`, `design`, `mvp`, `m`
  
- [ ] **E4.F2.T4**: Add postage placement guide  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F2.T5**: Create 5-step checklist  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F2.T6**: Add mailing options (mailbox, post office, pickup)  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F2.T7**: Create mini-FAQ section  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F2.T8**: Add CTAs to Inspiration and Mailbox  
  `frontend`, `mvp`, `xs`
  
- [ ] **E4.F2.T9**: Make page scannable with clear headings  
  `frontend`, `mvp`, `s`

---

### E4.F3: Resources Library
**Labels**: `feature`, `mvp`, `frontend`, `design`, `ai-generated`, `p2-medium`, `l`

**Tasks**:
- [ ] **E4.F3.T1**: Create Resources page component  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F3.T2**: Add Postal Guidelines section  
  `frontend`, `mvp`, `m`
  
- [ ] **E4.F3.T3**: Add Templates & Examples section  
  `frontend`, `mvp`, `m`
  
- [ ] **E4.F3.T4**: Add Supplies & Tools section  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F3.T5**: Add How-To Deep Dives section  
  `frontend`, `mvp`, `m`
  
- [ ] **E4.F3.T6**: Add Legal/Privacy/Safety section  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F3.T7**: Add External Links section  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F3.T8**: Add Glossary section  
  `frontend`, `mvp`, `s`
  
- [ ] **E4.F3.T9**: Create jump-to-section navigation  
  `frontend`, `mvp`, `s`

---

### E4.F4: About & Contact Pages
**Labels**: `feature`, `mvp`, `frontend`, `ai-generated`, `p3-low`, `s`

**Tasks**:
- [ ] **E4.F4.T1**: Create About page with mission statement  
  `frontend`, `mvp`, `xs`
  
- [ ] **E4.F4.T2**: Create Contact page (or placeholder)  
  `frontend`, `mvp`, `xs`

---

### E5.F1: Prompt Generation Backend
**Labels**: `feature`, `mvp`, `backend`, `p1-high`, `s`

**Tasks**:
- [ ] **E5.F1.T1**: Seed 10 initial prompts (5 writing, 5 drawing)  
  `backend`, `mvp`, `s`
  
- [ ] **E5.F1.T2**: Add active flag to prompts table  
  `backend`, `mvp`, `xs`
  
- [ ] **E5.F1.T3**: Test random selection logic  
  `backend`, `mvp`, `xs`

---

### E5.F2: Inspiration UI
**Labels**: `feature`, `mvp`, `frontend`, `p1-high`, `m`

**Tasks**:
- [ ] **E5.F2.T1**: Create Inspiration page component  
  `frontend`, `mvp`, `s`
  
- [ ] **E5.F2.T2**: Add writing/drawing toggle buttons  
  `frontend`, `mvp`, `s`
  
- [ ] **E5.F2.T3**: Create prompt display card  
  `frontend`, `mvp`, `s`
  
- [ ] **E5.F2.T4**: Add "Get New Prompt" button  
  `frontend`, `mvp`, `xs`
  
- [ ] **E5.F2.T5**: Add loading state  
  `frontend`, `mvp`, `xs`
  
- [ ] **E5.F2.T6**: Add error state with retry  
  `frontend`, `mvp`, `s`
  
- [ ] **E5.F2.T7**: Add empty state (friendly 404)  
  `frontend`, `mvp`, `xs`
  
- [ ] **E5.F2.T8**: Create promptsClient service  
  `frontend`, `mvp`, `s`

---

### E5.F3: Prompt Management
**Labels**: `feature`, `post-mvp`, `backend`, `p3-low`, `m`

**Tasks**:
- [ ] **E5.F3.T1**: Create admin endpoint to add prompts  
  `backend`, `post-mvp`, `s`
  
- [ ] **E5.F3.T2**: Create admin endpoint to deactivate prompts  
  `backend`, `post-mvp`, `s`
  
- [ ] **E5.F3.T3**: Add prompt categories  
  `backend`, `post-mvp`, `s`

---

### E6.F1: User Registration
**Labels**: `feature`, `mvp`, `frontend`, `backend`, `ai-generated`, `p0-critical`, `m`

**Tasks**:
- [ ] **E6.F1.T1**: Create Register page component  
  `frontend`, `mvp`, `s`
  
- [ ] **E6.F1.T2**: Create registration form (email, username, password)  
  `frontend`, `mvp`, `s`
  
- [ ] **E6.F1.T3**: Add client-side validation  
  `frontend`, `mvp`, `s`
  
- [ ] **E6.F1.T4**: Display server validation errors  
  `frontend`, `mvp`, `s`
  
- [ ] **E6.F1.T5**: Create authClient service  
  `frontend`, `mvp`, `s`
  
- [ ] **E6.F1.T6**: Store JWT in localStorage  
  `frontend`, `mvp`, `xs`
  
- [ ] **E6.F1.T7**: Redirect to mailbox after registration  
  `frontend`, `mvp`, `xs`

---

### E6.F2: User Login
**Labels**: `feature`, `mvp`, `frontend`, `backend`, `ai-generated`, `p0-critical`, `m`

**Tasks**:
- [ ] **E6.F2.T1**: Create Login page component  
  `frontend`, `mvp`, `s`
  
- [ ] **E6.F2.T2**: Create login form (email/username, password)  
  `frontend`, `mvp`, `s`
  
- [ ] **E6.F2.T3**: Handle login errors gracefully  
  `frontend`, `mvp`, `s`
  
- [ ] **E6.F2.T4**: Store JWT in localStorage  
  `frontend`, `mvp`, `xs`
  
- [ ] **E6.F2.T5**: Redirect to mailbox after login  
  `frontend`, `mvp`, `xs`

---

### E6.F3: Session Management
**Labels**: `feature`, `mvp`, `frontend`, `ai-generated`, `p1-high`, `m`

**Tasks**:
- [ ] **E6.F3.T1**: Create getToken() helper  
  `frontend`, `mvp`, `xs`
  
- [ ] **E6.F3.T2**: Create getCurrentUser() helper  
  `frontend`, `mvp`, `s`
  
- [ ] **E6.F3.T3**: Create logout() function  
  `frontend`, `mvp`, `xs`
  
- [ ] **E6.F3.T4**: Clear token on logout  
  `frontend`, `mvp`, `xs`
  
- [ ] **E6.F3.T5**: Check auth state on app load  
  `frontend`, `mvp`, `s`
  
- [ ] **E6.F3.T6**: Handle token expiration  
  `frontend`, `mvp`, `s`

---

### E6.F4: Protected Routes
**Labels**: `feature`, `mvp`, `frontend`, `ai-generated`, `p0-critical`, `s`

**Tasks**:
- [ ] **E6.F4.T1**: Create ProtectedRoute wrapper component  
  `frontend`, `mvp`, `s`
  
- [ ] **E6.F4.T2**: Redirect unauthenticated users to login  
  `frontend`, `mvp`, `xs`
  
- [ ] **E6.F4.T3**: Protect /mailbox route  
  `frontend`, `mvp`, `xs`

---

### E7.F1: Mail Upload
**Labels**: `feature`, `mvp`, `frontend`, `backend`, `ai-generated`, `p0-critical`, `l`

**Tasks**:
- [ ] **E7.F1.T1**: Create mailClient service  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F1.T2**: Create upload form in MyMailbox  
  `frontend`, `mvp`, `m`
  
- [ ] **E7.F1.T3**: Add file input with image preview  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F1.T4**: Add title, notes, date, direction fields  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F1.T5**: Validate file type client-side  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F1.T6**: Validate file size client-side (≤5MB)  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F1.T7**: Show upload progress  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F1.T8**: Handle upload errors  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F1.T9**: Add to gallery immediately on success  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F1.T10**: Review AI-generated upload UI for security and validation  
  `frontend`, `ai-workflow`, `mvp`, `s`

---

### E7.F2: Mail Gallery View
**Labels**: `feature`, `mvp`, `frontend`, `backend`, `ai-generated`, `p0-critical`, `l`

**Tasks**:
- [ ] **E7.F2.T1**: Create MyMailbox page component  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F2.T2**: Create Sent/Received tabs  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F2.T3**: Fetch mail items from API  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F2.T4**: Create grid layout (responsive)  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F2.T5**: Create mail card component  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F2.T6**: Display thumbnail with metadata  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F2.T7**: Add loading state  
  `frontend`, `mvp`, `xs`
  
- [ ] **E7.F2.T8**: Add empty state  
  `frontend`, `mvp`, `xs`
  
- [ ] **E7.F2.T9**: Implement pagination or infinite scroll  
  `frontend`, `mvp`, `m`

---

### E7.F3: Mail Detail View
**Labels**: `feature`, `mvp`, `frontend`, `ai-generated`, `p1-high`, `m`

**Tasks**:
- [ ] **E7.F3.T1**: Create modal component  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F3.T2**: Open modal on card click  
  `frontend`, `mvp`, `xs`
  
- [ ] **E7.F3.T3**: Display full-size image  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F3.T4**: Add zoom controls  
  `frontend`, `mvp`, `m`
  
- [ ] **E7.F3.T5**: Display all metadata  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F3.T6**: Add close button (X and ESC key)  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F3.T7**: Trap focus within modal  
  `frontend`, `mvp`, `s`

---

### E7.F4: Mail Management (Delete)
**Labels**: `feature`, `mvp`, `frontend`, `backend`, `ai-generated`, `p1-high`, `s`

**Tasks**:
- [ ] **E7.F4.T1**: Add delete button to mail card  
  `frontend`, `mvp`, `xs`
  
- [ ] **E7.F4.T2**: Show confirmation dialog  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F4.T3**: Call delete API endpoint  
  `frontend`, `mvp`, `s`
  
- [ ] **E7.F4.T4**: Remove from gallery immediately  
  `frontend`, `mvp`, `xs`
  
- [ ] **E7.F4.T5**: Show success/error message  
  `frontend`, `mvp`, `xs`

---

### E8.F1: Accessibility Compliance
**Labels**: `feature`, `mvp`, `frontend`, `ai-generated`, `p0-critical`, `l`

**Tasks**:
- [ ] **E8.F1.T1**: Ensure WCAG AA color contrast (4.5:1)  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F1.T2**: Add visible focus states to all interactive elements  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F1.T3**: Add ARIA labels to all buttons and inputs  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F1.T4**: Ensure proper heading hierarchy (h1 → h2 → h3)  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F1.T5**: Add alt text to all images  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F1.T6**: Make all forms keyboard accessible  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F1.T7**: Add skip-to-content link  
  `frontend`, `mvp`, `xs`
  
- [ ] **E8.F1.T8**: Test with screen reader (NVDA/VoiceOver)  
  `frontend`, `mvp`, `m`
  
- [ ] **E8.F1.T9**: Run axe DevTools audit  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F1.T10**: Run Lighthouse accessibility audit  
  `frontend`, `mvp`, `s`

---

### E8.F2: Mobile Responsiveness
**Labels**: `feature`, `mvp`, `frontend`, `ai-generated`, `p0-critical`, `m`

**Tasks**:
- [ ] **E8.F2.T1**: Test all pages at 360px width  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F2.T2**: Test all pages at 768px width (tablet)  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F2.T3**: Ensure touch targets are ≥44px  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F2.T4**: Make navigation mobile-friendly  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F2.T5**: Make forms mobile-friendly  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F2.T6**: Test grid layouts on mobile  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F2.T7**: Add pinch-to-zoom support for images  
  `frontend`, `mvp`, `s`

---

### E8.F3: Progressive Enhancement
**Labels**: `feature`, `mvp`, `frontend`, `ai-generated`, `p2-medium`, `m`

**Tasks**:
- [ ] **E8.F3.T1**: Create Snail SVG component  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F3.T2**: Add crawl animation with CSS  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F3.T3**: Create Fast/Slow control buttons  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F3.T4**: Detect prefers-reduced-motion  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F3.T5**: Pause animation when reduced motion is enabled  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F3.T6**: Ensure page works without JavaScript  
  `frontend`, `mvp`, `s`
  
- [ ] **E8.F3.T7**: Add Snail to landing page hero  
  `frontend`, `mvp`, `xs`

---

### E9.F1: Community Wall Stub Page
**Labels**: `feature`, `mvp`, `frontend`, `p2-medium`, `s`

**Tasks**:
- [ ] **E9.F1.T1**: Create Community page component  
  `frontend`, `mvp`, `s`
  
- [ ] **E9.F1.T2**: Add "Coming Soon" message  
  `frontend`, `mvp`, `xs`
  
- [ ] **E9.F1.T3**: Explain moderation-first approach  
  `frontend`, `mvp`, `s`
  
- [ ] **E9.F1.T4**: List future features (curated examples, submissions, reporting)  
  `frontend`, `mvp`, `s`
  
- [ ] **E9.F1.T5**: Add safety-first principles section  
  `frontend`, `mvp`, `s`

---

### E10.F1: Rate Limiting
**Labels**: `feature`, `mvp`, `backend`, `p1-high`, `m`

**Tasks**:
- [ ] **E10.F1.T1**: Create rate limiting middleware  
  `backend`, `mvp`, `m`
  
- [ ] **E10.F1.T2**: Implement sliding window algorithm  
  `backend`, `mvp`, `m`
  
- [ ] **E10.F1.T3**: Apply to /auth endpoints (5 req/min)  
  `backend`, `mvp`, `xs`
  
- [ ] **E10.F1.T4**: Apply to /mail POST (10 req/min)  
  `backend`, `mvp`, `xs`
  
- [ ] **E10.F1.T5**: Return 429 status with Retry-After header  
  `backend`, `mvp`, `s`
  
- [ ] **E10.F1.T6**: Test rate limiting under load  
  `backend`, `mvp`, `s`

---

### E10.F2: Image Optimization
**Labels**: `feature`, `mvp`, `backend`, `p2-medium`, `s`

**Tasks**:
- [ ] **E10.F2.T1**: Validate image dimensions  
  `backend`, `mvp`, `s`
  
- [ ] **E10.F2.T2**: Generate thumbnails on upload  
  `backend`, `post-mvp`, `m`
  
- [ ] **E10.F2.T3**: Consider WebP conversion  
  `backend`, `post-mvp`, `m`

---

### E10.F3: Caching Strategy
**Labels**: `feature`, `mvp`, `backend`, `infrastructure`, `p1-high`, `s`

**Tasks**:
- [ ] **E10.F3.T1**: Add Cache-Control headers to images  
  `backend`, `mvp`, `xs`
  
- [ ] **E10.F3.T2**: Configure Vite build for asset hashing  
  `frontend`, `mvp`, `xs`
  
- [ ] **E10.F3.T3**: Set up long-lived cache for static assets  
  `infrastructure`, `mvp`, `s`
  
- [ ] **E10.F3.T4**: Consider ETag support for images  
  `backend`, `post-mvp`, `s`

---

### E10.F4: Security Hardening
**Labels**: `feature`, `mvp`, `backend`, `p0-critical`, `m`

**Tasks**:
- [ ] **E10.F4.T1**: Enable CORS with proper origins  
  `backend`, `mvp`, `s`
  
- [ ] **E10.F4.T2**: Add HTTPS redirect in production  
  `infrastructure`, `mvp`, `xs`
  
- [ ] **E10.F4.T3**: Set secure cookie flags  
  `backend`, `mvp`, `xs`
  
- [ ] **E10.F4.T4**: Add Content-Security-Policy headers  
  `backend`, `mvp`, `s`
  
- [ ] **E10.F4.T5**: Validate all user inputs  
  `backend`, `mvp`, `s`
  
- [ ] **E10.F4.T6**: Sanitize file paths  
  `backend`, `mvp`, `s`

---

### E11.F1: Backend Testing
**Labels**: `feature`, `mvp`, `backend`, `p2-medium`, `l`

**Tasks**:
- [ ] **E11.F1.T1**: Set up pytest  
  `backend`, `mvp`, `s`
  
- [ ] **E11.F1.T2**: Write tests for /health endpoint  
  `backend`, `mvp`, `xs`
  
- [ ] **E11.F1.T3**: Write tests for /prompts endpoint  
  `backend`, `mvp`, `s`
  
- [ ] **E11.F1.T4**: Write tests for auth endpoints  
  `backend`, `mvp`, `m`
  
- [ ] **E11.F1.T5**: Write tests for mail endpoints  
  `backend`, `mvp`, `l`
  
- [ ] **E11.F1.T6**: Write tests for image streaming  
  `backend`, `mvp`, `m`
  
- [ ] **E11.F1.T7**: Set up test database  
  `backend`, `mvp`, `s`
  
- [ ] **E11.F1.T8**: Achieve 80%+ code coverage  
  `backend`, `post-mvp`, `l`

---

### E11.F2: Frontend Testing
**Labels**: `feature`, `mvp`, `frontend`, `p3-low`, `l`

**Tasks**:
- [ ] **E11.F2.T1**: Set up Vitest  
  `frontend`, `mvp`, `s`
  
- [ ] **E11.F2.T2**: Set up React Testing Library  
  `frontend`, `mvp`, `s`
  
- [ ] **E11.F2.T3**: Write component tests  
  `frontend`, `post-mvp`, `l`
  
- [ ] **E11.F2.T4**: Write integration tests  
  `frontend`, `post-mvp`, `l`

---

### E11.F3: Performance Testing
**Labels**: `feature`, `mvp`, `backend`, `infrastructure`, `p1-high`, `m`

**Tasks**:
- [ ] **E11.F3.T1**: Set up wrk or locust for load testing  
  `infrastructure`, `mvp`, `s`
  
- [ ] **E11.F3.T2**: Test /health at 50 RPS  
  `backend`, `mvp`, `s`
  
- [ ] **E11.F3.T3**: Test /prompts at 50 RPS  
  `backend`, `mvp`, `s`
  
- [ ] **E11.F3.T4**: Verify p95 response times ≤300ms  
  `backend`, `mvp`, `s`
  
- [ ] **E11.F3.T5**: Run Lighthouse performance audit  
  `frontend`, `mvp`, `s`
  
- [ ] **E11.F3.T6**: Measure Core Web Vitals  
  `frontend`, `mvp`, `s`

---

### E12.F1: Technical Documentation
**Labels**: `feature`, `mvp`, `documentation`, `p1-high`, `m`

**Tasks**:
- [ ] **E12.F1.T1**: Write comprehensive README  
  `documentation`, `mvp`, `m`
  
- [ ] **E12.F1.T2**: Document all API endpoints  
  `documentation`, `mvp`, `m`
  
- [ ] **E12.F1.T3**: Create architecture diagrams  
  `documentation`, `mvp`, `s`
  
- [ ] **E12.F1.T4**: Document database schema  
  `documentation`, `mvp`, `s`
  
- [ ] **E12.F1.T5**: Create setup guide for developers  
  `documentation`, `mvp`, `s`
  
- [ ] **E12.F1.T6**: Document environment variables  
  `documentation`, `mvp`, `s`

---

### E12.F2: User Documentation
**Labels**: `feature`, `mvp`, `documentation`, `p2-medium`, `s`

**Tasks**:
- [ ] **E12.F2.T1**: Write user guide for Get Started  
  `documentation`, `mvp`, `s`
  
- [ ] **E12.F2.T2**: Create FAQ section  
  `documentation`, `mvp`, `s`
  
- [ ] **E12.F2.T3**: Document privacy policy  
  `documentation`, `mvp`, `s`

---

### E12.F3: Project Governance
**Labels**: `feature`, `mvp`, `documentation`, `p1-high`, `s`

**Tasks**:
- [ ] **E12.F3.T1**: Create and maintain CHANGELOG.md  
  `documentation`, `mvp`, `s`
  
- [ ] **E12.F3.T2**: Set up GitHub Issues templates  
  `documentation`, `mvp`, `xs`
  
- [ ] **E12.F3.T3**: Create PR template  
  `documentation`, `mvp`, `xs`
  
- [ ] **E12.F3.T4**: Document contribution guidelines  
  `documentation`, `post-mvp`, `s`

---

### E12.F4: AI Workflow Documentation
**Labels**: `feature`, `mvp`, `ai-workflow`, `documentation`, `p1-high`, `m`

**Tasks**:
- [ ] **E12.F4.T1**: Document Speckit workflow in README  
  `documentation`, `ai-workflow`, `mvp`, `s`
  
- [ ] **E12.F4.T2**: Create guide for using speckit.analyze prompt  
  `documentation`, `ai-workflow`, `mvp`, `s`
  
- [ ] **E12.F4.T3**: Document how to review AI-generated code  
  `documentation`, `ai-workflow`, `mvp`, `s`
  
- [ ] **E12.F4.T4**: Create troubleshooting guide for AI workflow issues  
  `documentation`, `ai-workflow`, `mvp`, `s`
  
- [ ] **E12.F4.T5**: Document best practices for prompt engineering  
  `documentation`, `ai-workflow`, `mvp`, `s`
  
- [ ] **E12.F4.T6**: Archive all AI-generated artifacts (spec, plan, tasks)  
  `documentation`, `ai-workflow`, `mvp`, `xs`
  
- [ ] **E12.F4.T7**: Document AI limitations and manual review requirements  
  `documentation`, `ai-workflow`, `mvp`, `s`
  
- [ ] **E12.F4.T8**: Create checklist for validating AI-generated features  
  `documentation`, `ai-workflow`, `mvp`, `s`

---

### E13.F1: Submission System (Post-MVP)
**Labels**: `feature`, `post-mvp`, `frontend`, `backend`, `p3-low`, `xl`

**Tasks**:
- [ ] **E13.F1.T1**: Design submission form  
  `frontend`, `post-mvp`, `m`
  
- [ ] **E13.F1.T2**: Create submission API endpoint  
  `backend`, `post-mvp`, `m`
  
- [ ] **E13.F1.T3**: Store submissions in pending state  
  `backend`, `post-mvp`, `s`
  
- [ ] **E13.F1.T4**: Add submission guidelines  
  `frontend`, `post-mvp`, `s`

---

### E13.F2: Moderation Tools (Post-MVP)
**Labels**: `feature`, `post-mvp`, `backend`, `p3-low`, `xl`

**Tasks**:
- [ ] **E13.F2.T1**: Create moderator role  
  `backend`, `post-mvp`, `s`
  
- [ ] **E13.F2.T2**: Build moderation dashboard  
  `frontend`, `post-mvp`, `l`
  
- [ ] **E13.F2.T3**: Add approve/reject actions  
  `backend`, `post-mvp`, `m`
  
- [ ] **E13.F2.T4**: Add reporting system  
  `backend`, `post-mvp`, `m`

---

### E13.F3: Content Display (Post-MVP)
**Labels**: `feature`, `post-mvp`, `frontend`, `backend`, `p3-low`, `l`

**Tasks**:
- [ ] **E13.F3.T1**: Display approved submissions  
  `frontend`, `post-mvp`, `m`
  
- [ ] **E13.F3.T2**: Add filtering by category  
  `frontend`, `post-mvp`, `s`
  
- [ ] **E13.F3.T3**: Add pagination  
  `frontend`, `post-mvp`, `s`

---

### E14.F1: Matching Algorithm (Future)
**Labels**: `feature`, `future`, `backend`, `p3-low`, `xl`

**Tasks**:
- [ ] **E14.F1.T1**: Design matching criteria  
  `backend`, `future`, `m`
  
- [ ] **E14.F1.T2**: Implement preference system  
  `backend`, `future`, `l`
  
- [ ] **E14.F1.T3**: Create matching algorithm  
  `backend`, `future`, `xl`

---

### E14.F2: Privacy Controls (Future)
**Labels**: `feature`, `future`, `frontend`, `backend`, `p3-low`, `l`

**Tasks**:
- [ ] **E14.F2.T1**: Add profile visibility settings  
  `frontend`, `future`, `m`
  
- [ ] **E14.F2.T2**: Implement blocking system  
  `backend`, `future`, `m`
  
- [ ] **E14.F2.T3**: Add communication preferences  
  `frontend`, `future`, `s`

---

### E14.F3: Reporting & Safety (Future)
**Labels**: `feature`, `future`, `backend`, `p3-low`, `m`

**Tasks**:
- [ ] **E14.F3.T1**: Create reporting system  
  `backend`, `future`, `m`
  
- [ ] **E14.F3.T2**: Add safety guidelines  
  `frontend`, `future`, `s`
  
- [ ] **E14.F3.T3**: Implement automated safety checks  
  `backend`, `future`, `l`

---

## 📊 METRICS & SUCCESS CRITERIA

### Performance Metrics
- [ ] P95 response time for /health ≤300ms @ 50 RPS
- [ ] P95 response time for /prompts ≤300ms @ 50 RPS
- [ ] 95% of valid uploads succeed within 5 seconds
- [ ] Lighthouse performance score ≥90
- [ ] Core Web Vitals pass (LCP ≤2.5s, FID ≤100ms, CLS ≤0.1)

### Accessibility Metrics
- [ ] Lighthouse accessibility score ≥95
- [ ] axe DevTools 0 violations
- [ ] WCAG AA color contrast (4.5:1) on all text
- [ ] 100% keyboard operability
- [ ] Screen reader compatible (NVDA/VoiceOver tested)

### User Experience Metrics
- [ ] 90% of users complete Get Started checklist ≤10 minutes
- [ ] 95% of mobile interactions succeed without zooming (≤360px)
- [ ] Archive browsing latency feels instant
- [ ] Enlarge/zoom interaction ≤300ms

### Security Metrics
- [ ] Rate limiting active on auth endpoints (5 req/min)
- [ ] Rate limiting active on upload endpoints (10 req/min)
- [ ] All images require authentication
- [ ] No public access to private archives
- [ ] JWT tokens properly validated

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Production
- [ ] All MVP features complete
- [ ] All P0 and P1 tasks done
- [ ] AI-generated code reviewed for security and quality
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed
- [ ] Security review complete
- [ ] Documentation complete
- [ ] CHANGELOG.md updated

### Production
- [ ] Set up PostgreSQL database
- [ ] Configure environment variables
- [ ] Set up image storage
- [ ] Configure CORS for production domain
- [ ] Set up SSL/TLS certificates
- [ ] Configure CDN (if applicable)
- [ ] Set up monitoring and logging
- [ ] Create backup strategy

### Post-Launch
- [ ] Monitor error logs
- [ ] Track performance metrics
- [ ] Gather user feedback
- [ ] Plan post-MVP features
- [ ] Update documentation as needed

---

## 📝 NOTES

### AI-Assisted Development Workflow (Speckit)

This project uses **Speckit** - an AI-assisted development framework with structured phases:

#### Phase 0: Specification & Planning (Before Coding)
1. **Analyze** (`speckit.analyze`): Define problem, users, and goals
2. **Specify** (`speckit.specify`): Create spec.md with user scenarios, functional requirements, success criteria
3. **Plan** (`speckit.plan`): Generate plan.md with phases, gates, and technical decisions
4. **Tasks** (`speckit.tasks`): Break down plan into tasks.md with specific file paths
5. **Constitution** (`speckit.constitution`): Define governance principles (docs, accessibility, privacy)

#### Phase 1-8: Implementation (AI-Generated Code)
1. Run `speckit.implement` prompt for each phase (0-8)
2. **AI generates** all code (backend endpoints, frontend components, migrations, tests)
3. **Human reviews** AI-generated code for:
   - Security vulnerabilities (auth, validation, SQL injection)
   - Logic errors and edge cases
   - Accessibility compliance (ARIA labels, focus management)
   - Performance issues
   - Code quality and maintainability
4. **Human tests** AI-generated features:
   - Manual testing of user scenarios
   - Run quality gates (G1-G5)
   - Accessibility audits
   - Performance benchmarks
5. **Human iterates** with AI if issues found
6. **Human commits** reviewed and tested code

#### Best Practices for AI Workflow
- ✅ **Always review** AI-generated security-critical code (auth, file uploads, SQL)
- ✅ **Test thoroughly** - AI may generate working code with subtle bugs
- ✅ **Validate specs** - AI implements what you specify, so specs must be complete
- ✅ **Check dependencies** - AI may use outdated or incompatible package versions
- ✅ **Manual accessibility** - AI may miss ARIA labels, focus management, keyboard nav
- ✅ **Archive artifacts** - Save spec.md, plan.md, tasks.md for reference
- ⚠️ **Verify file paths** - AI may create files in wrong locations
- ⚠️ **Check imports** - AI may import non-existent modules
- ⚠️ **Test error handling** - AI often focuses on happy path

### Traditional Development Workflow (Manual Coding)
1. Create feature branch from `main`
2. Work on tasks in priority order (P0 → P3)
3. Write tests for new features
4. Run accessibility checks
5. Update CHANGELOG.md
6. Create PR with description and screenshots
7. Code review
8. Merge to `main`

### Task Estimation Guide
- **XS** (1-2 hours): Simple config changes, small UI tweaks
- **S** (2-4 hours): Single component, single endpoint, minor feature
- **M** (1-2 days): Complex component, API with multiple endpoints, moderate feature
- **L** (3-5 days): Multiple related components, full feature with frontend + backend
- **XL** (1-2 weeks): Epic-level feature with many dependencies

### Priority Guide
- **P0 (Critical)**: Must have for MVP; blocks other work
- **P1 (High)**: Important for MVP; core functionality
- **P2 (Medium)**: Nice to have for MVP; enhances experience
- **P3 (Low)**: Post-MVP; future enhancements

### AI Code Review Checklist

When reviewing AI-generated code, systematically check:

#### Security Review
- [ ] Authentication/authorization implemented correctly
- [ ] Password hashing uses bcrypt with proper salt rounds
- [ ] JWT tokens properly signed and validated
- [ ] File uploads validated (type, size, content)
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (input sanitization)
- [ ] CSRF protection if using cookies
- [ ] Rate limiting on sensitive endpoints
- [ ] Proper error messages (no sensitive data leaks)

#### Functionality Review
- [ ] All user scenarios (US1-US4) work end-to-end
- [ ] Edge cases handled (empty states, errors, validation)
- [ ] Loading states implemented
- [ ] Error states with friendly messages
- [ ] Form validation (client and server side)
- [ ] File paths and imports are correct
- [ ] Database queries optimized (no N+1 queries)
- [ ] API contracts match OpenAPI spec

#### Accessibility Review
- [ ] ARIA labels on all interactive elements
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Focus management (modal traps, visible states)
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Semantic HTML (headings, landmarks, lists)
- [ ] Alt text on images
- [ ] `prefers-reduced-motion` respected
- [ ] Touch targets ≥44px on mobile

#### Performance Review
- [ ] Images optimized and lazy-loaded
- [ ] API responses cached appropriately
- [ ] Database indexes on foreign keys
- [ ] No blocking operations on main thread
- [ ] Bundle size reasonable (check with `npm run build`)
- [ ] Lighthouse score ≥90

#### Quality Review
- [ ] Code follows project conventions
- [ ] No commented-out code
- [ ] No debug console.logs
- [ ] Dependencies are necessary and up-to-date
- [ ] Environment variables used (no hardcoded secrets)
- [ ] Tests written (if specified in tasks)
- [ ] Documentation updated (README, CHANGELOG)

