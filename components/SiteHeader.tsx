import navigation from '../content/navigation.json';
import site from '../content/site.json';

export default function SiteHeader() {
  return <><div className="topline"><div className="wrap top-inner"><a href="#main">{site.shared.skipLink}</a><span>{site.strapline}</span><a href="/donate/">{site.donateLabel}</a></div></div><header className="header wrap"><a className="brand" href="/" aria-label={`${site.name} home`}><img className="brand-logo" src="/brand/toynbee-hall-core-logo.png" alt="Toynbee Hall"/></a><nav className="navigation" aria-label="Main navigation">{navigation.map(group=><div className="navgroup" key={group.title}><a href={group.href}>{group.title}</a><div className="dropdown">{group.links.map(link=><a href={link.href} key={link.href}>{link.label}</a>)}</div></div>)}</nav><button className="search" aria-label={site.shared.searchLabel}>⌕</button><button className="mobile-menu" aria-label={site.shared.menuLabel}>☰</button></header></>;
}
