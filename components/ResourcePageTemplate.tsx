import type { ResourcePageContent } from '../content/types';
import { displayExcerpt } from '../content/excerpts';
import ContentBlockRenderer from './ContentBlockRenderer';

export default function ResourcePageTemplate({ data }: { data: ResourcePageContent }) {
  const intro = displayExcerpt(data.intro, true);
  const downloads = data.downloads.length ? <ContentBlockRenderer block={{ type: 'resourceList', heading: 'Download this resource', resources: data.downloads }}/> : null;
  const original = data.route?.startsWith('/training-resources/') ? `https://www.toynbeehall.org.uk${data.route}` : undefined;
  return <main id="main" className="resource-page"><header className="resource-header"><div className="wrap">{data.category && <p className="eyebrow">{data.category}</p>}<h1>{data.title}</h1>{intro && <p>{intro}</p>}{(data.author || data.publishedAt) && <div className="article-meta">{data.author && <span>By {data.author}</span>}{data.publishedAt && <time dateTime={data.publishedAt}>{new Date(data.publishedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}</time>}</div>}</div></header>
    <div className="resource-layout wrap">
      <article className="page-article">
        {data.blocks.map((block, i) => <ContentBlockRenderer block={block} key={`${block.type}-${i}`}/>)}
        {!data.blocks.length && downloads}
        {!downloads && original && <a className="button" href={original}>View the original resource<span aria-hidden="true">↗</span></a>}
      </article>
      {data.blocks.length > 0 && downloads && <aside className="resource-downloads">{downloads}</aside>}
    </div>
    {data.related?.length ? <div className="wrap article-related"><ContentBlockRenderer block={{ type: 'relatedContent', heading: 'Related resources', items: data.related }}/></div> : null}
  </main>;
}
