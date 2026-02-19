export type ArticleIcon = "code" | "design" | "gauge";
export type CategoryKey = "all" | "development" | "design" | "performance";

export interface Article {
  id: string;
  slug: string;
  slugEn?: string;
  slugRo?: string;
  title_en: string;
  title_ro: string;
  excerpt_en: string;
  excerpt_ro: string;
  body_en: string[];
  body_ro: string[];
  category: Exclude<CategoryKey, "all">;
  category_en: string;
  category_ro: string;
  date: string;
  readTime: number;
  accent: string;
  bgFrom: string;
  bgTo: string;
  icon: ArticleIcon;
  featureImage?: string;
  adImage?: string;
  adLink?: string;
  metaTitleEn?: string;
  metaTitleRo?: string;
  metaDescEn?: string;
  metaDescRo?: string;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "building-performant-web-apps-nextjs-16",
    title_en: "Building Performant Web Apps with Next.js 16",
    title_ro: "Construirea de Aplicații Web Performante cu Next.js 16",
    excerpt_en:
      "Exploring the latest features in Next.js 16 and how to leverage them for blazing-fast, SEO-friendly web applications.",
    excerpt_ro:
      "Explorarea celor mai noi funcționalități din Next.js 16 și cum să le folosești pentru aplicații web ultra-rapide și SEO-friendly.",
    body_en: [
      "Next.js 16 introduces a wave of improvements that redefine how we build modern web applications. From the enhanced App Router to smarter caching strategies, the framework continues to push the boundaries of developer experience and end-user performance.",
      "One of the standout features is the improved streaming architecture. Server components can now progressively render content, sending HTML to the browser as data becomes available. This dramatically reduces Time to First Byte (TTFB) and gives users a perceived speed boost.",
      "The new Partial Prerendering (PPR) model is a game-changer. It allows you to combine static and dynamic content within a single route, pre-rendering the shell at build time while streaming dynamic parts on request. This means you get the SEO benefits of static generation with the flexibility of server-side rendering.",
      "Performance optimization doesn't stop at the framework level. Image optimization with next/image now supports automatic format detection, serving AVIF where supported and falling back to WebP. Combined with the built-in font optimization, your Core Web Vitals scores improve almost effortlessly.",
      "For developers working with TypeScript, the tighter integration means better autocompletion, stricter type checking on route params, and improved error messages. The developer server is also significantly faster, with hot module replacement completing in milliseconds rather than seconds.",
    ],
    body_ro: [
      "Next.js 16 aduce un val de îmbunătățiri care redefinesc modul în care construim aplicații web moderne. De la App Router-ul îmbunătățit la strategii de caching mai inteligente, framework-ul continuă să împingă limitele experienței de dezvoltare și performanței pentru utilizatori.",
      "Una dintre caracteristicile remarcabile este arhitectura de streaming îmbunătățită. Componentele server pot acum să renderizeze conținut progresiv, trimițând HTML către browser pe măsură ce datele devin disponibile. Acest lucru reduce dramatic Time to First Byte (TTFB) și oferă utilizatorilor o creștere percepută a vitezei.",
      "Noul model Partial Prerendering (PPR) schimbă regulile jocului. Permite combinarea conținutului static și dinamic într-o singură rută, pre-renderizând shell-ul la build time în timp ce streamează părțile dinamice la cerere. Asta înseamnă că obții beneficiile SEO ale generării statice cu flexibilitatea server-side rendering-ului.",
      "Optimizarea performanței nu se oprește la nivelul framework-ului. Optimizarea imaginilor cu next/image suportă acum detecție automată a formatului, servind AVIF unde este suportat și revenind la WebP. Combinat cu optimizarea built-in a fonturilor, scorurile Core Web Vitals se îmbunătățesc aproape fără efort.",
      "Pentru dezvoltatorii care lucrează cu TypeScript, integrarea mai strânsă înseamnă autocompletare mai bună, verificare mai strictă a tipurilor pe parametrii de rută și mesaje de eroare îmbunătățite. Serverul de dezvoltare este, de asemenea, semnificativ mai rapid, cu hot module replacement completându-se în milisecunde în loc de secunde.",
    ],
    category: "development",
    category_en: "Development",
    category_ro: "Development",
    date: "2026-02-10",
    readTime: 8,
    accent: "from-blue-500 to-cyan-400",
    bgFrom: "#0c4a6e",
    bgTo: "#164e63",
    icon: "code",
  },
  {
    id: "2",
    slug: "design-systems-figma-to-production",
    title_en: "Design Systems: From Figma to Production Code",
    title_ro: "Design Systems: De la Figma la Cod de Producție",
    excerpt_en:
      "A practical guide to translating design tokens, components, and patterns from Figma into a scalable React component library.",
    excerpt_ro:
      "Un ghid practic pentru transpunerea token-urilor de design, componentelor și pattern-urilor din Figma într-o bibliotecă scalabilă de componente React.",
    body_en: [
      "Design systems bridge the gap between designers and developers, creating a shared language that ensures consistency across products. But the real challenge isn't building a design system — it's maintaining the connection between Figma and code.",
      "Start with design tokens: colors, spacing, typography, and shadows. These foundational values should be defined in Figma as variables and exported as JSON or CSS custom properties. Tools like Style Dictionary can transform tokens into platform-specific formats automatically.",
      "Component architecture in code should mirror Figma's component structure. If designers use variants (size, state, color), your React components should accept the same props. This 1:1 mapping reduces friction and makes handoffs seamless.",
      "Documentation is the glue that holds it together. Each component should have a Storybook page showing all variants, states, and usage guidelines. Automated visual regression testing with tools like Chromatic catches unintended changes before they reach production.",
      "The best design systems evolve organically. Start small with the most-used components (Button, Input, Card), establish patterns, then expand. Regularly sync with designers to ensure the system stays aligned with the design vision.",
    ],
    body_ro: [
      "Sistemele de design fac legătura între designeri și dezvoltatori, creând un limbaj comun care asigură consistență între produse. Dar adevărata provocare nu e construirea unui design system — ci menținerea conexiunii între Figma și cod.",
      "Începe cu token-urile de design: culori, spațiere, tipografie și umbre. Aceste valori fundamentale ar trebui definite în Figma ca variabile și exportate ca JSON sau CSS custom properties. Instrumente precum Style Dictionary pot transforma token-urile în formate specifice platformei automat.",
      "Arhitectura componentelor în cod ar trebui să reflecte structura componentelor din Figma. Dacă designerii folosesc variante (size, state, color), componentele React ar trebui să accepte aceleași props. Acest mapping 1:1 reduce fricțiunea și face handoff-urile seamless.",
      "Documentația este lipiciul care ține totul laolaltă. Fiecare componentă ar trebui să aibă o pagină Storybook care arată toate variantele, stările și ghidurile de utilizare. Testarea automată de regresie vizuală cu instrumente precum Chromatic detectează schimbările neintenționate înainte să ajungă în producție.",
      "Cele mai bune design systems evoluează organic. Începe mic cu componentele cele mai folosite (Button, Input, Card), stabilește pattern-uri, apoi extinde. Sincronizează-te regulat cu designerii pentru a te asigura că sistemul rămâne aliniat cu viziunea de design.",
    ],
    category: "design",
    category_en: "Design",
    category_ro: "Design",
    date: "2026-01-28",
    readTime: 6,
    accent: "from-purple-500 to-pink-400",
    bgFrom: "#581c87",
    bgTo: "#831843",
    icon: "design",
  },
  {
    id: "3",
    slug: "optimizing-core-web-vitals-ecommerce",
    title_en: "Optimizing Core Web Vitals for E-Commerce",
    title_ro: "Optimizarea Core Web Vitals pentru E-Commerce",
    excerpt_en:
      "Strategies and real-world techniques to improve LCP, FID, and CLS scores on high-traffic online stores.",
    excerpt_ro:
      "Strategii și tehnici din lumea reală pentru îmbunătățirea scorurilor LCP, FID și CLS pe magazine online cu trafic ridicat.",
    body_en: [
      "Core Web Vitals are no longer optional for e-commerce — they directly impact search rankings, user engagement, and conversion rates. Google's data shows that sites meeting CWV thresholds see up to 24% fewer page abandonments.",
      "Largest Contentful Paint (LCP) is typically the hero image or product photo. Optimize by serving responsive images with srcset, using modern formats (AVIF/WebP), and implementing priority hints with fetchpriority='high' on above-the-fold images.",
      "First Input Delay (FID) and its successor Interaction to Next Paint (INP) measure responsiveness. Heavy JavaScript bundles from analytics, chat widgets, and A/B testing tools are the usual culprits. Defer non-critical scripts, use web workers for expensive computations, and implement code splitting aggressively.",
      "Cumulative Layout Shift (CLS) plagues e-commerce sites with dynamically loaded content — product recommendations, reviews, and promotional banners. Always reserve explicit dimensions for images and embeds, use CSS aspect-ratio, and avoid inserting content above the fold after initial render.",
      "Real-world monitoring is essential. Lab tools like Lighthouse give you a baseline, but field data from the Chrome User Experience Report (CrUX) tells the true story. Set up performance budgets in your CI/CD pipeline to catch regressions before they ship.",
    ],
    body_ro: [
      "Core Web Vitals nu mai sunt opționale pentru e-commerce — influențează direct clasamentele în căutări, engagement-ul utilizatorilor și ratele de conversie. Datele Google arată că site-urile care îndeplinesc pragurile CWV văd cu până la 24% mai puține abandonări ale paginii.",
      "Largest Contentful Paint (LCP) este de obicei imaginea hero sau fotografia produsului. Optimizează servind imagini responsive cu srcset, folosind formate moderne (AVIF/WebP) și implementând priority hints cu fetchpriority='high' pe imaginile above-the-fold.",
      "First Input Delay (FID) și succesorul său Interaction to Next Paint (INP) măsoară receptivitatea. Bundle-urile JavaScript grele de la analytics, widget-uri de chat și instrumente de A/B testing sunt de obicei vinovate. Amână scripturile non-critice, folosește web workers pentru calcule costisitoare și implementează code splitting agresiv.",
      "Cumulative Layout Shift (CLS) afectează site-urile e-commerce cu conținut încărcat dinamic — recomandări de produse, recenzii și bannere promoționale. Rezervă întotdeauna dimensiuni explicite pentru imagini și embeds, folosește CSS aspect-ratio și evită inserarea conținutului above the fold după renderul inițial.",
      "Monitorizarea din lumea reală este esențială. Instrumente de laborator precum Lighthouse îți dau o linie de bază, dar datele din teren din Chrome User Experience Report (CrUX) spun adevărata poveste. Configurează bugete de performanță în pipeline-ul CI/CD pentru a detecta regresiile înainte să ajungă în producție.",
    ],
    category: "performance",
    category_en: "Performance",
    category_ro: "Performanță",
    date: "2026-01-15",
    readTime: 10,
    accent: "from-emerald-500 to-teal-400",
    bgFrom: "#064e3b",
    bgTo: "#134e4a",
    icon: "gauge",
  },
  {
    id: "4",
    slug: "why-typescript-is-worth-the-learning-curve",
    title_en: "Why TypeScript Is Worth the Learning Curve",
    title_ro: "De Ce Merită Să Înveți TypeScript",
    excerpt_en:
      "From catching bugs at compile time to better IDE support — here's why TypeScript has become essential in modern web development.",
    excerpt_ro:
      "De la detectarea bug-urilor la compilare la suport IDE mai bun — iată de ce TypeScript a devenit esențial în dezvoltarea web modernă.",
    body_en: [
      "TypeScript adoption has skyrocketed, and for good reason. What started as an optional type layer over JavaScript has become the default choice for serious web development projects. The productivity gains far outweigh the initial learning investment.",
      "The most obvious benefit is catching errors before runtime. A simple typo in a property name, a missing function argument, or an incorrect return type — TypeScript catches all of these at compile time, saving hours of debugging in production.",
      "IDE support is where TypeScript truly shines. Autocompletion becomes intelligent, refactoring is safe, and inline documentation appears as you type. VS Code's TypeScript integration makes navigating large codebases effortless with go-to-definition and find-all-references.",
      "TypeScript also serves as living documentation. When you read a function signature like `getUser(id: string): Promise<User | null>`, you immediately understand the contract without reading the implementation. This self-documenting quality makes onboarding new team members faster.",
      "Start gradually — you don't need to convert your entire codebase at once. Begin with strict mode disabled, add types to new files, and progressively tighten the configuration. The TypeScript compiler's `--strict` flag is your north star to aim for eventually.",
    ],
    body_ro: [
      "Adoptarea TypeScript a crescut vertiginos, și pe bună dreptate. Ceea ce a început ca un layer opțional de tipuri peste JavaScript a devenit alegerea implicită pentru proiecte serioase de dezvoltare web. Câștigurile de productivitate depășesc cu mult investiția inițială de învățare.",
      "Cel mai evident beneficiu este detectarea erorilor înainte de runtime. O simplă greșeală de tipar într-un nume de proprietate, un argument de funcție lipsă sau un tip de return incorect — TypeScript le detectează pe toate la compilare, economisind ore de debugging în producție.",
      "Suportul IDE este locul unde TypeScript strălucește cu adevărat. Autocompletarea devine inteligentă, refactorizarea este sigură și documentația inline apare pe măsură ce tastezi. Integrarea TypeScript din VS Code face navigarea în codebase-uri mari fără efort cu go-to-definition și find-all-references.",
      "TypeScript servește și ca documentație vie. Când citești o semnătură de funcție precum `getUser(id: string): Promise<User | null>`, înțelegi imediat contractul fără a citi implementarea. Această calitate auto-documentatoare face onboarding-ul noilor membri de echipă mai rapid.",
      "Începe treptat — nu trebuie să convertești întreaga codebase dintr-o dată. Începe cu strict mode dezactivat, adaugă tipuri la fișierele noi și strânge progresiv configurația. Flag-ul `--strict` al compilatorului TypeScript este steaua ta nordică spre care să tinzi în cele din urmă.",
    ],
    category: "development",
    category_en: "Development",
    category_ro: "Development",
    date: "2025-12-20",
    readTime: 5,
    accent: "from-sky-500 to-indigo-400",
    bgFrom: "#0c4a6e",
    bgTo: "#312e81",
    icon: "code",
  },
  {
    id: "5",
    slug: "accessible-color-palettes-that-look-good",
    title_en: "Accessible Color Palettes That Actually Look Good",
    title_ro: "Palete de Culori Accesibile Care Arată Bine",
    excerpt_en:
      "How to create color systems that meet WCAG contrast requirements without sacrificing visual appeal and brand identity.",
    excerpt_ro:
      "Cum să creezi sisteme de culori care respectă cerințele de contrast WCAG fără a sacrifica estetica și identitatea de brand.",
    body_en: [
      "Accessibility and aesthetics aren't mutually exclusive. The myth that accessible design means boring design has been thoroughly debunked by brands that prove you can have both — vibrant palettes that pass WCAG AA and even AAA contrast requirements.",
      "Start with your brand's primary color and build a systematic scale. Tools like Leonardo by Adobe generate perceptually uniform color ramps that maintain contrast ratios at each step. A 10-step scale from 50 to 950 gives you enough range for backgrounds, surfaces, and text.",
      "The key insight is that contrast isn't just about light vs dark — it's about the relationship between foreground and background. A text color that fails on white might pass on a darker surface. Design your color tokens as pairs: always define which background a text color is intended for.",
      "Don't forget about color blindness, which affects roughly 8% of men. Never rely on color alone to convey information — pair it with icons, patterns, or text labels. Test your palette with simulators like Stark or the Chrome DevTools vision deficiency emulator.",
      "Document your color system thoroughly. For each token, specify its intended use, minimum contrast ratio, and which other tokens it pairs with. This creates guardrails that prevent future inconsistencies as the team grows.",
    ],
    body_ro: [
      "Accesibilitatea și estetica nu se exclud reciproc. Mitul că designul accesibil înseamnă design plictisitor a fost complet demontat de branduri care dovedesc că poți avea ambele — palete vibrante care trec cerințele de contrast WCAG AA și chiar AAA.",
      "Începe cu culoarea primară a brandului și construiește o scală sistematică. Instrumente precum Leonardo de la Adobe generează rampe de culori perceptual uniforme care mențin raporturile de contrast la fiecare pas. O scală în 10 pași de la 50 la 950 îți dă suficient interval pentru backgrounds, surfaces și text.",
      "Insight-ul cheie este că contrastul nu e doar despre deschis vs închis — e despre relația dintre foreground și background. O culoare de text care eșuează pe alb ar putea trece pe o suprafață mai închisă. Proiectează-ți token-urile de culoare ca perechi: definește întotdeauna pe ce background este destinată o culoare de text.",
      "Nu uita de daltonism, care afectează aproximativ 8% din bărbați. Nu te baza niciodată doar pe culoare pentru a transmite informație — combină-o cu icoane, pattern-uri sau etichete de text. Testează-ți paleta cu simulatoare precum Stark sau emulatorul de deficiențe de vedere din Chrome DevTools.",
      "Documentează-ți sistemul de culori în detaliu. Pentru fiecare token, specifică utilizarea intenționată, raportul minim de contrast și cu ce alte token-uri se combină. Asta creează garduri de siguranță care previn inconsistențe viitoare pe măsură ce echipa crește.",
    ],
    category: "design",
    category_en: "Design",
    category_ro: "Design",
    date: "2025-12-05",
    readTime: 7,
    accent: "from-rose-500 to-orange-400",
    bgFrom: "#881337",
    bgTo: "#7c2d12",
    icon: "design",
  },
  {
    id: "6",
    slug: "lazy-loading-strategies-beyond-images",
    title_en: "Lazy Loading Strategies Beyond Images",
    title_ro: "Strategii de Lazy Loading Dincolo de Imagini",
    excerpt_en:
      "Advanced techniques for lazy loading components, routes, and data to drastically improve your app's initial load time.",
    excerpt_ro:
      "Tehnici avansate de lazy loading pentru componente, rute și date pentru a îmbunătăți drastic timpul de încărcare inițial.",
    body_en: [
      "Lazy loading images with loading='lazy' is table stakes — every developer knows that trick. But the real performance wins come from applying lazy loading principles to everything: components, routes, third-party scripts, and even data fetching strategies.",
      "React's lazy() and Suspense make component-level code splitting straightforward. Heavy components like rich text editors, charts, and maps should always be dynamically imported. The key is identifying the right split points — components that aren't visible on initial load or require user interaction.",
      "Route-based code splitting is handled automatically by Next.js, but you can go further. Use dynamic imports for modal contents, tab panels, and accordion sections. Each split point reduces the initial JavaScript payload, improving Time to Interactive.",
      "Third-party scripts are often the biggest offenders. Analytics, chat widgets, social embeds, and advertising scripts can easily add 500KB+ to your bundle. Load them with requestIdleCallback or intersection observer triggers — only when the browser is idle or when the relevant section scrolls into view.",
      "Data fetching can be lazy too. Instead of loading all data upfront, implement pagination, infinite scroll, or fetch-on-reveal patterns. Combined with React Server Components that stream HTML, you can create interfaces that feel instant even with large datasets.",
    ],
    body_ro: [
      "Lazy loading-ul imaginilor cu loading='lazy' este baza — fiecare dezvoltator cunoaște acest truc. Dar câștigurile reale de performanță vin din aplicarea principiilor de lazy loading la totul: componente, rute, scripturi third-party și chiar strategii de fetching al datelor.",
      "React lazy() și Suspense fac code splitting-ul la nivel de componentă simplu. Componentele grele precum editoarele de text rich, graficele și hărțile ar trebui întotdeauna importate dinamic. Cheia este identificarea punctelor potrivite de split — componente care nu sunt vizibile la încărcarea inițială sau necesită interacțiune de la utilizator.",
      "Code splitting-ul bazat pe rute este gestionat automat de Next.js, dar poți merge mai departe. Folosește importuri dinamice pentru conținutul modalurilor, panouri de tab-uri și secțiuni de accordion. Fiecare punct de split reduce payload-ul JavaScript inițial, îmbunătățind Time to Interactive.",
      "Scripturile third-party sunt adesea cei mai mari vinovați. Analytics, widget-uri de chat, social embeds și scripturi de advertising pot adăuga ușor 500KB+ la bundle-ul tău. Încarcă-le cu requestIdleCallback sau triggere de intersection observer — doar când browser-ul este idle sau când secțiunea relevantă intră în viewport.",
      "Fetching-ul datelor poate fi și el lazy. În loc să încarci toate datele din start, implementează paginare, infinite scroll sau pattern-uri fetch-on-reveal. Combinat cu React Server Components care streamează HTML, poți crea interfețe care se simt instantanee chiar și cu seturi mari de date.",
    ],
    category: "performance",
    category_en: "Performance",
    category_ro: "Performanță",
    date: "2025-11-18",
    readTime: 9,
    accent: "from-amber-500 to-yellow-400",
    bgFrom: "#78350f",
    bgTo: "#713f12",
    icon: "gauge",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}
