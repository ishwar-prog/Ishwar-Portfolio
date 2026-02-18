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
        targetPath = urlOb.pathname.replace(/\/+$/, '');
      } catch(e) {
        targetPath = href;
      }
      
      const currentPath = location.pathname.replace(/\/+$/, '');
      
      if(currentPath === targetPath && targetPath !== '') {
          e.preventDefault(); // Prevent default but don't animate
          return; 
      }

       // Exit animation (Fade In Blocks)
      const transition = transitionRef.current;
      if (!transition) return;

      gsap.set(transition, { display: "grid", zIndex: 9999 });
      
      const blocks = transition.querySelectorAll('.transition-block');

      // Helper to run animation
      const runExit = (elements) => {
          gsap.killTweensOf(elements); // Kill any existing tweens
          
          // Ensure container is visible and on top
          gsap.set(transition, { display: "grid", zIndex: 9999, autoAlpha: 1 });

          // Reset blocks to initial state for animation
          gsap.set(elements, { autoAlpha: 0 });

          gsap.to(
            elements,
            {
              autoAlpha: 1,
              duration: 0.05, 
              ease: "linear",
              stagger: { amount: 0.5, from: "random" },
              onComplete: () => {
                isTransitioning.current = false;
                
                // Ensure we navigate correctly
                if (href.startsWith('http')) {
                    // Start from root if full URL is passed? No, usually href from getAttribute is relative or absolute.
                    // If it is absolute internal URL, strip origin.
                    try {
                        const url = new URL(href);
                        navigate(url.pathname + url.search + url.hash);
                    } catch(e) {
                         navigate(href);
                    }
                } else {
                    navigate(href);
                }
              }
            }
          );
      };

      if (blocks.length === 0) {
          adjustGrid().then(() => {
             const newBlocks = transitionRef.current.querySelectorAll('.transition-block');
             runExit(newBlocks);
          });
      } else {
          runExit(blocks);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

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
      const openCurtain = () => {
          const transition = transitionRef.current;
          if(!transition) return;
          
          gsap.set(transition, { display: "grid", zIndex: 9999 });
          const blocks = transition.querySelectorAll('.transition-block');
        
          // Create a timeline just for cleanup
          const tl = gsap.timeline({
              defaults: { ease: "linear" },
              onComplete: () => {
                 gsap.set(transition, { display: "none" });
              }
          });

          // If coming from a navigation, blocks are at opacity 1.
          // If initial load, we might need to set them. 
          // Safest is to set them to 1 then fade to 0.
          
          // Wait, if it's a fresh load (reload), blocks are NOT at opacity 1 created by previous exit animation (because strict reload clears DOM).
          // So we MUST set them to opacity 1 immediately to block view, then fade out.
          
          // But we need to distinguish:
          // 1. Initial Load: Grid empty -> create blocks -> set opacity 1 -> fade out.
          // 2. Route Change: Grid has blocks (opacity 1 from exit animation) -> fade out.
          
          // Since `adjustGrid` clears innerHTML and recreates blocks, we are effectively in case 1 always if we blindly call it.
          // Wait, if we recreate blocks, they lose their opacity: 1 state from the previous animation!
          // They will be default (opacity: 0 in CSS).
          // So we MUST set opacity: 1 after creating them if we want to validly transition.

          // Optimization: Only adjust grid if size changed? 
          // For now, to be safe and simple:
          // Always recreate (fast enough) or ensuring opacity is 1.

          // Ensure container is visible for the "reveal"
          gsap.set(transition, { display: "grid", zIndex: 9999, autoAlpha: 1 });
          
          // Set blocks to full opacity initially (covering the screen)
          gsap.set(blocks, { autoAlpha: 1 });

          // Kill any existing tweens on blocks to prevent conflict
          gsap.killTweensOf(blocks);

          tl.to(blocks, {
             autoAlpha: 0,
             duration: 0.5,
             ease: "power2.inOut", // Smoother easing
             stagger: { amount: 0.75, from: "random" }, 
             onComplete: () => {
                // Ensure hidden after animation completes to start fresh
                gsap.set(transition, { display: "none" }); 
                isTransitioning.current = false; 
             }
          });
      };
      
      // Always ensure grid is correct size
      // Reset isTransitioning state on route change just in case
      isTransitioning.current = false; 
      
      // Use .then to ensure grid exists before animating
      // Add a small delay to ensure React has updated the route and DOM if needed
      setTimeout(() => {
          adjustGrid().then(openCurtain).catch(() => {
              // Fallback if something fails: hide everything
              const transition = transitionRef.current;
              if(transition) transition.style.display = 'none';
          });
      }, 10);

      window.addEventListener('resize', adjustGrid);
      return () => window.removeEventListener('resize', adjustGrid);

  }, [location.pathname]); // Runs on mount and route change

  return (
    <>
      <div className="transition" ref={transitionRef}></div>
      {children}
    </>
  );
}
