'use client';

import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { HUD } from './HUD';
import { Minimap } from './Minimap';

/* ═══════════════════════════════════════════════════════════
   Audio System (Web Audio API – procedural, no external files)
   ═══════════════════════════════════════════════════════════ */
let _audioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext {
  if (!_audioCtx) _audioCtx = new AudioContext();
  if (_audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

// Shared noise buffer (created once, reused)
let _noiseBuf: AudioBuffer | null = null;
function getNoiseBuf(): AudioBuffer {
  const ctx = getAudioCtx();
  if (!_noiseBuf || _noiseBuf.sampleRate !== ctx.sampleRate) {
    const len = Math.floor(ctx.sampleRate * 0.8);
    _noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = _noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  return _noiseBuf;
}

type SoundType = 'ar' | 'smg' | 'shotgun' | 'sniper' | 'explosion' | 'enemyHit' | 'playerHit' | 'reload' | 'footstep' | 'dryfire';

function playGunSound(type: SoundType) {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    // Master gain
    const master = ctx.createGain();
    master.connect(ctx.destination);

    if (type === 'ar') {
      // Assault rifle: sharp crack + low thump, medium duration
      const nSrc = ctx.createBufferSource(); nSrc.buffer = getNoiseBuf();
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 800; hp.Q.value = 0.5;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 4000;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.22, now);
      g.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      nSrc.connect(hp); hp.connect(lp); lp.connect(g); g.connect(master);
      // Sub bass thump via oscillator
      const osc = ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = 80;
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.15, now);
      og.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(og); og.connect(master);
      osc.start(now); osc.stop(now + 0.12);
      nSrc.start(now); nSrc.stop(now + 0.15);
    } else if (type === 'smg') {
      // SMG: higher pitch, snappier, shorter
      const nSrc = ctx.createBufferSource(); nSrc.buffer = getNoiseBuf();
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2500; bp.Q.value = 1.0;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.16, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      nSrc.connect(bp); bp.connect(g); g.connect(master);
      const osc = ctx.createOscillator(); osc.type = 'square'; osc.frequency.value = 150;
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.08, now);
      og.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.connect(og); og.connect(master);
      osc.start(now); osc.stop(now + 0.05);
      nSrc.start(now); nSrc.stop(now + 0.06);
    } else if (type === 'shotgun') {
      // Shotgun: heavy boom, deep bass, long sustain
      const nSrc = ctx.createBufferSource(); nSrc.buffer = getNoiseBuf();
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800;
      const dist = ctx.createWaveShaper();
      const curve = new Float32Array(256);
      for (let i = 0; i < 256; i++) { const x = (i / 128) - 1; curve[i] = Math.tanh(x * 3); }
      dist.curve = curve;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.35, now);
      g.gain.exponentialRampToValueAtTime(0.08, now + 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      nSrc.connect(lp); lp.connect(dist); dist.connect(g); g.connect(master);
      // Deep bass
      const osc = ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = 55;
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.25, now);
      og.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(og); og.connect(master);
      osc.start(now); osc.stop(now + 0.3);
      nSrc.start(now); nSrc.stop(now + 0.35);
    } else if (type === 'sniper') {
      // Sniper: LOUD crack + supersonic whip sound + echoing tail
      const nSrc = ctx.createBufferSource(); nSrc.buffer = getNoiseBuf();
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 600;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 6000;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.40, now);
      g.gain.exponentialRampToValueAtTime(0.12, now + 0.04);
      g.gain.exponentialRampToValueAtTime(0.02, now + 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      nSrc.connect(hp); hp.connect(lp); lp.connect(g); g.connect(master);
      // Supersonic crack (high-freq transient)
      const crack = ctx.createOscillator(); crack.type = 'sawtooth';
      crack.frequency.setValueAtTime(3000, now);
      crack.frequency.exponentialRampToValueAtTime(200, now + 0.08);
      const cg = ctx.createGain();
      cg.gain.setValueAtTime(0.18, now);
      cg.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      crack.connect(cg); cg.connect(master);
      // Bass body
      const osc = ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = 65;
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.20, now);
      og.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(og); og.connect(master);
      crack.start(now); crack.stop(now + 0.12);
      osc.start(now); osc.stop(now + 0.5);
      nSrc.start(now); nSrc.stop(now + 0.55);
    } else if (type === 'explosion') {
      // Explosion: massive bass + rumble + noise
      const nSrc = ctx.createBufferSource(); nSrc.buffer = getNoiseBuf();
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 600;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.45, now);
      g.gain.exponentialRampToValueAtTime(0.15, now + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      nSrc.connect(lp); lp.connect(g); g.connect(master);
      const osc = ctx.createOscillator(); osc.type = 'sine';
      osc.frequency.setValueAtTime(40, now);
      osc.frequency.exponentialRampToValueAtTime(20, now + 0.5);
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.35, now);
      og.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(og); og.connect(master);
      osc.start(now); osc.stop(now + 0.8);
      nSrc.start(now); nSrc.stop(now + 0.9);
    } else if (type === 'enemyHit') {
      // Enemy hit: meaty thud
      const osc = ctx.createOscillator(); osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.12, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(g); g.connect(master);
      osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'playerHit') {
      // Player hit: low punch + heartbeat-like thump
      const osc = ctx.createOscillator(); osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.25, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(g); g.connect(master);
      // Second beat
      const osc2 = ctx.createOscillator(); osc2.type = 'sine';
      osc2.frequency.value = 60;
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.0, now);
      g2.gain.setValueAtTime(0.15, now + 0.15);
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc2.connect(g2); g2.connect(master);
      osc.start(now); osc.stop(now + 0.15);
      osc2.start(now); osc2.stop(now + 0.35);
    } else if (type === 'reload') {
      // Reload: metallic click-clack
      const nSrc = ctx.createBufferSource(); nSrc.buffer = getNoiseBuf();
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 3000; bp.Q.value = 3;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.10, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      nSrc.connect(bp); bp.connect(g); g.connect(master);
      // Second click
      const nSrc2 = ctx.createBufferSource(); nSrc2.buffer = getNoiseBuf();
      const bp2 = ctx.createBiquadFilter(); bp2.type = 'bandpass'; bp2.frequency.value = 4000; bp2.Q.value = 4;
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.0, now);
      g2.gain.setValueAtTime(0.12, now + 0.15);
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
      nSrc2.connect(bp2); bp2.connect(g2); g2.connect(master);
      nSrc.start(now); nSrc.stop(now + 0.05);
      nSrc2.start(now); nSrc2.stop(now + 0.25);
    } else if (type === 'footstep') {
      // Footstep: subtle low thud
      const nSrc = ctx.createBufferSource(); nSrc.buffer = getNoiseBuf();
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 400;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.04, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      nSrc.connect(lp); lp.connect(g); g.connect(master);
      nSrc.start(now); nSrc.stop(now + 0.08);
    } else if (type === 'dryfire') {
      // Dry fire: empty click
      const osc = ctx.createOscillator(); osc.type = 'square'; osc.frequency.value = 1200;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.06, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      osc.connect(g); g.connect(master);
      osc.start(now); osc.stop(now + 0.03);
    }
  } catch { /* audio not supported – silent fallback */ }
}

/* ═══════════════════════════════════════════════════════════
   Error Boundary
   ═══════════════════════════════════════════════════════════ */
interface EBProps { children: ReactNode; onError?: (msg: string) => void }
interface EBState { hasError: boolean; error: Error | null }
class GLBErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('[FPS] GLB/WebGL error:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black">
          <div className="text-center max-w-lg">
            <p className="text-xl mb-4">3Dモデルの読み込みに失敗しました</p>
            <p className="text-sm text-gray-400 mb-4 break-all">{this.state.error?.message || 'Unknown error'}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600 rounded-lg mr-2">リトライ</button>
            <button onClick={() => window.history.back()} className="px-6 py-2 bg-gray-600 rounded-lg">戻る</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ═══════════════════════════════════════════════════════════
   Weapon Definitions (with per-weapon ballistics)
   ═══════════════════════════════════════════════════════════ */
export interface WeaponDef {
  name: string;
  nameJa: string;
  fireRate: number;
  damage: number;
  magSize: number;
  totalAmmo: number;
  reloadTime: number;
  spread: number;
  adsSpread: number;
  adsFov: number;
  bulletsPerShot: number;
  auto: boolean;
  bulletSpeed: number;
  range: number;
  damageDropoffStart: number;
  damageDropoffEnd: number;
  minDamageMult: number;
  headshotMult: number;
  moveSpeedMult: number;
}

export const WEAPONS: WeaponDef[] = [
  {
    name: 'Assault Rifle', nameJa: 'アサルトライフル',
    fireRate: 0.1, damage: 30, magSize: 30, totalAmmo: 210, reloadTime: 1.5,
    spread: 0.025, adsSpread: 0.006, adsFov: 55, bulletsPerShot: 1, auto: true,
    bulletSpeed: 150, range: 200, damageDropoffStart: 25, damageDropoffEnd: 80,
    minDamageMult: 0.5, headshotMult: 2.0, moveSpeedMult: 0.95,
  },
  {
    name: 'SMG', nameJa: 'サブマシンガン',
    fireRate: 0.055, damage: 20, magSize: 40, totalAmmo: 320, reloadTime: 1.1,
    spread: 0.035, adsSpread: 0.015, adsFov: 58, bulletsPerShot: 1, auto: true,
    bulletSpeed: 130, range: 80, damageDropoffStart: 12, damageDropoffEnd: 40,
    minDamageMult: 0.35, headshotMult: 1.8, moveSpeedMult: 1.05,
  },
  {
    name: 'Shotgun', nameJa: 'ショットガン',
    fireRate: 0.8, damage: 18, magSize: 8, totalAmmo: 48, reloadTime: 1.8,
    spread: 0.12, adsSpread: 0.08, adsFov: 62, bulletsPerShot: 10, auto: false,
    bulletSpeed: 90, range: 25, damageDropoffStart: 5, damageDropoffEnd: 18,
    minDamageMult: 0.08, headshotMult: 2.0, moveSpeedMult: 0.9,
  },
  {
    name: 'Sniper Rifle', nameJa: 'スナイパーライフル',
    fireRate: 1.2, damage: 90, magSize: 5, totalAmmo: 30, reloadTime: 2.5,
    spread: 0.015, adsSpread: 0.0005, adsFov: 30, bulletsPerShot: 1, auto: false,
    bulletSpeed: 350, range: 500, damageDropoffStart: 100, damageDropoffEnd: 400,
    minDamageMult: 0.85, headshotMult: 3.5, moveSpeedMult: 0.85,
  },
];

/* ═══════════════════════════════════════════════════════════
   GLB preloads (KHR_mesh_quantization – natively supported by Three.js)
   ═══════════════════════════════════════════════════════════ */
const MODEL_PATHS = {
  ar: '/models/fps/ar.glb',
  smg: '/models/fps/smg.glb',
  shotgun: '/models/fps/shotgun.glb',
  sniper: '/models/fps/sniper.glb',
  enemy: '/models/fps/enemy.glb',
  enemy2: '/models/fps/enemy2.glb',
  crate: '/models/fps/crate.glb',
  barricade: '/models/fps/barricade.glb',
  barricade2: '/models/fps/barricade2.glb',
};
Object.values(MODEL_PATHS).forEach((p) => useGLTF.preload(p));

/* ═══════════════════════════════════════════════════════════
   GLB model helpers
   ═══════════════════════════════════════════════════════════ */
/* Direct colors for models (baseColorTextures are greyscale in linear ~0.03,
   so we REPLACE the map entirely and use bright material colors instead) */
const MODEL_COLORS: Record<string, { color: THREE.Color; metalness: number; roughness: number }> = {
  [MODEL_PATHS.ar]:        { color: new THREE.Color(0.22, 0.22, 0.24), metalness: 0.6, roughness: 0.35 },  // gunmetal
  [MODEL_PATHS.smg]:       { color: new THREE.Color(0.18, 0.18, 0.22), metalness: 0.65, roughness: 0.3 },  // blued steel
  [MODEL_PATHS.shotgun]:   { color: new THREE.Color(0.45, 0.28, 0.12), metalness: 0.15, roughness: 0.65 }, // wood/brown
  [MODEL_PATHS.sniper]:    { color: new THREE.Color(0.15, 0.2, 0.12),  metalness: 0.4, roughness: 0.45 },  // dark olive
  [MODEL_PATHS.enemy]:     { color: new THREE.Color(0.55, 0.45, 0.3),  metalness: 0.05, roughness: 0.8 },  // desert khaki
  [MODEL_PATHS.enemy2]:    { color: new THREE.Color(0.3, 0.4, 0.25),   metalness: 0.05, roughness: 0.8 },  // camo green
  [MODEL_PATHS.crate]:     { color: new THREE.Color(0.6, 0.42, 0.2),   metalness: 0.0, roughness: 0.9 },   // wooden crate
  [MODEL_PATHS.barricade]: { color: new THREE.Color(0.55, 0.52, 0.45), metalness: 0.0, roughness: 0.95 },  // concrete
  [MODEL_PATHS.barricade2]:{ color: new THREE.Color(0.5, 0.45, 0.38),  metalness: 0.0, roughness: 0.95 },  // concrete warm
};

function useClonedGLTF(path: string, targetSize: number) {
  const gltf = useGLTF(path);
  return useMemo(() => {
    const clone = gltf.scene.clone(true);
    const preset = MODEL_COLORS[path] || { color: new THREE.Color(0.5, 0.5, 0.5), metalness: 0.1, roughness: 0.7 };
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const fixMat = (m: THREE.Material): THREE.Material => {
          const orig = m as THREE.MeshStandardMaterial;
          // Create fresh material - the GLB baseColorTextures are greyscale
          // (sRGB ~50/255 → linear ~0.03) so they render near-black.
          // We replace with direct color + keep normalMap for surface detail.
          const mat = new THREE.MeshStandardMaterial({
            color: preset.color,
            metalness: preset.metalness,
            roughness: preset.roughness,
            normalMap: orig.normalMap || null,
            normalScale: orig.normalScale ? orig.normalScale.clone() : new THREE.Vector2(1, 1),
            side: THREE.DoubleSide,
            envMapIntensity: 1.0,
          });
          return mat;
        };
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map(fixMat);
        } else {
          mesh.material = fixMat(mesh.material);
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) clone.scale.multiplyScalar(targetSize / maxDim);
    const box2 = new THREE.Box3().setFromObject(clone);
    const center = box2.getCenter(new THREE.Vector3());
    clone.position.set(-center.x, -box2.min.y, -center.z);
    return clone;
  }, [gltf.scene, targetSize]);
}

