import { NextRequest, NextResponse } from 'next/server';
import { generateAdvancedStrategy } from '@/lib/ai/advanced-content-generator';

export async function POST(request: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await request.formData();
    const dataString = formData.get('data') as string;
    const data = JSON.parse(dataString);
    
    // Extract files if present
    const logo = formData.get('logo') as File | null;
    const sampleImages: File[] = [];
    for (let i = 0; i < 3; i++) {
      const image = formData.get(`image_${i}`) as File | null;
      if (image) sampleImages.push(image);
    }
    
    // Process logo and images if provided
    let logoUrl = null;
    let imageUrls: string[] = [];
    
    if (logo) {
      // In production, upload to cloud storage
      // For demo, create data URL
      const buffer = await logo.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      logoUrl = `data:${logo.type};base64,${base64}`;
    }
    
    for (const image of sampleImages) {
      const buffer = await image.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      imageUrls.push(`data:${image.type};base64,${base64}`);
    }
    
    // Generate comprehensive strategy
    const strategy = await generateAdvancedStrategy({
      ...data,
      logoUrl,
      imageUrls
    });
    
    // Structure for n8n workflow
    const n8nWorkflow = {
      nodes: [
        {
          name: "Webhook Trigger",
          type: "n8n-nodes-base.webhook",
          parameters: {
            path: `${data.brandName.toLowerCase().replace(/\s+/g, '-')}-content`,
            httpMethod: "POST"
          }
        },
        {
          name: "Generate Content",
          type: "n8n-nodes-base.code",
          parameters: {
            jsCode: `
              // Content generation logic
              const brand = $json.brand;
              const strategy = $json.strategy;
              
              // Generate content based on pillars
              const content = strategy.contentPillars.map(pillar => ({
                theme: pillar.theme,
                posts: generatePostsForTheme(pillar)
              }));
              
              return content;
            `
          }
        },
        {
          name: "Google Sheets",
          type: "n8n-nodes-base.googleSheets",
          parameters: {
            operation: "append",
            sheetName: "Content Calendar"
          }
        },
        {
          name: "Schedule Posts",
          type: "n8n-nodes-base.scheduleTrigger",
          parameters: {
            rule: {
              interval: strategy.schedule.optimal_times
            }
          }
        },
        {
          name: "Multi-Platform Publish",
          type: "n8n-nodes-base.switch",
          parameters: {
            rules: data.platforms.map((platform: string) => ({
              platform,
              condition: `$json.platform === '${platform}'`
            }))
          }
        }
      ],
      connections: {
        "Webhook Trigger": {
          main: [["Generate Content"]]
        },
        "Generate Content": {
          main: [["Google Sheets", "Schedule Posts"]]
        },
        "Schedule Posts": {
          main: [["Multi-Platform Publish"]]
        }
      }
    };
    
    return NextResponse.json({
      demoId: crypto.randomUUID(),
      brand: {
        name: data.brandName,
        colors: data.brandColors,
        logoUrl,
        voice: data.brandVoice,
        industry: data.industry
      },
      strategy,
      workflow: n8nWorkflow,
      message: 'Complete content automation strategy generated!'
    });
    
  } catch (error) {
    console.error('Error generating advanced demo:', error);
    return NextResponse.json(
      { error: 'Failed to generate strategy' },
      { status: 500 }
    );
  }
}