import type { Metadata } from 'next';
import GameClient from './GameClient';

export const metadata: Metadata = {
  title: 'Games',
  description: 'miruky Games',
};

export default function GamePage() {
  return <GameClient />;
}
