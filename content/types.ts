export type RichTextBlock = {
  type: 'richText';
  heading?: string;
  paragraphs: string[];
};

export type LinkListBlock = {
  type: 'linkList';
  heading?: string;
  items: { label: string; href: string; description?: string }[];
};

export type QuoteBlock = {
  type: 'quote';
  quote: string;
  attribution?: string;
};

export type CalloutBlock = {
  type: 'callout';
  heading: string;
  body: string;
  link?: { label: string; href: string };
};

export type ContentBlock = RichTextBlock | LinkListBlock | QuoteBlock | CalloutBlock;

export type PageContent = {
  slug: string;
  title: string;
  intro: string;
  blocks: ContentBlock[];
};
