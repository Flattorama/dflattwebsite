import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FloatingBubbleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingBubble: React.FC<FloatingBubbleProps> = ({ children, className = '', delay = 0 }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bubbleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bubbleRef.current, {
        y: '+=20',
        x: '+=10',
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay,
      });
    }, bubbleRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={bubbleRef} className={`absolute ${className}`}>
      {children}
    </div>
  );
};

interface ServiceItemProps {
  title: string;
  index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const images = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  ];

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <h3 className="font-anton text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight text-gray-900 py-4 border-b border-gray-300 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      {isHovered && (
        <div
          className="fixed w-48 h-48 rounded-2xl z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 shadow-2xl"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            background: images[index % images.length],
          }}
        />
      )}
    </div>
  );
};

interface VentureCardProps {
  title: string;
  label: string;
  gradient: string;
  index: number;
}

const VentureCard: React.FC<VentureCardProps> = ({ title, label, gradient, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !containerRef.current) return;

    const rotation = index === 0 ? -8 : index === 2 ? 8 : 0;
    const xOffset = index === 0 ? -100 : index === 2 ? 100 : 0;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { rotation: 0, x: 0 },
        {
          rotation: rotation,
          x: xOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={containerRef}>
      <div
        ref={cardRef}
        className="w-72 h-96 md:w-80 md:h-[28rem] rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-end p-6 relative"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10">
          <p className="text-white/80 text-sm uppercase tracking-widest mb-2">{label}</p>
          <h3 className="font-anton text-3xl text-white uppercase">{title}</h3>
        </div>
      </div>
    </div>
  );
};

interface StickyHeaderSectionProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

const StickyHeaderSection: React.FC<StickyHeaderSectionProps> = ({ title, children, id }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          pin: headerRef.current,
          pinSpacing: false,
        },
      });

      tl.fromTo(
        headerRef.current,
        { fontSize: '8vw', opacity: 1 },
        { fontSize: '1.5rem', opacity: 0.9 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="relative min-h-screen">
      <div
        ref={headerRef}
        className="font-anton uppercase text-accent tracking-tighter leading-none py-8 text-center bg-[#fcf8f3] z-30"
        style={{ fontSize: '8vw' }}
      >
        {title}
      </div>
      <div ref={contentRef} className="relative z-10 pb-32">
        {children}
      </div>
    </section>
  );
};

