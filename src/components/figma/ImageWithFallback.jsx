import React, { useState, useEffect, useRef } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  // Mobilde başlangıçta true yap - hemen yükle
  const isMobileInitial = typeof window !== 'undefined' && window.innerWidth < 768
  const [isInView, setIsInView] = useState(props.loading === 'eager' || isMobileInitial)
  const imgRef = useRef(null)

  const { src, alt, style, className, loading = 'lazy', decoding = 'async', sizes, fetchpriority = 'auto', ...rest } = props

  // Preload TÜM görseller için (özellikle mobilde)
  useEffect(() => {
    if (!src || typeof document === 'undefined') return
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    
    // Mobilde TÜM görselleri preload et, desktop'ta eager olanları
    if (loading === 'eager' || isMobile) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      // Mobilde veya high priority olanlarda fetchpriority ekle
      if (fetchpriority === 'high' || isMobile) {
        link.setAttribute('fetchpriority', isMobile ? 'high' : fetchpriority)
      }
      document.head.appendChild(link)
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      }
    }
  }, [src, loading, fetchpriority])

      // Intersection Observer ile görsel görünür olduğunda yükle (lazy loading için)
  useEffect(() => {
    if (loading === 'eager' || isInView || !imgRef.current) return

    // Mobil cihaz kontrolü
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    
    // Mobilde görselin görünür olup olmadığını manuel kontrol et
    const checkVisibility = () => {
      if (!imgRef.current) return false
      const rect = imgRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      // Mobilde çok daha geniş alan kontrol et (ekranın 5 katı kadar - tüm görselleri kapsar)
      const margin = isMobile ? viewportHeight * 5 : viewportHeight * 2
      return (
        rect.top < viewportHeight + margin &&
        rect.bottom > -margin &&
        rect.left < window.innerWidth + margin &&
        rect.right > -margin
      )
    }

    // İlk yüklemede görsel zaten görünürse hemen yükle
    if (checkVisibility()) {
      setIsInView(true)
      return
    }

    // MOBİLDE: Tüm görselleri HEMEN yükle - lazy loading tamamen devre dışı
    if (isMobile) {
      // Mobilde tüm görselleri hemen yükle (lazy loading yok)
      setIsInView(true)
      return
    }

    // Desktop için agresif lazy loading
    const rootMargin = '1000px' // Desktop'ta çok erken yükle

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    )

    const currentRef = imgRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    // Scroll ve resize event'lerinde de kontrol et
    const handleScroll = () => {
      if (checkVisibility() && !isInView) {
        setIsInView(true)
        observer.disconnect()
      }
    }

    // Desktop'ta da sık kontrol et
    const checkInterval = setInterval(() => {
      if (checkVisibility() && !isInView) {
        setIsInView(true)
        observer.disconnect()
        clearInterval(checkInterval)
      }
    }, 50) // Daha sık kontrol (50ms)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      clearInterval(checkInterval)
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [loading, isInView, src])

  const handleError = () => {
    if (import.meta.env.DEV) {
      console.warn('ImageWithFallback: Failed to load image', {
        src,
        isDev: import.meta.env.DEV,
        isProd: import.meta.env.PROD,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        location: typeof window !== 'undefined' ? window.location.href : 'unknown'
      })
    }
    setDidError(true)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full" ref={imgRef}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      {/* Görsel - Mobilde her zaman render et, desktop'ta lazy loading */}
      {(isInView || loading === 'eager') && (
        <img 
          src={src} 
          alt={alt} 
          className={`${className ?? ''} transition-opacity duration-200 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={style} 
          loading={isMobileInitial || loading === 'eager' ? 'eager' : 'lazy'}
          decoding={decoding}
          fetchpriority={isMobileInitial || fetchpriority === 'high' ? 'high' : fetchpriority}
          sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
          width={rest.width || 400}
          height={rest.height || 400}
          {...rest} 
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  )
}

