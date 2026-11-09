'use client';

import { useEffect, useRef, useState } from 'react';
import type { Media } from '../content/types';

export default function PageBannerMedia({ image, fallback }: { image: Media; fallback: Media }) {
  const img = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  const canFallBack = image.src !== fallback.src;
  const photo = failed && canFallBack ? fallback : image;

  useEffect(() => {
    // The initial request can fail before React attaches the error handler.
    if (canFallBack && img.current?.complete && img.current.naturalWidth === 0) setFailed(true);
  }, [canFallBack]);

  return <figure className="banner-layout-media">
    <img ref={img} src={photo.src} alt={photo.alt} onError={canFallBack && !failed ? () => setFailed(true) : undefined}/>
    {(photo.caption || photo.credit) && <figcaption>
      {photo.caption}{photo.caption && photo.credit && ' · '}{photo.credit && `Photo: ${photo.credit}`}
    </figcaption>}
  </figure>;
}
