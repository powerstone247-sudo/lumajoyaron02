'use client';

import React, { useState } from 'react';
import { ArrowLeft, Bell, X, Check, Film, Tv, Star, Calendar, Gift, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NotificationsPageProps {
  onBack: () => void;
  onContentClick?: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'new_release' | 'recommendation' | 'update' | 'promo' | 'reminder';
  title: string;
  message: string;
  thumbnail?: string;
  time: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'new_release',
    title: 'New Release',
    message: 'Quantum Horizon is now available! Watch the latest sci-fi blockbuster.',
    thumbnail: '/thumbnails/quantum-horizon.jpg',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'recommendation',
    title: 'Recommended for You',
    message: 'Based on your watch history, you might enjoy Shadow Protocol.',
    thumbnail: '/thumbnails/shadow-protocol.jpg',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'update',
    title: 'New Episodes Added',
    message: 'Season 2 of Cyber Dynasty is now streaming with 5 new episodes.',
    thumbnail: '/thumbnails/cyber-dynasty.jpg',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'promo',
    title: 'Special Offer',
    message: 'Upgrade to Premium and get 50% off for the first 3 months!',
    time: '5 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Continue Watching',
    message: 'You left off at Episode 3 of The Last Colony. Continue watching?',
    thumbnail: '/thumbnails/last-colony.jpg',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '6',
    type: 'new_release',
    title: 'New Release',
    message: "Dragon's Legacy is now streaming! An epic fantasy adventure awaits.",
    thumbnail: '/thumbnails/dragons-legacy.jpg',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '7',
    type: 'recommendation',
    title: 'Trending Now',
    message: 'See what everyone is watching this week!',
    time: '2 days ago',
    read: true,
  },
  {
    id: '8',
    type: 'promo',
    title: 'Weekend Special',
    message: 'Free movie rentals this weekend! Choose from our collection.',
    time: '3 days ago',
    read: true,
  },
];

export default function NotificationsPage({ onBack }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'new_release':
        return <Film className="w-5 h-5 text-blue-400" />;
      case 'recommendation':
        return <Star className="w-5 h-5 text-yellow-400" />;
      case 'update':
        return <Tv className="w-5 h-5 text-green-400" />;
      case 'promo':
        return <Gift className="w-5 h-5 text-purple-400" />;
      case 'reminder':
        return <Calendar className="w-5 h-5 text-orange-400" />;
      default:
        return <Bell className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050a15] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#050a15]/95 backdrop-blur-lg border-b border-blue-800/30">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-blue-900/30"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-white text-xl md:text-2xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-blue-400 hover:text-blue-300"
              >
                <Check className="w-4 h-4 mr-1" />
                Mark all read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-4 md:px-8 pb-4">
          <Button
            variant={filter === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter('all')}
            className={cn(
              "rounded-full px-4",
              filter === 'all'
                ? "bg-blue-600 text-white"
                : "border-blue-500/50 text-blue-300 hover:bg-blue-900/30"
            )}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter('unread')}
            className={cn(
              "rounded-full px-4",
              filter === 'unread'
                ? "bg-blue-600 text-white"
                : "border-blue-500/50 text-blue-300 hover:bg-blue-900/30"
            )}
          >
            Unread ({unreadCount})
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-6 max-w-4xl mx-auto">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={cn(
                  "flex gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border",
                  notification.read
                    ? "bg-blue-900/10 border-blue-800/20 hover:bg-blue-900/20"
                    : "bg-blue-900/30 border-blue-600/40 hover:bg-blue-900/40"
                )}
              >
                {/* Thumbnail or Icon */}
                {notification.thumbnail ? (
                  <div className="w-16 h-20 md:w-20 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={notification.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-20 md:w-20 md:h-28 rounded-lg bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                        )}
                        <h3 className="text-white font-semibold text-sm md:text-base">
                          {notification.title}
                        </h3>
                      </div>
                      <p className="text-white/70 text-sm line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                    <span className="text-blue-400/50 text-xs whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  
                  {notification.action && (
                    <Button
                      size="sm"
                      className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {notification.action.label}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            {filter === 'unread' ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-400/50 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">All caught up!</h3>
                <p className="text-blue-400/60">You have no unread notifications</p>
              </>
            ) : (
              <>
                <Bell className="w-16 h-16 text-blue-400/30 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">No notifications</h3>
                <p className="text-blue-400/60">We&apos;ll notify you when something arrives</p>
              </>
            )}
          </div>
        )}

        {/* Notification Categories Info */}
        <div className="mt-12 border-t border-blue-800/30 pt-8">
          <h2 className="text-white font-semibold mb-4">Notification Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: Film, label: 'New Releases', color: 'text-blue-400' },
              { icon: Star, label: 'Recommendations', color: 'text-yellow-400' },
              { icon: Tv, label: 'Updates', color: 'text-green-400' },
              { icon: Gift, label: 'Promotions', color: 'text-purple-400' },
              { icon: Calendar, label: 'Reminders', color: 'text-orange-400' },
              { icon: AlertCircle, label: 'Alerts', color: 'text-red-400' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800/30"
              >
                <item.icon className={cn("w-5 h-5", item.color)} />
                <span className="text-white/80 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
