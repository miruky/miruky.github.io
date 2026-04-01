import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost } from '@/types';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getSortedPostsData(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        tags: matterResult.data.tags || [],
        excerpt: matterResult.data.excerpt || '',
        description: matterResult.data.description || '',
        content: matterResult.content,
      } as BlogPost;
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getPostData(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html, { sanitize: true }).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Extract headings for TOC
  const headings = extractHeadings(contentHtml);

  return {
    slug,
    title: matterResult.data.title || '',
    date: matterResult.data.date || '',
    tags: matterResult.data.tags || [],
    excerpt: matterResult.data.excerpt || '',
    description: matterResult.data.description || '',
    content: matterResult.content,
    contentHtml,
    headings,
  };
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/** Parse h2/h3 headings from rendered HTML and inject id attributes */
export function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /<h([23])>(.*?)<\/h[23]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const rawText = match[2].replace(/<[^>]*>/g, ''); // strip nested tags
    const id = rawText
      .toLowerCase()
      .replace(/[^\w\u3000-\u9FFF\uF900-\uFAFF]+/g, '-')
      .replace(/^-|-$/g, '');
    headings.push({ id, text: rawText, level });
  }
  return headings;
}

/** Inject IDs into h2/h3 tags of rendered HTML for TOC anchor links */
export function injectHeadingIds(html: string): string {
  return html.replace(/<h([23])>(.*?)<\/h[23]>/gi, (_match, lvl, content) => {
    const rawText = content.replace(/<[^>]*>/g, '');
    const id = rawText
      .toLowerCase()
      .replace(/[^\w\u3000-\u9FFF\uF900-\uFAFF]+/g, '-')
      .replace(/^-|-$/g, '');
    return `<h${lvl} id="${id}">${content}</h${lvl}>`;
  });
}
