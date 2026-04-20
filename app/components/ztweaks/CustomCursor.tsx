import {useEffect, useState} from 'react';
import {motion, useMotionValue, useSpring} from 'motion/react';

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const tx = useMotionValue(-100);
  const ty = useMotionValue(-100);
  const trailX = useSpring(tx, {stiffness: 120, damping: 20});
  const trailY = useSpring(ty, {stiffness: 120, damping: 20});

  useEffect(() => {
    const move = (e: MouseEvent) => { tx.set(e.clientX - 20); ty.set(e.clientY - 20); };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const check = (e: MouseEvent) =>
      setHovering(!!(e.target as Element).closest('a, button, [data-hover]'));
    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', check);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', check);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [tx, ty]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-9998 pointer-events-none rounded-full"
      style={{x: trailX, y: trailY, width: 40, height: 40}}
      animate={{scale: clicking ? 0.7 : hovering ? 1.6 : 1, opacity: hovering ? 0.7 : 0.35}}
      transition={{type: 'spring', stiffness: 200, damping: 20}}
    >
      <div className="absolute inset-0 rounded-full border border-white/40" />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: hovering
            ? '0 0 16px 4px rgba(255,255,255,0.18),0 0 40px 8px rgba(255,255,255,0.07)'
            : '0 0 10px 2px rgba(255,255,255,0.08)',
          transition: 'box-shadow 0.3s ease',
        }}
      />
    </motion.div>
  );
}