# Toynbee Hall content block inventory

This inventory describes the reusable page patterns needed to build out the Toynbee Hall website. It is based on the live site’s homepage, advice, community, research, news, fundraising, contact and venue content, with layout inspiration from Girls Who Code, Second Harvest Foodbank and CARE.

The reference sites inform information hierarchy and content arrangement only. All Toynbee Hall blocks must follow [`website-style-guide.md`](website-style-guide.md) and [`design-tokens.json`](../content/design-tokens.json): Outfit typography, approved Toynbee Hall colours and logo, prescribed spacing, contrast, focus states, 44px touch targets, meaningful image alt text, and responsive one-column layouts on narrow screens.

## Page structure

Use a small number of page templates composed from these blocks:

- **Homepage / campaign landing:** hero, prominent audience pathways, mission or impact, selected stories or events, and a clear action.
- **Service detail:** page introduction, eligibility or scope, service information, step-by-step access, related services, and contact/action.
- **Community or activity page:** introduction, activity/programme cards, schedule, audience/access details, and contact.
- **Research or publication page:** introduction, method or themes, selected reports, downloadable resources, impact, and collaboration CTA.
- **News, events or resource listing:** listing introduction, filters/search where useful, repeated cards, pagination or load-more.
- **Article or story:** title and metadata, lead image, long-form content, quotes/media, related stories, and onward action.
- **Venue page:** venue overview, space cards, facilities/access information, image gallery, testimonials, and enquiry CTA/form.
- **Contact or enquiry page:** contact routes grouped by purpose, location details, and a suitable enquiry form where needed.

The shared header, navigation, footer and standard page banners are part of the template. Standard pages use the framed photograph banner for both full-width and sidebar layouts. The half-orange, half-photograph banner is available further down a page as the `splitBanner` block. Main content aligns to the left gutter; supporting information sits to the right on desktop and stacks below on mobile.

## Reusable blocks

### 1. Hero / page introduction

**Use for:** Homepage, section landing pages, service pages, campaigns and venue pages.

**Content:** eyebrow or category, heading, short introduction, optional primary and secondary links, optional contextual image or video poster, image alt text, optional caption.

**Variants:** The homepage sets `"variant": "full-bleed"` on its `hero` block for a full-width photo with a localised orange gradient behind the white heading. Standard page introductions use the shared `PageBanner` and their template selects the layout. See the visual examples at `/style-guide/#banners`.

### 2. Audience pathway / service card grid

**Use for:** “I’m looking for…” homepage choices, advice topic navigation, community programmes, ways to support, research themes.

**Content:** section heading and intro; cards with title, short description, optional image/icon, audience label, and destination link.

**Layout inspiration:** Girls Who Code’s clear program pathways and Second Harvest’s three immediate routes into support, volunteering and partnership. Keep Toynbee cards on white or approved pale tints with navy headings and consistent link treatment.

The homepage uses `"variant": "pathways"` for solid deep slate cards with white copy. Set a card’s `theme` to `"orange"` to highlight that route in logo orange.

### 3. Image-and-text feature

**Use for:** Explaining a service, programme, historic venue or community project.

**Content:** heading, concise copy, image and alt text, optional caption and action. The image can sit to either side.

**Editorial variant:** use `"variant": "editorial"` with one contextual photo and short copy. A smooth white curve cuts into the photo at the edge nearest the copy. Check that the subject remains visible at narrow widths.

The image-and-text, card grid, news list and rich text blocks support an optional `headingAccent` at the end of the heading. Use it for a short phrase in a large heading on white. The shared section heading adds an orange rule beneath the text.

### 4. Image with caption / gallery

**Use for:** A single documentary image, a project photo sequence, event photography or venue imagery.

**Content:** one or more images with meaningful alt text, an optional descriptive caption and credit where required. Use varied photos from Toynbee Hall’s live site and photo collection. Galleries should keep images in an editorial order and provide keyboard-accessible controls if interactive.

### 5. Impact statistics

