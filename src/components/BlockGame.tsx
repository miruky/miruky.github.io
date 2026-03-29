'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── 定数 ───
const COLS = 10;
const ROWS = 20;
const TICK_BASE = 800; // ms per drop at level 1
const TICK_MIN = 80;

type Cell = string | null;
type Board = Cell[][];
type Phase = 'ready' | 'playing' | 'paused' | 'gameover';

// テトロミノ定義
const SHAPES: Record<string, { blocks: number[][]; color: string }> = {
  I: { blocks: [[0,0],[1,0],[2,0],[3,0]], color: '#00d4ff' },
  O: { blocks: [[0,0],[1,0],[0,1],[1,1]], color: '#fbbf24' },
  T: { blocks: [[0,0],[1,0],[2,0],[1,1]], color: '#7f5af0' },
  S: { blocks: [[1,0],[2,0],[0,1],[1,1]], color: '#64ffda' },
  Z: { blocks: [[0,0],[1,0],[1,1],[2,1]], color: '#ff6b9d' },
  J: { blocks: [[0,0],[0,1],[1,1],[2,1]], color: '#3b82f6' },
  L: { blocks: [[2,0],[0,1],[1,1],[2,1]], color: '#f97316' },
};
const SHAPE_KEYS = Object.keys(SHAPES);

interface Piece {
  type: string;
  blocks: number[][];
  x: number;
  y: number;
}

function randomType(): string {
  return SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)];
}

function createPiece(type: string): Piece {
  const blocks = SHAPES[type].blocks.map(b => [...b]);
  return { type, blocks, x: Math.floor(COLS / 2) - 1, y: 0 };
}

function createBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function rotateBlocks(blocks: number[][]): number[][] {
  const maxX = Math.max(...blocks.map(b => b[0]));
  const maxY = Math.max(...blocks.map(b => b[1]));
  const size = Math.max(maxX, maxY) + 1;
  return blocks.map(([x, y]) => [size - 1 - y, x]);
}

function isValid(board: Board, blocks: number[][], px: number, py: number): boolean {
  for (const [bx, by] of blocks) {
    const nx = px + bx;
    const ny = py + by;
    if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
    if (ny >= 0 && board[ny][nx]) return false;
  }
  return true;
}

function placePiece(board: Board, piece: Piece): Board {
  const newBoard = board.map(row => [...row]);
  const color = SHAPES[piece.type].color;
  for (const [bx, by] of piece.blocks) {
    const nx = piece.x + bx;
    const ny = piece.y + by;
    if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS) {
      newBoard[ny][nx] = color;
    }
  }
  return newBoard;
}

function clearLines(board: Board): { board: Board; cleared: number } {
  const remaining = board.filter(row => row.some(cell => !cell));
  const cleared = ROWS - remaining.length;
  const empty = Array.from({ length: cleared }, () => Array(COLS).fill(null));
  return { board: [...empty, ...remaining], cleared };
}

function getGhostY(board: Board, piece: Piece): number {
  let gy = piece.y;
  while (isValid(board, piece.blocks, piece.x, gy + 1)) gy++;
  return gy;
}

const LINE_SCORES = [0, 100, 300, 500, 800];

