'use client';

import SkillTreeViz from '@/components/SkillTreeViz';

export default function SkillTreePage() {
  return (
    <div className="relative min-h-screen pt-24 pb-20 dark-context">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 section-container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Skill Tree
          </h1>
          <p className="text-slate-400">
            技術スキルの習熟度マップ — カテゴリをクリックするとフィルタ、ノードをクリックすると詳細が表示されます
          </p>
        </div>

        {/* Skill Tree Visualization */}
        <SkillTreeViz />
      </div>
    </div>
  );
}
