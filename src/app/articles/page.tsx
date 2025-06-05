'use client';

import { useEffect, useState } from 'react';
import { QiitaArticle } from '@/types';
import { FaHeart, FaBookmark, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<QiitaArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const allArticles: QiitaArticle[] = [];
        let page = 1;
        while (true) {
          const res = await fetch(
            `https://qiita.com/api/v2/users/miruky/items?page=${page}&per_page=100`
          );
          if (!res.ok) break;
          const data: QiitaArticle[] = await res.json();
          if (data.length === 0) break;
          allArticles.push(...data);
          if (data.length < 100) break;
          page++;
        }
        setArticles(allArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const allTags = Array.from(
    new Set(articles.flatMap((a) => a.tags.map((t) => t.name)))
  ).sort();

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag =
      !selectedTag || article.tags.some((t) => t.name === selectedTag);
    return matchesSearch && matchesTag;
  });

  const totalLikes = articles.reduce((sum, a) => sum + a.likes_count, 0);
  const totalStocks = articles.reduce((sum, a) => sum + a.stocks_count, 0);

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 mb-4">
            Qiita Articles
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            AWS・AI を中心とした技術記事
          </p>

          {/* Stats */}
          {!loading && (
            <div className="flex items-center justify-center gap-6 mb-8">
              {[
                { label: '記事数', value: articles.length },
                { label: '総いいね', value: totalLikes },
                { label: '総ストック', value: totalStocks },
              ].map((stat) => (
                <div key={stat.label} className="glass-card px-4 py-2">
                  <div className="text-lg font-bold gradient-text-static">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="記事を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-100 dark:bg-dark-700 text-slate-900 dark:text-white border border-slate-200 dark:border-dark-600 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 text-sm"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              !selectedTag
                ? 'bg-accent-cyan text-white'
                : 'bg-slate-100 dark:bg-dark-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            All
          </button>
          {allTags.slice(0, 15).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-accent-cyan text-white'
                  : 'bg-slate-100 dark:bg-dark-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-dark-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Articles List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-5 bg-slate-200 dark:bg-dark-700 rounded w-3/4 mb-3" />
                <div className="h-3 bg-slate-200 dark:bg-dark-700 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredArticles.map((article, index) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="glass-card p-5 hover-card neon-border flex flex-col sm:flex-row sm:items-center gap-3 group block"
              >
                <div className="flex-grow min-w-0">
                  <h3 className="text-sm font-bold dark:text-white text-slate-900 group-hover:text-accent-cyan transition-colors truncate">
                    {article.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {article.tags.slice(0, 4).map((tag) => (
                      <span key={tag.name} className="tag-pill text-[10px]">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 shrink-0">
                  <div className="flex items-center gap-1">
                    <FaHeart className="w-3 h-3 text-accent-pink" />
                    {article.likes_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBookmark className="w-3 h-3 text-accent-purple" />
                    {article.stocks_count}
                  </div>
                  <span className="font-mono">
                    {new Date(article.created_at).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            記事が見つかりませんでした
          </div>
        )}
      </div>
    </div>
  );
}
