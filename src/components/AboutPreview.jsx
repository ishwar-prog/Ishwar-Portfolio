import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import TextReveal from "./ui/TextReveal";
import ishwar from "../assets/ishwar.png";
import "./ui/ChromaEffect.css";

export default function AboutPreview() {
  const revealText = `Ishwar Suthar -- Full-stack developer and an UI/UX enthusiast from Mumbai, Sophomore in Computer Engineering at KCCEMSR. I build fast, expressive web apps, diving into agentic AI and automation, and fuse clean UI with visual storytelling. Learning by building and breaking. For more Contact Me.`;
  
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: 0.45,
      ease: 'power3.out',
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: 0.6,
      overwrite: true
    });
  };

  const handleCardMove = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="py-20 px-0 md:px-0 bg-[#1f1f1f]" id="about">
      <div className="max-w-[92rem] mx-auto">
        {/* Text Reveal Section */}
        <TextReveal text={revealText} className="mb-20" />

        {/* Three Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-28 items-start">
          {/* Column 1: Image */}
          <div className="w-[460px] h-[500px] bg-[#f6f4f0] rounded-[30px] overflow-hidden">
            <div
              ref={rootRef}
              className="chroma-grid"
              style={{
                '--r': '300px', // radius
                // Default vars to prevent flash of unstyled content
                '--x': '50%',
                '--y': '50%'
              }}
              onPointerMove={handleMove}
              onPointerLeave={handleLeave}
            >
              <article
                className="chroma-card"
                onMouseMove={handleCardMove}
              >
                <div className="chroma-img-wrapper">
                  <img src={ishwar} alt="Ishwar" loading="lazy" />
                </div>
              </article>
              <div className="chroma-overlay" />
              <div ref={fadeRef} className="chroma-fade" />
            </div>
          </div>

          {/* Column 2: Why Work With Me */}
          <div className="flex flex-col gap-1 mt-18">
            <p className="text-1xl text-white/40 font-bold">why work with me</p>
            <p className="text-2xl text-[#f6f4f0] leading-tight font-bold tracking-tight">
              I build under pressure and ship on time. hackathons taught me
              speed, focus, and ruthless prioritization-projects taught me how
              real systems break and how to fix them. I'm full-stack by default,
              ui-obsessed by habit, and deep into agentic ai by curiosity. I
              move fast, learn faster, and communicate clearly-through code,
              clean interfaces, and visuals. if you want someone who treats
              every idea like a live product and every deadline like it's real,
              I'm a strong bet.
            </p>
          </div>

          {/* Column 3: When I'm Not Building */}
          <div className="flex flex-col gap-1 mt-18">
            <p className="text-balance text-white/40 font-bold">
              when I'm not building
            </p>
            <p className="text-2xl text-[#f6f4f0] leading-tight font-bold tracking-tight">
              you'll find me exploring music - more into rap, making short
              videos, managing events, watching anime, playing sports physically
              and virtually. hanging out with friends and building something
              other than projects, more to come.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
