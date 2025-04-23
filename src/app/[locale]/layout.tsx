import { defaultLocale, locales } from '@/i18n/config';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { CartProvider } from '@/lib/context/CartContext';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Village Mart',
  description: 'Delivering products to every rural corner',
};

// Create type from locales
type Locale = typeof locales[number];

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const dynamic = 'force-dynamic'; // or use generateStaticParams below

export default async function LocaleLayout(props: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { children, params } = props;

  // Await params before accessing its properties
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`@/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`❌ Failed to load messages for locale "${locale}":`, error);
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Kolkata">
      <CartProvider>
        {children}
      </CartProvider>
    </NextIntlClientProvider>
  );
}