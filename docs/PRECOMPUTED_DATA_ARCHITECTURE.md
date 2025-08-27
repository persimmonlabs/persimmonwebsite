# Precomputed Data Architecture

## Overview
Precomputed data tables eliminate hallucination risk and ensure every insight is sourced and defensible. Updated weekly via cron jobs, with graceful fallbacks to benchmarks when live data unavailable.

## Database Schema (Supabase)

### Table: industry_insights
```sql
CREATE TABLE industry_insights (
  id SERIAL PRIMARY KEY,
  industry VARCHAR(50) NOT NULL,
  insight_type VARCHAR(50) NOT NULL, -- 'posting_time', 'engagement_rate', 'viral_format'
  insight_value TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_url TEXT,
  confidence_level VARCHAR(20), -- 'high', 'medium', 'low'
  sample_size INTEGER,
  date_collected DATE,
  updated_at TIMESTAMP DEFAULT NOW(),
  is_benchmark BOOLEAN DEFAULT false,
  UNIQUE(industry, insight_type)
);

-- Example data
INSERT INTO industry_insights VALUES
('SaaS', 'best_posting_time', 'Tuesday 11 AM EST', 'LinkedIn Analytics Study', 'https://business.linkedin.com/marketing-solutions/blog/linkedin-news/2024/best-times-to-post', 'high', 50000, '2024-01-15', NOW(), false),
('SaaS', 'top_viral_format', 'I was wrong about...', 'Content Analysis Q1 2024', NULL, 'medium', 10000, '2024-01-20', NOW(), true);
```

### Table: viral_hooks
```sql
CREATE TABLE viral_hooks (
  id SERIAL PRIMARY KEY,
  industry VARCHAR(50) NOT NULL,
  hook_template TEXT NOT NULL,
  performance_score DECIMAL(3,2), -- 0.00 to 9.99
  example_usage TEXT,
  platform VARCHAR(20),
  source TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Example data
INSERT INTO viral_hooks VALUES
('SaaS', 'I was wrong about [controversial belief]', 8.5, 'I was wrong about needing venture capital', 'LinkedIn', 'Analysis of 10K posts', NOW()),
('E-commerce', 'The $[number] mistake that costs [outcome]', 7.8, 'The $10K mistake that costs you customers', 'Instagram', 'Performance data 2024', NOW());
```

### Table: hashtag_performance
```sql
CREATE TABLE hashtag_performance (
  id SERIAL PRIMARY KEY,
  industry VARCHAR(50) NOT NULL,
  platform VARCHAR(20) NOT NULL,
  hashtag VARCHAR(50) NOT NULL,
  avg_reach INTEGER,
  engagement_rate DECIMAL(5,2),
  competition_level VARCHAR(20), -- 'low', 'medium', 'high'
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(industry, platform, hashtag)
);
```

### Table: competitor_benchmarks
```sql
CREATE TABLE competitor_benchmarks (
  id SERIAL PRIMARY KEY,
  industry VARCHAR(50) NOT NULL,
  metric_name VARCHAR(100) NOT NULL,
  metric_value TEXT NOT NULL,
  percentile INTEGER, -- 50th, 75th, 90th percentile
  source TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Example: "Top 10% of SaaS companies post 5x per week"
```

## Data Collection Pipeline

### Weekly Cron Jobs
```javascript
// Every Monday at 2 AM
async function updateIndustryInsights() {
  const industries = ['SaaS', 'E-commerce', 'Healthcare', 'Finance', 'Education'];
  
  for (const industry of industries) {
    // 1. Fetch from public APIs where available
    const linkedInData = await fetchLinkedInPublicStats(industry);
    const twitterData = await fetchTwitterTrends(industry);
    
    // 2. Process and validate
    const insights = processInsights(linkedInData, twitterData);
    
    // 3. Store with sources
    await storeInsights(insights, {
      source: 'Public API data',
      date: new Date(),
      confidence: calculateConfidence(insights)
    });
  }
}
```

### Data Sources (All Legal & Public)
1. **Platform Business Blogs**
   - LinkedIn Marketing Solutions blog
   - Twitter Business blog
   - Meta Business insights

2. **Public Studies**
   - HubSpot State of Marketing Report
   - Hootsuite Social Media Trends
   - Buffer State of Social

3. **Aggregated Benchmarks**
   - Industry reports (with attribution)
   - Public case studies
   - Conference presentations

## Retrieval Logic

