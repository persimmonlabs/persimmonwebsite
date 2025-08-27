# Claude Code Implementation Plan - MVP Demo Generator

## Overview
This plan breaks down the MVP implementation into micro-steps optimized for Claude Code execution. Each step follows the pattern: Implement → Test → Commit → Next.

## Implementation Rules for Claude Code

### Execution Pattern
```bash
1. Read current step from this file
2. Implement the specific micro-feature
3. Write test for that feature
4. Run test
5. If pass: git commit with descriptive message
6. If fail: fix and retest
7. Mark step complete in this file
8. Move to next step
```

### Commit Message Format
```
✅ [Step X.Y.Z] Brief description

- What was implemented
- Test coverage added
- Next step: X.Y.Z+1
```

## Phase 1: Project Setup (Day 1)

### 1.1 Environment Setup
- [ ] 1.1.1 Create `/demo-generator` directory structure
  - Test: `ls demo-generator/` shows subdirectories
  - Commit: "✅ [1.1.1] Create demo-generator directory structure"

- [ ] 1.1.2 Initialize package.json with dependencies
  ```json
  {
    "dependencies": {
      "puppeteer": "^21.0.0",
      "openai": "^4.0.0",
      "@supabase/supabase-js": "^2.0.0",
      "express": "^4.18.0",
      "@sendgrid/mail": "^7.0.0"
    }
  }
  ```
  - Test: `npm install` succeeds
  - Commit: "✅ [1.1.2] Initialize package.json with core dependencies"

- [ ] 1.1.3 Create .env.example with all required variables
  ```
  OPENAI_API_KEY=
  SUPABASE_URL=
  SUPABASE_ANON_KEY=
  SENDGRID_API_KEY=
  GOOGLE_SHEETS_CLIENT_EMAIL=
  GOOGLE_SHEETS_PRIVATE_KEY=
  ```
  - Test: File exists with all variables
  - Commit: "✅ [1.1.3] Create .env.example template"

- [ ] 1.1.4 Set up TypeScript configuration
  - Create tsconfig.json
  - Test: `npx tsc --noEmit` runs without errors
  - Commit: "✅ [1.1.4] Configure TypeScript"

### 1.2 Database Setup
- [ ] 1.2.1 Create Supabase client wrapper
  ```typescript
  // lib/supabase.ts
  import { createClient } from '@supabase/supabase-js'
  export const supabase = createClient(url, key)
  ```
  - Test: Import succeeds
  - Commit: "✅ [1.2.1] Create Supabase client wrapper"

- [ ] 1.2.2 Create industry_insights table migration
  ```sql
  CREATE TABLE industry_insights (
    id SERIAL PRIMARY KEY,
    industry VARCHAR(50),
    insight_type VARCHAR(50),
    insight_value TEXT,
    source_name TEXT,
    source_url TEXT
  );
  ```
  - Test: Table creation SQL is valid
  - Commit: "✅ [1.2.2] Create industry_insights table migration"

- [ ] 1.2.3 Create seed data for industry_insights
  ```typescript
  // scripts/seed-insights.ts
  const insights = [
    { industry: 'SaaS', type: 'best_time', value: 'Tuesday 11 AM' }
  ]
  ```
  - Test: Seed script has valid data structure
  - Commit: "✅ [1.2.3] Create industry insights seed data"

- [ ] 1.2.4 Implement seed runner
  ```typescript
  async function seedDatabase() {
    for (const insight of insights) {
      await supabase.from('industry_insights').insert(insight)
    }
  }
  ```
  - Test: Function compiles without errors
  - Commit: "✅ [1.2.4] Implement database seeder"

## Phase 2: Core Services (Day 2-3)

### 2.1 HTML to Image Service
- [ ] 2.1.1 Create HTML template for quote card
  ```html
  <!-- templates/quote-card.html -->
  <div style="width:1080px; height:1080px; background:{{color}}">
    <div style="padding:100px; font-size:48px">{{quote}}</div>
  </div>
  ```
  - Test: HTML file exists and is valid
  - Commit: "✅ [2.1.1] Create quote card HTML template"

- [ ] 2.1.2 Create Puppeteer service class
  ```typescript
  // services/graphics.ts
  export class GraphicsService {
    private browser: Browser | null = null
  }
  ```
  - Test: Class imports successfully
  - Commit: "✅ [2.1.2] Create GraphicsService class structure"

