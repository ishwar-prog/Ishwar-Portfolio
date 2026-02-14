import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function TextReveal({ text, className = "" }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.6"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <p className="flex flex-wrap text-lg md:text-7xl font-extrabold leading-20">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const springOpacity = useSpring(opacity, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <span className="relative mr-3 mt-2">
      <span className="absolute" style={{ color: "#141414e6" }}>
        {children}
      </span>
      <motion.span
        style={{ opacity: springOpacity, color: "rgb(246,244,240)" }}
      >
        {children}
      </motion.span>
    </span>
  );
}
