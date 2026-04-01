'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { HUD } from './HUD';
import { Minimap } from './Minimap';

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
const FIRE_RATE = 0.12;
const RELOAD_TIME = 2.0;
const MAG_SIZE = 30;
const TOTAL_AMMO = 210;
const ADS_FOV = 45;
const NORMAL_FOV = 75;
const ENEMY_SPEED = 3.5;
const ENEMY_HP = 100;
const ENEMY_SPAWN_INTERVAL = 4;
const MAX_ENEMIES = 12;
const MATCH_TIME = 180;
const HEADSHOT_MULT = 2.5;
const BODY_DAMAGE = 34;
const ENEMY_FIRE_RATE = 1.2;
const ENEMY_DAMAGE = 8;
const PLAYER_MAX_HP = 100;
const HP_REGEN_DELAY = 4;
const HP_REGEN_RATE = 20;
const MAP_SIZE = 50;

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
}

/* ═══════════════════════════════════════════════════════════
   Map building geometry data
   ═══════════════════════════════════════════════════════════ */
interface BoxDef {
  pos: [number, number, number];
  size: [number, number, number];
  color: string;
}

const BUILDINGS: BoxDef[] = [
  // Central building
  { pos: [0, 2.5, 0], size: [8, 5, 8], color: '#6b7280' },
  // Corner structures
  { pos: [-18, 2, -18], size: [10, 4, 10], color: '#78716c' },
  { pos: [18, 2, -18], size: [10, 4, 10], color: '#78716c' },
  { pos: [-18, 2, 18], size: [10, 4, 10], color: '#78716c' },
  { pos: [18, 2, 18], size: [10, 4, 10], color: '#78716c' },
  // Long walls
  { pos: [-10, 1.5, 0], size: [1, 3, 12], color: '#a8a29e' },
  { pos: [10, 1.5, 0], size: [1, 3, 12], color: '#a8a29e' },
  { pos: [0, 1.5, -10], size: [12, 3, 1], color: '#a8a29e' },
  { pos: [0, 1.5, 10], size: [12, 3, 1], color: '#a8a29e' },
  // Crates / cover
  { pos: [-5, 0.6, -5], size: [1.2, 1.2, 1.2], color: '#92400e' },
  { pos: [5, 0.6, -5], size: [1.2, 1.2, 1.2], color: '#92400e' },
  { pos: [-5, 0.6, 5], size: [1.2, 1.2, 1.2], color: '#92400e' },
  { pos: [5, 0.6, 5], size: [1.2, 1.2, 1.2], color: '#92400e' },
  { pos: [-14, 0.6, 8], size: [1.2, 1.2, 1.2], color: '#92400e' },
  { pos: [14, 0.6, -8], size: [1.2, 1.2, 1.2], color: '#92400e' },
  // Elevated platforms
  { pos: [-20, 1, 0], size: [6, 2, 4], color: '#57534e' },
  { pos: [20, 1, 0], size: [6, 2, 4], color: '#57534e' },
  // Barriers
  { pos: [8, 0.5, 15], size: [3, 1, 0.3], color: '#d6d3d1' },
  { pos: [-8, 0.5, -15], size: [3, 1, 0.3], color: '#d6d3d1' },
  { pos: [15, 0.5, 8], size: [0.3, 1, 3], color: '#d6d3d1' },
  { pos: [-15, 0.5, -8], size: [0.3, 1, 3], color: '#d6d3d1' },
];

/* ═══════════════════════════════════════════════════════════
   Collision helpers
   ═══════════════════════════════════════════════════════════ */
