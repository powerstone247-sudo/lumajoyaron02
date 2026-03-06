'use client';

import React from 'react';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TermsPageProps {
  onBack: () => void;
}

export default function TermsPage({ onBack }: TermsPageProps) {
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
          <h1 className="text-white text-xl md:text-2xl font-bold">Terms of Service</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-8 md:py-12 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-blue-300">Last updated: January 2024</p>
        </div>

        <div className="space-y-8">
          {/* Agreement */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <h2 className="text-white text-xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-white/80 leading-relaxed">
              By accessing and using Lumajoyaron Stream, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. These terms apply to all visitors, users, and others who access or use the service.
            </p>
          </section>

          {/* Use License */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              <h2 className="text-white text-xl font-semibold">2. Use License</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              Permission is granted to temporarily access the materials on Lumajoyaron Stream for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on the platform</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person or mirror the materials on any other server</li>
            </ul>
          </section>

          {/* Account Terms */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-blue-400" />
              <h2 className="text-white text-xl font-semibold">3. Account Terms</h2>
            </div>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li>You must be 18 years or older to use this service</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>You must not use the service for any illegal or unauthorized purpose</li>
              <li>You must not violate any laws in your jurisdiction when using our service</li>
            </ul>
          </section>

          {/* Subscription */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-6 h-6 text-blue-400" />
              <h2 className="text-white text-xl font-semibold">4. Subscription & Payments</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              By selecting a subscription, you agree to pay the applicable fees. Subscriptions automatically renew unless cancelled before the renewal date. You may cancel your subscription at any time through your account settings.
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li>All fees are charged in advance and are non-refundable</li>
              <li>Prices are subject to change with 30 days notice</li>
              <li>Cancellation will be effective at the end of your current billing period</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <h2 className="text-white text-xl font-semibold">5. Disclaimer</h2>
            </div>
            <p className="text-white/80 leading-relaxed">
              The materials on Lumajoyaron Stream are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property. We do not warrant that the service will be uninterrupted or error-free.
            </p>
          </section>

          {/* Limitations */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <h2 className="text-white text-xl font-semibold mb-4">6. Limitations</h2>
            <p className="text-white/80 leading-relaxed">
              In no event shall Lumajoyaron Stream or its suppliers be liable for any damages arising out of the use or inability to use the service, even if we have been notified of the possibility of such damages. Some jurisdictions do not allow limitations on implied warranties or limitations of liability for incidental damages, so these limitations may not apply to you.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-blue-900/20 rounded-2xl p-6 border border-blue-800/30">
            <h2 className="text-white text-xl font-semibold mb-4">7. Contact Information</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Questions about the Terms of Service should be sent to us at:
            </p>
            <div className="text-blue-300">
              <p>Email: legal@lumajoyaron.stream</p>
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
