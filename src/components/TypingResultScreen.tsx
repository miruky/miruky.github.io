'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GRADE_COLORS, GRADE_MSG, getGradeMascot, RankRecord } from '@/lib/typing-utils';
import { Difficulty, TimeLimit } from '@/data/typing-words';

interface ResultData {
  score: number;
  accuracy: number;
  kpm: number;
  maxStreak: number;
  totalKeys: number;
  grade: string;
  elapsed: number;
  wordsCleared: number;
  correct: number;
  miss: number;
}

interface TypingResultScreenProps {
  results: ResultData;
  difficulty: Difficulty;
  timeLimit: TimeLimit;
  resultRecord: RankRecord | null;
  savedRankings: RankRecord[];
  showRankings: boolean;
  onToggleRankings: () => void;
  onRetry: () => void;
  onTimeChange: () => void;
  onMenu: () => void;
}

export default function TypingResultScreen({
  results: r,
  difficulty,
  timeLimit,
  resultRecord,
  savedRankings,
  showRankings,
  onToggleRankings,
  onRetry,
  onTimeChange,
  onMenu,
}: TypingResultScreenProps) {
  const gradeColor = GRADE_COLORS[r.grade] || GRADE_COLORS.D;
  const gradeMsg = GRADE_MSG[r.grade] || GRADE_MSG.D;
  const gradeMascot = getGradeMascot(r.grade);

  const record = resultRecord;
  const rankings = savedRankings;
  const currentRank = record ? rankings.findIndex(rr => rr.date === record.date) + 1 : 0;
  const isNewBest = currentRank === 1 && rankings.length > 1;

  const timeLabelMap: Record<number, string> = { 60: '1分', 180: '3分', 300: '5分' };
  const timeLabel = timeLabelMap[timeLimit] || `${timeLimit}秒`;

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
          <div className="flex justify-between"><span className="text-slate-400 text-sm">難易度</span><span className="text-white capitalize">{difficulty} ({timeLabel})</span></div>
          {currentRank > 0 && (
            <div className="flex justify-between border-t border-dark-700/50 pt-2.5"><span className="text-slate-400 text-sm">自己ランキング</span><span className={`font-bold ${currentRank <= 3 ? 'text-yellow-400' : 'text-white'}`}>#{currentRank} / {rankings.length}</span></div>
          )}
        </motion.div>

        {/* Rankings Toggle */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <button
            onClick={onToggleRankings}
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
                  <h3 className="text-sm font-bold text-accent-cyan mb-3">🏆 {difficulty.toUpperCase()} - {timeLabel}</h3>
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
            onClick={onRetry}
            className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:opacity-90 transition-all shadow-lg shadow-accent-cyan/20"
          >
            Retry
          </button>
          <button
            onClick={onTimeChange}
            className="px-6 py-3 rounded-lg font-medium border border-accent-purple/40 text-accent-purple hover:bg-accent-purple/10 transition-all"
          >
            時間変更
          </button>
          <button
            onClick={onMenu}
            className="px-6 py-3 rounded-lg font-medium border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 transition-all"
          >
            Menu
          </button>
        </div>
      </motion.div>
    </div>
  );
}
