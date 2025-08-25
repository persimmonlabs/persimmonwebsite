# 🍊 Persimmon Dashboard — System Architecture

## Goals & Constraints

- **Multi-tenant, client-safe isolation** - Complete data separation between clients
- **AI + automation native** - n8n orchestrates workflows; frontend gives users control
- **Fast to ship** - MVP in weeks, modular to grow with white-label, analytics, billing
- **Platform support** - Instagram, LinkedIn, Twitter/X, Facebook today; extensible later

## 1. Product Surfaces (What Users See)

### Auth & Onboarding
- Email/password + OAuth (Google/Microsoft)
- Onboarding wizard: brand basics (name, logo, colors), platform connections, asset sources, posting cadence

### Home / Overview
- "This week at a glance": scheduled posts, items awaiting approval, latest metrics, issues (publishing/auth errors)

### Content Queue & Calendar
- Kanban view: Draft → Needs Approval → Approved → Scheduled → Published
- Calendar view (week/month) with drag-to-reschedule
- Inline edit: caption, hashtags, image swap

### Create / Generate
- **Quick Post**: upload image(s) → 3 caption variants
- **Repurpose**: paste URL/text → IG/LinkedIn/Twitter variants
- **Campaign**: batch generation from brief (e.g., 7-day promo)

### Approvals
- One-click Approve/Reject/Revise
- Comment thread per post with change requests
- Version history tracking
- Optional multi-approver rule (Manager → Owner)

### Assets
- Connect sources (Drive/Dropbox/S3) or direct upload
- Smart folders (e.g., "Event Uploads" prioritized for next post)
- Brand library (logo, fonts, color palette, reusable blocks)

### Integrations
- Connect social accounts (IG, LinkedIn, X, FB)
- Email/SMS/Slack for notifications
- Webhooks for agencies/partners

### Analytics (v2)
- Profile-level KPIs, post performance, A/B results
- Insights: best time to post, content themes that outperform

### Settings
- Brand voice guide, taboo topics
- Posting cadence & platforms
- Approval policy, notifications
- Billing (plans, invoices) and team members/roles

## 2. System Components

### Frontend
- **Framework**: Next.js 14 (React) on Vercel
- **UI**: Tailwind CSS + shadcn/ui components
- **State**: Server components + React Query (TanStack) for data fetching
- **Charts**: Recharts (lazy-loaded)
- **Upload**: Direct to storage via signed URLs; image optimization via Next Image

### Backend (App/API)
- **Framework**: NestJS or Next.js Route Handlers with tRPC or REST
- **Database**: Prisma ORM to Postgres (multi-tenant via org_id scoping)
- **Queues**: Redis (BullMQ) for long jobs (rendering, imports)
- **Email**: Resend/Postmark
- **File Storage**: Supabase Storage or S3-compatible (R2/MinIO)

### Automation Orchestrator
- **n8n** (self-hosted) behind HTTPS
- One workflow per automation type (not per client) with tenant context passed via payload
- **Triggers**: Webhook, Cron, Event hook from App
- **Actions**: Asset fetch, model calls, variant generation, compliance guardrails, publish via APIs, callback to App

### AI Layer
Content/Platform Agents behind an internal service:
- Brand Brief Agent
- Platform Stylists (IG/LinkedIn/Twitter/Facebook)
- Hashtag Curator
- Compliance & Tone Guard
- Pluggable LLM provider (Claude/OpenAI)
- Vision model for image tags
- Rate-limited with observability (token counts, latency)

### Rendering (Previews)
- Server-side HTML→PNG via Playwright (screenshot card components)
- Fallback client-side canvas render for quick previews

### Auth & Multitenancy
- Clerk or Auth.js (with email/Social OAuth)
- Organizations/Teams with RBAC: Owner, Manager, Contributor, Viewer
- All backend queries scoped by org_id

### Billing (v2)
- Stripe subscriptions: Starter / Growth / Enterprise
- Usage tracking (generated posts, connected platforms, seats)

### Analytics Ingest (v2)
- Background jobs pull metrics from social APIs
- Store normalized KPIs per post and per day

### Admin / Ops
- Internal admin UI (protected): tenants, quotas, job health, logs, webhooks

## 3. Data Model (Core Tables)

