import { motion } from 'framer-motion';
import { MdDownload, MdArrowOutward } from 'react-icons/md';
import { heroData } from '../utils/data';
import { useDarkMode } from '../context/DarkModeContext';
import TypingAnimation from '../components/TypingAnimation';

const Hero = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <section className="relative pt-16 pb-4 overflow-hidden">

      {/* ── Top meta row ── */}
      <motion.div
        className="flex items-center justify-between mb-10"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600 tracking-widest uppercase">
          Portfolio · 2026
        </span>
        {/* OJT badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-[11px] font-semibold">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          Available for OJT
        </div>
      </motion.div>

      {/* ── Name block — the centrepiece ── */}
      <div className="relative mb-6">
        <motion.p
          className="text-[11px] font-mono text-gray-400 dark:text-gray-600 tracking-widest uppercase mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {heroData.tagline}
        </motion.p>

        {/* Giant name — clips in from bottom */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.9] tracking-tight text-gray-900 dark:text-white"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {heroData.name}
          </motion.h1>
        </div>

        {/* Photo — floats in from right, overlaps the name area */}
        <motion.div
          className="absolute right-0 top-0 w-36 h-44 lg:w-44 lg:h-56 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl"
          initial={{ opacity: 0, x: 32, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={isDarkMode ? heroData.image.dark : heroData.image.light}
            alt={heroData.name}
            className="w-full h-full object-cover"
            fetchPriority="high"
            style={{ objectPosition: '50% 8%' }}
          />
        </motion.div>
      </div>

      {/* ── Role + edu row ── */}
      <motion.div
        className="flex flex-wrap items-center gap-3 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        {/* Typing role */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/6 border border-gray-200 dark:border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            <TypingAnimation
              texts={['Web & Mobile App Developer', 'QA & Software Tester', 'Full-Stack Developer']}
              typingSpeed={75}
              deletingSpeed={45}
              delayBetweenTexts={2200}
            />
          </span>
        </div>

        <span className="text-gray-300 dark:text-gray-700 text-sm">·</span>

        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 dark:text-gray-600">{heroData.education}</span>
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{heroData.university}</span>
        </div>
      </motion.div>

      {/* ── CTA row ── */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <a
          href="/CV_VinceCarl_Viana.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500 text-white text-xs font-bold hover:-translate-y-0.5 overflow-hidden transition-all duration-200 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-500"
        >
          <MdDownload className="w-3.5 h-3.5" />
          View CV
        </a>
        <a
          href="mailto:vincecvviana@gmail.com"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/30 text-xs font-semibold transition-all duration-200"
        >
          Get in touch
          <MdArrowOutward className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </motion.div>

      {/* ── Divider line ── */}
      <motion.div
        className="mt-14 border-t border-gray-100 dark:border-white/6"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </section>
  );
};

export default Hero;
