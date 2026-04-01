'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuestions, getQuestionCount, QuizDifficulty, QuizQuestion } from '@/data/quiz-questions';

type Phase = 'menu' | 'playing' | 'result';
type MascotMood = 'happy' | 'reading' | 'shy' | 'question';

interface Answer {
  questionIndex: number;
  selectedChoice: number;
  isCorrect: boolean;
  timeTaken: number;
}

const DIFFICULTY_INFO = [
  { diff: 'normal' as QuizDifficulty, label: 'Normal', sub: '基本情報レベル', desc: '基本情報技術者試験相当の問題', color: 'from-green-400 to-emerald-500', emoji: '📗' },
  { diff: 'hard' as QuizDifficulty, label: 'Hard', sub: '応用情報レベル', desc: '応用情報技術者試験相当の問題', color: 'from-orange-400 to-amber-500', emoji: '📙' },
  { diff: 'nightmare' as QuizDifficulty, label: 'Nightmare', sub: 'スペシャリストレベル', desc: '高度試験・スペシャリスト相当', color: 'from-red-500 to-rose-600', emoji: '💀' },
];

function getGrade(accuracy: number): string {
  if (accuracy >= 90) return 'S';
  if (accuracy >= 80) return 'A';
  if (accuracy >= 70) return 'B';
  if (accuracy >= 50) return 'C';
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
  S: '素晴らしい！IT知識マスター！',
  A: 'お見事！高い理解力です！',
  B: 'いい感じ！もう少しで上級者！',
  C: 'まずまず。復習して知識を固めよう！',
  D: 'がんばろう！基礎から見直しを！',
};

