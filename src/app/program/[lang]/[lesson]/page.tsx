import { allLangIds } from '@/data/courses';
import LessonClient from './LessonClient';

export function generateStaticParams() {
  const params: { lang: string; lesson: string }[] = [];
  for (const lang of allLangIds) {
    for (let i = 1; i <= 30; i++) {
      params.push({ lang, lesson: String(i) });
    }
  }
  return params;
}

export default function Page() {
  return <LessonClient />;
}
