'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import SearchDialog from './SearchDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/data/config';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide on admin pages
  const isAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // 常にダーク背景を持つページ
  const darkBgRoutes = ['/', '/game', '/game/', '/skilltree', '/skilltree/', '/program', '/program/', '/architect', '/architect/'];
    const isOnDarkBgPage = darkBgRoutes.includes(pathname) || pathname.startsWith('/program/') || pathname.startsWith('/architect/');
  // ヘッダーが透明（未スクロール）かつダーク背景ページ → 背景は暗い → 白文字
  // ヘッダーがglass-nav（スクロール済み）→ ライトモードでは白い背景 → 黒文字
  // 通常ページ（白背景）→ 黒文字
  const isHeaderOverDark = isOnDarkBgPage;

  if (isAdminPage) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOnDarkBgPage
          ? `backdrop-blur-2xl ${isScrolled ? 'shadow-lg' : ''}`
          : isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
      }`}
      style={isOnDarkBgPage ? { background: 'rgba(10, 14, 39, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)' } : undefined}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image
              src="/images/icon.png"
              alt="miruky"
              width={32}
              height={32}
              className="rounded-lg object-cover group-hover:scale-110 transition-transform"
            />
            <span className="font-bold text-lg hidden sm:block whitespace-nowrap">
              <span className={isHeaderOverDark ? 'text-white' : 'text-slate-900 dark:text-white'}>miruky</span><span className="gradient-text-static">のIT備忘録</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname === item.href.slice(0, -1);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? (isHeaderOverDark ? 'text-accent-cyan' : 'text-cyan-700 dark:text-accent-cyan')
                      : isHeaderOverDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <div className="ml-4 flex items-center gap-2">
              <SearchDialog />
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <SearchDialog />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isHeaderOverDark
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-700'
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-t border-slate-200/10"
          >
            <nav className="section-container py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname === item.href.slice(0, -1);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-cyan-100 text-cyan-700 dark:bg-accent-cyan/10 dark:text-accent-cyan'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
