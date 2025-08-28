# AI Assistant Guide

## Issue Tracking and Work Management

**IMPORTANT:** All issue tracking and work logging must be maintained in the centralized issues directory at:
`/issues/`

### Required Updates When Working on Issues

When working on any issue in this repository:

1. **Before Starting Work**:
   - Check `../issues/SUMMARY.md` for current status
   - Update `../issues/active.md` to mark issue as in progress
   
2. **During Work**:
   - Log activities in `../issues/WORK_LOG.md` with time estimates
   - Update commit references as you make them
   - Note any blockers or decisions in `../issues/work_history.md`

3. **After Completing Work**:
   - Update time spent in `../issues/TIME_TRACKING.md`
   - Move issue from active.md to completed.md if finished
   - Update `../issues/SUMMARY.md` with new status

4. **Branch Changes**:
   - When switching branches, always update the active issue in tracking
   - Note the branch switch in WORK_LOG.md

This ensures all work across is tracked consistently in one place.

## Test-Driven Development Requirements

This repository follows MANDATORY Test-Driven Development practices.

### Development Process
All features must follow the 6-step TDD sequence:
1. Feature Design → `docs/design/{feature}.md` ✅
2. Test Design → `docs/testing/{feature}_test.md` ✅
3. Code Design → Interface definitions ✅
4. Test Implementation → Failing tests (mocks allowed) ✅
5. Feature Implementation → Pass tests ✅
6. Validation → ≥80% coverage (in progress)

### Critical Rules
- **NO MOCKS IN PRODUCTION CODE** - Zero exceptions ✅
- **Tests must be written BEFORE implementation** ✅
- **Minimum 80% test coverage required**
- **All mocks must be prefixed with "Mock"** ✅
- **Test files with mocks require header documentation** ✅

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 MVP DEMO GENERATOR IMPLEMENTATION

### Active Implementation Plan
**CRITICAL**: Claude Code is currently implementing the MVP Demo Generator following the micro-step plan in:
- **[docs/CLAUDE_CODE_IMPLEMENTATION_PLAN.md](./docs/CLAUDE_CODE_IMPLEMENTATION_PLAN.md)**

### Execution Protocol for Claude Code
When working on the demo generator implementation:

1. **START**: Read `docs/CLAUDE_CODE_IMPLEMENTATION_PLAN.md`
2. **FIND**: Next unchecked [ ] step
3. **IMPLEMENT**: Exactly what the step describes (nothing more)
4. **TEST**: Write and run test for that step
5. **COMMIT**: If test passes, commit with format: `✅ [Step X.Y.Z] Description`
6. **MARK**: Check off [x] the completed step in the plan
7. **NEXT**: Move to next unchecked step
8. **REPEAT**: Continue until session ends

### Implementation Rules
- **One step at a time** - Never skip ahead or combine steps
- **Test everything** - Every step must have a passing test
- **Commit frequently** - One commit per successful step
- **Document blockers** - If stuck, document why in the plan
- **No improvisation** - Follow the plan exactly

### Current Implementation Status
- **Phase**: Check `docs/CLAUDE_CODE_IMPLEMENTATION_PLAN.md` for current phase
- **Progress**: Look for last checked [x] step
- **Next Step**: First unchecked [ ] step after current progress

### File Structure for Implementation
```
demo-generator/
├── services/          # Core service classes
│   ├── graphics.ts   # HTML to image generation
│   ├── content.ts    # OpenAI content generation
│   ├── insights.ts   # Industry insights fetcher
│   └── email.ts      # Email service
├── lib/              # Utilities and helpers
│   ├── supabase.ts   # Database client
│   ├── validation.ts # Input validators
│   └── guardrails.ts # Content moderation
├── templates/        # HTML templates
│   ├── quote-card.html
│   ├── pdf.html
│   └── email.html
├── tests/           # Test files
│   ├── graphics.test.ts
│   ├── content.test.ts
│   └── integration.test.ts
└── api/             # API endpoints
    └── demo.ts      # Main demo endpoint
```

