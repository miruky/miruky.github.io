'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { HUD } from './HUD';
import { Minimap } from './Minimap';

/* ═══════════════════════════════════════════════════════════
   Weapon Definitions
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
}

export const WEAPONS: WeaponDef[] = [
  {
    name: 'Assault Rifle',
    nameJa: 'アサルトライフル',
    fireRate: 0.1,
    damage: 34,
    magSize: 30,
    totalAmmo: 210,
    reloadTime: 2.0,
    spread: 0.02,
    adsSpread: 0.005,
    adsFov: 45,
    bulletsPerShot: 1,
    auto: true,
  },
  {
    name: 'SMG',
    nameJa: 'サブマシンガン',
    fireRate: 0.06,
    damage: 22,
    magSize: 40,
    totalAmmo: 280,
    reloadTime: 1.5,
    spread: 0.03,
    adsSpread: 0.012,
    adsFov: 50,
    bulletsPerShot: 1,
    auto: true,
  },
  {
    name: 'Shotgun',
    nameJa: 'ショットガン',
    fireRate: 0.75,
    damage: 16,
    magSize: 8,
    totalAmmo: 48,
    reloadTime: 2.5,
    spread: 0.1,
    adsSpread: 0.07,
    adsFov: 55,
    bulletsPerShot: 8,
    auto: false,
  },
  {
    name: 'Sniper Rifle',
    nameJa: 'スナイパーライフル',
    fireRate: 1.1,
    damage: 95,
    magSize: 5,
    totalAmmo: 30,
    reloadTime: 3.0,
    spread: 0.008,
    adsSpread: 0.001,
    adsFov: 20,
    bulletsPerShot: 1,
    auto: false,
  },
];

/* ═══════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════ */
const MOVE_SPEED = 8;
const SPRINT_SPEED = 14;
const GRAVITY = -25;
const JUMP_VEL = 9;
const MOUSE_SENS = 0.002;
const ADS_SENS = 0.001;
const PLAYER_HEIGHT = 1.7;
const PLAYER_RADIUS = 0.4;
const BULLET_SPEED = 120;
const BULLET_LIFE = 2;
const NORMAL_FOV = 75;
const ENEMY_SPEED = 3.5;
const ENEMY_HP = 100;
const ENEMY_SPAWN_INTERVAL = 4;
const MAX_ENEMIES = 12;
const MATCH_TIME = 180;
const HEADSHOT_MULT = 2.5;
const ENEMY_FIRE_RATE = 1.2;
const ENEMY_DAMAGE = 8;
const PLAYER_MAX_HP = 100;
const HP_REGEN_DELAY = 4;
const HP_REGEN_RATE = 20;
const MAP_SIZE = 50;
const WEAPON_SWITCH_TIME = 0.45;

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */
interface Bullet {
  id: number;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  isEnemy: boolean;
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

interface HitMarker {
  id: number;
  time: number;
  headshot: boolean;
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
}

/* ═══════════════════════════════════════════════════════════
   Map geometry
   ═══════════════════════════════════════════════════════════ */
interface BoxDef {
  pos: [number, number, number];
  size: [number, number, number];
  color: string;
}

const BUILDINGS: BoxDef[] = [
  { pos: [0, 2.5, 0], size: [8, 5, 8], color: '#6b7280' },
  { pos: [-18, 2, -18], size: [10, 4, 10], color: '#78716c' },
  { pos: [18, 2, -18], size: [10, 4, 10], color: '#78716c' },
  { pos: [-18, 2, 18], size: [10, 4, 10], color: '#78716c' },
  { pos: [18, 2, 18], size: [10, 4, 10], color: '#78716c' },
  { pos: [-10, 1.5, 0], size: [1, 3, 12], color: '#a8a29e' },
  { pos: [10, 1.5, 0], size: [1, 3, 12], color: '#a8a29e' },
  { pos: [0, 1.5, -10], size: [12, 3, 1], color: '#a8a29e' },
  { pos: [0, 1.5, 10], size: [12, 3, 1], color: '#a8a29e' },
  { pos: [-5, 0.6, -5], size: [1.2, 1.2, 1.2], color: '#92400e' },
  { pos: [5, 0.6, -5], size: [1.2, 1.2, 1.2], color: '#92400e' },
  { pos: [-5, 0.6, 5], size: [1.2, 1.2, 1.2], color: '#92400e' },
  { pos: [5, 0.6, 5], size: [1.2, 1.2, 1.2], color: '#92400e' },
  { pos: [-14, 0.6, 8], size: [1.2, 1.2, 1.2], color: '#92400e' },
  { pos: [14, 0.6, -8], size: [1.2, 1.2, 1.2], color: '#92400e' },
  { pos: [-20, 1, 0], size: [6, 2, 4], color: '#57534e' },
  { pos: [20, 1, 0], size: [6, 2, 4], color: '#57534e' },
  { pos: [8, 0.5, 15], size: [3, 1, 0.3], color: '#d6d3d1' },
  { pos: [-8, 0.5, -15], size: [3, 1, 0.3], color: '#d6d3d1' },
  { pos: [15, 0.5, 8], size: [0.3, 1, 3], color: '#d6d3d1' },
  { pos: [-15, 0.5, -8], size: [0.3, 1, 3], color: '#d6d3d1' },
];

const buildingBoxes = BUILDINGS.map((b) => {
  const mn = new THREE.Vector3(b.pos[0] - b.size[0] / 2, b.pos[1] - b.size[1] / 2, b.pos[2] - b.size[2] / 2);
  const mx = new THREE.Vector3(b.pos[0] + b.size[0] / 2, b.pos[1] + b.size[1] / 2, b.pos[2] + b.size[2] / 2);
  return new THREE.Box3(mn, mx);
});

function collidesWithBuildings(pos: THREE.Vector3, radius: number): boolean {
  const sphere = new THREE.Sphere(pos, radius);
  return buildingBoxes.some((box) => box.intersectsSphere(sphere));
}

function clampToMap(v: THREE.Vector3) {
  v.x = Math.max(-MAP_SIZE + 1, Math.min(MAP_SIZE - 1, v.x));
  v.z = Math.max(-MAP_SIZE + 1, Math.min(MAP_SIZE - 1, v.z));
}

/* ═══════════════════════════════════════════════════════════
   Map component
   ═══════════════════════════════════════════════════════════ */
function GameMap() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[MAP_SIZE * 2, MAP_SIZE * 2]} />
        <meshStandardMaterial color="#44403c" roughness={0.9} />
      </mesh>
      {([
        { p: [0, 2, -MAP_SIZE] as [number, number, number], s: [MAP_SIZE * 2, 4, 0.5] as [number, number, number] },
        { p: [0, 2, MAP_SIZE] as [number, number, number], s: [MAP_SIZE * 2, 4, 0.5] as [number, number, number] },
        { p: [-MAP_SIZE, 2, 0] as [number, number, number], s: [0.5, 4, MAP_SIZE * 2] as [number, number, number] },
        { p: [MAP_SIZE, 2, 0] as [number, number, number], s: [0.5, 4, MAP_SIZE * 2] as [number, number, number] },
      ]).map((w, i) => (
        <mesh key={`wall-${i}`} position={w.p} castShadow receiveShadow>
          <boxGeometry args={w.s} />
          <meshStandardMaterial color="#292524" roughness={0.8} />
        </mesh>
      ))}
      {BUILDINGS.map((b, i) => (
        <mesh key={`bld-${i}`} position={b.pos} castShadow receiveShadow>
          <boxGeometry args={b.size} />
          <meshStandardMaterial color={b.color} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   First-person weapon models (camera-local space)
   ═══════════════════════════════════════════════════════════ */
function WeaponModel({
  weaponIndex,
  isADS,
  isFiring,
  isReloading,
  isSwitching,
  isMoving,
}: {
  weaponIndex: number;
  isADS: boolean;
  isFiring: boolean;
  isReloading: boolean;
  isSwitching: boolean;
  isMoving: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const bobTime = useRef(0);
  const recoilRef = useRef(0);
  const switchOffsetRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.05);

    // Bob (only when moving)
    if (isMoving) bobTime.current += dt * 6;
    const bob = isMoving ? Math.sin(bobTime.current) * 0.008 : 0;
    const sway = isMoving ? Math.cos(bobTime.current * 0.5) * 0.004 : 0;

    // Recoil
    if (isFiring) recoilRef.current = Math.min(recoilRef.current + dt * 25, 1);
    else recoilRef.current = Math.max(recoilRef.current - dt * 8, 0);
    const recoil = recoilRef.current * 0.03;

    // Switch offset (drop down then back up)
    if (isSwitching) switchOffsetRef.current = Math.min(switchOffsetRef.current + dt * 6, 1);
    else switchOffsetRef.current = Math.max(switchOffsetRef.current - dt * 5, 0);
    const switchDrop = switchOffsetRef.current * 0.4;

    // Target position in camera-local space
    const target = isADS
      ? new THREE.Vector3(0.0, -0.13, -0.35 + recoil)
      : new THREE.Vector3(0.28 + sway, -0.23 + bob - switchDrop, -0.55 + recoil);

    groupRef.current.position.lerp(target, dt * (isADS ? 14 : 10));

    // Reload tilt
    if (isReloading) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.5, dt * 4);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, dt * 6);
    }
  });

  return (
    <group ref={groupRef} position={[0.28, -0.23, -0.55]}>
      {weaponIndex === 0 && <ARModel isFiring={isFiring} />}
      {weaponIndex === 1 && <SMGModel isFiring={isFiring} />}
      {weaponIndex === 2 && <ShotgunModel isFiring={isFiring} />}
      {weaponIndex === 3 && <SniperModel isFiring={isFiring} />}
    </group>
  );
}

