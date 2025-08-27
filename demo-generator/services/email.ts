import * as sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';

dotenv.config();

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface DemoEmailData {
  recipientEmail: string;
  recipientName: string;
  businessName: string;
  demoUrl: string;
  pdfAttachment?: Buffer;
}

export class EmailService {
  private initialized = false;
  
  constructor() {
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      this.initialized = true;
    }
  }
  
  /**
   * Send demo delivery email
   */
  async sendDemoEmail(data: DemoEmailData): Promise<EmailResult> {
    // Check if email is disabled for testing
    if (process.env.DISABLE_EMAIL === 'true') {
      return {
        success: true,
        messageId: 'mock-' + Date.now(),
      };
    }
    
    if (!this.initialized) {
      return {
        success: false,
        error: 'SendGrid API key not configured',
      };
    }
    
    try {
      const msg: sgMail.MailDataRequired = {
        to: data.recipientEmail,
        from: {
          email: process.env.SENDGRID_FROM_EMAIL || 'demo@persimmonlabs.io',
          name: 'Persimmon Labs',
        },
        subject: `Your ${data.businessName} Social Media Demo is Ready!`,
        html: this.buildEmailHtml(data),
        text: this.buildEmailText(data),
      };
      
      // Add PDF attachment if provided
      if (data.pdfAttachment) {
        msg.attachments = [
          {
            content: data.pdfAttachment.toString('base64'),
            filename: `${data.businessName.replace(/\s+/g, '-')}-social-strategy.pdf`,
            type: 'application/pdf',
            disposition: 'attachment',
          },
        ];
      }
      
      const [response] = await sgMail.send(msg);
      
      return {
        success: true,
        messageId: response.headers['x-message-id'] as string,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }
  }
  
  /**
   * Build HTML email template
   */
  private buildEmailHtml(data: DemoEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .header {
            background: linear-gradient(135deg, #F5793B 0%, #f79a6b 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          
          .content {
            background: white;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-top: none;
          }
          
          .highlight {
            background: #fff3e0;
            border-left: 4px solid #F5793B;
            padding: 15px;
            margin: 20px 0;
          }
          
          .cta-button {
            display: inline-block;
            background: #F5793B;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
          }
          
          .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
            padding: 20px;
            border-top: 1px solid #e0e0e0;
            margin-top: 30px;
          }
          
          .demo-badge {
            display: inline-block;
            background: #ff9800;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <span class="demo-badge">DEMO MODE</span>
          <h1>Your Social Media Demo is Ready!</h1>
        </div>
        
        <div class="content">
          <p>Hi ${this.escapeHtml(data.recipientName)},</p>
          
          <p>Great news! We've created a personalized social media strategy demo for <strong>${this.escapeHtml(data.businessName)}</strong>.</p>
          
          <div class="highlight">
            <strong>Your demo includes:</strong>
            <ul>
              <li>7 customized social media posts</li>
              <li>3 eye-catching graphics</li>
              <li>1 industry insight with sources</li>
              <li>Complete content calendar</li>
            </ul>
          </div>
          
          <p>This demo shows just a glimpse of what our AI-powered automation can do for your business. Imagine having fresh, engaging content created automatically every day!</p>
          
          <center>
            <a href="${this.escapeHtml(data.demoUrl)}" class="cta-button">View Your Demo</a>
          </center>
          
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>Review your personalized demo</li>
            <li>See how we can save you 10+ hours per week</li>
            <li>Book a free consultation to discuss your needs</li>
          </ul>
          
          <p>Have questions? Reply to this email or book a call with our team.</p>
          
          <p>Best regards,<br>
          The Persimmon Labs Team</p>
        </div>
        
        <div class="footer">
          <p>© 2024 Persimmon Labs | AI-Powered Business Automation</p>
          <p>This is a demo generated for evaluation purposes.</p>
        </div>
      </body>
      </html>
    `;
  }
  
  /**
   * Build plain text email
   */
  private buildEmailText(data: DemoEmailData): string {
    return `
Hi ${data.recipientName},

Great news! We've created a personalized social media strategy demo for ${data.businessName}.

YOUR DEMO INCLUDES:
• 7 customized social media posts
• 3 eye-catching graphics  
• 1 industry insight with sources
• Complete content calendar

This demo shows just a glimpse of what our AI-powered automation can do for your business.

View Your Demo: ${data.demoUrl}

WHAT HAPPENS NEXT?
1. Review your personalized demo
2. See how we can save you 10+ hours per week
3. Book a free consultation to discuss your needs

Have questions? Reply to this email or book a call with our team.

Best regards,
The Persimmon Labs Team

---
© 2024 Persimmon Labs | AI-Powered Business Automation
This is a demo generated for evaluation purposes.
    `.trim();
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
   * Send follow-up email
   */
  async sendFollowUpEmail(
    recipientEmail: string, 
    businessName: string, 
    daysSinceSent: number
  ): Promise<EmailResult> {
    if (!this.initialized) {
      return {
        success: false,
        error: 'SendGrid API key not configured',
      };
    }
    
    try {
      const msg: sgMail.MailDataRequired = {
        to: recipientEmail,
        from: {
          email: process.env.SENDGRID_FROM_EMAIL || 'demo@persimmonlabs.io',
          name: 'Persimmon Labs',
        },
        subject: `Quick question about your ${businessName} demo`,
        html: `
          <p>Hi there,</p>
          <p>I noticed you checked out the social media demo we created for ${businessName} ${daysSinceSent} days ago.</p>
          <p>Did you have any questions about how we can help automate your social media strategy?</p>
          <p>I'd love to show you how other businesses in your industry are saving 10+ hours per week with our automation.</p>
          <p>Reply to this email or <a href="https://calendly.com/persimmonlabs">book a quick 15-minute call</a> to learn more.</p>
          <p>Best,<br>The Persimmon Labs Team</p>
        `,
        text: `Hi there,

I noticed you checked out the social media demo we created for ${businessName} ${daysSinceSent} days ago.

Did you have any questions about how we can help automate your social media strategy?

I'd love to show you how other businesses in your industry are saving 10+ hours per week with our automation.

Reply to this email or book a quick call at https://calendly.com/persimmonlabs

Best,
The Persimmon Labs Team`,
      };
      
      const [response] = await sgMail.send(msg);
      
      return {
        success: true,
        messageId: response.headers['x-message-id'] as string,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to send follow-up email',
      };
    }
  }
}