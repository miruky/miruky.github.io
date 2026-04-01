const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://miruky.github.io';
const SITE_TITLE = 'mirukyのIT備忘録';
const SITE_DESCRIPTION =
  'AWSエンジニア miruky のポートフォリオ・技術ブログサイト。AWS・AI関連の技術情報を発信しています。';

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRss() {
  const postsDir = path.join(process.cwd(), 'content/blog');
  let posts = [];

  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
    posts = files.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(postsDir, fileName), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        tags: data.tags || [],
        content: content.slice(0, 500), // excerpt
      };
    });
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  const now = new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ja</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}/</guid>
      <description>${escapeXml(post.description || post.content)}</description>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : now}</pubDate>
${post.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join('\n')}
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`;

  const outPath = path.join(process.cwd(), 'public', 'feed.xml');
  fs.writeFileSync(outPath, rss, 'utf8');
  console.log(`Generated feed.xml (${posts.length} items)`);
}

generateRss();
