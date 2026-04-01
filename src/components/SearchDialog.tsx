'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface SearchResult {
  url: string;
  meta?: { title?: string };
  excerpt?: string;
}

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [pagefind, setPagefind] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load Pagefind on first open
  useEffect(() => {
    if (!isOpen || pagefind) return;
    (async () => {
      try {
        // Pagefind bundles are generated at build time in /pagefind/
        // @ts-expect-error Pagefind is generated post-build, not available at compile time
        const pf = await import(/* webpackIgnore: true */ '/pagefind/pagefind.js');
        await pf.init();
        setPagefind(pf);
      } catch {
        // Pagefind not available (dev mode) – silently ignore
      }
    })();
  }, [isOpen, pagefind]);

  // Keyboard shortcut: Ctrl/Cmd + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((o) => !o);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Focus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  const search = useCallback(
    async (q: string) => {
      setQuery(q);
      if (!pagefind || q.length < 2) {
        setResults([]);
        return;
      }
      const searchResult = await pagefind.search(q);
      const items: SearchResult[] = await Promise.all(
        searchResult.results.slice(0, 8).map((r: any) => r.data())
      );
      setResults(items);
    },
    [pagefind]
  );

  const go = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors"
        aria-label="Search"
        title="Search (Ctrl+K)"
      >
        <FaSearch className="w-4 h-4" />
      </button>

      {/* Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-dark-800 rounded-xl shadow-2xl border border-slate-200 dark:border-dark-600 overflow-hidden">
            {/* Input */}
            <div className="flex items-center border-b border-slate-200 dark:border-dark-600 px-4">
              <FaSearch className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => search(e.target.value)}
                className="flex-1 px-3 py-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm"
              />
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <ul className="max-h-80 overflow-y-auto p-2">
                {results.map((r, i) => (
                  <li key={i}>
                    <button
                      onClick={() => go(r.url)}
                      className="w-full text-left px-3 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors"
                    >
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {r.meta?.title || r.url}
                      </div>
                      {r.excerpt && (
                        <div
                          className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: r.excerpt }}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {query.length >= 2 && results.length === 0 && pagefind && (
              <div className="p-6 text-center text-sm text-slate-400">
                No results found
              </div>
            )}

            {!pagefind && query.length >= 2 && (
              <div className="p-6 text-center text-sm text-slate-400">
                Search index loading...
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-slate-200 dark:border-dark-600 text-xs text-slate-400">
              <span>Powered by Pagefind</span>
              <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-dark-600 bg-slate-100 dark:bg-dark-700">
                Esc
              </kbd>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
