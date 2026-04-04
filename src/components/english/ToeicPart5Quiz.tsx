'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toeicPart5Questions } from '@/data/english/toeic-part5';
import { useEnglishProgress } from '@/hooks/useEnglishProgress';
import type { ToeicPart5Question } from '@/data/english/types';

type Mode = 'menu' | 'quiz' | 'result';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ToeicPart5Quiz({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<Mode>('menu');
  const [batch, setBatch] = useState(20);
  const [questions, setQuestions] = useState<ToeicPart5Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const { recordToeic } = useEnglishProgress();

  const startQuiz = useCallback((size: number) => {
    const shuffled = shuffleArray(toeicPart5Questions).slice(0, size);
    setQuestions(shuffled);
    setCurrent(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setBatch(size);
    setMode('quiz');
  }, []);

  const handleSelect = useCallback((idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    const q = questions[current];
    const isCorrect = idx === q.answer;
    if (isCorrect) setScore(prev => prev + 1);
    recordToeic('toeicPart5', isCorrect);
  }, [showAnswer, questions, current, recordToeic]);

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setMode('result');
      return;
    }
    setCurrent(prev => prev + 1);
    setSelected(null);
    setShowAnswer(false);
  }, [current, questions]);

  // Keyboard shortcuts
  useEffect(() => {
    if (mode !== 'quiz') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '4') {
        handleSelect(parseInt(e.key) - 1);
      } else if ((e.key === 'Enter' || e.key === ' ') && showAnswer) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mode, showAnswer, handleSelect, handleNext]);

  // ── Menu ──
  if (mode === 'menu') {
    return (
      <div className="relative min-h-screen pt-24 pb-20 dark-context">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 section-container max-w-md">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={onBack} className="text-slate-400 hover:text-white text-sm mb-6">← 戻る</button>
            <h1 className="text-3xl font-bold text-white mb-2">📝 TOEIC Part 5</h1>
            <p className="text-slate-400 mb-8">短文穴埋め問題 — 100問</p>

            <p className="text-sm text-slate-400 mb-3">出題数を選択</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[10, 20, 50, 100].map(n => (
                <button key={n} onClick={() => startQuiz(n)}
                  className="glass-card p-5 text-center hover-card border border-orange-500/20 transition-all">
                  <p className="text-3xl font-black text-white">{n}</p>
                  <p className="text-xs text-slate-500">問</p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Result ──
  if (mode === 'result') {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="relative min-h-screen pt-24 pb-20 dark-context">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 section-container max-w-md text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="glass-card p-8 neon-border">
              <p className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '💪' : '📝'}</p>
              <p className="text-5xl font-black text-white mb-1">{pct}%</p>
              <p className="text-slate-400 mb-6">{score} / {questions.length} 正解</p>
              <div className="flex gap-3">
                <button onClick={() => startQuiz(batch)} className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl text-white font-bold">もう一度</button>
                <button onClick={() => setMode('menu')} className="flex-1 py-3 border border-slate-600 rounded-xl text-white font-bold hover:bg-slate-800">メニューへ</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Quiz ──
  const q = questions[current];
  const highlightSentence = (text: string) => {
    const parts = text.split('______');
    if (parts.length < 2) return <span>{text}</span>;
    return (
      <>
        {parts[0]}
        {showAnswer ? (
          <span className="font-bold text-orange-400 underline">{q.choices[q.answer]}</span>
        ) : (
          <span className="inline-block w-24 border-b-2 border-orange-400 mx-1" />
        )}
        {parts[1]}
      </>
    );
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative z-10 section-container max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setMode('menu')} className="text-slate-400 hover:text-white text-sm">✕ やめる</button>
          <span className="text-slate-400 text-sm">{current + 1}/{questions.length}</span>
        </div>
        <div className="h-1 bg-slate-700 rounded-full mb-6 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
            animate={{ width: `${((current + (showAnswer ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="glass-card p-5 mb-4">
              <p className="text-xs text-orange-400 mb-2 font-bold">Part 5 · #{current + 1}</p>
              <p className="text-white leading-relaxed">{highlightSentence(q.sentence)}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 mb-6">
              {q.choices.map((choice, idx) => {
                let cls = 'border-slate-600/50 text-slate-200 hover:bg-white/5';
                if (showAnswer) {
                  if (idx === q.answer) cls = 'border-green-500 bg-green-500/20 text-green-300';
                  else if (idx === selected) cls = 'border-red-500 bg-red-500/20 text-red-300';
                  else cls = 'border-slate-700 text-slate-500';
                }
                return (
                  <button key={idx} onClick={() => handleSelect(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${cls}`}>
                    <span className="text-xs text-slate-500 mr-2">{idx + 1}</span>{choice}
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {showAnswer && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 mb-6">
                  <p className={`text-sm font-bold mb-1 ${selected === q.answer ? 'text-green-400' : 'text-red-400'}`}>
                    {selected === q.answer ? '✅ 正解！' : '❌ 不正解'}
                  </p>
                  <p className="text-sm text-slate-300">{q.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {showAnswer && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl text-white font-bold text-lg hover:scale-[1.02] transition-transform">
                {current + 1 < questions.length ? '次の問題 →' : '結果を見る'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
