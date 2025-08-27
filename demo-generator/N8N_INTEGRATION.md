# n8n Integration Guide for Demo Generator

## Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd demo-generator
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and fill in your API keys:
```bash
# Required for basic functionality
OPENAI_API_KEY=sk-...           # Get from OpenAI dashboard
SENDGRID_API_KEY=SG...          # Get from SendGrid dashboard
SENDGRID_FROM_EMAIL=demo@yourdomain.com

# Optional (will use fallbacks if missing)
SUPABASE_URL=https://...        # Supabase project URL
SUPABASE_ANON_KEY=eyJ...        # Supabase anon key

# Server config
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5678,https://your-n8n-instance.com
```

### 3. Start the Server
```bash
npm run dev
```

You should see:
```
🚀 Demo Generator API running on port 3000
📋 Health check: http://localhost:3000/health
🧪 Test endpoint: http://localhost:3000/api/test-demo
🔗 n8n webhook: http://localhost:3000/api/generate-demo
```

## n8n Workflow Setup

### Step 1: Create HTTP Request Node

1. Add **HTTP Request** node in your n8n workflow
2. Set method to **POST**
3. Set URL to: `http://localhost:3000/api/generate-demo`
4. Headers:
   ```json
   {
     "Content-Type": "application/json"
   }
   ```

### Step 2: Configure Request Body

The API expects this JSON structure:
```json
{
  "businessName": "{{ $json.businessName }}",
  "industry": "{{ $json.industry }}",
  "businessType": "{{ $json.businessType }}",
  "targetAudience": "{{ $json.targetAudience }}",
  "brandVoice": "{{ $json.brandVoice }}",
  "recipientEmail": "{{ $json.email }}",
  "recipientName": "{{ $json.name }}",
  "primaryColor": "{{ $json.brandColor || '#F5793B' }}",
  "includeGraphics": true,
  "includePdf": true,
  "includeEmail": true
}
```

### Step 3: Handle Response

Successful response structure:
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

## Complete n8n Workflow Example

```json
{
  "name": "Demo Generator Workflow",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [240, 300],
      "parameters": {
        "path": "demo-request",
        "responseMode": "onReceived",
        "options": {}
      }
    },
    {
      "name": "Validate Input",
      "type": "n8n-nodes-base.function",
      "position": [460, 300],
      "parameters": {
        "functionCode": "// Validate required fields\nconst required = ['businessName', 'industry', 'businessType', 'targetAudience', 'brandVoice', 'email'];\nconst data = items[0].json;\n\nfor (const field of required) {\n  if (!data[field] || data[field].trim() === '') {\n    throw new Error(`Missing required field: ${field}`);\n  }\n}\n\n// Clean and validate email\nif (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email)) {\n  throw new Error('Invalid email format');\n}\n\nreturn items;"
      }
    },
    {
      "name": "Generate Demo",
      "type": "n8n-nodes-base.httpRequest",
      "position": [680, 300],
      "parameters": {
        "method": "POST",
        "url": "http://localhost:3000/api/generate-demo",
        "options": {
          "timeout": 120000
        },
        "bodyParametersUi": {
          "parameter": [
            {
              "name": "businessName",
              "value": "={{ $json.businessName }}"
            },
            {
              "name": "industry", 
              "value": "={{ $json.industry }}"
            },
            {
              "name": "businessType",
              "value": "={{ $json.businessType }}"
            },
            {
              "name": "targetAudience",
              "value": "={{ $json.targetAudience }}"
            },
            {
              "name": "brandVoice",
              "value": "={{ $json.brandVoice }}"
            },
            {
              "name": "recipientEmail",
              "value": "={{ $json.email }}"
            },
            {
              "name": "recipientName",
              "value": "={{ $json.name || 'there' }}"
            }
          ]
        }
      }
    },
    {
      "name": "Log Success",
      "type": "n8n-nodes-base.function",
      "position": [900, 200],
      "parameters": {
        "functionCode": "console.log('Demo generated successfully:', {\n  demoId: $json.demoId,\n  processingTime: $json.processingTime,\n  cost: $json.costs.estimatedCost\n});\n\nreturn items;"
      }
    },
    {
      "name": "Handle Error",
      "type": "n8n-nodes-base.function", 
      "position": [900, 400],
      "parameters": {
        "functionCode": "console.error('Demo generation failed:', $json);\n\n// Send error notification here if needed\n\nreturn items;"
      }
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Validate Input",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Validate Input": {
      "main": [
        [
          {
            "node": "Generate Demo", 
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Demo": {
      "main": [
        [
          {
            "node": "Log Success",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Handle Error",
            "type": "main", 
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## Testing Your Integration

### 1. Test Health Check
```bash
curl http://localhost:3000/health
```
Should return service status and API key availability.

### 2. Test Demo Generation
```bash
curl -X POST http://localhost:3000/api/test-demo \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Restaurant",
    "industry": "restaurant"
  }'
```

### 3. Test Full n8n Workflow
1. Trigger your n8n webhook with test data
2. Check n8n execution logs
3. Verify demo email was sent
4. Check server logs for processing details

## Production Deployment

### 1. Environment Setup
```bash
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://your-n8n-instance.com
```

### 2. Process Manager (PM2)
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name your-demo-api-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 4. Update n8n Webhook URL
Change the HTTP Request URL to your production domain:
```
https://your-demo-api-domain.com/api/generate-demo
```

## Monitoring & Troubleshooting

### Health Check Endpoint
`GET /health` returns:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-24T10:00:00.000Z",
  "services": {
    "openai": true,
    "sendgrid": true,
    "supabase": false
  }
}
```

### Common Issues

1. **API Keys Not Working**
   - Check `.env` file format
   - Verify API keys in service dashboards
   - Check health endpoint for service status

2. **Timeout Errors**
   - Increase n8n HTTP Request timeout to 120 seconds
   - Check server logs for specific failures
   - Test individual services

3. **Email Not Sending**
   - Verify SendGrid API key and from email
   - Check SendGrid dashboard for delivery status
   - Test with `includeEmail: false` for debugging

4. **Graphics Generation Fails**
   - Puppeteer requires additional system dependencies in production
   - Check system resources (memory/CPU)
   - Test with `includeGraphics: false`

### Performance Optimization

- **Browser Pool**: Server pre-launches 3 browser instances for <90s generation
- **Token Limits**: GPT-4o-mini limited to 3.7k tokens (cost control)
- **Resource Cleanup**: Automatic cleanup after each request
- **Cost Tracking**: Every request logs actual costs

## Cost Estimates

Per demo generation:
- OpenAI (GPT-4o-mini): ~$0.02-0.04
- SendGrid email: ~$0.001  
- Server compute: ~$0.01-0.02
- **Total: $0.10-0.25 per demo**

With 100 demos/day = $10-25/day operating costs.

## Support

If you encounter issues:
1. Check server health endpoint
2. Review server logs
3. Test individual components with `/api/test-demo`
4. Verify environment variables are set correctly