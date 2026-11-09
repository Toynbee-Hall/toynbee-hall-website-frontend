export type Link = { label: string; href: string };

/** Media items always carry alt text; use an empty string only for decorative images. */
export type Media = { src: string; alt: string; caption?: string; credit?: string };
export type TintTheme = 'orange' | 'jade' | 'blue' | 'yellow';

export type RichTextBlock = { type: 'richText'; heading?: string; paragraphs: string[] };
export type LongFormBlock = {
  type: 'longForm';
  sections: Array<
    | { type: 'heading'; level?: 2 | 3; text: string }
    | { type: 'paragraph'; text: string; links?: Array<{ text: string; href: string }> }
    | { type: 'list'; ordered?: boolean; items: string[] }
    | { type: 'image'; image: Media }
    | { type: 'quote'; quote: string; attribution?: string }
  >;
};
export type LinkListBlock = { type: 'linkList'; heading?: string; items: { label: string; href: string; description?: string }[] };
export type QuoteBlock = { type: 'quote'; quote: string; attribution?: string; image?: Media };
export type CalloutBlock = { type: 'callout'; heading: string; body: string; link?: Link };
export type HeroBlock = { type: 'hero'; variant?: 'full-bleed'; eyebrow?: string; headingLines: string[]; body?: string; image?: Media; link?: Link; secondaryLink?: Link };
export type CardGridBlock = {
  type: 'cardGrid'; id?: string; eyebrow?: string; heading?: string; numbered?: boolean;
  items: { title: string; description: string; href: string; linkLabel?: string; theme?: TintTheme; image?: Media; meta?: string }[];
};
export type StatementBlock = { type: 'statement'; eyebrow?: string; heading: string; paragraphs?: string[]; link?: Link };
export type NewsListBlock = {
  type: 'newsList'; eyebrow?: string; heading: string; allLink?: Link; readLabel: string;
  items: { title: string; href: string; summary: string; image: Media; category?: string; date?: string; byline?: string; theme?: 'orange' }[];
};
export type ImageTextBlock = { type: 'imageText'; eyebrow?: string; heading: string; paragraphs: string[]; images: Media[]; imagePosition?: 'left' | 'right'; link?: Link };
export type NewsletterSignupBlock = {
  type: 'newsletterSignup'; eyebrow?: string; heading: string; paragraphs: string[];
  privacy?: { text: string; link: Link }; instructions?: string;
  fields: { name: string; label: string; type: 'email' | 'text'; required?: boolean; autoComplete?: string }[];
  submitLabel: string; action?: string;
};
export type EnquiryFormBlock = {
  type: 'enquiryForm'; eyebrow?: string; heading: string; intro?: string; action?: string;
  submitLabel: string; privacy?: Link;
  fields: Array<{ name: string; label: string; type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox'; required?: boolean; options?: string[]; hint?: string }>;
};
export type LogoGridBlock = { type: 'logoGrid'; label: string; heading?: string; logos: Media[] };
export type GalleryBlock = { type: 'imageGallery'; heading?: string; intro?: string; images: Media[] };
export type ImpactStatsBlock = {
  type: 'impactStats'; eyebrow?: string; heading: string; intro?: string;
  stats: { value: string; label: string; detail?: string; source?: Link }[];
};
export type StepsBlock = {
  type: 'steps'; eyebrow?: string; heading: string; intro?: string;
  steps: { title: string; body: string; link?: Link; time?: string }[];
};
export type InfoPanelBlock = {
  type: 'infoPanel'; theme?: 'blue' | 'orange' | 'jade'; heading: string;
  paragraphs?: string[]; items?: string[]; link?: Link;
};
export type ContactRoutesBlock = {
  type: 'contactRoutes'; heading?: string;
  contacts: { name: string; description?: string; email?: string; phone?: string; address?: string; hours?: string; link?: Link }[];
};
export type ScheduleBlock = {
  type: 'schedule'; heading: string; intro?: string; updated?: string;
  rows: { day: string; time: string; activity: string; audience?: string; location?: string; booking?: Link }[];
};
export type Resource = { title: string; href: string; summary?: string; format?: string; fileSize?: string; date?: string };
export type ResourceListBlock = { type: 'resourceList'; heading: string; intro?: string; resources: Resource[] };
export type AccordionBlock = { type: 'accordion'; heading?: string; items: { title: string; body: string; paragraphs?: string[]; links?: Link[] }[] };
export type DonationAppealBlock = {
  type: 'donationAppeal'; eyebrow?: string; heading: string; body: string; impact?: string;
  primaryLink: Link; secondaryLink?: Link;
};
export type RelatedContentBlock = {
  type: 'relatedContent'; heading?: string;
  items: { title: string; href: string; summary?: string; image?: Media; type?: string }[];
};

export type ContentBlock =
  | RichTextBlock | LongFormBlock | LinkListBlock | QuoteBlock | CalloutBlock | HeroBlock
  | CardGridBlock | StatementBlock | NewsListBlock | ImageTextBlock | NewsletterSignupBlock
  | LogoGridBlock | EnquiryFormBlock | GalleryBlock | ImpactStatsBlock | StepsBlock | InfoPanelBlock
  | ContactRoutesBlock | ScheduleBlock | ResourceListBlock | AccordionBlock
  | DonationAppealBlock | RelatedContentBlock;

export type StandardPageContent = {
  template?: 'standard'; slug: string; route?: string; aliases?: string[]; title: string; intro: string;
  image?: Media; layout?: 'default' | 'full-width'; pageCta?: Link | null; blocks: ContentBlock[];
};
export type ArticlePageContent = {
  template: 'article'; slug: string; route?: string; aliases?: string[]; title: string; intro?: string;
  category?: string; publishedAt?: string; updatedAt?: string; author?: string; image?: Media;
  blocks: ContentBlock[]; related?: RelatedContentBlock['items'];
};
export type EventPageContent = {
  template: 'event'; slug: string; route?: string; aliases?: string[]; title: string; intro?: string; image?: Media;
  startsAt?: string; endsAt?: string; dateLabel?: string; timeLabel?: string; venue?: string;
  bookingStatus?: string; bookingLink?: Link; blocks: ContentBlock[];
};
export type ResourcePageContent = {
  template: 'resource'; slug: string; route?: string; aliases?: string[]; title: string; intro?: string;
  category?: string; publishedAt?: string; author?: string; image?: Media;
  downloads: Resource[]; blocks: ContentBlock[]; related?: RelatedContentBlock['items'];
};
export type ListingPageContent = {
  template: 'listing'; slug: string; route?: string; aliases?: string[]; title: string; intro?: string;
  listingType: 'news' | 'blogs' | 'events' | 'resources' | 'category';
  categories?: string[]; pageSize?: number;
  items: Array<{ title: string; href: string; summary?: string; image?: Media; category?: string; date?: string; author?: string; location?: string; format?: string }>;
  blocks?: ContentBlock[];
};
export type PageContent = StandardPageContent | ArticlePageContent | EventPageContent | ResourcePageContent | ListingPageContent;
export type HomePageContent = { blocks: ContentBlock[] };
