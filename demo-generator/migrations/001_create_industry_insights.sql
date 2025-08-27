-- Create industry_insights table for precomputed data
CREATE TABLE IF NOT EXISTS industry_insights (
  id SERIAL PRIMARY KEY,
  industry VARCHAR(50) NOT NULL,
  insight_type VARCHAR(50) NOT NULL,
  insight_value TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_url TEXT,
  confidence_level VARCHAR(20) DEFAULT 'medium',
  sample_size INTEGER,
  date_collected DATE DEFAULT CURRENT_DATE,
  updated_at TIMESTAMP DEFAULT NOW(),
  is_benchmark BOOLEAN DEFAULT false,
  UNIQUE(industry, insight_type)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_industry_insights_industry ON industry_insights(industry);
CREATE INDEX IF NOT EXISTS idx_industry_insights_type ON industry_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_industry_insights_updated ON industry_insights(updated_at DESC);