import type { Metadata } from 'next';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import BrandBlockInventory from '../../components/BrandBlockInventory';
import { brandFont } from '../brand-font';
import '../brand-inventory.css';

export const metadata: Metadata = {
  title: 'Content block inventory: brand guidelines | Toynbee Hall',
  description: 'The reusable Toynbee Hall content blocks, styled only with the 2024 brand guidelines.'
};

export default function BrandContentBlockInventoryPage() {
  return <><SiteHeader/><main id="main" className={brandFont.variable}><BrandBlockInventory/></main><SiteFooter/></>;
}
