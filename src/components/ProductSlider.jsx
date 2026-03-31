import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductImage } from '../utils/productImages';
import { api } from '../utils/api';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { products as staticProducts } from '../data/products';

export function ProductSlider() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Load products - Önce statik veriyi göster, sonra API'den güncelle
  useEffect(() => {
    // Hemen statik veriyi göster (görseller hemen yüklensin)
    setProducts(staticProducts.slice(0, 6));
    setLoading(false);
    
    // Arka planda API'den güncelle
    const loadProducts = async () => {
      try {
        const data = await api.getProducts();
        // API başarılı dönerse güncelle
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.slice(0, 6));
        }
      } catch (err) {
        // Hata olursa sessizce statik veriyi kullan (zaten set edilmiş)
        if (import.meta.env.DEV) {
          console.warn('ProductSlider: API error, using static data:', err);
        }
      }
    };

    loadProducts();
  }, []);

  // İlk 6 ürünü göster
  const featuredProducts = products;
  
  // Slider'da gösterilecek ürün sayısı (responsive)
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4;   // xl: 4 kart
      if (window.innerWidth >= 1024) return 3;  // lg: 3 kart (1024-1280px)
      if (window.innerWidth >= 768) return 2;    // md: 2 kart (768-1024px)
      return 1;                                  // mobil: 1 kart
    }
    return 4;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  // Window resize event listener
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    window.addEventListener('resize', handleResize);
    // Initial set
    setVisibleCount(getVisibleCount());
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, featuredProducts.length - visibleCount);

  const goToPrevious = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleProductClick = (productId) => {
    navigate('/products', { state: { productId } });
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Minimum swipe distance in pixels

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swipe left - go to next
        goToNext();
      } else {
        // Swipe right - go to previous
        goToPrevious();
      }
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className="section-padding bg-white py-12 sm:py-16">
      <div className="site-container">
        {/* Section Header - Daha kompakt */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-3 animate-fade-in">
            <span className="text-emerald-500 text-sm">Unsere Produkte</span>
          </div>
          <h2 className="text-gray-900 mb-2 sm:mb-3 text-xl sm:text-2xl lg:text-3xl animate-slide-up">
            Beliebte Produkte
          </h2>
          <p className="text-gray-600 text-sm lg:text-lg max-w-3xl mx-auto animate-fade-in-delay">
            Entdecken Sie unsere hochwertigen Fliegengitter-, Sonnenschutz- und Plissee-Lösungen
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons - Daha kompakt ve animasyonlu */}
          <button
            onClick={goToPrevious}
            onMouseDown={(e) => e.preventDefault()}
            type="button"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-8 z-10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
            aria-label="Vorherige Produkte"
            style={{ 
              backgroundColor: '#000',
              color: '#fff',
              width: 34,
              height: 34,
              opacity: isTransitioning ? 0.5 : 1,
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              pointerEvents: isTransitioning ? 'none' : 'auto'
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={goToNext}
            onMouseDown={(e) => e.preventDefault()}
            type="button"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-8 z-10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
            aria-label="Nächste Produkte"
            style={{ 
              backgroundColor: '#000',
              color: '#fff',
              width: 34,
              height: 34,
              opacity: isTransitioning ? 0.5 : 1,
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              pointerEvents: isTransitioning ? 'none' : 'auto'
            }}
          >
            <ChevronRight size={18} />
          </button>

          {/* Products Slider - Daha kompakt gap ve smooth animasyon */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Produkte werden geladen...</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Keine Produkte verfügbar.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl">
              <div
                ref={sliderRef}
                className="flex transition-transform touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  gap: '20px',
                  transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                  willChange: 'transform',
                  transitionDuration: '400ms',
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                  touchAction: 'pan-y pinch-zoom',
                }}
              >
                {featuredProducts.map((product, index) => (
                  <div
                    key={product._id || product.id}
                    onClick={() => handleProductClick(product._id || product.id)}
                    className="bg-white backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 group flex-shrink-0 transform hover:-translate-y-2"
                    style={{
                      width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 20 / visibleCount}px)`,
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="aspect-square overflow-hidden bg-gray-100 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <ImageWithFallback
                        src={getProductImage(product.image)}
                        alt={`${product.name} - Fliegengitter oder Sonnenschutz von GuardFlex`}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="eager"
                        fetchpriority="high"
                        decoding="async"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        width={400}
                        height={400}
                      />
                    </div>
                    <div style={{ padding: '16px' }}>
                      <div
                        className="text-sm animate-fade-in"
                        style={{
                          backgroundColor: 'oklch(0.77 0.18 163.22 / 0.13)',
                          width: 'fit-content',
                          borderRadius: '20px',
                          fontWeight: 500,
                          padding: '3px 8px',
                          color: '#10b981',
                          marginBottom: '6px',
                        }}
                      >
                        {product.category}
                      </div>
                      <h3
                        className="line-clamp-2 group-hover:text-emerald-400 transition-colors duration-300"
                        style={{ color: '#111827', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.4, height: 55 }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 sm:mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <button
                        className="text-emerald-500 hover:text-emerald-400 transition-all duration-300 text-sm font-medium group-hover:translate-x-1 inline-flex items-center gap-1 cursor-pointer"
                        style={{ padding: '4px 8px', border: '1px solid rgb(0, 188, 125)', borderRadius: '4px', fontSize: '14px' }}
                      >
                        Details anzeigen
                        <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 sm:mt-8" style={{ gap: '6px' }}>
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsTransitioning(false), 300);
                  }
                }}
                className={`rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                    : ''
                }`}
                style={{
                  width: index === currentIndex ? 22 : 10,
                  height: 10,
                  backgroundColor: index === currentIndex ? undefined : '#ddd',
                }}
                aria-label={`Gehe zu Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button - Daha kompakt */}
        <div className="text-center mt-8 sm:mt-10">
          <button
            onClick={() => navigate('/products')}
            className="bg-emerald-500 text-white px-6 sm:px-8 rounded-full hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/30"
            style={{ height: 40, fontSize: 14, fontWeight: 600 }}
          >
            Alle Produkte anzeigen
          </button>
        </div>
      </div>
    </section>
  );
}

