import { allLangIds } from '@/data/courses';
import LangCourseClient from './LangCourseClient';

export function generateStaticParams() {
  return allLangIds.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }) {
  const labels: Record<string, string> = { python: 'Python', typescript: 'TypeScript', java: 'Java' };
  const name = labels[params.lang] || params.lang;
  return {
    title: `${name} Writing`,
    description: `${name} programming writing exercises`,
  };
}

export default function Page() {
  return <LangCourseClient />;
}