**Use for:** Impact, annual reports, programme outcomes and fundraising.

**Content:** section heading/context; repeated metric value, label and optional explanatory sentence; optional source/report link and supporting image.

**Layout inspiration:** the prominent, contextualised impact figures on Girls Who Code and Second Harvest. Numbers must retain their timeframe and source; do not publish unsupported or context-free figures.

### 6. Story or campaign feature

**Use for:** A featured news item, campaign, participant story or fundraising appeal.

**Content:** category, large headline, short summary, real contextual image and alt text, optional date, CTA. Use white text on the solid orange editorial surface.

### 7. Card collection / related links

**Use for:** Related pages, service options, venue spaces, team members, reports and secondary routes.

**Content:** optional section heading and intro; repeated card with title, short description, optional image, metadata and link. Support a featured first card where content hierarchy calls for it.

### 8. News, story or event listing

**Use for:** News and blogs, upcoming events, case studies, reports or resources.

**Content:** heading/intro; cards with category, title, summary, date, image/alt, destination; optional “view all” action. Listing pages may add category filters, keyword search and pagination when the volume warrants them. The controls must have labels, keyboard support and a clear empty state.

### 9. Quote / lived-experience testimonial

**Use for:** Participant, volunteer, supporter, partner or venue feedback.

**Content:** quote text, named or appropriately anonymous attribution, role/context, optional portrait and alt text.

**Presentation:** use the blue-tint treatment for a supporting testimonial. Set `"variant": "editorial"` for a short pull quote with an orange rule and decorative opening quotation mark. Enter the quote as plain text, with attribution in its own field. Use approved content and attribution.

### 10. Rich text / long-form article

**Use for:** Explanatory content, policies, service details, news articles and history.

**Content:** ordered headings, paragraphs, lists, inline links, optional emphasis, and optional inline media/caption. Preserve heading order, readable line lengths and short paragraphs. Keep body copy at least 16px.

### 11. Numbered process / “How to get help” steps

**Use for:** Advice access, referrals, appointments, applications, fundraising instructions and venue booking.

**Content:** section heading and intro; ordered steps with number, short title, description, optional contact/action, and optional time expectation.

**Presentation:** use the numbered layout for detailed instructions. Set `"variant": "connected"` for a short sequence of two or three steps. Each step can use an optional decorative `icon` image path. A circular number fills in when no icon is supplied. Steps stack on narrow layouts.

### 12. Eligibility, scope and important information

**Use for:** Advice pages, programme pages and events where visitors need to know who can use a service, what is covered, and what is outside scope.

**Content:** heading; concise eligibility criteria, included topics, exclusions or limitations; related route for people who cannot use the service.

**Presentation:** use a clearly titled pale-tint or navy information feature as appropriate. Never communicate eligibility or urgency through colour alone.

### 13. Callout / action panel

**Use for:** Important next steps, contact details, urgent routing, donations or partnership invitations.

**Content:** heading, short body, one primary link/button and optional secondary link/contact method.

**Presentation:** existing orange-tint callout or navy information panel. Keep one clear primary action and use the guide’s button contrast rules.

### 14. Contact details / contact routes

**Use for:** General contact, service-specific contact, press, fundraising, research and venue enquiries.

**Content:** heading or team/service name; address, phone, email, opening times; optional short guidance; map/directions link.

**Behaviour:** phone and email should be actionable links. Group by the visitor’s reason for contacting Toynbee Hall rather than presenting one undifferentiated list.

### 15. Schedule / timetable

**Use for:** Community Centre activities, LinkAge Plus, recurring groups and events.

**Content:** date range or “updated” date; days/times; activity; intended audience or age group; location; booking requirement and contact.

**Presentation:** use a semantic table. On narrow screens the table scrolls within its own container and stays within the page gutter. Link to the published timetable when structured schedule content is unavailable.

### 16. Venue / facility card and gallery

**Use for:** Lecture Hall, Ashbee Hall, meeting rooms and other bookable spaces.

