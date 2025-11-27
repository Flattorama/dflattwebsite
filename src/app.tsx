import React from 'react';
import Scene from './components/Scene'; // Project 1
import { CardStack } from './components/CardStack'; // Project 2

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-bg text-gray-900 font-inter">
      
      {/* SECTION 1: HERO (From Project 1) 
        This is the 3D interactive scene.
      */}
      <section className="h-screen w-full relative overflow-hidden bg-[#fcf8f3]">
        <Scene />
      </section>

      {/* SECTION 2: TITLE INTERSTITIAL 
        A clean break before the heavy scroll animation starts.
      */}
      <header className="h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-6xl md:text-8xl font-anton uppercase text-gray-900 mb-6 leading-tight tracking-tight">
          Selected<br />Work
        </h1>
        <p className="text-xl text-gray-500 max-w-md font-medium">
          Scroll down to explore case studies.
        </p>
        <div className="mt-12 animate-bounce text-gray-400 text-2xl">
          ↓
        </div>
      </header>

      {/* SECTION 3: CARD STACK (From Project 2)
        The scroll-driven animation section.
      */}
      <main className="relative z-10">
        <CardStack />
      </main>

      {/* SECTION 4: FOOTER
      */}
      <footer className="h-screen bg-[#111] text-white flex flex-col items-center justify-center p-4 text-center relative z-20">
        <h2 className="text-5xl md:text-7xl font-anton mb-6 uppercase">What's Next?</h2>
        <p className="text-gray-400 text-lg max-w-lg">
          Thank you for viewing. <br/>
          Let's build something interactive together.
        </p>
        <a 
          href="#" 
          className="mt-8 px-8 py-3 bg-white text-black font-anton uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-full"
        >
          Get in touch
        </a>
      </footer>

      {/* Browser Warning for Scroll Animations */}
      <div className="warning-banner hidden fixed top-0 left-0 w-full bg-red-600 text-white justify-center items-center p-3 z-50 text-sm font-semibold">
        ⚠️ This effect requires Chrome 115+ or Edge.
      </div>

    </div>
  );
};

export default App;
