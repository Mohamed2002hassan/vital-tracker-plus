
// Define available languages
export type Language = 'ar' | 'en';

// Define the context type
export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Define the translations structure
export interface TranslationValues {
  [key: string]: string;
}
