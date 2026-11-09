import type { Metadata } from 'next';
import SiteHeader from '../../components/SiteHeader';
import advice from '../../content/pages/free-advice.json';
import site from '../../content/site.json';

export const metadata: Metadata = {
  title: 'Banner design options | Toynbee Hall',
  robots: { index: false, follow: false },
};

const options = [
  { id: 'watermark', title: 'Orange with a watermark', description: 'A cropped, tone-on-tone mark adds texture to the orange panel. A straight photo edge keeps the layout simple.' },
  { id: 'photo', title: 'Full-width photograph', description: 'The photograph fills the banner, with a shaded area for white copy and a band of brand orange along the base.' },
  { id: 'frame', title: 'Framed photograph', description: 'An inset photo overlaps an orange text panel. A faded, oversized logo mark sits on the pale backdrop.' },
];

export default function BannerOptionsPage() {
  return <>
    <SiteHeader/>
    <main id="main" className="banner-options wrap">
      <header className="banner-options-intro">
        <p className="eyebrow">Design preview</p>
        <h1>Page banner options</h1>
        <p>Three ways to frame the same page. See the designs in use on <a href="/">the homepage</a> and <a href="/free-advice/">Help and Advice</a>.</p>
        <nav aria-label="Jump to a banner option">
          {options.map((option, i) => <a key={option.id} href={`#${option.id}`}>{i + 1}. {option.title}</a>)}
        </nav>
      </header>
      {options.map((option, i) => <section className="banner-option" id={option.id} key={option.id} aria-labelledby={`${option.id}-label`}>
        <h2 id={`${option.id}-label`}>{i + 1}. {option.title}</h2>
        <p>{option.description}</p>
        <div className={`banner-layout banner-layout-${option.id}`}>
          <div className="banner-layout-copy">
            <p className="banner-layout-label">{site.shared.pageEyebrow}</p>
            <h3>{advice.title}</h3>
            <p>{advice.intro}</p>
          </div>
          <figure className="banner-layout-media">
            <img src={advice.image.src} alt={advice.image.alt}/>
          </figure>
        </div>
      </section>)}
    </main>
  </>;
}
