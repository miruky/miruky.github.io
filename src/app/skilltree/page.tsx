import type { Metadata } from 'next';
import SkillTreeClient from './SkillTreeClient';

export const metadata: Metadata = {
  title: 'Skill Tree',
  description: 'Skill proficiency map',
};

export default function SkillTreePage() {
  return <SkillTreeClient />;
}
