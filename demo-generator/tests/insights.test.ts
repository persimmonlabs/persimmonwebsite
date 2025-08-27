import { InsightsService } from '../services/insights';

describe('InsightsService', () => {
  let service: InsightsService;
  
  beforeEach(() => {
    service = new InsightsService();
  });
  
  it('should compile and instantiate', () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(InsightsService);
  });
  
  describe('getInsight', () => {
    it('should return insight for known industry', async () => {
      const result = await service.getInsight('restaurant');
      
      expect(result.success).toBe(true);
      expect(result.insight).toBeDefined();
      if (result.insight) {
        expect(result.insight.industry).toBeDefined();
        expect(result.insight.description).toBeDefined();
        expect(result.insight.source).toBeDefined();
      }
    });
    
    it('should return insight for unknown industry using default', async () => {
      const result = await service.getInsight('unknown-industry-xyz');
      
      expect(result.success).toBe(true);
      expect(result.insight).toBeDefined();
    });
    
    it('should filter by insight type when specified', async () => {
      const result = await service.getInsight('restaurant', 'efficiency');
      
      if (result.success && result.insight) {
        expect(result.insight.insight_type).toBe('efficiency');
      }
    });
  });
  
  describe('validateInsight', () => {
    it('should validate complete insight', () => {
      const validInsight = {
        industry: 'restaurant',
        insight_type: 'efficiency',
        title: 'Test Insight',
        description: 'Test description',
        metric: '30% improvement',
        source: 'Test Source 2024',
        confidence: 0.85,
      };
      
      expect(service.validateInsight(validInsight)).toBe(true);
    });
    
    it('should reject insight without source', () => {
      const invalidInsight = {
        industry: 'restaurant',
        insight_type: 'efficiency',
        title: 'Test Insight',
        description: 'Test description',
        metric: '30% improvement',
        confidence: 0.85,
      };
      
      expect(service.validateInsight(invalidInsight)).toBe(false);
    });
    
    it('should reject insight with low confidence', () => {
      const lowConfidenceInsight = {
        industry: 'restaurant',
        insight_type: 'efficiency',
        title: 'Test Insight',
        description: 'Test description',
        metric: '30% improvement',
        source: 'Test Source',
        confidence: 0.5,
      };
      
      expect(service.validateInsight(lowConfidenceInsight)).toBe(false);
    });
  });
  
  describe('formatInsight', () => {
    it('should format insight with all fields', () => {
      const insight = {
        industry: 'restaurant',
        insight_type: 'efficiency',
        title: 'Digital Orders',
        description: 'Digital ordering reduces errors',
        metric: '30% reduction',
        source: 'Industry Report 2024',
        confidence: 0.9,
      };
      
      const formatted = service.formatInsight(insight);
      
      expect(formatted).toContain('Digital ordering reduces errors');
      expect(formatted).toContain('Key metric: 30% reduction');
      expect(formatted).toContain('Source: Industry Report 2024');
    });
    
    it('should format insight without optional fields', () => {
      const insight = {
        industry: 'general',
        insight_type: 'trend',
        title: 'Automation Growth',
        description: 'Automation is growing rapidly',
        confidence: 0.8,
      };
      
      const formatted = service.formatInsight(insight);
      
      expect(formatted).toContain('Automation is growing rapidly');
      expect(formatted).not.toContain('Key metric');
      expect(formatted).not.toContain('Source');
    });
  });
  
  describe('getMultipleInsights', () => {
    it('should return multiple insights', async () => {
      const result = await service.getMultipleInsights('restaurant', 2);
      
      expect(result.success).toBe(true);
      expect(result.insights).toBeInstanceOf(Array);
      expect(result.insights.length).toBeGreaterThan(0);
      expect(result.insights.length).toBeLessThanOrEqual(2);
    });
    
    it('should handle request for more insights than available', async () => {
      const result = await service.getMultipleInsights('restaurant', 10);
      
      expect(result.success).toBe(true);
      expect(result.insights).toBeInstanceOf(Array);
      expect(result.insights.length).toBeGreaterThan(0);
    });
  });
});