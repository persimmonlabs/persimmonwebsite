import { supabase } from '../lib/supabase';

interface IndustryInsight {
  id?: string;
  industry: string;
  insight_type: string;
  title: string;
  description: string;
  metric?: string;
  source?: string;
  confidence: number;
  created_at?: string;
}

interface InsightResult {
  success: boolean;
  insight?: IndustryInsight;
  error?: string;
}

export class InsightsService {
  private fallbackInsights: Map<string, IndustryInsight[]>;
  
  constructor() {
    // Initialize fallback insights for when database is unavailable
    this.fallbackInsights = new Map([
      ['restaurant', [
        {
          industry: 'restaurant',
          insight_type: 'efficiency',
          title: 'Digital Order Management',
          description: 'Restaurants using digital ordering systems reduce order errors by up to 30% and increase kitchen efficiency.',
          metric: '30% error reduction',
          source: 'Restaurant Technology Survey 2023',
          confidence: 0.85,
        },
        {
          industry: 'restaurant',
          insight_type: 'trend',
          title: 'Social Media Engagement',
          description: 'Restaurants posting daily on social media see 2.5x more foot traffic than those posting weekly.',
          metric: '2.5x foot traffic increase',
          source: 'Digital Marketing Institute',
          confidence: 0.78,
        },
      ]],
      ['ecommerce', [
        {
          industry: 'ecommerce',
          insight_type: 'conversion',
          title: 'Cart Abandonment Recovery',
          description: 'Automated cart abandonment emails recover 15-20% of lost sales when sent within 1 hour.',
          metric: '15-20% recovery rate',
          source: 'E-commerce Benchmark Report 2024',
          confidence: 0.92,
        },
        {
          industry: 'ecommerce',
          insight_type: 'personalization',
          title: 'Product Recommendations',
          description: 'Personalized product recommendations drive 35% of revenue for leading e-commerce sites.',
          metric: '35% of revenue',
          source: 'Personalization Impact Study',
          confidence: 0.88,
        },
      ]],
      ['healthcare', [
        {
          industry: 'healthcare',
          insight_type: 'patient-engagement',
          title: 'Appointment Reminders',
          description: 'Automated appointment reminders reduce no-shows by 38% in healthcare practices.',
          metric: '38% no-show reduction',
          source: 'Healthcare Management Journal',
          confidence: 0.91,
        },
      ]],
      ['default', [
        {
          industry: 'general',
          insight_type: 'automation',
          title: 'Process Automation ROI',
          description: 'Businesses that automate repetitive tasks save an average of 20% on operational costs.',
          metric: '20% cost savings',
          source: 'Business Automation Report 2024',
          confidence: 0.82,
        },
      ]],
    ]);
  }
  
  /**
   * Get a relevant insight for the industry
   */
  async getInsight(industry: string, insightType?: string): Promise<InsightResult> {
    // Try database first if available
    if (supabase) {
      try {
        let query = supabase
          .from('industry_insights')
          .select('*')
          .eq('industry', industry.toLowerCase());
        
        if (insightType) {
          query = query.eq('insight_type', insightType);
        }
        
        const { data, error } = await query.single();
        
        if (!error && data) {
          return {
            success: true,
            insight: data as IndustryInsight,
          };
        }
      } catch (error: any) {
        console.warn('Database query failed, using fallback:', error.message);
      }
    }
    
    // Use fallback insights
    return this.getFallbackInsight(industry, insightType);
  }
  
  /**
   * Get fallback insight when database is unavailable
   */
  private getFallbackInsight(industry: string, insightType?: string): InsightResult {
    const normalizedIndustry = industry.toLowerCase();
    const insights = this.fallbackInsights.get(normalizedIndustry) || 
                    this.fallbackInsights.get('default') || [];
    
    if (insights.length === 0) {
      return {
        success: false,
        error: 'No insights available for this industry',
      };
    }
    
    // Filter by type if specified
    let filtered = insights;
    if (insightType) {
      filtered = insights.filter(i => i.insight_type === insightType);
    }
    
    // Return random insight from filtered set
    const insight = filtered.length > 0 
      ? filtered[Math.floor(Math.random() * filtered.length)]
      : insights[0];
    
    return {
      success: true,
      insight,
    };
  }
  
  /**
   * Validate insight has required source
   */
  validateInsight(insight: IndustryInsight): boolean {
    return !!(
      insight.source && 
      insight.source.length > 0 &&
      insight.confidence >= 0.7 &&
      insight.metric
    );
  }
  
  /**
   * Format insight for display
   */
  formatInsight(insight: IndustryInsight): string {
    const parts = [insight.description];
    
    if (insight.metric) {
      parts.push(`Key metric: ${insight.metric}`);
    }
    
    if (insight.source) {
      parts.push(`Source: ${insight.source}`);
    }
    
    return parts.join(' | ');
  }
  
  /**
   * Get multiple insights for variety
   */
  async getMultipleInsights(
    industry: string, 
    count = 3
  ): Promise<{ success: boolean; insights: IndustryInsight[]; errors: string[] }> {
    const insights: IndustryInsight[] = [];
    const errors: string[] = [];
    const types = ['efficiency', 'trend', 'conversion', 'automation'];
    
    for (let i = 0; i < Math.min(count, types.length); i++) {
      const result = await this.getInsight(industry, types[i]);
      
      if (result.success && result.insight) {
        insights.push(result.insight);
      } else if (result.error) {
        errors.push(result.error);
      }
    }
    
    // Fill with general insights if needed
    while (insights.length < count) {
      const result = await this.getInsight(industry);
      if (result.success && result.insight) {
        insights.push(result.insight);
      } else {
        break;
      }
    }
    
    return {
      success: insights.length > 0,
      insights,
      errors,
    };
  }
}