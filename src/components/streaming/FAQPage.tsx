'use client';

import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FAQPageProps {
  onBack: () => void;
}

const faqCategories = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'To create an account, click on the profile icon in the top right corner and select "Sign Up". Enter your email address, create a password, and follow the verification steps sent to your email.'
      },
      {
        q: 'What devices can I use to watch?',
        a: 'Lumajoyaron Stream is available on smart TVs, smartphones, tablets, gaming consoles, and web browsers. Download our app from the App Store or Google Play, or visit our website on any browser.'
      },
      {
        q: 'How do I start my free trial?',
        a: 'New users get a 7-day free trial. Simply sign up, choose your subscription plan, and enter your payment details. You won\'t be charged until the trial period ends, and you can cancel anytime.'
      }
    ]
  },
  {
    category: 'Subscription & Billing',
    questions: [
      {
        q: 'What subscription plans are available?',
        a: 'We offer three plans: Basic ($8.99/month - 1 screen, HD), Standard ($12.99/month - 2 screens, Full HD), and Premium ($15.99/month - 4 screens, 4K Ultra HD). Annual plans offer a 20% discount.'
      },
      {
        q: 'How do I cancel my subscription?',
        a: 'Go to Account Settings > Subscription > Cancel Subscription. Your access continues until the end of your current billing period. You can reactivate anytime by logging back in.'
      },
      {
        q: 'Can I change my plan?',
        a: 'Yes! You can upgrade or downgrade your plan anytime from Account Settings. Plan changes take effect immediately, with prorated charges or credits applied.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and in some regions, direct carrier billing and digital wallets like Apple Pay and Google Pay.'
      }
    ]
  },
  {
    category: 'Watching & Streaming',
    questions: [
      {
        q: 'Can I download content to watch offline?',
        a: 'Yes! Premium and Standard subscribers can download movies and shows on mobile devices. Look for the download icon on any title. Downloads are available for 30 days and must be watched within 48 hours once started.'
      },
      {
        q: 'How many devices can stream at once?',
        a: 'The number of simultaneous streams depends on your plan: Basic (1), Standard (2), Premium (4). You can be logged in on unlimited devices, but streaming is limited to your plan\'s device count.'
      },
      {
        q: 'Can I share my account?',
        a: 'Yes, you can create up to 5 profiles per account. Each profile has its own viewing history and recommendations. For sharing with people outside your household, consider our extra member option.'
      },
      {
        q: 'Why is the video quality not optimal?',
        a: 'Video quality depends on your internet speed and subscription plan. For HD, you need at least 5 Mbps; for 4K, at least 25 Mbps. Check your internet connection and ensure your plan supports the desired quality.'
      }
    ]
  },
  {
    category: 'Account & Security',
    questions: [
      {
        q: 'How do I reset my password?',
        a: 'Click "Forgot Password" on the login page, enter your email, and follow the reset link sent to your inbox. For security, the link expires after 24 hours.'
      },
      {
        q: 'How do I update my email address?',
        a: 'Go to Account Settings > Profile > Email. Enter your new email and password, then verify the change through the confirmation email sent to both old and new addresses.'
      },
      {
        q: 'How do I delete my account?',
        a: 'Go to Account Settings > Privacy > Delete Account. This action is permanent and will remove all your data, viewing history, and preferences. You\'ll need to confirm via email.'
      }
    ]
  }
];

export default function FAQPage({ onBack }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
          <h1 className="text-white text-xl md:text-2xl font-bold">FAQ</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-8 md:py-12 max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <HelpCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-white/60">Find answers to common questions about Lumajoyaron Stream</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-blue-950/50 border-blue-800/50 text-white placeholder:text-blue-400/40 focus:border-blue-500"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="text-blue-400 font-semibold text-lg mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.questions.map((item, qIndex) => {
                  const questionId = `${catIndex}-${qIndex}`;
                  const isExpanded = expandedQuestions.includes(questionId);
                  
                  return (
                    <div
                      key={qIndex}
                      className="bg-blue-900/20 rounded-xl border border-blue-800/30 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(questionId)}
                        className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                      >
                        <span className="text-white font-medium pr-4">{item.q}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        )}
                      </button>
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="px-4 md:px-5 pb-4 md:pb-5 text-white/70">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No questions found matching &quot;{searchQuery}&quot;</p>
          </div>
        )}

        {/* Still Need Help */}
        <div className="mt-12 bg-blue-900/20 rounded-2xl p-6 md:p-8 border border-blue-800/30 text-center">
          <h3 className="text-white text-xl font-semibold mb-2">Still need help?</h3>
          <p className="text-white/60 mb-4">Our support team is here to assist you</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
