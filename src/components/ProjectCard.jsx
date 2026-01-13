const ProjectCard = ({ title, role, period, tech, highlights, image, link, imagePosition = 'left', compact = false }) => {
  const isLeft = imagePosition === 'left';

  return (
    <div className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 items-start p-4 bg-gray-50 dark:bg-black rounded-xl border border-gray-200 dark:border-gray-900 transition-colors duration-300`}>
        {/* Project Image */}
        <div className="w-full md:w-2/5 flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-lg shadow-md"
            loading="lazy"
          />
        </div>

        {/* Project Info */}
        <div className="w-full md:w-3/5 space-y-2">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>

          {/* Role + Period */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-700 dark:text-gray-300">{role}</span>
            {period && (
              <>
                <span className="text-gray-400 dark:text-gray-500">•</span>
                <span className="text-gray-600 dark:text-gray-400">{period}</span>
              </>
            )}
          </div>

          {/* Tech Stack - Show only first 3 in compact mode */}
          <div className="flex flex-wrap gap-2">
            {(compact ? tech.slice(0, 3) : tech).map((item, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300"
              >
                {item}
              </span>
            ))}
            {compact && tech.length > 3 && (
              <span className="px-2.5 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
                +{tech.length - 3} more
              </span>
            )}
          </div>

          {/* Key Highlights - Show only first 2 in compact mode */}
          <ul className="space-y-1.5 mt-3">
            {(compact ? highlights.slice(0, 2) : highlights).map((highlight, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <span className="text-yellow-500 dark:text-yellow-400 mt-0.5">•</span>
                <span className={compact ? "line-clamp-1" : ""}>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default ProjectCard;
