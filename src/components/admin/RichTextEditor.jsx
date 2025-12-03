import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight 
} from 'lucide-react';

export function RichTextEditor({ value, onChange }) {
  const [content, setContent] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setContent(newValue);
    onChange(newValue);
  };

  const applyFormat = (format) => {
    // This is a simplified version. In production, you'd want to use a full rich text editor library
    console.log('Applying format:', format);
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-700 bg-gray-900">
        <button
          onClick={() => applyFormat('bold')}
          className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
          title="Fett"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => applyFormat('italic')}
          className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
          title="Kursiv"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => applyFormat('underline')}
          className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
          title="Unterstrichen"
        >
          <Underline size={18} />
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1"></div>
        <button
          onClick={() => applyFormat('ul')}
          className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
          title="Aufzählungsliste"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => applyFormat('ol')}
          className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
          title="Nummerierte Liste"
        >
          <ListOrdered size={18} />
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1"></div>
        <button
          onClick={() => applyFormat('left')}
          className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
          title="Linksbündig"
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => applyFormat('center')}
          className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
          title="Zentriert"
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => applyFormat('right')}
          className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
          title="Rechtsbündig"
        >
          <AlignRight size={18} />
        </button>
      </div>

      {/* Editor Area */}
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full bg-gray-800 text-white p-4 min-h-[200px] resize-y focus:outline-none"
        placeholder="Text hier eingeben..."
      />
    </div>
  );
}

