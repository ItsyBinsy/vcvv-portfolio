import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import FloatingNav from './components/FloatingNav';

function App() {
  return (
    <div className="min-h-screen p-3 md:p-8 pb-24 md:pb-8 bg-gray-50 dark:bg-[#000000] transition-colors duration-300">
      {/* Floating Navigation */}
      <FloatingNav />
      {/* Bento Grid Container */}
      <div className="max-w-5xl mx-auto">
        {/* TRUE Bento Puzzle Grid - 16 columns (Tighter gaps on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-16 gap-1.5 md:gap-2">
          {/* Row 1: Hero (10) + About (6) */}
          <div className="md:col-span-10">
            <Hero />
          </div>
          <div className="md:col-span-6">
            <About />
          </div>

          {/* Row 2: Projects (10) + Skills (6) - Projects overlap with Hero */}
          <div className="md:col-span-10 md:-mt-20">
            <Projects />
          </div>
          <div className="md:col-span-6">
            <Skills />
          </div>

          {/* Row 3: Certifications (10) + Contact (6) - Contact starts below Skills */}
          <div className="md:col-span-10 md:-mt-6">
            <Certifications />
          </div>
          <div className="md:col-span-6">
            <Contact />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            © 2026 Vince Carl Viaña. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
