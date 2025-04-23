"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
  autoplayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
}

export default function ImageCarousel({
  images,
  autoplayInterval = 5000,
  showIndicators = true,
  showArrows = true,
  className = '',
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoplayInterval > 0) {
      const interval = setInterval(goToNext, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplayInterval]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-2xl ${className}`}>
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover hover:brightness-105 transition-all duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none z-20"></div>
      </div>

      {showArrows && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Previous slide"
            suppressHydrationWarning
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Next slide"
            suppressHydrationWarning
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {showIndicators && (
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to slide ${index + 1}`}
              suppressHydrationWarning
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}