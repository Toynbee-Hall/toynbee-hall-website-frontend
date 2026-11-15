import type { PageContent, StandardPageContent } from '../content/types';
import ArticlePageTemplate from './ArticlePageTemplate';
import BrandPageTemplate from './BrandPageTemplate';
import EventPageTemplate from './EventPageTemplate';
import ListingPageTemplate from './ListingPageTemplate';
import ResourcePageTemplate from './ResourcePageTemplate';
import StandardPageTemplate from './StandardPageTemplate';

export default function ContentPageTemplate({ data }: { data: PageContent }) {
  switch (data.template) {
    case 'brand': return <BrandPageTemplate data={data}/>;
    case 'article': return <ArticlePageTemplate data={data}/>;
    case 'event': return <EventPageTemplate data={data}/>;
    case 'resource': return <ResourcePageTemplate data={data}/>;
    case 'listing': return <ListingPageTemplate data={data}/>;
    default: return <StandardPageTemplate data={data as StandardPageContent}/>;
  }
}
