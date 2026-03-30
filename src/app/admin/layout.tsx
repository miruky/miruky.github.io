'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, clearSession } from '@/lib/auth';
import {
  FiHome,
  FiBarChart2,
  FiEdit3,
  FiArrowLeft,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';

const NAV = [
  { href: '/admin/dashboard/', label: 'Dashboard', icon: FiHome },
  { href: '/admin/posts/new/', label: 'New Post', icon: FiEdit3 },
  { href: '/admin/analytics/', label: 'Analytics', icon: FiBarChart2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth guard — skip for login page
  const isLoginPage = pathname === '/admin' || pathname === '/admin/';

  useEffect(() => {
    if (isLoginPage) {
      setReady(true);
      return;
    }
    isAuthenticated().then((authed) => {
      if (!authed) {
        router.replace('/admin/');
      } else {
        setReady(true);
      }
    });
  }, [isLoginPage, router, pathname]);

  function handleLogout() {
    clearSession();
    router.push('/admin/');
  }

  // Login page — render without sidebar (force dark theme)
  if (isLoginPage) return <div className="dark">{children}</div>;

  // Loading
  if (!ready) {
    return (
      <div className="dark">
        <div className="min-h-screen bg-dark-900 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="dark">
    <div className="min-h-screen bg-dark-900 flex">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 top-0 left-0 h-full w-64 bg-dark-800 border-r border-dark-600
          transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-dark-600 flex items-center justify-between">
            <span className="text-lg font-bold gradient-text-static">Admin</span>
            <button
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname === item.href.replace(/\/$/, '');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
                    ${
                      active
                        ? 'bg-accent-cyan/10 text-accent-cyan'
                        : 'text-slate-400 hover:text-white hover:bg-dark-700'
                    }
                  `}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-dark-600 space-y-1">
            <a
              href="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-dark-700 transition"
            >
              <FiArrowLeft size={18} />
              Back to Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full transition"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar (mobile) */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-dark-600 bg-dark-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white"
          >
            <FiMenu size={22} />
          </button>
          <span className="text-sm font-bold gradient-text-static">Admin</span>
          <div className="w-6" />
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
    </div>
  );
}
