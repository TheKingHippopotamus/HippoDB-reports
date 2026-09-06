import React from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

interface SlideControlsProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  onOpenTOC?: () => void;
  isWarmTheme?: boolean;
}

export const SlideControls: React.FC<SlideControlsProps> = ({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onSelectSlide,
  onOpenTOC,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;

  return (
    <footer
      aria-label="ניווט פרקים"
      className="w-full border-t border-[#1A1A1A] py-3 sm:py-4 px-3 sm:px-10 bg-white text-[#1A1A1A] z-30 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left / Start: TOC button & Metadata */}
        <div className="flex items-center gap-2 sm:gap-6">
          {onOpenTOC && (
            <button
              onClick={onOpenTOC}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1A1A1A] bg-white hover:bg-neutral-100 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider transition-all"
              title="פתח תוכן עניינים (M)"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>פרקים</span>
              <span className="font-mono text-[10px] opacity-70">
                {String(currentIndex + 1).padStart(2, '0')}/{totalSlides}
              </span>
            </button>
          )}

          <div className="hidden lg:flex items-center gap-6">
            <div className="w-[1px] h-5 bg-[#1A1A1A]/20" />
            <div className="flex flex-col text-right">
              <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-neutral-500">
                ניתוח מחקר אישי
              </span>
              <span className="text-xs font-semibold">מהדורת מנויים בלעדית</span>
            </div>
          </div>
        </div>

        {/* Center: Geometric Dots Stepper */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[150px] sm:max-w-[340px] py-1 px-1 custom-scrollbar">
            {Array.from({ length: totalSlides }).map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => onSelectSlide(idx)}
                  className={`transition-all shrink-0 rounded-full ${
                    isActive
                      ? 'w-3 h-3 bg-[#1A1A1A]'
                      : 'w-2 h-2 border border-[#1A1A1A]/50 bg-transparent hover:bg-[#1A1A1A]/30'
                  }`}
                  title={`פרק ${idx + 1}`}
                  aria-label={`פרק ${idx + 1}`}
                />
              );
            })}
          </div>

          <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-600">
            SECTION — {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </div>
        </div>

        {/* Signature Geometric Balance Pill Navigation Buttons */}
        <nav className="flex border border-[#1A1A1A] rounded-full overflow-hidden shadow-sm">
          {/* Previous button (In RTL: right button goes backwards) */}
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`px-4 sm:px-7 py-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-1 transition-colors ${
              isFirst
                ? 'opacity-30 cursor-not-allowed bg-transparent'
                : 'bg-transparent text-[#1A1A1A] hover:bg-neutral-100 active:bg-neutral-200'
            }`}
            title="הקודם (חץ ימינה)"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            <span>הקודם</span>
          </button>

          {/* Next button (In RTL: left button goes forwards) */}
          <button
            onClick={onNext}
            disabled={isLast}
            className={`px-4 sm:px-7 py-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold border-r border-[#1A1A1A] flex items-center gap-1 transition-colors ${
              isLast
                ? 'opacity-30 cursor-not-allowed bg-neutral-200 text-neutral-500'
                : 'bg-[#1A1A1A] text-white hover:bg-neutral-800'
            }`}
            title="הבא (חץ שמאלה או רווח)"
          >
            <span>הבא</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </nav>
      </div>
    </footer>
  );
};
