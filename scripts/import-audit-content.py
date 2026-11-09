#!/usr/bin/env python3
"""Import live Toynbee Hall WordPress content referenced by the audit CSV."""
import csv
import html
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://www.toynbeehall.org.uk/wp-json/wp/v2"
AUDIT = ROOT / "docs/website-migration-inventory.csv"
OUT = ROOT / "content/pages"
TYPE_ENDPOINT = {"page": "pages", "post": "posts", "event": "event", "resource": "resources"}
SKIP_TYPES = {"missing", "other"}


def clean_text(value):
    value = html.unescape(re.sub(r"<[^>]+>", " ", value or ""))
    return re.sub(r"\s+", " ", value).strip()


class ContentParser(HTMLParser):
    """Extract semantic copy and media from rendered WordPress content HTML."""
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.items = []
        self.current = None
        self.ignore = 0
        self.link = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("script", "style", "noscript", "svg"):
            self.ignore += 1
            return
        if self.ignore:
            return
        if tag in ("h2", "h3", "h4", "p", "li", "blockquote"):
            kind = "heading" if tag.startswith("h") else "listItem" if tag == "li" else "quote" if tag == "blockquote" else "paragraph"
            self.current = {"kind": kind, "level": int(tag[1]) if tag.startswith("h") else None, "parts": [], "links": []}
        elif tag == "a" and self.current:
            href = attrs.get("href")
            if href:
                self.link = {"href": local_link(href), "text": ""}
        elif tag == "img":
            src = attrs.get("data-src") or attrs.get("data-lazy-src") or attrs.get("src") or attrs.get("data-original")
            if src and not src.startswith("data:"):
                self.items.append({"kind": "image", "src": urllib.parse.urljoin("https://www.toynbeehall.org.uk/", src), "alt": attrs.get("alt", "").strip(), "caption": attrs.get("title") or None})
        elif tag in ("ul", "ol"):
            self.items.append({"kind": "listStart", "ordered": tag == "ol"})
        elif tag == "br" and self.current:
            self.current["parts"].append(" ")

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg"):
            self.ignore = max(0, self.ignore - 1)
            return
        if self.ignore:
            return
        if tag == "a":
            self.link = None
        if tag in ("h2", "h3", "h4", "p", "li", "blockquote") and self.current:
            text = re.sub(r"\s+", " ", "".join(self.current["parts"])).strip()
            if text:
                self.current["text"] = text
                self.items.append(self.current)
            self.current = None
        elif tag in ("ul", "ol"):
            self.items.append({"kind": "listEnd"})

    def handle_data(self, data):
        if self.ignore or not self.current:
            return
        self.current["parts"].append(data)
        if self.link is not None:
            self.link["text"] += data
            self.current["links"].append(self.link)


class PageShellParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta, self.main, self.capture = {}, [], False
        self.main_depth = 0
        self.title = False
        self.title_text = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "meta":
            key = values.get("property") or values.get("name")
            if key and values.get("content"):
                self.meta[key] = values["content"]
        if tag == "title":
            self.title = True
        classes = set(values.get("class", "").split())
        content_wrapper = tag == "div" and bool(classes & {"post-content-inner", "post-content-single"})
        if (tag == "main" or content_wrapper) and not self.capture:
            self.capture, self.main_depth = True, 1
            return
        if self.capture:
            self.main.append(self.get_starttag_text())
            if tag not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
                self.main_depth += 1

    def handle_endtag(self, tag):
        if tag == "title":
            self.title = False
        if self.capture:
            self.main.append(f"</{tag}>")
            self.main_depth -= 1
            if self.main_depth <= 0:
                self.capture, self.main_depth = False, 0

    def handle_data(self, data):
        if self.title:
            self.title_text.append(data)
        if self.capture:
            self.main.append(html.escape(data, quote=False))


