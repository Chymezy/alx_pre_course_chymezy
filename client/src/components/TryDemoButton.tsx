import React, { useState, useEffect } from 'react';

interface TryDemoButtonProps {
  className?: string;
}

const TryDemoButton: React.FC<TryDemoButtonProps> = ({ className = '' }) => {
  const [isFloating, setIsFloating] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const heroHeight = document.querySelector('.hero-section')?.clientHeight || 0;
      const footerHeight = document.querySelector('footer')?.clientHeight || 0;

      setIsFloating(window.innerWidth < 768 && scrollY > heroHeight);
      setIsVisible(scrollY + windowHeight < documentHeight - footerHeight - 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const buttonClasses = `bg-accent text-primary font-bold py-3 px-6 rounded-full hover:bg-accent-green transition duration-300 ${className}`;

  return (
    <>
      {/* Button for all screen sizes - static in hero section */}
      <button className={`${buttonClasses} ${isFloating ? 'md:block hidden' : ''}`}>
        Try Free Demo
      </button>

      {/* Floating button for small screens */}
      <div 
        className={`md:hidden fixed bottom-4 left-4 right-4 z-50 transition-all duration-300 ${
          isFloating && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <button className={`${buttonClasses} w-full`}>
          Try Free Demo
        </button>
      </div>
    </>
  );
};

export default TryDemoButton;


