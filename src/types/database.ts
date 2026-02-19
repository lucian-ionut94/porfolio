export interface DbProject {
  id: string;
  slug: string;
  slug_en: string;
  slug_ro: string;
  title: string;
  category: string;
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
  bg_color: string;
  letter: string;
  letter_color: string;
  accent_color: string;
  live_url: string | null;
  source_url: string | null;
  features_en: string[];
  features_ro: string[];
  feature_image: string;
  video_desktop: string;
  video_mobile: string;
  highlights: { value: string; label_en: string; label_ro: string }[];
  meta_title_en: string | null;
  meta_title_ro: string | null;
  meta_desc_en: string | null;
  meta_desc_ro: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbArticle {
  id: string;
  slug: string;
  slug_en: string;
  slug_ro: string;
  title_en: string;
  title_ro: string;
  excerpt_en: string;
  excerpt_ro: string;
  body_en: string[];
  body_ro: string[];
  category: string;
  category_en: string;
  category_ro: string;
  date: string;
  read_time: number;
  accent: string;
  bg_from: string;
  bg_to: string;
  icon: string;
  feature_image: string;
  ad_image: string;
  ad_link: string;
  meta_title_en: string | null;
  meta_title_ro: string | null;
  meta_desc_en: string | null;
  meta_desc_ro: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbPageSeo {
  id: string;
  page_key: string;
  meta_title_en: string;
  meta_title_ro: string;
  meta_desc_en: string;
  meta_desc_ro: string;
  og_image: string;
  created_at: string;
  updated_at: string;
}

export interface DbTranslation {
  id: string;
  namespace: string;
  key: string;
  value_en: string;
  value_ro: string;
  created_at: string;
  updated_at: string;
}