def direct_page_record(row):
    url = urllib.parse.urljoin("https://www.toynbeehall.org.uk/", row["path"].lstrip("/"))
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; ToynbeeHallLocalReplica/1.0)"})
    with urllib.request.urlopen(req, timeout=45) as response:
        if response.status != 200:
            return None
        shell = PageShellParser()
        shell.feed(response.read().decode("utf-8", "replace"))
    title = shell.meta.get("og:title") or "".join(shell.title_text).replace(" - Toynbee Hall", "").replace(" - Toynbee HallFixed Button", "").strip()
    title = re.sub(r"\s*Fixed Button\s*$", "", title).strip()
    description = shell.meta.get("og:description", "")
    image = shell.meta.get("og:image")
    return {
        "slug": row["path"].strip("/").split("/")[-1],
        "link": url,
        "title": {"rendered": title or row["title"]},
        "excerpt": {"rendered": description},
        "content": {"rendered": "".join(shell.main)},
        "date": shell.meta.get("article:published_time", ""),
        "_embedded": {"wp:featuredmedia": ([{"source_url": image, "alt_text": f"{title or row['title']} — Toynbee Hall"}] if image else [])},
    }


def content_sections(raw):
    parser = ContentParser()
    parser.feed(raw or "")
    sections, list_items, list_ordered = [], [], False
    for item in parser.items:
        if item["kind"] == "listStart":
            if list_items:
                sections.append({"type": "list", "ordered": list_ordered, "items": list_items})
                list_items = []
            list_ordered = item["ordered"]
        elif item["kind"] == "listEnd":
            if list_items:
                sections.append({"type": "list", "ordered": list_ordered, "items": list_items})
                list_items = []
        elif item["kind"] == "listItem":
            list_items.append(item["text"])
        else:
            if list_items:
                sections.append({"type": "list", "ordered": list_ordered, "items": list_items})
                list_items = []
            if item["kind"] == "heading":
                sections.append({"type": "heading", "level": 2 if item["level"] == 2 else 3, "text": item["text"]})
            elif item["kind"] == "quote":
                sections.append({"type": "quote", "quote": item["text"]})
            elif item["kind"] == "paragraph":
                links = []
                for link in item.get("links", []):
                    text = re.sub(r"\s+", " ", link["text"]).strip()
                    if text and {"text": text, "href": link["href"]} not in links:
                        links.append({"text": text, "href": link["href"]})
                para = {"type": "paragraph", "text": item["text"]}
                if links:
                    para["links"] = links
                sections.append(para)
            elif item["kind"] == "image":
                sections.append({"type": "image", "image": {"src": item["src"], "alt": item["alt"] or "Photograph from Toynbee Hall", **({"caption": item["caption"]} if item.get("caption") else {})}})
    if list_items:
        sections.append({"type": "list", "ordered": list_ordered, "items": list_items})
    return sections


def local_link(href):
    absolute = urllib.parse.urljoin("https://www.toynbeehall.org.uk/", href)
    parts = urllib.parse.urlsplit(absolute)
    media_file = re.search(r"\.(pdf|docx?|xlsx?|pptx?|jpe?g|png|gif|webp|mp4)(?:$|\?)", parts.path, re.I)
    if parts.hostname == "www.toynbeehall.org.uk" and not media_file:
        return urllib.parse.urlunsplit(("", "", parts.path, parts.query, parts.fragment))
    return absolute


def event_details(sections):
    result = {}
    for section in sections:
        if section.get("type") != "paragraph":
            continue
        text = section["text"]
        date_match = re.search(r"\b(Mondays?|Tuesdays?|Wednesdays?|Thursdays?|Fridays?|Saturdays?|Sundays?)(?:\s*,?\s*(?:\d{1,2}(?:st|nd|rd|th)?\s+[A-Z][a-z]+(?:\s+20\d{2})?|\(weekly\)))?", text, re.I)
        if date_match and "dateLabel" not in result:
            result["dateLabel"] = date_match.group(0).strip(" ,")
        elif "dateLabel" not in result:
            date_match = re.search(r"\b\d{1,2}(?:st|nd|rd|th)?\s+[A-Z][a-z]+\s+20\d{2}\b", text)
            if date_match:
                result["dateLabel"] = date_match.group(0)
        match = re.search(r"\b\d{1,2}(?::\d{2})?\s*(?:am|pm)?\s*(?:–|-|to)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)?\b", text, re.I)
        if match and "timeLabel" not in result:
            result["timeLabel"] = match.group(0).strip()
            venue = text[match.end():].strip(" ,.;–—")
            if venue:
                result["venue"] = venue
        postcode = re.search(r"\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b", text, re.I)
        if postcode and "venue" not in result:
            result["venue"] = text.strip()
    return result


