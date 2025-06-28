'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAnalytics, type AnalyticsSummary } from '@/lib/analytics';
import { hasPAT } from '@/lib/auth';
import { FiEdit3, FiBarChart2, FiEye, FiClock, FiLayers, FiAlertTriangle } from 'react-icons/fi';

function formatDuration(ms: number): string {
  if (ms < 1000) return '0s';
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rs = s % 60;
  return `${m}m ${rs}s`;
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    setData(getAnalytics(30));
  }, []);

  const cards = data
    ? [
        { label: 'Total Views (30d)', value: data.totalViews, icon: FiEye, color: 'text-accent-cyan' },
        { label: 'Unique Pages', value: data.uniquePages, icon: FiLayers, color: 'text-accent-purple' },
        {
          label: 'Avg Duration',
          value: formatDuration(data.avgDuration),
          icon: FiClock,
          color: 'text-emerald-400',
        },
        {
          label: 'Bounce Rate',
          value: `${data.bounceRate.toFixed(1)}%`,
          icon: FiAlertTriangle,
          color: 'text-amber-400',
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">管理画面のオーバービュー</p>
      </div>

      {/* PAT Warning */}
      {!hasPAT() && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-300">
          GitHub PAT が未設定です。記事の投稿にはログイン画面で PAT を入力してください。
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="glass-card p-5 flex items-center gap-4"
          >
            <div className={`p-3 rounded-lg bg-dark-700 ${c.color}`}>
              <c.icon size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">{c.label}</p>
              <p className="text-xl font-bold text-white mt-0.5">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/posts/new/"
          className="glass-card p-6 flex items-center gap-4 hover:border-accent-cyan/40 transition group"
        >
          <div className="p-3 rounded-lg bg-accent-cyan/10 text-accent-cyan group-hover:bg-accent-cyan/20 transition">
            <FiEdit3 size={24} />
          </div>
          <div>
            <p className="text-white font-semibold">New Post</p>
            <p className="text-slate-400 text-sm">Markdown で新しい記事を作成</p>
          </div>
        </Link>
        <Link
          href="/admin/analytics/"
          className="glass-card p-6 flex items-center gap-4 hover:border-accent-purple/40 transition group"
        >
          <div className="p-3 rounded-lg bg-accent-purple/10 text-accent-purple group-hover:bg-accent-purple/20 transition">
            <FiBarChart2 size={24} />
          </div>
          <div>
            <p className="text-white font-semibold">Analytics</p>
            <p className="text-slate-400 text-sm">アクセス解析・チャートを表示</p>
          </div>
        </Link>
      </div>

      {/* Recent Views */}
      {data && data.recentViews.length > 0 && (
        <div className="glass-card overflow-hidden">
          <div className="px-6 py-4 border-b border-dark-600">
            <h2 className="text-white font-semibold">Recent Page Views</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-left border-b border-dark-700">
                  <th className="px-6 py-3 font-medium">Path</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Duration</th>
                  <th className="px-6 py-3 font-medium">Scroll</th>
                </tr>
              </thead>
              <tbody>
                {data.recentViews.map((v) => (
                  <tr key={v.id} className="border-b border-dark-700/50 hover:bg-dark-700/30">
                    <td className="px-6 py-3 text-accent-cyan truncate max-w-[200px]">{v.path}</td>
                    <td className="px-6 py-3 text-slate-300 whitespace-nowrap">
                      {new Date(v.timestamp).toLocaleString('ja-JP')}
                    </td>
                    <td className="px-6 py-3 text-slate-300">{formatDuration(v.duration)}</td>
                    <td className="px-6 py-3 text-slate-300">{v.scrollDepth}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
