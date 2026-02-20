import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TimelineCard = React.forwardRef(({ experience, isLeft }, ref) => {
  const cardContentRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardContentRef.current, {
      rotate: 0,
      scale: 1.05,
      filter: "grayscale(0%)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardContentRef.current, {
      rotate: (Math.random() * 4 - 2), // Slight tilt again
      scale: 1,
      filter: "grayscale(20%)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={ref} 
      className={`relative w-full md:w-[45%] group perspective-1000 ${isLeft ? 'pr-8' : 'pl-8'}`}
    >
      {/* Connection Line to Center */}
      <div className={`absolute top-1/2 h-[2px] bg-red-600 w-8 
        ${isLeft ? 'right-0 origin-right' : 'left-0 origin-left'} 
        shadow-[0_0_5px_rgba(220,38,38,0.5)]`} 
        style={{ transform: `rotate(${isLeft ? '5deg' : '-5deg'})` }} // Slight tilt to string for realism
      />
      
      {/* Pin on the timeline */}
      <div className={`absolute top-1/2 w-4 h-4 bg-red-700 rounded-full border-2 border-[#1f1f1f] shadow-[0_0_10px_rgba(220,38,38,0.8)] z-20
        ${isLeft ? '-right-10 translate-x-1/2' : '-left-10 -translate-x-1/2'}`} 
      />

      <div 
        ref={cardContentRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-[#2a2a2a] p-6 rounded shadow-xl border border-white/10 relative overflow-hidden transition-all duration-300 transform-gpu grayscale-[20%]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Paper texture overlay (optional) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-overlay"></div>

        {/* Pin on the card */}
        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-20">
             <div className="w-4 h-4 rounded-full bg-red-600 shadow-md"></div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-red-500 font-mono tracking-wider">{experience.role}</h3>
            <span className="text-xs font-mono text-white/40 border border-white/20 px-2 py-1 rounded">{experience.date}</span>
          </div>
          
          <h4 className="text-lg font-bold text-white/80 mb-4">{experience.org}</h4>
          
          {/* Image Section */}
          <div className="w-full h-40 bg-black/40 mb-4 rounded border border-white/5 flex items-center justify-center overflow-hidden group-hover:h-56 transition-all duration-500 ease-in-out">
             {experience.img ? (
               <img src={experience.img} alt={experience.role} className="w-full h-full object-cover" />
             ) : (
               <div className="flex flex-col items-center justify-center text-white/20">
                 <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                 <span className="text-sm font-mono">Evidence Pending</span>
               </div>
             )}
          </div>

          <p className="text-sm text-white/60 leading-relaxed font-mono">
            {experience.desc}
          </p>
          
          {/* Hidden details revealed on hover */}
          <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 ease-in-out mt-2">
             <p className="text-xs text-red-400 mt-2 font-mono border-t border-red-900/30 pt-2">
               > Classified Info: Role details verified. Security clearance granted.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
});

const ExperienceTimeline = ({ experiences }) => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the central line
      gsap.fromTo(
        lineRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      );

      // Animate cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const direction = index % 2 === 0 ? -1 : 1; // Left or Right
        
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            x: direction * 50, 
            rotate: direction * 10 
          },
          {
            opacity: 1,
            x: 0,
            rotate: (Math.random() * 6 - 3), // Random slight tilt on final position
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [experiences]);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-20 px-4">
      {/* Central Line (The String) */}
      <div 
        ref={lineRef} 
        className="absolute left-1/2 top-0 w-[2px] bg-red-600/80 -translate-x-1/2 z-0 shadow-[0_0_10px_rgba(220,38,38,0.5)] block"
      />

      <div className="flex flex-col gap-32 relative z-10 text-[#f6f4f0]">
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div 
              key={index} 
              className={`flex items-center w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
            >
              <TimelineCard 
                experience={exp} 
                isLeft={isLeft} 
                ref={el => cardsRef.current[index] = el}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default ExperienceTimeline;
