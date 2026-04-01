import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'mirukyの個人開発プロジェクト & OSSの一覧。',
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
