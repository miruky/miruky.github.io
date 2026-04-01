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

export function generateMetadata({ params }: { params: { lang: string; lesson: string } }) {
  const labels: Record<string, string> = { python: 'Python', typescript: 'TypeScript', java: 'Java' };
  const name = labels[params.lang] || params.lang;
  return {
    title: `${name} Lesson ${params.lesson}`,
    description: `${name} writing lesson ${params.lesson}`,
  };
}

export default function Page() {
  return <LessonClient />;
}
