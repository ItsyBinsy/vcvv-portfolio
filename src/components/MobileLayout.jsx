import { useRef, useState, useEffect } from 'react';
import ImageWithSkeleton from './ImageWithSkeleton';
import { motion } from 'framer-motion';
import { MdDownload, MdKeyboardArrowDown, MdVerified, MdAlternateEmail, MdArrowOutward, MdOpenInNew, MdLock, MdCode, MdPhone, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { SiGmail, SiGithub } from 'react-icons/si';
import { RiFacebookLine, RiLinkedinLine } from 'react-icons/ri';
import { LuGithub } from 'react-icons/lu';
import BottomSheet from './BottomSheet';
import TypingAnimation from './TypingAnimation';
import { heroData, projectsData, skillsData, certificationsData, contactData } from '../utils/data';
import { useManilaTime } from '../hooks/useManilaTime';
import { iconMap } from '../utils/iconMap';
import { useDarkMode } from '../context/DarkModeContext';
import { Badge } from './ui/badge';

const HERO_ROLES = ['Web & Mobile App Developer', 'QA & Software Tester', 'Full-Stack Developer'];


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

/* ─── Hero / Lockscreen ──────────────────────────────── */
const HeroScreen = ({ onScrollDown }) => {
  const { isDarkMode } = useDarkMode();
  const manilaTime = useManilaTime();

  return (
    <div className="relative w-full flex flex-col" style={{ minHeight: '100svh' }}>
      <div className="absolute inset-0">
        <img
          src={isDarkMode ? heroData.image.dark : heroData.image.light}
          alt={heroData.name}
          className="w-full h-full object-cover object-top"
          fetchPriority="high"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.92) 100%)' }}
        />
        {/* Top-down scrim — dims bright white photo area */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      </div>

      {/* Top bar — Available for Work left, PHT clock right */}
      <div className="relative z-10 flex items-center justify-between p-5 pt-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Available for Work
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono tracking-wider">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Manila · {manilaTime} PHT
          </div>
        </motion.div>
      </div>

      <div className="flex-1" />

      {/* Lockscreen bottom content */}
      <motion.div
        className="relative z-10 px-6"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 96px)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Tagline */}
        <p className="text-white/70 text-[10px] tracking-widest uppercase mb-1.5" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{heroData.tagline}</p>

        {/* Name */}
        <h1 className="text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-3" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          Vince Carl<br />Viaña
        </h1>

        {/* Role typing pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
          <span className="text-xs font-semibold text-white/90">
            <TypingAnimation texts={HERO_ROLES} typingSpeed={80} deletingSpeed={50} delayBetweenTexts={2000} />
          </span>
        </div>

        {/* Edu + CV row */}
        <div className="flex items-center justify-between gap-3 mb-5 pt-3 border-t border-white/10">
          <div>
            <p className="text-white/40 text-[10px] leading-snug mb-0.5">{heroData.education}</p>
            <p className="text-white/80 text-xs font-semibold leading-snug">{heroData.university}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="/CV_VinceCarl_Viana.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-yellow-500 active:scale-95 text-white text-xs font-bold overflow-hidden transition-all duration-150 before:absolute before:inset-0 before:-translate-x-full active:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-500"
            >
              <MdDownload className="w-3.5 h-3.5" />
              View CV
            </a>
            <a
              href="https://github.com/ItsyBinsy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 active:scale-95 transition-all duration-150"
            >
              <LuGithub className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Swipe up cue */}
        <motion.button
          onClick={onScrollDown}
          className="w-full flex flex-col items-center gap-2 text-white/30 active:text-white/60 transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          aria-label="Scroll down"
        >
          <div className="w-px h-6 bg-gradient-to-b from-transparent to-white/40 rounded-full" />
          <span className="text-[10px] tracking-widest uppercase font-medium">swipe up</span>
        </motion.button>
      </motion.div>
    </div>
  );
};


