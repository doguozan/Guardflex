import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { getProductImage } from '../utils/productImages';

export function ProductSlider() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // İlk 6 ürünü göster
  const featuredProducts = products.slice(0, 6);
  
  // Slider'da gösterilecek ürün sayısı (responsive)
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg: 3 ürün
      if (window.innerWidth >= 768) return 2;  // md: 2 ürün
      return 1; // sm: 1 ürün
    }
    return 3;
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
    <section className="section-padding bg-black py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Daha kompakt */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-3 animate-fade-in">
            <span className="text-emerald-500 text-xs sm:text-sm">Unsere Produkte</span>
          </div>
          <h2 className="text-white mb-2 sm:mb-3 text-xl sm:text-2xl lg:text-3xl animate-slide-up">
            Beliebte Produkte
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto animate-fade-in-delay">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-8 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
            aria-label="Vorherige Produkte"
            style={{ 
              opacity: isTransitioning ? 0.5 : 1,
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              pointerEvents: isTransitioning ? 'none' : 'auto'
            }}
          >
            <ChevronLeft className="text-white" size={18} />
          </button>

          <button
            onClick={goToNext}
            onMouseDown={(e) => e.preventDefault()}
            type="button"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-8 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
            aria-label="Nächste Produkte"
            style={{ 
              opacity: isTransitioning ? 0.5 : 1,
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              pointerEvents: isTransitioning ? 'none' : 'auto'
            }}
          >
            <ChevronRight className="text-white" size={18} />
          </button>

          {/* Products Slider - Daha kompakt gap ve smooth animasyon */}
          <div className="overflow-hidden rounded-xl">
            <div
              ref={sliderRef}
              className="flex transition-transform gap-3 sm:gap-4 touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                willChange: 'transform',
                transitionDuration: '400ms',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                touchAction: 'pan-y pinch-zoom',
              }}
            >
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 group flex-shrink-0 transform hover:-translate-y-2"
                  style={{
                    width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 12 / visibleCount}px)`,
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="aspect-square overflow-hidden bg-gray-800/50 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <img
                      src={getProductImage(product.image)}
                      alt={`${product.name} - Fliegengitter oder Sonnenschutz von GuardFlex`}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ 
                        contentVisibility: 'auto',
                      }}
                    />
                  </div>
                  <div className="p-[10px]">
                    <div className="text-emerald-400 text-xs mb-1.5 font-medium animate-fade-in">
                      {product.category}
                    </div>
                    <h3 className="text-white mb-1.5 sm:mb-2 text-sm sm:text-base line-clamp-2 group-hover:text-emerald-400 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <button className="text-emerald-500 hover:text-emerald-400 transition-all duration-300 text-xs sm:text-sm font-medium group-hover:translate-x-1 inline-flex items-center gap-1">
                      Details anzeigen
                      <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator - Daha kompakt */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
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
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'bg-emerald-500 w-6 sm:w-8 shadow-lg shadow-emerald-500/50'
                    : 'bg-gray-700 hover:bg-gray-600 w-1.5 sm:w-2'
                }`}
                aria-label={`Gehe zu Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button - Daha kompakt */}
        <div className="text-center mt-8 sm:mt-10">
          <button
            onClick={() => navigate('/products')}
            className="bg-emerald-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/30 text-sm sm:text-base font-medium"
          >
            Alle Produkte anzeigen
          </button>
        </div>
      </div>
    </section>
  );
}

