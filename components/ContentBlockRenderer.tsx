import type { ContentBlock } from '../content/types';

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
  }
}
