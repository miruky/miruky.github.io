'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseWord, getDisplayRomaji, Chunk } from '@/lib/romaji';
import { getWords, Difficulty, TimeLimit, TypingWord } from '@/data/typing-words';

// ─── Types ───
type Phase = 'menu' | 'time-select' | 'countdown' | 'playing' | 'result';
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
  wordsCleared: number;
}

interface RankRecord {
  score: number;
  kpm: number;
  accuracy: number;
  grade: string;
  date: string;
  timeLimit: TimeLimit;
}

// ─── Constants ───
const STORAGE_KEY = 'miruky-typing-rankings';

function createGameState(): GameState {
  return { chunks: [], chunkIdx: 0, typed: '', options: [], pending: null, completed: [], correct: 0, miss: 0, score: 0, streak: 0, maxStreak: 0, wordMiss: 0, wordStart: 0, wordsCleared: 0 };
}

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
  if (kpm >= 400 && accuracy >= 98) return 'SS';
  if (kpm >= 350 && accuracy >= 95) return 'S';
  if (kpm >= 250 && accuracy >= 85) return 'A';
  if (kpm >= 150 && accuracy >= 75) return 'B';
  if (kpm >= 80 && accuracy >= 60) return 'C';
  return 'D';
}

const GRADE_COLORS: Record<string, string> = {
  SS: 'from-rose-400 via-yellow-300 to-emerald-300',
  S: 'from-yellow-300 to-amber-500',
  A: 'from-accent-cyan to-accent-purple',
  B: 'from-green-400 to-emerald-500',
  C: 'from-blue-400 to-indigo-500',
  D: 'from-slate-400 to-slate-500',
};

const GRADE_MSG: Record<string, string> = {
  SS: '☆超絶タイピスト！神の領域！☆',
  S: '素晴らしい！マスタータイピスト！',
  A: 'お見事！かなりの腕前です！',
  B: 'いい感じ！さらに上を目指そう！',
  C: 'まずまず。練習あるのみ！',
  D: 'がんばろう！何度でも挑戦！',
};

const DIFF_CONFIG: Record<Difficulty, { label: string; sub: string; desc: string; color: string }> = {
  easy: { label: 'Easy', sub: 'かんたん', desc: '基本のひらがな短文', color: 'from-green-400 to-emerald-500' },
  normal: { label: 'Normal', sub: 'ふつう', desc: '拗音・促音を含む', color: 'from-blue-400 to-indigo-500' },
  hard: { label: 'Hard', sub: 'むずかしい', desc: 'IT用語・長めの語句', color: 'from-red-400 to-rose-500' },
  nightmare: { label: 'Nightmare', sub: '悪夢', desc: '超長文・特殊拗音の嵐', color: 'from-purple-500 to-fuchsia-600' },
};

// ─── Virtual Keyboard ───
const KB_ROWS = [
  ['1','2','3','4','5','6','7','8','9','0','-'],
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l',';'],
  ['z','x','c','v','b','n','m',',','.','/'],
];

// ─── Finger → Key mapping (home position highlighting) ───
const FINGER_MAP: Record<string, number> = {
  '1':0,'q':0,'a':0,'z':0,
  '2':1,'w':1,'s':1,'x':1,
  '3':2,'e':2,'d':2,'c':2,
  '4':3,'r':3,'f':3,'v':3,'5':3,'t':3,'g':3,'b':3,
  '6':4,'y':4,'h':4,'n':4,'7':4,'u':4,'j':4,'m':4,
  '8':5,'i':5,'k':5,',':5,
  '9':6,'o':6,'l':6,'.':6,
  '0':7,'p':7,';':7,'/':7,
  '-':8,
};

const FINGER_COLORS = [
  'bg-rose-500/50',      // left pinky
  'bg-orange-500/50',    // left ring
  'bg-yellow-500/50',    // left middle
  'bg-green-500/50',     // left index
  'bg-cyan-500/50',      // right index
  'bg-blue-500/50',      // right middle
  'bg-indigo-500/50',    // right ring
  'bg-purple-500/50',    // right pinky
  'bg-purple-500/50',    // extra
];

