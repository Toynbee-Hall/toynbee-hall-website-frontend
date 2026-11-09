import type { EventPageContent } from '../content/types';
import { displayExcerpt } from '../content/excerpts';
import ContentBlockRenderer from './ContentBlockRenderer';

export default function EventPageTemplate({ data }: { data: EventPageContent }) {
  const date = data.dateLabel || [data.startsAt, data.endsAt].filter(Boolean).join(' – ');
  const intro = displayExcerpt(data.intro, true);
  const hasDetails = date || data.timeLabel || data.venue || data.bookingStatus || data.bookingLink;
  return <main id="main" className="event-page"><header className="event-header"><div className="wrap event-header-inner"><div className="event-heading"><p className="eyebrow">Event</p><h1>{data.title}</h1>{intro && <p>{intro}</p>}</div>{data.image && <figure className="event-image"><img src={data.image.src} alt={data.image.alt}/>{(data.image.caption || data.image.credit) && <figcaption>{data.image.caption}{data.image.credit && <span>{data.image.caption ? ' · ' : ''}{data.image.credit}</span>}</figcaption>}</figure>}</div></header>
    <div className="event-layout wrap">
      <article className="page-article">{data.blocks.map((block, i) => <ContentBlockRenderer block={block} key={`${block.type}-${i}`}/>)}</article>
      {hasDetails && <aside className="event-facts" aria-label="Event details"><h2>Event details</h2>{date && <p><span>Date</span>{data.startsAt ? <time dateTime={data.startsAt}>{date}</time> : date}</p>}{data.timeLabel && <p><span>Time</span>{data.timeLabel}</p>}{data.venue && <p><span>Venue</span>{data.venue}</p>}{data.bookingStatus && <p><span>Booking</span>{data.bookingStatus}</p>}{data.bookingLink && <a className="button" href={data.bookingLink.href}>{data.bookingLink.label}<span aria-hidden="true">↗</span></a>}</aside>}
    </div>
  </main>;
}
