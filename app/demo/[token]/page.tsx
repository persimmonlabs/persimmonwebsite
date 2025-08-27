import { notFound } from 'next/navigation';
import prisma from '@/lib/db/prisma';
import { InstagramPreview } from '@/components/previews/InstagramPreview';
import { LinkedInPreview } from '@/components/previews/LinkedInPreview';
import { TwitterPreview } from '@/components/previews/TwitterPreview';
import { FacebookPreview } from '@/components/previews/FacebookPreview';
import { Button } from '@/components/Button';
import { Copy, Download, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

async function getDemo(token: string) {
  if (!prisma || !process.env.DATABASE_URL) {
    return null;
  }
  
  try {
    const demo = await prisma.demo.findUnique({
      where: { publicToken: token },
      include: {
        results: {
          orderBy: [
            { platform: 'asc' },
            { variantIndex: 'asc' }
          ]
        }
      }
    });
    
    return demo;
  } catch (error) {
    console.error('Error fetching demo:', error);
    return null;
  }
}

export default async function DemoPage({ params }: { params: { token: string } }) {
  const demo = await getDemo(params.token);
  
  if (!demo) {
    notFound();
  }
  
  // Group results by platform
  const contentByPlatform = demo.results.reduce((acc, result) => {
    if (!acc[result.platform]) {
      acc[result.platform] = [];
    }
    acc[result.platform].push({
      caption: result.caption,
      hashtags: result.hashtags,
      cta: result.cta || undefined
    });
    return acc;
  }, {} as Record<string, Array<{ caption: string; hashtags: string[]; cta?: string }>>);
  
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Persimmon Labs</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
              <Button size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Book Demo Call
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Your AI-Generated Content for{' '}
            <span className="bg-gradient-to-r from-persimmon-coral to-persimmon-orange bg-clip-text text-transparent">
              {demo.brandName}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Generated on {new Date(demo.createdAt).toLocaleDateString()} • {demo.tone} tone • {demo.industry} industry
          </p>
        </div>
        
        {/* Platforms */}
        <div className="space-y-16">
          {Object.entries(contentByPlatform).map(([platform, variants]) => (
            <div key={platform} className="border border-gray-800 rounded-2xl p-8 bg-gray-900/50">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white capitalize">
                  {platform} Content
                </h2>
                <div className="text-sm text-gray-400">
                  {variants.length} variants generated
                </div>
              </div>
              
              {/* Variants */}
              <div className="space-y-8">
                {variants.map((variant, index) => (
                  <div key={index} className="flex flex-col lg:flex-row gap-8">
                    {/* Preview */}
                    <div className="flex-1 flex justify-center items-start bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6">
                      {platform === 'instagram' && (
                        <InstagramPreview 
                          content={{
                            brandName: demo.brandName,
                            caption: variant.caption,
                            hashtags: variant.hashtags,
                            imageUrl: undefined
                          }}
                        />
                      )}
                      {platform === 'linkedin' && (
                        <LinkedInPreview 
                          content={{
                            brandName: demo.brandName,
                            caption: variant.caption,
                            hashtags: variant.hashtags,
                            imageUrl: undefined
                          }}
                        />
                      )}
                      {platform === 'twitter' && (
                        <TwitterPreview 
                          content={{
                            brandName: demo.brandName,
                            caption: variant.caption,
                            hashtags: variant.hashtags,
                            imageUrl: undefined
                          }}
                        />
                      )}
                      {platform === 'facebook' && (
                        <FacebookPreview 
                          content={{
                            brandName: demo.brandName,
                            caption: variant.caption,
                            hashtags: variant.hashtags,
                            imageUrl: undefined
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Content for copying */}
                    <div className="lg:w-96">
                      <div className="bg-gray-800 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-semibold text-gray-300">Variant {index + 1}</h4>
                          <button
                            onClick={() => {
                              const fullContent = variant.cta 
                                ? `${variant.caption}\n\n${variant.cta}\n\n${variant.hashtags.join(' ')}`
                                : `${variant.caption}\n\n${variant.hashtags.join(' ')}`;
                              navigator.clipboard.writeText(fullContent);
                            }}
                            className="p-2 hover:bg-gray-700 rounded transition-colors group"
                          >
                            <Copy className="w-4 h-4 text-gray-400 group-hover:text-white" />
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Caption</p>
                            <p className="text-sm text-gray-200 whitespace-pre-wrap">
                              {variant.caption}
                            </p>
                          </div>
                          
                          {variant.cta && (
                            <div>
                              <p className="text-xs text-gray-500 mb-2">Call to Action</p>
                              <p className="text-sm text-persimmon-coral">
                                {variant.cta}
                              </p>
                            </div>
                          )}
                          
                          {variant.hashtags.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-2">Hashtags</p>
                              <p className="text-sm text-blue-400">
                                {variant.hashtags.map(tag => 
                                  tag.startsWith('#') ? tag : `#${tag}`
                                ).join(' ')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-persimmon-coral/10 to-persimmon-orange/10 rounded-2xl border border-persimmon-coral/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ready to Automate Your Content Creation?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              This demo shows just a fraction of what Persimmon Labs can do. 
              Get content like this generated and posted automatically every day across all your platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Strategy Call
              </Button>
              <Button size="lg" variant="secondary">
                Start 7-Day Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}