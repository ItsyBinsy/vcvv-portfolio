import { useScrollReveal } from '../hooks/useScrollReveal';

const BentoCard = ({
  children,
  className = '',
  style = {},
  size = 'medium',
  hover = true,
  gradient = false,
  animateOnScroll = false,
  delay = 0,
}) => {
  const [ref, isVisible] = useScrollReveal();

  const sizeClasses = {
    small: 'p-2 md:p-3',
    medium: 'p-3 md:p-5',
    large: 'p-4 md:p-6',
  };

  const baseStyles = `
    relative overflow-hidden
    bg-white dark:bg-[#1C1C1E]
    rounded-2xl
    border border-gray-200 dark:border-gray-700
    shadow-sm
    bento-noise
    transition-all duration-300
    ${hover ? 'hover:shadow-xl dark:hover:shadow-black/30 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-600' : ''}
    ${gradient ? 'bg-gradient-to-br from-white to-gray-50 dark:from-[#1C1C1E] dark:to-[#2C2C2E]' : ''}
  `;

  const revealClass = animateOnScroll
    ? isVisible ? 'reveal-visible' : 'reveal-hidden'
    : '';

  return (
    <div
      ref={animateOnScroll ? ref : undefined}
      className={`${baseStyles} ${sizeClasses[size]} ${className} ${revealClass}`}
      style={{ ...(animateOnScroll && isVisible ? { animationDelay: `${delay}ms` } : {}), ...style }}
    >
      {children}
    </div>
  );
};

export default BentoCard;
