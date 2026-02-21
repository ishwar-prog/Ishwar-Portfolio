import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

// Import only the 3 images. The 4th state reveals the app.
import god2Img from '../../assets/god2.png';
import virat2Img from '../../assets/virat2.png';
import krsna2 from '../../assets/krsna2.png';

const images = [
  god2Img,
  virat2Img,
    krsna2
];

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const appContent = document.getElementById("ishwar-app-content");
    
    if (!container || !appContent) return;
    
    // Prevent scrolling during loading
    document.body.style.overflow = "hidden";

    // Initial State for App Content: Scaled Down & Fixed
    // We want it to be visible BEHIND the loader
    gsap.set(appContent, { 
      scale: 0.5, 
      transformOrigin: "center center",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 0
    });

    // Elements
    const loadingLetter = container.querySelectorAll(".ishwar__letter");
    const box = container.querySelectorAll(".ishwar-loader__box");
    const growingImage = container.querySelectorAll(".ishwar__growing-image");
    const headingStart = container.querySelectorAll(".ishwar__h1-start");
    const headingEnd = container.querySelectorAll(".ishwar__h1-end");
    const coverImageExtra = container.querySelectorAll(".ishwar__cover-image-extra");
    const headerContent = container.querySelector(".ishwar-header__content");
    const panelTop = container.querySelector(".ishwar-backdrop-panel.top");
    const panelBottom = container.querySelector(".ishwar-backdrop-panel.bottom");
    const panelLeft = container.querySelector(".ishwar-backdrop-panel.left");
    const panelRight = container.querySelector(".ishwar-backdrop-panel.right");
    const blocker = container.querySelector(".ishwar-project-blocker");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "expo.inOut",
        },
        onComplete: () => {
          setIsHidden(true);
          document.body.style.overflow = ""; // Enable scroll
          gsap.set(appContent, { clearProps: "all" });
          if (onComplete) onComplete();
        }
      });

      // 1. Letters rise up
      if (loadingLetter.length) {
        tl.from(loadingLetter, {
          yPercent: 100,
          stagger: 0.025,
          duration: 1.25
        });
      }

      // 2. Box expands width and height
      if (box.length) {
        tl.fromTo(box, {
          width: "0vw",
          height: "0vh"
        }, {
          width: "40vw", // Minimized box width
          height: "40vh", // Minimized box height
          duration: 1.25
        }, "< 1.25");
        
        // Open the vertical and horizontal gap in the panels to match the box
        if (panelTop && panelBottom) {
             tl.to([panelTop, panelBottom], {
                 height: "30vh", // (100vh - 40vh) / 2
                 duration: 1.25
             }, "<");
        }
        if (panelLeft && panelRight) {
             tl.to([panelLeft, panelRight], {
                 width: "30vw", // (100vw - 40vw) / 2
                 duration: 1.25
             }, "<");
        }
      }

      // 3. Image container expands inside box
      if (growingImage.length) {
        tl.fromTo(growingImage, {
          width: "0%",
        }, {
          width: "100%",
          duration: 1.25
        }, "<");
      }

      // 4. Text moves apart (handled by flexbox now, so we just let it happen)
      // We can remove the explicit x translation since flexbox will push them

      // 5. Crossfade images (God, Virat, Krsna)
      if (coverImageExtra.length) {
        tl.to(coverImageExtra, {
            opacity: 0,
            duration: 0.15, 
            stagger: 0.8,
            ease: "none"
        }, "-=0.25");
      }
      
      // 6. Fade Out Blocker to Reveal App
      if (blocker) {
          // After images fade, we see the blocker. Then fade blocker.
          tl.to(blocker, { opacity: 0, duration: 0.5 }, "+=0.1");
      }
      
      // 7. EXPAND to Full Screen
      const expansionDuration = 2.0;
      
      if (box.length) {
        tl.to(box, {
          width: "100vw",
          height: "100vh",
          duration: expansionDuration,
          ease: "power2.inOut"
        }, "+=0.2");
      }

      // Animate Panels Away completely
      if (panelLeft && panelRight) {
           tl.to([panelLeft, panelRight], { width: 0, duration: expansionDuration, ease: "power2.inOut" }, "<");
      }
      if (panelTop && panelBottom) {
           tl.to([panelTop, panelBottom], { height: 0, duration: expansionDuration, ease: "power2.inOut" }, "<");
      }

      if (growingImage.length) {
        tl.to(growingImage, {
          width: "100vw",
          height: "100vh",
          duration: expansionDuration,
          ease: "power2.inOut"
        }, "<");
      }
      
      // Push text off-screen (fade out since flexbox handles position)
      if (headingStart.length) {
        tl.to(headingStart, { opacity: 0, duration: expansionDuration * 0.5, ease: "power2.inOut" }, "<");
      }
      if (headingEnd.length) {
        tl.to(headingEnd, { opacity: 0, duration: expansionDuration * 0.5, ease: "power2.inOut" }, "<");
      }
      
      // Hide other elements
      if (headerContent) {
           tl.to(headerContent, { opacity: 0, duration: 1 }, "<"); 
      }
      
      // Scale up the App
      tl.to(appContent, {
        scale: 1,
        duration: expansionDuration,
        ease: "power2.inOut"
      }, "<");

    }, container);

    // Use clearProps to reset everything GSAP touched
    return () => {
      document.body.style.overflow = "";
      ctx.revert();
      gsap.set(appContent, { clearProps: "all" });
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <section ref={containerRef} className="ishwar-header">
       {/* 4 Panels forming the white background to allow easy "hole" creation */}
       <div className="ishwar-backdrop-panel top"></div>
       <div className="ishwar-backdrop-panel bottom"></div>
       <div className="ishwar-backdrop-panel left"></div>
       <div className="ishwar-backdrop-panel right"></div>

      {/* Loader Centered Element */}
      <div className="ishwar-loader">
        <div className="ishwar__h1">
          <div className="ishwar__h1-start">
            <span className="ishwar__letter font-black">I</span>
            <span className="ishwar__letter font-black">s</span>
            <span className="ishwar__letter font-black">h</span>
          </div>
          <div className="ishwar-loader__box">
            <div className="ishwar-loader__box-inner">
              <div className="ishwar__growing-image">
                <div className="ishwar__growing-image-wrap">
                  
                  <img className="ishwar__cover-image-extra is--1" src={images[0]} alt="" />
                  <img className="ishwar__cover-image-extra is--2" src={images[1]} alt="" />
                  <img className="ishwar__cover-image-extra is--3" src={images[2]} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="ishwar__h1-end">
            <span className="ishwar__letter font-black">w</span>
            <span className="ishwar__letter font-black">a</span>
            <span className="ishwar__letter font-black">r</span>
          </div>
        </div>
      </div>

      {/* Header Content */}
      <div className="ishwar-header__content">
        <div className="ishwar-header__top">
          <nav className="ishwar-nav">
            <div>
              <a href="#" className="ishwar-nav__link font-semibold">Ishwar ©</a>
            </div>
          </nav>
        </div>
        <div className="ishwar-header__bottom">
          <div className="ishwar__h1">
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingScreen;
