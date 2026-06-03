import { useState } from 'react';

const ImageWithSkeleton = ({ src, alt, className, containerClassName, style }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName || ''}`} style={style}>
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-white/8 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt || ''}
        className={`${className || ''} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
