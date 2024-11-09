import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // Supported locales
  locales: ['en', 'tr'],
  
  // Default locale
  defaultLocale: 'tr',
});

// Wrappers for Next.js navigation APIs
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
