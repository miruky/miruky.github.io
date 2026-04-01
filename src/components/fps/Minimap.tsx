'use client';

/* ═══════════════════════════════════════════════════════════
   Minimap (top-left, radar style like CoD)
   ═══════════════════════════════════════════════════════════ */
interface MinimapProps {
  playerPos: { x: number; z: number };
  playerYaw: number;
  enemies: { x: number; z: number }[];
  mapSize: number;
}

export function Minimap({ playerPos, playerYaw, enemies, mapSize }: MinimapProps) {
  const size = 160;
  const scale = size / (mapSize * 2);

  return (
    <div
      className="absolute top-20 left-4 z-40 pointer-events-none"
      style={{ width: size, height: size }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
        {/* Grid lines */}
        <svg width={size} height={size} className="absolute inset-0 opacity-20">
          {/* Horizontal */}
          {[0.25, 0.5, 0.75].map((p) => (
            <line key={`h-${p}`} x1={0} y1={p * size} x2={size} y2={p * size} stroke="white" strokeWidth="0.5" />
          ))}
          {/* Vertical */}
          {[0.25, 0.5, 0.75].map((p) => (
            <line key={`v-${p}`} x1={p * size} y1={0} x2={p * size} y2={size} stroke="white" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Buildings */}
        <svg width={size} height={size} className="absolute inset-0">
          {/* Example: draw building outlines */}
          {[
            { x: 0, z: 0, w: 8, h: 8 },
            { x: -18, z: -18, w: 10, h: 10 },
            { x: 18, z: -18, w: 10, h: 10 },
            { x: -18, z: 18, w: 10, h: 10 },
            { x: 18, z: 18, w: 10, h: 10 },
          ].map((b, i) => (
            <rect
              key={i}
              x={(b.x + mapSize) * scale - (b.w * scale) / 2}
              y={(b.z + mapSize) * scale - (b.h * scale) / 2}
              width={b.w * scale}
              height={b.h * scale}
              fill="rgba(100,100,100,0.5)"
              stroke="rgba(150,150,150,0.3)"
              strokeWidth="0.5"
            />
          ))}
        </svg>

        {/* Player arrow */}
        <div
          className="absolute"
          style={{
            left: (playerPos.x + mapSize) * scale - 5,
            top: (playerPos.z + mapSize) * scale - 5,
            width: 10,
            height: 10,
            transform: `rotate(${-playerYaw}rad)`,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polygon points="5,0 10,10 5,7 0,10" fill="#00d4ff" />
          </svg>
        </div>

        {/* Enemy dots */}
        {enemies.map((e, i) => {
          const ex = (e.x + mapSize) * scale;
          const ey = (e.z + mapSize) * scale;
          if (ex < 0 || ex > size || ey < 0 || ey > size) return null;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-red-500 animate-pulse"
              style={{
                left: ex - 4,
                top: ey - 4,
              }}
            />
          );
        })}

        {/* Compass directions */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 font-bold">N</div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 font-bold">S</div>
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 font-bold">W</div>
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 font-bold">E</div>
      </div>
    </div>
  );
}
