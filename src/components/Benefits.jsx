import { Heart, Sparkles, Home, Zap } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import animationVideo from '../assets/our-works/GuardFlex-Animasyon/5-35x18 Yatay Perdeli Sineklik 5060.mp4';
import benefitsImage from '../assets/GuardFlex-urunler/19-35x18 Çift Serbest Gezer Sistem-Sineklik-Yarı Açık.png';
import { useSiteContent } from '../context/SiteContentContext';

const ICON_MAP = { Heart, Sparkles, Home, Zap };

const FALLBACK_BENEFITS = [
  {
    icon: 'Heart',
    title: 'Gesundheit und Sicherheit',
    description:
      'Verhindert, dass Mücken und Insekten Krankheiten übertragen, und schützt Sie und Ihre Familie.',
  },
  {
    icon: 'Sparkles',
    title: 'Sauberkeit und Hygiene',
    description: 'Hält Staub, Schmutz und Pollen draussen; so bleibt Ihr Zuhause sauber.',
  },
  {
    icon: 'Home',
    title: 'Komfort und Behaglichkeit',
    description:
      'Ermöglicht es Ihnen, Fenster und Türen beruhigt offen zu lassen; frische Luft hereinlassen, ohne sich um Insekten sorgen zu müssen.',
  },
  {
    icon: 'Zap',
    title: 'Energieeffizienz',
    description:
      'Sorgt im Sommer für kühle Luftzirkulation, entlastet Ihre Klimaanlage und bietet Energieeinsparungen.',
  },
];

const DEFAULT_SECTION = {
  badge: 'Wissenswertes',
  title: 'Gut zu wissen!',
  subtitleHtml: `Ein Fliegengitter ist für Ihre Gesundheit, Ihren Komfort und die Sauberkeit Ihres Zuhauses unverzichtbar. <br/>
            <span class="text-emerald-500">Es sollte in jedem Haushalt vorhanden sein!</span>`,
};

export function Benefits() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { site } = useSiteContent();
  const sec = site?.cms?.benefitsSection || {};
  const badge = sec.badge || DEFAULT_SECTION.badge;
  const title = sec.title || DEFAULT_SECTION.title;
  const subtitleHtml = sec.subtitleHtml || DEFAULT_SECTION.subtitleHtml;

  const rawBen = site?.cms?.benefits;
  const benefits = Array.isArray(rawBen) && rawBen.length > 0 ? rawBen : FALLBACK_BENEFITS;

  return (
    <section id="benefits" className="section-padding bg-white">
      <div className="site-container">
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4">
            <span className="text-emerald-500">{badge}</span>
          </div>
          <h2 className="text-gray-900 mb-4">{title}</h2>
          <div
            className="text-gray-600 text-xl w-full [&_br]:block"
            dangerouslySetInnerHTML={{ __html: subtitleHtml }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = ICON_MAP[benefit.icon] || Heart;
            return (
              <div
                key={`${benefit.title}-${index}`}
                className="flex gap-6 p-8 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="text-emerald-400" size={32} />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-3">{benefit.title}</h3>
                  <div
                    className="text-gray-600 [&_p]:mb-2"
                    dangerouslySetInnerHTML={{ __html: benefit.description || '' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

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
                loading={isHomePage ? 'eager' : 'lazy'}
                fetchpriority={isHomePage ? 'high' : 'auto'}
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>
          <div>
            <h3 className="text-gray-900 mb-4">Warum ist ein Fliegengitter unverzichtbar?</h3>
            <p className="text-gray-600 mb-6">
              Ein Fliegengitter bietet weit mehr als nur Schutz vor lästigen Insekten. Es ist eine Investition
              in Ihre Gesundheit, Ihren Komfort und die Lebensqualität Ihres Zuhauses.
            </p>
            <ul className="space-y-4" style={{ fontSize: '14px' }}>
              {[
                'Schutz vor Krankheitsüberträgern',
                'Verbesserte Luftqualität ohne Insekten',
                'Reduzierte Energiekosten',
                'Mehr Wohnkomfort im Sommer',
              ].map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
