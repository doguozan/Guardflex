import { useState, useEffect } from 'react';
import { Save, Image as ImageIcon } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor.jsx';
import { api } from '../../utils/api';
import { useSiteContent } from '../../context/SiteContentContext';

const DEFAULT_FEATURES = [
  { title: '100% Qualität', subtitle: 'Garantiert' },
  { title: '2 Jahre Produkt-&', subtitle: 'Servicegarantie' },
  { title: 'Preisgarantie', subtitle: 'Beste Angebote' },
];

export function AdminHome() {
  const { refresh } = useSiteContent();
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState({
    badge: 'Qualität aus der Schweiz',
    headline:
      'Massgefertigte Lösungen für Insektenschutz, Sonnenschutz und Sichtschutz',
    description:
      'Wir sind Ihr vertrauenswürdiger Partner in Ihrer Nähe für individuell gestaltete Fliegengitter, Sonnenschutz und Plissee-Lösungen!',
    image: '',
    features: DEFAULT_FEATURES,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await api.getSettings();
        if (cancelled) return;
        const h = s.hero || {};
        setHeroData({
          badge: h.badge || 'Qualität aus der Schweiz',
          headline:
            (h.headline || h.title || '').trim() ||
            'Massgefertigte Lösungen für Insektenschutz, Sonnenschutz und Sichtschutz',
          description:
            h.description ||
            'Wir sind Ihr vertrauenswürdiger Partner in Ihrer Nähe für individuell gestaltete Fliegengitter, Sonnenschutz und Plissee-Lösungen!',
          image: h.image || '',
          features:
            Array.isArray(h.features) && h.features.length > 0 ? h.features : DEFAULT_FEATURES,
        });
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
      await api.updateSettings({
        hero: {
          badge: heroData.badge,
          headline: heroData.headline,
          title: heroData.headline,
          description: heroData.description,
          image: heroData.image,
          features: heroData.features,
        },
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
        <h2 className="text-gray-900 mb-6">Hero Section Bearbeiten</h2>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Hintergrundbild (URL)</label>
          <input
            type="text"
            value={heroData.image}
            onChange={(e) => setHeroData({ ...heroData, image: e.target.value })}
            placeholder="https://… oder leer für Standardbild"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
          />
          <p className="text-gray-500 text-sm mt-1">
            Optional: absolute URL. Leer lassen verwendet das Standard-Hero-Bild aus dem Projekt.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Badge Text</label>
          <input
            type="text"
            value={heroData.badge}
            onChange={(e) => setHeroData({ ...heroData, badge: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Hauptüberschrift (Hero)</label>
          <RichTextEditor
            value={heroData.headline}
            onChange={(value) => setHeroData({ ...heroData, headline: value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Beschreibung</label>
          <RichTextEditor
            value={heroData.description}
            onChange={(value) => setHeroData({ ...heroData, description: value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-4">Features (Startseite / Daten)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {heroData.features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => {
                    const newFeatures = [...heroData.features];
                    newFeatures[index].title = e.target.value;
                    setHeroData({ ...heroData, features: newFeatures });
                  }}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-900 mb-2 focus:outline-none focus:border-emerald-500"
                  placeholder="Titel"
                />
                <input
                  type="text"
                  value={feature.subtitle}
                  onChange={(e) => {
                    const newFeatures = [...heroData.features];
                    newFeatures[index].subtitle = e.target.value;
                    setHeroData({ ...heroData, features: newFeatures });
                  }}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
                  placeholder="Untertitel"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
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