**Content:** space name, description, capacity, facilities, access information, images with alt text, availability/enquiry link. A gallery can optionally include captions and controls with accessible names.

### 17. Download / report / resource list

**Use for:** Research library, annual and impact reports, policies, advice leaflets and historic resources.

**Content:** resource title, summary, type/file format, file size if known, publication date, accessible download link; optional topic/category.

**Behaviour:** clearly identify downloads and their format. Where a PDF is essential, include a short HTML summary or equivalent key information on the page.

### 18. Accordion / expandable detail

**Use for:** Long contact directories, FAQs, detailed terms or secondary service information.

**Content:** concise question/label and answer body. Use native disclosure semantics or equivalent keyboard-accessible controls, announce expanded state, and keep essential warnings and primary actions visible outside collapsed content.

### 19. Donation or fundraising appeal

**Use for:** Donate, fundraising and campaign pages.

**Content:** impact-led heading and explanation, optional supported-by-giving statistics, clear donate action, alternative ways to give, and privacy/supporter information.

**Behaviour:** if a donation form is embedded, make gift frequency and amount clear, label every field, and provide an accessible confirmation/error state. Keep payment handling with the approved donation provider.

### 20. Newsletter signup / enquiry form

**Use for:** Newsletter subscription, venue enquiries, contact requests, partnership enquiries and volunteering interest.

**Content:** heading, purpose and expectations, labelled fields, required/optional indicators, privacy notice, submit action and success/error states. Use only fields needed for that request.

**Behaviour:** forms require a real submission destination and accessible validation; a decorative or non-submitting form is not production-ready.

### 21. Related content / next steps

**Use for:** End of articles and service pages, helping people continue to another suitable route.

**Content:** a small, curated set of relevant links/cards, optional heading, and a single primary CTA. Avoid repeating the whole site navigation.

## Common content fields

Where relevant, blocks should use structured fields rather than custom markup:

- `type` and optional `theme` limited to approved design tokens/patterns.
- `heading`, optional `eyebrow`, and concise `body` or structured text.
- Links as `{ label, href }`; avoid unlabeled destinations.
- Media as `{ src, alt, caption }`, with empty `alt` only for decorative imagery.
- Repeated items in ordered arrays, preserving the editorial order.
- Optional dates, categories, audience labels, metadata and source links where the block needs them.
- Explicit accessible labels and field descriptions for interactive controls.

## Suggested build order

1. **Core:** hero, rich text, card grid, image-and-text, quote, callout, link list, contact details.
2. **Service and community:** numbered steps, eligibility/information panel, schedule, FAQs/accordion.
3. **Publishing and impact:** story/news cards, listing, statistics, download list, related content.
4. **Conversion:** venue space/gallery, donation appeal, newsletter and enquiry forms.

### Implemented block types

