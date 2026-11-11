import site from '../content/site.json';
import { logo } from '../content/design-tokens.json';

export default function SiteFooter() {
  const footer = site.footer;
  return <footer><div className="wrap footer-main"><div className="footer-brand"><a className="brand brand-footer" href="/" aria-label={`${site.name} home`}><img className="brand-logo" src={logo.approvedAsset} width={logo.width} height={logo.height} alt=""/></a><p>{footer.summary}</p><p>{footer.address[0]}<br/>{footer.address[1]}</p></div><div><h4>{footer.helpHeading}</h4>{footer.helpLinks.map(link=><a href={link.href} key={link.href}>{link.label}</a>)}</div><div><h4>{footer.connectHeading}</h4>{footer.connectLinks.map(link=><a href={link.href} key={link.href}>{link.label}</a>)}</div><div className="footer-cta"><h4>{footer.calloutHeading}</h4><p>{footer.calloutBody}</p><a className="button button-light" href={footer.calloutLink.href}>{footer.calloutLink.label} <span>↗</span></a></div></div><div className="wrap footer-bottom"><span>{footer.charityNumber}</span><span>{footer.legalLinks.map(link=><a href={link.href} key={link.href}>{link.label}</a>)}<a href="/style-guide/">Website style guide</a><a href="/content-block-inventory/">Content block inventory</a></span><span>{footer.copyright}</span></div></footer>;
}
