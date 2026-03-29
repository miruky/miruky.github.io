'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseWord, getDisplayRomaji, Chunk } from '@/lib/romaji';
import { getWords, getWordCount, Difficulty, TypingWord } from '@/data/typing-words';

type Phase = 'menu' | 'countdown' | 'playing' | 'result';
type MascotMood = 'happy' | 'reading' | 'shy' | 'question';

interface GameState {
  chunks: Chunk[];
  chunkIdx: number;
  typed: string;
  options: string[];
  pending: string | null;
  completed: string[];
  correct: number;
  miss: number;
  score: number;
  streak: number;
  maxStreak: number;
  wordMiss: number;
  wordStart: number;
}

function createGameState(): GameState {
  return {
    chunks: [],
    chunkIdx: 0,
    typed: '',
    options: [],
    pending: null,
    completed: [],
    correct: 0,
    miss: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    wordMiss: 0,
    wordStart: 0,
  };
}

// ─── スコア計算 ───
function calcWordScore(g: GameState, wordTime: number): number {
  const charCount = g.completed.join('').length;
  const kpm = wordTime > 0 ? (charCount / wordTime) * 60 : 0;
  const base = charCount * 10;
  const speedBonus = Math.min(Math.floor((kpm / 100) * 50), 200);
  const accuracyBonus = g.wordMiss === 0 ? 50 : 0;
  const streakBonus = Math.min(g.streak * 20, 200);
  return base + speedBonus + accuracyBonus + streakBonus;
}

function getGrade(kpm: number, accuracy: number): string {
  if (kpm >= 350 && accuracy >= 95) return 'S';
  if (kpm >= 250 && accuracy >= 85) return 'A';
  if (kpm >= 150 && accuracy >= 75) return 'B';
  if (kpm >= 80 && accuracy >= 60) return 'C';
  return 'D';
}

const GRADE_COLORS: Record<string, string> = {
  S: 'from-yellow-300 to-amber-500',
  A: 'from-accent-cyan to-accent-purple',
  B: 'from-green-400 to-emerald-500',
  C: 'from-blue-400 to-indigo-500',
  D: 'from-slate-400 to-slate-500',
};

const GRADE_MSG: Record<string, string> = {
  S: '素晴らしい！マスタータイピスト！',
  A: 'お見事！かなりの腕前です！',
  B: 'いい感じ！さらに上を目指そう！',
  C: 'まずまず。練習あるのみ！',
  D: 'がんばろう！何度でも挑戦！',
};

