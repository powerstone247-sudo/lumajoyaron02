'use client';

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Star, Play, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Content, tvSeries, featuredFilms } from '@/lib/streaming-data';
import { cn } from '@/lib/utils';

interface CategoryPageProps {
  type: 'series' | 'movies';
  onBack: () => void;
  onContentClick: (content: Content) => void;
}

export default function CategoryPage({ type, onBack, onContentClick }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const content = type === 'series' ? tvSeries : featuredFilms;
  const title = type === 'series' ? 'TV Series' : 'Movies';
  const icon = type === 'series' ? '📺' : '🎬';

  const sortedContent = useMemo(() => {
    const sorted = [...content];
    if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      sorted.sort((a, b) => b.year - a.year);
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  }, [content, sortBy]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050a15] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#050a15]/95 backdrop-blur-lg border-b border-blue-800/30">
        <div className="px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-white hover:bg-blue-900/30"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-white text-xl md:text-2xl font-bold">
                  {icon} {title}
                </h1>
                <p className="text-blue-400/60 text-sm">
                  {content.length} titles available
                </p>
              </div>
            </div>

            {/* View and Sort Controls */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 bg-blue-900/30 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "h-8 w-8 p-0",
                    viewMode === 'grid' ? "bg-blue-600 text-white" : "text-blue-400"
                  )}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "h-8 w-8 p-0",
                    viewMode === 'list' ? "bg-blue-600 text-white" : "text-blue-400"
                  )}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-1 bg-blue-900/30 rounded-lg p-1">
                <Filter className="h-4 w-4 text-blue-400 ml-2" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'rating' | 'year' | 'title')}
                  className="bg-transparent text-blue-300 text-sm border-none outline-none cursor-pointer py-1 pr-2"
                >
                  <option value="rating" className="bg-[#0a1628]">Top Rated</option>
                  <option value="year" className="bg-[#0a1628]">Newest</option>
                  <option value="title" className="bg-[#0a1628]">A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {sortedContent.map((item) => (
              <CategoryCard
                key={item.id}
                content={item}
                onClick={() => onContentClick(item)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedContent.map((item) => (
              <CategoryListItem
                key={item.id}
                content={item}
                onClick={() => onContentClick(item)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Grid Card Component
function CategoryCard({ content, onClick }: { content: Content; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-blue-800/30 shadow-lg">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Rating */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur rounded-md px-1.5 py-0.5">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-medium">{content.rating}</span>
        </div>

        {/* Year badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-blue-600/80 text-white text-[10px] px-1.5 py-0.5 backdrop-blur">
            {content.year}
          </Badge>
        </div>

        {/* Type badge */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <Badge className="bg-black/60 text-white text-[9px] px-1.5 py-0.5 backdrop-blur">
            {content.type === 'movie' ? 'MOVIE' : 'SERIES'}
          </Badge>
        </div>

        {/* Play overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="w-14 h-14 rounded-full bg-blue-600/90 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-blue-600/50">
            <Play className="w-7 h-7 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Content info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white text-sm font-semibold line-clamp-2 mb-1">{content.title}</h3>
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

// List Item Component
function CategoryListItem({ content, onClick }: { content: Content; onClick: () => void }) {
  return (
    <div
      className="flex gap-4 p-4 bg-blue-900/20 rounded-xl border border-blue-800/30 cursor-pointer hover:bg-blue-900/30 transition-colors group"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative w-24 md:w-32 flex-shrink-0">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
          <img
            src={content.thumbnail}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
            <div className="w-10 h-10 rounded-full bg-blue-600/90 flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-white text-lg font-semibold line-clamp-1">{content.title}</h3>
          <Badge className="bg-blue-600/80 text-white text-xs flex-shrink-0">
            {content.type === 'movie' ? 'MOVIE' : 'SERIES'}
          </Badge>
        </div>

        <div className="flex items-center gap-3 mb-2 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white">{content.rating}</span>
          </div>
          <span className="text-blue-400/60">{content.year}</span>
          {content.type === 'series' && content.seasons && (
            <span className="text-blue-400/60">{content.seasons} Seasons</span>
          )}
        </div>

        <p className="text-blue-300/70 text-sm line-clamp-2 mb-2">{content.description}</p>

        <div className="flex items-center gap-2 flex-wrap">
          {content.genre.map((g, i) => (
            <Badge key={i} variant="outline" className="text-[10px] px-2 py-0.5 border-blue-500/30 text-blue-300 bg-blue-900/20">
              {g}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
