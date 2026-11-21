import heritage from '../content/history-and-heritage.json';
import freeAdvice from '../content/pages/free-advice.json';
import site from '../content/site.json';
import { inventoryExamples } from '../content/inventory-examples';
import type { ContentBlock } from '../content/types';
import type { ReactNode } from 'react';
import BrandBlockRenderer, { BrandPageBanner } from './BrandBlockRenderer';

/*
 * Content block inventory styled only with the Toynbee Hall Brand Guidelines (2024).
 * It shows the same example content as /content-block-inventory/ through BrandBlockRenderer.
 */

const palette = [
  { name: 'Orange', hex: '#F16E00', text: 'black' },
  { name: 'Grey', hex: '#636466', text: 'white' },
  { name: 'Navy', hex: '#175984', text: 'white' },
  { name: 'Jade', hex: '#20A790', text: 'black' },
  { name: 'Light blue', hex: '#96B4DE', text: 'black' },
  { name: 'Yellow', hex: '#EEB736', text: 'black' },
  { name: 'Black', hex: '#000000', text: 'white' },
  { name: 'White', hex: '#FFFFFF', text: 'black' },
];

const pairings = [
  { title: 'Black text', note: 'On orange, light blue, yellow and jade', swatches: ['orange', 'light-blue', 'yellow', 'jade'], text: 'black' },
  { title: 'White text', note: 'On black and navy', swatches: ['black', 'navy'], text: 'white' },
  { title: 'White text at 18pt or larger only', note: 'On orange and jade', swatches: ['orange', 'jade'], text: 'white' },
];

/* A six-photo gallery that shows the full bento pattern, using photographs and alt text from the site content */
const mosaicGallery: ContentBlock = {
  type: 'imageGallery',
  heading: 'Life at Toynbee Hall',
  images: [
    { src: '/images/live-site/community.jpg', alt: 'Community Centre participants holding up colourful artwork', caption: 'Artwork made together at the Community Centre.' },
    { src: '/images/live-site/youth.jpg', alt: 'Two young people talking across a table' },
    { src: '/images/live-site/strategy-workshop.jpg', alt: 'People adding notes to a large illustrated sheet during a workshop' },
    { src: '/images/live-site/yoga.jpg', alt: 'A group taking part in seated exercise at the Community Centre', caption: 'Seated exercise at the Community Centre.' },
    { src: '/images/live-site/community-group.jpg', alt: 'People making artwork together around a table' },
    { src: '/images/live-site/research.jpg', alt: 'Attendees listening to a speaker at a Toynbee Hall research event' },
  ],
};

/* History and heritage section, from the heritage prototype, with images from the Explore Toynbee Hall timeline */
const [heritageIntro, timeline, heritageStories] = heritage.blocks as ContentBlock[];

const extraExamples: Record<string, ContentBlock> = { mosaicGallery, heritageIntro, timeline, heritageStories };

/* Examples that are page furniture rather than content blocks, using the Help and Advice page content */
const pageExamples: Record<string, ReactNode> = {
  pageBanner: <BrandPageBanner eyebrow={site.shared.pageEyebrow} title={freeAdvice.title} intro={freeAdvice.intro} image={freeAdvice.image} headingLevel={3}/>,
};

