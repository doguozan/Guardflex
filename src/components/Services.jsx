import { Users, Ruler, Wrench, Truck, Award, Shield, BadgeCheck } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const ICON_MAP = { Users, Ruler, Wrench, Truck, Award, Shield, BadgeCheck };

const FALLBACK_SERVICES = [
  {
    icon: 'Users',
    title: 'Persönliche Beratung',
    description:
      'Individuelle Beratung für Ihre spezifischen Bedürfnisse und Anforderungen.',
  },
  {
    icon: 'Ruler',
    title: 'Massanfertigung',
    description: 'Präzise Vermessung und Herstellung nach Ihren exakten Massen.',
  },
  {
    icon: 'Wrench',
    title: 'Professionelle Montage',
    description: 'Fachgerechte Installation durch unsere erfahrenen Monteure.',
  },
  {
    icon: 'Truck',
    title: 'Schnelle Lieferung',
    description: 'Zuverlässige und pünktliche Lieferung direkt zu Ihnen nach Hause.',
  },
  {
    icon: 'Award',
    title: '100% Qualitätsgarantie',
    description: 'Höchste Qualitätsstandards bei allen unseren Produkten.',
  },
  {
    icon: 'Shield',
    title: '2 Jahre Garantie',
    description: 'Umfassende Garantie für Ihre Sicherheit und Zufriedenheit.',
  },
  {
    icon: 'BadgeCheck',
    title: 'Preisgarantie',
    description: 'Faire und transparente Preise - garantiert ohne versteckte Kosten.',
  },
];

export function Services() {
  const { site } = useSiteContent();
  const raw = site?.cms?.services;
  const services = Array.isArray(raw) && raw.length > 0 ? raw : FALLBACK_SERVICES;

  return (
    <section id="services" className="section-padding bg-white">
      <div className="site-container">
        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-full">
            <BadgeCheck className="text-emerald-500" size={24} />
            <span className="text-gray-700" style={{ fontSize: '14px' }}>
              Qualität und Service, auf die Sie sich verlassen können
            </span>
          </div>
        </div>

        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-gray-900 mb-4 text-2xl sm:text-3xl lg:text-4xl">Unsere Dienstleistungen</h2>
          <p className="text-gray-600 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto px-4 sm:px-0">
            Vom ersten Beratungsgespräch bis zur finalen Montage – wir begleiten Sie durch den gesamten
            Prozess
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || Users;
            return (
              <div
                key={`${service.title}-${index}`}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-emerald-500 group"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                  <Icon className="text-emerald-500 group-hover:text-white transition-colors" size={32} />
                </div>
                <h3 className="text-gray-900 mb-3">{service.title}</h3>
                <div
                  className="text-gray-600 [&_p]:mb-2"
                  dangerouslySetInnerHTML={{
                    __html: service.description || '',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
