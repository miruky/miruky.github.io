import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'mirukyのIT備忘録',
    template: '%s | mirukyのIT備忘録',
  },
  description:
    'AWSエンジニア miruky のポートフォリオ・技術ブログサイト。Qiita記事、GitHub活動、AWS・AI関連の技術情報を発信しています。',
  keywords: ['AWS', 'エンジニア', 'ポートフォリオ', 'miruky', 'Qiita', 'AI', 'クラウド'],
  authors: [{ name: 'miruky' }],
  openGraph: {
    title: 'mirukyのIT備忘録',
    description:
      'AWSエンジニア miruky のポートフォリオ・技術ブログサイト',
    url: 'https://miruky.github.io',
    siteName: 'mirukyのIT備忘録',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mirukyのIT備忘録',
    description:
      'AWSエンジニア miruky のポートフォリオ・技術ブログサイト',
    creator: '@miruky_tech',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
