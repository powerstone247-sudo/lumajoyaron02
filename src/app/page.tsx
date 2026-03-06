'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/streaming/Header';
import HeroBanner from '@/components/streaming/HeroBanner';
import CatalogSection from '@/components/streaming/CatalogSection';
import TrailerModal from '@/components/streaming/TrailerModal';
import BottomNav from '@/components/streaming/BottomNav';
import ContentPage from '@/components/streaming/ContentPage';
import WatchlistPage from '@/components/streaming/WatchlistPage';
import AboutPage from '@/components/streaming/AboutPage';
import PrivacyPage from '@/components/streaming/PrivacyPage';
import TermsPage from '@/components/streaming/TermsPage';
import ContactPage from '@/components/streaming/ContactPage';
import FAQPage from '@/components/streaming/FAQPage';
import ProfilePage from '@/components/streaming/ProfilePage';
import SearchPage from '@/components/streaming/SearchPage';
import NotificationsPage from '@/components/streaming/NotificationsPage';
import CategoryPage from '@/components/streaming/CategoryPage';
import VideoPlayer from '@/components/streaming/VideoPlayer';
import { 
  trendingNow, 
  featuredFilms, 
  tvSeries, 
  tubeItNow, 
  heroContent,
  Content,
  allContent 
} from '@/lib/streaming-data';

type PageType = 'home' | 'content' | 'watchlist' | 'about' | 'privacy' | 'terms' | 'contact' | 'faq' | 'profile' | 'search' | 'notifications' | 'series' | 'movies';