```sql
-- Organizations & Users
organizations (id, name, slug, plan, created_at)
users (id, email, name, avatar_url, created_at)
org_members (org_id, user_id, role)

-- Brand & Assets
brand_profiles (id, org_id, name, logo_url, palette_json, voice_json, taboo_json)
asset_sources (id, org_id, type['gdrive','dropbox','s3','upload'], config_json, active)
assets (id, org_id, source_id, path, tags[], width, height, uploaded_by, created_at)

-- Platform Connections
platform_accounts (id, org_id, platform['ig','linkedin','twitter','facebook'], 
                  auth_json, status, last_refresh_at)

-- Workflows & Automation
workflows (id, org_id, type['daily_ig','multiplatform','repurpose'], 
          config_json, active, schedule_cron)
workflow_runs (id, workflow_id, status, started_at, finished_at, metrics_json, error)

-- Content Management
posts (id, org_id, platform, status['draft','needs_approval','approved',
       'scheduled','published','failed'], scheduled_at, published_at, 
       source['manual','repurpose','automation'], asset_id, created_by)
post_versions (id, post_id, version, caption, hashtags[], media_urls[], 
              ai_meta_json, created_by, created_at)

-- Approvals & Collaboration
approvals (id, post_id, state['pending','approved','rejected'], 
          requested_by, decided_by, reason, created_at)
comments (id, post_id, user_id, body, created_at)

-- Notifications & Events
notifications (id, org_id, type['slack','email','sms'], target, template_id, active)
events (id, org_id, kind, payload_json, created_at)  -- event bus for audit + analytics

-- Analytics
metrics_posts (id, post_id, impressions, likes, comments, shares, clicks, fetched_at)

-- Billing & Usage
billing_subscriptions (id, org_id, stripe_ids..., plan, status, seats, limits_json)
usage_counters (id, org_id, period, generated_posts, published_posts, storage_mb)
```

## 4. Key Flows

### A) Asset-Driven Daily Post (Folder Priority)
1. Cron (n8n) fires for org's "daily_ig" workflow
2. n8n fetches next asset: check "Hot Uploads" folder first; else fallback to stock
3. n8n: Vision tags → Brand Brief → Platform Stylist (IG) → 3 caption variants
4. n8n: Compliance pass; if fail, regenerate
5. n8n: POST /api/posts with draft + variants + preview PNGs
6. App stores posts, post_versions, sets status='needs_approval', notifies Slack/Email
7. User approves in Dashboard → App PATCH /api/posts/:id/approve → emits event
8. n8n listens (webhook/subscription) → schedules publish via IG API
9. On publish success → App updates status='published', stores platform post id

### B) Repurpose Flow (User paste link/text)
1. FE calls /api/repurpose with text/URL + selected platforms
2. App prepares brief; calls AI Stylist per platform (parallel)
3. Previews rendered; draft posts + post_versions created
4. User tweaks → approve/schedule → n8n publish

### C) Approval/Revise Loop
- **Approve**: mark approved; create final immutable version; enqueue publish
- **Reject**: require reason; system learns (negative cues appended to voice_json)
- **Revise**: user edits → new post_version saved; earlier versions retained for audit

### D) Integrations Setup
- OAuth (per platform) handled by FE → backend stores tokens in auth_json (encrypted)
- Background worker refreshes tokens; alerts on failure

### E) Analytics Pull (v2)
- Nightly job → pull metrics for published posts
- Store in metrics_posts; update dashboard charts and insights

## 5. API Endpoints

All routes require session + org scope. Auth handled by provider.

```typescript
// Onboarding
POST   /api/onboarding/complete

// Dashboard
GET    /api/overview
GET    /api/calendar?start&end

// Posts Management
POST   /api/posts           // create draft (manual/repurpose)
GET    /api/posts?status&platform
GET    /api/posts/:id
PATCH  /api/posts/:id       // edit caption/schedule
POST   /api/posts/:id/approve
POST   /api/posts/:id/reject
POST   /api/posts/:id/variants // regenerate variants

// Assets
POST   /api/assets/upload-url
GET    /api/assets?folder
POST   /api/assets/ingest-webhook   // n8n uses for new asset events

// Workflows
POST   /api/workflows/:id/run       // manual kick
PATCH  /api/workflows/:id           // enable/disable, update config

// Integrations
POST   /api/integrations/:platform/connect
DELETE /api/integrations/:platform

// Analytics
GET    /api/metrics/posts?range
GET    /api/insights // v2

// Webhooks
POST   /api/webhooks/n8n/callback   // publish success/fail, generation complete
```

