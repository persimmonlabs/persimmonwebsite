import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';

interface PdfResult {
  success: boolean;
  pdf?: Buffer;
  error?: string;
  sizeKb?: number;
}

interface DemoContent {
  businessName: string;
  industry: string;
  posts: Array<{
    content: string;
    hashtags: string[];
  }>;
  insight?: {
    description: string;
    metric?: string;
    source?: string;
  };
  generatedAt: Date;
}

export class PdfService {
  private browser: Browser | null = null;
  
  /**
   * Generate PDF report from demo content
   */
  async generateReport(content: DemoContent): Promise<PdfResult> {
    try {
      const html = this.buildReportHtml(content);
      const pdf = await this.htmlToPdf(html);
      
      return {
        success: true,
        pdf,
        sizeKb: Math.round(pdf.length / 1024),
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to generate PDF',
      };
    }
  }
  
  /**
   * Convert HTML to PDF
   */
  private async htmlToPdf(html: string): Promise<Buffer> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }
    
    const page = await this.browser.newPage();
    
    try {
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm',
        },
      });
      
      return pdf;
    } finally {
      await page.close();
    }
  }
  
  /**
   * Build HTML report template
   */
  private buildReportHtml(content: DemoContent): string {
    const postsHtml = content.posts.map((post, index) => `
      <div class="post">
        <div class="post-number">Post ${index + 1}</div>
        <div class="post-content">${this.escapeHtml(post.content)}</div>
        <div class="post-hashtags">${post.hashtags.join(' ')}</div>
      </div>
    `).join('');
    
    const insightHtml = content.insight ? `
      <div class="insight">
        <h2>Industry Insight</h2>
        <p class="insight-description">${this.escapeHtml(content.insight.description)}</p>
        ${content.insight.metric ? `<p class="insight-metric">📊 ${this.escapeHtml(content.insight.metric)}</p>` : ''}
        ${content.insight.source ? `<p class="insight-source">Source: ${this.escapeHtml(content.insight.source)}</p>` : ''}
      </div>
    ` : '';
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          
          .header {
            background: linear-gradient(135deg, #F5793B 0%, #f79a6b 100%);
            color: white;
            padding: 40px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 32px;
            margin-bottom: 10px;
          }
          
          .header .subtitle {
            font-size: 18px;
            opacity: 0.9;
          }
          
          .watermark {
            position: absolute;
            top: 10px;
            right: 20px;
            color: rgba(255, 255, 255, 0.5);
            font-size: 14px;
            font-weight: bold;
            transform: rotate(-10deg);
          }
          
          .content {
            padding: 40px;
          }
          
          .section {
            margin-bottom: 40px;
          }
          
          .section h2 {
            color: #F5793B;
            font-size: 24px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f79a6b;
          }
          
          .post {
            background: #f9f9f9;
            border-left: 4px solid #F5793B;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 4px;
          }
          
          .post-number {
            font-weight: bold;
            color: #F5793B;
            margin-bottom: 10px;
          }
          
          .post-content {
            font-size: 16px;
            margin-bottom: 10px;
          }
          
          .post-hashtags {
            color: #666;
            font-size: 14px;
          }
          
          .insight {
            background: #fff3e0;
            border: 2px solid #F5793B;
            border-radius: 8px;
            padding: 25px;
            margin-top: 30px;
          }
          
          .insight h2 {
            color: #F5793B;
            margin-bottom: 15px;
            border: none;
          }
          
          .insight-description {
            font-size: 16px;
            margin-bottom: 10px;
          }
          
          .insight-metric {
            font-weight: bold;
            color: #F5793B;
            margin: 10px 0;
          }
          
          .insight-source {
            font-size: 14px;
            color: #666;
            font-style: italic;
          }
          
          .footer {
            margin-top: 40px;
            padding: 20px;
            background: #f5f5f5;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          
          .cta {
            background: #F5793B;
            color: white;
            padding: 15px 30px;
            border-radius: 4px;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="watermark">DEMO MODE</div>
          <h1>${this.escapeHtml(content.businessName)} Social Media Strategy</h1>
          <div class="subtitle">${this.escapeHtml(content.industry)} Industry | Generated ${content.generatedAt.toLocaleDateString()}</div>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>Your Personalized Social Media Posts</h2>
            ${postsHtml}
          </div>
          
          ${insightHtml}
          
          <div class="footer">
            <p>This is a demo of what Persimmon Labs can do for your business.</p>
            <p>Ready to automate your social media strategy?</p>
            <a href="#" class="cta">Get Started Today</a>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  /**
   * Escape HTML to prevent injection
   */
  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    
    return text.replace(/[&<>"']/g, m => map[m]);
  }
  
  /**
   * Close browser
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}