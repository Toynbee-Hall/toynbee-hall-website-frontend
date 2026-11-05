import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { HomeHero, ServiceGrid, MissionSection, NewsSection, VenueSection, NewsletterSection } from '../components/HomeSections';

export default function Home() {
  return <><SiteHeader/><main id="main"><HomeHero/><ServiceGrid/><MissionSection/><NewsSection/><VenueSection/><NewsletterSection/></main><SiteFooter/></>;
}
