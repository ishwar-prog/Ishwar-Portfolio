import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap
} from "framer-motion";

export default function ScrollVelocityText({ children, baseVelocity = 3, className = "", style }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth out the velocity so the text doesn't sharply jerk
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Map the scroll velocity to a speed multiplier
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Seamlessly loop the translate percentage when it goes out of bounds.
  // Wrapping between -20% and -45% usually creates a perfect loop with 4 spans.
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Determines direction: 1 (scroll down) vs -1 (scroll up)
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Boost speed proportionally to how fast you're scrolling
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap m-0 flex w-full">
      <motion.div
        className={`flex whitespace-nowrap ${className}`}
        style={{ x }}
        {...(style && { style: { ...style, x } })}
      >
        <span className="block pr-8">{children}</span>
        <span className="block pr-8">{children}</span>
        <span className="block pr-8">{children}</span>
        <span className="block pr-8">{children}</span>
      </motion.div>
    </div>
  );
}
