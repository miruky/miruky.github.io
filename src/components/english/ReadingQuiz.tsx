'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { readingPassages650 } from '@/data/english/reading-650';
import { readingPassages800 } from '@/data/english/reading-800';
import { readingPassages950 } from '@/data/english/reading-950';
import { useEnglishProgress } from '@/hooks/useEnglishProgress';
import type { ReadingPassage, ToeicLevel } from '@/data/english/types';

type ViewMode = 'list' | 'reading' | 'result';

export default function ReadingQuiz({ onBack }: { onBack: () => void }) {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [level, setLevel] = useState<ToeicLevel>(650);
  const [passageIdx, setPassageIdx] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const { recordReading } = useEnglishProgress();

  const allPassages: Record<ToeicLevel, ReadingPassage[]> = useMemo(() => ({
    650: readingPassages650,
    800: readingPassages800,
    950: readingPassages950,
  }), []);

  const passages = allPassages[level];
  const passage = passages[passageIdx];

  const startPassage = useCallback((idx: number) => {
    setPassageIdx(idx);
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setAnswers([]);
    setViewMode('reading');
  }, []);

  const handleSelect = useCallback((idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    const q = passage.questions[currentQ];
    const isCorrect = idx === q.answer;
    recordReading(passage.id, isCorrect);
    setAnswers(prev => [...prev, idx]);
  }, [showAnswer, passage, currentQ, recordReading]);

  const handleNext = useCallback(() => {
    if (currentQ + 1 >= passage.questions.length) {
      setViewMode('result');
      return;
    }
    setCurrentQ(prev => prev + 1);
    setSelected(null);
    setShowAnswer(false);
  }, [currentQ, passage]);

  // ── List View ──
  if (viewMode === 'list') {
    return (
      <div className="relative min-h-screen pt-24 pb-20 dark-context">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 section-container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={onBack} className="text-slate-400 hover:text-white text-sm mb-6">← 戻る</button>
            <h1 className="text-3xl font-bold text-white mb-2">📖 長文読解</h1>
            <p className="text-slate-400 mb-6">レベル別50本の長文、各4〜5問付き</p>

            <div className="flex gap-2 mb-6">
              {([650, 800, 950] as ToeicLevel[]).map(lv => (
                <button key={lv} onClick={() => setLevel(lv)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    level === lv ? 'bg-emerald-500 text-white' : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                  }`}>{lv}点</button>
              ))}
            </div>

            <div className="space-y-3">
              {passages.map((p, i) => (
                <motion.button key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => startPassage(i)}
                  className="w-full text-left glass-card p-4 hover-card border border-emerald-500/20 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm">#{i + 1} {p.title}</p>
                      <p className="text-xs text-slate-500">{p.category} · {p.questions.length}問</p>
                    </div>
                    <span className="text-emerald-400 text-lg">→</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Result View ──
  if (viewMode === 'result') {
    const correctCount = answers.reduce<number>((sum, a, i) => sum + (a === passage.questions[i].answer ? 1 : 0), 0);
    const pct = Math.round((correctCount / passage.questions.length) * 100);
    return (
      <div className="relative min-h-screen pt-24 pb-20 dark-context">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 section-container max-w-md text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="glass-card p-8 neon-border">
              <p className="text-6xl mb-4">{pct >= 80 ? '🎉' : pct >= 60 ? '💪' : '📚'}</p>
              <h2 className="text-xl font-bold text-white mb-1">{passage.title}</h2>
              <p className="text-5xl font-black text-white mb-1">{pct}%</p>
              <p className="text-slate-400 mb-6">{correctCount} / {passage.questions.length} 正解</p>
              {/* Review answers */}
              <div className="text-left space-y-3 mb-6">
                {passage.questions.map((q, i) => (
                  <div key={q.id} className={`p-3 rounded-lg border ${answers[i] === q.answer ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                    <p className="text-xs text-slate-300 mb-1">{q.question}</p>
                    <p className={`text-sm font-bold ${answers[i] === q.answer ? 'text-green-400' : 'text-red-400'}`}>
                      {answers[i] === q.answer ? '✅' : '❌'} {q.choices[q.answer]}
                    </p>
                    {answers[i] !== q.answer && (
                      <p className="text-xs text-slate-500 mt-1">{q.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => startPassage(passageIdx)} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-bold">もう一度</button>
                <button onClick={() => setViewMode('list')} className="flex-1 py-3 border border-slate-600 rounded-xl text-white font-bold hover:bg-slate-800">一覧へ</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Reading + Questions ──
  const q = passage.questions[currentQ];

  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative z-10 section-container max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setViewMode('list')} className="text-slate-400 hover:text-white text-sm">✕ やめる</button>
          <span className="text-slate-400 text-sm">Q{currentQ + 1}/{passage.questions.length}</span>
        </div>
        <div className="h-1 bg-slate-700 rounded-full mb-6 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
            animate={{ width: `${((currentQ + (showAnswer ? 1 : 0)) / passage.questions.length) * 100}%` }} />
        </div>

        {/* Passage */}
        <div className="glass-card p-5 mb-6 max-h-[40vh] overflow-y-auto">
          <h3 className="text-white font-bold mb-2">{passage.title}</h3>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{passage.passage}</p>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="glass-card p-5 mb-4">
              <p className="text-white font-medium">{q.question}</p>
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
                    <span className="text-xs text-slate-500 mr-2">{String.fromCharCode(65 + idx)}</span>{choice}
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {showAnswer && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 mb-6">
                  <p className={`text-sm font-bold mb-1 ${selected === q.answer ? 'text-emerald-400' : 'text-red-400'}`}>
                    {selected === q.answer ? '✅ 正解！' : '❌ 不正解'}
                  </p>
                  <p className="text-sm text-slate-300">{q.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {showAnswer && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-bold text-lg hover:scale-[1.02] transition-transform">
                {currentQ + 1 < passage.questions.length ? '次の問題 →' : '結果を見る'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
