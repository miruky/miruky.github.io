const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(process.cwd(), 'content/blog');
const outDir = path.join(process.cwd(), 'public/data');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let posts = [];
if (fs.existsSync(postsDir)) {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(postsDir, fileName), 'utf8');
    const { data } = matter(raw);
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      tags: data.tags || [],
      description: data.description || '',
    };
  });
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

fs.writeFileSync(path.join(outDir, 'blog-posts.json'), JSON.stringify(posts));
console.log(`Generated blog-posts.json (${posts.length} posts)`);
