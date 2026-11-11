import tokens from '../content/design-tokens.json';
import homepage from '../content/homepage.json';
import housing from '../content/pages/housing.json';
import { editorialExamples, inventoryExamples } from '../content/inventory-examples';
import type { HeroBlock } from '../content/types';
import ContentBlockRenderer from './ContentBlockRenderer';
import PageBanner from './PageBanner';

const homeHero = homepage.blocks.find(block => block.type === 'hero') as HeroBlock | undefined;

const colors = [
  ['Orange', tokens.colors.orange, 'Accent, calls to action, story features'],
  ['Deep slate', tokens.colors.deepSlate, 'Editorial headings and text on jade and pale surfaces'],
  ['Grey', tokens.colors.grey, 'Body text on white'],
  ['Navy', tokens.colors.navy, 'Headings, links, high-contrast panels'],
  ['Jade', tokens.colors.jade, 'Supporting accent and decorative process lines'],
  ['Light blue', tokens.colors.lightBlue, 'Supporting panels'],
  ['Yellow', tokens.colors.yellow, 'Highlights'],
  ['Black', tokens.colors.black, 'Core brand color; reserved from interface copy'],
  ['White', tokens.colors.white, 'Page backgrounds and reverse text'],
  ['Orange tint', tokens.colors.orangeTint, 'Warm story surfaces, callouts and icon circles'],
  ['Jade tint', tokens.colors.jadeTint, 'Newsletter and community surfaces'],
  ['Light blue tint', tokens.colors.lightBlueTint, 'Quiet information panels'],
  ['Yellow tint', tokens.colors.yellowTint, 'Soft highlight surfaces'],
];
const swatchText: Record<string, string> = {
  Orange: tokens.colors.white,
  'Deep slate': tokens.colors.white,
  Grey: tokens.colors.white,
  Navy: tokens.colors.white,
  Jade: tokens.colors.deepSlate,
  'Light blue': tokens.colors.deepSlate,
  Yellow: tokens.colors.deepSlate,
  Black: tokens.colors.white,
  White: tokens.colors.deepSlate,
  'Orange tint': tokens.colors.deepSlate,
  'Jade tint': tokens.colors.deepSlate,
  'Light blue tint': tokens.colors.deepSlate,
  'Yellow tint': tokens.colors.deepSlate,
};

