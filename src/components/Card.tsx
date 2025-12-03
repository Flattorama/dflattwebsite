import React, { useRef, useCallback } from 'react';
import { CardData } from '../types';

interface CardProps {
  data: CardData;
  index: number;
  total: number;
}

export const Card: React.FC<CardProps> = ({ data, index, total }) => {
  const cardRef = useRef<HTMLElement>(null);
  
  const isExternalLink = data.link && data.link.startsWith('http');
  
  const Component = isExternalLink ? 'a' : 'div';
  
  const linkProps = isExternalLink ? {
    href: data.link,
    target: "_blank",
    rel: "noopener noreferrer",
  } : {};

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  return (
    <article
      className="absolute top-1/2 left-1/2 w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] md:w-[400px] md:h-[560px] origin-center will-change-transform"
      style={{
        translate: '-50% -50%',
        zIndex: total - index, 
        '--base-rotation': `${data.rotation}deg`,
        '--timeline': `--card-${index}`,
        animationName: 'fly-away',
        animationFillMode: 'both',
        animationTimingFunction: 'linear',
        animationTimeline: `var(--timeline)`,
        animationRange: 'exit-crossing 0% exit-crossing 100%',
      } as React.CSSProperties}
    >
      <Component
        {...linkProps}
        ref={cardRef as React.RefObject<HTMLAnchorElement> & React.RefObject<HTMLDivElement>}
        className={`block w-full h-full rounded-[16px] sm:rounded-[20px] shadow-2xl border border-black/5 transition-transform duration-100 ease-out no-underline overflow-hidden flex flex-col group ${isExternalLink ? 'cursor-pointer' : 'cursor-default'}`}
        style={{
          backgroundColor: data.themeColor,
          '--text-primary': '#FFFFFF',
          '--text-secondary': 'rgba(255, 255, 255, 0.85)',
          '--tag-bg-color': 'rgba(255, 255, 255, 0.2)',
          transformStyle: 'preserve-3d',
        } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container */}
        <div 
          className="w-full h-[140px] sm:h-[180px] md:h-[240px] flex-shrink-0 bg-gray-300 relative overflow-hidden"
          style={{ transform: 'translateZ(20px)' }}
        >
          <img
            src={data.image}
            alt={data.imageAlt}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
        
        {/* Content Area */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 flex flex-col justify-between" style={{ transform: 'translateZ(30px)' }}>
          <div>
            {/* Tags */}
            <div className="flex gap-1.5 sm:gap-2 flex-wrap pointer-events-none mb-2 sm:mb-3">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.6rem] sm:text-[0.7rem] font-bold uppercase tracking-wide rounded"
                  style={{
                    backgroundColor: 'var(--tag-bg-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Client Name */}
            <h2 
              className="font-inter font-extrabold text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] leading-none uppercase tracking-tight pointer-events-none mb-1 sm:mb-2"
              style={{ 
                color: 'var(--text-primary)',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              {data.clientName}
            </h2>

            {/* Project Title */}
            <h3
               className="font-inter font-medium text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] leading-snug pointer-events-none"
               style={{ color: 'var(--text-secondary)' }}
            >
              {data.projectTitle}
            </h3>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-2 sm:pt-3 md:pt-4 border-t border-white/10 flex items-center justify-between min-h-[40px] sm:min-h-[50px]">
            <div 
              className="font-inter text-xs sm:text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              {data.years}
            </div>
            
            {/* Render Button Only if Link is External */}
            {isExternalLink && (
               <div className="bg-white text-black px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full font-anton text-[0.6rem] sm:text-xs uppercase tracking-wide flex items-center gap-1 animate-jiggle shadow-lg transition-transform hover:scale-105">
                 Read Case Study <span className="text-sm sm:text-lg leading-none transform translate-y-[-1px]">→</span>
               </div>
            )}
          </div>
        </div>
      </Component>
    </article>
  );
};
