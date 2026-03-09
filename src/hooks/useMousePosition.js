import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

/**
 * Returns two raw Framer Motion motion values (x, y) that track the mouse.
 * Motion values update silently — no React re-renders on every mouse move.
 */
export function useMousePosition() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  useEffect(() => {
    const update = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [x, y]);

  return { x, y };
}
