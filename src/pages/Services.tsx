import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FloatingSymbolProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingSymbol: React.FC<FloatingSymbolProps> = ({ children, className = '', delay = 0 }) => {
  const symbolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!symbolRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(symbolRef.current, {
        y: '+=15',
        x: '+=8',
        rotation: '+=5',
        duration: 4 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay,
      });
    }, symbolRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={symbolRef} className={`absolute ${className}`}>
      {children}
    </div>
  );
};

interface ServiceSectionProps {
  id: string;
  index: number;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
  caseStudy: {
    title: string;
    tagline: string;
    gradient: string;
    icon: string;
  };
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  id,
  index,
  title,
  headline,
  description,
  deliverables,
  caseStudy,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0.3 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="min-h-screen py-24 md:py-32 border-b border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-8">
          <span className="text-accent font-anton text-lg uppercase tracking-widest">
            0{index + 1}
          </span>
        </div>

        <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl uppercase text-gray-900 tracking-tight mb-12">
          {title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h3 className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed mb-8">
              {headline}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {description}
            </p>
            <ul className="space-y-3">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-accent mt-1">→</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <div
              ref={cardRef}
              className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer group"
              style={{ background: caseStudy.gradient }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`text-8xl transition-all duration-500 ${
                    isHovered ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
                  }`}
                >
                  {caseStudy.icon}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/70 text-sm uppercase tracking-widest mb-2">
                  Case Study
                </p>
                <h4 className="font-anton text-2xl text-white uppercase mb-1">
                  {caseStudy.title}
                </h4>
                <p className="text-white/80 text-sm">{caseStudy.tagline}</p>
              </div>

              <div
                className={`absolute inset-0 bg-accent/20 transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SidebarNavProps {
  sections: { id: string; label: string }[];
  activeSection: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ sections, activeSection }) => {
  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <ul className="space-y-4">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`flex items-center gap-3 group transition-all duration-300 ${
                activeSection === section.id ? 'text-accent' : 'text-gray-400'
              }`}
            >
              <span
                className={`font-anton text-sm transition-all duration-300 ${
                  activeSection === section.id ? 'text-accent' : 'text-gray-400 group-hover:text-gray-600'
                }`}
              >
                0{index + 1}
              </span>
              <span
                className={`w-8 h-0.5 transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-accent w-12'
                    : 'bg-gray-300 group-hover:bg-gray-400 group-hover:w-10'
                }`}
              />
              <span
                className={`font-inter text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeSection === section.id
                    ? 'opacity-100 text-accent'
                    : 'opacity-0 group-hover:opacity-100 text-gray-600'
                }`}
              >
                {section.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Services: React.FC = () => {
  const [activeSection, setActiveSection] = useState('fractional');
  const heroRef = useRef<HTMLElement>(null);

  const services = [
    {
      id: 'fractional',
      title: 'FRACTIONAL CMO',
      label: 'Fractional',
      headline: 'The Strategic Oversight of a General Counsel. The Aggression of a Startup Founder.',
      description:
        "Startups and SMEs often face a 'Growing Pain Gap': they need executive strategy but can't justify a full-time C-Suite hire. I bridge that gap. I audit your P&L, restructure your marketing stack, and ensure your growth is legally compliant and operationally sound.",
      deliverables: [
        'Go-To-Market Strategy Audit',
        'Vendor & Agency Management',
        'Regulatory Risk Assessment',
        'Team Structuring & Hiring',
      ],
      caseStudy: {
        title: 'SPORTBALL FRANCHISE',
        tagline: 'Reducing CAC by 67% via Automation',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: '📊',
      },
    },
    {
      id: 'reporting',
      title: 'CORPORATE REPORTING',
      label: 'Reporting',
      headline: 'Stop Publishing PDFs. Start Building Experiences.',
      description:
        "Investors don't read 100-page PDFs on their phones. They engage with data. I partner with Investor Relations teams and Agencies to build bespoke, interactive Annual Reports using React and D3.js. We turn disclosure into a competitive advantage.",
      deliverables: [
        'Interactive ESG Data Visualization (D3.js)',
        'Responsive "Microsite" Annual Reports',
        'Machine-Readable Data Compliance',
        'White-Label Agency Partnership',
      ],
      caseStudy: {
        title: 'DEMO / AGENCY PARTNER',
        tagline: 'Interactive ESG Visualization',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        icon: '📈',
      },
    },
    {
      id: 'crisis',
      title: 'CRISIS LEADERSHIP',
      label: 'Crisis',
      headline: 'Calm in the Chaos. Rapid Response for High-Stakes Moments.',
      description:
        'True leadership is tested when the timeline is short and the pressure is high. Drawing on my experience leading large-scale advocacy organizations, I help corporations navigate public relations crises, hostile narratives, and stakeholder mobilization.',
      deliverables: [
        'Rapid Response Communications',
        'Stakeholder Mobilization Strategy',
        'Reputation Management',
        'Political Nuance Navigation',
      ],
      caseStudy: {
        title: 'TAFSIK ADVOCACY',
        tagline: 'Mobilizing 4,300+ Stakeholders',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        icon: '🎯',
      },
    },
    {
      id: 'legaltech',
      title: 'LEGAL OPS',
      label: 'LegalTech',
      headline: 'Where Law Meets Code. Automating the Billable Hour.',
      description:
        "Legal departments are drowning in administrative friction. I act as a 'Legal Engineer,' translating the needs of Partners into technical workflows. From AI-driven contract review to automated compliance dashboards, I modernize legal operations.",
      deliverables: [
        'Legal Workflow Automation',
        'AI Implementation & Governance',
        'Legal Tech Stack Audit',
        'Privacy Policy Automation',
      ],
      caseStudy: {
        title: 'LUMIN8 COMPLIANCE',
        tagline: 'Automating Cross-Border Contracts',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        icon: '⚖️',
      },
    },
    {
      id: 'vr',
      title: 'VR / AR STRATEGY',
      label: 'VR/AR',
      headline: 'Selling the Invisible. Enterprise Strategy for the Spatial Web.',
      description:
        "I don't just talk about the Metaverse; I built one of Canada's first VR agencies. I help enterprise clients move beyond 'gimmicks' to find real ROI in spatial computing, training simulations, and augmented reality sales tools.",
      deliverables: [
        'Enterprise VR Training Strategy',
        'AR Sales Enablement Tools',
        'Technical Vendor Selection',
        'Spatial Web Prototyping',
      ],
      caseStudy: {
        title: 'METAVRSE AGENCY',
        tagline: '7-Figure Revenue for Enterprise VR',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: '🥽',
      },
    },
    {
      id: 'community',
      title: 'COMMUNITY GROWTH',
      label: 'Community',
      headline: 'Building Moats with People, Not Just Product.',
      description:
        "In a world of rising ad costs, community is the only sustainable moat. I design 'Community Commerce' engines that turn passive customers into active evangelists, leveraging guerrilla marketing and grassroots psychology.",
      deliverables: [
        'Community-Led Growth Strategy',
        'Influencer & Ambassador Programs',
        'Guerrilla Marketing Tactics',
        'User Sentiment Analysis',
      ],
      caseStudy: {
        title: 'NABORINO',
        tagline: '100k Impressions via Grassroots',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        icon: '🌱',
      },
    },
  ];

  const secondaryServices = [
    {
      number: '07',
      title: 'CAPITAL RAISE PREP',
      description: 'Pitch deck narrative structuring and due diligence organization for Seed/Series A.',
    },
    {
      number: '08',
      title: 'SAAS PRODUCT STRATEGY',
      description: 'Roadmapping and feature prioritization for early-stage technical products.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      services.forEach((service) => {
        ScrollTrigger.create({
          trigger: `#${service.id}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(service.id),
          onEnterBack: () => setActiveSection(service.id),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcf8f3] text-gray-900 font-inter overflow-x-hidden">
      <SidebarNav
        sections={services.map((s) => ({ id: s.id, label: s.label }))}
        activeSection={activeSection}
      />

      <section
        ref={heroRef}
        className="h-screen w-full relative flex items-center justify-center overflow-hidden"
      >
        <FloatingSymbol className="top-[20%] left-[15%] w-20 h-20 md:w-28 md:h-28" delay={0}>
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent/20 to-purple-400/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-accent/30">
            <span className="text-accent text-5xl font-mono">¶</span>
          </div>
        </FloatingSymbol>

        <FloatingSymbol className="top-[25%] right-[12%] w-24 h-24 md:w-32 md:h-32" delay={0.5}>
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-green-400/30">
            <span className="text-green-500 text-5xl font-mono">{'{}'}</span>
          </div>
        </FloatingSymbol>

        <FloatingSymbol className="bottom-[25%] left-[10%] w-16 h-16 md:w-24 md:h-24" delay={1}>
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-blue-400/30">
            <span className="text-blue-500 text-4xl">↗</span>
          </div>
        </FloatingSymbol>

        <FloatingSymbol className="bottom-[30%] right-[15%] w-20 h-20 md:w-28 md:h-28" delay={1.5}>
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-pink-400/20 to-red-400/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-pink-400/30">
            <span className="text-4xl">📊</span>
          </div>
        </FloatingSymbol>

        <div className="text-center z-10 px-4">
          <h1 className="font-anton text-[18vw] md:text-[15vw] leading-[0.85] tracking-tighter text-accent uppercase">
            GROWTH
          </h1>
          <h1 className="font-anton text-[18vw] md:text-[15vw] leading-[0.85] tracking-tighter text-accent uppercase">
            ARCHITECTURE
          </h1>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-accent text-3xl">
          ↓
        </div>
      </section>

      <div className="lg:pl-32">
        {services.map((service, index) => (
          <ServiceSection
            key={service.id}
            id={service.id}
            index={index}
            title={service.title}
            headline={service.headline}
            description={service.description}
            deliverables={service.deliverables}
            caseStudy={service.caseStudy}
          />
        ))}

        <section className="py-24 md:py-32 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <h2 className="font-anton text-4xl md:text-5xl uppercase text-gray-900 tracking-tight mb-16">
              ADDITIONAL CAPABILITIES
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {secondaryServices.map((service) => (
                <div
                  key={service.number}
                  className="p-8 rounded-2xl bg-white/50 border border-gray-200 hover:border-accent/50 transition-colors"
                >
                  <span className="text-accent font-anton text-lg">{service.number}</span>
                  <h3 className="font-anton text-2xl md:text-3xl uppercase text-gray-900 mt-2 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="min-h-[80vh] bg-gray-900 text-white flex flex-col items-center justify-center px-6 text-center">
        <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight mb-16">
          WHICH PROBLEM ARE WE SOLVING?
        </h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-16">
          <a
            href="mailto:hi@danflatt.ca?subject=Fractional%20CMO%20Inquiry"
            className="px-8 py-4 bg-accent text-white font-anton text-lg uppercase tracking-wider hover:bg-accent/90 transition-colors rounded-full"
          >
            SCALE MY STARTUP
          </a>
          <a
            href="mailto:hi@danflatt.ca?subject=Corporate%20Reporting%20Inquiry"
            className="px-8 py-4 bg-white text-gray-900 font-anton text-lg uppercase tracking-wider hover:bg-gray-100 transition-colors rounded-full"
          >
            BUILD MY REPORT
          </a>
          <a
            href="mailto:hi@danflatt.ca?subject=Crisis%20Advisory%20Inquiry"
            className="px-8 py-4 border-2 border-white text-white font-anton text-lg uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-colors rounded-full"
          >
            FIX MY CRISIS
          </a>
        </div>
        <a
          href="mailto:hi@danflatt.ca"
          className="font-anton text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight text-gray-500 hover:text-accent transition-colors"
        >
          HI@DANFLATT.CA
        </a>
      </footer>
    </div>
  );
};

export default Services;
