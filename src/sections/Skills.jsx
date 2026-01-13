import { useState, useEffect, useRef } from 'react';
import BentoCard from '../components/BentoCard';
import SkillCard from '../components/SkillCard';
import Modal from '../components/Modal';
import { skillsData } from '../utils/data';
import { MdCode } from 'react-icons/md';

const Skills = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const userScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Use featured skills for carousel
  const featuredSkills = skillsData.featured;

  // Continuous auto-scroll with CSS animation + JS fallback
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (isPaused || !container) return;

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

        // Use scrollTo for better mobile support
        container.scrollTo({
          left: scrollPos,
          behavior: 'instant'
        });

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
      const cards = container.querySelectorAll('[data-skill-index]');
      if (cards.length === 0) return;

      const cardWidth = cards[0].offsetWidth;
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth) % featuredSkills.length;
      setCurrentIndex(index);
    };

    // Update on scroll
    container.addEventListener('scroll', updateCurrentIndex);
    // Initial update
    updateCurrentIndex();

    return () => {
      container.removeEventListener('scroll', updateCurrentIndex);
    };
  }, [featuredSkills.length]);

  const goToSlide = (index) => {
    const container = scrollContainerRef.current;
    if (container) {
      // Temporarily pause auto-scroll
      setIsPaused(true);

      const cards = container.querySelectorAll('[data-skill-index]');
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

  return (
    <BentoCard size="medium" hover={true}>
      {/* Title on card */}
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <MdCode className="text-lg md:text-xl text-yellow-500" />
          <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">Skillset</h3>
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
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x',
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

              // Restart the animation loop
              const container = scrollContainerRef.current;
              if (container && animationFrameRef.current === null) {
                const scrollDistance = container.scrollWidth / 2;
                let startTime = null;
                const duration = scrollDistance * 10;

                const animate = (timestamp) => {
                  if (!container || !container.isConnected || userScrollingRef.current) return;

                  if (!startTime) startTime = timestamp;
                  const elapsed = timestamp - startTime;
                  const progress = (elapsed % duration) / duration;
                  const scrollPos = progress * scrollDistance;

                  container.scrollTo({
                    left: scrollPos,
                    behavior: 'instant'
                  });

                  animationFrameRef.current = requestAnimationFrame(animate);
                };
                animationFrameRef.current = requestAnimationFrame(animate);
              }
            }, 1000);
          }}
        >
          {/* First set of items */}
          {featuredSkills.map((skill, index) => (
            <div
              key={`original-${index}`}
              className="flex-shrink-0"
              data-skill-index={index}
            >
              <SkillCard
                name={skill.name}
                icon={skill.icon}
                description={skill.description}
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {featuredSkills.map((skill, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0">
              <SkillCard
                name={skill.name}
                icon={skill.icon}
                description={skill.description}
              />
            </div>
          ))}
        </div>

        {/* Dot Indicators - Outside scroll container with higher z-index */}
        <div className="relative z-10 flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4">
          {featuredSkills.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer hover:bg-yellow-400 ${
                index === currentIndex
                  ? 'w-6 md:w-8 h-1.5 md:h-2 bg-yellow-500'
                  : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-300 dark:bg-gray-800'
              }`}
              aria-label={`Go to skill ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* View All Modal with Tabs */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="My Skillset"
      >
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-3">
          {skillsData.categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === index
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid for Active Category */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skillsData.categories[activeTab].skills.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              icon={skill.icon}
              description={skill.description}
            />
          ))}
        </div>
      </Modal>
    </BentoCard>
  );
};

export default Skills;
