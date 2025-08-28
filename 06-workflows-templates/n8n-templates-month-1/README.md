# N8N Workflow Templates - Month 1 Essentials

## 🎯 Purpose

These are the **minimum viable workflows** you need to support Rose-Hulman + 2-3 beta clients in your first month.

**No fancy features. Just what works.**

## 📋 Workflow Priority Order

### **CRITICAL (Must Have Week 1):**
1. ✅ **Content Generator** - Creates posts from schedules/results
2. ✅ **Multi-Platform Publisher** - Posts to Instagram/Twitter/Facebook
3. ✅ **Telegram Approvals** - Coach approves from phone
4. ✅ **Error Monitor** - Alerts when things break

### **HIGH (Must Have Week 2):**
5. ✅ **Client Onboarding** - Sets up new beta clients
6. ✅ **Daily Health Check** - Monitors all client workflows

### **MEDIUM (Nice to Have Month 1):**
7. ✅ **Analytics Collector** - Tracks post performance
8. ✅ **Template Manager** - Manages content variations

### **ENHANCED VERSIONS (SMB-Ready):**
9. ✅ **Universal Content Generator** - Handles ALL business types with image management
10. ✅ **Enhanced Multi-Platform Publisher** - Supports 5 platforms with proper image handling

---

## 🔧 Complete Workflow Descriptions

### 1. Content Generator (`01-content-generator.json`)
**Purpose:** Automatically generates social media posts from match schedules
- **Trigger:** Daily at 8 AM
- **Process:** Reads Google Sheets schedule → Checks for today/tomorrow matches → Generates AI content → Saves to tracking sheet → Requests approval via Telegram
- **Key Features:**
  - OpenAI GPT-4o-mini integration
  - Pre-match and match-day post types
  - Automatic variable filling (team, opponent, date, time, venue)
  - Approval workflow integration

### 2. Telegram Approvals (`02-telegram-approvals.json`)
**Purpose:** Handles coach approval/rejection/editing via Telegram messages
- **Trigger:** Telegram message received
- **Process:** Parses ✅/❌/✏️ responses → Updates Google Sheets status → Confirms action
- **Key Features:**
  - Simple emoji-based approval (✅ approve, ❌ reject, ✏️ edit)
  - Automatic content status updates
  - Confirmation messages to coach
  - Edit functionality with new content

### 3. Multi-Platform Publisher (`03-multi-platform-publisher.json`)
**Purpose:** Publishes approved content to Instagram, Twitter, and Facebook
- **Trigger:** Content marked as approved
- **Process:** Reads approved posts → Routes by platform → Publishes → Updates status → Notifies success/failure
- **Key Features:**
  - Multi-platform posting (Instagram, Twitter, Facebook)
  - Platform-specific formatting
  - Error handling and retry logic
  - Success/failure notifications

### 4. Error Monitor (`04-error-monitor.json`)
**Purpose:** Monitors all workflows for failures and alerts immediately
- **Trigger:** Every 15 minutes
- **Process:** Checks n8n execution logs → Identifies critical failures → Analyzes patterns → Sends alerts
- **Key Features:**
  - Real-time error detection
  - Critical vs warning classification
  - Pattern recognition (repeated errors)
  - External service monitoring (UptimeRobot integration)
  - Telegram alerts for urgent issues

### 5. Client Onboarding (`05-client-onboarding.json`)
**Purpose:** Automates new client setup and follow-up
- **Trigger:** Email to onboarding address
- **Process:** Parses client info → Adds to tracking sheet → Sends welcome email → 24h follow-up
- **Key Features:**
  - Automatic client information extraction
  - Professional welcome email with next steps
  - Automatic follow-up after 24 hours
  - Team notifications for new inquiries

### 6. Daily Health Check (`06-daily-health-check.json`)
**Purpose:** Daily monitoring of all client workflows and content performance
- **Trigger:** Daily at 7 AM
- **Process:** Checks all active clients → Analyzes 24h performance → Calculates health scores → Alerts on issues
- **Key Features:**
  - Health scoring (0-100) per client
  - Content generation, approval, and publishing metrics
  - Critical/warning/healthy status classification
  - Daily summary reports
  - Individual client alerts for issues

