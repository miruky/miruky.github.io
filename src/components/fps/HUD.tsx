'use client';

import { GameState, WEAPONS } from './FPSGame';

/* ═══════════════════════════════════════════════════════════
   CoD-style HUD overlay
   ═══════════════════════════════════════════════════════════ */
export function HUD({ gs }: { gs: GameState }) {
  const minutes = Math.floor(gs.timeLeft / 60);
  const seconds = Math.floor(gs.timeLeft % 60);
  const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const hpPercent = gs.hp / 100;
  const now = Date.now() / 1000;
  const weapon = WEAPONS[gs.weaponIndex];

  return (
    <div className="absolute inset-0 pointer-events-none z-40 text-white" style={{ fontFamily: "'Rajdhani', 'Orbitron', monospace" }}>
      {/* ── Crosshair / Scope ── */}
      {gs.isADS && gs.weaponIndex === 3 ? (
        /* Sniper scope overlay – transparent center shows 3D scene */
        <div className="absolute inset-0 z-50">
          {/* Radial vignette: transparent center, opaque black edges */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 18%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.98) 32%)'
          }} />
          {/* Scope reticle image */}
          <img
            src="/images/fps/scope.png"
            alt=""
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full pointer-events-none"
            style={{ aspectRatio: '1/1', objectFit: 'contain', opacity: 0.85, mixBlendMode: 'multiply' }}
          />
          {/* Crosshair lines in scope center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-12 h-12">
              <div className="absolute left-1/2 top-0 w-[1px] h-full bg-red-500/60 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 h-[1px] w-full bg-red-500/60 -translate-y-1/2" />
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {gs.isADS ? (
            <div className="relative w-8 h-8">
              <div className="absolute left-1/2 top-0 w-[1px] h-full bg-red-400/90 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 h-[1px] w-full bg-red-400/90 -translate-y-1/2" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-red-400/90" />
            </div>
          ) : (
            /* CSS crosshair (no external image needed) */
            <div className="relative w-8 h-8">
              <div className="absolute left-1/2 top-0 w-[2px] h-2 bg-white/70 -translate-x-1/2" />
              <div className="absolute left-1/2 bottom-0 w-[2px] h-2 bg-white/70 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 h-[2px] w-2 bg-white/70 -translate-y-1/2" />
              <div className="absolute top-1/2 right-0 h-[2px] w-2 bg-white/70 -translate-y-1/2" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/60" />
            </div>
          )}
        </div>
      )}

      {/* ── Hit markers ── */}
      {gs.hitMarkers.map((hm) => (
        <div key={hm.id} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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

      {/* ── Top center: Timer + Wave ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-6 py-2 border border-white/10">
          <p className="text-2xl font-bold tracking-wider tabular-nums">{timeStr}</p>
        </div>
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-500/30">
          <p className="text-xs text-orange-400 font-bold">WAVE {gs.wave}</p>
        </div>
      </div>

      {/* ── Top right: Score ── */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
        <p className="text-xs text-slate-400 uppercase tracking-wider">Score</p>
        <p className="text-2xl font-bold text-accent-cyan tabular-nums">{gs.score.toLocaleString()}</p>
        {gs.scoreMultiplier > 1 && (
          <p className="text-xs text-yellow-400 font-bold animate-pulse">x{gs.scoreMultiplier}</p>
        )}
      </div>

      {/* ── Top left: Kills/Deaths ── */}
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
            <p className="text-sm font-bold tracking-wider">{gs.streakCount} KILL STREAK</p>
          </div>
        </div>
      )}

      {/* ── Active Killstreak reward ── */}
      {gs.killstreakActive && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-600/70 to-purple-600/70 backdrop-blur-sm rounded-lg px-4 py-1 border border-blue-400/30">
            <p className="text-xs font-bold tracking-wider text-blue-200">
              {gs.killstreakActive} ({Math.ceil(gs.killstreakTimer)}s)
            </p>
          </div>
        </div>
      )}

      {/* ── Armor indicator ── */}
      {gs.armorActive && (
        <div className="absolute top-36 left-1/2 -translate-x-1/2">
          <div className="bg-blue-500/30 backdrop-blur-sm rounded px-3 py-0.5 border border-blue-400/40">
            <p className="text-[10px] font-bold text-blue-300">ARMOR ACTIVE -50% DMG</p>
          </div>
        </div>
      )}

      {/* ── Bottom right: Ammo + Weapon ── */}
      <div className="absolute bottom-6 right-6">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10 min-w-[220px]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{weapon.name}</p>
            <div className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${gs.isReloading ? 'bg-yellow-400 animate-pulse' : gs.isSwitching ? 'bg-blue-400' : 'bg-green-400'}`} />
              <p className="text-[10px] text-slate-400">
                {gs.isReloading ? 'RELOADING' : gs.isSwitching ? 'SWITCHING' : 'READY'}
              </p>
            </div>
          </div>
          {weapon.isMelee ? (
            <>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-black tabular-nums leading-none text-orange-400">∞</p>
              </div>
              {/* Katana charge bar */}
              <div className="mt-2 w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-100 ${
                    gs.katanaCharge >= 0.95 ? 'bg-red-500 animate-pulse' : 'bg-blue-400'
                  }`}
                  style={{ width: `${gs.katanaCharge * 100}%` }}
                />
              </div>
              <p className="mt-1 text-[10px] text-slate-400">
                {gs.katanaCharge >= 0.95 ? '⚡ 溜め切り準備完了' : gs.katanaCharge > 0 ? '長押しで溜め中...' : 'LMB: 斬撃 / 長押し: 溜め切り'}
              </p>
              <div className="mt-2 flex gap-1.5">
                <div className="px-1.5 py-0.5 rounded text-[9px] font-bold border bg-orange-500/20 text-orange-400 border-orange-500/30">
                  MELEE
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-black tabular-nums leading-none">
                  {gs.isReloading || gs.isSwitching ? '--' : gs.ammo}
                </p>
                <p className="text-slate-400 text-lg tabular-nums mb-0.5">/ {gs.reserve}</p>
              </div>
              {gs.isReloading && (
                <div className="mt-2 w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-cyan rounded-full transition-all duration-100"
                    style={{ width: `${gs.reloadProgress * 100}%` }}
                  />
                </div>
              )}
              <div className="mt-2 flex gap-1.5">
                <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${weapon.auto ? 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30' : 'bg-white/5 text-slate-500 border-transparent'}`}>
                  AUTO
                </div>
                <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${!weapon.auto ? 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30' : 'bg-white/5 text-slate-500 border-transparent'}`}>
                  SEMI
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Weapon selector (bottom center-right) ── */}
      <div className="absolute bottom-6 right-[260px] flex flex-col gap-1">
        {WEAPONS.map((w, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              i === gs.weaponIndex
                ? 'bg-white/15 text-white border border-white/20 scale-105'
                : 'bg-black/30 text-slate-500 border border-transparent'
            }`}
          >
            <span className="w-3 text-center text-[10px] text-slate-500">{i + 1}</span>
            <span>{w.nameJa}</span>
          </div>
        ))}
      </div>

      {/* ── Bottom left: HP + Grenade + Stance ── */}
      <div className="absolute bottom-6 left-6">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10 min-w-[200px]">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-slate-400">HEALTH</p>
            <div className="flex items-center gap-2">
              {gs.isCrouching && (
                <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded border border-blue-400/20">
                  CROUCH
                </span>
              )}
            </div>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <p className={`text-3xl font-black tabular-nums leading-none ${
              gs.hp > 60 ? 'text-white' : gs.hp > 30 ? 'text-yellow-400' : 'text-red-500 animate-pulse'
            }`}>
              {gs.hp}
            </p>
            <p className="text-slate-500 text-sm mb-0.5">/ 100</p>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                hpPercent > 0.6 ? 'bg-green-500' : hpPercent > 0.3 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${hpPercent * 100}%` }}
            />
          </div>
          {/* Grenades */}
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400">GRENADE</span>
            <div className="flex gap-1 ml-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full border ${
                    i < gs.grenades
                      ? 'bg-green-500 border-green-400'
                      : 'bg-slate-800 border-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Kill feed ── */}
      <div className="absolute top-24 right-4 space-y-1">
        {gs.killFeed.map((kf) => (
          <div key={kf.id} className="bg-black/50 backdrop-blur-sm rounded px-3 py-1 text-sm font-bold">
            <span className={
              kf.text.includes('ヘッド') ? 'text-red-400' :
              kf.text.includes('リスポ') || kf.text.includes('落下') ? 'text-slate-400' :
              kf.text.includes('WAVE') ? 'text-orange-400' :
              kf.text.includes('UAV') || kf.text.includes('アーマー') || kf.text.includes('ダブル') || kf.text.includes('NUKE') ? 'text-blue-400' :
              kf.text.includes('回収') || kf.text.includes('回復') ? 'text-green-400' :
              'text-yellow-400'
            }>
              {kf.text}
            </span>
          </div>
        ))}
      </div>

      {/* ── Low HP damage overlay ── */}
      {gs.hp < 30 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-[3px] border-red-500/20 rounded-xl" />
        </div>
      )}

      {/* ── Damage direction indicator ── */}
      {gs.damageDir !== null && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
          <div
            className="absolute left-1/2 top-0 w-4 h-12 -translate-x-1/2"
            style={{ transform: `translateX(-50%) rotate(${gs.damageDir}rad)`, transformOrigin: 'bottom center', top: '-20px' }}
          >
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[20px] border-b-red-500/70" />
          </div>
        </div>
      )}

      {/* ── Controls hint (in-game) ── */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 text-xs">
        {[
          ['WASD', '移動'],
          ['LMB', '射撃'],
          ['RMB', 'ADS'],
          ['R', 'リロード'],
          ['G', 'グレネード'],
          ['C', 'しゃがみ'],
          ['1-5', '武器'],
          ['WW', 'ダッシュ'],
          ['Esc', 'ポーズ'],
        ].map(([key, label]) => (
          <div key={key} className="flex items-center gap-1">
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] font-bold text-white/70 min-w-[1.5rem] text-center">
              {key}
            </span>
            <span className="text-slate-500 text-[10px]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
