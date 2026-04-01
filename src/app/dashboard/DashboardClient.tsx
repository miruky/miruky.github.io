'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaBook,
  FaKeyboard,
  FaArrowLeft,
  FaChartLine,
  FaLayerGroup,
  FaCheckCircle,
} from 'react-icons/fa';

/* ── Types ─────────────────────────────────────── */

interface LangProgress {
  lang: string;
  label: string;
  total: number;
  completed: number[];
}

interface TypingBest {
  grade: string;
  score: number;
  kpm: number;
  accuracy: number;
}

/* ── Constants ─────────────────────────────────── */

const WRITING_LANGS = [
  { id: 'python', label: 'Python', total: 30 },
  { id: 'typescript', label: 'TypeScript', total: 30 },
  { id: 'javascript', label: 'JavaScript', total: 30 },
  { id: 'java', label: 'Java', total: 30 },
  { id: 'ruby', label: 'Ruby', total: 30 },
  { id: 'html-css', label: 'HTML & CSS', total: 30 },
  { id: 'c-lang', label: 'C言語', total: 30 },
  { id: 'sql', label: 'SQL', total: 30 },
  { id: 'secure', label: 'セキュリティ', total: 30 },
];

const READING_LANGS = [
  { id: 'python', label: 'Python', total: 34 },
  { id: 'typescript', label: 'TypeScript', total: 33 },
  { id: 'java', label: 'Java', total: 33 },
];

const ARCHITECT_TOTAL = 100;

/* ── Helpers ───────────────────────────────────── */

/** SVG donut chart */
function DonutChart({
  value,
  max,
  size = 120,
  strokeWidth = 10,
  color = '#00d4ff',
  bgColor = 'currentColor',
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = max > 0 ? value / max : 0;
  const offset = circumference * (1 - pct);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={bgColor}
        strokeWidth={strokeWidth}
        className="opacity-10"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </svg>
  );
}

/** KPI summary card */
function KpiCard({
  icon,
  label,
  sublabel,
  value,
  max,
  color,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  value: number;
  max: number;
  color: string;
  delay?: number;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-600/60 p-5 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative">
        <DonutChart
          value={value}
          max={max}
          size={96}
          strokeWidth={8}
          color={color}
          bgColor={color}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-slate-900 dark:text-white leading-none">
            {pct}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">{sublabel}</p>
      <span className="text-sm font-mono font-bold" style={{ color }}>
        {value} / {max}
      </span>
    </motion.div>
  );
}