- [ ] 2.1.3 Implement browser pool initialization
  ```typescript
  async initBrowserPool(size = 3) {
    this.browsers = []
    for (let i = 0; i < size; i++) {
      const browser = await puppeteer.launch()
      this.browsers.push(browser)
    }
  }
  ```
  - Test: Method compiles
  - Commit: "✅ [2.1.3] Implement browser pool initialization"

- [ ] 2.1.4 Implement HTML to PNG conversion
  ```typescript
  async htmlToPng(html: string): Promise<Buffer> {
    const page = await this.browser.newPage()
    await page.setContent(html)
    const screenshot = await page.screenshot()
    return screenshot
  }
  ```
  - Test: Method signature is correct
  - Commit: "✅ [2.1.4] Implement HTML to PNG conversion"

- [ ] 2.1.5 Add watermark overlay function
  ```typescript
  async addWatermark(image: Buffer): Promise<Buffer> {
    // Add "DEMO MODE" watermark
  }
  ```
  - Test: Function exists
  - Commit: "✅ [2.1.5] Add watermark overlay function"

- [ ] 2.1.6 Create test for quote card generation
  ```typescript
  // tests/graphics.test.ts
  test('generates quote card', async () => {
    const result = await graphics.generateQuoteCard('Test', '#000000')
    expect(result).toBeInstanceOf(Buffer)
  })
  ```
  - Test: Test file runs
  - Commit: "✅ [2.1.6] Add quote card generation test"

### 2.2 Content Generation Service
- [ ] 2.2.1 Create OpenAI client wrapper
  ```typescript
  // services/openai.ts
  import OpenAI from 'openai'
  export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  ```
  - Test: Import works
  - Commit: "✅ [2.2.1] Create OpenAI client wrapper"

- [ ] 2.2.2 Create content generation prompt template
  ```typescript
  const CONTENT_PROMPT = `Generate 7 social media posts for {{brand}} in {{industry}}`
  ```
  - Test: Template string is valid
  - Commit: "✅ [2.2.2] Create content generation prompt template"

- [ ] 2.2.3 Implement token counting function
  ```typescript
  function countTokens(text: string): number {
    return text.length / 4 // Rough approximation
  }
  ```
  - Test: Function returns number
  - Commit: "✅ [2.2.3] Implement token counting"

- [ ] 2.2.4 Create generatePosts function signature
  ```typescript
  async function generatePosts(brand: string, industry: string): Promise<Post[]> {
    // Implementation
  }
  ```
  - Test: Function compiles
  - Commit: "✅ [2.2.4] Create generatePosts function signature"

- [ ] 2.2.5 Implement OpenAI API call
  ```typescript
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }]
  })
  ```
  - Test: API call structure is correct
  - Commit: "✅ [2.2.5] Implement OpenAI API call"

- [ ] 2.2.6 Add response parsing
  ```typescript
  function parseAIResponse(response: string): Post[] {
    return JSON.parse(response)
  }
  ```
  - Test: Parser handles valid JSON
  - Commit: "✅ [2.2.6] Add AI response parser"

- [ ] 2.2.7 Add error handling for API failures
  ```typescript
  try {
    // API call
  } catch (error) {
    return getFallbackContent(industry)
  }
  ```
  - Test: Fallback returns valid content
  - Commit: "✅ [2.2.7] Add API error handling"

### 2.3 Insight Service
- [ ] 2.3.1 Create insight fetcher interface
  ```typescript
  interface InsightFetcher {
    getInsight(industry: string, type: string): Promise<Insight>
  }
  ```
  - Test: Interface compiles
  - Commit: "✅ [2.3.1] Create InsightFetcher interface"

- [ ] 2.3.2 Implement database insight query
  ```typescript
  async function fetchFromDatabase(industry: string) {
    const result = await supabase
      .from('industry_insights')
      .select('*')
      .eq('industry', industry)
  }
  ```
  - Test: Query structure is valid
  - Commit: "✅ [2.3.2] Implement database insight query"

