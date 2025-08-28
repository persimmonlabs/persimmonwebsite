# Complete Setup Checklist Per Client Type

## 🚀 Master Setup Process (2-3 Hours Per Client)

---

## 📋 Universal Setup Steps (All Clients)

### 1. Initial Infrastructure (30 minutes)
- [ ] Create client folder in Google Drive
- [ ] Set up folder structure:
  ```
  ClientName/
  ├── Content_Calendar (Sheet)
  ├── Generated_Content (Sheet)
  ├── Analytics (Sheet)
  ├── Photos/
  │   ├── Weekly_Uploads/
  │   ├── Evergreen/
  │   └── Used/
  └── Documents/
  ```
- [ ] Share Drive folder with client
- [ ] Set up Telegram group with client
- [ ] Create client record in master database

### 2. Google Sheets Setup (20 minutes)
- [ ] Copy template sheets to client folder
- [ ] Configure Content_Calendar columns:
  - Date, Content_Type, Topic, Details, Hashtags
  - Needs_Image, Priority, Status
- [ ] Configure Generated_Content columns:
  - Timestamp, Content, Platforms, Status
  - Published, Analytics, Platform_Results
- [ ] Set sharing permissions
- [ ] Get Sheet IDs for workflows

### 3. Telegram Bot Setup (15 minutes)
- [ ] Add client to Telegram bot
- [ ] Configure bot commands
- [ ] Test approval system:
  - Send test post
  - Verify ✅/❌/✏️ responses work
  - Confirm notifications arrive
- [ ] Set notification preferences
- [ ] Add backup approver if provided

### 4. N8N Workflow Configuration (45 minutes)
- [ ] Import workflow templates
- [ ] Update all Sheet IDs:
  - CLIENT_MASTER_SHEET_ID
  - CLIENT_CONTENT_SHEET_ID
  - ANALYTICS_SHEET_ID
- [ ] Update Telegram Chat ID
- [ ] Configure business type in workflows
- [ ] Set posting schedule (times/frequency)
- [ ] Test each workflow manually

### 5. API Credentials Setup (30-60 minutes)
**This is the most complex part - budget extra time**

#### Instagram Business:
- [ ] Verify Instagram is Business account
- [ ] Connect to Facebook Page
- [ ] Generate Facebook App
- [ ] Get Access Token
- [ ] Get Instagram Business Account ID
- [ ] Test API connection

#### Facebook Pages:
- [ ] Get Page Access Token
- [ ] Verify publish_pages permission
- [ ] Get Page ID
- [ ] Test posting capability

#### Twitter/X (if needed):
- [ ] Create Twitter Developer App
- [ ] Get API Key and Secret
- [ ] Get Access Token and Secret
- [ ] Test tweet capability

#### Google Business (if local business):
- [ ] Verify Google Business Profile ownership
- [ ] Enable API access
- [ ] Get Account ID and Location ID
- [ ] Test posting capability

---

## 🍕 Restaurant/Cafe Specific Setup

### Additional Configurations:
- [ ] Set posting times:
  - 8 AM - Breakfast/lunch preview
  - 11:30 AM - Lunch special reminder
  - 4 PM - Dinner preview
  - 6 PM - Weekend specials (Fri only)

- [ ] Configure content types:
  ```javascript
  contentTypes: [
    'daily_special',
    'menu_highlight',
    'chef_feature',
    'event_announcement',
    'happy_hour'
  ]
  ```

- [ ] Set up templates:
  - Daily Special: "Today's Special: [DISH] - [PRICE] 🍽️"
  - Happy Hour: "Happy Hour starts at [TIME]! 🍻"
  - Weekend: "Weekend Brunch: [TIME] 🥞"

- [ ] Photo requirements brief:
  - Dishes immediately after plating
  - Natural lighting preferred
  - Include garnishes and presentation
  - Variety of angles

- [ ] Industry-specific hashtags:
  ```
  #[City]Eats #[City]Foodie #[Cuisine]Food
  #DailySpecial #FreshDaily #LocallySourced
  ```

### Menu Integration:
- [ ] Get current menu with prices
- [ ] Identify signature dishes
- [ ] Note dietary options (vegan, GF)
- [ ] Set up seasonal menu rotation

---

## 🛍️ Retail/E-commerce Specific Setup

### Additional Configurations:
- [ ] Set posting times:
  - 9 AM - New arrival/product feature
  - 1 PM - Lifestyle/usage post
  - 5 PM - Limited time offers
  - 7 PM - User generated content

- [ ] Configure content types:
  ```javascript
  contentTypes: [
    'product_showcase',
    'new_arrival',
    'sale_announcement',
    'customer_review',
    'behind_scenes',
    'style_guide'
  ]
  ```

- [ ] Set up templates:
  - New Arrival: "NEW: [PRODUCT] 🆕 [PRICE]"
  - Sale: "⚡ FLASH SALE: [DISCOUNT]% off [CATEGORY]"
  - Feature: "Why we love [PRODUCT]: [BENEFITS]"

- [ ] E-commerce integrations:
  - [ ] Product catalog sync (if available)
  - [ ] Inventory level monitoring
  - [ ] Price update automation
  - [ ] Link to shop integration

- [ ] Hashtag strategy:
  ```
  #[Brand]Style #Shop[City] #[Product]Love
  #NewArrivals #SaleAlert #OnlineShoppingDay
  ```

---