| Block `type` | Inventory pattern | Notes |
|---|---|---|
| `hero` | 1. Hero / page introduction | The homepage uses `"variant": "full-bleed"` for white text over a photo gradient. |
| `cardGrid` | 2. Audience pathway / service card grid | Optional intro, in-page `id`, numbering and approved tint `theme` per card. Set `columns` to 2 or 3 for an explicit desktop arrangement and `imageStyle: "icon"` for compact graphics. Values and strategy cards can omit links. |
| `imageText` | 3. Image-and-text feature | Image left or right. Optional `editorial` variant and `headingAccent`. |
| `splitBanner` | Split banner (orange and photograph) | Half orange panel with a white heading, deep-slate label and body, logo watermark and an optional white action, beside a photo. Set `imagePosition` to `"left"` to swap sides. |
| `statement` | Mission statement (logo orange) | White copy and an optional white action. |
| `newsList` | 6/8. Story feature and news listing | Use `"variant": "editorial"` for a full-width lead story and action buttons. Set the lead item’s `theme` to `"orange"` for the orange panel. |
| `quote` | 9. Quote / testimonial | Optional `editorial` variant for pull quotes. |
| `richText` | 10. Rich text | |
| `callout` | 13. Callout / action panel | |
| `linkList` | 7/21. Related links | |
| `newsletterSignup` | 20. Newsletter signup | Labelled fields and privacy notice. Use an approved `action` or a `fallbackLink` to the live form. |
| `enquiryForm` | 20. Enquiry form | Labelled text, email, phone, select, checkbox and textarea fields. When only a `fallbackLink` is supplied, the local fields are read-only and the link opens the live form. |
| `logoGrid` | Funder and partner logos | `label` names the section when there is no visible heading. |
| `longForm` | 10. Rich text / long-form article | Ordered headings, paragraphs with inline links, lists, images and pull quotes. |
| `imageGallery` | 4/16. Image with caption / venue gallery | Responsive image grid; every image includes alt text, optional caption and credit. |
| `impactStats` | 5. Impact statistics | Values include a label and optional context/source link. |
| `steps` | 11. Numbered process | Optional `connected` variant and decorative `icon` per step. |
| `infoPanel` | 12. Eligibility and important information | Blue, orange or jade tint; text remains explicit and understandable without color. |
| `contactRoutes` | 14. Contact details / contact routes | Clickable email and phone routes, address and opening hours. |
| `schedule` | 15. Schedule / timetable | Semantic table that scrolls horizontally on small screens. |
| `resourceList` | 17. Download / report / resource list | Optional cover image, file format, size and publication date. |
| `accordion` | 18. Accordion / expandable detail | Native `<details>` and `<summary>` disclosure controls. |
| `donationAppeal` | 19. Donation or fundraising appeal | Impact copy and primary/secondary links; payment remains with the donation provider. |
| `relatedContent` | 21. Related content / next steps | Curated related links with optional image and summary. |

### Reusable page templates

The project provides standard pages with default/full-width layout options, article pages, event pages, resource pages, and listing pages with news, blog, event, resource or category variants. The root homepage keeps its dedicated composition. Template records and blocks are defined in `content/types.ts`, validated by `content/schemas/page.schema.json`, rendered through `components/ContentPageTemplate.tsx` and the focused template components, and styled in `app/styles.css`.

The homepage (`content/homepage.json`) and standard pages (`content/pages/*.json`) share reusable blocks. Extend the content types, JSON schema and renderer together whenever a new block pattern is introduced.

The visual inventory at `/content-block-inventory/` uses `ContentBlockRenderer` for its examples. It draws from existing page data and focused examples in `content/inventory-examples.ts`. The template links show each pattern in a complete page, and the form specimens are previews.

## Inspiration notes

- **Girls Who Code:** audience/program pathways, impact figures with explanatory context, testimonials, recent news and partner actions.
- **Second Harvest Foodbank:** immediate audience routes, a clear impact section, participant/volunteer voices, a donation appeal and a substantial signup form.
- **CARE:** prominent action-led campaign, clear program categories, impact/trust claims and direct signup options.

These are structural references. Their color palettes, typography, logos and visual treatments are not part of Toynbee Hall’s design system.

## Live Toynbee Hall pages reviewed

- Homepage and main visitor pathways
- About, history and impact
- Housing advice and steps to get help
- Community Centre and weekly activities
- Research and policy
- News and blogs
- Donate, support and fundraising
- Contact directory
- Venue hire and individual event spaces

## Source pages

- [Toynbee Hall homepage](https://www.toynbeehall.org.uk/), [housing advice](https://www.toynbeehall.org.uk/free-advice/housing/), [community activities](https://www.toynbeehall.org.uk/community-services/), [What's on](https://www.toynbeehall.org.uk/whats-on/), [research](https://www.toynbeehall.org.uk/research/), [news and blogs](https://www.toynbeehall.org.uk/news-and-blogs/), [contact](https://www.toynbeehall.org.uk/contact-us/), and [venue hire](https://www.toynbeehall.org.uk/events/).
- Inspiration: [Girls Who Code](https://girlswhocode.com/), [Second Harvest Foodbank](https://www.secondharvestsw.org/), and [CARE](https://www.care.org/).