/* ═══════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════ */
const MOVE_SPEED = 7;
const SPRINT_SPEED = 12;
const CROUCH_SPEED = 5;
const GRAVITY = -30;
const JUMP_VEL = 10;
const MOUSE_SENS = 0.002;
const ADS_SENS = 0.001;
const PLAYER_HEIGHT = 1.7;
const CROUCH_HEIGHT = 0.9;
const PLAYER_RADIUS = 0.4;
const NORMAL_FOV = 75;
const ENEMY_SPEED = 2.0;
const ENEMY_HP = 100;
const HEAD_HITBOX_RADIUS = 0.45;
const BODY_HITBOX_RADIUS = 0.75;
const HEAD_CENTER_Y = 1.4;
const BODY_CENTER_Y = 0.7;
const ENEMY_SPAWN_INTERVAL = 4;
const MAX_ENEMIES = 12;
const MATCH_TIME = 180;
const ENEMY_FIRE_RATE = 1.2;
const ENEMY_DAMAGE = 8;
const PLAYER_MAX_HP = 100;
const HP_REGEN_DELAY = 4;
const HP_REGEN_RATE = 20;
const MAP_SIZE = 50;
const WEAPON_SWITCH_TIME = 0.25;
const GRENADE_MAX = 4;
const GRENADE_FUSE = 3.0;
const GRENADE_RADIUS = 7;
const GRENADE_DAMAGE = 250;
const GRENADE_SPEED = 18;
const FALL_DAMAGE_THRESHOLD = 4;
const FALL_DAMAGE_MULT = 10;
const WAVE_INTERVAL = 30;

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */
interface Bullet {
  id: number;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  isEnemy: boolean;
  origin: THREE.Vector3;
  weaponIdx: number;
}

interface Enemy {
  id: number;
  pos: THREE.Vector3;
  hp: number;
  maxHp: number;
  vel: THREE.Vector3;
  lastFire: number;
  state: 'patrol' | 'chase' | 'flank' | 'cover' | 'retreat' | 'dead';
  deathTime: number;
  patrolTarget: THREE.Vector3;
  mesh: THREE.Group | null;
  lookDir: THREE.Vector3;
  coverTimer: number;       // time remaining in cover
  lastStateChange: number;  // when state last changed
  accuracy: number;         // individual accuracy multiplier (0.5-1.5)
  strafeDir: number;        // strafe direction for flanking (-1 or 1)
}

interface Grenade {
  id: number;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  timer: number;
}

interface Pickup {
  id: number;
  pos: THREE.Vector3;
  type: 'ammo' | 'health' | 'grenade';
  life: number;
}

interface HitMarker {
  id: number;
  time: number;
  headshot: boolean;
}

interface DamageNumber {
  id: number;
  pos: THREE.Vector3;
  damage: number;
  headshot: boolean;
  time: number;
}

interface KillFeed {
  id: number;
  text: string;
  time: number;
}

export interface GameState {
  phase: 'menu' | 'playing' | 'paused' | 'gameover';
  kills: number;
  deaths: number;
  score: number;
  hp: number;
  ammo: number;
  reserve: number;
  isReloading: boolean;
  reloadProgress: number;
  isADS: boolean;
  isSprinting: boolean;
  isCrouching: boolean;
  timeLeft: number;
  hitMarkers: HitMarker[];
  killFeed: KillFeed[];
  damageDir: number | null;
  streakCount: number;
  playerPos: { x: number; z: number };
  playerYaw: number;
  enemyPositions: { x: number; z: number }[];
  weaponIndex: number;
  weaponName: string;
  isSwitching: boolean;
  grenades: number;
  screenShake: number;
  wave: number;
  killstreakActive: string | null;
  killstreakTimer: number;
  scoreMultiplier: number;
  armorActive: boolean;
  waveAnnounce: number;  // wave number being announced (0 = no announce)
  waveAnnounceTime: number;  // timestamp when wave announced
}

/* ═══════════════════════════════════════════════════════════
   Map geometry
   ═══════════════════════════════════════════════════════════ */
interface BoxDef {
  pos: [number, number, number];
  size: [number, number, number];
}

const BUILDINGS: BoxDef[] = [
  { pos: [0, 2.5, 0], size: [8, 5, 8] },
  { pos: [-18, 2, -18], size: [10, 4, 10] },
  { pos: [18, 2, -18], size: [10, 4, 10] },
  { pos: [-18, 2, 18], size: [10, 4, 10] },
  { pos: [18, 2, 18], size: [10, 4, 10] },
  { pos: [-10, 1.5, 0], size: [1, 3, 12] },
  { pos: [10, 1.5, 0], size: [1, 3, 12] },
  { pos: [0, 1.5, -10], size: [12, 3, 1] },
  { pos: [0, 1.5, 10], size: [12, 3, 1] },
  { pos: [-20, 1, 0], size: [6, 2, 4] },
  { pos: [20, 1, 0], size: [6, 2, 4] },
];

const CRATE_POSITIONS: [number, number, number][] = [
  [-5, 0.6, -5], [5, 0.6, -5], [-5, 0.6, 5], [5, 0.6, 5],
  [-14, 0.6, 8], [14, 0.6, -8],
  [12, 0.6, 12], [-12, 0.6, -12], [0, 0.6, -22], [-22, 0.6, 15],
  [7, 0.6, -18], [-3, 0.6, 22], [25, 0.6, 10], [-25, 0.6, -10],
  [30, 0.6, -25], [-30, 0.6, 25], [0, 0.6, 30], [0, 0.6, -35],
];

const BARRICADE_DEFS: { pos: [number, number, number]; rot: number }[] = [
  { pos: [8, 0, 15], rot: 0 },
  { pos: [-8, 0, -15], rot: Math.PI },
  { pos: [15, 0, 8], rot: Math.PI / 2 },
  { pos: [-15, 0, -8], rot: -Math.PI / 2 },
  { pos: [25, 0, 0], rot: Math.PI / 4 },
  { pos: [-25, 0, 0], rot: -Math.PI / 4 },
  { pos: [0, 0, 28], rot: 0 },
  { pos: [0, 0, -28], rot: Math.PI },
  { pos: [22, 0, -22], rot: Math.PI / 3 },
  { pos: [-22, 0, 22], rot: -Math.PI / 3 },
  { pos: [35, 0, 15], rot: Math.PI / 6 },
  { pos: [-35, 0, -15], rot: -Math.PI / 6 },
];

/* ── Collision helpers ── */
function makeBox(pos: [number, number, number], size: [number, number, number]): THREE.Box3 {
  return new THREE.Box3(
    new THREE.Vector3(pos[0] - size[0] / 2, pos[1] - size[1] / 2, pos[2] - size[2] / 2),
    new THREE.Vector3(pos[0] + size[0] / 2, pos[1] + size[1] / 2, pos[2] + size[2] / 2),
  );
}

const CRATE_SIZE = 1.2;
const buildingBoxes = BUILDINGS.map((b) => makeBox(b.pos, b.size));
const crateBoxes = CRATE_POSITIONS.map((p) => makeBox(p, [CRATE_SIZE, CRATE_SIZE, CRATE_SIZE]));
const barricadeBoxes = BARRICADE_DEFS.map((b) => {
  const w = 3.0;
  return makeBox([b.pos[0], 0.5, b.pos[2]], [w, 1, w]);
});
const allCollisionBoxes = [...buildingBoxes, ...crateBoxes, ...barricadeBoxes];

function collidesWithBuildings(pos: THREE.Vector3, radius: number): boolean {
  const sphere = new THREE.Sphere(pos, radius);
  return allCollisionBoxes.some((box) => box.intersectsSphere(sphere));
}

function clampToMap(v: THREE.Vector3) {
  v.x = Math.max(-MAP_SIZE + 1, Math.min(MAP_SIZE - 1, v.x));
  v.z = Math.max(-MAP_SIZE + 1, Math.min(MAP_SIZE - 1, v.z));
}

function findFloorY(x: number, z: number, currentY: number, radius: number): number {
  let floorY = 0;
  for (const box of allCollisionBoxes) {
    const inX = x + radius > box.min.x && x - radius < box.max.x;
    const inZ = z + radius > box.min.z && z - radius < box.max.z;
    if (inX && inZ && box.max.y <= currentY + 0.3 && box.max.y > floorY) {
      floorY = box.max.y;
    }
  }
  return floorY;
}

