import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut', duration: 1.5 },
      onComplete: onComplete
    });

    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 2,
      ease: 'power2.inOut'
    })
    .to(loaderRef.current, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.5,
      ease: 'power4.inOut'
    }, '-=1.5');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="fixed inset-0 bg-black h-screen w-full z-50 flex items-center justify-center">
      <div className="w-64 h-1 bg-gray-800 rounded overflow-hidden">
        <div 
          ref={progressRef} 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 origin-left"
        />
      </div>
    </div>
  );
};

export default Loader;