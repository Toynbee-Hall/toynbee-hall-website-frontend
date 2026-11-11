# Toynbee Hall website development

## Before changing the site
- Read `docs/website-style-guide.md`, `content/design-tokens.json`, and `docs/content-block-inventory.md`.
- Treat `/style-guide/` as the visual reference for the current design system and `/content-block-inventory/` as the catalogue of approved content patterns.
- Inspect the existing page templates, content files, components, and block implementation before adding or changing UI. In particular, check `content/types.ts`, `content/schemas/page.schema.json`, `components/ContentBlockRenderer.tsx`, and the relevant page template.
- Reuse the shared header, footer, content templates, and section components.

## Building and copying pages
- For the site replication phase, reproduce successful source URLs using the source template labels and reusable local templates. Treat audit recommendations such as keep, rewrite, merge, and remove as a later review phase; they do not gate the initial replication.
- Keep page content in the JSON files under `content/` wherever practical. Use `content/pages/<slug>.json` for standard pages and `content/homepage.json` for the homepage; follow the existing data structure.
- Add each page as a JSON file under `content/pages/`; the content index generator registers it during `dev`, `build`, and `start`. Give every record a unique `slug`, set `route` to the canonical source URL, and use `aliases` for retained alternate local paths.
- Build each page as an ordered composition of reusable content blocks from `docs/content-block-inventory.md`. Use the inventory to choose patterns that match the source content and page purpose.
- When asked to copy or recreate a page from the live Toynbee Hall website, preserve its meaningful wording, hierarchy, links, calls to action, image choices, captions, credits, and accessibility text. Put the page content in the appropriate JSON data file and render it through the shared page template and content block renderer.
- Do not add one-off page markup or invent JSON fields that the renderer does not support. The inventory is the design catalogue; the implemented block types in `content/types.ts`, `content/schemas/page.schema.json`, and `components/ContentBlockRenderer.tsx` define what page JSON can currently render.
- If a needed inventory pattern is not implemented yet, add it as a reusable block: update the TypeScript content types, JSON schema, renderer, and styles in `app/styles.css`, then use it in page data. Keep the inventory documentation in sync when the available block patterns change.

## Design system
- Use the established Outfit typography, palette, spacing, and responsive patterns. Use only Outfit weights 300, 400, and 500; do not use 600/700 or heavy bold styling.
- Use the deep-slate text color (`#1F2933`, from the design tokens) for interface and supporting copy, including text on orange and jade surfaces. Do not use black for interface text. White text on orange or jade is reserved for large headlines as specified in the style guide.
- Use CSS variables from `app/styles.css`; do not introduce unrelated colors, typefaces, or spacing values.
- Follow the contrast, visible keyboard focus, image alt-text, and minimum 44px touch-target guidance in the style guide.
- Use the approved orange badge at `public/brand/toynbee-hall-orange-badge.png` without editing its proportions or colors.

## When adding a component
- First check whether an existing component can support the pattern.
- Make reusable patterns configurable with props or structured content data.
- When adding a page template, update the page type union, JSON schema, `components/ContentPageTemplate.tsx` dispatcher, route generation, and the focused template component together.
- Add component styles to `app/styles.css` and use the existing design tokens.
- Keep layouts responsive and keyboard accessible.

## Git and finishing work

- Summarize the files changed and any relevant design or implementation decisions.
- Run checks only when the user asks for verification, and report the results.
