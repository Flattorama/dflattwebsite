import React from 'react';
import Seo from '../components/Seo';
import { SITE } from '../constants';

interface Talk {
  number: string;
  title: string;
  format: string;
  abstract: string;
}

const TALKS: Talk[] = [
  {
    number: '01',
    title: 'The AI-Native Marketing Org: How I Run 5 Brands Without Adding Headcount',
    format: 'Flagship keynote',
    abstract:
      "The architecture of a marketing organization that runs on AI — custom agents, Claude-powered workflows with persistent brand context, and the team design around them. Real numbers from a five-brand portfolio at Canada's longest-running startup accelerator: what got automated, what got hired for instead, and the operating system that holds it together.",
  },
  {
    number: '02',
    title: 'Agents, Not Interns: What AI Actually Replaces in a Marketing Team',
    format: 'Keynote / panel',
    abstract:
      "A provocative, experience-backed answer to the question every CMO is dancing around. AI didn't shrink my team — it changed who I hire. What agents genuinely take over, what they're terrible at, and how workforce planning changes when your junior layer is software.",
  },
  {
    number: '03',
    title: "Governed AI: A Lawyer-Turned-CMO's Rules for Shipping AI Without Getting Sued",
    format: 'Enterprise / regulated industries',
    abstract:
      'Almost nobody credible talks about this. Trained as a litigator, operating as a marketing executive, I lay out the brand-safety, compliance, and governance rules for shipping AI in production — what marketers actually get sued for, and how to move fast anyway.',
  },
  {
    number: '04',
    title: 'From Courtroom to Claude: Structuring Chaos for Growth',
    format: 'Personal-journey keynote',
    abstract:
      'Physics degree, law career, management consulting, two startups, Bell, AMD, and a five-brand AI-native portfolio. A keynote for business schools, associations, and community audiences about the discipline that transfers: structuring chaos — in litigation, in startups, and now in AI.',
  },
];

const BIO_100 =
  "Dan Flatt is a senior marketing executive and 2x tech founder who builds AI-native marketing organizations — the agents, the workflows, and the teams. He is Senior Director of Marketing at TBDC, Canada's longest-running startup accelerator, where he runs marketing across five program brands on one AI-powered operating system. Previously: social data strategy at Bell during the #BellLetsTalk era, developer community at AMD, a -67% CAC turnaround at Sportball, and co-founding one of Canada's first enterprise VR/AR agencies. Trained as a litigator, Dan ships AI that is governed, compliant, and defensible — and shows the receipts.";

const BIO_50 =
  "Dan Flatt is a marketing and AI leader: Senior Director of Marketing at TBDC, 2x tech founder, ex-Bell and AMD, and a lawyer by training. He runs five brands on an AI-native operating system he built himself — and speaks about exactly how it works.";

const Speaking: React.FC = () => {
  const bookingHref = `mailto:${SITE.email}?subject=Speaking%20inquiry`;

  return (
    <div className="min-h-screen bg-[#fcf8f3] text-gray-900 font-inter overflow-x-hidden">
      <Seo
        title="Speaking — Dan Flatt | The Marketing Executive Who Actually Builds with AI"
        description="Keynotes and talks on AI-native marketing organizations, agents and workflows, and governed AI — from an operator with receipts. Book Dan Flatt to speak."
        path="/speaking"
      />

      {/* HERO */}
      <section className="min-h-[90vh] w-full relative flex items-center justify-center overflow-hidden px-4 pt-24">
        <div className="text-center z-10 max-w-5xl">
          <p className="text-accent font-anton text-lg md:text-xl uppercase tracking-widest mb-6">
            Speaking
          </p>
          <h1 className="font-anton text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-gray-900 uppercase mb-8">
            The marketing executive who{' '}
            <span className="text-accent">actually builds</span> with AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Conference stages are full of AI theorists. I run five brands on an AI-native operating
            system I built myself — and I show the architecture on stage.
          </p>
          <a
            href={bookingHref}
            className="inline-block px-10 py-4 bg-accent text-white font-anton text-lg uppercase tracking-wider hover:bg-accent/90 transition-colors rounded-full"
          >
            Book me to speak →
          </a>
        </div>
      </section>

      {/* TALKS */}
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2 className="font-anton text-4xl md:text-6xl uppercase text-gray-900 tracking-tight mb-16">
            Talks
          </h2>
          <div className="space-y-16">
            {TALKS.map((talk) => (
              <article key={talk.number} className="grid md:grid-cols-[80px_1fr] gap-4 md:gap-8">
                <span className="text-accent font-anton text-2xl">{talk.number}</span>
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">{talk.format}</p>
                  <h3 className="font-anton text-2xl md:text-4xl uppercase tracking-tight text-gray-900 mb-4 leading-tight">
                    {talk.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">{talk.abstract}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="py-24 border-t border-gray-200 bg-white/40">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-[280px_1fr] gap-12 items-start">
          <div>
            {/* Headshot placeholder — replace with a real photo (same crop) */}
            <div
              className="w-64 h-80 rounded-3xl shadow-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #8082f8 0%, #a855f7 100%)' }}
              role="img"
              aria-label="Headshot placeholder for Dan Flatt"
            >
              <span className="font-anton text-7xl text-white/80">DF</span>
            </div>
            <a
              href={`mailto:${SITE.email}?subject=Speaker%20one-sheet%20request`}
              className="mt-6 inline-block text-accent font-anton uppercase tracking-wide border-b-2 border-accent hover:opacity-70 transition-opacity"
            >
              Request the speaker one-sheet →
            </a>
          </div>
          <div>
            <h2 className="font-anton text-4xl md:text-5xl uppercase text-gray-900 tracking-tight mb-8">
              Speaker Bio
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{BIO_100}</p>
            <h3 className="font-anton text-xl uppercase text-accent tracking-widest mb-3">
              Short version
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">{BIO_50}</p>
          </div>
        </div>
      </section>

      {/* VIDEO + TESTIMONIALS placeholders */}
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-anton text-3xl md:text-4xl uppercase text-gray-900 tracking-tight mb-6">
              See it live
            </h2>
            {/* Talk video placeholder — swap in a YouTube/Vimeo embed of the next recorded talk */}
            <div className="aspect-video rounded-2xl bg-gray-900 flex flex-col items-center justify-center text-center p-8">
              <span className="text-5xl mb-4" role="img" aria-label="Video">🎬</span>
              <p className="text-gray-400 font-anton uppercase tracking-wide">
                Talk recording coming soon
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-anton text-3xl md:text-4xl uppercase text-gray-900 tracking-tight mb-6">
              What organizers say
            </h2>
            <div className="rounded-2xl border-2 border-dashed border-gray-300 h-full min-h-[200px] flex items-center justify-center p-8">
              <p className="text-gray-500 text-center">
                Testimonials from upcoming stages will live here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <footer className="min-h-[60vh] bg-gray-900 text-white flex flex-col items-center justify-center px-6 text-center">
        <h2 className="font-anton text-5xl md:text-7xl uppercase tracking-tight mb-8">
          Put an operator on stage
        </h2>
        <a
          href={bookingHref}
          className="inline-block px-12 py-5 bg-accent text-white font-anton text-xl uppercase tracking-wider hover:bg-accent/90 transition-colors rounded-full mb-12"
        >
          Book me to speak →
        </a>
        <a
          href={`mailto:${SITE.email}`}
          className="font-anton text-3xl md:text-5xl uppercase tracking-tight text-gray-500 hover:text-accent transition-colors"
        >
          {SITE.email}
        </a>
      </footer>
    </div>
  );
};

export default Speaking;
