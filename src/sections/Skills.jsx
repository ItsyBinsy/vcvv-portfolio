import { useState, useEffect } from 'react';
import SkillCard from '../components/SkillCard';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/dialog';
import { skillsData } from '../utils/data';
import { MdCode } from 'react-icons/md';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { iconMap } from '../utils/iconMap';

const categoryColors = {
  'Frontend': 'from-blue-500/10 to-cyan-500/5 border-blue-200/50 dark:border-blue-800/30 text-blue-600 dark:text-blue-400',
  'Backend': 'from-green-500/10 to-emerald-500/5 border-green-200/50 dark:border-green-800/30 text-green-600 dark:text-green-400',
  'Mobile': 'from-purple-500/10 to-violet-500/5 border-purple-200/50 dark:border-purple-800/30 text-purple-600 dark:text-purple-400',
  'Database & CMS': 'from-orange-500/10 to-amber-500/5 border-orange-200/50 dark:border-orange-800/30 text-orange-600 dark:text-orange-400',
  'DevOps & Tools': 'from-slate-500/10 to-gray-500/5 border-slate-200/50 dark:border-slate-800/30 text-slate-600 dark:text-slate-400',
  'Design & QA': 'from-pink-500/10 to-rose-500/5 border-pink-200/50 dark:border-pink-800/30 text-pink-600 dark:text-pink-400',
};

const categoryDotColors = {
  'Frontend': 'bg-blue-500',
  'Backend': 'bg-green-500',
  'Mobile': 'bg-purple-500',
  'Database & CMS': 'bg-orange-500',
  'DevOps & Tools': 'bg-slate-500',
  'Design & QA': 'bg-pink-500',
};

