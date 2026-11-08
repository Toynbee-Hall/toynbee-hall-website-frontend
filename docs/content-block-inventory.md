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

The shared header, navigation, footer, cookie controls and page-level title/intro are site structure, rather than repeatable body blocks.

## Reusable blocks

### 1. Hero / page introduction

**Use for:** Homepage, section landing pages, service pages, campaigns and venue pages.

**Content:** eyebrow or category, heading, short introduction, optional primary and secondary links, optional contextual image or video poster, image alt text, optional caption.

**Variants:** text-led; split text and image; image-led story; campaign/action hero. Keep the orange story treatment consistent with the guide: large white headline only, deep-slate supporting copy, real photography. Do not use white small text on orange.

### 2. Audience pathway / service card grid

**Use for:** “I’m looking for…” homepage choices, advice topic navigation, community programmes, ways to support, research themes.

**Content:** section heading and intro; cards with title, short description, optional image/icon, audience label, and destination link.

**Layout inspiration:** Girls Who Code’s clear program pathways and Second Harvest’s three immediate routes into support, volunteering and partnership. Keep Toynbee cards on white or approved pale tints with navy headings and consistent link treatment.

### 3. Image-and-text feature

**Use for:** Explaining a service, programme, historic venue or community project.

**Content:** heading, concise copy, image and alt text, optional caption, CTA. Support image-left and image-right placement as a layout option, not a new visual style.

### 4. Image with caption / gallery

**Use for:** A single documentary image, a project photo sequence, event photography or venue imagery.

**Content:** one or more images, meaningful alt text for each informative image, optional caption and photographer credit. Galleries should keep images in an editorial order and provide keyboard-accessible controls if interactive.

### 5. Impact statistics

**Use for:** Impact, annual reports, programme outcomes and fundraising.

**Content:** section heading/context; repeated metric value, label and optional explanatory sentence; optional source/report link and supporting image.

**Layout inspiration:** the prominent, contextualised impact figures on Girls Who Code and Second Harvest. Numbers must retain their timeframe and source; do not publish unsupported or context-free figures.

### 6. Story or campaign feature

**Use for:** A featured news item, campaign, participant story or fundraising appeal.

**Content:** category, large headline, short summary, real contextual image and alt text, optional date, CTA. May use the style guide’s orange editorial surface with large white headline and deep-slate supporting copy.

### 7. Card collection / related links

**Use for:** Related pages, service options, venue spaces, team members, reports and secondary routes.

**Content:** optional section heading and intro; repeated card with title, short description, optional image, metadata and link. Support a featured first card where content hierarchy calls for it.

### 8. News, story or event listing

**Use for:** News and blogs, upcoming events, case studies, reports or resources.

**Content:** heading/intro; cards with category, title, summary, date, image/alt, destination; optional “view all” action. Listing pages may add category filters, keyword search and pagination when the volume warrants them. The controls must have labels, keyboard support and a clear empty state.

### 9. Quote / lived-experience testimonial

**Use for:** Participant, volunteer, supporter, partner or venue feedback.

**Content:** quote text, named or appropriately anonymous attribution, role/context, optional portrait and alt text.

**Presentation:** use the existing blue-tint quote treatment with jade accent. Do not imply endorsement or identify someone without approved content.

### 10. Rich text / long-form article

**Use for:** Explanatory content, policies, service details, news articles and history.

**Content:** ordered headings, paragraphs, lists, inline links, optional emphasis, and optional inline media/caption. Preserve heading order, readable line lengths and short paragraphs. Keep body copy at least 16px.

### 11. Numbered process / “How to get help” steps

**Use for:** Advice access, referrals, appointments, applications, fundraising instructions and venue booking.

**Content:** section heading and intro; ordered steps with number, short title, description, optional contact/action, and optional time expectation.

**Layout inspiration:** the progressive, numbered housing advice process on Toynbee Hall’s live site. Steps should remain understandable when stacked on mobile.

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

**Presentation:** use a semantic, accessible table on wide screens and a clearly labelled stacked schedule on mobile. Provide an accessible HTML version even if a downloadable timetable is also offered.

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
| `hero` | 1. Hero / page introduction | Image-led hero; the last heading line is highlighted in orange. |
| `cardGrid` | 2. Audience pathway / service card grid | Optional `id` for in-page links, numbering and approved tint `theme` per card. |
| `imageText` | 3. Image-and-text feature | One or two images, image left or right. |
| `statement` | Information feature (navy) | Mission or key statement with optional action. |
| `newsList` | 6/8. Story feature and news listing | First item is featured; `"theme": "orange"` gives the editorial story card. |
| `quote` | 9. Quote / testimonial | |
| `richText` | 10. Rich text | |
| `callout` | 13. Callout / action panel | |
| `linkList` | 7/21. Related links | |
| `newsletterSignup` | 20. Newsletter signup | Labelled fields and privacy notice. Without an `action` the form does not submit, so it is not production-ready yet. |
| `logoGrid` | Funder and partner logos | `label` names the section when there is no visible heading. |

The homepage (`content/homepage.json`) and standard pages (`content/pages/*.json`) share these blocks. Extend `content/types.ts`, `content/schemas/page.schema.json` and `components/ContentBlockRenderer.tsx` together as each further pattern is implemented.

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

