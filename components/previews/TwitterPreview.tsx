import React from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bookmark, BarChart3 } from 'lucide-react';

interface TwitterPreviewProps {
  content: {
    brandName: string;
    caption: string;
    hashtags: string[];
    imageUrl?: string;
  };
}

export function TwitterPreview({ content }: TwitterPreviewProps) {
  // Combine caption and hashtags for Twitter's character limit
  const fullText = content.hashtags.length > 0 
    ? `${content.caption}\n\n${content.hashtags.map(tag => tag.startsWith('#') ? tag : `#${tag}`).join(' ')}`
    : content.caption;
  
  // Format text with line breaks preserved
  const formattedText = fullText.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line.split(' ').map((word, j) => {
        // Highlight hashtags and mentions
        if (word.startsWith('#') || word.startsWith('@')) {
          return (
            <span key={`${i}-${j}`} className="text-blue-500 hover:underline cursor-pointer">
              {word}{' '}
            </span>
          );
        }
        return <span key={`${i}-${j}`}>{word} </span>;
      })}
      {i < fullText.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className="twitter-preview bg-white rounded-lg shadow-xl max-w-lg w-full border border-gray-200">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                {content.brandName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <div className="flex items-center">
                <span className="font-bold text-gray-900">{content.brandName}</span>
                <svg className="w-4 h-4 ml-1 text-blue-500 fill-current" viewBox="0 0 20 20">
                  <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
              </div>
              <div className="text-gray-500 text-sm">
                @{content.brandName.toLowerCase().replace(/\s+/g, '')} · 2h
              </div>
            </div>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Tweet content */}
        <div className="text-gray-900 text-[15px] leading-normal mb-3">
          {formattedText}
        </div>
        
        {/* Image placeholder (if provided) */}
        {content.imageUrl && (
          <div className="rounded-2xl overflow-hidden mb-3 border border-gray-200">
            <img src={content.imageUrl} alt="Tweet media" className="w-full object-cover" />
          </div>
        )}
        
        {/* Tweet info */}
        <div className="text-gray-500 text-sm mb-3">
          <span>10:32 AM · Oct 28, 2024 · </span>
          <span className="text-gray-900 font-semibold">1.2M</span>
          <span> Views</span>
        </div>
        
        {/* Engagement stats */}
        <div className="py-3 border-t border-b border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900">423</span>
              <span className="text-gray-500">Reposts</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900">89</span>
              <span className="text-gray-500">Quotes</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900">2.1K</span>
              <span className="text-gray-500">Likes</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900">156</span>
              <span className="text-gray-500">Bookmarks</span>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="pt-2">
          <div className="flex items-center justify-around">
            <button className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors group">
              <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
            </button>
            <button className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors group">
              <Repeat2 className="w-5 h-5 text-gray-600 group-hover:text-green-500" />
            </button>
            <button className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors group">
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
            </button>
            <button className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors group">
              <BarChart3 className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
            </button>
            <div className="flex items-center">
              <button className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
              <button className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}