'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  /** drift velocity (parallax layers) */
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
  /** secondary lobes for organic shape */
  lobes: { angle: number; dist: number; radius: number; phaseSpeed: number; phase: number }[];
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
