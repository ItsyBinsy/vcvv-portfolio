import { useState, useRef } from 'react';
import { MdOpenInNew, MdLock } from 'react-icons/md';
import { SiGithub } from 'react-icons/si';
import { Badge } from './ui/badge';

const ProjectCard = ({
  title, role, period, tech, highlights, image, link, github, isPrivate,
  imagePosition = 'left', compact = false
}) => {
  const isLeft = imagePosition === 'left';
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rx = (((e.clientY - rect.top) / rect.height) - 0.5) * -10;
    const ry = (((e.clientX - rect.left) / rect.width) - 0.5) * 10;
    setTilt({ x: rx, y: ry });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
      }}
      className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 items-start p-4 bg-gray-50 dark:bg-[#2C2C2E] rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300`}
    >
      {/* Project Image */}
      <div className="w-full md:w-2/5 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover object-top rounded-lg shadow-md"
          loading="lazy"
        />
      </div>

      {/* Project Info */}
      <div className="w-full md:w-3/5 space-y-2">
        {/* Title + links row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{title}</h3>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="GitHub repository">
                <SiGithub className="w-4 h-4" />
              </a>
            )}
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Live demo">
                <MdOpenInNew className="w-4 h-4" />
              </a>
            )}
            {isPrivate && !link && !github && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs">
                <MdLock className="w-3 h-3" /> Private
              </span>
            )}
          </div>
        </div>

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

        {/* Tech Stack — shadcn Badge */}
        <div className="flex flex-wrap gap-1.5">
          {(compact ? tech.slice(0, 3) : tech).map((item, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs font-semibold bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300"
            >
              {item}
            </Badge>
          ))}
          {compact && tech.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">+{tech.length - 3} more</span>
          )}
        </div>

        {/* Key Highlights */}
        <ul className="space-y-1.5 mt-3">
          {(compact ? highlights.slice(0, 2) : highlights).map((highlight, index) => (
            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
              <span className="text-yellow-500 dark:text-yellow-400 mt-0.5">•</span>
              <span className={compact ? 'line-clamp-1' : ''}>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;
