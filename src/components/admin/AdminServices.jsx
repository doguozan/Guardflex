import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor.jsx';
import { api } from '../../utils/api';
import { useSiteContent } from '../../context/SiteContentContext';

const ICON_OPTIONS = ['Users', 'Ruler', 'Wrench', 'Truck', 'Award', 'Shield', 'BadgeCheck'];

const DEFAULT_SERVICES = [
  { id: 1, title: 'Persönliche Beratung', description: 'Individuelle Beratung vor Ort', icon: 'Users' },
  { id: 2, title: 'Massanfertigung', description: 'Präzise nach Ihren Wünschen', icon: 'Ruler' },
  { id: 3, title: 'Professionelle Montage', description: 'Fachgerechte Installation', icon: 'Wrench' },
];

export function AdminServices() {
  const { refresh } = useSiteContent();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await api.getSettings();
        const list = s.cms?.services;
        if (cancelled) return;
        if (Array.isArray(list) && list.length > 0) {
          setServices(
            list.map((item, i) => ({
              id: item.id || i + 1,
              title: item.title,
              description: item.description,
              icon: item.icon || 'Users',
            }))
          );
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
      const payload = services.map(({ icon, title, description }) => ({
        icon,
        title,
        description,
      }));
      await api.updateSettings({ cms: { services: payload } });
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
        <h2 className="text-gray-900 mb-6">Dienstleistungen bearbeiten</h2>

        <div className="space-y-6">
          {services.map((service, index) => (
            <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-gray-900 mb-4">Dienstleistung {index + 1}</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Icon</label>
                  <select
                    value={service.icon}
                    onChange={(e) => {
                      const newServices = [...services];
                      newServices[index].icon = e.target.value;
                      setServices(newServices);
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
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
                    value={service.title}
                    onChange={(e) => {
                      const newServices = [...services];
                      newServices[index].title = e.target.value;
                      setServices(newServices);
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Beschreibung</label>
                  <RichTextEditor
                    value={service.description}
                    onChange={(value) => {
                      const newServices = [...services];
                      newServices[index].description = value;
                      setServices(newServices);
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
