import { useState } from 'react';
import { Save, Image as ImageIcon } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor.jsx';

export function AdminHome() {
  const [heroData, setHeroData] = useState({
    badge: 'Qualität aus der Schweiz',
    title: 'Massgeschneiderte Fliegengitter-, Sonnenschutz- und Plissee-Lösungen',
    description: 'Wir sind Ihr vertrauenswürdiger Partner in Ihrer Nähe für individuell gestaltete Fliegengitter, Sonnenschutz und Plissee-Lösungen!',
    image: '',
    features: [
      { title: '100% Qualität', subtitle: 'Garantiert' },
      { title: '2 Jahre Produkt-&', subtitle: 'Servicegarantie' },
      { title: 'Preisgarantie', subtitle: 'Beste Angebote' }
    ]
  });

  const handleSave = () => {
    console.log('Saving hero data:', heroData);
    alert('Änderungen gespeichert!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-white mb-6">Hero Section Bearbeiten</h2>

        {/* Background Image */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Hintergrundbild</label>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
            <ImageIcon className="mx-auto text-gray-500 mb-2" size={48} />
            <p className="text-gray-400">Klicken oder ziehen Sie ein Bild hierher</p>
            <p className="text-gray-500 text-sm mt-1">Empfohlene Groesse: 1920x1080px</p>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>

        {/* Badge */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Badge Text</label>
          <input
            type="text"
            value={heroData.badge}
            onChange={(e) => setHeroData({ ...heroData, badge: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Hauptüberschrift</label>
          <RichTextEditor
            value={heroData.title}
            onChange={(value) => setHeroData({ ...heroData, title: value })}
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Beschreibung</label>
          <RichTextEditor
            value={heroData.description}
            onChange={(value) => setHeroData({ ...heroData, description: value })}
          />
        </div>

        {/* Features */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-4">Features</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {heroData.features.map((feature, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => {
                    const newFeatures = [...heroData.features];
                    newFeatures[index].title = e.target.value;
                    setHeroData({ ...heroData, features: newFeatures });
                  }}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white mb-2 focus:outline-none focus:border-emerald-500"
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
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Untertitel"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
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

