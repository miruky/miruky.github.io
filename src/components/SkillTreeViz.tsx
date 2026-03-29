'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  skillTreeData,
  type SkillBranch,
  type SkillNode,
} from '@/data/skilltree';

// ─── Layout Constants ────────────────────────────────────────
const VW = 1800;
const VH = 1200;
const CX = VW / 2;
const CY = VH / 2 - 10;
const CAT_R = 340;
const SKILL_R = 210;
const ROOT_R = 44;
const CAT_NODE_R = 36;
const SKILL_NODE_R = 26;

// ─── Positioned Types ────────────────────────────────────────
interface PosSkill extends SkillNode {
  x: number;
  y: number;
}
interface PosBranch extends Omit<SkillBranch, 'skills'> {
  x: number;
  y: number;
  angleDeg: number;
  skills: PosSkill[];
}

// ─── Layout Computation ──────────────────────────────────────
function computeLayout(): PosBranch[] {
  return skillTreeData.map((branch, i) => {
    const angleDeg = i * 60 - 90;
    const a = (angleDeg * Math.PI) / 180;
    const bx = CX + CAT_R * Math.cos(a);
    const by = CY + CAT_R * Math.sin(a);

    const arcDeg = Math.min(120, Math.max(40, branch.skills.length * 12));
    const arcRad = (arcDeg * Math.PI) / 180;

    const skills: PosSkill[] = branch.skills.map((skill, j) => {
      const n = branch.skills.length;
      const t = n === 1 ? 0 : j / (n - 1) - 0.5;
      const sa = a + t * arcRad;
      return {
        ...skill,
        x: bx + SKILL_R * Math.cos(sa),
        y: by + SKILL_R * Math.sin(sa),
      };
    });

    return { ...branch, x: bx, y: by, angleDeg, skills };
  });
}

// ─── Level Color Helper ──────────────────────────────────────
function levelLabel(level: number): string {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  return 'Beginner';
}

