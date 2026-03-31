import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { api } from '../../utils/api';
import { useSiteContent } from '../../context/SiteContentContext';
import { LEGAL_PLACEHOLDERS } from '../../data/siteContentDefaults';

export function AdminSettings() {
  const { refresh } = useSiteContent();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    siteName: 'GuardFlex',
    primaryColor: '#10b981',
    layout: 'default',
    headerStyle: 'fixed',
    footerStyle: '3-column',
    socialMedia: {
      instagram: 'https://www.instagram.com/guardflex_/',
      facebook: 'https://facebook.com/fliegengitterpro',
      whatsapp: '41765230726',
    },
    legal: {
      datenschutz: LEGAL_PLACEHOLDERS.datenschutz,
      impressum: LEGAL_PLACEHOLDERS.impressum,
      agb: LEGAL_PLACEHOLDERS.agb,
    },
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await api.getSettings();
        if (cancelled) return;
        const b = s.cms?.branding || {};
        const leg = s.legal || {};
        setSettings({
          siteName: s.siteName || 'GuardFlex',
          primaryColor: b.primaryColor ?? '#10b981',
          layout: b.layout ?? 'default',
          headerStyle: b.headerStyle ?? 'fixed',
          footerStyle: b.footerStyle ?? '3-column',
          socialMedia: {
            instagram: s.socialMedia?.instagram ?? 'https://www.instagram.com/guardflex_/',
            facebook: s.socialMedia?.facebook ?? 'https://facebook.com/fliegengitterpro',
            whatsapp: s.socialMedia?.whatsapp ?? '41765230726',
          },
          legal: {
            datenschutz: leg.datenschutz || LEGAL_PLACEHOLDERS.datenschutz,
            impressum: leg.impressum || LEGAL_PLACEHOLDERS.impressum,
            agb: leg.agb || LEGAL_PLACEHOLDERS.agb,
          },
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
        siteName: settings.siteName,
        socialMedia: settings.socialMedia,
        cms: {
          branding: {
            primaryColor: settings.primaryColor,
            layout: settings.layout,
            headerStyle: settings.headerStyle,
            footerStyle: settings.footerStyle,
          },
        },
        legal: settings.legal,
      });
      await refresh();
      alert('Einstellungen gespeichert!');
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
        <h2 className="text-gray-900 mb-6">Allgemeine Einstellungen</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Markenname (Website)</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Primärfarbe (Referenz)</label>
            <div className="flex gap-4">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="h-10 w-20 bg-white border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-6">Layout-Einstellungen</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Header-Stil</label>
            <select
              value={settings.headerStyle}
              onChange={(e) => setSettings({ ...settings, headerStyle: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
            >
              <option value="fixed">Fixed (Fest)</option>
              <option value="static">Static (Statisch)</option>
              <option value="transparent">Transparent</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Footer-Stil</label>
            <select
              value={settings.footerStyle}
              onChange={(e) => setSettings({ ...settings, footerStyle: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
            >
              <option value="3-column">3 Spalten</option>
              <option value="4-column">4 Spalten</option>
              <option value="centered">Zentriert</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Grid-Layout</label>
            <select
              value={settings.layout}
              onChange={(e) => setSettings({ ...settings, layout: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
            >
              <option value="default">Standard</option>
              <option value="wide">Breit</option>
              <option value="boxed">Boxed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-6">Social Media</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Instagram URL</label>
            <input
              type="url"
              value={settings.socialMedia.instagram}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, instagram: e.target.value },
                })
              }
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Facebook URL</label>
            <input
              type="url"
              value={settings.socialMedia.facebook}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, facebook: e.target.value },
                })
              }
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">WhatsApp (im Social-Block, nur Ziffern)</label>
            <input
              type="text"
              value={settings.socialMedia.whatsapp}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, whatsapp: e.target.value },
                })
              }
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-6">Rechtstexte (HTML, öffentlich unter /datenschutz, /impressum, /agb)</h2>
        <p className="text-gray-600 text-sm mb-4">
          Bitte durch eine rechtskonforme Fassung ersetzen. Platzhalter dienen nur der Orientierung.
        </p>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Datenschutz</label>
            <textarea
              value={settings.legal.datenschutz}
              onChange={(e) =>
                setSettings({ ...settings, legal: { ...settings.legal, datenschutz: e.target.value } })
              }
              rows={8}
              className="w-full font-mono text-sm border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Impressum</label>
            <textarea
              value={settings.legal.impressum}
              onChange={(e) =>
                setSettings({ ...settings, legal: { ...settings.legal, impressum: e.target.value } })
              }
              rows={8}
              className="w-full font-mono text-sm border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">AGB</label>
            <textarea
              value={settings.legal.agb}
              onChange={(e) =>
                setSettings({ ...settings, legal: { ...settings.legal, agb: e.target.value } })
              }
              rows={8}
              className="w-full font-mono text-sm border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
        >
          <Save size={20} />
          Einstellungen speichern
        </button>
      </div>
    </div>
  );
}
