'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Content } from '@/lib/streaming-data';
import { cn } from '@/lib/utils';

interface TrailerModalProps {
  content: Content | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TrailerModal({ content, isOpen, onClose }: TrailerModalProps) {
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contentIdRef = useRef<string | null>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset controls when content changes
  const contentId = content?.id;
  if (contentId !== contentIdRef.current) {
    contentIdRef.current = contentId;
    if (isOpen) {
      setShowControls(true);
    }
  }

  // Hide controls after inactivity (longer on mobile)
  useEffect(() => {
    if (showControls && !isMobile) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 4000);
    } else if (showControls && isMobile) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 6000);
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isMobile]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!content || !isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMouseMove = () => {
    if (!isMobile) {
      setShowControls(true);
    }
  };

  const handleTouch = () => {
    setShowControls(prev => !prev);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black"
      onClick={handleBackdropClick}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouch}
    >
      {/* Mobile Header - Always visible with back button */}
      {isMobile && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-2 pb-8">
          <div className="flex items-center justify-between px-3">
            {/* Back Button - Prominent on mobile */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white bg-black/50 backdrop-blur-md rounded-full px-4 py-2 active:bg-black/70 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-white bg-black/50 backdrop-blur-md rounded-full p-2 active:bg-black/70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Title */}
          <div className="px-4 mt-2">
            <h2 className="text-white font-bold text-base">{content.title}</h2>
            <p className="text-blue-400 text-xs">Official Trailer</p>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <>
          {/* Close Button */}
          <div
            className={cn(
              "absolute top-4 right-4 z-10 transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 bg-black/40 backdrop-blur-md rounded-full h-12 w-12"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Title Bar */}
          <div
            className={cn(
              "absolute top-4 left-4 right-20 z-10 transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <div className="bg-black/40 backdrop-blur-md rounded-lg px-4 py-2 inline-block">
              <h2 className="text-white text-lg font-bold">{content.title}</h2>
              <p className="text-blue-400 text-sm">Official Trailer</p>
            </div>
          </div>
        </>
      )}

      {/* Video Container - Full Screen */}
      <div className="w-full h-full flex items-center justify-center">
        <iframe
          key={content.id}
          src={`${content.trailerUrl}?autoplay=1${isMuted ? '&mute=1' : ''}&rel=0`}
          title={`${content.title} - Official Trailer`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>

      {/* Mobile Bottom Controls - Always visible with Done button */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-8 pb-6 px-4">
          {/* Content Info */}
          <p className="text-white/80 text-sm line-clamp-2 mb-3">
            {content.description}
          </p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-blue-400 text-sm">{content.year}</span>
            <span className="text-blue-400 text-sm">{content.duration}</span>
            {content.genre.slice(0, 2).map((g, i) => (
              <span key={i} className="text-blue-400/60 text-xs bg-blue-900/30 px-2 py-0.5 rounded-full">
                {g}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="flex items-center gap-2 text-white bg-black/40 backdrop-blur-md rounded-full px-4 py-2 active:bg-black/60 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
              <span className="text-sm">{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>

            {/* Done Button - Easy to tap */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-3 active:bg-blue-800 transition-colors font-medium shadow-lg shadow-blue-600/30"
            >
              <span>Done</span>
            </button>
          </div>

          {/* Swipe indicator */}
          <p className="text-white/40 text-xs text-center mt-3">
            Swipe down or tap Back to close
          </p>
        </div>
      )}

      {/* Desktop Bottom Controls */}
      {!isMobile && (
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          
          {/* Content Info */}
          <div className="relative z-10">
            <p className="text-white/80 text-base line-clamp-2 mb-3 max-w-3xl">
              {content.description}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-blue-400 text-sm">{content.year}</span>
                <span className="text-blue-400 text-sm">{content.duration}</span>
                <span className="text-blue-400 text-sm">
                  {content.genre.join(' • ')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Mute Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="text-white hover:bg-white/20 bg-black/30 h-9 w-9 rounded-full"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                {/* Close Button */}
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 bg-black/30 h-9 px-4 rounded-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
