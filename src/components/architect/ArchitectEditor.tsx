/* ============================================
   ArchitectEditor – メイン アーキテクト エディタ
   React Flow + D&D + 判定ロジック
   ============================================ */
'use client';

import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type OnConnect,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import ServiceNode from './ServiceNode';
import type { ServiceNodeData, ServiceNodeType } from './ServiceNode';
import ServicePalette from './ServicePalette';
import { getService, getCategoryMeta } from '@/data/architect/services';
import type { ArchitectLesson, AwsServiceId, AwsService, ConfigCheck } from '@/data/architect/types';

interface Props {
  lesson: ArchitectLesson;
}

const nodeTypes = { service: ServiceNode };
const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  beginner: { label: '初級', color: '#22c55e' },
  intermediate: { label: '中級', color: '#f59e0b' },
  advanced: { label: '上級', color: '#ef4444' },
};

let nodeId = 0;
function getNextNodeId() {
  return `node_${++nodeId}`;
}

function ArchitectEditorInner({ lesson }: Props) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<ServiceNodeType>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [showHints, setShowHints] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [result, setResult] = useState<null | { pass: boolean; details: string[] }>(null);
  const [configValues, setConfigValues] = useState<Record<string, Record<string, string>>>({});
  const [showRequirements, setShowRequirements] = useState(false);

  // Reset on lesson change
  useEffect(() => {
    nodeId = 0;
    setNodes([]);
    setEdges([]);
    setShowHints(false);
    setHintLevel(0);
    setShowAnswer(false);
    setResult(null);
    setConfigValues({});
    setShowRequirements(false);
  }, [lesson.id, setNodes, setEdges]);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#8C4FFF', strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // D&D
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData('application/aws-service');
      if (!raw) return;
      const service: AwsService = JSON.parse(raw);
      const meta = getCategoryMeta(service.category);
      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const newNode: ServiceNodeType = {
        id: getNextNodeId(),
        type: 'service',
        position,
        data: {
          serviceId: service.id,
          label: service.nameJa,
          category: service.category,
          color: meta.color,
        },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  // 判定ロジック
  const checkArchitecture = useCallback(() => {
    const details: string[] = [];
    let allPass = true;

    // 1) サービス配置チェック
    const placedServiceIds = new Set(
      nodes.map((n) => (n.data as ServiceNodeData).serviceId)
    );
    for (const reqId of lesson.requiredServices) {
      const svc = getService(reqId);
      if (placedServiceIds.has(reqId)) {
        details.push(`[OK] ${svc?.nameJa || reqId} が配置されています`);
      } else {
        details.push(`[NG] ${svc?.nameJa || reqId} が配置されていません`);
        allPass = false;
      }
    }

    // 2) 接続チェック
    const nodeServiceMap = new Map<string, AwsServiceId>();
    for (const n of nodes) {
      nodeServiceMap.set(n.id, (n.data as ServiceNodeData).serviceId);
    }

    for (const req of lesson.requiredConnections) {
      const fromSvc = getService(req.from);
      const toSvc = getService(req.to);
      const found = edges.some((e) => {
        const srcSvc = nodeServiceMap.get(e.source);
        const tgtSvc = nodeServiceMap.get(e.target);
        return (
          (srcSvc === req.from && tgtSvc === req.to) ||
          (srcSvc === req.to && tgtSvc === req.from) // 方向不問
        );
      });
      if (found) {
        details.push(`[OK] ${fromSvc?.nameJa} → ${toSvc?.nameJa} が接続されています`);
      } else {
        details.push(`[NG] ${fromSvc?.nameJa} → ${toSvc?.nameJa} が接続されていません`);
        allPass = false;
      }
    }

    // 3) 設定チェック
    if (lesson.configChecks) {
      for (const cc of lesson.configChecks) {
        const svc = getService(cc.serviceId);
        const val = configValues[cc.serviceId]?.[cc.key];
        if (val === cc.correctValue) {
          details.push(`[OK] ${svc?.nameJa} の ${cc.label} = ${val}`);
        } else {
          details.push(`[NG] ${svc?.nameJa} の ${cc.label} が正しくありません ${val ? `(${val})` : '(未設定)'}`);
          allPass = false;
        }
      }
    }

    if (allPass) {
      markCompleted();
    }
    setResult({ pass: allPass, details });
  }, [nodes, edges, lesson, configValues]);

  const markCompleted = useCallback(() => {
    try {
      const key = 'architect_progress';
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      if (!saved.includes(lesson.id)) {
        saved.push(lesson.id);
        localStorage.setItem(key, JSON.stringify(saved));
      }
    } catch {}
  }, [lesson.id]);

  const resetCanvas = useCallback(() => {
    nodeId = 0;
    setNodes([]);
    setEdges([]);
    setResult(null);
    setConfigValues({});
  }, [setNodes, setEdges]);

  const diff = DIFFICULTY_LABELS[lesson.difficulty];
  const prevUrl = lesson.id > 1 ? `/architect/${lesson.id - 1}/` : null;
  const nextUrl = lesson.id < 100 ? `/architect/${lesson.id + 1}/` : null;

  // 設定が必要なサービス一覧
  const configServices = useMemo(() => {
    if (!lesson.configChecks) return [];
    const ids = Array.from(new Set(lesson.configChecks.map((c) => c.serviceId)));
    return ids.map((id) => ({
      service: getService(id),
      checks: lesson.configChecks!.filter((c) => c.serviceId === id),
    }));
  }, [lesson.configChecks]);

  return (
    <div className="flex flex-col h-screen pt-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ background: '#0d0e1a', borderBottom: '1px solid #8C4FFF25' }}>
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/architect/" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            レッスン一覧
          </Link>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-white font-semibold text-sm truncate">
              Lesson {lesson.id}: {lesson.title}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0" style={{ background: `${diff.color}18`, color: diff.color }}>
              {diff.label}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 bg-slate-700/50 text-slate-400">
              {lesson.category}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-slate-600 font-mono mr-2">{lesson.id}/100</span>
          {prevUrl && (
            <Link href={prevUrl} className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </Link>
          )}
          {nextUrl && (
            <Link href={nextUrl} className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          )}
        </div>
      </div>

      {/* Scenario & Requirements */}
      <div className="shrink-0 px-4 py-2.5 flex items-start gap-3" style={{ background: '#0d0e1a', borderBottom: '1px solid #8C4FFF25' }}>
        <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: '#8C4FFF20', color: '#8C4FFF' }}>!</div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] text-slate-300 leading-relaxed">{lesson.scenario}</p>
          <button onClick={() => setShowRequirements(!showRequirements)} className="text-[11px] text-purple-400 hover:text-purple-300 mt-1 transition-colors">
            {showRequirements ? '要件を隠す' : '要件を表示'}
          </button>
          {showRequirements && (
            <ul className="mt-1.5 space-y-0.5">
              {lesson.requirements.map((req, i) => (
                <li key={i} className="text-[12px] text-slate-400 flex items-start gap-1.5">
                  <span className="text-purple-400 mt-0.5 shrink-0">-</span>
                  {req}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Main Area: Palette + Canvas */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Service Palette */}
        <div className="w-52 shrink-0">
          <ServicePalette
            onDragStart={() => {}}
          />
        </div>

        {/* Center: React Flow Canvas */}
        <div className="flex-1 min-w-0 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
            className="bg-white"
            defaultEdgeOptions={{
              animated: true,
              style: { stroke: '#8C4FFF', strokeWidth: 2 },
            }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e130" />
            <Controls
              className="!bg-white !border-slate-200 !rounded-lg !shadow-md [&>button]:!bg-white [&>button]:!border-slate-200 [&>button]:!text-slate-500 [&>button:hover]:!bg-slate-50"
            />
            <MiniMap
              nodeColor="#8C4FFF"
              maskColor="rgba(255,255,255,0.7)"
              className="!bg-white !border-slate-200 !rounded-lg"
            />
          </ReactFlow>

          {/* Canvas empty state */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <p className="text-sm text-slate-400">左のパレットからサービスをドラッグ&ドロップ</p>
                <p className="text-xs text-slate-400 mt-1">ノード間をドラッグして接続</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Config Panel (if configChecks exist) */}
        {configServices.length > 0 && (
          <div className="w-56 shrink-0 bg-[#0a0b18] border-l border-slate-700/30 overflow-y-auto">
            <div className="px-3 py-3 border-b border-slate-700/30">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Settings
              </h3>
            </div>
            <div className="p-3 space-y-4">
              {configServices.map(({ service, checks }) => (
                <div key={service?.id} className="space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-300">{service?.nameJa}</h4>
                  {checks.map((cc: ConfigCheck) => (
                    <div key={cc.key}>
                      <label className="text-[10px] text-slate-500 block mb-0.5">{cc.label}</label>
                      <select
                        value={configValues[cc.serviceId]?.[cc.key] || ''}
                        onChange={(e) => {
                          setConfigValues((prev) => ({
                            ...prev,
                            [cc.serviceId]: {
                              ...(prev[cc.serviceId] || {}),
                              [cc.key]: e.target.value,
                            },
                          }));
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-800/60 border border-slate-700/50 text-[11px] text-slate-300 outline-none focus:border-purple-500/50 transition-colors"
                      >
                        <option value="">選択してください</option>
                        {cc.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 shrink-0" style={{ background: '#0d0e1a', borderTop: '1px solid #8C4FFF20' }}>
        <div className="flex items-center gap-3">
          <button onClick={resetCanvas} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            リセット
          </button>
          <button onClick={() => setShowAnswer(!showAnswer)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {showAnswer
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l18 18" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              }
            </svg>
            {showAnswer ? '答えを隠す' : '答えを見る'}
          </button>
          <button
            onClick={() => { setShowHints(true); setHintLevel((prev) => Math.min(prev + 1, lesson.hints.length)); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-500/70 hover:text-amber-400 hover:bg-amber-400/5 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            ヒント{showHints && hintLevel > 0 ? ` (${hintLevel}/${lesson.hints.length})` : ''}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[11px] text-slate-600 mr-2">
            {nodes.length} サービス / {edges.length} 接続
          </div>
          <button onClick={checkArchitecture} className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #8C4FFF, #8C4FFFcc)', boxShadow: '0 2px 12px #8C4FFF30' }}>
            判定する
          </button>
        </div>
      </div>

      {/* Hints Panel */}
      <AnimatePresence>
        {showHints && hintLevel > 0 && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="shrink-0 overflow-hidden" style={{ borderTop: '1px solid rgba(245, 158, 11, 0.15)', background: 'rgba(245, 158, 11, 0.03)' }}>
            <div className="px-4 py-3 space-y-1.5">
              {lesson.hints.slice(0, hintLevel).map((hint, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-amber-500/60 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  <p className="text-xs text-amber-400/80 leading-relaxed">Hint {i + 1}: {hint}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer Panel */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="shrink-0 overflow-hidden max-h-[40vh] overflow-y-auto" style={{ borderTop: '1px solid #8C4FFF25', background: '#080914' }}>
            <div className="p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-3.5 h-3.5" style={{ color: '#8C4FFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                解答 / 解説
              </h4>
              <div className="space-y-2">
                <p className="text-[11px] text-slate-500">必要なサービス:</p>
                <div className="flex flex-wrap gap-1.5">
                  {lesson.requiredServices.map((sId) => {
                    const svc = getService(sId);
                    const meta = svc ? getCategoryMeta(svc.category) : null;
                    return (
                      <span key={sId} className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: `${meta?.color || '#8C4FFF'}15`, color: meta?.color || '#8C4FFF' }}>
                        {svc?.nameJa || sId}
                      </span>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-500 mt-2">必要な接続:</p>
                <div className="space-y-0.5">
                  {lesson.requiredConnections.map((conn, i) => (
                    <p key={i} className="text-[11px] text-slate-400">
                      {getService(conn.from)?.nameJa} → {getService(conn.to)?.nameJa}
                      {conn.label && <span className="text-slate-600 ml-1">({conn.label})</span>}
                    </p>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap mt-3">{lesson.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Overlay */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setResult(null)}
          >
            <motion.div
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
              style={{ background: '#0d0e1a', border: `1px solid ${result.pass ? '#22c55e' : '#ef4444'}30` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: result.pass ? '#22c55e15' : '#ef444415' }}>
                  {result.pass ? (
                    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{result.pass ? 'クリア！' : 'もう少し！'}</h3>
                  <p className="text-xs text-slate-400">{result.pass ? 'Lesson ' + lesson.id + ' を完了しました' : 'アーキテクチャを見直してみましょう'}</p>
                </div>
              </div>

              <div className="space-y-1 mb-5">
                {result.details.map((d, i) => (
                  <p key={i} className={`text-xs ${d.startsWith('[OK]') ? 'text-green-400/80' : 'text-red-400/80'}`}>
                    {d}
                  </p>
                ))}
              </div>

              <div className="flex items-center gap-3 justify-end">
                <button onClick={() => setResult(null)} className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 border border-slate-700 hover:bg-white/5 transition-all">
                  閉じる
                </button>
                {result.pass && nextUrl && (
                  <Link href={nextUrl} className="px-5 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #8C4FFF, #8C4FFFcc)', boxShadow: '0 2px 12px #8C4FFF30' }}>
                    次のレッスンへ
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ArchitectEditor(props: Props) {
  return (
    <ReactFlowProvider>
      <ArchitectEditorInner {...props} />
    </ReactFlowProvider>
  );
}