def api_lookup(group):
    endpoint, slugs = group
    query = urllib.parse.urlencode({"slug": ",".join(slugs), "per_page": "100", "_embed": "1"})
    url = f"{BASE}/{endpoint}?{query}"
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "ToynbeeHallLocalReplica/1.0"})
            with urllib.request.urlopen(req, timeout=45) as response:
                return endpoint, json.load(response)
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError):
            if attempt == 3:
                raise
            time.sleep(1.5 * (attempt + 1))


def api_search(row):
    endpoint = TYPE_ENDPOINT[row["kind"]]
    query = urllib.parse.urlencode({"search": row["title"], "per_page": "100", "_embed": "1"})
    url = f"{BASE}/{endpoint}?{query}"
    req = urllib.request.Request(url, headers={"User-Agent": "ToynbeeHallLocalReplica/1.0"})
    with urllib.request.urlopen(req, timeout=45) as response:
        return row["audit_id"], json.load(response)


def media_for(item, title=""):
    embedded = item.get("_embedded", {})
    media = (embedded.get("wp:featuredmedia") or [{}])[0]
    url = media.get("source_url")
    if not url:
        return None
    alt = clean_text(media.get("alt_text")) or f"{title} — Toynbee Hall"
    return {"src": url, "alt": alt}


