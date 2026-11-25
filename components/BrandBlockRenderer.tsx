import type { ReactNode } from 'react';
import type { ContentBlock, Link, Media, TintTheme } from '../content/types';
import Timeline from './Timeline';

/*
 * Renders the shared content blocks using only the Toynbee Hall Brand Guidelines (2024):
 * the six-colour palette plus black and white (solids or tints), Outfit Light headings,
 * navy subheads, grey body copy, short orange rules, tinted panels, highlight bands and
 * linear icons in orange roundels. No text sits over photographs and the logo device is
 * never used as decoration. Styles live in app/brand-inventory.css, scoped to `.bi`.
 */

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function Button({ link, variant = 'navy', ariaLabel }: { link: Link; variant?: 'navy' | 'white'; ariaLabel?: string }) {
  return <a className={`bi-button bi-button-${variant}`} href={link.href} aria-label={ariaLabel}>{link.label}</a>;
}

function TextLink({ link, ariaLabel }: { link: Link; ariaLabel?: string }) {
  return <a className="bi-text-link" href={link.href} aria-label={ariaLabel}>{link.label}</a>;
}

/** Section heading set in a single colour (orange); a heading accent is joined to the heading, not set apart. */
function Heading({ heading, accent, level = 2, id }: { heading: string; accent?: string; level?: 2 | 3; id?: string }) {
  const Tag = `h${level}` as const;
  return <Tag className="bi-heading" id={id}>{accent ? `${heading} ${accent}` : heading}</Tag>;
}

/** Category and date for a news item, with the date kept on one line. */
function NewsMeta({ category, date }: { category?: string; date?: string }) {
  if (!category && !date) return null;
  return <p className="bi-news-meta">{category && <span className="bi-news-category">{category}</span>}{date && <span className="bi-nowrap">{date}</span>}</p>;
}

function Label({ children }: { children: ReactNode }) {
  return <p className="bi-label">{children}</p>;
}

function Figure({ image, className = '' }: { image: Media; className?: string }) {
  return <figure className={`bi-figure ${className}`}>
    <img src={image.src} alt={image.alt} loading="lazy"/>
    {(image.caption || image.credit) && <figcaption>{image.caption}{image.caption && image.credit && ' · '}{image.credit && `Photo: ${image.credit}`}</figcaption>}
  </figure>;
}

/** A linear icon recoloured white inside an orange roundel. */
function Roundel({ src, label }: { src: string; label?: string }) {
  return <span className="bi-roundel" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
    <span className="bi-roundel-icon" style={{ maskImage: `url("${src}")`, WebkitMaskImage: `url("${src}")` }}/>
  </span>;
}

/** Icons from the live site that are already supplied as orange roundels. */
const isRoundelIcon = (src: string) =>
  (src.startsWith('/images/advice-icons/') && !src.includes('-outline')) || /135(?:-?x-?)135|in-person|by-phone|video-and-webchat|icons-for-website/i.test(src);

const tintFor = (theme: TintTheme | undefined, index: number, cycle: boolean) =>
  cycle ? (['yellow', 'jade', 'blue'] as const)[index % 3] : theme ?? 'blue';

/**
 * The page banner from standard pages such as /free-advice/: an orange panel with the page title,
 * beside a photograph framed on an orange tint and offset by an orange block shadow.
 * The site version also shows the logo device as a watermark; it is left out here because the
 * guidelines do not use the device as decoration.
 */
export function BrandPageBanner({ eyebrow, title, intro, image, headingLevel = 1 }: { eyebrow?: string; title: string; intro?: string; image: Media; headingLevel?: 1 | 3 }) {
  const Title = headingLevel === 3 ? 'h3' : 'h1';
  return <header className="bi-page-banner">
    <div className="bi-page-banner-copy">
      {eyebrow && <Label>{eyebrow}</Label>}
      <Title>{title}</Title>
      {intro && <p>{intro}</p>}
    </div>
    <Figure image={image} className="bi-page-banner-media"/>
  </header>;
}

