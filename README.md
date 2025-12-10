# Bring Back Snail Mail

A web application encouraging the art of physical correspondence by providing creative prompts, educational resources, and a personal archive for handwritten mail.

## Overview

**Bring Back Snail Mail** helps users:
- Learn the basics of addressing, stamping, and sending physical mail
- Find creative writing and drawing prompts to inspire correspondence
- Archive photos of sent and received mail in a private collection
- Discover resources for postal guidelines, templates, supplies, and best practices

**Live Demo:** (Coming soon)  
**Documentation:** See `/specs/1-snailmail-app-v1/` for detailed specification and planning artifacts

## Features

### 🏠 Home
- Hero section with animated snail mascot (progressive enhancement with reduced-motion support)
- Feature highlights and calls-to-action

### 📝 Get Started
- 5-step checklist for sending your first letter (Write, Address, Stamp, Seal, Mail)
- Envelope addressing diagram with labeled fields
- Mailing options guide (mailbox, post office, pickup)
- Mini-FAQ for common questions

### ✨ Inspiration
- Random writing and drawing prompts
- Toggle between prompt types
- One prompt at a time to encourage focus

### 📚 Resources
- **Postal Guidelines**: Addressing templates, size/weight limits, international mail
- **Templates & Examples**: Downloadable PDFs for various letter formats
- **Supplies & Tools**: Curated starter kits and shopping lists
- **How-To Deep Dives**: International addressing, archiving, hand-lettering tutorials
- **Legal/Privacy/Safety**: Consent guidance for sending photos/personal info
- **External Links**: Official postal services, pen pal communities
- **Glossary**: Postal terminology reference

### 🎨 Community Wall (Coming Soon)
- Stub page explaining moderation-first roadmap
- Future features: curated examples, moderated submissions, safety reporting

### 📮 My Mailbox (Authenticated)
- Upload photos of sent/received mail
- Organize by tabs (Sent/Received)
- Grid view with lightbox modal for viewing details
- Delete functionality with confirmation
- Private, user-specific collection

### 🔐 Authentication
- User registration with email/username/password
- JWT-based session management
- Protected routes for mailbox features

## Tech Stack

### Frontend
- **React 18.3** with TypeScript
- **Vite** for build tooling and dev server
- **React Router 6** for client-side routing
- **Plain CSS** modules (no preprocessor)
- Responsive design (desktop-first, mobile-compatible down to 360px)
- WCAG AA accessible (44px touch targets, focus states, semantic HTML)

### Backend
- **FastAPI 0.104.1** with Pydantic validation
- **Uvicorn 0.24.0** for ASGI server
- **SQLAlchemy 2.0.23** for ORM
- **Alembic 1.13.0** for database migrations
- **PostgreSQL** for data persistence
- **JWT authentication** via python-jose
- **bcrypt password hashing** via passlib
- **In-memory rate limiting** (5 req/min auth, 10 req/min uploads)
- **Structured JSON logging** with request_id, timestamp, level, message

### Infrastructure
- Server-side image storage (filesystem with file_path in DB)
- Authenticated image streaming with cache headers
- CORS middleware for local dev
- Environment-based configuration (.env)

## Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.9+
- **PostgreSQL** 14+
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/snailmail.git
   cd snailmail
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and secret key
   ```

3. **Backend setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   alembic upgrade head
   python -m src.seeds  # Seed initial prompts
   ```

4. **Frontend setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

**Start the backend** (from `backend/` directory):
```bash
source venv/bin/activate  # Activate virtual environment
uvicorn src.main:app --reload --host 127.0.0.1 --port 8000
```

**Start the frontend** (from `frontend/` directory):
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (OpenAPI/Swagger)

## Project Structure