- [ ] 2.3.3 Add source formatter
  ```typescript
  function formatWithSource(insight: Insight): string {
    return `${insight.value} [Source: ${insight.source}]`
  }
  ```
  - Test: Formatter returns string
  - Commit: "✅ [2.3.3] Add source formatter"

- [ ] 2.3.4 Implement fallback to benchmark
  ```typescript
  if (!liveData) {
    return getBenchmarkInsight(industry)
  }
  ```
  - Test: Fallback works
  - Commit: "✅ [2.3.4] Implement benchmark fallback"

## Phase 3: Integration Layer (Day 4-5)

### 3.1 PDF Generation
- [ ] 3.1.1 Create PDF HTML template
  ```html
  <!-- templates/pdf.html -->
  <html>
    <body>
      <h1>{{brandName}} Content Pack</h1>
    </body>
  </html>
  ```
  - Test: Template exists
  - Commit: "✅ [3.1.1] Create PDF HTML template"

- [ ] 3.1.2 Implement HTML to PDF conversion
  ```typescript
  async function htmlToPdf(html: string): Promise<Buffer> {
    const page = await browser.newPage()
    await page.setContent(html)
    return await page.pdf()
  }
  ```
  - Test: Function compiles
  - Commit: "✅ [3.1.2] Implement HTML to PDF conversion"

- [ ] 3.1.3 Add content injection to PDF
  ```typescript
  function injectContent(template: string, data: any): string {
    return template.replace('{{brandName}}', data.brandName)
  }
  ```
  - Test: Injection works
  - Commit: "✅ [3.1.3] Add PDF content injection"

- [ ] 3.1.4 Add sources section to PDF
  ```typescript
  function addSourcesSection(posts: Post[]): string {
    return posts.map(p => p.source).join('\n')
  }
  ```
  - Test: Sources formatted correctly
  - Commit: "✅ [3.1.4] Add sources section to PDF"

### 3.2 Google Sheets Integration
- [ ] 3.2.1 Set up Google Sheets client
  ```typescript
  import { google } from 'googleapis'
  const sheets = google.sheets('v4')
  ```
  - Test: Import works
  - Commit: "✅ [3.2.1] Set up Google Sheets client"

- [ ] 3.2.2 Create authentication helper
  ```typescript
  async function authenticateGoogle() {
    const auth = new google.auth.JWT(/* credentials */)
    await auth.authorize()
    return auth
  }
  ```
  - Test: Auth function exists
  - Commit: "✅ [3.2.2] Create Google auth helper"

- [ ] 3.2.3 Implement sheet creation
  ```typescript
  async function createSheet(title: string) {
    const response = await sheets.spreadsheets.create({
      requestBody: { properties: { title } }
    })
  }
  ```
  - Test: API call structure correct
  - Commit: "✅ [3.2.3] Implement sheet creation"

- [ ] 3.2.4 Add content to sheet
  ```typescript
  async function populateSheet(sheetId: string, data: any[]) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'A1',
      valueInputOption: 'RAW',
      requestBody: { values: data }
    })
  }
  ```
  - Test: Update call structured correctly
  - Commit: "✅ [3.2.4] Add sheet population function"

### 3.3 Email Service
- [ ] 3.3.1 Initialize SendGrid client
  ```typescript
  import sgMail from '@sendgrid/mail'
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  ```
  - Test: Import succeeds
  - Commit: "✅ [3.3.1] Initialize SendGrid client"

- [ ] 3.3.2 Create email HTML template
  ```html
  <!-- templates/email.html -->
  <h1>Your content is ready!</h1>
  ```
  - Test: Template exists
  - Commit: "✅ [3.3.2] Create email HTML template"

- [ ] 3.3.3 Implement send email function
  ```typescript
  async function sendEmail(to: string, subject: string, html: string) {
    await sgMail.send({ to, from: 'demo@persimmonlabs.io', subject, html })
  }
  ```
  - Test: Function compiles
  - Commit: "✅ [3.3.3] Implement send email function"

- [ ] 3.3.4 Add attachment support
  ```typescript
  attachments: [{
    content: pdfBuffer.toString('base64'),
    filename: 'content-pack.pdf'
  }]
  ```
  - Test: Attachment structure correct
  - Commit: "✅ [3.3.4] Add email attachment support"

## Phase 4: Guardrails & Validation (Day 6-7)

