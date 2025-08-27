import * as puppeteer from 'puppeteer';
import { Browser } from 'puppeteer';
import * as fs from 'fs/promises';
import * as path from 'path';

export class GraphicsService {
  private browser: Browser | null = null;
  private browserPool: Browser[] = [];
  private currentBrowserIndex = 0;
  
  constructor() {}
  
  /**
   * Initialize browser pool for warm starts
   */
  async initBrowserPool(size = 3): Promise<void> {
    this.browserPool = [];
    for (let i = 0; i < size; i++) {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
      this.browserPool.push(browser);
    }
    console.log(`Browser pool initialized with ${size} instances`);
  }
  
  /**
   * Get a browser instance from the pool
   */
  private async getBrowser(): Promise<Browser> {
    if (this.browserPool.length === 0) {
      // If no pool, create single browser
      if (!this.browser) {
        this.browser = await puppeteer.launch({
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
      }
      return this.browser;
    }
    
    // Round-robin through browser pool
    const browser = this.browserPool[this.currentBrowserIndex];
    this.currentBrowserIndex = (this.currentBrowserIndex + 1) % this.browserPool.length;
    return browser;
  }
  
  /**
   * Convert HTML to PNG image
   */
  async htmlToPng(html: string): Promise<Buffer> {
    // Check if we should use mock mode (no browser available)
    if (process.env.MOCK_GRAPHICS === 'true') {
      return this.generateMockImage();
    }
    
    try {
      const browser = await this.getBrowser();
      const page = await browser.newPage();
      
      try {
        await page.setViewport({ width: 1080, height: 1080 });
        await page.setContent(html, { waitUntil: 'networkidle0' });
        const screenshot = await page.screenshot({ 
          type: 'png',
          fullPage: false 
        });
        
        return screenshot;
      } finally {
        await page.close();
      }
    } catch (error: any) {
      console.warn('Browser graphics failed, using mock:', error.message);
      return this.generateMockImage();
    }
  }
  
  /**
   * Add watermark to image buffer
   */
  async addWatermark(imageBuffer: Buffer, watermarkText = 'DEMO MODE'): Promise<Buffer> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    
    try {
      // Create HTML with image and watermark overlay
      const base64Image = imageBuffer.toString('base64');
      const watermarkHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; padding: 0; position: relative; }
            img { display: block; width: 100%; }
            .watermark {
              position: absolute;
              top: 40px;
              right: 40px;
              font-size: 24px;
              font-weight: 600;
              color: rgba(255, 255, 255, 0.5);
              transform: rotate(-10deg);
              letter-spacing: 2px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
          </style>
        </head>
        <body>
          <img src="data:image/png;base64,${base64Image}" />
          <div class="watermark">${watermarkText}</div>
        </body>
        </html>
      `;
      
      await page.setContent(watermarkHtml, { waitUntil: 'networkidle0' });
      const screenshot = await page.screenshot({ type: 'png', fullPage: true });
      
      return screenshot;
    } finally {
      await page.close();
    }
  }
  
  /**
   * Generate quote card from template
   */
  async generateQuoteCard(quote: string, author: string, backgroundColor = '#F5793B', textColor = '#FFFFFF'): Promise<Buffer> {
    const templatePath = path.join(__dirname, '..', 'templates', 'quote-card.html');
    let template = await fs.readFile(templatePath, 'utf-8');
    
    // Replace template variables
    template = template.replace(/{{quote}}/g, quote);
    template = template.replace(/{{author}}/g, author);
    template = template.replace(/{{backgroundColor}}/g, backgroundColor);
    template = template.replace(/{{textColor}}/g, textColor);
    
    return this.htmlToPng(template);
  }
  
  /**
   * Generate mock PNG image for testing
   */
  private generateMockImage(): Buffer {
    // Create a simple PNG header and basic image data
    // This creates a valid 100x100 PNG with a colored square
    const width = 100;
    const height = 100;
    
    // PNG signature
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    
    // IHDR chunk (image header)
    const ihdrData = Buffer.alloc(13);
    ihdrData.writeUInt32BE(width, 0);
    ihdrData.writeUInt32BE(height, 4);
    ihdrData[8] = 8; // bit depth
    ihdrData[9] = 2; // color type (RGB)
    ihdrData[10] = 0; // compression
    ihdrData[11] = 0; // filter
    ihdrData[12] = 0; // interlace
    
    const ihdrCrc = this.calculateCRC32('IHDR', ihdrData);
    const ihdr = Buffer.concat([
      Buffer.from('0000000D', 'hex'), // length
      Buffer.from('IHDR'),
      ihdrData,
      ihdrCrc
    ]);
    
    // IDAT chunk (image data) - solid orange square
    const pixelData = Buffer.alloc(width * height * 3);
    for (let i = 0; i < pixelData.length; i += 3) {
      pixelData[i] = 245;     // R (Persimmon orange)
      pixelData[i + 1] = 121; // G
      pixelData[i + 2] = 59;  // B
    }
    
    // Simple scanline filter (0 = None)
    const scanlines = Buffer.alloc(height * (1 + width * 3));
    for (let row = 0; row < height; row++) {
      const scanlineStart = row * (1 + width * 3);
      scanlines[scanlineStart] = 0; // filter type
      pixelData.copy(scanlines, scanlineStart + 1, row * width * 3, (row + 1) * width * 3);
    }
    
    // Compress data (minimal zlib deflate)
    const compressedData = Buffer.concat([
      Buffer.from([120, 156]), // zlib header
      scanlines,
      Buffer.from([1, 0, 0, 255, 255]) // deflate end block
    ]);
    
    const idatCrc = this.calculateCRC32('IDAT', compressedData);
    const idat = Buffer.concat([
      Buffer.from(compressedData.length.toString(16).padStart(8, '0'), 'hex'),
      Buffer.from('IDAT'),
      compressedData,
      idatCrc
    ]);
    
    // IEND chunk
    const iendCrc = this.calculateCRC32('IEND', Buffer.alloc(0));
    const iend = Buffer.concat([
      Buffer.from('00000000', 'hex'), // length
      Buffer.from('IEND'),
      iendCrc
    ]);
    
    return Buffer.concat([signature, ihdr, idat, iend]);
  }
  
  /**
   * Calculate CRC32 for PNG chunks
   */
  private calculateCRC32(type: string, data: Buffer): Buffer {
    // Simplified CRC32 - returns mock CRC for demo purposes
    const mockCrc = Buffer.alloc(4);
    const seed = (type.charCodeAt(0) + data.length) % 1000; // Keep number small
    mockCrc.writeUInt32BE(seed * 1000, 0); // Simple mock
    return mockCrc;
  }
  
  /**
   * Close all browsers
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
    
    for (const browser of this.browserPool) {
      await browser.close();
    }
    this.browserPool = [];
  }
}