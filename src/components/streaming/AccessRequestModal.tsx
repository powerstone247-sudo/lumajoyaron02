'use client';

import React from 'react';
import { X, Mail, Play, Unlock, Film, Tv } from 'lucide-react';
import { Content } from '@/lib/streaming-data';

interface AccessRequestModalProps {
  content: Content;
  isOpen: boolean;
  onClose: () => void;
  onWatchNow: () => void;
  selectedSeason?: number;
  selectedEpisode?: number;
}

export default function AccessRequestModal({
  content,
  isOpen,
  onClose,
  onWatchNow,
  selectedSeason,
  selectedEpisode
}: AccessRequestModalProps) {
  if (!isOpen) return null;

  const isSeries = content.type === 'series';
  
  // Generate Gmail compose URL with automatic message
  const getGmailUrl = (requestType: 'movie' | 'all_episodes' | 'single_episode') => {
    const email = 'lumajoyaron@gmail.com';
    let subject = '';
    let body = '';

    if (requestType === 'movie') {
      subject = encodeURIComponent(`Access Request: ${content.title}`);
      body = encodeURIComponent(
        `Hello Lumajoyaron Team,\n\n` +
        `I would like to request access to watch the movie "${content.title}" (${content.year}).\n\n` +
        `Please grant me access to view this content.\n\n` +
        `Thank you!`
      );
    } else if (requestType === 'all_episodes') {
      subject = encodeURIComponent(`Access Request: ${content.title} - All Episodes`);
      body = encodeURIComponent(
        `Hello Lumajoyaron Team,\n\n` +
        `I would like to request access to watch all episodes of "${content.title}" (${content.year}).\n\n` +
        `Please grant me access to view the complete series.\n\n` +
        `Thank you!`
      );
    } else if (requestType === 'single_episode') {
      const episodeInfo = selectedSeason && selectedEpisode 
        ? `Season ${selectedSeason} Episode ${selectedEpisode}` 
        : 'an episode';
      subject = encodeURIComponent(`Access Request: ${content.title} - ${episodeInfo}`);
      body = encodeURIComponent(
        `Hello Lumajoyaron Team,\n\n` +
        `I would like to request access to watch ${episodeInfo} of "${content.title}" (${content.year}).\n\n` +
        `Please grant me access to view this episode.\n\n` +
        `Thank you!`
      );
    }

    return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  };

  // Handle access request buttons
  const handleGetAccess = (requestType: 'movie' | 'all_episodes' | 'single_episode') => {
    const gmailUrl = getGmailUrl(requestType);
    window.open(gmailUrl, '_blank');
    onClose();
  };

  // Handle watch now
  const handleWatchNow = () => {
    onWatchNow();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-b from-[#0f1a2e] to-[#0a1225] rounded-2xl border border-blue-700/40 shadow-2xl shadow-blue-900/30 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="relative p-5 border-b border-blue-800/30">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Icon */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
              {isSeries ? (
                <Tv className="h-6 w-6 text-blue-400" />
              ) : (
                <Film className="h-6 w-6 text-blue-400" />
              )}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{content.title}</h2>
              <p className="text-blue-400 text-sm">
                {isSeries ? 'TV Series' : 'Movie'} • {content.year}
              </p>
            </div>
          </div>
          
          <p className="text-blue-300/80 text-sm">
            {isSeries 
              ? 'Choose how you want to access this series'
              : 'Get access to watch this movie'
            }
          </p>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Movie Buttons */}
          {!isSeries && (
            <div className="space-y-3">
              {/* Get Access Now Button */}
              <button
                onClick={() => handleGetAccess('movie')}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 active:scale-[0.98]"
              >
                <Unlock className="h-5 w-5" />
                <span>Get Access Now</span>
              </button>
              
              {/* Already Accessed Watch Button */}
              <button
                onClick={handleWatchNow}
                className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-green-600/30 hover:shadow-green-600/50 active:scale-[0.98]"
              >
                <Play className="h-5 w-5 fill-white" />
                <span>Already Accessed, Watch</span>
              </button>
            </div>
          )}

          {/* Series Buttons */}
          {isSeries && (
            <div className="space-y-3">
              {/* Access All Button */}
              <button
                onClick={() => handleGetAccess('all_episodes')}
                className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 active:scale-[0.98]"
              >
                <Unlock className="h-5 w-5" />
                <span>Access All Episodes</span>
              </button>
              
              {/* Access Episode Button */}
              <button
                onClick={() => handleGetAccess('single_episode')}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 active:scale-[0.98]"
              >
                <Mail className="h-5 w-5" />
                <span>Access Episode</span>
              </button>
              
              {/* Already Accessed Watch Button */}
              <button
                onClick={handleWatchNow}
                className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-green-600/30 hover:shadow-green-600/50 active:scale-[0.98]"
              >
                <Play className="h-5 w-5 fill-white" />
                <span>Already Accessed, Watch</span>
              </button>
            </div>
          )}

          {/* Info text */}
          <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
            <p className="text-blue-300/70 text-xs text-center">
              <Mail className="h-3 w-3 inline mr-1" />
              Access requests are sent via Gmail to lumajoyaron@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
