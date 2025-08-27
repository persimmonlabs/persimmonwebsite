import React from 'react';

interface DemoResultsEmailProps {
  brandName: string;
  shareableLink: string;
  platforms: string[];
  content: Array<{
    platform: string;
    variants: Array<{
      caption: string;
      hashtags: string[];
      cta?: string;
    }>;
  }>;
}

export function DemoResultsEmail({ 
  brandName, 
  shareableLink, 
  platforms,
  content 
}: DemoResultsEmailProps) {
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#ffffff',
    },
    header: {
      backgroundColor: '#000000',
      padding: '30px',
      borderRadius: '8px 8px 0 0',
      textAlign: 'center' as const,
    },
    logo: {
      color: '#F5793B',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    title: {
      color: '#ffffff',
      fontSize: '28px',
      fontWeight: 'bold',
      margin: '20px 0 10px',
    },
    subtitle: {
      color: '#999999',
      fontSize: '16px',
      margin: '0',
    },
    body: {
      backgroundColor: '#f8f8f8',
      padding: '30px',
      borderRadius: '0 0 8px 8px',
    },
    section: {
      backgroundColor: '#ffffff',
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
    },
    platformTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: '15px',
      textTransform: 'capitalize' as const,
    },
    variantBox: {
      backgroundColor: '#f8f8f8',
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '6px',
      border: '1px solid #e8e8e8',
    },
    caption: {
      fontSize: '14px',
      lineHeight: '1.6',
      color: '#555555',
      marginBottom: '10px',
      whiteSpace: 'pre-wrap' as const,
    },
    hashtags: {
      fontSize: '13px',
      color: '#1DA1F2',
      marginTop: '8px',
    },
    cta: {
      fontSize: '14px',
      color: '#F5793B',
      fontWeight: 'bold',
      marginTop: '10px',
    },
    button: {
      display: 'inline-block',
      padding: '14px 28px',
      backgroundColor: '#F5793B',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '16px',
      margin: '10px 5px',
    },
    secondaryButton: {
      display: 'inline-block',
      padding: '14px 28px',
      backgroundColor: '#ffffff',
      color: '#F5793B',
      textDecoration: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '16px',
      border: '2px solid #F5793B',
      margin: '10px 5px',
    },
    ctaSection: {
      textAlign: 'center' as const,
      padding: '30px 20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      marginTop: '30px',
      border: '2px solid #F5793B',
    },
    footer: {
      textAlign: 'center' as const,
      padding: '30px 20px',
      color: '#999999',
      fontSize: '12px',
      lineHeight: '1.6',
    },
    footerLink: {
      color: '#F5793B',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>Persimmon Labs</div>
        <h1 style={styles.title}>
          Your AI Content for {brandName} is Ready! 🎉
        </h1>
        <p style={styles.subtitle}>
          We've generated amazing content for {platforms.length} platform{platforms.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Body */}
      <div style={styles.body}>
        <p style={{ fontSize: '16px', color: '#333333', marginBottom: '20px' }}>
          Hi there! 👋
        </p>
        <p style={{ fontSize: '16px', color: '#555555', lineHeight: '1.6', marginBottom: '30px' }}>
          Great news! We've successfully generated custom social media content for <strong>{brandName}</strong> 
          using our AI technology. Each piece has been carefully crafted to match your brand voice and engage 
          your target audience.
        </p>

        {/* Platform Content Preview */}
        <h2 style={{ fontSize: '20px', color: '#333333', marginBottom: '20px' }}>
          📱 Your Content Preview
        </h2>
        
        {content.slice(0, 2).map((platformContent) => (
          <div key={platformContent.platform} style={styles.section}>
            <h3 style={styles.platformTitle}>
              {platformContent.platform} Content
            </h3>
            {platformContent.variants.slice(0, 1).map((variant, idx) => (
              <div key={idx} style={styles.variantBox}>
                <p style={styles.caption}>
                  {variant.caption.substring(0, 200)}
                  {variant.caption.length > 200 ? '...' : ''}
                </p>
                {variant.hashtags.length > 0 && (
                  <p style={styles.hashtags}>
                    {variant.hashtags.slice(0, 3).map(tag => 
                      tag.startsWith('#') ? tag : `#${tag}`
                    ).join(' ')}
                  </p>
                )}
                {variant.cta && (
                  <p style={styles.cta}>{variant.cta}</p>
                )}
              </div>
            ))}
            <p style={{ fontSize: '13px', color: '#999999', marginTop: '10px' }}>
              + {platformContent.variants.length - 1} more variant{platformContent.variants.length > 2 ? 's' : ''} available
            </p>
          </div>
        ))}

        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <h2 style={{ fontSize: '22px', color: '#333333', marginBottom: '10px' }}>
            🚀 Ready to See Everything?
          </h2>
          <p style={{ fontSize: '16px', color: '#666666', marginBottom: '20px' }}>
            View all your generated content, download it, and start posting!
          </p>
          <div>
            <a href={shareableLink} style={styles.button}>
              View All Content
            </a>
          </div>
          <p style={{ fontSize: '14px', color: '#999999', marginTop: '20px' }}>
            This link will remain active for 30 days
          </p>
        </div>

        {/* What's Next Section */}
        <div style={{ ...styles.section, marginTop: '30px', backgroundColor: '#FFF8F5' }}>
          <h3 style={{ fontSize: '18px', color: '#333333', marginBottom: '15px' }}>
            💡 Want This Every Day on Autopilot?
          </h3>
          <p style={{ fontSize: '15px', color: '#666666', lineHeight: '1.6', marginBottom: '15px' }}>
            Imagine waking up to fresh, engaging content ready to post across all your platforms. 
            No more creative blocks, no more time wasted writing captions.
          </p>
          <ul style={{ fontSize: '15px', color: '#666666', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>✅ 100+ posts generated monthly</li>
            <li>✅ Automatic scheduling & posting</li>
            <li>✅ Consistent brand voice</li>
            <li>✅ Performance analytics</li>
          </ul>
          <div style={{ textAlign: 'center' as const, marginTop: '20px' }}>
            <a href="https://calendly.com/persimmon-labs/demo" style={styles.button}>
              Book Your Strategy Call
            </a>
            <a href={`${shareableLink}?action=trial`} style={styles.secondaryButton}>
              Start Free Trial
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>
          © 2024 Persimmon Labs. All rights reserved.
        </p>
        <p>
          Questions? Reply to this email or contact us at{' '}
          <a href="mailto:hello@persimmonlabs.io" style={styles.footerLink}>
            hello@persimmonlabs.io
          </a>
        </p>
        <p style={{ marginTop: '15px' }}>
          <a href="https://persimmonlabs.io/privacy" style={styles.footerLink}>
            Privacy Policy
          </a>
          {' • '}
          <a href="https://persimmonlabs.io/terms" style={styles.footerLink}>
            Terms of Service
          </a>
        </p>
        <p style={{ marginTop: '15px', fontSize: '11px' }}>
          You received this email because you requested a content demo at persimmonlabs.io
        </p>
      </div>
    </div>
  );
}