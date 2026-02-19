export type FilterKey = "all" | "wordpress" | "react" | "laravel" | "opencart";

export interface ProjectHighlight {
  value: string;
  label_en: string;
  label_ro: string;
}

export interface Project {
  id: string;
  slug: string;
  slugEn?: string;
  slugRo?: string;
  title: string;
  category: FilterKey;
  category_en: string;
  category_ro: string;
  description_en: string;
  description_ro: string;
  challenge_en: string;
  challenge_ro: string;
  solution_en: string;
  solution_ro: string;
  results_en: string;
  results_ro: string;
  tech: string[];
  year: string;
  bgColor: string;
  letter: string;
  letterColor: string;
  accentColor: string;
  liveUrl?: string;
  sourceUrl?: string;
  features_en: string[];
  features_ro: string[];
  featureImage?: string;
  videoDesktop: string;
  videoMobile: string;
  highlights: ProjectHighlight[];
  metaTitleEn?: string;
  metaTitleRo?: string;
  metaDescEn?: string;
  metaDescRo?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "wordpress-premium-theme",
    title: "WordPress Premium Theme",
    category: "wordpress",
    category_en: "Development",
    category_ro: "Development",
    description_en:
      "A fully custom premium WordPress theme built from scratch with advanced customizer options, WooCommerce integration, and optimized for speed.",
    description_ro:
      "O temă premium WordPress complet personalizată, construită de la zero cu opțiuni avansate de customizer, integrare WooCommerce și optimizată pentru viteză.",
    challenge_en:
      "The client needed a premium WordPress theme that could compete with top ThemeForest sellers while maintaining exceptional performance scores. Existing themes were bloated with unnecessary features, resulting in slow load times and poor Core Web Vitals. The challenge was building a feature-rich theme that remained lightweight and scored 90+ on all Lighthouse metrics.",
    challenge_ro:
      "Clientul avea nevoie de o temă premium WordPress capabilă să concureze cu cele mai bune teme de pe ThemeForest, menținând în același timp scoruri excepționale de performanță. Temele existente erau supraîncărcate cu funcționalități inutile, rezultând în timpi de încărcare lenți și Core Web Vitals slabe. Provocarea a fost construirea unei teme bogate în funcționalități, dar ușoară, cu scor 90+ la toate metricile Lighthouse.",
    solution_en:
      "I architected the theme with a modular approach — each feature loads only when needed through conditional asset loading. The customizer was built with a custom React-powered panel for real-time previews. WooCommerce templates were completely rewritten for performance, with lazy-loaded product images and optimized database queries. Critical CSS is inlined automatically, and all JavaScript is deferred.",
    solution_ro:
      "Am arhitecturat tema cu o abordare modulară — fiecare funcționalitate se încarcă doar când este necesară prin încărcare condițională a resurselor. Customizer-ul a fost construit cu un panou React custom pentru previzualizări în timp real. Template-urile WooCommerce au fost complet rescrise pentru performanță, cu imagini de produse lazy-loaded și query-uri de bază de date optimizate. CSS-ul critic este inliniat automat, iar tot JavaScript-ul este deferred.",
    results_en:
      "The theme achieved 95+ Lighthouse scores across all metrics and generated over 2,600 sales on ThemeForest within the first year. Client support tickets decreased by 40% compared to previous themes thanks to comprehensive documentation and intuitive customizer options. The theme maintains a 4.8/5 star rating with consistent positive reviews.",
    results_ro:
      "Tema a obținut scoruri Lighthouse de 95+ la toate metricile și a generat peste 2.600 de vânzări pe ThemeForest în primul an. Tichetele de suport au scăzut cu 40% comparativ cu temele anterioare datorită documentației complete și opțiunilor intuitive de customizer. Tema menține un rating de 4.8/5 stele cu recenzii pozitive consistente.",
    tech: ["WordPress", "PHP", "SCSS", "jQuery"],
    year: "2024",
    bgColor: "bg-[#e8dcc8]",
    letter: "W",
    letterColor: "text-[#8b7355]",
    accentColor: "#8b7355",
    features_en: [
      "Modular architecture with conditional asset loading",
      "React-powered customizer with real-time previews",
      "Rewritten WooCommerce templates for performance",
      "Critical CSS inlining and deferred JavaScript",
      "Comprehensive documentation and theme options",
    ],
    features_ro: [
      "Arhitectură modulară cu încărcare condițională a resurselor",
      "Customizer cu React și previzualizări în timp real",
      "Template-uri WooCommerce rescrise pentru performanță",
      "CSS critic inliniat și JavaScript deferred",
      "Documentație completă și opțiuni de temă",
    ],
    liveUrl: "https://themeforest.net",
    videoDesktop: "/videos/wordpress-premium-theme-desktop.mp4",
    videoMobile: "/videos/wordpress-premium-theme-mobile.mp4",
    highlights: [
      { value: "2,600+", label_en: "Sales", label_ro: "Vânzări" },
      { value: "95+", label_en: "Lighthouse Score", label_ro: "Scor Lighthouse" },
      { value: "4.8/5", label_en: "User Rating", label_ro: "Rating Utilizatori" },
      { value: "40%", label_en: "Less Support Tickets", label_ro: "Mai Puține Tichete" },
    ],
  },
  {
    id: "2",
    slug: "react-dashboard-app",
    title: "React Dashboard App",
    category: "react",
    category_en: "Development & Design",
    category_ro: "Development & Design",
    description_en:
      "Modern admin dashboard with real-time analytics, data visualization, and role-based access control built with React and TypeScript.",
    description_ro:
      "Dashboard admin modern cu analiză în timp real, vizualizare date și control acces bazat pe roluri, construit cu React și TypeScript.",
    challenge_en:
      "A growing SaaS company needed a comprehensive admin dashboard that could handle real-time data from multiple sources, provide actionable analytics, and support different user roles with varying permission levels. Their existing solution was a legacy jQuery application that couldn't scale with their rapidly growing user base.",
    challenge_ro:
      "O companie SaaS în creștere avea nevoie de un dashboard admin complet care să gestioneze date în timp real din surse multiple, să ofere analize acționabile și să suporte diferite roluri de utilizator cu niveluri variate de permisiuni. Soluția lor existentă era o aplicație legacy jQuery care nu putea scala odată cu baza de utilizatori în creștere rapidă.",
    solution_en:
      "Built a modern React dashboard with TypeScript for type safety and Chart.js for interactive data visualizations. Implemented WebSocket connections for real-time data updates, a custom RBAC system with granular permissions, and a responsive layout that works seamlessly on tablets for warehouse managers. State management uses React Context with optimized re-renders.",
    solution_ro:
      "Am construit un dashboard React modern cu TypeScript pentru type safety și Chart.js pentru vizualizări interactive de date. Am implementat conexiuni WebSocket pentru actualizări de date în timp real, un sistem RBAC custom cu permisiuni granulare și un layout responsiv care funcționează perfect pe tablete pentru managerii de depozit. State management-ul folosește React Context cu re-render-uri optimizate.",
    results_en:
      "The new dashboard reduced data analysis time by 60% and improved team productivity significantly. Real-time updates eliminated the need for manual data refreshes, saving approximately 15 hours per week across the organization. The platform now serves 500+ daily active users with sub-second response times.",
    results_ro:
      "Noul dashboard a redus timpul de analiză a datelor cu 60% și a îmbunătățit semnificativ productivitatea echipei. Actualizările în timp real au eliminat necesitatea refresh-urilor manuale de date, economisind aproximativ 15 ore pe săptămână la nivelul organizației. Platforma servește acum peste 500 de utilizatori activi zilnic cu timpi de răspuns sub o secundă.",
    tech: ["React", "TypeScript", "Tailwind", "Chart.js"],
    year: "2024",
    bgColor: "bg-[#e8a4b8]",
    letter: "R",
    letterColor: "text-[#a8526e]",
    accentColor: "#e8a4b8",
    features_en: [
      "Real-time data updates via WebSocket connections",
      "Custom RBAC system with granular permissions",
      "Interactive Chart.js data visualizations",
      "Responsive layout optimized for tablets",
      "Optimized React Context state management",
    ],
    features_ro: [
      "Actualizări de date în timp real prin WebSocket",
      "Sistem RBAC custom cu permisiuni granulare",
      "Vizualizări interactive de date cu Chart.js",
      "Layout responsiv optimizat pentru tablete",
      "State management optimizat cu React Context",
    ],
    videoDesktop: "/videos/react-dashboard-app-desktop.mp4",
    videoMobile: "/videos/react-dashboard-app-mobile.mp4",
    highlights: [
      { value: "60%", label_en: "Faster Analysis", label_ro: "Analiză Mai Rapidă" },
      { value: "500+", label_en: "Daily Users", label_ro: "Utilizatori Zilnici" },
      { value: "15h", label_en: "Saved Weekly", label_ro: "Economie Săptămânală" },
      { value: "<1s", label_en: "Response Time", label_ro: "Timp de Răspuns" },
    ],
  },
  {
    id: "3",
    slug: "laravel-ecommerce-platform",
    title: "Laravel E-Commerce Platform",
    category: "laravel",
    category_en: "Development & Design",
    category_ro: "Development & Design",
    description_en:
      "Full-featured e-commerce platform with inventory management, payment processing, and multi-vendor support powered by Laravel.",
    description_ro:
      "Platformă e-commerce completă cu management inventar, procesare plăți și suport multi-vendor, dezvoltată cu Laravel.",
    challenge_en:
      "A retail business needed a custom e-commerce platform that could handle multi-vendor operations, complex inventory management across multiple warehouses, and integrate with local Romanian payment processors. Off-the-shelf solutions like Shopify couldn't meet their specific business logic requirements for commission calculations and vendor payouts.",
    challenge_ro:
      "Un business de retail avea nevoie de o platformă e-commerce custom care să gestioneze operațiuni multi-vendor, management complex de inventar pe mai multe depozite și să se integreze cu procesatori de plăți locali din România. Soluțiile off-the-shelf precum Shopify nu puteau îndeplini cerințele specifice de business logic pentru calculul comisioanelor și plățile către vendori.",
    solution_en:
      "Developed a Laravel-based e-commerce platform with a Vue.js storefront. Built a custom multi-vendor system with automated commission calculations, a warehouse management module with real-time stock tracking, and integrated Stripe and local payment gateways. The admin panel features a drag-and-drop product catalog manager and automated email workflows for order processing.",
    solution_ro:
      "Am dezvoltat o platformă e-commerce bazată pe Laravel cu un storefront Vue.js. Am construit un sistem multi-vendor custom cu calcul automat al comisioanelor, un modul de management al depozitelor cu tracking de stoc în timp real și am integrat Stripe și gateway-uri de plată locale. Panoul de administrare include un manager de catalog de produse drag-and-drop și workflow-uri automate de email pentru procesarea comenzilor.",
    results_en:
      "The platform processed over €200K in transactions within the first 6 months. Vendor onboarding time dropped from 2 weeks to 2 days. Automated inventory management reduced stockout incidents by 75%, and the multi-warehouse system improved delivery times by 35% through intelligent order routing.",
    results_ro:
      "Platforma a procesat peste €200K în tranzacții în primele 6 luni. Timpul de onboarding al vendorilor a scăzut de la 2 săptămâni la 2 zile. Managementul automat al inventarului a redus incidentele de stoc epuizat cu 75%, iar sistemul multi-depozit a îmbunătățit timpii de livrare cu 35% prin rutare inteligentă a comenzilor.",
    tech: ["Laravel", "PHP", "MySQL", "Vue.js"],
    year: "2024",
    bgColor: "bg-[#c8cdd0]",
    letter: "L",
    letterColor: "text-[#6b7280]",
    accentColor: "#6b7280",
    features_en: [
      "Multi-vendor system with automated commissions",
      "Real-time stock tracking across warehouses",
      "Stripe and local payment gateway integration",
      "Drag-and-drop product catalog manager",
      "Automated email workflows for order processing",
    ],
    features_ro: [
      "Sistem multi-vendor cu comisioane automate",
      "Tracking de stoc în timp real pe mai multe depozite",
      "Integrare Stripe și gateway-uri de plată locale",
      "Manager de catalog drag-and-drop",
      "Workflow-uri automate de email pentru comenzi",
    ],
    videoDesktop: "/videos/laravel-ecommerce-platform-desktop.mp4",
    videoMobile: "/videos/laravel-ecommerce-platform-mobile.mp4",
    highlights: [
      { value: "€200K+", label_en: "Transactions", label_ro: "Tranzacții" },
      { value: "75%", label_en: "Less Stockouts", label_ro: "Mai Puține Rupturi" },
      { value: "35%", label_en: "Faster Delivery", label_ro: "Livrare Mai Rapidă" },
      { value: "2 days", label_en: "Vendor Onboarding", label_ro: "Onboarding Vendor" },
    ],
  },
  {
    id: "4",
    slug: "opencart-custom-store",
    title: "OpenCart Custom Store",
    category: "opencart",
    category_en: "Development & Design",
    category_ro: "Development & Design",
    description_en:
      "Customized OpenCart online store with bespoke theme, custom modules, and performance optimizations for high-traffic retail.",
    description_ro:
      "Magazin online OpenCart personalizat cu temă la comandă, module custom și optimizări de performanță pentru trafic ridicat.",
    challenge_en:
      "An established retail brand with a catalog of 10,000+ products needed their aging OpenCart store completely revamped. The site was slow, mobile-unfriendly, and losing customers to competitors. They needed a modern shopping experience without migrating away from OpenCart, as their team was already trained on the platform.",
    challenge_ro:
      "Un brand de retail consacrat cu un catalog de peste 10.000 de produse avea nevoie de renovarea completă a magazinului OpenCart. Site-ul era lent, neprietenos pe mobil și pierdea clienți în favoarea concurenței. Aveau nevoie de o experiență de shopping modernă fără a migra de pe OpenCart, deoarece echipa lor era deja instruită pe platformă.",
    solution_en:
      "Created a completely custom OpenCart theme with a mobile-first approach. Built custom modules for advanced filtering, quick-view product previews, and a streamlined checkout process. Implemented Redis caching, image optimization pipeline, and database query optimization to handle the large product catalog efficiently. Added a PWA layer for mobile users.",
    solution_ro:
      "Am creat o temă OpenCart complet custom cu abordare mobile-first. Am construit module custom pentru filtrare avansată, previzualizare rapidă a produselor și un proces de checkout simplificat. Am implementat caching Redis, pipeline de optimizare a imaginilor și optimizare a query-urilor de bază de date pentru gestionarea eficientă a catalogului mare de produse. Am adăugat un layer PWA pentru utilizatorii mobili.",
    results_en:
      "Mobile conversion rate increased by 150% after the redesign. Page load times improved from 6.5s to 1.8s. The optimized checkout flow reduced cart abandonment by 30%, and the PWA implementation drove a 25% increase in returning mobile visitors.",
    results_ro:
      "Rata de conversie pe mobil a crescut cu 150% după redesign. Timpii de încărcare a paginilor s-au îmbunătățit de la 6.5s la 1.8s. Fluxul de checkout optimizat a redus abandonul coșului cu 30%, iar implementarea PWA a generat o creștere de 25% a vizitatorilor mobili care revin.",
    tech: ["OpenCart", "PHP", "MySQL", "JavaScript"],
    year: "2024",
    bgColor: "bg-[#1a3a2a]",
    letter: "O",
    letterColor: "text-[#4ade80]/30",
    accentColor: "#4ade80",
    features_en: [
      "Mobile-first custom theme design",
      "Advanced filtering and quick-view previews",
      "Redis caching and image optimization pipeline",
      "Streamlined checkout process",
      "PWA layer for mobile users",
    ],
    features_ro: [
      "Design custom mobile-first",
      "Filtrare avansată și previzualizare rapidă",
      "Caching Redis și pipeline de optimizare imagini",
      "Proces de checkout simplificat",
      "Layer PWA pentru utilizatori mobili",
    ],
    videoDesktop: "/videos/opencart-custom-store-desktop.mp4",
    videoMobile: "/videos/opencart-custom-store-mobile.mp4",
    highlights: [
      { value: "150%", label_en: "Mobile Conversions", label_ro: "Conversii Mobile" },
      { value: "1.8s", label_en: "Load Time", label_ro: "Timp Încărcare" },
      { value: "30%", label_en: "Less Abandonment", label_ro: "Mai Puțin Abandon" },
      { value: "10K+", label_en: "Products", label_ro: "Produse" },
    ],
  },
  {
    id: "5",
    slug: "nextjs-portfolio-website",
    title: "Next.js Portfolio Website",
    category: "react",
    category_en: "Development & Design",
    category_ro: "Development & Design",
    description_en:
      "A performant personal portfolio with i18n, animations, and modern design patterns built with Next.js 16 and React 19.",
    description_ro:
      "Un portofoliu personal performant cu i18n, animații și pattern-uri moderne de design, construit cu Next.js 16 și React 19.",
    challenge_en:
      "Needed a portfolio that would stand out in a crowded market of developer portfolios. It had to showcase technical expertise through its own implementation — with buttery smooth animations, perfect accessibility scores, bilingual content, and a design that feels premium without being over-the-top.",
    challenge_ro:
      "Aveam nevoie de un portofoliu care să iasă în evidență într-o piață aglomerată de portofolii de developeri. Trebuia să demonstreze expertiză tehnică prin propria implementare — cu animații fluide, scoruri perfecte de accesibilitate, conținut bilingv și un design care să se simtă premium fără a fi exagerat.",
    solution_en:
      "Built with Next.js 16 and React 19, leveraging the latest features including Server Components and the App Router. Implemented GSAP-powered scroll animations with SplitText for typography effects, Three.js for 3D elements, and next-intl for seamless Romanian/English switching. The dark theme with lime-green accents was crafted in Tailwind CSS 4 using custom theme tokens.",
    solution_ro:
      "Construit cu Next.js 16 și React 19, valorificând cele mai noi funcționalități inclusiv Server Components și App Router. Am implementat animații de scroll cu GSAP și SplitText pentru efecte tipografice, Three.js pentru elemente 3D și next-intl pentru comutare fluidă română/engleză. Tema dark cu accente verde-lime a fost realizată în Tailwind CSS 4 folosind token-uri custom de temă.",
    results_en:
      "The portfolio achieves 100/100 Lighthouse performance scores and loads in under 1 second on 4G connections. The bilingual implementation seamlessly serves Romanian and English audiences. Scroll-driven animations maintain 60fps across all tested devices, and the site has generated multiple freelance inquiries since launch.",
    results_ro:
      "Portofoliul obține scoruri Lighthouse de 100/100 la performanță și se încarcă în sub 1 secundă pe conexiuni 4G. Implementarea bilingvă servește fără probleme audiențe din România și internaționale. Animațiile bazate pe scroll mențin 60fps pe toate dispozitivele testate, iar site-ul a generat multiple solicitări de freelancing de la lansare.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    year: "2025",
    bgColor: "bg-[#1a1a3a]",
    letter: "N",
    letterColor: "text-[#818cf8]/30",
    accentColor: "#818cf8",
    features_en: [
      "GSAP-powered scroll animations with SplitText",
      "Three.js 3D elements and interactions",
      "Seamless Romanian/English i18n switching",
      "Dark theme with custom Tailwind CSS 4 tokens",
      "Server Components and App Router architecture",
    ],
    features_ro: [
      "Animații de scroll cu GSAP și SplitText",
      "Elemente și interacțiuni 3D cu Three.js",
      "Comutare fluidă i18n română/engleză",
      "Temă dark cu token-uri custom Tailwind CSS 4",
      "Arhitectură Server Components și App Router",
    ],
    liveUrl: "https://lucianionut.com",
    sourceUrl: "https://github.com/lucianionut",
    videoDesktop: "/videos/nextjs-portfolio-website-desktop.mp4",
    videoMobile: "/videos/nextjs-portfolio-website-mobile.mp4",
    highlights: [
      { value: "100", label_en: "Lighthouse Score", label_ro: "Scor Lighthouse" },
      { value: "<1s", label_en: "Load Time", label_ro: "Timp Încărcare" },
      { value: "60fps", label_en: "Animations", label_ro: "Animații" },
      { value: "2", label_en: "Languages", label_ro: "Limbi" },
    ],
  },
  {
    id: "6",
    slug: "wordpress-starter-theme",
    title: "WordPress Starter Theme",
    category: "wordpress",
    category_en: "Development",
    category_ro: "Development",
    description_en:
      "Lightweight WordPress starter theme with modern build tools, block editor support, and developer-friendly architecture.",
    description_ro:
      "Temă starter WordPress ușoară cu tool-uri moderne de build, suport block editor și arhitectură developer-friendly.",
    challenge_en:
      "WordPress developers often start new projects from bloated starter themes or completely from scratch, wasting hours on boilerplate setup. There was a need for a clean, modern starter theme that embraced Gutenberg blocks, used modern build tools, and provided a solid foundation without imposing design opinions.",
    challenge_ro:
      "Developerii WordPress încep adesea proiecte noi de la teme starter supraîncărcate sau complet de la zero, irosind ore pe setup de boilerplate. Era nevoie de o temă starter curată și modernă care să adopte blocurile Gutenberg, să folosească tool-uri moderne de build și să ofere o fundație solidă fără a impune opinii de design.",
    solution_en:
      "Created a minimal WordPress starter theme with Webpack 5 for asset bundling, SCSS modules for styling, and full Gutenberg block editor support. Included custom block patterns, a theme.json configuration for the editor, and automated deployment scripts. The architecture follows WordPress coding standards with modern PHP practices.",
    solution_ro:
      "Am creat o temă starter WordPress minimală cu Webpack 5 pentru bundling de assets, module SCSS pentru styling și suport complet pentru editorul de blocuri Gutenberg. Include pattern-uri de blocuri custom, configurație theme.json pentru editor și scripturi automate de deployment. Arhitectura urmează standardele de cod WordPress cu practici PHP moderne.",
    results_en:
      "The starter theme has been used as the foundation for 15+ client projects, saving an estimated 20 hours per project in initial setup time. It has been downloaded over 500 times from GitHub and received contributions from 8 developers in the WordPress community.",
    results_ro:
      "Tema starter a fost folosită ca fundație pentru peste 15 proiecte de clienți, economisind aproximativ 20 de ore per proiect în timpul de setup inițial. A fost descărcată de peste 500 de ori de pe GitHub și a primit contribuții de la 8 developeri din comunitatea WordPress.",
    tech: ["WordPress", "PHP", "Webpack", "SCSS"],
    year: "2023",
    bgColor: "bg-[#2a2a1a]",
    letter: "S",
    letterColor: "text-[#facc15]/30",
    accentColor: "#facc15",
    features_en: [
      "Webpack 5 asset bundling pipeline",
      "Full Gutenberg block editor support",
      "Custom block patterns and theme.json config",
      "Automated deployment scripts",
      "WordPress coding standards with modern PHP",
    ],
    features_ro: [
      "Pipeline de bundling cu Webpack 5",
      "Suport complet pentru editorul Gutenberg",
      "Pattern-uri de blocuri custom și config theme.json",
      "Scripturi automate de deployment",
      "Standarde WordPress cu PHP modern",
    ],
    sourceUrl: "https://github.com/lucianionut",
    videoDesktop: "/videos/wordpress-starter-theme-desktop.mp4",
    videoMobile: "/videos/wordpress-starter-theme-mobile.mp4",
    highlights: [
      { value: "15+", label_en: "Projects Built", label_ro: "Proiecte Construite" },
      { value: "20h", label_en: "Saved Per Project", label_ro: "Economie Per Proiect" },
      { value: "500+", label_en: "Downloads", label_ro: "Descărcări" },
      { value: "8", label_en: "Contributors", label_ro: "Contribuitori" },
    ],
  },
  {
    id: "7",
    slug: "laravel-cms-platform",
    title: "Laravel CMS Platform",
    category: "laravel",
    category_en: "Development & Design",
    category_ro: "Development & Design",
    description_en:
      "Flexible content management system with visual page builder, media management, and multilingual support built on Laravel.",
    description_ro:
      "Sistem flexibil de management al conținutului cu page builder vizual, management media și suport multilingv, construit pe Laravel.",
    challenge_en:
      "Multiple clients needed a content management solution that was more flexible than WordPress but simpler than enterprise CMS platforms. They required visual page building, multilingual support, and the ability to extend with custom modules — all while maintaining a clean, intuitive interface for non-technical content editors.",
    challenge_ro:
      "Mai mulți clienți aveau nevoie de o soluție de management al conținutului mai flexibilă decât WordPress dar mai simplă decât platformele CMS enterprise. Cereau page building vizual, suport multilingv și posibilitatea de a extinde cu module custom — toate menținând o interfață curată și intuitivă pentru editorii de conținut non-tehnici.",
    solution_en:
      "Developed a modular CMS on Laravel with a drag-and-drop page builder using Alpine.js, a robust media library with automatic image optimization, and built-in multilingual content management. The system features a plugin architecture that allows custom modules to be added without modifying core code. Sold as a product on CodeCanyon.",
    solution_ro:
      "Am dezvoltat un CMS modular pe Laravel cu un page builder drag-and-drop folosind Alpine.js, o bibliotecă media robustă cu optimizare automată a imaginilor și management multilingv al conținutului integrat. Sistemul include o arhitectură de plugin-uri care permite adăugarea de module custom fără modificarea codului de bază. Vândut ca produs pe CodeCanyon.",
    results_en:
      "The CMS platform generated consistent sales on CodeCanyon with a 4.9/5 star rating. It powers 200+ websites across 15 countries. The plugin architecture has enabled 12 official extensions and multiple community-built modules. Average client onboarding time for content editors is under 30 minutes.",
    results_ro:
      "Platforma CMS a generat vânzări consistente pe CodeCanyon cu un rating de 4.9/5 stele. Alimentează peste 200 de website-uri în 15 țări. Arhitectura de plugin-uri a permis 12 extensii oficiale și multiple module construite de comunitate. Timpul mediu de onboarding al editorilor de conținut este sub 30 de minute.",
    tech: ["Laravel", "PHP", "Alpine.js", "MySQL"],
    year: "2023",
    bgColor: "bg-[#1a2a2a]",
    letter: "C",
    letterColor: "text-[#2dd4bf]/30",
    accentColor: "#2dd4bf",
    features_en: [
      "Drag-and-drop visual page builder",
      "Robust media library with auto optimization",
      "Built-in multilingual content management",
      "Plugin architecture for custom extensions",
      "Intuitive interface for non-technical editors",
    ],
    features_ro: [
      "Page builder vizual drag-and-drop",
      "Bibliotecă media cu optimizare automată",
      "Management multilingv de conținut integrat",
      "Arhitectură de plugin-uri pentru extensii custom",
      "Interfață intuitivă pentru editori non-tehnici",
    ],
    liveUrl: "https://codecanyon.net",
    videoDesktop: "/videos/laravel-cms-platform-desktop.mp4",
    videoMobile: "/videos/laravel-cms-platform-mobile.mp4",
    highlights: [
      { value: "200+", label_en: "Websites Powered", label_ro: "Website-uri Alimentate" },
      { value: "4.9/5", label_en: "User Rating", label_ro: "Rating Utilizatori" },
      { value: "15", label_en: "Countries", label_ro: "Țări" },
      { value: "12", label_en: "Extensions", label_ro: "Extensii" },
    ],
  },
  {
    id: "8",
    slug: "opencart-marketplace",
    title: "OpenCart Marketplace",
    category: "opencart",
    category_en: "Development & Design",
    category_ro: "Development & Design",
    description_en:
      "Multi-vendor marketplace extension for OpenCart with vendor dashboards, commission management, and automated payouts.",
    description_ro:
      "Extensie marketplace multi-vendor pentru OpenCart cu dashboard-uri vendor, management comisioane și plăți automate.",
    challenge_en:
      "An entrepreneur wanted to build a multi-vendor marketplace similar to Etsy but for local artisans, using OpenCart as the base platform. The main challenge was creating a complete vendor ecosystem within OpenCart's architecture — including separate vendor storefronts, automated commission splitting, and a vendor dashboard that non-technical sellers could use easily.",
    challenge_ro:
      "Un antreprenor dorea să construiască un marketplace multi-vendor similar cu Etsy dar pentru artizani locali, folosind OpenCart ca platformă de bază. Provocarea principală a fost crearea unui ecosistem complet de vendori în cadrul arhitecturii OpenCart — incluzând storefront-uri separate pentru vendori, împărțire automată a comisioanelor și un dashboard pentru vendori pe care vânzătorii non-tehnici să îl poată folosi ușor.",
    solution_en:
      "Built a comprehensive OpenCart extension that transforms any store into a multi-vendor marketplace. Each vendor gets a branded storefront, product management tools, and a sales analytics dashboard. The system handles automatic commission calculations, supports multiple payout methods (bank transfer, PayPal), and includes a review/rating system for vendors. A REST API enables mobile app integration.",
    solution_ro:
      "Am construit o extensie OpenCart completă care transformă orice magazin într-un marketplace multi-vendor. Fiecare vendor primește un storefront branded, instrumente de management al produselor și un dashboard de analiză a vânzărilor. Sistemul gestionează calculul automat al comisioanelor, suportă multiple metode de plată (transfer bancar, PayPal) și include un sistem de recenzii/rating pentru vendori. Un REST API permite integrarea cu aplicații mobile.",
    results_en:
      "The marketplace extension has been deployed for 3 major clients, collectively hosting 150+ vendors. Monthly transaction volume reached €50K within 3 months of launch for the largest deployment. Vendor satisfaction scores average 4.7/5, and the automated payout system processes 500+ monthly payments without manual intervention.",
    results_ro:
      "Extensia marketplace a fost implementată pentru 3 clienți majori, găzduind colectiv peste 150 de vendori. Volumul lunar de tranzacții a atins €50K în primele 3 luni de la lansare pentru cea mai mare implementare. Scorurile de satisfacție ale vendorilor sunt în medie 4.7/5, iar sistemul automat de plăți procesează peste 500 de plăți lunare fără intervenție manuală.",
    tech: ["OpenCart", "PHP", "MySQL", "REST API"],
    year: "2023",
    bgColor: "bg-[#2a1a2a]",
    letter: "M",
    letterColor: "text-[#c084fc]/30",
    accentColor: "#c084fc",
    features_en: [
      "Branded vendor storefronts",
      "Automated commission calculations and payouts",
      "Multiple payout methods (bank, PayPal)",
      "Vendor review and rating system",
      "REST API for mobile app integration",
    ],
    features_ro: [
      "Storefront-uri branded pentru vendori",
      "Calcul automat al comisioanelor și plăților",
      "Multiple metode de plată (bancă, PayPal)",
      "Sistem de recenzii și rating pentru vendori",
      "REST API pentru integrare cu aplicații mobile",
    ],
    videoDesktop: "/videos/opencart-marketplace-desktop.mp4",
    videoMobile: "/videos/opencart-marketplace-mobile.mp4",
    highlights: [
      { value: "150+", label_en: "Vendors", label_ro: "Vendori" },
      { value: "€50K", label_en: "Monthly Volume", label_ro: "Volum Lunar" },
      { value: "4.7/5", label_en: "Vendor Rating", label_ro: "Rating Vendori" },
      { value: "500+", label_en: "Monthly Payouts", label_ro: "Plăți Lunare" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
