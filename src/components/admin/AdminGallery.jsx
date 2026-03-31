import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { api } from '../../utils/api';
import { useSiteContent } from '../../context/SiteContentContext';

import galleryImage2 from '../../assets/our-works/2.jpeg';
import galleryImage3 from '../../assets/our-works/3.jpeg';
import galleryImage4 from '../../assets/our-works/4.jpeg';
import galleryImage5 from '../../assets/our-works/5.jpeg';
import galleryImage7 from '../../assets/our-works/7.jpeg';
import galleryImageAsdasdas from '../../assets/our-works/asdasdas.jpeg';
import galleryImageHuard from '../../assets/our-works/huard.jpeg';
import galleryImageWhatsApp1 from '../../assets/our-works/WhatsApp Image 2026-03-11 at 20.39.24.jpeg';
import galleryImageWhatsApp2 from '../../assets/our-works/WhatsApp Image 2026-03-11 at 20.39.24wasdas.jpeg';
import galleryVideo1 from '../../assets/Guard-video/video1.mp4';
import galleryVideo2 from '../../assets/Guard-video/video2.mp4';
import galleryVideo3 from '../../assets/Guard-video/video3.mp4';
import galleryVideo4 from '../../assets/Guard-video/video4.mp4';

const DEFAULT_IMAGES = [
  { id: 1, url: galleryImage2, alt: 'Unsere Arbeit', type: 'image' },
  { id: 2, url: galleryImage3, alt: 'Unsere Arbeit', type: 'image' },
  { id: 3, url: galleryImage4, alt: 'Unsere Arbeit', type: 'image' },
  { id: 4, url: galleryImage5, alt: 'Unsere Arbeit', type: 'image' },
  { id: 5, url: galleryImage7, alt: 'Unsere Arbeit', type: 'image' },
  { id: 10, url: galleryImageAsdasdas, alt: 'Unsere Arbeit', type: 'image' },
  { id: 11, url: galleryImageHuard, alt: 'Unsere Arbeit', type: 'image' },
  { id: 12, url: galleryImageWhatsApp1, alt: 'Unsere Arbeit', type: 'image' },
  { id: 13, url: galleryImageWhatsApp2, alt: 'Unsere Arbeit', type: 'image' },
  { id: 6, url: galleryVideo1, alt: 'Unsere Arbeit', type: 'video' },
  { id: 7, url: galleryVideo2, alt: 'Unsere Arbeit', type: 'video' },
  { id: 8, url: galleryVideo3, alt: 'Unsere Arbeit', type: 'video' },
  { id: 9, url: galleryVideo4, alt: 'Unsere Arbeit', type: 'video' },
];

function serializeUrl(u) {
  if (u == null) return '';
  if (typeof u === 'string') return u;
  return String(u);
}

export function AdminGallery() {
  const { refresh } = useSiteContent();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(DEFAULT_IMAGES);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await api.getSettings();
        const g = s.cms?.gallery;
        if (cancelled) return;
        if (Array.isArray(g) && g.length > 0) {
          setImages(
            g.map((item, i) => ({
              id: item.id || i + 1,
              url: item.url,
              alt: item.alt || item.title || 'Unsere Arbeit',
              type: item.type === 'video' ? 'video' : 'image',
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

  const addImage = () => {
    setImages([...images, { id: Date.now(), url: '', alt: 'Unsere Arbeit', type: 'image' }]);
  };

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const updateField = (id, field, value) => {
    setImages(images.map((img) => (img.id === id ? { ...img, [field]: value } : img)));
  };

  const handleSave = async () => {
    try {
      const payload = images.map((img, i) => ({
        id: img.id || i,
        type: img.type,
        url: serializeUrl(img.url),
        alt: img.alt,
        title: img.alt,
      }));
      await api.updateSettings({ cms: { gallery: payload } });
      await refresh();
      alert('Galerie gespeichert!');
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900">Galerie verwalten</h2>
          <button
            type="button"
            onClick={addImage}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Medium hinzufügen
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          URLs können absolute Web-Adressen sein oder Pfade, die nach dem Build erreichbar sind.
          Importierte Projektdateien werden beim Speichern als URL gespeichert.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                {image.url ? (
                  image.type === 'video' ? (
                    <video
                      src={serializeUrl(image.url)}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  ) : (
                    <ImageWithFallback
                      src={serializeUrl(image.url)}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="mx-auto text-gray-600 mb-2" size={48} />
                    <p className="text-gray-500 text-sm">URL unten eintragen</p>
                  </div>
                )}
                {image.type === 'video' && (
                  <div className="absolute top-2 right-2 bg-blue-500/80 text-white text-sm px-2 py-1 rounded">
                    Video
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <select
                  value={image.type}
                  onChange={(e) => updateField(image.id, 'type', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="image">Bild</option>
                  <option value="video">Video</option>
                </select>
                <input
                  type="text"
                  value={typeof image.url === 'string' ? image.url : serializeUrl(image.url)}
                  onChange={(e) => updateField(image.id, 'url', e.target.value)}
                  placeholder="Medien-URL"
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-900 text-sm"
                />
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => updateField(image.id, 'alt', e.target.value)}
                  placeholder="Beschreibung / Titel"
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-900 text-sm"
                />
                <button
                  type="button"
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
            type="button"
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
