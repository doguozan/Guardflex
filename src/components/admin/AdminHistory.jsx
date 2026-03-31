import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor.jsx';
import { api } from '../../utils/api';
import { useSiteContent } from '../../context/SiteContentContext';

export function AdminHistory() {
  const { refresh } = useSiteContent();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState({
    title: 'Geschichte des Fliegengitters',
    intro: 'Von den Anfängen bis heute',
    content:
      '<p>Die Geschichte der Fliegengitter reicht bis ins 19. Jahrhundert zurück...</p>',
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await api.getSettings();
        const h = s.cms?.history;
        if (cancelled) return;
        if (h && typeof h === 'object') {
          setHistory({
            title: h.pageTitle || 'Die Geschichte des Fliegengitters',
            intro:
              h.pageSubtitle ||
              'Von einer einfachen Drahtgeflecht-Idee zu einer Innovation, die die öffentliche Gesundheit nachhaltig beeinflusst hat',
            content:
              h.introHtml ||
              '<p>Die Geschichte der Fliegengitter reicht bis ins 19. Jahrhundert zurück...</p>',
          });
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

  const handleSave = async () => {
    try {
      await api.updateSettings({
        cms: {
          history: {
            pageTitle: history.title,
            pageSubtitle: history.intro,
            introHtml: history.content,
          },
        },
      });
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
        <h2 className="text-gray-900 mb-6">Geschichte bearbeiten</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Titel (Seitenkopf)</label>
            <input
              type="text"
              value={history.title}
              onChange={(e) => setHistory({ ...history, title: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Untertitel</label>
            <input
              type="text"
              value={history.intro}
              onChange={(e) => setHistory({ ...history, intro: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Einleitung (HTML)</label>
            <RichTextEditor
              value={history.content}
              onChange={(value) => setHistory({ ...history, content: value })}
            />
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
