'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toeicPart6Questions } from '@/data/english/toeic-part6';
import { useEnglishProgress } from '@/hooks/useEnglishProgress';
import type { ToeicPart6Set } from '@/data/english/types';

type Mode = 'list' | 'quiz' | 'result';

export default function ToeicPart6Quiz({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<Mode>('list');
  const [setIdx, setSetIdx] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const { recordToeic } = useEnglishProgress();

  const currentSet = toeicPart6Questions[setIdx];

  const startSet = useCallback((idx: number) => {
    setSetIdx(idx);
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setAnswers([]);
    setMode('quiz');
  }, []);

  const handleSelect = useCallback((idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    const q = currentSet.questions[currentQ];
    const isCorrect = idx === q.answer;
    recordToeic('toeicPart6', isCorrect);
    setAnswers(prev => [...prev, idx]);
  }, [showAnswer, currentSet, currentQ, recordToeic]);

  const handleNext = useCallback(() => {
    if (currentQ + 1 >= currentSet.questions.length) {
      setMode('result');
      return;
    }
    setCurrentQ(prev => prev + 1);
    setSelected(null);
    setShowAnswer(false);
  }, [currentQ, currentSet]);

  // Keyboard
  useEffect(() => {
    if (mode !== 'quiz') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '4') handleSelect(parseInt(e.key) - 1);
      else if ((e.key === 'Enter' || e.key === ' ') && showAnswer) { e.preventDefault(); handleNext(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mode, showAnswer, handleSelect, handleNext]);

  // Highlight blanks in passage
  const renderPassage = (text: string) => {
    let result = text;
    currentSet.questions.forEach((q, i) => {
      const blankPattern = `(${q.blankNumber})______`;
      const answeredIdx = answers[i];
      if (answeredIdx !== undefined && answeredIdx !== null) {
        const isCorrect = answeredIdx === q.answer;
        result = result.replace(blankPattern, `【${q.choices[q.answer]}】`);
      }
    });
    return result;
  };

  // ── List ──
  if (mode === 'list') {
    return (
      <div className="relative min-h-screen pt-24 pb-20 dark-context">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 section-container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={onBack} className="text-slate-400 hover:text-white text-sm mb-6">← 戻る</button>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center border border-rose-500/20">
                <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
              </span>
              TOEIC Part 6
            </h1>
            <p className="text-slate-400 mb-6">テキスト穴埋め — {toeicPart6Questions.length}セット</p>
            <div className="space-y-3">
              {toeicPart6Questions.map((s, i) => (
                <motion.button key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => startSet(i)}
                  className="w-full text-left glass-card p-4 hover-card border border-amber-500/20 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm">Set #{i + 1}</p>
                      <p className="text-xs text-slate-500">{s.questions.length}問</p>
                    </div>
                    <span className="text-amber-400 text-lg">→</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Result ──
  if (mode === 'result') {
    const correctCount = answers.reduce<number>((sum, a, i) => sum + (a === currentSet.questions[i].answer ? 1 : 0), 0);
    const pct = Math.round((correctCount / currentSet.questions.length) * 100);
    return (
      <div className="relative min-h-screen pt-24 pb-20 dark-context">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 section-container max-w-md text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="glass-card p-8 neon-border">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center border border-rose-500/20">
                {pct >= 80 ? (
                  <svg className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                ) : pct >= 60 ? (
                  <svg className="w-10 h-10 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                ) : (
                  <svg className="w-10 h-10 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                )}
              </div>
              <p className="text-5xl font-black text-white mb-1">{pct}%</p>
              <p className="text-slate-400 mb-6">{correctCount} / {currentSet.questions.length} 正解</p>
              <div className="text-left space-y-3 mb-6">
                {currentSet.questions.map((q, i) => (
                  <div key={q.id} className={`p-3 rounded-lg border ${answers[i] === q.answer ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                    <p className="text-xs text-slate-400 mb-1">空欄 ({q.blankNumber})</p>
                    <p className={`text-sm font-bold ${answers[i] === q.answer ? 'text-green-400' : 'text-red-400'}`}>
                      {answers[i] === q.answer ? <span className="text-green-400">&#10003;</span> : <span className="text-red-400">&#10007;</span>} {q.choices[q.answer]}
                    </p>
                    {answers[i] !== q.answer && <p className="text-xs text-slate-500 mt-1">{q.explanation}</p>}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => startSet(setIdx)} className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white font-bold">もう一度</button>
                <button onClick={() => setMode('list')} className="flex-1 py-3 border border-slate-600 rounded-xl text-white font-bold hover:bg-slate-800">一覧へ</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Quiz ──
  const q = currentSet.questions[currentQ];
  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative z-10 section-container max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setMode('list')} className="text-slate-400 hover:text-white text-sm">✕ やめる</button>
          <span className="text-slate-400 text-sm">空欄 ({q.blankNumber}) — {currentQ + 1}/{currentSet.questions.length}</span>
        </div>
        <div className="h-1 bg-slate-700 rounded-full mb-6 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            animate={{ width: `${((currentQ + (showAnswer ? 1 : 0)) / currentSet.questions.length) * 100}%` }} />
        </div>

        {/* Passage */}
        <div className="glass-card p-5 mb-6 max-h-[40vh] overflow-y-auto">
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{renderPassage(currentSet.passage)}</p>
        </div>

        {/* Current blank question */}
        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="glass-card p-4 mb-4">
              <p className="text-white font-medium text-sm">空欄 ({q.blankNumber}) に入る最も適切なものを選んでください</p>
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
                  <p className="text-sm text-slate-300">{q.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {showAnswer && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white font-bold text-lg hover:scale-[1.02] transition-transform">
                {currentQ + 1 < currentSet.questions.length ? '次の空欄 →' : '結果を見る'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
