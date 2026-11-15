import type { BrandPageContent } from '../content/types';
import site from '../content/site.json';
import { brandFont } from '../app/brand-font';
import BrandBlockRenderer, { BrandPageBanner } from './BrandBlockRenderer';
import '../app/brand-inventory.css';

// Blocks whose backgrounds run the full window width; their content still lines up with the page width.
const fullWindow = new Set(['hero', 'newsletterSignup']);

/* A content page built from the brand inventory blocks (/brand-content-block-inventory/), opening with the brand page banner. */
export default function BrandPageTemplate({ data }: { data: BrandPageContent }) {
  return <main id="main" className={`bi bi-brand-page ${brandFont.variable}`}>
    <div className="bi-section bi-section-pageBanner">
      <BrandPageBanner eyebrow={data.eyebrow ?? site.shared.pageEyebrow} title={data.title} intro={data.intro} image={data.image}/>
    </div>
    {data.blocks.map((block, index) => <div className={`bi-section bi-section-${block.type}${fullWindow.has(block.type) ? '' : ' bi-wrap'}`} key={`${block.type}-${index}`}>
      <BrandBlockRenderer block={block}/>
    </div>)}
  </main>;
}