/* ─── Assault Rifle ─── */
function ARModel({ isFiring }: { isFiring: boolean }) {
  return (
    <group>
      {/* Receiver / body */}
      <mesh>
        <boxGeometry args={[0.07, 0.065, 0.42]} />
        <meshStandardMaterial color="#1c1917" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Barrel */}
      <mesh position={[0, 0.01, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 0.22, 8]} />
        <meshStandardMaterial color="#292524" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Handguard */}
      <mesh position={[0, 0, -0.15]}>
        <boxGeometry args={[0.065, 0.055, 0.18]} />
        <meshStandardMaterial color="#292524" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Magazine */}
      <mesh position={[0, -0.07, 0.04]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.042, 0.1, 0.03]} />
        <meshStandardMaterial color="#1c1917" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Rail */}
      <mesh position={[0, 0.045, -0.04]}>
        <boxGeometry args={[0.028, 0.012, 0.22]} />
        <meshStandardMaterial color="#44403c" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Grip */}
      <mesh position={[0, -0.065, -0.08]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.032, 0.06, 0.028]} />
        <meshStandardMaterial color="#292524" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Stock */}
      <mesh position={[0, -0.005, 0.24]}>
        <boxGeometry args={[0.055, 0.075, 0.11]} />
        <meshStandardMaterial color="#1c1917" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Muzzle flash */}
      {isFiring && (
        <pointLight position={[0, 0.01, -0.42]} color="#fbbf24" intensity={8} distance={3} />
      )}
      {isFiring && (
        <mesh position={[0, 0.01, -0.42]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.85} />
        </mesh>
      )}
    </group>
  );
}