// ─── メインコンポーネント ───
export default function TypingGame({ onBack }: { onBack?: () => void }) {
  const [phase, setPhase] = useState<Phase>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [words, setWords] = useState<TypingWord[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [elapsed, setElapsed] = useState(0);
  const [mascot, setMascot] = useState<MascotMood>('happy');
  const [shakeKey, setShakeKey] = useState(0);
  const [, forceRender] = useState(0);

  const game = useRef<GameState>(createGameState());
  const startTimeRef = useRef(0);
  const wordsRef = useRef<TypingWord[]>([]);
  const wordIdxRef = useRef(0);
  const phaseRef = useRef<Phase>('menu');

  // phase を ref にも同期（keydown ハンドラから参照）
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // ─── タイマー ───
  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      setElapsed((Date.now() - startTimeRef.current) / 1000);
    }, 100);
    return () => clearInterval(timer);
  }, [phase]);

  // ─── ワード初期化 ───
  const initWord = useCallback((idx: number) => {
    const g = game.current;
    const w = wordsRef.current[idx];
    g.chunks = parseWord(w.reading);
    g.chunkIdx = 0;
    g.typed = '';
    g.options = g.chunks[0]?.options ?? [];
    g.pending = null;
    g.completed = [];
    g.wordMiss = 0;
    g.wordStart = Date.now();
    setMascot('reading');
  }, []);

  // ─── チャンクを進める ───
  const advanceChunk = useCallback((completedRomaji: string) => {
    const g = game.current;
    g.completed.push(completedRomaji);
    g.chunkIdx++;

    if (g.chunkIdx >= g.chunks.length) {
      // ワード完了
      const wordTime = (Date.now() - g.wordStart) / 1000;
      if (g.wordMiss === 0) {
        g.streak++;
        g.maxStreak = Math.max(g.maxStreak, g.streak);
      } else {
        g.streak = 0;
      }
      const wordScore = calcWordScore(g, wordTime);
      g.score += wordScore;

      setMascot('happy');

      // 次のワードへ
      const nextIdx = wordIdxRef.current + 1;
      wordIdxRef.current = nextIdx;
      setWordIdx(nextIdx);

      if (nextIdx >= wordsRef.current.length) {
        // ゲーム終了
        setElapsed((Date.now() - startTimeRef.current) / 1000);
        setPhase('result');
      } else {
        initWord(nextIdx);
      }
      return;
    }

    g.typed = '';
    g.options = g.chunks[g.chunkIdx].options;
    g.pending = null;
  }, [initWord]);

  // ─── 入力処理 ───
  const processInput = useCallback((char: string) => {
    const g = game.current;
    if (g.chunkIdx >= g.chunks.length) return;

    const candidate = g.typed + char;

    // --- pending exact match がある場合 ---
    if (g.pending !== null) {
      const continueOpts = g.options.filter(opt => opt.startsWith(candidate));
      if (continueOpts.length > 0) {
        // 現在のチャンクを継続
        g.correct++;
        const exact = continueOpts.find(opt => opt === candidate);
        if (exact && (continueOpts.length === 1 || g.chunkIdx === g.chunks.length - 1)) {
          g.pending = null;
          advanceChunk(candidate);
        } else {
          g.typed = candidate;
          g.options = continueOpts;
          g.pending = exact ?? null;
        }
        forceRender(n => n + 1);
        return;
      }
      // 継続不可 → pending を確定して次のチャンクへ
      const savedPending = g.pending;
      g.pending = null;
      advanceChunk(savedPending);
      // 新チャンクに対して char を再処理
      if (g.chunkIdx < g.chunks.length) {
        const newCandidate = char;
        const newOpts = g.options.filter(opt => opt.startsWith(newCandidate));
        if (newOpts.length > 0) {
          g.correct++;
          const ex = newOpts.find(opt => opt === newCandidate);
          if (ex && (newOpts.length === 1 || g.chunkIdx === g.chunks.length - 1)) {
            advanceChunk(newCandidate);
          } else {
            g.typed = newCandidate;
            g.options = newOpts;
            g.pending = ex ?? null;
          }
        } else {
          // ミス
          g.miss++;
          g.wordMiss++;
          setMascot('shy');
          setShakeKey(k => k + 1);
          setTimeout(() => setMascot('reading'), 400);
        }
      }
      forceRender(n => n + 1);
      return;
    }

    // --- 通常処理 ---
    const matching = g.options.filter(opt => opt.startsWith(candidate));

    if (matching.length === 0) {
      // ミス
      g.miss++;
      g.wordMiss++;
      setMascot('shy');
      setShakeKey(k => k + 1);
      setTimeout(() => setMascot('reading'), 400);
      forceRender(n => n + 1);
      return;
    }

    g.correct++;
    const exact = matching.find(opt => opt === candidate);

    if (exact) {
      if (matching.length === 1 || g.chunkIdx === g.chunks.length - 1) {
        advanceChunk(candidate);
      } else {
        g.pending = exact;
        g.typed = candidate;
        g.options = matching;
      }
    } else {
      g.pending = null;
      g.typed = candidate;
      g.options = matching;
    }
    forceRender(n => n + 1);
  }, [advanceChunk]);

  // ─── キーボードイベント ───
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phaseRef.current !== 'playing') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Escape') {
        if (phaseRef.current === 'playing' || phaseRef.current === 'countdown') {
          setPhase('menu');
        }
        return;
      }

      if (e.key.length === 1) {
        e.preventDefault();
        processInput(e.key.toLowerCase());
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [processInput]);

  // ─── ゲーム開始 ───
  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    setPhase('countdown');
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count < 0) {
        clearInterval(interval);
        // ゲーム開始
        const w = getWords(diff);
        wordsRef.current = w;
        setWords(w);
        wordIdxRef.current = 0;
        setWordIdx(0);
        startTimeRef.current = Date.now();
        game.current = createGameState();
        initWord(0);
        setElapsed(0);
        setPhase('playing');
      }
    }, 600);
  }, [initWord]);

  // ─── ローマ字表示生成 ───
  const getRomajiDisplay = useCallback((): { char: string; state: 'done' | 'current' | 'future' }[] => {
    const g = game.current;
    const result: { char: string; state: 'done' | 'current' | 'future' }[] = [];

    // 完了済みチャンク
    for (const rom of g.completed) {
      for (const ch of rom) {
        result.push({ char: ch, state: 'done' });
      }
    }

    // 現在のチャンク
    if (g.chunkIdx < g.chunks.length) {
      // 有効な選択肢のうち最短を表示候補にする
      const best = g.options.reduce((a, b) => a.length <= b.length ? a : b, g.options[0] || '');
      for (let i = 0; i < best.length; i++) {
        if (i < g.typed.length) {
          result.push({ char: g.typed[i], state: 'done' });
        } else if (i === g.typed.length) {
          result.push({ char: best[i], state: 'current' });
        } else {
          result.push({ char: best[i], state: 'future' });
        }
      }
    }

    // 未来のチャンク
    for (let i = g.chunkIdx + 1; i < g.chunks.length; i++) {
      const rom = g.chunks[i].options[0];
      for (const ch of rom) {
        result.push({ char: ch, state: 'future' });
      }
    }

    return result;
  }, []);

  // ─── 結果計算 ───
  const getResults = useCallback(() => {
    const g = game.current;
    const totalKeys = g.correct + g.miss;
    const accuracy = totalKeys > 0 ? (g.correct / totalKeys) * 100 : 0;
    const kpm = elapsed > 0 ? (g.correct / elapsed) * 60 : 0;
    const grade = getGrade(kpm, accuracy);
    return { score: g.score, accuracy, kpm, maxStreak: g.maxStreak, totalKeys, grade, totalTime: elapsed };
  }, [elapsed]);

  // ─── マスコット画像パス ───
  const mascotSrc = `/images/mascot/mascot-${mascot}.png`;

  // =========================================================
  //  レンダリング
  // =========================================================

  // ─── メニュー画面 ───
  if (phase === 'menu') {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 text-center">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            miruky <span className="gradient-text">Typing</span>
          </h1>
          <p className="text-slate-400 text-sm mb-8">ローマ字タイピングゲーム</p>
        </motion.div>

        {/* マスコット */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="mascot-bounce inline-block">
            <img src="/images/mascot/mascot-happy.png" alt="miruky" className="w-28 h-auto mx-auto drop-shadow-lg" />
          </div>
        </motion.div>

        {/* 難易度選択 */}
        <div className="space-y-3 max-w-sm mx-auto">
          {([
            { diff: 'easy' as Difficulty, label: 'Easy', sub: 'かんたん', desc: '10ワード・基本のひらがな', color: 'from-green-400 to-emerald-500' },
            { diff: 'normal' as Difficulty, label: 'Normal', sub: 'ふつう', desc: '15ワード・拗音や促音も', color: 'from-blue-400 to-indigo-500' },
            { diff: 'hard' as Difficulty, label: 'Hard', sub: 'むずかしい', desc: '20ワード・IT用語中心', color: 'from-red-400 to-rose-500' },
          ]).map((item, i) => (
            <motion.button
              key={item.diff}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => startGame(item.diff)}
              className="w-full p-4 rounded-xl glass-card hover-card neon-border text-left group transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.label}
                  </span>
                  <span className="text-slate-500 text-xs ml-2">({item.sub})</span>
                  <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                </div>
                <span className="text-slate-500 group-hover:text-accent-cyan transition-colors text-lg">&rarr;</span>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="text-slate-600 text-[10px] mt-6">Esc でメニューに戻る</p>
        {onBack && (
          <button onClick={onBack} className="mt-3 text-xs text-slate-500 hover:text-accent-cyan transition-colors">
            &larr; ゲーム選択に戻る
          </button>
        )}
      </div>
    );
  }

  // ─── カウントダウン ───
  if (phase === 'countdown') {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 text-center flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={countdown}
            initial={{ scale: 2.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {countdown > 0 ? (
              <span className="text-8xl font-bold text-white">{countdown}</span>
            ) : (
              <span className="text-7xl font-bold gradient-text">GO!</span>
            )}
          </motion.div>
        </AnimatePresence>
        <p className="text-slate-400 text-sm mt-6 capitalize">{difficulty} Mode</p>
      </div>
    );
  }

  // ─── プレイ中 ───
  if (phase === 'playing') {
    const g = game.current;
    const currentWord = wordsRef.current[wordIdxRef.current];
    const romajiDisplay = getRomajiDisplay();
    const totalKeys = g.correct + g.miss;
    const accuracy = totalKeys > 0 ? Math.round((g.correct / totalKeys) * 100) : 100;
    const progressPercent = ((wordIdxRef.current) / wordsRef.current.length) * 100;

    return (
      <div className="w-full max-w-3xl mx-auto px-4 select-none">
        {/* ヘッダー情報 */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex items-center gap-6">
            <div className="text-slate-400">
              <span className="text-white font-mono font-bold">{elapsed.toFixed(1)}</span>s
            </div>
            <div className="text-slate-400">
              <span className="text-white font-bold">{wordIdxRef.current}</span>
              <span className="text-slate-600">/{wordsRef.current.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-slate-400">
              Streak <span className="text-accent-cyan font-bold">{g.streak}</span>
            </div>
            <div className="text-slate-400">
              Acc <span className="text-accent-green font-bold">{accuracy}%</span>
            </div>
            <div className="text-slate-400">
              Score <span className="text-white font-bold font-mono">{g.score}</span>
            </div>
          </div>
        </div>

        {/* プログレスバー */}
        <div className="w-full h-1 bg-dark-700 rounded-full mb-10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* メインワード表示 */}
        <div className="text-center relative">
          {/* 日本語表示 */}
          <motion.div
            key={`word-${wordIdxRef.current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-wider">
              {currentWord?.display}
            </div>
            <div className="text-xl text-slate-400 mb-8 tracking-[0.3em] font-light">
              {currentWord?.reading}
            </div>
          </motion.div>

          {/* ローマ字ガイド */}
          <motion.div
            key={shakeKey}
            animate={shakeKey > 0 ? { x: [0, -6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-[2px] min-h-[3rem]"
          >
            {romajiDisplay.map((item, idx) => (
              <span
                key={`${wordIdxRef.current}-${idx}`}
                className={`font-mono text-2xl md:text-3xl font-semibold transition-colors duration-100 ${
                  item.state === 'done'
                    ? 'text-accent-green'
                    : item.state === 'current'
                    ? 'text-white border-b-2 border-accent-cyan pb-0.5'
                    : 'text-slate-600'
                }`}
              >
                {item.char}
              </span>
            ))}
          </motion.div>
        </div>

        {/* マスコット */}
        <div className="fixed bottom-8 right-8 pointer-events-none hidden md:block">
          <AnimatePresence mode="wait">
            <motion.img
              key={mascot}
              src={mascotSrc}
              alt=""
              className="w-20 h-auto drop-shadow-lg opacity-70"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ─── 結果画面 ───
  if (phase === 'result') {
    const r = getResults();
    const gradeColor = GRADE_COLORS[r.grade] || GRADE_COLORS.D;
    const gradeMsg = GRADE_MSG[r.grade] || GRADE_MSG.D;
    const gradeMascot = r.grade === 'S' || r.grade === 'A' ? 'happy' : r.grade === 'B' ? 'reading' : 'question';

    return (
      <div className="w-full max-w-lg mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white mb-6">Result</h2>

          {/* グレード */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
            className="mb-6"
          >
            <span className={`text-8xl font-black bg-gradient-to-br ${gradeColor} bg-clip-text text-transparent`}>
              {r.grade}
            </span>
          </motion.div>

          {/* マスコット */}
          <div className="mb-6">
            <div className={r.grade === 'S' || r.grade === 'A' ? 'mascot-bounce inline-block' : 'mascot-float inline-block'}>
              <img src={`/images/mascot/mascot-${gradeMascot}.png`} alt="" className="w-24 h-auto mx-auto drop-shadow-md" />
            </div>
            <p className="text-slate-400 text-sm mt-2">{gradeMsg}</p>
          </div>

          {/* スコア詳細 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card neon-border p-6 rounded-xl text-left space-y-3 mb-8"
          >
            <div className="flex justify-between">
              <span className="text-slate-400">Score</span>
              <span className="text-white font-bold font-mono">{r.score}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">KPM（打鍵/分）</span>
              <span className="text-accent-cyan font-bold font-mono">{Math.round(r.kpm)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">正確率</span>
              <span className="text-accent-green font-bold font-mono">{r.accuracy.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">最大ストリーク</span>
              <span className="text-accent-purple font-bold font-mono">{r.maxStreak}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">合計時間</span>
              <span className="text-white font-mono">{r.totalTime.toFixed(1)}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">難易度</span>
              <span className="text-white capitalize">{difficulty}</span>
            </div>
          </motion.div>

          {/* ボタン */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => startGame(difficulty)}
              className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:opacity-90 transition-all shadow-lg shadow-accent-cyan/20"
            >
              Retry
            </button>
            <button
              onClick={() => onBack ? onBack() : setPhase('menu')}
              className="px-6 py-3 rounded-lg font-medium border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 transition-all"
            >
              Menu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}
