import tokens from '../content/design-tokens.json';

const colors = [
  ['Orange', tokens.colors.orange, 'Accent, calls to action, story features'],
  ['Deep slate', tokens.colors.deepSlate, 'Interface text on orange, jade and pale surfaces'],
  ['Grey', tokens.colors.grey, 'Body text on white'],
  ['Navy', tokens.colors.navy, 'Headings, links, high-contrast panels'],
  ['Jade', tokens.colors.jade, 'Supporting accent'],
  ['Light blue', tokens.colors.lightBlue, 'Supporting panels'],
  ['Yellow', tokens.colors.yellow, 'Highlights'],
  ['Black', tokens.colors.black, 'Core brand color; reserved from interface copy'],
  ['White', tokens.colors.white, 'Page backgrounds and reverse text'],
  ['Orange tint', tokens.colors.orangeTint, 'Soft story and callout surfaces'],
  ['Jade tint', tokens.colors.jadeTint, 'Newsletter and community surfaces'],
  ['Light blue tint', tokens.colors.lightBlueTint, 'Quiet information panels'],
  ['Yellow tint', tokens.colors.yellowTint, 'Soft highlight surfaces'],
];
const swatchText: Record<string, string> = {
  Orange: tokens.colors.deepSlate,
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
    <header className="guide-hero"><div className="wrap"><p className="eyebrow">Digital design system</p><h1>Toynbee Hall<br/><em>website style guide</em></h1><p>Official brand foundations, adapted for clear and reusable web experiences. The October campaign image informs the editorial story pattern; it does not replace the core identity.</p></div></header>
    <section className="guide-section wrap"><p className="eyebrow">01 / Color</p><h2>Brand colors, shown in context</h2><p className="guide-lead">Use full-strength colors for accents and approved tints for broad surfaces. Each swatch shows its hex value and suggested role.</p>
      <div className="swatch-grid">{colors.map(([name, value, use])=><article className="swatch" key={name}><div className="swatch-chip" style={{backgroundColor:value, color:swatchText[name]}}><span>Aa</span></div><div className="swatch-meta"><strong>{name}</strong><code>{value}</code><p>{use}</p></div></article>)}</div>
      <h3>Accessible combinations</h3><div className="contrast-grid"><div className="contrast-sample contrast-orange"><b>Deep slate on orange</b><span>Body text and buttons · 4.9:1</span></div><div className="contrast-sample contrast-navy"><b>White on navy</b><span>Large panels and calls to action</span></div><div className="contrast-sample contrast-white"><b>Grey on white</b><span>Long-form body copy</span></div><div className="contrast-sample contrast-jade"><b>Deep slate on jade</b><span>Body copy on accent panels · 4.9:1</span></div></div>
      <p className="guide-note">Use deep slate for body text and button labels on orange and jade. Reserve white text on those colors for large headlines. Aim for 4.5:1 contrast for normal text and 3:1 for large text.</p>
    </section>
    <section className="guide-section guide-type"><div className="wrap"><p className="eyebrow">02 / Typography</p><h2>Outfit, with a clear voice</h2><p className="guide-lead">The examples below use the actual web font and weights used by the site.</p>
      <div className="type-specimen"><div><span className="type-label">300 · Light</span><p style={{fontWeight:300}}>People and communities can thrive.</p></div><div><span className="type-label">400 · Regular</span><p style={{fontWeight:400}}>People and communities can thrive.</p></div><div><span className="type-label">500 · Medium</span><p style={{fontWeight:500}}>People and communities can thrive.</p></div></div>
      <div className="type-scale"><div><span>H1 · 64 / 46px</span><h1>Change starts here</h1></div><div><span>H2 · 44 / 34px</span><h2>Stronger communities</h2></div><div><span>H3 · 24px</span><h3>Advice that makes a difference</h3></div><div><span>Body · 16–18px / 1.5</span><p>We work alongside people to build a fairer future, with practical support, learning and community action.</p></div><div><span>Small label · 14px</span><p className="sample-label">NEWS · COMMUNITY · IMPACT</p></div></div>
    </div></section>
    <section className="guide-section wrap"><p className="eyebrow">03 / Components</p><h2>Reusable patterns in the system</h2><div className="guide-components"><div className="guide-component"><span className="type-label">Primary action</span><a className="button" href="#components">Explore our work <span>↗</span></a></div><div className="guide-component guide-action-navy"><span className="type-label">Reverse action</span><a className="button button-light" href="#components">Find out more <span>↗</span></a></div><article className="guide-story"><img src="/images/rushanara-ali-visit.webp" alt="Toynbee Hall team welcoming Rushanara Ali MP outside the Hall"/><div><span className="type-label">Editorial story · Orange</span><h3>Welcoming Rushanara Ali MP to Toynbee Hall</h3><p>A visit to share our work and research with local partners.</p></div></article><article className="guide-card"><span className="type-label">Service card · Pale tint</span><h3>Advice and support</h3><p>Practical help, shaped around the person and their circumstances.</p><a className="text-link" href="#components">Explore support <b>↗</b></a></article></div></section>
    <section className="guide-access"><div className="wrap"><p className="eyebrow">04 / Use with care</p><h2>Accessible by design</h2><ul><li>Body copy stays at least 16px.</li><li>Interactive targets are at least 44px where practical.</li><li>Keyboard focus uses a visible 3px navy outline.</li><li>Informative images have meaningful alt text.</li><li>Use approved logo artwork on white with clear space.</li></ul></div></section>
  </div>;
}
