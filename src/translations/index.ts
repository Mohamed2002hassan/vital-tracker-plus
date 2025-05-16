
import { Language, TranslationValues } from '../types/language';
import { ar } from './ar';
import { en } from './en';

// Create translations object
const translations: Record<Language, TranslationValues> = {
  ar: ar,
  en: en
};

export default translations;
