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

      // Rotation animation for the container
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
      const totalWords = wordElements.length;

      // Animate each word individually with staggered scroll positions
      wordElements.forEach((word, i) => {
        const staggerOffset = (i / totalWords) * 0.3; // Spread animation across 30% of scroll
        const wordStart = `top bottom-=${20 + staggerOffset * 100}%`;
        const wordEnd = `top center+=${staggerOffset * 100}%`;

        // Get the animated text span (second child)
        const textSpan = word.querySelector('.animated-text');

        // Color animation from white/40 to #f6f4f0
        if (textSpan) {
          gsap.fromTo(
            textSpan,
            { color: 'rgba(255, 255, 255, 0.4)' },
            {
              ease: 'none',
              color: '#f6f4f0',
              scrollTrigger: {
                trigger: el,
                ...scrollerConfig,
                start: wordStart,
                end: wordEnd,
                scrub: true
              }
            }
          );
        }

        if (enableBlur) {
          gsap.fromTo(
            word,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: 'none',
              filter: 'blur(0px)',
              scrollTrigger: {
                trigger: el,
                ...scrollerConfig,
                start: wordStart,
                end: wordEnd,
                scrub: true
              }
            }
          );
        }
      });
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, rotationEnd, wordAnimationEnd, blurStrength, words]);

  return (
    <div ref={containerRef} className={className}>
      <p className="flex flex-wrap text-lg md:text-7xl font-extrabold leading-20">
        {words.map((word, index) => (
          <span className="inline-block word mr-3 mt-2" key={index}>
            <span className="animated-text" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
              {word}
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}
