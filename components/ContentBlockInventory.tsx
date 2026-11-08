const groups = [
  { id: 'orient', number: '01', title: 'Help people find their way', intro: 'Start with a clear welcome, then give visitors useful routes into services and information.', blocks: [
    { title: 'Hero / page introduction', use: 'A concise introduction with a clear next step.', kind: 'hero' },
    { title: 'Audience pathways', use: 'Help people choose the service, programme or support route that fits.', kind: 'pathways' },
    { title: 'Image and text feature', use: 'Explain a service or programme alongside contextual photography.', kind: 'image' },
    { title: 'Image with caption / gallery', use: 'Show a photograph on its own or as part of a curated image sequence.', kind: 'captionedImage' },
    { title: 'Card collection', use: 'Show related services, spaces, people or links as a consistent set.', kind: 'cards' },
  ]},
  { id: 'evidence', number: '02', title: 'Show the work and its impact', intro: 'Bring evidence, lived experience and editorial stories together with care and context.', blocks: [
    { title: 'Impact statistics', use: 'Make a small number of sourced outcomes easy to understand.', kind: 'stats' },
    { title: 'Story or campaign feature', use: 'Give one important story a strong editorial moment.', kind: 'story' },
    { title: 'News, story or event listing', use: 'Help visitors scan current updates and choose what to read.', kind: 'listing' },
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
    { title: 'Venue space and gallery', use: 'Compare event spaces and show practical details before an enquiry.', kind: 'venue' },
    { title: 'Download / resource list', use: 'Help people identify reports, policies and advice resources.', kind: 'downloads' },
    { title: 'Related content / next steps', use: 'Offer a small set of relevant onward links at the end of a page.', kind: 'related' },
  ]},
  { id: 'take-action', number: '05', title: 'Invite people to take action', intro: 'Make supporter and enquiry journeys clear, trustworthy and accessible.', blocks: [
    { title: 'Donation or fundraising appeal', use: 'Explain what support makes possible and how to take part.', kind: 'donate' },
    { title: 'Newsletter signup / enquiry form', use: 'Set expectations, collect only what is needed and show clear form feedback.', kind: 'form' },
  ]},
];

function Preview({ kind }: { kind: string }) {
  switch (kind) {
    case 'hero': return <div className="inventory-hero"><div className="inventory-hero-copy"><span className="inventory-label">Advice and support</span><strong>Help to make your next step</strong><p>Free, expert advice for people across East London.</p><span className="inventory-button">Find the right advice ↗</span></div><img src="/images/staff/cityhall-community-conversation.jpg" alt="A community member speaking with another attendee at an event."/></div>;
    case 'pathways': return <div className="inventory-mini-grid"><b>Debt and money <i>↗</i></b><b>Housing advice <i>↗</i></b><b>Community activities <i>↗</i></b></div>;
    case 'image': return <div className="inventory-image-text"><figure className="inventory-photo"><img src="/images/staff/cityhall-community-conversation.jpg" alt="A community member speaking with another attendee at an event."/><figcaption>Photo: Swiss Chocolate Pictures</figcaption></figure><div><b>Support shaped around you</b><p>Practical support, alongside people and communities.</p><span>Explore our work ↗</span></div></div>;
    case 'captionedImage': return <figure className="inventory-standalone-photo"><img src="/images/staff/dfa-awards-community-dinner.jpg" alt="Guests share a conversation around a table during a Toynbee Hall event."/><figcaption>Community members and colleagues come together at a Toynbee Hall event. Photo: Swiss Chocolate Pictures.</figcaption></figure>;
    case 'cards': return <div className="inventory-photo-cards"><article><img src="/images/staff/dfa-awards-community-dinner.jpg" alt="Guests talking together around a dinner table at an event."/><b>Community events</b><small>People coming together</small></article><article><img src="/images/staff/cityhall-event-portrait.jpg" alt="Two event attendees posing together in front of a branded backdrop."/><b>Our people</b><small>Stories from our community</small></article></div>;
    case 'stats': return <div className="inventory-stats"><b>140+<small>years in the East End</small></b><b>3<small>connected areas of work</small></b><b>2024–25<small>reporting period</small></b></div>;
    case 'story': return <div className="inventory-story"><img src="/images/staff/dfa-awards-community-dinner.jpg" alt="Guests share a conversation around a dinner table at a Toynbee Hall event."/><div><span className="inventory-label">Our community</span><b>Local voices help shape a fairer future</b><p>Stories and action, led by the experiences of local people.</p></div></div>;
    case 'listing': return <div className="inventory-listing"><b>Latest from Toynbee Hall</b><article><img src="/images/staff/cityhall-community-conversation.jpg" alt="Attendees talking at a community event."/><span>NEWS · Our community <strong>Community voices shape our work</strong></span></article><article><img src="/images/staff/dfa-awards-recognition.jpg" alt="Two attendees share a moment at an awards event."/><span>EVENT · Advice and support <strong>DFA Awards 2023</strong></span></article></div>;
    case 'quote': return <blockquote className="inventory-quote">“Add an approved quote from a participant, volunteer or supporter.”<small>Attribution and context should be agreed before publication.</small></blockquote>;
    case 'rich': return <div className="inventory-rich"><b>How we work with local people</b><p>We listen, work together and use lived experience to shape practical support and lasting change.</p><a href="#explain">Read about our approach ↗</a></div>;
    case 'steps': return <ol className="inventory-steps"><li><b>Get in touch</b><span>Tell us what support you need.</span></li><li><b>We’ll talk it through</b><span>We’ll help identify the right next step.</span></li><li><b>Get advice</b><span>Receive clear guidance from our team.</span></li></ol>;
    case 'eligibility': return <div className="inventory-info"><b>Who this service is for</b><p>Free support for eligible Tower Hamlets residents. If this service cannot help, we’ll signpost you to another organisation.</p></div>;
    case 'callout': return <div className="inventory-callout"><b>Need advice?</b><p>Talk to our team about the support available.</p><span>Contact the advice team ↗</span></div>;
    case 'contact': return <div className="inventory-contact"><b>Advice services</b><span>Call <strong>0800 808 5701</strong></span><span>Email <strong>advice@toynbeehall.org.uk</strong></span><span>Open daily · 8am–8pm</span></div>;
    case 'accordion': return <div className="inventory-accordion"><b>What should I bring to my appointment? <span>+</span></b><p>Bring any letters or information related to your question.</p></div>;
    case 'schedule': return <div className="inventory-schedule"><div><b>Monday</b><span>11:00 · Community art group</span></div><div><b>Wednesday</b><span>10:30 · Shared reading</span></div><div><b>Friday</b><span>14:00 · Seated exercise</span></div></div>;
    case 'venue': return <div className="inventory-venue"><figure className="inventory-photo"><img src="/images/staff/dfa-awards-community-dinner.jpg" alt="Guests seated around a dinner table in a historic event room."/><figcaption>Photo: Swiss Chocolate Pictures</figcaption></figure><div><b>Historic event space</b><span>Capacity · Facilities · Access</span><strong>Ask about availability ↗</strong></div></div>;
    case 'downloads': return <div className="inventory-downloads"><b>Research and reports</b><span>Impact report 2024–25 <small>PDF · 2.4 MB</small></span><span>Our strategy <small>PDF · 1.1 MB</small></span></div>;
    case 'related': return <div className="inventory-related"><span>Related</span><b>Find out about our community work ↗</b><b>See what’s on this month ↗</b></div>;
    case 'donate': return <div className="inventory-donate"><b>Help build a fairer East London</b><p>Your support helps people access advice, connection and opportunity.</p><span>Support Toynbee Hall ↗</span></div>;
    case 'newsletter': return <div className="inventory-form"><label>Email address</label><div><span>you@example.com</span><b>Sign up ↗</b></div><small>We’ll send news and updates. You can unsubscribe at any time.</small></div>;
    default: return <div className="inventory-form"><label>Your enquiry</label><div><span>Tell us how we can help</span></div><b className="inventory-form-submit">Send enquiry ↗</b></div>;
  }
}

