# Toynbee Hall content model

The site keeps copy and page data separate from rendering so the content store can later be replaced by a CMS API without redesigning the components.

- `pages/*.json` contains one record per route. Records have a unique `slug`, title, optional source `route`, and ordered blocks. Page records may use the standard, article, event, resource, or listing template shape. `scripts/generate-content-index.mjs` registers each JSON record before development, build, and start.
- `homepage.json` contains the homepage as an ordered `blocks` array, using the same block types as standard pages.
- `navigation.json` contains navigation labels, URLs, and dropdown children.
- `site.json` contains shared brand, metadata, header/footer copy, and reusable links.
- `routes.json` lists routes that still use the shared generic page content.
- `types.ts` defines the page and block contract; `components/ContentPageTemplate.tsx` dispatches to reusable templates and `components/ContentBlockRenderer.tsx` renders the supported blocks.

Page records use structured block objects rather than markup. Supported blocks include rich text and long-form content, media and galleries, card grids, news listings, impact statistics, steps, information panels, contact routes, schedules, resources, accordions, donation appeals, and related content (see `docs/content-block-inventory.md`). Keep URLs and labels in data, and keep layout and styling in reusable components.

`schemas/page.schema.json` describes the page template variants and block shapes for a CMS integration. Image URLs, navigation links, calls to action, and page copy live in content records; CSS classes and layout stay in the presentation layer. A page may set `route` to preserve its canonical nested or date-based source URL and `aliases` for alternate paths; static route generation and lookup use both.
