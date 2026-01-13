import { useState, useEffect } from 'react';

const TypingAnimation = ({ 
  texts = [], 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  delayBetweenTexts = 2000,
  className = "" 
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const fullText = texts[currentTextIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delayBetweenTexts);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && currentText === fullText) {
      // Finished typing, pause before deleting
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === '') {
      // Finished deleting, move to next text
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentTextIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypingAnimation;
