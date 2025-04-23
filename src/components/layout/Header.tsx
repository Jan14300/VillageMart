"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';
import { useCart } from '@/lib/context/CartContext';
import { Button } from '@/components/ui/Button';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  // Extract locale from pathname
  const currentLocale = pathname ? pathname.split('/')[1] || 'en' : 'en';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (locale: Locale) => {
    // Here we would navigate to the same path but with a different locale
    const newPath = `/${locale}${pathname ? pathname.substring(3) || '' : ''}`;
    router.push(newPath);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            Village Mart
          </Link>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder={t('search')}
                className="w-full pl-10 pr-4 py-2 text-black font-bold rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                suppressHydrationWarning
              />
              <FiSearch className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            {/* Fix the type in the language switcher */}
            <select
              value={currentLocale}
              onChange={(e) => changeLanguage(e.target.value as Locale)}
              className="bg-transparent text-primary font-medium border border-gray-300 rounded-md py-1 pl-2 pr-8"
              suppressHydrationWarning
            >
              {locales.map((locale) => (
                <option key={locale} value={locale}>
                  {localeNames[locale]}
                </option>
              ))}
            </select>

            <Link href={`/${currentLocale}/cart`} className="p-2 relative inline-flex">
              <FiShoppingCart className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            </Link>

            <Link href={`/${currentLocale}/login`}>
              <Button variant="default">
                {t('login')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md md:hidden text-gray-500 hover:bg-gray-100"
          >
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search')}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              suppressHydrationWarning
            />
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-2 space-y-2">
            <Link href={`/${currentLocale}/cart`} className="flex items-center p-2 hover:bg-gray-100 rounded-md">
              <FiShoppingCart className="mr-2" />
              {t('cart')}
              <span className="ml-auto bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            </Link>



            <Link href="/orders" className="block p-2 hover:bg-gray-100 rounded-md">
              {t('orders')}
            </Link>

            <div className="p-2 hover:bg-gray-100 rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('language')}
              </label>
              <div className="flex space-x-2">
                {locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => changeLanguage(locale)}
                    className={`px-3 py-1.5 rounded-md text-sm ${currentLocale === locale
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    {localeNames[locale]}
                  </button>
                ))}
              </div>
            </div>

            <Link href={`/${currentLocale}/login`} className="block p-2">
              <Button variant="default" className="w-full">
                {t('login')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}