const Skills = ({ defaultOpen = false, onModalClose } = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultOpen);
  const [currentIndex, setCurrentIndex] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const featuredSkills = skillsData.featured;

  const {
    scrollContainerRef,
    animationFrameRef,
    userScrollingRef,
    startAnimation,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
  } = useInfiniteScroll({ speed: 10 });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const startDelay = setTimeout(() => {
      if (container.scrollWidth > 0) startAnimation(container);
    }, 100);
    return () => {
      clearTimeout(startDelay);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let lastIndex = -1;
    const updateIndex = () => {
      const cards = container.querySelectorAll('[data-skill-index]');
      if (!cards.length) return;
      const index = Math.round(container.scrollLeft / cards[0].offsetWidth) % featuredSkills.length;
      if (index !== lastIndex) { lastIndex = index; setCurrentIndex(index); }
    };
    container.addEventListener('scroll', updateIndex);
    updateIndex();
    return () => container.removeEventListener('scroll', updateIndex);
  }, [featuredSkills.length]);

  const goToSlide = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    userScrollingRef.current = true;
    if (animationFrameRef.current) { cancelAnimationFrame(animationFrameRef.current); animationFrameRef.current = null; }
    const cards = container.querySelectorAll('[data-skill-index]');
    const target = cards[index];
    if (target) {
      const offset = container.scrollLeft + (target.getBoundingClientRect().left - container.getBoundingClientRect().left);
      container.scrollTo({ left: offset, behavior: 'smooth' });
      setTimeout(() => {
        userScrollingRef.current = false;
        startAnimation(container, container.scrollLeft);
      }, 2000);
    }
  };

  const allSkills = skillsData.categories.flatMap(cat =>
    cat.skills.map(skill => ({ ...skill, category: cat.name }))
  );

  const activeCategory = skillsData.categories[activeTab];
  const displaySkills = search.trim()
    ? allSkills.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()))
    : activeCategory.skills.map(s => ({ ...s, category: activeCategory.name }));

  const handleClose = () => {
    setIsModalOpen(false);
    onModalClose?.();
    setTimeout(() => { setSearch(''); setActiveTab(0); setSelectedSkill(null); }, 200);
  };

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors duration-200"
        >
          View All →
        </button>
      </div>

      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-3 pb-2 overflow-x-scroll scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {featuredSkills.map((skill, index) => (
            <div key={`original-${index}`} className="flex-shrink-0" data-skill-index={index}>
              <SkillCard name={skill.name} icon={skill.icon} description={skill.description} />
            </div>
          ))}
          {featuredSkills.map((skill, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0">
              <SkillCard name={skill.name} icon={skill.icon} description={skill.description} />
            </div>
          ))}
        </div>

        <div className="relative z-10 flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4">
          {featuredSkills.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer hover:bg-yellow-400 ${
                index === currentIndex
                  ? 'w-6 md:w-8 h-1.5 md:h-2 bg-yellow-500'
                  : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-300 dark:bg-gray-800'
              }`}
              aria-label={`Go to skill ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Icon-grid modal with expandable detail drawer */}
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-2xl h-[68vh] gap-0 p-0 overflow-hidden dark:bg-[#0d0d0d] bg-white flex flex-col">
          <DialogTitle className="sr-only">My Skillset</DialogTitle>

          {/* Search header — pr-10 reserves space for the dialog's absolute X button */}
          <div className="flex items-center gap-3 pl-4 pr-10 py-3 border-b border-gray-100 dark:border-white/6 flex-shrink-0">
            <MdCode className="text-yellow-500 text-lg flex-shrink-0" />
            <input
              type="text"
              placeholder="Search skills…"
              value={search}
              onChange={e => { setSearch(e.target.value); setSelectedSkill(null); }}
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
              autoFocus
            />
            {search && (
              <button onClick={() => { setSearch(''); setSelectedSkill(null); }} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                Clear
              </button>
            )}
          </div>

          {/* Category tabs */}
          {!search && (
            <div className="flex gap-1 px-4 py-2.5 border-b border-gray-100 dark:border-white/6 overflow-x-auto scrollbar-hide flex-shrink-0">
              {skillsData.categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveTab(i); setSelectedSkill(null); }}
                  className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 ${
                    activeTab === i
                      ? 'bg-yellow-500 text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/8 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeTab === i ? 'bg-white/70' : categoryDotColors[cat.name]}`} />
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Icon grid */}
          <div
            className="flex-1 overflow-y-auto modal-scrollbar px-4 pt-3 pb-4"
            data-lenis-prevent
          >
            {displaySkills.length === 0 ? (
              <div className="py-12 text-center text-sm text-gray-400">No skills match "{search}"</div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {displaySkills.map((skill, i) => {
                  const Icon = iconMap[skill.icon];
                  const colorClass = categoryColors[skill.category] || categoryColors['Frontend Development'];
                  const isSelected = selectedSkill?.name === skill.name;
                  return (
                    <button
                      key={`${skill.name}-${i}`}
                      onClick={() => setSelectedSkill(isSelected ? null : skill)}
                      className={`relative flex flex-col items-center justify-center gap-2 p-3 h-24 rounded-xl border bg-gradient-to-br transition-all duration-200 text-left group ${
                        isSelected
                          ? `${colorClass} ring-2 ring-offset-1 ring-yellow-400 dark:ring-offset-[#0d0d0d] scale-[0.97]`
                          : `bg-gray-50 dark:bg-white/4 border-gray-100 dark:border-white/6 hover:border-gray-200 dark:hover:border-white/12 hover:scale-[1.02] hover:shadow-md dark:hover:shadow-black/20`
                      }`}
                    >
                      {/* Icon */}
                      <div className={`text-2xl transition-colors duration-200 ${
                        isSelected ? '' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white'
                      }`}>
                        {Icon && <Icon />}
                      </div>
                      {/* Name */}
                      <span className={`text-[11px] font-semibold text-center leading-tight transition-colors duration-200 ${
                        isSelected ? '' : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                      }`}>
                        {skill.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Expandable detail drawer — slides up when a skill is selected */}
          <div
            className={`flex-shrink-0 border-t border-gray-100 dark:border-white/6 bg-gray-50 dark:bg-white/3 transition-all duration-300 ease-out overflow-hidden ${
              selectedSkill ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {selectedSkill && (() => {
              const Icon = iconMap[selectedSkill.icon];
              const colorClass = categoryColors[selectedSkill.category] || '';
              return (
                <div className="flex items-start gap-3 px-5 py-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xl bg-gradient-to-br ${colorClass} border`}>
                    {Icon && <Icon />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedSkill.name}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-br border ${colorClass}`}>
                        {selectedSkill.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">{selectedSkill.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 text-base flex-shrink-0 mt-0.5"
                  >×</button>
                </div>
              );
            })()}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-100 dark:border-white/6 flex items-center justify-between flex-shrink-0">
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              {displaySkills.length} skill{displaySkills.length !== 1 ? 's' : ''}
            </span>
            <span className="text-[11px] text-gray-400 dark:text-gray-500">click a skill to learn more</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Skills;
