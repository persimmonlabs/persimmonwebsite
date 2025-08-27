# Final MVP Specification - Persimmon Labs Demo Generator

## Executive Summary
A demo funnel that generates 7 posts, 3 graphics, and 1 sourced industry insight in <90 seconds. No magic claims, no unsourced stats, no auto-scraping. Just provable value delivered fast.

## Core Promise
**Input:** Brand name, email, industry, website (optional), competitor handle (optional), primary color hex
**Output in <90 seconds:** 7 platform-specific posts + 3 simple graphics + 1 sourced insight + downloadable assets

## Architecture

### Stack
- **Orchestrator:** n8n workflow engine
- **LLM:** OpenAI GPT-4o-mini (capped at 3.7k tokens/demo)
- **Graphics:** HTML-to-image via Puppeteer (warm pool)
- **Storage:** Supabase (insights DB + asset storage)
- **Email:** SendGrid
- **Calendar:** Google Sheets API

### Data Flow
```
Webhook → Validate → Load Industry Pack → Parallel LLM Calls → Graphics Generation → PDF Assembly → Asset Storage → Email Delivery
```

## Deliverables (Non-Negotiable)

### Content Package
1. **7 Platform-Specific Posts** (120-250 words each)
   - 3 LinkedIn (professional tone)
   - 2 Instagram (casual, emoji-rich)
   - 2 Twitter (punchy, thread-ready)

2. **3 Simple Graphics** (1080x1080, watermarked)
   - Quote card (brand color background + text)
   - Stats graphic (sourced number + visual)
   - Swipe carousel cover ("5 Ways to...")

3. **1 Killer Insight** (with source)
   - Format: "LinkedIn posts with 'I was wrong about' get 3.4x engagement [Source: Benchmark study, Jan 2024]"
   - If no live data: Use precomputed industry benchmark clearly labeled

4. **1 Viral Hook Template**
   - Industry-specific from vetted library
   - Example: "The [Industry] truth nobody talks about..."

5. **Downloadable Assets**
   - PDF with all content + sources + method notes
   - Google Sheet calendar link
   - ZIP of PNG graphics

## Critical Constraints

### Intelligence Claims
- **NO unsourced statistics** - Every number must have a link or "Industry Benchmark" label
- **NO competitor scraping** - Only use provided handles for public metadata
- **NO algorithmic guarantees** - Frame as "patterns we observe"
- **NO hallucinated insights** - Use precomputed tables when live data unavailable

### Technical SLAs
- **Target:** <90 seconds (not 47-60)
- **Graceful degradation:** Queue message at 90s, deliver by 3 minutes
- **Error handling:** If graphics fail, deliver text-only version
- **Reliability target:** 80% under 90s, <5% hard failures

### Cost Reality
- **Per demo:** $0.10-0.25 (not $0.05)
- **Breakdown:**
  - LLM: $0.04-0.12
  - Graphics processing: $0.02
  - Email/storage: $0.01
  - Infrastructure: $0.03-0.10

### Legal/Trust
- **Require hex colors** - No auto-extraction from websites
- **Sources footnote** - Every stat links to origin
- **Watermarks** - "DEMO MODE" on all graphics
- **ToS compliance** - No unauthorized scraping
- **Moderation** - Banned topics list + brand safety check

## Precomputed Intelligence System

### Daily Cron Jobs (Updated Weekly)
```javascript
// Industry Insights Table
{
  "industry": "SaaS",
  "best_posting_time": "Tuesday 11 AM EST",
  "top_hook_format": "I was wrong about...",
  "average_engagement": "2.3%",
  "trending_hashtags": ["#SaaS", "#B2B", "#StartupLife"],
  "source": "Analysis of 10,000 posts, Week of Jan 20, 2024",
  "confidence": "high"
}
```

### Viral Hook Library
```javascript
// Vetted templates by industry
{
  "SaaS": [
    "I was wrong about [common belief]",
    "Stop doing [old way]. Start doing [new way]",
    "The $[number] [industry] mistake everyone makes"
  ]
}
```

## User Flow

### Input Form
```html
Required:
- Brand Name
- Email
- Industry (dropdown)

Optional but recommended:
- Website URL
- Competitor handle + platform
- Primary brand color (hex)
- Target audience (one line)
- Timezone
```

### Processing Steps
1. Validate inputs + check for banned terms
2. Load industry pack from precomputed DB
3. Parallel LLM calls (7 posts split across 3 requests)
4. Generate graphics (warm Puppeteer pool)
5. Assemble PDF with sources
6. Upload to Supabase storage
7. Create Google Sheet calendar
8. Send email with presigned URLs

