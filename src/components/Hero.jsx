import { ArrowRight, Shield, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/57503dff9c38e6b7eeb402e4b94a7a20774c9a01.png';

export function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center pt-20 bg-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="GuardFlex Fliegengitter und Sonnenschutz - Qualität aus der Schweiz"
            className="w-full h-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-full mb-6">
              <Shield className="text-emerald-400" size={20} />
              <span className="text-emerald-400">Qualität aus der Schweiz</span>
            </div>

            <h1 className="text-white mb-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
              Maßgeschneiderte Fliegengitter-, Sonnenschutz- und Plissee-Lösungen
            </h1>
            
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 px-4 sm:px-0">
              Wir sind Ihr vertrauenswürdiger Partner in Ihrer Nähe für individuell gestaltete Fliegengitter, Sonnenschutz und Plissee-Lösungen!
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg hover:border-emerald-500/50 transition-colors">
                <Award className="text-emerald-400 mx-auto mb-4" size={32} />
                <p className="text-white mb-2">100% Qualität</p>
                <p className="text-gray-400 text-sm">Garantiert</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg hover:border-emerald-500/50 transition-colors">
                <Shield className="text-emerald-400 mx-auto mb-4" size={32} />
                <p className="text-white mb-2">2 Jahre Produkt-&</p>
                <p className="text-gray-400 text-sm">Servicegarantie</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg hover:border-emerald-500/50 transition-colors">
                <Award className="text-emerald-400 mx-auto mb-4" size={32} />
                <p className="text-white mb-2">Preisgarantie</p>
                <p className="text-gray-400 text-sm">Beste Angebote</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="bg-emerald-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-emerald-600 transition-all hover:shadow-xl hover:shadow-emerald-500/20 flex items-center justify-center gap-2 group text-sm sm:text-base"
              >
                Kostenloses Angebot erhalten
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
              <button
                onClick={() => window.open('https://wa.me/41000000000', '_blank')}
                className="bg-gray-900 border-2 border-gray-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-gray-800 hover:border-emerald-500 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                WhatsApp Beratung
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

