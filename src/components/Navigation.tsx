import React, { useState } from 'react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = ['ABOUT', 'ARCHIVE', 'SPEAKING', 'BLOGS', 'CONTACT'];
  const socials = ['GITHUB', 'CODEPEN', 'BLUESKY', 'MASTODON', 'INSTAGRAM', 'LINKEDIN', 'RSS'];

  return (
    <>
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
      
      {/* Main Header Container - pointer-events-none to let mouse pass through to Scene */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-start pointer-events-none">
        
        {/* Left Side: Logo & Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pointer-events-auto">
          {/* Logo */}
          <div className="text-accent font-display text-5xl font-bold uppercase tracking-tighter leading-none select-none">
            DF
          </div>

          {/* Desktop Info Line */}
          <div className="hidden md:flex items-center gap-3 text-accent font-display text-lg uppercase tracking-wide">
             <a href="mailto:hi@danflatt.ca" className="nav-link-hover">hi@danflatt.ca</a>
          </div>
        </div>

        {/* Right Side: Desktop Nav */}
        <div className="hidden md:flex gap-8 pointer-events-auto">
          {links.map(link => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="text-accent font-display text-xl uppercase font-bold tracking-wide nav-link-hover"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className={`md:hidden pointer-events-auto z-50 focus:outline-none transition-colors duration-300 ${isOpen ? 'text-[#fcf8f3]' : 'text-accent'}`}
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
                 <div key={i} className="bg-accent w-full h-full rounded-[1px]" />
               ))}
            </div>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-accent z-40 flex flex-col p-6 transition-transform duration-500 ease-in-out md:hidden overflow-y-auto ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
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

export default Navigation;
