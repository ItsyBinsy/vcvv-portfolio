import { useState, useEffect } from 'react';
import BentoCard from '../components/BentoCard';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import { projectsData } from '../utils/data';
import { MdWorkOutline } from 'react-icons/md';

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance every 5 seconds - relaxed pace
  useEffect(() => {
    if (isPaused || !projectsData || projectsData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!projectsData || projectsData.length === 0) {
    return null;
  }

  return (
    <BentoCard size="small" hover={true}>
      {/* Title on card */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <MdWorkOutline className="text-lg md:text-xl text-yellow-500" />
          <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
            Featured Projects
          </h3>
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
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Projects Container with Fade Transition */}
        <div className="relative w-full">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className={`transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full pointer-events-none'
              }`}
            >
              <ProjectCard
                title={project.title}
                role={project.role}
                period={project.period}
                tech={project.tech}
                highlights={project.highlights}
                image={project.image}
                link={project.link}
                imagePosition={index % 2 === 0 ? 'left' : 'right'}
                compact={true}
              />
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4">
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer hover:bg-yellow-400 ${
                index === currentIndex
                  ? 'w-6 md:w-8 h-1.5 md:h-2 bg-yellow-500'
                  : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-300'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* View All Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="All Projects"
      >
        <div className="space-y-6">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              role={project.role}
              period={project.period}
              tech={project.tech}
              highlights={project.highlights}
              image={project.image}
              link={project.link}
              imagePosition={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </Modal>
    </BentoCard>
  );
};

export default Projects;
