'use client';

import React, { useState } from 'react';
import { Search, Bell, User, Menu, X, Home, Film, Tv, Bookmark, Info, FileText, Shield, HelpCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { searchContent, Content } from '@/lib/streaming-data';
import SearchResults from './SearchResults';

interface HeaderProps {
  isMobile?: boolean;
  onNavClick?: (section: string) => void;
  onContentClick?: (content: Content) => void;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
  onOpenPage?: (page: string) => void;
}

export default function Header({ 
  isMobile, 
  onNavClick, 
  onContentClick, 
  onOpenSearch,
  onOpenNotifications,
  onOpenProfile,
  onOpenPage
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Content[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const results = searchContent(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
  };

  const handleNavItemClick = (section: string) => {
    onNavClick?.(section);
    setShowMobileMenu(false);
  };

  const handlePageOpen = (page: string) => {
    onOpenPage?.(page);
    setShowMobileMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#050a15] via-[#050a15ee] to-transparent">
      <div className="flex items-center justify-between px-3 md:px-8 py-3 md:py-4">
        {/* Logo and Menu */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-white hover:bg-blue-900/30"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-1 md:gap-2 cursor-pointer" onClick={() => handleNavItemClick('home')}>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs md:text-sm">L</span>
            </div>
            <h1 className="text-sm md:text-xl font-bold text-gradient hidden sm:block">
              Lumajoyaron Stream
            </h1>
            <h1 className="text-sm font-bold text-gradient sm:hidden">
              Luma
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => handleNavItemClick('trending')} className="text-white/80 hover:text-white transition-colors text-sm font-medium">
            Trending
          </button>
          <button onClick={() => handleNavItemClick('featured')} className="text-white/80 hover:text-white transition-colors text-sm font-medium">
            Featured
          </button>
          <button onClick={() => handlePageOpen('series')} className="text-white/80 hover:text-white transition-colors text-sm font-medium">
            TV Series
          </button>
          <button onClick={() => handleNavClick?.('tube')} className="text-white/80 hover:text-white transition-colors text-sm font-medium">
            Tube
          </button>
        </nav>

        {/* Search and Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (onOpenSearch) {
                onOpenSearch();
              } else {
                setShowSearch(!showSearch);
              }
            }}
            className="text-white hover:bg-blue-900/30"
          >
            {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>

          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <div className={cn(
              "flex items-center transition-all duration-300",
              isSearchFocused ? "w-72" : "w-56"
            )}>
              <Search className="absolute left-3 h-4 w-4 text-blue-400" />
              <Input
                type="text"
                placeholder="Search movies, series..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 pr-4 h-9 bg-blue-950/50 border-blue-800/50 text-white placeholder:text-blue-400/60 focus:border-blue-500 focus:ring-blue-500/20"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={clearSearch}
                  className="absolute right-1 h-7 w-7 text-blue-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {searchQuery && searchResults.length > 0 && (
              <SearchResults 
                results={searchResults} 
                onClose={clearSearch}
                onContentClick={onContentClick}
              />
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenNotifications}
            className="text-white hover:bg-blue-900/30 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenProfile}
            className="text-white hover:bg-blue-900/30"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="md:hidden bg-[#0a1628]/95 backdrop-blur-lg border-b border-blue-800/30 animate-fadeIn">
          <nav className="flex flex-col py-2">
            {/* Main Navigation */}
            <div className="px-4 py-2">
              <span className="text-blue-400/60 text-xs font-medium uppercase tracking-wider">Browse</span>
            </div>
            <button
              onClick={() => handleNavItemClick('home')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              <Home className="w-4 h-4 text-blue-400" />
              Home
            </button>
            <button
              onClick={() => handleNavItemClick('trending')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              🔥 Trending Now
            </button>
            <button
              onClick={() => handleNavItemClick('featured')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              ⭐ Featured Films
            </button>
            <button
              onClick={() => handlePageOpen('series')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              <Tv className="w-4 h-4 text-blue-400" />
              TV Series
            </button>
            <button
              onClick={() => handleNavItemClick('tube')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              🎬 Tube It Now
            </button>

            <div className="border-t border-blue-800/30 my-2" />

            {/* Quick Actions */}
            <div className="px-4 py-2">
              <span className="text-blue-400/60 text-xs font-medium uppercase tracking-wider">Quick Actions</span>
            </div>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                onOpenSearch?.();
              }}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              <Search className="w-4 h-4 text-blue-400" />
              Search
            </button>
            <button
              onClick={() => handlePageOpen('watchlist')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              <Bookmark className="w-4 h-4 text-blue-400" />
              My Watchlist
            </button>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                onOpenNotifications?.();
              }}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              <Bell className="w-4 h-4 text-blue-400" />
              Notifications
            </button>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                onOpenProfile?.();
              }}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              <User className="w-4 h-4 text-blue-400" />
              Profile
            </button>

            <div className="border-t border-blue-800/30 my-2" />

            {/* Help & Info */}
            <div className="px-4 py-2">
              <span className="text-blue-400/60 text-xs font-medium uppercase tracking-wider">Help & Info</span>
            </div>
            <button
              onClick={() => handlePageOpen('about')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              <Info className="w-4 h-4 text-blue-400" />
              About Us
            </button>
            <button
              onClick={() => handlePageOpen('faq')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              <HelpCircle className="w-4 h-4 text-blue-400" />
              FAQ
            </button>
            <button
              onClick={() => handlePageOpen('contact')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              Contact Us
            </button>

            <div className="border-t border-blue-800/30 my-2" />

            {/* Legal */}
            <div className="px-4 py-2">
              <span className="text-blue-400/60 text-xs font-medium uppercase tracking-wider">Legal</span>
            </div>
            <button
              onClick={() => handlePageOpen('terms')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              Terms of Service
            </button>
            <button
              onClick={() => handlePageOpen('privacy')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-3 text-left transition-colors flex items-center gap-3"
            >
              <Shield className="w-4 h-4 text-blue-400" />
              Privacy Policy
            </button>
          </nav>
        </div>
      )}

      {/* Desktop Menu Dropdown */}
      {showMobileMenu && (
        <div className="hidden md:block absolute top-full left-0 bg-[#0a1628]/95 backdrop-blur-lg border-b border-r border-blue-800/30 animate-fadeIn rounded-br-xl shadow-xl">
          <nav className="flex flex-col py-2 min-w-[220px]">
            {/* Main Navigation */}
            <div className="px-4 py-2">
              <span className="text-blue-400/60 text-xs font-medium uppercase tracking-wider">Browse</span>
            </div>
            <button
              onClick={() => handleNavItemClick('home')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              <Home className="w-4 h-4 text-blue-400" />
              Home
            </button>
            <button
              onClick={() => handleNavItemClick('trending')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              🔥 Trending Now
            </button>
            <button
              onClick={() => handleNavItemClick('featured')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              ⭐ Featured Films
            </button>
            <button
              onClick={() => handlePageOpen('series')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              <Tv className="w-4 h-4 text-blue-400" />
              TV Series
            </button>
            <button
              onClick={() => handlePageOpen('movies')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              <Film className="w-4 h-4 text-blue-400" />
              Movies
            </button>
            <button
              onClick={() => handleNavItemClick('tube')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              🎬 Tube It Now
            </button>

            <div className="border-t border-blue-800/30 my-2" />

            {/* Quick Actions */}
            <div className="px-4 py-2">
              <span className="text-blue-400/60 text-xs font-medium uppercase tracking-wider">Quick Actions</span>
            </div>
            <button
              onClick={() => handlePageOpen('watchlist')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              <Bookmark className="w-4 h-4 text-blue-400" />
              My Watchlist
            </button>
            <button
              onClick={() => handlePageOpen('about')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              <Info className="w-4 h-4 text-blue-400" />
              About Us
            </button>
            <button
              onClick={() => handlePageOpen('faq')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              <HelpCircle className="w-4 h-4 text-blue-400" />
              FAQ
            </button>
            <button
              onClick={() => handlePageOpen('contact')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              Contact Us
            </button>

            <div className="border-t border-blue-800/30 my-2" />

            {/* Legal */}
            <div className="px-4 py-2">
              <span className="text-blue-400/60 text-xs font-medium uppercase tracking-wider">Legal</span>
            </div>
            <button
              onClick={() => handlePageOpen('terms')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              Terms of Service
            </button>
            <button
              onClick={() => handlePageOpen('privacy')}
              className="text-white/80 hover:text-white hover:bg-blue-900/30 px-4 py-2.5 text-left transition-colors flex items-center gap-3"
            >
              <Shield className="w-4 h-4 text-blue-400" />
              Privacy Policy
            </button>
          </nav>
        </div>
      )}

      {/* Mobile Search Bar */}
      {showSearch && !onOpenSearch && (
        <div className="md:hidden px-3 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-10 h-10 bg-blue-950/50 border-blue-800/50 text-white placeholder:text-blue-400/60 w-full"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onMouseDown={(e) => e.preventDefault()}
                onClick={clearSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-blue-400"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {searchQuery && searchResults.length > 0 && (
            <div className="mt-2">
              <SearchResults 
                results={searchResults} 
                onClose={clearSearch}
                onContentClick={onContentClick}
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
