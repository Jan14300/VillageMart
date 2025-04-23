import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';
import Image from 'next/image';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}

// Home component removed to fix build error
