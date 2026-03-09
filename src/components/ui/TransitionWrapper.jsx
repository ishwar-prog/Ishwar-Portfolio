import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './TransitionWrapper.css';

export default function TransitionWrapper({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const transitionRef = useRef(null);
  const isTransitioning = useRef(false);

  const adjustGrid = () => {
    return new Promise((resolve) => {
      const transition = transitionRef.current;
      if (!transition) return resolve();

      const computedStyle = window.getComputedStyle(transition);
      const gridTemplateColumns = computedStyle.getPropertyValue('grid-template-columns');

      const columns = gridTemplateColumns && gridTemplateColumns !== 'none' 
        ? gridTemplateColumns.split(' ').length 
        : 8; 

      const blockSize = Math.ceil(window.innerWidth / columns) + 1; 
      const rowsNeeded = Math.ceil(window.innerHeight / blockSize) + 1;

      transition.style.gridTemplateRows = `repeat(${rowsNeeded}, ${blockSize}px)`;
      transition.style.display = 'grid'; 

      const totalBlocks = columns * rowsNeeded;
      
      const currentBlocks = transition.querySelectorAll('.transition-block').length;

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

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;
      
      const target = link.getAttribute('target');
      if (target === '_blank') return;
      
      if (href.startsWith('#')) return;
      
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

      if (link.hasAttribute('data-transition-prevent')) return;

      try {
          const url = new URL(link.href);
          if (url.origin !== window.location.origin) return;
      } catch (err) {
          // If invalid URL, assume internal relative path
      }

      e.preventDefault();

      if (isTransitioning.current) return;
      isTransitioning.current = true;

      let targetPath;
      try {
        const urlOb = new URL(link.href, window.location.origin);
        targetPath = urlOb.pathname.replace(/\/+$/, '') || '/';
      } catch(e) {
        targetPath = href;
      }
      
      const currentPath = location.pathname.replace(/\/+$/, '') || '/';

      const isSamePath = currentPath === targetPath;
      const hasHash = href.includes('#');

      if (isSamePath && !hasHash) {
          e.preventDefault(); 
          return;
      }

      if (isSamePath && hasHash) {
          e.preventDefault();
          const hashString = '#' + href.split('#')[1];
          if (hashString && hashString !== '#') {
            window.history.pushState({}, '', href);
            if (window.lenis) {
              window.lenis.scrollTo(hashString, { offset: 0, duration: 1.5 });
            } else {
              const el = document.querySelector(hashString);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }
          return; 
      }

      const transition = transitionRef.current;
      if (!transition) return;

      gsap.set(transition, { display: "grid", zIndex: 9999 });
      
      const blocks = transition.querySelectorAll('.transition-block');

      const runEnter = (elements, path) => {
          gsap.killTweensOf(elements); 
          
          if(transitionRef.current) {
            transitionRef.current.style.display = 'grid';
            transitionRef.current.style.zIndex = 9999;
          }

          gsap.set(elements, { opacity: 0, visibility: 'visible' });

          gsap.to(elements, {
            keyframes: [
              { opacity: 0.18, duration: 0.18, ease: "power1.in" },
              { opacity: 1,    duration: 0.18, ease: "power1.out" }
            ],
            stagger: {
              amount: 0.8,
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
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [location, navigate]);

  useEffect(() => {
      const handlePageShow = (event) => {
          if (event.persisted) {
              window.location.reload();
          }
      };
      window.addEventListener("pageshow", handlePageShow);
      return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const isFirstRender = useRef(true);

  useEffect(() => {
    isTransitioning.current = false;
    
    if (isFirstRender.current) {
      if (transitionRef.current) {
        transitionRef.current.style.display = 'none';
      }
      isFirstRender.current = false;
      return;
    }

    const transition = transitionRef.current;
    if (transition) {
       transition.style.display = 'grid';
       transition.style.zIndex = 9999;
    }

    const openCurtain = () => {
        if(!transition) return;
        
        const blocks = transition.querySelectorAll('.transition-block');
      
        gsap.set(blocks, { opacity: 1, visibility: 'visible' });
        
        gsap.killTweensOf(blocks);

        gsap.to(blocks, {
           keyframes: [
             { opacity: 0.18, duration: 0.18, ease: "power1.in" },
             { opacity: 0,    duration: 0.18, ease: "power1.out" }
           ],
           stagger: {
             amount: 0.9,
             grid: "auto",
             from: "random"
           },
           onComplete: () => {
              transition.style.display = 'none'; 

              if (location.hash) {
                  setTimeout(() => {
                      if (window.lenis) {
                          window.lenis.scrollTo(location.hash, { offset: 0, duration: 1.5 });
                      } else {
                          const el = document.querySelector(location.hash);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                  }, 50);
              }
           }
        });
    };
    
    adjustGrid().then(openCurtain);

  }, [location.pathname]); 

  return (
    <>
      <div className="transition" ref={transitionRef}></div>
      {children}
    </>
  );
}
