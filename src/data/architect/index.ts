/* ============================================
   Architect Lessons - メインインデックス
   100レッスンの統合・検索・ロード
   ============================================ */

import { beginnerLessons } from './lessons-beginner';
import { intermediateLessons } from './lessons-intermediate';
import { advancedLessons } from './lessons-advanced';
import type { ArchitectLesson, ArchitectDifficulty } from './types';

// 全レッスンを統合
export const allLessons: ArchitectLesson[] = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...advancedLessons,
];

// ID でレッスン取得
export function getLessonById(id: number): ArchitectLesson | undefined {
  return allLessons.find((l) => l.id === id);
}

// 難易度別フィルター
export function getLessonsByDifficulty(difficulty: ArchitectDifficulty): ArchitectLesson[] {
  return allLessons.filter((l) => l.difficulty === difficulty);
}

// カテゴリ別フィルター
export function getLessonsByCategory(category: string): ArchitectLesson[] {
  return allLessons.filter((l) => l.category === category);
}

// 全カテゴリ一覧
export function getAllCategories(): string[] {
  return Array.from(new Set(allLessons.map((l) => l.category)));
}

// 難易度ごとの件数
export function getLessonCounts(): Record<ArchitectDifficulty, number> {
  return {
    beginner: beginnerLessons.length,
    intermediate: intermediateLessons.length,
    advanced: advancedLessons.length,
  };
}

// ページネーション
export function getLessonsPaginated(page: number, perPage: number = 12): {
  lessons: ArchitectLesson[];
  totalPages: number;
  total: number;
} {
  const start = (page - 1) * perPage;
  return {
    lessons: allLessons.slice(start, start + perPage),
    totalPages: Math.ceil(allLessons.length / perPage),
    total: allLessons.length,
  };
}

// Re-export types
export type { ArchitectLesson, ArchitectDifficulty } from './types';
export { awsServices, getService, getServicesByCategory, categoryMetas } from './services';
