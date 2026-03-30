import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import QiitaSidebar from '@/components/QiitaSidebar';
import LoadingScreen from '@/components/LoadingScreen';

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
  icons: {
    icon: '/images/icon.png',
    apple: '/images/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://qiita-user-contents.imgix.net https://avatars.githubusercontent.com https://img.shields.io data:; connect-src 'self' https://qiita.com https://api.github.com https://zenn.dev; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://api.github.com; upgrade-insecure-requests;"
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <LoadingScreen />
          <AnalyticsTracker />
          <Header />
          <QiitaSidebar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
