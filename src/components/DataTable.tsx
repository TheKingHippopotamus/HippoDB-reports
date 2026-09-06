import React, { useState } from 'react';
import { DataTableConfig } from '../types';
import { LayoutList, Table as TableIcon } from 'lucide-react';
import { TopicIconBadge } from './IconHelper';

interface DataTableProps {
  config: DataTableConfig;
  isWarmTheme?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ config }) => {
  const [mobileView, setMobileView] = useState<'cards' | 'table'>('cards');

  return (
    <div className="w-full my-6 transition-colors">
      {/* Mobile view switcher header */}
      <div className="flex sm:hidden items-center justify-between pb-2.5 mb-2 border-b border-[#1A1A1A]/20">
        <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-600">
          טבלת נתונים ({config.rows.length} שורות)
        </span>
        <div className="flex border border-[#1A1A1A] rounded-full overflow-hidden text-[10px] font-bold">
          <button
            onClick={() => setMobileView('cards')}
            className={`px-2.5 py-1 flex items-center gap-1 transition-colors ${
              mobileView === 'cards'
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-white text-[#1A1A1A]'
            }`}
          >
            <LayoutList className="w-3 h-3" />
            <span>כרטיסים</span>
          </button>
          <button
            onClick={() => setMobileView('table')}
            className={`px-2.5 py-1 flex items-center gap-1 border-r border-[#1A1A1A] transition-colors ${
              mobileView === 'table'
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-white text-[#1A1A1A]'
            }`}
          >
            <TableIcon className="w-3 h-3" />
            <span>טבלה</span>
          </button>
        </div>
      </div>

      {/* 1. Mobile Smart Cards View (Optimized for Smartphones, no horizontal cutoffs) */}
      <div className={`${mobileView === 'cards' ? 'block sm:hidden' : 'hidden'} space-y-3`}>
        {config.rows.map((row, rowIdx) => {
          const isHighlighted = config.highlightRowIndex === rowIdx;
          const title = row[0];
          const remainingCols = row.slice(1);
          const remainingHeaders = config.headers.slice(1);

          return (
            <div
              key={rowIdx}
              className={`p-3.5 rounded-lg border transition-all ${
                isHighlighted
                  ? 'bg-[#F6F4EF] border-2 border-[#1A1A1A] shadow-sm'
                  : 'bg-white border border-[#1A1A1A]/30'
              }`}
            >
              {/* Primary entity/metric header with custom SVG topic icon */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1A1A1A]/15">
                <div className="flex items-center gap-2">
                  <TopicIconBadge
                    topic={title}
                    className="w-6 h-6 rounded border border-[#1A1A1A]/20 bg-[#F6F4EF] flex items-center justify-center shrink-0"
                    iconClassName="w-3.5 h-3.5 text-[#1A1A1A]"
                  />
                  <span className="font-serif font-black text-base italic text-[#1A1A1A]">
                    {title}
                  </span>
                </div>
                {isHighlighted && (
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#1A1A1A] text-white rounded-full">
                    תרחיש במוקד
                  </span>
                )}
              </div>

              {/* Key-Value details */}
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                {remainingCols.map((val, cIdx) => {
                  const headerLabel = remainingHeaders[cIdx] || '';
                  const isColHighlighted = config.highlightColumnIndex === cIdx + 1;

                  return (
                    <div
                      key={cIdx}
                      className="flex items-center justify-between py-1 border-b border-[#1A1A1A]/10 last:border-none"
                    >
                      <span className="font-semibold text-neutral-600">
                        {headerLabel}
                      </span>
                      <span
                        className={`font-mono font-medium ${
                          isColHighlighted
                            ? 'font-bold underline text-[#1A1A1A]'
                            : 'text-neutral-900'
                        }`}
                      >
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Desktop & Tablet Classical High-Contrast Table View (or when 'table' is selected on mobile) */}
      <div
        className={`${
          mobileView === 'table' ? 'block' : 'hidden sm:block'
        } overflow-hidden rounded-lg border-2 border-[#1A1A1A] bg-white`}
      >
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse text-right text-sm sm:text-base">
            <thead>
              <tr className="bg-[#1A1A1A] text-white border-b border-[#1A1A1A]">
                {config.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className={`py-3 px-4 sm:px-6 whitespace-nowrap text-right text-xs uppercase tracking-wider font-bold ${
                      idx === 0 ? 'sticky right-0 z-10 bg-[#1A1A1A]' : ''
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/15">
              {config.rows.map((row, rowIdx) => {
                const isHighlighted = config.highlightRowIndex === rowIdx;
                return (
                  <tr
                    key={rowIdx}
                    className={`transition-colors font-mono text-sm ${
                      isHighlighted
                        ? 'bg-[#F6F4EF] font-bold text-black border-r-4 border-[#1A1A1A]'
                        : 'hover:bg-neutral-50 odd:bg-white even:bg-[#FAF9F7]'
                    }`}
                  >
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className={`py-3 px-4 sm:px-6 whitespace-nowrap ${
                          cellIdx === 0
                            ? `font-sans font-semibold sticky right-0 z-10 ${
                                isHighlighted ? 'bg-[#F6F4EF]' : 'bg-white'
                              }`
                            : ''
                        } ${
                          cellIdx === config.highlightColumnIndex
                            ? 'font-bold underline text-[#1A1A1A]'
                            : ''
                        }`}
                      >
                        {cellIdx === 0 ? (
                          <div className="flex items-center gap-2">
                            <TopicIconBadge
                              topic={cell}
                              className="w-5 h-5 rounded border border-[#1A1A1A]/20 bg-[#F6F4EF] flex items-center justify-center shrink-0"
                              iconClassName="w-3 h-3 text-[#1A1A1A]"
                            />
                            <span>{cell}</span>
                          </div>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {config.caption && (
        <div className="py-2 px-1 text-[11px] font-mono text-neutral-600 border-t border-transparent">
          * {config.caption}
        </div>
      )}
    </div>
  );
};
