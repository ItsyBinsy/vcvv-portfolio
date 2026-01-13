import { useState } from 'react';
import BentoCard from '../components/BentoCard';
import TypingAnimation from '../components/TypingAnimation';
import { heroData } from '../utils/data';
import { useDarkMode } from '../context/DarkModeContext';

const Hero = () => {
  const { isDarkMode } = useDarkMode();

  // Different titles to rotate through
  const titles = [
    "Full-Stack Developer",
    "Student Developer",
    "Social Media Manager"
  ];

  // State for mobile tap to straighten
  const [isTapped, setIsTapped] = useState(false);

  const handleMobileTap = () => {
    setIsTapped(!isTapped);
  };

  return (
    <BentoCard size="large">
      <div className="relative">
        {/* Floating Profile Card - Top Right, smaller on mobile */}
        <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 md:top-0 md:right-0 z-10">
          <div
            onClick={handleMobileTap}
            className={`w-20 h-24 md:w-28 md:h-32 rounded-2xl overflow-hidden shadow-xl border-2 border-white dark:border-gray-700 transform transition-all duration-500 md:hover:scale-105 cursor-pointer md:cursor-default ${
              isTapped ? 'rotate-0 scale-105' : 'rotate-3'
            } md:rotate-3 md:hover:rotate-0`}
            style={{
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
            }}
          >
            <img
              src={isDarkMode ? heroData.image.dark : heroData.image.light}
              alt={heroData.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Content Grid - Tighter spacing on mobile */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-6 pt-6 md:pt-0 pr-24 md:pr-32">
          {/* Left: Tagline + Name */}
          <div className="text-left">
            <p className="text-xs md:text-base text-gray-600 dark:text-gray-400 mb-1 md:mb-2">{heroData.tagline}</p>
            <h1 className="text-2xl md:text-4xl font-bold mb-1 text-gray-900 dark:text-white leading-tight">
              {heroData.name}
            </h1>
          </div>

          {/* Right: Title + Details + CV Link */}
          <div className="text-left md:text-right space-y-1 md:space-y-2">
            <div className="flex items-center justify-start md:justify-end">
              <h2 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white">
                <TypingAnimation
                  texts={titles}
                  typingSpeed={80}
                  deletingSpeed={50}
                  delayBetweenTexts={2000}
                />
              </h2>
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{heroData.education}</p>
            <p className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">{heroData.university}</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 italic">{heroData.expertise}</p>

            {/* Subtle CV Link */}
            <a
              href="/CV_VinceCarl_Viana.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 md:mt-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors duration-200 underline decoration-gray-300 dark:decoration-gray-600 hover:decoration-yellow-600 dark:hover:decoration-yellow-400 underline-offset-2"
            >
              View CV →
            </a>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

export default Hero;
