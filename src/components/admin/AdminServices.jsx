import { useState } from 'react';
import { Save } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor.jsx';

export function AdminServices() {
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Persönliche Beratung',
      description: 'Individuelle Beratung vor Ort',
      icon: 'Users'
    },
    {
      id: 2,
      title: 'Masanfertigung',
      description: 'Präzise nach Ihren Wünschen',
      icon: 'Ruler'
    },
    {
      id: 3,
      title: 'Professionelle Montage',
      description: 'Fachgerechte Installation',
      icon: 'Wrench'
    }
  ]);

  const handleSave = () => {
    console.log('Saving services:', services);
    alert('Änderungen gespeichert!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-white mb-6">Dienstleistungen bearbeiten</h2>

        <div className="space-y-6">
          {services.map((service, index) => (
            <div key={service.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-white mb-4">Dienstleistung {index + 1}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Titel</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => {
                      const newServices = [...services];
                      newServices[index].title = e.target.value;
                      setServices(newServices);
                    }}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Beschreibung</label>
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

