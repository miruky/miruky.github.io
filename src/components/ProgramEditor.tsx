'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { Lesson, LangId } from '@/data/courses/types';

interface Props {
  lesson: Lesson;
  langId: LangId;
  langColor: string;
  langName: string;
  langNameJa: string;
  currentIndex: number;
  totalLessons: number;
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  beginner: { label: '初級', color: '#22c55e' },
  intermediate: { label: '中級', color: '#f59e0b' },
  advanced: { label: '上級', color: '#ef4444' },
};

/* ファイル名の拡張子マッピング */
const LANG_FILE_EXT: Record<string, string> = {
  python: 'main.py',
  typescript: 'main.ts',
  javascript: 'main.js',
  java: 'Main.java',
  ruby: 'main.rb',
  'html-css': 'index.html',
  'c-lang': 'main.c',
  sql: 'query.sql',
  secure: 'secure.js',
};

export default function ProgramEditor({
  lesson,
  langId,
  langColor,
  langName,
  langNameJa,
  currentIndex,
  totalLessons,
}: Props) {
  const [code, setCode] = useState(lesson.initialCode);
  const [output, setOutput] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [consoleExpanded, setConsoleExpanded] = useState(true);
  const [sampleExpanded, setSampleExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);

  // Reset when lesson changes
  useEffect(() => {
    setCode(lesson.initialCode);
    setOutput('');
    setShowHints(false);
    setHintLevel(0);
    setShowAnswer(false);
    setIsCorrect(null);
    setConsoleExpanded(true);
    setSampleExpanded(true);
  }, [lesson.id, lesson.initialCode]);

  // Sync scroll between textarea and line numbers
  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  // Tab key support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const el = e.currentTarget;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const newCode = code.substring(0, start) + '  ' + code.substring(end);
        setCode(newCode);
        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = start + 2;
        });
      }
      // Ctrl+Enter to run
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
    },
    [code]
  );

  // Run / execute code
  const runCode = useCallback(() => {
    setIsCorrect(null);

    if (langId === 'html-css') {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = code;
      }
      setOutput('プレビューが右側に表示されています。');
      return;
    }

    if (langId === 'javascript' || langId === 'typescript') {
      const logs: string[] = [];
      const mockConsole = {
        log: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
        error: (...args: unknown[]) => logs.push('Error: ' + args.map(String).join(' ')),
        warn: (...args: unknown[]) => logs.push('Warn: ' + args.map(String).join(' ')),
        info: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
      };
      try {
        let jsCode = code;
        if (langId === 'typescript') {
          jsCode = code
            .replace(/:\s*(string|number|boolean|any|void|never|unknown|object|null|undefined)(\[\])?\s*/g, ' ')
            .replace(/:\s*\w+(\[\])?\s*/g, ' ')
            .replace(/<[^>]+>/g, '')
            .replace(/\binterface\s+\w+\s*\{[\s\S]*?\}/g, '')
            .replace(/\btype\s+\w+\s*=\s*[^;]+;/g, '')
            .replace(/\bas\s+\w+/g, '');
        }
        const fn = new Function('console', jsCode);
        fn(mockConsole);
        setOutput(logs.join('\n'));
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setOutput(`❌ Error: ${msg}`);
      }
      return;
    }

    // Other languages: show expected output for comparison
    setOutput(lesson.expectedOutput);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, langId, lesson.expectedOutput]);

  // Check if correct
  const checkCode = useCallback(() => {
    runCode();
    setTimeout(() => {
      const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();

      if (langId === 'javascript' || langId === 'typescript') {
        // Already ran, check output
        const logs: string[] = [];
        const mockConsole = {
          log: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
          error: () => {},
          warn: () => {},
          info: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
        };
        try {
          let jsCode = code;
          if (langId === 'typescript') {
            jsCode = code
              .replace(/:\s*(string|number|boolean|any|void|never|unknown|object|null|undefined)(\[\])?\s*/g, ' ')
              .replace(/:\s*\w+(\[\])?\s*/g, ' ')
              .replace(/<[^>]+>/g, '')
            .replace(/\binterface\s+\w+\s*\{[\s\S]*?\}/g, '')
              .replace(/\btype\s+\w+\s*=\s*[^;]+;/g, '')
              .replace(/\bas\s+\w+/g, '');
          }
          const fn = new Function('console', jsCode);
          fn(mockConsole);
          const result = logs.join('\n').trim();
          if (result === lesson.expectedOutput.trim()) {
            setIsCorrect(true);
            markCompleted();
          } else {
            setIsCorrect(false);
          }
        } catch {
          setIsCorrect(false);
        }
      } else {
        // Compare code structure
        if (normalize(code) === normalize(lesson.solutionCode)) {
          setIsCorrect(true);
          markCompleted();
        } else {
          // Loose check - at least similar length and key parts
          const solutionParts = lesson.solutionCode
            .split('\n')
            .filter((l) => l.trim().length > 0);
          const codeParts = code.split('\n').filter((l) => l.trim().length > 0);
          const matchCount = solutionParts.filter((sp) =>
            codeParts.some((cp) => normalize(cp) === normalize(sp))
          ).length;
          if (matchCount >= solutionParts.length * 0.8) {
            setIsCorrect(true);
            markCompleted();
          } else {
            setIsCorrect(false);
          }
        }
      }
    }, 100);
  }, [code, langId, lesson, runCode]);

  // Save completion to localStorage
  const markCompleted = useCallback(() => {
    try {
      const key = `program_progress_${langId}`;
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      if (!saved.includes(lesson.id)) {
        saved.push(lesson.id);
        localStorage.setItem(key, JSON.stringify(saved));
      }
    } catch {}
  }, [langId, lesson.id]);

  // Reset code
  const resetCode = useCallback(() => {
    setCode(lesson.initialCode);
    setOutput('');
    setIsCorrect(null);
  }, [lesson.initialCode]);

  const lineCount = code.split('\n').length;
  const diff = DIFFICULTY_LABELS[lesson.difficulty];
  const prevUrl = currentIndex > 0 ? `/program/${langId}/${currentIndex}/` : null;
  const nextUrl = currentIndex < totalLessons - 1 ? `/program/${langId}/${currentIndex + 2}/` : null;
  const fileName = LANG_FILE_EXT[langId] || 'code.txt';

  return (
    <div className="flex flex-col h-screen pt-20">
      {/* Top Navigation Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{ background: '#0d0e1a', borderBottom: `1px solid ${langColor}25` }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={`/program/${langId}/`}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {langNameJa}
          </Link>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2 min-w-0">
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

      {/* Task Description Bar */}
      <div className="shrink-0 px-4 py-2.5 flex items-start gap-3" style={{ background: `${langColor}08`, borderBottom: `1px solid ${langColor}15` }}>
        <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: `${langColor}20`, color: langColor }}>!</div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] text-slate-300 leading-relaxed">{lesson.description}</p>
          <p className="text-[13px] font-semibold mt-1.5" style={{ color: langColor }}>{lesson.task}</p>
        </div>
      </div>

      {/* Main Editor Area (Left + Right) */}
      <div className="flex-1 flex min-h-0">
        {/* Left Panel: Code Editor */}
        <div className="w-[55%] flex flex-col border-r border-slate-700/40 min-w-0">
          {/* File Tab */}
          <div className="flex items-center shrink-0 bg-[#13142a]">
            <div className="flex items-center gap-2 px-4 py-2 text-xs font-mono border-b-2" style={{ borderColor: langColor, background: '#0d0e1a', color: '#e2e8f0' }}>
              <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {fileName}
            </div>
            <div className="flex-1 bg-[#13142a]" />
          </div>

          {/* Editor Body */}
          <div className="flex-1 flex min-h-0 bg-[#0d0e1a]">
            {/* Line Numbers */}
            <div
              ref={lineNumRef}
              className="w-12 shrink-0 overflow-hidden text-right pr-3 pt-3 select-none border-r border-slate-800/50"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: '1.7' }}
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i} className="text-slate-600/60">{i + 1}</div>
              ))}
            </div>
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              spellCheck={false}
              className="flex-1 bg-transparent text-slate-200 resize-none outline-none pl-4 pr-3 py-3 min-h-0"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: '1.7', tabSize: 2, caretColor: langColor }}
            />
          </div>
        </div>

        {/* Right Panel: Console + Sample */}
        <div className="w-[45%] flex flex-col min-w-0 bg-[#0a0b18]">
          {/* Console Section */}
          <div className="flex flex-col" style={{ flex: consoleExpanded ? (sampleExpanded ? '1 1 50%' : '1 1 100%') : '0 0 auto' }}>
            <button
              onClick={() => setConsoleExpanded(!consoleExpanded)}
              className="flex items-center justify-between px-4 py-2 bg-[#13142a] border-b border-slate-700/30 shrink-0 hover:bg-[#181a32] transition-colors"
            >
              <span className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <svg className="w-3.5 h-3.5" style={{ color: langColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {langId === 'html-css' ? 'Preview' : 'コンソール'}
              </span>
              <div className="flex items-center gap-2">
                {isCorrect !== null && (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                    style={{
                      background: isCorrect ? '#22c55e15' : '#ef444415',
                      color: isCorrect ? '#22c55e' : '#ef4444',
                      border: `1px solid ${isCorrect ? '#22c55e30' : '#ef444430'}`,
                    }}
                  >
                    {isCorrect ? 'PASS' : 'TRY AGAIN'}
                  </span>
                )}
                <svg className={`w-3.5 h-3.5 text-slate-500 transition-transform ${consoleExpanded ? '' : '-rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {consoleExpanded && (
              <div className="flex-1 min-h-0 overflow-auto">
                {langId === 'html-css' ? (
                  <iframe ref={iframeRef} className="w-full h-full bg-white" sandbox="allow-scripts" title="Preview" />
                ) : (
                  <pre className="p-4 text-[13px] text-slate-300 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {output || <span className="text-slate-600 italic text-xs">実行結果がここに表示されます</span>}
                  </pre>
                )}
              </div>
            )}
          </div>

          {/* Sample / Expected Section */}
          <div className="flex flex-col" style={{ flex: sampleExpanded ? (consoleExpanded ? '1 1 50%' : '1 1 100%') : '0 0 auto' }}>
            <button
              onClick={() => setSampleExpanded(!sampleExpanded)}
              className="flex items-center justify-between px-4 py-2 bg-[#13142a] border-y border-slate-700/30 shrink-0 hover:bg-[#181a32] transition-colors"
            >
              <span className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <svg className="w-3.5 h-3.5" style={{ color: langColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                見本（期待される出力）
              </span>
              <svg className={`w-3.5 h-3.5 text-slate-500 transition-transform ${sampleExpanded ? '' : '-rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {sampleExpanded && (
              <div className="flex-1 min-h-0 overflow-auto">
                <pre className="p-4 text-[13px] text-slate-400 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {lesson.expectedOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 shrink-0" style={{ background: '#0d0e1a', borderTop: `1px solid ${langColor}20` }}>
        <div className="flex items-center gap-3">
          <button onClick={resetCode} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            リセット
          </button>
          <button onClick={() => setShowAnswer(!showAnswer)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {showAnswer
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              }
            </svg>
            {showAnswer ? '答えを隠す' : '答えを見る'}
          </button>
          <button
            onClick={() => { setShowHints(true); setHintLevel((prev) => Math.min(prev + 1, lesson.hints.length)); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-500/70 hover:text-amber-400 hover:bg-amber-400/5 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            ヒント{showHints && hintLevel > 0 ? ` (${hintLevel}/${lesson.hints.length})` : ''}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={runCode} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all" style={{ background: `${langColor}15`, color: langColor, border: `1px solid ${langColor}30` }}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            実行
          </button>
          <button onClick={checkCode} className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: `linear-gradient(135deg, ${langColor}, ${langColor}cc)`, boxShadow: `0 2px 12px ${langColor}30` }}>
            できた！
          </button>
        </div>
      </div>

      {/* Hints Panel */}
      <AnimatePresence>
        {showHints && hintLevel > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 overflow-hidden"
            style={{ borderTop: '1px solid rgba(245, 158, 11, 0.15)', background: 'rgba(245, 158, 11, 0.03)' }}
          >
            <div className="px-4 py-3 space-y-1.5">
              {lesson.hints.slice(0, hintLevel).map((hint, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-amber-500/60 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  <p className="text-xs text-amber-400/80 leading-relaxed">Hint {i + 1}: {hint}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer Panel */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 overflow-hidden max-h-[45vh] overflow-y-auto"
            style={{ borderTop: `1px solid ${langColor}25`, background: '#080914' }}
          >
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" style={{ color: langColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  模範解答
                </h4>
                <pre className="rounded-lg p-4 text-[13px] text-slate-200 overflow-x-auto" style={{ fontFamily: "'JetBrains Mono', monospace", background: '#12132a', border: `1px solid ${langColor}15` }}>
                  {lesson.solutionCode}
                </pre>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" style={{ color: langColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  解説
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">{lesson.explanation}</p>
              </div>
              <button onClick={() => { setCode(lesson.solutionCode); setShowAnswer(false); }} className="text-xs font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity" style={{ color: langColor }}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                解答をエディタにコピー
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Overlay */}
      <AnimatePresence>
        {isCorrect === true && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCorrect(null)}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="rounded-2xl p-8 text-center max-w-sm mx-4"
              style={{ background: '#0d0e1a', border: `1px solid ${langColor}30` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${langColor}15` }}>
                <svg className="w-8 h-8" style={{ color: langColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">クリア！</h3>
              <p className="text-sm text-slate-400 mb-6">Lesson {lesson.id} を完了しました</p>
              <div className="flex items-center gap-3 justify-center">
                <button onClick={() => setIsCorrect(null)} className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 border border-slate-700 hover:bg-white/5 transition-all">閉じる</button>
                {nextUrl && (
                  <Link href={nextUrl} className="px-5 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90" style={{ background: `linear-gradient(135deg, ${langColor}, ${langColor}cc)`, boxShadow: `0 2px 12px ${langColor}30` }}>
                    次のレッスンへ
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