### 4.1 Input Validation
- [ ] 4.1.1 Create validation schema
  ```typescript
  const schema = {
    brandName: { type: 'string', maxLength: 50, required: true }
  }
  ```
  - Test: Schema object valid
  - Commit: "✅ [4.1.1] Create validation schema"

- [ ] 4.1.2 Implement email validator
  ```typescript
  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  ```
  - Test: Validates test@example.com
  - Commit: "✅ [4.1.2] Implement email validator"

- [ ] 4.1.3 Add sanitization function
  ```typescript
  function sanitizeInput(input: string): string {
    return input.replace(/[<>]/g, '')
  }
  ```
  - Test: Removes angle brackets
  - Commit: "✅ [4.1.3] Add input sanitization"

- [ ] 4.1.4 Create industry validator
  ```typescript
  const VALID_INDUSTRIES = ['SaaS', 'E-commerce', 'Healthcare']
  function validateIndustry(industry: string): boolean {
    return VALID_INDUSTRIES.includes(industry)
  }
  ```
  - Test: Accepts valid industries
  - Commit: "✅ [4.1.4] Create industry validator"

### 4.2 Content Moderation
- [ ] 4.2.1 Create banned terms list
  ```typescript
  const BANNED_TERMS = ['politics', 'medical', 'guarantee']
  ```
  - Test: Array exists
  - Commit: "✅ [4.2.1] Create banned terms list"

- [ ] 4.2.2 Implement content checker
  ```typescript
  function checkContent(text: string): boolean {
    const lower = text.toLowerCase()
    return !BANNED_TERMS.some(term => lower.includes(term))
  }
  ```
  - Test: Detects banned terms
  - Commit: "✅ [4.2.2] Implement content checker"

- [ ] 4.2.3 Add statistical claim validator
  ```typescript
  function validateClaims(text: string, source: string): string | null {
    const hasNumber = /\d+%/.test(text)
    if (hasNumber && !source) return null
    return text
  }
  ```
  - Test: Rejects unsourced stats
  - Commit: "✅ [4.2.3] Add claim validator"

- [ ] 4.2.4 Create content sanitizer
  ```typescript
  function sanitizeContent(text: string): string {
    // Remove URLs, emails, phone numbers
    return text.replace(/https?:\/\/\S+/g, '[link]')
  }
  ```
  - Test: Removes URLs
  - Commit: "✅ [4.2.4] Create content sanitizer"

### 4.3 Error Handling
- [ ] 4.3.1 Create error types
  ```typescript
  enum ErrorType {
    LLM_FAILURE = 'LLM_FAILURE',
    GRAPHICS_FAILURE = 'GRAPHICS_FAILURE'
  }
  ```
  - Test: Enum compiles
  - Commit: "✅ [4.3.1] Create error types enum"

- [ ] 4.3.2 Implement retry logic
  ```typescript
  async function retry<T>(fn: () => Promise<T>, times = 3): Promise<T> {
    for (let i = 0; i < times; i++) {
      try { return await fn() }
      catch (e) { if (i === times - 1) throw e }
    }
  }
  ```
  - Test: Retries specified times
  - Commit: "✅ [4.3.2] Implement retry logic"

- [ ] 4.3.3 Add timeout wrapper
  ```typescript
  async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(reject, ms))
    ])
  }
  ```
  - Test: Times out after ms
  - Commit: "✅ [4.3.3] Add timeout wrapper"

- [ ] 4.3.4 Create fallback content
  ```typescript
  function getFallbackContent(industry: string): Post[] {
    return [{ content: 'Quality content for ' + industry }]
  }
  ```
  - Test: Returns valid posts
  - Commit: "✅ [4.3.4] Create fallback content"

## Phase 5: Main Orchestrator (Day 8-9)

### 5.1 Demo Generator Class
- [ ] 5.1.1 Create DemoGenerator class structure
  ```typescript
  export class DemoGenerator {
    constructor(
      private graphics: GraphicsService,
      private content: ContentService,
      private insights: InsightService
    ) {}
  }
  ```
  - Test: Class instantiates
  - Commit: "✅ [5.1.1] Create DemoGenerator class"

