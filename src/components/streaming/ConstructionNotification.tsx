'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConstructionNotification() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to make it feel more natural when entering
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 7500); // 500ms delay + 7000ms duration

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'circOut' }}
          className="fixed top-4 left-4 right-4 z-[200] flex justify-center pointer-events-none"
        >
          <div className="bg-[#0f172a]/95 backdrop-blur-md border border-blue-500/30 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.2)] p-4 md:p-5 max-w-2xl w-full pointer-events-auto flex items-start gap-3 md:gap-4 ring-1 ring-white/10">
            <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
              <AlertCircle className="w-5 h-5 text-blue-400" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">System Message</span>
              </div>
              <p className="text-slate-200 text-sm md:text-[15px] leading-relaxed pr-6">
                Thank you for coming, we apologies for our platform still being under construction.. but two movies are available now, purchase one and get access.
              </p>

              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => setIsVisible(false)}
                  className="bg-blue-600 hover:bg-blue-500 text-white h-9 px-6 text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
                >
                  OK
                </Button>
              </div>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
