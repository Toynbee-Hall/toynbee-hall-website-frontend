# Toynbee Hall Website Style Guide

**Digital application of the 2024 brand guidelines and recent Toynbee Hall design references**

## Purpose and reference hierarchy

This guide translates the supplied Toynbee Hall Brand Guidelines 2024 into a website design system. The recent announcement and presentation designs inform the editorial variants. Use the approved orange badge for public pages.

## Editorial design direction

- Start with white or a warm orange tint and leave space around headings and photographs. Use deep slate for editorial headings and keep Outfit at weight 500 or lighter.
- Use the short orange rule under section headings. On white, a short phrase at the end of a large heading can use logo orange alongside deep slate. Use dark text for smaller copy and on warm tints.
- Pair a short headline with one contextual photograph in the editorial photo feature. Let the white background curve into the edge nearest the copy to echo the circular badge. On phones, the curve cuts into the bottom of the image.
- Use circular line icons on pale tints for a short process. Jade can connect the steps on wide layouts. Keep the labels and reading order clear when steps stack.
- Give a short, attributed quote room to breathe. Use the orange rule and quotation mark as decoration around deep slate text.

See live examples at `/style-guide/#editorial` and block guidance at `/content-block-inventory/#editorial`.

## Brand colors

| Token | Hex | Web use |
|---|---|---|
| Orange | `#F16E00` | Primary brand colour for navigation accents, actions and editorial features |
| Deep slate | `#1F2933` | Editorial headings and high-contrast text on jade and pale surfaces |
| Grey | `#636466` | Body copy on white, secondary text |
| Navy | `#175984` | Strong headings, links, dark information panels |
| Jade | `#20A790` | Supporting accent, community highlights and decorative process lines |
| Light blue | `#96B4DE` | Supporting panels and illustration accents |
| Yellow | `#EEB736` | Small highlights and status accents |
| Black / white | `#000000` / `#FFFFFF` | Core brand colors; black is not used for interface copy |

Use the brand colors at full strength for accents and approved tints for larger surfaces. The current token file also defines orange, jade, light blue and yellow tints for backgrounds.

### Contrast combinations

| Background | Text | Guidance |
|---|---|---|
| White | Grey or deep slate | Body and long-form copy |
| Navy | White | Strong, accessible feature panel |
| White | Orange | Accent words in headings at 24px or larger (3.01:1) |
| Orange | White | Primary buttons and solid orange sections (3.01:1) |
| Jade | Deep slate | Body copy and labels (4.9:1) |
| Jade | White | Large type only (18pt / 24px or larger) |
| Light blue / yellow | Deep slate | Text and labels |

Use white on solid logo orange and deep slate on jade and pale tints. White on logo orange meets the 3:1 contrast target for large text and falls below the 4.5:1 target for smaller text.

## Typography

Use **Outfit** for the website, with weights 300, 400 and 500. Arial is the practical fallback. Keep interface typography at weight 500 or lighter; use size, spacing and color for hierarchy instead of heavy bold text. The source guide gives print sizes; this responsive scale is a web adaptation.

| Role | Desktop | Mobile | Weight / line height |
|---|---:|---:|---|
| H1 | 64px | 46px | 400–500 / 1.06 |
| H2 | 44px | 34px | 400–500 / 1.12 |
| H3 / card title | 24–26px | 22–24px | 500 / 1.2 |
| Body | 16–18px | 16px | 300–400 / 1.5 |
| Small label | 14px | 14px | 400–500 / 1.5 |

Keep paragraphs left-aligned, use medium weight sparingly for emphasis, and avoid all caps, underlining, italics and hyphenated line breaks. Keep body copy at least 16px on screen.

## Logo

Use the supplied orange Toynbee Hall badge at `public/brand/toynbee-hall-orange-badge.png`. Display it on white with clear space around the whole badge. Preserve its colours, proportions and composition. The decorative tree watermark is separate from the site logo.

## Layout and reusable patterns

