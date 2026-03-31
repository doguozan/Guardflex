import { useState, useEffect, useRef, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useSiteContent } from '../context/SiteContentContext';

// Import gallery images from our-works folder
import galleryImage2 from '../assets/our-works/2.jpeg';
import galleryImage3 from '../assets/our-works/3.jpeg';
import galleryImage4 from '../assets/our-works/4.jpeg';
import galleryImage5 from '../assets/our-works/5.jpeg';
import galleryImage7 from '../assets/our-works/7.jpeg';
import galleryImageAsdasdas from '../assets/our-works/asdasdas.jpeg';
import galleryImageHuard from '../assets/our-works/huard.jpeg';
import galleryImageWhatsApp1 from '../assets/our-works/WhatsApp Image 2026-03-11 at 20.39.24.jpeg';
import galleryImageWhatsApp2 from '../assets/our-works/WhatsApp Image 2026-03-11 at 20.39.24wasdas.jpeg';

// Import gallery videos from Guard-video folder
import galleryVideo1 from '../assets/Guard-video/video1.mp4';
import galleryVideo2 from '../assets/Guard-video/video2.mp4';
import galleryVideo3 from '../assets/Guard-video/video3.mp4';
import galleryVideo4 from '../assets/Guard-video/video4.mp4';

const DEFAULT_GALLERY_ITEMS = [
    {
      type: 'image',
      url: galleryImage2,
      title: 'Unsere Arbeit',
    },
    {
      type: 'image',
      url: galleryImage3,
      title: 'Unsere Arbeit',
    },
    {
      type: 'image',
      url: galleryImage4,
      title: 'Unsere Arbeit',
    },
    {
      type: 'image',
      url: galleryImage5,
      title: 'Unsere Arbeit',
    },
    {
      type: 'image',
      url: galleryImage7,
      title: 'Unsere Arbeit',
    },
    {
      type: 'image',
      url: galleryImageAsdasdas,
      title: 'Unsere Arbeit',
    },
    {
      type: 'image',
      url: galleryImageHuard,
      title: 'Unsere Arbeit',
    },
    {
      type: 'image',
      url: galleryImageWhatsApp1,
      title: 'Unsere Arbeit',
    },
    {
      type: 'image',
      url: galleryImageWhatsApp2,
      title: 'Unsere Arbeit',
    },
    {
      type: 'video',
      url: galleryVideo1,
      title: 'Unsere Arbeit',
    },
    {
      type: 'video',
      url: galleryVideo2,
      title: 'Unsere Arbeit',
    },
    {
      type: 'video',
      url: galleryVideo3,
      title: 'Unsere Arbeit',
    },
    {
      type: 'video',
      url: galleryVideo4,
      title: 'Unsere Arbeit',
    },
];

