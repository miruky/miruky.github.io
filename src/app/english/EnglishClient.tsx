'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEnglishProgress } from '@/hooks/useEnglishProgress';

const VocabQuiz = dynamic(() => import('@/components/english/VocabQuiz'), { ssr: false });
const GrammarQuiz = dynamic(() => import('@/components/english/GrammarQuiz'), { ssr: false });
const ReadingQuiz = dynamic(() => import('@/components/english/ReadingQuiz'), { ssr: false });
const ToeicPart5Quiz = dynamic(() => import('@/components/english/ToeicPart5Quiz'), { ssr: false });
const ToeicPart6Quiz = dynamic(() => import('@/components/english/ToeicPart6Quiz'), { ssr: false });
const ToeicPart7Quiz = dynamic(() => import('@/components/english/ToeicPart7Quiz'), { ssr: false });

type Mode = 'select' | 'vocab' | 'grammar' | 'reading' | 'toeic-part5' | 'toeic-part6' | 'toeic-part7';

const sections = [
  {
    id: 'vocab' as Mode,
    icon: '📝',
    title: '単語マスター',
    sub: 'Vocabulary',
    desc: 'TOEIC頻出1000単語を4択で学習',
    color: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/30',
    questions: 1000,
  },
  {
    id: 'grammar' as Mode,
    icon: '📐',
    title: '文法ドリル',
    sub: 'Grammar',
    desc: '650 / 800 / 950点レベル別 各100問',
    color: 'from-purple-500 to-indigo-600',
    border: 'border-purple-500/30',
    questions: 300,
  },
  {
    id: 'reading' as Mode,
    icon: '📖',
    title: '長文読解',
    sub: 'Reading Comprehension',
    desc: '3レベル×50本の長文 + 各4〜5問',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/30',
    questions: 50,
  },
  {
    id: 'toeic-part5' as Mode,
    icon: '✏️',
    title: 'TOEIC Part 5',
    sub: 'Incomplete Sentences',
    desc: '短文穴埋め問題 100問',
    color: 'from-orange-500 to-red-500',
    border: 'border-orange-500/30',
    questions: 100,
  },
  {
    id: 'toeic-part6' as Mode,
    icon: '📋',
    title: 'TOEIC Part 6',
    sub: 'Text Completion',
    desc: '長文穴埋め問題 25セット',
    color: 'from-rose-500 to-pink-600',
    border: 'border-rose-500/30',
    questions: 25,
  },
  {
    id: 'toeic-part7' as Mode,
    icon: '📰',
    title: 'TOEIC Part 7',
    sub: 'Reading Comprehension',
    desc: 'シングル・ダブル・トリプルパッセージ',
    color: 'from-amber-500 to-yellow-600',
    border: 'border-amber-500/30',
    questions: 20,
  },
];

