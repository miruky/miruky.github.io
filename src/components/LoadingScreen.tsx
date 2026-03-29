'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // セッション内で既にロード済みならスキップ
    if (typeof window !== 'undefined' && sessionStorage.getItem('site-loaded')) {
      setIsVisible(false);
      return;
    }

    let current = 0;
    const timer = setInterval(() => {
      current += Math.random() * 18 + 14;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem('site-loaded', '1');
        }, 250);
      }
      setProgress(current);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white dark:bg-dark-900"
        >
          <motion.img
            src="/images/icon.png"
            alt="miruky"
            className="w-16 h-16 rounded-2xl mb-8 shadow-lg"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
          <div className="w-48 h-1.5 bg-slate-200 dark:bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full transition-all duration-75 ease-linear"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 font-mono tracking-wider">
            Loading...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
