import React, { useState } from 'react';
import { BarChart3, TrendingDown, EyeOff, Layers, Info } from 'lucide-react';

interface MarginData {
  ticker: string;
  name: string;
  baseMargin: number;
  tariffCompression: number;
  adjustedMargin: number;
  segment: string;
}

const marginComparisonData: MarginData[] = [
  {
    ticker: 'YETI',
    name: 'Yeti Holdings',
    baseMargin: 15.1,
    tariffCompression: 4.5,
    adjustedMargin: 10.6,
    segment: 'Drinkware & Soft Coolers (סין)',
  },
  {
    ticker: 'FBIN',
    name: 'Fortune Brands',
    baseMargin: 14.2,
    tariffCompression: 4.2,
    adjustedMargin: 10.0,
    segment: 'מוצרי בנייה ודלתות אבטחה',
  },
  {
    ticker: 'GNRC',
    name: 'Generac',
    baseMargin: 11.5,
    tariffCompression: 3.1,
    adjustedMargin: 8.4,
    segment: 'גנרטורים וסוללות אחסון',
  },
  {
    ticker: 'AS',
    name: 'Amer Sports',
    baseMargin: 9.4,
    tariffCompression: 2.9,
    adjustedMargin: 6.5,
    segment: 'הנעלה וציוד ספורט מותגי',
  },
  {
    ticker: 'MHK',
    name: 'Mohawk Ind.',
    baseMargin: 7.8,
    tariffCompression: 3.8,
    adjustedMargin: 4.0,
    segment: 'ריצוף וקרמיקה מסחרית',
  },
];