- [ ] 5.1.2 Add generate method signature
  ```typescript
  async generate(input: DemoInput): Promise<DemoOutput> {
    // Implementation
  }
  ```
  - Test: Method compiles
  - Commit: "✅ [5.1.2] Add generate method signature"

- [ ] 5.1.3 Implement validation step
  ```typescript
  const validated = this.validateInput(input)
  if (!validated.valid) {
    throw new ValidationError(validated.errors)
  }
  ```
  - Test: Validation runs
  - Commit: "✅ [5.1.3] Implement validation step"

- [ ] 5.1.4 Add parallel content generation
  ```typescript
  const [posts, insight, graphics] = await Promise.all([
    this.content.generate(input),
    this.insights.get(input.industry),
    this.graphics.generate(input)
  ])
  ```
  - Test: Promises resolve
  - Commit: "✅ [5.1.4] Add parallel generation"

- [ ] 5.1.5 Implement asset assembly
  ```typescript
  const assets = {
    pdf: await this.createPDF(posts),
    graphics: graphics,
    sheet: await this.createSheet(posts)
  }
  ```
  - Test: Assets object created
  - Commit: "✅ [5.1.5] Implement asset assembly"

- [ ] 5.1.6 Add email sending
  ```typescript
  await this.email.send(input.email, assets)
  ```
  - Test: Email call made
  - Commit: "✅ [5.1.6] Add email sending"

### 5.2 API Endpoint
- [ ] 5.2.1 Create Express server
  ```typescript
  import express from 'express'
  const app = express()
  app.use(express.json())
  ```
  - Test: Server initializes
  - Commit: "✅ [5.2.1] Create Express server"

- [ ] 5.2.2 Add demo endpoint
  ```typescript
  app.post('/api/demo', async (req, res) => {
    // Handler
  })
  ```
  - Test: Endpoint exists
  - Commit: "✅ [5.2.2] Add demo endpoint"

- [ ] 5.2.3 Implement request handler
  ```typescript
  try {
    const result = await demoGenerator.generate(req.body)
    res.json({ success: true, result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
  ```
  - Test: Handler responds
  - Commit: "✅ [5.2.3] Implement request handler"

- [ ] 5.2.4 Add rate limiting
  ```typescript
  import rateLimit from 'express-rate-limit'
  const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 })
  app.use('/api/demo', limiter)
  ```
  - Test: Rate limit applied
  - Commit: "✅ [5.2.4] Add rate limiting"

## Phase 6: n8n Integration (Day 10-11)

### 6.1 Webhook Setup
- [ ] 6.1.1 Create n8n webhook receiver
  ```typescript
  app.post('/webhook/n8n', async (req, res) => {
    // Process n8n request
  })
  ```
  - Test: Endpoint exists
  - Commit: "✅ [6.1.1] Create n8n webhook receiver"

- [ ] 6.1.2 Add webhook authentication
  ```typescript
  if (req.headers['x-webhook-secret'] !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  ```
  - Test: Auth check works
  - Commit: "✅ [6.1.2] Add webhook authentication"

- [ ] 6.1.3 Create n8n workflow JSON template
  ```json
  {
    "nodes": [{
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook"
    }]
  }
  ```
  - Test: JSON valid
  - Commit: "✅ [6.1.3] Create n8n workflow template"

- [ ] 6.1.4 Document n8n setup steps
  ```markdown
  ## n8n Setup
  1. Import workflow.json
  2. Configure credentials
  ```
  - Test: Documentation exists
  - Commit: "✅ [6.1.4] Document n8n setup"

## Phase 7: Testing Suite (Day 12)

### 7.1 Unit Tests
- [ ] 7.1.1 Test content generation
  ```typescript
  test('generates 7 posts', async () => {
    const posts = await content.generate('Brand', 'SaaS')
    expect(posts).toHaveLength(7)
  })
  ```
  - Test: Test passes
  - Commit: "✅ [7.1.1] Test content generation"

- [ ] 7.1.2 Test graphics generation
  ```typescript
  test('creates PNG buffer', async () => {
    const graphic = await graphics.generateQuoteCard('Test', '#000')
    expect(graphic).toBeInstanceOf(Buffer)
  })
  ```
  - Test: Test passes
  - Commit: "✅ [7.1.2] Test graphics generation"

