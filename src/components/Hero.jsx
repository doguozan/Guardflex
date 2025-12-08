import { useEffect } from 'react';
import heroImage from '../assets/hero-section.png';

export function Hero() {
  // Hero görselini preload et (kritik görsel)
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImage;
    link.fetchPriority = 'high';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <section id="hero" className="relative bg-black">
        {/* Background Image with Overlay */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]">
          <img
            src={heroImage}
            alt="GuardFlex Fliegengitter und Sonnenschutz - Qualität aus der Schweiz"
            className="w-full h-full object-cover opacity-70"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            sizes="100vw"
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

