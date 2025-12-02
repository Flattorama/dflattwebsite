import React, { useEffect, useRef, useState } from 'react';

const Scene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);
  const orbiterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const phrases = [
    "I USED TO BE A LAWYER, BUT I GOT BETTER",
    "STRUCTURING CHAOS FOR GROWTH",
    "CODING WITH LEGAL PRECISION",
    "TURNING RISK INTO OPPORTUNITY",
    "BRIDGING VISION AND EXECUTION",
    "TRANSFORMING DATA INTO NARRATIVE",
    "I'M A STRATEGIC GROWTH ARCHITECT",
    "ENGINEERING DIGITAL TRUST",
    "SOLVING THE IMPLEMENTATION GAP",
    "NAVIGATING HIGH-STAKES COMPLEXITY"
  ];

  // Initialize array of refs
  if (orbiterRefs.current.length !== 6) {
    orbiterRefs.current = Array(6).fill(null);
  }

  useEffect(() => {
    // --- CYCLING TEXT LOOP ---
    const textInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 5000);

    // --- MOUSE TRACKING ---
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;
      const midX = w / 2;
      const midY = h / 2;
      const perspectiveX = (x - midX) / midX;
      const perspectiveY = (y - midY) / midY;

      containerRef.current.style.setProperty('--perspective-x', perspectiveX.toFixed(4));
      containerRef.current.style.setProperty('--perspective-y', perspectiveY.toFixed(4));
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!containerRef.current) return;
      const tiltX = (event.beta || 0) / 45; 
      const tiltY = (event.gamma || 0) / 45;
      const pX = Math.max(-1, Math.min(1, tiltY));
      const pY = Math.max(-1, Math.min(1, tiltX));
      containerRef.current.style.setProperty('--perspective-x', pX.toFixed(4));
      containerRef.current.style.setProperty('--perspective-y', pY.toFixed(4));
    };

    // --- ORBIT ANIMATION LOOP ---
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 12000;

    const animateOrbiters = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      const baseAngle = progress * Math.PI * 2;

      if (headerContentRef.current) {
        const rect = headerContentRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Ellipse parameters - Adjusted relative size for better mobile fit
        const radiusX = rect.width * 0.6; 
        const radiusY = rect.width * 0.6 * Math.cos(70 * Math.PI / 180);
        const tiltAngle = -10 * Math.PI / 180;

        orbiterRefs.current.forEach((el, index) => {
          if (!el) return;
          const offset = (Math.PI * 2 * index) / 6;
          const angle = baseAngle + offset;

          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY;

          const rotatedX = x * Math.cos(tiltAngle) - y * Math.sin(tiltAngle);
          const rotatedY = x * Math.sin(tiltAngle) + y * Math.cos(tiltAngle);

          el.style.left = `${centerX + rotatedX}px`;
          el.style.top = `${centerY + rotatedY}px`;

          const depthFactor = Math.sin(angle);
          // Slightly reduced scale variation to prevent massive icons
          const scale = 0.6 + 0.4 * (depthFactor * 0.5 + 0.5);
          
          el.style.transform = `translate(-50%, -50%) scale(${scale})`;
          // Adjust zIndex to ensure text stays readable when icons pass in front
          el.style.zIndex = depthFactor > 0 ? '10' : '0';
          el.style.opacity = (0.5 + 0.5 * (depthFactor * 0.5 + 0.5)).toString();
        });
      }

      animationFrameId = requestAnimationFrame(animateOrbiters);
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    
    animationFrameId = requestAnimationFrame(animateOrbiters);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      cancelAnimationFrame(animationFrameId);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --bg-color: #fcf8f3;
          --accent-color: #8082f8;
          --text-color: #ffffff;
        }

        .scene-container {
           --perspective-x: 0;
           --perspective-y: 0;
           font-family: "Bueno", "Haettenschweiler", "Impact", "Arial Narrow Bold", sans-serif;
           overflow: hidden; /* Prevent scrollbars from flying icons */
           padding: 1rem;
        }

        .name-header-wrapper {
          perspective: 1000px;
          margin-bottom: 2rem;
          transform-style: preserve-3d;
          text-align: center;
          width: 100%;
        }

        .name-header {
          color: var(--accent-color);
          /* Responsive font size */
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: bold;
          font-family: sans-serif;
          line-height: 0.9;
          transform-style: preserve-3d;
          transform: 
              rotateX(calc(var(--perspective-y) * 10deg)) 
              rotateY(calc(var(--perspective-x) * 10deg));
          transition: transform 0.1s ease-out;
        }

        .header-container {
          position: relative;
          perspective: 1000px;
          transform-style: preserve-3d;
          text-align: center;
          width: 100%;
          max-width: 1200px; /* Constrain width on huge screens */
        }

        .header-content {
          position: relative;
          transform-style: preserve-3d;
          transform: 
              rotateX(calc(var(--perspective-y) * 10deg)) 
              rotateY(calc(var(--perspective-x) * 10deg));
          transition: transform 0.1s ease-out;
          padding: 2rem 0; /* Give breathing room for orbits */
        }

        .hero-text {
          /* Adjusted clamp for better mobile scaling */
          font-size: clamp(2.8rem, 13vw, 12rem);
          line-height: 0.85;
          margin: 0;
          color: var(--text-color);
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          z-index: 2;
          white-space: nowrap; /* Prevent awkward wrapping */
          text-shadow: 
            calc(-0.04em * (1 + var(--perspective-x))) calc(0.04em * (1 + var(--perspective-y))) 0 var(--accent-color),
            calc(-0.06em * (1 + var(--perspective-x))) calc(0.06em * (1 + var(--perspective-y))) 0 var(--accent-color),
            0 0 20px rgba(128, 130, 248, 0.4);
          -webkit-text-stroke: 2px white;
        }

        .hero-text::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          -webkit-text-stroke: 4px var(--accent-color);
          z-index: -1;
          opacity: 0.5;
        }

        .subtitle-wrapper {
          margin-top: 1.5rem;
          height: 2.5rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          overflow: hidden;
          width: 100%;
        }
        
        .cycling-phrase {
          color: var(--accent-color);
          font-family: sans-serif;
          font-weight: 800;
          /* Responsive subtitle size */
          font-size: clamp(0.9rem, 2.5vw, 1.35rem);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          animation: phrase-cycle 5s ease-in-out forwards;
          text-align: center;
          width: 100%;
        }

        @keyframes phrase-cycle {
          0% { opacity: 0; transform: translateY(-20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }

        .orbit-system {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 110%; 
          height: 110%;
          transform: translate(-50%, -50%) rotateX(70deg) rotateZ(-10deg);
          pointer-events: none;
          transform-style: preserve-3d;
          z-index: 1;
        }

        .orbit-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 2px solid var(--accent-color);
          border-radius: 50%;
          box-shadow: 0 0 15px var(--accent-color);
          opacity: 0.6;
        }

        .js-orbiter {
          position: fixed;
          /* RESPONSIVE SIZE: Small on mobile, large on desktop */
          width: 60px;
          height: 60px;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: opacity 0.1s;
        }
        
        @media (min-width: 768px) {
          .js-orbiter {
            width: 120px;
            height: 120px;
          }
        }

        .js-orbiter svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 5px rgba(128, 130, 248, 0.8));
        }

        /* Mobile specific adjustments */
        @media (max-width: 768px) {
          .name-header-wrapper { margin-bottom: 1rem; }
          .hero-text { letter-spacing: 1px; -webkit-text-stroke: 1px white; }
          .hero-text::before { -webkit-text-stroke: 2px var(--accent-color); }
          
          /* Flatten the orbit slightly less on mobile so icons don't bunch up */
          .orbit-system { width: 120%; height: 80%; }
        }
      `}</style>

      <div ref={containerRef} className="scene-container w-full h-full flex flex-col justify-center items-center">
        
        <div className="name-header-wrapper">
          <div className="name-header">
            DAN<br />FLATT
          </div>
        </div>

        <div className="header-container">
          <div ref={headerContentRef} className="header-content">
            <h1 className="hero-text top" data-text="Creative">Creative</h1>
            
            <div className="orbit-system">
              <div className="orbit-ring"></div>
            </div>
            
            <h1 className="hero-text bottom" data-text="Developer">Developer</h1>

            {/* Cycling Text Component */}
            <div className="subtitle-wrapper">
              <div key={phraseIndex} className="cycling-phrase">
                {phrases[phraseIndex]}
              </div>
            </div>

          </div>
        </div>

        {/* --- ORBITING ICONS --- */}

        {/* 1. Smartphone */}
        <div className="js-orbiter" ref={el => { orbiterRefs.current[0] = el; }}>
          <svg viewBox="0 0 24 24" shapeRendering="crispEdges" fill="none" stroke="#8082f8" strokeWidth="1">
            <path d="M7 2h10v20H7z" fill="none"/>
            <path d="M9 4h6v12H9z" fill="none"/>
            <rect x="10" y="18" width="4" height="2" fill="#8082f8"/>
            <rect x="10" y="3" width="4" height="1" fill="#8082f8"/>
          </svg>
        </div>

        {/* 2. Lightbulb */}
        <div className="js-orbiter" ref={el => { orbiterRefs.current[1] = el; }}>
          <svg viewBox="0 0 24 24" shapeRendering="crispEdges" fill="none" stroke="#8082f8" strokeWidth="1">
            <path d="M9 2h6v2h2v2h2v4h-2v2h-2v2H9v-2H7v-2H5V6h2V4h2z" fill="none"/>
            <line x1="9" y1="16" x2="15" y2="16"/>
            <line x1="9" y1="18" x2="15" y2="18"/>
            <line x1="10" y1="20" x2="14" y2="20"/>
            <path d="M10 8v4M12 6v6M14 8v4" strokeWidth="1"/>
          </svg>
        </div>

        {/* 3. Laptop */}
        <div className="js-orbiter" ref={el => { orbiterRefs.current[2] = el; }}>
          <svg viewBox="0 0 24 24" shapeRendering="crispEdges" fill="none" stroke="#8082f8" strokeWidth="1">
            <path d="M4 4h16v11H4z" fill="none"/>
            <path d="M6 6h12v7H6z" fill="none"/>
            <path d="M2 15h20v3H2z" fill="none"/>
            <rect x="9" y="16" width="6" height="1" fill="#8082f8"/>
          </svg>
        </div>

        {/* 4. Eyes */}
        <div className="js-orbiter" ref={el => { orbiterRefs.current[3] = el; }}>
          <svg viewBox="0 0 24 24" shapeRendering="crispEdges" fill="none" stroke="#8082f8" strokeWidth="1">
            <ellipse cx="6" cy="11" rx="4" ry="5" fill="none"/>
            <ellipse cx="18" cy="11" rx="4" ry="5" fill="none"/>
            <rect x="5" y="10" width="3" height="4" fill="#8082f8"/>
            <rect x="16" y="10" width="3" height="4" fill="#8082f8"/>
          </svg>
        </div>

        {/* 5. Mind Blown */}
        <div className="js-orbiter" ref={el => { orbiterRefs.current[4] = el; }}>
          <svg viewBox="0 0 32 32" shapeRendering="crispEdges" fill="none" stroke="#8082f8" strokeWidth="0.5">
            <rect x="15" y="0" width="2" height="1" fill="#8082f8" opacity="0.5"/>
            <rect x="10" y="1" width="1" height="1" fill="#8082f8" opacity="0.4"/>
            <rect x="21" y="1" width="1" height="1" fill="#8082f8" opacity="0.4"/>
            <rect x="6" y="2" width="1" height="1" fill="#8082f8" opacity="0.3"/>
            <rect x="25" y="2" width="1" height="1" fill="#8082f8" opacity="0.3"/>
            <rect x="4" y="4" width="1" height="1" fill="#8082f8" opacity="0.3"/>
            <rect x="27" y="4" width="1" height="1" fill="#8082f8" opacity="0.3"/>
            <rect x="14" y="2" width="1" height="2" fill="#8082f8" opacity="0.7"/>
            <rect x="17" y="2" width="1" height="2" fill="#8082f8" opacity="0.7"/>
            <rect x="11" y="3" width="1" height="2" fill="#8082f8" opacity="0.6"/>
            <rect x="20" y="3" width="1" height="2" fill="#8082f8" opacity="0.6"/>
            <rect x="8" y="4" width="2" height="1" fill="#8082f8" opacity="0.7"/>
            <rect x="22" y="4" width="2" height="1" fill="#8082f8" opacity="0.7"/>
            <rect x="6" y="5" width="1" height="2" fill="#8082f8" opacity="0.6"/>
            <rect x="25" y="5" width="1" height="2" fill="#8082f8" opacity="0.6"/>
            <rect x="9" y="5" width="1" height="1" fill="#8082f8" opacity="0.8"/>
            <rect x="22" y="5" width="1" height="1" fill="#8082f8" opacity="0.8"/>
            <rect x="7" y="7" width="1" height="1" fill="#8082f8" opacity="0.5"/>
            <rect x="24" y="7" width="1" height="1" fill="#8082f8" opacity="0.5"/>
            <rect x="13" y="5" width="2" height="1" fill="#8082f8"/>
            <rect x="17" y="5" width="2" height="1" fill="#8082f8"/>
            <rect x="12" y="6" width="3" height="1" fill="#8082f8" opacity="0.8"/>
            <rect x="17" y="6" width="3" height="1" fill="#8082f8" opacity="0.8"/>
            <rect x="14" y="7" width="1" height="1" fill="#8082f8" opacity="0.6"/>
            <rect x="17" y="7" width="1" height="1" fill="#8082f8" opacity="0.6"/>
            <rect x="10" y="8" width="1" height="1" stroke="#8082f8" fill="none"/>
            <rect x="21" y="8" width="1" height="1" stroke="#8082f8" fill="none"/>
            <rect x="9" y="9" width="1" height="2" stroke="#8082f8" fill="none"/>
            <rect x="22" y="9" width="1" height="2" stroke="#8082f8" fill="none"/>
            <rect x="8" y="11" width="1" height="6" stroke="#8082f8" fill="none"/>
            <rect x="23" y="11" width="1" height="6" stroke="#8082f8" fill="none"/>
            <rect x="9" y="17" width="1" height="2" stroke="#8082f8" fill="none"/>
            <rect x="22" y="17" width="1" height="2" stroke="#8082f8" fill="none"/>
            <rect x="10" y="19" width="1" height="2" stroke="#8082f8" fill="none"/>
            <rect x="21" y="19" width="1" height="2" stroke="#8082f8" fill="none"/>
            <rect x="11" y="21" width="2" height="1" stroke="#8082f8" fill="none"/>
            <rect x="19" y="21" width="2" height="1" stroke="#8082f8" fill="none"/>
            <rect x="13" y="22" width="6" height="1" stroke="#8082f8" fill="none"/>
            <rect x="10" y="12" width="4" height="4" stroke="#8082f8" fill="none"/>
            <rect x="11" y="13" width="2" height="2" fill="#8082f8"/>
            <rect x="18" y="12" width="4" height="4" stroke="#8082f8" fill="none"/>
            <rect x="19" y="13" width="2" height="2" fill="#8082f8"/>
            <rect x="10" y="10" width="4" height="1" fill="#8082f8"/>
            <rect x="18" y="10" width="4" height="1" fill="#8082f8"/>
            <rect x="13" y="18" width="6" height="3" stroke="#8082f8" fill="none"/>
            <rect x="14" y="19" width="4" height="1" fill="#8082f8" opacity="0.3"/>
            <rect x="9" y="14" width="1" height="1" fill="#8082f8" opacity="0.4"/>
            <rect x="22" y="14" width="1" height="1" fill="#8082f8" opacity="0.4"/>
            <rect x="5" y="8" width="1" height="1" fill="#8082f8" opacity="0.4"/>
            <rect x="26" y="8" width="1" height="1" fill="#8082f8" opacity="0.4"/>
            <rect x="3" y="6" width="1" height="1" fill="#8082f8" opacity="0.3"/>
            <rect x="28" y="6" width="1" height="1" fill="#8082f8" opacity="0.3"/>
            <rect x="15" y="3" width="2" height="2" fill="#8082f8" opacity="0.5"/>
            <rect x="13" y="4" width="1" height="1" fill="#8082f8" opacity="0.4"/>
            <rect x="18" y="4" width="1" height="1" fill="#8082f8" opacity="0.4"/>
          </svg>
        </div>

        {/* 6. Rocket */}
        <div className="js-orbiter" ref={el => { orbiterRefs.current[5] = el; }}>
          <svg viewBox="0 0 32 32" shapeRendering="crispEdges" fill="none" stroke="#8082f8" strokeWidth="0.5">
            <rect x="15" y="1" width="2" height="1" fill="#8082f8"/>
            <rect x="14" y="2" width="4" height="1" fill="#8082f8"/>
            <rect x="14" y="3" width="4" height="1" stroke="#8082f8" fill="none"/>
            <rect x="13" y="4" width="6" height="1" stroke="#8082f8" fill="none"/>
            <rect x="12" y="5" width="8" height="1" stroke="#8082f8" fill="none"/>
            <rect x="12" y="6" width="8" height="1" stroke="#8082f8" fill="none"/>
            <rect x="11" y="7" width="10" height="1" stroke="#8082f8" fill="none"/>
            <rect x="11" y="8" width="2" height="3" stroke="#8082f8" fill="none"/>
            <rect x="19" y="8" width="2" height="3" stroke="#8082f8" fill="none"/>
            <rect x="13" y="8" width="6" height="4" stroke="#8082f8" fill="none"/>
            <rect x="14" y="9" width="4" height="2" fill="#8082f8"/>
            <rect x="11" y="12" width="10" height="1" stroke="#8082f8" fill="none"/>
            <rect x="11" y="13" width="10" height="1" stroke="#8082f8" fill="none"/>
            <rect x="12" y="14" width="8" height="1" fill="#8082f8"/>
            <rect x="11" y="15" width="10" height="1" stroke="#8082f8" fill="none"/>
            <rect x="11" y="16" width="10" height="1" stroke="#8082f8" fill="none"/>
            <rect x="12" y="17" width="8" height="1" stroke="#8082f8" fill="none"/>
            <rect x="12" y="18" width="8" height="1" stroke="#8082f8" fill="none"/>
            <rect x="13" y="19" width="6" height="1" fill="#8082f8"/>
            <rect x="13" y="20" width="6" height="1" stroke="#8082f8" fill="none"/>
            <rect x="8" y="14" width="3" height="1" stroke="#8082f8" fill="none"/>
            <rect x="7" y="15" width="4" height="1" stroke="#8082f8" fill="none"/>
            <rect x="6" y="16" width="5" height="1" stroke="#8082f8" fill="none"/>
            <rect x="6" y="17" width="5" height="1" stroke="#8082f8" fill="none"/>
            <rect x="7" y="18" width="4" height="1" stroke="#8082f8" fill="none"/>
            <rect x="8" y="19" width="3" height="1" stroke="#8082f8" fill="none"/>
            <rect x="8" y="16" width="2" height="2" fill="#8082f8"/>
            <rect x="21" y="14" width="3" height="1" stroke="#8082f8" fill="none"/>
            <rect x="21" y="15" width="4" height="1" stroke="#8082f8" fill="none"/>
            <rect x="21" y="16" width="5" height="1" stroke="#8082f8" fill="none"/>
            <rect x="21" y="17" width="5" height="1" stroke="#8082f8" fill="none"/>
            <rect x="21" y="18" width="4" height="1" stroke="#8082f8" fill="none"/>
            <rect x="21" y="19" width="3" height="1" stroke="#8082f8" fill="none"/>
            <rect x="22" y="16" width="2" height="2" fill="#8082f8"/>
            <rect x="13" y="21" width="1" height="2" fill="#8082f8" opacity="0.6"/>
            <rect x="18" y="21" width="1" height="2" fill="#8082f8" opacity="0.6"/>
            <rect x="14" y="21" width="1" height="3" fill="#8082f8" opacity="0.7"/>
            <rect x="17" y="21" width="1" height="3" fill="#8082f8" opacity="0.7"/>
            <rect x="15" y="21" width="2" height="5" fill="#8082f8"/>
            <rect x="15" y="26" width="2" height="2" fill="#8082f8" opacity="0.7"/>
            <rect x="15" y="28" width="2" height="1" fill="#8082f8" opacity="0.4"/>
            <rect x="14" y="25" width="1" height="1" fill="#8082f8" opacity="0.5"/>
            <rect x="17" y="24" width="1" height="1" fill="#8082f8" opacity="0.5"/>
            <rect x="16" y="29" width="1" height="1" fill="#8082f8" opacity="0.3"/>
          </svg>
        </div>

      </div>
    </>
  );
};

export default Scene;
