import type { ReactNode } from 'react';
import type { ContentBlock, Link, LongFormBlock, Media } from '../content/types';
import Timeline from './Timeline';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const arrowFor = (href: string) => href.startsWith('#') ? '↓' : '↗';

function ActionLink({ link, light = false, ariaLabel }: { link: Link; light?: boolean; ariaLabel?: string }) {
  return <a className={`button${light ? ' button-light' : ''}`} href={link.href} aria-label={ariaLabel}>{link.label}<span aria-hidden="true">{arrowFor(link.href)}</span></a>;
}

function SectionHeading({ heading, headingAccent, id }: { heading: string; headingAccent?: string; id?: string }) {
  return <h2 className="section-title" id={id}>{heading}{headingAccent && <> <span className="heading-accent">{headingAccent}</span></>}</h2>;
}

function MediaFigure({ image, className = '' }: { image: Media; className?: string }) {
  return <figure className={className}><img src={image.src} alt={image.alt} loading="lazy" />{(image.caption || image.credit) && <figcaption>{image.caption}{image.credit && <span>{image.caption ? ' · ' : ''}{image.credit}</span>}</figcaption>}</figure>;
}

function InlineLinks({ text, links = [] }: { text: string; links?: { text: string; href: string }[] }) {
  if (!links.length) return <>{text}</>;
  const matches = links.map(link => ({ ...link, start: text.indexOf(link.text) })).filter(x => x.start >= 0).sort((a, b) => a.start - b.start);
  const output: ReactNode[] = [];
  let cursor = 0;
  for (const [index, link] of matches.entries()) {
    if (link.start < cursor) continue;
    output.push(text.slice(cursor, link.start), <a href={link.href} key={`${link.href}-${index}`}>{link.text}</a>);
    cursor = link.start + link.text.length;
  }
  output.push(text.slice(cursor));
  return <>{output}</>;
}

type LongFormSection = LongFormBlock['sections'][number];
type LongFormParagraph = Extract<LongFormSection, { type: 'paragraph' }>;
type LongFormCard = { image: Media; title: string; description?: LongFormParagraph; icon: boolean };
const isCompactIcon = (src: string) => src.startsWith('/images/advice-icons/') || /135(?:-?x-?)135|in-person|by-phone|video-and-webchat|icons-for-website/i.test(src);
const iconTitle = (src: string) => {
  const filename = src.split('/').at(-1)?.toLowerCase() ?? '';
  if (filename.includes('debtmoney')) return 'Debt and Money';
  if (filename.includes('benefits')) return 'Benefits';
  if (filename.includes('housing')) return 'Housing';
  if (filename.includes('employment')) return 'Employment';
  if (filename.includes('in-person')) return 'In person';
  if (filename.includes('by-phone')) return 'By phone';
  if (filename.includes('video-and-webchat')) return 'Video and webchat';
  if (filename.includes('icons-for-website')) return 'Consumer advice';
  return 'Advice option';
};

function cardAt(sections: LongFormBlock['sections'], index: number): { card: LongFormCard; nextIndex: number } | undefined {
  const image = sections[index];
  const title = sections[index + 1];
  if (image?.type !== 'image') return undefined;
  if (title?.type === 'heading' && title.level === 3) {
    const description = sections[index + 2];
    return { card: { image: image.image, title: title.text, description: description?.type === 'paragraph' ? description : undefined, icon: isCompactIcon(image.image.src) }, nextIndex: index + (description?.type === 'paragraph' ? 3 : 2) };
  }
  if (isCompactIcon(image.image.src) && title?.type === 'paragraph') {
    return { card: { image: image.image, title: iconTitle(image.image.src), description: title, icon: true }, nextIndex: index + 2 };
  }
  return undefined;
}

