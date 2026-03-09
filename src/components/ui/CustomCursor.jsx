import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const MOVE_SPRING  = { damping: 28, stiffness: 280, mass: 0.5 };
const SCALE_SPRING = { type: "spring", damping: 20, stiffness: 240, mass: 0.8 };

export default function CustomCursor() {
  // Bail out on touch / coarse-pointer devices (phones, tablets)
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  // Raw motion values — updated via event listener (no re-renders on mouse move)
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Spring-smoothed values that drive the cursor position
  const springX = useSpring(rawX, MOVE_SPRING);
  const springY = useSpring(rawY, MOVE_SPRING);

  // Only re-render when hover state actually toggles
  const [hovered, setHovered] = useState(false);
  const hoveredElRef = useRef(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e) => {
      const el = e.target.closest?.(".project-hover");
      const nowHovering = !!el;

      if (nowHovering !== isHoveredRef.current) {
        isHoveredRef.current = nowHovering;
        hoveredElRef.current = nowHovering ? el : null;
        setHovered(nowHovering);
      }

      let cx = e.clientX;
      let cy = e.clientY;

      // Subtle magnetic pull toward card centre
      if (hoveredElRef.current) {
        const r = hoveredElRef.current.getBoundingClientRect();
        cx += (r.left + r.width  / 2 - cx) * 0.12;
        cy += (r.top  + r.height / 2 - cy) * 0.12;
      }

      rawX.set(cx);
      rawY.set(cy);
    };

    const onLeave = () => {
      isHoveredRef.current = false;
      hoveredElRef.current = null;
      setHovered(false);
      rawX.set(-200);
      rawY.set(-200);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch, rawX, rawY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none rounded-full flex items-center justify-center overflow-hidden"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 99999,
        // Frosted-glass ring in brand accent — only on hover
        boxShadow: hovered
          ? "inset 0 0 0 1.5px rgba(211,253,80,0.55), 0 0 32px 4px rgba(211,253,80,0.12)"
          : "none",
        // Backdrop blur creates the see-through tinted effect from the image
        backdropFilter: hovered ? "blur(14px) saturate(220%)" : "none",
        WebkitBackdropFilter: hovered ? "blur(14px) saturate(220%)" : "none",
        // Blend difference for the small dot so it's visible on any bg
        mixBlendMode: hovered ? "normal" : "difference",
      }}
      animate={{
        width:  hovered ? 130 : 50,
        height: hovered ? 130 : 50,
        // Semi-transparent tint — content shows through (not solid)
        backgroundColor: hovered ? "rgba(211,253,80,0.10)" : "#ffffff",
      }}
      transition={SCALE_SPRING}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="see-more"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              // Transparent-type: text colour is a gradient clipped to the text,
              // making it look like it's cut through the cursor to the bg beneath
              background: "linear-gradient(135deg, #D3FD50 0%, rgba(255,255,255,0.75) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="absolute inset-0 flex items-center justify-center text-[11px] font-bold tracking-widest uppercase select-none"
          >
            See More
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
