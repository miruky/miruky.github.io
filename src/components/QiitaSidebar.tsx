'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { SiQiita, SiZenn } from 'react-icons/si';
import { FiExternalLink, FiChevronLeft, FiChevronRight, FiFileText } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { safeUrl } from '@/lib/sanitize';

/* ─── Breakpoints ─── */
/** Show toggle button from this width */
const BP_SHOW = 1536;   // 2xl
/** Auto-open sidebar when viewport is wide enough that it won't overlap hero content */
const BP_AUTO_OPEN = 1800;

interface QiitaItem {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  created_at: string;
  tags: { name: string }[];
}

interface BlogItem {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
}

interface ZennItem {
  id: number;
  title: string;
  slug: string;
  url: string;
  liked_count: number;
  published_at: string;
  emoji: string;
  topics: string[];
}

export default function QiitaSidebar() {
  const pathname = usePathname();
  const [qiitaArticles, setQiitaArticles] = useState<QiitaItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogItem[]>([]);
  const [zennArticles, setZennArticles] = useState<ZennItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // ホームセクション（/ のみ）以外では表示しない
  const isHome = pathname === '/' || pathname === '';

  /* ─── Responsive: show/hide toggle and auto-open based on viewport width ─── */
  const handleResize = useCallback(() => {
    const vw = window.innerWidth;
    if (vw >= BP_SHOW) {
      setVisible(true);
      // Auto-open only when wide enough to not overlap hero
      if (vw >= BP_AUTO_OPEN) {
        setIsOpen(true);
      }
    } else {
      setVisible(false);
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (!isHome) return;
    async function fetchAll() {
      try {
        const [qiitaRes, blogRes, zennRes] = await Promise.allSettled([
          fetch('/data/qiita-articles.json'),
          fetch('/data/blog-posts.json'),
          fetch('/data/zenn-articles.json'),
        ]);

        if (qiitaRes.status === 'fulfilled' && qiitaRes.value.ok) {
          const json = await qiitaRes.value.json();
          setQiitaArticles((json.articles || []).slice(0, 10));
        }

        if (blogRes.status === 'fulfilled' && blogRes.value.ok) {
          const data: BlogItem[] = await blogRes.value.json();
          setBlogPosts(data);
        }

        if (zennRes.status === 'fulfilled' && zennRes.value.ok) {
          const json = await zennRes.value.json();
          setZennArticles((json.articles || []).slice(0, 6));
        }
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [isHome]);

  if (!isHome || !visible) return null;

  /* Sidebar width in px */
  const SIDEBAR_W = 544; // w-[34rem] = 544px
  const TOGGLE_W = 52;

  return (
    /* ─── Single container: sidebar + toggle move together ─── */
    /* Using `x` (transform) instead of `left` → GPU-accelerated, zero layout shift */
    <motion.div
      className="fixed left-0 top-0 h-screen z-50 flex"
      style={{ width: SIDEBAR_W + TOGGLE_W }}
      animate={{ x: isOpen ? 0 : -SIDEBAR_W }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* ─── Sidebar Panel ─── */}
      <div
        className="flex flex-row h-full bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/30 border-r border-slate-200/50 dark:border-dark-700/50"
        style={{ width: SIDEBAR_W }}
      >
            {/* Left Column: Blog (top) + Zenn (bottom) */}
            <div className="flex flex-col w-1/2 border-r border-slate-200/50 dark:border-dark-700/50">
              {/* ── Blog Section ── */}
              {/* Blog Header */}
              <div className="flex items-center gap-2 px-3 py-4 border-b border-slate-200 dark:border-dark-700 mt-16">
                <FiFileText className="w-4 h-4 text-cyan-600 dark:text-accent-cyan shrink-0" />
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  Blog
                </span>
              </div>

              {/* Blog List */}
              <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
                {loading ? (
                  <div className="flex items-center justify-center h-20">
                    <div className="w-5 h-5 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : blogPosts.length === 0 ? (
                  <div className="flex items-center justify-center h-20 text-xs text-slate-400">
                    Coming Soon
                  </div>
                ) : (
                  blogPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}/`}
                      className="block px-3 py-3 border-b border-slate-100 dark:border-dark-700/50 hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors group"
                    >
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 group-hover:text-cyan-700 dark:group-hover:text-accent-cyan transition-colors">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-slate-400">
                          {post.date}
                        </span>
                      </div>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-700 text-slate-500 dark:text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))
                )}
              </div>

              {/* Blog Footer */}
              <div className="px-3 py-2 border-t border-slate-200 dark:border-dark-700">
                <Link
                  href="/blog/"
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-cyan-600 dark:text-accent-cyan hover:text-cyan-700 dark:hover:text-accent-cyan/80 transition-colors"
                >
                  <FiFileText className="w-3.5 h-3.5" />
                  View all posts
                </Link>
              </div>

              {/* ── Horizontal Divider ── */}
              <div className="border-t-2 border-[#3EA8FF]/30 dark:border-[#3EA8FF]/20" />

              {/* ── Zenn Section ── */}
              {/* Zenn Header */}
              <div className="flex items-center gap-2 px-3 py-3 border-b border-slate-200 dark:border-dark-700">
                <SiZenn className="w-4 h-4 text-[#3EA8FF] shrink-0" />
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  Zenn
                </span>
              </div>

              {/* Zenn List */}
              <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
                {loading ? (
                  <div className="flex items-center justify-center h-20">
                    <div className="w-5 h-5 border-2 border-[#3EA8FF] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : zennArticles.length === 0 ? (
                  <div className="flex items-center justify-center h-20 text-xs text-slate-400">
                    Coming Soon
                  </div>
                ) : (
                  zennArticles.map((article) => (
                    <a
                      key={article.id}
                      href={safeUrl(article.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-3 border-b border-slate-100 dark:border-dark-700/50 hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors group"
                    >
                      <div className="flex items-start gap-1.5">
                        <span className="text-sm shrink-0 mt-0.5">{article.emoji || '📝'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 group-hover:text-[#3EA8FF] transition-colors">
                            {article.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] text-slate-400">
                              {new Date(article.published_at).toLocaleDateString('ja-JP')}
                            </span>
                            <span className="text-[10px] text-[#3EA8FF] font-medium">
                              {article.liked_count} likes
                            </span>
                          </div>
                          {article.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {article.topics.slice(0, 2).map((topic) => (
                                <span
                                  key={topic}
                                  className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-700 text-slate-500 dark:text-slate-400"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <FiExternalLink className="w-3 h-3 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  ))
                )}
              </div>

              {/* Zenn Footer */}
              <div className="px-3 py-2 border-t border-slate-200 dark:border-dark-700">
                <a
                  href="https://zenn.dev/miruky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#3EA8FF] hover:text-[#3595E0] transition-colors"
                >
                  <SiZenn className="w-3.5 h-3.5" />
                  View all on Zenn
                </a>
              </div>
            </div>

            {/* Right Column: Qiita */}
            <div className="flex flex-col w-1/2">
              {/* Qiita Header */}
              <div className="flex items-center gap-2 px-3 py-4 border-b border-slate-200 dark:border-dark-700 mt-16">
                <SiQiita className="w-4 h-4 text-[#55C500] shrink-0" />
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  Qiita
                </span>
              </div>

              {/* Qiita List */}
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="w-5 h-5 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  qiitaArticles.map((article) => (
                    <a
                      key={article.id}
                      href={safeUrl(article.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-3 border-b border-slate-100 dark:border-dark-700/50 hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors group"
                    >
                      <div className="flex items-start gap-1.5">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 group-hover:text-cyan-700 dark:group-hover:text-accent-cyan transition-colors">
                            {article.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] text-slate-400">
                              {new Date(article.created_at).toLocaleDateString('ja-JP')}
                            </span>
                            <span className="text-[10px] text-[#55C500] font-medium">
                              {article.likes_count} likes
                            </span>
                          </div>
                          {article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {article.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag.name}
                                  className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-700 text-slate-500 dark:text-slate-400"
                                >
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <FiExternalLink className="w-3 h-3 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  ))
                )}
              </div>

              {/* Qiita Footer */}
              <div className="px-3 py-3 border-t border-slate-200 dark:border-dark-700">
                <a
                  href="https://qiita.com/miruky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#55C500] hover:text-[#4AB000] transition-colors"
                >
                  <SiQiita className="w-3.5 h-3.5" />
                  View all on Qiita
                </a>
              </div>
            </div>
          </div>

      {/* ─── Toggle Button (always at right edge of the container) ─── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="self-center flex flex-col rounded-r-xl shadow-lg overflow-hidden shrink-0"
        aria-label="Toggle sidebar"
        style={{ width: TOGGLE_W }}
      >
        {/* Top: Zenn blue */}
        <div className="relative flex items-center justify-center bg-[#3EA8FF] text-white hover:brightness-110 transition-[filter]" style={{ height: 46 }}>
          <span
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
            style={{ opacity: isOpen ? 1 : 0 }}
          >
            <FiChevronLeft className="w-5 h-5" />
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center gap-1 transition-opacity duration-150"
            style={{ opacity: isOpen ? 0 : 1 }}
          >
            <SiZenn className="w-5 h-5" />
            <FiChevronRight className="w-4 h-4 opacity-70" />
          </span>
        </div>
        {/* Bottom: Qiita green */}
        <div className="relative flex items-center justify-center bg-[#55C500] text-white hover:brightness-110 transition-[filter]" style={{ height: 46 }}>
          <span
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
            style={{ opacity: isOpen ? 1 : 0 }}
          >
            <FiChevronLeft className="w-5 h-5" />
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center gap-1 transition-opacity duration-150"
            style={{ opacity: isOpen ? 0 : 1 }}
          >
            <SiQiita className="w-5 h-5" />
            <FiChevronRight className="w-4 h-4 opacity-70" />
          </span>
        </div>
      </button>
    </motion.div>
  );
}
