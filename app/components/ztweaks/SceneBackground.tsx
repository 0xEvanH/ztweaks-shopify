import {useEffect, useRef} from 'react';

interface Particle {
  x: number;
  y: number;
  ox: number;
  oy: number;
  size: number;
  opacity: number;
}

export default function SceneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animId: number;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let t = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; });

    const COLS = 28, ROWS = 18;
    const particles: Particle[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        particles.push({
          x: 0, y: 0,
          ox: (c / (COLS - 1)) * width,
          oy: (r / (ROWS - 1)) * height,
          size: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.3 + 0.05,
        });
      }
    }

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, width * 0.9);
      bg.addColorStop(0, 'rgba(255,255,255,0.018)');
      bg.addColorStop(0.4, 'rgba(0,0,0,0)');
      bg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const blobs = [
        {cx: width * 0.15, cy: height * 0.3, r: 320, phase: 0},
        {cx: width * 0.85, cy: height * 0.65, r: 280, phase: Math.PI},
        {cx: width * 0.5, cy: height * 0.1, r: 200, phase: Math.PI / 2},
      ];

      blobs.forEach(({cx, cy, r, phase}) => {
        const mx = (mouseX - width / 2) * 0.04;
        const my = (mouseY - height / 2) * 0.04;
        const grad = ctx.createRadialGradient(cx + mx, cy + my, 0, cx + mx, cy + my, r);
        grad.addColorStop(0, 'rgba(255,255,255,0.05)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.018)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.save();
        ctx.translate(cx + mx, cy + my);
        ctx.beginPath();
        const pts = 8;
        for (let i = 0; i <= pts; i++) {
          const angle = (i / pts) * Math.PI * 2;
          const noise = Math.sin(angle * 3 + t + phase) * 0.12 + Math.cos(angle * 2 - t * 0.7) * 0.08;
          const radius = r * (1 + noise);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      });

      particles.forEach((p) => {
        const gx = p.ox;
        const gy = p.oy;
        const dx = mouseX - gx;
        const dy = mouseY - gy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repel = Math.max(0, 1 - dist / 180) * 12;
        p.x = gx - (dx / (dist || 1)) * repel;
        p.y = gy - (dy / (dist || 1)) * repel;
        const pulse = Math.sin(t * 1.5 + p.ox * 0.02 + p.oy * 0.015) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.6 + pulse * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * (0.4 + pulse * 0.6)})`;
        ctx.fill();
      });

      const beamX = width * 0.5 + Math.sin(t * 0.3) * width * 0.3;
      const beam = ctx.createLinearGradient(beamX - 2, 0, beamX + 2, height);
      beam.addColorStop(0, 'rgba(255,255,255,0)');
      beam.addColorStop(0.5, 'rgba(255,255,255,0.022)');
      beam.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = beam;
      ctx.fillRect(beamX - 180, 0, 360, height);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{mixBlendMode: 'screen'}}
    />
  );
}