# Toynbee Hall Website Style Guide

**Digital application of the 2024 brand guidelines and October campaign direction**

## Purpose and reference hierarchy

This guide translates the supplied Toynbee Hall Brand Guidelines 2024 into a practical website system. The October campaign image is treated as a newer editorial direction for story-led content: vivid orange fields, prominent real photography, confident white headlines and organic corner decoration. It does not replace the official logo or the core brand rules.

## Brand colors

| Token | Hex | Web use |
|---|---|---|
| Orange | `#F16E00` | Primary accent, calls to action, editorial features |
| Deep slate | `#1F2933` | Softer high-contrast text on orange, jade and pale surfaces |
| Grey | `#636466` | Body copy on white, secondary text |
| Navy | `#175984` | Strong headings, links, dark information panels |
| Jade | `#20A790` | Supporting accent and community highlights |
| Light blue | `#96B4DE` | Supporting panels and illustration accents |
| Yellow | `#EEB736` | Small highlights and status accents |
| Black / white | `#000000` / `#FFFFFF` | Core brand colors; black is not used for interface copy |

Use the brand colors at full strength for accents and approved tints for larger surfaces. The current token file also defines orange, jade, light blue and yellow tints for backgrounds.

### Contrast combinations

| Background | Text | Guidance |
|---|---|---|
| White | Grey or deep slate | Body and long-form copy |
| Navy | White | Strong, accessible feature panel |
| Orange | Deep slate | Body copy, labels and button text (4.9:1) |
| Orange | White | Large type only (18pt / 24px or larger) |
| Jade | Deep slate | Body copy and labels (4.9:1) |
| Jade | White | Large type only (18pt / 24px or larger) |
| Light blue / yellow | Deep slate | Text and labels |

For website controls, aim for WCAG AA contrast: 4.5:1 for normal text and 3:1 for large text. Do not place small white text over orange or jade.

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

Use the supplied core Toynbee Hall lockup without changing its colors, proportions or composition. Keep it on a white background, preserve clear space at least the height of the “T” in TOYNBEE, and never recreate it as text or a standalone initial. The campaign’s “team Toynbee” wordmark belongs to that campaign treatment and is not a replacement site logo.

## Layout and reusable patterns

- **Header:** white, generous spacing, approved core logo, clear primary navigation and a visible donate action.
- **Hero:** large statement, short supporting copy and a clear next action. Use a real contextual image when it strengthens the story.
- **Primary action:** orange with deep slate text; maintain a clear focus state and generous hit area.
- **Story feature:** orange surface, large real photo, large white headline, concise deep slate body copy. Keep white text to the headline scale. Use this pattern for news and campaign storytelling.
- **Service cards:** white or pale brand tints, navy headings, short descriptions and consistent link treatment.
- **Long-form content:** white background, grey/deep slate body copy, navy headings, clear subheads and short paragraphs.
- **Information feature:** navy background with white text for high-contrast calls to action or key facts.
- **Footer:** white background, approved logo, grouped links and clear charity/legal details.

Use a content width up to 1240px, 32px desktop and 20px mobile gutters, 88px desktop and 64px mobile section spacing, and 14px card gaps. Collapse grids cleanly to one column on narrow screens.

## Photography and illustration

Choose real people in real situations, with natural light and a warm, hopeful, respectful tone. Keep people prominent and include Toynbee Hall or local context where possible. Write meaningful alt text that describes the informative image; use empty alt text for purely decorative images. Use approved illustration assets only. The October image’s organic leaf motifs may guide placement and mood, but should not be redrawn as unofficial brand artwork.

The supplied Rushanara Ali visit photograph is used as the orange editorial story example in the style guide, and can be used in a `newsList` item with `"theme": "orange"`. The flat poster itself should not be used as a page image because its text would not be selectable or accessible.

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

## Applied in this project

The current pass replaces the unrelated green/serif styling with brand colors and Outfit typography; applies accessible orange, navy and pale-tint treatments; uses the approved logo asset; and adds the October visit as structured homepage news content. The style tokens live in `content/design-tokens.json`. This is a foundation for further page-by-page refinement and later CMS implementation.
