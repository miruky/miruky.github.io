'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const TypingGame = dynamic(() => import('@/components/TypingGame'), { ssr: false });
const BlockGame = dynamic(() => import('@/components/BlockGame'), { ssr: false });
const QuizGame = dynamic(() => import('@/components/QuizGame'), { ssr: false });

type GameMode = 'select' | 'typing' | 'blocks' | 'quiz';

export default function GamePage() {
  const [mode, setMode] = useState<GameMode>('select');

  return (
    <div className="min-h-screen bg-hero-gradient dark-context flex items-center justify-center pt-20 pb-10">
      {mode === 'select' && (
        <div className="w-full max-w-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              miruky <span className="gradient-text">Games</span>
            </h1>
            <p className="text-slate-400 text-sm mb-10">ゲームを選んでプレイ</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-10"
          >
            <div className="mascot-bounce inline-block">
              <img src="/images/mascot/mascot-happy.png" alt="" className="w-24 h-auto mx-auto drop-shadow-lg" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {/* タイピングゲーム */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              onClick={() => setMode('typing')}
              className="glass-card p-6 hover-card neon-border text-center group transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center border border-accent-cyan/20 group-hover:border-accent-cyan/40 transition-colors">
                <span className="text-2xl font-bold font-mono text-accent-cyan">A</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">タイピングゲーム</h3>
              <p className="text-xs text-slate-400">ローマ字タイピングで腕試し</p>
            </motion.button>

            {/* ブロック積みゲーム */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => setMode('blocks')}
              className="glass-card p-6 hover-card neon-border text-center group transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center border border-accent-purple/20 group-hover:border-accent-purple/40 transition-colors">
                <svg className="w-7 h-7 text-accent-purple" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="14" width="8" height="8" rx="1" opacity="0.6" />
                  <rect x="6" y="6" width="8" height="8" rx="1" opacity="0.8" />
                  <rect x="14" y="10" width="8" height="8" rx="1" opacity="0.6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">ブロック積みゲーム</h3>
              <p className="text-xs text-slate-400">落ちるブロックを積み上げろ</p>
            </motion.button>

            {/* IT知識クイズ */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              onClick={() => setMode('quiz')}
              className="glass-card p-6 hover-card neon-border text-center group transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center border border-amber-400/20 group-hover:border-amber-400/40 transition-colors">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">IT知識クイズ</h3>
              <p className="text-xs text-slate-400">IPA試験レベルの選択問題</p>
            </motion.button>
          </div>

          <p className="text-slate-600 text-[10px] mt-8">ゲーム内メニューからいつでも戻れます</p>
        </div>
      )}

      {mode === 'typing' && <TypingGame onBack={() => setMode('select')} />}
      {mode === 'blocks' && <BlockGame onBack={() => setMode('select')} />}
      {mode === 'quiz' && <QuizGame onBack={() => setMode('select')} />}
    </div>
  );
}
