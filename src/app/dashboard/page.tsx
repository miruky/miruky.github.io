import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'Learning Dashboard',
  description: 'Your learning progress dashboard — writing, reading, architect and game stats.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
