import type { Metadata } from 'next';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import ContentBlockInventory from '../../components/ContentBlockInventory';

export const metadata: Metadata = {
  title: 'Content block inventory | Toynbee Hall',
  description: 'Visual reference for the reusable content blocks used to build Toynbee Hall pages.'
};

export default function ContentBlockInventoryPage() {
  return <><SiteHeader/><main id="main"><ContentBlockInventory/></main><SiteFooter/></>;
}