function LongFormSectionView({ section, index }: { section: LongFormSection; index: number }) {
  if (section.type === 'heading') return section.level === 3 ? <h3 key={index}>{section.text}</h3> : <SectionHeading key={index} heading={section.text}/>;
  if (section.type === 'paragraph') return <p key={index}><InlineLinks text={section.text} links={section.links}/></p>;
  if (section.type === 'list') { const List = section.ordered ? 'ol' : 'ul'; return <List key={index}>{section.items.map((item, i) => <li key={`${item}-${i}`}>{item}</li>)}</List>; }
  if (section.type === 'image') {
    const icon = isCompactIcon(section.image.src);
    const image = icon ? { ...section.image, alt: section.image.alt === 'Photograph from Toynbee Hall' ? `${iconTitle(section.image.src)} icon` : section.image.alt, caption: undefined } : section.image;
    return <MediaFigure key={index} image={image} className={`long-form-media${icon ? ' long-form-icon-only' : ''}`}/>;
  }
  return <figure className="quote-block long-form-quote" key={index}><blockquote>{section.quote}</blockquote>{section.attribution && <figcaption>{section.attribution}</figcaption>}</figure>;
}

function LongFormCardView({ card, standalone = false }: { card: LongFormCard; standalone?: boolean }) {
  const image = card.icon ? { ...card.image, alt: '', caption: undefined } : card.image;
  const className = `long-form-card${card.icon ? ' long-form-card-icon' : ''}${standalone ? ' long-form-card-icon-standalone' : ''}`;
  return <article className={className}>
    <MediaFigure image={image} className="long-form-card-media"/>
    <h3>{card.title}</h3>
    {card.description && <p><InlineLinks text={card.description.text} links={card.description.links}/></p>}
  </article>;
}

function LongFormSections({ sections }: { sections: LongFormBlock['sections'] }) {
  const output: ReactNode[] = [];
  let index = 0;
  while (index < sections.length) {
    const current = sections[index];
    if (current.type === 'heading') {
      const cards: LongFormCard[] = [];
      let cursor = index + 1;
      let candidate = cardAt(sections, cursor);
      while (candidate) {
        cards.push(candidate.card);
        cursor = candidate.nextIndex;
        candidate = cardAt(sections, cursor);
      }
      if (cards.length > 1) {
        output.push(LongFormSectionView({ section: current, index }));
        const gridSize = cards.length === 5 ? ' long-form-card-grid-five' : cards.length === 6 ? ' long-form-card-grid-balanced' : '';
        output.push(<div className={`long-form-card-grid${gridSize}`} key={`section-card-grid-${index}`}>{cards.map((card, i) => <LongFormCardView card={card} key={`${card.title}-${i}`}/>)}</div>);
        index = cursor;
        continue;
      }
    }
    if (current.type === 'image') {
      if (isCompactIcon(current.image.src) && sections[index + 1]?.type === 'paragraph') {
        const title = iconTitle(current.image.src);
        const description = sections[index + 1];
        output.push(<LongFormCardView standalone card={{ image: current.image, title, icon: true, description: description.type === 'paragraph' ? description : undefined }} key={`icon-card-${index}`}/>);
        index += 2;
        continue;
      }
      let end = index + 1;
      while (end < sections.length && sections[end].type === 'image') end++;
      if (end - index > 1) {
        output.push(<div className="long-form-image-grid" key={`image-grid-${index}`}>{sections.slice(index, end).map((section, i) => section.type === 'image' ? <MediaFigure key={`${section.image.src}-${i}`} image={section.image} className="long-form-gallery-item"/> : null)}</div>);
        index = end;
        continue;
      }

      const title = sections[index + 1];
      if (title?.type === 'heading' && title.level === 3) {
        const hasDescription = sections[index + 2]?.type === 'paragraph';
        const cards: LongFormCard[] = [];
        let cursor = index;
        while (cursor + 1 < sections.length) {
          const image = sections[cursor];
          const heading = sections[cursor + 1];
          const paragraph = sections[cursor + 2];
          const description = paragraph?.type === 'paragraph' ? paragraph : undefined;
          if (image.type !== 'image' || heading.type !== 'heading' || heading.level !== 3 || (description !== undefined) !== hasDescription) break;
          cards.push({ image: image.image, title: heading.text, description, icon: isCompactIcon(image.image.src) });
          cursor += hasDescription ? 3 : 2;
          if (sections[cursor]?.type !== 'image') break;
        }
        if (cards.length > 1) {
          const gridSize = cards.length === 5 ? ' long-form-card-grid-five' : cards.length === 6 ? ' long-form-card-grid-balanced' : '';
          output.push(<div className={`long-form-card-grid${gridSize}`} key={`card-grid-${index}`}>{cards.map((card, i) => <LongFormCardView card={card} key={`${card.title}-${i}`}/>)}</div>);
          index = cursor;
          continue;
        }
      }
    }
    output.push(LongFormSectionView({ section: current, index }));
    index++;
  }
  return <section className="content-block long-form">{output}</section>;
}

