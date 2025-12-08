import { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Import gallery images from our-works folder
import galleryImage2 from '../../assets/our-works/2.jpeg';
import galleryImage3 from '../../assets/our-works/3.jpeg';
import galleryImage4 from '../../assets/our-works/4.jpeg';
import galleryImage5 from '../../assets/our-works/5.jpeg';
import galleryImage7 from '../../assets/our-works/7.jpeg';

// Import gallery videos from Guard-video folder
import galleryVideo1 from '../../assets/Guard-video/video1.mp4';
import galleryVideo2 from '../../assets/Guard-video/video2.mp4';
import galleryVideo3 from '../../assets/Guard-video/video3.mp4';
import galleryVideo4 from '../../assets/Guard-video/video4.mp4';

export function AdminGallery() {
  // Initialize with actual gallery images
  const [images, setImages] = useState([
    { id: 1, url: galleryImage2, alt: 'Unsere Arbeit', type: 'image' },
    { id: 2, url: galleryImage3, alt: 'Unsere Arbeit', type: 'image' },
    { id: 3, url: galleryImage4, alt: 'Unsere Arbeit', type: 'image' },
    { id: 4, url: galleryImage5, alt: 'Unsere Arbeit', type: 'image' },
    { id: 5, url: galleryImage7, alt: 'Unsere Arbeit', type: 'image' },
    { id: 6, url: galleryVideo1, alt: 'Unsere Arbeit', type: 'video' },
    { id: 7, url: galleryVideo2, alt: 'Unsere Arbeit', type: 'video' },
    { id: 8, url: galleryVideo3, alt: 'Unsere Arbeit', type: 'video' },
    { id: 9, url: galleryVideo4, alt: 'Unsere Arbeit', type: 'video' },
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
              <div className="aspect-square bg-gray-900 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors relative overflow-hidden">
                {image.url ? (
                  image.type === 'video' ? (
                    <video
                      src={image.url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  ) : (
                    <ImageWithFallback
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="text-center">
                    <ImageIcon className="mx-auto text-gray-600 mb-2" size={48} />
                    <p className="text-gray-500 text-sm">Klicken zum Hochladen</p>
                  </div>
                )}
                {image.type === 'video' && (
                  <div className="absolute top-2 right-2 bg-blue-500/80 text-white text-xs px-2 py-1 rounded">
                    Video
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-400">
                    {image.type === 'video' ? 'Video' : 'Bild'}
                  </span>
                </div>
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