### Runtime Insight Fetching
```javascript
async function getInsight(industry, type) {
  // 1. Try to get fresh data (less than 7 days old)
  const fresh = await db.query(
    'SELECT * FROM industry_insights WHERE industry = $1 AND insight_type = $2 AND updated_at > NOW() - INTERVAL \'7 days\'',
    [industry, type]
  );
  
  if (fresh.rows.length > 0) {
    const insight = fresh.rows[0];
    return {
      value: insight.insight_value,
      source: insight.source_url ? 
        `[${insight.source_name}](${insight.source_url})` : 
        `${insight.source_name} (Industry Benchmark)`,
      confidence: insight.confidence_level,
      isLive: !insight.is_benchmark
    };
  }
  
  // 2. Fallback to benchmark data
  const benchmark = await db.query(
    'SELECT * FROM industry_insights WHERE industry = $1 AND insight_type = $2 AND is_benchmark = true',
    [industry, type]
  );
  
  if (benchmark.rows.length > 0) {
    const insight = benchmark.rows[0];
    return {
      value: insight.insight_value,
      source: `Industry Benchmark (Updated ${formatDate(insight.updated_at)})`,
      confidence: 'medium',
      isLive: false
    };
  }
  
  // 3. Ultimate fallback to generic
  return {
    value: getGenericInsight(type),
    source: 'General Best Practices',
    confidence: 'low',
    isLive: false
  };
}
```

### Source Formatting
```javascript
function formatInsightForOutput(insight) {
  if (insight.isLive && insight.source.includes('http')) {
    // Live data with link
    return `${insight.value} ${insight.source}`;
  } else if (insight.isLive) {
    // Live data without link
    return `${insight.value} [Source: ${insight.source}]`;
  } else {
    // Benchmark data
    return `${insight.value} [Industry Benchmark, ${insight.source}]`;
  }
}
```

## Quality Assurance

### Validation Rules
```javascript
const insightValidation = {
  // No numbers without sources
  requiresSource: (text) => {
    return !/\d+(\.\d+)?[%x]/.test(text) || text.includes('[Source:') || text.includes('[Industry Benchmark');
  },
  
  // No absolute claims
  noAbsolutes: (text) => {
    const absolutes = ['always', 'never', 'guaranteed', 'definitely'];
    return !absolutes.some(word => text.toLowerCase().includes(word));
  },
  
  // Must be defensible
  isDefensible: (insight) => {
    return insight.source && insight.confidence !== 'low';
  }
};
```

### Manual Review Queue
```sql
CREATE TABLE insight_review_queue (
  id SERIAL PRIMARY KEY,
  insight_text TEXT,
  industry VARCHAR(50),
  reason VARCHAR(100), -- 'unsourced_stat', 'absolute_claim', 'low_confidence'
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  reviewed_by VARCHAR(100),
  reviewed_at TIMESTAMP
);
```

## Fallback Templates

### When No Data Available
```javascript
const genericInsights = {
  posting_time: {
    value: "Weekday mornings typically see higher engagement",
    source: "General social media best practices",
    disclaimer: "Specific times vary by audience"
  },
  
  engagement_rate: {
    value: "Quality content consistently outperforms quantity",
    source: "Content marketing fundamentals",
    disclaimer: "Measure your specific audience response"
  },
  
  viral_format: {
    value: "Storytelling and problem-solving content resonates across industries",
    source: "Content strategy best practices",
    disclaimer: "Test different formats with your audience"
  }
};
```

## Update Schedule

### Daily Updates (Automated)
- Trending hashtags (via public APIs)
- Platform status/outages
- Time zone adjustments

### Weekly Updates (Semi-Automated)
- Industry insights review
- Viral hook performance
- Competitor benchmark updates
- Source link verification

### Monthly Updates (Manual)
- New industry addition
- Confidence level adjustments
- Source quality review
- Template improvements

## Cost Management

### API Costs
- Public data sources: $0 (blogs, reports)
- Trend APIs: ~$50/month
- Total: <$100/month for all industries

### Storage Costs
- Supabase free tier: 500MB (sufficient for 100K+ insights)
- Upgrade if needed: $25/month for 8GB

## Error Handling

### Graceful Degradation
```javascript
async function getInsightWithFallback(industry, type) {
  try {
    // Try primary source
    return await getInsightFromDB(industry, type);
  } catch (error) {
    console.error('Insight fetch failed:', error);
    
    // Return generic but honest response
    return {
      value: "Industry patterns vary",
      source: "Unable to fetch specific data",
      confidence: "low",
      disclaimer: "Using general best practices"
    };
  }
}
```

### Never Return These
- Unsourced statistics
- Specific numbers without attribution  
- Guarantees or promises
- Competitor names without permission
- Unverified claims

---

**This architecture ensures every insight is defensible, sourced, and honest. No hallucinations, no fake stats, just real value.**