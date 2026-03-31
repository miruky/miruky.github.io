import { allReadingLangIds } from '@/data/reading-courses';
import ReadingLangClient from './ReadingLangClient';

export function generateStaticParams() {
  return allReadingLangIds.map((lang) => ({ lang }));
}

export default function Page() {
  return <ReadingLangClient />;
}
