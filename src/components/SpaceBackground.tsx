'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  vx: number;
  vy: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  driftX: number;
  driftY: number;
  pulseSpeed: number;
  pulseOffset: number;
  lobes: { angle: number; dist: number; radius: number; phaseSpeed: number; phase: number }[];
}

interface Galaxy {
  x: number;
  y: number;
  size: number;
  angle: number;       // current rotation
  rotSpeed: number;     // rad/s
  tilt: number;         // perspective tilt (0-1, lower = more edge-on)
  brightness: number;
  texture: HTMLCanvasElement; // pre-rendered texture
}

/* ─── Pre-render a spiral galaxy onto an offscreen canvas ─── */
function createGalaxyTexture(size: number, arms: number, tilt: number): HTMLCanvasElement {
  const s = Math.ceil(size * 2);
  const off = document.createElement('canvas');
  off.width = s;
  off.height = s;
  const c = off.getContext('2d')!;
  const cx = s / 2;
  const cy = s / 2;
  const r = size;

  // Bright core glow
  const core = c.createRadialGradient(cx, cy, 0, cx, cy, r * 0.15);
  core.addColorStop(0, 'rgba(255,245,220,0.9)');
  core.addColorStop(0.3, 'rgba(255,230,180,0.5)');
  core.addColorStop(1, 'rgba(255,230,180,0)');
  c.fillStyle = core;
  c.fillRect(0, 0, s, s);

  // Spiral arms – many small dots along logarithmic spirals
  for (let arm = 0; arm < arms; arm++) {
    const armAngle = (arm / arms) * Math.PI * 2;
    for (let i = 0; i < 600; i++) {
      const t = i / 600;
      const spiralR = r * 0.08 + r * 0.85 * t;
      const theta = armAngle + t * Math.PI * 3 + (Math.random() - 0.5) * 0.6;
      // Add spread perpendicular to arm
      const spread = (Math.random() - 0.5) * r * 0.12 * (0.3 + t * 0.7);
      const px = cx + Math.cos(theta) * spiralR + Math.cos(theta + Math.PI / 2) * spread;
      const py = cy + (Math.sin(theta) * spiralR + Math.sin(theta + Math.PI / 2) * spread) * tilt;

      const dist = Math.sqrt((px - cx) ** 2 + ((py - cy) / tilt) ** 2) / r;
      const fade = Math.max(0, 1 - dist * 1.1);
      const alpha = fade * (0.15 + Math.random() * 0.35);
      const dotSize = (0.5 + Math.random() * 1.5) * (1 - t * 0.5);

      // Slight blue tint for young stars in outer arms, warm in center
      const warmth = 1 - t;
      const rr = Math.floor(180 + warmth * 60);
      const gg = Math.floor(190 + warmth * 40 - t * 40);
      const bb = Math.floor(220 + t * 35);

      c.beginPath();
      c.arc(px, py, dotSize, 0, Math.PI * 2);
      c.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`;
      c.fill();
    }
  }

  // Diffuse disk glow
  const disk = c.createRadialGradient(cx, cy, 0, cx, cy, r * 0.7);
  disk.addColorStop(0, 'rgba(200,210,240,0.12)');
  disk.addColorStop(0.5, 'rgba(180,190,220,0.04)');
  disk.addColorStop(1, 'rgba(0,0,0,0)');
  c.globalCompositeOperation = 'screen';
  c.fillStyle = disk;
  c.fillRect(0, 0, s, s);
  c.globalCompositeOperation = 'source-over';

  return off;
}

/* ─── Pre-render milky way band onto offscreen canvas ─── */
function createMilkyWayTexture(w: number, h: number): HTMLCanvasElement {
  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  const c = off.getContext('2d')!;

  // The milky way is a wide, angled band across the screen
  c.save();
  c.translate(w / 2, h / 2);
  c.rotate(-0.25); // slight angle

  const bandH = h * 0.35;
  // Multiple passes for organic look
  for (let pass = 0; pass < 3; pass++) {
    const spread = bandH * (0.8 + pass * 0.3);
    const alpha = 0.025 - pass * 0.006;
    for (let i = 0; i < 2000; i++) {
      const px = (Math.random() - 0.5) * w * 1.6;
      const py = (Math.random() - 0.5) * spread * (0.5 + 0.5 * Math.pow(Math.random(), 0.5));
      const dist = Math.abs(py) / (spread * 0.5);
      const fade = Math.max(0, 1 - dist);
      const a = alpha * fade * (0.5 + Math.random() * 0.5);
      const sz = 1 + Math.random() * 3;

      // Mix of warm and cool whites
      const tone = Math.random();
      const rr = Math.floor(180 + tone * 60);
      const gg = Math.floor(185 + tone * 50);
      const bb = Math.floor(200 + tone * 55);

      c.beginPath();
      c.arc(px, py, sz, 0, Math.PI * 2);
      c.fillStyle = `rgba(${rr},${gg},${bb},${a})`;
      c.fill();
    }

    // Soft glow band
    const grad = c.createLinearGradient(0, -spread * 0.6, 0, spread * 0.6);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.3, `rgba(160,170,200,${alpha * 0.8})`);
    grad.addColorStop(0.5, `rgba(180,185,210,${alpha * 1.2})`);
    grad.addColorStop(0.7, `rgba(160,170,200,${alpha * 0.8})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = grad;
    c.fillRect(-w, -spread * 0.6, w * 2, spread * 1.2);
  }

  // Dark dust lanes through the center
  for (let i = 0; i < 800; i++) {
    const px = (Math.random() - 0.5) * w * 1.4;
    const py = (Math.random() - 0.5) * bandH * 0.15;
    const sz = 2 + Math.random() * 5;
    c.beginPath();
    c.arc(px, py, sz, 0, Math.PI * 2);
    c.fillStyle = `rgba(10,14,39,${0.03 + Math.random() * 0.05})`;
    c.fill();
  }

  c.restore();
  return off;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let nebulae: Nebula[] = [];
    let galaxies: Galaxy[] = [];
    let milkyWayTex: HTMLCanvasElement | null = null;
    let w = 0;
    let h = 0;
    let time = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      // Stars – 3 layers (far, mid, near)
      const count = Math.floor((w * h) / 2200);
      stars = Array.from({ length: Math.min(count, 500) }, () => {
        const layer = Math.random();
        const speed = layer < 0.5 ? 0.02 : layer < 0.8 ? 0.06 : 0.12;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          size: layer < 0.5 ? Math.random() * 0.8 + 0.3 : layer < 0.8 ? Math.random() * 1.2 + 0.5 : Math.random() * 1.8 + 0.8,
          brightness: Math.random() * 0.6 + 0.4,
          twinkleSpeed: Math.random() * 2 + 1,
          twinkleOffset: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * speed,
          vy: -speed * 0.3 + (Math.random() - 0.5) * speed * 0.5,
        };
      });

      // Nebulae – larger, more vivid gas clouds with organic lobes
      const makeLobes = (count: number, baseRadius: number) =>
        Array.from({ length: count }, () => ({
          angle: Math.random() * Math.PI * 2,
          dist: baseRadius * (0.3 + Math.random() * 0.5),
          radius: baseRadius * (0.4 + Math.random() * 0.4),
          phaseSpeed: 0.1 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
        }));

      const S = Math.max(w, h);
      nebulae = [
        { x: w * 0.15, y: h * 0.35, radius: S * 0.25, r: 40, g: 70, b: 220, alpha: 0.06, driftX: 0.1, driftY: 0.04, pulseSpeed: 0.3, pulseOffset: 0, lobes: makeLobes(4, S * 0.25) },
        { x: w * 0.8, y: h * 0.55, radius: S * 0.3, r: 160, g: 30, b: 200, alpha: 0.05, driftX: -0.08, driftY: 0.05, pulseSpeed: 0.25, pulseOffset: 2, lobes: makeLobes(5, S * 0.3) },
        { x: w * 0.5, y: h * 0.12, radius: S * 0.18, r: 20, g: 180, b: 240, alpha: 0.055, driftX: 0.06, driftY: -0.03, pulseSpeed: 0.4, pulseOffset: 4, lobes: makeLobes(3, S * 0.18) },
        { x: w * 0.35, y: h * 0.75, radius: S * 0.2, r: 200, g: 60, b: 120, alpha: 0.04, driftX: 0.05, driftY: -0.06, pulseSpeed: 0.35, pulseOffset: 1, lobes: makeLobes(3, S * 0.2) },
        { x: w * 0.9, y: h * 0.2, radius: S * 0.15, r: 80, g: 40, b: 180, alpha: 0.045, driftX: -0.04, driftY: 0.03, pulseSpeed: 0.45, pulseOffset: 3, lobes: makeLobes(3, S * 0.15) },
      ];

      shootingStars = [];

      // Spiral galaxies – pre-rendered textures for performance
      const galaxyConfigs = [
        { x: 0.12, y: 0.22, sizeMul: 0.08, tilt: 0.55, rotSpeed: 0.02, brightness: 0.7 },
        { x: 0.72, y: 0.15, sizeMul: 0.06, tilt: 0.45, rotSpeed: -0.015, brightness: 0.6 },
        { x: 0.88, y: 0.65, sizeMul: 0.05, tilt: 0.6, rotSpeed: 0.018, brightness: 0.55 },
      ];
      galaxies = galaxyConfigs.map((gc) => {
        const sz = Math.max(w, h) * gc.sizeMul;
        return {
          x: w * gc.x,
          y: h * gc.y,
          size: sz,
          angle: Math.random() * Math.PI * 2,
          rotSpeed: gc.rotSpeed,
          tilt: gc.tilt,
          brightness: gc.brightness,
          texture: createGalaxyTexture(sz, 2, gc.tilt),
        };
      });

      // Milky way – pre-rendered once
      milkyWayTex = createMilkyWayTexture(w, h);
    };

    const spawnShootingStar = () => {
      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.2; // roughly diagonal
      const speed = 6 + Math.random() * 8;
      shootingStars.push({
        x: Math.random() * w * 1.2 - w * 0.1,
        y: -10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 40,
        size: Math.random() * 1.5 + 1,
      });
    };

    const draw = () => {
      time += 0.016; // ~60fps

      // Deep space base
      ctx.fillStyle = '#0a0e27';
      ctx.fillRect(0, 0, w, h);

      // Milky way band (pre-rendered, very slight drift)
      if (milkyWayTex) {
        const mx = Math.sin(time * 0.02) * 8;
        const my = Math.cos(time * 0.015) * 5;
        ctx.globalAlpha = 0.85;
        ctx.drawImage(milkyWayTex, mx, my);
        ctx.globalAlpha = 1;
      }

      // Spiral galaxies (pre-rendered textures, slowly rotating)
      ctx.globalCompositeOperation = 'screen';
      galaxies.forEach((g) => {
        g.angle += g.rotSpeed * 0.016;
        const pulse = 1 + Math.sin(time * 0.3) * 0.05;
        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.angle);
        ctx.globalAlpha = g.brightness * pulse;
        const s = g.size * 2;
        ctx.drawImage(g.texture, -s / 2, -s / 2, s, s);
        ctx.restore();
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      // Nebulae (multi-lobe organic gas clouds)
      ctx.globalCompositeOperation = 'screen';
      nebulae.forEach((n) => {
        n.x += n.driftX;
        n.y += n.driftY;
        // wrap
        if (n.x < -n.radius * 1.5) n.x = w + n.radius * 1.5;
        if (n.x > w + n.radius * 1.5) n.x = -n.radius * 1.5;
        if (n.y < -n.radius * 1.5) n.y = h + n.radius * 1.5;
        if (n.y > h + n.radius * 1.5) n.y = -n.radius * 1.5;

        // Core gradient
        const pulse = 1 + Math.sin(time * n.pulseSpeed + n.pulseOffset) * 0.2;
        const r = n.radius * pulse;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
        grad.addColorStop(0, `rgba(${n.r},${n.g},${n.b},${n.alpha * 1.8})`);
        grad.addColorStop(0.3, `rgba(${n.r},${n.g},${n.b},${n.alpha})`);
        grad.addColorStop(0.7, `rgba(${n.r},${n.g},${n.b},${n.alpha * 0.3})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(n.x - r, n.y - r, r * 2, r * 2);

        // Organic lobes – smaller overlapping clouds that orbit the core
        n.lobes.forEach((lobe) => {
          const a = lobe.angle + time * lobe.phaseSpeed;
          const d = lobe.dist * (1 + Math.sin(time * 0.5 + lobe.phase) * 0.2);
          const lx = n.x + Math.cos(a) * d;
          const ly = n.y + Math.sin(a) * d;
          const lr = lobe.radius * (1 + Math.sin(time * lobe.phaseSpeed * 1.3 + lobe.phase) * 0.15);

          const lgrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr);
          lgrad.addColorStop(0, `rgba(${n.r + 30},${n.g + 20},${n.b + 20},${n.alpha * 1.2})`);
          lgrad.addColorStop(0.5, `rgba(${n.r},${n.g},${n.b},${n.alpha * 0.5})`);
          lgrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = lgrad;
          ctx.fillRect(lx - lr, ly - lr, lr * 2, lr * 2);
        });
      });
      ctx.globalCompositeOperation = 'source-over';

      // Stars
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        // wrap
        if (s.x < -2) s.x = w + 2;
        if (s.x > w + 2) s.x = -2;
        if (s.y < -2) s.y = h + 2;
        if (s.y > h + 2) s.y = -2;

        const twinkle = 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        const alpha = s.brightness * (0.5 + twinkle * 0.5);

        // Glow
        if (s.size > 1) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
          glow.addColorStop(0, `rgba(200,220,255,${alpha * 0.3})`);
          glow.addColorStop(1, 'rgba(200,220,255,0)');
          ctx.fillStyle = glow;
          ctx.fillRect(s.x - s.size * 3, s.y - s.size * 3, s.size * 6, s.size * 6);
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (0.7 + twinkle * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,230,255,${alpha})`;
        ctx.fill();
      });

      // Shooting stars
      if (Math.random() < 0.008) spawnShootingStar(); // ~every 2 seconds on average
      shootingStars = shootingStars.filter((ss) => {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;
        if (ss.life > ss.maxLife) return false;

        const progress = ss.life / ss.maxLife;
        const fadein = Math.min(progress * 5, 1);
        const fadeout = 1 - Math.pow(progress, 2);
        const alpha = fadein * fadeout * 0.9;

        // Trail
        const tailLen = 30 + ss.size * 10;
        const grad = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - ss.vx * (tailLen / Math.sqrt(ss.vx ** 2 + ss.vy ** 2)),
          ss.y - ss.vy * (tailLen / Math.sqrt(ss.vx ** 2 + ss.vy ** 2))
        );
        grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        const norm = Math.sqrt(ss.vx ** 2 + ss.vy ** 2);
        ctx.lineTo(
          ss.x - ss.vx * (tailLen / norm),
          ss.y - ss.vy * (tailLen / norm)
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.size * alpha;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Head glow
        const headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, ss.size * 3);
        headGlow.addColorStop(0, `rgba(255,255,255,${alpha})`);
        headGlow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = headGlow;
        ctx.fillRect(ss.x - ss.size * 3, ss.y - ss.size * 3, ss.size * 6, ss.size * 6);

        return true;
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ zIndex: 0 }}
    />
  );
}
