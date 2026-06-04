import { useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

let scrollLockCount = 0;

const BottomSheet = ({ open, onClose, children, title, icon: TitleIcon }) => {
  useLayoutEffect(() => {
    if (open) {
      scrollLockCount++;
      window.__lenis?.stop();
    }
    return () => {
      if (open) {
        scrollLockCount--;
        if (scrollLockCount <= 0) {
          scrollLockCount = 0;
          window.__lenis?.start();
        }
      }
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white dark:bg-[#0d0d0d] rounded-t-2xl overflow-hidden"
            style={{ maxHeight: '90svh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Handle */}
            <div className="flex-shrink-0 flex flex-col items-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-white/10" />
            </div>
            {/* Header */}
            {title && (
              <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-white/6">
                <div className="flex items-center gap-2">
                  {TitleIcon && <TitleIcon className="text-base text-yellow-500" />}
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{title}</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/8 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-bold"
                >
                  ×
                </button>
              </div>
            )}
            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