export default function ContentBlockInventory() {
  return <div className="block-inventory">
    <header className="guide-hero"><div className="wrap"><p className="eyebrow">Page building blocks</p><h1>Content block<br/><em>inventory</em></h1><p>A visual library of the reusable patterns Toynbee Hall pages can be built from. Each block supports a different visitor need and follows the Toynbee Hall style guide.</p></div></header>
    <section className="inventory-intro wrap"><p className="eyebrow">A flexible toolkit</p><h2>One design system.<br/>Many kinds of content.</h2><p>Combine these blocks to build service pages, community pages, articles, research resources, venue pages and more. Choose only the blocks that help people understand the subject or take their next step.</p><p className="inventory-attribution">Photography by <a href="https://www.swisschocolatepictures.com" target="_blank" rel="noreferrer">Swiss Chocolate Pictures</a>, from Toynbee Hall’s photo collection.</p><a className="text-link" href="/style-guide/">Review the website style guide <b>↗</b></a></section>
    <nav className="inventory-index" aria-label="Content block categories"><div className="wrap">{groups.map(group=><a key={group.id} href={`#${group.id}`}><span>{group.number}</span>{group.title}<b>↓</b></a>)}</div></nav>
    {groups.map(group=><section className="inventory-group wrap" id={group.id} key={group.id}>
      <div className="inventory-group-heading"><span>{group.number}</span><div><p className="eyebrow">Block collection</p><h2>{group.title}</h2><p>{group.intro}</p></div></div>
      <div className="inventory-block-grid">{group.blocks.map((block,index)=><article className="inventory-block" key={block.title}>
        <div className="inventory-block-title"><span>{String(index+1).padStart(2,'0')}</span><div><h3>{block.title}</h3><p>{block.use}</p></div></div>
        <Preview kind={block.kind}/>
      </article>)}</div>
    </section>)}
    <section className="inventory-foundation"><div className="wrap"><p className="eyebrow">The foundation</p><h2>Designed to work for everyone</h2><div className="inventory-foundation-grid"><p>Outfit typography, Toynbee Hall’s approved palette, real and respectful photography, and the established spacing system carry through every block.</p><ul><li>Clear headings and descriptive links</li><li>Readable body text and strong contrast</li><li>Keyboard focus and touch-friendly controls</li><li>Responsive layouts and meaningful image descriptions</li></ul></div><a className="button button-light" href="/style-guide/">Explore the style guide <span>↗</span></a></div></section>
  </div>;
}
