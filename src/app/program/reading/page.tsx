import type { Metadata } from 'next';
import ReadingClient from './ReadingClient';

export const metadata: Metadata = {
  title: 'Reading Mode',
  description: 'Programming reading exercises',
};

export default function ReadingPage() {
  return <ReadingClient />;
}
