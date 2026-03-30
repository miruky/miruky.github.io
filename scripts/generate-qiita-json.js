/**
 * Build-time script: fetch all Qiita articles with auth token
 * and write to public/data/qiita-articles.json
 */
const fs = require('fs');
const path = require('path');

// Load .env.local manually (Next.js does this for next build, but not for standalone scripts)
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf('=');
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  });
}

const QIITA_API = 'https://qiita.com/api/v2';
const USER_ID = 'miruky';
const TOKEN = process.env.QIITA_API_TOKEN || '';
const OUT_DIR = path.join(process.cwd(), 'public/data');

async function fetchWithAuth(url) {
  const headers = { 'Content-Type': 'application/json' };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url} => ${res.status}`);
  return res.json();
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Fetching Qiita articles for ${USER_ID}...`);
  if (!TOKEN) console.warn('  ⚠ QIITA_API_TOKEN not set — using unauthenticated (60 req/h)');

  // Fetch all articles (paginated)
  const allArticles = [];
  let page = 1;
  while (true) {
    const data = await fetchWithAuth(
      `${QIITA_API}/users/${USER_ID}/items?page=${page}&per_page=100`
    );
    if (data.length === 0) break;
    allArticles.push(...data);
    if (data.length < 100) break;
    page++;
  }

  // Compute stats
  const totalLikes = allArticles.reduce((s, a) => s + a.likes_count, 0);
  const totalStocks = allArticles.reduce((s, a) => s + a.stocks_count, 0);
  const contrib = allArticles.length + totalLikes + Math.floor(totalStocks / 2);
  const rounded = Math.floor(contrib / 100) * 100;

  // Slim down article objects (remove body/rendered_body to save size)
  const slim = allArticles.map((a) => ({
    id: a.id,
    title: a.title,
    url: a.url,
    likes_count: a.likes_count,
    stocks_count: a.stocks_count,
    created_at: a.created_at,
    updated_at: a.updated_at,
    tags: a.tags,
    user: a.user
      ? { id: a.user.id, profile_image_url: a.user.profile_image_url }
      : undefined,
  }));

  const output = {
    articles: slim,
    stats: {
      articleCount: allArticles.length,
      totalLikes,
      totalStocks,
      contribution: `${rounded}+`,
    },
    updatedAt: new Date().toISOString(),
  };

  const outPath = path.join(OUT_DIR, 'qiita-articles.json');
  fs.writeFileSync(outPath, JSON.stringify(output));
  console.log(
    `Generated qiita-articles.json (${allArticles.length} articles, ${totalLikes} likes)`
  );
}

main().catch((err) => {
  console.error('Failed to generate Qiita JSON:', err.message);
  // Don't fail the build — write empty fallback
  const fallback = { articles: [], stats: { articleCount: 0, totalLikes: 0, totalStocks: 0, contribution: '0+' }, updatedAt: new Date().toISOString() };
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'qiita-articles.json'), JSON.stringify(fallback));
  console.log('Wrote empty fallback qiita-articles.json');
});
