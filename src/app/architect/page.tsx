'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { allLessons, getLessonCounts, getAllCategories } from '@/data/architect';
import type { ArchitectDifficulty, ArchitectLesson } from '@/data/architect';

const difficultyLabel: Record<ArchitectDifficulty, string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
};

const difficultyColor: Record<ArchitectDifficulty, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  advanced: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

const difficultyIcon: Record<ArchitectDifficulty, string> = {
  beginner: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  intermediate: 'M13 10V3L4 14h7v7l9-11h-7z',
  advanced: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
};

export default function ArchitectPage() {
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [filter, setFilter] = useState<'all' | ArchitectDifficulty>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const counts = getLessonCounts();
  const categories = getAllCategories();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('architect_progress') || '[]');
      setCompletedIds(saved);
    } catch {
      setCompletedIds([]);
    }
  }, []);

  const filtered = useMemo(() => {
    let result: ArchitectLesson[] = allLessons;
    if (filter !== 'all') {
      result = result.filter((l) => l.difficulty === filter);
    }
    if (categoryFilter !== 'all') {
      result = result.filter((l) => l.category === categoryFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.scenario.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [filter, categoryFilter, search]);

  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / allLessons.length) * 100);

  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(140, 79, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(140, 79, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            miruky <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">Architect</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            AWSサービスをドラッグ&amp;ドロップで繋いで、実践的なクラウドアーキテクチャを学ぼう。
            全100レッスンで初級から上級まで段階的にマスターできます。
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{allLessons.length}</div>
            <div className="text-xs text-slate-400 mt-1">Total Lessons</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-emerald-400">{completedCount}</div>
            <div className="text-xs text-slate-400 mt-1">Completed</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">{progressPercent}%</div>
            <div className="text-xs text-slate-400 mt-1">Progress</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-amber-400">{categories.length}</div>
            <div className="text-xs text-slate-400 mt-1">Categories</div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {/* Search */}
          <div className="relative flex-grow max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="レッスンを検索..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                filter === 'all'
                  ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
              }`}
            >
              All ({allLessons.length})
            </button>
            {(['beginner', 'intermediate', 'advanced'] as ArchitectDifficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  filter === d
                    ? difficultyColor[d]
                    : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                }`}
              >
                {difficultyLabel[d]} ({counts[d]})
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500/50 appearance-none cursor-pointer"
          >
            <option value="all" className="bg-slate-900">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c} className="bg-slate-900">{c}</option>
            ))}
          </select>
        </motion.div>

        {/* Lesson Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((lesson, i) => {
            const isCompleted = completedIds.includes(lesson.id);
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.5) }}
              >
                <Link href={`/architect/${lesson.id}/`}>
                  <div
                    className={`group relative bg-white/5 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 cursor-pointer ${
                      isCompleted
                        ? 'border-emerald-500/30'
                        : 'border-white/10'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs text-slate-500 font-mono">#{String(lesson.id).padStart(3, '0')}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyColor[lesson.difficulty]}`}>
                          {difficultyLabel[lesson.difficulty]}
                        </span>
                        {isCompleted && (
                          <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                      {lesson.title}
                    </h3>

                    {/* Scenario */}
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                      {lesson.scenario}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                        {lesson.category}
                      </span>
                      <div className="flex items-center gap-1 text-slate-500">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={difficultyIcon[lesson.difficulty]} />
                        </svg>
                        <span className="text-[10px]">{lesson.requiredServices.length} services</span>
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500">条件に一致するレッスンがありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