/* ─── SMG ─── */
function SMGModel({ isFiring }: { isFiring: boolean }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.065, 0.055, 0.3]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.005, -0.19]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.013, 0.013, 0.12, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Curved mag */}
      <mesh position={[0, -0.075, 0.02]} rotation={[0.12, 0, 0]}>
        <boxGeometry args={[0.038, 0.11, 0.022]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Compact stock */}
      <mesh position={[0, -0.01, 0.17]}>
        <boxGeometry args={[0.045, 0.04, 0.07]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.055, -0.05]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.028, 0.05, 0.022]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Suppressor-like muzzle */}
      <mesh position={[0, 0.005, -0.27]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.06, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      {isFiring && (
        <pointLight position={[0, 0.005, -0.32]} color="#fbbf24" intensity={6} distance={2.5} />
      )}
      {isFiring && (
        <mesh position={[0, 0.005, -0.32]}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}

/* ─── Shotgun ─── */
function ShotgunModel({ isFiring }: { isFiring: boolean }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.055, 0.055, 0.48]} />
        <meshStandardMaterial color="#1c1917" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Thick barrel */}
      <mesh position={[0, 0.015, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.024, 0.024, 0.3, 8]} />
        <meshStandardMaterial color="#292524" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Pump forearm */}
      <mesh position={[0, -0.005, -0.13]}>
        <boxGeometry args={[0.048, 0.045, 0.1]} />
        <meshStandardMaterial color="#78350f" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Wooden stock */}
      <mesh position={[0, -0.01, 0.3]}>
        <boxGeometry args={[0.05, 0.09, 0.16]} />
        <meshStandardMaterial color="#92400e" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Grip */}
      <mesh position={[0, -0.06, 0.12]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.03, 0.055, 0.025]} />
        <meshStandardMaterial color="#78350f" metalness={0.3} roughness={0.7} />
      </mesh>
      {isFiring && (
        <pointLight position={[0, 0.015, -0.46]} color="#ff8c00" intensity={12} distance={4} />
      )}
      {isFiring && (
        <mesh position={[0, 0.015, -0.46]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshBasicMaterial color="#ff8c00" transparent opacity={0.9} />
        </mesh>
      )}
    </group>
  );
}