/* ─── Projects sheet content ─────────────────────────── */
const ProjectDetail = ({ project, onClose }) => {
  const imgs = project.images?.length ? project.images : [];
  const useContain = !!project.useContain;
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div className="pb-8">
      {imgs.length > 0 && (
        <div className="relative bg-gray-100 dark:bg-black" style={{ aspectRatio: useContain ? '16/9' : '16/7' }}>
          <ImageWithSkeleton
            src={imgs[imgIndex]}
            alt=""
            className={`w-full h-full ${useContain ? 'object-contain' : 'object-cover object-top'}`}
            containerClassName="w-full h-full"
          />
          {imgs.length > 1 && (
            <>
              <button onClick={() => setImgIndex((imgIndex - 1 + imgs.length) % imgs.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                <MdChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setImgIndex((imgIndex + 1) % imgs.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                <MdChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                {imgs.map((_, i) => (
                  <button key={i} onClick={() => setImgIndex(i)}
                    className={`rounded-full transition-all duration-200 ${i === imgIndex ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="px-5 pt-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">{project.title}</h3>
          <div className="flex gap-1 flex-shrink-0">
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-gray-400"><SiGithub className="w-4 h-4" /></a>}
            {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-gray-400 hover:text-yellow-500"><MdOpenInNew className="w-4 h-4" /></a>}
            {project.isPrivate && !project.link && !project.github && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/8 text-gray-400 text-[10px]">
                <MdLock className="w-3 h-3" />Private
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">{project.role}{project.period ? ` · ${project.period}` : ''}</p>

        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Built With</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => (
            <Badge key={t} variant="outline" className="text-[10px] px-2 py-0.5 h-auto bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/50 text-yellow-700 dark:text-yellow-400">
              {t}
            </Badge>
          ))}
        </div>

        {project.highlights?.length > 0 && (
          <>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Highlights</p>
            <ul className="space-y-1.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="w-1 h-1 rounded-full bg-yellow-500 flex-shrink-0 mt-1.5" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

const ProjectsContent = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <p className="px-5 pt-4 pb-2 text-[10px] text-gray-400 dark:text-gray-600">Tap a project to view details</p>
      <div className="grid grid-cols-2 gap-3 px-5 pb-4">
        {projectsData.map((project) => (
          <button
            key={project.title}
            onClick={() => setSelectedProject(project)}
            className="flex flex-col rounded-xl overflow-hidden border border-gray-100 dark:border-white/6 bg-gray-50 dark:bg-white/3 active:scale-95 transition-transform text-left"
          >
            <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-white/6 overflow-hidden">
              {project.images?.[0]
                ? <ImageWithSkeleton src={project.images[0]} alt="" className={`w-full h-full ${project.useContain ? 'object-contain' : 'object-cover object-top'}`} containerClassName="w-full h-full" />
                : <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/20" />
              }
            </div>
            <div className="px-2.5 py-2">
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight line-clamp-2">{project.title}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">{project.period}</p>
            </div>
          </button>
        ))}
      </div>

      <BottomSheet
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </BottomSheet>
    </>
  );
};

/* ─── Skills sheet content ───────────────────────────── */
const SkillsContent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const allSkills = skillsData.categories.flatMap(c => c.skills.map(s => ({ ...s, category: c.name })));
  const activeCategory = skillsData.categories[activeTab];
  const filtered = query.trim()
    ? allSkills.filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
    : activeCategory.skills.map(s => ({ ...s, category: activeCategory.name }));

  return (
    <>
      {/* Search */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/6 border border-gray-200 dark:border-white/8">
          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search skills..."
            className="flex-1 bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 outline-none"
            style={{ fontSize: '16px' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 text-sm leading-none">×</button>
          )}
        </div>
      </div>

      {/* Category tabs — hidden while searching */}
      {!query && (
        <div className="flex gap-1 px-5 py-2 overflow-x-auto scrollbar-hide">
          {skillsData.categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === i ? 'bg-yellow-500 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/6'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeTab === i ? 'bg-white/70' : categoryDotColors[cat.name]}`} />
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Helper hint */}
      <p className="px-5 pb-2 text-[10px] text-gray-400 dark:text-gray-600">Tap a skill to learn more</p>

      {/* 2-column icon grid */}
      <div className="grid grid-cols-2 gap-2 px-5 pb-4">
        {filtered.map((skill) => {
          const Icon = iconMap[skill.icon];
          const colorClass = categoryColors[skill.category] || categoryColors['Frontend'];
          return (
            <button
              key={skill.name}
              onClick={() => setSelectedSkill(skill.name === selectedSkill ? null : skill.name)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl border border-gray-100 dark:border-white/6 bg-gray-50 dark:bg-white/3 active:scale-95 transition-transform text-left"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base bg-gradient-to-br border ${colorClass}`}>
                {Icon && <Icon />}
              </div>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-tight">{skill.name}</span>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-600 py-6 text-center col-span-2">No skills found</p>
        )}
      </div>

      <BottomSheet
        open={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill}
      >
        {selectedSkill && (() => {
          const skill = filtered.find(s => s.name === selectedSkill) || allSkills.find(s => s.name === selectedSkill);
          const Icon = skill ? iconMap[skill.icon] : null;
          const colorClass = skill ? (categoryColors[skill.category] || categoryColors['Frontend']) : '';
          return skill ? (
            <div className="px-5 py-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 bg-gradient-to-br border ${colorClass}`}>
                {Icon && <Icon />}
              </div>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{skill.category}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{skill.description}</p>
            </div>
          ) : null;
        })()}
      </BottomSheet>
    </>
  );
};

/* ─── Certs sheet content ────────────────────────────── */
const CertsContent = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <>
      <p className="px-5 pt-4 pb-2 text-[10px] text-gray-400 dark:text-gray-600">Tap a credential to view details</p>
      <div className="grid grid-cols-2 gap-3 px-5 pb-4">
        {certificationsData.map((cert) => (
          <button
            key={cert.name}
            onClick={() => setSelectedCert(cert)}
            className="flex flex-col rounded-xl overflow-hidden border border-gray-100 dark:border-white/6 bg-gray-50 dark:bg-white/3 active:scale-95 transition-transform text-left"
          >
            <div className="w-full aspect-square bg-white dark:bg-white/4 flex items-center justify-center p-3">
              <img src={cert.badge} alt="" className="w-full h-full object-contain" loading="lazy" />
            </div>
            <div className="px-2.5 py-2 border-t border-gray-100 dark:border-white/6">
              <p className="text-[10px] font-bold text-gray-800 dark:text-gray-200 leading-tight line-clamp-2">{cert.name}</p>
              <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">{cert.issuer}</p>
            </div>
          </button>
        ))}
      </div>

      <BottomSheet
        open={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title="Credential"
      >
        {selectedCert && (
          <div className="px-5 py-5">
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-white/4 border border-gray-100 dark:border-white/6 flex items-center justify-center mb-4">
              <img src={selectedCert.preview || selectedCert.badge} alt="" className="h-full object-contain" loading="lazy" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug mb-1">{selectedCert.name}</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">{selectedCert.issuer} · {selectedCert.date}</p>
            {selectedCert.link && selectedCert.link !== '#' && (
              <a href={selectedCert.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-yellow-500 text-white text-xs font-bold">
                <MdOpenInNew className="w-3.5 h-3.5" />
                View Certificate
              </a>
            )}
          </div>
        )}
      </BottomSheet>
    </>
  );
};

/* ─── Contact sheet content ──────────────────────────── */
const ContactContent = () => (
  <div className="px-5 py-4 flex flex-col gap-3">
    <a href={contactData.methods[0].link}
      className="group flex items-center gap-3 px-4 py-4 rounded-xl border border-gray-100 dark:border-white/6 bg-gray-50 dark:bg-white/3 active:scale-[0.98] transition-transform">
      <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
        <SiGmail className="w-4 h-4 text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] text-gray-400 dark:text-gray-600 uppercase tracking-wide mb-0.5">Email</p>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">{contactData.methods[0].value}</p>
      </div>
      <MdArrowOutward className="w-4 h-4 text-gray-300 dark:text-gray-700 group-active:text-yellow-500 transition-colors flex-shrink-0" />
    </a>
    <a href={contactData.methods[1].link}
      className="group flex items-center gap-3 px-4 py-4 rounded-xl border border-gray-100 dark:border-white/6 bg-gray-50 dark:bg-white/3 active:scale-[0.98] transition-transform">
      <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
        <MdPhone className="w-4 h-4 text-green-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] text-gray-400 dark:text-gray-600 uppercase tracking-wide mb-0.5">Phone</p>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{contactData.methods[1].value}</p>
      </div>
      <MdArrowOutward className="w-4 h-4 text-gray-300 dark:text-gray-700 group-active:text-yellow-500 transition-colors flex-shrink-0" />
    </a>
    <div className="grid grid-cols-2 gap-2">
      {contactData.methods[2]?.socials?.map(social => {
        const Icon = social.icon === 'RiFacebookLine' ? RiFacebookLine : RiLinkedinLine;
        return (
          <a key={social.name} href={social.link} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-gray-100 dark:border-white/6 bg-gray-50 dark:bg-white/3 text-gray-600 dark:text-gray-400 active:scale-[0.98] transition-transform">
            <Icon className="w-4 h-4" />
            <span className="text-xs font-semibold">{social.name}</span>
          </a>
        );
      })}
    </div>
  </div>
);

/* ─── Folder previews ────────────────────────────────── */
const folderDefs = [
  {
    id: 'projects',
    label: 'Projects',
    title: 'Projects',
    Icon: MdCode,
    count: Math.max(0, projectsData.length - 4),
    Content: ProjectsContent,
    Preview: () => (
      <div className="grid grid-cols-2 gap-0.5 w-full h-full">
        {projectsData.slice(0, 4).map((p, i) => (
          <div key={i} className="overflow-hidden rounded-sm bg-gray-200 dark:bg-white/10">
            {p.images?.[0]
              ? <img src={p.images[0]} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
              : <div className="w-full h-full bg-blue-400/30" />
            }
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    title: 'Skills',
    Icon: MdCode,
    count: Math.max(0, skillsData.categories.reduce((s, c) => s + c.skills.length, 0) - 4),
    Content: SkillsContent,
    Preview: () => (
      <div className="grid grid-cols-2 gap-1 w-full h-full">
        {skillsData.featured.slice(0, 4).map((skill) => {
          const Icon = iconMap[skill.icon];
          return (
            <div key={skill.name} className="flex flex-col items-center justify-center gap-0.5">
              {Icon && <Icon className="text-base text-gray-500 dark:text-gray-400" />}
              <span className="text-[7px] text-gray-500 dark:text-gray-400 font-medium leading-none">{skill.name}</span>
            </div>
          );
        })}
      </div>
    ),
  },
  {
    id: 'certs',
    label: 'Credentials',
    title: 'Credentials',
    Icon: MdVerified,
    count: Math.max(0, certificationsData.length - 4),
    Content: CertsContent,
    Preview: () => (
      <div className="grid grid-cols-2 gap-1 w-full h-full">
        {certificationsData.slice(0, 4).map((cert, i) => (
          <div key={i} className="rounded-md bg-gray-200 dark:bg-white/10 flex items-center justify-center p-0.5">
            {cert.badge
              ? <img src={cert.badge} alt="" className="w-full h-full object-contain" loading="lazy" />
              : <MdVerified className="text-sm text-gray-400" />
            }
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'Contact',
    Icon: MdAlternateEmail,
    count: 0,
    Content: ContactContent,
    Preview: () => (
      <div className="grid grid-cols-2 gap-1 w-full h-full">
        {[
          { Icon: SiGmail, className: 'text-red-400' },
          { Icon: MdPhone, className: 'text-green-400' },
          { Icon: RiFacebookLine, className: 'text-blue-500' },
          { Icon: RiLinkedinLine, className: 'text-sky-600' },
        ].map(({ Icon, className }, i) => (
          <div key={i} className="flex items-center justify-center">
            <Icon className={`text-lg ${className}`} />
          </div>
        ))}
      </div>
    ),
  },
];

/* ─── Single folder tile ─────────────────────────────── */
const FolderTile = ({ folder, onOpen, delay }) => (
  <motion.div
    className="flex flex-col items-center gap-2"
    initial={{ opacity: 0, scale: 0.7 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
  >
    <div className="relative w-full">
      {folder.count > 0 && (
        <div className="absolute -top-2 -right-2 z-10 min-w-[22px] h-[22px] px-1 rounded-full bg-red-500 flex items-center justify-center shadow-md">
          <span className="text-[10px] font-bold text-white leading-none">{folder.count}</span>
        </div>
      )}
      <button
        onClick={onOpen}
        className="w-full aspect-square rounded-2xl p-3 active:scale-95 transition-transform duration-150 shadow-lg cursor-default overflow-hidden flex items-center justify-center"
        style={{
          background: 'rgba(150,150,150,0.15)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        <folder.Preview />
      </button>
    </div>
    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">{folder.label}</span>
  </motion.div>
);

/* ─── Home screen ────────────────────────────────────── */
const HomeScreen = () => {
  const [openSheet, setOpenSheet] = useState(null);

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-12" style={{ minHeight: '100svh' }}>

      {/* Greeting */}
      <motion.div
        className="w-full mb-10 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-1">Portfolio</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">What would you like to see?</p>
      </motion.div>

      {/* 2×2 folder grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        {folderDefs.map((folder, i) => (
          <FolderTile
            key={folder.id}
            folder={folder}
            onOpen={() => setOpenSheet(folder.id)}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* Bottom sheets */}
      {folderDefs.map(folder => (
        <BottomSheet
          key={folder.id}
          open={openSheet === folder.id}
          onClose={() => setOpenSheet(null)}
          title={folder.title}
          icon={folder.Icon}
        >
          <folder.Content />
        </BottomSheet>
      ))}
    </div>
  );
};

/* ─── Root ───────────────────────────────────────────── */
const MobileLayout = () => {
  const homeRef = useRef(null);

  return (
    <div className="-mx-3 -mt-3">
      <HeroScreen onScrollDown={() => homeRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <div ref={homeRef}>
        <HomeScreen />
      </div>
      <div className="text-center py-6 px-6 border-t border-gray-100 dark:border-white/6">
        <p className="text-[11px] text-gray-400 dark:text-gray-600">
          © 2026 Vince Carl Viaña
        </p>
      </div>
    </div>
  );
};

export default MobileLayout;
