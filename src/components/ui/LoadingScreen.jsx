import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LoadingScreen.css';

gsap.registerPlugin(ScrollTrigger);

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

    gsap.set(appContent, { 
      scale: 0.5, 
      transformOrigin: "center center",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 0,
      visibility: "hidden"
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
          // Refresh ScrollTrigger so animations like TextReveal recalculate
          // positions after the loading screen clears its fixed/scale transforms
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 50);
          if (onComplete) onComplete();
        }
      });

      // Letters rise up
      if (loadingLetter.length) {
        tl.from(loadingLetter, {
          yPercent: 100,
          stagger: 0.025,
          duration: 1.25
        });
      }

      if (box.length) {
        tl.fromTo(box, {
          width: "0vw",
          height: "0vh"
        }, {
          width: "40vw", 
          height: "40vh", 
          duration: 1.25
        }, "< 1.25");
      
        if (panelTop && panelBottom) {
             tl.to([panelTop, panelBottom], {
                 height: "30vh", 
                 duration: 1.25
             }, "<");
        }
        if (panelLeft && panelRight) {
             tl.to([panelLeft, panelRight], {
                 width: "30vw", 
                 duration: 1.25
             }, "<");
        }
      }

      //Image container expands inside box
      if (growingImage.length) {
        tl.fromTo(growingImage, {
          width: "0%",
        }, {
          width: "100%",
          duration: 1.25
        }, "<");
      }

      // Crossfade images (God, Virat, Krsna)
      if (coverImageExtra.length) {
        tl.to(coverImageExtra, {
            opacity: 0,
            duration: 0.15, 
            stagger: 0.8,
            ease: "none"
        }, "-=0.25");
      }
      
      // Fade Out Blocker to Reveal App
      if (blocker) {
          // After images fade, we see the blocker. Then fade blocker.
          tl.to(blocker, { opacity: 0, duration: 0.5 }, "+=0.1");
      }
      
      // EXPAND to Full Screen
      const expansionDuration = 2.0;
      
      if (box.length) {
        tl.to(box, {
          width: "100vw",
          height: "100vh",
          duration: expansionDuration,
          ease: "power2.inOut"
        }, "+=0.2");
      }

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

      tl.to(appContent, {
        scale: 1,
        visibility: "visible",
        duration: expansionDuration,
        ease: "power2.inOut"
      }, "<");

    }, container);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
      gsap.set(appContent, { clearProps: "all" });
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <section ref={containerRef} className="ishwar-header">
       <div className="ishwar-backdrop-panel top"></div>
       <div className="ishwar-backdrop-panel bottom"></div>
       <div className="ishwar-backdrop-panel left"></div>
       <div className="ishwar-backdrop-panel right"></div>

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
