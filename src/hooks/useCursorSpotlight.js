import { useEffect } from 'react';

export function useCursorSpotlight() {
  useEffect(() => {
    // Only on non-touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
}
