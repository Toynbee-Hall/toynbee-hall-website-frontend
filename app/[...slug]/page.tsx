import { notFound } from 'next/navigation';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import ContentPageTemplate from '../../components/ContentPageTemplate';
import { genericRoutes, pages } from '../../content';
import type { ContentBlock, PageContent } from '../../content/types';
import site from '../../content/site.json';

export function generateStaticParams() {
  const pagePaths = Object.values(pages).flatMap(page => [page.route || `/${page.slug}/`, ...(page.aliases ?? [])].map(route => route.split('/').filter(Boolean)));
  const uniquePaths = new Map([...pagePaths, ...genericRoutes.map(slug => [slug])].map(path => [path.join('/'), path]));
  return Array.from(uniquePaths.values(), slug => ({ slug }));
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.at(-1) || '';
  const requestedPath = `/${slug.join('/')}/`.replace(/\/+/g, '/');
  const routedPage = Object.values(pages).find(page => [page.route || `/${page.slug}/`, ...(page.aliases ?? [])].some(route => `/${route.split('/').filter(Boolean).join('/')}/` === requestedPath));
  const fallback: PageContent | undefined = genericRoutes.includes(key) ? {
    slug: key,
    title: key.split('-').map(word => word === 'and' ? '&' : word[0]?.toUpperCase() + word.slice(1)).join(' '),
    intro: site.shared.genericPageIntro,
    blocks: site.shared.genericPageBlocks as ContentBlock[],
  } : undefined;
  const data = routedPage ?? pages[key] ?? fallback;
  if (!data) notFound();
  return <><SiteHeader/><ContentPageTemplate data={data}/><SiteFooter/></>;
}
