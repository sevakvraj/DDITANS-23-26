import React, { useEffect, useRef } from 'react';

const SubtleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const blobs = [
      { x: 0, y: 0, r: 0, tx: 0, ty: 0, c: 'rgba(255, 215, 0, 0.02)', spd: 0.0008 },
      { x: 0, y: 0, r: 0, tx: 0, ty: 0, c: 'rgba(70, 70, 100, 0.015)', spd: 0.0006 },
      { x: 0, y: 0, r: 0, tx: 0, ty: 0, c: 'rgba(70, 50, 70, 0.01)', spd: 0.0004 }
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      blobs.forEach(b => {
        b.x = Math.random() * canvas.width;
        b.y = Math.random() * canvas.height;
        b.r = Math.min(canvas.width, canvas.height) * 0.8;
        b.tx = Math.random() * canvas.width;
        b.ty = Math.random() * canvas.height;
      });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach(b => {
        // Smoothly move towards target
        b.x += (b.tx - b.x) * b.spd;
        b.y += (b.ty - b.y) * b.spd;

        // Pick new target if reached
        if (Math.abs(b.x - b.tx) < 10) b.tx = Math.random() * canvas.width;
        if (Math.abs(b.y - b.ty) < 10) b.ty = Math.random() * canvas.height;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.c);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
};

export default SubtleBackground;
