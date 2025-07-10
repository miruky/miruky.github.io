export interface QiitaArticle {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  stocks_count: number;
  created_at: string;
  updated_at: string;
  tags: QiitaTag[];
  body: string;
  rendered_body: string;
  user: QiitaUser;
}

export interface QiitaTag {
  name: string;
  versions: string[];
}

export interface QiitaUser {
  id: string;
  name: string;
  profile_image_url: string;
  description: string;
  followers_count: number;
  items_count: number;
}

export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  description?: string;
  content: string;
  contentHtml?: string;
}

export interface CareerItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  badge?: string;
  level?: string;
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  highlights: string[];
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  qiitaUserId: string;
  githubUsername: string;
  twitterUrl: string;
  zennUrl?: string;
}
