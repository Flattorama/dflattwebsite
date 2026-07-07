import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Seo from '../components/Seo';
import { SITE } from '../constants';
import { prefersReducedMotion } from '../lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface FloatingBubbleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingBubble: React.FC<FloatingBubbleProps> = ({ children, className = '', delay = 0 }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bubbleRef.current || prefersReducedMotion()) return;

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

interface StickyHeaderSectionProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

const StickyHeaderSection: React.FC<StickyHeaderSectionProps> = ({ title, children, id }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || prefersReducedMotion()) return;

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
      <div className="relative z-10 pb-32">
        {children}
      </div>
    </section>
  );
};

interface ArcEntry {
  era: string;
  title: string;
  detail: string;
}

const ARC: ArcEntry[] = [
  {
    era: 'The Foundation',
    title: 'Physics → Law',
    detail:
      'B.Sc. in Physics at U of T, then Western Law and the Ontario Bar. Years in litigation and commercial law taught me how to structure an argument, manage risk, and stay calm when the stakes are highest.',
  },
  {
    era: 'The Discipline',
    title: 'Management Consulting',
    detail:
      'C-suite executive search at Rosenzweig & Co., then operational efficiency at Trindent Consulting — Six Sigma process redesign that delivered $2M+ in savings. Structure applied to business, not just cases.',
  },
  {
    era: 'The Leap',
    title: '2x Founder — Metavrse & Naborino',
    detail:
      "Co-founded one of Canada's first enterprise VR/AR agencies, selling seven-figure spatial computing to enterprise clients years before it was fashionable. Later bootstrapped Naborino, a hyperlocal commerce marketplace, from zero.",
  },
  {
    era: 'The Scale',
    title: 'Bell & AMD',
    detail:
      'Social data strategy and customer care at national scale during the #BellLetsTalk era; open-source developer community building for AMD GPUOpen. Big-brand rigor, real budgets, measurable outcomes.',
  },
  {
    era: 'The Turnaround',
    title: 'Sportball',
    detail:
      'Digital transformation across a franchise network — rebuilt the acquisition engine and cut customer acquisition cost by 67%. Also taught the next generation of marketers at Humber College along the way.',
  },
  {
    era: 'Now',
    title: 'TBDC + Lumin8',
    detail:
      "Senior Director of Marketing at TBDC — Canada's longest-running startup accelerator — running five program brands on one AI-native operating system: custom agents, Claude-powered workflows, and a team built around them. Partner at Lumin8, the agency where consulting work lives.",
  },
];

const CREDENTIALS = [
  'Ivey MBA',
  'LL.B. / Ontario Bar',
  'B.Sc. Physics',
  'Six Sigma Black Belt',
  'PMA Certified',
  'Reforge',
  'Meta Front-End Developer',
  'GA4 Certified',
  'HubSpot RevOps',
];

const About: React.FC = () => {
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!portraitRef.current || prefersReducedMotion()) return;

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

  return (
    <div className="min-h-screen bg-[#fcf8f3] text-gray-900 font-inter overflow-x-hidden">
      <Seo
        title="About — Dan Flatt"
        description="From courtroom to Claude: physics, law, consulting, two startups, Bell, AMD, Sportball — and the five-brand AI-native marketing portfolio Dan Flatt leads today."
        path="/about"
      />

      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <FloatingBubble className="top-[15%] left-[10%] w-24 h-24 md:w-32 md:h-32" delay={0}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center shadow-lg">
            <span className="text-white text-4xl" role="img" aria-label="Microphone">🎤</span>
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
            <span className="text-white text-3xl" role="img" aria-label="Scales of justice">⚖️</span>
          </div>
        </FloatingBubble>

        <FloatingBubble className="bottom-[30%] right-[10%] w-20 h-20 md:w-28 md:h-28" delay={1.5}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-4xl" role="img" aria-label="Robot">🤖</span>
          </div>
        </FloatingBubble>

        <FloatingBubble className="top-[40%] left-[25%] w-14 h-14 md:w-20 md:h-20" delay={2}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl" role="img" aria-label="Rocket">🚀</span>
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-accent text-3xl" aria-hidden="true">
          ↓
        </div>
      </section>

      <StickyHeaderSection title="ABOUT ME" id="about-me">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-gray-800 font-light">
              I used to argue cases in court. Now I build marketing organizations that{' '}
              <span className="text-accent font-medium">run on AI</span>.
            </p>
            <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed">
              The through-line: structuring chaos for growth — in litigation, in startups, and across
              the five-brand portfolio I lead today. I'm a senior marketing executive and 2x tech
              founder who personally builds the agents, workflows, and team structures most
              organizations only talk about. AI is the newest chaos. I structure it.
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

      <StickyHeaderSection title="THE ARC" id="the-arc">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {ARC.map((entry) => (
            <div key={entry.title} className="py-10 border-b border-gray-300 grid md:grid-cols-[180px_1fr] gap-4 md:gap-10">
              <div className="text-accent font-anton text-lg uppercase tracking-widest pt-1">
                {entry.era}
              </div>
              <div>
                <h3 className="font-anton text-3xl md:text-4xl uppercase tracking-tight text-gray-900 mb-3">
                  {entry.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">{entry.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </StickyHeaderSection>

      <StickyHeaderSection title="CREDENTIALS" id="credentials">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {CREDENTIALS.map((credential) => (
              <span
                key={credential}
                className="px-5 py-3 rounded-full border-2 border-accent/40 text-gray-800 font-anton text-lg uppercase tracking-wide bg-white/50"
              >
                {credential}
              </span>
            ))}
          </div>
        </div>
      </StickyHeaderSection>

      <section className="py-32 px-6 text-center bg-[#fcf8f3]">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-light mb-12">
            Almost no marketing executive can <span className="text-accent font-medium">build</span> this.
            Most AI thought leaders can't <span className="text-accent font-medium">run a marketing org</span>.
            The intersection is the work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/speaking"
              className="px-8 py-4 bg-accent text-white font-anton text-lg uppercase tracking-wider hover:bg-accent/90 transition-colors rounded-full"
            >
              Hear it on stage →
            </Link>
            <Link
              to="/community"
              className="px-8 py-4 border-2 border-accent text-accent font-anton text-lg uppercase tracking-wider hover:bg-accent hover:text-white transition-colors rounded-full"
            >
              Community leadership →
            </Link>
          </div>
        </div>
      </section>

      <footer className="min-h-[70vh] bg-gray-900 text-white flex flex-col items-center justify-center px-6 text-center">
        <h2 className="font-anton text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight mb-8">
          LET'S TALK
        </h2>
        <Link
          to="/speaking"
          className="inline-block px-12 py-5 bg-accent text-white font-anton text-xl uppercase tracking-wider hover:bg-accent/90 transition-colors rounded-full mb-16"
        >
          BOOK ME TO SPEAK
        </Link>
        <a
          href={`mailto:${SITE.email}`}
          className="font-anton text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight text-gray-500 hover:text-accent transition-colors"
        >
          HI@DANFLATT.CA
        </a>
      </footer>
    </div>
  );
};

export default About;
