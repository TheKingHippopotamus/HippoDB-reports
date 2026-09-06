export interface DataTableRow {
  [key: string]: string | number;
}

export interface DataTableConfig {
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
  highlightColumnIndex?: number;
  highlightRowIndex?: number;
}

export interface StockDetails {
  ticker: string;
  name: string;
  mechanism: string;
  description: string;
  reportSummary: string;
  whyItMatters: string;
  keyNumbers?: string[];
  tableData?: DataTableConfig;
  customDetail?: string;
  attention: string;
  attentionRatio: { asked: number; total: number };
  triggerToExplode: string;
  invalidation: string;
  extraQuotes?: string[];
  isWatchlist?: boolean;
}

export interface SlideItem {
  id: string;
  slideNumber: number;
  category: string;
  title: string;
  subtitle?: string;
  iconName: string;
  tag?: string;
  content: {
    lead?: string;
    paragraphs?: string[];
    quotes?: { text: string; source?: string }[];
    tables?: DataTableConfig[];
    bulletLists?: { title?: string; items: string[] }[];
    stock?: StockDetails;
    extraSections?: { title: string; subtitle?: string; text: string | string[] }[];
  };
}
