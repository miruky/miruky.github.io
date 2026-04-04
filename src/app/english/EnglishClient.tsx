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
const DailyChallenge = dynamic(() => import('@/components/english/DailyChallenge'), { ssr: false });
const FlashCards = dynamic(() => import('@/components/english/FlashCards'), { ssr: false });

type Mode = 'select' | 'vocab' | 'grammar' | 'reading' | 'toeic-part5' | 'toeic-part6' | 'toeic-part7' | 'daily-challenge' | 'flashcard';

const sections = [
  {
    id: 'vocab' as Mode,
    title: '単語マスター',
    sub: 'Vocabulary',
    desc: 'TOEIC頻出1000単語を4択で学習',
    color: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/30',
    iconBg: 'from-accent-cyan/20 to-blue-500/20',
    iconBorder: 'border-accent-cyan/20 group-hover:border-accent-cyan/40',
    icon: (
      <svg className="w-7 h-7 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="13" y2="11" />
      </svg>
    ),
    questions: 1000,
  },
  {
    id: 'grammar' as Mode,
    title: '文法ドリル',
    sub: 'Grammar',
    desc: '650 / 800 / 950点レベル別 各100問',
    color: 'from-purple-500 to-indigo-600',
    border: 'border-purple-500/30',
    iconBg: 'from-accent-purple/20 to-indigo-500/20',
    iconBorder: 'border-accent-purple/20 group-hover:border-accent-purple/40',
    icon: (
      <svg className="w-7 h-7 text-accent-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    questions: 300,
  },
  {
    id: 'reading' as Mode,
    title: '長文読解',
    sub: 'Reading Comprehension',
    desc: '3レベル×50本の長文 + 各4〜5問',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/30',
    iconBg: 'from-emerald-400/20 to-teal-500/20',
    iconBorder: 'border-emerald-400/20 group-hover:border-emerald-400/40',
    icon: (
      <svg className="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    questions: 50,
  },
  {
    id: 'toeic-part5' as Mode,
    title: 'TOEIC Part 5',
    sub: 'Incomplete Sentences',
    desc: '短文穴埋め問題 100問',
    color: 'from-orange-500 to-red-500',
    border: 'border-orange-500/30',
    iconBg: 'from-orange-500/20 to-red-500/20',
    iconBorder: 'border-orange-500/20 group-hover:border-orange-500/40',
    icon: (
      <svg className="w-7 h-7 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    questions: 100,
  },
  {
    id: 'toeic-part6' as Mode,
    title: 'TOEIC Part 6',
    sub: 'Text Completion',
    desc: '長文穴埋め問題 25セット',
    color: 'from-rose-500 to-pink-600',
    border: 'border-rose-500/30',
    iconBg: 'from-rose-500/20 to-pink-500/20',
    iconBorder: 'border-rose-500/20 group-hover:border-rose-500/40',
    icon: (
      <svg className="w-7 h-7 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    questions: 25,
  },
  {
    id: 'toeic-part7' as Mode,
    title: 'TOEIC Part 7',
    sub: 'Reading Comprehension',
    desc: 'シングル・ダブル・トリプルパッセージ',
    color: 'from-amber-500 to-yellow-600',
    border: 'border-amber-500/30',
    iconBg: 'from-amber-500/20 to-yellow-500/20',
    iconBorder: 'border-amber-500/20 group-hover:border-amber-500/40',
    icon: (
      <svg className="w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    questions: 20,
  },
  {
    id: 'daily-challenge' as Mode,
    title: '今日のチャレンジ',
    sub: 'Daily Challenge',
    desc: '毎日変わる5問ミックス問題に挑戦',
    color: 'from-lime-500 to-green-600',
    border: 'border-lime-500/30',
    iconBg: 'from-lime-400/20 to-green-500/20',
    iconBorder: 'border-lime-400/20 group-hover:border-lime-400/40',
    icon: (
      <svg className="w-7 h-7 text-lime-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" />
      </svg>
    ),
    questions: 5,
  },
  {
    id: 'flashcard' as Mode,
    title: 'フラッシュカード',
    sub: 'Flash Cards',
    desc: 'スワイプで単語を暗記・復習',
    color: 'from-pink-500 to-violet-600',
    border: 'border-pink-500/30',
    iconBg: 'from-pink-500/20 to-violet-500/20',
    iconBorder: 'border-pink-500/20 group-hover:border-pink-500/40',
    icon: (
      <svg className="w-7 h-7 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 4v16"/>
      </svg>
    ),
    questions: 1000,
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
  if (mode === 'daily-challenge') return <DailyChallenge onBack={() => setMode('select')} />;
  if (mode === 'flashcard') return <FlashCards onBack={() => setMode('select')} />;

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
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/20">
                  <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23c-1.1 0-1.99-.89-1.99-1.99h3.98c0 1.1-.89 1.99-1.99 1.99zm8-3H4v-2l2-1V10c0-3.42 2.23-6.19 5.3-6.8V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.7c.37.09.72.21 1.06.36C13.85 5.94 13 8.36 13 11h8l-1 2v5l2 1v2z" /><path d="M17.5 10a5.5 5.5 0 100-11 5.5 5.5 0 000 11z" fill="currentColor" opacity="0.6"/></svg>
                </div>
                <div>
                  <p className="text-white font-bold">{progress.studyStreak}日連続</p>
                  <p className="text-slate-500 text-xs">学習ストリーク</p>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500/20 to-blue-500/20 flex items-center justify-center border border-sky-500/20">
                  <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                </div>
                <div>
                  <p className="text-white font-bold">{totalAnswered}問回答</p>
                  <p className="text-slate-500 text-xs">正答率 {getAccuracy(totalCorrect, totalAnswered)}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
                  <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <div>
                  <p className="text-white font-bold">{progress.vocab.mastered.length}語マスター</p>
                  <p className="text-slate-500 text-xs">単語 / 1000</p>
                </div>
              </div>
              {progress.vocab.weak.length > 0 && (
                <>
                  <div className="w-px h-8 bg-slate-700" />
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/20">
                      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                    </div>
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
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.iconBg} flex items-center justify-center border ${s.iconBorder} transition-colors`}>
                    {s.icon}
                  </div>
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
