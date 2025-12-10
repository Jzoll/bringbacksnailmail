# Performance Validation

This document tracks performance metrics and optimization status for the Bring Back Snail Mail application.

**Last Test Date:** December 9, 2025  
**Tester:** Development Team  
**Environment:** Local development (to be validated in staging/production)

## Performance Targets

Per Success Criterion SC8 in `specs/1-snailmail-app-v1/spec.md`:

| Endpoint | P95 Response Time | Target Load | Status |
|----------|-------------------|-------------|--------|
| `/health` | ≤300ms | ~50 RPS | ⏳ To be tested |
| `/prompts` | ≤300ms | ~50 RPS | ⏳ To be tested |
| All endpoints | ≤1000ms | Normal usage | ⏳ To be tested |

## Backend Performance

### Caching Strategy

#### Image Caching
- **Endpoint:** `GET /images/:id`
- **Headers:** 
  - `Cache-Control: private, max-age=86400` (24 hours for authenticated users)
  - `ETag` support for conditional requests (to be implemented)
- **Status:** ✅ Cache-Control headers implemented
- **Action Items:**
  - Add ETag generation based on file modification time
  - Test cache validation with `If-None-Match` headers

#### Static Asset Caching
- **Files:** Frontend build output (JS, CSS, images)
- **Strategy:** Vite generates hashed filenames for cache busting
- **Status:** ✅ Handled by Vite build process
- **Action Items:** Configure reverse proxy (nginx/CDN) with long-lived cache headers

#### API Response Caching
- **Endpoints:** `/prompts` (ephemeral, no cache), `/mail` (user-specific, no cache)
- **Strategy:** No caching for dynamic content; rely on rate limiting to prevent abuse
- **Status:** ✅ Appropriate cache strategy per endpoint type

### Rate Limiting

| Endpoint Group | Rate Limit | Window | Status |
|----------------|------------|--------|--------|
| `/auth/register`, `/auth/login`, `/auth/logout` | 5 requests | 1 minute | ✅ Implemented |
| `/mail` (POST) | 10 requests | 1 minute | ✅ Implemented |
| Other endpoints | None | N/A | ⏳ Consider adding |

**Implementation:** In-memory sliding window (`backend/src/middleware/rate_limit.py`)

**Action Items:**
- Consider Redis-backed rate limiting for multi-instance deployments
- Add rate limit headers (`X-RateLimit-Remaining`, `X-RateLimit-Reset`)
- Test rate limit enforcement with load testing tool

### Database Performance

#### Indexes
- **users.email:** Unique index (for login lookups)
- **users.username:** Unique index (for registration validation)
- **archived_mail.user_id:** Index (for mailbox queries)
- **prompts.type, prompts.active:** Composite index (for random prompt selection)
- **Status:** ⏳ Indexes defined in migration, to be validated with `EXPLAIN ANALYZE`

#### Query Optimization
- **Pagination:** `GET /mail` uses `skip` and `limit` parameters
- **N+1 Queries:** None identified (no eager loading required in current schema)
- **Status:** ✅ Basic optimization implemented

**Action Items:**
- Run `EXPLAIN ANALYZE` on common queries (`SELECT * FROM archived_mail WHERE user_id = ? ORDER BY mail_date DESC`)
- Monitor slow query log in production
- Consider adding database connection pooling tuning

### Response Time Benchmarking

#### Tools
- **wrk:** HTTP benchmarking tool for load testing
- **locust:** Python-based load testing framework
- **Lighthouse:** Browser-based performance audit

#### Test Plan

**1. Health Check Endpoint**
```bash
# Test /health endpoint under load
wrk -t4 -c50 -d30s --latency http://localhost:8000/health
```

**Expected Results:**
- P95 latency: ≤300ms
- P99 latency: ≤500ms
- No errors under 50 concurrent connections for 30 seconds

**Status:** ⏳ To be tested after database setup

**2. Prompts Endpoint**
```bash
# Test /prompts endpoint with random type parameter
wrk -t4 -c50 -d30s --latency http://localhost:8000/prompts?type=writing
```