### Output Email
```html
Subject: Your content pack ready (7 posts + graphics + industry intel)

We analyzed [Industry] posting patterns from 50K+ posts this week.
Your optimal strategy is ready.

📊 YOUR CONTENT ARSENAL:
• 7 platform-optimized posts (copy below)
• 3 branded graphics (watermarked for demo)
• 1 viral hook template that's working now
• Industry insight: [Specific pattern with source]

📎 INSTANT DOWNLOADS:
[Download PDF] - All content + sources
[Open Calendar] - Google Sheets link
[Get Graphics] - ZIP download

⚡ Generated in 87 seconds using:
- GPT-4 content generation
- Industry benchmark data (updated Jan 20)
- Platform best practices

💡 REMOVE WATERMARKS + GET 21-DAY CALENDAR: $349
🚀 FULL AUTOMATION (WE POST FOR YOU): $2,500 setup + $600/mo

[Book 15-min Demo]

P.S. This insight is based on public data from [Source].
Full methodology in PDF.
```

## Implementation Plan (14 Days)

### Week 1: Core Infrastructure
- **Day 1-2:** HTML-to-image service + warm pool setup
- **Day 3:** Precomputed insights tables + Supabase schema
- **Day 4:** PDF builder with sources + watermarks
- **Day 5:** Google Sheets + storage + email integration

### Week 2: Intelligence & Polish
- **Day 1:** Viral hook library + industry templates
- **Day 2:** Guardrails + moderation + error handling
- **Day 3-4:** Test with 20 real businesses
- **Day 5:** Fix latency issues + launch

## Success Metrics

### Operational
- **Latency:** >80% demos complete <90 seconds
- **Reliability:** <5% hard failures
- **Quality:** Zero unsourced claims

### Engagement
- **Sheet opens:** >50% click "Open Google Sheet"
- **PDF downloads:** >35% download PDF
- **CTA clicks:** >5% click "Book demo" in week 1

### Business
- **Demo → Call:** 5-10% (conservative)
- **Call → Close:** 10-20% at $2,500 package
- **Quick win:** 15% take $349 watermark removal

## Guardrails & Policies

### Content Moderation
- Banned terms list (politics, health claims, financial advice)
- Brand safety check (no competitor bashing)
- Output sanitization (no PII, no URLs except sources)

### Source Policy
```javascript
if (stat.source) {
  return `${stat.value} [Source: ${stat.source}]`
} else if (stat.isBenchmark) {
  return `${stat.value} [Industry Benchmark, Updated: ${date}]`
} else {
  // Don't output the stat at all
  return null
}
```

### Error Handling
```javascript
try {
  // Generate content
} catch (LLMError) {
  // Use precomputed templates
} catch (GraphicsError) {
  // Deliver text-only version
} catch (CriticalError) {
  // Queue for manual review
  // Send apology email with 30-min SLA
}
```

## Pricing Strategy

### Funnel Tiers
1. **Free Demo:** Watermarked assets, 7-day content
2. **Quick Unlock:** $349 - Remove watermarks + 21-day calendar
3. **Full Service:** $2,500 setup + $600/mo - We post everything

### Upsell Path
Demo → Quick Unlock (15% take rate) → Full Service (20% of unlocks upgrade)

## What We're NOT Building
- ❌ Auto logo/color extraction from websites
- ❌ Direct posting to social platforms
- ❌ Complex design tools or templates
- ❌ Unsourced "algorithm hacks"
- ❌ Competitor content scraping
- ❌ Perfect brand matching

## Risk Mitigation

### Technical Risks
- **LLM latency:** Parallel calls + timeout at 30s per call
- **Graphics failure:** Text-only fallback
- **API limits:** Queue system + rate limiting

### Business Risks
- **Trust:** Every stat has a source or benchmark label
- **Legal:** No scraping, clear ToS, moderation
- **Quality:** Precomputed templates as fallback

## Launch Criteria
- [ ] 20 successful test demos
- [ ] <90 second SLA achieved 80% of time
- [ ] Zero unsourced statistics
- [ ] All graphics have watermarks
- [ ] Sources PDF section implemented
- [ ] Error handling tested
- [ ] Queue system tested
- [ ] Legal review completed

## Post-Launch Iteration
- A/B test insight types
- Optimize token usage
- Add more industries to precomputed tables
- Test video script generation (Phase 2)
- Add competitor comparison mode (Phase 2)

---

**This spec is LOCKED. Any changes require written justification of how they improve conversion or reduce risk.**