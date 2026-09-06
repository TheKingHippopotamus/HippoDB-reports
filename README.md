# ניתוח מכסים ומניות: ההנחה שאינה נבדקת

פלטפורמת מחקר מאקרו פיננסי ואנליזה עמוקה של 12,381 שיחות ועידה ורווחי חברות.

---

## פריסה אוטומטית ל-GitHub Pages (Deployment Guide)

הפרויקט מותאם ומוכן באופן מלא לפריסה אוטומטית ב-**GitHub Pages**.

### שלבי הפעלה בריפוזיטורי ב-GitHub:

1. **דחיפת הקוד ל-GitHub**:
   דחפו את הקבצים לענף `main` (או `master`).

2. **הפעלת GitHub Pages באמצעות GitHub Actions**:
   - היכנסו ל-**Settings** של הריפוזיטורי שלכם ב-GitHub.
   - בתפריט הצדדי, בחרו ב-**Pages** (תחת קטגוריית *Code and automation*).
   - תחת **Build and deployment** -> **Source**, שנו מ-*Deploy from a branch* ל-**GitHub Actions**.

3. **זהו!**
   - קובץ ה-Workflow שהוגדר (`.github/workflows/deploy.yml`) ירוץ אוטומטית בכל `push` לענף הראשי.
   - תוך דקה האתר יהיה באוויר בכתובת:
     `https://<your-username>.github.io/<repository-name>/`

---

## תכונות תאימות שהוטמעו:
- **נתיבים יחסיים (Relative Base Path)**: מוגדר `base: './'` ב-`vite.config.ts`, כך שהאתר עובד מכל כתובת ותת-ספרייה ללא תלות בשם הריפו.
- **אריזת תמונות ונכסים מלאה (Asset Bundling)**: כל האיורים והנכסים נארזים ישירות לתוך `dist/assets` עם תמיכה מלאה בכל דפדפן.
- **תמיכה ב-SPA & 404 Fallback**: נוסף קובץ `public/404.html` המבטיח ניווט חלק גם בעת רענון עמודים.
