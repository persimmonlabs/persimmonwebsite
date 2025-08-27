# Demo Generator MVP

AI-powered demo content generator that creates personalized social media strategies in <90 seconds.

## ⚡ Quick Start

### 1. Install & Configure (5 minutes)
```bash
# Install dependencies
npm install

# Set up environment (REQUIRED)
cp .env.example .env
# Edit .env with your API keys (see below)

# Start development server
npm run dev
```

### 2. Get API Keys (Required)
Add these to your `.env` file:

```bash
# Required for content generation
OPENAI_API_KEY=sk-...                    # Get from: https://platform.openai.com/api-keys

# Required for email delivery  
SENDGRID_API_KEY=SG...                   # Get from: https://app.sendgrid.com/settings/api_keys
SENDGRID_FROM_EMAIL=demo@yourdomain.com  # Your verified sender email

# Optional (uses fallback data if missing)
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=eyJ...
```

### 3. Test It Works
```bash
# Test health
curl http://localhost:3000/health

# Generate test demo
curl -X POST http://localhost:3000/api/test-demo \
  -H "Content-Type: application/json" \
  -d '{"businessName": "Test Restaurant"}'
```

## 📋 What It Generates

For each demo request, the system generates:

✅ **7 Social Media Posts** - Personalized for industry & audience  
✅ **3 Professional Graphics** - Quote cards with watermarks  
✅ **1 Industry Insight** - Sourced statistics and trends  
✅ **PDF Report** - Complete branded strategy document  
✅ **Email Delivery** - Professional delivery with attachments  

**Total Generation Time**: <90 seconds  
**Cost Per Demo**: $0.10-0.25  

## 🔗 n8n Integration

### Quick n8n Setup
1. Create HTTP Request node
2. Set URL: `http://localhost:3000/api/generate-demo` 
3. Method: POST
4. Body: Form data from your lead capture

**Required Fields:**
```json
{
  "businessName": "Pizza Palace",
  "industry": "restaurant", 
  "businessType": "local pizzeria",
  "targetAudience": "families and young adults",
  "brandVoice": "friendly and casual",
  "recipientEmail": "owner@pizzapalace.com",
  "recipientName": "John Smith"
}
```

**See [N8N_INTEGRATION.md](./N8N_INTEGRATION.md) for complete workflow setup.**

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   n8n Workflow  │───▶│  Express API    │───▶│ Demo Orchestrator│
│  (Form Capture) │    │  (Webhook)      │    │  (Coordinates)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                        ┌───────────────────────────────┼────────────────────────────────┐
                        ▼                               ▼                                ▼
               ┌─────────────────┐            ┌─────────────────┐              ┌─────────────────┐
               │ ContentService  │            │ GraphicsService │              │ InsightsService │
               │ (OpenAI GPT-4o) │            │ (Puppeteer)     │              │ (Database/Cache)│
               └─────────────────┘            └─────────────────┘              └─────────────────┘
                        │                               │                                │
                        ▼                               ▼                                ▼
               ┌─────────────────┐            ┌─────────────────┐              ┌─────────────────┐
               │   PdfService    │            │  EmailService   │              │   Monitoring    │
               │  (HTML → PDF)   │            │  (SendGrid)     │              │ (Logs & Health) │
               └─────────────────┘            └─────────────────┘              └─────────────────┘
```

## 📊 Performance Specs

- **Generation Time**: <90 seconds (SLA compliant)
- **Concurrent Requests**: Up to 5 simultaneous demos  
- **Browser Pool**: 3 pre-warmed instances for graphics
- **Token Limit**: 3.7k tokens per request (cost control)
- **Memory Usage**: ~1GB with browser pool
- **Uptime Target**: 99.9%

## 🚀 Production Deployment

### Option 1: Quick Deploy (Recommended)
```bash
./scripts/deploy.sh
```

### Option 2: Manual Deploy
```bash
# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### Option 3: Docker
```bash
# Build image
docker build -t demo-generator .

# Run container
docker run -p 3000:3000 --env-file .env demo-generator
```

## 🧪 Testing

### Run Full Test Suite
```bash
npm test                    # Unit tests
./scripts/test-system.sh    # End-to-end system test
```

### Manual Testing Endpoints
```bash
# Health check
GET /health

# Test demo (no email sent)
POST /api/test-demo

# Full demo generation (for n8n)
POST /api/generate-demo
```

## 📈 Monitoring

### Health Check
```bash
curl http://localhost:3000/health
```

Returns service status and API key configuration:
```json
{
  "status": "healthy",
  "services": {
    "openai": true,
    "sendgrid": true, 
    "supabase": false
  }
}
```

