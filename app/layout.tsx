import type { Metadata } from 'next';
import site from '../content/site.json';
import './styles.css';

export const metadata: Metadata = site.metadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang={site.language}><body>{children}</body></html>;
}
