import { allLessons } from '@/data/architect';
import LessonClient from './LessonClient';

export function generateStaticParams() {
  return allLessons.map((lesson) => ({
    lesson: String(lesson.id),
  }));
}

export function generateMetadata({ params }: { params: { lesson: string } }) {
  return {
    title: `Architect Lesson ${params.lesson}`,
    description: `AWS Solutions Architect lesson ${params.lesson}`,
  };
}

export default function Page() {
  return <LessonClient />;
}
