import { useState, useEffect } from 'react';

/**
 * Optimize edilmiş responsive görsel bileşeni
 * - srcSet ve sizes desteği ile responsive görseller
 * - Lazy loading optimizasyonu
 * - WebP format desteği (gelecekte eklenebilir)
 * - Mobil için optimize edilmiş yükleme
 */
export function ResponsiveImage({
  src,
  alt,
  className = '',
  style = {},
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes,
  srcSet,
  onLoad,
  onError,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');

  // Intersection Observer ile görsel görünür olduğunda yükle
  useEffect(() => {
    if (loading === 'eager' || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // 50px önceden yükle
        threshold: 0.01,
      }
    );

    const imgElement = document.querySelector(`[data-img-src="${src}"]`);
    if (imgElement) {
      observer.observe(imgElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, loading, isInView]);

  // Varsayılan sizes değeri (mobil için optimize)
  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  // srcSet oluştur (eğer verilmemişse)
  const generateSrcSet = () => {
    if (srcSet) return srcSet;
    
    // Eğer srcSet yoksa, mobil için optimize edilmiş tek görsel kullan
    // Gelecekte burada farklı boyutlarda görseller oluşturulabilir
    return undefined;
  };

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  // Hata durumunda fallback göster
  if (hasError) {
    return (
      <div
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={style}
        data-img-src={src}
      >
        <svg
          className="w-12 h-12 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      data-img-src={src}
    >
      {/* Placeholder (blur effect) */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}

      {/* Görsel */}
      {(isInView || loading === 'eager') && (
        <img
          src={src}
          srcSet={generateSrcSet()}
          sizes={defaultSizes}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
          {...rest}
        />
      )}
    </div>
  );
}

