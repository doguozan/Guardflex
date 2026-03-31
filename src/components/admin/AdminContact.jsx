import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { api } from '../../utils/api';
import { useSiteContent } from '../../context/SiteContentContext';

export function AdminContact() {
  const { refresh } = useSiteContent();
  const [loading, setLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState({
    phone: '+41 765230726',
    email: 'guard.flex@hotmail.com',
    address: 'Solothurn, Switzerland',
    whatsapp: '41765230726',
    formTitle: 'Kontaktieren Sie uns',
    formDescription:
      'Haben Sie Fragen oder möchten Sie ein kostenloses Angebot erhalten? Wir sind für Sie da!',
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await api.getSettings();
        const c = s.contactInfo || {};
        if (cancelled) return;
        setContactInfo({
          phone: c.phone ?? '+41 765230726',
          email: c.email ?? 'guard.flex@hotmail.com',
          address: c.address ?? 'Solothurn, Switzerland',
          whatsapp: c.whatsapp ?? '41765230726',
          formTitle: c.formTitle ?? 'Kontaktieren Sie uns',
          formDescription:
            c.formDescription ??
            'Haben Sie Fragen oder möchten Sie ein kostenloses Angebot erhalten? Wir sind für Sie da!',
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
      await api.updateSettings({ contactInfo });
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
        <h2 className="text-gray-900 mb-6">Kontaktinformationen bearbeiten</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Telefon</label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">E-Mail</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Adresse</label>
            <input
              type="text"
              value={contactInfo.address}
              onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">WhatsApp Nummer (Ländercode, z. B. 41765230726)</label>
            <input
              type="text"
              value={contactInfo.whatsapp}
              onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-gray-900 mb-4">Kontaktseite – Überschrift</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Formular / Abschnitt Titel</label>
                <input
                  type="text"
                  value={contactInfo.formTitle}
                  onChange={(e) => setContactInfo({ ...contactInfo, formTitle: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Beschreibung unter dem Titel</label>
                <textarea
                  value={contactInfo.formDescription}
                  onChange={(e) => setContactInfo({ ...contactInfo, formDescription: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
                  rows={3}
                />
              </div>
            </div>
          </div>
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
