import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';

export class GraphicsService {
  private browser: Browser | null = null;
  private browserPool: Browser[] = [];
  private currentBrowserIndex = 0;
  
  constructor(private poolSize: number = 3) {}
  
  /**
   * Initialize browser pool for warm starts
   */
  async initBrowserPool(size = 3): Promise<void> {
    // Implemented in next step
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