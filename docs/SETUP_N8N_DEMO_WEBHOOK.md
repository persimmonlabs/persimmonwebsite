# Setup n8n Demo Webhook - Step by Step

## Overview
This guide will help you set up the n8n webhook that powers the live demo generator. The workflow creates real Google Sheets, generates content, and sends emails automatically.

## Prerequisites
- ✅ n8n running on your VPS (https://n8n.persimmonlabs.cc)
- ✅ Google OAuth setup for Sheets API
- ✅ Email service configured (SendGrid/SMTP)
- ✅ Basic n8n knowledge

## Step 1: Import the Workflow

### 1.1 Copy the Workflow JSON
- Open the `N8N_DEMO_GENERATOR_IMPLEMENTATION.md` file
- Copy the entire JSON workflow (lines 80-200+)

### 1.2 Import into n8n
1. Login to https://n8n.persimmonlabs.cc
2. Click "+" to create new workflow
3. Click "Import from file" or paste JSON
4. Name it "Demo Content Generator"

## Step 2: Configure Authentication

### 2.1 Google Sheets OAuth
```bash
# In your n8n instance, set up Google credentials:
1. Go to Settings > Credentials
2. Add "Google OAuth2 API" 
3. Use these scopes:
   - https://www.googleapis.com/auth/spreadsheets
   - https://www.googleapis.com/auth/drive.file
4. Test connection with a simple sheet creation
```

### 2.2 Email Service
```bash
# Option A: SMTP (Recommended)
1. Add "SMTP" credential
2. Use your email provider settings
3. From: demo@persimmonlabs.cc

# Option B: SendGrid
1. Add "SendGrid" credential  
2. Get API key from SendGrid dashboard
3. Verify sender identity
```

## Step 3: Create Tracking Sheet

### 3.1 Master Demo Tracking
Create a Google Sheet called "Demo Tracking Master" with these columns:
```
A: Timestamp
B: Email  
C: Brand Name
D: Industry
E: Style
F: Content Pieces
G: Sheet ID
H: Status
I: Call Booked
J: Converted
```

### 3.2 Update Workflow
Replace `DEMO_TRACKING_SHEET_ID` in the workflow with your actual sheet ID.

## Step 4: Test the Webhook

### 4.1 Activate the Workflow
1. Click the toggle in top-right to activate
2. Note the webhook URL (should be: `https://n8n.persimmonlabs.cc/webhook/demo-generator`)

### 4.2 Test with curl
```bash
curl -X POST https://n8n.persimmonlabs.cc/webhook/demo-generator \
  -H "Content-Type: application/json" \
  -d '{
    "brandName": "Test Brand",
    "email": "your-email@gmail.com", 
    "industry": "SaaS",
    "style": "professional",
    "timestamp": "2024-01-01T00:00:00Z",
    "source": "test"
  }'
```

### 4.3 Expected Result
- ✅ New Google Sheet created
- ✅ Sheet populated with content
- ✅ Email sent to test address
- ✅ Entry logged in tracking sheet

## Step 5: Frontend Integration

### 5.1 Update API Endpoint
In your Next.js app, replace the old demo component:

```jsx
// app/page.tsx - Replace DemoGeneratorSection with:
import { N8nDemoGenerator } from '@/components/sections/N8nDemoGenerator'

// In the component JSX:
<N8nDemoGenerator />
```

### 5.2 Update Webhook URL
The component is already configured to call:
```javascript
'https://n8n.persimmonlabs.cc/webhook/demo-generator'
```

Make sure this matches your n8n webhook URL exactly.

## Step 6: Content Templates Enhancement

### 6.1 Improve Content Generation
Edit the "Generate 7-Day Content Strategy" node to include more sophisticated templates:

```javascript
// Add this to the Code node:
const industryTemplates = {
  'E-commerce': {
    'Educational': 'Product education, buying guides, comparisons',
    'Behind-the-scenes': 'Manufacturing, team, fulfillment process',  
    'Product highlight': 'New arrivals, bestsellers, features'
  },
  'SaaS': {
    'Educational': 'How-to tutorials, industry insights, best practices',
    'Behind-the-scenes': 'Development process, team culture, updates',
    'Product highlight': 'Feature spotlights, use cases, integrations'
  },
  'Consulting': {
    'Educational': 'Industry analysis, frameworks, case studies',
    'Behind-the-scenes': 'Client work (anonymized), methodology',
    'Product highlight': 'Service offerings, results, testimonials'
  }
  // Add more industries...
};
```

### 6.2 Platform-Specific Formatting
```javascript
const platformFormats = {
  'Instagram': {
    maxLength: 2200,
    hashtagCount: 10,
    callToAction: 'Link in bio',
    format: 'visual-first'
  },
  'LinkedIn': {
    maxLength: 3000,
    hashtagCount: 5,
    callToAction: 'See comments for link',
    format: 'professional'
  },
  'Twitter': {
    maxLength: 280,
    hashtagCount: 3,
    callToAction: 'Thread below',
    format: 'conversational'
  }
};
```

## Step 7: Email Template Enhancement

### 7.1 HTML Email Template
Update the email node with this enhanced template:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Content Automation is Live!</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #F5793B, #f1580c); padding: 40px 20px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 30px; }
        .highlight-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .cta-button { background: #F5793B; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 20px 0; }
        .stats { display: flex; justify-content: space-around; margin: 20px 0; }
        .stat { text-align: center; }
        .stat-number { font-size: 32px; font-weight: bold; color: #F5793B; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Your {{$json.brandName}} Automation is LIVE!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">7-day content system ready to go</p>
        </div>
        
        <div class="content">
            <h2>What We Just Created For You:</h2>
            
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">7</div>
                    <div>Days Planned</div>
                </div>
                <div class="stat">
                    <div class="stat-number">{{$json.contentPlan.length}}</div>
                    <div>Posts Created</div>
                </div>
                <div class="stat">
                    <div class="stat-number">4</div>
                    <div>Platforms</div>
                </div>
            </div>
            
            <div class="highlight-box">
                <h3>🔗 Your Content Calendar:</h3>
                <p>Click here to see all your scheduled posts:</p>
                <a href="https://docs.google.com/spreadsheets/d/{{$('Create Demo Google Sheet').item.json.spreadsheetId}}" class="cta-button">
                    View Your Google Sheet →
                </a>
            </div>
            
            <div style="background: linear-gradient(135deg, #e8f5e8, #d4edda); padding: 25px; border-radius: 12px; margin: 25px 0;">
                <h3 style="color: #2d5016; margin-top: 0;">🎯 With Our Full Service:</h3>
                <ul style="color: #2d5016; margin: 15px 0;">
                    <li><strong>Just approve the content</strong> - we post automatically to all platforms</li>
                    <li><strong>Real-time optimization</strong> - AI adjusts based on performance</li>
                    <li><strong>Continuous generation</strong> - never run out of content</li>
                    <li><strong>Zero manual work</strong> - set it once, runs forever</li>
                </ul>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://calendly.com/persimmonlabs/strategy-call" style="background: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                        Activate Full Automation →
                    </a>
                </div>
            </div>
            
            <p><strong>Questions?</strong> Reply to this email or book a quick call to see how this scales to full automation.</p>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
                <strong>P.S.</strong> This demo runs for 7 days. Ready to automate your content forever? 
                <a href="https://calendly.com/persimmonlabs/strategy-call" style="color: #F5793B;">Book your strategy call</a>.
            </p>
        </div>
        
        <div class="footer">
            <p>Persimmon Labs - AI-Powered Content Automation</p>
            <p><a href="https://persimmonlabs.io" style="color: #F5793B;">persimmonlabs.io</a></p>
        </div>
    </div>
</body>
</html>
```

## Step 8: Monitor and Debug

### 8.1 Check Workflow Executions
1. Go to "Executions" tab in n8n
2. Look for any failed runs
3. Check error messages
4. Test each node individually

### 8.2 Common Issues & Fixes

**Google Sheets Authentication Fails:**
```bash
# Re-authorize Google OAuth
1. Go to Credentials > Google OAuth2
2. Click "Reauthorize" 
3. Grant all requested permissions
4. Test with simple sheet creation
```

**Email Delivery Fails:**
```bash
# Check email credentials
1. Verify SMTP settings
2. Check spam folders
3. Try different from address
4. Enable "less secure apps" if using Gmail
```

**Webhook Not Responding:**
```bash
# Workflow not active
1. Check workflow is toggled ON
2. Verify webhook path matches frontend
3. Check n8n logs for errors
4. Restart n8n if needed
```

## Step 9: Deploy Frontend Changes

### 9.1 Update Page Component
Replace the old demo section in your main page:

```jsx
// app/page.tsx
import { N8nDemoGenerator } from '@/components/sections/N8nDemoGenerator'

// Replace the old <DemoGeneratorSection /> with:
<N8nDemoGenerator />
```

### 9.2 Deploy to Production
```bash
# Deploy your Next.js app
git add .
git commit -m "Add n8n-powered live demo generator"
git push origin main

# Vercel will auto-deploy
# Or manually deploy with: vercel --prod
```

## Step 10: Test End-to-End

### 10.1 Complete User Journey
1. Visit your website
2. Fill out demo form with real email
3. Submit and watch "generating" state
4. Check email for results
5. Click Google Sheet link
6. Verify content quality
7. Test "Book Call" button

### 10.2 Success Criteria
- ✅ Form submission triggers n8n workflow
- ✅ Google Sheet created with branded name
- ✅ 15-20 pieces of content generated
- ✅ Content relevant to industry/style
- ✅ Email delivered within 60 seconds
- ✅ Sheet contains realistic posting schedule
- ✅ All links work properly
- ✅ Mobile experience smooth

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| Workflow not triggering | Check webhook URL, ensure workflow active |
| Google Sheets error | Re-auth OAuth, check permissions |
| Email not sending | Verify SMTP/API credentials |
| Content too generic | Enhance templates in Code node |
| Sheet not accessible | Check sharing permissions |
| Form submission fails | Check CORS, network tab in browser |
| Mobile broken | Test responsive design |

## Success Metrics to Track

- **Form Completion Rate**: >60% (simple form)
- **Email Delivery Rate**: >95% 
- **Sheet Access Rate**: >70% (curiosity)
- **Call Booking Rate**: >15% (qualified leads)
- **Workflow Success Rate**: >98% (reliability)

## Next Steps After Setup

1. **Test with 10 real prospects**
2. **Gather feedback on content quality**
3. **Monitor n8n execution logs**
4. **Optimize based on user behavior**
5. **Add more sophisticated content templates**

The n8n approach is MUCH more impressive because it shows actual automation in action, not just static mockups. Prospects see the magic happening live!