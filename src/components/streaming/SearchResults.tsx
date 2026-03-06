'use client';

import React from 'react';
import { Content } from '@/lib/streaming-data';
import { Film, Tv, Play, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
  results: Content[];
  onClose: () => void;
  onContentClick?: (content: Content) => void;
}

export default function SearchResults({ results, onClose, onContentClick }: SearchResultsProps) {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a1628] border border-blue-800/50 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50">
      <div className="p-2">
        <p className="text-xs text-blue-400 px-2 py-1.5 border-b border-blue-800/30">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </p>
        {results.map((item, index) => (
          <SearchResultItem 
            key={item.id} 
            item={item} 
            onClose={onClose} 
            onContentClick={onContentClick}
            index={index} 
          />
        ))}
      </div>
    </div>
  );
}

function SearchResultItem({ item, onClose, onContentClick, index }: { item: Content; onClose: () => void; onContentClick?: (content: Content) => void; index: number }) {
  const handleClick = () => {
    onClose();
    if (onContentClick) {
      onContentClick(item);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-blue-900/30 transition-colors text-left animate-fadeIn group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative w-12 h-16 md:w-14 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-1 left-1">
          {item.type === 'movie' ? (
            <Film className="w-3 h-3 text-blue-400" />
          ) : item.type === 'series' ? (
            <Tv className="w-3 h-3 text-blue-400" />
          ) : (
            <Play className="w-3 h-3 text-blue-400" />
          )}
        </div>
        {/* Hover play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-4 h-4 text-white fill-white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white text-sm font-medium truncate group-hover:text-blue-300 transition-colors">{item.title}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-blue-400 text-xs">{item.year}</span>
          <span className="text-blue-400/40 text-xs">•</span>
          <span className="text-blue-400/60 text-xs truncate">
            {item.genre.slice(0, 2).join(', ')}
          </span>
        </div>
        <p className="text-white/40 text-xs mt-1 line-clamp-1">{item.description}</p>
      </div>
      <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded">
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        <span className="text-yellow-400 text-xs font-medium">{item.rating}</span>
      </div>
    </button>
  );
}
