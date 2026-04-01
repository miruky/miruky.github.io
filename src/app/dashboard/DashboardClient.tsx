'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCode, FaBook, FaGamepad, FaTrophy, FaArrowLeft } from 'react-icons/fa';

interface LangProgress {
  lang: string;
  label: string;
  total: number;
  completed: number[];
}

interface GameStats {
  typingBest: number | null;
  blocksBest: number | null;
  quizBest: number | null;
}

export default function DashboardClient() {
  const [writingProgress, setWritingProgress] = useState<LangProgress[]>([]);
  const [readingProgress, setReadingProgress] = useState<LangProgress[]>([]);
  const [architectProgress, setArchitectProgress] = useState<number[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({ typingBest: null, blocksBest: null, quizBest: null });

  useEffect(() => {
    // Writing progress
    const langs = [
      { id: 'python', label: 'Python', total: 30 },
      { id: 'typescript', label: 'TypeScript', total: 30 },
      { id: 'java', label: 'Java', total: 30 },
    ];
    setWritingProgress(
      langs.map((l) => ({
        lang: l.id,
        label: l.label,
        total: l.total,
        completed: JSON.parse(localStorage.getItem(`program_progress_${l.id}`) || '[]'),
      }))
    );

    // Reading progress
    const readingLangs = [
      { id: 'python', label: 'Python', total: 34 },
      { id: 'typescript', label: 'TypeScript', total: 33 },
      { id: 'java', label: 'Java', total: 33 },
    ];
    setReadingProgress(
      readingLangs.map((l) => ({
        lang: l.id,
        label: l.label,
        total: l.total,
        completed: JSON.parse(localStorage.getItem(`reading_progress_${l.id}`) || '[]'),
      }))
    );

    // Architect progress
    setArchitectProgress(JSON.parse(localStorage.getItem('architect_progress') || '[]'));

    // Game stats
    setGameStats({
      typingBest: Number(localStorage.getItem('typing_best_wpm')) || null,
      blocksBest: Number(localStorage.getItem('blocks_best_score')) || null,
      quizBest: Number(localStorage.getItem('quiz_best_score')) || null,
    });
  }, []);

  const totalWriting = writingProgress.reduce((s, l) => s + l.completed.length, 0);
  const totalWritingMax = writingProgress.reduce((s, l) => s + l.total, 0);
  const totalReading = readingProgress.reduce((s, l) => s + l.completed.length, 0);
  const totalReadingMax = readingProgress.reduce((s, l) => s + l.total, 0);
  const overallCompleted = totalWriting + totalReading + architectProgress.length;
  const overallTotal = totalWritingMax + totalReadingMax + 10; // 10 architect lessons

  return (
    <div className="pt-24 pb-20">
      <div className="section-container max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border border-slate-600/50 text-slate-500 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-accent-cyan transition-colors mb-8"
        >
          <FaArrowLeft className="w-3 h-3" />
          Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 mb-3">
            Learning Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Your learning progress at a glance
          </p>
        </div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaTrophy className="w-5 h-5 text-accent-cyan" />
            <h2 className="text-lg font-bold dark:text-white text-slate-900">Overall Progress</h2>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 h-3 bg-slate-200 dark:bg-dark-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full transition-all duration-500"
                style={{ width: `${overallTotal > 0 ? (overallCompleted / overallTotal) * 100 : 0}%` }}
              />
            </div>
            <span className="text-sm font-mono font-bold text-accent-cyan">
              {overallCompleted}/{overallTotal}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {overallTotal > 0 ? Math.round((overallCompleted / overallTotal) * 100) : 0}% complete
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Writing Progress */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaCode className="w-5 h-5 text-accent-green" />
              <h2 className="text-lg font-bold dark:text-white text-slate-900">Writing Mode</h2>
            </div>
            <div className="space-y-3">
              {writingProgress.map((lp) => (
                <div key={lp.lang}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 dark:text-slate-300">{lp.label}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono">{lp.completed.length}/{lp.total}</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-green rounded-full transition-all duration-500"
                      style={{ width: `${(lp.completed.length / lp.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Reading Progress */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaBook className="w-5 h-5 text-accent-purple" />
              <h2 className="text-lg font-bold dark:text-white text-slate-900">Reading Mode</h2>
            </div>
            <div className="space-y-3">
              {readingProgress.map((lp) => (
                <div key={lp.lang}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 dark:text-slate-300">{lp.label}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono">{lp.completed.length}/{lp.total}</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-purple rounded-full transition-all duration-500"
                      style={{ width: `${(lp.completed.length / lp.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Architect Progress */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h2 className="text-lg font-bold dark:text-white text-slate-900">Architect</h2>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-700 dark:text-slate-300">Completed lessons</span>
              <span className="text-slate-500 dark:text-slate-400 font-mono">{architectProgress.length}/10</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-dark-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${(architectProgress.length / 10) * 100}%` }}
              />
            </div>
          </motion.div>

          {/* Game Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaGamepad className="w-5 h-5 text-accent-pink" />
              <h2 className="text-lg font-bold dark:text-white text-slate-900">Games</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300">Typing Best WPM</span>
                <span className="font-mono font-bold text-accent-cyan">{gameStats.typingBest ?? '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300">Blocks Best Score</span>
                <span className="font-mono font-bold text-accent-cyan">{gameStats.blocksBest ?? '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300">Quiz Best Score</span>
                <span className="font-mono font-bold text-accent-cyan">{gameStats.quizBest ?? '—'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
