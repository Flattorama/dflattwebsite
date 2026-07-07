import React from 'react';
import { Link } from 'react-router-dom';
import Scene from '../components/Scene';
import Seo from '../components/Seo';
import { CardStack } from '../components/CardStack';
import { SITE } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-bg text-gray-900 font-inter">
      <Seo title={SITE.title} path="/" />

      {/* HERO SECTION: Full viewport height */}
      <section className="h-screen w-full relative overflow-hidden bg-[#fcf8f3]">
        <Scene />
      </section>

      {/* TITLE INTERSTITIAL */}
      <header id="work" className="h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-6xl md:text-8xl font-anton uppercase text-gray-900 mb-6 leading-tight tracking-tight">
          Selected<br />Work
        </h1>
        <p className="text-xl text-gray-500 max-w-md font-medium">
          Scroll down to explore case studies.
        </p>
        <div className="mt-12 animate-bounce text-gray-400 text-2xl" aria-hidden="true">
          ↓
        </div>
      </header>

      {/* CARD STACK SECTION */}
      <main className="relative z-10">
        <CardStack />
      </main>

      {/* CONTACT */}
      <footer id="contact" className="min-h-screen bg-[#111] text-white flex flex-col items-center justify-center p-6 text-center relative z-20">
        <h2 className="text-5xl md:text-7xl font-anton mb-6 uppercase">Let's Talk</h2>
        <p className="text-gray-400 text-lg max-w-lg mb-10">
          Speaking, writing, and the occasional big idea.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href={`mailto:${SITE.email}`}
            className="px-8 py-3 bg-white text-black font-anton uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-full"
          >
            Email me
          </a>
          <Link
            to="/speaking"
            className="px-8 py-3 bg-accent text-white font-anton uppercase tracking-wider hover:bg-accent/90 transition-colors rounded-full"
          >
            Book me to speak
          </Link>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-white text-white font-anton uppercase tracking-wider hover:bg-white hover:text-black transition-colors rounded-full"
          >
            LinkedIn
          </a>
        </div>

        <a
          href={`mailto:${SITE.email}`}
          className="font-anton text-3xl md:text-5xl uppercase tracking-tight text-gray-500 hover:text-accent transition-colors mb-16"
        >
          {SITE.email}
        </a>

        <p className="text-gray-500 text-sm">
          Consulting &amp; agency work →{' '}
          <a
            href={SITE.lumin8}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 underline hover:text-accent transition-colors"
          >
            Lumin8 Agency
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
