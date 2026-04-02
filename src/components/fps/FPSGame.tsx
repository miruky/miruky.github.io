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

function playGunSound(type: 'ar' | 'smg' | 'shotgun' | 'sniper' | 'explosion') {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    // White noise buffer
    const len = Math.floor(ctx.sampleRate * 0.4);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    // Bandpass filter
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    // Low-pass for body
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    // Gain envelope
    const g = ctx.createGain();
    // Soft-clip distortion
    const dist = ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) { const x = (i / 128) - 1; curve[i] = (3 + 10) * x / (3 + 10 * Math.abs(x)); }
    dist.curve = curve;

    switch (type) {
      case 'ar':
        bp.frequency.value = 900; bp.Q.value = 1.2;
        lp.frequency.value = 3500;
        g.gain.setValueAtTime(0.18, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        break;
      case 'smg':
        bp.frequency.value = 1400; bp.Q.value = 1.5;
        lp.frequency.value = 4500;
        g.gain.setValueAtTime(0.14, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        break;
      case 'shotgun':
        bp.frequency.value = 350; bp.Q.value = 0.7;
        lp.frequency.value = 2000;
        g.gain.setValueAtTime(0.30, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        break;
      case 'sniper':
        bp.frequency.value = 500; bp.Q.value = 2.0;
        lp.frequency.value = 2500;
        g.gain.setValueAtTime(0.28, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        break;
      case 'explosion':
        bp.frequency.value = 120; bp.Q.value = 0.4;
        lp.frequency.value = 800;
        g.gain.setValueAtTime(0.40, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        break;
    }
    src.connect(bp); bp.connect(lp); lp.connect(dist); dist.connect(g); g.connect(ctx.destination);
    src.start(now); src.stop(now + 0.7);
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
    fireRate: 0.1, damage: 30, magSize: 30, totalAmmo: 210, reloadTime: 2.0,
    spread: 0.025, adsSpread: 0.006, adsFov: 45, bulletsPerShot: 1, auto: true,
    bulletSpeed: 150, range: 200, damageDropoffStart: 25, damageDropoffEnd: 80,
    minDamageMult: 0.5, headshotMult: 2.0, moveSpeedMult: 0.95,
  },
  {
    name: 'SMG', nameJa: 'サブマシンガン',
    fireRate: 0.055, damage: 20, magSize: 40, totalAmmo: 320, reloadTime: 1.4,
    spread: 0.035, adsSpread: 0.015, adsFov: 50, bulletsPerShot: 1, auto: true,
    bulletSpeed: 130, range: 80, damageDropoffStart: 12, damageDropoffEnd: 40,
    minDamageMult: 0.35, headshotMult: 1.8, moveSpeedMult: 1.05,
  },
  {
    name: 'Shotgun', nameJa: 'ショットガン',
    fireRate: 0.8, damage: 18, magSize: 8, totalAmmo: 48, reloadTime: 2.5,
    spread: 0.12, adsSpread: 0.08, adsFov: 55, bulletsPerShot: 10, auto: false,
    bulletSpeed: 90, range: 25, damageDropoffStart: 5, damageDropoffEnd: 18,
    minDamageMult: 0.08, headshotMult: 2.0, moveSpeedMult: 0.9,
  },
  {
    name: 'Sniper Rifle', nameJa: 'スナイパーライフル',
    fireRate: 1.2, damage: 90, magSize: 5, totalAmmo: 30, reloadTime: 3.2,
    spread: 0.015, adsSpread: 0.0005, adsFov: 15, bulletsPerShot: 1, auto: false,
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
function useClonedGLTF(path: string, targetSize: number) {
  const gltf = useGLTF(path);
  return useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const fixMat = (m: THREE.Material): THREE.Material => {
          const c = m.clone();
          const std = c as THREE.MeshStandardMaterial;
          // Ensure texture colorSpace for correct color display
          if (std.map) { std.map.colorSpace = THREE.SRGBColorSpace; std.map.needsUpdate = true; }
          if (std.emissiveMap) { std.emissiveMap.colorSpace = THREE.SRGBColorSpace; std.emissiveMap.needsUpdate = true; }
          if (std.normalMap) std.normalMap.needsUpdate = true;
          if (std.roughnessMap) std.roughnessMap.needsUpdate = true;
          if (std.metalnessMap) std.metalnessMap.needsUpdate = true;
          // Without Environment map, high metalness appears black (no reflections).
          // Keep metalness very low so diffuse color is visible.
          if (typeof std.metalness === 'number') {
            std.metalness = Math.min(std.metalness, 0.15);
          }
          if (typeof std.roughness === 'number') {
            std.roughness = Math.max(std.roughness, 0.5);
          }
          // Respect GLB doubleSided flag
          std.side = THREE.DoubleSide;
          c.needsUpdate = true;
          return c;
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
const MOVE_SPEED = 8;
const SPRINT_SPEED = 14;
const CROUCH_SPEED = 4;
const GRAVITY = -25;
const JUMP_VEL = 9;
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
const WEAPON_SWITCH_TIME = 0.45;
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
  state: 'patrol' | 'chase' | 'dead';
  deathTime: number;
  patrolTarget: THREE.Vector3;
  mesh: THREE.Group | null;
  lookDir: THREE.Vector3;
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
  wallTex.repeat.set(4, 4);

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
          <meshStandardMaterial map={wallTex} roughness={0.8} />
        </mesh>
      ))}
      {BUILDINGS.map((b, i) => (
        <mesh key={`bld-${i}`} position={b.pos} castShadow receiveShadow>
          <boxGeometry args={b.size} />
          <meshStandardMaterial map={wallTex} roughness={0.7} />
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
      <sphereGeometry args={[300, 64, 32]} />
      <meshBasicMaterial map={tex} side={THREE.BackSide} />
    </mesh>
  );
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
    if (isMoving) bobTime.current += dt * 6;
    const bob = isMoving ? Math.sin(bobTime.current) * 0.008 : 0;
    const sway = isMoving ? Math.cos(bobTime.current * 0.5) * 0.004 : 0;
    if (isFiring) recoilRef.current = Math.min(recoilRef.current + dt * 25, 1);
    else recoilRef.current = Math.max(recoilRef.current - dt * 8, 0);
    const recoil = recoilRef.current * 0.03;
    if (isSwitching) switchOffsetRef.current = Math.min(switchOffsetRef.current + dt * 6, 1);
    else switchOffsetRef.current = Math.max(switchOffsetRef.current - dt * 5, 0);
    const switchDrop = switchOffsetRef.current * 0.4;
    const target = isADS
      ? new THREE.Vector3(0.0, -0.13, -0.35 + recoil)
      : new THREE.Vector3(0.28 + sway, -0.23 + bob - switchDrop, -0.55 + recoil);
    groupRef.current.position.lerp(target, dt * (isADS ? 14 : 10));
    if (isReloading) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.5, dt * 4);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, dt * 6);
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
    gl.domElement.addEventListener('mouseup', onUp);
    gl.domElement.addEventListener('contextmenu', ctx);
    return () => {
      gl.domElement.removeEventListener('mousedown', onDown);
      gl.domElement.removeEventListener('mouseup', onUp);
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
      setTimeout(() => {
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
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [gameState, switchToWeapon]);

  const startReload = useCallback(() => {
    const w = WEAPONS[weaponIdx.current];
    gameState.current.isReloading = true;
    reloadTimer.current = w.reloadTime;
    mouseJustPressed.current = false;
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
    const pos = new THREE.Vector3(
      Math.max(-MAP_SIZE + 2, Math.min(MAP_SIZE - 2, Math.cos(angle) * dist)),
      0,
      Math.max(-MAP_SIZE + 2, Math.min(MAP_SIZE - 2, Math.sin(angle) * dist))
    );
    if (collidesWithBuildings(pos, 1)) return;
    const hpMult = 1 + (wave - 1) * 0.2;
    const hp = Math.round(ENEMY_HP * hpMult);
    enemies.current.push({
      id: enemyId.current++, pos, hp, maxHp: hp,
      vel: new THREE.Vector3(), lastFire: 0, state: 'patrol', deathTime: 0,
      patrolTarget: new THREE.Vector3((Math.random() - 0.5) * MAP_SIZE, 0, (Math.random() - 0.5) * MAP_SIZE),
      mesh: null, lookDir: new THREE.Vector3(0, 0, 1),
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
    screenShakeRef.current = Math.max(screenShakeRef.current, 0.06);
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
    currentHeight.current = THREE.MathUtils.lerp(currentHeight.current, targetH, dt * 10);

    screenShakeRef.current = Math.max(0, screenShakeRef.current - dt * 3);
    const shakeX = (Math.random() - 0.5) * screenShakeRef.current;
    const shakeY = (Math.random() - 0.5) * screenShakeRef.current;
    camera.position.set(playerPos.current.x + shakeX, playerPos.current.y + shakeY, playerPos.current.z);

    // ── Weapon group follows camera in scene space ──
    if (weaponGroupRef.current) {
      weaponGroupRef.current.position.copy(camera.position);
      weaponGroupRef.current.quaternion.copy(camera.quaternion);
    }

    // ── Respawn protection countdown ──
    if (respawnProtectionRef.current > 0) respawnProtectionRef.current -= dt;

    const targetFov = gs.isADS ? weapon.adsFov : NORMAL_FOV;
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, dt * 10);
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
            screenShakeRef.current = Math.max(screenShakeRef.current, dmg * 0.002);
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
          screenShakeRef.current = Math.max(screenShakeRef.current, dmg * 0.002);
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
      screenShakeRef.current = Math.max(screenShakeRef.current, 0.005);
      setGameState((s) => ({ ...s, ammo: gs.ammo }));
      if (gs.ammo <= 0 && gs.reserve > 0) startReload();
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

    // ── Update enemies ──
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
        // Multi-kill tracking for grenade kills
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
      e.state = distToPlayer < 35 ? 'chase' : 'patrol';

      let target: THREE.Vector3;
      if (e.state === 'chase') {
        target = playerPos.current.clone();
        target.y = 0;
      } else {
        target = e.patrolTarget;
        if (e.pos.distanceTo(target) < 2) {
          e.patrolTarget.set((Math.random() - 0.5) * MAP_SIZE * 1.5, 0, (Math.random() - 0.5) * MAP_SIZE * 1.5);
        }
      }

      const dir = new THREE.Vector3().subVectors(target, e.pos);
      dir.y = 0;
      if (dir.lengthSq() > 0.1) {
        dir.normalize();
        e.lookDir.copy(dir);
        const spd = (e.state === 'chase' ? ENEMY_SPEED * 1.2 : ENEMY_SPEED * 0.5) * waveSpdMult;
        const next = e.pos.clone().add(dir.clone().multiplyScalar(spd * dt));
        next.y = 0;
        if (!collidesWithBuildings(new THREE.Vector3(next.x, 0.7, next.z), 0.4)) e.pos.copy(next);
        clampToMap(e.pos);
      }

      const fireRate = ENEMY_FIRE_RATE * waveAccMult;
      if (e.state === 'chase' && distToPlayer < 30 && now - e.lastFire > fireRate) {
        e.lastFire = now;
        const fd = new THREE.Vector3().subVectors(playerPos.current, e.pos).normalize();
        const inaccuracy = 0.08 * waveAccMult;
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
            screenShakeRef.current = Math.max(screenShakeRef.current, 0.008);
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
          gs.streakCount = 0;
          streakRewardsGiven.current.clear();
          screenShakeRef.current = Math.max(screenShakeRef.current, 0.02);
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
      if (el && !document.fullscreenElement) {
        el.requestFullscreen().then(() => {
          const canvas = document.querySelector('canvas');
          if (canvas) canvas.requestPointerLock();
        }).catch(() => {
          const canvas = document.querySelector('canvas');
          if (canvas) canvas.requestPointerLock();
        });
      } else {
        const canvas = document.querySelector('canvas');
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
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={100}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />
          <hemisphereLight args={['#87ceeb', '#44403c', 0.7]} />
          <fog attach="fog" args={['#78716c', 80, 160]} />
          <SkyDome />
          <GameMap />
          <GameLoop gameState={gsRef} setGameState={setGs} />
        </Suspense>
      </Canvas>
      </GLBErrorBoundary>

      {gs.phase === 'playing' && (
        <>
          <HUD gs={gs} />
          <Minimap playerPos={gs.playerPos} playerYaw={gs.playerYaw} enemies={gs.enemyPositions} mapSize={MAP_SIZE} />
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
