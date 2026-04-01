import type { Metadata } from 'next';
import WritingClient from './WritingClient';

export const metadata: Metadata = {
  title: 'Writing Mode',
  description: 'Programming writing exercises',
};

export default function WritingPage() {
  return <WritingClient />;
}
