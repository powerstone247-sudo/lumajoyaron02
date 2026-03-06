'use client';

import React from 'react';
import { Home, Search, Tv, Film, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenSeries: () => void;
  onOpenMovies: () => void;
}

export default function BottomNav({ 
  activeTab, 
  onTabChange, 
  onOpenSearch, 
  onOpenProfile,
  onOpenSeries,
  onOpenMovies
}: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, action: () => onTabChange('home') },
    { id: 'search', label: 'Search', icon: Search, action: onOpenSearch },
    { id: 'series', label: 'Series', icon: Tv, action: onOpenSeries },
    { id: 'movies', label: 'Movies', icon: Film, action: onOpenMovies },
    { id: 'profile', label: 'Profile', icon: User, action: onOpenProfile },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0a1628]/95 backdrop-blur-lg border-t border-blue-800/30 z-50 md:hidden safe-area-pb">
      <div className="flex items-center justify-around py-2 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={tab.action}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 min-w-[60px] rounded-lg transition-all duration-200",
              activeTab === tab.id && "bg-blue-600/20"
            )}
          >
            <tab.icon
              className={cn(
                "w-5 h-5 mb-0.5 transition-colors duration-200",
                activeTab === tab.id
                  ? "text-blue-400"
                  : "text-blue-400/50"
              )}
            />
            <span
              className={cn(
                "text-[10px] transition-colors duration-200",
                activeTab === tab.id
                  ? "text-blue-400 font-medium"
                  : "text-blue-400/50"
              )}
            >
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-0.5" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
