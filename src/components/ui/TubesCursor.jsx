import { useEffect, useRef } from "react";
import TubesCursorInit from "threejs-components/build/cursors/tubes1.min.js";

export default function TubesCursor() {
  const isMobile = window.matchMedia("(pointer: coarse)").matches;
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let app = null;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      if (app && typeof app.dispose === "function") app.dispose();
      app = null;
      setCanvasSize();
      try {
        app = TubesCursorInit(canvas, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        });
      } catch (err) {
        console.warn("TubesCursor failed to initialise:", err);
      }
    };

    init();

    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
      if (app && typeof app.dispose === "function") app.dispose();
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "screen",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
