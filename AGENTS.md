# Toynbee Hall website development

## Before changing the site
- Read `docs/website-style-guide.md` and `content/design-tokens.json`.
- Inspect existing components and page templates before adding UI.
- Reuse the shared header, footer, content templates, and section components.
- Keep page content in `content/` data files where practical; keep rendering in reusable components.

## Design system
- Use the established Outfit typography, palette, spacing, and responsive patterns.
- Use CSS variables from `app/styles.css`; do not introduce unrelated colors or typefaces.
- Follow the contrast, focus, image alt-text, and touch-target guidance in the style guide.
- Use the approved orange badge at `public/brand/toynbee-hall-orange-badge.png` without editing its proportions or colors.
- Treat `/style-guide/` as the visual reference for colors, type samples, and component patterns.

## When adding a component
- First check whether an existing component can support the pattern.
- Make reusable patterns configurable with props or structured content data.
- Add component styles to `app/styles.css` and use the existing design tokens.
- Keep the layout responsive and keyboard accessible.

## Before finishing
- Summarize files changed and any decisions made.
- If asked to verify, run the relevant checks and report their results.
