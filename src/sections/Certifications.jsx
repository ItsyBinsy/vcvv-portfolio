import { useState, useEffect, useRef } from 'react';
import BentoCard from '../components/BentoCard';
import CertCard from '../components/CertCard';
import Modal from '../components/Modal';
import { certificationsData } from '../utils/data';
import { MdVerified } from 'react-icons/md';

const Certifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const userScrollingRef = useRef(false);

  // Continuous auto-scroll with scrollTo API
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Small delay to ensure DOM is fully rendered
    const startDelay = setTimeout(() => {
      if (container.scrollWidth === 0) {
        return;
      }

      const scrollDistance = container.scrollWidth / 2;
      let startTime = null;
      const duration = scrollDistance * 10; // 10ms per pixel = slow scroll

      const animate = (timestamp) => {
        if (!container || !container.isConnected || userScrollingRef.current) return;

        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        const scrollPos = progress * scrollDistance;

        // Check if we're close to the reset point
        const currentScroll = container.scrollLeft;

        // Only reset if we've scrolled past halfway with smaller threshold
        if (currentScroll >= scrollDistance - 5) {
          // Reset without animation
          container.scrollLeft = 0;
          startTime = timestamp; // Reset timer too
        } else {
          // Use scrollTo for better mobile support
          container.scrollTo({
            left: scrollPos,
            behavior: 'instant'
          });
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(startDelay);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Track current index based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let lastIndex = -1;
    const updateCurrentIndex = () => {
      const cards = container.querySelectorAll('[data-cert-index]');
      if (cards.length === 0) return;

      const cardWidth = cards[0].offsetWidth;
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth) % certificationsData.length;

      // Only update state if index actually changed
      if (index !== lastIndex) {
        lastIndex = index;
        setCurrentIndex(index);
      }
    };

    // Update on scroll
    container.addEventListener('scroll', updateCurrentIndex);
    // Initial update
    updateCurrentIndex();

    return () => {
      container.removeEventListener('scroll', updateCurrentIndex);
    };
  }, [certificationsData.length]);

  const goToSlide = (index) => {
    const container = scrollContainerRef.current;
    if (container) {
      // Temporarily pause auto-scroll
      userScrollingRef.current = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      const cards = container.querySelectorAll('[data-cert-index]');
      const targetCard = cards[index];

      if (targetCard) {
        const containerRect = container.getBoundingClientRect();
        const cardRect = targetCard.getBoundingClientRect();
        const scrollLeft = container.scrollLeft;
        const targetScrollPosition = scrollLeft + (cardRect.left - containerRect.left);

        container.scrollTo({
          left: targetScrollPosition,
          behavior: 'smooth'
        });

        // Resume auto-scroll after 2 seconds
        setTimeout(() => {
          userScrollingRef.current = false;

          // Restart animation from new position
          const scrollDistance = container.scrollWidth / 2;
          const currentScroll = container.scrollLeft;
          const duration = scrollDistance * 10;
          const initialProgress = (currentScroll % scrollDistance) / scrollDistance;
          const initialElapsed = initialProgress * duration;
          let startTime = null;

          const animate = (timestamp) => {
            if (!container || !container.isConnected || userScrollingRef.current) return;

            if (!startTime) startTime = timestamp - initialElapsed;
            const elapsed = timestamp - startTime;
            const progress = (elapsed % duration) / duration;
            const scrollPos = progress * scrollDistance;
            const currentScroll = container.scrollLeft;

            if (currentScroll >= scrollDistance - 5) {
              container.scrollLeft = 0;
              startTime = timestamp;
            } else {
              container.scrollTo({
                left: scrollPos,
                behavior: 'instant'
              });
            }

            animationFrameRef.current = requestAnimationFrame(animate);
          };
          animationFrameRef.current = requestAnimationFrame(animate);
        }, 2000);
      }
    }
  };

  if (!certificationsData || certificationsData.length === 0) {
    return null;
  }

  return (
    <BentoCard size="medium" hover={true}>
      {/* Title on card */}
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <MdVerified className="text-lg md:text-xl text-yellow-500" />
          <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
            Certifications & Achievements
          </h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors duration-200"
        >
          View All
        </button>
      </div>

      {/* Carousel Container */}
      <div
        className="relative"
        onMouseEnter={() => {
          // Only pause on desktop (hover), not on mobile touch
          if (window.matchMedia('(hover: hover)').matches) {
            userScrollingRef.current = true;
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
              animationFrameRef.current = null;
            }
          }
        }}
        onMouseLeave={() => {
          if (window.matchMedia('(hover: hover)').matches) {
            userScrollingRef.current = false;

            // Restart animation from current position immediately
            const container = scrollContainerRef.current;
            if (container) {
              const scrollDistance = container.scrollWidth / 2;
              const currentScroll = container.scrollLeft;
              const duration = scrollDistance * 10;

              // Calculate how far we are in the animation cycle
              const initialProgress = (currentScroll % scrollDistance) / scrollDistance;
              const initialElapsed = initialProgress * duration;

              let startTime = null;

              const animate = (timestamp) => {
                if (!container || !container.isConnected || userScrollingRef.current) return;

                if (!startTime) startTime = timestamp - initialElapsed;
                const elapsed = timestamp - startTime;
                const progress = (elapsed % duration) / duration;
                const scrollPos = progress * scrollDistance;

                const currentScroll = container.scrollLeft;

                if (currentScroll >= scrollDistance - 5) {
                  container.scrollLeft = 0;
                  startTime = timestamp;
                } else {
                  container.scrollTo({
                    left: scrollPos,
                    behavior: 'instant'
                  });
                }

                animationFrameRef.current = requestAnimationFrame(animate);
              };
              animationFrameRef.current = requestAnimationFrame(animate);
            }
          }
        }}
      >
        {/* Infinite Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-3 pb-2 overflow-x-scroll scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x',
            willChange: 'scroll-position',
            transform: 'translateZ(0)',
          }}
          onTouchStart={() => {
            userScrollingRef.current = true;
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
              animationFrameRef.current = null;
            }
          }}
          onTouchEnd={() => {
            userScrollingRef.current = false;

            // Restart animation from current position immediately
            const container = scrollContainerRef.current;
            if (container) {
              const scrollDistance = container.scrollWidth / 2;
              const currentScroll = container.scrollLeft;
              const duration = scrollDistance * 10;

              // Calculate how far we are in the animation cycle
              const initialProgress = (currentScroll % scrollDistance) / scrollDistance;
              const initialElapsed = initialProgress * duration;

              let startTime = null;

              const animate = (timestamp) => {
                if (!container || !container.isConnected || userScrollingRef.current) return;

                if (!startTime) startTime = timestamp - initialElapsed;
                const elapsed = timestamp - startTime;
                const progress = (elapsed % duration) / duration;
                const scrollPos = progress * scrollDistance;

                const currentScroll = container.scrollLeft;

                if (currentScroll >= scrollDistance - 5) {
                  container.scrollLeft = 0;
                  startTime = timestamp;
                } else {
                  container.scrollTo({
                    left: scrollPos,
                    behavior: 'instant'
                  });
                }

                animationFrameRef.current = requestAnimationFrame(animate);
              };
              animationFrameRef.current = requestAnimationFrame(animate);
            }
          }}
        >
          {/* First set of items */}
          {certificationsData.map((cert, index) => (
            <div 
              key={`original-${index}`} 
              className="flex-shrink-0"
              data-cert-index={index}
            >
              <CertCard
                name={cert.name}
                issuer={cert.issuer}
                date={cert.date}
                badge={cert.badge}
                link={cert.link}
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {certificationsData.map((cert, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0">
              <CertCard
                name={cert.name}
                issuer={cert.issuer}
                date={cert.date}
                badge={cert.badge}
                link={cert.link}
              />
            </div>
          ))}
        </div>

        {/* Dot Indicators - Outside scroll container with higher z-index */}
        <div className="relative z-10 flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4">
          {certificationsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer hover:bg-yellow-400 ${
                index === currentIndex
                  ? 'w-6 md:w-8 h-1.5 md:h-2 bg-yellow-500'
                  : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-300 dark:bg-gray-800'
              }`}
              aria-label={`Go to certification ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* View All Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="All Certifications & Achievements"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certificationsData.map((cert, index) => (
            <CertCard
              key={index}
              name={cert.name}
              issuer={cert.issuer}
              date={cert.date}
              badge={cert.badge}
              link={cert.link}
            />
          ))}
        </div>
      </Modal>
    </BentoCard>
  );
};

export default Certifications;
