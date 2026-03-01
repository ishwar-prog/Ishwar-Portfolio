import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// --- Constants ---
const GAP = 10;
const CIRCLE_RADIUS = 7;
const WIDTH = 800;
const HEIGHT = 450;
const SCALE = 700;
const BIG_SIZE = CIRCLE_RADIUS * SCALE;
const OVERLAP = 0;
const DURATION = 0.4;
const DEFAULTS = { transformOrigin: "center center" };

// --- GalleryImage Sub-component ---
function GalleryImage({ url, title, open, inPlace, id, onInPlace, total }) {
  const [firstLoad, setLoaded] = useState(true);
  const clip = useRef(null);

  const getPosSmall = () => ({
    cx: WIDTH / 2 - (total * (CIRCLE_RADIUS * 2 + GAP) - GAP) / 2 + id * (CIRCLE_RADIUS * 2 + GAP),
    cy: HEIGHT - 30,
    r: CIRCLE_RADIUS,
  });

  const getPosSmallAbove = () => ({
    cx: WIDTH / 2 - (total * (CIRCLE_RADIUS * 2 + GAP) - GAP) / 2 + id * (CIRCLE_RADIUS * 2 + GAP),
    cy: HEIGHT / 2,
    r: CIRCLE_RADIUS * 2,
  });

  const getPosCenter = () => ({
    cx: WIDTH / 2,
    cy: HEIGHT / 2,
    r: CIRCLE_RADIUS * 7,
  });

  const getPosEnd = () => ({
    cx: WIDTH / 2 - BIG_SIZE + OVERLAP,
    cy: HEIGHT / 2,
    r: BIG_SIZE,
  });

  const getPosStart = () => ({
    cx: WIDTH / 2 + BIG_SIZE - OVERLAP,
    cy: HEIGHT / 2,
    r: BIG_SIZE,
  });

  useEffect(() => {
    setLoaded(false);
    if (clip.current) {
      const flipDuration = firstLoad ? 0 : DURATION;
      const upDuration = firstLoad ? 0 : 0.2;
      const bounceDuration = firstLoad ? 0.01 : 1;
      const delay = firstLoad ? 0 : flipDuration + upDuration;

      if (open) {
        gsap
          .timeline()
          .set(clip.current, { ...DEFAULTS, ...getPosSmall() })
          .to(clip.current, {
            ...DEFAULTS,
            ...getPosCenter(),
            duration: upDuration,
            ease: "power3.inOut",
          })
          .to(clip.current, {
            ...DEFAULTS,
            ...getPosEnd(),
            duration: flipDuration,
            ease: "power4.in",
            onComplete: () => onInPlace(id),
          });
      } else {
        gsap
          .timeline({ overwrite: true })
          .set(clip.current, { ...DEFAULTS, ...getPosStart() })
          .to(clip.current, {
            ...DEFAULTS,
            ...getPosCenter(),
            delay: delay,
            duration: flipDuration,
            ease: "power4.out",
          })
          .to(clip.current, {
            ...DEFAULTS,
            motionPath: {
              path: [getPosSmallAbove(), getPosSmall()],
              curviness: 1,
            },
            duration: bounceDuration,
            ease: "bounce.out",
          });
      }
    }
  }, [open]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <clipPath id={`${id}_circleClip`}>
          <circle className="clip" cx="0" cy="0" r={CIRCLE_RADIUS} ref={clip} />
        </clipPath>
        <clipPath id={`${id}_squareClip`}>
          <rect className="clip" width={WIDTH} height={HEIGHT} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}${inPlace ? "_squareClip" : "_circleClip"})`}>
        <image
          width={WIDTH}
          height={HEIGHT}
          href={url}
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none"
        />
      </g>
    </svg>
  );
}

// --- Tabs Sub-component ---
function Tabs({ images, onSelect }) {
  const getPosX = (i) =>
    WIDTH / 2 - (images.length * (CIRCLE_RADIUS * 2 + GAP) - GAP) / 2 + i * (CIRCLE_RADIUS * 2 + GAP);
  const getPosY = () => HEIGHT - 30;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      {images.map((image, i) => (
        <g key={i} className="pointer-events-auto">
          <defs>
            <clipPath id={`tab_${i}_clip`}>
              <circle cx={getPosX(i)} cy={getPosY()} r={CIRCLE_RADIUS} />
            </clipPath>
          </defs>
          <image
            x={getPosX(i) - CIRCLE_RADIUS}
            y={getPosY() - CIRCLE_RADIUS}
            width={CIRCLE_RADIUS * 2}
            height={CIRCLE_RADIUS * 2}
            href={image.url}
            clipPath={`url(#tab_${i}_clip)`}
            className="pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
          />
          <circle
            onClick={() => onSelect(i)}
            className="cursor-pointer"
            fill="rgba(255,255,255,0)"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
            cx={getPosX(i)}
            cy={getPosY()}
            r={CIRCLE_RADIUS + 2}
            style={{ transition: "stroke 0.2s ease" }}
            onMouseEnter={(e) => e.target.setAttribute("stroke", "rgba(255,255,255,1)")}
            onMouseLeave={(e) => e.target.setAttribute("stroke", "rgba(255,255,255,0.7)")}
          />
        </g>
      ))}
    </svg>
  );
}

