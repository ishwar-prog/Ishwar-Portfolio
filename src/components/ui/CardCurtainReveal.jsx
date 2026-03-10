import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const CurtainContext = createContext({ isHovered: false });

export function CardCurtainReveal({ children, className, ...props }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const isHoveredRef = useRef(false);
  const mouseX = useRef(-9999);
  const mouseY = useRef(-9999);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    let rafId;
    const poll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const inside =
          mouseX.current >= rect.left &&
          mouseX.current <= rect.right &&
          mouseY.current >= rect.top &&
          mouseY.current <= rect.bottom;

        if (inside !== isHoveredRef.current) {
          isHoveredRef.current = inside;
          setIsHovered(inside);
        }
      }
      rafId = requestAnimationFrame(poll);
    };
    rafId = requestAnimationFrame(poll);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <CurtainContext.Provider value={{ isHovered }}>
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {children}
      </div>
    </CurtainContext.Provider>
  );
}

export function CardCurtain({ className, ...props }) {
  const { isHovered } = useContext(CurtainContext);

  return (
    <motion.div
      className={cn(
        "hidden md:block absolute inset-0 z-10 bg-black/40 backdrop-blur-md",
        className
      )}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: isHovered ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      style={{ originY: "50%" }}
      {...props}
    />
  );
}

export function CardCurtainRevealFooter({ children, className, ...props }) {
  const { isHovered } = useContext(CurtainContext);

  return (
    <motion.div
      className={cn(
        "hidden md:flex absolute inset-0 z-20 items-center justify-center gap-6",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isHovered ? 1 : 0,
        y: isHovered ? 0 : 10,
      }}
      transition={{ duration: 0.35, delay: isHovered ? 0.15 : 0, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardCurtainRevealTitle({ children, className, ...props }) {
  return (
    <h3 className={cn("text-white font-bold text-xl", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardCurtainRevealDescription({ children, className, ...props }) {
  return (
    <p className={cn("text-white/70 text-sm", className)} {...props}>
      {children}
    </p>
  );
}

export function CardCurtainRevealBody({ children, className, ...props }) {
  return (
    <div className={cn("relative w-full h-full", className)} {...props}>
      {children}
    </div>
  );
}
