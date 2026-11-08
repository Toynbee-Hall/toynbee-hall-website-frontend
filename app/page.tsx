import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ContentBlockRenderer from '../components/ContentBlockRenderer';
import homepage from '../content/homepage.json';
import type { HomePageContent } from '../content/types';

const data = homepage as HomePageContent;

export default function Home() {
  return (
    <>
      <SiteHeader/>
      <main id="main">
        {data.blocks.map((block, index) => <ContentBlockRenderer block={block} key={`${block.type}-${index}`}/>)}
      </main>
      <SiteFooter/>
    </>
  );
}
