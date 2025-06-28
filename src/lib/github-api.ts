/**
 * GitHub Contents API client for publishing blog posts.
 *
 * Uses the user's fine-grained PAT (contents: write) to commit
 * Markdown files to the repository via the REST API.
 */

const OWNER = 'miruky';
const REPO = 'miruky.github.io';
const BRANCH = 'main';
const BLOG_DIR = 'content/blog';

// ─── Types ────────────────────────────────────────────────────

interface GitHubContentResponse {
  content: {
    name: string;
    path: string;
    sha: string;
    html_url: string;
  };
  commit: {
    sha: string;
    message: string;
  };
}

interface GitHubError {
  message: string;
  documentation_url?: string;
}

export interface BlogPostPayload {
  title: string;
  slug: string;
  tags: string[];
  excerpt: string;
  body: string;
}

// ─── Helpers ──────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildMarkdown(payload: BlogPostPayload): string {
  const date = new Date().toISOString().slice(0, 10);
  const frontmatter = [
    '---',
    `title: "${payload.title}"`,
    `date: "${date}"`,
    `excerpt: "${payload.excerpt}"`,
    `tags: [${payload.tags.map((t) => `"${t}"`).join(', ')}]`,
    '---',
  ].join('\n');
  return `${frontmatter}\n\n${payload.body}\n`;
}

// ─── API ──────────────────────────────────────────────────────

export async function publishPost(
  pat: string,
  payload: BlogPostPayload
): Promise<{ success: true; url: string } | { success: false; error: string }> {
  const slug = payload.slug || slugify(payload.title);
  const filePath = `${BLOG_DIR}/${slug}.md`;
  const content = buildMarkdown(payload);
  const encoded = btoa(unescape(encodeURIComponent(content)));

  try {
    // Check if file already exists (to get SHA for update)
    let sha: string | undefined;
    const checkRes = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${BRANCH}`,
      { headers: { Authorization: `Bearer ${pat}`, Accept: 'application/vnd.github.v3+json' } }
    );
    if (checkRes.ok) {
      const existing = await checkRes.json();
      sha = existing.sha;
    }

    const body: Record<string, string> = {
      message: `blog: ${payload.title}`,
      content: encoded,
      branch: BRANCH,
    };
    if (sha) body.sha = sha;

    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const err: GitHubError = await res.json();
      return { success: false, error: err.message };
    }

    const data: GitHubContentResponse = await res.json();
    return { success: true, url: data.content.html_url };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

export async function listPosts(
  pat: string
): Promise<{ name: string; path: string; sha: string }[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${BLOG_DIR}?ref=${BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    if (!res.ok) return [];
    const items = await res.json();
    return Array.isArray(items)
      ? items
          .filter((i: { name: string }) => i.name.endsWith('.md'))
          .map((i: { name: string; path: string; sha: string }) => ({
            name: i.name,
            path: i.path,
            sha: i.sha,
          }))
      : [];
  } catch {
    return [];
  }
}
