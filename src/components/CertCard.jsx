const CertCard = ({ name, issuer, badge, link }) => {
  const CardContent = () => (
    <div className="flex-shrink-0 w-48 min-w-48 h-52 bg-white dark:bg-[#2C2C2E] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group cursor-pointer hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
      {/* Certificate Image - Takes most space */}
      {badge && (
        <div className="w-full h-36 bg-gray-50 dark:bg-[#1C1C1E] flex items-center justify-center p-3" style={{ willChange: 'transform' }}>
          <img
            src={badge}
            alt={name}
            loading="eager"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            style={{
              imageRendering: 'auto',
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          />
        </div>
      )}

      {/* Certificate Info - Bottom section with more breathing room */}
      <div className="p-4 bg-white dark:bg-[#2C2C2E]">
        {/* Certification Name */}
        <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1 mb-1.5">
          {name}
        </h3>

        {/* Issuer */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
          {issuer}
        </p>
      </div>
    </div>
  );

  // If there's a link, wrap in anchor tag
  if (link && link !== '#') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <CardContent />
      </a>
    );
  }

  // Otherwise, just return the card
  return <CardContent />;
};

export default CertCard;
