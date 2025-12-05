# Changelog

All notable changes to this project will be documented here. Format based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

## [1.0.0] — 2025-12-02

### Added
- **Complete MVP Implementation**: All 39 tasks across 7 phases completed
- **Frontend (React + TypeScript + Vite)**:
  - GetStarted page: Hero checklist with 5 expandable steps, envelope diagram, mini-FAQ
  - Inspiration page: Prompt generation with writing/drawing toggle, API integration, error handling
  - Archive page: IndexedDB gallery with upload form, thumbnails, delete functionality
  - Community page: Stub with moderation guidelines and safety copy
  - Contact page: Email, social links, community guidelines
  - ArchiveForm component: Client-side image validation (JPEG/PNG, max 5MB)
  - Global Nav component with all 8 pages
  - IndexedDB wrapper (`idb.ts`) for Archive CRUD operations
  - Prompts API client (`promptsClient.ts`) with error handling
  - Base accessibility styles: focus outlines, prefers-reduced-motion support
- **Backend (FastAPI + Python 3.11)**:
  - GET /health endpoint with logging
  - GET /prompts?type=writing|drawing endpoint with validation
  - Pydantic models: Prompt, CommunityPost, SafetyReport, BuddyPreference
  - Prompt service with in-memory caching
  - Community service structure (future-disabled)
  - Future API routes in `api/community.py` (disabled, returns 501)
  - Global exception handler and structured logging
  - 10 seed prompts (5 writing, 5 drawing)
- **Documentation**:
  - Comprehensive README with features, testing, API docs, accessibility
  - Manual testing instructions for all 4 user stories
  - Quickstart guide with environment setup
  - OpenAPI contracts for prompts and community endpoints

### Changed
- README expanded with full project structure, testing, features
- Backend logging enhanced with structured logs and error tracking
- Prompts service uses caching for performance

## [0.3.0] — 2025-12-02

### Added
- Community section in constitution: Showcase Wall (moderation-first) and Writing Buddy Matching (roadmap)
- Community user story (US4) in spec with safety constraints
- Contracts for future community endpoints

## [0.2.1] — 2025-12-02

### Changed
- Renamed "My Mailbox" to "Archive" across constitution and spec
- Added Purpose section to constitution

## [0.2.0] — 2025-12-02

### Added
- Get Started and Resources structure in constitution
- Primary goals for static pages

## [0.1.1] — 2025-12-01

### Added
- Landing page snail enhancement note
- Accessibility controls guidance

## [0.1.0] — 2025-12-01

### Added
- Initial constitution with minimal requirements
- MVP scope: static pages, Archive, prompts, navigation

[Unreleased]: https://github.com/Jzoll/bringbacksnailmail/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Jzoll/bringbacksnailmail/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/Jzoll/bringbacksnailmail/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/Jzoll/bringbacksnailmail/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/Jzoll/bringbacksnailmail/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/Jzoll/bringbacksnailmail/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/Jzoll/bringbacksnailmail/releases/tag/v0.1.0
