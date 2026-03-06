'use client';

import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Content } from '@/lib/streaming-data';

interface HeroBannerProps {
  content: Content;
  onWatchTrailer: (content: Content) => void;
  onAccessNow: (content: Content) => void;
}

export default function HeroBanner({ content, onWatchTrailer, onAccessNow }: HeroBannerProps) {
  return (
    <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a15] via-[#050a15]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-transparent to-[#050a15]/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-4 md:px-12 lg:px-20 max-w-3xl">
        {/* Featured badge */}
        <div className="mb-3">
          <Badge className="bg-blue-600 text-white text-xs font-medium">
            ⭐ FEATURED
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
          {content.title}
        </h1>

        {/* Meta info */}
        <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4 flex-wrap">
          <div className="flex items-center gap-1 bg-yellow-500/20 rounded-md px-2 py-0.5">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm">{content.rating}</span>
          </div>
          <span className="text-blue-300 text-sm">{content.year}</span>
          <span className="text-blue-300 text-sm hidden sm:inline">{content.duration}</span>
          <Badge variant="outline" className="border-blue-500/50 text-blue-300 text-xs">
            HD
          </Badge>
        </div>

        {/* Genres */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {content.genre.map((g, i) => (
            <Badge key={i} variant="secondary" className="bg-blue-900/50 text-blue-200 text-xs border border-blue-700/30">
              {g}
            </Badge>
          ))}
        </div>

        {/* Description */}
        <p className="text-white/80 text-sm md:text-base lg:text-lg mb-6 line-clamp-3 md:line-clamp-4 max-w-2xl">
          {content.description}
        </p>

        {/* Action buttons */}
        <div className="flex gap-3 md:gap-4">
          <Button
            size="lg"
            onClick={() => onAccessNow(content)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm md:text-base px-6 md:px-8"
          >
            <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 fill-white" />
            Watch Now
          </Button>
          <Button
            size="lg"
            onClick={() => onWatchTrailer(content)}
            variant="outline"
            className="border-blue-500/50 text-white hover:bg-blue-900/30 text-sm md:text-base px-6 md:px-8"
          >
            <Info className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Trailer
          </Button>
        </div>
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050a15] to-transparent" />
    </div>
  );
}
