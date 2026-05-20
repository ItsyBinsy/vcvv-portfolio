import { useState, useEffect } from 'react';
import CertCard from '../components/CertCard';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/dialog';
import { certificationsData } from '../utils/data';
import { MdVerified, MdOpenInNew } from 'react-icons/md';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const Certifications = ({ defaultOpen = false, onModalClose } = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultOpen);
  const handleModalChange = (open) => { setIsModalOpen(open); if (!open) onModalClose?.(); };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(certificationsData[0]);

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
      const cards = container.querySelectorAll('[data-cert-index]');
      if (!cards.length) return;
      const index = Math.round(container.scrollLeft / cards[0].offsetWidth) % certificationsData.length;
      if (index !== lastIndex) {
        lastIndex = index;
        requestAnimationFrame(() => setCurrentIndex(index));
      }
    };

    container.addEventListener('scroll', updateIndex);
    updateIndex();
    return () => container.removeEventListener('scroll', updateIndex);
  }, [certificationsData.length]);

  const goToSlide = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    userScrollingRef.current = true;
    if (animationFrameRef.current) { cancelAnimationFrame(animationFrameRef.current); animationFrameRef.current = null; }

    const cards = container.querySelectorAll('[data-cert-index]');
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

  // Preload all cert images when modal opens
  useEffect(() => {
    if (!isModalOpen) return;
    certificationsData.forEach(cert => {
      const src = cert.preview || cert.badge;
      if (src) { const img = new Image(); img.src = src; }
    });
  }, [isModalOpen]);

  if (!certificationsData?.length) return null;

  // Group certifications by year
  const grouped = certificationsData.reduce((acc, cert) => {
    const year = cert.date.split(' ').pop();
    if (!acc[year]) acc[year] = [];
    acc[year].push(cert);
    return acc;
  }, {});
  const sortedYears = Object.keys(grouped).sort((a, b) => b - a);

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

      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-3 pb-2 overflow-x-scroll scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x',
            willChange: 'scroll-position',
            transform: 'translateZ(0)',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {certificationsData.map((cert, index) => (
            <div key={`original-${index}`} className="flex-shrink-0" data-cert-index={index}>
              <CertCard name={cert.name} issuer={cert.issuer} date={cert.date} badge={cert.badge} link={cert.link} />
            </div>
          ))}
          {certificationsData.map((cert, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0">
              <CertCard name={cert.name} issuer={cert.issuer} date={cert.date} badge={cert.badge} link={cert.link} />
            </div>
          ))}
        </div>

        <div className="relative z-10 flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4">
          {certificationsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-[width,background-color] duration-300 ease-out rounded-full cursor-pointer hover:bg-yellow-400 will-change-[width] ${
                index === currentIndex
                  ? 'w-6 md:w-8 h-1.5 md:h-2 bg-yellow-500'
                  : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-300 dark:bg-gray-800'
              }`}
              aria-label={`Go to certification ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Master-detail: timeline list + credential preview */}
      <Dialog open={isModalOpen} onOpenChange={handleModalChange}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-xl max-h-[88vh] gap-0 p-0 overflow-hidden dark:bg-[#0d0d0d] bg-white">
          <DialogTitle className="sr-only">Certifications & Achievements</DialogTitle>

          <div className="flex" style={{ height: '88vh' }}>
            {/* Left: timeline list */}
            <div className="w-60 flex-shrink-0 flex flex-col border-r border-gray-100 dark:border-white/6 overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100 dark:border-white/6 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <MdVerified className="text-yellow-500 text-base flex-shrink-0" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white tracking-wide uppercase">Credentials</span>
                  <span className="ml-auto text-[10px] text-gray-400 dark:text-gray-500 font-medium">{certificationsData.length}</span>
                </div>
              </div>

              {/* Timeline grouped by year */}
              <div className="overflow-y-auto flex-1 modal-scrollbar px-3 py-3 space-y-4">
                {sortedYears.map(year => (
                  <div key={year}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">{year}</span>
                      <div className="flex-1 h-px bg-gray-100 dark:bg-white/6" />
                    </div>
                    <div className="space-y-1">
                      {grouped[year].map((cert, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedCert(cert)}
                          className={`w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-150 group ${
                            selectedCert?.name === cert.name
                              ? 'bg-yellow-50 dark:bg-yellow-900/15 ring-1 ring-yellow-200 dark:ring-yellow-800/40'
                              : 'hover:bg-gray-50 dark:hover:bg-white/4'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-white/8 flex items-center justify-center p-1">
                            <img src={cert.badge} alt="" className="w-full h-full object-contain" loading="lazy" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-[11px] font-semibold leading-tight line-clamp-2 transition-colors ${
                              selectedCert?.name === cert.name
                                ? 'text-yellow-700 dark:text-yellow-400'
                                : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                            }`}>
                              {cert.name}
                            </p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">{cert.issuer}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: credential preview */}
            {selectedCert && (
              <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Full cert image — same treatment as project screenshots */}
                <div className="flex-shrink-0 relative overflow-hidden border-b border-gray-100 dark:border-white/6 bg-gray-50 dark:bg-white/4" style={{ height: '200px' }}>
                  <img
                    src={selectedCert.preview || selectedCert.badge}
                    alt={selectedCert.name}
                    className="absolute inset-0 w-full h-full object-contain object-center"
                  />
                </div>

                {/* Info below image */}
                <div className="flex-1 flex flex-col items-center justify-center px-6 py-5 relative min-h-0 overflow-hidden">
                  <div className="text-center space-y-2 w-full max-w-[240px]">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">{selectedCert.name}</h3>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{selectedCert.issuer}</p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-900/25 border border-yellow-200 dark:border-yellow-800/50">
                      <MdVerified className="text-yellow-500 w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400">{selectedCert.date}</span>
                    </div>

                    {selectedCert.link && selectedCert.link !== '#' && (
                      <div className="pt-1">
                        <a
                          href={selectedCert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors shadow-md"
                        >
                          <MdOpenInNew className="w-3.5 h-3.5" />
                          View Credential
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom: count + dots + arrows — matches Projects footer */}
                <div className="flex-shrink-0 px-5 py-2.5 border-t border-gray-100 dark:border-white/6 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {certificationsData.indexOf(selectedCert) + 1} of {certificationsData.length}
                  </span>
                  <div />
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        const i = certificationsData.indexOf(selectedCert);
                        setSelectedCert(certificationsData[(i - 1 + certificationsData.length) % certificationsData.length]);
                      }}
                      className="p-1 rounded text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors text-xs"
                    >←</button>
                    <button
                      onClick={() => {
                        const i = certificationsData.indexOf(selectedCert);
                        setSelectedCert(certificationsData[(i + 1) % certificationsData.length]);
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
    </div>
  );
};

export default Certifications;