export default function StyleGuide() {
  return <div className="style-guide">
    <PageBanner slug="research" title="Website style guide" intro="The typography, photography and page layouts used across the Toynbee Hall website." variant="frame" eyebrow="Digital design system"/>
    <section className="guide-section wrap" id="editorial">
      <p className="eyebrow">Design direction</p>
      <h2 className="editorial-rule">Warm, open and <span className="heading-accent">orange-led.</span></h2>
      <p className="guide-lead">Use deep slate Outfit headings with a short orange rule and highlight a few words in orange on white. A smooth curve on editorial photos echoes the round badge.</p>
      <div className="guide-editorial-examples">
        <ContentBlockRenderer block={editorialExamples.editorialImage}/>
        <ContentBlockRenderer block={editorialExamples.connectedSteps}/>
        <ContentBlockRenderer block={editorialExamples.editorialQuote}/>
      </div>
      <a className="text-link" href="/content-block-inventory/#editorial">See when to use each variant <b aria-hidden="true">↗</b></a>
    </section>
    <section className="guide-section wrap"><p className="eyebrow">01 / Color</p><h2>Brand colors, shown in context</h2><p className="guide-lead">Use full-strength colors for accents and approved tints for broad surfaces. Each swatch shows its hex value and suggested role.</p>
      <div className="swatch-grid">{colors.map(([name, value, use])=><article className="swatch" key={name}><div className="swatch-chip" style={{backgroundColor:value, color:swatchText[name]}}><span>Aa</span></div><div className="swatch-meta"><strong>{name}</strong><code>{value}</code><p>{use}</p></div></article>)}</div>
      <h3>Colour combinations</h3><div className="contrast-grid"><div className="contrast-sample contrast-orange"><b>White on orange</b><span>Primary buttons and solid orange sections · 3.01:1</span></div><div className="contrast-sample contrast-navy"><b>White on navy</b><span>Large panels and calls to action</span></div><div className="contrast-sample contrast-white"><b>Grey on white</b><span>Long-form body copy</span></div><div className="contrast-sample contrast-jade"><b>Deep slate on jade</b><span>Body copy on accent panels · 4.9:1</span></div></div>
      <p className="guide-note">White on logo orange meets the 3:1 contrast target for large text. Smaller white text on orange falls below the 4.5:1 target.</p>
    </section>
    <section className="guide-section guide-type"><div className="wrap"><p className="eyebrow">02 / Typography</p><h2>Outfit, with a clear voice</h2><p className="guide-lead">The examples below use the actual web font and weights used by the site.</p>
      <div className="type-specimen"><div><span className="type-label">300 · Light</span><p style={{fontWeight:300}}>People and communities can thrive.</p></div><div><span className="type-label">400 · Regular</span><p style={{fontWeight:400}}>People and communities can thrive.</p></div><div><span className="type-label">500 · Medium</span><p style={{fontWeight:500}}>People and communities can thrive.</p></div></div>
      <div className="type-scale"><div><span>H1 · up to 64px</span><p className="type-h1">Change starts here</p></div><div><span>H2 · 30 / 27px in page content</span><p className="type-h2">Stronger communities</p></div><div><span>H3 · 22px in page content</span><p className="type-h3">Advice that makes a difference</p></div><div><span>Body · 16–18px</span><p>We work alongside people to build a fairer future, with practical support, learning and community action.</p></div><div><span>Small label · 14px</span><p className="sample-label">NEWS · COMMUNITY · IMPACT</p></div></div>
    </div></section>
    <section className="guide-section wrap" id="banners">
      <p className="eyebrow">03 / Banners</p>
      <h2>Choose a banner by page layout</h2>
      <p className="guide-lead">Use the same header banner within each template. Choose a photograph that relates to the page and check its crop on desktop and mobile.</p>
      <div className="guide-banner-samples">
        <article><h3>Homepage · Full-width photograph</h3><p>A faint orange tint behind the white heading fades across the photograph.</p>
          {homeHero && <ContentBlockRenderer block={{ ...homeHero, link: { label: 'I am looking for…', href: '/#looking-for' } }} heroHeadingLevel={4}/>}
        </article>
        <article><h3>Standard page header · Framed photograph</h3><p>Every standard page, with or without a sidebar, opens with a framed photo overlapping the orange panel and a faded logo mark on the pale backdrop.</p>
          <PageBanner {...housing} variant="frame" headingLevel={4}/>
        </article>
        <article><h3>In-page split banner · Orange and photograph</h3><p>Use the half-orange, half-photograph banner further down a page to introduce a section or highlight one action. The enlarged logo mark adds texture to the orange panel.</p>
          {inventoryExamples.splitBanner && <ContentBlockRenderer block={inventoryExamples.splitBanner}/>}
        </article>
      </div>
    </section>
    <section className="guide-section guide-type" id="layout"><div className="wrap">
      <p className="eyebrow">04 / Layout and navigation</p><h2>Align content to a common left edge</h2>
      <div className="guide-layout-grid">
        <div><h3>Page gutters</h3><p>Use a maximum content width of {tokens.layout.contentMaxWidth}, with {tokens.layout.pageGutterDesktop} desktop and {tokens.layout.pageGutterMobile} mobile gutters. Headings, prose and grids share the same starting edge. Panels keep their own inner padding.</p></div>
        <div><h3>Reading column</h3><p>Keep long copy at a readable width. Put supporting links, event details and downloads to the right on desktop, then stack them below the main content on mobile.</p></div>
        <div><h3>Header and menus</h3><p>The orange badge sits on the left. Search, Donate, Work with us and Contact us sit above the right-aligned navigation. Chevrons mark dropdowns that open on hover and keyboard focus. On smaller screens, the menu button reveals the main navigation.</p></div>
        <div><h3>Approved logo</h3><div className="guide-logo-sample"><img className="brand-logo" src={tokens.logo.approvedAsset} width={tokens.logo.width} height={tokens.logo.height} alt="Toynbee Hall, established 1884"/><p>Keep clear space around the orange badge and use the supplied artwork at its original proportions.</p></div></div>
        <div><h3>Photography</h3><p>Use a mix of relevant photos from Toynbee Hall’s live site and own collection. Keep meaningful captions and alt text. Display a credit where the image requires one.</p></div>
      </div>
      <a className="text-link" href="/content-block-inventory/">See reusable content blocks <b aria-hidden="true">↗</b></a>
    </div></section>
    <section className="guide-section wrap" id="components"><p className="eyebrow">05 / Components</p><h2>Actions and editorial features</h2><div className="guide-components"><div className="guide-component"><span className="type-label">Primary action</span><a className="button" href="/support-us/">Explore our work <span aria-hidden="true">↗</span></a></div><div className="guide-component guide-action-navy"><span className="type-label">Reverse action</span><a className="button button-light" href="/about-us/">Find out more <span aria-hidden="true">↗</span></a></div><article className="guide-story"><img src="/images/rushanara-ali-visit.webp" alt="Toynbee Hall team welcoming Rushanara Ali MP outside the Hall"/><div><span className="type-label">Editorial story · Orange</span><h3>Welcoming Rushanara Ali MP to Toynbee Hall</h3><p>A visit to share our work and research with local partners.</p></div></article><article className="guide-card"><span className="type-label">Service card · Pale tint</span><h3>Advice and support</h3><p>Practical help, shaped around the person and their circumstances.</p><a className="text-link" href="/free-advice/">Explore support <b aria-hidden="true">↗</b></a></article></div></section>
    <section className="guide-access"><div className="wrap"><p className="eyebrow">06 / Accessibility</p><h2>Accessible by design</h2><ul><li>Set long-form body copy at 16px or larger.</li><li>Make interactive targets at least 44px where practical.</li><li>Use a visible 3px focus outline, with a contrasting colour on dark backgrounds.</li><li>Give informative photos meaningful alt text and use empty alt text for decorative icons beside a title.</li><li>Keep the approved logo on white with clear space. The banner watermark is decorative.</li></ul></div></section>
  </div>;
}
