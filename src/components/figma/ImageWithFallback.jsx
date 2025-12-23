import React, { useState, useEffect, useRef } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(props.loading === 'eager')
  const imgRef = useRef(null)

  const { src, alt, style, className, loading = 'lazy', decoding = 'async', sizes, fetchpriority = 'auto', ...rest } = props

  // Preload kritik görseller için (eager loading)
  useEffect(() => {
    if (loading === 'eager' && src && typeof document !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      if (fetchpriority === 'high') {
        link.setAttribute('fetchpriority', 'high')
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
        rootMargin: '200px', // 200px önceden yükle (daha agresif preloading)
        threshold: 0.01,
      }
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [loading, isInView])

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
        className={`inline-block bg-gray-800 text-center align-middle ${className ?? ''}`}
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
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      {/* Görsel */}
      {(isInView || loading === 'eager') && (
        <img 
          src={src} 
          alt={alt} 
          className={`${className ?? ''} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={style} 
          loading={loading}
          decoding={decoding}
          fetchpriority={fetchpriority}
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

