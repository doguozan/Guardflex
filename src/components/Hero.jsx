import { useEffect, useState } from 'react';
import heroImage from '../assets/hero-section.png';

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Hero görselini preload et (kritik görsel)
  useEffect(() => {
    // Preload link ekle
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImage;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);

    // Görseli önceden yükle
    const img = new Image();
    img.src = heroImage;
    img.onload = () => {
      setImageLoaded(true);
    };

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
        </div>
      </section>
    </>
  );
}