function hitsCeiling(x: number, z: number, headY: number, radius: number): number | null {
  for (const box of allCollisionBoxes) {
    const inX = x + radius > box.min.x && x - radius < box.max.x;
    const inZ = z + radius > box.min.z && z - radius < box.max.z;
    if (inX && inZ && headY >= box.min.y && headY - 0.5 < box.min.y) {
      return box.min.y;
    }
  }
  return null;
}

function calcDamage(baseDmg: number, dist: number, weapon: WeaponDef): number {
  if (dist <= weapon.damageDropoffStart) return baseDmg;
  if (dist >= weapon.damageDropoffEnd) return baseDmg * weapon.minDamageMult;
  const t = (dist - weapon.damageDropoffStart) / (weapon.damageDropoffEnd - weapon.damageDropoffStart);
  return baseDmg * (1 - t * (1 - weapon.minDamageMult));
}

/* ═══════════════════════════════════════════════════════════
   Map component
   ═══════════════════════════════════════════════════════════ */
function CrateModel({ position }: { position: [number, number, number] }) {
  const model = useClonedGLTF(MODEL_PATHS.crate, 1.2);
  return <primitive object={model} position={position} castShadow receiveShadow />;
}

function BarricadeModel({ position, rotation = 0, variant = 0 }: { position: [number, number, number]; rotation?: number; variant?: number }) {
  const model = useClonedGLTF(variant === 0 ? MODEL_PATHS.barricade : MODEL_PATHS.barricade2, 2.0);
  return <primitive object={model} position={position} rotation={[0, rotation, 0]} castShadow receiveShadow />;
}

function GameMap() {
  const groundTex = useLoader(THREE.TextureLoader, '/images/fps/ground.png');
  const wallTex = useLoader(THREE.TextureLoader, '/images/fps/wall.png');
  groundTex.wrapS = groundTex.wrapT = THREE.RepeatWrapping;
  groundTex.repeat.set(20, 20);
  wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping;
  wallTex.repeat.set(2, 2);
  // Reduce visual contrast on textures to minimize motion sickness
  groundTex.colorSpace = THREE.SRGBColorSpace;
  wallTex.colorSpace = THREE.SRGBColorSpace;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[MAP_SIZE * 2, MAP_SIZE * 2]} />
        <meshStandardMaterial map={groundTex} roughness={0.9} />
      </mesh>
      {([
        { p: [0, 2, -MAP_SIZE] as [number, number, number], s: [MAP_SIZE * 2, 4, 0.5] as [number, number, number] },
        { p: [0, 2, MAP_SIZE] as [number, number, number], s: [MAP_SIZE * 2, 4, 0.5] as [number, number, number] },
        { p: [-MAP_SIZE, 2, 0] as [number, number, number], s: [0.5, 4, MAP_SIZE * 2] as [number, number, number] },
        { p: [MAP_SIZE, 2, 0] as [number, number, number], s: [0.5, 4, MAP_SIZE * 2] as [number, number, number] },
      ]).map((w, i) => (
        <mesh key={`wall-${i}`} position={w.p} castShadow receiveShadow>
          <boxGeometry args={w.s} />
          <meshStandardMaterial map={wallTex} roughness={0.95} />
        </mesh>
      ))}
      {BUILDINGS.map((b, i) => (
        <mesh key={`bld-${i}`} position={b.pos} castShadow receiveShadow>
          <boxGeometry args={b.size} />
          <meshStandardMaterial map={wallTex} roughness={0.9} />
        </mesh>
      ))}
      <Suspense fallback={null}>
        {CRATE_POSITIONS.map((pos, i) => (
          <CrateModel key={`crate-${i}`} position={pos} />
        ))}
      </Suspense>
      <Suspense fallback={null}>
        {BARRICADE_DEFS.map((b, i) => (
          <BarricadeModel key={`barr-${i}`} position={b.pos} rotation={b.rot} variant={i % 2} />
        ))}
      </Suspense>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   Sky dome
   ═══════════════════════════════════════════════════════════ */
