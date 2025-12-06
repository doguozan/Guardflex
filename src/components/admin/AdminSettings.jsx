import { useState } from 'react';
import { Save } from 'lucide-react';

export function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'FliegengitterPro',
    primaryColor: '#10b981',
    layout: 'default',
    headerStyle: 'fixed',
    footerStyle: '3-column',
    socialMedia: {
      instagram: 'https://www.instagram.com/guardflex_/',
      facebook: 'https://facebook.com/fliegengitterpro',
      whatsapp: '41765230726'
    }
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Einstellungen gespeichert!');
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-white mb-6">Allgemeine Einstellungen</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Seitenname</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Primärfarbe</label>
            <div className="flex gap-4">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="h-10 w-20 bg-gray-800 border border-gray-700 rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Layout Settings */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-white mb-6">Layout-Einstellungen</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Header-Stil</label>
            <select
              value={settings.headerStyle}
              onChange={(e) => setSettings({ ...settings, headerStyle: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="fixed">Fixed (Fest)</option>
              <option value="static">Static (Statisch)</option>
              <option value="transparent">Transparent</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Footer-Stil</label>
            <select
              value={settings.footerStyle}
              onChange={(e) => setSettings({ ...settings, footerStyle: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="3-column">3 Spalten</option>
              <option value="4-column">4 Spalten</option>
              <option value="centered">Zentriert</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Grid-Layout</label>
            <select
              value={settings.layout}
              onChange={(e) => setSettings({ ...settings, layout: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="default">Standard</option>
              <option value="wide">Breit</option>
              <option value="boxed">Boxed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-white mb-6">Social Media</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Instagram URL</label>
            <input
              type="url"
              value={settings.socialMedia.instagram}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, instagram: e.target.value }
                })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Facebook URL</label>
            <input
              type="url"
              value={settings.socialMedia.facebook}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, facebook: e.target.value }
                })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">WhatsApp Nummer</label>
            <input
              type="text"
              value={settings.socialMedia.whatsapp}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, whatsapp: e.target.value }
                })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              placeholder="z.B. 41791234567"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
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

