import { useState } from 'react';
import { Save } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor.jsx';

export function AdminHistory() {
  const [history, setHistory] = useState({
    title: 'Geschichte des Fliegengitters',
    intro: 'Von den Anfängen bis heute',
    content: 'Die Geschichte der Fliegengitter reicht bis ins 19. Jahrhundert zurück...'
  });

  const handleSave = () => {
    console.log('Saving history:', history);
    alert('Änderungen gespeichert!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-white mb-6">Geschichte bearbeiten</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Titel</label>
            <input
              type="text"
              value={history.title}
              onChange={(e) => setHistory({ ...history, title: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Einleitung</label>
            <input
              type="text"
              value={history.intro}
              onChange={(e) => setHistory({ ...history, intro: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Inhalt</label>
            <RichTextEditor
              value={history.content}
              onChange={(value) => setHistory({ ...history, content: value })}
            />
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

