'use client';

import { useState } from 'react';
import navigation from '../content/navigation.json';
import site from '../content/site.json';
import { logo } from '../content/design-tokens.json';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return <>
    <a className="skip-link" href="#main">{site.shared.skipLink}</a>
    <header className="header wrap">
      <a className="brand" href="/" aria-label={`${site.name} home`}>
        <img className="brand-logo" src={logo.approvedAsset} width={logo.width} height={logo.height} alt=""/>
      </a>
      <div className="header-links">
        <div className="header-controls">
          <nav className="header-shortcuts" aria-label="Quick links">
            {site.headerLinks.map(link => <a className={link.primary ? 'button' : undefined} href={link.href} key={link.href}>{link.label}</a>)}
          </nav>
          <button type="button" className="search" aria-label={site.shared.searchLabel}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>
            </svg>
          </button>
          <button type="button" className="mobile-menu" aria-label={site.shared.menuLabel} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
        <nav id="main-navigation" className={menuOpen ? 'navigation navigation-open' : 'navigation'} aria-label="Main navigation">
          {navigation.map(group => <div className="navgroup" key={group.title}>
            <a href={group.href}>{group.title}{group.links.length > 0 && <span className="nav-chevron" aria-hidden="true"/>}</a>
            {group.links.length > 0 && <div className="dropdown">{group.links.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</div>}
          </div>)}
        </nav>
      </div>
    </header>
  </>;
}
