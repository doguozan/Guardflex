import heroImage from '../assets/hero-section.png';

export function Hero() {

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
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Overlay Text on Hero Image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                QUALITÄT AUS DER SCHWEIZ
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

