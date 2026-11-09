import type { ArticlePageContent } from '../content/types';
import { displayExcerpt } from '../content/excerpts';
import ContentBlockRenderer from './ContentBlockRenderer';

export default function ArticlePageTemplate({ data }: { data: ArticlePageContent }) {
  const intro = displayExcerpt(data.intro, true);
  return <main id="main" className="article-page"><header className="article-header"><div className="wrap">
    {data.category && <p className="eyebrow">{data.category}</p>}<h1>{data.title}</h1>{intro && <p className="article-intro">{intro}</p>}
    {(data.author || data.publishedAt || data.updatedAt) && <div className="article-meta">{data.author && <span>By {data.author}</span>}{data.publishedAt && <time dateTime={data.publishedAt}>{new Date(data.publishedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}</time>}{data.updatedAt && <span>Updated <time dateTime={data.updatedAt}>{new Date(data.updatedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}</time></span>}</div>}
  </div></header>
  <div className="article-body wrap">
  {data.image && <figure className="article-lead-image"><img src={data.image.src} alt={data.image.alt}/>{(data.image.caption || data.image.credit) && <figcaption>{data.image.caption}{data.image.credit && <span>{data.image.caption ? ' · ' : ''}{data.image.credit}</span>}</figcaption>}</figure>}
  <article className="page-article">{data.blocks.map((block, i) => <ContentBlockRenderer block={block} key={`${block.type}-${i}`}/>)}</article></div>
  {data.related?.length ? <div className="wrap article-related"><ContentBlockRenderer block={{ type: 'relatedContent', heading: 'Related stories', items: data.related }}/></div> : null}
  </main>;
}
