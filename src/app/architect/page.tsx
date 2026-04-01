import type { Metadata } from 'next';
import ArchitectClient from './ArchitectClient';

export const metadata: Metadata = {
  title: 'Architect',
  description: 'AWS Solutions Architect learning course',
};

export default function ArchitectPage() {
  return <ArchitectClient />;
}