/* ─── Sniper Rifle ─── */
function SniperModel({ isFiring }: { isFiring: boolean }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.05, 0.05, 0.55]} />
        <meshStandardMaterial color="#1a2e05" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Long barrel */}
      <mesh position={[0, 0.01, -0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.014, 0.014, 0.35, 8]} />
        <meshStandardMaterial color="#292524" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Scope */}
      <mesh position={[0, 0.058, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.14, 8]} />
        <meshStandardMaterial color="#1c1917" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Scope lens front */}
      <mesh position={[0, 0.058, -0.11]}>
        <circleGeometry args={[0.018, 12]} />
        <meshStandardMaterial color="#1e40af" metalness={0.9} roughness={0.1} transparent opacity={0.6} />
      </mesh>
      {/* Bolt handle */}
      <mesh position={[0.04, 0.01, 0.02]}>
        <boxGeometry args={[0.02, 0.018, 0.055]} />
        <meshStandardMaterial color="#292524" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Large stock */}
      <mesh position={[0, -0.01, 0.32]}>
        <boxGeometry args={[0.05, 0.085, 0.18]} />
        <meshStandardMaterial color="#374a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Grip */}
      <mesh position={[0, -0.055, 0.05]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.03, 0.05, 0.025]} />
        <meshStandardMaterial color="#1a2e05" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Magazine */}
      <mesh position={[0, -0.05, 0.0]}>
        <boxGeometry args={[0.035, 0.05, 0.04]} />
        <meshStandardMaterial color="#1c1917" metalness={0.7} roughness={0.3} />
      </mesh>
      {isFiring && (
        <pointLight position={[0, 0.01, -0.55]} color="#fbbf24" intensity={10} distance={3.5} />
      )}
      {isFiring && (
        <mesh position={[0, 0.01, -0.55]}>
          <sphereGeometry args={[0.045, 6, 6]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.85} />
        </mesh>
      )}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   Enemy mesh
   ═══════════════════════════════════════════════════════════ */
