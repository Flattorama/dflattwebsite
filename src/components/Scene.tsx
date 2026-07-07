import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HERO_PHRASES, HERO_MICROCOPY, ORBITERS, ORBIT_CONFIG } from '../constants';
import { OrbiterIcon } from './OrbiterIcons';
import { useReducedMotion } from '../lib/useReducedMotion';
import './Scene.css';

const Scene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);
  const orbiterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const header = headerContentRef.current;
    if (!container || !header) return;

    const cfg = ORBIT_CONFIG;
    const count = ORBITERS.length;
    const tilt = (cfg.tiltDeg * Math.PI) / 180;
    const cosTilt = Math.cos(tilt);
    const sinTilt = Math.sin(tilt);

    // --- GEOMETRY CACHE ---
    // Rects are measured on resize/scroll only — never inside the rAF loop.
    const geom = { cx: 0, cy: 0, rx: 0, ry: 0, left: 0, top: 0 };
    const measure = () => {
      const c = container.getBoundingClientRect();
      const h = header.getBoundingClientRect();
      geom.cx = h.left - c.left + h.width / 2;
      geom.cy = h.top - c.top + h.height / 2;
      geom.rx = h.width * cfg.radiusXFactor;
      geom.ry = geom.rx * Math.cos((cfg.flattenDeg * Math.PI) / 180);
      geom.left = c.left;
      geom.top = c.top;
    };
    measure();

    // Positions one orbiter; returns its depth factor (sin of orbit angle).
    const placeOrbiter = (
      el: HTMLDivElement,
      i: number,
      baseAngle: number,
      bob: number,
      repelX: number,
      repelY: number
    ) => {
      const angle = baseAngle * cfg.speedOffsets[i] + (Math.PI * 2 * i) / count;
      const x = Math.cos(angle) * geom.rx;
      const y = Math.sin(angle) * geom.ry;
      const px = geom.cx + (x * cosTilt - y * sinTilt) + repelX;
      const py = geom.cy + (x * sinTilt + y * cosTilt) + bob + repelY;
      const depth = Math.sin(angle);
      const scale = 0.6 + 0.4 * (depth * 0.5 + 0.5);

      el.style.transform = `translate(-50%, -50%) translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      el.style.zIndex = depth > 0 ? '10' : '0';
      el.style.opacity = (0.5 + 0.5 * (depth * 0.5 + 0.5)).toFixed(3);
      el.classList.toggle('is-front', depth > cfg.labelDepthThreshold);
      el.classList.toggle('is-far', depth < 0);
      return depth;
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      if (reducedMotion) {
        orbiterRefs.current.forEach((el, i) => el && placeOrbiter(el, i, 0, 0, 0, 0));
      }
    });
    resizeObserver.observe(container);
    resizeObserver.observe(header);

    // --- REDUCED MOTION: static hero, icons resting on the ring ---
    if (reducedMotion) {
      orbiterRefs.current.forEach((el, i) => el && placeOrbiter(el, i, 0, 0, 0, 0));
      return () => resizeObserver.disconnect();
    }

    const onScroll = () => {
      const c = container.getBoundingClientRect();
      geom.left = c.left;
      geom.top = c.top;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Place orbiters on the ring immediately, so they're never stuck at the
    // container origin if the page loads while hidden (loop paused).
    orbiterRefs.current.forEach((el, i) => el && placeOrbiter(el, i, 0, 0, 0, 0));

    // --- CYCLING TEXT LOOP ---
    const textInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length);
    }, 5000);

    // --- POINTER TRACKING ---
    // Touch devices get a slow autonomous drift instead of device-orientation
    // (which needs a user-gesture permission prompt on iOS).
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const cursor = { x: -99999, y: -99999 };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      container.style.setProperty('--perspective-x', ((e.clientX - w / 2) / (w / 2)).toFixed(4));
      container.style.setProperty('--perspective-y', ((e.clientY - h / 2) / (h / 2)).toFixed(4));
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    if (!isCoarsePointer) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // --- ORBIT ANIMATION LOOP ---
    let rafId = 0;
    let running = false;
    let startTime: number | null = null;
    const repel = ORBITERS.map(() => ({ x: 0, y: 0 }));

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const baseAngle = ((elapsed % cfg.durationMs) / cfg.durationMs) * Math.PI * 2;

      if (isCoarsePointer) {
        container.style.setProperty('--perspective-x', (Math.sin(elapsed * 0.00012) * 0.5).toFixed(4));
        container.style.setProperty('--perspective-y', (Math.cos(elapsed * 0.00009) * 0.5).toFixed(4));
      }

      orbiterRefs.current.forEach((el, i) => {
        if (!el) return;

        const bob =
          Math.sin(elapsed * 0.0025 * cfg.bobFrequencies[i] + i * 1.7) * cfg.bobAmplitudePx;

        // Pointer repel: orbiters near the cursor get a small, lerped push
        let targetX = 0;
        let targetY = 0;
        if (!isCoarsePointer) {
          const angle = baseAngle * cfg.speedOffsets[i] + (Math.PI * 2 * i) / count;
          const ox = Math.cos(angle) * geom.rx;
          const oy = Math.sin(angle) * geom.ry;
          const vx = geom.left + geom.cx + (ox * cosTilt - oy * sinTilt);
          const vy = geom.top + geom.cy + (ox * sinTilt + oy * cosTilt);
          const dx = vx - cursor.x;
          const dy = vy - cursor.y;
          const dist = Math.hypot(dx, dy);
          if (dist < cfg.repelRadiusPx && dist > 0.001) {
            const force = (cfg.repelRadiusPx - dist) * cfg.repelStrength;
            targetX = (dx / dist) * force;
            targetY = (dy / dist) * force;
          }
        }
        repel[i].x += (targetX - repel[i].x) * 0.12;
        repel[i].y += (targetY - repel[i].y) * 0.12;

        placeOrbiter(el, i, baseAngle, bob, repel[i].x, repel[i].y);
      });

      if (running) rafId = requestAnimationFrame(animate);
    };

    // --- PAUSE WHEN INVISIBLE (scrolled away or tab hidden) ---
    let inView = true;
    const setRunning = () => {
      const shouldRun = inView && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        rafId = requestAnimationFrame(animate);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(rafId);
      }
    };
    const intersectionObserver = new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      setRunning();
    });
    intersectionObserver.observe(container);
    const onVisibilityChange = () => setRunning();
    document.addEventListener('visibilitychange', onVisibilityChange);
    setRunning();

    return () => {
      if (!isCoarsePointer) window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      running = false;
      cancelAnimationFrame(rafId);
      clearInterval(textInterval);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`scene-container w-full h-full flex flex-col justify-center items-center${reducedMotion ? ' is-static' : ''}`}
    >
      <div className="name-header-wrapper">
        <div className="name-header">
          DAN<br />FLATT
        </div>
      </div>

      <div className="header-container">
        <div ref={headerContentRef} className="header-content">
          <h1 className="hero-text top" data-text="Marketing">Marketing</h1>

          <div className="orbit-system">
            <div className="orbit-ring"></div>
            <div className="orbit-ring orbit-ring--counter"></div>
          </div>

          <h1 className="hero-text hero-text--accent bottom" data-text="× AI">× AI</h1>

          {/* Cycling Text Component */}
          <div className="subtitle-wrapper">
            <div key={phraseIndex} className="cycling-phrase">
              {HERO_PHRASES[phraseIndex]}
            </div>
          </div>

          <div className="hero-microcopy">{HERO_MICROCOPY}</div>

          <div className="hero-cta-row">
            <a href="#work" className="hero-cta hero-cta--primary">See the work ↓</a>
            <Link to="/speaking" className="hero-cta hero-cta--secondary">Book me to speak →</Link>
          </div>
        </div>
      </div>

      {/* --- ORBITING DISCIPLINE ICONS --- */}
      {ORBITERS.map((orbiter, i) => (
        <div
          key={orbiter.id}
          className="js-orbiter"
          ref={(el) => { orbiterRefs.current[i] = el; }}
        >
          <OrbiterIcon id={orbiter.id} />
          <div className="orbiter-label">{orbiter.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Scene;