function SkyDome() {
  const tex = useLoader(THREE.TextureLoader, '/images/fps/sky.png');
  return (
    <mesh>
      <sphereGeometry args={[300, 32, 16]} />
      <meshBasicMaterial map={tex} side={THREE.BackSide} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════
   Procedural environment map for PBR reflections
   ═══════════════════════════════════════════════════════════ */
function ProceduralEnvMap() {
  const { scene, gl } = useThree();
  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    // Create a simple gradient scene for reflections
    const envScene = new THREE.Scene();
    // Sky gradient
    const topColor = new THREE.Color(0.5, 0.7, 1.0);    // light blue sky
    const midColor = new THREE.Color(0.85, 0.82, 0.75);  // warm horizon
    const botColor = new THREE.Color(0.45, 0.42, 0.35);  // ground
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, `rgb(${topColor.r * 255},${topColor.g * 255},${topColor.b * 255})`);
    grad.addColorStop(0.45, `rgb(${midColor.r * 255},${midColor.g * 255},${midColor.b * 255})`);
    grad.addColorStop(0.55, `rgb(${midColor.r * 255},${midColor.g * 255},${midColor.b * 255})`);
    grad.addColorStop(1.0, `rgb(${botColor.r * 255},${botColor.g * 255},${botColor.b * 255})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 128);
    // Add some brightness variation (fake sun)
    const sunGrad = ctx.createRadialGradient(190, 25, 0, 190, 25, 50);
    sunGrad.addColorStop(0, 'rgba(255,240,200,0.6)');
    sunGrad.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, 256, 128);
    const tex = new THREE.CanvasTexture(canvas);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    const envMap = pmremGenerator.fromEquirectangular(tex).texture;
    scene.environment = envMap;
    tex.dispose();
    pmremGenerator.dispose();
    return () => { scene.environment = null; envMap.dispose(); };
  }, [scene, gl]);
  return null;
}

/* ═══════════════════════════════════════════════════════════
   First-person weapon models (camera-local space)
   ═══════════════════════════════════════════════════════════ */
function WeaponModel({
  weaponIndex, isADS, isFiring, isReloading, isSwitching, isMoving,
}: {
  weaponIndex: number; isADS: boolean; isFiring: boolean;
  isReloading: boolean; isSwitching: boolean; isMoving: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const bobTime = useRef(0);
  const recoilRef = useRef(0);
  const switchOffsetRef = useRef(0);
  const muzzleTex = useLoader(THREE.TextureLoader, '/images/fps/muzzle.png');

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.05);
    if (isMoving) bobTime.current += dt * 5;
    const bob = isMoving ? Math.sin(bobTime.current) * 0.002 : 0;
    const sway = isMoving ? Math.cos(bobTime.current * 0.5) * 0.001 : 0;
    if (isFiring) recoilRef.current = Math.min(recoilRef.current + dt * 40, 1);
    else recoilRef.current = Math.max(recoilRef.current - dt * 15, 0);
    const recoil = recoilRef.current * 0.025;
    if (isSwitching) switchOffsetRef.current = Math.min(switchOffsetRef.current + dt * 10, 1);
    else switchOffsetRef.current = Math.max(switchOffsetRef.current - dt * 10, 0);
    const switchDrop = switchOffsetRef.current * 0.3;
    const target = isADS
      ? new THREE.Vector3(0.0, -0.13, -0.35 + recoil)
      : new THREE.Vector3(0.28 + sway, -0.23 + bob - switchDrop, -0.55 + recoil);
    groupRef.current.position.lerp(target, dt * (isADS ? 22 : 16));
    if (isReloading) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.5, dt * 8);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, dt * 12);
    }
  });

  return (
    <group ref={groupRef} position={[0.28, -0.23, -0.55]}>
      {weaponIndex === 0 && <GLBWeapon path={MODEL_PATHS.ar} isFiring={isFiring} muzzleTex={muzzleTex} muzzlePos={[0, 0.01, -0.3]} />}
      {weaponIndex === 1 && <GLBWeapon path={MODEL_PATHS.smg} isFiring={isFiring} muzzleTex={muzzleTex} muzzlePos={[0, 0.005, -0.25]} />}
      {weaponIndex === 2 && <GLBWeapon path={MODEL_PATHS.shotgun} isFiring={isFiring} muzzleTex={muzzleTex} muzzlePos={[0, 0.015, -0.35]} flashSize={0.18} />}
      {weaponIndex === 3 && <GLBWeapon path={MODEL_PATHS.sniper} isFiring={isFiring} muzzleTex={muzzleTex} muzzlePos={[0, 0.01, -0.38]} />}
    </group>
  );
}

function GLBWeapon({
  path, isFiring, muzzleTex, muzzlePos = [0, 0.01, -0.3], flashSize = 0.12,
}: {
  path: string; isFiring: boolean; muzzleTex: THREE.Texture;
  muzzlePos?: [number, number, number]; flashSize?: number;
}) {
  const model = useClonedGLTF(path, 0.5);
  return (
    <group>
      <primitive object={model} position={[0, -0.06, 0]} rotation={[0, -Math.PI / 2, 0]} />
      {isFiring && (
        <>
          <pointLight position={muzzlePos} color="#fbbf24" intensity={8} distance={3} />
          <mesh position={muzzlePos}>
            <planeGeometry args={[flashSize, flashSize]} />
            <meshBasicMaterial map={muzzleTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </>
      )}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   Enemy mesh
   ═══════════════════════════════════════════════════════════ */
function EnemyMesh({ enemy, modelPath }: { enemy: Enemy; modelPath: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const hpBarRef = useRef<THREE.Group>(null);
  const model = useClonedGLTF(modelPath, 1.6);
  const { camera } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.copy(enemy.pos);
    if (enemy.lookDir.lengthSq() > 0.01) {
      groupRef.current.rotation.y = Math.atan2(enemy.lookDir.x, enemy.lookDir.z);
    }
    if (enemy.state === 'dead') {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -Math.PI / 2, 0.1);
      groupRef.current.position.y = Math.max(0.2, groupRef.current.position.y - 0.05);
    }
    // HP bar always faces camera (billboard)
    if (hpBarRef.current) {
      hpBarRef.current.lookAt(camera.position);
    }
  });

  useEffect(() => {
    if (groupRef.current) enemy.mesh = groupRef.current;
  }, [enemy]);

  useEffect(() => {
    if (!model) return;
    const op = enemy.state === 'dead' ? 0.4 : 1;
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat) { mat.transparent = true; mat.opacity = op; }
      }
    });
  }, [enemy.state, model]);

  const hpRatio = enemy.hp / enemy.maxHp;
  const hpColor = hpRatio > 0.6 ? '#22c55e' : hpRatio > 0.3 ? '#eab308' : '#ef4444';

  return (
    <group ref={groupRef}>
      <primitive object={model} />
      {enemy.state !== 'dead' && (
        <group ref={hpBarRef} position={[0, 2.0, 0]}>
          {/* HP bar background */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.8, 0.08]} />
            <meshBasicMaterial color="#1c1917" transparent opacity={0.8} />
          </mesh>
          {/* HP bar fill */}
          <mesh position={[(hpRatio - 1) * 0.4, 0, 0.001]}>
            <planeGeometry args={[hpRatio * 0.8, 0.08]} />
            <meshBasicMaterial color={hpColor} />
          </mesh>
          {/* HP number - sprite */}
        </group>
      )}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   Bullet tracer
   ═══════════════════════════════════════════════════════════ */
function BulletTracer({ bullet }: { bullet: Bullet }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) meshRef.current.position.copy(bullet.pos);
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.03, 4, 4]} />
      <meshBasicMaterial color={bullet.isEnemy ? '#ef4444' : '#fbbf24'} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════
   Grenade visual
   ═══════════════════════════════════════════════════════════ */
function GrenadeVisual({ grenade }: { grenade: Grenade }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.position.copy(grenade.pos);
      meshRef.current.rotation.x += 5 * Math.min(delta, 0.05);
      meshRef.current.rotation.z += 2.5 * Math.min(delta, 0.05);
    }
  });
  const urgent = grenade.timer < 1;
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.12, 8, 8]} />
      <meshStandardMaterial
        color={urgent ? '#ef4444' : '#4a5568'}
        emissive={urgent ? '#ef4444' : '#000000'}
        emissiveIntensity={urgent ? 0.5 : 0}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════
   Pickup visual
   ═══════════════════════════════════════════════════════════ */
function PickupVisual({ pickup }: { pickup: Pickup }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.position.set(pickup.pos.x, pickup.pos.y + 0.5 + Math.sin(Date.now() / 500) * 0.15, pickup.pos.z);
      meshRef.current.rotation.y += delta * 2;
    }
  });
  const color = pickup.type === 'ammo' ? '#fbbf24' : pickup.type === 'health' ? '#22c55e' : '#3b82f6';
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════
   Explosion effect
   ═══════════════════════════════════════════════════════════ */
function ExplosionEffect({ position, startTime }: { position: THREE.Vector3; startTime: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    const elapsed = Date.now() / 1000 - startTime;
    const scale = Math.min(elapsed * 15, GRENADE_RADIUS);
    meshRef.current.scale.setScalar(scale);
    const opacity = Math.max(0, 1 - elapsed * 2);
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    if (lightRef.current) lightRef.current.intensity = opacity * 20;
    if (elapsed > 1) {
      meshRef.current.visible = false;
      if (lightRef.current) lightRef.current.intensity = 0;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight ref={lightRef} color="#ff4400" intensity={20} distance={15} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   Damage number floating sprite
   ═══════════════════════════════════════════════════════════ */
function DamageNumberSprite({ dn }: { dn: DamageNumber }) {
  const ref = useRef<THREE.Sprite>(null);
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 192;
    canvas.height = 96;
    const ctx = canvas.getContext('2d')!;
    const dmgText = Math.round(dn.damage).toString();
    ctx.font = `bold ${dn.headshot ? 56 : 44}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.strokeText(dmgText, 96, dn.headshot ? 36 : 48);
    ctx.fillStyle = dn.headshot ? '#ff3333' : '#ffcc00';
    ctx.fillText(dmgText, 96, dn.headshot ? 36 : 48);
    if (dn.headshot) {
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = '#ff5555';
      ctx.strokeText('HEADSHOT', 96, 72);
      ctx.fillText('HEADSHOT', 96, 72);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [dn.damage, dn.headshot]);

  useEffect(() => {
    return () => { texture.dispose(); };
  }, [texture]);

  useFrame(() => {
    if (!ref.current) return;
    const elapsed = Date.now() / 1000 - dn.time;
    const jitterX = Math.sin(dn.id * 7.3) * 0.3;
    const jitterZ = Math.cos(dn.id * 5.1) * 0.3;
    ref.current.position.set(
      dn.pos.x + jitterX,
      dn.pos.y + 1.8 + elapsed * 2.0,
      dn.pos.z + jitterZ,
    );
    const scale = dn.headshot ? 1.8 : 1.2;
    ref.current.scale.set(scale, scale * 0.5, 1);
    (ref.current.material as THREE.SpriteMaterial).opacity = Math.max(0, 1 - elapsed * 1.5);
  });

  return (
    <sprite ref={ref}>
      <spriteMaterial map={texture} transparent depthWrite={false} sizeAttenuation />
    </sprite>
  );
}

/* ═══════════════════════════════════════════════════════════
   Game Loop (inside Canvas)
   ═══════════════════════════════════════════════════════════ */
function GameLoop({
  gameState,
  setGameState,
}: {
  gameState: React.MutableRefObject<GameState>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}) {
  const { camera, gl } = useThree();
  const playerPos = useRef(new THREE.Vector3(0, PLAYER_HEIGHT, 20));
  const playerVel = useRef(new THREE.Vector3());
  const yaw = useRef(0);
  const pitch = useRef(0);
  const keys = useRef<Set<string>>(new Set());
  const bullets = useRef<Bullet[]>([]);
  const enemies = useRef<Enemy[]>([]);
  const grenadesRef = useRef<Grenade[]>([]);
  const pickupsRef = useRef<Pickup[]>([]);
  const explosionsRef = useRef<{ id: number; pos: THREE.Vector3; time: number }[]>([]);
  const bulletId = useRef(0);
  const enemyId = useRef(0);
  const lastFire = useRef(0);
  const lastSpawn = useRef(0);
  const reloadTimer = useRef(0);
  const isFiringRef = useRef(false);
  const isMouseDown = useRef(false);
  const mouseJustPressed = useRef(false);
  const lastDamageTime = useRef(0);
  const matchStart = useRef(Date.now());
  const onGround = useRef(true);
  const isMovingRef = useRef(false);
  const footstepTimer = useRef(0);
  const isCrouchingRef = useRef(false);
  const currentHeight = useRef(PLAYER_HEIGHT);
  const screenShakeRef = useRef(0);
  const fallStartY = useRef(PLAYER_HEIGHT);
  const wasOnGround = useRef(true);
  const lastWave = useRef(0);
  const grenadeCount = useRef(GRENADE_MAX);
  const damageNumbersRef = useRef<DamageNumber[]>([]);
  const respawnProtectionRef = useRef(0);
  const lastKillTime = useRef(0);
  const multiKillCount = useRef(0);

  // Weapon state
  const weaponIdx = useRef(0);
  const weaponAmmo = useRef(WEAPONS.map((w) => w.magSize));
  const weaponReserve = useRef(WEAPONS.map((w) => w.totalAmmo));
  const switchTimer = useRef(0);
  const isSwitchingRef = useRef(false);
  const switchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Killstreak state
  const killstreakActiveRef = useRef<string | null>(null);
  const killstreakTimerRef = useRef(0);
  const scoreMultiplierRef = useRef(1);
  const armorActiveRef = useRef(false);
  const streakRewardsGiven = useRef<Set<number>>(new Set());
  const playedTimeRef = useRef(0);

  const weaponGroupRef = useRef<THREE.Group>(null);

  // Weapon group follows camera in scene space (not camera.add, which breaks R3F rendering)
  // Updated in useFrame below

  // ── Pointer lock ──
  const requestPointerLock = useCallback(() => {
    gl.domElement.requestPointerLock();
  }, [gl]);

  useEffect(() => {
    const handler = () => {
      if (document.pointerLockElement !== gl.domElement) {
        if (gameState.current.phase === 'playing') {
          gameState.current.phase = 'paused';
          setGameState((s) => ({ ...s, phase: 'paused' }));
        }
      }
    };
    document.addEventListener('pointerlockchange', handler);
    return () => document.removeEventListener('pointerlockchange', handler);
  }, [gl, gameState, setGameState]);

  // ── Mouse move ──
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement !== gl.domElement) return;
      if (gameState.current.phase !== 'playing') return;
      const sens = gameState.current.isADS ? ADS_SENS : MOUSE_SENS;
      yaw.current -= e.movementX * sens;
      pitch.current -= e.movementY * sens;
      pitch.current = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, pitch.current));
    };
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [gl, gameState]);

  // ── Mouse buttons ──
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (document.pointerLockElement !== gl.domElement) {
        if (gameState.current.phase === 'playing') requestPointerLock();
        return;
      }
      if (e.button === 0) { isMouseDown.current = true; mouseJustPressed.current = true; }
      if (e.button === 2) {
        gameState.current.isADS = true;
        setGameState((s) => ({ ...s, isADS: true }));
      }
    };
    const onUp = (e: MouseEvent) => {
      if (e.button === 0) isMouseDown.current = false;
      if (e.button === 2) {
        gameState.current.isADS = false;
        setGameState((s) => ({ ...s, isADS: false }));
      }
    };
    const ctx = (e: Event) => e.preventDefault();
    gl.domElement.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    gl.domElement.addEventListener('contextmenu', ctx);
    return () => {
      gl.domElement.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      gl.domElement.removeEventListener('contextmenu', ctx);
    };
  }, [gl, requestPointerLock, setGameState, gameState]);

  // ── Scroll wheel for weapon switch ──
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (gameState.current.phase !== 'playing') return;
      if (isSwitchingRef.current) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const newIdx = (weaponIdx.current + dir + WEAPONS.length) % WEAPONS.length;
      switchToWeapon(newIdx);
    };
    gl.domElement.addEventListener('wheel', onWheel, { passive: true });
    return () => gl.domElement.removeEventListener('wheel', onWheel);
  }, [gl, gameState]);

  const switchToWeapon = useCallback(
    (newIdx: number) => {
      if (newIdx === weaponIdx.current || isSwitchingRef.current) return;
      weaponAmmo.current[weaponIdx.current] = gameState.current.ammo;
      weaponReserve.current[weaponIdx.current] = gameState.current.reserve;
      gameState.current.isReloading = false;
      reloadTimer.current = 0;
      mouseJustPressed.current = false;
      isSwitchingRef.current = true;
      switchTimer.current = WEAPON_SWITCH_TIME;
      gameState.current.isSwitching = true;
      if (switchTimeoutRef.current) clearTimeout(switchTimeoutRef.current);
      switchTimeoutRef.current = setTimeout(() => {
        if (gameState.current.phase !== 'playing') return;
        weaponIdx.current = newIdx;
        gameState.current.ammo = weaponAmmo.current[newIdx];
        gameState.current.reserve = weaponReserve.current[newIdx];
        gameState.current.weaponIndex = newIdx;
        gameState.current.weaponName = WEAPONS[newIdx].name;
        setGameState((s) => ({
          ...s,
          ammo: weaponAmmo.current[newIdx],
          reserve: weaponReserve.current[newIdx],
          weaponIndex: newIdx,
          weaponName: WEAPONS[newIdx].name,
          isReloading: false,
          reloadProgress: 0,
        }));
      }, (WEAPON_SWITCH_TIME * 1000) / 2);
    },
    [gameState, setGameState]
  );

  // ── Keyboard ──
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keys.current.add(e.code);
      if (gameState.current.phase !== 'playing') return;
      if (e.code === 'KeyR' && !gameState.current.isReloading && !isSwitchingRef.current) {
        const w = WEAPONS[weaponIdx.current];
        if (gameState.current.ammo < w.magSize && gameState.current.reserve > 0) startReload();
      }
      if (e.code === 'Space' && onGround.current) {
        playerVel.current.y = JUMP_VEL;
        onGround.current = false;
      }
      if (e.code === 'KeyC') {
        isCrouchingRef.current = !isCrouchingRef.current;
      }
      if (e.code === 'KeyG' && grenadeCount.current > 0) {
        throwGrenade();
      }
      if (e.code === 'Digit1') switchToWeapon(0);
      if (e.code === 'Digit2') switchToWeapon(1);
      if (e.code === 'Digit3') switchToWeapon(2);
      if (e.code === 'Digit4') switchToWeapon(3);
    };
    const onKeyUp = (e: KeyboardEvent) => { keys.current.delete(e.code); };
    const onVisChange = () => {
      if (document.hidden) { keys.current.clear(); isMouseDown.current = false; }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    document.addEventListener('visibilitychange', onVisChange);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('visibilitychange', onVisChange);
    };
  }, [gameState, switchToWeapon]);

  const startReload = useCallback(() => {
    const w = WEAPONS[weaponIdx.current];
    gameState.current.isReloading = true;
    reloadTimer.current = w.reloadTime;
    mouseJustPressed.current = false;
    playGunSound('reload');
    setGameState((s) => ({ ...s, isReloading: true, reloadProgress: 0 }));
  }, [gameState, setGameState]);

  const throwGrenade = useCallback(() => {
    if (grenadeCount.current <= 0) return;
    grenadeCount.current--;
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const pos = playerPos.current.clone().add(dir.clone().multiplyScalar(1));
    const vel = dir.clone().multiplyScalar(GRENADE_SPEED);
    vel.y += 8;
    grenadesRef.current.push({ id: bulletId.current++, pos, vel, timer: GRENADE_FUSE });
  }, [camera]);

  const spawnEnemy = useCallback((wave: number) => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 20 + Math.random() * 20;
    const px = playerPos.current.x;
    const pz = playerPos.current.z;
    const pos = new THREE.Vector3(
      Math.max(-MAP_SIZE + 2, Math.min(MAP_SIZE - 2, px + Math.cos(angle) * dist)),
      0,
      Math.max(-MAP_SIZE + 2, Math.min(MAP_SIZE - 2, pz + Math.sin(angle) * dist))
    );
    if (collidesWithBuildings(pos, 1)) return;
    const hpMult = 1 + (wave - 1) * 0.2;
    const hp = Math.round(ENEMY_HP * hpMult);
    enemies.current.push({
      id: enemyId.current++, pos, hp, maxHp: hp,
      vel: new THREE.Vector3(), lastFire: 0, state: 'patrol', deathTime: 0,
      patrolTarget: new THREE.Vector3((Math.random() - 0.5) * MAP_SIZE, 0, (Math.random() - 0.5) * MAP_SIZE),
      mesh: null, lookDir: new THREE.Vector3(0, 0, 1),
      coverTimer: 0, lastStateChange: 0,
      accuracy: 0.7 + Math.random() * 0.6,
      strafeDir: Math.random() > 0.5 ? 1 : -1,
    });
  }, []);

  const fireBullet = useCallback((from: THREE.Vector3, dir: THREE.Vector3, isEnemy: boolean, wIdx: number, speedOverride?: number) => {
    const weapon = WEAPONS[wIdx];
    const speed = speedOverride ?? (isEnemy ? 100 : weapon.bulletSpeed);
    const range = isEnemy ? 60 : weapon.range;
    bullets.current.push({
      id: bulletId.current++, pos: from.clone(),
      vel: dir.clone().multiplyScalar(speed), life: range / speed,
      isEnemy, origin: from.clone(), weaponIdx: wIdx,
    });
  }, []);

  const spawnPickup = useCallback((pos: THREE.Vector3) => {
    const rand = Math.random();
    const type: 'ammo' | 'health' | 'grenade' = rand < 0.5 ? 'ammo' : rand < 0.8 ? 'health' : 'grenade';
    pickupsRef.current.push({ id: bulletId.current++, pos, type, life: 20 });
  }, []);

  const explodeGrenade = useCallback((gpos: THREE.Vector3, now: number) => {
    explosionsRef.current.push({ id: bulletId.current++, pos: gpos.clone(), time: now });
    screenShakeRef.current = Math.max(screenShakeRef.current, 0.015);
    playGunSound('explosion');
    for (const e of enemies.current) {
      if (e.state === 'dead') continue;
      const d = e.pos.distanceTo(gpos);
      if (d < GRENADE_RADIUS) e.hp -= GRENADE_DAMAGE * (1 - d / GRENADE_RADIUS);
    }
    const playerDist = playerPos.current.distanceTo(gpos);
    if (playerDist < GRENADE_RADIUS) {
      const dmg = (GRENADE_DAMAGE * 0.5) * (1 - playerDist / GRENADE_RADIUS);
      gameState.current.hp = Math.max(0, gameState.current.hp - dmg);
      lastDamageTime.current = now;
    }
  }, [gameState]);

  /* ════ Main frame loop ════ */
  useFrame((_, delta) => {
    const gs = gameState.current;
    if (gs.phase !== 'playing') return;
    const dt = Math.min(delta, 0.05);
    const now = Date.now() / 1000;
    const weapon = WEAPONS[weaponIdx.current];
    const isCrouch = isCrouchingRef.current;
    const newKills: KillFeed[] = [];

    // ── Time & Wave (dt-based, pauses correctly) ──
    playedTimeRef.current += dt;
    const timeLeft = Math.max(0, MATCH_TIME - playedTimeRef.current);
    const wave = Math.floor(playedTimeRef.current / WAVE_INTERVAL) + 1;

    if (wave > lastWave.current) {
      lastWave.current = wave;
      if (wave > 1) {
        newKills.push({ id: bulletId.current++, text: `WAVE ${wave} ─ 敵が強化！`, time: now });
        gs.waveAnnounce = wave;
        gs.waveAnnounceTime = now;
      }
    }

    if (timeLeft <= 0) {
      setGameState((s) => ({ ...s, phase: 'gameover', timeLeft: 0 }));
      gs.phase = 'gameover';
      if (document.pointerLockElement) document.exitPointerLock();
      return;
    }

    // ── Camera ──
    camera.quaternion.setFromEuler(new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ'));
    const targetH = isCrouch ? CROUCH_HEIGHT : PLAYER_HEIGHT;
    currentHeight.current = THREE.MathUtils.lerp(currentHeight.current, targetH, dt * 16);

    screenShakeRef.current = Math.max(0, screenShakeRef.current - dt * 8);
    camera.position.set(playerPos.current.x, playerPos.current.y, playerPos.current.z);

    // ── Weapon group follows camera in scene space ──
    if (weaponGroupRef.current) {
      weaponGroupRef.current.position.copy(camera.position);
      weaponGroupRef.current.quaternion.copy(camera.quaternion);
    }

    // ── Respawn protection countdown ──
    if (respawnProtectionRef.current > 0) respawnProtectionRef.current -= dt;

    const targetFov = gs.isADS ? weapon.adsFov : NORMAL_FOV;
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, dt * 8);
    cam.updateProjectionMatrix();

    // ── Movement ──
    const isSprinting = keys.current.has('ShiftLeft') && !gs.isADS && !isCrouch;
    const baseSpeed = isCrouch ? CROUCH_SPEED : (isSprinting ? SPRINT_SPEED : MOVE_SPEED);
    const speed = baseSpeed * weapon.moveSpeedMult;

    const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, yaw.current, 0));
    const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, yaw.current, 0));
    const moveDir = new THREE.Vector3();
    if (keys.current.has('KeyW')) moveDir.add(forward);
    if (keys.current.has('KeyS')) moveDir.sub(forward);
    if (keys.current.has('KeyA')) moveDir.sub(right);
    if (keys.current.has('KeyD')) moveDir.add(right);
    if (moveDir.lengthSq() > 0) moveDir.normalize();
    isMovingRef.current = moveDir.lengthSq() > 0;

    // Footstep sounds
    if (isMovingRef.current && onGround.current) {
      footstepTimer.current -= dt;
      if (footstepTimer.current <= 0) {
        playGunSound('footstep');
        footstepTimer.current = isSprinting ? 0.28 : (isCrouch ? 0.55 : 0.4);
      }
    } else {
      footstepTimer.current = 0;
    }

    playerVel.current.y += GRAVITY * dt;
    const desired = playerPos.current.clone();
    desired.x += moveDir.x * speed * dt;
    desired.z += moveDir.z * speed * dt;
    desired.y += playerVel.current.y * dt;

    // Horizontal collision
    if (!collidesWithBuildings(new THREE.Vector3(desired.x, playerPos.current.y, playerPos.current.z), PLAYER_RADIUS))
      playerPos.current.x = desired.x;
    if (!collidesWithBuildings(new THREE.Vector3(playerPos.current.x, playerPos.current.y, desired.z), PLAYER_RADIUS))
      playerPos.current.z = desired.z;

    // Vertical collision with buildings
    const pHeight = currentHeight.current;
    const floorY = findFloorY(playerPos.current.x, playerPos.current.z, playerPos.current.y, PLAYER_RADIUS);
    wasOnGround.current = onGround.current;

    if (playerVel.current.y <= 0) {
      const feetTarget = desired.y - pHeight;
      if (feetTarget <= floorY) {
        const landY = floorY + pHeight;
        // Fall damage
        if (!wasOnGround.current) {
          const fallDist = fallStartY.current - landY;
          if (fallDist > FALL_DAMAGE_THRESHOLD) {
            const dmg = Math.min(50, (fallDist - FALL_DAMAGE_THRESHOLD) * FALL_DAMAGE_MULT);
            gs.hp = Math.max(0, gs.hp - dmg);
            lastDamageTime.current = now;
            screenShakeRef.current = Math.max(screenShakeRef.current, dmg * 0.001);
            if (gs.hp <= 0) {
              gs.deaths++;
              gs.hp = PLAYER_MAX_HP;
              playerPos.current.set(0, PLAYER_HEIGHT, 20);
              newKills.push({ id: bulletId.current++, text: '落下死...リスポーン', time: now });
            }
          }
        }
        playerPos.current.y = landY;
        playerVel.current.y = 0;
        onGround.current = true;
      } else {
        playerPos.current.y = desired.y;
        onGround.current = false;
      }
    } else {
      const headY = desired.y + 0.1;
      const ceiling = hitsCeiling(playerPos.current.x, playerPos.current.z, headY, PLAYER_RADIUS);
      if (ceiling !== null) {
        playerPos.current.y = ceiling - 0.2;
        playerVel.current.y = 0;
      } else {
        playerPos.current.y = desired.y;
      }
      onGround.current = false;
    }

    // Ground level check
    if (playerPos.current.y <= pHeight) {
      if (!wasOnGround.current && !onGround.current) {
        const fallDist = fallStartY.current - pHeight;
        if (fallDist > FALL_DAMAGE_THRESHOLD) {
          const dmg = Math.min(50, (fallDist - FALL_DAMAGE_THRESHOLD) * FALL_DAMAGE_MULT);
          gs.hp = Math.max(0, gs.hp - dmg);
          lastDamageTime.current = now;
          screenShakeRef.current = Math.max(screenShakeRef.current, dmg * 0.001);
        }
      }
      playerPos.current.y = pHeight;
      playerVel.current.y = 0;
      onGround.current = true;
    }

    if (wasOnGround.current && !onGround.current) {
      fallStartY.current = playerPos.current.y;
    }
    clampToMap(playerPos.current);

    // ── Weapon switch timer ──
    if (isSwitchingRef.current) {
      switchTimer.current -= dt;
      if (switchTimer.current <= 0) {
        isSwitchingRef.current = false;
        gs.isSwitching = false;
      }
    }

    // ── Reload ──
    if (gs.isReloading) {
      const w = WEAPONS[weaponIdx.current];
      reloadTimer.current -= dt;
      const progress = 1 - reloadTimer.current / w.reloadTime;
      if (reloadTimer.current <= 0) {
        const needed = w.magSize - gs.ammo;
        const take = Math.min(needed, gs.reserve);
        gs.ammo += take;
        gs.reserve -= take;
        gs.isReloading = false;
        weaponAmmo.current[weaponIdx.current] = gs.ammo;
        weaponReserve.current[weaponIdx.current] = gs.reserve;
        setGameState((s) => ({ ...s, ammo: gs.ammo, reserve: gs.reserve, isReloading: false, reloadProgress: 1 }));
      } else {
        setGameState((s) => ({ ...s, reloadProgress: progress }));
      }
    }

    // ── Shooting ──
    isFiringRef.current = false;
    const spreadMult = isMovingRef.current ? 1.3 : (isCrouch ? 0.6 : 1.0);
    const canFire = !gs.isReloading && !isSwitchingRef.current && gs.ammo > 0 && now - lastFire.current > weapon.fireRate;
    const wantsFire = weapon.auto ? isMouseDown.current : mouseJustPressed.current;

    if (canFire && wantsFire) {
      lastFire.current = now;
      isFiringRef.current = true;
      mouseJustPressed.current = false;
      gs.ammo--;
      weaponAmmo.current[weaponIdx.current] = gs.ammo;
      const spreadVal = (gs.isADS ? weapon.adsSpread : weapon.spread) * spreadMult;
      // Sniper ADS uses hitscan speed (effectively instant ray)
      const sniperHitscan = weaponIdx.current === 3 && gs.isADS;
      for (let i = 0; i < weapon.bulletsPerShot; i++) {
        const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        dir.x += (Math.random() - 0.5) * spreadVal;
        dir.y += (Math.random() - 0.5) * spreadVal;
        dir.normalize();
        fireBullet(playerPos.current.clone().add(dir.clone().multiplyScalar(0.5)), dir, false, weaponIdx.current, sniperHitscan ? 5000 : undefined);
      }
      const _gunTypes = ['ar', 'smg', 'shotgun', 'sniper'] as const;
      playGunSound(_gunTypes[weaponIdx.current]);
      screenShakeRef.current = Math.max(screenShakeRef.current, 0.002);
      setGameState((s) => ({ ...s, ammo: gs.ammo }));
      if (gs.ammo <= 0 && gs.reserve > 0) startReload();
    }
    // Dry fire click when out of ammo
    if (wantsFire && !gs.isReloading && !isSwitchingRef.current && gs.ammo <= 0 && now - lastFire.current > 0.3) {
      lastFire.current = now;
      playGunSound('dryfire');
    }
    if (!isMouseDown.current) mouseJustPressed.current = false;

    // ── Spawn enemies (difficulty scaling) ──
    const spawnInterval = Math.max(1.5, ENEMY_SPAWN_INTERVAL - (wave - 1) * 0.4);
    const maxEnemies = Math.min(20, MAX_ENEMIES + (wave - 1) * 2);
    if (now - lastSpawn.current > spawnInterval && enemies.current.filter((e) => e.state !== 'dead').length < maxEnemies) {
      lastSpawn.current = now;
      spawnEnemy(wave);
    }

    // ── Update grenades ──
    for (const g of grenadesRef.current) {
      g.vel.y += GRAVITY * dt;
      g.pos.add(g.vel.clone().multiplyScalar(dt));
      g.timer -= dt;
      if (g.pos.y < 0.12) {
        g.pos.y = 0.12;
        g.vel.y = Math.abs(g.vel.y) * 0.3;
        g.vel.x *= 0.7;
        g.vel.z *= 0.7;
      }
      if (collidesWithBuildings(g.pos, 0.12)) {
        g.vel.multiplyScalar(-0.3);
        if (g.vel.lengthSq() > 0.01) {
          g.pos.add(g.vel.clone().normalize().multiplyScalar(0.3));
        }
      }
      if (g.timer <= 0) {
        explodeGrenade(g.pos, now);
        g.timer = -999;
      }
    }
    grenadesRef.current = grenadesRef.current.filter((g) => g.timer > -999);
    explosionsRef.current = explosionsRef.current.filter((e) => now - e.time < 1.5);

    // ── Update enemies (intelligent AI) ──
    const waveSpdMult = 1 + (wave - 1) * 0.1;
    const waveAccMult = Math.max(0.4, 1 - (wave - 1) * 0.01);

    for (const e of enemies.current) {
      if (e.state === 'dead') {
        if (now - e.deathTime > 5) e.hp = -999;
        continue;
      }

      // Grenade kills (hp reduced by explodeGrenade)
      if (e.hp <= 0) {
        e.state = 'dead';
        e.deathTime = now;
        const timeSinceLastKill = now - lastKillTime.current;
        lastKillTime.current = now;
        if (timeSinceLastKill < 3) { multiKillCount.current++; } else { multiKillCount.current = 1; }
        const multiLabel = multiKillCount.current >= 4 ? 'MEGA KILL! ' : multiKillCount.current === 3 ? 'トリプルキル! ' : multiKillCount.current === 2 ? 'ダブルキル! ' : '';
        const score = Math.round((100 + gs.streakCount * 25 + (multiKillCount.current - 1) * 50) * scoreMultiplierRef.current);
        gs.kills++;
        gs.score += score;
        gs.streakCount++;
        newKills.push({ id: bulletId.current++, text: `${multiLabel}グレネードキル +${score}`, time: now });
        spawnPickup(e.pos.clone());
        continue;
      }

      const toPlayer = new THREE.Vector3().subVectors(playerPos.current, e.pos);
      toPlayer.y = 0;
      const distToPlayer = toPlayer.length();
      const hpRatio = e.hp / e.maxHp;
      const timeSinceStateChange = now - e.lastStateChange;

      // ── State machine: decide behavior ──
      if (distToPlayer > 40) {
        if (e.state !== 'patrol') { e.state = 'patrol'; e.lastStateChange = now; }
      } else if (hpRatio < 0.3 && distToPlayer < 15) {
        // Low HP + close = retreat to find cover
        if (e.state !== 'retreat') { e.state = 'retreat'; e.lastStateChange = now; }
      } else if (distToPlayer < 8) {
        // Very close: strafe/flank around player
        if (e.state !== 'flank') { e.state = 'flank'; e.lastStateChange = now; }
      } else if (distToPlayer < 25 && timeSinceStateChange > 2) {
        // Mid-range: alternate between chase and cover
        const shouldTakeCover = Math.random() < 0.3 && e.coverTimer <= 0;
        if (shouldTakeCover && e.state !== 'cover') {
          e.state = 'cover'; e.lastStateChange = now;
          e.coverTimer = 1.5 + Math.random() * 2;
        } else if (e.state !== 'chase' && e.state !== 'cover') {
          e.state = 'chase'; e.lastStateChange = now;
        }
      } else if (distToPlayer <= 40) {
        if (e.state !== 'chase' && e.state !== 'flank' && e.state !== 'cover' && e.state !== 'retreat') {
          e.state = 'chase'; e.lastStateChange = now;
        }
      }

      // ── Cover timer countdown ──
      if (e.state === 'cover') {
        e.coverTimer -= dt;
        if (e.coverTimer <= 0) { e.state = 'chase'; e.lastStateChange = now; }
      }

      // ── Movement per state ──
      let moveDir = new THREE.Vector3();
      let moveSpeed = ENEMY_SPEED * waveSpdMult;

      switch (e.state) {
        case 'patrol': {
          if (e.pos.distanceTo(e.patrolTarget) < 2) {
            e.patrolTarget.set((Math.random() - 0.5) * MAP_SIZE * 1.5, 0, (Math.random() - 0.5) * MAP_SIZE * 1.5);
          }
          moveDir.subVectors(e.patrolTarget, e.pos); moveDir.y = 0;
          moveSpeed = ENEMY_SPEED * 0.5 * waveSpdMult;
          break;
        }
        case 'chase': {
          moveDir.copy(toPlayer); moveDir.y = 0;
          moveSpeed = ENEMY_SPEED * 1.2 * waveSpdMult;
          break;
        }
        case 'flank': {
          // Strafe perpendicular to player direction
          const perp = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x).normalize();
          moveDir.copy(perp).multiplyScalar(e.strafeDir);
          // Also approach slightly
          moveDir.add(toPlayer.clone().normalize().multiplyScalar(0.3));
          moveSpeed = ENEMY_SPEED * 1.4 * waveSpdMult;
          // Periodically switch strafe direction
          if (timeSinceStateChange > 1.5 + Math.random() * 2) {
            e.strafeDir *= -1; e.lastStateChange = now;
          }
          break;
        }
        case 'cover': {
          // Move toward nearest cover point (building/crate)
          let nearestDist = Infinity;
          let nearestPoint = e.pos.clone();
          for (const box of allCollisionBoxes) {
            const center = new THREE.Vector3();
            box.getCenter(center);
            const d = e.pos.distanceTo(center);
            if (d < nearestDist && d > 1.5) { nearestDist = d; nearestPoint = center; }
          }
          moveDir.subVectors(nearestPoint, e.pos); moveDir.y = 0;
          moveSpeed = ENEMY_SPEED * 1.3 * waveSpdMult;
          // Stop when close to cover
          if (nearestDist < 2.5) moveSpeed = 0;
          break;
        }
        case 'retreat': {
          // Run away from player, toward a cover point
          moveDir.copy(toPlayer).negate(); moveDir.y = 0;
          moveSpeed = ENEMY_SPEED * 1.6 * waveSpdMult;
          // Switch to chase after retreating enough
          if (distToPlayer > 20) { e.state = 'chase'; e.lastStateChange = now; }
          break;
        }
      }

      if (moveDir.lengthSq() > 0.01) {
        moveDir.normalize();
        e.lookDir.lerp(toPlayer.clone().normalize(), dt * 5); // Always look toward player
        e.lookDir.normalize();
        const next = e.pos.clone().add(moveDir.multiplyScalar(moveSpeed * dt));
        next.y = 0;
        if (!collidesWithBuildings(new THREE.Vector3(next.x, 0.7, next.z), 0.4)) e.pos.copy(next);
        clampToMap(e.pos);
      }

      // ── Firing (varies by state) ──
      const baseFireRate = ENEMY_FIRE_RATE * waveAccMult;
      const canSeePlayer = distToPlayer < 35;
      let fireChance = false;
      let inaccuracy = 0.08 * waveAccMult * (2 - e.accuracy);

      switch (e.state) {
        case 'chase': fireChance = canSeePlayer && now - e.lastFire > baseFireRate; break;
        case 'flank': fireChance = canSeePlayer && now - e.lastFire > baseFireRate * 0.8; inaccuracy *= 1.3; break;
        case 'cover': fireChance = canSeePlayer && now - e.lastFire > baseFireRate * 1.5 && e.coverTimer < 1; break;
        case 'retreat': fireChance = canSeePlayer && distToPlayer < 12 && now - e.lastFire > baseFireRate * 2; inaccuracy *= 1.8; break;
        default: break;
      }

      if (fireChance) {
        e.lastFire = now;
        const fd = new THREE.Vector3().subVectors(playerPos.current, e.pos).normalize();
        fd.x += (Math.random() - 0.5) * inaccuracy;
        fd.y += (Math.random() - 0.5) * inaccuracy;
        fireBullet(e.pos.clone().setY(1.0), fd, true, 0);
      }
    }
    enemies.current = enemies.current.filter((e) => e.hp > -999);

    // ── Update pickups ──
    for (const p of pickupsRef.current) {
      p.life -= dt;
      if (p.life <= 0) continue;
      const dist = new THREE.Vector2(playerPos.current.x - p.pos.x, playerPos.current.z - p.pos.z).length();
      if (dist < 1.5) {
        if (p.type === 'ammo') {
          const w = WEAPONS[weaponIdx.current];
          gs.reserve = Math.min(gs.reserve + Math.ceil(w.magSize * 0.5), w.totalAmmo);
          weaponReserve.current[weaponIdx.current] = gs.reserve;
          newKills.push({ id: bulletId.current++, text: '弾薬回収', time: now });
        } else if (p.type === 'health') {
          gs.hp = Math.min(PLAYER_MAX_HP, gs.hp + 30);
          newKills.push({ id: bulletId.current++, text: '回復パック', time: now });
        } else if (p.type === 'grenade') {
          grenadeCount.current = Math.min(GRENADE_MAX, grenadeCount.current + 1);
          newKills.push({ id: bulletId.current++, text: 'グレネード回収', time: now });
        }
        p.life = 0;
      }
    }
    pickupsRef.current = pickupsRef.current.filter((p) => p.life > 0);

    // ── Update bullets (ray-based hit detection for fast bullets) ──
    const newHits: HitMarker[] = [];
    const _hp = new THREE.Vector3();
    for (const b of bullets.current) {
      const prevPos = b.pos.clone();
      b.pos.add(b.vel.clone().multiplyScalar(dt));
      b.life -= dt;

      // Compute ray BEFORE boundary/building checks so hitscan bullets
      // (speed 5000) can still hit enemies even if endpoint exceeds map.
      const moveVec = b.pos.clone().sub(prevPos);
      const moveDist = moveVec.length();
      const moveDir = moveDist > 0.001 ? moveVec.clone().normalize() : b.vel.clone().normalize();
      const ray = new THREE.Ray(prevPos, moveDir);

      // Mark for death but process hits first
      let shouldDie = b.life <= 0;
      if (b.pos.y < 0 || Math.abs(b.pos.x) > MAP_SIZE + 10 || Math.abs(b.pos.z) > MAP_SIZE + 10) shouldDie = true;
      if (!shouldDie && collidesWithBuildings(b.pos, 0.1)) shouldDie = true;

      if (!b.isEnemy) {
        const bWeapon = WEAPONS[b.weaponIdx];
        const dist = b.pos.distanceTo(b.origin);

        for (const e of enemies.current) {
          if (e.state === 'dead') continue;

          // Head hitbox (ray-sphere intersection)
          const headCenter = e.pos.clone();
          headCenter.y = HEAD_CENTER_Y;
          const headHit = ray.intersectSphere(new THREE.Sphere(headCenter, HEAD_HITBOX_RADIUS), _hp);
          const headInside = b.pos.distanceTo(headCenter) < HEAD_HITBOX_RADIUS;

          if ((headHit && prevPos.distanceTo(_hp) <= moveDist + 0.5) || headInside) {
            const dmg = calcDamage(bWeapon.damage, dist, bWeapon) * bWeapon.headshotMult;
            e.hp -= dmg;
            b.life = 0;
            newHits.push({ id: bulletId.current++, time: now, headshot: true });
            damageNumbersRef.current.push({ id: bulletId.current++, pos: headCenter.clone(), damage: dmg, headshot: true, time: now });
            screenShakeRef.current = Math.max(screenShakeRef.current, 0.003);
            playGunSound('enemyHit');
            if (e.hp <= 0) {
              e.state = 'dead';
              e.deathTime = now;
              const timeSinceLastKill = now - lastKillTime.current;
              lastKillTime.current = now;
              if (timeSinceLastKill < 3) { multiKillCount.current++; } else { multiKillCount.current = 1; }
              const multiLabel = multiKillCount.current >= 4 ? 'MEGA KILL! ' : multiKillCount.current === 3 ? 'トリプルキル! ' : multiKillCount.current === 2 ? 'ダブルキル! ' : '';
              const score = Math.round((100 + gs.streakCount * 25 + (multiKillCount.current - 1) * 50) * scoreMultiplierRef.current);
              gs.kills++;
              gs.score += score;
              gs.streakCount++;
              newKills.push({ id: bulletId.current++, text: `${multiLabel}ヘッドショット +${score}`, time: now });
              spawnPickup(e.pos.clone());
            }
            break;
          }

          // Body hitbox (ray-sphere intersection)
          const bodyCenter = e.pos.clone();
          bodyCenter.y = BODY_CENTER_Y;
          const bodyHit = ray.intersectSphere(new THREE.Sphere(bodyCenter, BODY_HITBOX_RADIUS), _hp);
          const bodyInside = b.pos.distanceTo(bodyCenter) < BODY_HITBOX_RADIUS;

          if ((bodyHit && prevPos.distanceTo(_hp) <= moveDist + 0.5) || bodyInside) {
            const dmg = calcDamage(bWeapon.damage, dist, bWeapon);
            e.hp -= dmg;
            b.life = 0;
            newHits.push({ id: bulletId.current++, time: now, headshot: false });
            damageNumbersRef.current.push({ id: bulletId.current++, pos: bodyCenter.clone(), damage: dmg, headshot: false, time: now });
            playGunSound('enemyHit');
            if (e.hp <= 0) {
              e.state = 'dead';
              e.deathTime = now;
              const timeSinceLastKill = now - lastKillTime.current;
              lastKillTime.current = now;
              if (timeSinceLastKill < 3) { multiKillCount.current++; } else { multiKillCount.current = 1; }
              const multiLabel = multiKillCount.current >= 4 ? 'MEGA KILL! ' : multiKillCount.current === 3 ? 'トリプルキル! ' : multiKillCount.current === 2 ? 'ダブルキル! ' : '';
              const score = Math.round((75 + gs.streakCount * 25 + (multiKillCount.current - 1) * 50) * scoreMultiplierRef.current);
              gs.kills++;
              gs.score += score;
              gs.streakCount++;
              newKills.push({ id: bulletId.current++, text: `${multiLabel}キル +${score}`, time: now });
              spawnPickup(e.pos.clone());
            }
            break;
          }
        }
      } else {
        // Enemy bullet → player (ray-based detection)
        const playerSphere = new THREE.Sphere(playerPos.current, PLAYER_RADIUS + 0.3);
        const playerHit = ray.intersectSphere(playerSphere, _hp);
        const playerInside = b.pos.distanceTo(playerPos.current) < PLAYER_RADIUS + 0.3;

        if ((playerHit && prevPos.distanceTo(_hp) <= moveDist + 0.5) || playerInside) {
          b.life = 0;
          // Respawn protection
          if (respawnProtectionRef.current > 0) continue;
          const dmg = armorActiveRef.current ? ENEMY_DAMAGE * 0.5 : ENEMY_DAMAGE;
          gs.hp = Math.max(0, gs.hp - dmg);
          lastDamageTime.current = now;
          playGunSound('playerHit');
          gs.streakCount = 0;
          streakRewardsGiven.current.clear();
          screenShakeRef.current = Math.max(screenShakeRef.current, 0.008);
          const ddir = new THREE.Vector2(-b.vel.x, -b.vel.z);
          const pdir = new THREE.Vector2(-Math.sin(yaw.current), -Math.cos(yaw.current));
          gs.damageDir = Math.atan2(ddir.cross(pdir), ddir.dot(pdir));
          if (gs.hp <= 0) {
            gs.deaths++;
            gs.hp = PLAYER_MAX_HP;
            playerPos.current.set(0, PLAYER_HEIGHT, 20);
            gs.streakCount = 0;
            streakRewardsGiven.current.clear();
            killstreakActiveRef.current = null;
            armorActiveRef.current = false;
            scoreMultiplierRef.current = 1;
            newKills.push({ id: bulletId.current++, text: 'リスポーン...', time: now });
            respawnProtectionRef.current = 2.0;
          }
        }
      }
      // Apply deferred death from boundary/building collision
      if (shouldDie) b.life = 0;
    }
    bullets.current = bullets.current.filter((b) => b.life > 0);

    // ── Clean up damage numbers ──
    damageNumbersRef.current = damageNumbersRef.current.filter((dn) => now - dn.time < 1.2);

    // ── HP regen ──
    if (now - lastDamageTime.current > HP_REGEN_DELAY && gs.hp < PLAYER_MAX_HP) {
      gs.hp = Math.min(PLAYER_MAX_HP, gs.hp + HP_REGEN_RATE * dt);
    }

    // ── Killstreak rewards ──
    if (gs.streakCount >= 3 && !streakRewardsGiven.current.has(3)) {
      streakRewardsGiven.current.add(3);
      killstreakActiveRef.current = 'UAV';
      killstreakTimerRef.current = 15;
      newKills.push({ id: bulletId.current++, text: 'UAV起動！敵位置強化表示', time: now });
    }
    if (gs.streakCount >= 5 && !streakRewardsGiven.current.has(5)) {
      streakRewardsGiven.current.add(5);
      scoreMultiplierRef.current = 2;
      killstreakActiveRef.current = 'DOUBLE SCORE';
      killstreakTimerRef.current = 20;
      newKills.push({ id: bulletId.current++, text: 'ダブルスコア発動！20秒間', time: now });
    }
    if (gs.streakCount >= 7 && !streakRewardsGiven.current.has(7)) {
      streakRewardsGiven.current.add(7);
      armorActiveRef.current = true;
      killstreakActiveRef.current = 'ARMOR';
      killstreakTimerRef.current = 25;
      newKills.push({ id: bulletId.current++, text: 'アーマー発動！ダメージ50%カット', time: now });
    }
    if (gs.streakCount >= 10 && !streakRewardsGiven.current.has(10)) {
      streakRewardsGiven.current.add(10);
      let nukeKills = 0;
      for (const e of enemies.current) {
        if (e.state !== 'dead') {
          e.hp -= 200;
          if (e.hp <= 0) {
            e.state = 'dead';
            e.deathTime = now;
            nukeKills++;
            gs.kills++;
            gs.score += 200;
          }
        }
      }
      screenShakeRef.current = 0.1;
      newKills.push({ id: bulletId.current++, text: `NUKE発動！${nukeKills}体撃破！`, time: now });
    }

    if (killstreakTimerRef.current > 0) {
      killstreakTimerRef.current -= dt;
      if (killstreakTimerRef.current <= 0) {
        // Reset all killstreak effects on timer expiry
        scoreMultiplierRef.current = 1;
        armorActiveRef.current = false;
        killstreakActiveRef.current = null;
      }
    }

    // ── Sync to React state ──
    const epos = enemies.current.filter((e) => e.state !== 'dead').map((e) => ({ x: e.pos.x, z: e.pos.z }));
    setGameState((s) => ({
      ...s,
      kills: gs.kills,
      deaths: gs.deaths,
      score: gs.score,
      hp: Math.round(gs.hp),
      ammo: gs.ammo,
      reserve: gs.reserve,
      timeLeft,
      isSprinting,
      isCrouching: isCrouch,
      streakCount: gs.streakCount,
      damageDir: gs.damageDir,
      hitMarkers: [...s.hitMarkers.filter((h) => now - h.time < 0.3), ...newHits],
      killFeed: [...s.killFeed.filter((k) => now - k.time < 4), ...newKills],
      playerPos: { x: playerPos.current.x, z: playerPos.current.z },
      playerYaw: yaw.current,
      enemyPositions: epos,
      weaponIndex: weaponIdx.current,
      weaponName: weapon.name,
      isSwitching: isSwitchingRef.current,
      grenades: grenadeCount.current,
      screenShake: screenShakeRef.current,
      wave,
      killstreakActive: killstreakActiveRef.current,
      killstreakTimer: killstreakTimerRef.current,
      scoreMultiplier: scoreMultiplierRef.current,
      armorActive: armorActiveRef.current,
      waveAnnounce: gs.waveAnnounce,
      waveAnnounceTime: gs.waveAnnounceTime,
    }));

    if (gs.damageDir !== null && now - lastDamageTime.current > 0.5) gs.damageDir = null;
  });

  return (
    <>
      <group ref={weaponGroupRef}>
        <Suspense fallback={null}>
          <WeaponModel
            weaponIndex={gameState.current.weaponIndex}
            isADS={gameState.current.isADS}
            isFiring={isFiringRef.current}
            isReloading={gameState.current.isReloading}
            isSwitching={isSwitchingRef.current}
            isMoving={isMovingRef.current}
          />
        </Suspense>
      </group>
      <Suspense fallback={null}>
        {enemies.current.map((e) => (
          <EnemyMesh key={e.id} enemy={e} modelPath={e.id % 2 === 0 ? MODEL_PATHS.enemy : MODEL_PATHS.enemy2} />
        ))}
      </Suspense>
      {bullets.current.map((b) => (
        <BulletTracer key={b.id} bullet={b} />
      ))}
      {grenadesRef.current.map((g) => (
        <GrenadeVisual key={g.id} grenade={g} />
      ))}
      {pickupsRef.current.map((p) => (
        <PickupVisual key={p.id} pickup={p} />
      ))}
      {explosionsRef.current.map((e) => (
        <ExplosionEffect key={e.id} position={e.pos} startTime={e.time} />
      ))}
      {damageNumbersRef.current.map((dn) => (
        <DamageNumberSprite key={dn.id} dn={dn} />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main export
   ═══════════════════════════════════════════════════════════ */
function KeyCap({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <span className={`inline-flex items-center justify-center ${wide ? 'px-3' : 'min-w-[2rem]'} h-7 rounded-md bg-slate-700/90 border border-slate-500/60 text-xs font-bold text-white shadow-[0_2px_0_0_rgba(0,0,0,0.4)] mx-0.5`}>
      {children}
    </span>
  );
}

export default function FPSGame({ onBack }: { onBack: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const makeInitialState = (): GameState => ({
    phase: 'menu',
    kills: 0,
    deaths: 0,
    score: 0,
    hp: PLAYER_MAX_HP,
    ammo: WEAPONS[0].magSize,
    reserve: WEAPONS[0].totalAmmo,
    isReloading: false,
    reloadProgress: 0,
    isADS: false,
    isSprinting: false,
    isCrouching: false,
    timeLeft: MATCH_TIME,
    hitMarkers: [],
    killFeed: [],
    damageDir: null,
    streakCount: 0,
    playerPos: { x: 0, z: 20 },
    playerYaw: 0,
    enemyPositions: [],
    weaponIndex: 0,
    weaponName: WEAPONS[0].name,
    isSwitching: false,
    grenades: GRENADE_MAX,
    screenShake: 0,
    wave: 1,
    killstreakActive: null,
    killstreakTimer: 0,
    scoreMultiplier: 1,
    armorActive: false,
    waveAnnounce: 0,
    waveAnnounceTime: 0,
  });

  const [gs, setGs] = useState<GameState>(makeInitialState);
  const gsRef = useRef<GameState>(gs);
  gsRef.current = gs;

  /* ── Fullscreen helpers ── */
  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);

  useEffect(() => {
    return () => { exitFullscreen(); };
  }, [exitFullscreen]);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement && gsRef.current.phase === 'playing') {
        gsRef.current.phase = 'paused';
        setGs((s) => ({ ...s, phase: 'paused' }));
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const startGame = useCallback(() => {
    const s = makeInitialState();
    s.phase = 'playing';
    gsRef.current = s;
    setGs(s);
    setTimeout(() => {
      const el = containerRef.current;
      if (el && !document.fullscreenElement) {
        el.requestFullscreen().catch(() => {});
      }
    }, 100);
  }, []);

  const resumeGame = useCallback(() => {
    gsRef.current.phase = 'playing';
    setGs((s) => ({ ...s, phase: 'playing' }));
    setTimeout(() => {
      const el = containerRef.current;
      const canvas = el?.querySelector('canvas');
      if (el && !document.fullscreenElement) {
        el.requestFullscreen().then(() => {
          if (canvas) canvas.requestPointerLock();
        }).catch(() => {
          if (canvas) canvas.requestPointerLock();
        });
      } else {
        if (canvas) canvas.requestPointerLock();
      }
    }, 50);
  }, []);

  const handleBack = useCallback(() => {
    exitFullscreen();
    onBack();
  }, [exitFullscreen, onBack]);

  /* ─── Menu ─── */
  if (gs.phase === 'menu') {
    return (
      <div ref={containerRef} className="w-full h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">
        <img src="/images/fps/menu-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/85 to-[#1a1f4e]/85" />
        <div className="relative z-10 text-center max-w-xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-2 tracking-tighter">
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              タクティカル
            </span>
            <br />
            <span className="text-white">ストライク</span>
          </h1>
          <p className="text-slate-400 mb-8">3分間サバイバル ― 敵を倒してハイスコアを目指せ</p>

          <button
            onClick={startGame}
            className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-red-500/30"
          >
            START MISSION
          </button>

          {/* Visual control guide */}
          <div className="mt-8 bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-white/10 text-left">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 text-center">操作ガイド</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <KeyCap>W</KeyCap><KeyCap>A</KeyCap><KeyCap>S</KeyCap><KeyCap>D</KeyCap>
                </div>
                <span className="text-slate-300">移動</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs">🖱 マウス</span>
                <span className="text-slate-300">エイム</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs">🖱 左クリック</span>
                <span className="text-slate-300">射撃</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs">🖱 右クリック</span>
                <span className="text-slate-300">ADS（スコープ）</span>
              </div>
              <div className="flex items-center gap-2">
                <KeyCap>R</KeyCap>
                <span className="text-slate-300">リロード</span>
              </div>
              <div className="flex items-center gap-2">
                <KeyCap>G</KeyCap>
                <span className="text-slate-300">グレネード</span>
              </div>
              <div className="flex items-center gap-2">
                <KeyCap>C</KeyCap>
                <span className="text-slate-300">しゃがみ</span>
              </div>
              <div className="flex items-center gap-2">
                <KeyCap wide>Space</KeyCap>
                <span className="text-slate-300">ジャンプ</span>
              </div>
              <div className="flex items-center gap-2">
                <KeyCap wide>Shift</KeyCap>
                <span className="text-slate-300">ダッシュ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <KeyCap>1</KeyCap><KeyCap>2</KeyCap><KeyCap>3</KeyCap><KeyCap>4</KeyCap>
                </div>
                <span className="text-slate-300">武器切替</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 justify-center mt-1 pt-2 border-t border-white/10">
                <KeyCap wide>Esc</KeyCap>
                <span className="text-slate-300">ポーズ / フルスクリーン終了</span>
              </div>
            </div>
          </div>

          <button onClick={handleBack} className="mt-6 text-xs text-slate-600 hover:text-slate-400 transition-colors">
            ← ゲーム選択に戻る
          </button>
        </div>
      </div>
    );
  }

  /* ─── Game Over ─── */
  if (gs.phase === 'gameover') {
    exitFullscreen();
    const kd = gs.deaths > 0 ? (gs.kills / gs.deaths).toFixed(2) : gs.kills.toString();
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">
        <img src="/images/fps/menu-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/85 to-[#1a1f4e]/85" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-2">MISSION COMPLETE</h1>
          <p className="text-slate-400 mb-8">ミッション終了</p>
          <div className="grid grid-cols-4 gap-6 mb-10 max-w-xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-accent-cyan">{gs.score.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-1">スコア</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-400">{gs.kills}</p>
              <p className="text-xs text-slate-400 mt-1">キル数</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-400">{kd}</p>
              <p className="text-xs text-slate-400 mt-1">K/D レシオ</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">{gs.wave}</p>
              <p className="text-xs text-slate-400 mt-1">最終WAVE</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              RETRY
            </button>
            <button onClick={handleBack} className="px-8 py-3 border border-slate-600 rounded-xl font-bold hover:bg-slate-800 transition-colors">
              ゲーム選択
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Playing + Paused (Canvas stays rendered) ─── */
  return (
    <div
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden bg-black select-none"
      style={{ cursor: gs.phase === 'paused' ? 'default' : 'none' }}
    >
      <GLBErrorBoundary>
      <Canvas
        shadows
        camera={{ fov: NORMAL_FOV, near: 0.1, far: 500 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <directionalLight
            position={[30, 50, 20]}
            intensity={2.0}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={80}
            shadow-camera-left={-40}
            shadow-camera-right={40}
            shadow-camera-top={40}
            shadow-camera-bottom={-40}
          />
          <hemisphereLight args={['#87ceeb', '#44403c', 0.7]} />
          <fog attach="fog" args={['#78716c', 80, 160]} />
          <SkyDome />
          <ProceduralEnvMap />
          <GameMap />
          <GameLoop gameState={gsRef} setGameState={setGs} />
        </Suspense>
      </Canvas>
      </GLBErrorBoundary>

      {gs.phase === 'playing' && (
        <>
          <HUD gs={gs} />
          <Minimap playerPos={gs.playerPos} playerYaw={gs.playerYaw} enemies={gs.enemyPositions} mapSize={MAP_SIZE} />
          {/* Wave announce overlay */}
          {gs.waveAnnounce > 0 && (() => {
            const elapsed = (Date.now() / 1000) - gs.waveAnnounceTime;
            const ANNOUNCE_DURATION = 3.5;
            if (elapsed < ANNOUNCE_DURATION) {
              const fadeIn = Math.min(1, elapsed / 0.4);
              const fadeOut = elapsed > ANNOUNCE_DURATION - 1 ? Math.max(0, (ANNOUNCE_DURATION - elapsed)) : 1;
              const opacity = fadeIn * fadeOut * 0.85;
              const scale = 0.8 + fadeIn * 0.2;
              return (
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none" style={{ opacity }}>
                  <div className="text-center" style={{ transform: `scale(${scale})` }}>
                    <div className="text-7xl md:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-orange-500" style={{ textShadow: '0 0 40px rgba(255,100,0,0.4)' }}>
                      WAVE {gs.waveAnnounce}
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-red-300/70 mt-2 tracking-wider">
                      ─ 敵が強化された ─
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })()}
        </>
      )}

      {gs.phase === 'paused' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-black text-white mb-2 tracking-wider">PAUSED</h2>
            <p className="text-slate-400 text-sm mb-10">一時停止中</p>
            <div className="flex flex-col gap-3 w-64 mx-auto">
              <button
                onClick={resumeGame}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-red-500/30"
              >
                RESUME
              </button>
              <button
                onClick={handleBack}
                className="w-full py-3 border border-slate-600 rounded-xl text-lg font-bold text-white hover:bg-slate-800 transition-colors"
              >
                QUIT TO MENU
              </button>
            </div>
            <p className="text-slate-600 text-xs mt-8">クリックしてゲームに戻る、または「QUIT」で終了</p>
          </div>
        </div>
      )}
    </div>
  );
}
