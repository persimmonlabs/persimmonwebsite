import { GraphicsService } from '../services/graphics';
import * as fs from 'fs/promises';
import * as path from 'path';

describe('GraphicsService', () => {
  let service: GraphicsService;
  
  beforeEach(() => {
    service = new GraphicsService();
  });
  
  afterEach(async () => {
    if (service) {
      await service.close();
    }
  });
  
  it('should compile and instantiate', () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(GraphicsService);
  });
  
  it('should have initBrowserPool method', () => {
    expect(service.initBrowserPool).toBeDefined();
    expect(typeof service.initBrowserPool).toBe('function');
  });
  
  it('should have close method', () => {
    expect(service.close).toBeDefined();
    expect(typeof service.close).toBe('function');
  });
  
  describe('htmlToPng', () => {
    it('should convert HTML to PNG buffer', async () => {
      const html = `
        <html>
        <body style="width: 1080px; height: 1080px; background: #F5793B; display: flex; align-items: center; justify-content: center;">
          <h1 style="color: white; font-size: 48px;">Test Image</h1>
        </body>
        </html>
      `;
      
      const buffer = await service.htmlToPng(html);
      
      expect(buffer).toBeDefined();
      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    }, 30000); // 30 second timeout for browser operations
  });
  
  describe('generateQuoteCard', () => {
    it('should generate quote card from template', async () => {
      const quote = "Test quote for demo generator";
      const author = "Test Author";
      
      const buffer = await service.generateQuoteCard(quote, author);
      
      expect(buffer).toBeDefined();
      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    }, 30000);
    
    it('should accept custom colors', async () => {
      const quote = "Custom colors test";
      const author = "Tester";
      const backgroundColor = '#000000';
      const textColor = '#FF0000';
      
      const buffer = await service.generateQuoteCard(quote, author, backgroundColor, textColor);
      
      expect(buffer).toBeDefined();
      expect(buffer).toBeInstanceOf(Buffer);
    }, 30000);
  });
  
  describe('addWatermark', () => {
    it('should add watermark to image buffer', async () => {
      // First generate an image
      const html = `
        <html>
        <body style="width: 1080px; height: 1080px; background: blue;">
        </body>
        </html>
      `;
      
      const originalBuffer = await service.htmlToPng(html);
      const watermarkedBuffer = await service.addWatermark(originalBuffer);
      
      expect(watermarkedBuffer).toBeDefined();
      expect(watermarkedBuffer).toBeInstanceOf(Buffer);
      expect(watermarkedBuffer.length).toBeGreaterThan(0);
    }, 30000);
    
    it('should accept custom watermark text', async () => {
      const html = `<html><body style="width: 100px; height: 100px; background: red;"></body></html>`;
      const buffer = await service.htmlToPng(html);
      
      const watermarkedBuffer = await service.addWatermark(buffer, 'CUSTOM TEXT');
      
      expect(watermarkedBuffer).toBeDefined();
      expect(watermarkedBuffer).toBeInstanceOf(Buffer);
    }, 30000);
  });
  
  describe('initBrowserPool', () => {
    it('should initialize browser pool with specified size', async () => {
      await service.initBrowserPool(2);
      
      // Generate multiple images concurrently to test pool
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(service.htmlToPng(`<html><body>Test ${i}</body></html>`));
      }
      
      const results = await Promise.all(promises);
      
      expect(results).toHaveLength(5);
      results.forEach(buffer => {
        expect(buffer).toBeInstanceOf(Buffer);
      });
    }, 60000); // 60 second timeout for multiple browser operations
  });
});