function EnemyMesh({ enemy }: { enemy: Enemy }) {
  const groupRef = useRef<THREE.Group>(null);

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
  });

  useEffect(() => {
    if (groupRef.current) enemy.mesh = groupRef.current;
  }, [enemy]);

  const op = enemy.state === 'dead' ? 0.4 : 1;

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color="#991b1b" transparent opacity={op} roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#fca5a5" transparent opacity={op} roughness={0.5} />
      </mesh>
      <mesh position={[-0.12, 0.2, 0]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#78350f" transparent opacity={op} roughness={0.7} />
      </mesh>
      <mesh position={[0.12, 0.2, 0]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#78350f" transparent opacity={op} roughness={0.7} />
      </mesh>
      <mesh position={[-0.35, 0.7, 0]} castShadow>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        <meshStandardMaterial color="#991b1b" transparent opacity={op} roughness={0.6} />
      </mesh>
      <mesh position={[0.35, 0.7, 0]} castShadow>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        <meshStandardMaterial color="#991b1b" transparent opacity={op} roughness={0.6} />
      </mesh>
      {enemy.state !== 'dead' && enemy.hp < enemy.maxHp && (
        <group position={[0, 1.7, 0]}>
          <mesh>
            <planeGeometry args={[0.6, 0.06]} />
            <meshBasicMaterial color="#1c1917" transparent opacity={0.7} />
          </mesh>
          <mesh position={[(enemy.hp / enemy.maxHp - 1) * 0.3, 0, 0.001]}>
            <planeGeometry args={[(enemy.hp / enemy.maxHp) * 0.6, 0.06]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
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

  // Weapon state
  const weaponIdx = useRef(0);
  const weaponAmmo = useRef(WEAPONS.map((w) => w.magSize));
  const weaponReserve = useRef(WEAPONS.map((w) => w.totalAmmo));
  const switchTimer = useRef(0);
  const isSwitchingRef = useRef(false);

  // Camera-attached weapon group
  const weaponGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const group = weaponGroupRef.current;
    if (group) {
      camera.add(group);
      return () => {
        camera.remove(group);
      };
    }
  }, [camera]);

  // ── Pointer lock ──
  const requestPointerLock = useCallback(() => {
    gl.domElement.requestPointerLock();
  }, [gl]);

  // Pause when pointer lock is lost
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
      if (e.button === 0) {
        isMouseDown.current = true;
        mouseJustPressed.current = true;
      }
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

  // Weapon switch logic
  const switchToWeapon = useCallback(
    (newIdx: number) => {
      if (newIdx === weaponIdx.current || isSwitchingRef.current) return;
      // Save current weapon ammo
      weaponAmmo.current[weaponIdx.current] = gameState.current.ammo;
      weaponReserve.current[weaponIdx.current] = gameState.current.reserve;
      // Cancel reload
      gameState.current.isReloading = false;
      reloadTimer.current = 0;
      // Start switch
      isSwitchingRef.current = true;
      switchTimer.current = WEAPON_SWITCH_TIME;
      gameState.current.isSwitching = true;
      // Midpoint: actually change weapon
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

      // Reload
      if (e.code === 'KeyR' && !gameState.current.isReloading && !isSwitchingRef.current) {
        const w = WEAPONS[weaponIdx.current];
        if (gameState.current.ammo < w.magSize && gameState.current.reserve > 0) {
          startReload();
        }
      }
      // Jump
      if (e.code === 'Space' && onGround.current) {
        playerVel.current.y = JUMP_VEL;
        onGround.current = false;
      }
      // Weapon switch 1-4
      if (e.code === 'Digit1') switchToWeapon(0);
      if (e.code === 'Digit2') switchToWeapon(1);
      if (e.code === 'Digit3') switchToWeapon(2);
      if (e.code === 'Digit4') switchToWeapon(3);
      // Escape releases pointer lock (handled by pointerlockchange → pause)
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keys.current.delete(e.code);
    };
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
    setGameState((s) => ({ ...s, isReloading: true, reloadProgress: 0 }));
  }, [gameState, setGameState]);

  const spawnEnemy = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 20 + Math.random() * 20;
    const pos = new THREE.Vector3(
      Math.max(-MAP_SIZE + 2, Math.min(MAP_SIZE - 2, Math.cos(angle) * dist)),
      0,
      Math.max(-MAP_SIZE + 2, Math.min(MAP_SIZE - 2, Math.sin(angle) * dist))
    );
    if (collidesWithBuildings(pos, 1)) return;
    enemies.current.push({
      id: enemyId.current++,
      pos,
      hp: ENEMY_HP,
      maxHp: ENEMY_HP,
      vel: new THREE.Vector3(),
      lastFire: 0,
      state: 'patrol',
      deathTime: 0,
      patrolTarget: new THREE.Vector3((Math.random() - 0.5) * MAP_SIZE, 0, (Math.random() - 0.5) * MAP_SIZE),
      mesh: null,
      lookDir: new THREE.Vector3(0, 0, 1),
    });
  }, []);

  const fireBullet = useCallback((from: THREE.Vector3, dir: THREE.Vector3, isEnemy: boolean) => {
    bullets.current.push({
      id: bulletId.current++,
      pos: from.clone(),
      vel: dir.clone().multiplyScalar(BULLET_SPEED),
      life: BULLET_LIFE,
      isEnemy,
    });
  }, []);

  /* ════ Main frame loop ════ */
  useFrame((_, delta) => {
    const gs = gameState.current;
    if (gs.phase !== 'playing') return;
    const dt = Math.min(delta, 0.05);
    const now = Date.now() / 1000;
    const weapon = WEAPONS[weaponIdx.current];

    // ── Time ──
    const elapsed = (Date.now() - matchStart.current) / 1000;
    const timeLeft = Math.max(0, MATCH_TIME - elapsed);
    if (timeLeft <= 0) {
      setGameState((s) => ({ ...s, phase: 'gameover', timeLeft: 0 }));
      gs.phase = 'gameover';
      if (document.pointerLockElement) document.exitPointerLock();
      return;
    }

    // ── Camera ──
    camera.quaternion.setFromEuler(new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ'));
    camera.position.copy(playerPos.current);
    const targetFov = gs.isADS ? weapon.adsFov : NORMAL_FOV;
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, dt * 10);
    cam.updateProjectionMatrix();

    // ── Movement ──
    const isSprinting = keys.current.has('ShiftLeft') && !gs.isADS;
    const speed = isSprinting ? SPRINT_SPEED : MOVE_SPEED;
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

    if (!collidesWithBuildings(new THREE.Vector3(desired.x, playerPos.current.y, playerPos.current.z), PLAYER_RADIUS))
      playerPos.current.x = desired.x;
    if (!collidesWithBuildings(new THREE.Vector3(playerPos.current.x, playerPos.current.y, desired.z), PLAYER_RADIUS))
      playerPos.current.z = desired.z;
    playerPos.current.y = desired.y;
    if (playerPos.current.y <= PLAYER_HEIGHT) {
      playerPos.current.y = PLAYER_HEIGHT;
      playerVel.current.y = 0;
      onGround.current = true;
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
    const canFire = !gs.isReloading && !isSwitchingRef.current && gs.ammo > 0 && now - lastFire.current > weapon.fireRate;
    const wantsFire = weapon.auto ? isMouseDown.current : mouseJustPressed.current;

    if (canFire && wantsFire) {
      lastFire.current = now;
      isFiringRef.current = true;
      mouseJustPressed.current = false;
      gs.ammo--;
      weaponAmmo.current[weaponIdx.current] = gs.ammo;

      const spreadVal = gs.isADS ? weapon.adsSpread : weapon.spread;
      for (let i = 0; i < weapon.bulletsPerShot; i++) {
        const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        dir.x += (Math.random() - 0.5) * spreadVal;
        dir.y += (Math.random() - 0.5) * spreadVal;
        dir.normalize();
        fireBullet(playerPos.current.clone().add(dir.clone().multiplyScalar(0.5)), dir, false);
      }
      setGameState((s) => ({ ...s, ammo: gs.ammo }));

      if (gs.ammo <= 0 && gs.reserve > 0) startReload();
    }
    // Reset mouseJustPressed if held
    if (!isMouseDown.current) mouseJustPressed.current = false;

    // ── Spawn enemies ──
    if (now - lastSpawn.current > ENEMY_SPAWN_INTERVAL && enemies.current.filter((e) => e.state !== 'dead').length < MAX_ENEMIES) {
      lastSpawn.current = now;
      spawnEnemy();
    }

    // ── Update enemies ──
    for (const e of enemies.current) {
      if (e.state === 'dead') {
        if (now - e.deathTime > 5) e.hp = -999;
        continue;
      }
      const toPlayer = new THREE.Vector3().subVectors(playerPos.current, e.pos);
      toPlayer.y = 0;
      const distToPlayer = toPlayer.length();
      e.state = distToPlayer < 30 ? 'chase' : 'patrol';

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
        const spd = e.state === 'chase' ? ENEMY_SPEED * 1.2 : ENEMY_SPEED * 0.5;
        const next = e.pos.clone().add(dir.clone().multiplyScalar(spd * dt));
        next.y = 0;
        if (!collidesWithBuildings(new THREE.Vector3(next.x, 0.7, next.z), 0.4)) e.pos.copy(next);
        clampToMap(e.pos);
      }

      if (e.state === 'chase' && distToPlayer < 25 && now - e.lastFire > ENEMY_FIRE_RATE) {
        e.lastFire = now;
        const fd = new THREE.Vector3().subVectors(playerPos.current, e.pos).normalize();
        fd.x += (Math.random() - 0.5) * 0.08;
        fd.y += (Math.random() - 0.5) * 0.08;
        fireBullet(e.pos.clone().setY(1.0), fd, true);
      }
    }
    enemies.current = enemies.current.filter((e) => e.hp > -999);

    // ── Update bullets ──
    const newHits: HitMarker[] = [];
    const newKills: KillFeed[] = [];
    for (const b of bullets.current) {
      b.pos.add(b.vel.clone().multiplyScalar(dt));
      b.life -= dt;
      if (b.pos.y < 0 || Math.abs(b.pos.x) > MAP_SIZE || Math.abs(b.pos.z) > MAP_SIZE) b.life = 0;
      if (collidesWithBuildings(b.pos, 0.1)) b.life = 0;

      if (!b.isEnemy) {
        for (const e of enemies.current) {
          if (e.state === 'dead') continue;
          const headDist = b.pos.distanceTo(e.pos.clone().setY(1.3));
          const bodyDist = b.pos.distanceTo(e.pos.clone().setY(0.7));

          if (headDist < 0.25) {
            e.hp -= weapon.damage * HEADSHOT_MULT;
            b.life = 0;
            newHits.push({ id: bulletId.current++, time: now, headshot: true });
            if (e.hp <= 0) {
              e.state = 'dead';
              e.deathTime = now;
              const score = 100 + gs.streakCount * 25;
              gs.kills++;
              gs.score += score;
              gs.streakCount++;
              newKills.push({ id: bulletId.current++, text: `ヘッドショット +${score}`, time: now });
            }
            break;
          } else if (bodyDist < 0.5) {
            e.hp -= weapon.damage;
            b.life = 0;
            newHits.push({ id: bulletId.current++, time: now, headshot: false });
            if (e.hp <= 0) {
              e.state = 'dead';
              e.deathTime = now;
              const score = 75 + gs.streakCount * 25;
              gs.kills++;
              gs.score += score;
              gs.streakCount++;
              newKills.push({ id: bulletId.current++, text: `キル +${score}`, time: now });
            }
            break;
          }
        }
      } else {
        if (b.pos.distanceTo(playerPos.current) < PLAYER_RADIUS + 0.2) {
          b.life = 0;
          gs.hp = Math.max(0, gs.hp - ENEMY_DAMAGE);
          lastDamageTime.current = now;
          gs.streakCount = 0;
          const ddir = new THREE.Vector2(b.vel.x, b.vel.z);
          const pdir = new THREE.Vector2(-Math.sin(yaw.current), -Math.cos(yaw.current));
          gs.damageDir = Math.atan2(ddir.cross(pdir), ddir.dot(pdir));
          if (gs.hp <= 0) {
            gs.deaths++;
            gs.hp = PLAYER_MAX_HP;
            playerPos.current.set(0, PLAYER_HEIGHT, 20);
            newKills.push({ id: bulletId.current++, text: 'リスポーン...', time: now });
          }
        }
      }
    }
    bullets.current = bullets.current.filter((b) => b.life > 0);

    // ── HP regen ──
    if (now - lastDamageTime.current > HP_REGEN_DELAY && gs.hp < PLAYER_MAX_HP) {
      gs.hp = Math.min(PLAYER_MAX_HP, gs.hp + HP_REGEN_RATE * dt);
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
    }));

    if (gs.damageDir !== null && now - lastDamageTime.current > 0.5) gs.damageDir = null;
  });

  return (
    <>
      {/* Weapon attached to camera */}
      <group ref={weaponGroupRef}>
        <WeaponModel
          weaponIndex={gameState.current.weaponIndex}
          isADS={gameState.current.isADS}
          isFiring={isFiringRef.current}
          isReloading={gameState.current.isReloading}
          isSwitching={isSwitchingRef.current}
          isMoving={isMovingRef.current}
        />
      </group>
      {enemies.current.map((e) => (
        <EnemyMesh key={e.id} enemy={e} />
      ))}
      {bullets.current.map((b) => (
        <BulletTracer key={b.id} bullet={b} />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main export
   ═══════════════════════════════════════════════════════════ */
export default function FPSGame({ onBack }: { onBack: () => void }) {
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
  });

  const [gs, setGs] = useState<GameState>(makeInitialState);
  const gsRef = useRef<GameState>(gs);
  gsRef.current = gs;

  const startGame = useCallback(() => {
    const s = makeInitialState();
    s.phase = 'playing';
    gsRef.current = s;
    setGs(s);
  }, []);

  const resumeGame = useCallback(() => {
    gsRef.current.phase = 'playing';
    setGs((s) => ({ ...s, phase: 'playing' }));
    // Re-request pointer lock (must be from user gesture — button click qualifies)
    setTimeout(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) canvas.requestPointerLock();
    }, 50);
  }, []);

  /* ─── Menu ─── */
  if (gs.phase === 'menu') {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0e27] to-[#1a1f4e] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-cyan/20 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-2 tracking-tighter">
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              TACTICAL
            </span>
            <br />
            <span className="text-white">STRIKE</span>
          </h1>
          <p className="text-slate-400 mb-8">3分間サバイバル ― 敵を倒してハイスコアを目指せ</p>

          <button
            onClick={startGame}
            className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-red-500/30"
          >
            START MISSION
          </button>

          <div className="mt-8 text-sm text-slate-500 space-y-1">
            <p>WASD：移動 ｜ マウス：エイム ｜ 左クリック：射撃</p>
            <p>右クリック：ADS ｜ R：リロード ｜ Space：ジャンプ ｜ Shift：ダッシュ</p>
            <p>1〜4 / スクロール：武器切替 ｜ Esc：ポーズ</p>
          </div>

          <button onClick={onBack} className="mt-6 text-xs text-slate-600 hover:text-slate-400 transition-colors">
            ← ゲーム選択に戻る
          </button>
        </div>
      </div>
    );
  }

  /* ─── Game Over ─── */
  if (gs.phase === 'gameover') {
    const kd = gs.deaths > 0 ? (gs.kills / gs.deaths).toFixed(2) : gs.kills.toString();
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0e27] to-[#1a1f4e] text-white relative overflow-hidden">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-2">MISSION COMPLETE</h1>
          <p className="text-slate-400 mb-8">ミッション終了</p>
          <div className="grid grid-cols-3 gap-8 mb-10 max-w-lg mx-auto">
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
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              RETRY
            </button>
            <button onClick={onBack} className="px-8 py-3 border border-slate-600 rounded-xl font-bold hover:bg-slate-800 transition-colors">
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
      className="w-full h-screen relative overflow-hidden bg-black select-none"
      style={{ cursor: gs.phase === 'paused' ? 'default' : 'none' }}
    >
      <Canvas
        shadows
        camera={{ fov: NORMAL_FOV, near: 0.1, far: 500 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[30, 50, 20]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={100}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />
          <hemisphereLight args={['#87ceeb', '#44403c', 0.3]} />
          <fog attach="fog" args={['#78716c', 60, 120]} />
          <Sky sunPosition={[100, 50, 100]} />
          <Stars radius={200} depth={50} count={1000} factor={4} saturation={0} />
          <GameMap />
          <GameLoop gameState={gsRef} setGameState={setGs} />
        </Suspense>
      </Canvas>

      {/* HUD (only when actually playing) */}
      {gs.phase === 'playing' && (
        <>
          <HUD gs={gs} />
          <Minimap playerPos={gs.playerPos} playerYaw={gs.playerYaw} enemies={gs.enemyPositions} mapSize={MAP_SIZE} />
        </>
      )}

      {/* ─── Pause Overlay ─── */}
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
                onClick={onBack}
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
