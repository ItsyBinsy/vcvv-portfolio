import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdDownload, MdArrowOutward, MdWorkOutline, MdCode, MdVerified, MdAlternateEmail } from 'react-icons/md';
import { RiFacebookLine, RiLinkedinLine } from 'react-icons/ri';
import { useCursorSpotlight } from './hooks/useCursorSpotlight';
import { heroData, projectsData, skillsData, certificationsData, contactData } from './utils/data';
import { iconMap } from './utils/iconMap';
import { useDarkMode } from './context/DarkModeContext';
import TypingAnimation from './components/TypingAnimation';
import FloatingNav from './components/FloatingNav';
import Chatbot from './components/Chatbot';
import MobileLayout from './components/MobileLayout';
import CustomCursor from './components/CustomCursor';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';

// ── Manila clock hook ─────────────────────────────────────────────
function useManilaTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-PH', {
        timeZone: 'Asia/Manila',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}


// ── Panel shell ───────────────────────────────────────────────────
const Panel = ({ id, children, className = '', onClick, role, tabIndex, hoveredPanel, setHoveredPanel }) => {
  const isHovered = hoveredPanel === id;
  const anyHovered = hoveredPanel !== null;

  return (
    <motion.div
      className={`h-full rounded-2xl border bg-white dark:bg-[#111111] p-4 flex flex-col overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ willChange: 'transform, opacity, filter' }}
      animate={{
        scale: anyHovered ? (isHovered ? 1.018 : 0.97) : 1,
        opacity: anyHovered ? (isHovered ? 1 : 0.38) : 1,
        filter: anyHovered
          ? isHovered
            ? 'blur(0px) brightness(1)'
            : 'blur(0.5px) brightness(0.85)'
          : 'blur(0px) brightness(1)',
        y: isHovered ? -3 : 0,
      }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHoveredPanel?.(id)}
      onMouseLeave={() => setHoveredPanel?.(null)}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
    >
      {children}
    </motion.div>
  );
};

const PanelLabel = ({ children }) => (
  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-600 leading-none">{children}</p>
);

const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const HERO_ROLES = ['Web & Mobile App Developer', 'QA & Software Tester', 'Full-Stack Developer'];

// ── HERO panel ────────────────────────────────────────────────────
const HeroPanel = ({ hoveredPanel, setHoveredPanel }) => {
  const { isDarkMode } = useDarkMode();
  const manilaTime = useManilaTime();

  return (
    <Panel id="hero" hoveredPanel={hoveredPanel} setHoveredPanel={setHoveredPanel} className="!p-0 relative overflow-hidden">
      {/* Full-bleed photo */}
      <div className="absolute inset-0">
        <img
          src={isDarkMode ? heroData.image.dark : heroData.image.light}
          alt={heroData.name}
          className="w-full h-full object-cover"
          fetchPriority="high"
          style={{ objectPosition: '50% 8%' }}
        />
        {/* Bottom-up gradient scrim so text reads on top of photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
        {/* Top-down subtle scrim for OJT badge area */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-between p-4">
        {/* Top: OJT badge */}
        <FadeIn delay={0.05}>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold self-start">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Available for Work
          </div>
        </FadeIn>

        {/* Bottom: name + role + edu + CTAs */}
        <div>
          <FadeIn delay={0.1}>
            <p className="text-[10px] font-mono text-white/50 mb-1">{heroData.tagline}</p>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight tracking-tight mb-2">
              {heroData.name}
            </h1>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
              <span className="text-[11px] font-semibold text-white/90">
                <TypingAnimation
                  texts={HERO_ROLES}
                  typingSpeed={75}
                  deletingSpeed={45}
                  delayBetweenTexts={2200}
                />
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.24}>
            <p className="text-[10px] text-white/40">{heroData.education}</p>
            <p className="text-xs font-bold text-white/70 mb-4">{heroData.university}</p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="/CV_VinceCarl_Viana.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-yellow-500 text-white text-[11px] font-bold hover:-translate-y-0.5 overflow-hidden transition-all duration-200 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-500"
              >
                <MdDownload className="w-3 h-3" />
                View CV
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Manila clock — bottom right, over the photo */}
      <div className="absolute bottom-3.5 right-4 z-10 flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[9px] font-mono text-white/40 tracking-wider">
          PHT · {manilaTime}
        </span>
      </div>
    </Panel>
  );
};

// ── PROJECTS panel ────────────────────────────────────────────────
const ProjectsPanel = ({ onOpenModal, hoveredPanel, setHoveredPanel }) => {

  return (
    <Panel id="projects" hoveredPanel={hoveredPanel} setHoveredPanel={setHoveredPanel} className="col-span-2 row-span-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <MdWorkOutline className="w-3 h-3 text-yellow-500/70" />
          <PanelLabel>Projects</PanelLabel>
        </div>
        {projectsData.length > 2 && (
          <button
            onClick={onOpenModal}
            className="text-[10px] font-semibold text-gray-400 dark:text-gray-600 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors"
          >
            +{projectsData.length - 2} more →
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {projectsData.slice(0, 2).map((project, i) => (
          <motion.div
            key={project.title}
            className="group flex flex-col rounded-xl border border-gray-100 dark:border-white/6 hover:border-gray-200 dark:hover:border-white/12 bg-gray-50 dark:bg-white/3 hover:bg-gray-100/60 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onClick={onOpenModal}
          >
            {/* Image — fixed ratio, never stretches regardless of panel height */}
            <div className="w-full aspect-[16/9] flex-shrink-0 bg-gray-100 dark:bg-white/6 overflow-hidden">
              {project.images?.[0]
                ? <img src={project.images[0]} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
                : <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/20" />
              }
            </div>
            <div className="flex-shrink-0 px-3 py-2.5" style={{ height: '82px' }}>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight group-hover:text-gray-900 dark:group-hover:text-white transition-colors line-clamp-2">
                {project.title}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">{project.role}</p>
              <div className="flex gap-1 mt-1.5 flex-wrap">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-[9px] px-1.5 py-[2px] rounded-md bg-yellow-400/15 dark:bg-yellow-400/10 text-yellow-700 dark:text-yellow-400 font-semibold">
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-[9px] px-1.5 py-[2px] rounded-md bg-gray-200 dark:bg-white/6 text-gray-400 dark:text-gray-600 font-semibold tabular-nums">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </Panel>
  );
};

// ── TABLET PROJECTS panel (aspect-ratio images, no stretch) ──────
const TabletProjectsPanel = ({ onOpenModal }) => (
  <div className="rounded-2xl border border-gray-100 dark:border-white/6 bg-white dark:bg-[#111111] p-4">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-1.5">
        <MdWorkOutline className="w-3 h-3 text-yellow-500/70" />
        <PanelLabel>Projects</PanelLabel>
      </div>
      {projectsData.length > 2 && (
        <button
          onClick={onOpenModal}
          className="text-[10px] font-semibold text-gray-400 dark:text-gray-600 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors"
        >
          +{projectsData.length - 2} more →
        </button>
      )}
    </div>
    <div className="grid grid-cols-2 gap-3">
      {projectsData.slice(0, 2).map((project, i) => (
        <motion.div
          key={project.title}
          className="group flex flex-col rounded-xl border border-gray-100 dark:border-white/6 hover:border-gray-200 dark:hover:border-white/12 bg-gray-50 dark:bg-white/3 hover:bg-gray-100/60 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          onClick={onOpenModal}
        >
          {/* Fixed-ratio thumbnail — never stretches */}
          <div className="w-full aspect-[16/9] flex-shrink-0 bg-gray-100 dark:bg-white/6 overflow-hidden">
            {project.images?.[0]
              ? <img src={project.images[0]} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
              : <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/20" />
            }
          </div>
          <div className="flex-shrink-0 px-3 py-2.5">
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight group-hover:text-gray-900 dark:group-hover:text-white transition-colors line-clamp-2">
              {project.title}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">{project.role}</p>
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {project.tech.slice(0, 3).map(t => (
                <span key={t} className="text-[9px] px-1.5 py-[2px] rounded-md bg-yellow-400/15 dark:bg-yellow-400/10 text-yellow-700 dark:text-yellow-400 font-semibold">
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-[9px] px-1.5 py-[2px] rounded-md bg-gray-200 dark:bg-white/6 text-gray-400 dark:text-gray-600 font-semibold tabular-nums">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// ── SKILLS panel ──────────────────────────────────────────────────
const SkillsPanel = ({ onOpenModal, hoveredPanel, setHoveredPanel }) => {
  const topSkills = skillsData.featured.slice(0, 8);
  const totalCount = skillsData.categories.reduce((s, c) => s + c.skills.length, 0);

  return (
    <Panel id="skills" hoveredPanel={hoveredPanel} setHoveredPanel={setHoveredPanel} onClick={onOpenModal} role="button" tabIndex={0}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <MdCode className="w-3 h-3 text-yellow-500/70" />
          <PanelLabel>Skills</PanelLabel>
        </div>
        <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-600">+{totalCount - topSkills.length} more →</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 flex-1">
        {topSkills.map((skill, i) => {
          const Icon = iconMap[skill.icon];
          return (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center justify-center gap-1.5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.04 }}
            >
              {Icon && <Icon className="text-2xl text-gray-500 dark:text-gray-400" />}
              <span className="text-[9px] text-gray-500 dark:text-gray-500 text-center leading-tight font-medium">{skill.name}</span>
            </motion.div>
          );
        })}
      </div>
    </Panel>
  );
};

// ── CERTS panel ───────────────────────────────────────────────────
const CertsPanel = ({ onOpenModal, hoveredPanel, setHoveredPanel }) => (
  <Panel id="certs" hoveredPanel={hoveredPanel} setHoveredPanel={setHoveredPanel} onClick={onOpenModal} role="button" tabIndex={0}>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5">
        <MdVerified className="w-3 h-3 text-yellow-500/70" />
        <PanelLabel>Credentials</PanelLabel>
      </div>
      {certificationsData.length > 3 && (
        <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-600">+{certificationsData.length - 3} more →</span>
      )}
    </div>
    <div className="flex flex-col gap-2.5 flex-1 overflow-hidden justify-around">
      {certificationsData.slice(0, 3).map((cert, i) => (
        <motion.div
          key={cert.name}
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.08 + i * 0.07 }}
        >
          {cert.badge
            ? <img src={cert.badge} alt="" className="w-9 h-9 rounded-lg object-contain flex-shrink-0 bg-gray-50 dark:bg-white/4 p-1" loading="lazy" />
            : <div className="w-9 h-9 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 flex-shrink-0" />
          }
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-tight line-clamp-2">{cert.name}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate mt-0.5">{cert.issuer}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </Panel>
);

// ── CONTACT panel ─────────────────────────────────────────────────
const ContactPanel = ({ hoveredPanel, setHoveredPanel }) => (
  <Panel id="contact" hoveredPanel={hoveredPanel} setHoveredPanel={setHoveredPanel}>
    <div className="flex items-center gap-1.5 mb-3">
      <MdAlternateEmail className="w-3 h-3 text-yellow-500/70 flex-shrink-0" />
      <PanelLabel>Contact</PanelLabel>
    </div>
    <div className="flex flex-col gap-2 flex-1">
      <a
        href={contactData.methods[0].link}
        className="group flex items-center justify-between px-2.5 py-2 rounded-lg bg-gray-50 dark:bg-white/4 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 border border-gray-100 dark:border-white/6 transition-all duration-200"
      >
        <div>
          <p className="text-[9px] text-gray-400 dark:text-gray-600 uppercase tracking-wide">Email</p>
          <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors truncate">
            {contactData.methods[0].value}
          </p>
        </div>
        <MdArrowOutward className="w-3 h-3 text-gray-300 dark:text-gray-700 group-hover:text-yellow-500 transition-colors flex-shrink-0" />
      </a>
      <a
        href={contactData.methods[1].link}
        className="group flex items-center justify-between px-2.5 py-2 rounded-lg bg-gray-50 dark:bg-white/4 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 border border-gray-100 dark:border-white/6 transition-all duration-200"
      >
        <div>
          <p className="text-[9px] text-gray-400 dark:text-gray-600 uppercase tracking-wide">Phone</p>
          <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors">
            {contactData.methods[1].value}
          </p>
        </div>
        <MdArrowOutward className="w-3 h-3 text-gray-300 dark:text-gray-700 group-hover:text-yellow-500 transition-colors flex-shrink-0" />
      </a>
      <div className="grid grid-cols-2 gap-1.5 mt-auto">
        {contactData.methods[2]?.socials?.map(social => {
          const Icon = social.icon === 'RiFacebookLine' ? RiFacebookLine : RiLinkedinLine;
          return (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              className="flex items-center justify-center px-2 py-1.5 rounded-lg bg-gray-50 dark:bg-white/4 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 border border-gray-100 dark:border-white/6 text-gray-500 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </div>
  </Panel>
);

// ── Layout size hook ──────────────────────────────────────────────
function useLayoutSize() {
  const getSize = () => {
    // Use outerWidth so browser zoom doesn't affect layout switching
    const w = window.outerWidth;
    return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  };
  const [size, setSize] = useState(getSize);
  useEffect(() => {
    const handler = () => setSize(getSize());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}

// ── ROOT APP ──────────────────────────────────────────────────────
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isCertsOpen, setIsCertsOpen] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const layoutSize = useLayoutSize();
  useCursorSpotlight();

  const anyModalOpen = isProjectsOpen || isSkillsOpen || isCertsOpen;
  useEffect(() => {
    if (anyModalOpen) {
      window.__lenis?.stop();
    } else {
      window.__lenis?.start();
    }
    return () => { window.__lenis?.start(); };
  }, [anyModalOpen]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080808] transition-colors duration-300">
      <CustomCursor />
      <FloatingNav onChatToggle={() => setIsChatOpen(!isChatOpen)} />
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Mobile */}
      {layoutSize === 'mobile' && (
        <div className="p-3 pb-28">
          <MobileLayout />
        </div>
      )}

      {/* Tablet layout (768–1023px) */}
      {layoutSize === 'tablet' && (
      <div
        className="flex gap-3"
        style={{
          height: '100vh',
          padding: 'clamp(12px, 2vw, 20px)',
          paddingBottom: '112px',
          pointerEvents: anyModalOpen ? 'none' : 'auto',
        }}
      >
        {/* Left — hero, sticky full height */}
        <div className="flex-shrink-0 h-full" style={{ width: 'clamp(200px, 36%, 280px)' }}>
          <FadeIn delay={0} className="h-full">
            <HeroPanel hoveredPanel={null} setHoveredPanel={null} />
          </FadeIn>
        </div>

        {/* Right — full height flex column, no scroll */}
        <div className="flex-1 h-full flex flex-col" style={{ gap: 'clamp(8px,1vw,12px)' }}>
          {/* Projects — natural height */}
          <FadeIn delay={0.1}>
            <TabletProjectsPanel onOpenModal={() => setIsProjectsOpen(true)} />
          </FadeIn>

          {/* Skills + Certs — grows to fill remaining space */}
          <div className="flex-1 grid grid-cols-2 min-h-0" style={{ gap: 'clamp(8px,1vw,12px)' }}>
            <FadeIn delay={0.18} className="h-full">
              <SkillsPanel onOpenModal={() => setIsSkillsOpen(true)} hoveredPanel={null} setHoveredPanel={null} />
            </FadeIn>
            <FadeIn delay={0.24} className="h-full">
              <CertsPanel onOpenModal={() => setIsCertsOpen(true)} hoveredPanel={null} setHoveredPanel={null} />
            </FadeIn>
          </div>

          {/* Contact — sits at the bottom, natural height */}
          <FadeIn delay={0.3}>
            <ContactPanel hoveredPanel={null} setHoveredPanel={null} />
          </FadeIn>
        </div>
      </div>
      )}

      {/* Desktop dashboard (1024px+) */}
      {layoutSize === 'desktop' && (
      <div
        className="p-5 lg:p-6"
        style={{ height: '100vh', paddingBottom: '112px', overflow: 'hidden', pointerEvents: anyModalOpen ? 'none' : 'auto' }}
      >
        <div
          className="w-full max-w-5xl mx-auto h-full grid gap-2.5"
          style={{
            gridTemplateColumns: '1fr 2fr',
            gridTemplateRows: '1fr 200px',
          }}
        >
          {/* Hero — left, full height */}
          <div style={{ gridColumn: '1', gridRow: '1 / 3' }} className="min-h-0">
            <FadeIn delay={0} className="h-full">
              <HeroPanel hoveredPanel={hoveredPanel} setHoveredPanel={setHoveredPanel} />
            </FadeIn>
          </div>

          {/* Projects — right top */}
          <div style={{ gridColumn: '2', gridRow: '1' }} className="min-h-0">
            <FadeIn delay={0.1} className="h-full">
              <ProjectsPanel
                onOpenModal={() => setIsProjectsOpen(true)}
                hoveredPanel={hoveredPanel}
                setHoveredPanel={setHoveredPanel}
              />
            </FadeIn>
          </div>

          {/* Bottom row */}
          <div style={{ gridColumn: '2', gridRow: '2' }}>
            <div className="grid grid-cols-3 gap-2.5 h-full">
              <FadeIn delay={0.18} className="h-full">
                <SkillsPanel onOpenModal={() => setIsSkillsOpen(true)} hoveredPanel={hoveredPanel} setHoveredPanel={setHoveredPanel} />
              </FadeIn>
              <FadeIn delay={0.24} className="h-full">
                <CertsPanel onOpenModal={() => setIsCertsOpen(true)} hoveredPanel={hoveredPanel} setHoveredPanel={setHoveredPanel} />
              </FadeIn>
              <FadeIn delay={0.3} className="h-full">
                <ContactPanel hoveredPanel={hoveredPanel} setHoveredPanel={setHoveredPanel} />
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Modals */}
      {isProjectsOpen && <Projects defaultOpen={true} onModalClose={() => setIsProjectsOpen(false)} />}
      {isSkillsOpen && <Skills defaultOpen={true} onModalClose={() => setIsSkillsOpen(false)} />}
      {isCertsOpen && <Certifications defaultOpen={true} onModalClose={() => setIsCertsOpen(false)} />}
    </div>
  );
}

export default App;
