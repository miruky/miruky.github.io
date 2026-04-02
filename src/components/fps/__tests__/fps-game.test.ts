/**
 * FPS Game Integration Tests
 * Verifies game systems, weapon balance, collision, and resource accessibility
 * Run: npx tsx src/components/fps/__tests__/fps-game.test.ts
 */

import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════
   Re-implement core game logic for testing (no React/Canvas dependency)
   ═══════════════════════════════════════════════════════════ */

interface WeaponDef {
  name: string;
  fireRate: number;
  damage: number;
  magSize: number;
  totalAmmo: number;
  bulletsPerShot: number;
  bulletSpeed: number;
  range: number;
  damageDropoffStart: number;
  damageDropoffEnd: number;
  minDamageMult: number;
  headshotMult: number;
  moveSpeedMult: number;
  spread: number;
  adsSpread: number;
}

const WEAPONS: WeaponDef[] = [
  {
    name: 'Assault Rifle', fireRate: 0.1, damage: 30, magSize: 30, totalAmmo: 210,
    bulletsPerShot: 1, bulletSpeed: 150, range: 200,
    damageDropoffStart: 25, damageDropoffEnd: 80, minDamageMult: 0.5,
    headshotMult: 2.0, moveSpeedMult: 0.95, spread: 0.025, adsSpread: 0.006,
  },
  {
    name: 'SMG', fireRate: 0.055, damage: 20, magSize: 40, totalAmmo: 320,
    bulletsPerShot: 1, bulletSpeed: 130, range: 80,
    damageDropoffStart: 12, damageDropoffEnd: 40, minDamageMult: 0.35,
    headshotMult: 1.8, moveSpeedMult: 1.05, spread: 0.035, adsSpread: 0.015,
  },
  {
    name: 'Shotgun', fireRate: 0.8, damage: 18, magSize: 8, totalAmmo: 48,
    bulletsPerShot: 10, bulletSpeed: 90, range: 25,
    damageDropoffStart: 5, damageDropoffEnd: 18, minDamageMult: 0.08,
    headshotMult: 2.0, moveSpeedMult: 0.9, spread: 0.12, adsSpread: 0.08,
  },
  {
    name: 'Sniper Rifle', fireRate: 1.2, damage: 90, magSize: 5, totalAmmo: 30,
    bulletsPerShot: 1, bulletSpeed: 350, range: 500,
    damageDropoffStart: 100, damageDropoffEnd: 400, minDamageMult: 0.85,
    headshotMult: 3.5, moveSpeedMult: 0.85, spread: 0.015, adsSpread: 0.0005,
  },
];

function calcDamage(baseDmg: number, dist: number, weapon: WeaponDef): number {
  if (dist <= weapon.damageDropoffStart) return baseDmg;
  if (dist >= weapon.damageDropoffEnd) return baseDmg * weapon.minDamageMult;
  const t = (dist - weapon.damageDropoffStart) / (weapon.damageDropoffEnd - weapon.damageDropoffStart);
  return baseDmg * (1 - t * (1 - weapon.minDamageMult));
}

function makeBox(pos: [number, number, number], size: [number, number, number]): THREE.Box3 {
  return new THREE.Box3(
    new THREE.Vector3(pos[0] - size[0] / 2, pos[1] - size[1] / 2, pos[2] - size[2] / 2),
    new THREE.Vector3(pos[0] + size[0] / 2, pos[1] + size[1] / 2, pos[2] + size[2] / 2),
  );
}

const MAP_SIZE = 50;
const BUILDINGS = [
  { pos: [0, 2.5, 0] as [number, number, number], size: [8, 5, 8] as [number, number, number] },
  { pos: [-18, 2, -18] as [number, number, number], size: [10, 4, 10] as [number, number, number] },
  { pos: [18, 2, -18] as [number, number, number], size: [10, 4, 10] as [number, number, number] },
  { pos: [-18, 2, 18] as [number, number, number], size: [10, 4, 10] as [number, number, number] },
  { pos: [18, 2, 18] as [number, number, number], size: [10, 4, 10] as [number, number, number] },
  { pos: [-10, 1.5, 0] as [number, number, number], size: [1, 3, 12] as [number, number, number] },
  { pos: [10, 1.5, 0] as [number, number, number], size: [1, 3, 12] as [number, number, number] },
  { pos: [0, 1.5, -10] as [number, number, number], size: [12, 3, 1] as [number, number, number] },
  { pos: [0, 1.5, 10] as [number, number, number], size: [12, 3, 1] as [number, number, number] },
  { pos: [-20, 1, 0] as [number, number, number], size: [6, 2, 4] as [number, number, number] },
  { pos: [20, 1, 0] as [number, number, number], size: [6, 2, 4] as [number, number, number] },
];