- [ ] 7.1.3 Test insight fetching
  ```typescript
  test('returns sourced insight', async () => {
    const insight = await insights.get('SaaS')
    expect(insight).toHaveProperty('source')
  })
  ```
  - Test: Test passes
  - Commit: "✅ [7.1.3] Test insight fetching"

- [ ] 7.1.4 Test validation
  ```typescript
  test('rejects invalid email', () => {
    const valid = validateEmail('not-an-email')
    expect(valid).toBe(false)
  })
  ```
  - Test: Test passes
  - Commit: "✅ [7.1.4] Test validation"

### 7.2 Integration Tests
- [ ] 7.2.1 Test end-to-end flow
  ```typescript
  test('generates complete demo', async () => {
    const result = await demoGenerator.generate({
      brandName: 'Test',
      email: 'test@test.com',
      industry: 'SaaS'
    })
    expect(result).toHaveProperty('pdf')
  })
  ```
  - Test: Test passes
  - Commit: "✅ [7.2.1] Test end-to-end flow"

- [ ] 7.2.2 Test error handling
  ```typescript
  test('handles LLM failure gracefully', async () => {
    // Mock LLM failure
    const result = await demoGenerator.generate(input)
    expect(result.posts).toHaveLength(7) // Fallback content
  })
  ```
  - Test: Test passes
  - Commit: "✅ [7.2.2] Test error handling"

- [ ] 7.2.3 Test timeout behavior
  ```typescript
  test('completes within 90 seconds', async () => {
    const start = Date.now()
    await demoGenerator.generate(input)
    expect(Date.now() - start).toBeLessThan(90000)
  })
  ```
  - Test: Test passes
  - Commit: "✅ [7.2.3] Test timeout behavior"

- [ ] 7.2.4 Test queue system
  ```typescript
  test('queues when overloaded', async () => {
    // Generate 20 concurrent requests
    const results = await Promise.all(requests)
    expect(results.some(r => r.queued)).toBe(true)
  })
  ```
  - Test: Test passes
  - Commit: "✅ [7.2.4] Test queue system"

## Phase 8: Production Preparation (Day 13)

### 8.1 Performance Optimization
- [ ] 8.1.1 Implement browser pool warming
  ```typescript
  setInterval(() => {
    browserPool.warm()
  }, 60000) // Every minute
  ```
  - Test: Pool stays warm
  - Commit: "✅ [8.1.1] Implement browser pool warming"

- [ ] 8.1.2 Add response caching
  ```typescript
  const cache = new Map()
  if (cache.has(key)) return cache.get(key)
  ```
  - Test: Cache hits work
  - Commit: "✅ [8.1.2] Add response caching"

- [ ] 8.1.3 Optimize prompt tokens
  ```typescript
  const optimizedPrompt = prompt.substring(0, 500)
  ```
  - Test: Prompt shortened
  - Commit: "✅ [8.1.3] Optimize prompt tokens"

- [ ] 8.1.4 Add database indexes
  ```sql
  CREATE INDEX idx_industry ON industry_insights(industry);
  ```
  - Test: Index created
  - Commit: "✅ [8.1.4] Add database indexes"

### 8.2 Monitoring Setup
- [ ] 8.2.1 Add logging middleware
  ```typescript
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
  })
  ```
  - Test: Logs appear
  - Commit: "✅ [8.2.1] Add logging middleware"

- [ ] 8.2.2 Create metrics collector
  ```typescript
  const metrics = {
    demosStarted: 0,
    demosCompleted: 0,
    errors: 0
  }
  ```
  - Test: Metrics increment
  - Commit: "✅ [8.2.2] Create metrics collector"

- [ ] 8.2.3 Add health check endpoint
  ```typescript
  app.get('/health', (req, res) => {
    res.json({ status: 'healthy', uptime: process.uptime() })
  })
  ```
  - Test: Endpoint responds
  - Commit: "✅ [8.2.3] Add health check endpoint"

- [ ] 8.2.4 Set up error tracking
  ```typescript
  process.on('uncaughtException', (error) => {
    console.error('Uncaught:', error)
  })
  ```
  - Test: Errors logged
  - Commit: "✅ [8.2.4] Set up error tracking"

