import { inventoryExamples } from '../content/inventory-examples';
import ContentBlockRenderer from './ContentBlockRenderer';
import PageBanner from './PageBanner';

const groups = [
  { id: 'editorial', number: '00', title: 'Use the editorial variants', intro: 'Bring in orange rules, open space and circular details when a story, process or quote needs more emphasis.', blocks: [
    { title: 'Editorial photo feature', use: 'Pair a photograph with a curve inspired by the badge, a short heading with an orange accent, and one action.', kind: 'editorialImage' },
    { title: 'Connected steps', use: 'Show a short sequence with circular line icons. Use the numbered process for longer instructions.', kind: 'connectedSteps' },
    { title: 'Editorial quote', use: 'Give a short excerpt room to stand on its own, with an orange rule and a clear attribution.', kind: 'editorialQuote' },
  ]},
  { id: 'orient', number: '01', title: 'Help people find their way', intro: 'Start with a clear welcome, then give visitors useful routes into services and information.', blocks: [
    { title: 'Hero / page introduction', use: 'A concise introduction with a clear next step.', kind: 'hero' },
    { title: 'Audience pathways', use: 'Help people choose the service, programme or support route that fits.', kind: 'pathways' },
    { title: 'Homepage pathways', use: 'Use deep slate and logo orange with white copy for a prominent set of routes.', kind: 'homepagePathways' },
    { title: 'Image and text feature', use: 'Explain a service or programme alongside contextual photography.', kind: 'image' },
    { title: 'Split banner', use: 'Break up a longer page with a half-orange, half-photograph feature and one action.', kind: 'splitBanner' },
    { title: 'Image with caption / gallery', use: 'Show a photograph on its own or as part of a curated image sequence.', kind: 'captionedImage' },
    { title: 'Card collection', use: 'Show related services, spaces, people or links as a consistent set.', kind: 'cards' },
    { title: 'Values cards', use: 'Use compact icons and short descriptions for a group that needs no onward links.', kind: 'values' },
  ]},
  { id: 'evidence', number: '02', title: 'Show the work and its impact', intro: 'Bring evidence, lived experience and editorial stories together with care and context.', blocks: [
    { title: 'Impact statistics', use: 'Make a small number of sourced outcomes easy to understand.', kind: 'stats' },
    { title: 'Mission statement', use: 'Use a logo-orange section with white copy for a key statement and a single onward action.', kind: 'statement' },
    { title: 'Featured story and news cards', use: 'Pair the lead photo with a solid orange editorial panel. Use action buttons for stories and the full archive.', kind: 'listing' },
    { title: 'Quote / testimonial', use: 'Share a participant, volunteer, supporter or partner voice.', kind: 'quote' },
  ]},
  { id: 'explain', number: '03', title: 'Explain clearly', intro: 'Support longer pages with readable content, useful detail and obvious next steps.', blocks: [
    { title: 'Rich text / article', use: 'Present detailed information in a readable, well-structured flow.', kind: 'rich' },
    { title: 'Numbered process', use: 'Describe how to get help, book a space or complete a task.', kind: 'steps' },
    { title: 'Eligibility and important information', use: 'Clarify who a service is for, what it covers and its limits.', kind: 'eligibility' },
    { title: 'Callout / action panel', use: 'Bring attention to an important action or useful contact route.', kind: 'callout' },
    { title: 'Contact details', use: 'Group phone, email, address and opening information by purpose.', kind: 'contact' },
    { title: 'Accordion / expandable detail', use: 'Keep secondary details available without overwhelming the page.', kind: 'accordion' },
  ]},
  { id: 'resources', number: '04', title: 'Make activities and resources usable', intro: 'Present schedules, spaces and publications in formats people can navigate.', blocks: [
    { title: 'Schedule / timetable', use: 'Show what is happening, when, where and who can join.', kind: 'schedule' },
    { title: 'Partner and funder logos', use: 'Show organisations in a consistent grid with descriptive alt text.', kind: 'logos' },
    { title: 'Download / resource list', use: 'Help people identify reports, policies and advice resources.', kind: 'downloads' },
    { title: 'Related content / next steps', use: 'Offer a small set of relevant onward links at the end of a page.', kind: 'related' },
    { title: 'Link list', use: 'Provide direct routes when a list is more useful than a card grid.', kind: 'links' },
  ]},
  { id: 'take-action', number: '05', title: 'Invite people to take action', intro: 'Make supporter and enquiry journeys clear, trustworthy and accessible.', blocks: [
    { title: 'Donation or fundraising appeal', use: 'Explain what support makes possible and how to take part.', kind: 'donate' },
    { title: 'Newsletter signup', use: 'Explain what subscribers will receive. This is a preview of the form.', kind: 'newsletter' },
    { title: 'Enquiry form', use: 'Use labelled fields and connect a submission destination. The advice and contact pages link to their live forms.', kind: 'form' },
  ]},
];

