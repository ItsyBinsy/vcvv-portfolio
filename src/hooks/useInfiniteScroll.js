import { useRef } from 'react';

export function useInfiniteScroll({ speed = 10 } = {}) {
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const userScrollingRef = useRef(false);

  const startAnimation = (container, fromScroll = null) => {
    if (!container) return;

    const scrollDistance = container.scrollWidth / 2;
    const duration = scrollDistance * speed;
    const startPos = fromScroll !== null ? fromScroll : container.scrollLeft;
    const initialProgress = (startPos % scrollDistance) / scrollDistance;
    const initialElapsed = initialProgress * duration;
    let startTime = null;

    const animate = (timestamp) => {
      if (!container || !container.isConnected || userScrollingRef.current) return;

      if (!startTime) startTime = timestamp - initialElapsed;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      const scrollPos = progress * scrollDistance;

      if (container.scrollLeft >= scrollDistance - 1) {
        container.scrollLeft = 0;
        startTime = timestamp;
      } else {
        container.scrollTo({ left: scrollPos, behavior: 'instant' });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const pause = () => {
    userScrollingRef.current = true;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const resume = (delay = 0) => {
    if (delay > 0) {
      setTimeout(() => {
        userScrollingRef.current = false;
        startAnimation(scrollContainerRef.current, scrollContainerRef.current?.scrollLeft);
      }, delay);
    } else {
      userScrollingRef.current = false;
      startAnimation(scrollContainerRef.current, scrollContainerRef.current?.scrollLeft);
    }
  };

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) pause();
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) resume();
  };

  const handleTouchStart = () => pause();

  const handleTouchEnd = () => resume(0);

  return {
    scrollContainerRef,
    animationFrameRef,
    userScrollingRef,
    startAnimation,
    pause,
    resume,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
  };
}
