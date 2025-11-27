import React, { useRef, useCallback } from 'react';
import { CardData, ThemeType } from '../types';

interface CardProps {
  data: CardData;
  index: number;
  total: number;
}

const themeStyles: Record<ThemeType, { bg: string; text: string; accent: string }> = {
  [ThemeType.GREEN]: { bg: '#EAEBE6', text: '#114422', accent: '#114422' },
  [ThemeType.PINK]: { bg: '#FFD4D4', text: '#FF2200', accent: '#FF2200' },
  [ThemeType.BLUE]: { bg: '#D4E0FF', text: '#0044FF', accent: '#0044FF' },
  [ThemeType.DARK]: { bg: '#1A1A1A', text: '#FFFFFF', accent: '#FFFFFF' },
};

export const Card: React.FC<CardProps> = ({ data, index, total }) => {
  // Ref changed to HTMLAnchorElement since the interactive element is now a link
  const cardRef = useRef<HTMLAnchorElement>(null);
  const theme = themeStyles[data.theme];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation based on mouse position
    // Sensitivity factor of 10
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  // Split title by newlines for formatting
  const titleLines = data.title.split('\n');

  return (
    <article
      className="absolute top-1/2 left-1/2 w-[320px] h-[420px] md:w-[400px] md:h-[500px] origin-center will-change-transform"
      style={{
        // Positioning to center
        translate: '-50% -50%',
        // Invert z-index: First card (index 0) gets highest z-index so it sits on top.
        zIndex: total - index, 
        
        // Custom properties for the CSS animation
        '--base-rotation': `${data.rotation}deg`,
        '--timeline': `--card-${index}`,
        
        // CSS Animation properties
        animationName: 'fly-away',
        animationFillMode: 'both',
        animationTimingFunction: 'linear',
        animationTimeline: `var(--timeline)`,
        animationRange: 'exit-crossing 0% exit-crossing 100%',
      } as React.CSSProperties}
    >
      <a
        href={data.link}
        ref={cardRef}
        className="block w-full h-full rounded-3xl p-6 flex flex-col justify-between shadow-2xl cursor-pointer border border-black/5 transition-transform duration-100 ease-out no-underline"
        style={{
          backgroundColor: theme.bg,
          color: theme.text,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={data.image}
          alt={data.title}
          className="w-full aspect-video object-cover rounded-xl shadow-md pointer-events-none"
          style={{ transform: 'translateZ(20px)' }}
        />
        
        <div className="flex flex-col">
          <h2 
            className="font-anton text-5xl leading-[0.9] uppercase mt-4 pointer-events-none"
            style={{ transform: 'translateZ(30px)' }}
          >
            {titleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          
          <div 
            className="flex gap-2 flex-wrap mt-6 pointer-events-none"
            style={{ transform: 'translateZ(30px)' }}
          >
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-anton uppercase tracking-wider font-extrabold"
                style={{
                  backgroundColor: theme.accent,
                  color: data.theme === ThemeType.DARK ? '#1A1A1A' : theme.bg,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </article>
  );
};
