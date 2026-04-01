import type { Metadata } from 'next';
import ProgramClient from './ProgramClient';

export const metadata: Metadata = {
  title: 'Programming',
  description: 'Programming learning hub',
};

export default function ProgramPage() {
  return <ProgramClient />;
}
