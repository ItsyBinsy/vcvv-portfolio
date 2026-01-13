import { useState, useEffect, useRef } from 'react';
import BentoCard from '../components/BentoCard';
import CertCard from '../components/CertCard';
import Modal from '../components/Modal';
import { certificationsData } from '../utils/data';
import { MdVerified } from 'react-icons/md';

const Certifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const userScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Continuous auto-scroll with requestAnimationFrame
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (isPaused || !container) return;
    
    // Small delay to ensure DOM is fully rendered
    const startDelay = setTimeout(() => {
      if (container.scrollWidth === 0) {
        return;
      }

      const animate = () => {
        if (!container || !container.isConnected || userScrollingRef.current) return;

        // Smooth continuous scroll - relaxed viewing speed
        container.scrollLeft += 0.5; // Slower, more comfortable speed

        // Get the halfway point (where original items end and duplicates start)
        const maxScroll = container.scrollWidth / 2;
        
        // Reset when reaching halfway point (seamless loop)
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
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
  }, [isPaused]);

  // Track current index based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateCurrentIndex = () => {
      const cards = container.querySelectorAll('[data-cert-index]');
      if (cards.length === 0) return;

      const cardWidth = cards[0].offsetWidth;
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth) % certificationsData.length;
      setCurrentIndex(index);
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
      setIsPaused(true);
      
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
          setIsPaused(false);
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
            setIsPaused(true);
          }
        }}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Infinite Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-3 pb-2 overflow-x-scroll scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onTouchStart={() => {
            userScrollingRef.current = true;
          }}
          onTouchEnd={() => {
            // Resume auto-scroll after user stops touching
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = setTimeout(() => {
              userScrollingRef.current = false;
            }, 1000);
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
                  : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-300'
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