def main():
    with AUDIT.open(encoding="utf-8-sig", newline="") as stream:
        rows = list(csv.DictReader(stream))
    wanted = [r for r in rows if r["http_status"] == "200" and r["kind"] in TYPE_ENDPOINT and r["path"].strip("/")]
    groups = {}
    row_slug = {}
    for row in wanted:
        path = urllib.parse.unquote(row["path"].split("?", 1)[0]).strip("/")
        source_slug = path.split("/")[-1]
        row_slug[row["audit_id"]] = source_slug
        endpoint = TYPE_ENDPOINT[row["kind"]]
        groups.setdefault(endpoint, []).append(source_slug)
    requests = []
    for endpoint, slugs in groups.items():
        unique = list(dict.fromkeys(s for s in slugs if s))
        for start in range(0, len(unique), 20):
            requests.append((endpoint, unique[start:start + 20]))
    fetched = {}
    source_records = []
    failures = []
    with ThreadPoolExecutor(max_workers=5) as pool:
        futures = [pool.submit(api_lookup, group) for group in requests]
        for future in as_completed(futures):
            try:
                endpoint, records = future.result()
                for record in records:
                    fetched.setdefault((endpoint, record["slug"]), []).append(record)
                    source_records.append((endpoint, record))
            except Exception as error:
                failures.append(str(error))

    unresolved = [row for row in wanted if not fetched.get((TYPE_ENDPOINT[row["kind"]], row_slug[row["audit_id"]]))]
    fallback = {}
    with ThreadPoolExecutor(max_workers=5) as pool:
        futures = [pool.submit(api_search, row) for row in unresolved]
        for future in as_completed(futures):
            try:
                audit_id, records = future.result()
                fallback[audit_id] = records
                endpoint = TYPE_ENDPOINT[next(r["kind"] for r in unresolved if r["audit_id"] == audit_id)]
                for record in records:
                    fetched.setdefault((endpoint, record["slug"]), []).append(record)
                    source_records.append((endpoint, record))
            except Exception as error:
                failures.append(str(error))

    existing_by_route = {}
    for path in OUT.glob("*.json"):
        try:
            record = json.loads(path.read_text(encoding="utf-8"))
            route = record.get("route") or f"/{record.get('slug','')}/"
            existing_by_route["/" + route.strip("/") + "/"] = path
        except Exception:
            continue

    made, updated, missing = 0, 0, []
    used_files = set()
    for row in wanted:
        endpoint = TYPE_ENDPOINT[row["kind"]]
        source_slug = row_slug[row["audit_id"]]
        candidates = fetched.get((endpoint, source_slug), [])
        route_path = "/" + urllib.parse.unquote(row["path"].split("?", 1)[0]).strip("/")
        source = next((candidate for candidate in candidates if urllib.parse.urlsplit(candidate.get("link", "")).path.rstrip("/") == route_path.rstrip("/")), None)
        if not source:
            search_candidates = fallback.get(row["audit_id"], [])
            source = next((candidate for candidate in search_candidates if urllib.parse.urlsplit(candidate.get("link", "")).path.rstrip("/") == route_path.rstrip("/") or urllib.parse.unquote(urllib.parse.urlsplit(candidate.get("link", "")).path).rstrip("/") == urllib.parse.unquote(route_path.rstrip("/"))), None)
        if not source:
            try:
                source = direct_page_record(row)
            except Exception:
                source = None
        if not source:
            missing.append(f"{row['audit_id']}\t{row['path']}\tno API record")
            continue
        route = route_path.rstrip("/") + "/"
        title = clean_text(source.get("title", {}).get("rendered")) or row["title"]
        intro = clean_text(source.get("excerpt", {}).get("rendered"))
        sections = content_sections(source.get("content", {}).get("rendered", ""))
        if intro.lower().startswith(title.lower()):
            intro = intro[len(title):].strip(" :-–—")
        image = media_for(source, title)
        if not intro:
            first_para = next((s["text"] for s in sections if s["type"] == "paragraph"), "")
            intro = first_para[:320]
        first_paragraph = next((i for i, section in enumerate(sections) if section.get("type") == "paragraph"), None)
        if intro and first_paragraph is not None:
            normalized_intro = re.sub(r"\W+", " ", intro).strip().lower()
            normalized_body = re.sub(r"\W+", " ", sections[first_paragraph]["text"]).strip().lower()
            if normalized_intro.startswith(normalized_body) or normalized_body.startswith(normalized_intro):
                sections.pop(first_paragraph)
        record_slug = re.sub(r"[^a-z0-9-]+", "-", source_slug.lower()).strip("-") or "page"
        data = {"slug": f"audit-{row['audit_id']}-{record_slug}", "route": route, "title": title, "intro": intro}
        if image:
            data["image"] = image
        if row["kind"] == "post":
            data.update({"template": "article", "publishedAt": source.get("date", "")[:10], "blocks": [{"type": "longForm", "sections": sections}] if sections else []})
            terms = source.get("_embedded", {}).get("wp:term", [[]])
            data["category"] = next((term.get("name") for group in terms for term in group if term.get("taxonomy") == "category"), "News")
        elif row["kind"] == "event":
            data.update({"template": "event", "dateLabel": source.get("date", "")[:10], **event_details(sections), "blocks": [{"type": "longForm", "sections": sections}] if sections else []})
        elif row["kind"] == "resource":
            links = []
            for section in sections:
                for link in section.get("links", []):
                    if re.search(r"\.(pdf|docx?|xlsx?|pptx?)(?:$|\?)", link["href"], re.I):
                        links.append({"title": link["text"] or "Download resource", "href": link["href"], "format": link["href"].split("?")[0].rsplit(".",1)[-1].upper()})
            data.update({"template": "resource", "downloads": links, "blocks": [{"type": "longForm", "sections": sections}] if sections else []})
        else:
            data.update({"template": "standard", "layout": "full-width", "blocks": [{"type": "longForm", "sections": sections}] if sections else []})

        existing = existing_by_route.get(route)
        if existing and existing not in used_files:
            target = existing
            used_files.add(existing)
            updated += 1
        else:
            target = OUT / f"audit-{int(row['audit_id']):04d}-{record_slug}.json"
            if target.exists():
                try:
                    prior = json.loads(target.read_text(encoding="utf-8"))
                    if prior.get("route") != route:
                        target = OUT / f"audit-{int(row['audit_id']):04d}-{record_slug}-import.json"
                except Exception:
                    pass
            made += 1
        target.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # Build archive pages from matching source records, keeping the same listing
    # template and item data used elsewhere in the site.
    for row in (r for r in rows if r["kind"] == "listing" and r["http_status"] == "200"):
        label = clean_text(row["title"]).removeprefix("Category:").removeprefix("Event Category:").removeprefix("Resource Category:").strip()
        path = urllib.parse.unquote(row["path"].split("?", 1)[0])
        if path.startswith("/event-cat/") or "event" in path.lower():
            listing_type, endpoint, taxonomy = "events", "event", "event-cat"
        elif path.startswith("/resource-cat/") or "resource" in path.lower():
            listing_type, endpoint, taxonomy = "resources", "resources", "resource-cat"
        elif "blog" in label.lower() or "blog" in path.lower():
            listing_type, endpoint, taxonomy = "blogs", "posts", "category"
        elif path.startswith("/category/"):
            listing_type, endpoint, taxonomy = "category", "posts", "category"
        else:
            listing_type, endpoint, taxonomy = "news", "posts", "category"
        pool = [item for kind, item in source_records if kind == endpoint]
        wanted_term = re.sub(r"[^a-z0-9]+", "-", label.lower()).strip("-")
        selected = []
        for item in pool:
            term_names = []
            for term_group in item.get("_embedded", {}).get("wp:term", []):
                for term in term_group:
                    if term.get("taxonomy") == taxonomy:
                        term_names.extend([term.get("name", "").lower(), term.get("slug", "").lower()])
            if listing_type in ("news", "blogs", "category"):
                category_names = [x.get("name", "").lower() for group in item.get("_embedded", {}).get("wp:term", []) for x in group if x.get("taxonomy") == "category"]
                term_names.extend(category_names)
            if wanted_term in [re.sub(r"[^a-z0-9]+", "-", t).strip("-") for t in term_names if t]:
                selected.append(item)
        if not selected:
            selected = pool
        selected.sort(key=lambda item: item.get("date", ""), reverse=True)
        cards = []
        for item in selected[:60]:
            item_title = clean_text(item.get("title", {}).get("rendered"))
            item_path = urllib.parse.urlsplit(item.get("link", "")).path
            if not item_title or not item_path:
                continue
            excerpt = clean_text(item.get("excerpt", {}).get("rendered")) or next((s["text"] for s in content_sections(item.get("content", {}).get("rendered", "")) if s["type"] == "paragraph"), "")
            card = {"title": item_title, "href": item_path, "summary": excerpt, "date": item.get("date", "")[:10]}
            card_image = media_for(item, item_title)
            if card_image:
                card["image"] = card_image
            cards.append(card)
        listing_slug = f"audit-{row['audit_id']}-archive"
        route = "/" + path.strip("/") + "/"
        data = {"template": "listing", "slug": listing_slug, "route": route, "title": clean_text(row["title"]) or label, "intro": f"Browse {label.lower()} from Toynbee Hall.", "listingType": listing_type, "pageSize": 12, "items": cards}
        target = existing_by_route.get(route)
        if target and target not in used_files:
            used_files.add(target)
            updated += 1
        else:
            target = OUT / f"audit-{int(row['audit_id']):04d}-archive.json"
            made += 1
        target.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # The status report makes API gaps visible for follow-up, without inventing pages.
    report = [f"Live records imported: {made + updated}", f"Existing page records updated: {updated}", f"New page records added: {made}", f"Audit 404s excluded: {sum(r['http_status'] == '404' for r in rows)}", f"Source records not found: {len(missing)}"]
    report.extend(missing)
    if failures:
        report.extend([f"Batch errors: {len(failures)}", *failures])
    (ROOT / "docs/content-import-report.txt").write_text("\n".join(report) + "\n", encoding="utf-8")
    print("\n".join(report[:8]))


if __name__ == "__main__":
    main()