/** Horizontal progress bar row */
function BarRow({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          {value}/{max}
          <span className="ml-1 text-[10px] opacity-60">
            ({Math.round(pct)}%)
          </span>
        </span>
      </div>
      <div className="h-2.5 bg-slate-100 dark:bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ── Main Component ────────────────────────────── */

export default function DashboardClient() {
  const [writingProgress, setWritingProgress] = useState<LangProgress[]>([]);
  const [readingProgress, setReadingProgress] = useState<LangProgress[]>([]);
  const [architectProgress, setArchitectProgress] = useState<number[]>([]);
  const [typingBest, setTypingBest] = useState<TypingBest | null>(null);

  useEffect(() => {
    setWritingProgress(
      WRITING_LANGS.map((l) => ({
        lang: l.id,
        label: l.label,
        total: l.total,
        completed: JSON.parse(
          localStorage.getItem(`program_progress_${l.id}`) || '[]'
        ),
      }))
    );

    setReadingProgress(
      READING_LANGS.map((l) => ({
        lang: l.id,
        label: l.label,
        total: l.total,
        completed: JSON.parse(
          localStorage.getItem(`reading_progress_${l.id}`) || '[]'
        ),
      }))
    );

    setArchitectProgress(
      JSON.parse(localStorage.getItem('architect_progress') || '[]')
    );

    try {
      const raw = localStorage.getItem('miruky-typing-rankings');
      if (raw) {
        const rankings: Record<
          string,
          { score: number; kpm: number; accuracy: number; grade: string }[]
        > = JSON.parse(raw);
        let best: TypingBest | null = null;
        for (const records of Object.values(rankings)) {
          for (const r of records) {
            if (!best || r.score > best.score) {
              best = {
                grade: r.grade,
                score: r.score,
                kpm: r.kpm,
                accuracy: r.accuracy,
              };
            }
          }
        }
        setTypingBest(best);
      }
    } catch {
      /* silent */
    }
  }, []);

  const totalWriting = useMemo(
    () => writingProgress.reduce((s, l) => s + l.completed.length, 0),
    [writingProgress]
  );
  const totalWritingMax = useMemo(
    () => writingProgress.reduce((s, l) => s + l.total, 0),
    [writingProgress]
  );
  const totalReading = useMemo(
    () => readingProgress.reduce((s, l) => s + l.completed.length, 0),
    [readingProgress]
  );
  const totalReadingMax = useMemo(
    () => readingProgress.reduce((s, l) => s + l.total, 0),
    [readingProgress]
  );
  const overallCompleted =
    totalWriting + totalReading + architectProgress.length;
  const overallTotal = totalWritingMax + totalReadingMax + ARCHITECT_TOTAL;

  const C = {
    primary: '#0284c7',
    writing: '#0891b2',
    reading: '#7c3aed',
    architect: '#d97706',
    typing: '#db2777',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-900 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border border-slate-200 dark:border-dark-600/50 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-accent-cyan bg-white dark:bg-dark-800 transition-colors mb-8 shadow-sm"
        >
          <FaArrowLeft className="w-3 h-3" />
          ホームに戻る
        </Link>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            学習ダッシュボード
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Learning Dashboard ― 学習の進捗状況を一覧で確認できます
          </p>
        </div>

        {/* KPI Summary */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <KpiCard
            icon={
              <FaChartLine
                className="w-4 h-4"
                style={{ color: C.primary }}
              />
            }
            label="全体進捗"
            sublabel="Overall Progress"
            value={overallCompleted}
            max={overallTotal}
            color={C.primary}
            delay={0}
          />
          <KpiCard
            icon={
              <FaCode className="w-4 h-4" style={{ color: C.writing }} />
            }
            label="写経モード"
            sublabel="Writing Mode"
            value={totalWriting}
            max={totalWritingMax}
            color={C.writing}
            delay={0.1}
          />
          <KpiCard
            icon={
              <FaBook className="w-4 h-4" style={{ color: C.reading }} />
            }
            label="読解モード"
            sublabel="Reading Mode"
            value={totalReading}
            max={totalReadingMax}
            color={C.reading}
            delay={0.2}
          />
          <KpiCard
            icon={
              <FaLayerGroup
                className="w-4 h-4"
                style={{ color: C.architect }}
              />
            }
            label="アーキテクト"
            sublabel="Architect"
            value={architectProgress.length}
            max={ARCHITECT_TOTAL}
            color={C.architect}
            delay={0.3}
          />
        </section>

        {/* Detail Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Writing */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-600/60 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-600/40 flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${C.writing}18` }}
              >
                <FaCode
                  className="w-4 h-4"
                  style={{ color: C.writing }}
                />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  写経モード
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Writing Mode ― 9言語 × 30問
                </p>
              </div>
              <span
                className="ml-auto text-sm font-mono font-bold"
                style={{ color: C.writing }}
              >
                {totalWriting}/{totalWritingMax}
              </span>
            </div>
            <div className="px-6 py-5 space-y-4">
              {writingProgress.map((lp) => (
                <BarRow
                  key={lp.lang}
                  label={lp.label}
                  value={lp.completed.length}
                  max={lp.total}
                  color={C.writing}
                />
              ))}
            </div>
          </motion.section>

          {/* Reading */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-600/60 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-600/40 flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${C.reading}18` }}
              >
                <FaBook
                  className="w-4 h-4"
                  style={{ color: C.reading }}
                />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  読解モード
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Reading Mode ― 3言語 × 33〜34問
                </p>
              </div>
              <span
                className="ml-auto text-sm font-mono font-bold"
                style={{ color: C.reading }}
              >
                {totalReading}/{totalReadingMax}
              </span>
            </div>
            <div className="px-6 py-5 space-y-4">
              {readingProgress.map((lp) => (
                <BarRow
                  key={lp.lang}
                  label={lp.label}
                  value={lp.completed.length}
                  max={lp.total}
                  color={C.reading}
                />
              ))}
            </div>
          </motion.section>

          {/* Architect */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-600/60 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-600/40 flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${C.architect}18` }}
              >
                <FaLayerGroup
                  className="w-4 h-4"
                  style={{ color: C.architect }}
                />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  アーキテクト
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Architect ― 全{ARCHITECT_TOTAL}問
                </p>
              </div>
              <span
                className="ml-auto text-sm font-mono font-bold"
                style={{ color: C.architect }}
              >
                {architectProgress.length}/{ARCHITECT_TOTAL}
              </span>
            </div>
            <div className="px-6 py-6 flex flex-col items-center gap-4">
              <div className="relative">
                <DonutChart
                  value={architectProgress.length}
                  max={ARCHITECT_TOTAL}
                  size={140}
                  strokeWidth={12}
                  color={C.architect}
                  bgColor={C.architect}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {ARCHITECT_TOTAL > 0
                      ? Math.round(
                          (architectProgress.length / ARCHITECT_TOTAL) * 100
                        )
                      : 0}
                    %
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    完了率
                  </span>
                </div>
              </div>
              <div className="w-full">
                <BarRow
                  label="完了レッスン数"
                  value={architectProgress.length}
                  max={ARCHITECT_TOTAL}
                  color={C.architect}
                />
              </div>
            </div>
          </motion.section>

          {/* Typing Game */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-600/60 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-600/40 flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${C.typing}18` }}
              >
                <FaKeyboard
                  className="w-4 h-4"
                  style={{ color: C.typing }}
                />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  タイピングゲーム
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Typing Game ― ベストスコア
                </p>
              </div>
            </div>
            <div className="px-6 py-6">
              {typingBest ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-50 dark:bg-dark-700/50 p-4 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                      グレード / Grade
                    </p>
                    <p
                      className="text-3xl font-extrabold"
                      style={{ color: C.typing }}
                    >
                      {typingBest.grade}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-dark-700/50 p-4 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                      スコア / Score
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {typingBest.score.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-dark-700/50 p-4 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                      打鍵速度 / KPM
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {typingBest.kpm}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-dark-700/50 p-4 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                      正確率 / Accuracy
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {typingBest.accuracy}%
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FaKeyboard className="w-10 h-10 text-slate-200 dark:text-dark-600 mb-3" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    まだプレイ記録がありません
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    ゲームページでプレイするとここに記録されます
                  </p>
                  <Link
                    href="/game/"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg border border-slate-200 dark:border-dark-600 text-slate-600 dark:text-slate-300 hover:border-pink-300 dark:hover:border-pink-500/40 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                  >
                    <FaKeyboard className="w-3 h-3" />
                    ゲームをプレイする
                  </Link>
                </div>
              )}
            </div>
          </motion.section>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex items-center gap-2 justify-center text-xs text-slate-400 dark:text-slate-500"
        >
          <FaCheckCircle className="w-3 h-3" />
          <span>
            データはブラウザの localStorage に保存されています
          </span>
        </motion.div>
      </div>
    </div>
  );
}
