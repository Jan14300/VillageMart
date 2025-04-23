import { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n/config'; // ✅ updated import

export default function getRequestConfig(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const pathnameLocale = pathname.split('/')[1];

    const locale = locales.includes(pathnameLocale as (typeof locales)[number])
        ? pathnameLocale
        : defaultLocale;

    return {
        locale: locale // Explicitly return the locale property as required by next-intl
    };
}
