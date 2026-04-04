import type { Metadata } from 'next';
import EnglishClient from './EnglishClient';

export const metadata: Metadata = {
  title: 'English | TOEIC学習プラットフォーム',
  description: 'TOEIC 900点を目指す総合英語学習プラットフォーム。単語・文法・長文読解・TOEIC実践問題を収録。',
};

export default function EnglishPage() {
  return <EnglishClient />;
}
