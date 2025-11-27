import React, { useState } from 'react';

// ====================================================================
// A. NAVIGATION COMPONENT (Pasted from Navigation.tsx)
// ====================================================================

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Define accent color locally for use in inline styles
  const accentColor = '#8082f8'; 
  const links = ['ABOUT', 'ARCHIVE', 'SPEAKING', 'BLOGS', 'CONTACT'];
  const socials = ['GITHUB', 'CODEPEN', 'BLUESKY', 'MASTODON', 'INSTAGRAM', 'LINKEDIN', 'RSS'];

  return (
    <>
      {/* Tailwind's 'current' color doesn't always work with inline styles, so 
          we need this <style> block for the hover effect (which uses currentColor). */}
      <style>{`
        .nav-link-hover {
          position: relative;
        }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        .nav-link-hover:hover::after {
          width: 100%;
        }
      `}</style>
      
      {/* Main Header Container - fixed to float over the Scene */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-start pointer-events-none">
        
        {/* Left Side: Logo & Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pointer-events-auto">
          {/* Logo */}
          <div style={{ color: accentColor }} className="font-display text-5xl font-bold uppercase tracking-tighter leading-none select-none">
            DF
          </div>

          {/* Desktop Info Line */}
          <div style={{ color: accentColor }} className="hidden md:flex items-center gap-3 font-display text-lg uppercase tracking-wide">
             <a href="mailto:hello@danflatt.com" className="nav-link-hover">hello@danflatt.com</a>
             <span className="text-xl animate-pulse">✦</span>
             <span>AVAILABLE JANUARY 2026</span>
          </div>
        </div>

        {/* Right Side: Desktop Nav */}
        <div className="hidden md:flex gap-8 pointer-events-auto">
          {links.map(link => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              style={{ color: accentColor }}
              className="font-display text-xl uppercase font-bold tracking-wide nav-link-hover"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className={`md:hidden pointer-events-auto z-50 focus:outline-none transition-colors duration-300 ${isOpen ? 'text-[#fcf8f3]' : 'text-accent'}`}
          style={{ color: isOpen ? '#fcf8f3' : accentColor }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
             // Open State: Hamburger / Close lines
             <div className="flex flex-col justify-between w-8 h-6">
                <span className="w-full h-1 bg-current transform origin-left transition-all"></span>
                <span className="w-full h-1 bg-current transition-all"></span>
                <span className="w-full h-1 bg-current transform origin-left transition-all"></span>
             </div>
          ) : (
            // Closed State: 3x3 Grid Icon
            <div className="grid grid-cols-3 gap-1 w-8 h-8">
               {[...Array(9)].map((_, i) => (
                 <div key={i} style={{ backgroundColor: accentColor }} className="w-full h-full rounded-[1px]" />
               ))}
            </div>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 flex flex-col p-6 transition-transform duration-500 ease-in-out md:hidden overflow-y-auto ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ backgroundColor: accentColor }}
      >
        {/* Top bar alignment spacer (matches main nav padding) */}
        <div className="flex justify-between items-start mb-12 select-none">
           <div className="text-[#fcf8f3] font-display text-5xl font-bold uppercase tracking-tighter leading-none">
             DF
           </div>
           {/* Placeholder for the fixed button position */}
           <div className="w-8 h-8"></div>
        </div>

        {/* Mobile Nav Links */}
        <div className="flex flex-col gap-1 mb-auto">
          {links.map((link, index) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-[#fcf8f3] font-display text-[15vw] leading-[0.85] uppercase font-bold tracking-tight hover:opacity-80 transition-opacity"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile Socials */}
        <div className="mt-12 border-t-2 border-[#fcf8f3] pt-6">
           <div className="flex flex-col gap-2">
              {socials.map(social => (
                 <a 
                   key={social} 
                   href="#" 
                   className="text-[#fcf8f3] font-display text-3xl uppercase font-bold tracking-wide hover:translate-x-2 transition-transform"
                 >
                   {social}
                 </a>
              ))}
           </div>
        </div>
      </div>
    </>
  );
};


// ====================================================================
// B. PLACEHOLDER COMPONENTS (Required to make App.tsx compile)
//    *** You must replace the body of these functions with your actual code. ***
// ====================================================================

const Scene: React.FC = () => {
  // Replace this function's return with the logic from your original Scene (3D Header)
  return (
    <div className="flex h-full w-full items-center justify-center text-gray-400 bg-transparent text-xl">
      [Scene Component Placeholder]
    </div>
  );
};

interface CardStackProps {}
const CardStack: React.FC<CardStackProps> = () => {
  // Replace this function's return with the logic from your original CardStack
  return (
    <div className="h-[200vh] flex items-start justify-center p-10 bg-gray-100">
      <div className="text-gray-500 p-8 border border-dashed rounded-lg">
        [CardStack Component Placeholder]
      </div>
    </div>
  );
};


// ====================================================================
// C. MAIN APPLICATION COMPONENT (The App component itself)
// ====================================================================

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-bg text-gray-900 font-inter">
      
      {/* 1. NAVIGATION: Floats over all content */}
      <Navigation />
      
      {/* 2. HERO SECTION: Full viewport height */}
      <section className="h-screen w-full relative overflow-hidden bg-[#fcf8f3]">
        <Scene /> 
      </section>

      {/* 3. TITLE INTERSTITIAL */}
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

      {/* 4. CARD STACK SECTION */}
      <main className="relative z-10">
        <CardStack /> 
      </main>

      {/* 5. FOOTER */}
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

      {/* 6. Browser Warning */}
      <div className="warning-banner hidden fixed top-0 left-0 w-full bg-red-600 text-white justify-center items-center p-3 z-50 text-sm font-semibold">
        ⚠️ This effect requires Chrome 115+ or Edge.
      </div>

    </div>
  );
};

export default App;
