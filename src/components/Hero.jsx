import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-section.png';

export function Hero() {
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
  }, []);

  return (
    <>
      <section id="hero" className="relative bg-black">
        {/* Background Image with Overlay */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]">
          {/* Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-900 animate-pulse" />
          )}
          <img
            src={heroImage}
            alt="GuardFlex Fliegengitter und Sonnenschutz - Qualität aus der Schweiz"
            className={`w-full h-full object-cover opacity-70 transition-opacity duration-300 ${
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
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center gap-6">
            <p className="max-w-4xl text-white font-semibold tracking-wide drop-shadow text-[1rem] sm:text-[2rem]">
              Massgefertigte Lösungen für Insektenschutz, Sonnenschutz und Sichtschutz
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-white font-semibold shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-600 hover:scale-105 active:scale-95"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

