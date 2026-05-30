import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { projectsData } from '../utils/data';
import { MdWorkOutline, MdOpenInNew, MdLock, MdArrowForwardIos, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { SiGithub } from 'react-icons/si';

const Projects = ({ defaultOpen = false, onModalClose } = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultOpen);
  const handleModalChange = (open) => { setIsModalOpen(open); if (!open) onModalClose?.(); };
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);
  const [imgIndex, setImgIndex] = useState(0);

  const getImages = (project) => project.images?.length ? project.images : [project.image].filter(Boolean);

  // Preload next image in gallery
  useEffect(() => {
    if (!selectedProject) return;
    const imgs = getImages(selectedProject);
    if (imgs.length <= 1) return;
    const next = imgs[(imgIndex + 1) % imgs.length];
    const img = new Image();
    img.src = next;
  }, [imgIndex, selectedProject]);

  // Preload all first images when modal opens
  useEffect(() => {
    if (!isModalOpen) return;
    projectsData.forEach(p => {
      const imgs = getImages(p);
      if (imgs[0]) { const img = new Image(); img.src = imgs[0]; }
    });
  }, [isModalOpen]);

  const selectProject = (project) => {
    setSelectedProject(project);
    setImgIndex(0);
  };

  if (!projectsData?.length) return null;

  return (
    <>
      {/* Master-Detail Split Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleModalChange}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-2xl max-h-[88vh] gap-0 p-0 overflow-hidden dark:bg-[#0d0d0d] bg-white">
          <DialogTitle className="sr-only">All Projects</DialogTitle>

          <div className="flex" style={{ height: '88vh' }}>
            {/* Left panel — project list */}
            <div className="w-56 flex-shrink-0 flex flex-col border-r border-gray-100 dark:border-white/6 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-white/6 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <MdWorkOutline className="text-yellow-500 text-base flex-shrink-0" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white tracking-wide uppercase">Projects</span>
                  <span className="ml-auto text-[10px] text-gray-400 dark:text-gray-500 font-medium">{projectsData.length}</span>
                </div>
              </div>

              <div className="overflow-y-auto flex-1 modal-scrollbar">
                {projectsData.map((project, index) => (
                  <button
                    key={index}
                    onClick={() => selectProject(project)}
                    className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 border-b border-gray-50 dark:border-white/4 last:border-0 transition-all duration-150 group ${
                      selectedProject?.title === project.title
                        ? 'bg-yellow-50 dark:bg-yellow-900/15 border-l-2 border-l-yellow-500'
                        : 'hover:bg-gray-50 dark:hover:bg-white/4 border-l-2 border-l-transparent'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-white/8">
                      <img src={project.images?.[0]} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-semibold leading-tight line-clamp-2 transition-colors ${
                        selectedProject?.title === project.title
                          ? 'text-yellow-700 dark:text-yellow-400'
                          : 'text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white'
                      }`}>
                        {project.title}
                      </p>
                    </div>
                    {selectedProject?.title === project.title && (
                      <MdArrowForwardIos className="w-2.5 h-2.5 text-yellow-500 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right panel — project detail */}
            {selectedProject && (
              <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Image gallery */}
                {(() => {
                  const imgs = getImages(selectedProject);
                  return (
                    <div className="flex-shrink-0 relative overflow-hidden border-b border-gray-100 dark:border-white/6 bg-gray-50 dark:bg-black" style={{ height: '200px' }}>
                      <img
                        key={imgs[imgIndex]}
                        src={imgs[imgIndex]}
                        alt={`${selectedProject.title} screenshot ${imgIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-200"
                      />
                      {imgs.length > 1 && (
                        <>
                          <button
                            onClick={() => setImgIndex((imgIndex - 1 + imgs.length) % imgs.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                          >
                            <MdChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setImgIndex((imgIndex + 1) % imgs.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                          >
                            <MdChevronRight className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                            {imgs.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setImgIndex(i)}
                                className={`rounded-full transition-all duration-200 ${i === imgIndex ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()}

                {/* Title bar */}
                <div className="px-5 py-3 border-b border-gray-100 dark:border-white/6 flex-shrink-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{selectedProject.title}</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {selectedProject.role}{selectedProject.period ? ` · ${selectedProject.period}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                      {selectedProject.github && (
                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-all">
                          <SiGithub className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {selectedProject.link && (
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-white/8 transition-all">
                          <MdOpenInNew className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {selectedProject.isPrivate && !selectedProject.link && !selectedProject.github && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/8 text-gray-400 dark:text-gray-500 text-[10px] font-medium">
                          <MdLock className="w-3 h-3" /> Private
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Detail content */}
                <div className="flex-1 overflow-y-auto modal-scrollbar px-5 py-4 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Built With</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((t, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-[11px] px-2 py-0.5 h-auto font-medium bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/50 text-yellow-700 dark:text-yellow-400"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedProject.highlights?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Highlights</p>
                      <ul className="space-y-2">
                        {selectedProject.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2.5 items-start">
                            <span className="w-1 h-1 rounded-full bg-yellow-500 flex-shrink-0 mt-1.5" />
                            <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-5 py-2.5 border-t border-gray-100 dark:border-white/6 flex-shrink-0 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {projectsData.indexOf(selectedProject) + 1} of {projectsData.length}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        const i = projectsData.indexOf(selectedProject);
                        selectProject(projectsData[(i - 1 + projectsData.length) % projectsData.length]);
                      }}
                      className="p-1 rounded text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors text-xs"
                    >←</button>
                    <button
                      onClick={() => {
                        const i = projectsData.indexOf(selectedProject);
                        selectProject(projectsData[(i + 1) % projectsData.length]);
                      }}
                      className="p-1 rounded text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors text-xs"
                    >→</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Projects;
