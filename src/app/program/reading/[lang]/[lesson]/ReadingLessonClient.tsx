'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { readingLangMetas, loadReadingCourse } from '@/data/reading-courses';
import type { ReadingLesson, ReadingLangMeta } from '@/data/reading-courses/types';

const ReadingViewer = dynamic(() => import('@/components/ReadingViewer'), {
  ssr: false,
});

export default function ReadingLessonClient() {
  const params = useParams();
  const langId = params.lang as string;
  const lessonParam = params.lesson as string;
  const lessonId = parseInt(lessonParam, 10);

  const [lesson, setLesson] = useState<ReadingLesson | null>(null);
  const [lessons, setLessons] = useState<ReadingLesson[]>([]);
  const [meta, setMeta] = useState<ReadingLangMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const m = readingLangMetas.find((l) => l.id === langId);
    if (m) setMeta(m);

    loadReadingCourse(langId as never).then((course) => {
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
            href={`/program/reading/${langId}/`}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium border border-slate-600/50 text-slate-400 hover:border-accent-cyan/40 hover:text-accent-cyan transition-all"
          >
            &larr; コース一覧に戻る
          </a>
        </div>
      </div>
    );
  }

  const currentIndex = lessons.findIndex((l) => l.id === lessonId);

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-16 md:pt-20">
      <ReadingViewer
        lesson={lesson}
        langId={langId as never}
        langColor={meta.color}
        langName={meta.name}
        langNameJa={meta.nameJa}
        currentIndex={currentIndex}
        totalLessons={lessons.length}
        fileExt={meta.fileExt}
      />
    </div>
  );
}
