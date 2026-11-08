import type { ContentBlock } from '../content/types';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const arrowFor = (href: string) => (href.startsWith('#') ? '↓' : '↗');

export default function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'richText':
      return (
        <section className="content-block rich-text">
          {block.heading && <h2>{block.heading}</h2>}
          {block.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </section>
      );
    case 'linkList':
      return (
        <section className="content-block link-list">
          {block.heading && <h2>{block.heading}</h2>}
          <ul>{block.items.map(item => <li key={item.href}><a href={item.href}>{item.label}</a>{item.description && <p>{item.description}</p>}</li>)}</ul>
        </section>
      );
    case 'quote':
      return (
        <figure className="content-block quote-block">
          <blockquote>{block.quote}</blockquote>
          {block.attribution && <figcaption>{block.attribution}</figcaption>}
        </figure>
      );
    case 'callout':
      return (
        <aside className="content-block callout-block">
          <h2>{block.heading}</h2>
          <p>{block.body}</p>
          {block.link && <a className="text-link" href={block.link.href}>{block.link.label} <b>↗</b></a>}
        </aside>
      );
    case 'hero': {
      const lines = block.headingLines;
      return (
        <section className="hero">
          <div className="hero-image"><img src={block.image.src} alt={block.image.alt}/></div>
          <div className="hero-copy">
            {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
            <h1>
              {lines.slice(0, -1).map(line => <span key={line}>{line}<br/></span>)}
              <em>{lines.at(-1)}</em>
            </h1>
            {block.body && <p>{block.body}</p>}
            {block.link && <a className="button" href={block.link.href}>{block.link.label} <span aria-hidden="true">{arrowFor(block.link.href)}</span></a>}
          </div>
        </section>
      );
    }
    case 'cardGrid':
      return (
        <section className="intro wrap" id={block.id}>
          {(block.eyebrow || block.heading) && (
            <div>
              {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
              {block.heading && <h2>{block.heading}</h2>}
            </div>
          )}
          <ul className="card-grid">
            {block.items.map((card, index) => (
              <li key={card.href}>
                <a className={`service-card tint-${card.theme ?? 'blue'}`} href={card.href}>
                  {block.numbered && <span className="card-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  {card.linkLabel
                    ? <span className="text-link">{card.linkLabel} <b aria-hidden="true">↗</b></span>
                    : <b className="card-arrow" aria-hidden="true">↗</b>}
                </a>
              </li>
            ))}
          </ul>
        </section>
      );
    case 'statement':
      return (
        <section className="statement">
          <div className="wrap statement-inner">
            {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
            <h2>{block.heading}</h2>
            {block.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            {block.link && <a className="button button-light" href={block.link.href}>{block.link.label} <span aria-hidden="true">↗</span></a>}
          </div>
        </section>
      );
    case 'newsList':
      return (
        <section className="news wrap">
          <div className="section-heading">
            <div>
              {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
              <h2>{block.heading}</h2>
            </div>
            {block.allLink && <a className="text-link" href={block.allLink.href}>{block.allLink.label} <b aria-hidden="true">↗</b></a>}
          </div>
          <div className="news-grid">
            {block.items.map((item, index) => {
              const className = index === 0 ? 'news-feature' : item.theme === 'orange' ? 'news-small news-card-orange' : 'news-small';
              const meta = [item.category, item.date].filter(Boolean).join(' · ');
              return (
                <article className={className} key={item.href}>
                  <img className="news-photo" src={item.image.src} alt={item.image.alt}/>
                  <div className={index === 0 ? '' : 'news-copy'}>
                    {meta && <p className="eyebrow">{meta}</p>}
                    <h3><a href={item.href}>{item.title}</a></h3>
                    {item.byline && <p className="news-byline">{item.byline}</p>}
                    <p className="news-summary">{item.summary}</p>
                    <a className="text-link" href={item.href} aria-label={`${block.readLabel}: ${item.title}`}>{block.readLabel} <b aria-hidden="true">↗</b></a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      );
    case 'imageText':
      return (
        <section className={`venue${block.imagePosition === 'right' ? ' venue-image-right' : ''}`}>
          <div className={`venue-media venue-media-${Math.min(block.images.length, 2)}`}>
            {block.images.slice(0, 2).map(image => <img key={image.src} src={image.src} alt={image.alt}/>)}
          </div>
          <div className="venue-copy">
            {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
            <h2>{block.heading}</h2>
            {block.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            {block.link && <a className="button" href={block.link.href}>{block.link.label} <span aria-hidden="true">↗</span></a>}
          </div>
        </section>
      );
    case 'newsletterSignup': {
      const headingId = `signup-${slugify(block.heading)}`;
      return (
        <section className="newsletter" aria-labelledby={headingId}>
          <div className="wrap newsletter-inner">
            <div>
              {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
              <h2 id={headingId}>{block.heading}</h2>
              {block.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              {block.privacy && <p className="signup-privacy">{block.privacy.text} <a href={block.privacy.link.href}>{block.privacy.link.label}</a></p>}
            </div>
            <form className="signup-form" action={block.action} method={block.action ? 'post' : undefined}>
              {block.instructions && <p className="signup-instructions">{block.instructions} <span>Fields marked * are required.</span></p>}
              {block.fields.map(field => (
                <div className="signup-field" key={field.name}>
                  <label htmlFor={`${headingId}-${field.name}`}>{field.label}{field.required && <span aria-hidden="true"> *</span>}</label>
                  <input id={`${headingId}-${field.name}`} name={field.name} type={field.type} required={field.required} autoComplete={field.autoComplete}/>
                </div>
              ))}
              <button className="button" type={block.action ? 'submit' : 'button'}>{block.submitLabel} <span aria-hidden="true">↗</span></button>            </form>
          </div>
        </section>
      );
    }
    case 'logoGrid':
      return (
        <section className="logo-grid wrap" aria-label={block.heading ? undefined : block.label}>
          {block.heading && <h2>{block.heading}</h2>}
          <ul>
            {block.logos.map(logo => <li key={logo.src}><img src={logo.src} alt={logo.alt} loading="lazy"/></li>)}
          </ul>
        </section>
      );
  }
}
