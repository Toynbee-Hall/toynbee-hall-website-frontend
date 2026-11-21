import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import StyleGuide from '../../components/StyleGuide';
import { brandFont } from '../brand-font';
import '../brand-inventory.css';

export const metadata = {
  title: 'Website style guide | Toynbee Hall',
  description: 'Visual reference for Toynbee Hall website colors, typography and reusable components.'
};

export default function StyleGuidePage() {
  return <><SiteHeader/><main id="main" className={brandFont.variable}><StyleGuide/></main><SiteFooter/></>;
}