const groups = [
  { id: 'introduce', title: 'Introduce a page', intro: 'Open with a clear statement and real photography.', blocks: [
    { title: 'Page introduction', use: 'White headline lines set in orange bands, as on the guidelines cover, with the button, over a full-width background photograph.', kind: 'hero' },
    { title: 'Page banner', use: 'The banner at the top of standard pages, as on Help and Advice. A white headline in an orange panel, beside a photograph on an orange tint with a navy block shadow.', kind: 'pageBanner' },
    { title: 'Split banner', use: 'An orange panel with a large white headline and white supporting copy, beside a photograph. A navy version is available.', kind: 'splitBanner' },
    { title: 'Mission statement', use: 'A white section for a key statement, with an orange headline, grey text and a navy button.', kind: 'statement' },
  ]},
  { id: 'routes', title: 'Help people find their way', intro: 'Use tints and solids from the palette to group routes, with clear navy headings.', blocks: [
    { title: 'Audience pathways', use: 'Tinted cards with small orange roundel icons, navy headings and grey copy.', kind: 'pathways' },
    { title: 'Homepage pathways', use: 'An orange heading, a navy lead card with white text, then white cards in grey cell lines with an orange top rule. Linear icons in orange roundels sit above the titles, left aligned.', kind: 'homepagePathways' },
    { title: 'Values cards', use: 'Yellow, jade and light blue tints, as on the guidelines values page, with linear icons in orange roundels.', kind: 'values' },
    { title: 'Card collection', use: 'Related services, spaces or links as a consistent set.', kind: 'cards' },
    { title: 'Image and text feature', use: 'A photograph beside a heading, copy and one action.', kind: 'image' },
    { title: 'Editorial photo feature', use: 'The same feature with the heading set in orange.', kind: 'editorialImage' },
    { title: 'Image with caption / gallery', use: 'Two captioned photographs in an uneven split, so neither reads as a template.', kind: 'captionedImage' },
    { title: 'Bento gallery', use: 'Six or more photographs in a mosaic of large and small tiles that repeats every six. Captions sit on a white strip; alt text stays on every photo.', kind: 'mosaicGallery' },
  ]},
  { id: 'impact', title: 'Show the work and its impact', intro: 'Let photography and lived experience lead. Keep figures sourced and in context.', blocks: [
    { title: 'Impact statistics', use: 'Large orange Light figures with navy labels and a source link.', kind: 'stats' },
    { title: 'Featured story and news cards', use: 'The lead story in a landscape card, with three tinted story cards in a row underneath. Dates and categories are small; titles are large.', kind: 'listing' },
    { title: 'Quote / testimonial', use: 'A large Light quote introduced by a short orange rule.', kind: 'quote' },
    { title: 'Client quotes', use: 'Two or three short quotes side by side on light blue cards with an orange top rule. Each opens with an orange quotation mark and has the person’s name underneath in navy SemiBold, with optional context and portrait.', kind: 'quotes' },
    { title: 'Highlighted quote', use: 'White Light text on a navy band, following the guidelines heading treatment.', kind: 'editorialQuote' },
  ]},
  { id: 'explain', title: 'Explain clearly', intro: 'Left-aligned copy, a clear heading hierarchy, and adequate space between paragraphs.', blocks: [
    { title: 'Rich text / article', use: 'Grey Light body copy with orange and grey headings.', kind: 'rich' },
    { title: 'Numbered process', use: 'Numbers in orange roundels with navy step headings.', kind: 'steps' },
    { title: 'Connected steps', use: 'Linear icons in orange roundels joined by an orange rule.', kind: 'connectedSteps' },
    { title: 'Eligibility and important information', use: 'A pastel panel with a navy SemiBold heading.', kind: 'eligibility' },
    { title: 'Callout / action panel', use: 'A light blue tint panel with one clear action.', kind: 'callout' },
    { title: 'Contact details', use: 'Routes grouped by purpose. Phone numbers never split across lines.', kind: 'contact' },
    { title: 'Accordion / expandable detail', use: 'Secondary detail behind clear, ruled questions.', kind: 'accordion' },
  ]},
  { id: 'resources', title: 'Make activities and resources usable', intro: 'Connect linked information visually, with ruled lists and cell lines in tables.', blocks: [
    { title: 'Schedule / timetable', use: 'A table with cell lines and a navy header row.', kind: 'schedule' },
    { title: 'Download / resource list', use: 'Publications separated by short orange rules, with format and size.', kind: 'downloads' },
    { title: 'Related content / next steps', use: 'A small set of onward links.', kind: 'related' },
    { title: 'Link list', use: 'Direct routes separated by short orange rules.', kind: 'links' },
    { title: 'Partner and funder logos', use: 'Logos on white within cell lines, each with descriptive alt text.', kind: 'logos' },
  ]},
  { id: 'action', title: 'Invite people to take action', intro: 'Make supporter and enquiry journeys clear, with labelled fields on pastel backgrounds.', blocks: [
    { title: 'Donation or fundraising appeal', use: 'A navy section with white text and a white action.', kind: 'donate' },
    { title: 'Newsletter signup', use: 'A jade tint section with labelled fields. This is a preview of the form.', kind: 'newsletter' },
    { title: 'Enquiry form', use: 'Labelled fields on a light blue tint. This example does not send messages.', kind: 'form' },
  ]},
  { id: 'heritage', title: 'Share our history and heritage', intro: 'Bring Toynbee Hall’s history to life with archive photography, key dates and routes into the collection.', blocks: [
    { title: 'Heritage introduction', use: 'The split banner in navy, introducing the history section beside an archive photograph.', kind: 'heritageIntro' },
    { title: 'Timeline', use: 'Milestones on a rail people can swipe, scroll or step through by year. The chosen milestone has a light blue tint and an orange top rule; dates are large and orange.', kind: 'timeline' },
    { title: 'Heritage stories', use: 'The card collection, linking to stories and records in the Explore Toynbee Hall archive.', kind: 'heritageStories' },
  ]},
];

