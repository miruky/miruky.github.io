/** Shared types and utilities for TypingGame */

export type Phase = 'menu' | 'time-select' | 'countdown' | 'playing' | 'result';
export type MascotMood = 'happy' | 'reading' | 'shy' | 'question';

export interface RankRecord {
  score: number;
  kpm: number;
  accuracy: number;
  grade: string;
  date: string;
  timeLimit: number;
}

export const STORAGE_KEY = 'miruky-typing-rankings';

export const GRADE_COLORS: Record<string, string> = {
  SS: 'from-rose-400 via-yellow-300 to-emerald-300',
  S: 'from-yellow-300 to-amber-500',
  A: 'from-accent-cyan to-accent-purple',
  B: 'from-green-400 to-emerald-500',
  C: 'from-blue-400 to-indigo-500',
  D: 'from-slate-400 to-slate-500',
};

export const GRADE_MSG: Record<string, string> = {
  SS: '\u2606\u8d85\u7d76\u30bf\u30a4\u30d4\u30b9\u30c8\uff01\u795e\u306e\u9818\u57df\uff01\u2606',
  S: '\u7d20\u6674\u3089\u3057\u3044\uff01\u30de\u30b9\u30bf\u30fc\u30bf\u30a4\u30d4\u30b9\u30c8\uff01',
  A: '\u304a\u898b\u4e8b\uff01\u304b\u306a\u308a\u306e\u8155\u524d\u3067\u3059\uff01',
  B: '\u3044\u3044\u611f\u3058\uff01\u3055\u3089\u306b\u4e0a\u3092\u76ee\u6307\u305d\u3046\uff01',
  C: '\u307e\u305a\u307e\u305a\u3002\u7df4\u7fd2\u3042\u308b\u306e\u307f\uff01',
  D: '\u304c\u3093\u3070\u308d\u3046\uff01\u4f55\u5ea6\u3067\u3082\u6311\u6226\uff01',
};

export function getGrade(kpm: number, accuracy: number): string {
  if (kpm >= 400 && accuracy >= 98) return 'SS';
  if (kpm >= 350 && accuracy >= 95) return 'S';
  if (kpm >= 250 && accuracy >= 85) return 'A';
  if (kpm >= 150 && accuracy >= 75) return 'B';
  if (kpm >= 80 && accuracy >= 60) return 'C';
  return 'D';
}

export function getGradeMascot(grade: string): MascotMood {
  if (grade === 'SS' || grade === 'S' || grade === 'A') return 'happy';
  if (grade === 'B') return 'reading';
  return 'question';
}
