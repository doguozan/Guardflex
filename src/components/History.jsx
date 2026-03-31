import { Calendar, Lightbulb, TrendingUp, Globe } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const ICON_MAP = { Lightbulb, TrendingUp, Globe, Calendar };

const DEFAULT_TIMELINE = [
  {
    year: '1861',
    icon: 'Lightbulb',
    title: 'Die Erfindung',
    description:
      'Gilbert und Bennett aus Connecticut, USA, patentieren das erste kommerzielle Fliegengitter. Ursprünglich für Kohle-Siebe entwickelt, entdeckten Kunden die perfekte Anwendung gegen Insekten.',
  },
  {
    year: '1900er',
    icon: 'TrendingUp',
    title: 'Industrialisierung',
    description:
      'Mit dem 20. Jahrhundert beginnt die Massenproduktion. Aluminium-Gewebe ersetzt Stahl und Bronze – leichter, rostfrei und langlebiger. Fliegengitter werden zum Standard in amerikanischen Haushalten.',
  },
  {
    year: '1950-60er',
    icon: 'Globe',
    title: 'Weltweite Verbreitung',
    description:
      'In der Türkei und Europa beschleunigt die Urbanisierung und der Wohnungsbau die Verbreitung. Fliegengitter werden zu einem festen Bestandteil der modernen Architektur.',
  },
  {
    year: '2000+',
    icon: 'Calendar',
    title: 'Moderne Innovation',
    description:
      'Plissee-Systeme, Magnetrahmen und Schiebetüren revolutionieren den Markt. Kombiniert mit Ästhetik und Bedienkomfort setzen sie neue Standards für Insektenschutz weltweit.',
  },
];

const DEFAULT_INTRO_HTML = `
<p class="text-gray-700 mb-4">
  Die bekannte moderne Geschichte der Fliegengitter beginnt Ende des 19. Jahrhunderts in den USA. Zu dieser Zeit waren mückenbedingte Krankheiten – insbesondere Malaria und Gelbfieber – im Sommer ein grosses Problem. Die Menschen wollten ihre Häuser lüften, mussten sich aber gleichzeitig vor Insekten schützen. Genau hier kam das Fliegengitter ins Spiel.
</p>
<p class="text-gray-700">
  Kurz gesagt: Das Fliegengitter entstand aus einer einfachen Drahtgeflecht-Idee, entwickelte sich aber zu einer Innovation, die die öffentliche Gesundheit ernsthaft beeinflusst hat. Ohne diese kleine Erfindung wäre die Lebensqualität in den Sommermonaten völlig anders gewesen.
</p>`;

const DEFAULT_STORY_HTML = `
<div class="inline-block bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-4">
  <span class="text-emerald-500 text-sm">Wer ist GuardFlex?</span>
</div>
<p class="text-gray-700 mb-4">
  GuardFlex entstand nicht aus einem Businessplan, sondern aus Praxis.
  Ein Vater-Sohn-Projekt mit handwerklichem Ursprung und dem Anspruch, Dinge sauber und langlebig zu lösen.
</p>
<p class="text-gray-700 mb-4">
  Was mit ersten Eigenmontagen und individuellen Lösungen begann, entwickelte sich Schritt für Schritt zu GuardFlex.
  Wir haben früh gemerkt, dass Standardlösungen oft nicht passen.
  Fenster, Türen und Wohnsituationen sind unterschiedlich – genau dort setzen wir an.
</p>
<p class="text-gray-700 mb-4">
  Unsere Stärke liegt in massgefertigten Insektenschutz- und Sonnenschutzlösungen, präzise montiert und auf den Kunden abgestimmt.
  Kein System von der Stange, keine schnellen Kompromisse.
</p>
<p class="text-gray-700">
  Heute steht GuardFlex für Qualität, saubere Arbeit und direkte Kommunikation.
  Wir sind ein Familienunternehmen geblieben und genau das ist unser Vorteil: kurze Wege, Verantwortung und ein hoher Anspruch an jedes einzelne Produkt.
</p>`;

export function History() {
  const { site } = useSiteContent();
  const h = site?.cms?.history || {};

  const pageTitle = h.pageTitle || 'Die Geschichte des Fliegengitters';
  const pageSubtitle =
    h.pageSubtitle ||
    'Von einer einfachen Drahtgeflecht-Idee zu einer Innovation, die die öffentliche Gesundheit nachhaltig beeinflusst hat';

  const timeline = Array.isArray(h.timeline) && h.timeline.length > 0 ? h.timeline : DEFAULT_TIMELINE;

  const introHtml = h.introHtml?.trim() ? h.introHtml : DEFAULT_INTRO_HTML;
  const storyHtml = h.storyHtml?.trim() ? h.storyHtml : DEFAULT_STORY_HTML;

  return (
    <section id="history" className="section-padding bg-white">
      <div className="site-container">
        <div className="text-center mb-16">
          <div className="inline-block bg-gray-100 border border-gray-200 px-4 py-2 rounded-full mb-4">
            <span className="text-gray-700">Geschichte</span>
          </div>
          <h2 className="text-gray-900 mb-4">{pageTitle}</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">{pageSubtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto mb-16 bg-white border border-gray-200 p-8 rounded-2xl">
          <div dangerouslySetInnerHTML={{ __html: introHtml }} />
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500" />

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const IconCmp = ICON_MAP[item.icon] || Lightbulb;
              return (
                <div
                  key={`${item.year}-${index}`}
                  className={`flex flex-col lg:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-4 lg:justify-end">
                        <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                          <span className="inline-block bg-emerald-500 text-white px-4 py-1 rounded-full">
                            {item.year}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <IconCmp className="text-white" size={28} />
                    </div>
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16 bg-white border border-gray-200 p-8 rounded-2xl">
          <div dangerouslySetInnerHTML={{ __html: storyHtml }} />
        </div>
      </div>
    </section>
  );
}
