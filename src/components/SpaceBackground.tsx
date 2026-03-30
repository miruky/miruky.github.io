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

      // Nebulae – colourful gas clouds
      nebulae = [
        { x: w * 0.2, y: h * 0.3, radius: Math.max(w, h) * 0.18, r: 60, g: 80, b: 200, alpha: 0.04, driftX: 0.08, driftY: 0.03, pulseSpeed: 0.4, pulseOffset: 0 },
        { x: w * 0.75, y: h * 0.6, radius: Math.max(w, h) * 0.22, r: 140, g: 40, b: 180, alpha: 0.03, driftX: -0.06, driftY: 0.04, pulseSpeed: 0.3, pulseOffset: 2 },
        { x: w * 0.5, y: h * 0.15, radius: Math.max(w, h) * 0.12, r: 30, g: 160, b: 220, alpha: 0.035, driftX: 0.04, driftY: -0.02, pulseSpeed: 0.5, pulseOffset: 4 },
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

      // Nebulae (soft radial gradients)
      nebulae.forEach((n) => {
        n.x += n.driftX;
        n.y += n.driftY;
        // wrap
        if (n.x < -n.radius) n.x = w + n.radius;
        if (n.x > w + n.radius) n.x = -n.radius;
        if (n.y < -n.radius) n.y = h + n.radius;
        if (n.y > h + n.radius) n.y = -n.radius;

        const pulse = 1 + Math.sin(time * n.pulseSpeed + n.pulseOffset) * 0.15;
        const r = n.radius * pulse;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
        grad.addColorStop(0, `rgba(${n.r},${n.g},${n.b},${n.alpha * 1.5})`);
        grad.addColorStop(0.4, `rgba(${n.r},${n.g},${n.b},${n.alpha * 0.8})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(n.x - r, n.y - r, r * 2, r * 2);
      });

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