// Helper function to load watchlist from localStorage
function loadWatchlistFromStorage(): Content[] {
  if (typeof window === 'undefined') return [];
  try {
    const savedWatchlist = localStorage.getItem('lumajoyaron-watchlist');
    if (savedWatchlist) {
      const savedIds = JSON.parse(savedWatchlist) as string[];
      return allContent.filter(c => savedIds.includes(c.id));
    }
  } catch {
    // Ignore errors
  }
  return [];
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [watchlist, setWatchlist] = useState<Content[]>(() => loadWatchlistFromStorage());

  // Refs for scroll navigation
  const trendingRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<HTMLDivElement>(null);
  const tubeRef = useRef<HTMLDivElement>(null);
  const isHydratedRef = useRef(false);

  // Save watchlist to localStorage
  useEffect(() => {
    if (isHydratedRef.current) {
      const watchlistIds = watchlist.map(c => c.id);
      localStorage.setItem('lumajoyaron-watchlist', JSON.stringify(watchlistIds));
    }
    isHydratedRef.current = true;
  }, [watchlist]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleWatchTrailer = (content: Content) => {
    setSelectedContent(content);
    setShowTrailer(true);
    setShowVideoPlayer(false);
  };

  const handleContentClick = (content: Content) => {
    setSelectedContent(content);
    setCurrentPage('content');
    setShowVideoPlayer(false);
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  const handlePlayVideo = (content: Content) => {
    setSelectedContent(content);
    setShowVideoPlayer(true);
    setShowTrailer(false);
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const goHome = () => {
    setCurrentPage('home');
    setSelectedContent(null);
    setActiveTab('home');
  };

  const addToWatchlist = (content: Content) => {
    setWatchlist(prev => {
      if (prev.find(c => c.id === content.id)) {
        return prev.filter(c => c.id !== content.id);
      }
      return [...prev, content];
    });
  };

  const removeFromWatchlist = (content: Content) => {
    setWatchlist(prev => prev.filter(c => c.id !== content.id));
  };

  const isWatchlisted = (content: Content) => {
    return watchlist.some(c => c.id === content.id);
  };

  // Handle bottom navigation tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'home') {
      goHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle header navigation
  const handleNavClick = (section: string) => {
    // If not on home page, go home first
    if (currentPage !== 'home') {
      goHome();
      setTimeout(() => scrollToSection(section), 100);
    } else {
      scrollToSection(section);
    }
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>, offset = 80) => {
    if (ref.current) {
      const top = ref.current.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToSection = (section: string) => {
    switch (section) {
      case 'trending':
        scrollToRef(trendingRef);
        break;
      case 'featured':
        scrollToRef(featuredRef);
        break;
      case 'series':
        scrollToRef(seriesRef);
        break;
      case 'tube':
        scrollToRef(tubeRef);
        break;
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
    }
  };

  // Render Search Page
  if (currentPage === 'search') {
    return (
      <SearchPage
        onBack={goHome}
        onContentClick={handleContentClick}
      />
    );
  }

  // Render Notifications Page
  if (currentPage === 'notifications') {
    return <NotificationsPage onBack={goHome} />;
  }

  // Render Series Page
  if (currentPage === 'series') {
    return (
      <CategoryPage
        type="series"
        onBack={goHome}
        onContentClick={handleContentClick}
      />
    );
  }

  // Render Movies Page
  if (currentPage === 'movies') {
    return (
      <CategoryPage
        type="movies"
        onBack={goHome}
        onContentClick={handleContentClick}
      />
    );
  }

  // Render Content Page
  if (currentPage === 'content' && selectedContent) {
    return (
      <>
        <ContentPage
          content={selectedContent}
          allContent={allContent}
          onBack={goHome}
          onWatchTrailer={handleWatchTrailer}
          onAddToWatchlist={addToWatchlist}
          isWatchlisted={isWatchlisted(selectedContent)}
          onContentClick={handleContentClick}
          onPlayVideo={handlePlayVideo}
        />
        <TrailerModal
          content={selectedContent}
          isOpen={showTrailer}
          onClose={closeTrailer}
        />
        <VideoPlayer
          content={selectedContent}
          isOpen={showVideoPlayer}
          onClose={closeVideoPlayer}
        />
      </>
    );
  }

  // Render Watchlist Page
  if (currentPage === 'watchlist') {
    return (
      <WatchlistPage
        watchlist={watchlist}
        onBack={goHome}
        onRemove={removeFromWatchlist}
        onContentClick={handleContentClick}
      />
    );
  }

  // Render About Page
  if (currentPage === 'about') {
    return <AboutPage onBack={goHome} />;
  }

  // Render Privacy Page
  if (currentPage === 'privacy') {
    return <PrivacyPage onBack={goHome} />;
  }

  // Render Terms Page
  if (currentPage === 'terms') {
    return <TermsPage onBack={goHome} />;
  }

  // Render Contact Page
  if (currentPage === 'contact') {
    return <ContactPage onBack={goHome} />;
  }

  // Render FAQ Page
  if (currentPage === 'faq') {
    return <FAQPage onBack={goHome} />;
  }

  // Render Profile Page
  if (currentPage === 'profile') {
    return (
      <ProfilePage
        onBack={goHome}
        onNavigate={handleNavigate}
        watchlistCount={watchlist.length}
      />
    );
  }

  // Home page
  return (
    <main className="min-h-screen bg-[#050a15] overflow-x-hidden">
      {/* Header */}
      <Header 
        isMobile={isMobile} 
        onNavClick={handleNavClick} 
        onContentClick={handleContentClick}
        onOpenSearch={() => setCurrentPage('search')}
        onOpenNotifications={() => setCurrentPage('notifications')}
        onOpenProfile={() => setCurrentPage('profile')}
        onOpenPage={(page) => setCurrentPage(page as PageType)}
      />

      {/* Main Content */}
      <div className={`${isMobile ? 'pb-20' : ''}`}>
        {/* Hero Banner */}
        <HeroBanner
          content={heroContent}
          onWatchTrailer={handleWatchTrailer}
          onAccessNow={handleContentClick}
        />

        {/* Trending Now */}
        <div ref={trendingRef}>
          <CatalogSection
            id="trending"
            title="🔥 Trending Now"
            contents={trendingNow}
            onContentClick={handleContentClick}
          />
        </div>

        {/* Featured Films */}
        <div ref={featuredRef}>
          <CatalogSection
            id="featured"
            title="⭐ Featured Films"
            contents={featuredFilms}
            onContentClick={handleContentClick}
          />
        </div>

        {/* TV Series */}
        <div ref={seriesRef}>
          <CatalogSection
            id="series"
            title="📺 TV Series"
            contents={tvSeries}
            onContentClick={handleContentClick}
          />
        </div>

        {/* Tube It Now */}
        <div ref={tubeRef}>
          <CatalogSection
            id="tube"
            title="🎬 Tube It Now"
            contents={tubeItNow}
            variant="tube"
            onContentClick={handleContentClick}
          />
        </div>

        {/* Footer */}
        <footer className="mt-8 py-8 border-t border-blue-800/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">Browse</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => { goHome(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-blue-400/60 hover:text-blue-400 text-xs">Home</button></li>
                  <li><button onClick={() => setCurrentPage('search')} className="text-blue-400/60 hover:text-blue-400 text-xs">Search</button></li>
                  <li><button onClick={() => setCurrentPage('series')} className="text-blue-400/60 hover:text-blue-400 text-xs">TV Series</button></li>
                  <li><button onClick={() => setCurrentPage('movies')} className="text-blue-400/60 hover:text-blue-400 text-xs">Movies</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">Categories</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => setCurrentPage('search')} className="text-blue-400/60 hover:text-blue-400 text-xs">Action</button></li>
                  <li><button onClick={() => setCurrentPage('search')} className="text-blue-400/60 hover:text-blue-400 text-xs">Comedy</button></li>
                  <li><button onClick={() => setCurrentPage('search')} className="text-blue-400/60 hover:text-blue-400 text-xs">Drama</button></li>
                  <li><button onClick={() => setCurrentPage('search')} className="text-blue-400/60 hover:text-blue-400 text-xs">Sci-Fi</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">Help</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => setCurrentPage('faq')} className="text-blue-400/60 hover:text-blue-400 text-xs">FAQ</button></li>
                  <li><button onClick={() => setCurrentPage('contact')} className="text-blue-400/60 hover:text-blue-400 text-xs">Contact Us</button></li>
                  <li><button onClick={() => setCurrentPage('terms')} className="text-blue-400/60 hover:text-blue-400 text-xs">Terms of Service</button></li>
                  <li><button onClick={() => setCurrentPage('privacy')} className="text-blue-400/60 hover:text-blue-400 text-xs">Privacy Policy</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">About</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => setCurrentPage('about')} className="text-blue-400/60 hover:text-blue-400 text-xs">About Us</button></li>
                  <li><button onClick={() => setCurrentPage('contact')} className="text-blue-400/60 hover:text-blue-400 text-xs">Careers</button></li>
                  <li><button onClick={() => setCurrentPage('about')} className="text-blue-400/60 hover:text-blue-400 text-xs">Press</button></li>
                  <li><button onClick={() => setCurrentPage('contact')} className="text-blue-400/60 hover:text-blue-400 text-xs">Partners</button></li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-blue-800/30">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">L</span>
                </div>
                <span className="text-white font-bold text-sm">Lumajoyaron Stream</span>
              </div>
              <p className="text-blue-400/40 text-xs text-center md:text-right">
                © 2024 Lumajoyaron Stream. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        content={selectedContent}
        isOpen={showTrailer}
        onClose={closeTrailer}
      />

      {/* Bottom Navigation (Mobile Only) */}
      {isMobile && (
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          onOpenSearch={() => setCurrentPage('search')}
          onOpenProfile={() => setCurrentPage('profile')}
          onOpenSeries={() => setCurrentPage('series')}
          onOpenMovies={() => setCurrentPage('movies')}
        />
      )}
    </main>
  );
}
