'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Content } from '@/lib/streaming-data';
import MovieCard from './MovieCard';
import { cn } from '@/lib/utils';

interface CatalogSectionProps {
  title: string;
  contents: Content[];
  variant?: 'default' | 'tube';
  onContentClick: (content: Content) => void;
  id?: string;
}

export default function CatalogSection({
  title,
  contents,
  variant = 'default',
  onContentClick,
  id
}: CatalogSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = variant === 'tube' ? 300 : 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id={id} className="py-1 md:py-2">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 md:px-8 mb-2 md:mb-3 mt-3 md:mt-4">
        <h2 className="text-white text-lg md:text-xl font-bold flex items-center gap-2">
          {title}
        </h2>
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="text-white hover:bg-blue-900/30 h-8 w-8 border border-blue-800/30"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="text-white hover:bg-blue-900/30 h-8 w-8 border border-blue-800/30"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content Scroll */}
      <div className="relative">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#050a15] to-transparent z-10 pointer-events-none hidden md:block" />
        
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#050a15] to-transparent z-10 pointer-events-none hidden md:block" />

        <div
          ref={scrollRef}
          className={cn(
            "flex gap-2 md:gap-3 overflow-x-auto px-4 md:px-8 pb-2 hide-scrollbar",
            "scroll-smooth snap-x snap-mandatory"
          )}
        >
          {contents.map((content) => (
            <div key={content.id} className="snap-start">
              <MovieCard
                content={content}
                variant={variant}
                onClick={onContentClick}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
