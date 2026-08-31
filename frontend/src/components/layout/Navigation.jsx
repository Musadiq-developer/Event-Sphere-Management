import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center py-5 px-6 md:px-12 sticky top-0 z-50 shadow-md bg-deep-bg/95 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center cursor-pointer">
        
      </div>
      <ul className="hidden md:flex gap-8 items-center list-none m-0 p-0 text-sm font-bold uppercase text-gray-300">
        <li><Link to="/" className={`inline-block hover:scale-110 hover:-translate-y-0.5 hover:text-white hover:drop-shadow-[0_0_12px_rgba(209,0,160,1)] transition-all duration-300 ${location.pathname === '/' ? 'text-magenta-accent' : ''}`}>Home</Link></li>
        <li><Link to="/features" className={`inline-block hover:scale-110 hover:-translate-y-0.5 hover:text-white hover:drop-shadow-[0_0_12px_rgba(209,0,160,1)] transition-all duration-300 ${location.pathname === '/features' ? 'text-magenta-accent' : ''}`}>Features</Link></li>
        <li><Link to="/about" className={`inline-block hover:scale-110 hover:-translate-y-0.5 hover:text-white hover:drop-shadow-[0_0_12px_rgba(209,0,160,1)] transition-all duration-300 ${location.pathname === '/about' ? 'text-magenta-accent' : ''}`}>About Us</Link></li>
        <li><Link to="/contact" className={`inline-block hover:scale-110 hover:-translate-y-0.5 hover:text-white hover:drop-shadow-[0_0_12px_rgba(209,0,160,1)] transition-all duration-300 ${location.pathname === '/contact' ? 'text-magenta-accent' : ''}`}>Contact Us</Link></li>
        <li>
          <Link to="/login" className="px-6 py-2.5 rounded-xl border-2 border-magenta-accent text-magenta-accent hover:bg-magenta-accent hover:text-white transition-all duration-300 shadow-purple-500/20 hover:shadow-purple-500/30">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
