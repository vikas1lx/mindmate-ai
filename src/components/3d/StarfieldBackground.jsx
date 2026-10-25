/**
 * StarfieldBackground.jsx
 * High-performance 3D starfield / particle depth background.
 * Creates floating depth particles with subtle twinkling and mouse parallax.
 */
import { useEffect, useRef } from 'react';

export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle count scaled for performance
    const count = Math.min(Math.floor((width * height) / 14000), 120);

    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1.5 + 0.2, // depth factor
      radius: Math.random() * 1.6 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      deltaAlpha: (Math.random() - 0.5) * 0.015,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: -Math.random() * 0.25 - 0.05,
      color: Math.random() > 0.4 ? '#38BDF8' : '#22D3EE',
    }));

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX - width / 2) * 0.04;
      targetMouseY = (e.clientY - height / 2) * 0.04;
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    const render = () => {
      // Smooth mouse parallax lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move stars upward with depth speed
        star.y += star.speedY * star.z;
        star.x += star.speedX * star.z;

        // Wrap around screen
        if (star.y < -10) star.y = height + 10;
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;

        // Twinkle
        star.alpha += star.deltaAlpha;
        if (star.alpha > 0.85 || star.alpha < 0.15) {
          star.deltaAlpha = -star.deltaAlpha;
        }

        // Render with parallax offset
        const renderX = star.x - mouseX * star.z;
        const renderY = star.y - mouseY * star.z;

        ctx.save();
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.radius * star.z, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(star.alpha, 0.85));
        ctx.shadowBlur = 8 * star.z;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
