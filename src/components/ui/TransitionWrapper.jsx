import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './TransitionWrapper.css';

// Matches the HeroWipeSlideshow cubic-bezier exactly
const WIPE_EASE = [0.76, 0, 0.15, 1];
const WIPE_DURATION = 0.85;

function PageLayer({ children, location }) {
  const ref = useRef(null);

  const handleAnimationComplete = (definition) => {
    // Once the "animate" (enter) state finishes, strip all inline styles
    // so that child mix-blend-mode (e.g. About Me video) works correctly.
    if (definition === 'animate' && ref.current) {
      ref.current.style.clipPath = '';
    }
  };

  return (
    <motion.div
      ref={ref}
      key={location.pathname}
      // Wipe in from the right edge
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      // Exit instantly — the incoming page covers without any gap
      exit={{ clipPath: 'inset(0 0% 0 0)', transition: { duration: 0 } }}
      transition={{ duration: WIPE_DURATION, ease: WIPE_EASE }}
      onAnimationComplete={handleAnimationComplete}
      className="wipe-page-layer"
    >
      {children}
    </motion.div>
  );
}

export default function TransitionWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  const rendered = typeof children === 'function' ? children(location) : children;

  return (
    <AnimatePresence mode="sync">
      <PageLayer key={location.pathname} location={location}>
        {rendered}
      </PageLayer>
    </AnimatePresence>
  );
}