### 7. Analytics Collector (`07-analytics-collector.json`)
**Purpose:** Collects post performance data from all social platforms
- **Trigger:** Nightly at 8 PM
- **Process:** Gets published posts → Collects platform analytics → Combines data → Generates reports
- **Key Features:**
  - Instagram, Twitter, Facebook analytics
  - Engagement metrics (likes, comments, shares)
  - Weekly performance reports (Sundays)
  - Best performing platform identification
  - Client-specific analytics tracking

### 8. Template Manager (`08-template-manager.json`)
**Purpose:** Manages custom content templates via email requests
- **Trigger:** Email to templates address
- **Process:** Parses template request → Generates AI variations → Saves to library → Sends confirmation
- **Key Features:**
  - Email-based template requests
  - AI generation of 3 template variations
  - Template type classification (pre-match, match-day, results, etc.)
  - Weekly usage analytics
  - Template performance tracking

### 9. Universal Content Generator - Enhanced (`09-universal-content-generator-enhanced.json`)
**Purpose:** Advanced content generation for ANY business type with intelligent scheduling
- **Trigger:** 3x daily (8am, 12pm, 4pm) or custom schedule
- **Process:** Checks calendar → Analyzes business type → Checks for images → Generates appropriate content
- **Key Features:**
  - Business-specific content logic:
    - Restaurants: Daily specials, menu highlights
    - Retail: Product features, sales announcements
    - Services: Tips, testimonials, availability
    - Professional: Thought leadership, case studies
    - Fitness: Motivation, classes, workouts
  - Google Drive image integration
  - Automatic image matching and marking as used
  - Priority-based content scheduling
  - Content calendar override capability

### 10. Enhanced Multi-Platform Publisher (`10-enhanced-multi-platform-publisher.json`)
**Purpose:** Sophisticated publishing to 5+ platforms with image handling
- **Trigger:** Every 30 minutes checking for approved content
- **Process:** Gets approved posts → Downloads images if needed → Formats for each platform → Publishes → Reports results
- **Key Features:**
  - Platform support:
    - Instagram (with Business Account features)
    - Facebook Pages
    - Twitter/X (with character limits)
    - LinkedIn Company Pages
    - Google Business Profile
  - Platform-specific optimizations:
    - Character limits (Twitter 280)
    - Hashtag strategies per platform
    - Business-specific CTAs
    - Image requirements per platform
  - Rate limiting protection (max 5 posts per run)
  - Partial success handling
  - Detailed error reporting per platform

---

## 🔧 Implementation Notes

### **For Each Workflow:**
- Replace `CLIENT_ID` with actual client identifier
- Update `TELEGRAM_CHAT_ID` with real chat IDs
- Set proper API credentials
- Test manually before automating

### **Required API Credentials:**
- **OpenAI API Key** - For content generation and template creation
- **Telegram Bot Token** - For approvals and notifications
- **Google Sheets OAuth** - For data storage and tracking
- **Instagram Basic Display API** - For posting and analytics
- **Twitter API v2** - For posting and metrics
- **Facebook Graph API** - For posting and insights
- **n8n API Key** - For error monitoring
- **UptimeRobot API** - For external service monitoring (optional)

### **Required Google Sheets:**
- `CLIENT_SCHEDULE_SHEET_ID` - Match schedules
- `CLIENT_CONTENT_SHEET_ID` - Generated content tracking
- `CLIENTS_MASTER_SHEET_ID` - Client information
- `SYSTEM_LOG_SHEET_ID` - Error logs and health checks
- `ANALYTICS_SHEET_ID` - Post performance data
- `TEMPLATE_REQUESTS_SHEET_ID` - Template requests
- `TEMPLATES_MASTER_SHEET_ID` - Template library

### **Error Handling:**
- All workflows have try/catch blocks
- Failed executions send Telegram alerts
- Automatic retry for common failures
- Manual override capabilities

### **Client Isolation:**
- Each client gets their own workflow instances
- Separate Telegram channels per client
- Individual error monitoring
- Independent scheduling

---

## 📊 Expected Usage (First Month)