export default function EnglishClient() {
  const [mode, setMode] = useState<Mode>('select');
  const { progress, loaded } = useEnglishProgress();

  const getAccuracy = (correct: number, total: number) =>
    total === 0 ? '--' : `${Math.round((correct / total) * 100)}%`;

  if (mode === 'vocab') return <VocabQuiz onBack={() => setMode('select')} />;
  if (mode === 'grammar') return <GrammarQuiz onBack={() => setMode('select')} />;
  if (mode === 'reading') return <ReadingQuiz onBack={() => setMode('select')} />;
  if (mode === 'toeic-part5') return <ToeicPart5Quiz onBack={() => setMode('select')} />;
  if (mode === 'toeic-part6') return <ToeicPart6Quiz onBack={() => setMode('select')} />;
  if (mode === 'toeic-part7') return <ToeicPart7Quiz onBack={() => setMode('select')} />;

  const totalCorrect = (loaded ? (
    progress.vocab.correct +
    progress.grammar[650].correct + progress.grammar[800].correct + progress.grammar[950].correct +
    progress.reading.correct +
    progress.toeicPart5.correct + progress.toeicPart6.correct + progress.toeicPart7.correct
  ) : 0);
  const totalAnswered = (loaded ? (
    progress.vocab.total +
    progress.grammar[650].total + progress.grammar[800].total + progress.grammar[950].total +
    progress.reading.total +
    progress.toeicPart5.total + progress.toeicPart6.total + progress.toeicPart7.total
  ) : 0);

  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div className="relative z-10 section-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            miruky <span className="gradient-text">English</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">TOEIC 900点を目指す総合英語学習プラットフォーム</p>
        </motion.div>

        {/* Stats Bar */}
        {loaded && totalAnswered > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="glass-card p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-white font-bold">{progress.studyStreak}日連続</p>
                  <p className="text-slate-500 text-xs">学習ストリーク</p>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="text-white font-bold">{totalAnswered}問回答</p>
                  <p className="text-slate-500 text-xs">正答率 {getAccuracy(totalCorrect, totalAnswered)}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div className="flex items-center gap-2">
                <span className="text-2xl">💪</span>
                <div>
                  <p className="text-white font-bold">{progress.vocab.mastered.length}語マスター</p>
                  <p className="text-slate-500 text-xs">単語 / 1000</p>
                </div>
              </div>
              {progress.vocab.weak.length > 0 && (
                <>
                  <div className="w-px h-8 bg-slate-700" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="text-orange-400 font-bold">{progress.vocab.weak.length}語</p>
                      <p className="text-slate-500 text-xs">要復習</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Section Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {sections.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}>
              <button onClick={() => setMode(s.id)}
                className={`w-full text-left glass-card p-6 hover-card border ${s.border} group cursor-pointer transition-all duration-300`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{s.icon}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${s.color} text-white`}>
                    {s.questions}問
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-0.5 group-hover:text-cyan-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-cyan-400/70 font-medium mb-2">{s.sub}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                {/* Mini progress bar */}
                {loaded && (() => {
                  let answered = 0;
                  let correct = 0;
                  if (s.id === 'vocab') { answered = progress.vocab.total; correct = progress.vocab.correct; }
                  else if (s.id === 'grammar') {
                    answered = progress.grammar[650].total + progress.grammar[800].total + progress.grammar[950].total;
                    correct = progress.grammar[650].correct + progress.grammar[800].correct + progress.grammar[950].correct;
                  }
                  else if (s.id === 'reading') { answered = progress.reading.total; correct = progress.reading.correct; }
                  else if (s.id === 'toeic-part5') { answered = progress.toeicPart5.total; correct = progress.toeicPart5.correct; }
                  else if (s.id === 'toeic-part6') { answered = progress.toeicPart6.total; correct = progress.toeicPart6.correct; }
                  else if (s.id === 'toeic-part7') { answered = progress.toeicPart7.total; correct = progress.toeicPart7.correct; }
                  if (answered === 0) return null;
                  const pct = Math.round((correct / answered) * 100);
                  return (
                    <div className="mt-3 pt-3 border-t border-slate-700/50">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">{answered}問回答</span>
                        <span className={pct >= 80 ? 'text-green-400' : pct >= 60 ? 'text-yellow-400' : 'text-red-400'}>{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })()}
              </button>
            </motion.div>
          ))}
        </div>

        {/* TOEIC Score Estimator */}
        {loaded && totalAnswered >= 50 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-10 max-w-md mx-auto text-center">
            <div className="glass-card p-6 neon-border">
              <p className="text-slate-400 text-sm mb-2">推定TOEICスコア（Reading）</p>
              <p className="text-5xl font-black text-white">
                {(() => {
                  const rate = totalCorrect / totalAnswered;
                  const score = Math.round(50 + rate * 445);
                  return Math.min(495, Math.max(50, score));
                })()}
                <span className="text-lg text-slate-500 ml-1">/ 495</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">※ 回答数が増えるほど精度が上がります</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
