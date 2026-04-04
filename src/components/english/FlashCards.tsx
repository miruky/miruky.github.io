'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { allVocabQuestions } from '@/data/english/vocab-index';
import { useEnglishProgress } from '@/hooks/useEnglishProgress';
import type { ToeicLevel, VocabQuestion } from '@/data/english/types';

type CardState = 'front' | 'back';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashCards({ onBack }: { onBack: () => void }) {
  const { progress, loaded, recordVocab } = useEnglishProgress();
  const [level, setLevel] = useState<'all' | ToeicLevel | 'weak'>('all');
  const [started, setStarted] = useState(false);
  const [cards, setCards] = useState<VocabQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [side, setSide] = useState<CardState>('front');
  const [known, setKnown] = useState(0);
  const [unknown, setUnknown] = useState(0);
  const [exitX, setExitX] = useState(0);

  const start = useCallback((lv: 'all' | ToeicLevel | 'weak') => {
    let pool: VocabQuestion[];
    if (lv === 'weak') {
      pool = allVocabQuestions.filter(q => progress.vocab.weak.includes(q.id));
    } else if (lv === 'all') {
      pool = allVocabQuestions;
    } else {
      pool = allVocabQuestions.filter(q => q.level === lv);
    }
    setCards(shuffleArray(pool).slice(0, 50));
    setIndex(0);
    setSide('front');
    setKnown(0);
    setUnknown(0);
    setLevel(lv);
    setStarted(true);
  }, [progress.vocab.weak]);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    const card = cards[index];
    const isKnown = direction === 'right';
    if (isKnown) { setKnown(prev => prev + 1); } else { setUnknown(prev => prev + 1); }
    recordVocab(card.id, isKnown);
    setExitX(direction === 'right' ? 300 : -300);
    setTimeout(() => {
      if (index + 1 >= cards.length) {
        setStarted(false);
      } else {
        setIndex(prev => prev + 1);
        setSide('front');
        setExitX(0);
      }
    }, 200);
  }, [cards, index, recordVocab]);

  const handleDragEnd = useCallback((_: never, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      handleSwipe(info.offset.x > 0 ? 'right' : 'left');
    }
  }, [handleSwipe]);

  // ── Menu ──
  if (!started) {
    const total = cards.length;
    const finished = known + unknown > 0;
    return (
      <div className="relative min-h-screen pt-24 pb-20 dark-context">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 section-container max-w-md">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={onBack} className="text-slate-400 hover:text-white text-sm mb-6">← 戻る</button>

            {finished ? (
              <div className="glass-card p-8 text-center neon-border mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-violet-500/20 flex items-center justify-center border border-pink-500/20">
                  <svg className="w-10 h-10 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <p className="text-sm text-slate-400 mb-1">{total}枚完了</p>
                <div className="flex justify-center gap-6 mb-4">
                  <div><p className="text-2xl font-black text-green-400">{known}</p><p className="text-xs text-slate-500">覚えた</p></div>
                  <div><p className="text-2xl font-black text-red-400">{unknown}</p><p className="text-xs text-slate-500">要復習</p></div>
                </div>
              </div>
            ) : null}

            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-violet-500/20 flex items-center justify-center border border-pink-500/20">
                <svg className="w-5 h-5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 4v16"/></svg>
              </span>
              フラッシュカード
            </h1>
            <p className="text-slate-400 mb-8">スワイプで暗記 — 右:覚えた 左:要復習</p>

            <p className="text-sm text-slate-400 mb-3">レベル選択</p>
            <div className="grid grid-cols-2 gap-3">
              {([
                { value: 'all' as const, label: '全レベル', desc: '1000語' },
                { value: 650 as const, label: '650点', desc: '基礎' },
                { value: 800 as const, label: '800点', desc: '中級' },
                { value: 950 as const, label: '950点', desc: '上級' },
                ...(loaded && progress.vocab.weak.length > 0 ? [{ value: 'weak' as const, label: '要復習', desc: `${progress.vocab.weak.length}語` }] : []),
              ] as const).map(opt => (
                <button key={String(opt.value)} onClick={() => start(opt.value)}
                  className="glass-card p-4 text-center hover-card border border-pink-500/20 transition-all">
                  <p className="text-lg font-bold text-white">{opt.label}</p>
                  <p className="text-xs text-slate-500">{opt.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Card ──
  const card = cards[index];
  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative z-10 section-container max-w-md">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setStarted(false)} className="text-slate-400 hover:text-white text-sm">✕ やめる</button>
          <span className="text-slate-400 text-sm">{index + 1}/{cards.length}</span>
        </div>
        <div className="h-1 bg-slate-700 rounded-full mb-4 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"
            animate={{ width: `${((index) / cards.length) * 100}%` }} />
        </div>

        {/* Swipe hints */}
        <div className="flex justify-between mb-2 text-xs px-2">
          <span className="text-red-400">← 要復習</span>
          <span className="text-green-400">覚えた →</span>
        </div>

        <div className="relative h-[360px] perspective-[800px]">
          <AnimatePresence mode="wait">
            <motion.div key={`${index}-${side}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: exitX, rotate: exitX > 0 ? 10 : -10 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSide(s => s === 'front' ? 'back' : 'front')}
              className="absolute inset-0 glass-card neon-border rounded-2xl cursor-pointer select-none flex flex-col items-center justify-center p-8 text-center"
            >
              {side === 'front' ? (
                <>
                  <p className="text-xs text-slate-500 mb-3">{card.partOfSpeech} · {card.level}点</p>
                  <p className="text-4xl font-black text-white mb-4">{card.word}</p>
                  <p className="text-xs text-slate-600">タップで意味を表示</p>
                </>
              ) : (
                <>
                  <p className="text-xs text-pink-400 font-bold mb-3">{card.word}</p>
                  <p className="text-2xl font-bold text-white mb-4">{card.meaning}</p>
                  <p className="text-sm text-slate-400 mb-1 italic">{card.example}</p>
                  <p className="text-xs text-slate-500">{card.exampleJa}</p>
                  <p className="text-xs text-slate-600 mt-4">スワイプで次へ</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual buttons */}
        <div className="flex gap-3 mt-4">
          <button onClick={() => handleSwipe('left')}
            className="flex-1 py-3 border border-red-500/40 rounded-xl text-red-400 font-bold hover:bg-red-500/10 transition-colors">
            要復習
          </button>
          <button onClick={() => handleSwipe('right')}
            className="flex-1 py-3 border border-green-500/40 rounded-xl text-green-400 font-bold hover:bg-green-500/10 transition-colors">
            覚えた
          </button>
        </div>

        <div className="flex justify-center gap-6 mt-4 text-sm">
          <span className="text-green-400 font-bold">{known} 覚えた</span>
          <span className="text-red-400 font-bold">{unknown} 要復習</span>
        </div>
      </div>
    </div>
  );
}
