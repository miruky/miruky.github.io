'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { ReadingLesson, ReadingLangId, CodeHighlight } from '@/data/reading-courses/types';

interface Props {
  lesson: ReadingLesson;
  langId: ReadingLangId;
  langColor: string;
  langName: string;
  langNameJa: string;
  currentIndex: number;
  totalLessons: number;
  fileExt: string;
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  beginner: { label: '初級', color: '#22c55e' },
  intermediate: { label: '中級', color: '#f59e0b' },
  advanced: { label: '上級', color: '#ef4444' },
};

const FILE_NAME: Record<string, string> = {
  python: 'example.py',
  typescript: 'example.ts',
  java: 'Example.java',
};

export default function ReadingViewer({
  lesson,
  langId,
  langColor,
  langName,
  langNameJa,
  currentIndex,
  totalLessons,
  fileExt,
}: Props) {
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const [showKeyPoints, setShowKeyPoints] = useState(true);
  const [completed, setCompleted] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => lesson.code.split('\n'), [lesson.code]);

  useEffect(() => {
    setActiveHighlight(null);
    setShowKeyPoints(true);
    try {
      const key = `reading_progress_${langId}`;
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      setCompleted(saved.includes(lesson.id));
    } catch {
      setCompleted(false);
    }
  }, [lesson.id, langId]);

  const handleScroll = useCallback(() => {
    if (codeRef.current && lineNumRef.current) {
      lineNumRef.current.scrollTop = codeRef.current.scrollTop;
    }
  }, []);

  const markCompleted = useCallback(() => {
    try {
      const key = `reading_progress_${langId}`;
      const saved: number[] = JSON.parse(localStorage.getItem(key) || '[]');
      if (!saved.includes(lesson.id)) {
        saved.push(lesson.id);
        localStorage.setItem(key, JSON.stringify(saved));
      }
      setCompleted(true);
    } catch { /* */ }
  }, [langId, lesson.id]);

  const getLineHighlight = useCallback((lineNum: number): CodeHighlight | null => {
    for (const h of lesson.highlights) {
      if (lineNum >= h.startLine && lineNum <= h.endLine) return h;
    }
    return null;
  }, [lesson.highlights]);

  const getActiveLineHighlight = useCallback((lineNum: number): CodeHighlight | null => {
    if (activeHighlight === null) return null;
    const h = lesson.highlights[activeHighlight];
    if (!h) return null;
    if (lineNum >= h.startLine && lineNum <= h.endLine) return h;
    return null;
  }, [activeHighlight, lesson.highlights]);

  const diff = DIFFICULTY_LABELS[lesson.difficulty];
  const prevUrl = currentIndex > 0 ? `/program/reading/${langId}/${currentIndex}/` : null;
  const nextUrl = currentIndex < totalLessons - 1 ? `/program/reading/${langId}/${currentIndex + 2}/` : null;
  const fileName = FILE_NAME[langId] || `example${fileExt}`;

  return (
    <div className="flex flex-col h-screen pt-20">
      {/* Top Navigation Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{ background: '#0d0e1a', borderBottom: `1px solid ${langColor}25` }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={`/program/reading/${langId}/`}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {langNameJa}
          </Link>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-accent-purple/20 text-accent-purple border border-accent-purple/30">READING</span>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: langColor }} />
            <span className="text-white font-semibold text-sm truncate">
              Lesson {lesson.id}: {lesson.title}
            </span>
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0"
              style={{ background: `${diff.color}18`, color: diff.color }}
            >
              {diff.label}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-slate-600 font-mono mr-2">
            {currentIndex + 1}/{totalLessons}
          </span>
          {prevUrl && (
            <Link href={prevUrl} className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all" title="前のレッスン">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </Link>
          )}
          {nextUrl && (
            <Link href={nextUrl} className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all" title="次のレッスン">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          )}
        </div>
      </div>

      {/* Description Bar */}
      <div className="shrink-0 px-4 py-2.5 flex items-start gap-3" style={{ background: `${langColor}08`, borderBottom: `1px solid ${langColor}15` }}>
        <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: `${langColor}20`, color: langColor }}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] text-slate-300 leading-relaxed">{lesson.description}</p>
          {lesson.bookReference && (
            <p className="text-[11px] text-slate-500 mt-1">📖 参考: {lesson.bookReference}</p>
          )}
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-medium text-slate-500 bg-slate-800/50 shrink-0">
          {lesson.category}
        </span>
      </div>

      {/* Main Content (Left: Code, Right: Annotations) */}
      <div className="flex-1 flex min-h-0">
        {/* Left Panel: Code Viewer */}
        <div className="w-[60%] flex flex-col border-r border-slate-700/40 min-w-0">
          {/* File Tab */}
          <div className="flex items-center shrink-0 bg-[#13142a]">
            <div className="flex items-center gap-2 px-4 py-2 text-xs font-mono border-b-2" style={{ borderColor: langColor, background: '#0d0e1a', color: '#e2e8f0' }}>
              <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {fileName}
            </div>
            <div className="flex-1 bg-[#13142a]" />
            <div className="px-3 text-[10px] text-slate-600 font-mono">
              {lines.length} lines
            </div>
          </div>

          {/* Code Display */}
          <div className="flex-1 flex min-h-0 bg-[#0d0e1a]">
            {/* Line Numbers */}
            <div
              ref={lineNumRef}
              className="w-12 shrink-0 overflow-hidden text-right pr-3 pt-3 select-none border-r border-slate-800/50"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: '1.7' }}
            >
              {lines.map((_, i) => {
                const hl = getLineHighlight(i + 1);
                const activeHl = getActiveLineHighlight(i + 1);
                return (
                  <div
                    key={i}
                    className="transition-colors duration-200"
                    style={{ color: activeHl ? activeHl.color : hl ? `${hl.color}60` : 'rgba(100,116,139,0.4)' }}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
            {/* Code Lines */}
            <div
              ref={codeRef}
              className="flex-1 overflow-auto pt-3 pb-3"
              onScroll={handleScroll}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: '1.7' }}
            >
              {lines.map((line, i) => {
                const lineNum = i + 1;
                const hl = getLineHighlight(lineNum);
                const activeHl = getActiveLineHighlight(lineNum);
                const isActiveStart = activeHl && lineNum === activeHl.startLine;

                return (
                  <div
                    key={i}
                    className="relative px-4 transition-all duration-200"
                    style={{
                      background: activeHl
                        ? `${activeHl.color}12`
                        : hl
                        ? `${hl.color}06`
                        : 'transparent',
                      borderLeft: activeHl
                        ? `3px solid ${activeHl.color}`
                        : hl
                        ? `3px solid ${hl.color}30`
                        : '3px solid transparent',
                    }}
                    onClick={() => {
                      if (hl) {
                        const idx = lesson.highlights.indexOf(hl);
                        setActiveHighlight(activeHighlight === idx ? null : idx);
                      }
                    }}
                  >
                    {isActiveStart && (
                      <span
                        className="absolute -top-0.5 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold z-10"
                        style={{ background: activeHl.color, color: '#0d0e1a' }}
                      >
                        {activeHl.label}
                      </span>
                    )}
                    <span className={`whitespace-pre ${hl ? 'text-slate-200' : 'text-slate-400'}`}>
                      {line || ' '}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Highlights + Key Points */}
        <div className="w-[40%] flex flex-col min-w-0 bg-[#0a0b18]">
          {/* Highlights Section */}
          <div className="flex-1 overflow-auto">
            <div className="px-4 py-3 bg-[#13142a] border-b border-slate-700/30 shrink-0">
              <span className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <svg className="w-3.5 h-3.5" style={{ color: langColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                アーキテクチャ解説
              </span>
            </div>
            <div className="p-3 space-y-2">
              {lesson.highlights.map((hl, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveHighlight(activeHighlight === i ? null : i)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    activeHighlight === i
                      ? 'ring-1'
                      : 'hover:bg-white/[0.02]'
                  }`}
                  style={{
                    background: activeHighlight === i ? `${hl.color}10` : 'rgba(255,255,255,0.01)',
                    borderColor: activeHighlight === i ? `${hl.color}50` : 'rgba(100,116,139,0.15)',
                    boxShadow: activeHighlight === i ? `0 0 0 1px ${hl.color}` : undefined,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ background: hl.color }}
                    />
                    <span className="text-xs font-bold text-white">{hl.label}</span>
                    <span className="text-[10px] text-slate-600 ml-auto font-mono">
                      L{hl.startLine}-{hl.endLine}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{hl.explanation}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Key Points Section */}
          <div className="shrink-0 border-t border-slate-700/30">
            <button
              onClick={() => setShowKeyPoints(!showKeyPoints)}
              className="flex items-center justify-between px-4 py-2 bg-[#13142a] w-full hover:bg-[#181a32] transition-colors"
            >
              <span className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <svg className="w-3.5 h-3.5 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Key Points
              </span>
              <svg className={`w-3.5 h-3.5 text-slate-500 transition-transform ${showKeyPoints ? '' : '-rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {showKeyPoints && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 space-y-2">
                    {lesson.keyPoints.map((kp, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-accent-cyan text-xs mt-0.5 shrink-0">✓</span>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{kp}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 shrink-0" style={{ background: '#0d0e1a', borderTop: `1px solid ${langColor}20` }}>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-600">
            {lesson.highlights.length} highlights · {lines.length} lines
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!completed ? (
            <button
              onClick={markCompleted}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: `linear-gradient(135deg, ${langColor}, ${langColor}cc)`, boxShadow: `0 2px 12px ${langColor}30` }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              読了
            </button>
          ) : (
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold" style={{ background: `${langColor}15`, color: langColor, border: `1px solid ${langColor}30` }}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              完了済み
            </span>
          )}
          {nextUrl && (
            <Link
              href={nextUrl}
              onClick={markCompleted}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${langColor}, ${langColor}cc)` }}
            >
              次のレッスンへ
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
