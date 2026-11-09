import images from '../content/page-banner-images.json';
import { displayExcerpt } from '../content/excerpts';
import site from '../content/site.json';
import type { StandardPageContent } from '../content/types';
import PageBannerMedia from './PageBannerMedia';

type BannerContent = Pick<StandardPageContent, 'slug' | 'route' | 'title' | 'intro' | 'image'> & {
  variant: 'watermark' | 'frame';
};

const sectionImages = images.sections
  .flatMap(({ paths, image }) => paths.map(path => ({ path, image })))
  .sort((a, b) => b.path.length - a.path.length);

export default function PageBanner({ slug, route, title, intro, image, variant }: BannerContent) {
  const path = '/' + (route ?? slug).split('/').filter(Boolean).join('/');
  const fallback = sectionImages.find(section => path === section.path || path.startsWith(section.path + '/'))?.image ?? images.default;
  const photo = image ?? fallback;
  const summary = displayExcerpt(intro, true);

  return <header className={`page-hero page-hero-${variant}`}>
    <div className={`banner-layout banner-layout-${variant} page-hero-inner`}>
      <div className="banner-layout-copy">
        <p className="banner-layout-label">{site.shared.pageEyebrow}</p>
        <h1>{title}</h1>
        {summary && <p>{summary}</p>}
      </div>
      <PageBannerMedia key={photo.src} image={photo} fallback={fallback}/>
    </div>
  </header>;
}
