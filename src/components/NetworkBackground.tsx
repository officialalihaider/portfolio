import React, { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseAlpha: number;
}

/**
 * Interactive "network / constellation" background.
 * Dots drift slowly, connect with nearby dots via lines,
 * and react to the cursor (attract + draw links to pointer).
 */
export const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDark } = useTheme();
  const themeRef = useRef(isDark);
  themeRef.current = isDark;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let dpr = 1;

    const mouse = { x: -9999, y: -9999, active: false };
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const LINK_DIST = 130;
    const MOUSE_DIST = 190;

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with viewport, capped for mobile performance
      const density = width < 640 ? 16000 : width < 1280 ? 13000 : 11500;
      const count = Math.max(28, Math.min(120, Math.round((width * height) / density)));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.6 + 0.9,
        baseAlpha: Math.random() * 0.45 + 0.35,
      }));
    };

    const draw = () => {
      const dark = themeRef.current;

      // Background wash (very subtle) — body supplies main colour
      ctx.clearRect(0, 0, width, height);

      const dotColor = dark ? '96, 165, 250' : '79, 70, 229';
      const lineColor = dark ? '129, 140, 248' : '99, 102, 241';
      const mouseLineColor = dark ? '56, 189, 248' : '139, 92, 246';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor interaction: gentle attraction + slight speed boost
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DIST && dist > 0.001) {
            const force = (1 - dist / MOUSE_DIST) * 0.028;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Damping keeps motion calm after cursor bursts
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Maintain a minimum drift so dots never fully stop
        const speed = Math.hypot(p.vx, p.vy);
        if (speed < 0.06) {
          p.vx += (Math.random() - 0.5) * 0.04;
          p.vy += (Math.random() - 0.5) * 0.04;
        } else if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        // Wrap around edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${p.baseAlpha})`;
        ctx.fill();
      }

      // Links between close particles
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = 1 - Math.sqrt(d2) / LINK_DIST;
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Links from cursor to nearby particles (the "network follows cursor" effect)
      if (mouse.active) {
        ctx.lineWidth = 0.9;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DIST) {
            const alpha = 1 - dist / MOUSE_DIST;
            ctx.strokeStyle = `rgba(${mouseLineColor}, ${alpha * 0.55})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // soft glow at the cursor hub
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r + alpha * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${mouseLineColor}, ${alpha * 0.35})`;
            ctx.fill();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouse.x = t.clientX;
      mouse.y = t.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(draw);
      }
    };

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 180);
    };

    setup();

    if (reduced) {
      // Draw a single static frame
      const dark = themeRef.current;
      const dotColor = dark ? '96, 165, 250' : '79, 70, 229';
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${p.baseAlpha})`;
        ctx.fill();
      });
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="no-print fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* soft radial glows */}
      <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-indigo-400/10 dark:bg-indigo-500/10 blur-3xl animate-float-slow" />
      <div
        className="absolute -bottom-40 -right-20 h-[460px] w-[460px] rounded-full bg-sky-400/10 dark:bg-sky-500/10 blur-3xl animate-float-slow"
        style={{ animationDelay: '4s' }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
};
