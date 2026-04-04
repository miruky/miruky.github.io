'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allVocabQuestions } from '@/data/english/vocab-index';
import { grammar650 } from '@/data/english/grammar-650';
import { grammar800 } from '@/data/english/grammar-800';
import { grammar950 } from '@/data/english/grammar-950';
import { toeicPart5Questions } from '@/data/english/toeic-part5';
import { useEnglishProgress } from '@/hooks/useEnglishProgress';

type QuestionItem = {
  type: 'vocab' | 'grammar' | 'toeic';
  sentence: string;
  choices: string[];
  answer: number;
  explanation: string;
};

// Seed-based daily shuffle
function dailySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function DailyChallenge({ onBack }: { onBack: () => void }) {
  const seed = dailySeed();
  const rng = useMemo(() => seededRandom(seed), [seed]);
  const { recordVocab, recordGrammar, recordToeic } = useEnglishProgress();

  const questions = useMemo<QuestionItem[]>(() => {
    const allGrammar = [...grammar650, ...grammar800, ...grammar950];
    const pool: QuestionItem[] = [
      ...allVocabQuestions.map(q => ({
        type: 'vocab' as const,
        sentence: `"${q.word}" の意味は？`,
        choices: q.choices,
        answer: q.answer,
        explanation: `${q.word} = ${q.meaning}（${q.partOfSpeech}）\n例: ${q.example}`,
      })),
      ...allGrammar.map(q => ({
        type: 'grammar' as const,
        sentence: q.sentence,
        choices: q.choices,
        answer: q.answer,
        explanation: q.explanation,
      })),
      ...toeicPart5Questions.map(q => ({
        type: 'toeic' as const,
        sentence: q.sentence,
        choices: q.choices,
        answer: q.answer,
        explanation: q.explanation,
      })),
    ];
    // Shuffle with daily seed and pick 5
    const shuffled = [...pool].sort(() => rng() - 0.5);
    return shuffled.slice(0, 5);
  }, [rng]);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const handleSelect = useCallback((idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    const q = questions[current];
    const isCorrect = idx === q.answer;
    if (isCorrect) setScore(prev => prev + 1);
    if (q.type === 'vocab') recordVocab(current, isCorrect);
    else if (q.type === 'grammar') recordGrammar(650, isCorrect);
    else recordToeic('toeicPart5', isCorrect);
  }, [showAnswer, questions, current, recordVocab, recordGrammar, recordToeic]);

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) { setDone(true); return; }
    setCurrent(prev => prev + 1);
    setSelected(null);
    setShowAnswer(false);
  }, [current, questions]);

  useEffect(() => {
    if (done) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '4') handleSelect(parseInt(e.key) - 1);
      else if ((e.key === 'Enter' || e.key === ' ') && showAnswer) { e.preventDefault(); handleNext(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [done, showAnswer, handleSelect, handleNext]);

  // ── Done ──
  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="relative min-h-screen pt-24 pb-20 dark-context">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 section-container max-w-md text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="glass-card p-8 neon-border">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/20">
                {pct >= 80 ? (
                  <svg className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                ) : pct >= 60 ? (
                  <svg className="w-10 h-10 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                ) : (
                  <svg className="w-10 h-10 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                )}
              </div>
              <p className="text-sm text-slate-400 mb-1">今日のチャレンジ結果</p>
              <p className="text-5xl font-black text-white mb-1">{score}/{questions.length}</p>
              <p className="text-slate-400 mb-6">{pct}% 正解</p>
              <button onClick={onBack} className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-white font-bold">
                トップへ戻る
              </button>
              <p className="text-xs text-slate-500 mt-3">明日また新しい5問が出題されます</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Quiz ──
  const q = questions[current];
  const typeLabel = q.type === 'vocab' ? '単語' : q.type === 'grammar' ? '文法' : 'TOEIC';

  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative z-10 section-container max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-slate-400 hover:text-white text-sm">✕ やめる</button>
          <span className="text-slate-400 text-sm">Daily #{current + 1}/{questions.length}</span>
        </div>
        <div className="h-1 bg-slate-700 rounded-full mb-6 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
            animate={{ width: `${((current + (showAnswer ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="glass-card p-5 mb-4">
              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-bold mb-2">{typeLabel}</span>
              <p className="text-white leading-relaxed">{q.sentence}</p>
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
                    {selected === q.answer ? (<span className="text-green-400 font-bold">正解！</span>) : (<span className="text-red-400 font-bold">不正解</span>)}
                  </p>
                  <p className="text-sm text-slate-300 whitespace-pre-line">{q.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {showAnswer && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-white font-bold text-lg hover:scale-[1.02] transition-transform">
                {current + 1 < questions.length ? '次の問題 →' : '結果を見る'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
