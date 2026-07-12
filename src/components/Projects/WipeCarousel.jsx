import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WipeCarousel({ slides, duration = 900, autoplayDelay = 0 }) {
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState(null);
  const [direction, setDirection] = useState("next");
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef(null);
  const autoplayRef = useRef(null);
  const navigate = useNavigate();

  const goTo = useCallback(
    (targetIndex, dir) => {
      if (animating || targetIndex === current) return;
      setDirection(dir);
      setIncoming(targetIndex);
      setAnimating(true);
      timeoutRef.current = window.setTimeout(() => {
        setCurrent(targetIndex);
        setIncoming(null);
        setAnimating(false);
      }, duration);
    },
    [animating, current, duration]
  );

  const go = useCallback(
    (dir) => {
      if (animating || slides.length < 2) return;
      const nextIndex =
        dir === "next"
          ? (current + 1) % slides.length
          : (current - 1 + slides.length) % slides.length;
      goTo(nextIndex, dir);
    },
    [animating, current, goTo, slides.length]
  );

  useEffect(() => {
    if (!autoplayDelay) return;
    autoplayRef.current = window.setTimeout(() => go("next"), autoplayDelay);
    return () => autoplayRef.current && window.clearTimeout(autoplayRef.current);
  }, [autoplayDelay, go, current]);

  useEffect(() => {
    return () => timeoutRef.current && window.clearTimeout(timeoutRef.current);
  }, []);

  const active = slides[current];
  const next = incoming !== null ? slides[incoming] : null;
  const accent = (next ?? active).accent ?? "#ff4d2e";

  return (
    <div
      className="relative w-full h-full min-h-[80vh] md:min-h-screen overflow-hidden bg-[#0b0b0c] isolate font-sans rounded-[2rem]"
      style={{ "--wipe-accent": accent }}
      role="region"
      aria-label="Project carousel"
    >
      <Panel slide={active} z="z-10" onNavigate={() => navigate(active.route)} />

      {next && (
        <Panel
          key={next.id}
          slide={next}
          z="z-20"
          animationClass={direction === "next" ? "animate-wipe-in-right" : "animate-wipe-in-left"}
          edgeSide={direction === "next" ? "left-0" : "right-0"}
          style={{ animationDuration: `${duration}ms` }}
          onNavigate={() => navigate(next.route)}
        />
      )}

      {/* Controls */}
      <div className="absolute z-40 bottom-[4vw] right-[6vw] flex items-center gap-[1.1rem] text-[#f2f0eb]">
        <button
          onClick={() => go("prev")}
          disabled={animating}
          aria-label="Previous project"
          className="w-12 h-12 rounded-full border border-white/30 text-current text-lg flex items-center justify-center
                     transition-all duration-200 hover:border-[var(--wipe-accent)]
                     hover:bg-[color-mix(in_srgb,var(--wipe-accent)_14%,transparent)]
                     hover:-translate-y-0.5 disabled:opacity-35 disabled:cursor-default
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--wipe-accent)] focus-visible:outline-offset-2 cursor-pointer"
        >
          &#8592;
        </button>

        <div className="flex items-center gap-2 text-sm tracking-wider tabular-nums select-none">
          <span className="font-semibold" style={{ color: "var(--wipe-accent)" }}>
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="w-3.5 h-px bg-white/40" />
          <span className="text-white/55">{String(slides.length).padStart(2, "0")}</span>
        </div>

        <button
          onClick={() => go("next")}
          disabled={animating}
          aria-label="Next project"
          className="w-12 h-12 rounded-full border border-white/30 text-current text-lg flex items-center justify-center
                     transition-all duration-200 hover:border-[var(--wipe-accent)]
                     hover:bg-[color-mix(in_srgb,var(--wipe-accent)_14%,transparent)]
                     hover:-translate-y-0.5 disabled:opacity-35 disabled:cursor-default
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--wipe-accent)] focus-visible:outline-offset-2 cursor-pointer"
        >
          &#8594;
        </button>
      </div>

      {/* Progress dots */}
      <div className="absolute z-40 bottom-[4vw] left-[6vw] flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            aria-label={`Go to project ${i + 1}`}
            className={`h-0.5 transition-all duration-200 cursor-pointer ${
              i === current ? "w-14" : "w-9 bg-white/30"
            }`}
            style={i === current ? { width: "3.4rem", backgroundColor: "var(--wipe-accent)" } : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function Panel({ slide, z, animationClass = "", edgeSide = "left-0", style, onNavigate }) {
  return (
    <div className={`absolute inset-0 flex items-end ${z} ${animationClass}`} style={style}>
      {/* Leading accent sliver — arrives a beat ahead of the image */}
      <div
        className={`absolute top-0 bottom-0 w-1.5 z-30 ${edgeSide}`}
        style={{
          backgroundColor: "var(--wipe-accent)",
          boxShadow: "0 0 40px 4px color-mix(in srgb, var(--wipe-accent) 60%, transparent)",
        }}
      />

      <div
        onClick={onNavigate}
        className="absolute inset-0 bg-cover bg-center [filter:saturate(1.05)_contrast(1.02)] cursor-pointer group
                   after:content-[''] after:absolute after:inset-0
                   after:bg-[linear-gradient(to_top,rgba(11,11,12,0.92)_0%,rgba(11,11,12,0.35)_38%,rgba(11,11,12,0.05)_62%)]"
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div 
        onClick={onNavigate}
        className="relative z-10 flex flex-col gap-1.5 text-[#f2f0eb] px-[6vw] pb-[4.5vw] pt-[5.5vw] cursor-pointer group"
      >
        <span className="text-xs tracking-[0.18em] font-semibold uppercase" style={{ color: "var(--wipe-accent)" }}>
          {slide.index} — click to view project
        </span>
        <h2 className="font-semibold uppercase tracking-wide leading-[0.95] text-[clamp(2.4rem,6vw,5.5rem)] m-0 group-hover:text-[var(--wipe-accent)] transition-colors duration-300">
          {slide.title}
        </h2>
        <span className="text-sm tracking-wider uppercase text-white/65">{slide.category}</span>
      </div>
    </div>
  );
}
