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
  const [showInstructions, setShowInstructions] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
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
    setShowInstructions(true);
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

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      {/* ─── Top Bar ─── */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b shrink-0"
        style={{ borderColor: `${langColor}30` }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={`/program/${langId}/`}
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            ← {langNameJa}
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-white font-bold text-sm truncate">
            #{lesson.id} {lesson.title}
          </span>
          <span
            className="px-2 py-0.5 rounded text-[10px] font-bold shrink-0"
            style={{ background: `${diff.color}20`, color: diff.color }}
          >
            {diff.label}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-500 font-mono">
            {currentIndex + 1} / {totalLessons}
          </span>
          {prevUrl && (
            <Link
              href={prevUrl}
              className="px-2 py-1 rounded text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              ◀ Prev
            </Link>
          )}
          {nextUrl && (
            <Link
              href={nextUrl}
              className="px-2 py-1 rounded text-xs transition-all font-medium"
              style={{ color: langColor }}
            >
              Next ▶
            </Link>
          )}
        </div>
      </div>

      {/* ─── Instructions (collapsible) ─── */}
      <div className="shrink-0 border-b" style={{ borderColor: `${langColor}15` }}>
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <span style={{ color: langColor }}>📖</span> 課題説明
          </span>
          <span className="text-xs">{showInstructions ? '▲ 閉じる' : '▼ 開く'}</span>
        </button>
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 space-y-2">
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {lesson.description}
                </p>
                <div
                  className="rounded-lg px-3 py-2 text-sm font-medium"
                  style={{ background: `${langColor}10`, color: langColor }}
                >
                  🎯 {lesson.task}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Editor + Output Split ─── */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Code Editor */}
        <div className="w-1/2 flex flex-col border-r border-slate-700/50">
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#1a1b2e] border-b border-slate-700/30 shrink-0">
            <span className="text-xs text-slate-500 font-mono">{langName}</span>
            <button
              onClick={resetCode}
              className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
            >
              ↻ リセット
            </button>
          </div>
          <div className="flex-1 flex min-h-0 bg-[#0d0e1a]">
            {/* Line Numbers */}
            <div
              ref={lineNumRef}
              className="w-10 shrink-0 overflow-hidden text-right pr-2 pt-3 select-none"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: '1.6' }}
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i} className="text-slate-600">
                  {i + 1}
                </div>
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
              className="flex-1 bg-transparent text-slate-200 resize-none outline-none p-3 min-h-0"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                lineHeight: '1.6',
                tabSize: 2,
                caretColor: langColor,
              }}
            />
          </div>
        </div>

        {/* Right: Output */}
        <div className="w-1/2 flex flex-col">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1b2e] border-b border-slate-700/30 shrink-0">
            <span className="text-xs text-slate-500 font-mono">
              {langId === 'html-css' ? 'Preview' : 'Output'}
            </span>
            {isCorrect !== null && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-bold"
                style={{
                  background: isCorrect ? '#22c55e20' : '#ef444420',
                  color: isCorrect ? '#22c55e' : '#ef4444',
                }}
              >
                {isCorrect ? '✅ PASS' : '❌ TRY AGAIN'}
              </span>
            )}
          </div>
          <div className="flex-1 min-h-0 bg-[#0d0e1a] overflow-auto">
            {langId === 'html-css' ? (
              <iframe
                ref={iframeRef}
                className="w-full h-full bg-white"
                sandbox="allow-scripts"
                title="Preview"
              />
            ) : (
              <pre
                className="p-3 text-sm text-slate-300 whitespace-pre-wrap"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}
              >
                {output || (
                  <span className="text-slate-600 italic">
                    ▶ 実行ボタン or Ctrl+Enter で結果を確認
                  </span>
                )}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* ─── Toolbar ─── */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-t shrink-0"
        style={{ borderColor: `${langColor}30`, background: '#0d0e1a' }}
      >
        <div className="flex items-center gap-2">
          {/* Hint */}
          <button
            onClick={() => {
              setShowHints(true);
              setHintLevel((prev) => Math.min(prev + 1, lesson.hints.length));
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-amber-400 border border-amber-400/30 hover:bg-amber-400/10 transition-all"
          >
            💡 ヒント {showHints && hintLevel > 0 ? `(${hintLevel}/${lesson.hints.length})` : ''}
          </button>
          {/* Show Answer */}
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 border border-slate-600 hover:bg-white/5 transition-all"
          >
            {showAnswer ? '📕 解答を閉じる' : '📖 解答と解説'}
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* Run */}
          <button
            onClick={runCode}
            className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
            style={{
              background: `${langColor}20`,
              color: langColor,
              border: `1px solid ${langColor}40`,
            }}
          >
            ▶ 実行
          </button>
          {/* Check */}
          <button
            onClick={checkCode}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:opacity-90 transition-all"
          >
            ✓ 判定
          </button>
        </div>
      </div>

      {/* ─── Hints ─── */}
      <AnimatePresence>
        {showHints && hintLevel > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 overflow-hidden border-t border-amber-400/20 bg-amber-400/5"
          >
            <div className="px-4 py-3 space-y-1">
              {lesson.hints.slice(0, hintLevel).map((hint, i) => (
                <p key={i} className="text-xs text-amber-300">
                  💡 Hint {i + 1}: {hint}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Answer Panel ─── */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 overflow-hidden border-t max-h-[40vh] overflow-y-auto"
            style={{ borderColor: `${langColor}30`, background: '#0a0b18' }}
          >
            <div className="p-4 space-y-3">
              <h4 className="text-sm font-bold" style={{ color: langColor }}>
                📝 模範解答
              </h4>
              <pre
                className="bg-[#1a1b2e] rounded-lg p-3 text-sm text-slate-200 overflow-x-auto"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}
              >
                {lesson.solutionCode}
              </pre>
              <h4 className="text-sm font-bold" style={{ color: langColor }}>
                📚 解説
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {lesson.explanation}
              </p>
              {/* Copy solution to editor */}
              <button
                onClick={() => {
                  setCode(lesson.solutionCode);
                  setShowAnswer(false);
                }}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                ↳ 解答をエディタにコピー
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
