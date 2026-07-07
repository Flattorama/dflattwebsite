import React, { useMemo } from 'react';
import { CARDS } from '../constants';
import { Card } from './Card';
import { useReducedMotion } from '../lib/useReducedMotion';

export const CardStack: React.FC = () => {
  const reducedMotion = useReducedMotion();

  // Generate the timeline-scope string dynamically based on card count
  const timelineNames = useMemo(() => {
    return CARDS.map((_, i) => `--card-${i}`).join(', ');
  }, []);

  // Reduced motion: a simple static grid instead of the scroll-driven stack
  if (reducedMotion) {
    return (
      <section className="py-16 px-4 flex flex-wrap justify-center gap-8 md:gap-12">
        {CARDS.map((card, index) => (
          <Card key={card.id} data={card} index={index} total={CARDS.length} static />
        ))}
      </section>
    );
  }

  return (
    <>
      {/*
        Inject dynamic CSS styles for keyframes and specific scroll logic
        that Tailwind doesn't handle natively or gracefully.
      */}
      <style>
        {`
          @property --angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }

          @keyframes fly-away {
            to {
              translate: -150% -150%;
              rotate: -25deg;
              opacity: 0;
            }
          }

          /* Use a class to apply the dynamic timeline scope */
          .timeline-scope-container {
            timeline-scope: ${timelineNames};
          }

          .perspective-container {
            perspective: 1000px;
            transform-style: preserve-3d;
          }
        `}
      </style>

      <section className="timeline-scope-container relative">

        {/* Sticky Display Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-container">
          {CARDS.map((card, index) => (
            <Card
              key={card.id}
              data={card}
              index={index}
              total={CARDS.length}
            />
          ))}
        </div>

        {/* Scroll Track (The Triggers) */}
        <div className="scroll-track">
          {CARDS.map((_, index) => (
            <div
              key={`tick-${index}`}
              className="scroll-tick w-full pointer-events-none"
              style={{
                // 150vh height ensures significant scroll distance per card
                height: '150vh',
                // 20vh margin adds a gap between animations
                marginTop: index === 0 ? '0' : '20vh',
                // Assign the view timeline name to this trigger element
                viewTimelineName: `--card-${index}`,
              } as React.CSSProperties}
            />
          ))}
        </div>

      </section>
    </>
  );
};
