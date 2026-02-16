import { useState, useEffect, useRef } from "react";

export function ScrambleText({ 
  text, 
  speed = 30, 
  chars = "...........",
  className = "",
  startOnHover = true
}) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const iterationsRef = useRef(0);

  const scramble = () => {
    const original = text.split('');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    iterationsRef.current = 0;
    const maxIterations = original.length * 2;

    intervalRef.current = setInterval(() => {
      iterationsRef.current += 1;

      const out = original
        .map((ch, i) => {
          if (iterationsRef.current > i * 2) return ch;
          // Random character from the chars string
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayText(out);

      if (iterationsRef.current >= maxIterations) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text); // Ensure final text is correct
      }
    }, speed);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span 
      onMouseEnter={startOnHover ? scramble : undefined} 
      className={`inline-block whitespace-nowrap ${className}`}
    >
      {displayText}
    </span>
  );
}
