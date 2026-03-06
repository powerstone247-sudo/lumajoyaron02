'use client';

import React from 'react';
import { ArrowLeft, Film, Tv, Users, Award, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutPageProps {
  onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
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
          <h1 className="text-white text-xl md:text-2xl font-bold">About Us</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-8 md:py-12 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Lumajoyaron Stream</h2>
          <p className="text-blue-300 text-lg">Your Gateway to Endless Entertainment</p>
        </div>

        {/* Mission */}
        <div className="bg-blue-900/20 rounded-2xl p-6 md:p-8 border border-blue-800/30 mb-8">
          <h3 className="text-white text-xl font-semibold mb-4">Our Mission</h3>
          <p className="text-white/80 leading-relaxed">
            At Lumajoyaron Stream, we believe that great stories have the power to inspire, entertain, and bring people together. Our mission is to deliver the best in movies, TV series, and original content directly to your screen, anytime, anywhere. We are committed to providing a seamless streaming experience with high-quality content that caters to all tastes and preferences.
          </p>
        </div>

        {/* Features */}
        <h3 className="text-white text-xl font-semibold mb-6">What We Offer</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-800/30">
            <Film className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="text-white font-semibold mb-2">Premium Movies</h4>
            <p className="text-white/60 text-sm">Access thousands of blockbuster hits, indie gems, and classic films from around the world.</p>
          </div>
          <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-800/30">
            <Tv className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="text-white font-semibold mb-2">TV Series</h4>
            <p className="text-white/60 text-sm">Binge-watch your favorite shows with complete seasons and exclusive series you won&apos;t find anywhere else.</p>
          </div>
          <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-800/30">
            <Globe className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="text-white font-semibold mb-2">Global Content</h4>
            <p className="text-white/60 text-sm">Explore content from every corner of the globe with our diverse international library.</p>
          </div>
          <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-800/30">
            <Award className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="text-white font-semibold mb-2">Award-Winning</h4>
            <p className="text-white/60 text-sm">Discover critically acclaimed films and shows that have earned recognition worldwide.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 rounded-2xl p-6 md:p-8 border border-blue-700/30 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-white text-3xl font-bold">10K+</p>
              <p className="text-blue-300 text-sm">Movies</p>
            </div>
            <div>
              <p className="text-white text-3xl font-bold">5K+</p>
              <p className="text-blue-300 text-sm">TV Series</p>
            </div>
            <div>
              <p className="text-white text-3xl font-bold">50M+</p>
              <p className="text-blue-300 text-sm">Users</p>
            </div>
            <div>
              <p className="text-white text-3xl font-bold">190+</p>
              <p className="text-blue-300 text-sm">Countries</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-blue-900/20 rounded-2xl p-6 md:p-8 border border-blue-800/30">
          <Users className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-white text-xl font-semibold mb-4">Our Team</h3>
          <p className="text-white/80 leading-relaxed">
            Behind Lumajoyaron Stream is a passionate team of entertainment enthusiasts, tech innovators, and creative minds working tirelessly to bring you the best streaming experience. From content curators to engineers, everyone shares a common goal: to make every moment you spend with us unforgettable.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-400/60 text-sm">
          <p>© 2024 Lumajoyaron Stream. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
