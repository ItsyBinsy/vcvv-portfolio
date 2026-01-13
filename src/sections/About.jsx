import { useRef, useState } from 'react';
import BentoCard from '../components/BentoCard';
import Modal from '../components/Modal';
import { aboutData } from '../utils/data';
import { MdChevronLeft, MdChevronRight, MdTimeline } from 'react-icons/md';

const About = () => {
  const scrollContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.offsetWidth; // Scroll by container width
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const navigateModal = (direction) => {
    let newIndex = selectedCardIndex;
    if (direction === 'prev' && selectedCardIndex > 0) {
      newIndex = selectedCardIndex - 1;
    } else if (direction === 'next' && selectedCardIndex < aboutData.cards.length - 1) {
      newIndex = selectedCardIndex + 1;
    }
    setSelectedCardIndex(newIndex);
    setSelectedCard(aboutData.cards[newIndex]);
  };

  if (!aboutData || !aboutData.cards || aboutData.cards.length === 0) {
    return null;
  }

  return (
    <BentoCard size="medium" hover={true}>
      {/* Title on card */}
      <div className="flex items-center gap-2 mb-2 md:mb-3">
        <MdTimeline className="text-lg md:text-xl text-yellow-500" />
        <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
          My Story
        </h3>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-8 h-8 rounded-full bg-white dark:bg-[#0A0A0A] border-2 border-gray-300 dark:border-gray-800 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-all duration-300 shadow-lg"
          aria-label="Scroll left"
        >
          <MdChevronLeft className="text-xl dark:text-white" />
        </button>

        {/* About Cards Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {aboutData.cards.map((card, index) => (
              <div key={index} className="flex-shrink-0 w-full snap-start">
                <div className="p-3 md:p-5 bg-gray-50 dark:bg-black rounded-xl border border-gray-200 dark:border-gray-900 h-full flex flex-col transition-colors duration-300">
                  {/* Period Title */}
                  <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2">
                    {card.period}
                  </h4>

                {/* Subtitle Badge */}
                <div className="mb-2 md:mb-3">
                  <span className="px-2 md:px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700">
                    {card.subtitle}
                  </span>
                </div>

                {/* Truncated Content */}
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-4 mb-2 md:mb-3 flex-grow">
                  {card.content}
                </p>

                {/* Read More Button */}
                <button
                  onClick={() => {
                    setSelectedCard(card);
                    setSelectedCardIndex(index);
                    setIsModalOpen(true);
                  }}
                  className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors duration-200 self-start"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-8 h-8 rounded-full bg-white dark:bg-[#0A0A0A] border-2 border-gray-300 dark:border-gray-800 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-all duration-300 shadow-lg"
          aria-label="Scroll right"
        >
          <MdChevronRight className="text-xl dark:text-white" />
        </button>
      </div>

      {/* Read More Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCard?.period || "My Story"}
      >
        {selectedCard && (
          <div className="space-y-4">
            {/* Subtitle Badge */}
            <div>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700">
                {selectedCard.subtitle}
              </span>
            </div>

            {/* Full Content */}
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              {selectedCard.content}
            </p>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-900">
              <button
                onClick={() => navigateModal('prev')}
                disabled={selectedCardIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  selectedCardIndex === 0
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                }`}
              >
                <MdChevronLeft className="text-lg" />
                Previous
              </button>

              {/* Progress Indicator */}
              <div className="flex gap-2">
                {aboutData.cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCardIndex(index);
                      setSelectedCard(aboutData.cards[index]);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      index === selectedCardIndex
                        ? 'w-8 h-2 bg-yellow-500'
                        : 'w-2 h-2 bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700'
                    }`}
                    aria-label={`Go to ${aboutData.cards[index].period}`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigateModal('next')}
                disabled={selectedCardIndex === aboutData.cards.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  selectedCardIndex === aboutData.cards.length - 1
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                }`}
              >
                Next
                <MdChevronRight className="text-lg" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </BentoCard>
  );
};

export default About;
