
import { Language, TranslationValues } from '../types/language';
import arabicTranslations from './ar';
import englishTranslations from './en';

// Create translations object
const translations: Record<Language, TranslationValues> = {
  ar: arabicTranslations,
  en: englishTranslations
};

export default translations;
