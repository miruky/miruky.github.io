/* ═══════════════════════════════════════════════════════════
   English Learning Platform – Type Definitions
   ═══════════════════════════════════════════════════════════ */

/** TOEIC target score level */
export type ToeicLevel = 650 | 800 | 950;

/** Vocabulary question (4-choice) */
export interface VocabQuestion {
  id: number;
  word: string;
  meaning: string;        // Japanese meaning (correct)
  choices: string[];      // 4 choices including meaning
  answer: number;         // index in choices (0-3)
  example: string;        // example sentence
  exampleJa: string;      // translation
  partOfSpeech: string;   // 品詞
  level: ToeicLevel;
}

/** Grammar question (4-choice sentence completion) */
export interface GrammarQuestion {
  id: number;
  sentence: string;       // sentence with ______ blank
  choices: string[];      // 4 choices
  answer: number;         // index (0-3)
  explanation: string;    // Japanese explanation
  level: ToeicLevel;
  category: string;       // grammar topic
}

/** Reading passage + questions */
export interface ReadingPassage {
  id: number;
  title: string;
  passage: string;        // full English text
  level: ToeicLevel;
  category: string;       // business, science, everyday, etc.
  questions: ReadingQuestion[];
}

export interface ReadingQuestion {
  id: number;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
}

/** TOEIC Part 5: Incomplete Sentences */
export interface ToeicPart5Question {
  id: number;
  sentence: string;       // with ______
  choices: string[];
  answer: number;
  explanation: string;
  category: string;       // grammar/vocab focus
}

/** TOEIC Part 6: Text Completion */
export interface ToeicPart6Set {
  id: number;
  passage: string;        // with (1)______, (2)______, etc.
  questions: {
    id: number;
    blankNumber: number;
    choices: string[];
    answer: number;
    explanation: string;
  }[];
}

/** TOEIC Part 7: Reading Comprehension */
export interface ToeicPart7Set {
  id: number;
  type: 'single' | 'double' | 'triple';
  passages: string[];
  questions: {
    id: number;
    question: string;
    choices: string[];
    answer: number;
    explanation: string;
  }[];
}

/** User progress tracking (localStorage) */
export interface EnglishProgress {
  vocab: { correct: number; total: number; mastered: number[]; weak: number[] };
  grammar: Record<ToeicLevel, { correct: number; total: number }>;
  reading: { completed: number[]; correct: number; total: number };
  toeicPart5: { correct: number; total: number };
  toeicPart6: { correct: number; total: number };
  toeicPart7: { correct: number; total: number };
  lastStudied: string;
  studyStreak: number;
}
