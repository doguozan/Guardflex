import { Heart, Sparkles, Home, Zap } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import animationVideo from '../assets/our-works/GuardFlex-Animasyon/5-35x18 Yatay Perdeli Sineklik 5060.mp4';
import benefitsImage from '../assets/GuardFlex-urunler/19-35x18 Çift Serbest Gezer Sistem-Sineklik-Yarı Açık.png';

export function Benefits() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const benefits = [
    {
      icon: Heart,
      title: 'Gesundheit und Sicherheit',
      description: 'Verhindert, dass Mücken und Insekten Krankheiten übertragen, und schützt Sie und Ihre Familie.',
      color: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Sparkles,
      title: 'Sauberkeit und Hygiene',
      description: 'Hält Staub, Schmutz und Pollen draussen; so bleibt Ihr Zuhause sauber.',
      color: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Home,
      title: 'Komfort und Behaglichkeit',
      description: 'Ermöglicht es Ihnen, Fenster und Türen beruhigt offen zu lassen; frische Luft hereinlassen, ohne sich um Insekten sorgen zu müssen.',
      color: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Zap,
      title: 'Energieeffizienz',
      description: 'Sorgt im Sommer für kühle Luftzirkulation, entlastet Ihre Klimaanlage und bietet Energieeinsparungen.',
      color: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <section id="benefits" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4">
            <span className="text-emerald-500">Wissenswertes</span>
          </div>
          <h2 className="text-white mb-4">Gut zu wissen!</h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Ein Fliegengitter ist für Ihre Gesundheit, Ihren Komfort und die Sauberkeit Ihres Zuhauses unverzichtbar. <br/>
            <span className="text-emerald-500">Es sollte in jedem Haushalt vorhanden sein!</span>
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex gap-6 p-8 bg-[#252525] rounded-2xl hover:shadow-lg hover:shadow-white/5 transition-all duration-300 border border-white/10"
            >
              <div className={`w-16 h-16 ${benefit.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <benefit.icon className={benefit.iconColor} size={32} />
              </div>
              <div>
                <h3 className="text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image/Video Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-20">
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            {isHomePage ? (
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
            ) : (
              <ImageWithFallback
                src={benefitsImage}
                alt="Fliegengitter"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>
          <div>
            <h3 className="text-white mb-4">
              Warum ist ein Fliegengitter unverzichtbar?
            </h3>
            <p className="text-gray-400 mb-6">
              Ein Fliegengitter bietet weit mehr als nur Schutz vor lästigen Insekten. Es ist eine Investition in Ihre Gesundheit, Ihren Komfort und die Lebensqualität Ihres Zuhauses.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300">Schutz vor Krankheitsüberträgern</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300">Verbesserte Luftqualität ohne Insekten</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300">Reduzierte Energiekosten</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300">Mehr Wohnkomfort im Sommer</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