const buildingBoxes = BUILDINGS.map((b) => {
  const min = new THREE.Vector3(b.pos[0] - b.size[0] / 2, b.pos[1] - b.size[1] / 2, b.pos[2] - b.size[2] / 2);
  const max = new THREE.Vector3(b.pos[0] + b.size[0] / 2, b.pos[1] + b.size[1] / 2, b.pos[2] + b.size[2] / 2);
  return new THREE.Box3(min, max);
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
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[MAP_SIZE * 2, MAP_SIZE * 2]} />
        <meshStandardMaterial color="#44403c" roughness={0.9} />
      </mesh>
      {/* Boundary walls */}
      {[
        { p: [0, 2, -MAP_SIZE] as const, s: [MAP_SIZE * 2, 4, 0.5] as const },
        { p: [0, 2, MAP_SIZE] as const, s: [MAP_SIZE * 2, 4, 0.5] as const },
        { p: [-MAP_SIZE, 2, 0] as const, s: [0.5, 4, MAP_SIZE * 2] as const },
        { p: [MAP_SIZE, 2, 0] as const, s: [0.5, 4, MAP_SIZE * 2] as const },
      ].map((w, i) => (
        <mesh key={`wall-${i}`} position={w.p} castShadow receiveShadow>
          <boxGeometry args={w.s} />
          <meshStandardMaterial color="#292524" roughness={0.8} />
        </mesh>
      ))}
      {/* Buildings */}
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
   Weapon model (first-person arms + gun)
   ═══════════════════════════════════════════════════════════ */
function WeaponModel({ isADS, isFiring, isReloading }: { isADS: boolean; isFiring: boolean; isReloading: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const bobTime = useRef(0);
  const recoilRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    bobTime.current += delta * 5;
    const bob = Math.sin(bobTime.current) * 0.01;
    const sway = Math.cos(bobTime.current * 0.5) * 0.005;

    // Recoil
    if (isFiring) recoilRef.current = Math.min(recoilRef.current + delta * 30, 1);
    else recoilRef.current = Math.max(recoilRef.current - delta * 8, 0);

    const recoil = recoilRef.current * 0.04;

    if (isADS) {
      groupRef.current.position.lerp(new THREE.Vector3(0, -0.12, -0.25 + recoil), delta * 12);
    } else {
      groupRef.current.position.lerp(new THREE.Vector3(0.25 + sway, -0.2 + bob, -0.4 + recoil), delta * 8);
    }

    if (isReloading) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.5, delta * 4);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, delta * 6);
    }
  });

  return (
    <group ref={groupRef} position={[0.25, -0.2, -0.4]}>
      {/* Gun body */}
      <mesh castShadow>
        <boxGeometry args={[0.06, 0.06, 0.4]} />
        <meshStandardMaterial color="#1c1917" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Barrel */}
      <mesh position={[0, 0.01, -0.25]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial color="#292524" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Magazine */}
      <mesh position={[0, -0.06, 0.05]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.12]} />
        <meshStandardMaterial color="#1c1917" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Scope rail */}
      <mesh position={[0, 0.045, -0.05]}>
        <boxGeometry args={[0.025, 0.015, 0.2]} />
        <meshStandardMaterial color="#44403c" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Grip */}
      <mesh position={[0, -0.06, -0.12]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.035, 0.06, 0.03]} />
        <meshStandardMaterial color="#292524" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Stock */}
      <mesh position={[0, 0, 0.22]}>
        <boxGeometry args={[0.05, 0.07, 0.1]} />
        <meshStandardMaterial color="#1c1917" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Muzzle flash */}
      {isFiring && (
        <mesh position={[0, 0.01, -0.38]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.8} />
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
    // Face movement direction
    if (enemy.lookDir.lengthSq() > 0.01) {
      const angle = Math.atan2(enemy.lookDir.x, enemy.lookDir.z);
      groupRef.current.rotation.y = angle;
    }
    if (enemy.state === 'dead') {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -Math.PI / 2, 0.1);
      groupRef.current.position.y = Math.max(0.2, groupRef.current.position.y - 0.05);
    }
  });

  useEffect(() => {
    if (groupRef.current) enemy.mesh = groupRef.current;
  }, [enemy]);

  const opacity = enemy.state === 'dead' ? 0.4 : 1;

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color="#991b1b" transparent opacity={opacity} roughness={0.6} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#fca5a5" transparent opacity={opacity} roughness={0.5} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.12, 0.2, 0]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#78350f" transparent opacity={opacity} roughness={0.7} />
      </mesh>
      <mesh position={[0.12, 0.2, 0]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#78350f" transparent opacity={opacity} roughness={0.7} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.35, 0.7, 0]} castShadow>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        <meshStandardMaterial color="#991b1b" transparent opacity={opacity} roughness={0.6} />
      </mesh>
      <mesh position={[0.35, 0.7, 0]} castShadow>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        <meshStandardMaterial color="#991b1b" transparent opacity={opacity} roughness={0.6} />
      </mesh>
      {/* HP bar */}
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
   Main game loop (inside Canvas)
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
  const isFiring = useRef(false);
  const isMouseDown = useRef(false);
  const lastDamageTime = useRef(0);
  const matchStart = useRef(Date.now());
  const onGround = useRef(true);

  // Pointer lock
  const requestPointerLock = useCallback(() => {
    gl.domElement.requestPointerLock();
  }, [gl]);

  // Mouse move
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

  // Mouse buttons
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (document.pointerLockElement !== gl.domElement) {
        requestPointerLock();
        return;
      }
      if (e.button === 0) isMouseDown.current = true;
      if (e.button === 2) {
        setGameState((s) => ({ ...s, isADS: true }));
        gameState.current.isADS = true;
      }
    };
    const onUp = (e: MouseEvent) => {
      if (e.button === 0) isMouseDown.current = false;
      if (e.button === 2) {
        setGameState((s) => ({ ...s, isADS: false }));
        gameState.current.isADS = false;
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

  // Keyboard
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keys.current.add(e.code);
      if (e.code === 'KeyR' && !gameState.current.isReloading && gameState.current.ammo < MAG_SIZE) {
        startReload();
      }
      if (e.code === 'Space' && onGround.current) {
        playerVel.current.y = JUMP_VEL;
        onGround.current = false;
      }
      if (e.code === 'Escape') {
        if (document.pointerLockElement) document.exitPointerLock();
      }
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
  }, [gameState]);

  const startReload = useCallback(() => {
    gameState.current.isReloading = true;
    reloadTimer.current = RELOAD_TIME;
    setGameState((s) => ({ ...s, isReloading: true, reloadProgress: 0 }));
  }, [gameState, setGameState]);

  // Spawn enemy
  const spawnEnemy = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 20 + Math.random() * 20;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;
    const pos = new THREE.Vector3(
      Math.max(-MAP_SIZE + 2, Math.min(MAP_SIZE - 2, x)),
      0,
      Math.max(-MAP_SIZE + 2, Math.min(MAP_SIZE - 2, z))
    );
    if (collidesWithBuildings(pos, 1)) return;

    const e: Enemy = {
      id: enemyId.current++,
      pos,
      hp: ENEMY_HP,
      maxHp: ENEMY_HP,
      vel: new THREE.Vector3(),
      lastFire: 0,
      state: 'patrol',
      deathTime: 0,
      patrolTarget: new THREE.Vector3(
        (Math.random() - 0.5) * MAP_SIZE,
        0,
        (Math.random() - 0.5) * MAP_SIZE
      ),
      mesh: null,
      lookDir: new THREE.Vector3(0, 0, 1),
    };
    enemies.current.push(e);
  }, []);

  // Fire bullet
  const fireBullet = useCallback(
    (from: THREE.Vector3, dir: THREE.Vector3, isEnemy: boolean) => {
      bullets.current.push({
        id: bulletId.current++,
        pos: from.clone(),
        vel: dir.clone().multiplyScalar(BULLET_SPEED),
        life: BULLET_LIFE,
        isEnemy,
      });
    },
    []
  );

  /* ─── Main frame loop ─── */
  useFrame((_, delta) => {
    const gs = gameState.current;
    if (gs.phase !== 'playing') return;
    const dt = Math.min(delta, 0.05);
    const now = Date.now() / 1000;

    // ── Time ──
    const elapsed = (Date.now() - matchStart.current) / 1000;
    const timeLeft = Math.max(0, MATCH_TIME - elapsed);
    if (timeLeft <= 0 && gs.phase === 'playing') {
      setGameState((s) => ({ ...s, phase: 'gameover', timeLeft: 0 }));
      gameState.current.phase = 'gameover';
      if (document.pointerLockElement) document.exitPointerLock();
      return;
    }

    // ── Camera ──
    const euler = new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ');
    camera.quaternion.setFromEuler(euler);
    camera.position.copy(playerPos.current);
    const fov = gs.isADS ? ADS_FOV : NORMAL_FOV;
    if ((camera as THREE.PerspectiveCamera).fov !== fov) {
      (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
        (camera as THREE.PerspectiveCamera).fov,
        fov,
        dt * 10
      );
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }

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

    // Gravity
    playerVel.current.y += GRAVITY * dt;
    const desiredPos = playerPos.current.clone();
    desiredPos.x += moveDir.x * speed * dt;
    desiredPos.z += moveDir.z * speed * dt;
    desiredPos.y += playerVel.current.y * dt;

    // Collision X
    const testX = new THREE.Vector3(desiredPos.x, playerPos.current.y, playerPos.current.z);
    if (!collidesWithBuildings(testX, PLAYER_RADIUS)) {
      playerPos.current.x = desiredPos.x;
    }
    // Collision Z
    const testZ = new THREE.Vector3(playerPos.current.x, playerPos.current.y, desiredPos.z);
    if (!collidesWithBuildings(testZ, PLAYER_RADIUS)) {
      playerPos.current.z = desiredPos.z;
    }
    // Y / ground
    playerPos.current.y = desiredPos.y;
    if (playerPos.current.y <= PLAYER_HEIGHT) {
      playerPos.current.y = PLAYER_HEIGHT;
      playerVel.current.y = 0;
      onGround.current = true;
    }
    clampToMap(playerPos.current);

    // ── Reload ──
    if (gs.isReloading) {
      reloadTimer.current -= dt;
      const progress = 1 - reloadTimer.current / RELOAD_TIME;
      if (reloadTimer.current <= 0) {
        const needed = MAG_SIZE - gs.ammo;
        const take = Math.min(needed, gs.reserve);
        gameState.current.ammo += take;
        gameState.current.reserve -= take;
        gameState.current.isReloading = false;
        setGameState((s) => ({
          ...s,
          ammo: gameState.current.ammo,
          reserve: gameState.current.reserve,
          isReloading: false,
          reloadProgress: 1,
        }));
      } else {
        setGameState((s) => ({ ...s, reloadProgress: progress }));
      }
    }

    // ── Shooting ──
    isFiring.current = false;
    if (isMouseDown.current && !gs.isReloading && gs.ammo > 0 && now - lastFire.current > FIRE_RATE) {
      lastFire.current = now;
      isFiring.current = true;
      gameState.current.ammo--;
      const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      // Slight spread
      const spread = gs.isADS ? 0.005 : 0.02;
      dir.x += (Math.random() - 0.5) * spread;
      dir.y += (Math.random() - 0.5) * spread;
      dir.normalize();
      fireBullet(playerPos.current.clone().add(dir.clone().multiplyScalar(0.5)), dir, false);
      setGameState((s) => ({ ...s, ammo: gameState.current.ammo }));

      // Auto reload when empty
      if (gameState.current.ammo <= 0 && gameState.current.reserve > 0) {
        startReload();
      }
    }

    // ── Spawn enemies ──
    if (now - lastSpawn.current > ENEMY_SPAWN_INTERVAL && enemies.current.filter((e) => e.state !== 'dead').length < MAX_ENEMIES) {
      lastSpawn.current = now;
      spawnEnemy();
    }

    // ── Update enemies ──
    const pPos2D = new THREE.Vector2(playerPos.current.x, playerPos.current.z);
    for (const e of enemies.current) {
      if (e.state === 'dead') {
        if (now - e.deathTime > 5) {
          // Remove after 5s
          e.hp = -999;
        }
        continue;
      }

      const toPlayer = new THREE.Vector3().subVectors(playerPos.current, e.pos);
      toPlayer.y = 0;
      const distToPlayer = toPlayer.length();

      // AI state
      if (distToPlayer < 30) {
        e.state = 'chase';
      } else {
        e.state = 'patrol';
      }

      let target: THREE.Vector3;
      if (e.state === 'chase') {
        target = playerPos.current.clone();
        target.y = 0;
      } else {
        target = e.patrolTarget;
        if (e.pos.distanceTo(target) < 2) {
          e.patrolTarget = new THREE.Vector3(
            (Math.random() - 0.5) * MAP_SIZE * 1.5,
            0,
            (Math.random() - 0.5) * MAP_SIZE * 1.5
          );
        }
      }

      const dir = new THREE.Vector3().subVectors(target, e.pos);
      dir.y = 0;
      if (dir.lengthSq() > 0.1) {
        dir.normalize();
        e.lookDir.copy(dir);
        const speed = e.state === 'chase' ? ENEMY_SPEED * 1.2 : ENEMY_SPEED * 0.5;
        const nextPos = e.pos.clone().add(dir.clone().multiplyScalar(speed * dt));
        nextPos.y = 0;
        if (!collidesWithBuildings(new THREE.Vector3(nextPos.x, 0.7, nextPos.z), 0.4)) {
          e.pos.copy(nextPos);
        }
        clampToMap(e.pos);
      }

      // Enemy firing
      if (e.state === 'chase' && distToPlayer < 25 && now - e.lastFire > ENEMY_FIRE_RATE) {
        e.lastFire = now;
        const fireDir = new THREE.Vector3().subVectors(playerPos.current, e.pos).normalize();
        fireDir.x += (Math.random() - 0.5) * 0.08;
        fireDir.y += (Math.random() - 0.5) * 0.08;
        const from = e.pos.clone();
        from.y = 1.0;
        fireBullet(from, fireDir, true);
      }
    }

    // Remove old dead enemies
    enemies.current = enemies.current.filter((e) => e.hp > -999);

    // ── Update bullets ──
    const newHitMarkers: HitMarker[] = [];
    const newKillFeed: KillFeed[] = [];
    for (const b of bullets.current) {
      b.pos.add(b.vel.clone().multiplyScalar(dt));
      b.life -= dt;

      // Ground collision
      if (b.pos.y < 0) b.life = 0;
      // Map bounds
      if (Math.abs(b.pos.x) > MAP_SIZE || Math.abs(b.pos.z) > MAP_SIZE) b.life = 0;
      // Building collision
      if (collidesWithBuildings(b.pos, 0.1)) b.life = 0;

      if (!b.isEnemy) {
        // Hit enemies
        for (const e of enemies.current) {
          if (e.state === 'dead') continue;
          const dist = b.pos.distanceTo(e.pos.clone().setY(0.7));
          const headPos = e.pos.clone().setY(1.3);
          const headDist = b.pos.distanceTo(headPos);

          if (headDist < 0.25) {
            // Headshot
            e.hp -= BODY_DAMAGE * HEADSHOT_MULT;
            b.life = 0;
            newHitMarkers.push({ id: bulletId.current++, time: now, headshot: true });
            if (e.hp <= 0) {
              e.state = 'dead';
              e.deathTime = now;
              const killScore = 100 + (gs.streakCount * 25);
              gameState.current.kills++;
              gameState.current.score += killScore;
              gameState.current.streakCount++;
              newKillFeed.push({ id: bulletId.current++, text: `ヘッドショット +${killScore}`, time: now });
            }
            break;
          } else if (dist < 0.5) {
            e.hp -= BODY_DAMAGE;
            b.life = 0;
            newHitMarkers.push({ id: bulletId.current++, time: now, headshot: false });
            if (e.hp <= 0) {
              e.state = 'dead';
              e.deathTime = now;
              const killScore = 75 + (gs.streakCount * 25);
              gameState.current.kills++;
              gameState.current.score += killScore;
              gameState.current.streakCount++;
              newKillFeed.push({ id: bulletId.current++, text: `キル +${killScore}`, time: now });
            }
            break;
          }
        }
      } else {
        // Enemy bullet hits player
        const distToPlayer = b.pos.distanceTo(playerPos.current);
        if (distToPlayer < PLAYER_RADIUS + 0.2) {
          b.life = 0;
          gameState.current.hp = Math.max(0, gameState.current.hp - ENEMY_DAMAGE);
          lastDamageTime.current = now;
          gameState.current.streakCount = 0;

          // Damage direction
          const ddir = new THREE.Vector2(b.vel.x, b.vel.z);
          const pdir = new THREE.Vector2(-Math.sin(yaw.current), -Math.cos(yaw.current));
          const angle = Math.atan2(ddir.cross(pdir), ddir.dot(pdir));
          gameState.current.damageDir = angle;

          if (gameState.current.hp <= 0) {
            gameState.current.deaths++;
            gameState.current.hp = PLAYER_MAX_HP;
            // Respawn
            playerPos.current.set(0, PLAYER_HEIGHT, 20);
            newKillFeed.push({ id: bulletId.current++, text: 'リスポーン...', time: now });
          }
        }
      }
    }
    bullets.current = bullets.current.filter((b) => b.life > 0);

    // ── HP regen ──
    if (now - lastDamageTime.current > HP_REGEN_DELAY && gs.hp < PLAYER_MAX_HP) {
      gameState.current.hp = Math.min(PLAYER_MAX_HP, gameState.current.hp + HP_REGEN_RATE * dt);
    }

    // ── Sync state ──
    const enemyPositions = enemies.current
      .filter((e) => e.state !== 'dead')
      .map((e) => ({ x: e.pos.x, z: e.pos.z }));

    setGameState((s) => ({
      ...s,
      kills: gameState.current.kills,
      deaths: gameState.current.deaths,
      score: gameState.current.score,
      hp: Math.round(gameState.current.hp),
      ammo: gameState.current.ammo,
      reserve: gameState.current.reserve,
      timeLeft,
      isSprinting,
      streakCount: gameState.current.streakCount,
      damageDir: gameState.current.damageDir,
      hitMarkers: [...s.hitMarkers.filter((h) => now - h.time < 0.3), ...newHitMarkers],
      killFeed: [...s.killFeed.filter((k) => now - k.time < 4), ...newKillFeed],
      playerPos: { x: playerPos.current.x, z: playerPos.current.z },
      playerYaw: yaw.current,
      enemyPositions,
    }));

    // Clear damage dir after a moment
    if (gameState.current.damageDir !== null && now - lastDamageTime.current > 0.5) {
      gameState.current.damageDir = null;
    }
  });

  return (
    <>
      <WeaponModel
        isADS={gameState.current.isADS}
        isFiring={isFiring.current}
        isReloading={gameState.current.isReloading}
      />
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
  const initialState: GameState = {
    phase: 'menu',
    kills: 0,
    deaths: 0,
    score: 0,
    hp: PLAYER_MAX_HP,
    ammo: MAG_SIZE,
    reserve: TOTAL_AMMO,
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
  };

  const [gs, setGs] = useState<GameState>(initialState);
  const gsRef = useRef<GameState>(initialState);
  gsRef.current = gs;

  const startGame = useCallback(() => {
    const newState: GameState = {
      ...initialState,
      phase: 'playing',
    };
    gsRef.current = newState;
    setGs(newState);
  }, []);

  // Menu screen
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
            <p>右クリック：スコープ(ADS) ｜ R：リロード ｜ Space：ジャンプ ｜ Shift：ダッシュ</p>
          </div>

          <button
            onClick={onBack}
            className="mt-6 text-xs text-slate-600 hover:text-slate-400 transition-colors"
          >
            ← ゲーム選択に戻る
          </button>
        </div>
      </div>
    );
  }

  // Game over screen
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
              <p className="text-xs text-slate-400 mt-1">スコア / Score</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-400">{gs.kills}</p>
              <p className="text-xs text-slate-400 mt-1">キル数 / Kills</p>
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
            <button
              onClick={onBack}
              className="px-8 py-3 border border-slate-600 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              ゲーム選択
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="w-full h-screen relative overflow-hidden bg-black select-none" style={{ cursor: 'none' }}>
      <Canvas
        shadows
        camera={{ fov: NORMAL_FOV, near: 0.1, far: 500 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
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

          {/* Map */}
          <GameMap />

          {/* Game loop */}
          <GameLoop gameState={gsRef} setGameState={setGs} />
        </Suspense>
      </Canvas>

      {/* HUD overlay */}
      <HUD gs={gs} />
      <Minimap
        playerPos={gs.playerPos}
        playerYaw={gs.playerYaw}
        enemies={gs.enemyPositions}
        mapSize={MAP_SIZE}
      />

      {/* Click to start overlay */}
      {gs.phase === 'playing' && (
        <div
          className="absolute inset-0 z-50 pointer-events-none"
          id="fps-click-overlay"
        />
      )}
    </div>
  );
}
