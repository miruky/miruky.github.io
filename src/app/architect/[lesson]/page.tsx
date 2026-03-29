import { allLessons } from '@/data/architect';
import LessonClient from './LessonClient';

export function generateStaticParams() {
  return allLessons.map((lesson) => ({
    lesson: String(lesson.id),
  }));
}

export default function Page() {
  return <LessonClient />;
}