export default function ContentBlockRenderer({ block, heroHeadingLevel = 1 }: { block: ContentBlock; heroHeadingLevel?: 1 | 3 | 4 }) {
  switch (block.type) {
    case 'richText':
      return <section className="content-block rich-text">{block.heading && <SectionHeading heading={block.heading} headingAccent={block.headingAccent}/>} {block.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</section>;
    case 'longForm':
      return <LongFormSections sections={block.sections}/>;
    case 'linkList':
      return <section className="content-block link-list">{block.heading && <h2>{block.heading}</h2>}<ul>{block.items.map(item => <li key={item.href}><a href={item.href}>{item.label}</a>{item.description && <p>{item.description}</p>}</li>)}</ul></section>;
    case 'quote':
      return <figure className={`content-block quote-block${block.variant === 'editorial' ? ' quote-editorial' : ''}`}>{block.image && <img className="quote-image" src={block.image.src} alt={block.image.alt}/>}<blockquote>{block.variant === 'editorial' && <span className="quote-mark" aria-hidden="true">“</span>}{block.quote}</blockquote>{block.attribution && <figcaption>{block.attribution}</figcaption>}</figure>;
    case 'callout':
      return <aside className="content-block callout-block"><h2>{block.heading}</h2><p>{block.body}</p>{block.link && <ActionLink link={block.link}/>}</aside>;
    case 'hero': {
      const variantClass = !block.image ? ' hero-no-image' : block.variant === 'full-bleed' ? ' hero-full-bleed' : '';
      const Heading = `h${heroHeadingLevel}` as const;
      return <section className={`hero${variantClass}`}>{block.image && <div className="hero-image"><img src={block.image.src} alt={block.image.alt}/></div>}<div className="hero-copy">
        {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}<Heading className="hero-heading">{block.headingLines.slice(0, -1).map(line => <span key={line}>{line}<br/></span>)}<em>{block.headingLines.at(-1)}</em></Heading>
        {block.body && <p>{block.body}</p>}{block.link && <ActionLink link={block.link}/>} {block.secondaryLink && <a className="hero-secondary-link" href={block.secondaryLink.href}>{block.secondaryLink.label}</a>}
      </div></section>;
    }
    case 'cardGrid': {
      const columnsClass = block.columns === 2 ? ' card-grid-two' : block.columns === 3 ? ' card-grid-three' : block.items.length >= 5 ? ' card-grid-five' : '';
      const variantClass = block.variant === 'pathways' ? ' card-grid-pathways' : '';
      return <section className="intro wrap" id={block.id}>{(block.eyebrow || block.heading || block.intro) && <div>{block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}{block.heading && <SectionHeading heading={block.heading} headingAccent={block.headingAccent}/>} {block.intro && <p className="card-grid-intro">{block.intro}</p>}</div>}
        <ul className={`card-grid${columnsClass}${variantClass}${block.numbered && block.columns ? ' card-grid-numbered' : ''}`}>{block.items.map((card, i) => {
          const icon = Boolean(card.image && (block.imageStyle === 'icon' || isCompactIcon(card.image.src)));
          const image = card.image && icon ? { ...card.image, alt: card.image.alt === 'Photograph from Toynbee Hall' ? `${card.title} icon` : card.image.alt, caption: undefined } : card.image;
          const linkLabel = card.linkLabel ?? 'Learn more';
          return <li key={`${card.title}-${i}`}><article className={`service-card tint-${card.theme ?? 'blue'}${icon ? ' service-card-icon' : ''}`}>
            {image && <MediaFigure image={image} className="service-card-image"/>}{block.numbered && <span className="card-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>}{card.meta && <p className="eyebrow">{card.meta}</p>}
            <h3>{card.href ? <a href={card.href}>{card.title}</a> : card.title}</h3>
            {card.description && <p>{card.description}</p>}
            {card.href && <a className="text-link" href={card.href} aria-label={`${linkLabel}: ${card.title}`}>{linkLabel} <b aria-hidden="true">↗</b></a>}
          </article></li>;
        })}</ul></section>;
    }
    case 'splitBanner':
      return <section className={`split-banner banner-layout banner-layout-watermark${block.imagePosition === 'left' ? ' split-banner-image-left' : ''}${block.theme === 'navy' ? ' split-banner-navy' : ''}`}>
        <div className="banner-layout-copy">
          {block.eyebrow && <p className="banner-layout-label">{block.eyebrow}</p>}
          <h2>{block.heading}</h2>
          {block.body && <p>{block.body}</p>}
          {block.link && <ActionLink link={block.link} light/>}
        </div>
        <MediaFigure image={block.image} className="banner-layout-media"/>
      </section>;
    case 'statement':
      return <section className="statement"><div className="wrap statement-inner">{block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}<h2>{block.heading}</h2>{block.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}{block.link && <ActionLink link={block.link} light/>}</div></section>;
    case 'newsList': {
      const editorial = block.variant === 'editorial';
      return <section className={`news wrap${editorial ? ' news-editorial' : ''}`}>
        <div className="section-heading">
          <div>{block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}<SectionHeading heading={block.heading} headingAccent={block.headingAccent}/></div>
          {block.allLink && (editorial ? <ActionLink link={block.allLink}/> : <a className="text-link" href={block.allLink.href}>{block.allLink.label} <b aria-hidden="true">↗</b></a>)}
        </div>
        <div className="news-grid">{block.items.map((item, i) => {
          const orange = item.theme === 'orange' && (editorial || i !== 0);
          const className = `${i === 0 ? 'news-feature' : 'news-small'}${orange ? ' news-card-orange' : ''}`;
          const meta = [item.category, item.date].filter(Boolean).join(' · ');
          const ariaLabel = `${block.readLabel}: ${item.title}`;
          return <article className={className} key={item.href}>
            <MediaFigure image={item.image} className="news-media"/>
            <div className="news-copy">
              {meta && <p className="eyebrow">{meta}</p>}
              <h3><a href={item.href}>{item.title}</a></h3>
              {item.byline && <p className="news-byline">{item.byline}</p>}
              <p className="news-summary">{item.summary}</p>
              {editorial
                ? <ActionLink link={{ href: item.href, label: block.readLabel }} light={orange} ariaLabel={ariaLabel}/>
                : <a className="text-link" href={item.href} aria-label={ariaLabel}>{block.readLabel} <b aria-hidden="true">↗</b></a>}
            </div>
          </article>;
        })}</div>
      </section>;
    }
    case 'imageText':
      return <section className={`venue${block.imagePosition === 'right' ? ' venue-image-right' : ''}${block.variant === 'editorial' ? ' venue-editorial' : ''}`}>
        <div className={`venue-media venue-media-${Math.min(block.images.length, 2)}`}>{block.images.slice(0, 2).map(image => <MediaFigure key={image.src} image={image} className="venue-figure"/>)}</div>
        <div className="venue-copy">
          {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
          <SectionHeading heading={block.heading} headingAccent={block.headingAccent}/>
          {block.paragraphs.map((p, i) => <p key={i}>{p}</p>)}{block.link && <ActionLink link={block.link}/>}
        </div>
      </section>;
    case 'newsletterSignup': {
      const id = `signup-${slugify(block.heading)}`;
      const fallback = !block.action && block.fallbackLink;
      return <section className="newsletter" aria-labelledby={id}>
        <div className="wrap newsletter-inner">
          <div>{block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}<SectionHeading id={id} heading={block.heading}/>{block.paragraphs.map((p, i) => <p key={i}>{p}</p>)}{block.privacy && <p className="signup-privacy">{block.privacy.text} <a href={block.privacy.link.href}>{block.privacy.link.label}</a></p>}</div>
          <form className="signup-form" action={block.action} method={block.action ? 'post' : undefined}>
            <fieldset className="form-fields" disabled={Boolean(fallback)}>
              {fallback
                ? <p className="signup-instructions">Use the live form to subscribe.</p>
                : block.instructions && <p className="signup-instructions">{block.instructions} <span>Fields marked * are required.</span></p>}
              {block.fields.map(field => <div className="signup-field" key={field.name}><label htmlFor={`${id}-${field.name}`}>{field.label}{field.required && <span aria-hidden="true"> *</span>}</label><input id={`${id}-${field.name}`} name={field.name} type={field.type} required={field.required} autoComplete={field.autoComplete}/></div>)}
            </fieldset>
            {fallback ? <ActionLink link={fallback}/> : <button className="button" type={block.action ? 'submit' : 'button'}>{block.submitLabel} <span aria-hidden="true">↗</span></button>}
          </form>
        </div>
      </section>;
    }
    case 'enquiryForm': {
      const id = `form-${slugify(block.heading)}`;
      const fallback = !block.action && block.fallbackLink;
      return <section id={slugify(block.heading) === 'contact-us' ? 'contact-us' : undefined} className="content-block enquiry-form" aria-labelledby={id}>{block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}<SectionHeading id={id} heading={block.heading}/>{block.intro && <p>{block.intro}</p>}<form action={block.action} method={block.action ? 'post' : undefined}>
        <fieldset className="form-fields" disabled={Boolean(fallback)}>
        {block.fields.map((field, i) => { const fieldId = `${id}-${field.name}`; const hintId = `${fieldId}-hint`; return <div className={`enquiry-field${field.type === 'checkbox' ? ' enquiry-checkbox' : ''}`} key={`${field.name}-${i}`}>
          {field.type === 'checkbox' ? <label htmlFor={fieldId}><input id={fieldId} name={field.name} type="checkbox" required={field.required}/><span>{field.label}{field.required && <span aria-hidden="true"> *</span>}</span></label> : <><label htmlFor={fieldId}>{field.label}{field.required && <span aria-hidden="true"> *</span>}</label>{field.type === 'textarea' ? <textarea id={fieldId} name={field.name} required={field.required} aria-describedby={field.hint ? hintId : undefined} rows={5}/> : field.type === 'select' ? <select id={fieldId} name={field.name} required={field.required} aria-describedby={field.hint ? hintId : undefined}><option value="">Please select</option>{field.options?.map(option => <option key={option} value={option}>{option}</option>)}</select> : <input id={fieldId} name={field.name} type={field.type} required={field.required} aria-describedby={field.hint ? hintId : undefined}/>}</>}
          {field.hint && <small id={hintId}>{field.hint}</small>}
        </div>; })}
        </fieldset>
        {block.privacy && <p className="form-privacy"><a href={block.privacy.href}>{block.privacy.label}</a></p>}
        {fallback ? <ActionLink link={fallback}/> : <button className="button" type={block.action ? 'submit' : 'button'}>{block.submitLabel}<span aria-hidden="true">↗</span></button>}
      </form></section>;
    }
    case 'logoGrid':
      return <section className="logo-grid wrap" aria-label={block.heading ? undefined : block.label}>{block.heading && <h2>{block.heading}</h2>}<ul>{block.logos.map(image => <li key={image.src}><MediaFigure image={image} className="logo-figure"/></li>)}</ul></section>;
    case 'imageGallery':
      return <section className="content-block image-gallery">{block.heading && <h2>{block.heading}</h2>}{block.intro && <p className="block-intro">{block.intro}</p>}<div className="gallery-grid">{block.images.map((image, i) => <MediaFigure image={image} key={`${image.src}-${i}`} className="gallery-item"/>)}</div></section>;
    case 'impactStats':
      return <section className="content-block impact-stats"><div className="block-heading">{block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}<h2>{block.heading}</h2>{block.intro && <p>{block.intro}</p>}</div><ul>{block.stats.map((stat, i) => <li key={`${stat.value}-${i}`}><p className="stat-value">{stat.value}</p><h3>{stat.label}</h3>{stat.detail && <p>{stat.detail}</p>}{stat.source && <a href={stat.source.href}>{stat.source.label}</a>}</li>)}</ul></section>;
    case 'steps': {
      const connected = block.variant === 'connected';
      return <section className={`content-block steps-block${connected ? ' steps-connected' : ''}`}>
        {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}<SectionHeading heading={block.heading}/>{block.intro && <p className="block-intro">{block.intro}</p>}
        <ol role="list">{block.steps.map((step, i) => <li key={`${step.title}-${i}`}>
          <span className="step-number" aria-hidden="true">{connected && step.icon ? <img src={step.icon} alt="" width="40" height="40" loading="lazy"/> : String(i + 1).padStart(2, '0')}</span>
          <div><h3>{step.title}</h3><p>{step.body}</p>{step.time && <p className="step-meta">{step.time}</p>}{step.link && <a className="text-link" href={step.link.href}>{step.link.label} <b aria-hidden="true">↗</b></a>}</div>
        </li>)}</ol>
      </section>;
    }
    case 'infoPanel':
      return <aside className={`content-block info-panel info-${block.theme ?? 'blue'}`}><h2>{block.heading}</h2>{block.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}{block.items && <ul>{block.items.map(x => <li key={x}>{x}</li>)}</ul>}{block.link && <ActionLink link={block.link}/>}</aside>;
    case 'contactRoutes':
      return <section className="content-block contact-routes">{block.heading && <h2>{block.heading}</h2>}<ul>{block.contacts.map(contact => <li key={`${contact.name}-${contact.email ?? contact.phone ?? ''}`}><h3>{contact.name}</h3>{contact.description && <p>{contact.description}</p>}{contact.email && <p><span>Email</span> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>}{contact.phone && <p><span>Phone</span> <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a></p>}{contact.address && <p><span>Address</span> {contact.address}</p>}{contact.hours && <p><span>Opening times</span> {contact.hours}</p>}{contact.link && <a className="text-link" href={contact.link.href}>{contact.link.label} <b aria-hidden="true">↗</b></a>}</li>)}</ul></section>;
    case 'schedule':
      return <section className="content-block schedule-block"><h2>{block.heading}</h2>{block.intro && <p className="block-intro">{block.intro}</p>}{block.updated && <p className="schedule-updated">Updated {block.updated}</p>}<div className="schedule-table-wrap"><table><thead><tr><th scope="col">Day</th><th scope="col">Time</th><th scope="col">Activity</th><th scope="col">Who / where</th></tr></thead><tbody>{block.rows.map((row, i) => <tr key={`${row.day}-${row.time}-${i}`}><th scope="row">{row.day}</th><td>{row.time}</td><td>{row.activity}{row.booking && <p><a href={row.booking.href}>{row.booking.label}</a></p>}</td><td>{[row.audience, row.location].filter(Boolean).join(' · ')}</td></tr>)}</tbody></table></div></section>;
    case 'resourceList':
      return <section className="content-block resource-list">{block.heading && <SectionHeading heading={block.heading}/>} {block.intro && <p className="block-intro">{block.intro}</p>}<ul>{block.resources.map((resource, i) => {
        const meta = [resource.format, resource.fileSize, resource.date].filter(Boolean).join(' · ');
        return <li className={resource.cover ? 'resource-with-cover' : undefined} key={`${resource.href}-${i}`}>
          {resource.cover && <MediaFigure image={resource.cover} className="resource-cover"/>}
          <div className="resource-copy"><a href={resource.href}>{resource.title}</a>{resource.summary && <p>{resource.summary}</p>}{meta && <p className="resource-meta">{meta}</p>}</div>
        </li>;
      })}</ul></section>;
    case 'accordion':
      return <section className="content-block accordion-block">{block.heading && <h2>{block.heading}</h2>}{block.items.map((item, i) => <details key={`${item.title}-${i}`}><summary>{item.title}</summary><div className="accordion-content"><p>{item.body}</p>{item.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}{item.links && <ul>{item.links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>}</div></details>)}</section>;
    case 'donationAppeal':
      return <section className="content-block donation-appeal"><div>{block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}<h2>{block.heading}</h2><p>{block.body}</p>{block.impact && <p className="donation-impact">{block.impact}</p>}<div className="donation-actions"><ActionLink link={block.primaryLink}/>{block.secondaryLink && <a className="text-link" href={block.secondaryLink.href}>{block.secondaryLink.label} <b aria-hidden="true">↗</b></a>}</div></div></section>;
    case 'timeline':
      return <Timeline block={block} className="content-block" headingClassName="section-title" eyebrowClassName="eyebrow" linkClassName="text-link"/>;
    case 'relatedContent':
      return <section className="content-block related-content">{block.heading && <h2>{block.heading}</h2>}<ul>{block.items.map((item, i) => <li key={`${item.href}-${i}`}><article>{item.image && <MediaFigure image={item.image} className="related-image"/>}<div>{item.type && <p className="eyebrow">{item.type}</p>}<h3><a href={item.href}>{item.title}</a></h3>{item.summary && <p>{item.summary}</p>}<a className="text-link" href={item.href}>Read more <b aria-hidden="true">↗</b></a></div></article></li>)}</ul></section>;
  }
}
