'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Search, X, Tag, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Content, allContent, trendingNow, featuredFilms, tvSeries, tubeItNow } from '@/lib/streaming-data';
import { cn } from '@/lib/utils';

interface SearchPageProps {
  onBack: () => void;
  onContentClick: (content: Content) => void;
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'trending', label: 'Trending' },
  { id: 'featured', label: 'Movies' },
  { id: 'series', label: 'TV Series' },
  { id: 'tube', label: 'Shorts' },
];

// Helper function to load recent searches
function loadRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('lumajoyaron-recent-searches');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return [];
}

export default function SearchPage({ onBack, onContentClick }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => loadRecentSearches());
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitializedRef = useRef(false);

  // Focus input on mount (only once)
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      inputRef.current?.focus();
    }
  }, []);

  // Calculate filtered results
  const getFilteredResults = (): Content[] => {
    let filtered = [...allContent];

    // Filter by category
    if (selectedCategory === 'trending') {
      filtered = trendingNow;
    } else if (selectedCategory === 'featured') {
      filtered = featuredFilms;
    } else if (selectedCategory === 'series') {
      filtered = tvSeries;
    } else if (selectedCategory === 'tube') {
      filtered = tubeItNow;
    }

    // Filter by search query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase().trim();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery) ||
        c.genre.some(g => g.toLowerCase().includes(lowerQuery))
      );
    }

    return filtered;
  };

  const results = getFilteredResults();

  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('lumajoyaron-recent-searches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('lumajoyaron-recent-searches');
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
    }
  };

  const handleRecentClick = (searchQuery: string) => {
    setQuery(searchQuery);
    saveRecentSearch(searchQuery);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050a15] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#050a15]/95 backdrop-blur-lg border-b border-blue-800/30">
        <div className="px-4 md:px-8 py-4">
          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-blue-900/30"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search movies, series, genres..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-10 h-11 bg-blue-950/50 border-blue-800/50 text-white placeholder:text-blue-400/40 focus:border-blue-500 text-base"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuery('')}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-blue-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "rounded-full px-4 flex-shrink-0",
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white"
                    : "border-blue-500/50 text-blue-300 hover:bg-blue-900/30"
                )}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-6">
        {/* Recent Searches (when no query) */}
        {!query && recentSearches.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Recent Searches</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearRecentSearches}
                className="text-blue-400 text-xs"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, i) => (
                <button
                  key={i}
                  onClick={() => handleRecentClick(search)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-900/30 rounded-full text-blue-300 text-sm hover:bg-blue-900/50 transition-colors"
                >
                  <Search className="w-3 h-3" />
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">
              {query ? `Results for "${query}"` : selectedCategory === 'all' ? 'All Content' : categories.find(c => c.id === selectedCategory)?.label}
            </h3>
            <span className="text-blue-400 text-sm">{results.length} results</span>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
              {results.map((item) => (
                <SearchResultCard
                  key={item.id}
                  content={item}
                  onClick={() => onContentClick(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-blue-400/30 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">No results found</h3>
              <p className="text-blue-400/60 text-sm">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Search Result Card Component
function SearchResultCard({ content, onClick }: { content: Content; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-blue-800/30">
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

        {/* Year badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-blue-600/80 text-white text-[10px] px-1.5 py-0.5 backdrop-blur">
            {content.year}
          </Badge>
        </div>

        {/* Type badge */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <Badge className="bg-black/60 text-white text-[9px] px-1.5 py-0.5 backdrop-blur">
            {content.type === 'movie' ? 'MOVIE' : content.type === 'series' ? 'SERIES' : 'SHORT'}
          </Badge>
        </div>

        {/* Play overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="w-12 h-12 rounded-full bg-blue-600/90 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-blue-600/50">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Content info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <h3 className="text-white text-xs font-semibold line-clamp-2 mb-1">{content.title}</h3>
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
