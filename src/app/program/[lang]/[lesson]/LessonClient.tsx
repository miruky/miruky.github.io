'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { langMetas, loadCourse } from '@/data/courses';
import type { Lesson, LangMeta } from '@/data/courses/types';

const ProgramEditor = dynamic(() => import('@/components/ProgramEditor'), {
  ssr: false,
});

export default function LessonPage() {
  const params = useParams();
  const langId = params.lang as string;
  const lessonParam = params.lesson as string;
  const lessonId = parseInt(lessonParam, 10);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [meta, setMeta] = useState<LangMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const m = langMetas.find((l) => l.id === langId);
    if (m) setMeta(m);

    loadCourse(langId as never).then((course) => {
      if (course) {
        setLessons(course.lessons);
        const found = course.lessons.find((l) => l.id === lessonId);
        setLesson(found || null);
      }
      setLoading(false);
    });
  }, [langId, lessonId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center pt-20">
        <div className="text-slate-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!meta || !lesson) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-slate-400 mb-4">レッスンが見つかりません</p>
          <a
            href={`/program/${langId}/`}
            className="text-accent-cyan hover:underline text-sm"
          >
            ← コース一覧に戻る
          </a>
        </div>
      </div>
    );
  }

  const currentIndex = lessons.findIndex((l) => l.id === lessonId);

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-16 md:pt-20">
      <ProgramEditor
        lesson={lesson}
        langId={langId as never}
        langColor={meta.color}
        langName={meta.name}
        langNameJa={meta.nameJa}
        currentIndex={currentIndex}
        totalLessons={lessons.length}
      />
    </div>
  );
}