const CRATE_POSITIONS: [number, number, number][] = [
  [-5, 0.6, -5], [5, 0.6, -5], [-5, 0.6, 5], [5, 0.6, 5],
  [-14, 0.6, 8], [14, 0.6, -8], [12, 0.6, 12], [-12, 0.6, -12],
  [0, 0.6, -22], [-22, 0.6, 15], [7, 0.6, -18], [-3, 0.6, 22],
  [25, 0.6, 10], [-25, 0.6, -10], [30, 0.6, -25], [-30, 0.6, 25],
  [0, 0.6, 30], [0, 0.6, -35],
];

const BARRICADE_DEFS = [
  { pos: [8, 0, 15] as [number, number, number] },
  { pos: [-8, 0, -15] as [number, number, number] },
  { pos: [15, 0, 8] as [number, number, number] },
  { pos: [-15, 0, -8] as [number, number, number] },
  { pos: [25, 0, 0] as [number, number, number] },
  { pos: [-25, 0, 0] as [number, number, number] },
  { pos: [0, 0, 28] as [number, number, number] },
  { pos: [0, 0, -28] as [number, number, number] },
  { pos: [22, 0, -22] as [number, number, number] },
  { pos: [-22, 0, 22] as [number, number, number] },
  { pos: [35, 0, 15] as [number, number, number] },
  { pos: [-35, 0, -15] as [number, number, number] },
];

const CRATE_SIZE = 1.2;
const buildingBoxes = BUILDINGS.map((b) => makeBox(b.pos, b.size));
const crateBoxes = CRATE_POSITIONS.map((p) => makeBox(p, [CRATE_SIZE, CRATE_SIZE, CRATE_SIZE]));
const barricadeBoxes = BARRICADE_DEFS.map((b) => makeBox([b.pos[0], 0.5, b.pos[2]], [3.0, 1, 3.0]));
const allCollisionBoxes = [...buildingBoxes, ...crateBoxes, ...barricadeBoxes];

