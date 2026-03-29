import { allLangIds } from '@/data/courses';
import LangCourseClient from './LangCourseClient';

export function generateStaticParams() {
  return allLangIds.map((lang) => ({ lang }));
}

export default function Page() {
  return <LangCourseClient />;
}
