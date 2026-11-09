# Website migration inventory

Generated from `website-audit(1).html` (crawl date: 2026-10-17; source: `full-20261016-browser-check`). The companion CSV contains every audit record and a **candidate** local JSON match based on URL slug or title. Candidate matches need human review; they are not proof that content has been migrated accurately.

## What the audit contains

- 621 total URL records; 581 returned HTTP 200 and 40 returned 404.
- Record types: post: 369, page: 119, missing: 40, resource: 37, listing: 29, event: 23, other: 4.
- Navigation groups: main menu 44; other menus 7; not in menus 570. “Not in menus” does not mean “should not be migrated”.
- Existing local content: 48 page JSON files plus a separate homepage record. 47 audit records have a possible local JSON match by slug or title; 8 local page files have no candidate match and need manual reconciliation.
- Existing audit proposals: needs triage: 501, rewrite: 41, keep: 40, remove: 24, merge: 15. Empty proposal fields need triage.

Local pages without a candidate audit match: `advice-hub` (Help and Advice), `childrens-activities` (Let us Play), `community-centre` (Our Community Centre), `events-blogs` (Venue hire stories and ideas), `over-50s-activities` (LinkAge Plus activities for over 50s), `reshaping-temporary-accommodation` (Reshaping temporary accommodation), `the-meeting-rooms` (Meeting rooms), `young-people-activities` (Activities for young people). These may use different live URLs or titles; reconcile them manually before migration.

## Suggested local archetypes

Use the audit's source templates and record kinds to group the work into reusable local page archetypes:

1. Homepage
2. Section landing / hub
3. Standard information page
4. Advice or community service detail
5. Research or impact page, including reports and downloads
6. News or blog article
7. News, blog, or category listing
8. Event detail and event listing
9. Venue / facility page
10. Contact, form, and utility page

These are starting categories. Confirm them by comparing representative pages and actual block compositions; do not create one template per URL. Treat posts, events, resources, and listings as distinct content types where their structure or behaviour differs.

## Recommended next actions

1. Review the CSV's audit proposal and menu columns. Confirm keep, rewrite, merge, and remove decisions; investigate records without a proposal.
2. Reconcile all 48 local page files and the homepage against canonical audit URLs. The CSV match is only an initial candidate based on slug/title; account for redirects, aliases, changed URLs, and pages with unrelated titles.
3. For each kept canonical URL, assign one archetype and record status: not started, content captured, template ready, migrated, reviewed.
4. Select one representative page per archetype. Compare it with the live page, add missing reusable blocks to the inventory and renderer, then migrate similar pages in batches.
5. Keep linked and unlisted URLs in the same inventory. Prioritize according to the audit's recommendations and project scope; the unlisted set contains substantial editorial and resource content.

## Important limits

The export was crawled on 2026-10-17; check for newer or changed pages before finalizing. It includes 404s, historical posts, resources, aliases, and other URL records, so its total is not the number of pages to recreate. Menu membership and source-template labels help classify the work but do not determine whether a record should be kept.
