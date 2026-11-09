import type { ListingPageContent } from '../content/types';
import ContentBlockRenderer from './ContentBlockRenderer';
import ListingResults from './ListingResults';

const labels = { news: 'News', blogs: 'Blogs', events: 'Events', resources: 'Resources', category: 'Stories' };

export default function ListingPageTemplate({ data }: { data: ListingPageContent }) {
  return <main id="main" className={`listing-page listing-${data.listingType}`}><header className="listing-header"><div className="wrap"><p className="eyebrow">{labels[data.listingType]}</p><h1>{data.title}</h1>{data.intro && <p>{data.intro}</p>}</div></header>
    <section className="listing-content wrap" aria-label={`${labels[data.listingType]} listing`}><ListingResults data={data}/>{data.blocks?.map((block, i) => <ContentBlockRenderer block={block} key={`${block.type}-${i}`}/>)}</section>
  </main>;
}
