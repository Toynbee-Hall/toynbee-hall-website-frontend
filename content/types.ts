export type Link = { label: string; href: string };

/** Media items always carry alt text; use an empty string only for decorative images. */
export type Media = { src: string; alt: string; caption?: string };

/** Approved pale brand tints for card surfaces (see content/design-tokens.json). */
export type TintTheme = 'orange' | 'jade' | 'blue' | 'yellow';

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
  link?: Link;
};

/** Inventory 1: hero / page introduction. The last heading line is highlighted in orange. */
export type HeroBlock = {
  type: 'hero';
  eyebrow?: string;
  headingLines: string[];
  body?: string;
  image: Media;
  link?: Link;
};

/** Inventory 2: audience pathway / service card grid. */
export type CardGridBlock = {
  type: 'cardGrid';
  id?: string;
  eyebrow?: string;
  heading?: string;
  numbered?: boolean;
  items: { title: string; description: string; href: string; linkLabel?: string; theme?: TintTheme }[];
};

/** Navy information feature for a mission or key statement. */
export type StatementBlock = {
  type: 'statement';
  eyebrow?: string;
  heading: string;
  paragraphs?: string[];
  link?: Link;
};

/** Inventory 8: news, story or event listing. The first item is shown as the featured card. */
export type NewsListBlock = {
  type: 'newsList';
  eyebrow?: string;
  heading: string;
  allLink?: Link;
  readLabel: string;
  items: {
    title: string;
    href: string;
    summary: string;
    image: Media;
    category?: string;
    date?: string;
    byline?: string;
    theme?: 'orange';
  }[];
};

/** Inventory 3: image-and-text feature. Supports one or two images. */
export type ImageTextBlock = {
  type: 'imageText';
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  images: Media[];
  imagePosition?: 'left' | 'right';
  link?: Link;
};

/** Inventory 20: newsletter signup. Without an `action` the form does not submit. */
export type NewsletterSignupBlock = {
  type: 'newsletterSignup';
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  /** Privacy notice shown with the introduction; the link follows the text inline. */
  privacy?: { text: string; link: Link };
  instructions?: string;
  fields: { name: string; label: string; type: 'email' | 'text'; required?: boolean; autoComplete?: string }[];
  submitLabel: string;
  action?: string;
};

/** Funder, partner or accreditation logos. `label` names the section for assistive technology. */
export type LogoGridBlock = {
  type: 'logoGrid';
  label: string;
  heading?: string;
  logos: Media[];
};

export type ContentBlock =
  | RichTextBlock
  | LinkListBlock
  | QuoteBlock
  | CalloutBlock
  | HeroBlock
  | CardGridBlock
  | StatementBlock
  | NewsListBlock
  | ImageTextBlock
  | NewsletterSignupBlock
  | LogoGridBlock;

export type PageContent = {
  slug: string;
  title: string;
  intro: string;
  blocks: ContentBlock[];
};

/** The homepage is composed entirely from blocks, without the standard page hero/sidebar template. */
export type HomePageContent = {
  blocks: ContentBlock[];
};
