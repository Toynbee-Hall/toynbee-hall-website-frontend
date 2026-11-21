import tokens from '../content/design-tokens.json';
import homepage from '../content/homepage.json';
import aboutUs from '../content/pages/about-us.json';
import site from '../content/site.json';
import { editorialExamples, inventoryExamples } from '../content/inventory-examples';
import type { ContentBlock, HeroBlock, Media } from '../content/types';
import type { ReactNode } from 'react';
import BrandBlockRenderer, { BrandPageBanner } from './BrandBlockRenderer';

/*
 * Website style guide (/style-guide/), set in the same brand styling as /brand-content-block-inventory/:
 * banded cover title, numbered collection index, ruled sections and bordered example previews,
 * with examples rendered through BrandBlockRenderer. Styles are scoped to `.bi` in app/brand-inventory.css.
 */

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
const darkSwatches = new Set(['Orange', 'Deep slate', 'Grey', 'Navy', 'Black']);

const combinations = [
  { title: 'White on orange', note: 'Primary buttons and solid orange sections · 3.01:1', background: tokens.colors.orange, color: tokens.colors.white },
  { title: 'White on navy', note: 'Large panels and calls to action', background: tokens.colors.navy, color: tokens.colors.white },
  { title: 'Grey on white', note: 'Long-form body copy', background: tokens.colors.white, color: tokens.colors.grey },
  { title: 'Deep slate on jade', note: 'Body copy on accent panels · 4.9:1', background: tokens.colors.jade, color: tokens.colors.deepSlate },
];

const typeScale = [
  { label: 'H1 · up to 64px', sample: 'Change starts here', className: 'bi-guide-h1' },
  { label: 'H2 · 30 / 27px in page content', sample: 'Stronger communities', className: 'bi-guide-h2' },
  { label: 'H3 · 22px in page content', sample: 'Advice that makes a difference', className: 'bi-guide-h3' },
  { label: 'Body · 16–18px', sample: 'We work alongside people to build a fairer future, with practical support, learning and community action.' },
  { label: 'Small label · 14px', sample: 'NEWS · COMMUNITY · IMPACT', className: 'bi-guide-label' },
];

const storyImage: Media = { src: '/images/rushanara-ali-visit.webp', alt: 'Toynbee Hall team welcoming Rushanara Ali MP outside the Hall' };

const sections = [
  { id: 'editorial', label: 'Design direction', title: 'Warm, open and orange-led' },
  { id: 'colour', label: '01 / Color', title: 'Brand colors, shown in context' },
  { id: 'type', label: '02 / Typography', title: 'Outfit, with a clear voice' },
  { id: 'banners', label: '03 / Banners', title: 'Choose a banner by page layout' },
  { id: 'layout', label: '04 / Layout and navigation', title: 'Align content to a common left edge' },
  { id: 'components', label: '05 / Components', title: 'Actions and editorial features' },
  { id: 'accessibility', label: '06 / Accessibility', title: 'Accessible by design' },
];

function Section({ id, lead, children }: { id: string; lead?: string; children: ReactNode }) {
  const section = sections.find(s => s.id === id)!;
  return <section className="bi-group bi-wrap" id={id} aria-labelledby={`${id}-title`}>
    <span className="bi-rule" aria-hidden="true"/>
    <p className="bi-label">{section.label}</p>
    <h2 className="bi-heading" id={`${id}-title`}>{section.title}</h2>
    {lead && <p className="bi-lead">{lead}</p>}
    {children}
  </section>;
}

function Example({ title, use, wide = false, children }: { title: string; use?: string; wide?: boolean; children: ReactNode }) {
  return <article className={`bi-example${wide ? ' bi-example-wide' : ''}`} aria-label={title}>
    <div className="bi-example-title"><h3>{title}</h3>{use && <p>{use}</p>}</div>
    <div className="bi-example-preview">{children}</div>
  </article>;
}