export function Gallery() {
  const { site } = useSiteContent();
  const [selectedImage, setSelectedImage] = useState(null);
  const videoRef = useRef(null);

  const mediaItems = useMemo(() => {
    const g = site?.cms?.gallery;
    if (Array.isArray(g) && g.length > 0) {
      return g.map((item) => ({
        type: item.type === 'video' ? 'video' : 'image',
        url: item.url,
        title: item.title || item.alt || 'Unsere Arbeit',
      }));
    }
    return DEFAULT_GALLERY_ITEMS;
  }, [site?.cms?.gallery]);

  // Hide volume controls when video is loaded
  useEffect(() => {
    if (selectedImage !== null && mediaItems[selectedImage]?.type === 'video') {
      const video = videoRef.current;
      if (!video) return;

      const hideVolumeControls = () => {
        video.muted = true;
        video.volume = 0;
        
        // Hide volume controls via CSS and DOM manipulation
        const style = document.createElement('style');
        style.textContent = `
          .gallery-video::-webkit-media-controls-volume-slider,
          .gallery-video::-webkit-media-controls-mute-button,
          .gallery-video::-webkit-media-controls-volume-control-container {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
          }
        `;
        document.head.appendChild(style);

        // Use MutationObserver to catch dynamically added controls
        const observer = new MutationObserver(() => {
          const controls = video.parentElement;
          if (controls) {
            const volumeButtons = controls.querySelectorAll(
              'button[aria-label*="volume" i], button[aria-label*="mute" i], button[aria-label*="Volume" i], button[aria-label*="Mute" i], [class*="volume" i], [class*="mute" i]'
            );
            volumeButtons.forEach((btn) => {
              btn.style.display = 'none';
              btn.style.visibility = 'hidden';
              btn.style.opacity = '0';
              btn.style.width = '0';
              btn.style.height = '0';
              btn.remove();
            });
          }
        });

        if (video.parentElement) {
          observer.observe(video.parentElement, {
            childList: true,
            subtree: true,
            attributes: true,
          });
        }

        // Also try to hide immediately
        setTimeout(() => {
          const controls = video.parentElement;
          if (controls) {
            const volumeButtons = controls.querySelectorAll(
              'button[aria-label*="volume" i], button[aria-label*="mute" i], button[aria-label*="Volume" i], button[aria-label*="Mute" i], [class*="volume" i], [class*="mute" i]'
            );
            volumeButtons.forEach((btn) => {
              btn.style.display = 'none';
              btn.style.visibility = 'hidden';
              btn.remove();
            });
          }
        }, 100);

        return () => {
          observer.disconnect();
          document.head.removeChild(style);
        };
      };

      const cleanup = hideVolumeControls();
      video.addEventListener('loadedmetadata', hideVolumeControls);
      video.addEventListener('loadeddata', hideVolumeControls);
      video.addEventListener('canplay', hideVolumeControls);

      return () => {
        if (cleanup) cleanup();
        video.removeEventListener('loadedmetadata', hideVolumeControls);
        video.removeEventListener('loadeddata', hideVolumeControls);
        video.removeEventListener('canplay', hideVolumeControls);
      };
    }
  }, [selectedImage, mediaItems]);

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? mediaItems.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === mediaItems.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">Unsere Projekte</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Entdecken Sie unsere hochwertigen Fliegengitter-, Sonnenschutz- und Plissee-Installationen
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white"
              onClick={() => openLightbox(index)}
            >
              {item.type === 'image' ? (
                <ImageWithFallback
                  src={item.url}
                  alt={`GuardFlex Projekt - ${item.title} - Fliegengitter oder Sonnenschutz Installation`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <video
                  src={item.url}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 gallery-video"
                  muted
                  loop
                  playsInline
                  autoPlay
                  aria-label={`GuardFlex Projekt Video - ${item.title} - Fliegengitter oder Sonnenschutz Installation`}
                  onVolumeChange={(e) => {
                    e.target.muted = true;
                    e.target.volume = 0;
                  }}
                  onLoadedMetadata={(e) => {
                    e.target.muted = true;
                    e.target.volume = 0;
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gray-900">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-white/95 flex items-center justify-center" onClick={closeLightbox}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
            >
              <X className="text-gray-900" size={32} />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="text-gray-900" size={32} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
            >
              <ChevronRight className="text-gray-900" size={32} />
            </button>

            {/* Media (Image or Video) */}
            <div className="max-w-6xl max-h-[90vh] px-4" onClick={(e) => e.stopPropagation()}>
              {mediaItems[selectedImage].type === 'image' ? (
                <ImageWithFallback
                  src={mediaItems[selectedImage].url}
                  alt={mediaItems[selectedImage].title}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={mediaItems[selectedImage].url}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg gallery-video"
                  controls
                  controlsList="nodownload nofullscreen noremoteplayback"
                  muted
                  autoPlay
                  loop
                  playsInline
                  onVolumeChange={(e) => {
                    e.target.muted = true;
                    e.target.volume = 0;
                  }}
                  onLoadedMetadata={(e) => {
                    e.target.muted = true;
                    e.target.volume = 0;
                    // Force hide volume controls
                    setTimeout(() => {
                      const video = e.target;
                      const controls = video.parentElement;
                      if (controls) {
                        const volumeElements = controls.querySelectorAll(
                          'button[aria-label*="volume"], button[aria-label*="mute"], button[aria-label*="Volume"], button[aria-label*="Mute"]'
                        );
                        volumeElements.forEach((el) => {
                          el.style.display = 'none';
                          el.style.visibility = 'hidden';
                          el.remove();
                        });
                      }
                    }, 200);
                  }}
                  onLoadedData={(e) => {
                    e.target.muted = true;
                    e.target.volume = 0;
                  }}
                  onPlay={(e) => {
                    e.target.muted = true;
                    e.target.volume = 0;
                  }}
                />
              )}
              <p className="text-gray-900 text-center mt-4">{mediaItems[selectedImage].title}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

