import { allReadingLangIds } from '@/data/reading-courses';
import ReadingLangClient from './ReadingLangClient';

export function generateStaticParams() {
  return allReadingLangIds.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }) {
  const labels: Record<string, string> = { python: 'Python', typescript: 'TypeScript', java: 'Java' };
  const name = labels[params.lang] || params.lang;
  return {
    title: `${name} Reading`,
    description: `${name} code reading exercises`,
  };
}

export default function Page() {
  return <ReadingLangClient />;
}
