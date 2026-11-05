import type { PageContent } from '../content/types';
import site from '../content/site.json';
import ContentBlockRenderer from './ContentBlockRenderer';

export default function ContentPageTemplate({ data }: { data: PageContent }) {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">{site.shared.pageEyebrow}</p>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
        </div>
      </section>
      <section className="page-content wrap">
        <aside>
          <p className="eyebrow">{site.shared.exploreHeading}</p>
          {site.shared.exploreLinks.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}
        </aside>
        <article className="page-article">
          {data.blocks.map((block, index) => <ContentBlockRenderer block={block} key={`${block.type}-${index}`}/>)}
          <a className="button" href={site.shared.pageCta.href}>{site.shared.pageCta.label} <span>↗</span></a>
        </article>
      </section>
    </main>
  );
}
