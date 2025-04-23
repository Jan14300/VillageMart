export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];

// Default locale to fall back on
export const defaultLocale: Locale = 'en';

// Human-readable language names (for dropdowns, selectors, etc.)
export const localeNames: Record<Locale, string> = {
  en: 'English',
};

// Text direction settings (if you need to support RTL in the future)
export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
};

// Dynamically load translations for server components
export async function getMessages(locale: Locale) {
  try {
    const messages = await import(`./locales/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`❌ Could not load messages for locale "${locale}"`, error);
    return {};
  }
}

// Fix: This function should return the correct locale for the middleware
export function getRequestConfig() {
  return {
    locale: defaultLocale, // You can modify this based on user locale detection logic
  };
}