import { getRequestConfig } from 'next-intl/server';
import type { GetRequestConfigParams } from 'next-intl/server';
import { locales, defaultLocale, getMessages, type Locale } from './config';

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
  // Validate that the incoming locale is supported
  const currentLocale = locale as string;
  if (!locales.includes(currentLocale as Locale)) {
    return {
      locale: defaultLocale,
      messages: await getMessages(defaultLocale),
      timeZone: 'Asia/Kolkata',
      now: new Date(),
    };
  }
  
  // Load messages for the current locale
  const safeLocale = currentLocale as Locale;
  const messages = await getMessages(safeLocale);
  
  return {
    locale: safeLocale, // Add the locale property as required by next-intl 3.22
    messages,
    timeZone: 'Asia/Kolkata',
    now: new Date(),
  };
});