### 8.3 Deployment Configuration
- [ ] 8.3.1 Create Dockerfile
  ```dockerfile
  FROM node:18
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  CMD ["npm", "start"]
  ```
  - Test: Dockerfile valid
  - Commit: "✅ [8.3.1] Create Dockerfile"

- [ ] 8.3.2 Add production environment config
  ```typescript
  const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
  }
  ```
  - Test: Config loads
  - Commit: "✅ [8.3.2] Add production config"

- [ ] 8.3.3 Create deployment script
  ```bash
  #!/bin/bash
  npm run build
  npm run migrate
  npm start
  ```
  - Test: Script executable
  - Commit: "✅ [8.3.3] Create deployment script"

- [ ] 8.3.4 Add graceful shutdown
  ```typescript
  process.on('SIGTERM', async () => {
    await browserPool.close()
    process.exit(0)
  })
  ```
  - Test: Shutdown clean
  - Commit: "✅ [8.3.4] Add graceful shutdown"

## Phase 9: Launch Preparation (Day 14)

### 9.1 Final Testing
- [ ] 9.1.1 Run full test suite
  ```bash
  npm test
  ```
  - Test: All tests pass
  - Commit: "✅ [9.1.1] Full test suite passes"

- [ ] 9.1.2 Load test with 20 concurrent demos
  ```bash
  artillery run load-test.yml
  ```
  - Test: 80% complete <90s
  - Commit: "✅ [9.1.2] Load test passes"

- [ ] 9.1.3 Verify all sources are included
  - Test: No unsourced stats in output
  - Commit: "✅ [9.1.3] Sources verified"

- [ ] 9.1.4 Test error recovery
  - Kill services mid-demo
  - Test: Graceful degradation works
  - Commit: "✅ [9.1.4] Error recovery tested"

### 9.2 Documentation
- [ ] 9.2.1 Create API documentation
  ```markdown
  ## API Endpoints
  POST /api/demo - Generate demo
  ```
  - Test: Docs complete
  - Commit: "✅ [9.2.1] API documentation complete"

- [ ] 9.2.2 Write troubleshooting guide
  ```markdown
  ## Common Issues
  - LLM timeout: Check API key
  ```
  - Test: Guide helpful
  - Commit: "✅ [9.2.2] Troubleshooting guide written"

- [ ] 9.2.3 Create runbook
  ```markdown
  ## Deployment Steps
  1. Set environment variables
  2. Run migrations
  ```
  - Test: Runbook accurate
  - Commit: "✅ [9.2.3] Runbook created"

- [ ] 9.2.4 Update README
  ```markdown
  # Demo Generator MVP
  Generates content in <90 seconds
  ```
  - Test: README current
  - Commit: "✅ [9.2.4] README updated"

### 9.3 Launch Checklist
- [ ] 9.3.1 Verify all environment variables set
  - Test: All vars present
  - Commit: "✅ [9.3.1] Environment variables verified"

- [ ] 9.3.2 Confirm monitoring dashboard working
  - Test: Metrics visible
  - Commit: "✅ [9.3.2] Monitoring confirmed"

- [ ] 9.3.3 Test email delivery
  - Test: Email arrives with attachments
  - Commit: "✅ [9.3.3] Email delivery tested"

- [ ] 9.3.4 Final security check
  - Test: No exposed secrets
  - Commit: "✅ [9.3.4] Security check passed"

## Completion Tracking

### Daily Progress Template
```markdown
## Day X Progress

Completed Steps:
- [x] X.X.X - Description
- [x] X.X.X - Description

Blocked:
- None

Next:
- [ ] X.X.X - Description

Commits Today: XX
Tests Passing: XX/XX
```

## Claude Code Execution Instructions

1. **Start each session by reading this file**
2. **Find the next unchecked step**
3. **Implement exactly what the step describes**
4. **Write a test for that implementation**
5. **Run the test**
6. **If test passes, commit with the exact message format shown**
7. **Mark the step as complete**
8. **Move to the next step**
9. **Update progress tracking**
10. **Continue until session ends or blocker found**

## Success Criteria
- All steps marked complete
- All tests passing
- <90 second demo generation achieved
- Zero unsourced statistics
- All graphics watermarked
- Error rate <5%

---

**This plan contains 150+ micro-steps. Claude Code should execute them sequentially, testing and committing after each one.**