// --- Main ImageGallery Component ---
export default function ImageGallery({ images }) {
  const [opened, setOpened] = useState(0);
  const [inPlace, setInPlace] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const autoplayTimer = useRef(null);

  const onClick = (index) => {
    if (!disabled) setOpened(index);
  };

  const onInPlace = (index) => setInPlace(index);

  const next = useCallback(() => {
    setOpened((currentOpened) => {
      let nextIndex = currentOpened + 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  }, [images.length]);

  const prev = useCallback(() => {
    setOpened((currentOpened) => {
      let prevIndex = currentOpened - 1;
      if (prevIndex < 0) prevIndex = images.length - 1;
      return prevIndex;
    });
  }, [images.length]);


  useEffect(() => setDisabled(true), [opened]);
  useEffect(() => setDisabled(false), [inPlace]);

  useEffect(() => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
    autoplayTimer.current = setInterval(next, 4500);
    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
    };
  }, [opened, next]);

  return (
    <div className="relative w-full max-w-5xl mx-auto my-10 px-4 md:px-0 z-10">
      {/* Gallery Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[15px] shadow-[0_2.8px_2.2px_rgba(0,0,0,0.02),0_6.7px_5.3px_rgba(0,0,0,0.028),0_12.5px_10px_rgba(0,0,0,0.035),0_22.3px_17.9px_rgba(0,0,0,0.042),0_41.8px_33.4px_rgba(0,0,0,0.05),0_100px_80px_rgba(0,0,0,0.07)]">
        {images.map((image, i) => (
          <div
            key={i}
            className="absolute left-0 top-0 h-full w-full"
            style={{ zIndex: inPlace === i ? i : images.length + 1 }}
          >
            <GalleryImage
              total={images.length}
              id={i}
              url={image.url}
              title={image.title}
              open={opened === i}
              inPlace={inPlace === i}
              onInPlace={onInPlace}
            />
          </div>
        ))}
        <div className="absolute left-0 top-0 z-[100] h-full w-full pointer-events-none">
          <Tabs images={images} onSelect={onClick} />
        </div>
      </div>

      {/* Previous Button */}
      <button
        className="absolute left-4 top-1/2 z-[101] flex h-10 w-10 md:h-14 md:w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white/20 bg-white/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] outline-none transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:border-white/40 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] active:scale-95 focus-visible:ring-4 focus-visible:ring-white/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        onClick={prev}
        disabled={disabled}
        aria-label="Previous Image"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-800"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        className="absolute right-4 top-1/2 z-[101] flex h-10 w-10 md:h-14 md:w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white/20 bg-white/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] outline-none transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:border-white/40 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] active:scale-95 focus-visible:ring-4 focus-visible:ring-white/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        onClick={next}
        disabled={disabled}
        aria-label="Next Image"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-800"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
