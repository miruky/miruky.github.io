'use client';

import { useEffect, useState } from 'react';
import { SiQiita } from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';

interface QiitaItem {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  created_at: string;
  tags: { name: string }[];
}

export default function QiitaSidebar() {
  const [articles, setArticles] = useState<QiitaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          'https://qiita.com/api/v2/users/miruky/items?page=1&per_page=10'
        );
        if (!res.ok) throw new Error('fetch failed');
        const data: QiitaItem[] = await res.json();
        setArticles(data);
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <aside className="hidden 2xl:flex fixed left-0 top-0 h-screen w-72 z-40 flex-col border-r border-slate-200 dark:border-dark-700 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-200 dark:border-dark-700">
          <SiQiita className="w-5 h-5 text-[#55C500]" />
          <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Latest Articles</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden 2xl:flex fixed left-0 top-0 h-screen w-72 z-40 flex-col border-r border-slate-200 dark:border-dark-700 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-200 dark:border-dark-700 mt-16">
        <SiQiita className="w-5 h-5 text-[#55C500] shrink-0" />
        <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Latest Articles</span>
      </div>

      {/* Article List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 border-b border-slate-100 dark:border-dark-700/50 hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors group"
          >
            <div className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 group-hover:text-accent-cyan transition-colors">
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
                    {article.tags.slice(0, 3).map((tag) => (
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
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-200 dark:border-dark-700">
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
    </aside>
  );
}
