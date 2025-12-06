import heroImage from '../assets/hero-section.png';

export function Hero() {

  return (
    <>
      <section id="hero" className="relative flex items-center pt-20 bg-black">
        {/* Background Image with Overlay */}
        <div className="inset-0 z-0 relative">
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
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
                QUALITÄT AUS DER SCHWEIZ
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

