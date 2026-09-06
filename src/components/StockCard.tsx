import React, { useState } from 'react';
import { StockDetails } from '../types';
import { DataTable } from './DataTable';
import { AlertCircle, CheckCircle, Eye, Copy, Check, BarChart2 } from 'lucide-react';
import { getStockIndustryIcon } from './IconHelper';

interface StockCardProps {
  stock: StockDetails;
  isWarmTheme?: boolean;
}

export const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const [copied, setCopied] = useState(false);

  const copySummary = () => {
    const textToCopy = `${stock.ticker} — ${stock.name}\nמנגנון: ${stock.mechanism}\n${stock.reportSummary}\n${stock.whyItMatters}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const attentionRatioPercent =
    stock.attentionRatio.total > 0
      ? Math.round((stock.attentionRatio.asked / stock.attentionRatio.total) * 100)
      : 0;

  return (
    <div className="w-full rounded-none sm:rounded-lg border-0 sm:border-2 border-[#1A1A1A] p-1 sm:p-7 bg-transparent sm:bg-white text-[#1A1A1A] transition-all">
      {/* Header section with ticker and mechanism */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-[#1A1A1A]/20">
        <div className="flex items-center gap-3">
          {(() => {
            const IndustryIcon = getStockIndustryIcon(stock.ticker);
            return (
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border-2 border-[#1A1A1A] bg-[#F6F4EF] flex items-center justify-center shrink-0 shadow-xs"
                title={`${stock.ticker} - ${stock.name}`}
              >
                <IndustryIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A1A1A]" />
              </div>
            );
          })()}
          <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded font-mono font-bold text-base sm:text-lg tracking-wider bg-[#1A1A1A] text-white">
            {stock.ticker}
          </div>
          <div>
            <h3 className="text-lg sm:text-2xl font-serif font-black italic tracking-tight">
              {stock.name}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600">
              {stock.description}
            </p>
          </div>
        </div>

        <button
          onClick={copySummary}
          title="העתק תמצית ניתוח"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#1A1A1A] hover:bg-neutral-100 text-[#1A1A1A] text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'הועתק!' : 'העתק תמצית'}</span>
        </button>
      </div>

      {/* Mechanism highlight banner */}
      <div className="mt-4 sm:mt-5 p-3 sm:p-4 rounded-lg border border-[#1A1A1A]/30 bg-[#F6F4EF] text-[#1A1A1A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div className="flex items-start gap-2">
          <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0 opacity-80" />
          <div>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] block text-neutral-500">
              מנגנון השבירה
            </span>
            <span className="font-bold text-sm sm:text-lg font-serif italic">
              {stock.mechanism}
            </span>
          </div>
        </div>

        {/* Attention meter badge */}
        <div
          className={`px-2.5 py-1 rounded-full border text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1.5 ${
            stock.attentionRatio.asked === 0
              ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
              : 'border-[#1A1A1A]/40 bg-white text-[#1A1A1A]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>
            קשב אנליסטים: <strong>{stock.attentionRatio.asked}/{stock.attentionRatio.total}</strong> ({attentionRatioPercent}%)
          </span>
        </div>
      </div>

      {/* Main Analysis Sections */}
      <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 sm:w-6 h-[1px] bg-[#1A1A1A] opacity-50" />
            <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600">
              מה קרה בדוח?
            </h4>
          </div>
          <p className="text-base sm:text-lg leading-relaxed font-serif">
            {stock.reportSummary}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 sm:w-6 h-[1px] bg-[#1A1A1A] opacity-50" />
            <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600">
              למה זה משנה?
            </h4>
          </div>
          <p className="text-base sm:text-lg leading-relaxed font-serif">
            {stock.whyItMatters}
          </p>
        </div>

        {stock.customDetail && (
          <div className="p-3 sm:p-4 rounded-lg border border-[#1A1A1A]/30 bg-[#F6F4EF] text-sm sm:text-base leading-relaxed">
            {stock.customDetail}
          </div>
        )}

        {/* Tables rendered with smart smartphone cards */}
        {stock.tableData && (
          <DataTable config={stock.tableData} />
        )}

        {stock.keyNumbers && stock.keyNumbers.length > 0 && (
          <div className="pt-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 sm:w-6 h-[1px] bg-[#1A1A1A] opacity-50" />
              <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                נתונים מספריים בולטים בדוח:
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {stock.keyNumbers.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:p-3 rounded-lg border border-[#1A1A1A]/20 bg-[#FDFCFB] text-xs sm:text-sm flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] mt-1.5 shrink-0 opacity-80" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Triggers and Invalidations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-2">
          <div className="p-3.5 sm:p-4 rounded-lg border border-[#1A1A1A]/40 bg-neutral-50">
            <div className="flex items-center gap-1.5 mb-1.5 font-bold text-xs uppercase tracking-wider text-red-900">
              <AlertCircle className="w-4 h-4 text-red-700" />
              <span>מה צריך לקרות כדי שזה יתפוצץ:</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-serif text-neutral-900">
              {stock.triggerToExplode}
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-lg border border-[#1A1A1A]/40 bg-neutral-50">
            <div className="flex items-center gap-1.5 mb-1.5 font-bold text-xs uppercase tracking-wider text-emerald-900">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>מה יפריך את התזה:</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-serif text-neutral-900">
              {stock.invalidation}
            </p>
          </div>
        </div>

        {stock.extraQuotes && stock.extraQuotes.length > 0 && (
          <div className="pt-2">
            {stock.extraQuotes.map((q, idx) => (
              <blockquote
                key={idx}
                className="border-r-2 border-[#1A1A1A] pr-3.5 py-1 text-xs sm:text-sm italic font-serif text-neutral-700 my-2"
              >
                "{q}"
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
