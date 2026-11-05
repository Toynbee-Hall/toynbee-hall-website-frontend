import home from '../content/homepage.json';

export function HomeHero() {
  const data = home.hero;
  return (
    <section className="hero">
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${data.image})` }}
      />
      <div className="hero-copy">
        <p className="eyebrow">{data.eyebrow}</p>
        <h1>{data.title[0]}<br/><em>{data.title[1]}</em></h1>
        <p>{data.body}</p>
        <a className="button" href={data.cta.href}>{data.cta.label} <span>↓</span></a>
      </div>
      <div className="hero-note">{data.note}</div>
    </section>
  );
}

export function ServiceGrid() {
  return (
    <section className="intro wrap" id="help">
      <div>
        <p className="eyebrow">{home.servicesHeading.eyebrow}</p>
        <h2>{home.servicesHeading.title}</h2>
      </div>
      <div className="card-grid">
        {home.services.map((card, index) => (
          <a className="service-card" style={{ backgroundColor: card.color }} href={card.href} key={card.title}>
            <span className="card-number">0{index + 1}</span>
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
            <span className="text-link">{card.link} <b>↗</b></span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function MissionSection() {
  const data = home.mission;
  return (
    <section className="statement">
      <div className="wrap statement-inner">
        <p className="eyebrow">{data.eyebrow}</p>
        <h2>{data.title}</h2>
        <p>{data.body}</p>
        <a className="button button-light" href={data.cta.href}>{data.cta.label} <span>↗</span></a>
      </div>
    </section>
  );
}

export function NewsSection() {
  const data = home.news;
  return (
    <section className="news wrap">
      <div className="section-heading">
        <div><p className="eyebrow">{data.eyebrow}</p><h2>{data.title}</h2></div>
        <a className="text-link" href={data.allLink.href}>{data.allLink.label} <b>↗</b></a>
      </div>
      <div className="news-grid">
        {data.items.map((item, index) => (
          <article className={index === 0 ? 'news-feature' : 'news-small'} key={item.title}>
            <div className="news-photo" style={{ backgroundImage: `url(${item.image})` }} />
            <div className={index === 0 ? '' : 'news-copy'}>
              <p className="eyebrow">{item.category}</p>
              <h3>{item.title}</h3>
              {index === 0 && <p>{item.summary}</p>}
              <a className="text-link" href={item.href}>{data.readLabel} <b>↗</b></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function VenueSection() {
  const data = home.venue;
  return (
    <section className="venue">
      <div className="venue-image" style={{ backgroundImage: `url(${data.image})` }} />
      <div className="venue-copy">
        <p className="eyebrow">{data.eyebrow}</p>
        <h2>{data.title}</h2>
        <p>{data.body}</p>
        <a className="button" href={data.cta.href}>{data.cta.label} <span>↗</span></a>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  const data = home.newsletter;
  return (
    <section className="newsletter">
      <div className="wrap newsletter-inner">
        <div>
          <p className="eyebrow">{data.eyebrow}</p>
          <h2>{data.title[0]}<br/>{data.title[1]}</h2>
          <p>{data.body}</p>
        </div>
        <form>
          <label htmlFor="email">{data.emailLabel}</label>
          <div className="email-row">
            <input id="email" type="email" placeholder={data.placeholder}/>
            <button type="button">{data.button} <span>↗</span></button>
          </div>
          <small>{data.finePrint}</small>
        </form>
      </div>
    </section>
  );
}
