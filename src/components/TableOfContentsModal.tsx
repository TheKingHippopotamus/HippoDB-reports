import React from 'react';
import { SlideItem } from '../types';
import { X, ChevronLeft } from 'lucide-react';
import { TopicIconBadge } from './IconHelper';

interface TableOfContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideItem[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  isWarmTheme?: boolean;
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  isOpen,
  onClose,
  slides,
  currentSlideIndex,
  onSelectSlide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-xl border-2 border-[#1A1A1A] bg-[#FDFCFB] text-[#1A1A1A] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-[#1A1A1A]/20 bg-[#F6F4EF]">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-neutral-500 block mb-0.5">
              INDEX // TABLE OF CONTENTS
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold italic">
              פרקי הניתוח המלא
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of chapters with bespoke topic SVG icons */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-1.5 custom-scrollbar">
          {slides.map((slide, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <button
                key={slide.id}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`w-full text-right p-3 rounded-lg border flex items-center justify-between gap-3 transition-all ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'hover:bg-[#F6F4EF] border-transparent text-[#1A1A1A]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs opacity-60 w-6 shrink-0">
                    {String(slide.slideNumber).padStart(2, '0')}
                  </span>
                  <TopicIconBadge
                    topic={`${slide.title} ${slide.category} ${slide.id}`}
                    className={`w-7 h-7 rounded border flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-[#1A1A1A]/20 bg-[#F6F4EF] text-[#1A1A1A]'
                    }`}
                    iconClassName={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#1A1A1A]'}`}
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider block opacity-70">
                      {slide.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-serif font-bold truncate">
                      {slide.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {slide.tag && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        isActive
                          ? 'border-white/40 text-white'
                          : 'border-[#1A1A1A]/30 text-[#1A1A1A]'
                      }`}
                    >
                      {slide.tag}
                    </span>
                  )}
                  <ChevronLeft className="w-4 h-4 opacity-50" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
