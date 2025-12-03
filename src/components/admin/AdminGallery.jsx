import { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export function AdminGallery() {
  const [images, setImages] = useState([
    { id: 1, url: '', alt: 'Galerie Bild 1' },
    { id: 2, url: '', alt: 'Galerie Bild 2' },
    { id: 3, url: '', alt: 'Galerie Bild 3' },
  ]);

  const addImage = () => {
    setImages([...images, { id: Date.now(), url: '', alt: '' }]);
  };

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleSave = () => {
    console.log('Saving gallery:', images);
    alert('Galerie gespeichert!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white">Galerie verwalten</h2>
          <button
            onClick={addImage}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Bild hinzufügen
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-900 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                {image.url ? (
                  <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="mx-auto text-gray-600 mb-2" size={48} />
                    <p className="text-gray-500 text-sm">Klicken zum Hochladen</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" />
              </div>
              <div className="p-4">
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => {
                    const newImages = images.map((img) =>
                      img.id === image.id ? { ...img, alt: e.target.value } : img
                    );
                    setImages(newImages);
                  }}
                  placeholder="Bildbeschreibung"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white mb-3 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="w-full bg-red-500/20 text-red-400 px-4 py-2 rounded hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Entfernen
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Änderungen speichern
          </button>
        </div>
      </div>
    </div>
  );
}

