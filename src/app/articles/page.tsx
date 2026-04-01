import type { Metadata } from 'next';
import ArticlesClient from './ArticlesClient';

export const metadata: Metadata = {
  title: 'Qiita Articles',
  description: 'mirukyのQiita技術記事一覧。AWS・AI を中心とした技術記事を掲載しています。',
};

export default function ArticlesPage() {
  return <ArticlesClient />;
}
