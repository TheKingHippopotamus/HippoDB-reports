import React from 'react';
import { SlideItem } from '../types';
import { DataTable } from './DataTable';
import { StockCard } from './StockCard';
import { documentMeta } from '../data/analysisData';
import {
  MarginCompressionChart,
  AttentionDisparityChart,
  MechanismBreakdownDiagram,
} from './ResearchCharts';
import { TopicIconBadge } from './IconHelper';
import { ArrowUp, Printer } from 'lucide-react';

interface ContinuousViewProps {
  slides: SlideItem[];
  fontSize?: 'normal' | 'large' | 'xlarge';
}

export const ContinuousView: React.FC<ContinuousViewProps> = ({
  slides,
  fontSize = 'normal',
}) => {
  const fontSizeClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-relaxed',
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="max-w-4xl mx-auto px-2 sm:px-8 py-4 sm:py-12 space-y-8 sm:space-y-12">
      {/* Top Banner / Document Header */}
      <header
        id="section-cover"
        className="p-4 sm:p-10 rounded-none sm:rounded-xl border-0 sm:border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] shadow-none sm:shadow-md relative overflow-hidden"
      >
        {/* Subtle geometric watermark (desktop only) */}
        <div className="hidden sm:block absolute top-4 left-4 opacity-5 pointer-events-none select-none">
          <svg width="180" height="180" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <path d="M0 50 L100 50 M50 0 L50 100" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#1A1A1A] opacity-60" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-neutral-500">
              VOLUME 01 // PERSONAL RESEARCH ANALYSIS
            </span>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#1A1A1A] bg-white hover:bg-neutral-100 text-[#1A1A1A] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">הדפס / שמור כ-PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>

        <div className="flex items-start gap-3.5 sm:gap-4">
          <TopicIconBadge
            topic="מכסים ומדיניות סחר כלכלית"
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl border-2 border-[#1A1A1A] bg-[#F6F4EF] flex items-center justify-center shrink-0 shadow-xs mt-1"
            iconClassName="w-6 h-6 sm:w-8 sm:h-8 text-[#1A1A1A]"
          />
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black italic tracking-tight leading-[1.15]">
              {documentMeta.mainTitle}
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg font-serif italic text-neutral-700 leading-relaxed">
              {documentMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Hero Architectural Research Image */}
        <div className="mt-6 rounded-lg overflow-hidden border border-[#1A1A1A]/30 bg-neutral-100">
          <img
            src="/src/assets/images/tariff_analysis_hero_1788652159445.jpg"
            alt="ניתוח מכסים ומניות: שרשראות אספקה ושחיקת מרווחים"
            className="w-full h-44 sm:h-72 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="p-2.5 text-[10px] sm:text-xs font-mono text-neutral-700 border-t border-[#1A1A1A]/20 bg-[#FAF9F7] flex items-center justify-between">
            <span>Figure 1.0 — שרשראות אספקה, מכסים והמנוף התפעולי הנעלם</span>
            <span className="font-bold">12,381 CALLS ANALYZED</span>
          </div>
        </div>

        {/* Metrics summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6">
          {documentMeta.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-3.5 rounded border border-[#1A1A1A]/30 bg-[#FDFCFB] text-center"
            >
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#1A1A1A]">
                {m.value}
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-neutral-600 mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Render each section in continuous document flow */}
      {slides.slice(1).map((slide) => {
        const isMethodology = slide.id === 'methodology' || slide.slideNumber === 2;
        const isMechanism = slide.id === 'mechanism' || slide.slideNumber === 3;
        const isSummary = slide.id === 'summary' || slide.slideNumber === 17;

        return (
          <section
            key={slide.id}
            id={slide.id}
            data-section-index={slide.slideNumber}
            className="scroll-mt-6 p-3 sm:p-10 rounded-none sm:rounded-xl border-0 sm:border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] shadow-none sm:shadow-sm transition-colors"
          >
            {/* Chapter header */}
            <div className="pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-[#1A1A1A]/15">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 sm:w-8 h-[1px] bg-[#1A1A1A] opacity-60" />
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                    SECTION — {String(slide.slideNumber).padStart(2, '0')} // {slide.category}
                  </span>
                </div>
                {slide.tag && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[#1A1A1A] bg-[#1A1A1A] text-white">
                    {slide.tag}
                  </span>
                )}
              </div>

              {/* Title with matching bespoke SVG topic icon */}
              <div className="flex items-start sm:items-center gap-3">
                <TopicIconBadge
                  topic={`${slide.title} ${slide.category} ${slide.id}`}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-[#1A1A1A] bg-[#F6F4EF] flex items-center justify-center shrink-0 shadow-2xs mt-0.5 sm:mt-0"
                  iconClassName="w-4 h-4 sm:w-5 sm:h-5 text-[#1A1A1A]"
                />
                <h2 className="text-xl sm:text-3xl font-serif font-black italic tracking-tight text-balance">
                  {slide.title}
                </h2>
              </div>

              {slide.subtitle && (
                <p className="mt-1.5 sm:mt-2 mr-11 sm:mr-13 text-xs sm:text-base font-serif italic opacity-75 leading-relaxed">
                  {slide.subtitle}
                </p>
              )}
            </div>

            {/* Lead */}
            {slide.content.lead && (
              <div className="p-3.5 sm:p-4 rounded border border-[#1A1A1A]/30 mb-5 sm:mb-6 font-serif italic text-base sm:text-lg bg-[#F6F4EF] text-[#1A1A1A]">
                {slide.content.lead}
              </div>
            )}

            {/* Visual Research Chart for Methodology */}
            {isMethodology && <AttentionDisparityChart />}

            {/* Visual Research Chart and Image for Mechanism */}
            {isMechanism && (
              <>
                <div className="w-full rounded-lg overflow-hidden border border-[#1A1A1A]/30 bg-neutral-100 my-4">
                  <img
                    src="/src/assets/images/mechanism_breakdown_1788652174112.jpg"
                    alt="מנגנון שבירת העברת העלויות"
                    className="w-full h-40 sm:h-60 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-2 text-[10px] sm:text-xs font-mono text-neutral-700 border-t border-[#1A1A1A]/20 bg-[#FAF9F7]">
                    Figure 2.0 — מודל הגמישות: שבירת שיווי המשקל כתוצאה מהעלאת מחירים
                  </div>
                </div>
                <MechanismBreakdownDiagram />
              </>
            )}

            {/* Visual Research Chart for Comparative Summary */}
            {isSummary && <MarginCompressionChart />}

            {/* Paragraphs */}
            <div className="space-y-3.5 sm:space-y-4 mb-6">
              {slide.content.paragraphs &&
                slide.content.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className={`${fontSizeClasses[fontSize]} text-balance`}>
                    {para}
                  </p>
                ))}
            </div>

            {/* Quotes */}
            {slide.content.quotes &&
              slide.content.quotes.map((q, qIdx) => (
                <blockquote
                  key={qIdx}
                  className="my-5 sm:my-6 pr-4 sm:pr-6 border-r-2 border-[#1A1A1A] italic font-serif leading-relaxed"
                >
                  <p className="text-base sm:text-lg md:text-xl">
                    "{q.text}"
                  </p>
                  {q.source && (
                    <cite className="block mt-2 text-xs font-mono font-semibold text-neutral-600 not-italic">
                      — {q.source}
                    </cite>
                  )}
                </blockquote>
              ))}

            {/* Tables (Responsive mobile cards & desktop table with topic icons) */}
            {slide.content.tables &&
              slide.content.tables.map((table, tIdx) => (
                <DataTable key={tIdx} config={table} />
              ))}

            {/* Bullet lists with bespoke topic icons */}
            {slide.content.bulletLists &&
              slide.content.bulletLists.map((list, bIdx) => (
                <div
                  key={bIdx}
                  className="p-4 sm:p-5 rounded border border-[#1A1A1A]/30 my-5 sm:my-6 bg-[#F6F4EF]"
                >
                  {list.title && (
                    <h3 className="text-base sm:text-lg font-bold mb-3 flex items-center gap-2">
                      <TopicIconBadge
                        topic={list.title}
                        className="w-6 h-6 rounded border border-[#1A1A1A]/30 bg-white flex items-center justify-center shrink-0"
                        iconClassName="w-3.5 h-3.5 text-[#1A1A1A]"
                      />
                      <span>{list.title}</span>
                    </h3>
                  )}
                  <ul className="space-y-2.5 sm:space-y-3">
                    {list.items.map((item, itmIdx) => (
                      <li key={itmIdx} className="flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] mt-2 shrink-0 opacity-80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            {/* Stock breakdown */}
            {slide.content.stock && (
              <StockCard stock={slide.content.stock} />
            )}

            {/* Extra Sections with bespoke topic icons */}
            {slide.content.extraSections &&
              slide.content.extraSections.map((section, eIdx) => (
                <div
                  key={eIdx}
                  className="p-4 sm:p-5 rounded border border-[#1A1A1A]/30 my-5 sm:my-6 bg-[#F6F4EF]"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <TopicIconBadge
                      topic={section.title}
                      className="w-6 h-6 rounded border border-[#1A1A1A]/30 bg-white flex items-center justify-center shrink-0"
                      iconClassName="w-3.5 h-3.5 text-[#1A1A1A]"
                    />
                    <h3 className="text-lg sm:text-xl font-bold font-serif italic">
                      {section.title}
                    </h3>
                  </div>

                  {section.subtitle && (
                    <p className="text-xs font-mono text-neutral-600 mb-2 mr-8">
                      {section.subtitle}
                    </p>
                  )}
                  {Array.isArray(section.text) ? (
                    <div className="space-y-2.5 mr-8">
                      {section.text.map((t, tIdx) => (
                        <p key={tIdx} className={`${fontSizeClasses[fontSize]} text-sm sm:text-base leading-relaxed`}>
                          {t}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className={`${fontSizeClasses[fontSize]} text-sm sm:text-base leading-relaxed mr-8`}>
                      {section.text}
                    </p>
                  )}
                </div>
              ))}
          </section>
        );
      })}

      {/* Floating / Bottom Scroll to Top Button */}
      <div className="flex justify-center pt-6 pb-16">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#1A1A1A] text-xs font-bold uppercase tracking-widest bg-[#1A1A1A] text-white hover:bg-black transition-all shadow-md"
        >
          <ArrowUp className="w-4 h-4" />
          <span>חזרה לראש המסמך</span>
        </button>
      </div>
    </article>
  );
};
