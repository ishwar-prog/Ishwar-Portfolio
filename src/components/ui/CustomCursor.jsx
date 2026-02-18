import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const location = useLocation();

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Initial setup
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Text update logic on hover
    const handleMouseOver = (e) => {
      // Find closest interactive element
      const interactive = e.target.closest('a, button, [data-cursor], [data-cursor-text]');
      
      if (interactive) {
        cursor.classList.add('is-hovering');
        
        // Handle custom text
        const text = interactive.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
          cursor.classList.add('has-text');
        } else {
          setCursorText("");
          cursor.classList.remove('has-text');
        }
      } else {
        cursor.classList.remove('is-hovering');
        cursor.classList.remove('has-text');
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver); // Use mouseover on document to catch bubbled events

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []); // Run once, listeners persist

  return (
    <div className="cursor" ref={cursorRef}>
      <span className="cursor-text" ref={textRef}>{cursorText}</span>
    </div>
  );
}
