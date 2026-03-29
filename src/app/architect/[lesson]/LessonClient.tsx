'use client';

import { useParams } from 'next/navigation';
import { getLessonById } from '@/data/architect';
import ArchitectEditor from '@/components/architect/ArchitectEditor';
import Link from 'next/link';

export default function LessonClient() {
  const params = useParams();
  const lessonId = Number(params.lesson);
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-context bg-hero-gradient">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            レッスンが見つかりませんでした
          </h1>
          <Link
            href="/architect/"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            レッスン一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return <ArchitectEditor lesson={lesson} />;
}
