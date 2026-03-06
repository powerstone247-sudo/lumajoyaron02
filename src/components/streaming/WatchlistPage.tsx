'use client';

import React from 'react';
import { ArrowLeft, Heart, Play, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Content } from '@/lib/streaming-data';
import { cn } from '@/lib/utils';

interface WatchlistPageProps {
  watchlist: Content[];
  onBack: () => void;
  onRemove: (content: Content) => void;
  onContentClick: (content: Content) => void;
}

export default function WatchlistPage({ 
  watchlist, 
  onBack, 
  onRemove, 
  onContentClick 
}: WatchlistPageProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[#050a15] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#050a15]/95 backdrop-blur-lg border-b border-blue-800/30">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-blue-900/30"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-white text-xl md:text-2xl font-bold flex items-center gap-2">
              <Heart className="w-6 h-6 text-blue-400" />
              My Watchlist
            </h1>
          </div>
          <span className="text-blue-400 text-sm">
            {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
        {watchlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-blue-400/30 mx-auto mb-4" />
            <h2 className="text-white text-xl font-semibold mb-2">Your watchlist is empty</h2>
            <p className="text-blue-400/60 mb-6">Start adding movies and shows you want to watch!</p>
            <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700 text-white">
              Browse Content
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {watchlist.map((content) => (
              <WatchlistItem
                key={content.id}
                content={content}
                onRemove={() => onRemove(content)}
                onClick={() => onContentClick(content)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WatchlistItem({ 
  content, 
  onRemove, 
  onClick 
}: { 
  content: Content; 
  onRemove: () => void; 
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-blue-800/30" onClick={onClick}>
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {/* Price */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-blue-600/80 backdrop-blur rounded-md px-1.5 py-0.5">
          <Tag className="w-3 h-3 text-white fill-white/20" />
          <span className="text-white text-xs font-bold">{content.price}</span>
        </div>

        {/* Play overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="w-14 h-14 rounded-full bg-blue-600/90 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-blue-600/50">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Content info */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <h3 className="text-white text-xs md:text-sm font-semibold line-clamp-2">{content.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-300">
              {content.type === 'movie' ? 'Movie' : content.type === 'series' ? 'Series' : 'Short'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute -top-2 -right-2 h-7 w-7 bg-red-600 hover:bg-red-700 text-white rounded-full"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