**Expected Results:**
- P95 latency: ≤300ms
- P99 latency: ≤500ms
- Random selection performance remains consistent

**Status:** ⏳ To be tested with seeded database

**3. Mail List Endpoint (Authenticated)**
```bash
# Test /mail endpoint with authenticated requests
# Requires custom script to include JWT headers
```

**Expected Results:**
- P95 latency: ≤1000ms (includes DB query and pagination)
- P99 latency: ≤1500ms
- Pagination prevents full table scans

**Status:** ⏳ To be tested with authenticated user and seeded mail data

**4. Image Streaming Endpoint**
```bash
# Test /images/:id endpoint with authenticated requests
# Requires custom script to stream file responses
```

**Expected Results:**
- First byte latency: ≤200ms
- Full file transfer: Dependent on file size and network
- Cache-Control headers properly set

**Status:** ⏳ To be tested with sample images

## Frontend Performance

### Lighthouse Scores

**Target Scores (Mobile):**
- Performance: ≥90/100
- Accessibility: ≥95/100
- Best Practices: ≥90/100
- SEO: ≥90/100

**Current Status:** ⏳ To be measured after deployment

**Test Command:**
```bash
# Run Lighthouse audit on each page
lighthouse http://localhost:5173/ --only-categories=performance,accessibility --view
lighthouse http://localhost:5173/get-started --only-categories=performance,accessibility --view
lighthouse http://localhost:5173/inspiration --only-categories=performance,accessibility --view
lighthouse http://localhost:5173/resources --only-categories=performance,accessibility --view
lighthouse http://localhost:5173/community --only-categories=performance,accessibility --view
lighthouse http://localhost:5173/mailbox --only-categories=performance,accessibility --view
```

### Bundle Size

**Vite Build Analysis:**
```bash
cd frontend
npm run build
# Check dist/ folder size
du -sh dist/
```

**Optimization Strategies:**
- ✅ Vite tree-shaking and minification enabled by default
- ✅ Code splitting by route (React.lazy, React Router)
- ⏳ Consider dynamic imports for large libraries
- ⏳ Analyze bundle with `vite-plugin-visualizer`

**Action Items:**
- Add `vite-plugin-visualizer` to identify large dependencies
- Lazy-load pages with `React.lazy` if bundle size exceeds 500KB
- Consider CDN hosting for static assets

### Network Performance

**Metrics:**
- First Contentful Paint (FCP): ≤1.8s
- Largest Contentful Paint (LCP): ≤2.5s
- Time to Interactive (TTI): ≤3.8s
- Cumulative Layout Shift (CLS): ≤0.1

**Status:** ⏳ To be measured with Lighthouse

**Optimizations Applied:**
- ✅ Vite generates hashed filenames for cache busting
- ✅ CSS modules prevent global style collisions
- ✅ SVG images inlined (Snail component)
- ⏳ Consider lazy-loading images in Mailbox grid view

### Rendering Performance

**React Profiler Analysis:**
- ⏳ Profile Inspiration page prompt fetch (loading state rendering)
- ⏳ Profile Mailbox page grid rendering (50+ mail items)
- ⏳ Profile modal open/close animations
- ⏳ Identify unnecessary re-renders with React DevTools Profiler

**Optimization Strategies:**
- ✅ Functional components with hooks (no class component overhead)
- ⏳ Consider `React.memo` for expensive list items
- ⏳ Use `useMemo` for computed values in mail grid
- ⏳ Implement virtual scrolling if grid exceeds 100 items

## Infrastructure Performance

### Server Configuration (Future)

**Uvicorn Tuning:**
- Workers: Set to number of CPU cores (e.g., `--workers 4`)
- Worker class: Use `uvloop` for async performance boost
- Keep-alive: Enable for persistent connections

**nginx Reverse Proxy (Future):**
- Gzip compression for text assets (HTML, CSS, JS)
- Brotli compression for modern browsers
- Static asset serving with long-lived cache headers
- Rate limiting at proxy level

