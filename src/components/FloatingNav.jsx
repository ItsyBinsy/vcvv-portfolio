import { useState } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { RiFacebookLine, RiLinkedinLine } from 'react-icons/ri';
import { SiGmail } from 'react-icons/si';
import { useDarkMode } from '../context/DarkModeContext';

const FloatingNav = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navItems = [
    { id: 'email', icon: SiGmail, link: 'https://mail.google.com/mail/?view=cm&to=vincecvviana@gmail.com' },
    { id: 'facebook', icon: RiFacebookLine, link: 'https://www.facebook.com/vincecvv' },
    { id: 'linkedin', icon: RiLinkedinLine, link: 'https://www.linkedin.com/in/vincecvv/' }
  ];

  // SLIME PHYSICS! Stretchy, playful, satisfying blob morphing
  const getBlobStyle = () => {
    if (activeIcon === null) {
      // Resting slime state - slightly wobbly circle
      return {
        borderRadius: '52% 48% 51% 49% / 48% 52% 48% 52%',
        transform: 'scale(1)',
      };
    }

    const totalIcons = navItems.length + 1;
    const position = activeIcon / totalIcons; // 0 to 1

    // SLIME STRETCHING - very exaggerated, playful deformation!
    let borderRadius;
    let transform = 'scale(1)';

    if (position <= 0.25) {
      // Far left - EXTREME stretch left, right side gets SQUISHED
      borderRadius = '75% 25% 25% 75% / 60% 40% 60% 40%';
      transform = 'scale(1.08) translateX(-3px) rotate(-1deg)';
    } else if (position <= 0.5) {
      // Center-left - asymmetric bulge with slime wobble
      borderRadius = '58% 42% 45% 55% / 55% 45% 52% 48%';
      transform = 'scale(1.06) translateY(-1px)';
    } else if (position <= 0.75) {
      // Center-right - opposite wobble
      borderRadius = '42% 58% 55% 45% / 45% 55% 48% 52%';
      transform = 'scale(1.06) translateY(-1px)';
    } else {
      // Far right - EXTREME stretch right, left side gets SQUISHED
      borderRadius = '25% 75% 75% 25% / 40% 60% 40% 60%';
      transform = 'scale(1.08) translateX(3px) rotate(1deg)';
    }

    return { borderRadius, transform };
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      {/* Minimalistic Container with Liquid Morphing */}
      <div
        className="relative bg-white/90 dark:bg-[#0A0A0A]/95 backdrop-blur-md p-2 border-2 border-gray-300 dark:border-gray-700 transition-all duration-700 ease-out"
        style={{
          ...getBlobStyle(),
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Navigation Items */}
        <div className="relative flex items-center gap-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const distance = activeIcon !== null ? Math.abs(activeIcon - index) : 3;
            const isFar = distance > 1;

            return (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveIcon(index)}
                onMouseLeave={() => setActiveIcon(null)}
                className="relative w-11 h-11 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-all duration-500"
                style={{
                  transform: activeIcon === index
                    ? 'translateY(-3px) scale(1.15)'
                    : isFar
                    ? `scale(0.9) translateY(${distance * 1.5}px)`
                    : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <Icon className="text-lg transition-all duration-300" />
              </a>
            );
          })}

          {/* Divider */}
          <div
            className="w-px h-6 bg-gray-300 dark:bg-gray-800 mx-1 transition-all duration-500"
            style={{
              opacity: activeIcon !== null ? 0.2 : 0.5,
              transform: activeIcon !== null ? 'scaleY(0.7)' : 'scaleY(1)',
            }}
          />

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            onMouseEnter={() => setActiveIcon(navItems.length)}
            onMouseLeave={() => setActiveIcon(null)}
            className="relative w-11 h-11 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-all duration-500"
            style={{
              transform: activeIcon === navItems.length
                ? 'translateY(-3px) scale(1.15) rotate(15deg)'
                : 'scale(1) rotate(0deg)',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="relative w-5 h-5">
              <MdLightMode
                className={`absolute inset-0 text-lg transition-all duration-500 ${
                  isDarkMode ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                }`}
              />
              <MdDarkMode
                className={`absolute inset-0 text-lg transition-all duration-500 ${
                  isDarkMode ? 'rotate-0 scale-100 opacity-100' : 'rotate-180 scale-0 opacity-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingNav;
