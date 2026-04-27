import { useRef, useMemo, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({
  text,
  className = "",
  scrollContainerRef,
  enableBlur = true,
  baseRotation = 3,
  blurStrength = 4,
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) {
  const containerRef = useRef(null);

  const words = useMemo(() => {
    const textContent = typeof text === 'string' ? text : '';
    return textContent.split(' ').filter(word => word.length > 0);
  }, [text]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const scrollerConfig = scrollContainerRef?.current 
        ? { scroller: scrollContainerRef.current } 
        : {};

      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            ...scrollerConfig,
            start: 'top bottom', 
            end: rotationEnd,
            scrub: true
          }
        }
      );

      const wordElements = el.querySelectorAll('.word');
      const textSpans = el.querySelectorAll('.animated-text');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          ...scrollerConfig,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true
        }
      });

      if (textSpans.length > 0) {
        tl.fromTo(
          textSpans,
          { color: 'rgba(255, 255, 255, 0.4)' },
          { color: '#f6f4f0', stagger: 0.1, ease: 'none' },
          0
        );
      }

      if (enableBlur && wordElements.length > 0) {
        tl.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          { filter: 'blur(0px)', stagger: 0.1, ease: 'none' },
          0
        );
      }
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, rotationEnd, wordAnimationEnd, blurStrength, words]);

  return (
    <div ref={containerRef} className={className}>
      <p className="flex flex-wrap text-lg sm:text-2xl md:text-5xl lg:text-7xl font-extrabold leading-snug sm:leading-normal md:leading-16 lg:leading-20">
        {words.map((word, index) => (
          <span className="inline-block word mr-1.5 sm:mr-2 md:mr-3 mt-1 sm:mt-1.5 md:mt-2" key={index}>
            <span className="animated-text" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
              {word}
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}
