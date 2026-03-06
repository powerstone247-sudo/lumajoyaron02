'use client';

import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ContactPageProps {
  onBack: () => void;
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

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
          <h1 className="text-white text-xl md:text-2xl font-bold">Contact Us</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-8 md:py-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div>
            <div className="text-center md:text-left mb-8">
              <MessageCircle className="w-12 h-12 text-blue-400 mx-auto md:mx-0 mb-4" />
              <h2 className="text-white text-2xl font-bold mb-2">Get in Touch</h2>
              <p className="text-white/60">We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-blue-300">support@lumajoyaron.stream</p>
                  <p className="text-white/50 text-sm">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Phone</h3>
                  <p className="text-blue-300">+1 (555) 123-4567</p>
                  <p className="text-white/50 text-sm">Mon-Fri 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Address</h3>
                  <p className="text-blue-300">123 Streaming Avenue</p>
                  <p className="text-white/50 text-sm">Digital City, DC 10001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Business Hours</h3>
                  <p className="text-blue-300">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-white/50 text-sm">Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-blue-900/20 rounded-2xl p-6 md:p-8 border border-blue-800/30">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-white/60">Thank you for contacting us. We&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Name</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-blue-950/50 border-blue-800/50 text-white placeholder:text-blue-400/40 focus:border-blue-500 h-12"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-blue-950/50 border-blue-800/50 text-white placeholder:text-blue-400/40 focus:border-blue-500 h-12"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full h-12 bg-blue-950/50 border border-blue-800/50 rounded-md px-3 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Message</label>
                  <textarea
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-blue-950/50 border border-blue-800/50 rounded-md px-3 py-3 text-white placeholder:text-blue-400/40 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-base"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
