import { getAllPostSlugs, getPostData, getSortedPostsData, injectHeadingIds } from '@/lib/blog';
import Link from 'next/link';
import { FaArrowLeft, FaCalendar, FaTag } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import BlogTOC from '@/components/BlogTOC';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostData(params.slug);
  if (!post) {
    return { title: 'Not Found | mirukyのIT備忘録' };
  }
  return {
    title: `${post.title} | mirukyのIT備忘録`,
    description: post.description || post.excerpt || '',
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt || '',
      url: `https://miruky.github.io/blog/${params.slug}/`,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.description || post.excerpt || '',
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostData(params.slug);
  if (!post) {
    notFound();
    return null; // unreachable, but satisfies TypeScript
  }

  const htmlWithIds = post.contentHtml ? injectHeadingIds(post.contentHtml) : '';

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        <div className="max-w-6xl mx-auto flex gap-10">
          {/* Main Content */}
          <div className="max-w-3xl min-w-0 flex-1">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-accent-cyan transition-colors mb-8"
          >
            <FaArrowLeft className="w-3 h-3" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold dark:text-white text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <FaCalendar className="w-3.5 h-3.5" />
                {post.date}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <FaTag className="w-3.5 h-3.5" />
                  {post.tags.join(', ')}
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <article
            className="prose dark:prose-invert prose-slate max-w-none
              prose-headings:font-bold
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-a:text-cyan-700 dark:prose-a:text-accent-cyan prose-a:no-underline hover:prose-a:underline
              prose-code:text-accent-green prose-code:bg-dark-700/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-dark-800 prose-pre:border prose-pre:border-dark-600
              prose-img:rounded-lg
              prose-blockquote:border-accent-cyan/50
            "
            dangerouslySetInnerHTML={{ __html: htmlWithIds }}
          />

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-dark-600">
            <Link
              href="/blog"
              className="btn-outline inline-flex items-center gap-2"
            >
              <FaArrowLeft className="w-3 h-3" />
              Back to Blog
            </Link>
          </div>
          </div>

          {/* TOC Sidebar */}
          {post.headings && post.headings.length > 0 && (
            <aside className="w-56 shrink-0">
              <BlogTOC headings={post.headings} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
