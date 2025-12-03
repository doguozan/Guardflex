import { useState } from 'react';
import { Save } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor.jsx';

export function AdminBenefits() {
  const [benefits, setBenefits] = useState([
    {
      id: 1,
      title: 'Gesundheit & Sicherheit',
      description: 'Schutz vor Insekten und Allergenen'
    },
    {
      id: 2,
      title: 'Sauberkeit & Hygiene',
      description: 'Weniger Reinigungsaufwand'
    },
    {
      id: 3,
      title: 'Komfort & Wohlbefinden',
      description: 'Ungestörter Aufenthalt im Freien'
    },
    {
      id: 4,
      title: 'Energieeffizienz',
      description: 'Reduzierter Energieverbrauch'
    }
  ]);

  const handleSave = () => {
    console.log('Saving benefits:', benefits);
    alert('Änderungen gespeichert!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-white mb-6">Vorteile bearbeiten</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={benefit.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-white mb-4">Vorteil {index + 1}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Titel</label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => {
                      const newBenefits = [...benefits];
                      newBenefits[index].title = e.target.value;
                      setBenefits(newBenefits);
                    }}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Beschreibung</label>
                  <RichTextEditor
                    value={benefit.description}
                    onChange={(value) => {
                      const newBenefits = [...benefits];
                      newBenefits[index].description = value;
                      setBenefits(newBenefits);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
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

