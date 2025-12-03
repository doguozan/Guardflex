import { Hero } from '../components/Hero';
import { Benefits } from '../components/Benefits';
import { ProductSlider } from '../components/ProductSlider';
import animationVideo from '../assets/our-works/GuardFlex-Animasyon/Instelling van de Draad.mp4';

export function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <Benefits />
      
      {/* Animation Video Section */}
      <section className="section-padding bg-black py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl aspect-video max-h-[80vh]">
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

      <ProductSlider />
    </div>
  );
}

