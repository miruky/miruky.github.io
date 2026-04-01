'use client';

import { GameState } from './FPSGame';

/* ═══════════════════════════════════════════════════════════
   CoD-style HUD overlay
   ═══════════════════════════════════════════════════════════ */
export function HUD({ gs }: { gs: GameState }) {
  const minutes = Math.floor(gs.timeLeft / 60);
  const seconds = Math.floor(gs.timeLeft % 60);
  const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const hpPercent = gs.hp / 100;
  const now = Date.now() / 1000;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 text-white" style={{ fontFamily: "'Rajdhani', 'Orbitron', monospace" }}>
      {/* ── Crosshair ── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {gs.isADS ? (
          // Scope crosshair
          <div className="relative w-8 h-8">
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-red-400/90 -translate-x-1/2" />
            <div className="absolute top-1/2 left-0 h-[1px] w-full bg-red-400/90 -translate-y-1/2" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-red-400/90" />
          </div>
        ) : (
          // Normal crosshair
          <div className="relative w-6 h-6">
            <div className="absolute left-1/2 top-0 w-[2px] h-2 bg-white/80 -translate-x-1/2" />
            <div className="absolute left-1/2 bottom-0 w-[2px] h-2 bg-white/80 -translate-x-1/2" />
            <div className="absolute top-1/2 left-0 h-[2px] w-2 bg-white/80 -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 h-[2px] w-2 bg-white/80 -translate-y-1/2" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-white/60 rounded-full" />
          </div>
        )}
      </div>

      {/* ── Hit markers ── */}
      {gs.hitMarkers.map((hm) => (
        <div
          key={hm.id}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className={`w-6 h-6 ${hm.headshot ? 'text-red-500' : 'text-white'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="6" y1="6" x2="10" y2="10" />
              <line x1="18" y1="6" x2="14" y2="10" />
              <line x1="6" y1="18" x2="10" y2="14" />
              <line x1="18" y1="18" x2="14" y2="14" />
            </svg>
          </div>
          {hm.headshot && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-500 whitespace-nowrap animate-pulse">
              HEADSHOT
            </div>
          )}
        </div>
      ))}

      {/* ── Top bar: Timer + Score ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-6">
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-lg px-6 py-2 border border-white/10">
          <div className="text-center">
            <p className="text-2xl font-bold tracking-wider tabular-nums">{timeStr}</p>
          </div>
        </div>
      </div>

      {/* ── Score display (top right) ── */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Score</p>
          <p className="text-2xl font-bold text-accent-cyan tabular-nums">{gs.score.toLocaleString()}</p>
        </div>
      </div>

      {/* ── Kill/Death top-left ── */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
        <div className="flex gap-4 items-center">
          <div>
            <p className="text-xs text-slate-400">KILLS</p>
            <p className="text-xl font-bold text-red-400 tabular-nums">{gs.kills}</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-xs text-slate-400">DEATHS</p>
            <p className="text-xl font-bold text-slate-300 tabular-nums">{gs.deaths}</p>
          </div>
        </div>
      </div>

      {/* ── Kill streak ── */}
      {gs.streakCount >= 3 && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 animate-pulse">
          <div className="bg-gradient-to-r from-orange-500/80 to-red-600/80 backdrop-blur-sm rounded-lg px-6 py-1.5 border border-orange-400/40">
            <p className="text-sm font-bold tracking-wider">
              🔥 {gs.streakCount} KILL STREAK
            </p>
          </div>
        </div>
      )}

      {/* ── Bottom right: Ammo ── */}
      <div className="absolute bottom-6 right-6">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10 min-w-[200px]">
          {/* Weapon name */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Assault Rifle</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <p className="text-[10px] text-slate-400">
                {gs.isReloading ? 'RELOADING' : 'READY'}
              </p>
            </div>
          </div>
          {/* Ammo count */}
          <div className="flex items-end gap-2">
            <p className="text-4xl font-black tabular-nums leading-none">
              {gs.isReloading ? '--' : gs.ammo}
            </p>
            <p className="text-slate-400 text-lg tabular-nums mb-0.5">/ {gs.reserve}</p>
          </div>
          {/* Reload bar */}
          {gs.isReloading && (
            <div className="mt-2 w-full h-1 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-cyan rounded-full transition-all duration-100"
                style={{ width: `${gs.reloadProgress * 100}%` }}
              />
            </div>
          )}
          {/* Fire mode indicator */}
          <div className="mt-2 flex gap-1.5">
            <div className="px-1.5 py-0.5 bg-accent-cyan/20 rounded text-[9px] text-accent-cyan font-bold border border-accent-cyan/30">
              AUTO
            </div>
            <div className="px-1.5 py-0.5 bg-white/5 rounded text-[9px] text-slate-500 font-bold">
              SEMI
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom left: HP ── */}
      <div className="absolute bottom-6 left-6">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10 min-w-[200px]">
          <p className="text-xs text-slate-400 mb-1">HEALTH</p>
          <div className="flex items-end gap-2 mb-2">
            <p className={`text-3xl font-black tabular-nums leading-none ${
              gs.hp > 60 ? 'text-white' : gs.hp > 30 ? 'text-yellow-400' : 'text-red-500 animate-pulse'
            }`}>
              {gs.hp}
            </p>
            <p className="text-slate-500 text-sm mb-0.5">/ 100</p>
          </div>
          {/* HP bar */}
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                hpPercent > 0.6 ? 'bg-green-500' : hpPercent > 0.3 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${hpPercent * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Kill feed (right side) ── */}
      <div className="absolute top-24 right-4 space-y-1">
        {gs.killFeed.map((kf) => (
          <div
            key={kf.id}
            className="bg-black/50 backdrop-blur-sm rounded px-3 py-1 text-sm font-bold animate-slide-in"
          >
            <span className={kf.text.includes('ヘッド') ? 'text-red-400' : kf.text.includes('リスポーン') ? 'text-slate-400' : 'text-yellow-400'}>
              {kf.text}
            </span>
          </div>
        ))}
      </div>

      {/* ── Damage overlay ── */}
      {gs.hp < 40 && (
        <div className="absolute inset-0 border-[4px] border-red-500/30 rounded-none pointer-events-none animate-pulse" />
      )}

      {/* ── Damage direction indicator ── */}
      {gs.damageDir !== null && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
          <div
            className="absolute left-1/2 top-0 w-4 h-12 -translate-x-1/2 origin-bottom"
            style={{ transform: `translateX(-50%) rotate(${gs.damageDir}rad)`, transformOrigin: 'bottom center', top: '-20px' }}
          >
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[20px] border-b-red-500/70" />
          </div>
        </div>
      )}

      {/* ── Controls hint on bottom center ── */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-600">
        WASD:移動 ｜ Mouse:エイム ｜ LMB:射撃 ｜ RMB:ADS ｜ R:リロード ｜ Space:ジャンプ ｜ Shift:ダッシュ
      </div>
    </div>
  );
}