const About: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!portraitRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(portraitRef.current, {
        rotationY: 15,
        rotationX: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: portraitRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, portraitRef);

    return () => ctx.revert();
  }, []);

  const services = [
    'FRACTIONAL CMO / GROWTH LEADERSHIP',
    'DIGITAL CORPORATE REPORTING (REACT/D3.JS)',
    'CRISIS MANAGEMENT & ADVOCACY',
    'LEGALTECH WORKFLOW AUTOMATION',
  ];

  const ventures = [
    { title: 'SPORTBALL', label: 'THE TURNAROUND', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { title: 'METAVRSE', label: 'THE INNOVATION', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { title: 'NABORINO', label: 'THE COMMUNITY', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  ];

  const awards = [
    { title: 'SMASHING MAGAZINE', subtitle: '"Person of the Week"' },
    { title: 'TD BANK INNOVATION', subtitle: '"Vendor Partner Award"' },
    { title: 'SIX SIGMA', subtitle: '"Black Belt Certification"' },
  ];

  const speakingPhotos = [
    { rotation: -12, x: -20, y: 10 },
    { rotation: 8, x: 40, y: -15 },
    { rotation: -5, x: 0, y: 30 },
    { rotation: 15, x: -30, y: -10 },
  ];

  return (
    <div className="min-h-screen bg-[#fcf8f3] text-gray-900 font-inter overflow-x-hidden">
      <section ref={heroRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <FloatingBubble className="top-[15%] left-[10%] w-24 h-24 md:w-32 md:h-32" delay={0}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center shadow-lg">
            <span className="text-white text-4xl">🎤</span>
          </div>
        </FloatingBubble>

        <FloatingBubble className="top-[20%] right-[15%] w-20 h-20 md:w-28 md:h-28" delay={0.5}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center shadow-lg overflow-hidden">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-anton text-2xl">
              DF
            </div>
          </div>
        </FloatingBubble>

        <FloatingBubble className="bottom-[25%] left-[8%] w-16 h-16 md:w-24 md:h-24" delay={1}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">⚖️</span>
          </div>
        </FloatingBubble>

        <FloatingBubble className="bottom-[30%] right-[10%] w-20 h-20 md:w-28 md:h-28" delay={1.5}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-4xl">🥽</span>
          </div>
        </FloatingBubble>

        <FloatingBubble className="top-[40%] left-[25%] w-14 h-14 md:w-20 md:h-20" delay={2}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">💻</span>
          </div>
        </FloatingBubble>

        <div className="text-center z-10 px-4">
          <h1 className="font-anton text-[20vw] md:text-[18vw] leading-[0.85] tracking-tighter text-accent uppercase">
            DAN
          </h1>
          <h1 className="font-anton text-[20vw] md:text-[18vw] leading-[0.85] tracking-tighter text-accent uppercase">
            FLATT
          </h1>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-accent text-3xl">
          ↓
        </div>
      </section>

      <StickyHeaderSection title="ABOUT ME" id="about-me">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-gray-800 font-light">
              I didn't just want to argue about the past; I wanted to{' '}
              <span className="text-accent font-medium">build the future</span>.
            </p>
            <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed">
              I am a Strategic Growth Architect operating at the intersection of structure and chaos. Whether negotiating high-stakes litigation or building VR engines from scratch, I bring the discipline of a lawyer, the efficiency of a consultant, and the hunger of an entrepreneur.
            </p>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div
              ref={portraitRef}
              className="w-64 h-80 md:w-80 md:h-96 rounded-3xl shadow-2xl overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                background: 'linear-gradient(135deg, #8082f8 0%, #a855f7 100%)',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-anton text-8xl text-white/80">DF</span>
              </div>
            </div>
          </div>
        </div>
      </StickyHeaderSection>

      <StickyHeaderSection title="SERVICES" id="services">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {services.map((service, index) => (
            <ServiceItem key={service} title={service} index={index} />
          ))}
        </div>
      </StickyHeaderSection>

      <StickyHeaderSection title="VENTURES" id="ventures">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4">
            {ventures.map((venture, index) => (
              <VentureCard
                key={venture.title}
                title={venture.title}
                label={venture.label}
                gradient={venture.gradient}
                index={index}
              />
            ))}
          </div>
        </div>
      </StickyHeaderSection>

      <StickyHeaderSection title="SPEAKING" id="speaking">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 hidden md:block">
            {speakingPhotos.map((photo, index) => (
              <div
                key={index}
                className="absolute w-40 h-52 bg-white p-2 shadow-xl"
                style={{
                  transform: `rotate(${photo.rotation}deg) translateX(${photo.x}px) translateY(${photo.y}px)`,
                  top: '50%',
                  left: '50%',
                  marginTop: '-100px',
                  marginLeft: '-80px',
                  zIndex: index,
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(${45 + index * 30}deg, #8082f8 0%, #a855f7 50%, #ec4899 100%)`,
                  }}
                />
                <div className="absolute bottom-4 left-2 right-2 text-center text-xs text-gray-500 font-inter">
                  Speaking Event {index + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden flex justify-center gap-4 mb-8">
            {[0, 1].map((index) => (
              <div
                key={index}
                className="w-32 h-44 bg-white p-2 shadow-xl"
                style={{ transform: `rotate(${index === 0 ? -5 : 5}deg)` }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(${45 + index * 45}deg, #8082f8 0%, #a855f7 50%, #ec4899 100%)`,
                  }}
                />
              </div>
            ))}
          </div>

          <div>
            <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-light">
              Sharing knowledge is how we{' '}
              <span className="text-accent font-medium">scale impact</span>.
            </p>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              From legal boardrooms to tech conferences, I speak on the collision of regulation, innovation, and community resilience.
            </p>
          </div>
        </div>
      </StickyHeaderSection>

      <StickyHeaderSection title="RECOGNITION" id="recognition">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {awards.map((award, index) => (
            <div
              key={award.title}
              className="py-8 border-b border-accent/30 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <h3 className="font-anton text-2xl md:text-3xl uppercase text-gray-900">
                {award.title}
              </h3>
              <p className="text-lg text-gray-600 italic">{award.subtitle}</p>
            </div>
          ))}
        </div>
      </StickyHeaderSection>

      <footer className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 text-center">
        <h2 className="font-anton text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight mb-8">
          READY TO BUILD?
        </h2>
        <a
          href="mailto:hi@danflatt.ca"
          className="inline-block px-12 py-5 bg-accent text-white font-anton text-xl uppercase tracking-wider hover:bg-accent/90 transition-colors rounded-full mb-16"
        >
          START A PROJECT
        </a>
        <a
          href="mailto:hi@danflatt.ca"
          className="font-anton text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight text-gray-500 hover:text-accent transition-colors"
        >
          HI@DANFLATT.CA
        </a>
      </footer>
    </div>
  );
};

export default About;
