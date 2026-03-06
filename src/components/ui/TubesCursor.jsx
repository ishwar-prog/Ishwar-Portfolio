import { useEffect, useRef } from "react";
import TubesCursorInit from "threejs-components/build/cursors/tubes1.min.js";

export default function TubesCursor() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let app = null;
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    return () => {
      if (app && typeof app.dispose === "function") {
        app.dispose();
      }
    };
  }, []);

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
