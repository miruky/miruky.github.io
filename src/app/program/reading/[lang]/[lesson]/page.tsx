import { allReadingLangIds } from '@/data/reading-courses';
import ReadingLessonClient from './ReadingLessonClient';

export function generateStaticParams() {
  // python: 34, typescript: 33, java: 33
  const counts: Record<string, number> = { python: 34, typescript: 33, java: 33 };
  const params: { lang: string; lesson: string }[] = [];
  for (const lang of allReadingLangIds) {
    const count = counts[lang] || 34;
    for (let i = 1; i <= count; i++) {
      params.push({ lang, lesson: String(i) });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { lang: string; lesson: string } }) {
  const labels: Record<string, string> = { python: 'Python', typescript: 'TypeScript', java: 'Java' };
  const name = labels[params.lang] || params.lang;
  return {
    title: `${name} Reading ${params.lesson}`,
    description: `${name} code reading lesson ${params.lesson}`,
  };
}

export default function Page() {
  return <ReadingLessonClient />;
}
