import type { StandardPageContent } from '../content/types';
import site from '../content/site.json';
import ContentBlockRenderer from './ContentBlockRenderer';
import PageBanner from './PageBanner';

export default function StandardPageTemplate({ data }: { data: StandardPageContent }) {
  const fullWidth = data.layout === 'full-width';
  const pageCta = data.pageCta === undefined ? site.shared.pageCta : data.pageCta;
  return <main id="main" className={`standard-page${fullWidth ? ' standard-page-full' : ''}`}>
    <PageBanner slug={data.slug} route={data.route} title={data.title} intro={data.intro} image={data.image} variant={fullWidth ? 'watermark' : 'frame'}/>
    <div className={`page-content wrap${fullWidth ? ' page-content-full' : ''}`}>
      <article className="page-article">{data.blocks.map((block, i) => <ContentBlockRenderer block={block} key={`${block.type}-${i}`}/>) }
        {pageCta && <a className="button" href={pageCta.href}>{pageCta.label}<span aria-hidden="true">↗</span></a>}
      </article>
      {!fullWidth && <aside className="page-sidebar" aria-label={site.shared.exploreHeading}><p className="eyebrow">{site.shared.exploreHeading}</p>{site.shared.exploreLinks.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</aside>}
    </div>
  </main>;
}
