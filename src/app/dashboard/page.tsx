import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: '学習ダッシュボード | Learning Dashboard',
  description: '学習の進捗状況を一覧で確認できるダッシュボード。写経・読解・アーキテクト・タイピングゲームの記録を表示します。',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
