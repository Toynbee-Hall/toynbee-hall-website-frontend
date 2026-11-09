'use client';

import { useMemo, useState } from 'react';
import type { ListingPageContent } from '../content/types';
import { displayExcerpt } from '../content/excerpts';

export default function ListingResults({ data }: { data: ListingPageContent }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = Math.max(1, data.pageSize ?? 9);
  const categories = data.categories?.length ? data.categories : Array.from(new Set(data.items.map(x => x.category).filter((x): x is string => Boolean(x))));
  const filtered = useMemo(() => data.items.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    const haystack = `${item.title} ${item.summary ?? ''} ${item.category ?? ''}`.toLocaleLowerCase();
    return matchesCategory && haystack.includes(query.trim().toLocaleLowerCase());
  }), [data.items, category, query]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const heading = data.listingType === 'events' ? 'Events' : data.listingType === 'resources' ? 'Resources' : 'Stories';

  function changeQuery(value: string) { setQuery(value); setPage(1); }
  function changeCategory(value: string) { setCategory(value); setPage(1); }

  return <div className="listing-results">
    <div className="listing-controls">
      <div className="listing-search"><label htmlFor="listing-search">Search {heading.toLocaleLowerCase()}</label><input id="listing-search" type="search" value={query} onChange={event => changeQuery(event.target.value)} placeholder={`Search ${heading.toLocaleLowerCase()}`}/></div>
      {categories.length > 0 && <div className="listing-category"><label htmlFor="listing-category">Filter by category</label><select id="listing-category" value={category} onChange={event => changeCategory(event.target.value)}><option value="all">All categories</option>{categories.map(value => <option key={value} value={value}>{value}</option>)}</select></div>}
    </div>
    <p className="listing-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'result' : 'results'}</p>
    {visibleItems.length ? <ul className="listing-grid">{visibleItems.map((item, i) => <li key={`${item.href}-${i}`}><article className="listing-card">
      {item.image && <a className="listing-card-image" href={item.href}><img src={item.image.src} alt={item.image.alt} loading="lazy"/></a>}
      <div className="listing-card-copy">{(item.category || item.date) && <p className="eyebrow">{[item.category, item.date].filter(Boolean).join(' · ')}</p>}<h2><a href={item.href}>{item.title}</a></h2>{item.author && <p className="listing-byline">By {item.author}</p>}{item.summary && <p>{displayExcerpt(item.summary)}</p>}{item.location && <p className="listing-location">{item.location}</p>}{item.format && <p className="listing-location">{item.format}</p>}<a className="text-link" href={item.href}>{data.listingType === 'events' ? 'View event' : data.listingType === 'resources' ? 'View resource' : 'Read more'} <b aria-hidden="true">↗</b></a></div>
    </article></li>)}</ul> : <p className="listing-empty">No results match your search. Try a different word or category.</p>}
    {pageCount > 1 && <nav className="pagination" aria-label="Listing pages"><button type="button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button><span>Page {currentPage} of {pageCount}</span><button type="button" onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={currentPage === pageCount}>Next</button></nav>}
  </div>;
}
