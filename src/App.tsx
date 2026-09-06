import React, { useState, useEffect, useCallback } from 'react';
import { slidesData } from './data/analysisData';
import { ContinuousView } from './components/ContinuousView';
import { TableOfContentsModal } from './components/TableOfContentsModal';

export default function App() {
  const [isTOCOpen, setIsTOCOpen] = useState<boolean>(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Set clear light theme styling on body
  useEffect(() => {
    document.body.className =
      'bg-[#FDFCFB] text-[#1A1A1A] antialiased selection:bg-[#1A1A1A] selection:text-[#FDFCFB]';
  }, []);

  // Track scroll progress for hairline top indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to highlight current active section as user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const index = slidesData.findIndex((s) => s.id === id);
            if (index !== -1) {
              setActiveSectionIndex(index);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    slidesData.forEach((slide) => {
      const el = document.getElementById(slide.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to selected section
  const handleSelectSection = useCallback((index: number) => {
    setActiveSectionIndex(index);
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const slide = slidesData[index];
      if (slide) {
        const target = document.getElementById(slide.id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut: 'm' opens Table of Contents, 't' scrolls to top
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'm' || e.key === 'M' || e.key === 'צ') {
        setIsTOCOpen((prev) => !prev);
      } else if (e.key === 't' || e.key === 'T' || e.key === 'א') {
        scrollToTop();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans relative bg-grid-geometric bg-[#FDFCFB] text-[#1A1A1A]">
      {/* Subtle Hairline Top Reading Progress */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#1A1A1A]/70 z-50 transition-all duration-150 origin-right"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Main Continuous Document Scroll - Completely Clean Canvas */}
      <main className="w-full">
        <ContinuousView slides={slidesData} fontSize="normal" />
      </main>

      {/* Ultra-Minimal, Text-Free Side Meter (מד פרקים אלגנטי וכמעט בלתי נראה בצד) */}
      <nav
        aria-label="מד פרקים"
        className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1.5 py-3 px-1 rounded-full opacity-20 hover:opacity-85 transition-opacity duration-300 select-none"
      >
        {slidesData.map((slide, idx) => {
          const isActive = idx === activeSectionIndex;
          return (
            <button
              key={slide.id}
              onClick={() => handleSelectSection(idx)}
              className="p-1 focus:outline-none transition-transform hover:scale-125"
              title={`${slide.slideNumber}. ${slide.title}`}
              aria-label={`פרק ${slide.slideNumber}`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-1.5 h-3.5 bg-[#1A1A1A]'
                    : 'w-1 h-1 bg-[#1A1A1A]/50 hover:bg-[#1A1A1A]'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Table of Contents Modal (accessible via keyboard 'M' or clicking sections) */}
      <TableOfContentsModal
        isOpen={isTOCOpen}
        onClose={() => setIsTOCOpen(false)}
        slides={slidesData}
        currentSlideIndex={activeSectionIndex}
        onSelectSlide={handleSelectSection}
      />
    </div>
  );
}