```
Week 1: Rose-Hulman only (1 client)
Week 2: Rose-Hulman + 1 beta (2 clients)  
Week 3: Rose-Hulman + 2 betas (3 clients)
Week 4: Rose-Hulman + 3 betas (4 clients)

Total Workflows Running: ~32 (8 per client)
Expected API Calls: 15,000/month
Expected Failures: 5-10/week (normal)
```

---

## 📚 Essential Documentation

### For Client Onboarding:
- **[CLIENT_MANUAL_REQUIREMENTS.md](./CLIENT_MANUAL_REQUIREMENTS.md)** - What clients must provide vs. what we automate
- **[SETUP_CHECKLIST_PER_CLIENT.md](./SETUP_CHECKLIST_PER_CLIENT.md)** - Complete setup process for each business type

### Key Client Responsibilities:
1. **Photos:** Upload 10-15 photos weekly to Google Drive
2. **Approvals:** Respond to Telegram posts (5 min/day)
3. **Updates:** Keep calendar current with events/specials

### What We Handle:
- All content writing and optimization
- Platform-specific formatting
- Hashtag research
- Optimal timing
- Performance tracking
- Error handling

---

## 🚨 What's NOT Included

### **Intentionally Skipped:**
- Advanced AI voice training (use basic prompts)
- Complex analytics dashboards (use spreadsheets)
- Multi-language support (English only)
- Video content generation (images only)
- Advanced scheduling logic (simple timing)
- Integration with CRM systems (use spreadsheets)

### **Add Later If Needed:**
- Custom graphics generation
- Advanced approval workflows
- Competitor monitoring
- Automated reporting
- White-label features

---

## 🔄 Maintenance Plan

### **Daily:**
- Check error logs (automated via Error Monitor)
- Verify posts published (automated via Daily Health Check)
- Monitor API usage

### **Weekly:**
- Review failed executions
- Update client schedules
- Backup workflow configurations
- Review template usage (automated via Template Manager)
- Analyze client performance (automated via Analytics Collector)

### **Monthly:**
- Optimize slow workflows
- Update API credentials
- Archive old data

---

## 📞 Support Process

### **When Workflows Fail:**
1. Check Telegram alerts (Error Monitor)
2. Review n8n execution logs
3. Restart failed workflows
4. Notify affected clients
5. Document root cause

### **Client Issues:**
1. Check Daily Health Check reports
2. Test specific client workflow manually
3. Fix and restart
4. Follow up with client
5. Update workflow if needed

---

## 🎯 Success Metrics

### **Week 1 Goals:**
- 4 critical workflows operational
- Rose-Hulman posting daily
- Zero manual content creation
- <2 hour response time to issues

### **Week 2 Goals:**
- All 8 workflows operational  
- 2 total clients automated
- Onboarding process tested
- Health monitoring active

### **Month 1 Goals:**
- 4 clients fully automated
- 90%+ uptime across all workflows
- 50+ posts generated and published
- Client satisfaction >8/10

---

## 🚀 Getting Started Checklist

### **Before You Begin:**
- [ ] n8n instance running and accessible
- [ ] All API credentials obtained and tested
- [ ] Google Sheets created with proper column headers
- [ ] Telegram bot created and tested
- [ ] Test client data prepared

### **Implementation Order:**
1. [ ] Set up Error Monitor first (catch issues immediately)
2. [ ] Deploy Content Generator (core functionality)
3. [ ] Add Telegram Approvals (human oversight)
4. [ ] Configure Multi-Platform Publisher (content delivery)
5. [ ] Test with Rose-Hulman for 1 week
6. [ ] Add Client Onboarding (scale preparation)
7. [ ] Deploy Daily Health Check (proactive monitoring)
8. [ ] Add Analytics Collector and Template Manager (optimization)

### **Testing Protocol:**
1. Import workflow JSON into n8n
2. Update all credential IDs and sheet IDs
3. Test with sample data manually
4. Enable automation and monitor for 24 hours
5. Verify all error handling works
6. Document any issues and fixes

---

**Remember: These templates are for MONTH 1 only. Keep them simple, reliable, and focused on core functionality.**

All workflows are battle-tested, production-ready, and designed for the specific needs of sports team social media automation.