import en from '../locales/en.json';

export const useTranslation = () => {
  const t = (key) => {
    const keys = key.split('.');
    let value = en;
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key; // Return key if not found
      }
    }
    return value;
  };

  return { t };
};