export default function QuizGame({ onBack }: { onBack?: () => void }) {
  const [phase, setPhase] = useState<Phase>('menu');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('normal');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [mascot, setMascot] = useState<MascotMood>('happy');
  const [elapsed, setElapsed] = useState(0);
  const [showReview, setShowReview] = useState(false);

  const questionStartRef = useRef(0);
  const startTimeRef = useRef(0);

  // タイマー
  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      setElapsed((Date.now() - startTimeRef.current) / 1000);
    }, 100);
    return () => clearInterval(timer);
  }, [phase]);

  // ゲーム開始
  const startGame = useCallback((diff: QuizDifficulty) => {
    setDifficulty(diff);
    const qs = getQuestions(diff);
    setQuestions(qs);
    setQuestionIdx(0);
    setAnswers([]);
    setSelectedChoice(null);
    setShowExplanation(false);
    setMascot('reading');
    startTimeRef.current = Date.now();
    questionStartRef.current = Date.now();
    setElapsed(0);
    setShowReview(false);
    setPhase('playing');
  }, []);

  // 回答を選択
  const selectChoice = useCallback((choiceIdx: number) => {
    if (selectedChoice !== null) return; // 既に選択済み
    
    const timeTaken = (Date.now() - questionStartRef.current) / 1000;
    const isCorrect = choiceIdx === questions[questionIdx].answer;
    
    setSelectedChoice(choiceIdx);
    setShowExplanation(true);
    
    const newAnswer: Answer = {
      questionIndex: questionIdx,
      selectedChoice: choiceIdx,
      isCorrect,
      timeTaken,
    };
    
    setAnswers(prev => [...prev, newAnswer]);
    setMascot(isCorrect ? 'happy' : 'shy');
  }, [selectedChoice, questions, questionIdx]);

  // 次の問題へ
  const nextQuestion = useCallback(() => {
    const nextIdx = questionIdx + 1;
    if (nextIdx >= questions.length) {
      setElapsed((Date.now() - startTimeRef.current) / 1000);
      setPhase('result');
      return;
    }
    setQuestionIdx(nextIdx);
    setSelectedChoice(null);
    setShowExplanation(false);
    setMascot('reading');
    questionStartRef.current = Date.now();
  }, [questionIdx, questions.length]);

  // キーボードショートカット
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase !== 'playing') return;
      if (showExplanation) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          nextQuestion();
        }
        return;
      }
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4 && questions[questionIdx]) {
        e.preventDefault();
        selectChoice(num - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, showExplanation, nextQuestion, selectChoice, questions, questionIdx]);

  // 結果計算
  const getResults = useCallback(() => {
    const correct = answers.filter(a => a.isCorrect).length;
    const total = answers.length;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    const avgTime = total > 0 ? answers.reduce((s, a) => s + a.timeTaken, 0) / total : 0;
    const grade = getGrade(accuracy);
    return { correct, total, accuracy, avgTime, grade, totalTime: elapsed };
  }, [answers, elapsed]);

  const mascotSrc = `/images/mascot/mascot-${mascot}.png`;

  // ─── メニュー画面 ───
  if (phase === 'menu') {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            IT知識 <span className="gradient-text">Quiz</span>
          </h1>
          <p className="text-slate-400 text-sm mb-8">IPA試験レベルのIT知識クイズ</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="mascot-bounce inline-block">
            <img src="/images/mascot/mascot-question.png" alt="miruky" className="w-28 h-auto mx-auto drop-shadow-lg" />
          </div>
        </motion.div>

        <div className="space-y-3 max-w-sm mx-auto">
          {DIFFICULTY_INFO.map((item, i) => (
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
                    {item.emoji} {item.label}
                  </span>
                  <span className="text-slate-500 text-xs ml-2">({item.sub})</span>
                  <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                </div>
                <span className="text-slate-500 group-hover:text-accent-cyan transition-colors text-lg">&rarr;</span>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="text-slate-600 text-[10px] mt-6">1～4キーで選択、Enter/Spaceで次へ</p>
        {onBack && (
          <button onClick={onBack} className="mt-3 px-4 py-2 rounded-lg text-xs font-medium border border-slate-600/50 text-slate-400 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all">
            &larr; ゲーム選択に戻る
          </button>
        )}
      </div>
    );
  }

  // ─── プレイ中 ───
  if (phase === 'playing') {
    const currentQ = questions[questionIdx];
    const progressPercent = (questionIdx / questions.length) * 100;
    const correctCount = answers.filter(a => a.isCorrect).length;

    return (
      <div className="w-full max-w-3xl mx-auto px-4 select-none">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-6">
            <div className="text-slate-400">
              <span className="text-white font-mono font-bold">{elapsed.toFixed(1)}</span>s
            </div>
            <div className="text-slate-400">
              <span className="text-white font-bold">{questionIdx + 1}</span>
              <span className="text-slate-600">/{questions.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-slate-400">
              正解 <span className="text-accent-green font-bold">{correctCount}</span>
            </div>
            <div className="text-slate-400">
              {DIFFICULTY_INFO.find(d => d.diff === difficulty)?.emoji}{' '}
              <span className="text-white capitalize">{difficulty}</span>
            </div>
          </div>
        </div>

        {/* プログレスバー */}
        <div className="w-full h-1 bg-dark-700 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* 問題文 */}
        <motion.div
          key={`q-${questionIdx}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card neon-border p-6 rounded-xl mb-6"
        >
          <div className="flex items-start gap-3">
            <span className="text-accent-cyan font-mono font-bold text-lg shrink-0">Q{questionIdx + 1}</span>
            <p className="text-white text-lg leading-relaxed">{currentQ.question}</p>
          </div>
        </motion.div>

        {/* 選択肢 */}
        <div className="space-y-3 mb-6">
          {currentQ.choices.map((choice, idx) => {
            const isSelected = selectedChoice === idx;
            const isCorrectChoice = idx === currentQ.answer;
            let borderColor = 'border-slate-600/50';
            let bgColor = '';
            let textColor = 'text-slate-200';

            if (showExplanation) {
              if (isCorrectChoice) {
                borderColor = 'border-accent-green/60';
                bgColor = 'bg-accent-green/10';
                textColor = 'text-accent-green';
              } else if (isSelected && !isCorrectChoice) {
                borderColor = 'border-red-500/60';
                bgColor = 'bg-red-500/10';
                textColor = 'text-red-400';
              }
            }

            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => selectChoice(idx)}
                disabled={selectedChoice !== null}
                className={`w-full p-4 rounded-xl border ${borderColor} ${bgColor} text-left transition-all duration-200 ${
                  selectedChoice === null ? 'hover:border-accent-cyan/40 hover:bg-accent-cyan/5 cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-mono shrink-0 ${
                    showExplanation && isCorrectChoice
                      ? 'bg-accent-green/20 text-accent-green'
                      : showExplanation && isSelected && !isCorrectChoice
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-dark-700 text-slate-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className={`text-sm ${textColor}`}>{choice}</span>
                  {showExplanation && isCorrectChoice && (
                    <span className="ml-auto text-accent-green text-lg">✓</span>
                  )}
                  {showExplanation && isSelected && !isCorrectChoice && (
                    <span className="ml-auto text-red-400 text-lg">✗</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* 解説 */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card p-5 rounded-xl mb-6 border border-accent-purple/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent-purple font-bold text-sm">💡 解説</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{currentQ.explanation}</p>
              </div>

              <div className="text-center">
                <button
                  onClick={nextQuestion}
                  className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:opacity-90 transition-all shadow-lg shadow-accent-cyan/20"
                >
                  {questionIdx + 1 >= questions.length ? '結果を見る' : '次の問題'}
                </button>
                <p className="text-slate-600 text-[10px] mt-2">Enter / Space で次へ</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

          <div className="mb-6">
            <div className={r.grade === 'S' || r.grade === 'A' ? 'mascot-bounce inline-block' : 'mascot-float inline-block'}>
              <img src={`/images/mascot/mascot-${gradeMascot}.png`} alt="" className="w-24 h-auto mx-auto drop-shadow-md" />
            </div>
            <p className="text-slate-400 text-sm mt-2">{gradeMsg}</p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card neon-border p-6 rounded-xl text-left space-y-3 mb-6"
          >
            <div className="flex justify-between">
              <span className="text-slate-400">正解数</span>
              <span className="text-white font-bold font-mono">{r.correct} / {r.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">正答率</span>
              <span className="text-accent-green font-bold font-mono">{r.accuracy.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">平均回答時間</span>
              <span className="text-accent-cyan font-bold font-mono">{r.avgTime.toFixed(1)}s</span>
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

          {/* 復習セクション */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => setShowReview(!showReview)}
              className="text-sm text-accent-cyan hover:text-accent-purple transition-colors mb-4"
            >
              {showReview ? '▲ 復習を閉じる' : '▼ 問題を復習する'}
            </button>

            <AnimatePresence>
              {showReview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden space-y-3 mb-6"
                >
                  {answers.map((ans, i) => {
                    const q = questions[ans.questionIndex];
                    return (
                      <div key={i} className={`glass-card p-4 rounded-xl text-left border ${
                        ans.isCorrect ? 'border-accent-green/30' : 'border-red-500/30'
                      }`}>
                        <div className="flex items-start gap-2 mb-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            ans.isCorrect ? 'bg-accent-green/20 text-accent-green' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {ans.isCorrect ? '○' : '✗'}
                          </span>
                          <p className="text-white text-sm leading-relaxed">{q.question}</p>
                        </div>
                        {!ans.isCorrect && (
                          <div className="ml-7 space-y-1">
                            <p className="text-red-400 text-xs">
                              あなたの回答: {q.choices[ans.selectedChoice]}
                            </p>
                            <p className="text-accent-green text-xs">
                              正解: {q.choices[q.answer]}
                            </p>
                          </div>
                        )}
                        <p className="ml-7 text-slate-400 text-xs mt-1">{q.explanation}</p>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

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
