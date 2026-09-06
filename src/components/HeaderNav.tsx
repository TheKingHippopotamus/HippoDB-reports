import React, { useState } from 'react';
import { SlideItem } from '../types';
import {
  Menu,
  Sun,
  Moon,
  BookOpen,
  Presentation,
  Type,
  Share2,
  Check,
  FileText,
} from 'lucide-react';

interface HeaderNavProps {
  currentSlide: SlideItem;
  currentIndex: number;
  totalSlides: number;
  onOpenTOC: () => void;
  viewMode: 'slides' | 'continuous';
  onToggleViewMode: () => void;
  isWarmTheme: boolean;
  onToggleTheme: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentSlide,
  currentIndex,
  totalSlides,
  onOpenTOC,
  viewMode,
  onToggleViewMode,
  isWarmTheme,
  onToggleTheme,
  fontSize,
  onChangeFontSize,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = Math.round(((currentIndex + 1) / totalSlides) * 100);

  const cycleFontSize = () => {
    if (fontSize === 'normal') onChangeFontSize('large');
    else if (fontSize === 'large') onChangeFontSize('xlarge');
    else onChangeFontSize('normal');
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors ${
        isWarmTheme
          ? 'bg-[#FDFCFB]/95 border-[#1A1A1A] text-[#1A1A1A]'
          : 'bg-[#0F1115]/95 border-[#333842] text-[#FDFCFB]'
      }`}
    >
      {/* Geometric progress line */}
      <div className="w-full h-[2px] bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ease-out ${
            isWarmTheme ? 'bg-[#1A1A1A]' : 'bg-[#FDFCFB]'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        {/* Right side: Volume tag, Section & Brand */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <button
            onClick={onOpenTOC}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
              isWarmTheme
                ? 'bg-white hover:bg-neutral-100 border-[#1A1A1A] text-[#1A1A1A]'
                : 'bg-[#16191F] hover:bg-[#1E232B] border-[#444B57] text-[#FDFCFB]'
            }`}
            title="פתח תוכן עניינים (קיצור: M)"
          >
            <Menu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">פרקים</span>
            <span className="font-mono text-[10px] opacity-75">
              {String(currentIndex + 1).padStart(2, '0')}/{totalSlides}
            </span>
          </button>

          <div className="hidden md:block w-[1px] h-6 bg-current opacity-20" />

          {/* Current chapter information with Geometric Balance typography */}
          <div className="min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.25em] uppercase font-black opacity-60 truncate">
                SECTION — {String(currentIndex + 1).padStart(2, '0')} // {currentSlide.category}
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold font-serif italic truncate leading-snug mt-0.5 max-w-[200px] sm:max-w-[340px] lg:max-w-[480px]">
              {currentSlide.title}
            </h1>
          </div>
        </div>

        {/* Left side: Reading Time, View Mode, Font Size, Theme, Share */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Reading Time badge from Design */}
          <div className="hidden lg:flex flex-col items-end pl-2 border-l border-current/20">
            <span className="text-[9px] tracking-[0.2em] uppercase font-bold opacity-60">
              זמן קריאה משוער
            </span>
            <span className="text-xs font-mono italic opacity-90">15 דקות</span>
          </div>

          {/* View mode toggle - Geometric pill button */}
          <div
            className={`flex border rounded-full overflow-hidden text-xs font-bold tracking-wider ${
              isWarmTheme ? 'border-[#1A1A1A]' : 'border-[#444B57]'
            }`}
          >
            <button
              onClick={onToggleViewMode}
              className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                viewMode === 'slides'
                  ? isWarmTheme
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-[#FDFCFB] text-[#0F1115]'
                  : isWarmTheme
                  ? 'bg-transparent text-[#1A1A1A] hover:bg-neutral-100'
                  : 'bg-transparent text-[#FDFCFB] hover:bg-[#1E232B]'
              }`}
              title="מצב שקופיות"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">שקופיות</span>
            </button>
            <button
              onClick={onToggleViewMode}
              className={`px-3 py-1.5 flex items-center gap-1.5 border-r transition-colors ${
                isWarmTheme ? 'border-[#1A1A1A]' : 'border-[#444B57]'
              } ${
                viewMode === 'continuous'
                  ? isWarmTheme
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-[#FDFCFB] text-[#0F1115]'
                  : isWarmTheme
                  ? 'bg-transparent text-[#1A1A1A] hover:bg-neutral-100'
                  : 'bg-transparent text-[#FDFCFB] hover:bg-[#1E232B]'
              }`}
              title="מצב קריאה רציפה"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">רציף</span>
            </button>
          </div>

          {/* Font size adjuster */}
          <button
            onClick={cycleFontSize}
            className={`p-2 rounded-full border transition-colors ${
              isWarmTheme
                ? 'bg-white hover:bg-neutral-100 border-[#1A1A1A] text-[#1A1A1A]'
                : 'bg-[#16191F] hover:bg-[#1E232B] border-[#444B57] text-[#FDFCFB]'
            }`}
            title={`שנה גודל גופן (נוכחי: ${fontSize === 'normal' ? '1x' : fontSize === 'large' ? '1.2x' : '1.4x'})`}
          >
            <div className="flex items-center gap-0.5">
              <Type className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono font-bold">
                {fontSize === 'normal' ? '1' : fontSize === 'large' ? '2' : '3'}
              </span>
            </div>
          </button>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full border transition-colors ${
              isWarmTheme
                ? 'bg-white hover:bg-neutral-100 border-[#1A1A1A] text-[#1A1A1A]'
                : 'bg-[#16191F] hover:bg-[#1E232B] border-[#444B57] text-[#FDFCFB]'
            }`}
            title={isWarmTheme ? 'עבור למצב כהה' : 'עבור למצב נייר חם'}
          >
            {isWarmTheme ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isWarmTheme
                ? 'bg-[#1A1A1A] text-white hover:bg-neutral-800'
                : 'bg-[#FDFCFB] text-[#0F1115] hover:bg-neutral-200'
            }`}
            title="העתק קישור למסמך"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
