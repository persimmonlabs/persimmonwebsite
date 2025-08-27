import React from 'react';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe } from 'lucide-react';

interface FacebookPreviewProps {
  content: {
    brandName: string;
    caption: string;
    hashtags: string[];
    imageUrl?: string;
  };
}

export function FacebookPreview({ content }: FacebookPreviewProps) {
  // Format caption with hashtags
  const fullText = content.hashtags.length > 0 
    ? `${content.caption}\n\n${content.hashtags.map(tag => tag.startsWith('#') ? tag : `#${tag}`).join(' ')}`
    : content.caption;
    
  // Format text with line breaks preserved and hashtags highlighted
  const formattedText = fullText.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line.split(' ').map((word, j) => {
        // Highlight hashtags
        if (word.startsWith('#')) {
          return (
            <span key={`${i}-${j}`} className="text-blue-600 hover:underline cursor-pointer">
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
    <div className="facebook-preview bg-white rounded-lg shadow-xl max-w-lg w-full">
      {/* Post header */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {content.brandName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <div className="flex items-center">
                <span className="font-semibold text-gray-900 text-sm">{content.brandName}</span>
                <svg className="w-4 h-4 ml-1 text-blue-600 fill-current" viewBox="0 0 20 20">
                  <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <span>2h</span>
                <span className="mx-1">·</span>
                <Globe className="w-3 h-3" />
              </div>
            </div>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Post content */}
      <div className="px-4 pb-3">
        <div className="text-gray-900 text-sm leading-relaxed">
          {formattedText}
        </div>
      </div>
      
      {/* Image placeholder */}
      {(content.imageUrl || true) && (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200">
          {content.imageUrl ? (
            <img src={content.imageUrl} alt="Post" className="w-full object-cover" />
          ) : (
            <div className="aspect-[2/1] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {content.brandName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">Your content here</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Reactions bar */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center">
            <div className="flex -space-x-1 mr-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <ThumbsUp className="w-3 h-3 text-white fill-white" />
              </div>
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                <span style={{ fontSize: '10px' }}>❤️</span>
              </div>
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                <span style={{ fontSize: '10px' }}>😊</span>
              </div>
            </div>
            <span>342</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>45 comments</span>
            <span>12 shares</span>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="border-t border-gray-200">
        <div className="flex items-center justify-around py-1">
          <button className="flex items-center justify-center space-x-2 flex-1 py-2 hover:bg-gray-100 transition-colors">
            <ThumbsUp className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Like</span>
          </button>
          <button className="flex items-center justify-center space-x-2 flex-1 py-2 hover:bg-gray-100 transition-colors">
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Comment</span>
          </button>
          <button className="flex items-center justify-center space-x-2 flex-1 py-2 hover:bg-gray-100 transition-colors">
            <Share2 className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Share</span>
          </button>
        </div>
      </div>
      
      {/* Comment input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
            <input 
              type="text" 
              placeholder="Write a comment..." 
              className="bg-transparent outline-none text-sm text-gray-600 w-full"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}