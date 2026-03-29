export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type LangId =
  | 'python'
  | 'typescript'
  | 'javascript'
  | 'java'
  | 'ruby'
  | 'html-css'
  | 'c-lang'
  | 'sql'
  | 'secure';

export interface Lesson {
  id: number;
  title: string;
  difficulty: Difficulty;
  description: string;
  task: string;
  initialCode: string;
  solutionCode: string;
  expectedOutput: string;
  hints: string[];
  explanation: string;
}

export interface LangCourse {
  id: LangId;
  name: string;
  nameJa: string;
  simpleIconSlug: string;
  color: string;
  description: string;
  lessons: Lesson[];
}

export interface LangMeta {
  id: LangId;
  name: string;
  nameJa: string;
  simpleIconSlug: string;
  color: string;
  description: string;
  lessonCount: number;
}
