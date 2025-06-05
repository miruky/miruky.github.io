import { getSortedPostsData } from '@/lib/blog';
import Link from 'next/link';
import { FaCalendar, FaTag, FaArrowRight } from 'react-icons/fa';

export const metadata = {
  title: 'Blog | mirukyのIT備忘録',
  description: 'mirukyによるIT技術ブログ',
};

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 mb-4">
            Blog
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            IT技術に関するメモ・考察
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-30">_</div>
            <p className="text-slate-500 dark:text-slate-400 mb-2">
              記事を準備中です
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Coming soon...
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card p-6 hover-card neon-border group block"
              >
                <h2 className="text-lg font-bold dark:text-white text-slate-900 group-hover:text-accent-cyan transition-colors mb-2">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                    {post.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <FaCalendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-1">
                        <FaTag className="w-3 h-3" />
                        {post.tags.join(', ')}
                      </div>
                    )}
                  </div>
                  <FaArrowRight className="w-3 h-3 text-slate-400 group-hover:text-accent-cyan group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
