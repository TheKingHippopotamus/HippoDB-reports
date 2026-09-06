import React from 'react';
import {
  FileSpreadsheet,
  Search,
  TrendingDown,
  Gavel,
  Home,
  Grid3X3,
  Zap,
  Mountain,
  Snowflake,
  EyeOff,
  Globe2,
  Server,
  HeartPulse,
  Flame,
  ListFilter,
  ShieldCheck,
  Target,
  Clock,
  LucideProps,
  LucideIcon,
} from 'lucide-react';

/**
 * Strict, unambiguous section-to-icon mapping.
 * Each section has exactly ONE domain-accurate icon.
 * No fuzzy substring searching that confuses unrelated contexts.
 */
const sectionIconsById: Record<string, LucideIcon> = {
  // 1. Cover / Executive Thesis
  cover: FileSpreadsheet,

  // 2. Methodology: 12,381 Earnings Calls Analysis
  methodology: Search,

  // 3. Margin Mechanism: The Cost Pass-Through Breakdown
  mechanism: TrendingDown,

  // 4. Supreme Court & IEEPA Tariff Ruling
  'supreme-court': Gavel,

  // 5. Stock 1: Fortune Brands Innovations (Home & Water Products)
  'stock-fbin': Home,

  // 6. Stock 2: Mohawk Industries (Flooring, Ceramic & Surfaces)
  'stock-mhk': Grid3X3,

  // 7. Stock 3: Generac Holdings (Backup Generators & Power Grid)
  'stock-gnrc': Zap,

  // 8. Stock 4: Amer Sports / Arc'teryx (Technical Mountaineering & Outdoor)
  'stock-as': Mountain,

  // 9. Stock 5: YETI Holdings (Premium Coolers & Insulation)
  'stock-yeti': Snowflake,

  // 10. Analyst Attention Collapse (The 79% blindspot)
  'attention-collapse': EyeOff,

  // 11. Direct China Exposure vs. Southeast Asia
  'china-exposure': Globe2,

  // 12. AI Data Centers & Grid Infrastructure
  'data-centers': Server,

  // 13. Healthcare Sector & Medical Consumables (Cardinal Health)
  'healthcare-sector': HeartPulse,

  // 14. Geopolitics & Energy Risk (Middle East & Fuel Costs)
  'middle-east': Flame,

  // 15. Watchlist (Caterpillar, Gildan, HP, Stanley)
  watchlist: ListFilter,

  // 16. Data Quality & Bias Invalidation Audit
  'quality-control': ShieldCheck,

  // 17. Comparative Synthesis Matrix
  summary: Target,

  // 18. Chronology & Critical Decision Timeline
  timeline: Clock,
};

/**
 * Lookup by section id or slide number
 */
export function getSectionIcon(sectionId: string, slideNumber?: number): LucideIcon {
  if (sectionIconsById[sectionId]) {
    return sectionIconsById[sectionId];
  }

  // Fallback by exact slide number if ID differs
  const numberMap: Record<number, LucideIcon> = {
    1: FileSpreadsheet,
    2: Search,
    3: TrendingDown,
    4: Gavel,
    5: Home,
    6: Grid3X3,
    7: Zap,
    8: Mountain,
    9: Snowflake,
    10: EyeOff,
    11: Globe2,
    12: Server,
    13: HeartPulse,
    14: Flame,
    15: ListFilter,
    16: ShieldCheck,
    17: Target,
    18: Clock,
  };

  if (slideNumber && numberMap[slideNumber]) {
    return numberMap[slideNumber];
  }

  return FileSpreadsheet;
}

/**
 * Strict stock ticker to icon resolver
 */
export function getStockIndustryIcon(ticker: string): LucideIcon {
  const t = ticker.toUpperCase().trim();
  switch (t) {
    case 'FBIN':
      return Home; // Fortune Brands (Moen faucets, cabinetry, security)
    case 'MHK':
      return Grid3X3; // Mohawk (flooring, tiles, ceramic)
    case 'GNRC':
      return Zap; // Generac (generators, power backup, electrical)
    case 'AS':
      return Mountain; // Amer Sports (Arc'teryx mountain apparel, Salomon)
    case 'YETI':
      return Snowflake; // YETI (coolers, thermal drinkware)
    default:
      return FileSpreadsheet;
  }
}

interface SectionTaxonomyBadgeProps {
  sectionId: string;
  slideNumber?: number;
  className?: string;
  iconClassName?: string;
}

/**
 * A refined, professional taxonomy badge showing the section's exact domain icon.
 */
export const SectionTaxonomyBadge: React.FC<SectionTaxonomyBadgeProps> = ({
  sectionId,
  slideNumber,
  className = 'w-6 h-6 rounded border border-[#1A1A1A]/30 bg-[#F6F4EF] flex items-center justify-center shrink-0',
  iconClassName = 'w-3.5 h-3.5 text-[#1A1A1A]',
}) => {
  const IconComponent = getSectionIcon(sectionId, slideNumber);
  return (
    <span className={className} aria-hidden="true">
      <IconComponent className={iconClassName} />
    </span>
  );
};
