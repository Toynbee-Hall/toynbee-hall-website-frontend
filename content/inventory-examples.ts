import homepage from './homepage.json';
import advice from './pages/free-advice.json';
import contact from './pages/contact-us.json';
import housing from './pages/housing.json';
import education from './pages/audit-0499-more-than-just-education.json';
import support from './pages/support-us.json';
import about from './pages/about-us.json';
import type { ContentBlock } from './types';

const home = homepage.blocks as ContentBlock[];
const adviceBlocks = advice.blocks as ContentBlock[];
const hero = home.find(block => block.type === 'hero');
const newsletter = home.find(block => block.type === 'newsletterSignup');
const venue = home.find(block => block.type === 'imageText');

export const editorialExamples = {
  editorialImage: {
    type: 'imageText',
    variant: 'editorial',
    eyebrow: 'Community Centre',
    heading: 'A place to',
    headingAccent: 'come together.',
    paragraphs: ['Meet people, try something new or share a skill at Toynbee Hall’s Community Centre.'],
    images: [{
      src: '/images/live-site/community.jpg',
      alt: 'Community Centre participants holding up colourful artwork',
    }],
    imagePosition: 'right',
    link: { label: 'Explore the Community Centre', href: '/community-centre/' },
  },
  connectedSteps: {
    type: 'steps',
    variant: 'connected',
    heading: 'Find the right advice',
    steps: [
      { title: 'Choose a topic', body: 'Start with the advice area that best matches your question.', icon: '/images/advice-icons/topic-outline.svg' },
      { title: 'Check what support is available', body: 'Read what the service covers and who it can help.', icon: '/images/advice-icons/support-outline.svg' },
      { title: 'Get in touch', body: 'Use the contact route for that service.', icon: '/images/advice-icons/contact-outline.svg', link: { label: 'Explore advice services', href: '/free-advice/' } },
    ],
  },
  editorialQuote: {
    type: 'quote',
    variant: 'editorial',
    quote: 'I want people to know that there’s help out there, however hard you think it is.',
    attribution: 'Debt Free Advice client',
  },
} satisfies Record<string, ContentBlock>;

export const inventoryExamples: Record<string, ContentBlock | undefined> = {
  ...editorialExamples,
  hero: hero && { ...hero, link: { label: 'I am looking for…', href: '/#looking-for' } },
  pathways: adviceBlocks.find(block => block.type === 'cardGrid'),
  homepagePathways: home.find(block => block.type === 'cardGrid' && block.variant === 'pathways'),
  image: venue && {
    ...venue,
    variant: undefined,
    heading: 'Hire our venue',
    headingAccent: undefined,
    imagePosition: 'left',
  },
  captionedImage: {
    type: 'imageGallery',
    heading: 'Community Centre activities',
    images: [
      {
        src: '/images/live-site/community.jpg',
        alt: 'Community Centre participants holding up colourful artwork',
        caption: 'Artwork made together at the Community Centre.',
      },
      {
        src: '/images/live-site/yoga.jpg',
        alt: 'A group taking part in seated exercise at the Community Centre',
        caption: 'Seated exercise at the Community Centre.',
      },
    ],
  },
  cards: (support.blocks as ContentBlock[]).find(block => block.type === 'cardGrid'),
  values: (about.blocks as ContentBlock[]).find(block => block.type === 'cardGrid' && block.imageStyle === 'icon'),
  statement: home.find(block => block.type === 'statement'),
  splitBanner: venue && venue.type === 'imageText' ? {
    type: 'splitBanner',
    eyebrow: venue.eyebrow,
    heading: `${venue.heading} ${venue.headingAccent ?? ''}`.trim(),
    body: 'Our Grade II listed building in East London is available to hire for conferences, seminars, receptions, training sessions, weddings and celebrations.',
    image: venue.images[0],
    link: venue.link,
  } : undefined,
  stats: {
    type: 'impactStats',
    heading: 'Toynbee Hall in numbers',
    stats: [
      { value: '1884', label: 'Founded in East London', source: { label: 'Our history', href: '/our-history/' } },
      { value: '2024–25', label: 'Impact reporting period', source: { label: 'Our impact', href: '/our-impact/' } },
    ],
  },
  listing: home.find(block => block.type === 'newsList'),
  quote: adviceBlocks.find(block => block.type === 'quote' && !block.variant),
  rich: (housing.blocks as ContentBlock[]).find(block => block.type === 'richText'),
  steps: {
    type: 'steps',
    heading: 'Find the right advice',
    steps: editorialExamples.connectedSteps.steps,
  },
  eligibility: adviceBlocks.find(block => block.type === 'infoPanel'),
  callout: {
    type: 'callout',
    heading: 'Planning an event?',
    body: 'Explore the halls and meeting rooms at Toynbee Hall.',
    link: { label: 'Explore venue hire', href: '/events/' },
  },
  contact: (contact.blocks as ContentBlock[]).find(block => block.type === 'contactRoutes'),
  accordion: {
    type: 'accordion',
    items: [{ title: 'How do I get to Toynbee Hall?', body: 'Toynbee Hall is on Commercial Street in East London.', links: [{ label: 'Directions and transport', href: '/how-to-find-us/' }] }],
  },
  schedule: {
    type: 'schedule',
    heading: 'Example weekly schedule',
    intro: 'Sample rows show how a timetable is presented.',
    rows: [
      { day: 'Monday', time: '11am', activity: 'Yoga', audience: 'Over 50s', location: 'Community Centre' },
      { day: 'Friday', time: '2pm', activity: 'Film Club', location: 'Community Centre' },
    ],
  },
  downloads: { type: 'resourceList', heading: 'Research and reports', resources: education.downloads },
  related: {
    type: 'relatedContent',
    heading: 'Explore next',
    items: [
      { title: 'Community Centre', href: '/community-centre/', summary: 'Find out about the centre and its activities.' },
      { title: 'What’s on', href: '/whats-on/', summary: 'Find the weekly timetable and local activities.' },
    ],
  },
  links: adviceBlocks.find(block => block.type === 'linkList'),
  logos: home.find(block => block.type === 'logoGrid'),
  donate: {
    type: 'donationAppeal',
    heading: 'Support Toynbee Hall',
    body: 'Help people across East London access advice, practical support and community activities.',
    primaryLink: { label: 'Make a donation', href: '/donate/' },
    secondaryLink: { label: 'Other ways to support us', href: '/support-us/' },
  },
  newsletter: newsletter && { ...newsletter, action: undefined },
  form: {
    type: 'enquiryForm',
    heading: 'Send an enquiry',
    intro: 'This example does not send messages.',
    fields: [
      { name: 'email', label: 'Email address', type: 'email', required: true },
      { name: 'message', label: 'Your message', type: 'textarea', required: true },
    ],
    submitLabel: 'Send enquiry',
  },
};