## 🔧 Service Business Specific Setup

### Additional Configurations:
- [ ] Set posting schedule:
  - Monday: Tips & advice
  - Wednesday: Service highlight
  - Friday: Weekend availability
  - As needed: Emergency availability

- [ ] Configure content types:
  ```javascript
  contentTypes: [
    'service_tip',
    'before_after',
    'testimonial',
    'seasonal_reminder',
    'emergency_availability',
    'team_spotlight'
  ]
  ```

- [ ] Service area configuration:
  - Define service radius
  - List covered neighborhoods
  - Emergency service areas
  - Travel fees zones

- [ ] Compliance checks:
  - License numbers in bio
  - Insurance mentions
  - Warranty/guarantee info
  - Safety certifications

---

## 💼 Professional Services Setup

### Additional Configurations:
- [ ] LinkedIn priority setup:
  - LinkedIn as primary platform
  - Professional tone adjustment
  - Industry hashtags
  - Thought leadership focus

- [ ] Content calendar:
  ```javascript
  contentTypes: [
    'industry_insight',
    'case_study',
    'team_expertise',
    'whitepaper_summary',
    'event_coverage',
    'client_success'
  ]
  ```

- [ ] Compliance requirements:
  - [ ] Disclaimer templates
  - [ ] Regulatory compliance
  - [ ] Client confidentiality
  - [ ] Professional standards

---

## 💪 Gym/Fitness Specific Setup

### Additional Configurations:
- [ ] Class schedule integration:
  - Daily class posts
  - Instructor highlights
  - Special workshops
  - Schedule changes

- [ ] Content types:
  ```javascript
  contentTypes: [
    'motivation_monday',
    'workout_wednesday',
    'transformation_thursday',
    'class_schedule',
    'trainer_tip',
    'member_spotlight'
  ]
  ```

- [ ] Seasonal campaigns:
  - New Year fitness goals
  - Summer body prep
  - Fall fitness challenges
  - Holiday schedule

---

## ✅ Testing Protocol (All Clients)

### Day 1 Testing:
- [ ] Generate test post
- [ ] Verify Telegram approval received
- [ ] Test all three responses (✅/❌/✏️)
- [ ] Confirm Sheet updates correctly
- [ ] Verify image handling

### Platform Testing:
- [ ] Test post to each platform individually
- [ ] Verify formatting correct
- [ ] Check image display
- [ ] Confirm links work
- [ ] Test hashtags

### Week 1 Monitoring:
- [ ] Daily check-ins first 3 days
- [ ] Review generated content quality
- [ ] Adjust timing if needed
- [ ] Gather client feedback
- [ ] Fine-tune AI prompts

---

## 📊 Client Onboarding Tracker

```markdown
| Task | Time | Day 1 | Day 2 | Day 3 | Week 1 | Week 2 |
|------|------|-------|-------|-------|--------|--------|
| Infrastructure | 30m | ✅ | | | | |
| Sheets Setup | 20m | ✅ | | | | |
| Telegram | 15m | ✅ | | | | |
| Workflows | 45m | | ✅ | | | |
| APIs | 60m | | ✅ | | | |
| Testing | 30m | | | ✅ | | |
| Go Live | - | | | ✅ | | |
| Daily Monitor | 10m | | | | ✅ | |
| Weekly Review | 30m | | | | ✅ | |
| Optimization | 30m | | | | | ✅ |
```

---

## 🚨 Common Setup Issues & Solutions

### API Issues:
**Problem:** Instagram API token expires
**Solution:** Use long-lived tokens, set renewal reminders

**Problem:** Facebook permissions denied
**Solution:** Ensure Page Admin role, review App settings

**Problem:** Rate limiting
**Solution:** Implement delays, batch posts, use queuing

### Google Sheets:
**Problem:** Permission denied
**Solution:** Share with service account, check OAuth

**Problem:** Formula errors
**Solution:** Use static values for client-specific data

### Telegram:
**Problem:** Bot not responding
**Solution:** Check webhook URL, verify bot token

**Problem:** Notifications not arriving
**Solution:** Check mute settings, notification permissions

---

## 📝 Handoff Checklist

Before marking client as "Active":

### Documentation Provided:
- [ ] Client guide (simplified version)
- [ ] Photo upload instructions
- [ ] Telegram approval guide
- [ ] Emergency contact info

### Access Verified:
- [ ] Client can access Google Drive
- [ ] Client can see/edit Sheets
- [ ] Telegram approvals working
- [ ] All platforms posting

### Training Complete:
- [ ] Photo upload process demonstrated
- [ ] Approval system practiced
- [ ] Calendar updates shown
- [ ] First week scheduled

### Monitoring Setup:
- [ ] Error alerts configured
- [ ] Health checks enabled
- [ ] Analytics tracking active
- [ ] Weekly reports scheduled

---

## 🎯 Success Criteria

### Day 1: Setup Complete
- All infrastructure in place
- Test post successful
- Client trained on basics

### Week 1: Stable Operations
- Daily posts publishing
- Client approving smoothly
- No major errors
- Engagement tracking

### Month 1: Optimized Performance
- Consistent posting rhythm
- Improved engagement metrics
- Client satisfaction confirmed
- Upsell opportunities identified

---

*Remember: Each client setup gets faster. First client: 3-4 hours. Fifth client: 1-2 hours. Document everything that goes wrong to prevent repeat issues.*