// ─── Component ───────────────────────────────────────────────
export default function SkillTreeViz() {
  const branches = useMemo(() => computeLayout(), []);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [detail, setDetail] = useState<{
    skill: PosSkill;
    branch: PosBranch;
  } | null>(null);

  const totalSkills = branches.reduce((s, b) => s + b.skills.length, 0);
  const avgLevel = Math.round(
    branches.reduce(
      (s, b) => s + b.skills.reduce((ss, sk) => ss + sk.level, 0),
      0
    ) / totalSkills
  );

  const handleBranchClick = useCallback(
    (id: string) => {
      setSelectedBranch((prev) => (prev === id ? null : id));
    },
    []
  );

  const handleSkillClick = useCallback(
    (skill: PosSkill, branch: PosBranch) => {
      setDetail((prev) =>
        prev?.skill.id === skill.id ? null : { skill, branch }
      );
    },
    []
  );

  return (
    <div>
      {/* ── Summary Stats ── */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {[
          { label: 'Total Skills', value: totalSkills },
          { label: 'Categories', value: branches.length },
          { label: 'Avg Level', value: `${avgLevel}%` },
        ].map((s) => (
          <div key={s.label} className="glass-card px-5 py-2.5 text-center">
            <div className="text-lg font-bold gradient-text-static">
              {s.value}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Category Filter ── */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {branches.map((b) => (
          <button
            key={b.id}
            onClick={() => handleBranchClick(b.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
              selectedBranch === b.id
                ? 'ring-2 ring-offset-1 ring-offset-dark-900 shadow-lg'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: `${b.color}15`,
              color: b.color,
              borderColor: `${b.color}40`,
              ...(selectedBranch === b.id
                ? { boxShadow: `0 0 12px ${b.color}30` }
                : {}),
            }}
          >
            <span>{b.icon}</span>
            {b.name}
          </button>
        ))}
        {selectedBranch && (
          <button
            onClick={() => setSelectedBranch(null)}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-400 hover:text-white border border-slate-600 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* ── SVG Tree ── */}
      <div className="relative w-full overflow-x-auto -mx-4 px-4">
        <div className="min-w-[780px]">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="w-full h-auto"
            style={{ maxHeight: 'calc(100vh - 360px)', minHeight: '460px' }}
          >
            {/* Defs */}
            <defs>
              <linearGradient
                id="grad-root"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#7f5af0" />
              </linearGradient>
              <filter id="glow-lg">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-md">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-sm">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Root → Branch connections ── */}
            {branches.map((b, bi) => {
              const dimmed = selectedBranch && selectedBranch !== b.id;
              return (
                <motion.path
                  key={`rc-${b.id}`}
                  d={`M ${CX} ${CY} L ${b.x} ${b.y}`}
                  stroke={b.color}
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity={dimmed ? 0.06 : 0.3}
                  strokeDasharray="8 5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + bi * 0.12 }}
                />
              );
            })}

            {/* ── Branch → Skill connections ── */}
            {branches.map((b, bi) =>
              b.skills.map((sk, si) => {
                const dimmed = selectedBranch && selectedBranch !== b.id;
                return (
                  <motion.path
                    key={`cs-${b.id}-${sk.id}`}
                    d={`M ${b.x} ${b.y} L ${sk.x} ${sk.y}`}
                    stroke={b.color}
                    strokeWidth="1.5"
                    fill="none"
                    strokeOpacity={dimmed ? 0.03 : 0.2}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.0 + bi * 0.1 + si * 0.03,
                    }}
                  />
                );
              })
            )}

            {/* ── Root Node ── */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.circle
                cx={CX}
                cy={CY}
                fill="rgba(10, 14, 39, 0.95)"
                stroke="url(#grad-root)"
                strokeWidth="3"
                filter="url(#glow-lg)"
                initial={{ r: 0 }}
                animate={{ r: ROOT_R }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 18,
                  delay: 0.1,
                }}
              />
              <text
                x={CX}
                y={CY - 5}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize="15"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
              >
                miruky
              </text>
              <text
                x={CX}
                y={CY + 13}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize="9"
                fontWeight="500"
                fontFamily="JetBrains Mono, monospace"
              >
                CORE
              </text>
            </motion.g>

            {/* ── Branch Nodes ── */}
            {branches.map((b, bi) => {
              const dimmed = selectedBranch && selectedBranch !== b.id;
              return (
                <motion.g
                  key={`bn-${b.id}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleBranchClick(b.id)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: dimmed ? 0.25 : 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + bi * 0.1 }}
                >
                  <motion.circle
                    cx={b.x}
                    cy={b.y}
                    fill="rgba(10, 14, 39, 0.95)"
                    stroke={b.color}
                    strokeWidth="2.5"
                    filter={dimmed ? undefined : 'url(#glow-md)'}
                    initial={{ r: 0 }}
                    animate={{ r: CAT_NODE_R }}
                    transition={{
                      type: 'spring',
                      stiffness: 180,
                      damping: 16,
                      delay: 0.7 + bi * 0.1,
                    }}
                  />
                  <text
                    x={b.x}
                    y={b.y - 5}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="17"
                  >
                    {b.icon}
                  </text>
                  <text
                    x={b.x}
                    y={b.y + 14}
                    textAnchor="middle"
                    fill={b.color}
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="Inter, sans-serif"
                  >
                    {b.name}
                  </text>
                </motion.g>
              );
            })}

            {/* ── Skill Nodes ── */}
            {branches.map((b, bi) =>
              b.skills.map((sk, si) => {
                const dimmed = selectedBranch && selectedBranch !== b.id;
                const circ = 2 * Math.PI * SKILL_NODE_R;
                const offset = circ * (1 - sk.level / 100);
                const isSelected = detail?.skill.id === sk.id;

                return (
                  <motion.g
                    key={`sn-${sk.id}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSkillClick(sk, b)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: dimmed ? 0.1 : 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 1.3 + bi * 0.1 + si * 0.04,
                    }}
                  >
                    {/* Background */}
                    <motion.circle
                      cx={sk.x}
                      cy={sk.y}
                      fill="rgba(10, 14, 39, 0.9)"
                      stroke={
                        isSelected ? b.color : 'rgba(255,255,255,0.08)'
                      }
                      strokeWidth={isSelected ? 2 : 1}
                      filter={isSelected ? 'url(#glow-sm)' : undefined}
                      initial={{ r: 0 }}
                      animate={{ r: SKILL_NODE_R }}
                      transition={{
                        type: 'spring',
                        stiffness: 160,
                        damping: 14,
                        delay: 1.4 + bi * 0.1 + si * 0.04,
                      }}
                    />

                    {/* Progress Ring */}
                    <circle
                      cx={sk.x}
                      cy={sk.y}
                      r={SKILL_NODE_R}
                      fill="none"
                      stroke={b.color}
                      strokeWidth="3"
                      strokeDasharray={circ}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      transform={`rotate(-90 ${sk.x} ${sk.y})`}
                      opacity={dimmed ? 0.15 : 0.75}
                    />

                    {/* Label */}
                    <text
                      x={sk.x}
                      y={sk.y + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="10"
                      fontWeight="500"
                      fontFamily="Inter, sans-serif"
                    >
                      {sk.shortName}
                    </text>

                    {/* Level % */}
                    <text
                      x={sk.x}
                      y={sk.y + SKILL_NODE_R + 14}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.35)"
                      fontSize="8"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {sk.level}%
                    </text>
                  </motion.g>
                );
              })
            )}
          </svg>
        </div>
      </div>

      {/* ── Level Legend ── */}
      <div className="flex justify-center gap-4 mt-4 mb-6 text-[10px] text-slate-500 dark:text-slate-400 flex-wrap">
        {[
          { label: 'Expert (90-100%)', pct: 95 },
          { label: 'Advanced (75-89%)', pct: 82 },
          { label: 'Intermediate (60-74%)', pct: 67 },
        ].map((l) => (
          <span key={l.label} className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle
                cx="8"
                cy="8"
                r="6"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
              />
              <circle
                cx="8"
                cy="8"
                r="6"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="2"
                strokeDasharray={2 * Math.PI * 6}
                strokeDashoffset={2 * Math.PI * 6 * (1 - l.pct / 100)}
                strokeLinecap="round"
                transform="rotate(-90 8 8)"
                opacity="0.7"
              />
            </svg>
            {l.label}
          </span>
        ))}
      </div>

      {/* ── Detail Panel ── */}
      <AnimatePresence>
        {detail && (
          <motion.div
            key={detail.skill.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="glass-card p-5 max-w-lg mx-auto neon-border"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `${detail.branch.color}18`,
                  border: `2px solid ${detail.branch.color}50`,
                }}
              >
                <span className="text-lg">{detail.branch.icon}</span>
              </div>
              <div className="min-w-0 flex-grow">
                <h3 className="font-bold text-sm text-white truncate">
                  {detail.skill.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {detail.branch.name} /{' '}
                  <span style={{ color: detail.branch.color }}>
                    {levelLabel(detail.skill.level)}
                  </span>
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div
                  className="text-xl font-bold font-mono"
                  style={{ color: detail.branch.color }}
                >
                  {detail.skill.level}%
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {detail.skill.description}
            </p>

            {/* Progress bar */}
            <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-dark-700 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: detail.branch.color }}
                initial={{ width: 0 }}
                animate={{ width: `${detail.skill.level}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
