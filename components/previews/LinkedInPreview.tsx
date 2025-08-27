import React from 'react';
import { ThumbsUp, MessageCircle, Share2, Send, MoreHorizontal } from 'lucide-react';

interface LinkedInPreviewProps {
  content: {
    brandName: string;
    caption: string;
    hashtags: string[];
    imageUrl?: string;
  };
}

export function LinkedInPreview({ content }: LinkedInPreviewProps) {
  // Format caption with line breaks preserved
  const formattedCaption = content.caption.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < content.caption.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className="linkedin-preview bg-white rounded-lg shadow-xl max-w-lg w-full border border-gray-200">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                {content.brandName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <div className="font-semibold text-sm text-gray-900">{content.brandName}</div>
              <div className="text-xs text-gray-500">Company • Technology</div>
              <div className="text-xs text-gray-500 flex items-center mt-1">
                <span>2h</span>
                <span className="mx-1">•</span>
                <svg className="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
          <button className="p-1">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-4 pb-3">
        <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
          {formattedCaption}
        </div>
        
        {/* Hashtags */}
        {content.hashtags.length > 0 && (
          <div className="mt-3 text-sm">
            {content.hashtags.map((tag, i) => (
              <span key={i} className="text-blue-600 mr-2 hover:underline cursor-pointer">
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Image placeholder (if provided) */}
      {content.imageUrl || true ? (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200">
          {content.imageUrl ? (
            <img src={content.imageUrl} alt="Post" className="w-full object-cover" />
          ) : (
            <div className="aspect-[2/1] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {content.brandName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">Professional visual content</p>
              </div>
            </div>
          )}
        </div>
      ) : null}
      
      {/* Reactions */}
      <div className="px-4 py-2 border-t border-b border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-2 h-2 text-white fill-white" />
              </div>
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white" style={{ fontSize: '8px' }}>❤️</span>
              </div>
              <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white" style={{ fontSize: '8px' }}>👏</span>
              </div>
            </div>
            <span className="ml-2">247</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>32 comments</span>
            <span>•</span>
            <span>8 reposts</span>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-around">
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded transition-colors">
            <ThumbsUp className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Like</span>
          </button>
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded transition-colors">
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Comment</span>
          </button>
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded transition-colors">
            <Share2 className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Repost</span>
          </button>
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded transition-colors">
            <Send className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}