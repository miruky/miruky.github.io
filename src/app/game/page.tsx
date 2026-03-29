import TypingGame from '@/components/TypingGame';

export const metadata = {
  title: 'Typing Game | mirukyのIT備忘録',
  description: 'mirukyのローマ字タイピングゲーム - Easy / Normal / Hard',
};

export default function GamePage() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center pt-20 pb-10">
      <TypingGame />
    </div>
  );
}