const wideExamples = new Set(['editorialImage', 'connectedSteps', 'editorialQuote', 'hero', 'pathways', 'homepagePathways', 'image', 'splitBanner', 'captionedImage', 'cards', 'values', 'statement', 'listing', 'contact', 'schedule', 'logos', 'newsletter']);
const standaloneBlocks = new Set(['hero', 'statement', 'imageText', 'newsList', 'newsletterSignup']);

function Preview({ kind }: { kind: string }) {
  const block = inventoryExamples[kind];
  if (!block) return null;

  return <div className={standaloneBlocks.has(block.type) ? 'inventory-preview' : 'inventory-preview page-article'}>
    <ContentBlockRenderer block={block} heroHeadingLevel={3}/>
  </div>;
}

export default function ContentBlockInventory() {
  return <div className="block-inventory">
    <PageBanner slug="community-centre" title="Content block inventory" intro="A visual reference for the reusable blocks and templates used across Toynbee Hall’s website." variant="frame" eyebrow="Page building blocks"/>
    <section className="inventory-intro wrap">
      <p className="eyebrow">Page templates</p><h2>Start with the page layout</h2>
      <p>These examples use the same renderer as the main site. Pick a template first, then use the blocks below to build the page.</p>
      <ul className="inventory-template-links">
        <li><a href="/">Homepage</a><span>Full-width photograph, visitor pathways and an editorial venue feature.</span></li>
        <li><a href="/free-advice/">Full-width standard page</a><span>Orange watermark banner and full-width card groups.</span></li>
        <li><a href="/about-us/our-strategy/">Strategy subpage</a><span>Full-width template with numbered ambition and priority cards, a report download and a newsletter block.</span></li>
        <li><a href="/housing/">Standard page with a sidebar</a><span>Framed photograph and a left-aligned reading column.</span></li>
        <li><a href="/category/news/">News listing</a><span>Orange heading, search, cards and pagination.</span></li>
        <li><a href="/05/08/2026/toynbee-hall-shortlisted-for-national-technology-award-for-video-advice-kiosks/">Article</a><span>Headline, metadata, lead image and body copy.</span></li>
        <li><a href="/whats-on/film-club/">Event</a><span>Orange banner with event information and a separate details panel.</span></li>
        <li><a href="/research-library/more-than-just-education/">Resource</a><span>Orange banner with publication information and a download section.</span></li>
      </ul>
      <a className="text-link" href="/style-guide/#banners">Compare the banner styles <b aria-hidden="true">↗</b></a>
    </section>
    <nav className="inventory-index" aria-label="Content block categories"><div className="wrap">{groups.map(group=><a key={group.id} href={`#${group.id}`}><span>{group.number}</span>{group.title}<b>↓</b></a>)}</div></nav>
    {groups.map(group=><section className="inventory-group wrap" id={group.id} key={group.id}>
      <div className="inventory-group-heading"><div><p className="eyebrow">{group.number} / Block collection</p><h2>{group.title}</h2><p>{group.intro}</p></div></div>
      <div className="inventory-block-grid">{group.blocks.map((block,index)=><article className={`inventory-block${wideExamples.has(block.kind) ? ' inventory-block-wide' : ''}`} key={block.title} aria-label={block.title}>
        <div className="inventory-block-title"><p className="eyebrow">Example {String(index + 1).padStart(2, '0')}</p><p className="inventory-block-label">{block.title}</p><p>{block.use}</p></div>
        <Preview kind={block.kind}/>
      </article>)}</div>
    </section>)}
    <section className="inventory-foundation"><div className="wrap"><p className="eyebrow">The foundation</p><h2>Designed to work for everyone</h2><div className="inventory-foundation-grid"><p>Outfit typography, Toynbee Hall’s approved palette, real and respectful photography, and the established spacing system carry through every block.</p><ul><li>Clear headings and descriptive links</li><li>Readable body text and strong contrast</li><li>Keyboard focus and touch-friendly controls</li><li>Responsive layouts and meaningful image descriptions</li></ul></div><a className="button button-light" href="/style-guide/">Explore the style guide <span>↗</span></a></div></section>
  </div>;
}
