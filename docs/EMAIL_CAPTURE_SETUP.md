# Email Capture Setup Guide

This guide shows you how to set up email capture for your Persimmon Labs website with multiple options from simplest to most advanced.

## Option 1: Zapier/Make/n8n Webhook (Simplest)

### Step 1: Create a Webhook
1. **Zapier**: Create a new Zap → Choose "Webhooks by Zapier" → Catch Hook
2. **Make**: Create a new Scenario → Add Webhook module → Custom Webhook
3. **n8n**: Create a new Workflow → Add Webhook node

### Step 2: Get Webhook URL
Copy the webhook URL provided (e.g., `https://hooks.zapier.com/hooks/catch/123456/abcdef`)

### Step 3: Configure Environment Variable
Add to your `.env.local` file:
```
WEBHOOK_URL=your-webhook-url-here
```

### Step 4: Connect to Google Sheets
- **Zapier**: Add Google Sheets action → Create Spreadsheet Row
- **Make**: Add Google Sheets module → Add a Row
- **n8n**: Add Google Sheets node → Append Row

### Step 5: Map Fields
Map the webhook data to your spreadsheet columns:
- Email → Column A
- Source → Column B  
- Type → Column C
- Timestamp → Column D

## Option 2: Google Forms (No Backend Needed)

### Step 1: Create Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with fields:
   - Email (Short answer, required)
   - Source (Short answer)
   - Type (Short answer)

### Step 2: Link to Google Sheets
1. Click "Responses" tab
2. Click spreadsheet icon
3. Create new spreadsheet

### Step 3: Get Form Action URL
1. Preview the form
2. Right-click → View Page Source
3. Search for `<form action=`
4. Copy the URL (e.g., `https://docs.google.com/forms/d/e/1FAIpQLSe.../formResponse`)

### Step 4: Get Field Entry IDs
1. In the form source, find `entry.` followed by numbers
2. Map each field:
   - Email field: `entry.123456789`
   - Source field: `entry.987654321`
   - Type field: `entry.111111111`

### Step 5: Update API Route
Edit `/app/api/capture-email/route.ts` and update the entry IDs

## Option 3: Direct Google Sheets API

### Step 1: Create Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google Sheets API
4. Create Service Account
5. Download JSON credentials

### Step 2: Share Sheet with Service Account
1. Open your Google Sheet
2. Click "Share"
3. Add service account email (ends with `.iam.gserviceaccount.com`)
4. Give "Editor" permission

### Step 3: Configure Environment Variables
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_SPREADSHEET_ID=1abc123def456ghi789
```

## Testing Your Setup

### Test via cURL
```bash
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"test","type":"demo"}'
```

### Test via Browser Console
```javascript
fetch('/api/webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    source: 'test',
    type: 'demo'
  })
}).then(r => r.json()).then(console.log)
```

## Email Capture Form Usage

The `EmailCaptureForm` component is already integrated and can be used anywhere:

```tsx
import { EmailCaptureForm } from '@/components/EmailCaptureForm'

// Basic usage
<EmailCaptureForm />

// With custom props
<EmailCaptureForm
  source="hero-section"
  buttonText="Get Started"
  placeholder="Your email address"
  onSuccess={() => console.log('Email captured!')}
/>
```

## Current Integration Points

Email capture is currently integrated in:
1. Demo Generator Section - When users try the demo
2. Contact Section - Main contact form
3. Can be added to Hero Section if needed

## Troubleshooting

### Emails not appearing in Google Sheets
- Check webhook URL is correct in `.env.local`
- Verify Google Sheets permissions
- Check browser console for errors
- Test webhook directly with cURL

### CORS errors
- Webhook endpoints should accept POST from any origin
- Google Forms may require server-side submission

### Rate limiting
- Add rate limiting to prevent spam
- Consider adding reCAPTCHA for production

## Security Best Practices

1. **Never commit `.env.local`** - Keep API keys secret
2. **Validate emails** - Already implemented in API routes
3. **Rate limit** - Consider adding rate limiting in production
4. **GDPR compliance** - Add privacy policy and consent checkbox
5. **Double opt-in** - Send confirmation email for production

## Next Steps

1. Choose your preferred method (Webhook recommended)
2. Set up the integration
3. Test with a real email
4. Monitor submissions in your Google Sheet
5. Set up email automation for follow-ups