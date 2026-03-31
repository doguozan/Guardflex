import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor.jsx';
import { api } from '../../utils/api';
import { useSiteContent } from '../../context/SiteContentContext';

const ICON_OPTIONS = ['Heart', 'Sparkles', 'Home', 'Zap'];

const DEFAULT_BENEFITS = [
  { id: 1, title: 'Gesundheit & Sicherheit', description: 'Schutz vor Insekten und Allergenen', icon: 'Heart' },
  { id: 2, title: 'Sauberkeit & Hygiene', description: 'Weniger Reinigungsaufwand', icon: 'Sparkles' },
  { id: 3, title: 'Komfort & Wohlbefinden', description: 'Ungestörter Aufenthalt im Freien', icon: 'Home' },
  { id: 4, title: 'Energieeffizienz', description: 'Reduzierter Energieverbrauch', icon: 'Zap' },
];

const DEFAULT_SECTION = {
  badge: 'Wissenswertes',
  title: 'Gut zu wissen!',
  subtitleHtml: `Ein Fliegengitter ist für Ihre Gesundheit, Ihren Komfort und die Sauberkeit Ihres Zuhauses unverzichtbar. <br/>
            <span class="text-emerald-500">Es sollte in jedem Haushalt vorhanden sein!</span>`,
};

export function AdminBenefits() {
  const { refresh } = useSiteContent();
  const [loading, setLoading] = useState(true);
  const [benefits, setBenefits] = useState(DEFAULT_BENEFITS);
  const [section, setSection] = useState(DEFAULT_SECTION);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await api.getSettings();
        if (cancelled) return;
        const list = s.cms?.benefits;
        if (Array.isArray(list) && list.length > 0) {
          setBenefits(
            list.map((item, i) => ({
              id: item.id || i + 1,
              title: item.title,
              description: item.description,
              icon: item.icon || 'Heart',
            }))
          );
        }
        const sec = s.cms?.benefitsSection;
        if (sec && typeof sec === 'object') {
          setSection({
            badge: sec.badge ?? DEFAULT_SECTION.badge,
            title: sec.title ?? DEFAULT_SECTION.title,
            subtitleHtml: sec.subtitleHtml ?? DEFAULT_SECTION.subtitleHtml,
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async () => {
    try {
      const payload = benefits.map(({ icon, title, description }) => ({
        icon,
        title,
        description,
      }));
      await api.updateSettings({
        cms: { benefits: payload, benefitsSection: section },
      });
      await refresh();
      alert('Änderungen gespeichert!');
    } catch (e) {
      alert(`Speichern fehlgeschlagen: ${e.message || 'Unbekannter Fehler'}`);
    }
  };

  if (loading) {
    return <p className="text-gray-600 text-sm p-6">Wird geladen…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-6">Vorteile – Abschnitts-Kopf</h2>
        <div className="space-y-4 mb-10">
          <div>
            <label className="block text-gray-700 mb-2">Badge</label>
            <input
              type="text"
              value={section.badge}
              onChange={(e) => setSection({ ...section, badge: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Titel</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) => setSection({ ...section, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Untertitel (HTML)</label>
            <textarea
              value={section.subtitleHtml}
              onChange={(e) => setSection({ ...section, subtitleHtml: e.target.value })}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm"
            />
          </div>
        </div>

        <h2 className="text-gray-900 mb-6">Vorteile bearbeiten</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={benefit.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-gray-900 mb-4">Vorteil {index + 1}</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Icon</label>
                  <select
                    value={benefit.icon}
                    onChange={(e) => {
                      const next = [...benefits];
                      next[index].icon = e.target.value;
                      setBenefits(next);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    {ICON_OPTIONS.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Titel</label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => {
                      const next = [...benefits];
                      next[index].title = e.target.value;
                      setBenefits(next);
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Beschreibung</label>
                  <RichTextEditor
                    value={benefit.description}
                    onChange={(value) => {
                      const next = [...benefits];
                      next[index].description = value;
                      setBenefits(next);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleSave}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
          >
            <Save size={20} />
            Änderungen speichern
          </button>
        </div>
      </div>
    </div>
  );
}
