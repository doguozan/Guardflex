import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import gallery images from our-works folder
import galleryImage2 from '../assets/our-works/2.jpeg';
import galleryImage3 from '../assets/our-works/3.jpeg';
import galleryImage4 from '../assets/our-works/4.jpeg';
import galleryImage5 from '../assets/our-works/5.jpeg';
import galleryImage7 from '../assets/our-works/7.jpeg';

// Import gallery videos from Guard-video folder
import galleryVideo1 from '../assets/Guard-video/video1.mp4';
import galleryVideo2 from '../assets/Guard-video/video2.mp4';
import galleryVideo3 from '../assets/Guard-video/video3.mp4';
import galleryVideo4 from '../assets/Guard-video/video4.mp4';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const videoRef = useRef(null);

  const mediaItems = [
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
    <section id="gallery" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-white mb-4">Unsere Projekte</h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Entdecken Sie unsere hochwertigen Fliegengitter-, Sonnenschutz- und Plissee-Installationen
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl hover:shadow-white/5 transition-all duration-300 border border-gray-800"
              onClick={() => openLightbox(index)}
            >
              {item.type === 'image' ? (
                <ImageWithFallback
                  src={item.url}
                  alt={`GuardFlex Projekt - ${item.title} - Fliegengitter oder Sonnenschutz Installation`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="text-white" size={32} />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="text-white" size={32} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <ChevronRight className="text-white" size={32} />
            </button>

            {/* Media (Image or Video) */}
            <div className="max-w-6xl max-h-[90vh] px-4" onClick={(e) => e.stopPropagation()}>
              {mediaItems[selectedImage].type === 'image' ? (
                <ImageWithFallback
                  src={mediaItems[selectedImage].url}
                  alt={mediaItems[selectedImage].title}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
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
              <p className="text-white text-center mt-4">{mediaItems[selectedImage].title}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

