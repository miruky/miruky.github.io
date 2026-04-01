const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://miruky.github.io';

// Static pages (exclude admin routes)
const staticPages = [
  '/',
  '/articles/',
  '/skilltree/',
  '/program/',
  '/program/writing/',
  '/program/reading/',
  '/architect/',
  '/projects/',
  '/blog/',
  '/game/',
  '/contact/',
];

// Languages for program routes
const programLangs = ['python', 'typescript', 'java'];
const readingLangs = ['python', 'typescript', 'java'];

// Collect blog slugs
function getBlogSlugs() {
  const postsDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

// Collect lesson ids from data files
function getLessonIds(dataDir, langId) {
  // Try to find data file dynamically
  const patterns = [
    path.join(dataDir, `${langId}.ts`),
    path.join(dataDir, `${langId}-lessons.ts`),
  ];
  // Just use the lang list, since lesson data is TypeScript we can't easily parse it
  // We'll scan the out directory after build instead
  return [];
}

function generateSitemap() {
  const urls = [];
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  for (const page of staticPages) {
    urls.push({
      loc: `${SITE_URL}${page}`,
      changefreq: page === '/' ? 'weekly' : 'monthly',
      priority: page === '/' ? '1.0' : '0.8',
      lastmod: today,
    });
  }

  // Blog posts
  const postsDir = path.join(process.cwd(), 'content/blog');
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
      const { data } = matter(raw);
      urls.push({
        loc: `${SITE_URL}/blog/${slug}/`,
        changefreq: 'monthly',
        priority: '0.6',
        lastmod: data.date ? new Date(data.date).toISOString().split('T')[0] : today,
      });
    }
  }

  // Program language pages
  for (const lang of programLangs) {
    urls.push({
      loc: `${SITE_URL}/program/${lang}/`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: today,
    });
  }

  // Reading language pages
  for (const lang of readingLangs) {
    urls.push({
      loc: `${SITE_URL}/program/reading/${lang}/`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: today,
    });
  }

  // Architect lessons (10 lessons)
  for (let i = 1; i <= 10; i++) {
    urls.push({
      loc: `${SITE_URL}/architect/${i}/`,
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: today,
    });
  }

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`Generated sitemap.xml (${urls.length} URLs)`);
}

generateSitemap();
