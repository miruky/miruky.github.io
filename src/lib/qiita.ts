import { QiitaArticle, QiitaUser } from '@/types';

const QIITA_API_BASE = 'https://qiita.com/api/v2';

export async function fetchQiitaArticles(
  userId: string,
  page: number = 1,
  perPage: number = 20
): Promise<QiitaArticle[]> {
  try {
    const res = await fetch(
      `${QIITA_API_BASE}/users/${userId}/items?page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`Qiita API error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch Qiita articles:', error);
    return [];
  }
}

export async function fetchAllQiitaArticles(
  userId: string
): Promise<QiitaArticle[]> {
  const allArticles: QiitaArticle[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const articles = await fetchQiitaArticles(userId, page, perPage);
    if (articles.length === 0) break;
    allArticles.push(...articles);
    if (articles.length < perPage) break;
    page++;
  }

  return allArticles;
}

export async function fetchQiitaUser(userId: string): Promise<QiitaUser | null> {
  try {
    const res = await fetch(`${QIITA_API_BASE}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Qiita API error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch Qiita user:', error);
    return null;
  }
}

export function getQiitaArticleOgpUrl(articleId: string): string {
  return `https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita.com%2Fmiruky%2Fitems%2F${articleId}/og-image`;
}

export function getTotalLikes(articles: QiitaArticle[]): number {
  return articles.reduce((sum, article) => sum + article.likes_count, 0);
}

export function getTotalStocks(articles: QiitaArticle[]): number {
  return articles.reduce((sum, article) => sum + article.stocks_count, 0);
}

export function getPopularTags(articles: QiitaArticle[]): { name: string; count: number }[] {
  const tagMap = new Map<string, number>();

  articles.forEach((article) => {
    article.tags.forEach((tag) => {
      tagMap.set(tag.name, (tagMap.get(tag.name) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
