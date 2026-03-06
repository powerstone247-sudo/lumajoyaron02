'use client';

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Play, Tag, Clock, Calendar, Heart, Plus, Share2, ChevronDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Content, Episode } from '@/lib/streaming-data';
import { cn } from '@/lib/utils';
import AccessRequestModal from './AccessRequestModal';

interface ContentPageProps {
  content: Content | null;
  allContent: Content[];
  onBack: () => void;
  onWatchTrailer: (content: Content) => void;
  onAddToWatchlist: (content: Content) => void;
  isWatchlisted: boolean;
  onContentClick: (content: Content) => void;
  onPlayVideo?: (content: Content) => void;
}

export default function ContentPage({ 
  content, 
  allContent,
  onBack, 
  onWatchTrailer, 
  onAddToWatchlist,
  isWatchlisted,
  onContentClick,
  onPlayVideo
}: ContentPageProps) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);

  // Calculate similar content based on genre matching (before early return)
  const similarContent = useMemo(() => {
    if (!content) return [];
    
    // Score each content based on matching genres and type
    const scored = allContent
      .filter(c => c.id !== content.id) // Exclude current content
      .map(c => {
        let score = 0;
        
        // Score for matching genres
        const matchingGenres = c.genre.filter(g => content.genre.includes(g));
        score += matchingGenres.length * 3;
        
        // Bonus for same type
        if (c.type === content.type) score += 2;
        
        // Bonus for similar price
        if (c.price === content.price) score += 2;
        
        return { content: c, score };
      })
      .filter(item => item.score > 0) // Only include content with at least one matching genre
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 12) // Take top 12
      .map(item => item.content);
    
    return scored;
  }, [content, allContent]);

  if (!content) return null;

  // Calculate seasons from episodes
  const seasons = content.episodes
    ? [...new Set(content.episodes.map(ep => ep.season))]
    : [];

  const currentSeason = selectedSeason || (content.episodes?.[0]?.season ?? 1);
  const currentSeasonEpisodes = content.episodes
    ?.filter(ep => ep.season === currentSeason) || [];

  const handleWatchlistClick = () => {
    onAddToWatchlist(content);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // Handle play button click - show access modal
  const handlePlayClick = () => {
    setShowAccessModal(true);
  };

  // Handle actual video playback (after access)
  const handleWatchNow = () => {
    if (content.videoUrl && onPlayVideo) {
      // Check if mobile device - open in new tab instead of embedded player
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      
      if (isMobile) {
        // Extract Google Drive video ID and open directly
        const videoId = extractGoogleDriveId(content.videoUrl);
        if (videoId) {
          // Open Google Drive file directly in new tab for mobile
          window.open(`https://drive.google.com/file/d/${videoId}/view`, '_blank');
          return;
        }
      }
      
      // Desktop or non-Google Drive - use embedded player
      onPlayVideo(content);
    }
  };

  // Helper function to extract Google Drive ID
  const extractGoogleDriveId = (url: string): string | null => {
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+)/,
      /\/open\?id=([a-zA-Z0-9_-]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050a15] overflow-y-auto">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
          {isWatchlisted ? 'Added to Watchlist!' : 'Link copied to clipboard!'}
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[70vh] w-full">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-[#050a15]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a15]/90 to-transparent" />
        
        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute top-4 left-4 text-white hover:bg-white/20 bg-black/30 backdrop-blur-md rounded-full h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Share button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          className="absolute top-4 right-4 text-white hover:bg-white/20 bg-black/30 backdrop-blur-md rounded-full h-10 w-10"
        >
          <Share2 className="h-5 w-5" />
        </Button>

        {/* Content info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 lg:p-16">
          <div className="max-w-3xl">
            {/* Type badge */}
            <div className="mb-3">
              <Badge className="bg-blue-600 text-white text-xs font-medium px-3 py-1">
                {content.type === 'movie' ? 'MOVIE' : content.type === 'series' ? 'TV SERIES' : 'SHORT'}
              </Badge>
            </div>
            
            {/* Title */}
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4">{content.title}</h1>
            
            {/* Meta info */}
            <div className="flex items-center gap-3 md:gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 bg-blue-600/30 rounded-lg px-3 py-1 border border-blue-500/30">
                <Tag className="w-5 h-5 text-blue-400 fill-blue-400/20" />
                <span className="text-blue-400 font-bold text-lg">{content.price}</span>
              </div>
              <span className="text-blue-300 text-sm md:text-base flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {content.year}
              </span>
              <span className="text-blue-300 text-sm md:text-base flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {content.duration}
              </span>
              {content.type === 'series' && content.seasons && (
                <Badge variant="outline" className="border-blue-500/50 text-blue-300 text-sm px-3 py-1">
                  {content.seasons} Season{content.seasons > 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 md:gap-4 flex-wrap">
              {content.videoUrl ? (
                <Button
                  size="lg"
                  onClick={handlePlayClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 md:px-10 py-6 text-base"
                >
                  <Play className="w-5 h-5 mr-2 fill-white" />
                  Play Now
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => onWatchTrailer(content)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 md:px-10 py-6 text-base"
                >
                  <Play className="w-5 h-5 mr-2 fill-white" />
                  Watch Trailer
                </Button>
              )}
              {content.videoUrl && (
                <Button
                  size="lg"
                  onClick={() => onWatchTrailer(content)}
                  variant="outline"
                  className="border-blue-500/50 text-white hover:bg-blue-900/30 px-6 md:px-8 py-6 text-base"
                >
                  Watch Trailer
                </Button>
              )}
              {content.type !== 'series' && !content.videoUrl && (
                <Button
                  size="lg"
                  onClick={handlePlayClick}
                  className="bg-white hover:bg-gray-100 text-black font-semibold px-6 md:px-10 py-6 text-base"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Play Now
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                onClick={handleWatchlistClick}
                className={cn(
                  "border-blue-500/50 px-6 py-6 text-base",
                  isWatchlisted 
                    ? "bg-blue-600 text-white border-blue-600" 
                    : "text-white hover:bg-blue-900/30"
                )}
              >
                {isWatchlisted ? (
                  <>
                    <Heart className="w-5 h-5 mr-2 fill-white" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Add to List
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500/50 text-white hover:bg-blue-900/30 px-6 py-6 text-base hidden md:flex"
              >
                <Download className="w-5 h-5 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="px-4 md:px-12 lg:px-16 py-8 md:py-12 max-w-7xl mx-auto">
        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-8">
          {content.genre.map((g, i) => (
            <Badge key={i} variant="secondary" className="bg-blue-900/50 text-blue-200 border border-blue-700/30 px-4 py-2 text-sm">
              {g}
            </Badge>
          ))}
        </div>

        {/* Description */}
        <div className="mb-10">
          <h2 className="text-white font-semibold mb-4 text-xl">Overview</h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-4xl">
            {content.description}
          </p>
        </div>

        {/* TV Series Episodes Section */}
        {content.type === 'series' && content.episodes && (
          <div className="border-t border-blue-800/30 pt-8">
            <h2 className="text-white font-semibold mb-6 text-xl">Episodes</h2>
            
            {/* Season selector */}
            {seasons.length > 1 && (
              <div className="relative mb-6 inline-block">
                <select
                  value={currentSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="appearance-none bg-blue-900/50 border border-blue-700/50 text-white rounded-lg px-5 py-3 pr-12 cursor-pointer focus:outline-none focus:border-blue-500 text-base"
                >
                  {seasons.map(s => (
                    <option key={s} value={s}>Season {s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
              </div>
            )}

            {/* Episode list */}
            <div className="space-y-4">
              {currentSeasonEpisodes.map((ep, index) => (
                <EpisodeCard 
                  key={ep.id} 
                  episode={ep} 
                  index={index + 1}
                />
              ))}
            </div>

            {currentSeasonEpisodes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-blue-400/60">No episodes available for this season</p>
              </div>
            )}
          </div>
        )}

        {/* Additional Info for Movies */}
        {content.type === 'movie' && (
          <div className="border-t border-blue-800/30 pt-8">
            <h2 className="text-white font-semibold mb-6 text-xl">More Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-800/30">
                <p className="text-blue-400/60 text-sm mb-2">Release Year</p>
                <p className="text-white font-semibold text-lg">{content.year}</p>
              </div>
              <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-800/30">
                <p className="text-blue-400/60 text-sm mb-2">Duration</p>
                <p className="text-white font-semibold text-lg">{content.duration}</p>
              </div>
              <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-800/30">
                <p className="text-blue-400/60 text-sm mb-2">Access Fee</p>
                <p className="text-white font-semibold text-lg">{content.price}</p>
              </div>
              <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-800/30">
                <p className="text-blue-400/60 text-sm mb-2">Quality</p>
                <p className="text-white font-semibold text-lg">HD / 4K</p>
              </div>
            </div>
          </div>
        )}

        {/* Short content info */}
        {content.type === 'short' && (
          <div className="border-t border-blue-800/30 pt-8">
            <h2 className="text-white font-semibold mb-6 text-xl">Quick Info</h2>
            <div className="bg-blue-900/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-800/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-600/30 flex items-center justify-center">
                  <Play className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Duration: {content.duration}</p>
                  <p className="text-blue-400/60 text-sm">Perfect for a quick watch</p>
                </div>
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Watch Now
              </Button>
            </div>
          </div>
        )}

        {/* Similar Content Recommendations */}
        {similarContent.length > 0 && (
          <div className="border-t border-blue-800/30 pt-8 mt-8">
            <h2 className="text-white font-semibold mb-6 text-xl">You May Also Like</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
              {similarContent.map((item) => (
                <SimilarContentCard
                  key={item.id}
                  content={item}
                  onClick={() => onContentClick(item)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Access Request Modal */}
      <AccessRequestModal
        content={content}
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        onWatchNow={handleWatchNow}
        selectedSeason={currentSeason}
      />
    </div>
  );
}

// Episode Card Component
function EpisodeCard({ episode, index }: { episode: Episode; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "flex gap-4 md:gap-6 p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300",
        "bg-blue-900/20 hover:bg-blue-900/40 border border-transparent hover:border-blue-600/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Episode thumbnail */}
      <div className="relative w-36 md:w-48 flex-shrink-0">
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
          <div className="w-12 h-12 rounded-full bg-blue-600/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {episode.duration}
        </span>
      </div>

      {/* Episode info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-blue-400 font-medium">Episode {index}</span>
          <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-300">
            S{episode.season} E{episode.episode}
          </Badge>
        </div>
        <h3 className="text-white text-lg font-medium mb-2">{episode.title}</h3>
        <p className="text-white/60 text-sm line-clamp-2">{episode.description}</p>
      </div>
    </div>
  );
}

// Similar Content Card Component
function SimilarContentCard({ content, onClick }: { content: Content; onClick: () => void }) {
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
            <Badge variant="outline" className="text-[9px] px-1 py-0 border-blue-500/30 text-blue-300 bg-blue-900/20">
              {content.type === 'movie' ? 'Movie' : content.type === 'series' ? 'Series' : 'Short'}
            </Badge>
            {content.genre.slice(0, 1).map((g, i) => (
              <Badge key={i} variant="outline" className="text-[9px] px-1 py-0 border-blue-500/20 text-blue-400/60">
                {g}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