export const MarginCompressionChart: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<string>('FBIN');
  const activeItem = marginComparisonData.find((d) => d.ticker === selectedStock) || marginComparisonData[0];

  return (
    <div className="w-full my-6 p-4 sm:p-6 bg-white border-2 border-[#1A1A1A] rounded-xl text-[#1A1A1A] shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#1A1A1A]/20">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-[#1A1A1A]" />
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-500 block">
              RESEARCH CHART // MARGIN SENSITIVITY
            </span>
            <h4 className="text-lg sm:text-xl font-serif font-black italic">
              שחיקת מרווח תפעולי: תרחיש אפס החזר עלויות
            </h4>
          </div>
        </div>
        <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-neutral-100 border border-[#1A1A1A]/30 rounded-full self-start sm:self-auto">
          השוואת 5 המניות במוקד
        </span>
      </div>

      {/* Stock tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 custom-scrollbar">
        {marginComparisonData.map((s) => (
          <button
            key={s.ticker}
            onClick={() => setSelectedStock(s.ticker)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all shrink-0 ${
              selectedStock === s.ticker
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
            }`}
          >
            {s.ticker}
          </button>
        ))}
      </div>

      {/* Visual Bars Comparison */}
      <div className="space-y-4">
        {marginComparisonData.map((item) => {
          const isSelected = item.ticker === selectedStock;
          const basePct = (item.baseMargin / 18) * 100;
          const adjustedPct = (item.adjustedMargin / 18) * 100;

          return (
            <div
              key={item.ticker}
              onClick={() => setSelectedStock(item.ticker)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#1A1A1A] bg-[#FDFCFB] ring-1 ring-[#1A1A1A]'
                  : 'border-transparent hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5">
                <span className="font-bold font-serif italic text-base">
                  {item.name} ({item.ticker})
                </span>
                <span className="font-mono text-xs text-neutral-600">
                  מרווח בסיס: <strong>{item.baseMargin}%</strong> ➔ מרווח מתוקן:{' '}
                  <strong className="text-red-700">{item.adjustedMargin}%</strong> (-
                  {item.tariffCompression}%)
                </span>
              </div>

              {/* Progress bar visual comparison */}
              <div className="w-full h-5 bg-neutral-100 rounded overflow-hidden relative flex">
                {/* Adjusted surviving margin */}
                <div
                  className="h-full bg-[#1A1A1A] transition-all duration-500 relative"
                  style={{ width: `${adjustedPct}%` }}
                >
                  <span className="absolute left-2 top-0.5 text-[10px] font-mono text-white font-bold">
                    {item.adjustedMargin}%
                  </span>
                </div>
                {/* Compressed margin lost to tariffs */}
                <div
                  className="h-full bg-red-400 border-r border-dashed border-red-700 transition-all duration-500 relative"
                  style={{ width: `${basePct - adjustedPct}%` }}
                >
                  <span className="absolute right-1 top-0.5 text-[9px] font-mono text-red-950 font-bold hidden sm:inline">
                    -{item.tariffCompression}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active stock highlight note */}
      <div className="mt-4 p-3 rounded-lg bg-neutral-50 border border-[#1A1A1A]/20 flex items-start gap-2.5 text-xs sm:text-sm">
        <Info className="w-4 h-4 mt-0.5 shrink-0 text-[#1A1A1A]" />
        <div>
          <strong>{activeItem.ticker} ({activeItem.segment}):</strong> מרווח התפעול נשחק מ-{activeItem.baseMargin}% ל-{activeItem.adjustedMargin}%. במודל הקונצנזוס בוול סטריט, אנליסטים מניחים גלגול מחיר של 100% לצרכן, בעוד גמישות הביקוש בפועל צפויה להביא לפגיעה ישירה של {activeItem.tariffCompression} נקודות אחוז במרווח.
        </div>
      </div>
    </div>
  );
};

export const AttentionDisparityChart: React.FC = () => {
  return (
    <div className="w-full my-6 p-4 sm:p-6 bg-white border-2 border-[#1A1A1A] rounded-xl text-[#1A1A1A] shadow-sm">
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#1A1A1A]/20">
        <EyeOff className="w-5 h-5 text-[#1A1A1A]" />
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-500 block">
            ANALYST ATTENTION DEFICIT
          </span>
          <h4 className="text-lg sm:text-xl font-serif font-black italic">
            פער הקשב: שאלות אנליסטים על סיכון שרשרת האספקה
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
        <div className="p-4 rounded-lg bg-[#FDFCFB] border border-[#1A1A1A] text-center">
          <div className="text-3xl sm:text-4xl font-mono font-bold">12,381</div>
          <div className="text-xs font-semibold text-neutral-600 mt-1 uppercase tracking-wider">
            שיחות רווחים שנבדקו
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#FDFCFB] border border-[#1A1A1A] text-center">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-red-600">0 / 32</div>
          <div className="text-xs font-semibold text-neutral-600 mt-1 uppercase tracking-wider">
            שאלות על שבירת מרווחים (FBIN)
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#1A1A1A] text-white border border-[#1A1A1A] text-center">
          <div className="text-3xl sm:text-4xl font-mono font-bold">100%</div>
          <div className="text-xs font-semibold text-neutral-300 mt-1 uppercase tracking-wider">
            הנחת גלגול עלויות אוטומטי
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-neutral-50 rounded border border-neutral-200 text-xs sm:text-sm font-serif italic leading-relaxed text-neutral-800">
        "בכל חמש המניות שנבדקו, אף אנליסט ממוסדות ההשקעה הגדולים לא שאל על תרחיש שבו הצרכן מסרב לספוג את עליית המחיר של 20%-25%. ההנחה עיוורת לחלוטין."
      </div>
    </div>
  );
};

export const MechanismBreakdownDiagram: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'הטלת מכסים (10%-25%)',
      desc: 'עלויות הייבוא של חומרי גלם ומוצרים מוגמרים מסין מזנקות באופן מיידי בשיעור חד.',
    },
    {
      num: '02',
      title: 'ניסיון גלגול מחיר של 100%',
      desc: 'ההנהלה מעלה מחירי מחירון מתוך הנחה תיאורטית שהביקוש קשיח לחלוטין.',
    },
    {
      num: '03',
      title: 'שבירת גמישות וצניחת ביקושים',
      desc: 'הצרכנים דוחים שיפוצים, עוברים לתחליפים מקומיים או מצמצמים רכישות.',
    },
    {
      num: '04',
      title: 'קריסת מנוף תפעולי (De-leverage)',
      desc: 'העלויות הקבועות של המפעלים מתחלקות על פחות יחידות — המרווח קורס במהירות.',
    },
  ];

  return (
    <div className="w-full my-6 p-4 sm:p-6 bg-white border-2 border-[#1A1A1A] rounded-xl text-[#1A1A1A] shadow-sm">
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#1A1A1A]/20">
        <Layers className="w-5 h-5 text-[#1A1A1A]" />
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-500 block">
            MECHANISM VISUALIZER
          </span>
          <h4 className="text-lg sm:text-xl font-serif font-black italic">
            מנגנון שרשרת ההשפעה: משלב המכס ועד פיצוץ התזה
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg bg-[#FDFCFB] border border-[#1A1A1A] flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono font-bold text-neutral-500 block mb-1">
                שלב {step.num}
              </span>
              <h5 className="font-bold font-serif text-base sm:text-lg mb-2">
                {step.title}
              </h5>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                {step.desc}
              </p>
            </div>
            <div className="w-6 h-[2px] bg-[#1A1A1A] mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};
