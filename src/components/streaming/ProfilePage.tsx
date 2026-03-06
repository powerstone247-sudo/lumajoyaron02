'use client';

import React, { useState } from 'react';
import { ArrowLeft, User, Heart, Settings, Bell, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, Moon, Globe, Download, Edit, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProfilePageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  watchlistCount: number;
}

export default function ProfilePage({ onBack, onNavigate, watchlistCount }: ProfilePageProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  const menuItems = [
    { icon: Heart, label: 'My Watchlist', value: `${watchlistCount} items`, onClick: () => onNavigate('watchlist') },
    { icon: CreditCard, label: 'Subscription', value: 'Premium', onClick: () => {} },
    { icon: Download, label: 'Downloads', value: '3 movies', onClick: () => {} },
    { icon: Globe, label: 'Language', value: 'English', onClick: () => {} },
  ];

  const settingsItems = [
    { icon: Bell, label: 'Notifications', toggle: true, value: notifications, onChange: setNotifications },
    { icon: Moon, label: 'Dark Mode', toggle: true, value: darkMode, onChange: setDarkMode },
    { icon: Shield, label: 'Privacy Settings', onClick: () => onNavigate('privacy') },
    { icon: HelpCircle, label: 'Help & FAQ', onClick: () => onNavigate('faq') },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#050a15] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#050a15]/95 backdrop-blur-lg border-b border-blue-800/30">
        <div className="flex items-center gap-4 px-4 md:px-8 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-blue-900/30"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-white text-xl md:text-2xl font-bold">Profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-8 max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-[#0a1628]">
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-white text-xl font-bold">John Doe</h2>
                <Badge className="bg-blue-600 text-white text-xs">Premium</Badge>
              </div>
              <p className="text-blue-300 text-sm">john.doe@email.com</p>
              <button className="text-blue-400 text-sm mt-1 flex items-center gap-1 hover:text-blue-300">
                <Edit className="w-3 h-3" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-800/30 text-center">
            <p className="text-white text-2xl font-bold">47</p>
            <p className="text-blue-400/60 text-xs">Watched</p>
          </div>
          <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-800/30 text-center">
            <p className="text-white text-2xl font-bold">{watchlistCount}</p>
            <p className="text-blue-400/60 text-xs">Watchlist</p>
          </div>
          <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-800/30 text-center">
            <p className="text-white text-2xl font-bold">12h</p>
            <p className="text-blue-400/60 text-xs">This Week</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-blue-900/20 rounded-2xl border border-blue-800/30 mb-6 overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-4 hover:bg-blue-900/20 transition-colors border-b border-blue-800/20 last:border-0"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-blue-400" />
                <span className="text-white">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-300 text-sm">{item.value}</span>
                <ChevronRight className="w-5 h-5 text-blue-400/60" />
              </div>
            </button>
          ))}
        </div>

        {/* Settings */}
        <h3 className="text-white font-semibold mb-3 px-1">Settings</h3>
        <div className="bg-blue-900/20 rounded-2xl border border-blue-800/30 mb-6 overflow-hidden">
          {settingsItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b border-blue-800/20 last:border-0"
            >
              <button
                onClick={item.onClick}
                className={cn(
                  "flex items-center gap-3",
                  item.toggle ? "cursor-default" : "cursor-pointer w-full text-left"
                )}
              >
                <item.icon className="w-5 h-5 text-blue-400" />
                <span className="text-white">{item.label}</span>
              </button>
              {item.toggle ? (
                <button
                  onClick={() => item.onChange?.(!item.value)}
                  className={cn(
                    "w-12 h-7 rounded-full transition-colors relative",
                    item.value ? "bg-blue-600" : "bg-blue-900/50"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full bg-white absolute top-1 transition-transform",
                      item.value ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              ) : (
                <ChevronRight className="w-5 h-5 text-blue-400/60" />
              )}
            </div>
          ))}
        </div>

        {/* Account Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-blue-500/30 text-white hover:bg-blue-900/30 py-6"
            onClick={() => onNavigate('about')}
          >
            About Lumajoyaron
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-500/30 text-red-400 hover:bg-red-900/20 hover:text-red-300 py-6"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Version */}
        <p className="text-center text-blue-400/40 text-xs mt-6">
          Version 2.4.1 • © 2024 Lumajoyaron Stream
        </p>
      </div>
    </div>
  );
}
