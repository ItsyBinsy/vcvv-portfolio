import * as SimpleIcons from 'react-icons/si';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const SkillCard = ({ name, icon, description }) => {
  // Dynamically get the icon component
  const IconComponent = SimpleIcons[icon];
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const cardRef = useRef(null);

  useEffect(() => {
    if (isHovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setTooltipStyle({
        position: 'fixed',
        left: `${rect.left + rect.width / 2}px`,
        top: `${rect.top - 8}px`,
        transform: 'translate(-50%, -100%)',
      });
    }
  }, [isHovered]);

  return (
    <>
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex-shrink-0 w-40 min-w-40 h-36 bg-white dark:bg-[#0A0A0A] rounded-xl border border-gray-200 dark:border-gray-900 p-4 flex flex-col items-center justify-center transition-colors duration-300"
      >
        {/* Icon */}
        {IconComponent && (
          <IconComponent
            className="text-2xl mb-2 text-gray-700 dark:text-gray-300"
          />
        )}

        {/* Skill Name */}
        <h3 className="text-center text-xs font-bold text-gray-900 dark:text-white">
          {name}
        </h3>
      </div>

      {/* Tooltip - renders with portal to body to prevent scroll issues */}
      {isHovered && createPortal(
        <div
          style={tooltipStyle}
          className="w-56 p-3 bg-gray-900 text-white text-xs rounded-lg pointer-events-none z-[10000] transition-opacity duration-300"
        >
          <div className="text-center">{description}</div>
          {/* Arrow */}
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1"
            style={{
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #1A1A1A',
            }}
          ></div>
        </div>,
        document.body
      )}
    </>
  );
};

export default SkillCard;
