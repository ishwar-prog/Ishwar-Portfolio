import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const MOVE_SPRING  = { damping: 28, stiffness: 280, mass: 0.5 };
const SCALE_SPRING = { type: "spring", damping: 20, stiffness: 240, mass: 0.8 };

export default function CustomCursor() {
  // Bail out on small screens, touch devices, and mobile environments
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        window.innerWidth < 768 ||
        ("ontouchstart" in window) ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none) and (pointer: coarse)").matches
      );
    };
    
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

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
  
  // Track last known mouse position without triggering re-renders
  const lastClient = useRef({ x: -200, y: -200 });

  useEffect(() => {
    if (isTouch) return;

    // Zero-cost hover detection
    const handleHoverCheck = (clientX, clientY) => {
      const el = document.elementFromPoint(clientX, clientY);
      const card = el?.closest?.(".project-hover");
      const nowHovering = !!card;

      if (nowHovering !== isHoveredRef.current) {
        isHoveredRef.current = nowHovering;
        hoveredElRef.current = nowHovering ? card : null;
        setHovered(nowHovering);
      }
    };

    // Mouse movement: update coordinates and check hover natively
    const onMove = (e) => {
      lastClient.current = { x: e.clientX, y: e.clientY };
      handleHoverCheck(e.clientX, e.clientY);

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

    // Scroll handler: Only runs when page scroll shifts elements under the stationary mouse
    const onScroll = () => {
      // Don't calculate if mouse hasn't entered the screen yet
      if (lastClient.current.x === -200) return;
      handleHoverCheck(lastClient.current.x, lastClient.current.y);
    };

    const onLeave = () => {
      isHoveredRef.current = false;
      hoveredElRef.current = null;
      setHovered(false);
      rawX.set(-200);
      rawY.set(-200);
    };

    // Attach native events
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    // Give useLenis a tiny fraction of a second to initialize and attach to window
    let lenisRef = null;
    const scrollTimeout = setTimeout(() => {
      if (window.lenis) {
        lenisRef = window.lenis;
        lenisRef.on('scroll', onScroll);
      } else {
        // Fallback directly to native scroll if Lenis is absent
        window.addEventListener('scroll', onScroll, { passive: true });
      }
    }, 100);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      clearTimeout(scrollTimeout);
      
      if (lenisRef) {
        lenisRef.off('scroll', onScroll);
      } else {
        window.removeEventListener('scroll', onScroll);
      }
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
        mixBlendMode: "difference",
      }}
      animate={{
        width:  hovered ? 130 : 50,
        height: hovered ? 130 : 50,
        backgroundColor: "#ffffff",
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
            className="absolute inset-0 flex items-center justify-center text-[11px] font-bold tracking-widest uppercase select-none text-black"
          >
            See More
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}