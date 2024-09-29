import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 100) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <header className={`transition-all duration-300 ${isHovered ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/" className={`text-2xl font-bold ${isHovered ? 'text-primary' : 'text-white'}`}>YourLogo</Link>

    
        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden text-primary">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/about" className={`hover:text-accent ${isHovered ? 'text-primary' : 'text-white'}`}>About</Link>
          <Link to="/services" className={`hover:text-accent ${isHovered ? 'text-primary' : 'text-white'}`}>Services</Link>
          <Link to="/contact" className={`hover:text-accent ${isHovered ? 'text-primary' : 'text-white'}`}>Contact</Link>
          <Link to="/try-demo" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Try Demo</Link>
        </nav>
      </div>


      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 inset-x-0 bg-gray-100 z-50">
          <nav className="mt-4">
            <Link to="/about" className="block px-4 py-2 text-primary text-lg hover:text-yellow-400 hover:bg-gray-200">About</Link>
            <Link to="/services" className="block px-4 py-2 text-primary text-lg hover:text-yellow-400 hover:bg-gray-200">Services</Link>
            <Link to="/contact" className="block px-4 py-2 text-primary text-lg hover:text-yellow-400 hover:bg-gray-200">Contact</Link>
            <Link to="/try-demo" className="block px-4 py-2 text-primary text-lg hover:text-yellow-400 hover:bg-gray-200">Try Demo</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;