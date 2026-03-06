'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, X, Maximize2, Minimize2 } from 'lucide-react';
import { Content } from '@/lib/streaming-data';

interface VideoPlayerProps {
  content: Content;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayer({ content, isOpen, onClose }: VideoPlayerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract Google Drive video ID from URL
  const getGoogleDriveVideoId = (url: string): string | null => {
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

  const videoId = content.videoUrl ? getGoogleDriveVideoId(content.videoUrl) : null;
  const isGoogleDriveVideo = !!videoId;
  
  // Generate proper embed URL for Google Drive
  // Using /preview with embedded=true works best for mobile
  const embedUrl = videoId 
    ? `https://drive.google.com/file/d/${videoId}/preview?embedded=true`
    : content.videoUrl;

  // Generate external view URL for opening in new tab (for mobile users)
  const externalUrl = videoId 
    ? `https://drive.google.com/file/d/${videoId}/view`
    : content.videoUrl;

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when player is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Request fullscreen with landscape orientation
  const requestFullscreen = async () => {
    const elem = containerRef.current;
    if (!elem) return;

    try {
      // Try to lock orientation to landscape on mobile
      if (screen.orientation && 'lock' in screen.orientation) {
        try {
          await (screen.orientation as ScreenOrientation & { lock: (orientation: string) => Promise<void> }).lock('landscape');
        } catch {
          // Orientation lock not supported
        }
      }

      // Request fullscreen with cross-browser support
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ('webkitRequestFullscreen' in elem) {
        await (elem as HTMLElement & { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
      } else if ('mozRequestFullScreen' in elem) {
        await (elem as HTMLElement & { mozRequestFullScreen: () => Promise<void> }).mozRequestFullScreen();
      } else if ('msRequestFullscreen' in elem) {
        await (elem as HTMLElement & { msRequestFullscreen: () => Promise<void> }).msRequestFullscreen();
      }
      
      setIsFullscreen(true);
    } catch (err) {
      console.log('Fullscreen error:', err);
    }
  };

  // Exit fullscreen
  const exitFullscreen = async () => {
    try {
      // Unlock orientation
      if (screen.orientation && 'unlock' in screen.orientation) {
        try {
          (screen.orientation as ScreenOrientation & { unlock: () => void }).unlock();
        } catch {
          // Not supported
        }
      }

      // Exit fullscreen with cross-browser support
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if ('webkitExitFullscreen' in document) {
        await (document as Document & { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen();
      } else if ('mozCancelFullScreen' in document) {
        await (document as Document & { mozCancelFullScreen: () => Promise<void> }).mozCancelFullScreen();
      } else if ('msExitFullscreen' in document) {
        await (document as Document & { msExitFullscreen: () => Promise<void> }).msExitFullscreen();
      }
      
      setIsFullscreen(false);
    } catch (err) {
      console.log('Exit fullscreen error:', err);
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!(
        document.fullscreenElement ||
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
        (document as Document & { mozFullScreenElement?: Element }).mozFullScreenElement ||
        (document as Document & { msFullscreenElement?: Element }).msFullscreenElement
      );
      
      setIsFullscreen(isNowFullscreen);
      
      if (!isNowFullscreen) {
        // Unlock orientation when exiting fullscreen
        if (screen.orientation && 'unlock' in screen.orientation) {
          try {
            (screen.orientation as ScreenOrientation & { unlock: () => void }).unlock();
          } catch {
            // Not supported
          }
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isFullscreen) {
          exitFullscreen();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, isFullscreen, onClose]);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Handle back
  const handleBack = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      onClose();
    }
  };

  // On mobile with Google Drive video, open externally instead
  useEffect(() => {
    if (isOpen && isMobile && isGoogleDriveVideo && externalUrl) {
      // Open in new tab for mobile users
      window.open(externalUrl, '_blank');
      // Close the player modal since we opened externally
      onClose();
    }
  }, [isOpen, isMobile, isGoogleDriveVideo, externalUrl, onClose]);

  if (!isOpen || !content.videoUrl) return null;

  // Don't render embedded player for Google Drive on mobile
  if (isMobile && isGoogleDriveVideo) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
    >
      {/* Mobile Portrait Header */}
      {isMobile && !isFullscreen && (
        <div className="flex-shrink-0 bg-[#0a1628] border-b border-blue-900/30">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-3">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white bg-black/60 backdrop-blur-md rounded-full px-4 py-2.5 active:bg-black/80 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>

            {/* Right Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={requestFullscreen}
                className="flex items-center gap-2 text-white bg-blue-600 rounded-full px-4 py-2.5 active:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                <Maximize2 className="h-5 w-5" />
                <span className="font-semibold">Fullscreen</span>
              </button>
              <button
                onClick={onClose}
                className="text-white bg-black/60 backdrop-blur-md rounded-full p-2.5 active:bg-black/80 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="px-4 pb-3">
            <h2 className="text-white font-bold text-lg">{content.title}</h2>
            <p className="text-blue-400 text-sm">Now Playing</p>
          </div>
        </div>
      )}

      {/* Mobile Fullscreen Landscape Header */}
      {isMobile && isFullscreen && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-3 pb-10 px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white bg-black/60 backdrop-blur-md rounded-full px-4 py-2 active:bg-black/80"
            >
              <Minimize2 className="h-5 w-5" />
              <span className="font-medium">Exit</span>
            </button>
            
            <div className="flex-1 text-center mx-4">
              <h2 className="text-white font-bold text-base truncate">{content.title}</h2>
            </div>
            
            <button
              onClick={onClose}
              className="text-white bg-black/60 backdrop-blur-md rounded-full p-2 active:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className="flex-shrink-0 bg-gradient-to-b from-black/90 via-black/70 to-transparent pt-4 pb-6 px-6">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white bg-black/50 backdrop-blur-md rounded-full px-5 py-2.5 hover:bg-black/70 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Details</span>
            </button>

            {/* Title */}
            <div className="text-center">
              <h2 className="text-white font-bold text-lg">{content.title}</h2>
              <p className="text-blue-400 text-sm">Now Playing</p>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={isFullscreen ? exitFullscreen : requestFullscreen}
                className="text-white bg-black/50 backdrop-blur-md rounded-full p-2.5 hover:bg-black/70 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
              <button
                onClick={onClose}
                className="text-white bg-black/50 backdrop-blur-md rounded-full p-2.5 hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Container */}
      <div className={`flex-1 relative ${isMobile && !isFullscreen ? '' : 'absolute inset-0'}`}>
        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-blue-400">Loading video...</p>
            </div>
          </div>
        )}
        
        {/* Google Drive Embed */}
        <iframe
          ref={iframeRef}
          key={`video-${content.id}-${isFullscreen ? 'fs' : 'normal'}`}
          src={embedUrl}
          title={`${content.title} - Now Playing`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          onLoad={handleIframeLoad}
          style={{ 
            border: 'none',
            backgroundColor: 'black'
          }}
        />
      </div>
    </div>
  );
}
