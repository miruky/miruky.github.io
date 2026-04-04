'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { grammar650 } from '@/data/english/grammar-650';
import { grammar800 } from '@/data/english/grammar-800';
import { grammar950 } from '@/data/english/grammar-950';
import { useEnglishProgress } from '@/hooks/useEnglishProgress';
import type { GrammarQuestion, ToeicLevel } from '@/data/english/types';

type QuizMode = 'menu' | 'quiz' | 'result';

export default function GrammarQuiz({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<QuizMode>('menu');
  const [level, setLevel] = useState<ToeicLevel>(650);
  const [questions, setQuestions] = useState<GrammarQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState({ correct: 0, total: 0 });
  const [batchSize, setBatchSize] = useState(20);
  const { recordGrammar } = useEnglishProgress();

  const allByLevel: Record<ToeicLevel, GrammarQuestion[]> = useMemo(() => ({
    650: grammar650,
    800: grammar800,
    950: grammar950,
  }), []);

  const startQuiz = useCallback(() => {
    const pool = allByLevel[level];
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, batchSize);
    setQuestions(shuffled);
    setCurrent(0);
    setSelected(null);
    setShowAnswer(false);
    setResults({ correct: 0, total: 0 });
    setMode('quiz');
  }, [level, batchSize, allByLevel]);

  const handleSelect = useCallback((idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    const isCorrect = idx === questions[current].answer;
    recordGrammar(level, isCorrect);
    setResults(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
  }, [showAnswer, questions, current, recordGrammar, level]);

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) { setMode('result'); return; }
    setCurrent(prev => prev + 1);
    setSelected(null);
    setShowAnswer(false);
  }, [current, questions.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (mode !== 'quiz') return;
      if (!showAnswer) {
        if (e.key >= '1' && e.key <= '4') handleSelect(parseInt(e.key) - 1);
      } else {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNext(); }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode, showAnswer, handleSelect, handleNext]);

  if (mode === 'menu') {
    return (
      <div className="relative min-h-screen pt-24 pb-20 dark-context">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 section-container max-w-2xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={onBack} className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-1">← 戻る</button>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple/20 to-indigo-500/20 flex items-center justify-center border border-accent-purple/20">
                <svg className="w-5 h-5 text-accent-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
              </span>
              文法ドリル
            </h1>
            <p className="text-slate-400 mb-8">レベル別100問ずつ、合計300問</p>
            <div className="glass-card p-6 mb-6">
              <h3 className="text-white font-bold mb-4">レベル選択</h3>
              <div className="grid grid-cols-3 gap-3">
                {([650, 800, 950] as ToeicLevel[]).map(lv => (
                  <button key={lv} onClick={() => setLevel(lv)}
                    className={`p-4 rounded-lg border text-center transition-all ${
                      level === lv ? 'bg-purple-500/20 border-purple-400 text-white' : 'border-slate-600/50 text-slate-300 hover:bg-white/5'
                    }`}>
                    <p className="text-2xl font-black">{lv}</p>
                    <p className="text-xs text-slate-500">{lv === 650 ? '基礎' : lv === 800 ? '中級' : '上級'}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 mb-6">
              <h3 className="text-white font-bold mb-3">出題数</h3>
              <div className="flex gap-2">
                {[10, 20, 50, 100].map(n => (
                  <button key={n} onClick={() => setBatchSize(n)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      batchSize === n ? 'bg-purple-500 text-white' : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                    }`}>{n}問</button>
                ))}
              </div>
            </div>
            <button onClick={startQuiz}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white font-bold text-lg hover:scale-[1.02] transition-transform">
              スタート
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (mode === 'result') {
    const pct = Math.round((results.correct / results.total) * 100);
    return (
      <div className="relative min-h-screen pt-24 pb-20 dark-context">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 section-container max-w-md text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="glass-card p-8 neon-border">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-indigo-500/20 flex items-center justify-center border border-accent-purple/20">
                {pct >= 80 ? (
                  <svg className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                ) : pct >= 60 ? (
                  <svg className="w-10 h-10 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                ) : (
                  <svg className="w-10 h-10 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">文法ドリル結果</h2>
              <p className="text-sm text-slate-400 mb-1">{level}点レベル</p>
              <p className="text-5xl font-black text-white mb-1">{pct}%</p>
              <p className="text-slate-400 mb-6">{results.correct} / {results.total} 正解</p>
              <div className="flex gap-3">
                <button onClick={startQuiz} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white font-bold hover:scale-[1.02] transition-transform">もう一度</button>
                <button onClick={() => setMode('menu')} className="flex-1 py-3 border border-slate-600 rounded-xl text-white font-bold hover:bg-slate-800 transition-colors">メニュー</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;

  // Highlight ______ in sentence
  const parts = q.sentence.split('______');

  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative z-10 section-container max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setMode('menu')} className="text-slate-400 hover:text-white text-sm">✕ やめる</button>
          <span className="text-slate-400 text-sm font-mono">{current + 1} / {questions.length}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-bold">{q.category}</span>
        </div>
        <div className="h-1 bg-slate-700 rounded-full mb-8 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
            animate={{ width: `${((current + (showAnswer ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            className="glass-card p-6 mb-6">
            <p className="text-lg text-white leading-relaxed">
              {parts[0]}<span className="inline-block min-w-[80px] border-b-2 border-purple-400 mx-1 text-center text-purple-300 font-bold">
                {showAnswer ? q.choices[q.answer] : '______'}
              </span>{parts[1]}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-3 mb-6">
          {q.choices.map((choice, idx) => {
            let btnClass = 'border-slate-600/50 text-slate-200 hover:bg-white/5';
            if (showAnswer) {
              if (idx === q.answer) btnClass = 'border-green-500 bg-green-500/20 text-green-300';
              else if (idx === selected) btnClass = 'border-red-500 bg-red-500/20 text-red-300';
              else btnClass = 'border-slate-700 text-slate-500';
            }
            return (
              <button key={idx} onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-xl border text-left font-medium transition-all ${btnClass}`}>
                <span className="text-xs text-slate-500 mr-2">{idx + 1}</span>{choice}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showAnswer && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="glass-card p-5 mb-6">
              <p className={`text-sm font-bold mb-2 ${selected === q.answer ? 'text-emerald-400' : 'text-red-400'}`}>
                {selected === q.answer ? (<span className="text-green-400 font-bold">正解！</span>) : (<span className="text-red-400 font-bold">不正解</span>)}
              </p>
              <p className="text-sm text-slate-300">{q.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {showAnswer && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white font-bold text-lg hover:scale-[1.02] transition-transform">
            {current + 1 < questions.length ? '次の問題 →' : '結果を見る'}
          </motion.button>
        )}
      </div>
    </div>
  );
}