export default function StyleGuide() {
  return <div className="bi bi-guide">
    <header className="bi-page-head bi-wrap">
      <p className="bi-label">Digital design system</p>
      <h1 className="bi-cover-title"><span>Website</span><span>style guide</span></h1>
      <p className="bi-intro">The typography, photography and page layouts used across the Toynbee Hall website.</p>
      <p>Reusable page blocks are catalogued in the <a href="/brand-content-block-inventory/">content block inventory</a>.</p>
    </header>

    <nav className="bi-index bi-wrap" aria-label="Style guide sections">{sections.map((section, i) => <a key={section.id} href={`#${section.id}`}><span>{i + 1}</span>{section.title}</a>)}</nav>

    <Section id="editorial" lead="Use deep slate Outfit headings with a short orange rule and highlight a few words in orange on white. A smooth curve on editorial photos echoes the round badge.">
      <div className="bi-examples">
        <Example title="Editorial photo feature" wide><BrandBlockRenderer block={editorialExamples.editorialImage as ContentBlock}/></Example>
        <Example title="Connected steps" wide><BrandBlockRenderer block={editorialExamples.connectedSteps as ContentBlock}/></Example>
        <Example title="Highlighted quote" wide><BrandBlockRenderer block={editorialExamples.editorialQuote as ContentBlock}/></Example>
      </div>
      <a className="bi-text-link bi-guide-more" href="/brand-content-block-inventory/">See when to use each variant</a>
    </Section>

    <Section id="colour" lead="Use full-strength colors for accents and approved tints for broad surfaces. Each swatch shows its hex value and suggested role.">
      <ul className="bi-swatches bi-guide-swatches">{colors.map(([name, value, use]) => <li key={name}>
        <span className="bi-swatch" style={{ background: value, color: darkSwatches.has(name) ? tokens.colors.white : tokens.colors.deepSlate }} aria-hidden="true">Aa</span>
        <span><b>{name}</b><code>{value}</code><span className="bi-guide-role">{use}</span></span>
      </li>)}</ul>
      <h3 className="bi-subhead bi-guide-subhead">Colour combinations</h3>
      <ul className="bi-guide-grid bi-guide-tiles">{combinations.map(c => <li key={c.title} className="bi-guide-tile" style={{ background: c.background, color: c.color }}>
        <b>{c.title}</b><span>{c.note}</span>
      </li>)}</ul>
      <p className="bi-small bi-guide-note">White on logo orange meets the 3:1 contrast target for large text. Smaller white text on orange falls below the 4.5:1 target.</p>
    </Section>

    <Section id="type" lead="The examples below use the actual web font and weights used by the site.">
      <div className="bi-guide-type">
        {[[300, 'Light'], [400, 'Regular'], [500, 'Medium']].map(([weight, name]) => <div className="bi-guide-type-row" key={weight}>
          <span className="bi-meta">{weight} · {name}</span>
          <p className="bi-guide-weight" style={{ fontWeight: weight }}>People and communities can thrive.</p>
        </div>)}
        {typeScale.map(row => <div className="bi-guide-type-row" key={row.label}>
          <span className="bi-meta">{row.label}</span>
          <p className={row.className}>{row.sample}</p>
        </div>)}
      </div>
    </Section>

    <Section id="banners" lead="Use the same header banner within each template. Choose a photograph that relates to the page and check its crop on desktop and mobile.">
      <div className="bi-examples">
        <Example title="Homepage · Full-width photograph" use="White headline lines set in orange bands over a full-width background photograph, with the button underneath." wide>
          {homeHero && <BrandBlockRenderer block={{ ...homeHero, link: { label: 'I am looking for…', href: '/#looking-for' } }}/>}
        </Example>
        <Example title="Page banner · Framed photograph" use="Every page opens with a white headline in an orange panel, with the text on the left, beside a photograph on an orange tint with a navy block shadow." wide>
          <BrandPageBanner eyebrow={site.shared.pageEyebrow} title={aboutUs.title} intro={aboutUs.intro} image={aboutUs.image} headingLevel={3}/>
        </Example>
        <Example title="In-page split banner · Orange and photograph" use="Use the half-orange, half-photograph banner further down a page to introduce a section or highlight one action. A navy version is available." wide>
          {inventoryExamples.splitBanner && <BrandBlockRenderer block={inventoryExamples.splitBanner}/>}
        </Example>
      </div>
    </Section>

    <Section id="layout">
      <ul className="bi-ruled-list bi-guide-grid">
        <li><h3>Page gutters</h3><p>Use a maximum content width of {tokens.layout.contentMaxWidth}, with {tokens.layout.pageGutterDesktop} desktop and {tokens.layout.pageGutterMobile} mobile gutters. Headings, prose and grids share the same starting edge. Panels keep their own inner padding.</p></li>
        <li><h3>Reading column</h3><p>Keep long copy at a readable width. Put supporting links, event details and downloads to the right on desktop, then stack them below the main content on mobile.</p></li>
        <li><h3>Header and menus</h3><p>The orange badge sits on the left. Search, Donate, Work with us and Contact us sit above the right-aligned navigation. Chevrons mark dropdowns that open on hover and keyboard focus. On smaller screens, the menu button reveals the main navigation.</p></li>
        <li><h3>Approved logo</h3><img className="bi-guide-logo" src={tokens.logo.approvedAsset} width={tokens.logo.width} height={tokens.logo.height} alt="Toynbee Hall, established 1884"/><p>Keep clear space around the orange badge and use the supplied artwork at its original proportions.</p></li>
        <li><h3>Photography</h3><p>Use a mix of relevant photos from Toynbee Hall’s live site and own collection. Keep meaningful captions and alt text. Display a credit where the image requires one.</p></li>
      </ul>
      <a className="bi-text-link bi-guide-more" href="/brand-content-block-inventory/">See reusable content blocks</a>
    </Section>

    <Section id="components">
      <div className="bi-examples">
        <Example title="Primary action"><a className="bi-button bi-button-navy" href="/support-us/">Explore our work</a></Example>
        <Example title="Reverse action"><div className="bi-solid-navy bi-guide-reverse"><a className="bi-button bi-button-white" href="/about-us/">Find out more</a></div></Example>
        <Example title="Editorial story · Orange tint">
          <article className="bi-card bi-tint-orange">
            <figure className="bi-card-media"><img src={storyImage.src} alt={storyImage.alt}/></figure>
            <h3>Welcoming Rushanara Ali MP to Toynbee Hall</h3>
            <p>A visit to share our work and research with local partners.</p>
          </article>
        </Example>
        <Example title="Service card · Pale tint">
          <article className="bi-card bi-tint-blue">
            <h3>Advice and support</h3>
            <p>Practical help, shaped around the person and their circumstances.</p>
            <a className="bi-text-link" href="/free-advice/">Explore support</a>
          </article>
        </Example>
      </div>
    </Section>

    <Section id="accessibility">
      <div className="bi-panel bi-tint-blue bi-guide-access">
        <ul className="bi-ruled-list">
          <li>Set long-form body copy at 16px or larger.</li>
          <li>Make interactive targets at least 44px where practical.</li>
          <li>Use a visible 3px focus outline, with a contrasting colour on dark backgrounds.</li>
          <li>Give informative photos meaningful alt text and use empty alt text for decorative icons beside a title.</li>
          <li>Keep the approved logo on white with clear space. The banner watermark is decorative.</li>
        </ul>
      </div>
    </Section>
  </div>;
}
