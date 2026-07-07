import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE } from '../constants';

interface Capability {
  title: string;
  detail: string;
}

const CAPABILITIES: Capability[] = [
  {
    title: 'Legal-Operations Leadership',
    detail:
      'Built and led the legal operations of a volunteer taskforce of more than twenty lawyers at Tafsik — intake, workflow, case management, and coordination discipline usually found inside a firm, applied to a community organization running at crisis speed.',
  },
  {
    title: 'Policy & Accountability Research',
    detail:
      'Authored policy and accountability research that earned national media coverage — evidence-first, methodical, and built to withstand scrutiny.',
  },
  {
    title: 'Fundraising Infrastructure',
    detail:
      'Designed the fundraising systems — the pipelines, the data, the follow-through — that let volunteer-run organizations sustain their work beyond a single moment of urgency.',
  },
  {
    title: 'Toronto Jewish Business Network',
    detail:
      'Founded and grew a business network of more than 8,500 members — a durable professional community built on the same growth architecture I use in my day job.',
  },
  {
    title: 'Two Decades of Leadership',
    detail:
      'From co-president of Hillel at U of T to today — a through-line of showing up, organizing, and building institutions rather than just attending them.',
  },
];

const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fcf8f3] text-gray-900 font-inter overflow-x-hidden">
      <Seo
        title="Community Leadership — Dan Flatt"
        description="Two decades of Jewish community leadership: legal-operations leadership, policy research with national media impact, and an 8,500-member business network."
        path="/community"
      />

      {/* HERO — deliberately calmer than the rest of the site */}
      <section className="min-h-[70vh] w-full flex items-center justify-center px-6 pt-24">
        <div className="text-center max-w-4xl">
          <p className="text-accent font-anton text-lg uppercase tracking-widest mb-6">
            Community
          </p>
          <h1 className="font-anton text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-gray-900 uppercase mb-10">
            Community Leadership
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
            I'm the grandchild of Holocaust survivors, with two decades of Jewish community
            leadership behind me — from Hillel co-president at U of T to the work I lead today.
          </p>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {CAPABILITIES.map((capability) => (
            <div key={capability.title} className="py-10 border-b border-gray-300">
              <h2 className="font-anton text-2xl md:text-3xl uppercase tracking-tight text-gray-900 mb-4">
                {capability.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">{capability.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRIDGE */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-anton text-3xl md:text-4xl lg:text-5xl uppercase leading-tight tracking-tight text-gray-900">
            The same discipline I bring to marketing organizations —{' '}
            <span className="text-accent">structure, systems, AI leverage</span> — applied to the
            community I love.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 bg-gray-900 text-white text-center px-6">
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          The professional story continues elsewhere on this site.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/about"
            className="px-8 py-4 border-2 border-white text-white font-anton text-lg uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-colors rounded-full"
          >
            About Dan →
          </Link>
          <Link
            to="/speaking"
            className="px-8 py-4 bg-accent text-white font-anton text-lg uppercase tracking-wider hover:bg-accent/90 transition-colors rounded-full"
          >
            Speaking →
          </Link>
        </div>
        <a
          href={`mailto:${SITE.email}`}
          className="font-anton text-2xl md:text-4xl uppercase tracking-tight text-gray-500 hover:text-accent transition-colors"
        >
          {SITE.email}
        </a>
      </footer>
    </div>
  );
};

export default Community;