### Process Monitoring (Production)
```bash
pm2 status              # Process status
pm2 logs demo-generator # Live logs
pm2 monit              # Resource usage
```

### Cost Tracking
Every request logs actual costs:
- OpenAI tokens used
- SendGrid email sends
- Estimated total cost

## 🔧 Configuration

### Environment Variables
```bash
# Server
PORT=3000                                    # Server port
NODE_ENV=production                          # Environment mode  
ALLOWED_ORIGINS=https://your-n8n.com        # CORS origins

# AI Services (Required)
OPENAI_API_KEY=sk-...                       # OpenAI API key
SENDGRID_API_KEY=SG...                      # SendGrid API key
SENDGRID_FROM_EMAIL=demo@yourdomain.com     # Verified sender

# Database (Optional)
SUPABASE_URL=https://...                    # Supabase project URL
SUPABASE_ANON_KEY=eyJ...                    # Supabase anon key

# Customization (Optional)
DEFAULT_BRAND_COLOR=#F5793B                 # Default brand color
DEMO_WATERMARK=DEMO MODE                    # Watermark text
MAX_CONCURRENT_REQUESTS=5                   # Rate limiting
```

### Customization Options
- Brand colors and styling
- Email templates and content
- Industry-specific insights
- Watermark text and positioning
- PDF report layout

## 🐛 Troubleshooting

### Common Issues

**1. "OpenAI API key not configured"**
- Check `.env` file has `OPENAI_API_KEY=sk-...`
- Verify key is active at https://platform.openai.com

**2. "Email delivery failed"**
- Verify SendGrid API key and from email
- Check sender email is verified in SendGrid
- Test with `includeEmail: false`

**3. "Graphics generation failed"**  
- Install additional dependencies: `apt-get install -y chromium-browser`
- Check memory usage with `pm2 monit`
- Test with `includeGraphics: false`

**4. Timeout errors in n8n**
- Increase HTTP Request timeout to 120 seconds
- Check server logs: `pm2 logs demo-generator`
- Verify health check passes

### Performance Issues

**Slow generation times (>90s):**
- Check browser pool initialization: restart PM2
- Monitor memory usage: `pm2 monit`
- Reduce concurrent requests in n8n

**High memory usage:**
- Browser instances not closing properly
- Restart server: `pm2 restart demo-generator`
- Check for memory leaks in logs

### Debug Mode
```bash
# Enable detailed logging
NODE_ENV=development npm run dev

# Test individual services
curl -X POST localhost:3000/api/test-demo \
  -d '{"includeEmail": false, "includeGraphics": false}'
```

## 📚 API Reference

### POST /api/generate-demo

**Request Body:**
```json
{
  "businessName": "string (required)",
  "industry": "string (required)", 
  "businessType": "string (required)",
  "targetAudience": "string (required)",
  "brandVoice": "string (required)",
  "recipientEmail": "string (required)",
  "recipientName": "string (optional)",
  "primaryColor": "string (optional, default: #F5793B)",
  "includeGraphics": "boolean (optional, default: true)",
  "includePdf": "boolean (optional, default: true)", 
  "includeEmail": "boolean (optional, default: true)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "demoId": "demo_1693234567_abc123",
  "processingTime": 45000,
  "emailSent": true,
  "emailMessageId": "abc123", 
  "costs": {
    "openaiTokens": 2847,
    "estimatedCost": 0.15
  },
  "warnings": [],
  "content": {
    "postsCount": 7,
    "graphicsCount": 3,
    "hasInsight": true,
    "hasPdf": true
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Business name is required",
  "errors": ["Business name is required"],
  "demoId": "demo_1693234567_abc123",
  "processingTime": 1200
}
```

## 💰 Cost Analysis

### Per Demo Costs
- **OpenAI (GPT-4o-mini)**: $0.02-0.04 per demo
- **SendGrid Email**: $0.001 per email
- **Server Compute**: $0.01-0.02 per demo
- **Total**: $0.10-0.25 per demo

### Monthly Projections
- **100 demos/month**: $10-25
- **500 demos/month**: $50-125  
- **1000 demos/month**: $100-250

Server hosting (VPS): $20-50/month  
**Total operating cost**: $30-300/month depending on volume

## 🔒 Security

- Input validation on all endpoints
- Rate limiting (5 requests per IP per minute)
- CORS protection with allowed origins
- No sensitive data logged
- Automatic resource cleanup
- Watermarked demo content

## 📄 License

Proprietary - Persimmon Labs © 2024