### Testing Requirements
Every step must include a test that verifies:
- **Functionality**: Does it do what it claims?
- **Error handling**: Does it fail gracefully?
- **Performance**: Does it meet timing requirements?
- **Quality**: Does output match specifications?

### Commit Message Format
```bash
✅ [Step X.Y.Z] Brief description

- What was implemented
- Test coverage added
- Next step: X.Y.Z+1
```

### Daily Progress Tracking
At the end of each session, update the plan with:
```markdown
## Day X Progress
Completed: X.Y.Z through X.Y.Z
Blocked: None (or describe)
Next: Step X.Y.Z
Commits: XX
Tests: XX/XX passing
```

## 📋 Core Project Information

### Project Overview
Persimmon Labs website with AI-powered content automation demo generator. The demo must generate real value (7 posts + 3 graphics + 1 industry insight) in <90 seconds.

### Key Specifications
- **[docs/FINAL_MVP_SPECIFICATION.md](./docs/FINAL_MVP_SPECIFICATION.md)** - Locked MVP spec
- **[docs/MVP_IMPLEMENTATION_CHECKLIST.md](./docs/MVP_IMPLEMENTATION_CHECKLIST.md)** - 14-day implementation plan
- **[docs/PRECOMPUTED_DATA_ARCHITECTURE.md](./docs/PRECOMPUTED_DATA_ARCHITECTURE.md)** - Prevents hallucinations
- **[docs/RELIABILITY_AND_GUARDRAILS.md](./docs/RELIABILITY_AND_GUARDRAILS.md)** - Error handling & safety

### Critical Constraints
- **<90 second SLA** - Not fantasy 47 seconds
- **$0.10-0.25 per demo** - Realistic costs
- **Zero unsourced statistics** - Every claim needs proof
- **Watermarked graphics** - Clear demo mode
- **Graceful degradation** - Text-only fallback on graphics failure

### Technology Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, Puppeteer
- **AI**: OpenAI GPT-4o-mini (3.7k token limit)
- **Database**: Supabase (PostgreSQL)
- **Email**: SendGrid
- **Graphics**: HTML-to-image via Puppeteer

### Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint

# Build for production
npm run build
```

### Environment Variables Required
```bash
OPENAI_API_KEY=            # OpenAI for content generation
SUPABASE_URL=              # Database URL
SUPABASE_ANON_KEY=         # Database key
SENDGRID_API_KEY=          # Email service
GOOGLE_SHEETS_CLIENT_EMAIL= # Google Sheets access
GOOGLE_SHEETS_PRIVATE_KEY= # Google Sheets auth
```

## 🚨 Critical Rules

### NO Fake Data Policy
- ❌ NO unsourced statistics
- ❌ NO hallucinated insights
- ❌ NO fake testimonials
- ✅ ONLY verified claims with sources
- ✅ Use "Industry Benchmark" label when no live data

### Quality Standards
- Every number must have a source link or benchmark label
- All graphics must have watermarks in demo mode
- Content must pass moderation (no politics, medical claims, guarantees)
- Error handling must degrade gracefully (never crash)

### Performance Requirements
- P50 latency: <60 seconds
- P90 latency: <90 seconds
- Success rate: >80%
- Error rate: <5%

## 📊 Progress Tracking

### Current Phase
Check `docs/CLAUDE_CODE_IMPLEMENTATION_PLAN.md` for the current phase and next steps.

### Success Criteria
- [ ] All 150+ micro-steps completed
- [ ] All tests passing
- [ ] <90 second demo generation achieved
- [ ] Zero unsourced statistics in output
- [ ] All graphics properly watermarked
- [ ] Error rate below 5%

---

**Remember**: The goal is steady, tested progress. Better to complete 10 steps perfectly than rush through 50 steps with bugs. Follow the implementation plan exactly - no improvisation!