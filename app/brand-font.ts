import { Outfit } from 'next/font/google';

// The brand guidelines use Outfit Light, Medium and SemiBold. Shared by the brand-styled routes.
export const brandFont = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--bi-font', display: 'swap' });
