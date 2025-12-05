import { Users, Ruler, Wrench, Truck, Award, Shield, BadgeCheck } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Users,
      title: 'Persönliche Beratung',
      description: 'Individuelle Beratung für Ihre spezifischen Bedürfnisse und Anforderungen.',
    },
    {
      icon: Ruler,
      title: 'Masanfertigung',
      description: 'Präzise Vermessung und Herstellung nach Ihren exakten Massen.',
    },
    {
      icon: Wrench,
      title: 'Professionelle Montage',
      description: 'Fachgerechte Installation durch unsere erfahrenen Monteure.',
    },
    {
      icon: Truck,
      title: 'Schnelle Lieferung',
      description: 'Zuverlässige und pünktliche Lieferung direkt zu Ihnen nach Hause.',
    },
    {
      icon: Award,
      title: '100% Qualitätsgarantie',
      description: 'Höchste Qualitätsstandards bei allen unseren Produkten.',
    },
    {
      icon: Shield,
      title: '2 Jahre Garantie',
      description: 'Umfassende Garantie für Ihre Sicherheit und Zufriedenheit.',
    },
    {
      icon: BadgeCheck,
      title: 'Preisgarantie',
      description: 'Faire und transparente Preise - garantiert ohne versteckte Kosten.',
    },
  ];

  return (
    <section id="services" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-white mb-4 text-2xl sm:text-3xl lg:text-4xl">Unsere Dienstleistungen</h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4 sm:px-0">
            Vom ersten Beratungsgespräch bis zur finalen Montage – wir begleiten Sie durch den gesamten Prozess
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-white/5 transition-all duration-300 border border-gray-800 hover:border-emerald-500 group"
            >
              <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                <service.icon className="text-emerald-500 group-hover:text-white transition-colors" size={32} />
              </div>
              <h3 className="text-white mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-full">
            <BadgeCheck className="text-emerald-500" size={24} />
            <span className="text-gray-300">
              Qualität und Service, auf die Sie sich verlassen können
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

