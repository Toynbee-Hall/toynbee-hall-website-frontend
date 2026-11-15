import type { Metadata } from 'next';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import BrandBlockRenderer from '../../components/BrandBlockRenderer';
import homepage from '../../content/homepage.json';
import type { CardGridBlock, ContentBlock } from '../../content/types';
import { brandFont } from '../brand-font';
import '../brand-inventory.css';

export const metadata: Metadata = {
  title: 'Pathway card colour options | Toynbee Hall',
  robots: { index: false, follow: false },
};

/* Design preview: the homepage "I am looking for…" cards in different brand palette colourways */
const pathways = (homepage.blocks as ContentBlock[]).find((block): block is CardGridBlock => block.type === 'cardGrid' && block.variant === 'pathways');

const options = [
  { id: 'navy-light-blue', title: 'Navy lead with light blue', description: 'Advice in solid navy with white text. The other cards are solid light blue with navy titles and black text, as the guidelines pair black text with light blue.' },
  { id: 'soft-blue', title: 'Soft blues', description: 'Advice in solid light blue; the other cards in the pale blue tint. Navy titles, grey text and short orange rules. The calmest option.' },
  { id: 'palette-tints', title: 'Palette tints', description: 'Each card in a different tint (orange, yellow, jade and blue), as on the guidelines values page. Navy titles and grey text.' },
  { id: 'white-rule', title: 'White with an orange rule (chosen)', description: 'White cards in grey cell lines, each with an orange top rule. Advice in solid navy to lead. This is now used on the homepage, with icons in orange roundels above the titles.' },
  { id: 'jade', title: 'Jade and navy', description: 'Advice in solid navy; the other cards in the pale jade tint with navy titles, grey text and a jade rule.' },
];

export default function PathwayColourOptionsPage() {
  return <>
    <SiteHeader/>
    <main id="main" className={`bi ${brandFont.variable}`}>
      <header className="bi-page-head bi-wrap">
        <p className="bi-label">Design preview</p>
        <h1 className="bi-heading">“I am looking for…” card colours</h1>
        <p className="bi-lead">Five colourways for the homepage pathway cards, all from the brand palette. The content and layout are the same in each; only the colours change. See the cards in place on <a href="/">the homepage</a>.</p>
        <nav className="bi-index" aria-label="Jump to an option">{options.map((option, i) => <a key={option.id} href={`#${option.id}`}><span>{i + 1}</span>{option.title}</a>)}</nav>
      </header>
      {options.map((option, i) => <section className="bi-group bi-wrap" id={option.id} key={option.id} aria-labelledby={`${option.id}-title`}>
        <span className="bi-rule" aria-hidden="true"/>
        <p className="bi-label">Option {i + 1}</p>
        <h2 className="bi-subhead" id={`${option.id}-title`}>{option.title}</h2>
        <p className="bi-lead">{option.description}</p>
        {pathways && <div className={`bi-pw bi-pw-${option.id}`}><BrandBlockRenderer block={{ ...pathways, id: undefined }}/></div>}
      </section>)}
    </main>
    <SiteFooter/>
  </>;
}
