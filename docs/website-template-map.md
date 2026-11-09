# Website audit template map

This maps the source template labels in `website-migration-inventory.csv` to reusable local templates and content block patterns. The goal is to reproduce the audited site snapshot first. Content recommendations in the audit (`keep`, `rewrite`, `merge`, `remove`) are recorded for the later review phase and do not gate initial replication.

The source crawl ran on 17 October 2026. It records 621 URLs: 581 returned HTTP 200 and 40 returned 404. Two of the successful `No template recorded` entries are image files, so they are assets rather than pages. The remaining records should be reproduced at their source routes unless the route is a redirect/alias; the 404 records should be retained in the inventory for reference but do not need page templates.

## Source templates to local templates

| Audit source template | Records | Local template to build | Content blocks and data needed |
|---|---:|---|---|
| Homepage template | 3 | `HomePageTemplate` for `/`; keep other records at their own routes and map their actual page purpose rather than forcing homepage layout | Hero, pathways/card grid, statement/impact, news or story cards, image-and-text, newsletter, logo grid, footer actions. The existing homepage already uses reusable blocks. |
| Full-width page template | 83 | `StandardPageTemplate` with a full-width layout option | Page title/intro plus ordered rich text, image-and-text, card grid, quote, callout, process, eligibility, schedule, contact, downloads or related links as present in source. |
| Default page template | 33 | `StandardPageTemplate` with the default/narrow layout option where the source uses it | Same composable body blocks as full-width pages. Keep a layout variant only where comparison with source pages confirms a real layout difference. |
| News or blog post template | 370 | `ArticlePageTemplate` | Article title, date, category, author/byline, lead image and alt text, ordered long-form body blocks, inline images/captions, quotes, downloads, related articles and onward CTA. Includes one `other` record using this template. |
| Archive listing | 27 | `ListingPageTemplate` with a category/archive variant | Listing title/intro, article cards, category/date metadata, optional search/filter, pagination, empty state and links to article routes. |
| Blog listing | 1 | `ListingPageTemplate` with a blog variant | Same shared listing structure, with blog-specific taxonomy and cards. |
| Events listing | 1 | `ListingPageTemplate` with an events variant | Event cards with date/time, location, image and booking link; add date/category filtering and pagination if the source provides it. |
| Event template | 23 | `EventPageTemplate` | Event title, date/time, venue, booking status/link, image, description, accessibility/attendance details, organiser/contact and related events. |
| Resources listing | 1 | `ListingPageTemplate` with a resources variant | Resource cards with type, summary, topic, publication date and accessible download link. |
| Resource template | 37 | `ResourcePageTemplate` | Resource title/intro, publication details, summary/body, report or download list, file format/size where known, related resources and topic links. |
| No template recorded | 42 | No common page template | 40 records are 404s; two HTTP 200 records are standalone image assets. Preserve useful media locally if referenced by replicated pages. |

The template labels count source records, not distinct page designs. Full-width and default pages should share the same content model and renderer; layout options should be driven by evidence from the source. Listing variants should reuse one listing implementation where their structure permits it.

## Reusable implementation

The reusable page templates are implemented in `components/`: standard pages support default and full-width layouts; article, event, resource, and listing pages have focused templates; the root homepage keeps its dedicated composition. Listing pages share search, category filtering, pagination and an empty state. Pages can set `route` to preserve nested or date-based paths.

The renderer includes the inventory's content patterns: image galleries, impact statistics, steps, eligibility/information panels, contact routes, schedules, downloadable resources, accordions, donation appeals, related content, structured long-form text and enquiry forms, alongside hero, cards, news, quotes, rich text, calls to action, logo grids and newsletter signup.

The TypeScript content contract and JSON Schema describe the page and block variants. Forms use structured, labelled fields. Add the real form provider/action to the content data when a source form is migrated; no new submission service is introduced here.

## Replication workflow

1. Use the CSV as the route backlog. Replicate successful source URLs across all content types, not only pages in the menus. Keep redirects/aliases and the source route recorded so local links resolve correctly.
2. Scrape each successful HTML page for its full title, copy, heading order, links, images, alt text/captions, metadata, and section order. The audit export itself is an inventory: it contains titles, summaries, word counts, links/files/forms references and template labels, but not the full page body.
3. Implement and visually check one representative of each local template against its live source page.
4. Populate the matching JSON records with the scraped page content and ordered reusable blocks. Preserve route paths, including date-based article paths, through the route configuration.
5. Repeat across the remaining records, then audit completeness, accessibility, broken links and visual differences in a later pass.

## Build order

1. Standard page template variants (covers the largest set of the site's ordinary pages).
2. Article detail template (370 records).
3. Listing template and its archive/blog/events/resources variants.
4. Event detail and resource detail templates.
5. Review the three records labelled as homepage templates individually; only the root URL should be assumed to use the actual homepage composition.

