'use client'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      duration: 1.5,
      opacity: 0,
      y: 50,
      ease: 'power4.out',
      delay: 0.5
    });
  }, []);

  return (
    <div ref={contentRef} className="opacity-0">
      {children}
    </div>
  );
};

export default PageTransition;