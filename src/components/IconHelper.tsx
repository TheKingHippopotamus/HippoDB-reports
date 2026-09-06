import React from 'react';
import {
  Scale,
  ReceiptText,
  Globe2,
  HeartPulse,
  Server,
  Flame,
  Cpu,
  Gavel,
  Home,
  Grid3X3,
  Zap,
  Mountain,
  Snowflake,
  Truck,
  Shirt,
  Stethoscope,
  Printer,
  Hammer,
  TrendingDown,
  ShieldCheck,
  Binary,
  GitFork,
  Network,
  Target,
  Activity,
  FileText,
  Sparkles,
  History,
  Clock,
  BookOpen,
  Layers,
  EyeOff,
  Compass,
  TrendingUp,
  ListFilter,
  AlertTriangle,
  FileSpreadsheet,
  Coins,
  ShieldAlert,
  Search,
  LucideProps,
} from 'lucide-react';

interface IconHelperProps extends LucideProps {
  name: string;
}

const iconsMap: Record<string, React.FC<LucideProps>> = {
  Scale,
  ReceiptText,
  Globe2,
  HeartPulse,
  Server,
  Flame,
  Cpu,
  Gavel,
  Home,
  Grid3X3,
  Zap,
  Mountain,
  Snowflake,
  Truck,
  Shirt,
  Stethoscope,
  Printer,
  Hammer,
  TrendingDown,
  ShieldCheck,
  Binary,
  GitFork,
  Network,
  Target,
  Activity,
  FileText,
  Sparkles,
  History,
  Clock,
  BookOpen,
  Layers,
  EyeOff,
  Compass,
  TrendingUp,
  ListFilter,
  AlertTriangle,
  FileSpreadsheet,
  Coins,
  ShieldAlert,
  Search,
};

export const IconHelper: React.FC<IconHelperProps> = ({ name, ...props }) => {
  const IconComponent = iconsMap[name] || FileText;
  return <IconComponent {...props} />;
};

/**
 * Intelligent topic-to-SVG-icon resolver.
 * Detects keywords like "מכסים", "חשיפה לסין", "בריאות", "דאטה סנטרים", "אנרגיה" etc.
 * and renders a distinctive, tailored Lucide SVG icon.
 */
export function getTopicIconComponent(topicOrTitle: string): React.FC<LucideProps> {
  const t = topicOrTitle.toLowerCase();

  // מכסים, היטלים ומדיניות סחר
  if (t.includes('מכס') || t.includes('היטל') || t.includes('סחר') || t.includes('ieepa') || t.includes('tariff')) {
    return Scale;
  }

  // חשיפה לסין, אסיה ושרשראות אספקה בינלאומיות
  if (t.includes('סין') || t.includes('china') || t.includes('אסיה') || t.includes('גלובל')) {
    return Globe2;
  }

  // בריאות הצרכן, ציוד רפואי, תרופות (Cardinal Health)
  if (t.includes('בריאות') || t.includes('רפוא') || t.includes('תרופ') || t.includes('cah') || t.includes('cardinal')) {
    return HeartPulse;
  }

  // AI, דאטה סנטרים, חוות שרתים וענן (Generac, ענקיות הענן)
  if (t.includes('דאטה סנטר') || t.includes('data center') || t.includes('ai') || t.includes('שרת') || t.includes('ענן')) {
    return Server;
  }

  // מזרח תיכון ואנרגיה, גז ודלק
  if (t.includes('אנרגיה') || t.includes('מזרח תיכון') || t.includes('דלק') || t.includes('נפט')) {
    return Flame;
  }

  // זיכרון, שבבים ורכיבים
  if (t.includes('זיכרון') || t.includes('רכיב') || t.includes('שבב') || t.includes('סמיקונדקטור')) {
    return Cpu;
  }

  // בית המשפט העליון, פסיקות וערכאות משפטיות
  if (t.includes('בית משפט') || t.includes('עליון') || t.includes('פסיק') || t.includes('חוק')) {
    return Gavel;
  }

  // חברות ומניות ספציפיות:
  // FBIN - Fortune Brands מוצרי בית ומים
  if (t.includes('fortune') || t.includes('fbin') || t.includes('בית') || t.includes('ברז')) {
    return Home;
  }

  // MHK - Mohawk Industries ריצוף וקרמיקה
  if (t.includes('mohawk') || t.includes('mhk') || t.includes('ריצוף') || t.includes('קרמיק')) {
    return Grid3X3;
  }

  // GNRC - Generac גנרטורים וחשמל
  if (t.includes('generac') || t.includes('gnrc') || t.includes('גנרטור') || t.includes('חשמל')) {
    return Zap;
  }

  // AS - Amer Sports ציוד הרים ואקסטרים
  if (t.includes('amer') || t.includes('arc\'teryx') || t.includes('salomon') || t.includes('ספורט')) {
    return Mountain;
  }

  // YETI - צידניות ותרמוסים
  if (t.includes('yeti') || t.includes('צידני') || t.includes('תרמוס')) {
    return Snowflake;
  }

  // CAT - Caterpillar
  if (t.includes('caterpillar') || t.includes('cat')) {
    return Truck;
  }

  // GIL - Gildan ביגוד וטקסטיל
  if (t.includes('gildan') || t.includes('gil') || t.includes('ביגוד') || t.includes('חולצ')) {
    return Shirt;
  }

  // HPQ - HP מחשוב ומדפסות
  if (t.includes('hp') || t.includes('hpq') || t.includes('מדפס')) {
    return Printer;
  }

  // SWK - Stanley כלי עבודה
  if (t.includes('stanley') || t.includes('swk') || t.includes('כלי עבודה')) {
    return Hammer;
  }

  // קריסת קשב וירידה
  if (t.includes('קשב') || t.includes('קרס') || t.includes('ירידה') || t.includes('צנח')) {
    return TrendingDown;
  }

  // בדיקת איכות נתונים והטיה
  if (t.includes('הטיה') || t.includes('איכות') || t.includes('אמינות') || t.includes('בקרה')) {
    return ShieldCheck;
  }

  // רשת ומודל
  if (t.includes('רשת') || t.includes('צומת')) {
    return Network;
  }

  // פער והתפצלות הנחות
  if (t.includes('פער') || t.includes('פי שלושה') || t.includes('הוכחה')) {
    return GitFork;
  }

  // ציר זמן
  if (t.includes('זמן') || t.includes('כרונולוג')) {
    return Clock;
  }

  // שורה תחתונה ומטרה
  if (t.includes('שורה תחתונה') || t.includes('מטרה') || t.includes('יעד')) {
    return Target;
  }

  return FileText;
}

interface TopicIconBadgeProps {
  topic: string;
  className?: string;
  iconClassName?: string;
}

/**
 * Visual badge containing the exact SVG icon matching the topic,
 * styled with clean monochrome geometry.
 */
export const TopicIconBadge: React.FC<TopicIconBadgeProps> = ({
  topic,
  className = 'w-7 h-7 rounded-md border border-[#1A1A1A]/30 bg-[#F6F4EF] flex items-center justify-center shrink-0',
  iconClassName = 'w-4 h-4 text-[#1A1A1A]',
}) => {
  const IconComponent = getTopicIconComponent(topic);
  return (
    <span className={className} title={topic} aria-hidden="true">
      <IconComponent className={iconClassName} />
    </span>
  );
};