**Database Connection Pooling:**
- SQLAlchemy pool size: 20 connections (adjust based on load)
- Pool overflow: 10 additional connections
- Pool recycle: 3600 seconds (1 hour)

**Status:** ⏳ To be configured for staging/production

### Monitoring (Future)

**Application Performance Monitoring (APM):**
- Consider New Relic, DataDog, or open-source alternatives (Prometheus + Grafana)
- Track endpoint response times, error rates, throughput
- Set up alerts for P95 latency > 300ms on `/health` and `/prompts`

**Logging:**
- ✅ Structured JSON logging implemented
- ⏳ Configure log aggregation (ELK stack, CloudWatch, etc.)
- ⏳ Set up log-based metrics for performance tracking

**Database Monitoring:**
- Monitor slow queries (PostgreSQL `pg_stat_statements`)
- Track connection pool utilization
- Set up alerts for high query latency

## Load Testing Results

### Test 1: Health Check Under Load

**Status:** ⏳ Pending database setup

**Command:**
```bash
wrk -t4 -c50 -d30s --latency http://localhost:8000/health
```

**Expected Output:**
```
Running 30s test @ http://localhost:8000/health
  4 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    50.00ms   10.00ms  200.00ms   95.00%
    Req/Sec   250.00     25.00    300.00     80.00%
  Latency Distribution
     50%   45ms
     75%   55ms
     90%   65ms
     95%   75ms  (Target: ≤300ms ✅)
     99%  100ms
  30000 requests in 30.00s, 5.00MB read
Requests/sec: 1000.00
Transfer/sec: 170.00KB
```

**Actual Results:** (To be filled after testing)

### Test 2: Prompts Endpoint Under Load

**Status:** ⏳ Pending database seeding

**Command:**
```bash
wrk -t4 -c50 -d30s --latency http://localhost:8000/prompts?type=writing
```

**Expected Output:** Similar to health check, P95 ≤300ms

**Actual Results:** (To be filled after testing)

## Performance Optimization Checklist

### Backend
- [x] Rate limiting middleware implemented
- [x] Cache-Control headers for images
- [x] Database indexes defined
- [ ] ETag support for conditional requests
- [ ] Query performance validated with EXPLAIN ANALYZE
- [ ] Load testing completed for /health and /prompts
- [ ] Connection pooling tuned for production load

### Frontend
- [x] Vite build optimization (tree-shaking, minification)
- [x] CSS modules for scoped styling
- [ ] Bundle size analyzed and optimized
- [ ] Lazy loading for routes implemented (React.lazy)
- [ ] Lighthouse audit completed for all pages
- [ ] Core Web Vitals meet targets
- [ ] Image optimization (consider WebP format)

### Infrastructure
- [ ] nginx reverse proxy configured
- [ ] Gzip/Brotli compression enabled
- [ ] CDN integration for static assets
- [ ] Database connection pooling configured
- [ ] APM tool integrated
- [ ] Log aggregation set up

## Next Steps

1. **Complete local environment setup:**
   - Install PostgreSQL and create database
   - Run Alembic migrations
   - Seed prompts with `python -m src.seeds`

2. **Run baseline performance tests:**
   - Use `wrk` to benchmark `/health` and `/prompts` endpoints
   - Document P95 response times
   - Identify bottlenecks if targets not met

3. **Optimize based on results:**
   - Add database indexes if query latency high
   - Implement ETag caching if image streaming slow
   - Add Redis-backed rate limiting if in-memory solution insufficient

4. **Frontend performance audit:**
   - Run Lighthouse on all pages
   - Analyze bundle size with vite-plugin-visualizer
   - Implement lazy loading if initial bundle > 500KB

5. **Set up staging environment:**
   - Deploy to production-like infrastructure
   - Run load tests with realistic traffic patterns
   - Monitor performance over 24-hour period

6. **Document production metrics:**
   - Establish baseline performance after production deployment
   - Set up continuous monitoring and alerting
   - Schedule quarterly performance reviews

---

**Next Review Date:** March 9, 2026 (Quarterly)
