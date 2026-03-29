'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { langMetas } from '@/data/courses';
import type { LangId } from '@/data/courses/types';

export default function ProgramPage() {
  const [completedMap, setCompletedMap] = useState<Record<string, number[]>>({});

  useEffect(() => {
    const map: Record<string, number[]> = {};
    langMetas.forEach((lang) => {
      try {
        const saved = JSON.parse(
          localStorage.getItem(`program_progress_${lang.id}`) || '[]'
        );
        map[lang.id] = saved;
      } catch {
        map[lang.id] = [];
      }
    });
    setCompletedMap(map);
  }, []);

  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            miruky <span className="gradient-text">Programming</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            完全未経験から上級者まで — 9つの言語で270レッスン。
            実際にコードを書きながら、現場で通用するスキルを身につけましょう。
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-8 mb-12"
        >
          {[
            { value: '9', label: '言語' },
            { value: '270', label: 'レッスン' },
            {
              value: String(
                Object.values(completedMap).reduce((a, b) => a + b.length, 0)
              ),
              label: '完了済み',
            },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text-static">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {langMetas.map((lang, index) => {
            const completed = completedMap[lang.id]?.length || 0;
            const progress = Math.round((completed / lang.lessonCount) * 100);
            return (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Link href={`/program/${lang.id}/`}>
                  <div className="glass-card p-6 hover-card neon-border group cursor-pointer h-full">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border shrink-0"
                        style={{
                          background: `${lang.color}15`,
                          borderColor: `${lang.color}30`,
                        }}
                      >
                        <img
                          src={`https://img.shields.io/badge/-_-${lang.color.replace('#', '')}?style=flat&logo=${lang.simpleIconSlug}&logoColor=white`}
                          alt={lang.name}
                          className="w-7 h-7 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors truncate">
                          {lang.name}
                        </h3>
                        <span className="text-xs text-slate-500">
                          {lang.lessonCount} レッスン
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                      {lang.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-500">進捗</span>
                        <span style={{ color: lang.color }}>
                          {completed}/{lang.lessonCount} ({progress}%)
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${progress}%`,
                            background: `linear-gradient(90deg, ${lang.color}, ${lang.color}99)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-slate-600 text-xs mt-10"
        >
          進捗はブラウザに自動保存されます
        </motion.p>
      </div>
    </div>
  );
}
