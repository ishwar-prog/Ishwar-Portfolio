import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './TransitionWrapper.css';

export default function TransitionWrapper({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const transitionRef = useRef(null);
  const isTransitioning = useRef(false);

  // Function to adjust grid blocks based on window size
  const adjustGrid = () => {
    return new Promise((resolve) => {
      const transition = transitionRef.current;
      if (!transition) return resolve();

      // Ensure transition element is accessible
      
      const computedStyle = window.getComputedStyle(transition);
      const gridTemplateColumns = computedStyle.getPropertyValue('grid-template-columns');
      // Fallback if gridTemplateColumns is not set or valid
      const columns = gridTemplateColumns && gridTemplateColumns !== 'none' 
        ? gridTemplateColumns.split(' ').length 
        : 8; 

      // Use a cleaner calculation (add 1 pixel to avoid sub-pixel gaps)
      const blockSize = Math.ceil(window.innerWidth / columns) + 1; 
      const rowsNeeded = Math.ceil(window.innerHeight / blockSize) + 1;

      // Update grid styles
      // We rely on CSS Grid to handle layout, but rows need to be explicitly sized to match aspect ratio
      transition.style.gridTemplateRows = `repeat(${rowsNeeded}, ${blockSize}px)`;
      transition.style.display = 'grid'; 

      const totalBlocks = columns * rowsNeeded;
      
      // Calculate current count using .length instead of childElementCount for reliability
      const currentBlocks = transition.querySelectorAll('.transition-block').length;

      // Only rebuild if necessary
      if (currentBlocks !== totalBlocks) {
          transition.innerHTML = '';
          const fragment = document.createDocumentFragment();
          for (let i = 0; i < totalBlocks; i++) {
            const block = document.createElement('div');
            block.classList.add('transition-block');
            fragment.appendChild(block);
          }
          transition.appendChild(fragment);
      }

      resolve();
    });
  };

  // Click Handler
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;
      
      const target = link.getAttribute('target');
      if (target === '_blank') return;
      
      // Ignore anchor links on same page
      if (href.startsWith('#')) return;

      // Ignore if preventing transition
      if (link.hasAttribute('data-transition-prevent')) return;

      // Check external links
      try {
          const url = new URL(link.href);
          if (url.origin !== window.location.origin) return;
      } catch (err) {
          // If invalid URL, assume internal relative path
      }

      // It's an internal link we should handle
      e.preventDefault();

      if (isTransitioning.current) return;
      isTransitioning.current = true;

      // Normalize paths to prevent re-navigation to same page
      // Get the path from the href attribute for comparison, but use the full URL check for safety
      let targetPath;
      try {
        const urlOb = new URL(link.href, window.location.origin);
        targetPath = urlOb.pathname.replace(/\/+$/, '') || '/';
      } catch(e) {
        targetPath = href;
      }
      
      const currentPath = location.pathname.replace(/\/+$/, '') || '/';

      // Check if we are already on the target page
      // But also check if there is a hash (anchor) change
      const isSamePath = currentPath === targetPath;
      const hasHash = href.includes('#');

      if (isSamePath && !hasHash) {
          e.preventDefault(); 
          return;
      }

      if (isSamePath && hasHash) {
          // It's an anchor link on the same page, let default behavior happen or handle scroll
          // Don't animate
          return; 
      }

       // Exit animation (Fade In Blocks)
      const transition = transitionRef.current;
      if (!transition) return;

      gsap.set(transition, { display: "grid", zIndex: 9999 });
      
      const blocks = transition.querySelectorAll('.transition-block');

      // Helper to run animation
      const runEnter = (elements, path) => {
          gsap.killTweensOf(elements); // Kill any existing tweens
          
          // Ensure container is visible and on top
          if(transitionRef.current) {
            transitionRef.current.style.display = 'grid';
            transitionRef.current.style.zIndex = 9999;
          }

          // Reset blocks to initial state for animation (invisible)
          gsap.set(elements, { opacity: 0, visibility: 'visible' });

          gsap.to(elements, {
            opacity: 1,
            duration: 0.1, 
            ease: "power1.inOut",
            stagger: {
              amount: 0.8, // Slow down the filling animation
              grid: "auto",
              from: "random"
            },
            onComplete: () => {
              isTransitioning.current = false;
              navigate(path);
            }
          });
      };

      if (!blocks || blocks.length === 0) {
          adjustGrid().then(() => {
             const newBlocks = transitionRef.current.querySelectorAll('.transition-block');
             runEnter(newBlocks, href);
          });
      } else {
          runEnter(blocks, href);
      }
    };
    
    // Use event delegation on document
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [location, navigate]); // Check dependencies

  // Handle bfcache restoration
  useEffect(() => {
      const handlePageShow = (event) => {
          if (event.persisted) {
              window.location.reload();
          }
      };
      window.addEventListener("pageshow", handlePageShow);
      return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  // Route Change / Initial Load
  useEffect(() => {
    // Reset state on location change
    isTransitioning.current = false;

    const transition = transitionRef.current;
    if (transition) {
       // Ensure it's covered immediately if it's not already
       // But wait, if we nav from another page, it is ALREADY covered by the previous animation.
       // We just need to make sure we don't flash.
       transition.style.display = 'grid';
       transition.style.zIndex = 9999;
    }

    const openCurtain = () => {
        if(!transition) return;
        
        const blocks = transition.querySelectorAll('.transition-block');
      
        // Start covered
        gsap.set(blocks, { opacity: 1, visibility: 'visible' });
        
        // Kill any existing tweens on blocks to prevent conflict
        gsap.killTweensOf(blocks);

        // Animate out (reveal page)
        gsap.to(blocks, {
           opacity: 0,
           duration: 0.1, // Element duration
           ease: "power2.inOut", // Smoother ease
           stagger: {
             amount: 0.9, // Slower reveal
             grid: "auto",
             from: "random"
           },
           onComplete: () => {
              transition.style.display = 'none'; 
           }
        });
    };
    
    // Always ensure grid is correct size
    adjustGrid().then(openCurtain);

  }, [location.pathname]); // Runs on switch

  return (
    <>
      <div className="transition" ref={transitionRef}></div>
      {children}
    </>
  );
}
