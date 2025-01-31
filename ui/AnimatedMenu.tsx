"use client"
import { useState } from 'react';



const AnimatedMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-icon" onClick={toggleMenu}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 20H30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}
        />
        <path
          d="M10 15H30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
        />
        <path
          d="M10 25H30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
        />
      </svg>
    </div>
  );
};

export default AnimatedMenu;