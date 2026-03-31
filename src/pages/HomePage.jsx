import { Hero } from '../components/Hero';
import { Benefits } from '../components/Benefits';
import { ProductSlider } from '../components/ProductSlider';
import animationVideo from '../assets/GuardFlex1.mp4';
import videoSectionBg from '../assets/video_section_bg.png';

export function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <Hero />
      <Benefits />

      <ProductSlider />

      {/* Animation Video Section - Full width, background + video overlay */}
      <section
        className="relative w-full py-12 sm:py-16 md:py-0 md:min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${videoSectionBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-center">
          <div
            className="relative overflow-hidden rounded-2xl aspect-video bg-white shadow-2xl"
            style={{ width: '100%', maxWidth: 800 }}
          >
            <video
              src={animationVideo}
              className="w-full h-full object-cover gallery-video"
              muted
              loop
              playsInline
              autoPlay
              onVolumeChange={(e) => {
                e.target.muted = true;
                e.target.volume = 0;
              }}
              onLoadedMetadata={(e) => {
                e.target.muted = true;
                e.target.volume = 0;
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

