import React, { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const CurtainContext = createContext({ isHovered: false });

export function CardCurtainReveal({ children, className, ...props }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CurtainContext.Provider value={{ isHovered }}>
      <div
        className={cn("relative overflow-hidden", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
