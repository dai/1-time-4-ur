import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        if (value === undefined || value === null) {
          break;
        }
        value = value[k];
      }
      
      // If translation not found, try fallback to Japanese, then English
      if (value === undefined || value === null) {
        let fallbackValue: any = translations.ja;
        for (const k of keys) {
          if (fallbackValue === undefined || fallbackValue === null) {
            break;
          }
          fallbackValue = fallbackValue[k];
        }
        
        if (fallbackValue === undefined || fallbackValue === null) {
          fallbackValue = translations.en;
          for (const k of keys) {
            if (fallbackValue === undefined || fallbackValue === null) {
              break;
            }
            fallbackValue = fallbackValue[k];
          }
        }
        
        return fallbackValue || key;
      }
      
      return value;
    } catch (error) {
      console.error('Translation error for key:', key, error);
      return key;
    }
  };

  return { t, language };
}