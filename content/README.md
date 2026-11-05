# Toynbee Hall content model

The site keeps copy and page data separate from rendering so the content store can later be replaced by a CMS API without redesigning the components.

- `pages/*.json` contains one record per route. Each record has a stable `slug`, `title`, `intro`, and ordered `blocks` array.
- `homepage.json` contains the homepage section copy and its cards/news items.
- `navigation.json` contains navigation labels, URLs, and dropdown children.
- `site.json` contains shared brand, metadata, header/footer copy, and reusable links.
- `routes.json` lists routes that still use the shared generic page content.
- `types.ts` defines the page and block contract; `components/ContentBlockRenderer.tsx` renders the supported blocks.

Page records use structured block objects rather than markup. Current blocks are `richText`, `linkList`, `quote`, and `callout`; add a block type to the content contract and renderer when a CMS component is introduced. Keep URLs and labels in data, and keep layout and styling in `components/`.

`schemas/page.schema.json` describes the page record and block variants for a CMS integration. Image URLs, navigation links, calls to action, and page copy live in content records; CSS classes and layout stay in the presentation layer.
