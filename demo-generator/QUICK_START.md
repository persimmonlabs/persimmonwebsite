# 🚀 Quick Start - Demo Generator

## **5-Minute Setup (No API Keys Required!)**

### 1. Install & Start
```bash
cd demo-generator
npm install
npm run test:offline
```

### 2. Test It Works
**Open another terminal and test:**
```bash
# Health check
curl http://localhost:3336/health

# Generate a complete demo (no API keys needed!)
curl -X POST http://localhost:3336/api/test-demo \
  -H "Content-Type: application/json" \
  -d '{"businessName": "Pizza Palace", "industry": "restaurant"}'
```

### 3. What You Get (Offline Mode)
✅ **7 Social Media Posts** - Industry-specific content  
✅ **3 Graphics** - Mock PNG files (orange squares)  
✅ **1 Industry Insight** - Real sourced statistics  
✅ **PDF Report** - Complete branded document  
✅ **Email Ready** - Mock delivery (no actual sending)  

**Total Generation Time**: ~3-4 seconds  
**Cost**: $0.00 (no API usage)  

## **Production Setup (With API Keys)**

### 1. Get API Keys
```bash
# Required for full functionality
OPENAI_API_KEY=sk-...           # https://platform.openai.com/api-keys  
SENDGRID_API_KEY=SG...          # https://app.sendgrid.com/settings/api_keys
SENDGRID_FROM_EMAIL=demo@yourdomain.com
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

### 3. Test Production Features
```bash
curl -X POST http://localhost:3000/api/test-demo \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Mario Pizza",
    "industry": "restaurant",
    "includeEmail": true,
    "recipientEmail": "test@yourdomain.com"
  }'
```

## **n8n Integration**

### HTTP Request Node Setup:
- **Method**: POST
- **URL**: `http://localhost:3000/api/generate-demo`
- **Headers**: `Content-Type: application/json`

### Required Body:
```json
{
  "businessName": "{{ $json.businessName }}",
  "industry": "{{ $json.industry }}",
  "businessType": "{{ $json.businessType }}",
  "targetAudience": "{{ $json.targetAudience }}",
  "brandVoice": "{{ $json.brandVoice }}",
  "recipientEmail": "{{ $json.email }}",
  "recipientName": "{{ $json.name }}"
}
```

## **Available Modes**

### 🧪 **Test Mode** (No API Keys)
```bash
npm run test:offline
```
- Uses fallback content
- Mock graphics generation  
- No emails sent
- Perfect for development

### 🚀 **Production Mode** (With API Keys)  
```bash
npm run dev
```
- Real OpenAI content generation
- High-quality browser graphics
- SendGrid email delivery
- Full functionality

### 📦 **Production Deploy**
```bash
npm run build
./scripts/deploy.sh
```
- PM2 process management
- Production optimizations
- Health monitoring
- Auto-restart on crashes

## **Testing Commands**

```bash
# Test health
curl http://localhost:3000/health

# Test offline demo
curl -X POST http://localhost:3000/api/test-demo \
  -H "Content-Type: application/json" \
  -d '{"businessName": "Test Business"}'

# Test specific industry
curl -X POST http://localhost:3000/api/test-demo \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "HealthFirst Clinic",
    "industry": "healthcare"
  }'

# Test e-commerce
curl -X POST http://localhost:3000/api/test-demo \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "ShopSmart Online",
    "industry": "ecommerce"
  }'
```

## **Troubleshooting**

### "Port in use" errors
```bash
# Change port in .env or use:
PORT=3001 npm run dev
```

### Graphics generation fails
```bash
# Use mock graphics:
MOCK_GRAPHICS=true npm run dev
```

### Email sending fails
```bash
# Disable emails for testing:
DISABLE_EMAIL=true npm run dev
```

## **Success Indicators**

✅ Server starts with health check URLs  
✅ Health endpoint returns JSON  
✅ Test demo generates 7 posts  
✅ PDF size > 0KB  
✅ Processing time < 10 seconds (offline mode)  
✅ Zero errors in response  

## **Performance Targets**

- **Offline Mode**: 3-5 seconds generation time
- **Production Mode**: <90 seconds with APIs
- **Memory Usage**: <500MB without browser pool  
- **Concurrent Users**: 5+ simultaneous requests
- **Cost per Demo**: $0.10-0.25 with real APIs

## **Next Steps**

1. **Test offline mode** - Verify everything works without APIs
2. **Get production APIs** - OpenAI + SendGrid accounts
3. **Deploy to server** - Use deployment scripts provided
4. **Connect to n8n** - Set up webhook integration
5. **Monitor usage** - Track costs and performance

**🎯 The system is fully functional in offline mode and production-ready with APIs!**