// ─── メインコンポーネント ───
export default function BlockGame({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('ready');
  const [board, setBoard] = useState<Board>(createBoard);
  const [piece, setPiece] = useState<Piece | null>(null);
  const [nextType, setNextType] = useState(randomType);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [mascotMood, setMascotMood] = useState<'happy' | 'reading' | 'question'>('happy');

  const boardRef = useRef(board);
  const pieceRef = useRef(piece);
  const phaseRef = useRef(phase);
  const nextRef = useRef(nextType);

  boardRef.current = board;
  pieceRef.current = piece;
  phaseRef.current = phase;
  nextRef.current = nextType;

  // ─── 新しいピースをスポーン ───
  const spawnPiece = useCallback(() => {
    const type = nextRef.current;
    const np = createPiece(type);
    const nt = randomType();
    setNextType(nt);

    if (!isValid(boardRef.current, np.blocks, np.x, np.y)) {
      setPhase('gameover');
      return;
    }
    setPiece(np);
  }, []);

  // ─── ピースを固定 ───
  const lockPiece = useCallback(() => {
    const p = pieceRef.current;
    if (!p) return;
    const newBoard = placePiece(boardRef.current, p);
    const { board: cleared, cleared: count } = clearLines(newBoard);
    setBoard(cleared);

    if (count > 0) {
      setScore(s => s + LINE_SCORES[Math.min(count, 4)] * level);
      setLines(l => {
        const newLines = l + count;
        const newLevel = Math.floor(newLines / 10) + 1;
        setLevel(newLevel);
        return newLines;
      });
      setMascotMood('happy');
      setTimeout(() => setMascotMood('reading'), 1000);
    }
    spawnPiece();
  }, [level, spawnPiece]);

  // ─── 移動 ───
  const move = useCallback((dx: number, dy: number): boolean => {
    const p = pieceRef.current;
    if (!p) return false;
    if (isValid(boardRef.current, p.blocks, p.x + dx, p.y + dy)) {
      setPiece({ ...p, x: p.x + dx, y: p.y + dy });
      return true;
    }
    return false;
  }, []);

  // ─── 回転 ───
  const rotate = useCallback(() => {
    const p = pieceRef.current;
    if (!p || p.type === 'O') return;
    const rotated = rotateBlocks(p.blocks);
    // ウォールキック: 0, -1, +1, -2, +2
    for (const kick of [0, -1, 1, -2, 2]) {
      if (isValid(boardRef.current, rotated, p.x + kick, p.y)) {
        setPiece({ ...p, blocks: rotated, x: p.x + kick });
        return;
      }
    }
  }, []);

  // ─── ハードドロップ ───
  const hardDrop = useCallback(() => {
    const p = pieceRef.current;
    if (!p) return;
    const gy = getGhostY(boardRef.current, p);
    const dropDist = gy - p.y;
    setScore(s => s + dropDist * 2);
    setPiece({ ...p, y: gy });
    // 次のtickで固定される
    setTimeout(() => {
      const updated = { ...pieceRef.current!, y: gy };
      pieceRef.current = updated;
      lockPiece();
    }, 30);
  }, [lockPiece]);

  // ─── 自動落下 ───
  useEffect(() => {
    if (phase !== 'playing' || !piece) return;
    const speed = Math.max(TICK_MIN, TICK_BASE - (level - 1) * 70);
    const timer = setInterval(() => {
      if (!move(0, 1)) {
        lockPiece();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [phase, piece, level, move, lockPiece]);

  // ─── キーボード ───
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phaseRef.current === 'ready') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startGame();
        }
        return;
      }
      if (phaseRef.current === 'gameover') return;

      if (e.key === 'Escape') {
        setPhase(p => p === 'paused' ? 'playing' : 'paused');
        return;
      }
      if (phaseRef.current === 'paused') return;
      if (phaseRef.current !== 'playing') return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
          e.preventDefault();
          move(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
          e.preventDefault();
          move(1, 0);
          break;
        case 'ArrowDown':
        case 's':
          e.preventDefault();
          if (move(0, 1)) setScore(s => s + 1);
          break;
        case 'ArrowUp':
        case 'w':
          e.preventDefault();
          rotate();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [move, rotate, hardDrop]);

  // ─── ゲーム開始 ───
  const startGame = useCallback(() => {
    setBoard(createBoard());
    setScore(0);
    setLines(0);
    setLevel(1);
    setMascotMood('reading');
    setPhase('playing');
    const type = randomType();
    const np = createPiece(type);
    setPiece(np);
    setNextType(randomType());
  }, []);

  // ─── セルサイズ計算 ───
  const CELL = 24;

  // ─── ボード描画データ ───
  const renderBoard = (): Cell[][] => {
    const display = board.map(row => [...row]);

    if (piece && phase === 'playing') {
      // ゴースト
      const gy = getGhostY(board, piece);
      const ghostColor = SHAPES[piece.type].color;
      for (const [bx, by] of piece.blocks) {
        const nx = piece.x + bx;
        const ny = gy + by;
        if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS && !display[ny][nx]) {
          display[ny][nx] = `ghost:${ghostColor}`;
        }
      }
      // 実体
      const color = SHAPES[piece.type].color;
      for (const [bx, by] of piece.blocks) {
        const nx = piece.x + bx;
        const ny = piece.y + by;
        if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS) {
          display[ny][nx] = color;
        }
      }
    }

    return display;
  };

  const displayBoard = renderBoard();

  // ─── Next ピース描画 ───
  const renderNext = () => {
    const shape = SHAPES[nextType];
    const blocks = shape.blocks;
    const maxX = Math.max(...blocks.map(b => b[0])) + 1;
    const maxY = Math.max(...blocks.map(b => b[1])) + 1;
    const grid: Cell[][] = Array.from({ length: maxY }, () => Array(maxX).fill(null));
    for (const [bx, by] of blocks) {
      grid[by][bx] = shape.color;
    }
    return grid;
  };

  // =========================================================
  //  Ready 画面
  // =========================================================
  if (phase === 'ready') {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mascot-bounce inline-block mb-6">
            <img src="/images/mascot/mascot-happy.png" alt="" className="w-24 h-auto drop-shadow-lg" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Block <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-slate-400 text-sm mb-8">ブロック積みゲーム</p>

          <div className="glass-card p-5 rounded-xl mb-8 text-left text-sm text-slate-300 space-y-2 max-w-xs mx-auto">
            <p className="font-semibold text-white mb-3">操作方法</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span className="text-slate-400">移動</span>
              <span className="font-mono">← → ↓</span>
              <span className="text-slate-400">回転</span>
              <span className="font-mono">↑</span>
              <span className="text-slate-400">ハードドロップ</span>
              <span className="font-mono">Space</span>
              <span className="text-slate-400">ポーズ</span>
              <span className="font-mono">Esc</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:opacity-90 transition-all shadow-lg shadow-accent-cyan/20"
            >
              Start
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-lg font-medium border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 transition-all"
            >
              Back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================
  //  ゲームオーバー
  // =========================================================
  if (phase === 'gameover') {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-bold text-white mb-4">Game Over</h2>

          <div className="mb-6">
            <div className="mascot-float inline-block">
              <img src="/images/mascot/mascot-question.png" alt="" className="w-20 h-auto drop-shadow-md" />
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl text-left space-y-3 mb-8 min-w-[240px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Score</span>
              <span className="text-white font-bold font-mono">{score.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Lines</span>
              <span className="text-accent-cyan font-bold font-mono">{lines}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Level</span>
              <span className="text-accent-purple font-bold font-mono">{level}</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:opacity-90 transition-all shadow-lg shadow-accent-cyan/20"
            >
              Retry
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-lg font-medium border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 transition-all"
            >
              Menu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================
  //  プレイ中 / ポーズ
  // =========================================================
  const nextGrid = renderNext();

  return (
    <div className="flex flex-col items-center">
      {/* ヘッダー情報 */}
      <div className="flex items-center justify-between w-full mb-4 text-sm" style={{ maxWidth: CELL * COLS + 140 }}>
        <div className="text-slate-400">
          Score <span className="text-white font-bold font-mono">{score.toLocaleString()}</span>
        </div>
        <div className="text-slate-400">
          Lv.<span className="text-accent-purple font-bold">{level}</span>
        </div>
        <div className="text-slate-400">
          Lines <span className="text-accent-cyan font-bold">{lines}</span>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        {/* ボード */}
        <div
          className="relative border border-slate-600/50 rounded-sm overflow-hidden"
          style={{ width: CELL * COLS, height: CELL * ROWS, background: 'rgba(10,14,39,0.6)' }}
        >
          {/* グリッド線 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)`,
              backgroundSize: `${CELL}px ${CELL}px`,
            }}
          />

          {/* セル描画 */}
          {displayBoard.map((row, ry) =>
            row.map((cell, cx) => {
              if (!cell) return null;
              const isGhost = typeof cell === 'string' && cell.startsWith('ghost:');
              const color = isGhost ? cell.split(':')[1] : cell;
              return (
                <div
                  key={`${ry}-${cx}`}
                  className="absolute rounded-[2px]"
                  style={{
                    left: cx * CELL + 1,
                    top: ry * CELL + 1,
                    width: CELL - 2,
                    height: CELL - 2,
                    backgroundColor: isGhost ? 'transparent' : color,
                    border: isGhost ? `1px dashed ${color}` : 'none',
                    opacity: isGhost ? 0.3 : 1,
                    boxShadow: isGhost ? 'none' : `inset 0 -2px 4px rgba(0,0,0,0.3), 0 0 6px ${color}40`,
                  }}
                />
              );
            })
          )}

          {/* ポーズオーバーレイ */}
          <AnimatePresence>
            {phase === 'paused' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-dark-900/80 flex items-center justify-center backdrop-blur-sm"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-white mb-2">Paused</p>
                  <p className="text-slate-400 text-xs">Esc で再開</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* サイドパネル */}
        <div className="flex flex-col gap-4 w-[100px]">
          {/* Next */}
          <div className="glass-card p-3 rounded-lg">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 text-center">Next</p>
            <div className="flex justify-center">
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${nextGrid[0]?.length || 2}, ${CELL - 4}px)`, gap: 1 }}>
                {nextGrid.map((row, ry) =>
                  row.map((cell, cx) => (
                    <div
                      key={`n-${ry}-${cx}`}
                      className="rounded-[2px]"
                      style={{
                        width: CELL - 4,
                        height: CELL - 4,
                        backgroundColor: cell || 'transparent',
                        boxShadow: cell ? `inset 0 -2px 4px rgba(0,0,0,0.3), 0 0 4px ${cell}40` : 'none',
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* マスコット */}
          <div className="flex justify-center">
            <div className={mascotMood === 'happy' ? 'mascot-bounce' : 'mascot-float'}>
              <img
                src={`/images/mascot/mascot-${mascotMood}.png`}
                alt=""
                className="w-14 h-auto drop-shadow-md opacity-70"
              />
            </div>
          </div>

          {/* 戻るボタン */}
          <button
            onClick={onBack}
            className="text-[10px] text-slate-500 hover:text-accent-cyan transition-colors"
          >
            Menu &larr;
          </button>
        </div>
      </div>

      {/* モバイルコントロール */}
      <div className="mt-6 flex gap-2 md:hidden">
        <button onTouchStart={() => move(-1, 0)} className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white text-lg active:bg-accent-cyan/20">&larr;</button>
        <button onTouchStart={() => rotate()} className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white text-lg active:bg-accent-cyan/20">&uarr;</button>
        <button onTouchStart={() => { if (move(0, 1)) setScore(s => s + 1); }} className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white text-lg active:bg-accent-cyan/20">&darr;</button>
        <button onTouchStart={() => move(1, 0)} className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white text-lg active:bg-accent-cyan/20">&rarr;</button>
        <button onTouchStart={hardDrop} className="w-16 h-12 rounded-lg glass-card flex items-center justify-center text-accent-cyan text-xs font-bold active:bg-accent-cyan/20">DROP</button>
      </div>
    </div>
  );
}
