# Reliability & Guardrails System

## Service Level Agreements (SLAs)

### Performance Targets
```yaml
Demo Generation:
  P50: < 60 seconds
  P90: < 90 seconds  
  P99: < 180 seconds (with queue message)
  
Error Rates:
  Hard Failures: < 5%
  Partial Failures: < 15% (graceful degradation)
  Success Rate: > 80%

Availability:
  Uptime: 99.5% (allows 3.6 hours downtime/month)
  Scheduled Maintenance: Tuesdays 2-4 AM EST
```

## Error Handling Strategy

### Failure Cascade
```javascript
class DemoGenerator {
  async generate(input) {
    try {
      // Primary path
      return await this.fullGeneration(input);
    } catch (error) {
      // Degradation levels
      return await this.handleFailure(error, input);
    }
  }
  
  async handleFailure(error, input) {
    // Level 1: Retry with timeout
    if (error.type === 'TIMEOUT') {
      return await this.generateWithTimeout(input, 30000);
    }
    
    // Level 2: Partial generation (text only)
    if (error.type === 'GRAPHICS_FAILURE') {
      return await this.generateTextOnly(input);
    }
    
    // Level 3: Use precomputed templates
    if (error.type === 'LLM_FAILURE') {
      return await this.useTemplates(input);
    }
    
    // Level 4: Queue for manual review
    if (error.type === 'CRITICAL') {
      await this.queueForReview(input);
      return this.sendApologyEmail(input.email);
    }
  }
}
```

### Timeout Management
```javascript
const timeouts = {
  llm: 30000,        // 30s per LLM call
  graphics: 10000,   // 10s per graphic
  pdf: 5000,         // 5s for PDF generation
  email: 3000,       // 3s for email send
  total: 90000       // 90s total before queue
};

async function withTimeout(promise, ms, fallback) {
  const timeout = setTimeout(() => {
    throw new Error(`Operation timed out after ${ms}ms`);
  }, ms);
  
  try {
    const result = await promise;
    clearTimeout(timeout);
    return result;
  } catch (error) {
    clearTimeout(timeout);
    if (fallback) return fallback();
    throw error;
  }
}
```

## Content Guardrails

### Input Validation
```javascript
const inputValidation = {
  brandName: {
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\s\-\.&]+$/,
    required: true,
    sanitize: (input) => input.trim().slice(0, 50)
  },
  
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: true,
    sanitize: (input) => input.toLowerCase().trim()
  },
  
  industry: {
    allowed: ['SaaS', 'E-commerce', 'Healthcare', 'Finance', 'Education', 'Other'],
    required: true,
    default: 'Other'
  },
  
  competitorHandle: {
    pattern: /^@?[a-zA-Z0-9_]{1,30}$/,
    required: false,
    sanitize: (input) => input?.replace('@', '').slice(0, 30)
  },
  
  hexColor: {
    pattern: /^#[0-9A-Fa-f]{6}$/,
    required: false,
    default: '#000000',
    sanitize: (input) => input?.match(/#[0-9A-Fa-f]{6}/)?.[0] || '#000000'
  }
};
```

### Content Moderation
```javascript
const contentModeration = {
  bannedTerms: [
    // Politics
    'trump', 'biden', 'republican', 'democrat', 'election',
    // Health claims
    'cure', 'treatment', 'medical', 'prescription', 'FDA',
    // Financial advice
    'guaranteed returns', 'get rich quick', 'investment advice',
    // Inappropriate
    'profanity', 'adult content', 'violence'
  ],
  
  check: (content) => {
    const lower = content.toLowerCase();
    for (const term of contentModeration.bannedTerms) {
      if (lower.includes(term)) {
        return {
          safe: false,
          reason: `Content contains restricted term: ${term}`,
          action: 'USE_GENERIC_TEMPLATE'
        };
      }
    }
    return { safe: true };
  },
  
  sanitize: (content) => {
    // Remove URLs except sources
    content = content.replace(/https?:\/\/(?!.*\[Source\])[^\s]+/g, '[link]');
    // Remove emails
    content = content.replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '[email]');
    // Remove phone numbers
    content = content.replace(/\+?[\d\s\-\(\)]+\d{4,}/g, '[phone]');
    return content;
  }
};
```

### Statistical Claims Validation
```javascript
class ClaimsValidator {
  validateClaim(text, source) {
    const numberPattern = /\d+(\.\d+)?[%x]|\$\d+/g;
    const hasNumber = numberPattern.test(text);
    
    if (hasNumber && !source) {
      // Remove the claim entirely
      return null;
    }
    
    if (hasNumber && source) {
      // Format with source
      return `${text} [Source: ${source}]`;
    }
    
    // No number, no problem
    return text;
  }
  
  validateAllContent(posts) {
    return posts.map(post => {
      const validated = this.validateClaim(post.content, post.source);
      if (!validated) {
        // Replace with generic content
        return {
          ...post,
          content: this.getGenericAlternative(post.platform),
          flag: 'UNSOURCED_STAT_REMOVED'
        };
      }
      return { ...post, content: validated };
    });
  }
}
```

## Rate Limiting & Throttling

