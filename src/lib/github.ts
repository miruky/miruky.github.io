import { GitHubRepo, GitHubUser } from '@/types';

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGitHubUser(
  username: string
): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'force-cache',
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch GitHub user:', error);
    return null;
  }
}

export async function fetchGitHubRepos(
  username: string
): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=30&type=owner`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'force-cache',
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const repos: GitHubRepo[] = await res.json();
    return repos.filter((repo) => repo.name !== username);
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return [];
  }
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    Bash: '#89e051',
    HCL: '#844fba',
    Dockerfile: '#384d54',
  };
  return colors[language] || '#8b949e';
}
