// components/CustomCursor.tsx
"use client"; // This is required for using client-side features like useEffect

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    // Move the cursor with the mouse
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    // Handle hover effects
    const onHover = () => {
      gsap.to(cursor, {
        scale: 3,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        duration: 0.5,
      });
    };

    const onHoverOut = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "rgba(255, 255, 255, 225)",
        duration: 0.3,
      });
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", moveCursor);

    // Add hover effects to all links and buttons
    const hoverElements = document.querySelectorAll("a, button");
    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", onHover as EventListener);
      element.addEventListener("mouseleave", onHoverOut as EventListener);
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      hoverElements.forEach((element) => {
        element.removeEventListener("mouseenter", onHover as EventListener);
        element.removeEventListener("mouseleave", onHoverOut as EventListener);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "20px",
        height: "20px",
        backgroundColor: "rgba(255, 255, 255, 255)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CustomCursor;