```
snailmail/
├── backend/
│   ├── src/
│   │   ├── main.py              # FastAPI app setup
│   │   ├── database.py          # SQLAlchemy config
│   │   ├── seeds.py             # Database seeding script
│   │   ├── api/                 # Route handlers
│   │   │   ├── health.py        # Health check endpoint
│   │   │   ├── prompts.py       # Prompt retrieval
│   │   │   ├── auth.py          # Registration, login, logout
│   │   │   ├── mail.py          # Mail CRUD operations
│   │   │   └── images.py        # Authenticated image streaming
│   │   ├── middleware/
│   │   │   └── rate_limit.py    # Rate limiting middleware
│   │   └── models/
│   │       └── __init__.py      # User, Prompt, ArchivedMail models
│   ├── alembic/
│   │   ├── versions/            # Migration scripts
│   │   └── env.py               # Alembic configuration
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── main.tsx             # React entry point
│   │   ├── App.tsx              # Root component with routing
│   │   ├── components/
│   │   │   ├── Snail.tsx        # Animated snail mascot
│   │   │   └── Snail.css        # Snail animation styles
│   │   ├── pages/
│   │   │   ├── Home.tsx         # Landing page
│   │   │   ├── GetStarted.tsx   # How-to guide
│   │   │   ├── Inspiration.tsx  # Prompt generator
│   │   │   ├── Resources.tsx    # Resource library
│   │   │   ├── Community.tsx    # Community stub
│   │   │   └── MyMailbox.tsx    # Mail archive (authenticated)
│   │   ├── services/
│   │   │   ├── promptsClient.ts # Prompt API calls
│   │   │   ├── authClient.ts    # Auth API calls + token management
│   │   │   └── mailClient.ts    # Mail API calls
│   │   └── styles/              # CSS modules for pages and components
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
├── specs/
│   └── 1-snailmail-app-v1/
│       ├── spec.md              # Product specification
│       ├── plan.md              # Implementation plan
│       ├── tasks.md             # Task breakdown
│       ├── data-model.md        # Database schema
│       ├── quickstart.md        # Quick reference guide
│       └── contracts/
│           └── openapi.yaml     # API contract
├── .env.example
├── .gitignore
├── CHANGELOG.md
└── README.md
```

## API Documentation

See the auto-generated OpenAPI docs at `http://localhost:8000/docs` when the backend is running, or refer to `specs/1-snailmail-app-v1/contracts/openapi.yaml` for the full contract.

### Key Endpoints

**Public:**
- `GET /health` — Health check
- `GET /prompts?type=writing|drawing` — Random prompt retrieval

**Authenticated:**
- `POST /auth/register` — User registration
- `POST /auth/login` — Login (returns JWT)
- `POST /auth/logout` — Logout
- `POST /mail` — Upload mail photo
- `GET /mail?direction=sent|received&skip=0&limit=50` — List user's mail
- `DELETE /mail/:id` — Delete mail item
- `GET /images/:id` — Stream mail image (authenticated)

## Development

### Code Style
- **Backend**: Follow PEP 8; use type hints
- **Frontend**: ESLint with TypeScript rules; prefer functional components

### Testing
- **Backend**: `pytest tests/ -v` (tests not yet implemented)
- **Frontend**: `npm test` (tests not yet implemented)

### Accessibility
- WCAG AA compliance
- 44px minimum touch targets
- Keyboard navigation with visible focus states
- Semantic HTML and ARIA labels
- Respects `prefers-reduced-motion` for animations

### Performance
- P95 response times target: ≤300ms for `/health` and `/prompts` under ~50 RPS
- Image caching with `Cache-Control` headers
- Rate limiting to prevent abuse

## Contributing

This project is currently in MVP development. Contributions are welcome once v0.1.0 is released.

Planned contribution areas:
- Accessibility improvements (screen reader testing, contrast audits)
- Internationalization (i18n for non-English postal systems)
- Additional prompt categories (postcards, packages, thank-you notes)
- Community features (once moderation infrastructure is in place)

## License

(License TBD — to be added before public release)

## Acknowledgments

- Inspired by the [r/penpals](https://reddit.com/r/penpals) and [r/snailmail](https://reddit.com/r/snailmail) communities
- Postal guidelines sourced from USPS, Royal Mail, Canada Post, and other national services
- Accessibility guidance from WCAG 2.1 and WebAIM resources

## Contact

For questions or feedback: (Contact info TBD)

---

**Version:** 0.1.0 (MVP)  
**Last Updated:** December 9, 2025
