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

export default function ScrollVelocityText({ children, baseVelocity = 3, className = "", spanClassName = "block pr-8", style }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Map the scroll velocity to a speed multiplier
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

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
        <span className={spanClassName}>{children}</span>
        <span className={spanClassName}>{children}</span>
        <span className={spanClassName}>{children}</span>
        <span className={spanClassName}>{children}</span>
      </motion.div>
    </div>
  );
}
