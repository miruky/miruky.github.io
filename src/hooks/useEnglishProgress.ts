'use client';

import { useState, useEffect, useCallback } from 'react';
import type { EnglishProgress, ToeicLevel } from '@/data/english/types';

const STORAGE_KEY = 'english-progress';

const defaultProgress: EnglishProgress = {
  vocab: { correct: 0, total: 0, mastered: [], weak: [] },
  grammar: {
    650: { correct: 0, total: 0 },
    800: { correct: 0, total: 0 },
    950: { correct: 0, total: 0 },
  },
  reading: { completed: [], correct: 0, total: 0 },
  toeicPart5: { correct: 0, total: 0 },
  toeicPart6: { correct: 0, total: 0 },
  toeicPart7: { correct: 0, total: 0 },
  lastStudied: '',
  studyStreak: 0,
};

export function useEnglishProgress() {
  const [progress, setProgress] = useState<EnglishProgress>(defaultProgress);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as EnglishProgress;
        // Update streak
        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        if (parsed.lastStudied !== today && parsed.lastStudied !== yesterday) {
          parsed.studyStreak = 0;
        }
        setProgress(parsed);
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  const save = useCallback((updated: EnglishProgress) => {
    const today = new Date().toISOString().slice(0, 10);
    if (updated.lastStudied !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      updated.studyStreak = updated.lastStudied === yesterday ? updated.studyStreak + 1 : 1;
      updated.lastStudied = today;
    }
    setProgress(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
  }, []);

  const recordVocab = useCallback((questionId: number, correct: boolean) => {
    setProgress(prev => {
      const next = { ...prev, vocab: { ...prev.vocab, total: prev.vocab.total + 1 } };
      if (correct) {
        next.vocab.correct++;
        if (!next.vocab.mastered.includes(questionId)) {
          next.vocab.mastered = [...next.vocab.mastered, questionId];
        }
        next.vocab.weak = next.vocab.weak.filter(id => id !== questionId);
      } else {
        if (!next.vocab.weak.includes(questionId)) {
          next.vocab.weak = [...next.vocab.weak, questionId];
        }
      }
      save(next);
      return next;
    });
  }, [save]);

  const recordGrammar = useCallback((level: ToeicLevel, correct: boolean) => {
    setProgress(prev => {
      const next = {
        ...prev,
        grammar: {
          ...prev.grammar,
          [level]: {
            correct: prev.grammar[level].correct + (correct ? 1 : 0),
            total: prev.grammar[level].total + 1,
          },
        },
      };
      save(next);
      return next;
    });
  }, [save]);

  const recordReading = useCallback((passageId: number, correct: boolean) => {
    setProgress(prev => {
      const next = {
        ...prev,
        reading: {
          ...prev.reading,
          correct: prev.reading.correct + (correct ? 1 : 0),
          total: prev.reading.total + 1,
          completed: prev.reading.completed.includes(passageId)
            ? prev.reading.completed
            : [...prev.reading.completed, passageId],
        },
      };
      save(next);
      return next;
    });
  }, [save]);

  const recordToeic = useCallback((part: 'toeicPart5' | 'toeicPart6' | 'toeicPart7', correct: boolean) => {
    setProgress(prev => {
      const next = {
        ...prev,
        [part]: {
          correct: prev[part].correct + (correct ? 1 : 0),
          total: prev[part].total + 1,
        },
      };
      save(next);
      return next;
    });
  }, [save]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  return { progress, loaded, recordVocab, recordGrammar, recordReading, recordToeic, resetProgress };
}
