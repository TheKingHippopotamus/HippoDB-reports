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
  /** נוכח רק כאשר המסמך המקורי מדווח מדד קשב לחברה. */
  attention?: string;
  attentionRatio?: { asked: number; total: number };
  /** נוכח רק כאשר המסמך המקורי כולל סעיף "מה צריך לקרות כדי שזה יתפוצץ". */
  triggerToExplode?: string;
  /** סעיף "איך לקרוא את זה" — קיים רק במקומות שבהם המקור כולל אותו. */
  readingNote?: string;
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
