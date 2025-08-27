import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

interface InstagramPreviewProps {
  content: {
    brandName: string;
    caption: string;
    hashtags: string[];
    imageUrl?: string;
  };
}

export function InstagramPreview({ content }: InstagramPreviewProps) {
  // Format caption with line breaks preserved
  const formattedCaption = content.caption.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < content.caption.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className="instagram-preview bg-white rounded-lg shadow-xl max-w-sm w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-[2px]">
            <div className="w-full h-full bg-white rounded-full p-[2px]">
              <div className="w-full h-full bg-gradient-to-tr from-persimmon-coral to-persimmon-orange rounded-full" />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-semibold text-sm text-gray-900">{content.brandName.toLowerCase().replace(/\s+/g, '')}</div>
            <div className="text-xs text-gray-500">Sponsored</div>
          </div>
        </div>
        <button className="p-1">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {/* Image placeholder */}
      <div className="aspect-square bg-gradient-to-br from-persimmon-coral/20 to-persimmon-orange/20 flex items-center justify-center">
        {content.imageUrl ? (
          <img src={content.imageUrl} alt="Post" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-r from-persimmon-coral to-persimmon-orange rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {content.brandName.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-gray-500 text-sm">Your image here</p>
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button className="hover:opacity-60 transition-opacity">
              <Heart className="w-6 h-6 text-gray-700" />
            </button>
            <button className="hover:opacity-60 transition-opacity">
              <MessageCircle className="w-6 h-6 text-gray-700" />
            </button>
            <button className="hover:opacity-60 transition-opacity">
              <Send className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <button className="hover:opacity-60 transition-opacity">
            <Bookmark className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        
        {/* Likes */}
        <div className="font-semibold text-sm text-gray-900 mb-2">
          1,234 likes
        </div>
        
        {/* Caption */}
        <div className="text-sm text-gray-900">
          <span className="font-semibold mr-2">{content.brandName.toLowerCase().replace(/\s+/g, '')}</span>
          <span className="whitespace-pre-wrap">{formattedCaption}</span>
        </div>
        
        {/* Hashtags */}
        {content.hashtags.length > 0 && (
          <div className="mt-2 text-sm">
            {content.hashtags.map((tag, i) => (
              <span key={i} className="text-blue-900 mr-2">
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}
        
        {/* Time */}
        <div className="text-xs text-gray-500 mt-2 uppercase">
          2 hours ago
        </div>
      </div>
      
      {/* Comment input */}
      <div className="border-t border-gray-100 p-3">
        <div className="flex items-center text-sm">
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="flex-1 outline-none text-gray-600"
            disabled
          />
          <button className="text-blue-500 font-semibold ml-2 opacity-50">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}