import site from '../content/site.json';

export default function SiteFooter() {
  const footer = site.footer;
  return <footer><div className="wrap footer-main"><div className="footer-brand"><a className="brand brand-footer" href="/" aria-label={`${site.name} home`}><span className="brand-mark">T</span><span>{site.logoLines[0]}<br/>{site.logoLines[1]}</span></a><p>{footer.summary}</p><p>{footer.address[0]}<br/>{footer.address[1]}</p></div><div><h4>{footer.helpHeading}</h4>{footer.helpLinks.map(link=><a href={link.href} key={link.href}>{link.label}</a>)}</div><div><h4>{footer.connectHeading}</h4>{footer.connectLinks.map(link=><a href={link.href} key={link.href}>{link.label}</a>)}</div><div className="footer-cta"><h4>{footer.calloutHeading}</h4><p>{footer.calloutBody}</p><a className="button button-light" href={footer.calloutLink.href}>{footer.calloutLink.label} <span>↗</span></a></div></div><div className="wrap footer-bottom"><span>{footer.charityNumber}</span><span>{footer.legalLinks.map(link=><a href={link.href} key={link.href}>{link.label}</a>)}</span><span>{footer.copyright}</span></div></footer>;
}