// ─── localStorage Ranking ───
function loadRankings(): Record<string, RankRecord[]> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveRanking(difficulty: Difficulty, timeLimit: TimeLimit, record: RankRecord): RankRecord[] {
  const all = loadRankings();
  const key = `${difficulty}-${timeLimit}`;
  const list = all[key] || [];
  list.push(record);
  list.sort((a, b) => b.score - a.score);
  all[key] = list.slice(0, 10);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch { /* silent */ }
  return all[key];
}

function getRankings(difficulty: Difficulty, timeLimit: TimeLimit): RankRecord[] {
  const all = loadRankings();
  return all[`${difficulty}-${timeLimit}`] || [];
}

// ─── Component ───
export default function TypingGame({ onBack }: { onBack?: () => void }) {
  const [phase, setPhase] = useState<Phase>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [timeLimit, setTimeLimit] = useState<TimeLimit>(60);
  const [words, setWords] = useState<TypingWord[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [mascot, setMascot] = useState<MascotMood>('happy');
  const [shakeKey, setShakeKey] = useState(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [showRankings, setShowRankings] = useState(false);
  const [, forceRender] = useState(0);
  const [savedRankings, setSavedRankings] = useState<RankRecord[]>([]);
  const [resultRecord, setResultRecord] = useState<RankRecord | null>(null);

  const game = useRef<GameState>(createGameState());
  const startTimeRef = useRef(0);
  const wordsRef = useRef<TypingWord[]>([]);
  const wordIdxRef = useRef(0);
  const phaseRef = useRef<Phase>('menu');
  const timeLimitRef = useRef<TimeLimit>(60);
  const pressedKeyTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { timeLimitRef.current = timeLimit; }, [timeLimit]);

  // ─── Save ranking when entering result phase ───
  useEffect(() => {
    if (phase !== 'result') return;
    const g = game.current;
    const totalKeys = g.correct + g.miss;
    const accuracy = totalKeys > 0 ? (g.correct / totalKeys) * 100 : 0;
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const kpm = elapsed > 0 ? (g.correct / elapsed) * 60 : 0;
    const grade = getGrade(kpm, accuracy);
    const record: RankRecord = {
      score: g.score,
      kpm: Math.round(kpm),
      accuracy: Math.round(accuracy * 10) / 10,
      grade,
      date: new Date().toISOString(),
      timeLimit,
    };
    const rankings = saveRanking(difficulty, timeLimit, record);
    setResultRecord(record);
    setSavedRankings(rankings);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ─── Timer (countdown) ───
  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const left = Math.max(0, timeLimitRef.current - elapsed);
      setTimeLeft(left);
      if (left <= 0) {
        clearInterval(timer);
        setPhase('result');
      }
    }, 100);
    return () => clearInterval(timer);
  }, [phase]);

  // ─── Init word ───
  const initWord = useCallback((idx: number) => {
    const g = game.current;
    const w = wordsRef.current[idx];
    if (!w) return;
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

  // ─── Advance chunk ───
  const advanceChunk = useCallback((completedRomaji: string) => {
    const g = game.current;
    g.completed.push(completedRomaji);
    g.chunkIdx++;

    if (g.chunkIdx >= g.chunks.length) {
      const wordTime = (Date.now() - g.wordStart) / 1000;
      if (g.wordMiss === 0) {
        g.streak++;
        g.maxStreak = Math.max(g.maxStreak, g.streak);
      } else {
        g.streak = 0;
      }
      g.score += calcWordScore(g, wordTime);
      g.wordsCleared++;
      setMascot('happy');

      const nextIdx = wordIdxRef.current + 1;
      wordIdxRef.current = nextIdx;
      setWordIdx(nextIdx);

      if (nextIdx >= wordsRef.current.length) {
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

  // ─── Process input ───
  const processInput = useCallback((char: string) => {
    const g = game.current;
    if (g.chunkIdx >= g.chunks.length) return;

    const candidate = g.typed + char;

    if (g.pending !== null) {
      const continueOpts = g.options.filter(opt => opt.startsWith(candidate));
      if (continueOpts.length > 0) {
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
      const savedPending = g.pending;
      g.pending = null;
      advanceChunk(savedPending);
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

    const matching = g.options.filter(opt => opt.startsWith(candidate));
    if (matching.length === 0) {
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

  // ─── Keyboard event ───
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phaseRef.current !== 'playing') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Escape') {
        setPhase('menu');
        return;
      }
      if (e.key.length === 1) {
        e.preventDefault();
        const key = e.key.toLowerCase();
        processInput(key);
        setPressedKey(key);
        if (pressedKeyTimer.current) clearTimeout(pressedKeyTimer.current);
        pressedKeyTimer.current = setTimeout(() => setPressedKey(null), 120);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [processInput]);

  // ─── Start game ───
  const startGame = useCallback((diff: Difficulty, time: TimeLimit) => {
    setDifficulty(diff);
    setTimeLimit(time);
    timeLimitRef.current = time;
    setPhase('countdown');
    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count < 0) {
        clearInterval(interval);
        const w = getWords(diff);
        wordsRef.current = w;
        setWords(w);
        wordIdxRef.current = 0;
        setWordIdx(0);
        startTimeRef.current = Date.now();
        game.current = createGameState();
        initWord(0);
        setTimeLeft(time);
        setPhase('playing');
      }
    }, 600);
  }, [initWord]);

  // ─── Get next key to press ───
  const getNextKey = useCallback((): string | null => {
    const g = game.current;
    if (g.chunkIdx >= g.chunks.length) return null;
    const best = g.options.reduce((a, b) => a.length <= b.length ? a : b, g.options[0] || '');
    if (g.typed.length < best.length) {
      return best[g.typed.length];
    }
    return null;
  }, []);

  // ─── Romaji display ───
  const getRomajiDisplay = useCallback((): { char: string; state: 'done' | 'current' | 'future' }[] => {
    const g = game.current;
    const result: { char: string; state: 'done' | 'current' | 'future' }[] = [];
    for (const rom of g.completed) {
      for (const ch of rom) result.push({ char: ch, state: 'done' });
    }
    if (g.chunkIdx < g.chunks.length) {
      const best = g.options.reduce((a, b) => a.length <= b.length ? a : b, g.options[0] || '');
      for (let i = 0; i < best.length; i++) {
        if (i < g.typed.length) result.push({ char: g.typed[i], state: 'done' });
        else if (i === g.typed.length) result.push({ char: best[i], state: 'current' });
        else result.push({ char: best[i], state: 'future' });
      }
    }
    for (let i = g.chunkIdx + 1; i < g.chunks.length; i++) {
      const rom = g.chunks[i].options[0];
      for (const ch of rom) result.push({ char: ch, state: 'future' });
    }
    return result;
  }, []);

  // ─── Results ───
  const getResults = useCallback(() => {
    const g = game.current;
    const totalKeys = g.correct + g.miss;
    const accuracy = totalKeys > 0 ? (g.correct / totalKeys) * 100 : 0;
    const elapsed = timeLimitRef.current - timeLeft;
    const kpm = elapsed > 0 ? (g.correct / elapsed) * 60 : 0;
    const grade = getGrade(kpm, accuracy);
    return { score: g.score, accuracy, kpm, maxStreak: g.maxStreak, totalKeys, grade, elapsed, wordsCleared: g.wordsCleared, correct: g.correct, miss: g.miss };
  }, [timeLeft]);

  const mascotSrc = `/images/mascot/mascot-${mascot}.png`;

  // =============== RENDER ===============

  // ─── Menu ───
  if (phase === 'menu') {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            miruky <span className="gradient-text">Typing</span>
          </h1>
          <p className="text-slate-400 text-sm mb-8">ローマ字タイピングゲーム</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="mascot-bounce inline-block">
            <img src="/images/mascot/mascot-happy.png" alt="miruky" className="w-28 h-auto mx-auto drop-shadow-lg" />
          </div>
        </motion.div>

        <div className="space-y-3 max-w-sm mx-auto">
          {(Object.keys(DIFF_CONFIG) as Difficulty[]).map((diff, i) => {
            const cfg = DIFF_CONFIG[diff];
            return (
              <motion.button
                key={diff}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onClick={() => { setDifficulty(diff); setPhase('time-select'); }}
                className="w-full p-4 rounded-xl glass-card hover-card neon-border text-left group transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-lg font-bold bg-gradient-to-r ${cfg.color} bg-clip-text text-transparent`}>
                      {cfg.label}
                    </span>
                    <span className="text-slate-500 text-xs ml-2">({cfg.sub})</span>
                    <p className="text-slate-400 text-xs mt-1">{cfg.desc}</p>
                  </div>
                  <span className="text-slate-500 group-hover:text-accent-cyan transition-colors text-lg">&rarr;</span>
                </div>
              </motion.button>
            );
          })}
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

  // ─── Time Select ───
  if (phase === 'time-select') {
    const cfg = DIFF_CONFIG[difficulty];
    const rankings = getRankings(difficulty, timeLimit);
    return (
      <div className="w-full max-w-2xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-bold text-white mb-1">
            <span className={`bg-gradient-to-r ${cfg.color} bg-clip-text text-transparent`}>{cfg.label}</span> Mode
          </h2>
          <p className="text-slate-400 text-sm mb-8">制限時間を選択してください</p>
        </motion.div>

        <div className="flex gap-4 justify-center mb-10">
          {([60, 180, 300] as TimeLimit[]).map((t, i) => {
            const label = t === 60 ? '1分' : t === 180 ? '3分' : '5分';
            const selected = timeLimit === t;
            return (
              <motion.button
                key={t}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => setTimeLimit(t)}
                className={`px-8 py-5 rounded-xl glass-card neon-border transition-all text-center ${
                  selected ? 'ring-2 ring-accent-cyan shadow-lg shadow-accent-cyan/20' : 'hover-card'
                }`}
              >
                <div className={`text-2xl font-bold ${selected ? 'text-accent-cyan' : 'text-white'}`}>{label}</div>
                <div className="text-slate-500 text-xs mt-1">{t}秒</div>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => startGame(difficulty, timeLimit)}
          className="px-10 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:opacity-90 transition-all shadow-lg shadow-accent-cyan/20 mb-8"
        >
          スタート
        </motion.button>

        {/* Past Rankings Preview */}
        {rankings.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-sm mx-auto glass-card neon-border rounded-xl p-4 text-left"
          >
            <h3 className="text-sm font-bold text-accent-cyan mb-3 flex items-center gap-2">
              <span>🏆</span> 自己ベスト TOP 3
            </h3>
            {rankings.slice(0, 3).map((r, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-dark-700/50 last:border-0 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`font-bold w-5 ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : 'text-amber-600'}`}>#{i + 1}</span>
                  <span className={`font-bold bg-gradient-to-r ${GRADE_COLORS[r.grade] || GRADE_COLORS.D} bg-clip-text text-transparent`}>{r.grade}</span>
                </div>
                <span className="text-white font-mono">{r.score}</span>
                <span className="text-slate-400">{Math.round(r.kpm)} KPM</span>
                <span className="text-slate-500">{new Date(r.date).toLocaleDateString('ja-JP')}</span>
              </div>
            ))}
          </motion.div>
        )}

        <button onClick={() => setPhase('menu')} className="mt-6 text-xs text-slate-500 hover:text-accent-cyan transition-colors">
          &larr; 難易度選択に戻る
        </button>
      </div>
    );
  }

  // ─── Countdown ───
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
        <p className="text-slate-400 text-sm mt-6 capitalize">{difficulty} Mode — {timeLimit === 60 ? '1分' : timeLimit === 180 ? '3分' : '5分'}</p>
      </div>
    );
  }

  // ─── Playing ───
  if (phase === 'playing') {
    const g = game.current;
    const currentWord = wordsRef.current[wordIdxRef.current];
    const romajiDisplay = getRomajiDisplay();
    const totalKeys = g.correct + g.miss;
    const accuracy = totalKeys > 0 ? Math.round((g.correct / totalKeys) * 100) : 100;
    const timePercent = (timeLeft / timeLimitRef.current) * 100;
    const nextKey = getNextKey();
    const isUrgent = timeLeft <= 10;

    return (
      <div className="w-full max-w-4xl mx-auto px-4 select-none">
        {/* Header Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-6">
            <div className={`font-mono font-bold text-lg ${isUrgent ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {Math.ceil(timeLeft)}
              <span className="text-slate-500 text-xs ml-1">s</span>
            </div>
            <div className="text-slate-400">
              Words <span className="text-white font-bold">{g.wordsCleared}</span>
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

        {/* Time Bar */}
        <div className="w-full h-1.5 bg-dark-700 rounded-full mb-8 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isUrgent ? 'bg-red-500' : 'bg-gradient-to-r from-accent-cyan to-accent-purple'}`}
            animate={{ width: `${timePercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Main Word Display */}
        <div className="text-center relative mb-6">
          <motion.div
            key={`word-${wordIdxRef.current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-wider">
              {currentWord?.display}
            </div>
            <div className="text-xl text-slate-400 mb-6 tracking-[0.3em] font-light">
              {currentWord?.reading}
            </div>
          </motion.div>

          {/* Romaji Guide */}
          <motion.div
            key={shakeKey}
            animate={shakeKey > 0 ? { x: [0, -6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-[2px] min-h-[3rem] mb-8"
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

        {/* Virtual Keyboard */}
        <div className="hidden md:block max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-4 border border-dark-600/50">
            {KB_ROWS.map((row, ri) => (
              <div key={ri} className="flex justify-center gap-1 mb-1 last:mb-0" style={{ paddingLeft: ri === 1 ? 16 : ri === 2 ? 32 : ri === 3 ? 48 : 0 }}>
                {row.map((key) => {
                  const isNext = nextKey === key;
                  const isPressed = pressedKey === key;
                  const fingerIdx = FINGER_MAP[key];
                  const fingerColor = fingerIdx !== undefined ? FINGER_COLORS[fingerIdx] : '';

                  return (
                    <div
                      key={key}
                      className={`
                        relative w-10 h-10 rounded-lg flex items-center justify-center text-sm font-mono font-medium
                        transition-all duration-75 border
                        ${isPressed
                          ? 'bg-accent-cyan/40 border-accent-cyan text-white scale-95 shadow-lg shadow-accent-cyan/30'
                          : isNext
                          ? `${fingerColor} border-accent-cyan/60 text-white animate-pulse`
                          : 'bg-dark-800/80 border-dark-600/50 text-slate-500 hover:bg-dark-700/80'
                        }
                      `}
                    >
                      {key.toUpperCase()}
                      {isNext && (
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
            {/* Space bar */}
            <div className="flex justify-center mt-1">
              <div className={`w-64 h-9 rounded-lg flex items-center justify-center text-xs font-mono border transition-all duration-75 ${
                pressedKey === ' ' ? 'bg-accent-cyan/40 border-accent-cyan scale-95' : 'bg-dark-800/80 border-dark-600/50 text-slate-600'
              }`}>
                SPACE
              </div>
            </div>
          </div>
        </div>

        {/* Mascot */}
        <div className="fixed bottom-6 right-6 pointer-events-none hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.img
              key={mascot}
              src={mascotSrc}
              alt=""
              className="w-16 h-auto drop-shadow-lg opacity-60"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ─── Result ───
  if (phase === 'result') {
    const r = getResults();
    const gradeColor = GRADE_COLORS[r.grade] || GRADE_COLORS.D;
    const gradeMsg = GRADE_MSG[r.grade] || GRADE_MSG.D;
    const gradeMascot = r.grade === 'SS' || r.grade === 'S' || r.grade === 'A' ? 'happy' : r.grade === 'B' ? 'reading' : 'question';

    const record = resultRecord;
    const rankings = savedRankings;
    const currentRank = record ? rankings.findIndex(rr => rr.date === record.date) + 1 : 0;
    const isNewBest = currentRank === 1 && rankings.length > 1;

    return (
      <div className="w-full max-w-lg mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white mb-4">Result</h2>

          {/* New Best Badge */}
          {isNewBest && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-bold mb-4"
            >
              🎉 NEW BEST!
            </motion.div>
          )}

          {/* Grade */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
            className="mb-4"
          >
            <span className={`text-8xl font-black bg-gradient-to-br ${gradeColor} bg-clip-text text-transparent`}>
              {r.grade}
            </span>
          </motion.div>

          {/* Mascot */}
          <div className="mb-4">
            <div className={r.grade === 'SS' || r.grade === 'S' || r.grade === 'A' ? 'mascot-bounce inline-block' : 'mascot-float inline-block'}>
              <img src={`/images/mascot/mascot-${gradeMascot}.png`} alt="" className="w-20 h-auto mx-auto drop-shadow-md" />
            </div>
            <p className="text-slate-400 text-sm mt-2">{gradeMsg}</p>
          </div>

          {/* Score Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card neon-border p-5 rounded-xl text-left space-y-2.5 mb-6"
          >
            <div className="flex justify-between"><span className="text-slate-400 text-sm">Score</span><span className="text-white font-bold font-mono">{r.score}</span></div>
            <div className="flex justify-between"><span className="text-slate-400 text-sm">KPM（打鍵/分）</span><span className="text-accent-cyan font-bold font-mono">{Math.round(r.kpm)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400 text-sm">正確率</span><span className="text-accent-green font-bold font-mono">{r.accuracy.toFixed(1)}%</span></div>
            <div className="flex justify-between"><span className="text-slate-400 text-sm">正打 / ミス</span><span className="font-mono"><span className="text-accent-green">{r.correct}</span> / <span className="text-red-400">{r.miss}</span></span></div>
            <div className="flex justify-between"><span className="text-slate-400 text-sm">クリア単語数</span><span className="text-accent-purple font-bold font-mono">{r.wordsCleared}</span></div>
            <div className="flex justify-between"><span className="text-slate-400 text-sm">最大ストリーク</span><span className="text-accent-purple font-bold font-mono">{r.maxStreak}</span></div>
            <div className="flex justify-between"><span className="text-slate-400 text-sm">プレイ時間</span><span className="text-white font-mono">{Math.round(r.elapsed)}s / {timeLimit}s</span></div>
            <div className="flex justify-between"><span className="text-slate-400 text-sm">難易度</span><span className="text-white capitalize">{difficulty} ({timeLimit === 60 ? '1分' : timeLimit === 180 ? '3分' : '5分'})</span></div>
            {currentRank > 0 && (
              <div className="flex justify-between border-t border-dark-700/50 pt-2.5"><span className="text-slate-400 text-sm">自己ランキング</span><span className={`font-bold ${currentRank <= 3 ? 'text-yellow-400' : 'text-white'}`}>#{currentRank} / {rankings.length}</span></div>
            )}
          </motion.div>

          {/* Rankings Toggle */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <button
              onClick={() => setShowRankings(!showRankings)}
              className="text-xs text-accent-cyan hover:text-accent-cyan/80 transition-colors mb-4"
            >
              {showRankings ? '▲ ランキングを閉じる' : '▼ 自己ランキング TOP 10 を見る'}
            </button>

            <AnimatePresence>
              {showRankings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="glass-card neon-border rounded-xl p-4 text-left">
                    <h3 className="text-sm font-bold text-accent-cyan mb-3">🏆 {difficulty.toUpperCase()} - {timeLimit === 60 ? '1分' : timeLimit === 180 ? '3分' : '5分'}</h3>
                    {rankings.length === 0 ? (
                      <p className="text-slate-500 text-xs">まだ記録がありません</p>
                    ) : (
                      <div className="space-y-1.5">
                        {rankings.map((rr, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-3 py-1.5 px-2 rounded text-xs ${
                              record && rr.date === record.date ? 'bg-accent-cyan/10 border border-accent-cyan/30' : 'border-b border-dark-700/30'
                            }`}
                          >
                            <span className={`font-bold w-6 text-center ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-600' : 'text-slate-500'}`}>#{i + 1}</span>
                            <span className={`font-bold bg-gradient-to-r ${GRADE_COLORS[rr.grade] || GRADE_COLORS.D} bg-clip-text text-transparent`}>{rr.grade}</span>
                            <span className="text-white font-mono flex-1">{rr.score}</span>
                            <span className="text-accent-cyan">{rr.kpm} KPM</span>
                            <span className="text-slate-400">{rr.accuracy}%</span>
                            <span className="text-slate-600">{new Date(rr.date).toLocaleDateString('ja-JP')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => startGame(difficulty, timeLimit)}
              className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:opacity-90 transition-all shadow-lg shadow-accent-cyan/20"
            >
              Retry
            </button>
            <button
              onClick={() => setPhase('time-select')}
              className="px-6 py-3 rounded-lg font-medium border border-accent-purple/40 text-accent-purple hover:bg-accent-purple/10 transition-all"
            >
              時間変更
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
