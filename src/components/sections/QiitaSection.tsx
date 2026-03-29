'use client';

import { useEffect, useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { QiitaArticle } from '@/types';
import { FaHeart, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { safeUrl } from '@/lib/sanitize';

export default function QiitaSection() {
  const [articles, setArticles] = useState<QiitaArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          'https://qiita.com/api/v2/users/miruky/items?page=1&per_page=6'
        );
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <SectionHeading
      title="Qiita Articles"
      subtitle="最新の技術記事"
      id="qiita"
      className="bg-slate-50 dark:bg-dark-950 relative"
    >
      {/* Mascot - reading */}
      <div className="absolute bottom-8 left-4 md:left-12 hidden md:block pointer-events-none z-10">
        <div className="mascot-float" style={{ animationDelay: '1s' }}>
          <img
            src="/images/mascot/mascot-reading.png"
            alt=""
            className="w-20 lg:w-28 h-auto drop-shadow-md opacity-75"
          />
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-dark-700 rounded w-3/4 mb-3" />
              <div className="h-3 bg-slate-200 dark:bg-dark-700 rounded w-1/2 mb-2" />
              <div className="h-3 bg-slate-200 dark:bg-dark-700 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ScrollReveal key={article.id} delay={index * 0.05}>
              <a
                href={safeUrl(article.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 hover-card neon-border block h-full"
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag.name} className="tag-pill text-[10px]">
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold dark:text-white text-slate-900 mb-3 line-clamp-2 leading-relaxed">
                  {article.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <FaHeart className="w-3 h-3 text-accent-pink" />
                    <span>{article.likes_count}</span>
                  </div>
                  <span className="font-mono">
                    {new Date(article.created_at).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* View All Link */}
      <ScrollReveal delay={0.3}>
        <div className="text-center mt-12">
          <Link
            href="/articles/"
            className="btn-outline inline-flex items-center gap-2"
          >
            View All Articles
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </ScrollReveal>
    </SectionHeading>
  );
}
