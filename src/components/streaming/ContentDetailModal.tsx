'use client';

import React, { useState } from 'react';
import { X, Play, Tag, Clock, Calendar, Heart, Plus, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Content, Episode } from '@/lib/streaming-data';
import { cn } from '@/lib/utils';

interface ContentDetailModalProps {
  content: Content | null;
  isOpen: boolean;
  onClose: () => void;
  onWatchTrailer: (content: Content) => void;
}

export default function ContentDetailModal({ content, isOpen, onClose, onWatchTrailer }: ContentDetailModalProps) {
  const [selectedSeason, setSelectedSeason] = useState(1);

  if (!content) return null;

  // Calculate seasons from episodes
  const seasons = content.episodes
    ? [...new Set(content.episodes.map(ep => ep.season))]
    : [];

  // Use first season as default if available
  const currentSeason = selectedSeason || (content.episodes?.[0]?.season ?? 1);
  const currentSeasonEpisodes = content.episodes
    ?.filter(ep => ep.season === currentSeason) || [];

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] md:w-full max-h-[95vh] bg-[#0a1628] border-blue-800/30 p-0 overflow-hidden">
        {/* Hero Section with Backdrop */}
        <div className="relative h-[40vh] md:h-[50vh] w-full">
          <img
            src={content.thumbnail}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/80 to-transparent" />
          
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:bg-white/20 bg-black/30 backdrop-blur-md rounded-full h-9 w-9"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Content info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
            <div className="max-w-2xl">
              {/* Type badge */}
              <div className="mb-2">
                <Badge className="bg-blue-600 text-white text-xs font-medium">
                  {content.type === 'movie' ? 'MOVIE' : content.type === 'series' ? 'TV SERIES' : 'SHORT'}
                </Badge>
              </div>
              
              {/* Title */}
              <h2 className="text-white text-2xl md:text-4xl font-bold mb-3">{content.title}</h2>
              
              {/* Meta info */}
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <div className="flex items-center gap-1 bg-blue-600/30 rounded-md px-2 py-0.5 border border-blue-500/30">
                  <Tag className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                  <span className="text-blue-400 font-bold text-sm">{content.price}</span>
                </div>
                <span className="text-blue-300 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {content.year}
                </span>
                <span className="text-blue-300 text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {content.duration}
                </span>
                {content.type === 'series' && content.seasons && (
                  <Badge variant="outline" className="border-blue-500/50 text-blue-300 text-xs">
                    {content.seasons} Season{content.seasons > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-8 overflow-y-auto max-h-[calc(95vh-50vh)]">
          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              size="lg"
              onClick={() => {
                onClose();
                setTimeout(() => onWatchTrailer(content), 300);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8"
            >
              <Play className="w-5 h-5 mr-2 fill-white" />
              Watch Trailer
            </Button>
            {content.type !== 'series' && (
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-black font-semibold px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                Play Now
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500/50 text-white hover:bg-blue-900/30 hidden md:flex"
            >
              <Plus className="w-5 h-5 mr-2" />
              My List
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500/50 text-white hover:bg-blue-900/30 hidden md:flex"
            >
              <Heart className="w-5 h-5 mr-2" />
              Favorite
            </Button>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {content.genre.map((g, i) => (
              <Badge key={i} variant="secondary" className="bg-blue-900/50 text-blue-200 border border-blue-700/30 px-3 py-1">
                {g}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-3 text-lg">Overview</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* TV Series Episodes Section */}
          {content.type === 'series' && content.episodes && (
            <div className="border-t border-blue-800/30 pt-6">
              <h3 className="text-white font-semibold mb-4 text-lg">Episodes</h3>
              
              {/* Season selector */}
              {seasons.length > 1 && (
                <div className="relative mb-6">
                  <select
                    value={currentSeason}
                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                    className="appearance-none bg-blue-900/50 border border-blue-700/50 text-white rounded-lg px-4 py-2.5 pr-10 cursor-pointer focus:outline-none focus:border-blue-500"
                  >
                    {seasons.map(s => (
                      <option key={s} value={s}>Season {s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
                </div>
              )}

              {/* Episode list */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {currentSeasonEpisodes.map((ep, index) => (
                  <EpisodeCard 
                    key={ep.id} 
                    episode={ep} 
                    index={index + 1}
                    seriesTitle={content.title}
                  />
                ))}
              </div>

              {currentSeasonEpisodes.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-blue-400/60">No episodes available for this season</p>
                </div>
              )}
            </div>
          )}

          {/* Additional Info for Movies */}
          {content.type === 'movie' && (
            <div className="border-t border-blue-800/30 pt-6">
              <h3 className="text-white font-semibold mb-4 text-lg">More Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-900/20 rounded-lg p-3">
                  <p className="text-blue-400/60 text-xs mb-1">Release Year</p>
                  <p className="text-white font-medium">{content.year}</p>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-3">
                  <p className="text-blue-400/60 text-xs mb-1">Duration</p>
                  <p className="text-white font-medium">{content.duration}</p>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-3">
                  <p className="text-blue-400/60 text-xs mb-1">Access Fee</p>
                  <p className="text-white font-medium">{content.price}</p>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-3">
                  <p className="text-blue-400/60 text-xs mb-1">Quality</p>
                  <p className="text-white font-medium">HD / 4K</p>
                </div>
              </div>
            </div>
          )}

          {/* Short content info */}
          {content.type === 'short' && (
            <div className="border-t border-blue-800/30 pt-6">
              <h3 className="text-white font-semibold mb-4 text-lg">Quick Info</h3>
              <div className="bg-blue-900/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600/30 flex items-center justify-center">
                    <Play className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Duration: {content.duration}</p>
                    <p className="text-blue-400/60 text-sm">Perfect for a quick watch</p>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Watch Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Episode Card Component
function EpisodeCard({ episode, index, seriesTitle }: { episode: Episode; index: number; seriesTitle: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "flex gap-3 md:gap-4 p-2 md:p-3 rounded-xl cursor-pointer transition-all duration-300",
        "bg-blue-900/20 hover:bg-blue-900/40 border border-transparent hover:border-blue-600/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Episode thumbnail */}
      <div className="relative w-28 md:w-40 flex-shrink-0">
        <div className="aspect-video rounded-lg overflow-hidden">
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
        </div>
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="w-10 h-10 rounded-full bg-blue-600/90 flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">
          {episode.duration}
        </span>
      </div>

      {/* Episode info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-blue-400 text-xs font-medium">E{index}</span>
          <h4 className="text-white text-sm md:text-base font-medium truncate">{episode.title}</h4>
        </div>
        <p className="text-white/60 text-xs md:text-sm line-clamp-2 mb-2">{episode.description}</p>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-300">
            S{episode.season} E{episode.episode}
          </Badge>
        </div>
      </div>
    </div>
  );
}
