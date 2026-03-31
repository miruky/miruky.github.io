import type { ReadingCourse, ReadingLangMeta, ReadingLangId } from './types';
export type { ReadingLesson, ReadingLangMeta, ReadingLangId, ReadingDifficulty, CodeHighlight } from './types';

const loaders: Record<ReadingLangId, () => Promise<{ default: ReadingCourse }>> = {
  python: () => import('./python'),
  typescript: () => import('./typescript'),
  java: () => import('./java'),
};

export const readingLangMetas: ReadingLangMeta[] = [
  {
    id: 'python',
    name: 'Python',
    nameJa: 'Python',
    simpleIconSlug: 'python',
    color: '#3776AB',
    description: 'Pythonic なベストプラクティスを学ぶ。Clean Code・デザインパターン・アーキテクチャ設計まで。',
    lessonCount: 34,
    fileExt: '.py',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    nameJa: 'TypeScript',
    simpleIconSlug: 'typescript',
    color: '#3178C6',
    description: '型安全で堅牢なコード設計。ジェネリクス・判別共用体からDDD・CQRSまで。',
    lessonCount: 33,
    fileExt: '.ts',
  },
  {
    id: 'java',
    name: 'Java',
    nameJa: 'Java',
    simpleIconSlug: 'openjdk',
    color: '#ED8B00',
    description: 'エンタープライズ品質のコード。GoFパターンからClean Architecture・Event Sourcingまで。',
    lessonCount: 33,
    fileExt: '.java',
  },
];

export async function loadReadingCourse(langId: ReadingLangId): Promise<ReadingCourse | null> {
  const loader = loaders[langId];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export function getReadingLangMeta(langId: string): ReadingLangMeta | undefined {
  return readingLangMetas.find((m) => m.id === langId);
}

export const allReadingLangIds: ReadingLangId[] = readingLangMetas.map((m) => m.id);