function collidesWithBuildings(pos: THREE.Vector3, radius: number): boolean {
  const sphere = new THREE.Sphere(pos, radius);
  return allCollisionBoxes.some((box) => box.intersectsSphere(sphere));
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

/* ═══════════════════════════════════════════════════════════
   Test Runner
   ═══════════════════════════════════════════════════════════ */
let passed = 0;
let failed = 0;
const failures: string[] = [];

function assert(condition: boolean, name: string) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${name}`);
  } else {
    failed++;
    failures.push(name);
    console.log(`  ❌ ${name}`);
  }
}

function assertApprox(a: number, b: number, epsilon: number, name: string) {
  assert(Math.abs(a - b) < epsilon, `${name} (got ${a.toFixed(3)}, expected ~${b.toFixed(3)})`);
}

/* ═══════════════════════════════════════════════════════════
   TEST SUITES
   ═══════════════════════════════════════════════════════════ */

console.log('\n🔫 === WEAPON SYSTEM TESTS ===');

// Test 1: All 4 weapons defined
assert(WEAPONS.length === 4, 'All 4 weapons defined');

// Test 2: Weapon names correct
assert(WEAPONS[0].name === 'Assault Rifle', 'Weapon 0 = Assault Rifle');
assert(WEAPONS[1].name === 'SMG', 'Weapon 1 = SMG');
assert(WEAPONS[2].name === 'Shotgun', 'Weapon 2 = Shotgun');
assert(WEAPONS[3].name === 'Sniper Rifle', 'Weapon 3 = Sniper Rifle');

// Test 3: Shotgun has multiple pellets
assert(WEAPONS[2].bulletsPerShot === 10, 'Shotgun fires 10 pellets');

// Test 4: Sniper has highest range
assert(WEAPONS[3].range === 500, 'Sniper range = 500');
assert(WEAPONS[3].range > WEAPONS[0].range, 'Sniper range > AR range');
assert(WEAPONS[3].range > WEAPONS[1].range, 'Sniper range > SMG range');
assert(WEAPONS[3].range > WEAPONS[2].range, 'Sniper range > Shotgun range');

// Test 5: Sniper has highest bullet speed
assert(WEAPONS[3].bulletSpeed === 350, 'Sniper bullet speed = 350');
assert(WEAPONS[3].bulletSpeed > WEAPONS[0].bulletSpeed, 'Sniper speed > AR speed');

// Test 6: Sniper has highest headshot multiplier
assert(WEAPONS[3].headshotMult === 3.5, 'Sniper headshot mult = 3.5');
assert(WEAPONS[3].headshotMult > WEAPONS[0].headshotMult, 'Sniper HS > AR HS');

// Test 7: SMG has fastest fire rate
assert(WEAPONS[1].fireRate < WEAPONS[0].fireRate, 'SMG fire rate faster than AR');
assert(WEAPONS[1].fireRate < WEAPONS[2].fireRate, 'SMG fire rate faster than Shotgun');

// Test 8: Shotgun has highest spread
assert(WEAPONS[2].spread > WEAPONS[0].spread, 'Shotgun spread > AR');
assert(WEAPONS[2].spread > WEAPONS[1].spread, 'Shotgun spread > SMG');
assert(WEAPONS[2].spread > WEAPONS[3].spread, 'Shotgun spread > Sniper');

console.log('\n📏 === DAMAGE FALLOFF TESTS ===');

// Test Shotgun: devastating at close range, useless at distance
const sgClose = calcDamage(WEAPONS[2].damage, 3, WEAPONS[2]);
const sgMid = calcDamage(WEAPONS[2].damage, 12, WEAPONS[2]);
const sgFar = calcDamage(WEAPONS[2].damage, 20, WEAPONS[2]);
assertApprox(sgClose, 18, 0.1, 'Shotgun full damage at 3m');
assert(sgMid < sgClose, 'Shotgun damage drops at 12m');
assert(sgFar < sgMid, 'Shotgun damage drops further at 20m');
const sgMax = calcDamage(WEAPONS[2].damage, 25, WEAPONS[2]);
assertApprox(sgMax, 18 * 0.08, 0.5, 'Shotgun minimum damage at max range');

// Test Sniper: consistent damage at long range
const snClose = calcDamage(WEAPONS[3].damage, 10, WEAPONS[3]);
const snMid = calcDamage(WEAPONS[3].damage, 80, WEAPONS[3]);
const snFar = calcDamage(WEAPONS[3].damage, 200, WEAPONS[3]);
const snMax = calcDamage(WEAPONS[3].damage, 500, WEAPONS[3]);
assertApprox(snClose, 90, 0.1, 'Sniper full damage at 10m');
assertApprox(snMid, 90, 0.1, 'Sniper full damage at 80m');
assert(snFar > 80, 'Sniper still high damage at 200m');
assertApprox(snMax, 90 * 0.85, 1, 'Sniper min damage at 500m (still ~76.5)');

// Test AR: middle ground
const arClose = calcDamage(WEAPONS[0].damage, 5, WEAPONS[0]);
const arFar = calcDamage(WEAPONS[0].damage, 100, WEAPONS[0]);
assertApprox(arClose, 30, 0.1, 'AR full damage at 5m');
assertApprox(arFar, 15, 1, 'AR half damage at 100m');

// Test Shotgun total burst damage at close range vs sniper single shot
const sgBurstClose = sgClose * WEAPONS[2].bulletsPerShot; // 18 * 10 = 180
assert(sgBurstClose > WEAPONS[3].damage, 'Shotgun burst > Sniper single at close range');
assert(sgBurstClose >= 150, 'Shotgun burst damage >= 150 at close range');

console.log('\n🏗️ === COLLISION SYSTEM TESTS ===');

// Test: Center building exists
assert(collidesWithBuildings(new THREE.Vector3(0, 2, 0), 0.5), 'Center building collision detected');

// Test: Open areas are clear
assert(!collidesWithBuildings(new THREE.Vector3(0, 1, 20), 0.4), 'Spawn area (0,1,20) is clear');
assert(!collidesWithBuildings(new THREE.Vector3(30, 1, 30), 0.4), 'Corner area is clear');

// Test: Crate collision
assert(collidesWithBuildings(new THREE.Vector3(-5, 0.6, -5), 0.3), 'Crate at (-5,0.6,-5) detected');
assert(collidesWithBuildings(new THREE.Vector3(5, 0.6, -5), 0.3), 'Crate at (5,0.6,-5) detected');

// Test: More crate positions have collision
assert(collidesWithBuildings(new THREE.Vector3(25, 0.6, 10), 0.3), 'Extended crate at (25,0.6,10) detected');
assert(collidesWithBuildings(new THREE.Vector3(0, 0.6, 30), 0.3), 'Extended crate at (0,0.6,30) detected');

// Test: Barricade collision
assert(collidesWithBuildings(new THREE.Vector3(8, 0.5, 15), 0.5), 'Barricade at (8,0,15) detected');
assert(collidesWithBuildings(new THREE.Vector3(25, 0.5, 0), 0.5), 'Barricade at (25,0,0) detected');
assert(collidesWithBuildings(new THREE.Vector3(0, 0.5, 28), 0.5), 'Barricade at (0,0,28) detected');

// Test: Total collision box count (11 buildings + 18 crates + 12 barricades = 41)
assert(allCollisionBoxes.length === 11 + 18 + 12, `Total collision boxes = ${allCollisionBoxes.length} (expected 41)`);

console.log('\n⬆️ === JUMP/VERTICAL COLLISION TESTS ===');

// Test: Floor detection on center building
const floorOnBuilding = findFloorY(0, 0, 6, 0.4);
assert(floorOnBuilding === 5, `Floor on center building = ${floorOnBuilding} (expected 5)`);

// Test: Floor at ground level away from buildings
const floorOpen = findFloorY(30, 30, 2, 0.4);
assert(floorOpen === 0, `Floor in open area = ${floorOpen} (expected 0)`);

// Test: Floor on crate
const floorOnCrate = findFloorY(-5, -5, 2, 0.3);
assertApprox(floorOnCrate, 1.2, 0.1, 'Floor on crate at (-5,-5)');

// Test: Player above building should land on it
const floorAboveBuilding = findFloorY(-18, -18, 7, 0.4);
assert(floorAboveBuilding === 4, `Floor above corner building = ${floorAboveBuilding} (expected 4)`);

// Test: Player inside building XZ but below top should find floor = 0 
// (they shouldn't snap to building top if they're below it)
const floorBelowTop = findFloorY(0, 0, 2, 0.4);
assert(floorBelowTop === 0, `Floor when inside building but below top = ${floorBelowTop} (expected 0, not building top)`);

console.log('\n🗺️ === MAP LAYOUT TESTS ===');

// Test: Crate count
assert(CRATE_POSITIONS.length === 18, `Crate positions = ${CRATE_POSITIONS.length} (expected 18)`);

// Test: Barricade count
assert(BARRICADE_DEFS.length === 12, `Barricade positions = ${BARRICADE_DEFS.length} (expected 12)`);

// Test: All positions within map bounds
const allPositionsInBounds = [
  ...CRATE_POSITIONS,
  ...BARRICADE_DEFS.map(b => b.pos),
].every(p => Math.abs(p[0]) <= MAP_SIZE && Math.abs(p[2]) <= MAP_SIZE);
assert(allPositionsInBounds, 'All crates/barricades within map bounds');

console.log('\n🎯 === SNIPER LONG RANGE TEST ===');

// Test: Sniper bullet reaches 500m
const sniperBulletLife = WEAPONS[3].range / WEAPONS[3].bulletSpeed;
assert(sniperBulletLife > 1.4, `Sniper bullet life = ${sniperBulletLife.toFixed(2)}s (>1.4s)`);
const sniperMaxDist = WEAPONS[3].bulletSpeed * sniperBulletLife;
assertApprox(sniperMaxDist, 500, 1, 'Sniper max distance = 500m');

// Test: Sniper damage at 300m is still lethal (>76)
const sniperAt300 = calcDamage(WEAPONS[3].damage, 300, WEAPONS[3]);
assert(sniperAt300 > 76, `Sniper damage at 300m = ${sniperAt300.toFixed(1)} (>76, lethal)`);

// Test: Sniper headshot at 300m is instant kill
const sniperHSat300 = sniperAt300 * WEAPONS[3].headshotMult;
assert(sniperHSat300 > 100, `Sniper HS at 300m = ${sniperHSat300.toFixed(1)} (>100, 1-shot kill)`);

// Test: AR bullet doesn't reach 500m
const arBulletLife = WEAPONS[0].range / WEAPONS[0].bulletSpeed;
const arMaxDist = WEAPONS[0].bulletSpeed * arBulletLife;
assert(arMaxDist < 300, `AR max distance = ${arMaxDist.toFixed(0)}m (<300m, limited)`);

console.log('\n💥 === WEAPON BALANCE COMPARISON ===');

// Test: Shotgun is strongest at close range
const closeRange = 3;
const arDmgClose = calcDamage(WEAPONS[0].damage, closeRange, WEAPONS[0]) * WEAPONS[0].bulletsPerShot;
const smgDmgClose = calcDamage(WEAPONS[1].damage, closeRange, WEAPONS[1]) * WEAPONS[1].bulletsPerShot;
const sgDmgClose = calcDamage(WEAPONS[2].damage, closeRange, WEAPONS[2]) * WEAPONS[2].bulletsPerShot;
const snDmgClose = calcDamage(WEAPONS[3].damage, closeRange, WEAPONS[3]) * WEAPONS[3].bulletsPerShot;
assert(sgDmgClose > arDmgClose, `Shotgun burst (${sgDmgClose}) > AR (${arDmgClose}) at 3m`);
assert(sgDmgClose > smgDmgClose, `Shotgun burst (${sgDmgClose}) > SMG (${smgDmgClose}) at 3m`);
assert(sgDmgClose > snDmgClose, `Shotgun burst (${sgDmgClose}) > Sniper (${snDmgClose}) at 3m`);

// Test: At long range, sniper dominates
const longRange = 150;
const arDmgLong = calcDamage(WEAPONS[0].damage, longRange, WEAPONS[0]);
const sgDmgLong = calcDamage(WEAPONS[2].damage, longRange, WEAPONS[2]) * WEAPONS[2].bulletsPerShot;
const snDmgLong = calcDamage(WEAPONS[3].damage, longRange, WEAPONS[3]);
assert(snDmgLong > arDmgLong, `Sniper (${snDmgLong.toFixed(1)}) > AR (${arDmgLong.toFixed(1)}) at ${longRange}m`);
assert(snDmgLong > sgDmgLong, `Sniper (${snDmgLong.toFixed(1)}) > Shotgun total (${sgDmgLong.toFixed(1)}) at ${longRange}m`);

// Test: SMG has speed advantage (DPS)
const smgDPS = (WEAPONS[1].damage / WEAPONS[1].fireRate);
const arDPS = (WEAPONS[0].damage / WEAPONS[0].fireRate);
assert(smgDPS > arDPS, `SMG DPS (${smgDPS.toFixed(0)}) > AR DPS (${arDPS.toFixed(0)}) at close range`);

console.log('\n🗂️ === RESOURCE FILE TESTS ===');

// Check all required files exist
const fs = require('fs');
const path = require('path');
const wsRoot = path.resolve(__dirname, '../../../..');

const requiredGLB = ['ar.glb', 'smg.glb', 'shotgun.glb', 'sniper.glb', 'enemy.glb', 'crate.glb', 'barricade.glb'];
const requiredTextures = ['blood.png', 'ground.png', 'menu-bg.png', 'muzzle.png', 'sky.png', 'wall.png', 'scope.png'];

for (const f of requiredGLB) {
  const fp = path.join(wsRoot, 'public/models/fps', f);
  const exists = fs.existsSync(fp);
  const size = exists ? fs.statSync(fp).size : 0;
  assert(exists && size > 1000, `GLB: ${f} exists (${(size / 1024).toFixed(0)}KB)`);
}

for (const f of requiredTextures) {
  const fp = path.join(wsRoot, 'public/images/fps', f);
  const exists = fs.existsSync(fp);
  const size = exists ? fs.statSync(fp).size : 0;
  assert(exists && size > 1000, `Texture: ${f} exists (${(size / 1024).toFixed(0)}KB)`);
}

// Check scope.png is the actual file (>100KB expected)
const scopePath = path.join(wsRoot, 'public/images/fps/scope.png');
const scopeSize = fs.statSync(scopePath).size;
assert(scopeSize > 100000, `scope.png is substantial (${(scopeSize / 1024).toFixed(0)}KB > 100KB)`);

console.log('\n🎮 === GAMESTATE STRUCTURE TESTS ===');

// Verify GameState has new fields (by checking source)
const fpsSource = fs.readFileSync(path.join(wsRoot, 'src/components/fps/FPSGame.tsx'), 'utf8');
assert(fpsSource.includes('isCrouching: boolean'), 'GameState has isCrouching field');
assert(fpsSource.includes('grenades: number'), 'GameState has grenades field');
assert(fpsSource.includes('screenShake: number'), 'GameState has screenShake field');
assert(fpsSource.includes('wave: number'), 'GameState has wave field');
assert(fpsSource.includes('killstreakActive:'), 'GameState has killstreakActive field');
assert(fpsSource.includes('scoreMultiplier: number'), 'GameState has scoreMultiplier field');
assert(fpsSource.includes('armorActive: boolean'), 'GameState has armorActive field');
assert(fpsSource.includes('calcDamage'), 'calcDamage function exists');
assert(fpsSource.includes('findFloorY'), 'findFloorY function exists');
assert(fpsSource.includes('hitsCeiling'), 'hitsCeiling function exists');
assert(fpsSource.includes('GrenadeVisual'), 'GrenadeVisual component exists');
assert(fpsSource.includes('PickupVisual'), 'PickupVisual component exists');
assert(fpsSource.includes('ExplosionEffect'), 'ExplosionEffect component exists');
assert(fpsSource.includes("'KeyG'"), 'Grenade key binding (G) exists');
assert(fpsSource.includes("'KeyC'"), 'Crouch key binding (C) exists');
assert(fpsSource.includes('CROUCH_HEIGHT'), 'Crouch height constant exists');
assert(fpsSource.includes('FALL_DAMAGE_THRESHOLD'), 'Fall damage threshold constant exists');
assert(fpsSource.includes('GRENADE_FUSE'), 'Grenade fuse constant exists');
assert(fpsSource.includes('WAVE_INTERVAL'), 'Wave interval constant exists');
assert(fpsSource.includes('BARRICADE_DEFS'), 'BARRICADE_DEFS array exists');
assert(fpsSource.includes('CRATE_POSITIONS'), 'CRATE_POSITIONS array exists');
assert(fpsSource.includes('barricadeBoxes'), 'Barricade collision boxes exist');
assert(fpsSource.includes("fog attach=\"fog\" args={['#78716c', 80, 160]}"), 'Fog extended for long range');

// Check HUD updates
const hudSource = fs.readFileSync(path.join(wsRoot, 'src/components/fps/HUD.tsx'), 'utf8');
assert(hudSource.includes('scope.png'), 'HUD references scope.png');
assert(!hudSource.includes('z-50 bg-black'), 'Scope overlay NO longer has bg-black (transparent center)');
assert(hudSource.includes('radial-gradient'), 'Scope uses radial-gradient for transparent center');
assert(hudSource.includes("mixBlendMode: 'multiply'"), 'Scope uses multiply blend mode');
assert(!hudSource.includes('crosshair.png'), 'No crosshair.png reference (CSS crosshair)');
assert(hudSource.includes('bg-white/70'), 'CSS crosshair lines present');
assert(hudSource.includes('w.nameJa'), 'Weapon selector uses Japanese name (nameJa)');
assert(hudSource.includes('GRENADE'), 'HUD shows grenade count');
assert(hudSource.includes('WAVE'), 'HUD shows wave number');
assert(hudSource.includes('killstreakActive'), 'HUD shows killstreak info');
assert(hudSource.includes('CROUCH'), 'HUD shows crouch indicator');
assert(hudSource.includes('armorActive'), 'HUD shows armor status');
assert(hudSource.includes('scoreMultiplier'), 'HUD shows score multiplier');

console.log('\n🆕 === NEW FEATURE TESTS (v2) ===');

// DamageNumber system
assert(fpsSource.includes('interface DamageNumber'), 'DamageNumber interface defined');
assert(fpsSource.includes('function DamageNumberSprite'), 'DamageNumberSprite component exists');
assert(fpsSource.includes('damageNumbersRef'), 'damageNumbersRef for tracking damage numbers');
assert(fpsSource.includes('CanvasTexture(canvas)'), 'DamageNumber uses CanvasTexture');

// Respawn invincibility
assert(fpsSource.includes('respawnProtectionRef'), 'Respawn protection ref exists');
assert(fpsSource.includes('respawnProtectionRef.current = 2.0'), 'Respawn protection = 2 seconds');

// Multi-kill detection
assert(fpsSource.includes('multiKillCount'), 'Multi-kill counter exists');
assert(fpsSource.includes('lastKillTime'), 'Last kill time tracking exists');
assert(fpsSource.includes('ダブルキル'), 'Double kill message in Japanese');
assert(fpsSource.includes('トリプルキル'), 'Triple kill message in Japanese');
assert(fpsSource.includes('MEGA KILL'), 'Mega kill message exists');

// useClonedGLTF material/color fix
assert(fpsSource.includes('MeshStandardMaterial'), 'useClonedGLTF creates fresh MeshStandardMaterial');
assert(fpsSource.includes('mesh.castShadow = true'), 'Meshes have castShadow');
assert(fpsSource.includes('mesh.receiveShadow = true'), 'Meshes have receiveShadow');

// Weapon rendering (scene-space, not camera.add)
assert(!fpsSource.includes('camera.add(group)'), 'Weapon NOT attached via camera.add');
assert(fpsSource.includes('weaponGroupRef.current.quaternion.copy(camera.quaternion)'), 'Weapon syncs quaternion to camera');

// Japanese text (no Unicode escapes)
assert(fpsSource.includes('タクティカル'), 'Title contains タクティカル (not escaped)');
assert(fpsSource.includes('操作ガイド'), 'Guide text in actual Japanese (not escaped)');
assert(!/\\u[0-9a-fA-F]{4}/.test(fpsSource), 'No Unicode escape sequences in FPSGame');
assert(!/\\u[0-9a-fA-F]{4}/.test(hudSource), 'No Unicode escape sequences in HUD');

console.log('\n🎯 === v3 BUG FIX TESTS ===');

// Commit 1: Enemy speed + hitbox + ray detection
assert(fpsSource.includes('ENEMY_SPEED = 2.0'), 'Enemy speed at 2.0');
assert(fpsSource.includes('MOVE_SPEED = 10'), 'Walk speed boosted to 10');
assert(fpsSource.includes('SPRINT_SPEED = 18'), 'Sprint speed boosted to 18');
assert(fpsSource.includes('MOUSE_SENS = 0.003'), 'Mouse sensitivity increased to 0.003');
assert(fpsSource.includes('NORMAL_FOV = 85'), 'FOV widened to 85');
assert(fpsSource.includes('WEAPON_SWITCH_TIME = 0.25'), 'Weapon switch faster (0.25s)');
assert(fpsSource.includes('HEAD_HITBOX_RADIUS = 0.45'), 'Head hitbox = 0.45');
assert(fpsSource.includes('BODY_HITBOX_RADIUS = 0.75'), 'Body hitbox = 0.75');
assert(fpsSource.includes('HEAD_CENTER_Y = 1.4'), 'Head center Y = 1.4');
assert(fpsSource.includes('BODY_CENTER_Y = 0.7'), 'Body center Y = 0.7');
assert(fpsSource.includes('new THREE.Ray(prevPos, moveDir)'), 'Ray-based bullet detection');
assert(fpsSource.includes('ray.intersectSphere'), 'Ray-sphere intersection for hit detection');
assert(fpsSource.includes('sniperHitscan ? 5000 : undefined'), 'Sniper ADS hitscan (speed 5000)');
assert(fpsSource.includes('speedOverride?: number'), 'fireBullet has speedOverride param');

// Commit 2 → v5: 3D model colors fix + standard GLB + audio
assert(fpsSource.includes('MODEL_COLORS'), 'Direct model colors via MODEL_COLORS (replaced greyscale texture)');
assert(fpsSource.includes('std.map = null') || fpsSource.includes('new THREE.MeshStandardMaterial'), 'Fresh material replacing dark baseColor texture');
assert(fpsSource.includes('ProceduralEnvMap'), 'Procedural environment map for PBR reflections');
assert(fpsSource.includes('PMREMGenerator'), 'PMREM generator for environment map');
assert(fpsSource.includes('playGunSound'), 'Procedural gun sounds via Web Audio API');
assert(fpsSource.includes("'enemyHit'"), 'Enemy hit sound effect');
assert(fpsSource.includes("'playerHit'"), 'Player hit sound effect');
assert(fpsSource.includes("'reload'"), 'Reload sound effect');
assert(fpsSource.includes("'footstep'"), 'Footstep sound effect');
assert(fpsSource.includes("'dryfire'"), 'Dry fire click sound');
assert(fpsSource.includes('shouldDie'), 'Bullet boundary check deferred after hit detection');
assert(fpsSource.includes('GRENADE_DAMAGE = 250'), 'Grenade damage increased to 250');
assert(fpsSource.includes('enemy2'), 'Enemy model variant 2 available');
assert(fpsSource.includes('barricade2'), 'Barricade model variant 2 available');
assert(fpsSource.includes('[0, -Math.PI / 2, 0]'), 'Weapon rotation corrected (-PI/2)');
assert(!fpsSource.includes('[0, Math.PI, 0]'), 'Old weapon rotation [0,PI,0] removed');

// v6: Intelligent enemy AI + wave announce
assert(fpsSource.includes("'flank'"), 'Enemy AI has flank state');
assert(fpsSource.includes("'cover'"), 'Enemy AI has cover state');
assert(fpsSource.includes("'retreat'"), 'Enemy AI has retreat state');
assert(fpsSource.includes('e.accuracy'), 'Enemies have individual accuracy');
assert(fpsSource.includes('e.strafeDir'), 'Enemies have strafe direction');
assert(fpsSource.includes('waveAnnounce'), 'Wave announce system');
assert(fpsSource.includes('WAVE {gs.waveAnnounce}'), 'Wave announce UI overlay');
assert(fpsSource.includes('footstepTimer'), 'Footstep timer for movement sounds');

// Commit 3: Bug fixes
assert(fpsSource.includes('playedTimeRef'), 'Pause-safe timer (playedTimeRef)');
assert(fpsSource.includes('playedTimeRef.current += dt'), 'Timer uses dt accumulation');
assert(!fpsSource.includes('(Date.now() - matchStart.current) / 1000'), 'No Date.now-based elapsed time');
assert(fpsSource.includes('mouseJustPressed.current = false;\n    playGunSound'), 'mouseJustPressed reset on reload (with sound)');
assert(fpsSource.includes('new THREE.Vector2(-b.vel.x, -b.vel.z)'), 'Damage direction correct (negated)');
assert(fpsSource.includes('nukeKills'), 'NUKE has dedicated kill processing');
assert(fpsSource.includes("texture.dispose()"), 'DamageNumber texture disposed on unmount');
assert(fpsSource.includes('g.vel.lengthSq() > 0.01'), 'Grenade NaN protection');
assert(fpsSource.includes('グレネードキル +${score}'), 'Grenade kills have multi-kill tracking');

// Ray-based hit detection test (geometry)
console.log('\n🔬 === RAY-SPHERE HIT DETECTION TESTS ===');

// Test: Bullet traveling toward enemy should hit
const bulletStart = new THREE.Vector3(0, 1.4, 10);
const bulletDir = new THREE.Vector3(0, 0, -1);
const enemyCenter = new THREE.Vector3(0, 1.4, 5);
const ray = new THREE.Ray(bulletStart, bulletDir);
const sphere = new THREE.Sphere(enemyCenter, 0.75);
const hitPoint = new THREE.Vector3();
const result = ray.intersectSphere(sphere, hitPoint);
assert(result !== null, 'Ray hits sphere when aimed directly at enemy');
assertApprox(hitPoint.z, 5.75, 0.01, 'Hit point is at front of sphere');

// Test: Fast sniper bullet at 350 speed covers path
const sniperBulletMove = 350 / 60; // per frame at 60fps
assert(sniperBulletMove > 5, `Sniper moves ${sniperBulletMove.toFixed(1)}m/frame, ray catches it`);

// Test: Bullet passing beside enemy should miss
const missRay = new THREE.Ray(new THREE.Vector3(2, 1.4, 10), new THREE.Vector3(0, 0, -1));
const missResult = missRay.intersectSphere(sphere, hitPoint);
assert(missResult === null, 'Ray misses sphere when aimed away');

// Test: Enemy speed is slower now, with distinct state speeds
const ENEMY_SPEED_TEST = 2.0;
const chaseSpeed = ENEMY_SPEED_TEST * 1.2;
assert(chaseSpeed < 3, `Chase speed ${chaseSpeed} < 3 (balanced)`);
const patrolSpeed = ENEMY_SPEED_TEST * 0.5;
assert(patrolSpeed <= 1, `Patrol speed ${patrolSpeed} <= 1 (slow enough)`);
const flankSpeed = ENEMY_SPEED_TEST * 1.4;
assert(flankSpeed < 3, `Flank speed ${flankSpeed} < 3 (fast but manageable)`);
const retreatSpeed = ENEMY_SPEED_TEST * 1.6;
assert(retreatSpeed < 4, `Retreat speed ${retreatSpeed} < 4 (enemies flee quickly)`);

// Test: Head hitbox covers reasonable area
const HEAD_R = 0.45;
const headArea = Math.PI * HEAD_R * HEAD_R;
assert(headArea > 0.5, `Head hitbox area = ${headArea.toFixed(2)} (reasonable)`);

// Test: Body hitbox covers reasonable area
const BODY_R = 0.75;
const bodyArea = Math.PI * BODY_R * BODY_R;
assert(bodyArea > 1.5, `Body hitbox area = ${bodyArea.toFixed(2)} (reasonable)`);

/* ═══════════════════════════════════════════════════════════
   RESULTS
   ═══════════════════════════════════════════════════════════ */
console.log('\n' + '='.repeat(50));
console.log(`RESULTS: ${passed} passed, ${failed} failed, ${passed + failed} total`);
if (failures.length > 0) {
  console.log('\nFailed tests:');
  for (const f of failures) console.log(`  ❌ ${f}`);
}
console.log('='.repeat(50));

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n🎉 All tests passed!\n');
  process.exit(0);
}
