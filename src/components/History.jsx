import { Calendar, Lightbulb, TrendingUp, Globe } from 'lucide-react';

export function History() {
  const timeline = [
    {
      year: '1861',
      icon: Lightbulb,
      title: 'Die Erfindung',
      description: 'Gilbert und Bennett aus Connecticut, USA, patentieren das erste kommerzielle Fliegengitter. Ursprünglich für Kohle-Siebe entwickelt, entdeckten Kunden die perfekte Anwendung gegen Insekten.',
    },
    {
      year: '1900er',
      icon: TrendingUp,
      title: 'Industrialisierung',
      description: 'Mit dem 20. Jahrhundert beginnt die Massenproduktion. Aluminium-Gewebe ersetzt Stahl und Bronze – leichter, rostfrei und langlebiger. Fliegengitter werden zum Standard in amerikanischen Haushalten.',
    },
    {
      year: '1950-60er',
      icon: Globe,
      title: 'Weltweite Verbreitung',
      description: 'In der Türkei und Europa beschleunigt die Urbanisierung und der Wohnungsbau die Verbreitung. Fliegengitter werden zu einem festen Bestandteil der modernen Architektur.',
    },
    {
      year: '2000+',
      icon: Calendar,
      title: 'Moderne Innovation',
      description: 'Plissee-Systeme, Magnetrahmen und Schiebetüren revolutionieren den Markt. Kombiniert mit Ästhetik und Bedienkomfort setzen sie neue Standards für Insektenschutz weltweit.',
    },
  ];

  return (
    <section id="history" className="section-padding bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gray-800 border border-gray-700 px-4 py-2 rounded-full mb-4">
            <span className="text-gray-300">Geschichte</span>
          </div>
          <h2 className="text-white mb-4">Die Geschichte des Fliegengitters</h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Von einer einfachen Drahtgeflecht-Idee zu einer Innovation, die die öffentliche Gesundheit nachhaltig beeinflusst hat
          </p>
        </div>

        {/* Intro Text */}
        <div className="max-w-4xl mx-auto mb-16 bg-[#252525] border border-white/10 p-8 rounded-2xl">
          <p className="text-gray-300 mb-4">
            Die bekannte moderne Geschichte der Fliegengitter beginnt Ende des 19. Jahrhunderts in den USA. Zu dieser Zeit waren mückenbedingte Krankheiten – insbesondere Malaria und Gelbfieber – im Sommer ein grosses Problem. Die Menschen wollten ihre Häuser lüften, mussten sich aber gleichzeitig vor Insekten schützen. Genau hier kam das Fliegengitter ins Spiel.
          </p>
          <p className="text-gray-300">
            Kurz gesagt: Das Fliegengitter entstand aus einer einfachen Drahtgeflecht-Idee, entwickelte sich aber zu einer Innovation, die die öffentliche Gesundheit ernsthaft beeinflusst hat. Ohne diese kleine Erfindung wäre die Lebensqualität in den Sommermonaten völlig anders gewesen.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="bg-[#252525] border border-white/10 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-white/5 transition-shadow">
                    <div className="flex items-center gap-3 mb-4 lg:justify-end">
                      <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                        <span className="inline-block bg-emerald-500 text-white px-4 py-1 rounded-full">
                          {item.year}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-[#1a1a1a]">
                    <item.icon className="text-white" size={28} />
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

