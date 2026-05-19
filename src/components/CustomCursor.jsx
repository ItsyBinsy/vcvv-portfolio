import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    setIsPointerFine(isDesktop);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId = null;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onEnter = () => ring.classList.add('cursor-hover');
    const onLeave = () => ring.classList.remove('cursor-hover');

    document.addEventListener('mousemove', onMove, { passive: true });

    const interactives = () => document.querySelectorAll('a, button, [role="button"]');
    const attachHover = () => {
      interactives().forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attachHover();

    // Hide native cursor
    document.documentElement.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = '';
      interactives().forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-yellow-400 pointer-events-none mix-blend-difference"
        style={{ willChange: 'transform', opacity: 0 }}
      />
      {/* Ring — lags behind (lerp) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-yellow-400/60 pointer-events-none transition-[width,height,opacity] duration-200"
        style={{ willChange: 'transform', opacity: 0 }}
      />
    </>
  );
};

export default CustomCursor;
