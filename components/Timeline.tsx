'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { TimelineBlock } from '../content/types';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

type Props = {
  block: TimelineBlock;
  /** Class names from the calling renderer, so the timeline picks up that renderer's heading, label and link styles */
  className?: string;
  headingClassName?: string;
  eyebrowClassName?: string;
  linkClassName?: string;
};

/*
 * A horizontal timeline of milestones. People can swipe or scroll the cards, choose a year,
 * use the previous and next buttons, or use the arrow, Home and End keys on the card rail.
 * Without JavaScript it is still a scrollable list of every milestone.
 */
export default function Timeline({ block, className = '', headingClassName = '', eyebrowClassName = '', linkClassName = '' }: Props) {
  const baseId = block.id ?? `timeline-${slugify(block.heading)}`;
  const headingId = `${baseId}-heading`;
  const count = block.items.length;
  /* One year button per distinct date, pointing to that date's first milestone, so long timelines with repeated years stay short */
  const dates = block.items.reduce<{ date: string; first: number }[]>((list, item, i) => list.some(entry => entry.date === item.date) ? list : [...list, { date: item.date, first: i }], []);
  const [current, setCurrent] = useState(0);
  const currentDate = dates.findIndex(entry => entry.date === block.items[current]?.date);
  const track = useRef<HTMLOListElement>(null);
  const years = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);
  const settle = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cards = () => Array.from(track.current?.children ?? []) as HTMLElement[];
  const offsetOf = (index: number) => {
    const all = cards();
    return all[index] && all[0] ? all[index].offsetLeft - all[0].offsetLeft : 0;
  };

  const goTo = useCallback((index: number) => {
    const rail = track.current;
    if (!rail || index < 0 || index >= count) return;
    const left = offsetOf(index);
    navigating.current = Math.abs(rail.scrollLeft - left) > 1;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
    setCurrent(index);
  }, [count]);

  /* Keep the chosen year visible in the year rail without scrolling the page */
  useEffect(() => {
    const rail = years.current;
    const button = rail?.children[currentDate] as HTMLElement | undefined;
    if (!rail || !button) return;
    const start = button.offsetLeft - rail.offsetLeft;
    if (start < rail.scrollLeft || start + button.offsetWidth > rail.scrollLeft + rail.clientWidth) {
      rail.scrollTo({ left: start - (rail.clientWidth - button.offsetWidth) / 2 });
    }
  }, [currentDate]);

  /* Follow the card nearest the start of the rail when someone swipes or scrolls */
  const syncToScroll = useCallback(() => {
    const rail = track.current;
    if (!rail) return;
    let closest = 0;
    cards().forEach((_, i) => { if (Math.abs(rail.scrollLeft - offsetOf(i)) < Math.abs(rail.scrollLeft - offsetOf(closest))) closest = i; });
    setCurrent(closest);
  }, []);

  const onScroll = () => {
    if (!navigating.current) syncToScroll();
    clearTimeout(settle.current);
    settle.current = setTimeout(() => { navigating.current = false; syncToScroll(); }, 140);
  };

  useEffect(() => () => clearTimeout(settle.current), []);

  const onKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    const destinations: Record<string, number> = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: count - 1 };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    goTo(destinations[event.key]);
  };

  return <section className={`timeline ${className}`} id={block.id} aria-labelledby={headingId}>
    <div className="timeline-head">
      <div>
        {block.eyebrow && <p className={eyebrowClassName}>{block.eyebrow}</p>}
        <h2 className={headingClassName} id={headingId}>{block.heading}</h2>
        {block.intro && <p className="timeline-intro">{block.intro}</p>}
      </div>
      <div className="timeline-controls">
        <button type="button" aria-label="Previous milestone" aria-controls={`${baseId}-track`} disabled={current === 0} onClick={() => goTo(current - 1)}><span aria-hidden="true">←</span></button>
        <button type="button" aria-label="Next milestone" aria-controls={`${baseId}-track`} disabled={current === count - 1} onClick={() => goTo(current + 1)}><span aria-hidden="true">→</span></button>
      </div>
    </div>

    <div className="timeline-years" ref={years} role="group" aria-label="Choose a year">
      {dates.map(({ date, first }) => <button type="button" key={date} aria-pressed={block.items[current]?.date === date} aria-controls={`${baseId}-track`} onClick={() => goTo(first)}>{date}</button>)}
    </div>

    <ol className="timeline-track" id={`${baseId}-track`} ref={track} tabIndex={0} aria-label={`${block.heading}: use the arrow keys to move between milestones`} onScroll={onScroll} onKeyDown={onKeyDown}>
      {block.items.map((item, i) => <li key={`${item.date}-${i}`} className={i === current ? 'is-current' : undefined} aria-current={i === current ? 'step' : undefined}>
        <article>
          {item.image && <figure className="timeline-media"><img src={item.image.src} alt={item.image.alt} loading="lazy"/>{(item.image.caption || item.image.credit) && <figcaption>{item.image.caption}{item.image.caption && item.image.credit && ' · '}{item.image.credit}</figcaption>}</figure>}
          <div className="timeline-copy">
            <p className="timeline-date">{item.dateTime ? <time dateTime={item.dateTime}>{item.date}</time> : item.date}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        </article>
      </li>)}
    </ol>

    <div className="timeline-foot">
      <p role="status" aria-atomic="true">{current + 1} of {count}</p>
      {block.link && <a className={linkClassName} href={block.link.href}>{block.link.label}</a>}
    </div>
  </section>;
}
