'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProgramClient() {
  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            miruky <span className="gradient-text">Programming</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            コードを「書く」か「読む」か — 2つのモードで実力を磨こう
          </p>
        </motion.div>

        {/* Mode Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Writing Mode */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Link href="/program/writing/">
              <div className="glass-card p-8 hover-card neon-border group cursor-pointer h-full text-center">
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center border border-accent-cyan/20 group-hover:border-accent-cyan/40 transition-all group-hover:scale-105">
                  <svg className="w-10 h-10 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                  Writing
                </h2>
                <p className="text-sm text-slate-500 mb-1">コードを書いて学ぶ</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                    9 言語
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                    270 レッスン
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-4 leading-relaxed">
                  完全未経験から上級者まで。実際にコードを書きながら、現場で通用するスキルを身につけましょう。
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Reading Mode */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <Link href="/program/reading/">
              <div className="glass-card p-8 hover-card neon-border group cursor-pointer h-full text-center">
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center border border-accent-purple/20 group-hover:border-accent-purple/40 transition-all group-hover:scale-105">
                  <svg className="w-10 h-10 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                  Reading
                </h2>
                <p className="text-sm text-slate-500 mb-1">良質なコードを読んで学ぶ</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                    3 言語
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                    100 レッスン
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-4 leading-relaxed">
                  リーダブルコード・Clean Architecture・GoFデザインパターン — 著名書籍のベストプラクティスを学ぶ。
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-600 text-xs mt-12"
        >
          進捗はブラウザに自動保存されます
        </motion.p>
      </div>
    </div>
  );
}
