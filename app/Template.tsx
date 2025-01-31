// app/Template.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Loader from "@/components/Loader";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const templateRef = useRef<HTMLDivElement>(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (showLoader) return;

    // Animate page in with zoom-in effect
    gsap.from(templateRef.current, {
      opacity: 0,
      scale: 1.2, // Start smaller
      duration: 1,
      ease: "power3.out",
    });

    // Cleanup animation on unmount
    return () => {
      gsap.to(templateRef.current, {
        opacity: 0,
        scale: 1, // Shrink on exit
        duration: 1,
        ease: "power3.in",
      });
    };
  }, [pathname, showLoader]);

  return (
    <>
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      <div  className="page-transition">
        {children}
      </div>
    </>
  );
}
