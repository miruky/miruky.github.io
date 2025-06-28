/**
 * Client-side analytics tracker.
 *
 * Limitations (static site):
 * - Data is stored in localStorage per browser
 * - Only tracks visitors using THIS browser
 * - For cross-visitor analytics, connect an external endpoint or GA4
 */

const STORAGE_KEY = 'miruky_analytics_views';
const MAX_RECORDS = 10000;

// ─── Types ────────────────────────────────────────────────────

export interface PageView {
  id: string;
  path: string;
  timestamp: number;
  referrer: string;
  userAgent: string;
  screenWidth: number;
  duration: number; // ms — updated on unload
  scrollDepth: number; // 0-100 — updated on unload
}

export interface DailyStat {
  date: string; // YYYY-MM-DD
  views: number;
  uniquePages: number;
  avgDuration: number;
}

export interface PageStat {
  path: string;
  views: number;
  avgDuration: number;
  avgScrollDepth: number;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniquePages: number;
  avgDuration: number;
  avgScrollDepth: number;
  bounceRate: number; // % of sessions < 10s
  dailyStats: DailyStat[];
  pageStats: PageStat[];
  referrerStats: { referrer: string; count: number }[];
  deviceStats: { device: string; count: number }[];
  recentViews: PageView[];
}

// ─── Storage ──────────────────────────────────────────────────

function getViews(): PageView[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveViews(views: PageView[]): void {
  // Keep only the most recent records to avoid exceeding localStorage quota
  const trimmed = views.slice(-MAX_RECORDS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

// ─── Tracking ─────────────────────────────────────────────────

let currentView: PageView | null = null;
let scrollMax = 0;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getDevice(ua: string): string {
  if (/mobile|android|iphone/i.test(ua)) return 'Mobile';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

function handleScroll(): void {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) {
    scrollMax = 100;
    return;
  }
  const pct = Math.round((window.scrollY / docHeight) * 100);
  if (pct > scrollMax) scrollMax = pct;
}

function flushCurrentView(): void {
  if (!currentView) return;
  currentView.duration = Date.now() - currentView.timestamp;
  currentView.scrollDepth = scrollMax;
  const views = getViews();
  const idx = views.findIndex((v) => v.id === currentView!.id);
  if (idx >= 0) views[idx] = currentView;
  else views.push(currentView);
  saveViews(views);
}

export function startTracking(path: string): () => void {
  // Flush the previous view if navigating
  flushCurrentView();

  scrollMax = 0;
  currentView = {
    id: generateId(),
    path,
    timestamp: Date.now(),
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    duration: 0,
    scrollDepth: 0,
  };

  // Persist the initial record
  const views = getViews();
  views.push(currentView);
  saveViews(views);

  // Scroll tracking
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Flush on visibility change / unload
  const onVisChange = () => {
    if (document.visibilityState === 'hidden') flushCurrentView();
  };
  document.addEventListener('visibilitychange', onVisChange);
  window.addEventListener('beforeunload', flushCurrentView);

  // Return cleanup function
  return () => {
    flushCurrentView();
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('visibilitychange', onVisChange);
    window.removeEventListener('beforeunload', flushCurrentView);
    currentView = null;
  };
}

// ─── Aggregation ──────────────────────────────────────────────

export function getAnalytics(days = 30): AnalyticsSummary {
  const views = getViews();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const filtered = views.filter((v) => v.timestamp >= cutoff);

  if (filtered.length === 0) {
    return {
      totalViews: 0,
      uniquePages: 0,
      avgDuration: 0,
      avgScrollDepth: 0,
      bounceRate: 0,
      dailyStats: [],
      pageStats: [],
      referrerStats: [],
      deviceStats: [],
      recentViews: [],
    };
  }

  const uniquePages = new Set(filtered.map((v) => v.path)).size;
  const avgDuration =
    filtered.reduce((s, v) => s + v.duration, 0) / filtered.length;
  const avgScrollDepth =
    filtered.reduce((s, v) => s + v.scrollDepth, 0) / filtered.length;
  const bounceRate =
    (filtered.filter((v) => v.duration < 10000).length / filtered.length) * 100;

  // Daily stats
  const byDay = new Map<string, PageView[]>();
  for (const v of filtered) {
    const d = new Date(v.timestamp).toISOString().slice(0, 10);
    if (!byDay.has(d)) byDay.set(d, []);
    byDay.get(d)!.push(v);
  }
  const dailyStats: DailyStat[] = Array.from(byDay.entries())
    .map(([date, vws]) => ({
      date,
      views: vws.length,
      uniquePages: new Set(vws.map((v) => v.path)).size,
      avgDuration: vws.reduce((s, v) => s + v.duration, 0) / vws.length,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Page stats
  const byPage = new Map<string, PageView[]>();
  for (const v of filtered) {
    if (!byPage.has(v.path)) byPage.set(v.path, []);
    byPage.get(v.path)!.push(v);
  }
  const pageStats: PageStat[] = Array.from(byPage.entries())
    .map(([path, vws]) => ({
      path,
      views: vws.length,
      avgDuration: vws.reduce((s, v) => s + v.duration, 0) / vws.length,
      avgScrollDepth: vws.reduce((s, v) => s + v.scrollDepth, 0) / vws.length,
    }))
    .sort((a, b) => b.views - a.views);

  // Referrer stats
  const byRef = new Map<string, number>();
  for (const v of filtered) {
    const ref = v.referrer
      ? (() => {
          try {
            return new URL(v.referrer).hostname;
          } catch {
            return v.referrer;
          }
        })()
      : 'Direct';
    byRef.set(ref, (byRef.get(ref) ?? 0) + 1);
  }
  const referrerStats = Array.from(byRef.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count);

  // Device stats
  const byDevice = new Map<string, number>();
  for (const v of filtered) {
    const device = getDevice(v.userAgent);
    byDevice.set(device, (byDevice.get(device) ?? 0) + 1);
  }
  const deviceStats = Array.from(byDevice.entries())
    .map(([device, count]) => ({ device, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalViews: filtered.length,
    uniquePages,
    avgDuration,
    avgScrollDepth,
    bounceRate,
    dailyStats,
    pageStats,
    referrerStats,
    deviceStats,
    recentViews: filtered.slice(-20).reverse(),
  };
}

export function clearAnalytics(): void {
  localStorage.removeItem(STORAGE_KEY);
}