const fullWidth = new Set(['hero', 'pageBanner', 'splitBanner', 'statement', 'pathways', 'homepagePathways', 'values', 'cards', 'image', 'editorialImage', 'captionedImage', 'mosaicGallery', 'stats', 'listing', 'quotes', 'editorialQuote', 'connectedSteps', 'contact', 'schedule', 'logos', 'donate', 'newsletter', 'heritageIntro', 'timeline', 'heritageStories']);

export default function BrandBlockInventory() {
  return <div className="bi">
    <header className="bi-page-head bi-wrap">
      <h1 className="bi-cover-title"><span>Content block</span><span>inventory</span></h1>
      <p className="bi-intro">The reusable page blocks, styled only with the Toynbee Hall Brand Guidelines (2024).</p>
      <p>Each example uses the same content as the <a href="/content-block-inventory/">main content block inventory</a>. Colours, type and imagery follow the guidelines’ palette, typefaces, accessibility rules and photography principles.</p>
    </header>

    <section className="bi-foundation bi-wrap" aria-labelledby="bi-foundation">
      <h2 className="bi-heading" id="bi-foundation">Brand foundations</h2>
      <div className="bi-foundation-grid">
        <div>
          <h3 className="bi-subhead">Colour palette</h3>
          <p>Six colours plus black and white, used as solids or tints.</p>
          <ul className="bi-swatches">{palette.map(colour => <li key={colour.name}>
            <span className={`bi-swatch bi-swatch-text-${colour.text}`} style={{ background: colour.hex }}>A</span>
            <span><b>{colour.name}</b>{colour.hex}</span>
          </li>)}</ul>
        </div>
        <div>
          <h3 className="bi-subhead">Accessible text colours</h3>
          <ul className="bi-pairings">{pairings.map(pairing => <li key={pairing.title}>
            <b>{pairing.title}</b><span>{pairing.note}</span>
            <span className="bi-pairing-row">{pairing.swatches.map(swatch => <span key={swatch} className={`bi-pairing bi-pairing-${swatch} bi-swatch-text-${pairing.text}`} aria-hidden="true">A</span>)}</span>
          </li>)}</ul>
          <p className="bi-small">Use grey for text on white, or a pastel background, to reduce glare.</p>
        </div>
      </div>
      <div className="bi-type-specimen">
        <h3 className="bi-subhead">Using type</h3>
        <p className="bi-type-orange">Heading · Outfit Medium</p>
        <p className="bi-type-band">Heading · Outfit Medium</p>
        <p className="bi-type-sub bi-type-sub-band">Subheading · Outfit Medium</p>
        <p className="bi-type-sub">Subheading · Outfit Medium</p>
        <p className="bi-type-semibold">Subheading · Outfit SemiBold</p>
        <p>Body copy · Outfit Light, left aligned. Use <b>bold</b> for emphasis, and avoid italics, underlining and blocks of capital letters.</p>
      </div>
    </section>

    <nav className="bi-index bi-wrap" aria-label="Block collections">{groups.map((group, i) => <a key={group.id} href={`#bi-${group.id}`}><span>{i + 1}</span>{group.title}</a>)}</nav>

    {groups.map((group, i) => <section className="bi-group bi-wrap" id={`bi-${group.id}`} key={group.id} aria-labelledby={`bi-${group.id}-title`}>
      <span className="bi-rule" aria-hidden="true"/>
      <p className="bi-label">Collection {i + 1}</p>
      <h2 className="bi-heading" id={`bi-${group.id}-title`}>{group.title}</h2>
      <p className="bi-lead">{group.intro}</p>
      <div className="bi-examples">{group.blocks.map((block, j) => {
        const example = extraExamples[block.kind] ?? inventoryExamples[block.kind as keyof typeof inventoryExamples];
        return <article className={`bi-example${fullWidth.has(block.kind) ? ' bi-example-wide' : ''}`} key={block.title} aria-label={block.title}>
          <div className="bi-example-title"><p className="bi-label">Example {j + 1}</p><h3>{block.title}</h3><p>{block.use}</p></div>
          {pageExamples[block.kind] ? <div className="bi-example-preview">{pageExamples[block.kind]}</div> : example && <div className="bi-example-preview"><BrandBlockRenderer block={example}/></div>}
        </article>;
      })}</div>
    </section>)}

  </div>;
}
