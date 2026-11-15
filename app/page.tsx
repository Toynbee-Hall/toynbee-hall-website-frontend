import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import BrandBlockRenderer from '../components/BrandBlockRenderer';
import homepage from '../content/homepage.json';
import type { HomePageContent } from '../content/types';
import { brandFont } from './brand-font';
import './brand-inventory.css';

const data = homepage as HomePageContent;

// Blocks that run the full window width; their content still lines up with the page width.
const fullWindow = new Set(['hero', 'newsletterSignup']);

/* The homepage, rendered with the brand guidelines blocks from /brand-content-block-inventory/. */
export default function Home() {
  return (
    <>
      <SiteHeader/>
      <main id="main" className={`bi bi-home ${brandFont.variable}`}>
        {data.blocks.map((block, index) => <div className={`bi-section bi-section-${block.type}${fullWindow.has(block.type) ? '' : ' bi-wrap'}`} key={`${block.type}-${index}`}>
          <BrandBlockRenderer block={block} pageTitle={index === 0}/>
        </div>)}
      </main>
      <SiteFooter/>
    </>
  );
}
