import Link from 'next/link';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';
import { SiQiita } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200 dark:border-dark-700 bg-slate-50 dark:bg-dark-950">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/images/icon.png"
                alt="miruky"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="font-bold text-lg dark:text-white text-slate-900">
                <span className="dark:text-white text-slate-900">miruky</span><span className="gradient-text-static">のIT備忘録</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              AWSエンジニア miruky のポートフォリオ・技術ブログサイト。
              AWS・AIを中心とした技術情報を発信しています。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Pages
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/articles/', label: 'Articles' },
                { href: '/skilltree/', label: 'Skills' },
                { href: '/program/', label: 'Program' },
                { href: '/architect/', label: 'Architect' },
                { href: '/projects/', label: 'Projects' },
                { href: '/blog/', label: 'Blog' },
                { href: '/game/', label: 'Game' },
                { href: '/contact/', label: 'Contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-accent-cyan transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/miruky"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-dark-700 text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-accent-cyan hover:bg-slate-200 dark:hover:bg-dark-600 transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://qiita.com/miruky"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-dark-700 text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-accent-cyan hover:bg-slate-200 dark:hover:bg-dark-600 transition-all"
                aria-label="Qiita"
              >
                <SiQiita className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/miruky_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-dark-700 text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-accent-cyan hover:bg-slate-200 dark:hover:bg-dark-600 transition-all"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-dark-700 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            &copy; {currentYear} miruky. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
