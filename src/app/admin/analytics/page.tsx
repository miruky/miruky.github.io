'use client';

import { useEffect, useMemo, useState } from 'react';
import { getAnalytics, type AnalyticsSummary, clearAnalytics } from '@/lib/analytics';
import { FiEye, FiClock, FiLayers, FiAlertTriangle, FiTrendingUp, FiTrash2 } from 'react-icons/fi';

// ─── Helpers ──────────────────────────────────────────────────

function formatDuration(ms: number): string {
  if (ms < 1000) return '0s';
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rs = s % 60;
  return `${m}m ${rs}s`;
}

function shortDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

// ─── Chart Primitives ─────────────────────────────────────────

const CHART_COLORS = ['#00d4ff', '#7f5af0', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

function LineChart({ data, width = 700, height = 260 }: {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
}) {
  if (data.length === 0) return <EmptyChart width={width} height={height} />;

  const pad = { top: 20, right: 20, bottom: 40, left: 50 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const stepX = w / Math.max(data.length - 1, 1);

  const points = data.map((d, i) => ({
    x: pad.left + i * stepX,
    y: pad.top + h - (d.value / maxVal) * h,
  }));

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${points[points.length - 1].x},${pad.top + h} L${points[0].x},${pad.top + h} Z`;

  // Y-axis ticks
  const yTicks = 5;
  const yStep = maxVal / yTicks;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* Grid lines */}
      {Array.from({ length: yTicks + 1 }, (_, i) => {
        const y = pad.top + (i / yTicks) * h;
        const val = Math.round(maxVal - i * yStep);
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={pad.left + w} y2={y} stroke="#1e293b" strokeWidth={1} />
            <text x={pad.left - 8} y={y + 4} textAnchor="end" fontSize={11} fill="#94a3b8">
              {val}
            </text>
          </g>
        );
      })}

      {/* Area */}
      <path d={area} fill="url(#lineGradient)" opacity={0.15} />

      {/* Line */}
      <path d={line} fill="none" stroke="#00d4ff" strokeWidth={2.5} strokeLinejoin="round" />

      {/* Points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#00d4ff" stroke="#0a0e27" strokeWidth={2} />
      ))}

      {/* X labels */}
      {data.map((d, i) => {
        if (data.length > 14 && i % Math.ceil(data.length / 10) !== 0) return null;
        return (
          <text
            key={i}
            x={pad.left + i * stepX}
            y={height - 8}
            textAnchor="middle"
            fontSize={10}
            fill="#94a3b8"
          >
            {d.label}
          </text>
        );
      })}

      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BarChart({ data, width = 700, height = 260 }: {
  data: { label: string; value: number; color?: string }[];
  width?: number;
  height?: number;
}) {
  if (data.length === 0) return <EmptyChart width={width} height={height} />;

  const pad = { top: 20, right: 20, bottom: 50, left: 50 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const barW = Math.min(w / data.length * 0.65, 60);
  const gap = w / data.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* Grid */}
      {Array.from({ length: 5 }, (_, i) => {
        const y = pad.top + (i / 4) * h;
        const val = Math.round(maxVal - (i / 4) * maxVal);
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={pad.left + w} y2={y} stroke="#1e293b" strokeWidth={1} />
            <text x={pad.left - 8} y={y + 4} textAnchor="end" fontSize={11} fill="#94a3b8">{val}</text>
          </g>
        );
      })}

      {/* Bars */}
      {data.map((d, i) => {
        const bh = (d.value / maxVal) * h;
        const x = pad.left + i * gap + (gap - barW) / 2;
        const y = pad.top + h - bh;
        const color = d.color ?? CHART_COLORS[i % CHART_COLORS.length];
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} rx={4} fill={color} opacity={0.85} />
            <text
              x={x + barW / 2}
              y={y - 6}
              textAnchor="middle"
              fontSize={11}
              fontWeight={600}
              fill="#e2e8f0"
            >
              {d.value}
            </text>
            <text
              x={x + barW / 2}
              y={height - 10}
              textAnchor="middle"
              fontSize={10}
              fill="#94a3b8"
              transform={`rotate(-25 ${x + barW / 2} ${height - 10})`}
            >
              {d.label.length > 12 ? d.label.slice(0, 12) + '...' : d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutChart({ data, width = 260, height = 260 }: {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
}) {
  if (data.length === 0) return <EmptyChart width={width} height={height} />;

  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 20;
  const innerR = r * 0.55;
  const total = data.reduce((s, d) => s + d.value, 0);

  let angle = -Math.PI / 2;
  const arcs = data.map((d, i) => {
    const sweep = (d.value / total) * Math.PI * 2;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle + sweep);
    const y2 = cy + r * Math.sin(angle + sweep);
    const ix1 = cx + innerR * Math.cos(angle);
    const iy1 = cy + innerR * Math.sin(angle);
    const ix2 = cx + innerR * Math.cos(angle + sweep);
    const iy2 = cy + innerR * Math.sin(angle + sweep);
    const large = sweep > Math.PI ? 1 : 0;
    const path = `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${ix2},${iy2} A${innerR},${innerR} 0 ${large} 0 ${ix1},${iy1} Z`;
    angle += sweep;
    return { path, color: CHART_COLORS[i % CHART_COLORS.length], label: d.label, value: d.value, pct: ((d.value / total) * 100).toFixed(1) };
  });

  return (
    <div className="flex items-center gap-4">
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        {arcs.map((a, i) => (
          <path key={i} d={a.path} fill={a.color} opacity={0.85} />
        ))}
        <text x={cx} y={cy - 5} textAnchor="middle" fontSize={22} fontWeight={700} fill="#e2e8f0">
          {total}
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize={12} fill="#94a3b8">
          total
        </text>
      </svg>
      <div className="space-y-1.5 text-sm">
        {arcs.map((a, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: a.color }} />
            <span className="text-slate-300">{a.label}</span>
            <span className="text-slate-500 ml-auto">{a.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyChart({ width, height }: { width: number; height: number }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <text x={width / 2} y={height / 2} textAnchor="middle" fontSize={14} fill="#475569">
        No data available
      </text>
    </svg>
  );
}

// ─── Metric Card ──────────────────────────────────────────────

function MetricCard({ label, value, icon: Icon, color, sub }: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  sub?: string;
}) {
  return (
    <div className="glass-card p-5 flex items-center gap-4">
      <div className={`p-3 rounded-lg bg-dark-700 ${color}`}>
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 uppercase tracking-wider truncate">{label}</p>
        <p className="text-xl font-bold text-white mt-0.5">{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [days, setDays] = useState(30);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setData(getAnalytics(days));
  }, [days]);

  // Derive chart data
  const lineData = useMemo(
    () =>
      data?.dailyStats.map((d) => ({ label: shortDate(d.date), value: d.views })) ?? [],
    [data]
  );

  const topPages = useMemo(() => {
    if (!data) return [];
    return data.pageStats.slice(0, 10).map((p) => ({
      label: p.path === '/' ? 'Home' : p.path,
      value: p.views,
    }));
  }, [data]);

  const durationByPage = useMemo(() => {
    if (!data) return [];
    return data.pageStats
      .filter((p) => p.views >= 1)
      .slice(0, 10)
      .map((p) => ({
        label: p.path === '/' ? 'Home' : p.path,
        value: Math.round(p.avgDuration / 1000),
        color: '#7f5af0',
      }));
  }, [data]);

  const referrerData = useMemo(
    () =>
      data?.referrerStats.slice(0, 6).map((r) => ({ label: r.referrer, value: r.count })) ?? [],
    [data]
  );

  const deviceData = useMemo(
    () =>
      data?.deviceStats.map((d) => ({ label: d.device, value: d.count })) ?? [],
    [data]
  );

  function handleClear() {
    clearAnalytics();
    setData(getAnalytics(days));
    setConfirmClear(false);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400 text-sm mt-1">アクセス解析ダッシュボード</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-lg bg-dark-800 border border-dark-600 px-3 py-2 text-sm text-white
                       focus:outline-none focus:border-accent-cyan/60"
          >
            <option value={7}>7 days</option>
            <option value={14}>14 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
            <option value={365}>1 year</option>
          </select>
          {!confirmClear ? (
            <button
              onClick={() => setConfirmClear(true)}
              className="flex items-center gap-1.5 rounded-lg bg-dark-800 border border-dark-600 px-3 py-2 text-sm text-slate-400 hover:text-red-400 transition"
            >
              <FiTrash2 size={14} /> Clear
            </button>
          ) : (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded-lg bg-red-500/20 border border-red-500/40 px-3 py-2 text-sm text-red-400 hover:bg-red-500/30 transition"
            >
              本当にクリアしますか?
            </button>
          )}
        </div>
      </div>

      {/* Notice */}
      <div className="rounded-lg border border-dark-600 bg-dark-800/50 p-4 text-xs text-slate-400">
        このダッシュボードは localStorage ベースです。現在のブラウザでの閲覧データのみ表示されます。
        クロスブラウザ/クロスデバイスの集計にはGoogle Analytics 4等の外部サービスとの連携をご検討ください。
      </div>

      {/* Summary Cards */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard label="Total Views" value={data.totalViews} icon={FiEye} color="text-accent-cyan" />
          <MetricCard label="Unique Pages" value={data.uniquePages} icon={FiLayers} color="text-accent-purple" />
          <MetricCard
            label="Avg Duration"
            value={formatDuration(data.avgDuration)}
            icon={FiClock}
            color="text-emerald-400"
          />
          <MetricCard
            label="Avg Scroll"
            value={`${Math.round(data.avgScrollDepth)}%`}
            icon={FiTrendingUp}
            color="text-blue-400"
          />
          <MetricCard
            label="Bounce Rate"
            value={`${data.bounceRate.toFixed(1)}%`}
            icon={FiAlertTriangle}
            color="text-amber-400"
            sub="< 10s sessions"
          />
        </div>
      )}

      {/* Line Chart: Daily Views */}
      <section className="glass-card p-6 space-y-4">
        <h2 className="text-white font-semibold">Daily Page Views</h2>
        <LineChart data={lineData} />
      </section>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <section className="glass-card p-6 space-y-4">
          <h2 className="text-white font-semibold">Top Pages</h2>
          <BarChart data={topPages} height={280} />
        </section>

        {/* Duration by Page */}
        <section className="glass-card p-6 space-y-4">
          <h2 className="text-white font-semibold">Avg Time on Page (sec)</h2>
          <BarChart data={durationByPage} height={280} />
        </section>
      </div>

      {/* Two-column: Referrers + Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="glass-card p-6 space-y-4">
          <h2 className="text-white font-semibold">Referrers</h2>
          <DonutChart data={referrerData} />
        </section>
        <section className="glass-card p-6 space-y-4">
          <h2 className="text-white font-semibold">Devices</h2>
          <DonutChart data={deviceData} />
        </section>
      </div>

      {/* Detailed table */}
      {data && data.pageStats.length > 0 && (
        <section className="glass-card overflow-hidden">
          <div className="px-6 py-4 border-b border-dark-600">
            <h2 className="text-white font-semibold">Page-Level Detail</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-left border-b border-dark-700">
                  <th className="px-6 py-3 font-medium">Page</th>
                  <th className="px-6 py-3 font-medium text-right">Views</th>
                  <th className="px-6 py-3 font-medium text-right">Avg Duration</th>
                  <th className="px-6 py-3 font-medium text-right">Avg Scroll</th>
                </tr>
              </thead>
              <tbody>
                {data.pageStats.map((p) => (
                  <tr key={p.path} className="border-b border-dark-700/50 hover:bg-dark-700/30">
                    <td className="px-6 py-3 text-accent-cyan truncate max-w-[260px]">{p.path}</td>
                    <td className="px-6 py-3 text-slate-300 text-right">{p.views}</td>
                    <td className="px-6 py-3 text-slate-300 text-right">{formatDuration(p.avgDuration)}</td>
                    <td className="px-6 py-3 text-slate-300 text-right">{Math.round(p.avgScrollDepth)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
