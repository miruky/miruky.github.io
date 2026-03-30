'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';
import { SiQiita, SiZenn } from 'react-icons/si';
import ParticleBackground from '@/components/ParticleBackground';

/* ─── Planet Config ─────────────────────────────────────────── */
const planets = [
  {
    name: 'earth',
    src: '/images/hero/earth.png',
    style: { bottom: '25%', right: '14%' } as React.CSSProperties,
    size: 'w-[21rem] md:w-[28.5rem] lg:w-[36rem]',
    orbit: { dur: 55, x: 12, y: 18 },
    spin: 90,
    opacity: 0.82,
    glow: '0 0 80px rgba(59,130,246,0.25)',
    delay: 0,
  },
  {
    name: 'jupiter',
    src: '/images/hero/jupiter.png',
    style: { top: '4%', right: '6%' } as React.CSSProperties,
    size: 'w-28 md:w-40 lg:w-48',
    orbit: { dur: 70, x: 18, y: 10 },
    spin: 110,
    opacity: 0.6,
    glow: '',
    delay: 2,
  },
  {
    name: 'saturn',
    src: '/images/hero/saturn.png',
    style: { top: '10%', left: '1%' } as React.CSSProperties,
    size: 'w-32 md:w-44 lg:w-52',
    orbit: { dur: 62, x: 14, y: 20 },
    spin: 0, // rings — no self-spin
    opacity: 0.55,
    glow: '',
    delay: 4,
  },
  {
    name: 'mars',
    src: '/images/hero/mars.png',
    style: { top: '18%', left: '18%' } as React.CSSProperties,
    size: 'w-14 md:w-22 lg:w-28',
    orbit: { dur: 46, x: 24, y: 16 },
    spin: 72,
    opacity: 0.65,
    glow: '',
    delay: 1,
  },
  {
    name: 'moon',
    src: '/images/hero/moon.png',
    style: { bottom: '14%', left: '6%' } as React.CSSProperties,
    size: 'w-10 md:w-16 lg:w-20',
    orbit: { dur: 38, x: 22, y: 28 },
    spin: 120,
    opacity: 0.5,
    glow: '',
    delay: 3,
  },
  {
    name: 'venus',
    src: '/images/hero/venus.png',
    style: { bottom: '32%', right: '1%' } as React.CSSProperties,
    size: 'w-12 md:w-18 lg:w-24',
    orbit: { dur: 52, x: 10, y: 22 },
    spin: 85,
    opacity: 0.5,
    glow: '',
    delay: 5,
  },
];

export default function HeroSection() {
  const [qiitaStats, setQiitaStats] = useState({ articles: '49+', contribution: '1900+' });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/data/qiita-articles.json');
        if (!res.ok) return;
        const data = await res.json();
        if (!data.stats || data.stats.articleCount === 0) return;
        setQiitaStats({
          articles: `${data.stats.articleCount}+`,
          contribution: data.stats.contribution,
        });
      } catch {
        // keep defaults
      }
    }
    loadStats();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Space background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/space-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/60 via-[#0a0e27]/40 to-[#0a0e27]/80" />
      </div>

      {/* Planets with orbit + self-rotation */}
      {planets.map((p) => (
        <motion.div
          key={p.name}
          className={`absolute pointer-events-none ${p.size}`}
          style={{ ...p.style, opacity: p.opacity }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: p.opacity,
            scale: 1,
            x: [0, p.orbit.x, 0, -p.orbit.x, 0],
            y: [0, -p.orbit.y, 0, p.orbit.y, 0],
          }}
          transition={{
            opacity: { delay: p.delay * 0.3, duration: 1.5 },
            scale: { delay: p.delay * 0.3, duration: 1.5, ease: 'easeOut' },
            x: { duration: p.orbit.dur, repeat: Infinity, ease: 'linear', delay: p.delay * 0.3 },
            y: { duration: p.orbit.dur, repeat: Infinity, ease: 'linear', delay: p.delay * 0.3 },
          }}
        >
          <img
            src={p.src}
            alt=""
            className="w-full h-auto rounded-full"
            style={{
              animation: p.spin ? `planet-spin ${p.spin}s linear infinite` : undefined,
              boxShadow: p.glow || undefined,
              borderRadius: p.name === 'saturn' ? '0' : '50%',
            }}
          />
        </motion.div>
      ))}

      {/* Particle animation (preserved) */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-block backdrop-blur-[6px] bg-slate-900/10 rounded-3xl px-8 py-10 md:px-14 md:py-12 border border-accent-cyan/25"
          style={{ boxShadow: '0 0 20px rgba(0,212,255,0.12), inset 0 0 20px rgba(0,212,255,0.04), 0 0 60px rgba(0,212,255,0.06)' }}
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
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white pb-2">
            Hi, I&apos;m{' '}
            <span className="gradient-text">miruky</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-4 leading-relaxed">
            AWSを中心としたクラウドインフラの設計・構築〜運用・保守を担当。
          </p>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
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
                <div className="text-xs md:text-sm text-slate-400 mt-1">
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
            <Link
              href="/articles/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#55C500] text-white hover:bg-[#4AB000] transition-all duration-300 shadow-lg shadow-[#55C500]/20"
            >
              <SiQiita className="w-4 h-4" />
              Qiita Articles
            </Link>
            <a
              href="https://zenn.dev/miruky"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#3EA8FF] text-white hover:bg-[#3595E0] transition-all duration-300 shadow-lg shadow-[#3EA8FF]/20"
            >
              <SiZenn className="w-4 h-4" />
              Zenn Articles
            </a>
            <a
              href="https://github.com/miruky"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#24292e] text-white hover:bg-[#2f363d] transition-all duration-300 shadow-lg shadow-black/20"
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
          className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full" />
        </motion.div>
      </motion.div>

      {/* Mascot - happy jumping */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
        className="absolute bottom-20 right-8 md:right-16 lg:right-24 hidden md:block pointer-events-none"
      >
        <div className="mascot-bounce">
          <img
            src="/images/mascot/mascot-happy.png"
            alt=""
            className="w-24 lg:w-32 h-auto drop-shadow-lg opacity-90"
          />
        </div>
      </motion.div>
    </section>
  );
}
