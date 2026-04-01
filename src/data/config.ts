import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  title: 'mirukyのIT備忘録',
  description:
    'AWSエンジニア miruky のポートフォリオ・技術ブログサイト。Qiita記事、GitHub活動、AWS・AI関連の技術情報を発信しています。',
  author: 'miruky',
  qiitaUserId: 'miruky',
  githubUsername: 'miruky',
  twitterUrl: 'https://x.com/miruky_tech',
  zennUrl: 'https://zenn.dev/miruky',
};

export const siteUrl = 'https://miruky.github.io';

/** Header / Footer 共通ナビゲーション */
export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/articles/', label: 'Qiita' },
  { href: '/skilltree/', label: 'Skills' },
  { href: '/program/', label: 'Program' },
  { href: '/architect/', label: 'Architect' },
  { href: '/projects/', label: 'Projects' },
  { href: '/blog/', label: 'Blog' },
  { href: '/game/', label: 'Game' },
  { href: '/dashboard/', label: 'Dashboard' },
  { href: '/contact/', label: 'Contact' },
];
