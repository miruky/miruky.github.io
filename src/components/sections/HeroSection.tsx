'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';
import { SiQiita } from 'react-icons/si';
import ParticleBackground from '@/components/ParticleBackground';

export default function HeroSection() {
  const [qiitaStats, setQiitaStats] = useState({ articles: '49+', contribution: '1900+' });

  useEffect(() => {
    async function fetchStats() {
      try {
        const all: Array<{ likes_count: number; stocks_count: number }> = [];
        let page = 1;
        while (true) {
          const res = await fetch(
            `https://qiita.com/api/v2/users/miruky/items?page=${page}&per_page=100`
          );
          if (!res.ok) break;
          const data = await res.json();
          if (data.length === 0) break;
          all.push(...data);
          if (data.length < 100) break;
          page++;
        }
        const totalLikes = all.reduce((s, a) => s + a.likes_count, 0);
        const totalStocks = all.reduce((s, a) => s + a.stocks_count, 0);
        const contrib = all.length + totalLikes + Math.floor(totalStocks / 2);
        const rounded = Math.floor(contrib / 100) * 100;
        setQiitaStats({
          articles: `${all.length}+`,
          contribution: `${rounded}+`,
        });
      } catch {
        // keep defaults
      }
    }
    fetchStats();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient dark:bg-hero-gradient bg-white" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-cyan/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[150px]" />

      {/* Particle animation */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            AWS Engineer / Tech Writer
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 dark:text-white text-slate-900">
            Hi, I&apos;m{' '}
            <span className="gradient-text">miruky</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            AWSを中心としたクラウドインフラの設計・構築〜運用・保守を担当。
          </p>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            AWS・AIを中心とした技術記事をQiitaにて発信中。
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center gap-8 md:gap-12 mb-10"
          >
            {[
              { label: 'AWS認定資格', value: '12冠' },
              { label: 'Qiita記事', value: qiitaStats.articles },
              { label: 'Contribution', value: qiitaStats.contribution },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text-static">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/articles/" className="btn-primary">
              <SiQiita className="w-4 h-4" />
              Qiita Articles
            </Link>
            <a
              href="https://github.com/miruky"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
