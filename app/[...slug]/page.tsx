import { notFound } from 'next/navigation';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import ContentPageTemplate from '../../components/ContentPageTemplate';
import { genericRoutes, pages } from '../../content';
import type { PageContent } from '../../content/types';
import site from '../../content/site.json';

export function generateStaticParams() {
  return Array.from(new Set([...Object.keys(pages), ...genericRoutes])).map(slug => ({ slug: [slug] }));
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.at(-1) || '';
  const fallback: PageContent | undefined = genericRoutes.includes(key) ? {
    slug: key,
    title: key.split('-').map(word => word === 'and' ? '&' : word[0]?.toUpperCase() + word.slice(1)).join(' '),
    intro: site.shared.genericPageIntro,
    blocks: site.shared.genericPageBlocks as PageContent['blocks'],
  } : undefined;
  const data = pages[key] ?? fallback;
  if (!data) notFound();
  return <><SiteHeader/><ContentPageTemplate data={data}/><SiteFooter/></>;
}
