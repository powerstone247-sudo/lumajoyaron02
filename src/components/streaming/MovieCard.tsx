'use client';

import React, { useState } from 'react';
import { Content } from '@/lib/streaming-data';
import { Tag, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  content: Content;
  onClick: (content: Content) => void;
  variant?: 'default' | 'tube';
}

export default function MovieCard({ content, onClick, variant = 'default' }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Tube variant - square thumbnails for short content
  if (variant === 'tube') {
    return (
      <div
        className="relative flex-shrink-0 w-32 md:w-40 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(content)}
      >
        <div className="relative aspect-square rounded-xl overflow-hidden border border-blue-800/30">
          <img
            src={content.thumbnail}
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          {/* Duration badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-black/60 text-white text-[10px] px-1.5 py-0.5 backdrop-blur">
              {content.duration}
            </Badge>
          </div>

          {/* Play overlay on hover */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="w-12 h-12 rounded-full bg-blue-600/90 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Content info */}
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <h3 className="text-white text-xs md:text-sm font-medium line-clamp-2">{content.title}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Tag className="w-3 h-3 text-blue-400 fill-blue-400/20" />
              <span className="text-blue-300 text-xs font-bold">{content.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card for movies and series
  return (
    <div
      className="relative flex-shrink-0 w-32 md:w-44 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(content)}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-blue-800/30">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {/* Price badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-blue-600/80 backdrop-blur rounded-md px-1.5 py-0.5">
          <Tag className="w-3 h-3 text-white fill-white/20" />
          <span className="text-white text-xs font-bold">{content.price}</span>
        </div>

        {/* Year badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-blue-600/80 text-white text-[10px] px-1.5 py-0.5 backdrop-blur">
            {content.year}
          </Badge>
        </div>

        {/* Play overlay on hover */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="w-14 h-14 rounded-full bg-blue-600/90 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-blue-600/50">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Content info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
          <h3 className="text-white text-xs md:text-sm font-semibold line-clamp-2 mb-1">{content.title}</h3>
          
          <div className="flex items-center gap-1 flex-wrap">
            {content.genre.slice(0, 2).map((g, i) => (
              <Badge key={i} variant="outline" className="text-[9px] px-1 py-0 border-blue-500/30 text-blue-300 bg-blue-900/20">
                {g}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
