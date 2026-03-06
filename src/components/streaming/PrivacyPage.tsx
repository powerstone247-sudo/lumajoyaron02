'use client';

import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrivacyPageProps {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
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
          <h1 className="text-white text-xl md:text-2xl font-bold">Privacy Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-8 md:py-12 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-blue-300">Last updated: January 2024</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <h2 className="text-white text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-white/80 leading-relaxed">
              Welcome to Lumajoyaron Stream. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our streaming platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          {/* Information Collection */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-400" />
              <h2 className="text-white text-xl font-semibold">2. Information We Collect</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li>Name, email address, and contact information when you create an account</li>
              <li>Payment information for subscription services</li>
              <li>Viewing history and preferences</li>
              <li>Device information and IP address</li>
              <li>Communications you send to us</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-400" />
              <h2 className="text-white text-xl font-semibold">3. How We Use Your Information</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              We use the information we collect for various purposes:
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li>To provide and maintain our streaming service</li>
              <li>To personalize your viewing experience and recommendations</li>
              <li>To process transactions and send related information</li>
              <li>To send promotional communications and updates</li>
              <li>To respond to your comments and questions</li>
              <li>To improve our service and develop new features</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-400" />
              <h2 className="text-white text-xl font-semibold">4. Data Security</h2>
            </div>
            <p className="text-white/80 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-blue-400" />
              <h2 className="text-white text-xl font-semibold">5. Your Rights</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              You have certain rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li>Right to access and receive a copy of your data</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to delete your personal information</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-blue-400" />
              <h2 className="text-white text-xl font-semibold">6. Contact Us</h2>
            </div>
            <p className="text-white/80 leading-relaxed">
              If you have questions or comments about this privacy policy, please contact us at:
            </p>
            <div className="mt-4 text-blue-300">
              <p>Email: privacy@lumajoyaron.stream</p>
              <p>Address: 123 Streaming Avenue, Digital City, DC 10001</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-400/60 text-sm">
          <p>© 2024 Lumajoyaron Stream. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
