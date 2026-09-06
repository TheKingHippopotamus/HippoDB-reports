import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideItem } from '../types';
import { SectionTaxonomyBadge } from './IconHelper';
import { DataTable } from './DataTable';
import { StockCard } from './StockCard';
import {
  MarginCompressionChart,
  AttentionDisparityChart,
  MechanismBreakdownDiagram,
} from './ResearchCharts';
import { ArrowLeft } from 'lucide-react';
import { documentMeta } from '../data/analysisData';

interface SlideViewProps {
  slide: SlideItem;
  direction: number;
  fontSize: 'normal' | 'large' | 'xlarge';
  onNextSlide?: () => void;
  isWarmTheme?: boolean;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.99,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.18 },
    },
  }),
};

export const SlideView: React.FC<SlideViewProps> = ({
  slide,
  direction,
  fontSize,
  onNextSlide,
}) => {
  const fontSizeClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-relaxed',
  };

  const isCover = slide.id === 'cover';
  const isMethodology = slide.id === 'methodology' || slide.slideNumber === 2;
  const isMechanism = slide.id === 'mechanism' || slide.slideNumber === 3;
  const isDataCenters = slide.id === 'data-centers' || slide.slideNumber === 12;
  const isSummary = slide.id === 'summary' || slide.slideNumber === 17;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start overflow-hidden px-0 sm:px-6 py-0 sm:py-6">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full max-w-5xl h-full flex flex-row rounded-none sm:rounded-xl border-0 sm:border-2 border-[#1A1A1A] shadow-none sm:shadow-2xl overflow-hidden relative bg-[#FDFCFB] text-[#1A1A1A]"
        >
          {/* Subtle architectural watermark (hidden on mobile to free up space) */}
          <div className="hidden sm:block absolute top-6 left-6 opacity-10 pointer-events-none select-none">
            <svg width="200" height="200" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.7" fill="none" />
              <path d="M0 50 L100 50 M50 0 L50 100" stroke="currentColor" strokeWidth="0.7" />
              <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="4" stroke="currentColor" strokeWidth="0.8" fill="none" />
            </svg>
          </div>

          {/* Left Vertical Architectural Rail (Desktop only) */}
          <aside className="hidden md:flex w-16 sm:w-20 border-l border-[#1A1A1A]/20 bg-[#F6F4EF] flex-col items-center justify-between py-8 px-2 shrink-0">
            <div className="writing-vertical-rl text-[10px] tracking-[0.4em] uppercase font-black opacity-60">
              SECTION — {String(slide.slideNumber).padStart(2, '0')}
            </div>

            <div className="w-[1px] h-24 bg-[#1A1A1A]/30 my-4" />

            <div className="flex flex-col gap-3.5 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
              <div className="w-2 h-2 rounded-full border border-[#1A1A1A] opacity-60" />
              <div className="w-2 h-2 rounded-full border border-[#1A1A1A] opacity-40" />
              <div className="w-2 h-2 rounded-full border border-[#1A1A1A] opacity-20" />
            </div>

            <SectionTaxonomyBadge
              sectionId={slide.id}
              slideNumber={slide.slideNumber}
              className="w-8 h-8 rounded border border-[#1A1A1A]/30 flex items-center justify-center mt-4 bg-white shadow-2xs"
              iconClassName="w-4 h-4 text-[#1A1A1A]"
            />
          </aside>

          {/* Main Content Area */}
          <section className="flex-1 flex flex-col p-4 sm:p-8 lg:p-10 min-w-0 overflow-hidden relative z-10">
            {/* Header / Section label */}
            <div className="pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#1A1A1A]/15 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <SectionTaxonomyBadge
                  sectionId={slide.id}
                  slideNumber={slide.slideNumber}
                  className="w-6 h-6 rounded border border-[#1A1A1A]/30 bg-[#F6F4EF] flex items-center justify-center shrink-0 md:hidden"
                  iconClassName="w-3 h-3 text-[#1A1A1A]"
                />
                <span className="w-6 sm:w-12 h-[1px] bg-[#1A1A1A]" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">
                  {slide.category}
                </span>
                {slide.tag && (
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border border-[#1A1A1A] bg-[#1A1A1A] text-white">
                    {slide.tag}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-black italic tracking-tight leading-[1.18] text-balance">
                {slide.title}
              </h2>

              {slide.subtitle && (
                <p className="mt-1 sm:mt-2 text-xs sm:text-base font-serif italic opacity-75 leading-relaxed">
                  {slide.subtitle}
                </p>
              )}
            </div>

            {/* Scrollable Container for All Text and Data */}
            <div className="flex-1 overflow-y-auto pr-0.5 pl-1 sm:pl-2 custom-scrollbar space-y-5">
              {/* Cover Slide Hero Image & Metrics Grid */}
              {isCover && (
                <>
                  <div className="w-full rounded-lg overflow-hidden border border-[#1A1A1A]/30 bg-neutral-100 shadow-xs">
                    <img
                      src="/src/assets/images/editorial_tariffs_cover_1788653421978.jpg"
                      alt="ניתוח מכסים ומניות: שרשראות אספקה ושחיקת מרווחים"
                      className="w-full h-40 sm:h-64 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-2 sm:p-2.5 text-[10px] sm:text-xs font-mono text-neutral-700 border-t border-[#1A1A1A]/20 bg-[#FAF9F7] flex items-center justify-between">
                      <span>Figure 1.0 — שרשראות אספקה, מכסים והמנוף התפעולי הנעלם</span>
                      <span className="font-bold">12,381 CALLS ANALYZED</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-2">
                    {documentMeta.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 sm:p-4 rounded-lg border border-[#1A1A1A] bg-white text-center"
                      >
                        <div className="text-xl sm:text-3xl font-mono font-bold">
                          {m.value}
                        </div>
                        <div className="text-[10px] sm:text-xs mt-1 font-semibold uppercase tracking-wider text-neutral-600">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Lead text */}
              {slide.content.lead && (
                <div className="p-3.5 sm:p-4 rounded-lg border border-[#1A1A1A]/40 bg-white font-serif italic text-base sm:text-lg leading-relaxed">
                  {slide.content.lead}
                </div>
              )}

              {/* Research Visual Chart for Methodology Slide */}
              {isMethodology && <AttentionDisparityChart />}

              {/* Research Visual Chart for Mechanism Breakdown Slide */}
              {isMechanism && (
                <>
                  <div className="w-full rounded-lg overflow-hidden border border-[#1A1A1A]/30 bg-neutral-100 shadow-xs">
                    <img
                      src="/src/assets/images/mechanism_margin_editorial_1788653436982.jpg"
                      alt="מנגנון שבירת העברת העלויות"
                      className="w-full h-36 sm:h-56 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-2 text-[10px] sm:text-xs font-mono text-neutral-700 border-t border-[#1A1A1A]/20 bg-[#FAF9F7]">
                      Figure 2.0 — מודל הגמישות: שבירת שיווי המשקל כתוצאה מהעלאת מחירים
                    </div>
                  </div>
                  <MechanismBreakdownDiagram />
                </>
              )}

              {/* Section 12: Data Centers & AI Grid Power Editorial Illustration */}
              {isDataCenters && (
                <div className="w-full rounded-lg overflow-hidden border border-[#1A1A1A]/30 bg-neutral-100 my-2 shadow-xs">
                  <img
                    src="/src/assets/images/datacenter_power_editorial_1788653450140.jpg"
                    alt="תשתיות דאטה סנטרים ורשת החשמל"
                    className="w-full h-36 sm:h-56 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-2 text-[10px] sm:text-xs font-mono text-neutral-700 border-t border-[#1A1A1A]/20 bg-[#FAF9F7]">
                    Figure 3.0 — AI Data Centers: עומסי רשת החשמל, דרישות גיבוי רציף והזדמנות הגנרטורים
                  </div>
                </div>
              )}

              {/* Research Visual Chart for Comparative Summary Slide */}
              {isSummary && <MarginCompressionChart />}

              {/* Paragraphs with high editorial readability */}
              {slide.content.paragraphs && (
                <div className="space-y-3.5 sm:space-y-4">
                  {slide.content.paragraphs.map((para, idx) => (
                    <p key={idx} className={`${fontSizeClasses[fontSize]} text-balance`}>
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {/* Quotes */}
              {slide.content.quotes &&
                slide.content.quotes.map((q, idx) => (
                  <blockquote
                    key={idx}
                    className="my-5 pr-5 border-r-2 border-[#1A1A1A] italic font-serif text-[#1A1A1A]"
                  >
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                      "{q.text}"
                    </p>
                    {q.source && (
                      <cite className="block mt-2 text-xs font-mono font-semibold text-neutral-600 not-italic">
                        — {q.source}
                      </cite>
                    )}
                  </blockquote>
                ))}

              {/* Tables */}
              {slide.content.tables &&
                slide.content.tables.map((table, idx) => (
                  <DataTable key={idx} config={table} />
                ))}

              {/* Bullet lists */}
              {slide.content.bulletLists &&
                slide.content.bulletLists.map((list, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-lg border border-[#1A1A1A]/30 bg-white my-3"
                  >
                    {list.title && (
                      <h3 className="text-base sm:text-lg font-bold mb-3 flex items-center gap-2">
                        <span className="w-3 h-[2px] bg-[#1A1A1A]" />
                        <span>{list.title}</span>
                      </h3>
                    )}
                    <ul className="space-y-2.5 sm:space-y-3">
                      {list.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 text-sm sm:text-base leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] mt-2 shrink-0 opacity-80" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

              {/* Detailed Stock Item */}
              {slide.content.stock && (
                <StockCard stock={slide.content.stock} />
              )}

              {/* Extra narrative sections */}
              {slide.content.extraSections &&
                slide.content.extraSections.map((section, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-lg border border-[#1A1A1A]/30 bg-white my-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-[1px] bg-[#1A1A1A] opacity-60" />
                      <h3 className="text-lg sm:text-xl font-bold font-serif italic">
                        {section.title}
                      </h3>
                    </div>
                    {section.subtitle && (
                      <p className="text-xs font-mono mb-2 text-neutral-500">
                        {section.subtitle}
                      </p>
                    )}
                    {Array.isArray(section.text) ? (
                      <div className="space-y-2.5">
                        {section.text.map((t, tIdx) => (
                          <p
                            key={tIdx}
                            className={`${fontSizeClasses[fontSize]} text-sm sm:text-base leading-relaxed`}
                          >
                            {t}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className={`${fontSizeClasses[fontSize]} text-sm sm:text-base leading-relaxed`}>
                        {section.text}
                      </p>
                    )}
                  </div>
                ))}
            </div>

            {/* Quick advance to next chapter */}
            {slide.slideNumber < 18 && onNextSlide && (
              <div className="pt-3 mt-2 border-t border-[#1A1A1A]/15 flex items-center justify-between text-xs opacity-60">
                <span className="font-mono text-[10px] tracking-wider uppercase">
                  NEXT SECTION: {slide.slideNumber + 1}
                </span>
                <button
                  onClick={onNextSlide}
                  className="flex items-center gap-1.5 font-bold uppercase tracking-wider hover:opacity-100 transition-opacity"
                >
                  <span>המשך לחלק הבא</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
