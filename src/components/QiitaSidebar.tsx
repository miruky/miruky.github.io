'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SiQiita } from 'react-icons/si';
import { FiExternalLink, FiChevronLeft, FiChevronRight, FiFileText } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { safeUrl } from '@/lib/sanitize';

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

export default function QiitaSidebar() {
  const pathname = usePathname();
  const [qiitaArticles, setQiitaArticles] = useState<QiitaItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  // ホームセクション（/ のみ）以外では表示しない
  const isHome = pathname === '/' || pathname === '';

  useEffect(() => {
    if (!isHome) return;
    async function fetchAll() {
      try {
        const [qiitaRes, blogRes] = await Promise.allSettled([
          fetch('/data/qiita-articles.json'),
          fetch('/data/blog-posts.json'),
        ]);

        if (qiitaRes.status === 'fulfilled' && qiitaRes.value.ok) {
          const json = await qiitaRes.value.json();
          setQiitaArticles((json.articles || []).slice(0, 10));
        }

        if (blogRes.status === 'fulfilled' && blogRes.value.ok) {
          const data: BlogItem[] = await blogRes.value.json();
          setBlogPosts(data);
        }
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [isHome]);

  if (!isHome) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden 2xl:flex fixed top-1/2 -translate-y-1/2 z-[55] items-center justify-center transition-all duration-300"
        style={{ left: isOpen ? '34rem' : '0' }}
        aria-label="Toggle sidebar"
      >
        <div className="flex items-center gap-1 px-1.5 py-3 rounded-r-lg bg-[#55C500] text-white shadow-lg hover:bg-[#4AB000] transition-colors">
          {isOpen ? (
            <FiChevronLeft className="w-4 h-4" />
          ) : (
            <>
              <SiQiita className="w-4 h-4" />
              <FiChevronRight className="w-3 h-3" />
            </>
          )}
        </div>
      </button>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -544 }}
            animate={{ x: 0 }}
            exit={{ x: -544 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden 2xl:flex fixed left-0 top-0 h-screen w-[34rem] z-50 flex-row bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/30 border-r border-slate-200/50 dark:border-dark-700/50"
          >
            {/* Left Column: Blog */}
            <div className="flex flex-col w-1/2 border-r border-slate-200/50 dark:border-dark-700/50">
              {/* Blog Header */}
              <div className="flex items-center gap-2 px-3 py-4 border-b border-slate-200 dark:border-dark-700 mt-16">
                <FiFileText className="w-4 h-4 text-cyan-600 dark:text-accent-cyan shrink-0" />
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  Blog
                </span>
              </div>

              {/* Blog List */}
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="w-5 h-5 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : blogPosts.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-xs text-slate-400">
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
              <div className="px-3 py-3 border-t border-slate-200 dark:border-dark-700">
                <Link
                  href="/blog/"
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-cyan-600 dark:text-accent-cyan hover:text-cyan-700 dark:hover:text-accent-cyan/80 transition-colors"
                >
                  <FiFileText className="w-3.5 h-3.5" />
                  View all posts
                </Link>
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
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
