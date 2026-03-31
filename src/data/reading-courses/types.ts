export type ReadingDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type ReadingLangId = 'python' | 'typescript' | 'java';

export interface CodeHighlight {
  startLine: number;
  endLine: number;
  color: string;
  label: string;
  explanation: string;
}

export interface ReadingLesson {
  id: number;
  title: string;
  titleJa: string;
  difficulty: ReadingDifficulty;
  category: string;
  description: string;
  code: string;
  highlights: CodeHighlight[];
  keyPoints: string[];
  bookReference?: string;
}

export interface ReadingCourse {
  id: ReadingLangId;
  lessons: ReadingLesson[];
}

export interface ReadingLangMeta {
  id: ReadingLangId;
  name: string;
  nameJa: string;
  simpleIconSlug: string;
  color: string;
  description: string;
  lessonCount: number;
  fileExt: string;
}