### API Rate Limits
```javascript
const rateLimits = {
  openai: {
    requestsPerMinute: 60,
    tokensPerMinute: 90000,
    concurrent: 5
  },
  
  googleSheets: {
    requestsPerMinute: 30,
    concurrent: 3
  },
  
  puppeteer: {
    concurrent: 5,  // Browser instances
    requestsPerMinute: 100
  }
};

class RateLimiter {
  constructor(limits) {
    this.limits = limits;
    this.queue = [];
    this.active = 0;
  }
  
  async execute(fn) {
    while (this.active >= this.limits.concurrent) {
      await this.wait(100);
    }
    
    this.active++;
    try {
      const result = await fn();
      return result;
    } finally {
      this.active--;
    }
  }
}
```

### Queue Management
```javascript
class DemoQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.maxQueueSize = 100;
  }
  
  async add(demoRequest) {
    if (this.queue.length >= this.maxQueueSize) {
      throw new Error('Queue full. Please try again later.');
    }
    
    const position = this.queue.length + 1;
    this.queue.push(demoRequest);
    
    // Send queue notification
    await this.sendQueueEmail(demoRequest.email, position);
    
    if (!this.processing) {
      this.processQueue();
    }
    
    return { queued: true, position };
  }
  
  async processQueue() {
    this.processing = true;
    
    while (this.queue.length > 0) {
      const request = this.queue.shift();
      try {
        await this.processDemo(request);
      } catch (error) {
        await this.handleQueueError(request, error);
      }
      
      // Rate limit between demos
      await this.wait(2000);
    }
    
    this.processing = false;
  }
}
```

## Monitoring & Alerting

### Metrics Collection
```javascript
const metrics = {
  // Performance
  demoGenerationTime: new Histogram(),
  llmResponseTime: new Histogram(),
  graphicsGenerationTime: new Histogram(),
  
  // Reliability
  successRate: new Counter(),
  errorRate: new Counter(),
  errorsByType: new Map(),
  
  // Business
  demosStarted: new Counter(),
  demosCompleted: new Counter(),
  assetsDownloaded: new Counter(),
  ctaClicks: new Counter(),
  
  // Cost
  tokensUsed: new Counter(),
  apiCallsCount: new Counter()
};

// Log every demo
function logDemo(request, result, timing) {
  metrics.demoGenerationTime.observe(timing.total);
  
  if (result.success) {
    metrics.successRate.inc();
  } else {
    metrics.errorRate.inc();
    metrics.errorsByType.get(result.errorType).inc();
  }
  
  // Send to monitoring service
  monitor.track('demo_generated', {
    success: result.success,
    duration: timing.total,
    industry: request.industry,
    errorType: result.errorType
  });
}
```

### Alert Thresholds
```yaml
alerts:
  - name: high_error_rate
    condition: error_rate > 10%
    window: 5 minutes
    severity: critical
    action: page_on_call
    
  - name: slow_generation
    condition: p90_latency > 120 seconds
    window: 10 minutes
    severity: warning
    action: email_team
    
  - name: api_limit_approaching
    condition: api_calls > 80% of limit
    window: 1 minute
    severity: warning
    action: throttle_requests
    
  - name: queue_backing_up
    condition: queue_size > 50
    window: instant
    severity: warning
    action: scale_workers
```

## Security Guardrails

### Input Sanitization
```javascript
const security = {
  // Prevent injection attacks
  sanitizeInput: (input) => {
    // Remove potential SQL injection
    input = input.replace(/['";\\]/g, '');
    // Remove potential XSS
    input = input.replace(/<script.*?>.*?<\/script>/gi, '');
    // Remove potential command injection
    input = input.replace(/[`$()]/g, '');
    return input;
  },
  
  // Validate file uploads
  validateFile: (file) => {
    const allowedTypes = ['image/png', 'image/jpeg'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }
    
    if (file.size > maxSize) {
      throw new Error('File too large');
    }
    
    return true;
  }
};
```

### API Security
```javascript
// Rate limit by IP
const ipRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
  message: 'Too many demos from this IP'
});

// Require valid referrer
const referrerCheck = (req, res, next) => {
  const validReferrers = ['https://persimmonlabs.io', 'http://localhost:3000'];
  const referrer = req.get('Referrer');
  
  if (!validReferrers.some(valid => referrer?.startsWith(valid))) {
    return res.status(403).json({ error: 'Invalid referrer' });
  }
  
  next();
};
```

## Disaster Recovery

### Backup Systems
```javascript
const fallbacks = {
  // If OpenAI fails, use Claude
  llm: {
    primary: 'openai',
    fallback: 'anthropic',
    ultimate: 'templates'
  },
  
  // If Supabase fails, use local SQLite
  database: {
    primary: 'supabase',
    fallback: 'sqlite',
    ultimate: 'json_files'
  },
  
  // If SendGrid fails, use SMTP
  email: {
    primary: 'sendgrid',
    fallback: 'smtp',
    ultimate: 'log_to_file'
  }
};
```

### Circuit Breaker Pattern
```javascript
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }
  
  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}
```

---

**These guardrails ensure the system degrades gracefully, never lies to users, and maintains quality even under failure conditions.**