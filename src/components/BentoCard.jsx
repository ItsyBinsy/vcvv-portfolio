const BentoCard = ({
  children,
  className = '',
  size = 'medium',
  hover = true,
  gradient = false
}) => {
  // Size variants - Responsive padding (smaller on mobile)
  const sizeClasses = {
    small: 'p-2 md:p-3',
    medium: 'p-3 md:p-5',
    large: 'p-4 md:p-6',
  };

  // Base styles - Apple-inspired dark mode with better contrast
  const baseStyles = `
    bg-white dark:bg-[#1C1C1E]
    rounded-2xl
    border border-gray-200 dark:border-gray-700
    transition-all duration-300
    ${hover ? 'hover:shadow-lg hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-600' : ''}
    ${gradient ? 'bg-gradient-to-br from-white to-gray-50 dark:from-[#1C1C1E] dark:to-[#2C2C2E]' : ''}
  `;

  return (
    <div
      className={`${baseStyles} ${sizeClasses[size]} ${className}`}
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      {children}
    </div>
  );
};

export default BentoCard;
