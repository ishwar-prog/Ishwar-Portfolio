"use client";
import { useState, useEffect } from "react";

export default function AnimatedTextSlider({ 
  texts = ["Text 1", "Text 2", "Text 3"],
  interval = 3500,
  className = ""
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className={`relative inline-flex flex-col h-[1.2em] overflow-hidden align-top ${className}`}>
      {texts.map((text, i) => (
        <div 
          key={i} 
          className="w-full text-center transition-transform duration-700 ease-in-out absolute left-0 top-0"
          style={{ 
            transform: `translateY(${(i - index) * 100}%)`,
            opacity: i === index ? 1 : 0
          }}
        >
          {text}
        </div>
      ))}
      <div className="invisible opacity-0 select-none px-1" aria-hidden="true">
        {/* Use the longest text to set the width */}
        {texts.reduce((a, b) => a.length > b.length ? a : b)}
      </div>
    </div>
  );
}
