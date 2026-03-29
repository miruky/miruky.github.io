/* ============================================
   ServicePalette – サービスD&Dパレット
   ============================================ */
'use client';

import { useState, useCallback } from 'react';
import AwsServiceIcon from './AwsServiceIcon';
import { awsServices, categoryMetas, getCategoryMeta } from '@/data/architect/services';
import type { AwsService, ServiceCategory, AwsServiceId } from '@/data/architect/types';

interface Props {
  /** レッスンで使用可能なサービスID（指定がなければ全サービス表示） */
  availableServices?: AwsServiceId[];
  onDragStart: (service: AwsService) => void;
}

export default function ServicePalette({ availableServices, onDragStart }: Props) {
  const [search, setSearch] = useState('');
  const [expandedCat, setExpandedCat] = useState<ServiceCategory | null>(null);

  const services = availableServices
    ? awsServices.filter((s) => availableServices.includes(s.id))
    : awsServices;

  const filtered = search.trim()
    ? services.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.nameJa.toLowerCase().includes(search.toLowerCase()) ||
          s.id.includes(search.toLowerCase())
      )
    : services;

  // カテゴリ別にグルーピング
  const grouped = new Map<ServiceCategory, AwsService[]>();
  for (const s of filtered) {
    const list = grouped.get(s.category) || [];
    list.push(s);
    grouped.set(s.category, list);
  }

  const handleDragStart = useCallback(
    (e: React.DragEvent, service: AwsService) => {
      e.dataTransfer.setData('application/aws-service', JSON.stringify(service));
      e.dataTransfer.effectAllowed = 'move';
      onDragStart(service);
    },
    [onDragStart]
  );

  return (
    <div className="flex flex-col h-full bg-[#0a0b18] border-r border-slate-700/30">
      {/* Header */}
      <div className="px-3 py-3 border-b border-slate-700/30 shrink-0">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          AWS Services
        </h3>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full px-2.5 py-1.5 rounded-md bg-slate-800/50 border border-slate-700/50 text-xs text-slate-300 placeholder-slate-600 outline-none focus:border-slate-500 transition-colors"
        />
      </div>

      {/* Service List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-1.5 py-1.5 space-y-0.5">
        {categoryMetas
          .filter((cat) => grouped.has(cat.id))
          .map((cat) => {
            const catServices = grouped.get(cat.id) || [];
            const isExpanded = expandedCat === cat.id || search.trim().length > 0;

            return (
              <div key={cat.id}>
                <button
                  onClick={() => setExpandedCat(isExpanded && !search.trim() ? null : cat.id)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left hover:bg-white/5 transition-colors group"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: cat.color }}
                  />
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-300 flex-1 truncate">
                    {cat.nameJa}
                  </span>
                  <span className="text-[10px] text-slate-600">{catServices.length}</span>
                  <svg
                    className={`w-3 h-3 text-slate-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="ml-1 space-y-0.5 pb-1">
                    {catServices.map((service) => {
                      const meta = getCategoryMeta(service.category);
                      return (
                        <div
                          key={service.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, service)}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-grab active:cursor-grabbing hover:bg-white/5 transition-colors group"
                          title={service.description}
                        >
                          <AwsServiceIcon
                            serviceId={service.id}
                            category={service.category}
                            size={16}
                          />
                          <span className="text-[11px] text-slate-400 group-hover:text-slate-200 truncate flex-1">
                            {service.nameJa}
                          </span>
                          <span
                            className="w-4 h-4 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: `${meta.color}20` }}
                          >
                            <svg className="w-2.5 h-2.5" style={{ color: meta.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