- **Header** places the orange badge on the left, with navy quick links, a navy Donate button and search above the right-aligned navy navigation, separated from it by a light grey rule. Quick links show a short orange rule on hover. Orange chevrons mark desktop dropdowns, which open on hover and keyboard focus, with an orange underline on the open section. Dropdowns are white panels in grey cell lines, with no rule of their own, so the open section's orange underline is the only orange line; links highlight in the light blue tint with an orange edge. On screens 900px and narrower, a labelled Menu button opens a panel where each section expands on its own in a light blue tint, and Work with us and Contact us move into the panel. Escape closes it.
- **Homepage hero:** full-width contextual photo with a faint orange gradient behind the white heading, a clear next action and an orange rule. The mobile gradient sits behind copy at the bottom of the photo.
- **Standard page header:** every standard page, full-width or with a sidebar, uses a framed photo overlapping the orange title panel, with the faded logo mark on the pale backdrop.
- **Split banner (in-page block):** half orange panel with a white headline, deep-slate label and body, and a cropped logo watermark, beside a contextual photo. Use it further down a page to introduce a section or highlight one action.
- **Article, event, resource and listing headers** use logo orange with white headings and deep-slate eyebrows, metadata and supporting copy.
- **Primary action** uses logo orange with white text, a clear focus state and a generous hit area.
- **Story feature** pairs an orange surface with a contextual photo, a white headline, deep-slate supporting copy and a white action button. The homepage leads its news section with this treatment.
- **Service cards:** white or pale brand tints, navy headings, short descriptions and consistent link treatment.
- **Homepage pathways** use solid deep slate with white copy and logo orange for the lead route.
- **Long-form content** uses a white background, deep slate section headings, navy subheadings and grey body copy.
- **Information feature:** navy background with white text for high-contrast calls to action or key facts.
- **Mission statement** uses logo orange with white copy and an optional white action.
- **Footer:** white background, orange badge, grouped links and clear charity/legal details. The support callout sits on the light blue tint (`--blue-tint`).

Use a content width up to 1240px, with 32px desktop and 20px mobile gutters. Align headings, prose and grids to the same left edge. Keep supporting panels on the right of the reading column on desktop and stack them below the content on mobile. Give callouts and cards their own inner padding. The service card grid uses an 18px desktop gap and adapts on narrow screens.

## Photography and illustration

Choose real people in real situations, with natural light and a warm, hopeful, respectful tone. Keep people prominent and include Toynbee Hall or local context where possible. Write meaningful alt text that describes the informative image; use empty alt text for purely decorative images. Use approved illustration assets only. The October image’s organic leaf motifs may guide placement and mood, but should not be redrawn as unofficial brand artwork.

The supplied Rushanara Ali visit photograph is used as the orange editorial story example in the style guide, and can be used in a `newsList` item with `"theme": "orange"`. The flat poster itself should not be used as a page image because its text would not be selectable or accessible.

Use a mix of relevant images from Toynbee Hall’s live site and its own photo collection. Store selected photos locally for reliable loading. Standard banners use the page image when supplied, then a section photo or the courtyard fallback. Keep descriptive captions where useful and display photography credit where required. Treat the faded banner mark and icons beside descriptive titles as decorative.

## Accessibility and interaction

- Provide a visible keyboard focus ring (3px navy outline) and preserve a logical tab order.
- Make interactive targets at least 44×44px where practical.
- Pair color with text or icon cues; color alone must not carry meaning.
- Give every informative image an accurate alt description and every control a clear accessible name.
- Use semantic heading order and descriptive link labels.
- Respect reduced-motion preferences and avoid essential information in hover-only states.

## CMS-ready content model

Treat each page as an ordered collection of typed content sections. Reusable patterns should have structured fields rather than page-specific markup. The existing project starts this separation in `content/homepage.json`, `content/site.json`, and `content/design-tokens.json`, with rendering in reusable components such as `ContentBlockRenderer.tsx`, `SiteHeader.tsx`, and `SiteFooter.tsx`. The homepage is an ordered list of content blocks in `content/homepage.json`.

Suggested CMS block types: hero, rich text, service-card grid, story feature, news list, statistics, quote, callout, image with caption, and venue feature. Each block should define its text, links, media, alt text, optional theme token and display order.

The local `/style-guide/` page shows the three banner styles, typography, palette and layout guidance. It uses the same brand styling as `/brand-content-block-inventory/` (banded title, numbered section index, ruled sections and bordered example previews), and renders its examples with `BrandBlockRenderer`. The `/content-block-inventory/` page renders examples with the same components as the main site and links to each page template.
