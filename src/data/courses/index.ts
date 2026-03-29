import type { LangCourse, LangMeta, LangId } from './types';

// Lazy imports – each file is loaded only when needed
const loaders: Record<LangId, () => Promise<{ default: LangCourse }>> = {
  python: () => import('./python'),
  typescript: () => import('./typescript'),
  javascript: () => import('./javascript'),
  java: () => import('./java'),
  ruby: () => import('./ruby'),
  'html-css': () => import('./html-css'),
  'c-lang': () => import('./c-lang'),
  sql: () => import('./sql'),
  secure: () => import('./secure'),
};

/** All language metadata (no lesson data – lightweight) */
export const langMetas: LangMeta[] = [
  {
    id: 'python',
    name: 'Python',
    nameJa: 'Python',
    simpleIconSlug: 'python',
    color: '#3776AB',
    description:
      '初心者に最も推奨される言語。シンプルな構文でAI・データ分析・Web開発まで幅広く対応できます。',
    lessonCount: 30,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    nameJa: 'TypeScript',
    simpleIconSlug: 'typescript',
    color: '#3178C6',
    description:
      'JavaScriptに型安全性を加えた言語。大規模開発の必須スキルです。',
    lessonCount: 30,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    nameJa: 'JavaScript',
    simpleIconSlug: 'javascript',
    color: '#F7DF1E',
    description:
      'Webの共通言語。フロントエンド・バックエンド両方で活躍する万能言語です。',
    lessonCount: 30,
  },
  {
    id: 'java',
    name: 'Java',
    nameJa: 'Java',
    simpleIconSlug: 'openjdk',
    color: '#ED8B00',
    description:
      'エンタープライズ開発の定番。堅牢な型システムとオブジェクト指向を学べます。',
    lessonCount: 30,
  },
  {
    id: 'ruby',
    name: 'Ruby',
    nameJa: 'Ruby',
    simpleIconSlug: 'ruby',
    color: '#CC342D',
    description:
      '「楽しいプログラミング」を追求した言語。Rails でのWeb開発が強力です。',
    lessonCount: 30,
  },
  {
    id: 'html-css',
    name: 'HTML/CSS',
    nameJa: 'HTML/CSS',
    simpleIconSlug: 'html5',
    color: '#E34F26',
    description:
      'Webページの構造とデザインの基礎。すべてのWeb開発者に必須のスキルです。',
    lessonCount: 30,
  },
  {
    id: 'c-lang',
    name: 'C',
    nameJa: 'C言語',
    simpleIconSlug: 'c',
    color: '#A8B9CC',
    description:
      'コンピュータの仕組みを深く理解できる低レイヤー言語。OSやシステム開発の基盤です。',
    lessonCount: 30,
  },
  {
    id: 'sql',
    name: 'SQL',
    nameJa: 'SQL',
    simpleIconSlug: 'postgresql',
    color: '#4169E1',
    description:
      'データベース操作の標準言語。データ取得・分析に欠かせないスキルです。',
    lessonCount: 30,
  },
  {
    id: 'secure',
    name: 'Secure Programming',
    nameJa: 'セキュアプログラミング',
    simpleIconSlug: 'owasp',
    color: '#EF4444',
    description:
      'セキュリティを意識したコーディング。OWASP Top 10を軸に脆弱性と対策を実践的に学びます。',
    lessonCount: 30,
  },
];

/** Load full course data for a language */
export async function loadCourse(langId: LangId): Promise<LangCourse | null> {
  const loader = loaders[langId];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

/** Get metadata for a language */
export function getLangMeta(langId: string): LangMeta | undefined {
  return langMetas.find((m) => m.id === langId);
}

/** All valid language IDs */
export const allLangIds: LangId[] = langMetas.map((m) => m.id);
