import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import defaultHeroImage from '../assets/hero-section.png';
import { useSiteContent } from '../context/SiteContentContext';
import { DEFAULT_SITE } from '../data/siteContentDefaults';

export function Hero() {
  const { site } = useSiteContent();
  const heroImage = useMemo(() => {
    const u = site?.hero?.image?.trim?.();
    return u || defaultHeroImage;
  }, [site?.hero?.image]);

  const headlineHtml =
    site?.hero?.headline?.trim?.() ||
    site?.hero?.title?.trim?.() ||
    DEFAULT_SITE.hero.headline;

  const [imageLoaded, setImageLoaded] = useState(false);

  // Hero görselini preload et (kritik görsel) - Mobilde hemen yükle
  useEffect(() => {
    // Preload link ekle
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImage;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);

    // Görseli önceden yükle - Mobilde hemen
    const img = new Image();
    img.src = heroImage;
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Hata olsa bile görseli göster
      setImageLoaded(true);
    };
    
    // Mobilde timeout ile de garanti altına al
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      const timeoutId = setTimeout(() => {
        setImageLoaded(true);
      }, 200);
      
      return () => {
        clearTimeout(timeoutId);
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [heroImage]);

  return (
    <>
      <section id="hero" className="relative bg-white">
        {/* Background Image with Overlay */}
        <div className="hero-media relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]">
          {/* Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
          <img
            src={heroImage}
            alt="GuardFlex Fliegengitter und Sonnenschutz - Qualität aus der Schweiz"
            className={`hero-media-img w-full h-full object-cover opacity-70 transition-opacity duration-300 ${
              imageLoaded ? 'opacity-70' : 'opacity-0'
            }`}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            sizes="100vw"
            onLoad={() => setImageLoaded(true)}
            style={{
              contentVisibility: 'auto',
              containIntrinsicSize: '100vw 60vh'
            }}
          />
          <div className="absolute inset-0 bg-white/30"></div>
          <div className="absolute inset-0 flex flex-col items-center text-center justify-center px-6 gap-6">
            <div
              className="hero-headline tracking-wide drop-shadow text-[1rem] sm:text-[2rem] max-w-[90vw] sm:max-w-none"
              style={{
                color: '#fff',
                fontSize: '3.5vw',
                lineHeight: '1.25',
                fontWeight: 700,
                maxWidth: 'min(80vw, 850px)'
              }}
              dangerouslySetInnerHTML={{ __html: headlineHtml }}
            />
            <Link
              to="/contact"
              className="rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-600 hover:scale-105 active:scale-95"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'max-content',
                padding: '10px 40px',
                fontSize: '18px',
                fontWeight: 600
              }}
            >
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

