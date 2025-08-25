# PersimmonLabs - Premium SaaS Landing Page

A world-class, conversion-focused SaaS landing page for PersimmonLabs, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the website.

## 🎨 Design System

### Brand Colors
- **Dark Burgundy**: `#510e12`
- **Vibrant Coral**: `#F5793B`
- **Deep Red**: `#7c161c`
- **Dark Brown**: `#250608`
- **Soft Peach**: `#f79a6b`
- **Bright Orange**: `#f1580c`

### Typography
- **Display Font**: DM Sans (headings)
- **Body Font**: Inter (content)

## 📁 Project Structure

```
persimmon-automation/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles and Tailwind imports
│   └── sitemap.ts          # Dynamic sitemap generation
├── components/
│   ├── Button.tsx          # Reusable button component
│   ├── Card.tsx            # Card component with hover effects
│   ├── NavBar.tsx          # Navigation with mobile menu
│   ├── Footer.tsx          # Footer with links and social
│   ├── SectionContainer.tsx # Section wrapper component
│   └── sections/
│       ├── HeroSection.tsx       # Hero with animated background
│       ├── FeaturesSection.tsx   # Feature cards grid
│       ├── HowItWorksSection.tsx # Step-by-step process
│       ├── PricingSection.tsx    # Pricing tiers
│       ├── TestimonialsSection.tsx # Customer testimonials
│       └── CTASection.tsx        # Call-to-action banner
├── lib/
│   └── utils.ts            # Utility functions (cn for classnames)
└── public/
    └── robots.txt          # SEO robots file
```

## 🎯 Key Features

### Reusable Components
- **Button**: Primary, secondary, and ghost variants with 3 sizes
- **Card**: Animated cards with hover effects
- **NavBar**: Sticky navigation with scroll effects
- **SectionContainer**: Consistent padding and max-width

### Animations
- Framer Motion for smooth animations
- Scroll-triggered animations on all sections
- Hover effects on interactive elements
- Animated gradient backgrounds
- Floating animation effects

### SEO Optimization
- Complete Open Graph meta tags
- Twitter Card meta tags
- Dynamic sitemap generation
- Robots.txt configuration
- Structured data ready
- Performance optimized for 95+ Lighthouse score

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile menu with smooth transitions
- Touch-optimized interactions

## 🛠️ Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Utilities**: clsx + tailwind-merge

## 📊 Sections Overview

1. **Hero Section**
   - Animated gradient background
   - Two-column layout with demo preview
   - Statistics display
   - Dual CTAs (primary + secondary)

2. **Features Section**
   - 6 feature cards with icons
   - Hover animations
   - Trust indicators
   - Industry badges

3. **How It Works**
   - 4-step process visualization
   - Connected flow design
   - Video demo placeholder
   - Case study highlight

4. **Testimonials**
   - Customer quotes with ratings
   - Avatar displays
   - Press mentions

5. **Pricing Section**
   - 3 tiers (Starter, Growth, Enterprise)
   - Popular badge highlight
   - Feature comparison
   - Monthly/yearly toggle

6. **CTA Section**
   - Gradient animated background
   - Compelling headline
   - Dual action buttons
   - Trust indicators

## 🎨 Custom Utilities

### Gradient Classes
```css
.gradient-persimmon      # Brand gradient
.gradient-text           # Gradient text effect
.gradient-bg-animated    # Animated gradient background
```

### Animation Classes
```css
.animate-float          # Floating animation
.animate-pulse-slow     # Slow pulse effect
.animate-gradient       # Gradient animation
```

## 🚀 Performance Features

- Image optimization with Next.js Image
- Lazy loading for below-fold content
- Code splitting by route
- Optimized font loading
- Minimal JavaScript bundle
- CSS purging in production

## 📱 Mobile Optimizations

- Touch-friendly tap targets (min 48px)
- Smooth scrolling
- Optimized animations for mobile
- Responsive typography scaling
- Mobile-specific navigation

## 🔧 Customization

### Adding New Sections
1. Create component in `components/sections/`
2. Import in `app/page.tsx`
3. Add to navigation if needed

### Modifying Colors
Edit the theme in `tailwind.config.ts`:
```javascript
colors: {
  'persimmon': {
    burgundy: '#510e12',
    coral: '#F5793B',
    // ... add more
  }
}
```

### Changing Fonts
1. Update font imports in `globals.css`
2. Modify `fontFamily` in `tailwind.config.ts`

## 🎯 Conversion Optimization

- Clear value proposition in hero
- Multiple CTAs throughout page
- Social proof via testimonials
- Trust badges and statistics
- Pricing transparency
- Risk reversal (free trial, no CC)
- Urgency elements (limited offer)

## 📈 Analytics Ready

The site is prepared for:
- Google Analytics 4
- Facebook Pixel
- Hotjar/FullStory
- Conversion tracking
- A/B testing tools

## 🚢 Deployment

Ready for deployment on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting

## 🎯 Product Overview

### What We Deliver
- **Social media posts** (photos, carousels, collages, stories, threads)
- **Captions optimized** for your audience & SEO
- **Weekly or monthly content calendars**
- **Analytics dashboard** to see what's working
- **Optional add-ons**: newsletters, FAQs, customer support replies

### Sample Automation "Recipes"
1. **The Daily Poster** - AI pulls a random photo from a folder, writes a caption, posts daily
2. **The Event Amplifier** - Upload new event photos, AI creates today's post automatically
3. **The Thought Leader** - Weekly LinkedIn article repurposed into 5 short posts
4. **The Omnichannel Pack** - One piece of content distributed across all platforms
5. **The Smart Marketer** - Each post gets 2-3 caption variants, best performer picked automatically

## 📝 License

© 2024 PersimmonLabs. All rights reserved.