/** `pageTitle` renders a hero heading as the page's h1, for use outside the inventory. */
export default function BrandBlockRenderer({ block, pageTitle = false }: { block: ContentBlock; pageTitle?: boolean }) {
  switch (block.type) {
    case 'hero': {
      const Title = pageTitle ? 'h1' : 'h3';
      return <section className="bi-cover">
        <div className="bi-cover-copy">
          {block.eyebrow && <Label>{block.eyebrow}</Label>}
          <Title className="bi-cover-title">{block.headingLines.map(line => <span key={line}>{line}</span>)}</Title>
          {block.body && <p>{block.body}</p>}
          {(block.link || block.secondaryLink) && <div className="bi-actions">{block.link && <Button link={block.link}/>}{block.secondaryLink && <TextLink link={block.secondaryLink}/>}</div>}
        </div>
        {block.image && <Figure image={block.image} className="bi-cover-media"/>}
      </section>;
    }

    case 'cardGrid': {
      const icons = block.imageStyle === 'icon';
      const pathways = block.variant === 'pathways';
      const count = block.items.length;
      const columns = block.columns ?? (count === 5 ? 5 : count % 3 === 0 ? 3 : count === 4 ? 4 : 2);
      return <section className={`bi-block${pathways ? ' bi-block-pathways' : ''}${block.align === 'center' ? ' bi-block-centred' : ''}`} id={block.id}>
        {(block.eyebrow || block.heading || block.intro) && <div className="bi-block-head">{block.eyebrow && <Label>{block.eyebrow}</Label>}{block.heading && <Heading heading={block.heading} accent={block.headingAccent}/>}{block.intro && <p className="bi-lead">{block.intro}</p>}</div>}
        <ul className={`bi-cards bi-cols-${columns}${pathways ? ' bi-cards-pathways' : ''}`}>{block.items.map((card, i) => {
          /* Homepage pathways: a navy lead card (any card with a theme), then white cards with an orange top rule */
          const surface = pathways ? (card.theme ? 'solid-navy' : 'pathway-plain') : `tint-${tintFor(card.theme, i, icons)}`;
          const linkLabel = card.linkLabel ?? 'Learn more';
          return <li key={`${card.title}-${i}`}><article className={`bi-card bi-${surface}`}>
            {card.image && (icons ? <Roundel src={card.image.src}/> : isRoundelIcon(card.image.src) ? <img className="bi-roundel-image" src={card.image.src} alt="" width="72" height="72" loading="lazy"/> : <Figure image={card.image} className="bi-card-media"/>)}
            {block.numbered && !pathways && <span className="bi-card-number" aria-hidden="true">{i + 1}</span>}
            {card.meta && <Label>{card.meta}</Label>}
            <h3>{card.href ? <a href={card.href}>{card.title}</a> : card.title}</h3>
            {card.description && <p>{card.description}</p>}
            {card.href && <span className="bi-card-link" aria-hidden="true">{linkLabel}</span>}
          </article></li>;
        })}</ul>
      </section>;
    }

    case 'splitBanner':
      return <section className={`bi-split${block.imagePosition === 'left' ? ' bi-split-image-left' : ''}${block.theme && block.theme !== 'orange' ? ` bi-split-${block.theme}` : ''}`}>
        <div className="bi-split-copy">
          {block.eyebrow && <Label>{block.eyebrow}</Label>}
          <h2>{block.heading}</h2>
          {block.body && <p>{block.body}</p>}
          {block.link && <div className="bi-actions"><Button link={block.link}/></div>}
        </div>
        <Figure image={block.image} className="bi-split-media"/>
      </section>;

    case 'statement':
      return <section className="bi-statement">
        {block.eyebrow && <Label>{block.eyebrow}</Label>}
        <h2>{block.heading}</h2>
        {block.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
        {block.link && <div className="bi-actions"><Button link={block.link}/></div>}
      </section>;

    case 'imageText':
      return <section className={`bi-feature${block.variant === 'editorial' ? ' bi-feature-editorial' : ''}${block.imagePosition === 'right' ? ' bi-feature-image-right' : ''}`}>
        <div className="bi-feature-media">{block.images.slice(0, 2).map(image => <Figure key={image.src} image={image}/>)}</div>
        <div className="bi-feature-copy">
          {block.eyebrow && <Label>{block.eyebrow}</Label>}
          <Heading heading={block.heading} accent={block.headingAccent}/>
          {block.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {block.link && <div className="bi-actions"><Button link={block.link}/></div>}
        </div>
      </section>;

    case 'newsList':
      return <section className="bi-block">
        <div className="bi-block-head bi-block-head-split">
          <div>{block.eyebrow && <Label>{block.eyebrow}</Label>}<Heading heading={block.heading} accent={block.headingAccent}/></div>
          {block.allLink && <TextLink link={block.allLink}/>}
        </div>
        {/* The lead story runs full width in landscape; the other stories sit in a row underneath */}
        <div className="bi-news">
          {block.items.slice(0, 1).map(item => <article className={`bi-news-lead ${item.theme === 'orange' ? 'bi-solid-orange' : item.theme === 'blue' ? 'bi-news-lead-tint' : 'bi-solid-navy'}`} key={item.href}>
            <Figure image={item.image} className="bi-news-media"/>
            <div className="bi-news-copy">
              <NewsMeta category={item.category} date={item.date}/>
              <h3><a href={item.href}>{item.title}</a></h3>
              {item.byline && <p className="bi-news-byline">{item.byline}</p>}
              <p className="bi-news-summary">{item.summary}</p>
              <Button link={{ href: item.href, label: block.readLabel }} variant={item.theme === 'blue' ? 'navy' : 'white'} ariaLabel={`${block.readLabel}: ${item.title}`}/>
            </div>
          </article>)}
          {block.items.length > 1 && <div className="bi-news-side">{block.items.slice(1).map(item => <article className="bi-news-card" key={item.href}>
            <Figure image={item.image} className="bi-news-media"/>
            <div className="bi-news-copy">
              <NewsMeta category={item.category} date={item.date}/>
              <h3><a href={item.href}>{item.title}</a></h3>
              <p className="bi-news-summary">{item.summary}</p>
              <TextLink link={{ href: item.href, label: block.readLabel }} ariaLabel={`${block.readLabel}: ${item.title}`}/>
            </div>
          </article>)}</div>}
        </div>
      </section>;

    case 'quote':
      return block.variant === 'editorial'
        ? <figure className="bi-quote-band"><blockquote>{block.quote}</blockquote>{block.attribution && <figcaption>{block.attribution}</figcaption>}</figure>
        : <figure className="bi-quote"><span className="bi-rule" aria-hidden="true"/><blockquote>{block.quote}</blockquote>{block.attribution && <figcaption>{block.attribution}</figcaption>}</figure>;

    case 'quoteGrid':
      return <section className={`bi-block${block.align === 'center' ? ' bi-block-centred' : ''}`} id={block.id}>
        {(block.eyebrow || block.heading || block.intro) && <div className="bi-block-head">{block.eyebrow && <Label>{block.eyebrow}</Label>}{block.heading && <Heading heading={block.heading}/>}{block.intro && <p className="bi-lead">{block.intro}</p>}</div>}
        <ul className={`bi-quote-grid bi-cols-${Math.min(block.items.length, 3)}`}>{block.items.map((item, i) => <li key={`${item.name}-${i}`}><figure className="bi-quote-card">
          <blockquote>{item.quote}</blockquote>
          <figcaption>
            {item.image && <img src={item.image.src} alt={item.image.alt} width="48" height="48" loading="lazy"/>}
            <span><span className="bi-quote-name">{item.name}</span>{item.detail && <span className="bi-quote-detail">{item.detail}</span>}</span>
          </figcaption>
        </figure></li>)}</ul>
      </section>;

    case 'richText':
      return <section className="bi-block bi-prose">{block.heading && <Heading heading={block.heading} accent={block.headingAccent}/>}{block.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</section>;

    case 'longForm':
      return <section className="bi-block bi-prose">{block.sections.map((section, i) => {
        if (section.type === 'heading') return section.level === 3 ? <h3 key={i}>{section.text}</h3> : <Heading key={i} heading={section.text}/>;
        if (section.type === 'paragraph') return <p key={i}>{section.text}</p>;
        if (section.type === 'list') { const List = section.ordered ? 'ol' : 'ul'; return <List key={i}>{section.items.map((item, j) => <li key={j}>{item}</li>)}</List>; }
        if (section.type === 'image') return <Figure key={i} image={section.image}/>;
        return <figure className="bi-quote" key={i}><span className="bi-rule" aria-hidden="true"/><blockquote>{section.quote}</blockquote>{section.attribution && <figcaption>{section.attribution}</figcaption>}</figure>;
      })}</section>;

    case 'steps': {
      const connected = block.variant === 'connected';
      return <section className="bi-block">
        <div className="bi-block-head">{block.eyebrow && <Label>{block.eyebrow}</Label>}<Heading heading={block.heading}/>{block.intro && <p className="bi-lead">{block.intro}</p>}</div>
        <ol className={`bi-steps${connected ? ' bi-steps-connected' : ''}`} role="list">{block.steps.map((step, i) => <li key={`${step.title}-${i}`}>
          {connected && step.icon ? <Roundel src={step.icon}/> : <span className="bi-step-number" aria-hidden="true">{i + 1}</span>}
          <div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            {step.time && <p className="bi-meta">{step.time}</p>}
            {step.link && <TextLink link={step.link}/>}
          </div>
        </li>)}</ol>
      </section>;
    }

    case 'infoPanel':
      return <aside className={`bi-panel bi-tint-${block.theme ?? 'blue'}`}>
        <h2>{block.heading}</h2>
        {block.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
        {block.items && <ul>{block.items.map(item => <li key={item}>{item}</li>)}</ul>}
        {block.link && <div className="bi-actions"><Button link={block.link}/></div>}
      </aside>;

    case 'callout':
      return <aside className={`bi-panel bi-tint-blue bi-callout${block.align === 'center' ? ' bi-callout-centred' : ''}`}>
        <h2>{block.heading}</h2>
        <p>{block.body}</p>
        {block.link && <div className="bi-actions"><Button link={block.link}/></div>}
      </aside>;

    case 'impactStats':
      return <section className="bi-block">
        <div className="bi-block-head">{block.eyebrow && <Label>{block.eyebrow}</Label>}<Heading heading={block.heading}/>{block.intro && <p className="bi-lead">{block.intro}</p>}</div>
        <ul className="bi-stats">{block.stats.map((stat, i) => <li key={`${stat.value}-${i}`}>
          <p className="bi-stat-value">{stat.value}</p>
          <h3>{stat.label}</h3>
          {stat.detail && <p>{stat.detail}</p>}
          {stat.source && <TextLink link={stat.source}/>}
        </li>)}</ul>
      </section>;

    case 'contactRoutes':
      return <section className="bi-block">
        {block.heading && <Heading heading={block.heading}/>}
        <ul className="bi-contacts">{block.contacts.map(contact => <li key={`${contact.name}-${contact.email ?? contact.phone ?? ''}`}>
          <span className="bi-rule" aria-hidden="true"/>
          <h3>{contact.name}</h3>
          {contact.description && <p>{contact.description}</p>}
          <dl>
            {contact.email && <><dt>Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></>}
            {contact.phone && <><dt>Phone</dt><dd><a className="bi-nowrap" href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a></dd></>}
            {contact.address && <><dt>Address</dt><dd>{contact.address}</dd></>}
            {contact.hours && <><dt>Opening times</dt><dd>{contact.hours}</dd></>}
          </dl>
          {contact.link && <TextLink link={contact.link}/>}
        </li>)}</ul>
      </section>;

    case 'schedule':
      return <section className="bi-block">
        <Heading heading={block.heading}/>
        {block.intro && <p className="bi-lead">{block.intro}</p>}
        {block.updated && <p className="bi-meta">Updated {block.updated}</p>}
        <div className="bi-table-wrap"><table className="bi-table">
          <thead><tr><th scope="col">Day</th><th scope="col">Time</th><th scope="col">Activity</th><th scope="col">Who and where</th></tr></thead>
          <tbody>{block.rows.map((row, i) => <tr key={`${row.day}-${row.time}-${i}`}>
            <th scope="row">{row.day}</th><td className="bi-nowrap">{row.time}</td>
            <td>{row.activity}{row.booking && <p><a href={row.booking.href}>{row.booking.label}</a></p>}</td>
            <td>{[row.audience, row.location].filter(Boolean).join(' · ')}</td>
          </tr>)}</tbody>
        </table></div>
      </section>;

    case 'resourceList':
      return <section className="bi-block">
        <Heading heading={block.heading}/>
        {block.intro && <p className="bi-lead">{block.intro}</p>}
        <ul className="bi-ruled-list">{block.resources.map((resource, i) => {
          const meta = [resource.format, resource.fileSize, resource.date].filter(Boolean).join(' · ');
          return <li key={`${resource.href}-${i}`} className={resource.cover ? 'bi-resource-with-cover' : undefined}>
            {resource.cover && <Figure image={resource.cover} className="bi-resource-cover"/>}
            <div><a className="bi-list-title" href={resource.href}>{resource.title}</a>{resource.summary && <p>{resource.summary}</p>}{meta && <p className="bi-meta">{meta}</p>}</div>
          </li>;
        })}</ul>
      </section>;

    case 'linkList':
      return <section className="bi-block">
        {block.heading && <Heading heading={block.heading}/>}
        <ul className="bi-ruled-list">{block.items.map(item => <li key={item.href}><a className="bi-list-title" href={item.href}>{item.label}</a>{item.description && <p>{item.description}</p>}</li>)}</ul>
      </section>;

    case 'relatedContent':
      return <section className="bi-block">
        {block.heading && <Heading heading={block.heading}/>}
        <ul className="bi-related">{block.items.map((item, i) => <li key={`${item.href}-${i}`}><article>
          {item.image && <Figure image={item.image}/>}
          {item.type && <Label>{item.type}</Label>}
          <h3><a href={item.href}>{item.title}</a></h3>
          {item.summary && <p>{item.summary}</p>}
        </article></li>)}</ul>
      </section>;

    case 'accordion':
      return <section className="bi-block">
        {block.heading && <Heading heading={block.heading}/>}
        <div className="bi-accordion">{block.items.map((item, i) => <details key={`${item.title}-${i}`}>
          <summary>{item.title}</summary>
          <div>
            <p>{item.body}</p>
            {item.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
            {item.links && <ul>{item.links.map(link => <li key={link.href}><TextLink link={link}/></li>)}</ul>}
          </div>
        </details>)}</div>
      </section>;

    case 'imageGallery':
      return <section className="bi-block">
        {block.heading && <Heading heading={block.heading}/>}
        {block.intro && <p className="bi-lead">{block.intro}</p>}
        <div className={`bi-gallery bi-gallery-count-${Math.min(block.images.length, 6)}`}>{block.images.map((image, i) => <Figure key={`${image.src}-${i}`} image={image}/>)}</div>
      </section>;

    case 'logoGrid':
      return <section className="bi-block" aria-label={block.heading ? undefined : block.label}>
        {block.heading ? <Heading heading={block.heading}/> : <Label>{block.label}</Label>}
        <ul className="bi-logos">{block.logos.map(logo => <li key={logo.src}><img src={logo.src} alt={logo.alt} loading="lazy"/></li>)}</ul>
      </section>;

    case 'timeline':
      return <Timeline block={block} className="bi-timeline" headingClassName="bi-heading" eyebrowClassName="bi-label" linkClassName="bi-text-link"/>;

    case 'donationAppeal':
      return <section className="bi-appeal">
        {block.eyebrow && <Label>{block.eyebrow}</Label>}
        <h2>{block.heading}</h2>
        <p>{block.body}</p>
        {block.impact && <p className="bi-appeal-impact">{block.impact}</p>}
        <div className="bi-actions"><Button link={block.primaryLink} variant="white"/>{block.secondaryLink && <TextLink link={block.secondaryLink}/>}</div>
      </section>;

    case 'newsletterSignup': {
      const id = `bi-signup-${slugify(block.heading)}`;
      const fallback = !block.action && block.fallbackLink;
      return <section className="bi-form-section bi-tint-jade" aria-labelledby={id}>
        <div>
          {block.eyebrow && <Label>{block.eyebrow}</Label>}
          <Heading id={id} heading={block.heading}/>
          {block.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {block.privacy && <p className="bi-small">{block.privacy.text} <a href={block.privacy.link.href}>{block.privacy.link.label}</a></p>}
        </div>
        <form className="bi-form" action={block.action} method={block.action ? 'post' : undefined}>
          <fieldset disabled={Boolean(fallback)}>
            {fallback ? <p className="bi-small">Use the live form to subscribe.</p> : block.instructions && <p className="bi-small">{block.instructions} Fields marked * are required.</p>}
            {block.fields.map(field => <div className="bi-field" key={field.name}>
              <label htmlFor={`${id}-${field.name}`}>{field.label}{field.required && <span aria-hidden="true"> *</span>}</label>
              <input id={`${id}-${field.name}`} name={field.name} type={field.type} required={field.required} autoComplete={field.autoComplete}/>
            </div>)}
          </fieldset>
          {fallback ? <Button link={fallback}/> : <button className="bi-button bi-button-navy" type={block.action ? 'submit' : 'button'}>{block.submitLabel}</button>}
        </form>
      </section>;
    }

    case 'enquiryForm': {
      const id = `bi-form-${slugify(block.heading)}`;
      const fallback = !block.action && block.fallbackLink;
      return <section className="bi-block" aria-labelledby={id}>
        {block.eyebrow && <Label>{block.eyebrow}</Label>}
        <Heading id={id} heading={block.heading}/>
        {block.intro && <p className="bi-lead">{block.intro}</p>}
        <form className="bi-form bi-form-panel bi-tint-blue" action={block.action} method={block.action ? 'post' : undefined}>
          <fieldset disabled={Boolean(fallback)}>
            {block.fields.map((field, i) => {
              const fieldId = `${id}-${field.name}`;
              const hintId = `${fieldId}-hint`;
              const described = field.hint ? hintId : undefined;
              if (field.type === 'checkbox') return <div className="bi-field bi-field-check" key={`${field.name}-${i}`}><input id={fieldId} name={field.name} type="checkbox" required={field.required} aria-describedby={described}/><label htmlFor={fieldId}>{field.label}{field.required && <span aria-hidden="true"> *</span>}</label>{field.hint && <small id={hintId}>{field.hint}</small>}</div>;
              return <div className="bi-field" key={`${field.name}-${i}`}>
                <label htmlFor={fieldId}>{field.label}{field.required && <span aria-hidden="true"> *</span>}</label>
                {field.type === 'textarea' ? <textarea id={fieldId} name={field.name} required={field.required} aria-describedby={described} rows={5}/>
                  : field.type === 'select' ? <select id={fieldId} name={field.name} required={field.required} aria-describedby={described}><option value="">Please select</option>{field.options?.map(option => <option key={option} value={option}>{option}</option>)}</select>
                  : <input id={fieldId} name={field.name} type={field.type} required={field.required} aria-describedby={described}/>}
                {field.hint && <small id={hintId}>{field.hint}</small>}
              </div>;
            })}
          </fieldset>
          {block.privacy && <p className="bi-small"><a href={block.privacy.href}>{block.privacy.label}</a></p>}
          {fallback ? <Button link={fallback}/> : <button className="bi-button bi-button-navy" type={block.action ? 'submit' : 'button'}>{block.submitLabel}</button>}
        </form>
      </section>;
    }
  }
}
