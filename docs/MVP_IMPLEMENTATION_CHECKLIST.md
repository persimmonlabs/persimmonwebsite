# MVP Implementation Checklist

## Pre-Development Setup (Day 0)

### Infrastructure
- [ ] Set up Supabase project with tables:
  - `industry_insights` (industry, insight, source, updated_at)
  - `demo_requests` (email, brand, industry, created_at)
  - `assets` (demo_id, asset_type, url)
- [ ] Configure n8n instance with:
  - OpenAI API credentials (GPT-4o-mini)
  - Google Sheets OAuth
  - SendGrid API key
  - Supabase connection
- [ ] Set up development environment with Node.js, Puppeteer dependencies

### Precomputed Data
- [ ] Create industry insights CSV with sourced data:
  ```csv
  industry,best_time,top_format,engagement_rate,source,updated
  SaaS,"Tuesday 11 AM EST","I was wrong about","2.3%","LinkedIn Analytics Study Jan 2024","2024-01-20"
  E-commerce,"Thursday 7 PM EST","Behind the scenes","3.1%","Instagram Business Report 2024","2024-01-20"
  ```
- [ ] Build viral hooks library JSON:
  ```json
  {
    "SaaS": ["I was wrong about [belief]", "Stop doing X, start doing Y"],
    "E-commerce": ["The $X mistake that costs sales", "What nobody tells you about [topic]"]
  }
  ```

## Week 1: Core Infrastructure

### Day 1-2: Graphics Generation Service
- [ ] Create HTML templates for 3 graphic types:
  - [ ] Quote card template (text on colored background)
  - [ ] Stats graphic template (number + context)
  - [ ] Carousel cover template ("5 Ways to...")
- [ ] Implement Puppeteer service:
  - [ ] Warm browser pool (maintain 3 instances)
  - [ ] HTML to PNG conversion
  - [ ] Watermark overlay ("DEMO MODE")
  - [ ] Error handling with text-only fallback
- [ ] Test latency (<2 seconds per graphic with warm pool)

### Day 3: Precomputed Intelligence System
- [ ] Create Supabase tables and seed with initial data
- [ ] Build insight fetching service:
  ```javascript
  getIndustryInsight(industry) => {
    // Try live data first
    // Fallback to precomputed with "Benchmark" label
    return { insight: "...", source: "..." }
  }
  ```
- [ ] Implement source tracking for all statistics
- [ ] Create "Why we believe this" generator

### Day 4: PDF Generation
- [ ] Design PDF template with sections:
  - Header with brand name
  - 7 posts with platform labels
  - Visual concepts descriptions
  - Industry insight with source
  - Methodology note
  - Watermark on each page
- [ ] Implement HTML-to-PDF conversion
- [ ] Add sources footnote section
- [ ] Test PDF generation (<3 seconds)

### Day 5: Integration Layer
- [ ] Google Sheets calendar creation:
  - [ ] Auth flow
  - [ ] Template with dates, platforms, content
  - [ ] Shareable link generation
- [ ] Supabase storage:
  - [ ] Asset upload
  - [ ] Presigned URL generation (1-hour expiry)
- [ ] SendGrid email template:
  - [ ] HTML design matching brand
  - [ ] Dynamic content injection
  - [ ] Link tracking enabled

## Week 2: Intelligence & Reliability

### Day 1: Content Intelligence
- [ ] Viral hooks integration:
  - [ ] Industry-specific selection
  - [ ] Template variables replacement
- [ ] Hashtag research system:
  - [ ] Precomputed trending hashtags by industry
  - [ ] Reach estimates (conservative)
- [ ] Platform optimization rules:
  - [ ] LinkedIn: Professional tone, 1200 chars
  - [ ] Instagram: Emoji-rich, 2200 chars max
  - [ ] Twitter: Punchy, thread-ready, 280 chars

### Day 2: Guardrails & Safety
- [ ] Content moderation:
  - [ ] Banned terms list (politics, health claims, finance advice)
  - [ ] Brand safety check
  - [ ] Output sanitization (no PII)
- [ ] Source validation:
  ```javascript
  validateClaim(claim) {
    if (!claim.source && claim.hasNumber) {
      return null; // Don't output
    }
    return formatWithSource(claim);
  }
  ```
- [ ] Error handling:
  - [ ] LLM timeout (30s max per call)
  - [ ] Graphics failure → text-only version
  - [ ] Complete failure → queue for manual review

### Day 3-4: Testing & Optimization
- [ ] Performance testing:
  - [ ] Load test with 20 concurrent demos
  - [ ] Measure P50, P90, P99 latencies
  - [ ] Ensure 80% complete <90 seconds
- [ ] Quality testing with 20 real businesses:
  - [ ] Variety of industries
  - [ ] Check content relevance
  - [ ] Verify all sources
  - [ ] Test error scenarios
- [ ] Token optimization:
  - [ ] Measure actual usage per demo
  - [ ] Optimize prompts for efficiency
  - [ ] Implement token caps (3.7k max)

### Day 5: Launch Preparation
- [ ] Production deployment:
  - [ ] Environment variables
  - [ ] SSL certificates
  - [ ] Domain configuration
- [ ] Monitoring setup:
  - [ ] Error tracking (Sentry or similar)
  - [ ] Analytics (demo starts, completions, downloads)
  - [ ] Performance metrics dashboard
- [ ] Documentation:
  - [ ] API documentation
  - [ ] Troubleshooting guide
  - [ ] Source update process

## Launch Criteria Verification

### Must Pass Before Launch
- [ ] 20 successful test demos completed
- [ ] 80% of demos complete in <90 seconds
- [ ] Zero unsourced statistics in outputs
- [ ] All graphics have watermarks
- [ ] Sources PDF section working
- [ ] Error handling tested (kill services, test recovery)
- [ ] Queue system tested under load
- [ ] Legal review completed
- [ ] Costs verified <$0.25 per demo

### Success Metrics Tracking
- [ ] Instrumentation for:
  - Demo completion rate
  - Time to completion (P50, P90)
  - Asset download rate
  - Email open rate
  - CTA click rate
  - Error rate by type

## Post-Launch Week 1

### Monitoring & Iteration
- [ ] Daily metrics review
- [ ] Error log analysis
- [ ] User feedback collection
- [ ] A/B test:
  - Different insight types
  - Email subject lines
  - CTA button copy
- [ ] Cost optimization based on actual usage

### Quick Fixes Priority
1. Any source validation issues
2. Latency problems (>90s demos)
3. Graphics generation failures
4. Email delivery issues
5. Content quality concerns

## Technical Debt Acceptable for MVP
- Basic graphics only (no advanced designs)
- English only
- Limited to 10 industries initially
- No real-time competitor data
- No A/B testing framework (add Week 2)
- No advanced analytics (add Month 2)

---

**This checklist represents the minimum viable implementation. Each item must be completed and tested before launch.**