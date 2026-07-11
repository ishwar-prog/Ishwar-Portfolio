import React, { useRef, useEffect } from "react";

export default function SnowParticles({
  particleCount = 120,
  speed = 1,
  wind = 0.4,
  minSize = 2,
  maxSize = 6,
  minOpacity = 0.4,
  maxOpacity = 0.8,
  color = "#ffffff",
  background = "transparent",
  shape = "Circle"
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const { offsetWidth, offsetHeight } = canvas;
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: particleCount }).map(() =>
      createParticle(canvas)
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      particlesRef.current.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y > canvas.height || p.x < -20 || p.x > canvas.width + 20) {
          Object.assign(p, createParticle(canvas, true));
        }
        drawParticle(ctx, p);
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [
    particleCount,
    speed,
    wind,
    minSize,
    maxSize,
    minOpacity,
    maxOpacity,
    color,
    background,
    shape
  ]);

  function createParticle(canvas, reset = false) {
    return {
      x: Math.random() * canvas.width,
      y: reset ? -10 : Math.random() * canvas.height,
      size: random(minSize, maxSize),
      speedY: random(speed * 0.6, speed * 1.4),
      speedX: random(-wind, wind),
      opacity: random(minOpacity, maxOpacity),
      rotation: Math.random() * Math.PI
    };
  }

  function drawParticle(ctx, p) {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = color;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    switch (shape) {
      case "Square":
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        break;
      case "Star":
        drawStar(ctx, p.size);
        break;
      case "Snowflake":
        drawSnowflake(ctx, p.size);
        break;
      default:
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999
      }}
    />
  );
}

/* ---------------- Helpers ---------------- */
function random(min, max) {
  return Math.random() * (max - min) + min;
}

function drawStar(ctx, size) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(
      (Math.cos(((18 + i * 72) * Math.PI) / 180) * size) / 2,
      (-Math.sin(((18 + i * 72) * Math.PI) / 180) * size) / 2
    );
    ctx.lineTo(
      (Math.cos(((54 + i * 72) * Math.PI) / 180) * size * 0.5) / 2,
      (-Math.sin(((54 + i * 72) * Math.PI) / 180) * size * 0.5) / 2
    );
  }
  ctx.closePath();
  ctx.fill();
}

function drawSnowflake(ctx, size) {
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    ctx.rotate(Math.PI / 3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();
  }
}