## 6. Integrations & Permissions

### Social Platforms
- **Instagram**: Graph API (Business/Creator accounts via FB). Media container → publish
- **LinkedIn**: Share API (organizations + members)
- **Twitter/X**: v2 API (tweets + media upload)
- **Facebook Pages**: Page Posts API

### Storage & Communication
- **Storage**: Drive/Dropbox webhooks to detect new files (or polling fallback)
- **Slack**: Incoming webhooks for approvals; optional interactive buttons (v2)
- **Email**: Resend/Postmark for transactional

### RBAC Example
- **Owner**: billing, integrations, delete org, edit settings
- **Manager**: approve/publish, edit workflows, invite team
- **Contributor**: create/edit drafts, cannot publish
- **Viewer**: read-only analytics

## 7. Security, Privacy, Compliance

- All queries scoped by org_id. Row-Level Security (RLS) if using Supabase
- Encrypt auth_json (KMS/managed secrets); rotate tokens
- Signed URLs for asset uploads/downloads; short TTL
- Webhook signature verification for n8n callbacks and Drive/Dropbox
- Audit log via events table for approvals/publishes/edits
- Rate limits per user/org; abuse guard on AI endpoints
- PII minimal; configurable data retention policies
- GDPR compliant with data export/deletion capabilities

## 8. DevOps & Observability

### Infrastructure
- **Frontend**: Vercel
- **API**: Vercel or Fly.io
- **n8n**: Managed VM (Hetzner/Linode)
- **Database**: Managed Postgres (Neon/Supabase/RDS)
- **Cache/Queue**: Upstash Redis (serverless) or managed Redis

### Operations
- **CI/CD**: GitHub Actions; lint/test/build; db migrations (Prisma)
- **Logs**: Better Stack/Logtail
- **Errors**: Sentry
- **Health**: Cron heartbeats; alert if n8n/webhooks down
- **Monitoring**: Grafana dashboards for system metrics

## 9. White-Label & Extensibility

### For Agencies
- Theme override (logo, colors, domain via CNAME)
- Per-client seats within agency org
- Agency-level analytics rollup
- API keys + webhooks for custom integrations

### Partner Features
- Custom onboarding flows
- Branded email templates
- Revenue sharing models
- Priority support channels

## 10. Build Plan

### MVP (2-4 weeks)
- Auth & orgs; onboarding wizard
- Assets (uploads + one cloud source), brand profile, platform connections
- Generate (single image → 3 captions) for IG + LinkedIn
- Queue + approvals; schedule + publish via n8n
- Slack/email notifications
- Lightweight previews; basic metrics placeholder

### V2 (4-8 weeks)
- Calendar UI; multi-platform/repurpose flows
- Versioning; comments
- Analytics ingest + charts
- A/B caption variants
- Billing (Stripe) and usage limits
- More integrations (FB/Twitter)
- Multi-approver rules
- Templates library

### V3 (8-12 weeks)
- Insights (best times/themes)
- Brand-voice training from past posts
- White-label mode
- Public share links
- Partner API
- Advanced asset sources (RSS/blog → social)
- Knowledge graph for brand facts

## 11. Tech Stack Summary

### Core Technologies
- **Frontend**: Next.js 14, Tailwind, shadcn/ui, React Query
- **Auth**: Clerk (orgs + RBAC out of the box)
- **API**: Next Route Handlers + tRPC (type-safe FE↔BE)
- **Database**: Supabase (Postgres + Storage + RLS)
- **ORM**: Prisma
- **Queues**: Upstash Redis + BullMQ
- **Automation**: n8n (Docker on small VM)
- **Email**: Resend
- **Screenshots**: Playwright on serverless function
- **Analytics**: Custom metrics tables + lightweight fetchers

## 12. Migration Strategy

### From Current Manual Operations
1. Keep current n8n flows; add org-aware payloads
2. Stand up dashboard; backfill existing pilot clients as organizations
3. Move approvals from Slack → in-app, but keep Slack as notifier
4. Iterate UX based on observed friction points

### Scaling Considerations
- Database sharding by org_id when >1000 orgs
- CDN for static assets and previews
- Queue workers horizontal scaling
- n8n cluster mode for high availability

---

*This architecture supports rapid MVP development while maintaining flexibility for enterprise features. The multi-tenant design ensures client data isolation while the modular structure allows for incremental feature additions based on client feedback.*