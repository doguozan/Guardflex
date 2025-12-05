import { useState } from 'react';
import { Save } from 'lucide-react';

export function AdminContact() {
  const [contactInfo, setContactInfo] = useState({
    phone: '+41 764156658',
    email: 'guard.flex@hotmail.com',
    address: 'Solothurn, Switzerland',
    whatsapp: '41764156658',
    formTitle: 'Kontaktieren Sie uns',
    formDescription: 'Wir melden uns innerhalb von 24 Stunden bei Ihnen.'
  });

  const handleSave = () => {
    console.log('Saving contact info:', contactInfo);
    alert('Änderungen gespeichert!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-white mb-6">Kontaktinformationen bearbeiten</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Telefon</label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, phone: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">E-Mail</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Adresse</label>
            <input
              type="text"
              value={contactInfo.address}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, address: e.target.value })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">WhatsApp Nummer (mit Ländercode)</label>
            <input
              type="text"
              value={contactInfo.whatsapp}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, whatsapp: e.target.value })
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              placeholder="z.B. 41791234567"
            />
          </div>

          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-white mb-4">Kontaktformular</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Formular Titel</label>
                <input
                  type="text"
                  value={contactInfo.formTitle}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, formTitle: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Formular Beschreibung</label>
                <textarea
                  value={contactInfo.formDescription}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, formDescription: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  rows={3}
                />
              </div>
            </div>
          </div>
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

