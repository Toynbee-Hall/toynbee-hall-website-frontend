import type { PageContent } from './types';
import routes from './routes.json';
import page0 from './pages/about-us.json';
import page1 from './pages/advice-hub.json';
import page2 from './pages/benefits.json';
import page3 from './pages/blogs.json';
import page4 from './pages/childrens-activities.json';
import page5 from './pages/city-advice.json';
import page6 from './pages/community-centre.json';
import page7 from './pages/contact-us.json';
import page8 from './pages/coproducing-universal-credit-disability-benefits.json';
import page9 from './pages/corporate-partnerships.json';
import page10 from './pages/debt-and-money.json';
import page11 from './pages/donate.json';
import page12 from './pages/emotional-support-for-young-people.json';
import page13 from './pages/employment.json';
import page14 from './pages/event-catering.json';
import page15 from './pages/events-blogs.json';
import page16 from './pages/events.json';
import page17 from './pages/free-advice.json';
import page18 from './pages/fundraise-for-us.json';
import page19 from './pages/housing.json';
import page20 from './pages/how-to-find-us.json';
import page21 from './pages/how-we-work-with-local-people.json';
import page22 from './pages/join-our-team.json';
import page23 from './pages/linkage-plus.json';
import page24 from './pages/macmillan-benefits-advice.json';
import page25 from './pages/news-and-blogs.json';
import page26 from './pages/news.json';
import page27 from './pages/our-approach.json';
import page28 from './pages/our-commitment-to-our-supporters.json';
import page29 from './pages/our-history.json';
import page30 from './pages/our-impact.json';
import page31 from './pages/our-strategy.json';
import page32 from './pages/our-team.json';
import page33 from './pages/over-50s-activities.json';
import page34 from './pages/public-art-projections.json';
import page35 from './pages/research-library.json';
import page36 from './pages/research.json';
import page37 from './pages/reshaping-temporary-accommodation.json';
import page38 from './pages/senior-management-team.json';
import page39 from './pages/support-us.json';
import page40 from './pages/take-part.json';
import page41 from './pages/the-ashbee-hall.json';
import page42 from './pages/the-lecture-hall.json';
import page43 from './pages/the-meeting-rooms.json';
import page44 from './pages/trustees.json';
import page45 from './pages/volunteer.json';
import page46 from './pages/whats-on.json';
import page47 from './pages/young-people-activities.json';

const rawPages = {
  'about-us': page0,
  'advice-hub': page1,
  'benefits': page2,
  'blogs': page3,
  'childrens-activities': page4,
  'city-advice': page5,
  'community-centre': page6,
  'contact-us': page7,
  'coproducing-universal-credit-disability-benefits': page8,
  'corporate-partnerships': page9,
  'debt-and-money': page10,
  'donate': page11,
  'emotional-support-for-young-people': page12,
  'employment': page13,
  'event-catering': page14,
  'events-blogs': page15,
  'events': page16,
  'free-advice': page17,
  'fundraise-for-us': page18,
  'housing': page19,
  'how-to-find-us': page20,
  'how-we-work-with-local-people': page21,
  'join-our-team': page22,
  'linkage-plus': page23,
  'macmillan-benefits-advice': page24,
  'news-and-blogs': page25,
  'news': page26,
  'our-approach': page27,
  'our-commitment-to-our-supporters': page28,
  'our-history': page29,
  'our-impact': page30,
  'our-strategy': page31,
  'our-team': page32,
  'over-50s-activities': page33,
  'public-art-projections': page34,
  'research-library': page35,
  'research': page36,
  'reshaping-temporary-accommodation': page37,
  'senior-management-team': page38,
  'support-us': page39,
  'take-part': page40,
  'the-ashbee-hall': page41,
  'the-lecture-hall': page42,
  'the-meeting-rooms': page43,
  'trustees': page44,
  'volunteer': page45,
  'whats-on': page46,
  'young-people-activities': page47,
};
export const pages = rawPages as unknown as Record<string, PageContent>;
export const genericRoutes = routes as string[];
