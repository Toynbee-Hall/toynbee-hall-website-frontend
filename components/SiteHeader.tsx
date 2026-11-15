'use client';

import { useEffect, useState } from 'react';
import navigation from '../content/navigation.json';
import site from '../content/site.json';
import { logo } from '../content/design-tokens.json';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/*
 * Shared site header. On desktop each section opens its links on hover or keyboard focus.
 * On smaller screens the menu button opens a panel where each section expands on its own,
 * and the secondary quick links move into the panel.
 */
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const primaryLinks = site.headerLinks.filter(link => link.primary);
  const secondaryLinks = site.headerLinks.filter(link => !link.primary);

  /* Escape closes the menu panel */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return <>
    <a className="skip-link" href="#main">{site.shared.skipLink}</a>
    <header className="header wrap">
      <a className="brand" href="/" aria-label={`${site.name} home`}>
        <img className="brand-logo" src={logo.approvedAsset} width={logo.width} height={logo.height} alt=""/>
      </a>
      <div className="header-links">
        <div className="header-controls">
          <nav className="header-shortcuts" aria-label="Quick links">
            {secondaryLinks.map(link => <a className="header-shortcut" href={link.href} key={link.href}>{link.label}</a>)}
            {primaryLinks.map(link => <a className="header-donate" href={link.href} key={link.href}>{link.label}</a>)}
          </nav>
          <button type="button" className="search" aria-label={site.shared.searchLabel}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>
            </svg>
          </button>
          <button type="button" className="mobile-menu" aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6 6 18"/> : <path d="M4 7h16M4 12h16M4 17h16"/>}
            </svg>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
        <nav id="main-navigation" className={menuOpen ? 'navigation navigation-open' : 'navigation'} aria-label="Main navigation">
          {navigation.map(group => {
            const panelId = `nav-${slugify(group.title)}`;
            const expanded = openGroup === group.title;
            return <div className={`navgroup${expanded ? ' navgroup-open' : ''}`} key={group.title}>
              <div className="navgroup-head">
                <a href={group.href}>{group.title}{group.links.length > 0 && <span className="nav-chevron" aria-hidden="true"/>}</a>
                {group.links.length > 0 && <button type="button" className="navgroup-toggle" aria-expanded={expanded} aria-controls={panelId} aria-label={`${group.title} pages`} onClick={() => setOpenGroup(expanded ? null : group.title)}>
                  <span className="nav-chevron" aria-hidden="true"/>
                </button>}
              </div>
              {group.links.length > 0 && <div className="dropdown" id={panelId}>{group.links.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</div>}
            </div>;
          })}
          <div className="navigation-extras">{secondaryLinks.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</div>
        </nav>
      </div>
    </header>
  </>;
}
