# Brand guidelines content block inventory

`/brand-content-block-inventory/` shows the same example content as `/content-block-inventory/`, styled only with the *Toynbee Hall Brand Guidelines* (2024). It is a comparison page; the main site and the original inventory are unchanged.

- Page route: `app/brand-content-block-inventory/page.tsx`
- Page layout: `components/BrandBlockInventory.tsx`
- Block renderer: `components/BrandBlockRenderer.tsx` (supports every `ContentBlock` type)
- Styles: `app/brand-inventory.css`, scoped to `.bi` and loaded only on this route
- Example content: `content/inventory-examples.ts`, shared with the original inventory
- History and heritage examples (Collection 7): `content/history-and-heritage.json`, from the heritage prototype, with images from the Explore Toynbee Hall timeline in `public/images/heritage/`

## Rules taken from the guidelines

**Colour.** Orange `#F16E00`, Grey `#636466`, Navy `#175984`, Jade `#20A790`, Light Blue `#96B4DE` and Yellow `#EEB736`, plus black and white. Use them as solids or tints.

**Text colour.**

- Grey text on white or on pastel backgrounds, to reduce glare.
- Black text on orange, light blue, yellow and jade.
- White text on black and navy.
- White text on orange and jade only at 18pt (24px) or larger. Exceptions: the orange split banner and the page banner use white for all their copy, including labels and supporting text.

**Type.**

- Outfit throughout, with Arial as the fallback.
- Headings and subheads in Outfit Medium (500), set by `--bi-heading-weight`. The 2024 guidelines specify Light; this has since been updated.
- Subheads in navy, and small subheads and labels in navy Outfit SemiBold.
- Body copy in grey Outfit Light.
- Use bold for emphasis. Avoid italics, underlining and blocks of capital letters.
- Left-align text, turn hyphenation off, and keep names, phone numbers and dates on one line.

**Layout motifs.**

- Page banner (Collection 1, from Help and Advice at `/free-advice/`): a white headline, label and summary in an orange panel, beside a photograph on an orange tint, offset by an 8px navy block shadow. It is rendered by `BrandPageBanner` in `components/BrandBlockRenderer.tsx`, because it is page furniture, not a content block. The site version's logo-device watermark and the dash before the label are left out.
- Section headings in a single colour, orange. A heading accent is joined to the heading, not set in a second colour.
- Mission statement: a white section, with an orange headline, grey text and a navy button. Solid orange was too bold and bright at this size.
- News: the lead story in a landscape card (photo beside the copy). With `"theme": "blue"`, as on the homepage, it uses the same pale blue tint, navy title and grey text as the other cards; otherwise it is navy with white text, with the other stories in a row of three light blue cards underneath. Each card has a photo, a small date, a large title, a three-line summary and a link. Tablets show two cards per row; phones show one.
- Timeline: an orange heading, a year selector with an orange underline on the chosen year, and cards with an archive photo, a large orange date, a navy title and grey copy. The chosen card has a light blue tint and an orange top rule. Previous and next buttons are 48px navy-outlined circles.
- Homepage pathway cards are not numbered. The lead card (Advice, any card with a `theme`) is solid navy with white text; the others are white in grey cell lines with a 4px orange top rule. Each has a linear icon from `public/images/pathway-icons/` in a 56px orange roundel above the title, left aligned. Other colourways are compared at `/pathway-colour-options/`.
- Icons supplied as orange roundels show at 48px on cards.
- White headline lines on orange bands, as on the guidelines cover.
- Navy and light blue heading bands.
- Short orange rules between items.
- Pastel panels with navy SemiBold labels.
- Cell lines in tables.

**Imagery.**

- Real, hopeful photography.
- Captions that carry essential information.
- Captions on photos sit on a plain white strip.
- Galleries use a bento mosaic on a 12-column grid that repeats every six photos, with layouts tuned for one to five photos. On phones it becomes two columns, with every third photo full width.
- Exception: the page introduction uses a full-width background photograph (360–620px tall), with the orange title bands and the button on top of it. Any other text on it sits on a white strip.

**Icons.** Linear icons, housed in orange roundels.

**Logo.** The tree device and wordmark are never separated or altered, so this page uses no logo watermark, star or curved photo cutouts.

## Differences from the main site design system

This page intentionally departs from `CLAUDE.md` and `docs/website-style-guide.md` where the brand guidelines say otherwise:

- It uses Outfit SemiBold (600), loaded with `next/font` for this route only.
- It uses black, not deep slate, for text on orange, jade, yellow and light blue. Deep slate is not part of the brand palette.

**Links.** Links inside running text keep an underline, which accessibility requires. Standalone links use a short orange rule instead.

**Shared elements.** The shared site header and footer appear on this page. The header has been restyled site-wide to match it: navy type, orange underlines and rules, light blue highlights, grey cell lines and no star device.

## Homepage

On the `brand-guidelines-inventory` branch, the homepage (`app/page.tsx`) renders `content/homepage.json` through `BrandBlockRenderer`, with the same styles and font as this page. The content is unchanged. Each block sits in a `.bi-home-section` inside the page width, except the hero and the newsletter signup, whose backgrounds run the full window width with content aligned to the page width. The navy heritage introduction banner sits above the latest news; its button opens the full chronology on the Explore Toynbee Hall site. The venue feature is framed in a grey cell line, as in the inventory examples. and the first hero heading renders as the page `h1` (`pageTitle` prop). The Outfit font for both routes is defined in `app/brand-font.ts`.
