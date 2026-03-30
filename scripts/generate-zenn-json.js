/**
 * Build-time script: fetch Zenn articles via public API
 * and write to public/data/zenn-articles.json
 */
const fs = require('fs');
const path = require('path');

const USER_ID = 'miruky';
const ZENN_API = 'https://zenn.dev/api/articles';
const OUT_DIR = path.join(process.cwd(), 'public/data');

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Fetching Zenn articles for ${USER_ID}...`);

  const allArticles = [];
  let nextPage = null;
  let page = 1;

  // Paginate through all articles
  while (true) {
    const url = nextPage
      ? `${ZENN_API}?username=${USER_ID}&order=latest&page=${page}`
      : `${ZENN_API}?username=${USER_ID}&order=latest`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Zenn API error: ${res.status}`);
    const json = await res.json();

    const articles = json.articles || [];
    if (articles.length === 0) break;
    allArticles.push(...articles);

    // Zenn API uses next_page for pagination
    if (json.next_page) {
      page = json.next_page;
      nextPage = true;
    } else {
      break;
    }
  }

  // Compute stats
  const totalLikes = allArticles.reduce((s, a) => s + (a.liked_count || 0), 0);

  // Slim down article objects
  const slim = allArticles.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    url: `https://zenn.dev${a.path || `/${USER_ID}/articles/${a.slug}`}`,
    liked_count: a.liked_count || 0,
    published_at: a.published_at || a.created_at,
    article_type: a.article_type,
    emoji: a.emoji,
    topics: (a.topics || []).map((t) =>
      typeof t === 'string' ? t : t.display_name || t.name || ''
    ),
  }));

  const output = {
    articles: slim,
    stats: {
      articleCount: allArticles.length,
      totalLikes,
    },
    updatedAt: new Date().toISOString(),
  };

  const outPath = path.join(OUT_DIR, 'zenn-articles.json');
  fs.writeFileSync(outPath, JSON.stringify(output));
  console.log(
    `Generated zenn-articles.json (${allArticles.length} articles, ${totalLikes} likes)`
  );
}

main().catch((err) => {
  console.error('Failed to generate Zenn JSON:', err.message);
  // Don't fail the build — write empty fallback
  const fallback = {
    articles: [],
    stats: { articleCount: 0, totalLikes: 0 },
    updatedAt: new Date().toISOString(),
  };
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(OUT_DIR, 'zenn-articles.json'),
    JSON.stringify(fallback)
  );
  console.log('Wrote empty fallback zenn-articles.json');
});
