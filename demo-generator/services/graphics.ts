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