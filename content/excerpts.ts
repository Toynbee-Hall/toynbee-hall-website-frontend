const excerptSuffix = /\s*(?:\[\s*(?:…|\.{3})\s*\]|(?:…|\.{3})\s*(?:read more|continue reading))\s*$/i;

export function displayExcerpt(text?: string, preferCompleteSentence = false) {
  const excerpt = text?.trim();
  if (!excerpt || !excerptSuffix.test(excerpt)) return excerpt;

  const copy = excerpt.replace(excerptSuffix, '').trimEnd();
  if (preferCompleteSentence) {
    const end = [...copy.matchAll(/[.!?](?=\s+[A-Z]|$)/g)].at(-1);
    if (end?.index !== undefined) return copy.slice(0, end.index + 1);
  }
  return copy ? `${copy}…` : undefined;
}
