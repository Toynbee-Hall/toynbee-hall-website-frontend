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
- Client quotes (`quoteGrid`): light blue tint cards with a 4px orange top rule, an orange opening quotation mark, grey 18px quote text, and the name in navy SemiBold after a short orange rule. Three across on desktop, one per row below 900px.
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

**Shared elements.** The shared site header and footer appear on this page. The header has been restyled site-wide to match it: navy type, orange underlines and rules, light blue highlights, grey cell lines and no star device. On desktop a light grey rule separates the quick links from the main sections.

## Homepage

On the `brand-guidelines-inventory` branch, the homepage (`app/page.tsx`) renders `content/homepage.json` through `BrandBlockRenderer`, with the same styles and font as this page. The content is unchanged. Each block sits in a `.bi-section` inside the page width, except the hero, the split banner and the newsletter signup, whose backgrounds run the full window width with content aligned to the page width. On desktop the split banner's panel runs to the window edge. Its photograph runs past the page content's edge, up to a wider 1680px banner width (`--split-max`), and fades slowly towards the window edge, so on wide screens the banner still reads as full window width. On smaller screens the photograph sits above the panel without the fade. The heritage introduction banner sits above the latest news with its photograph on the left (`"imagePosition": "left"`) and a blue tint panel (`"theme": "blue-tint"`, the same tint as the news cards), inside a full-width blue tint band so the photograph fades into the tint rather than the white page; its button opens the full chronology on the Explore Toynbee Hall site. The venue feature is framed in a grey cell line, as in the inventory examples, and the first hero heading renders as the page `h1` (`pageTitle` prop). The Outfit font for both routes is defined in `app/brand-font.ts`. To vary the rhythm down the page, the pathway heading (`"align": "center"`), mission statement and partner label are centred, and sections below the hero are revealed on scroll using CSS scroll-driven animation: sections rise 72px as they fade in over a fixed 240px of scrolling, cards, stories and quotes follow one after another on desktop, and split banner and image feature photographs slide in from their own side with the copy from the other. The reveal is skipped when the visitor prefers reduced motion or the browser lacks support.

## Brand page template

Pages with `"template": "brand"` render through `components/BrandPageTemplate.tsx`. Each one opens with the brand page banner (title, intro and a required `image`, with an optional `eyebrow`), followed by the page's blocks rendered by `BrandBlockRenderer`. The banner's tint runs the full window width. Blocks sit in `.bi-section` wrappers, which are shared with the homepage. The newsletter signup also runs full width. Brand pages have no sidebar and no closing page call to action. The page banner always keeps its text on the left, where visitors look first, with the photograph on the right. As on the homepage, the mission statement is centred, blocks with `"align": "center"` centre their headings (About us: values and Explore Toynbee Hall; Help and Advice: the service cards, client quotes and the closing callout), and sections rise into view on scroll.

`/about-us/` (`content/pages/about-us.json`) uses it, with the same live-site wording and links, in this order:

1. Page banner with the courtyard photograph
2. Mission statement, introducing "Our vision" and linking to the impact report
3. Two-photo gallery
4. Rich text for "Our mission"
5. Values cards
6. Timeline of all 58 events from the Explore Toynbee Hall timeline (1874–2014), in date order. 53 have archive photographs: eight in `public/images/heritage/` and 45 in `public/images/heritage/timeline/`, copied from the Explore Toynbee Hall site build (`toynbee-eleventy/_site/assets`), with alt text written for each. Five are text only: 1911 Attlee has no image on Explore; the 1928 Amelia Earhart and 1967 Gatehouse photos carry Getty Images and Alamy watermarks; and the 1939 Citizens Advice and 2014 Heritage Lottery Fund images are logos, which the landscape crop would cut off. Link labels for videos and booklets that the cards cannot show were left out.
7. Heritage stories cards, the same as the inventory example
8. Card collection for "Explore Toynbee Hall"
9. Download list for the annual report
10. Newsletter signup
11. Enquiry form

The values block also feeds the inventory's values example.

`/free-advice/` (`content/pages/free-advice.json`) also uses the brand template. Its blocks are, in order:

1. Audience pathways cards, with the advice icons
2. Orange eligibility panel for City of London residents
3. "How to get advice" cards
4. Link list
5. Client quotes for "Our advice is always free and confidential"
6. Light blue callout to contact the advice team

Its first card grid, info panel, link list and client quotes feed the inventory examples, so keep them in that order. The plain quote example uses the second client quote.

Rich text paragraphs and list items are 18px.
