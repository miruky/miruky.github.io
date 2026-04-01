'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { readingLangMetas, loadReadingCourse } from '@/data/reading-courses';
import type { ReadingLesson, ReadingLangMeta } from '@/data/reading-courses/types';

const DIFFICULTY_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  beginner: { label: '初級', color: '#22c55e', bg: '#22c55e15' },
  intermediate: { label: '中級', color: '#f59e0b', bg: '#f59e0b15' },
  advanced: { label: '上級', color: '#ef4444', bg: '#ef444415' },
};

export default function ReadingLangClient() {
  const params = useParams();
  const langId = params.lang as string;
  const [lessons, setLessons] = useState<ReadingLesson[]>([]);
  const [meta, setMeta] = useState<ReadingLangMeta | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const m = readingLangMetas.find((l) => l.id === langId);
    if (m) setMeta(m);

    loadReadingCourse(langId as never).then((course) => {
      if (course) setLessons(course.lessons);
      setLoading(false);
    });

    try {
      const saved = JSON.parse(
        localStorage.getItem(`reading_progress_${langId}`) || '[]'
      );
      setCompleted(saved);
    } catch {
      setCompleted([]);
    }
  }, [langId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient dark-context flex items-center justify-center">
        <div className="text-slate-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="min-h-screen bg-hero-gradient dark-context flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">コースが見つかりません</p>
          <Link href="/program/reading/" className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium border border-slate-600/50 text-slate-400 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all">
            &larr; 言語一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const filtered =
    filter === 'all'
      ? lessons
      : filter === 'completed'
      ? lessons.filter((l) => completed.includes(l.id))
      : filter === 'incomplete'
      ? lessons.filter((l) => !completed.includes(l.id))
      : lessons.filter((l) => l.difficulty === filter);

  const completedCount = completed.length;
  const progress = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 section-container max-w-4xl">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/program/reading/"
            className="text-sm text-slate-500 hover:text-accent-purple transition-colors"
          >
            ← 言語一覧
          </Link>
        </motion.div>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-3">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center border shrink-0"
              style={{
                background: `${meta.color}15`,
                borderColor: `${meta.color}30`,
              }}
            >
              <img
                src={`https://img.shields.io/badge/-_-${meta.color.replace('#', '')}?style=flat&logo=${meta.simpleIconSlug}&logoColor=white`}
                alt={meta.name}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {meta.name}{' '}
                <span className="text-lg text-slate-500 font-normal">
                  {meta.nameJa}
                </span>
                <span className="ml-2 px-2 py-0.5 rounded text-xs font-bold bg-accent-purple/20 text-accent-purple border border-accent-purple/30">
                  READING
                </span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">{meta.description}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 glass-card p-4 neon-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">
                読了進捗:{' '}
                <span style={{ color: meta.color }} className="font-bold">
                  {completedCount}/{lessons.length}
                </span>
              </span>
              <span className="text-xs font-mono" style={{ color: meta.color }}>
                {progress}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-700/50 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${meta.color}, ${meta.color}88)`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {[
            { key: 'all', label: 'すべて' },
            { key: 'beginner', label: '初級' },
            { key: 'intermediate', label: '中級' },
            { key: 'advanced', label: '上級' },
            { key: 'incomplete', label: '未読' },
            { key: 'completed', label: '読了済み' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f.key
                  ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30'
                  : 'text-slate-500 border border-slate-700 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Lesson List */}
        <div className="space-y-2">
          {filtered.map((lesson, idx) => {
            const diff = DIFFICULTY_LABELS[lesson.difficulty];
            const done = completed.includes(lesson.id);
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
              >
                <Link href={`/program/reading/${langId}/${lesson.id}/`}>
                  <div
                    className={`glass-card p-4 hover-card group cursor-pointer flex items-center gap-4 transition-all ${
                      done ? 'border-l-2' : 'border-l-2 border-l-transparent'
                    }`}
                    style={done ? { borderLeftColor: meta.color } : {}}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                      style={{
                        background: done ? `${meta.color}20` : 'rgba(255,255,255,0.03)',
                        color: done ? meta.color : '#64748b',
                      }}
                    >
                      {done ? '✓' : lesson.id}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-accent-purple transition-colors truncate">
                        {lesson.titleJa}
                        <span className="text-slate-500 font-normal ml-2 text-xs">{lesson.title}</span>
                      </h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {lesson.category} · {lesson.description.slice(0, 60)}...
                      </p>
                    </div>

                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold shrink-0"
                      style={{ background: diff.bg, color: diff.color }}
                    >
                      {diff.label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            該当するレッスンがありません
          </div>
        )}
      </div>
    </div>
  );
}
