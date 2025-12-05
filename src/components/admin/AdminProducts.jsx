import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { products } from '../../data/products';
import { RichTextEditor } from './RichTextEditor.jsx';

export function AdminProducts() {
  const [productList, setProductList] = useState(products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingProduct({
      id: Date.now().toString(),
      name: '',
      category: 'Insektenschutz',
      image: '',
      features: [''],
      description: ''
    });
    setIsAdding(true);
  };

  const handleSave = () => {
    if (isAdding) {
      setProductList([...productList, editingProduct]);
    } else {
      setProductList(
        productList.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
    }
    setEditingProduct(null);
    setIsAdding(false);
    alert('Produkt gespeichert!');
  };

  const handleDelete = (id) => {
    if (confirm('Möchten Sie dieses Produkt wirklich löschen?')) {
      setProductList(productList.filter((p) => p.id !== id));
    }
  };

  const addFeature = () => {
    setEditingProduct({
      ...editingProduct,
      features: [...editingProduct.features, '']
    });
  };

  const removeFeature = (index) => {
    const newFeatures = editingProduct.features.filter((_, i) => i !== index);
    setEditingProduct({ ...editingProduct, features: newFeatures });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...editingProduct.features];
    newFeatures[index] = value;
    setEditingProduct({ ...editingProduct, features: newFeatures });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-white">Produkte verwalten</h2>
        <button
          onClick={handleAdd}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Neues Produkt
        </button>
      </div>

      {/* Product List */}
      {!editingProduct && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productList.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="aspect-square bg-gray-800 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-gray-600" size={64} />
                )}
              </div>
              <div className="p-4">
                <div className="text-emerald-400 text-sm mb-1">{product.category}</div>
                <h3 className="text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500/20 text-red-400 px-4 py-2 rounded hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Form */}
      {editingProduct && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white">
              {isAdding ? 'Neues Produkt hinzufügen' : 'Produkt bearbeiten'}
            </h3>
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsAdding(false);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-gray-300 mb-2">Produktbild</label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                <ImageIcon className="mx-auto text-gray-500 mb-2" size={48} />
                <p className="text-gray-400">Klicken oder ziehen Sie ein Bild hierher</p>
                <p className="text-gray-500 text-sm mt-1">Empfohlene Groesse: 800x800px</p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-300 mb-2">Kategorie</label>
              <select
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, category: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Insektenschutz">Insektenschutz</option>
                <option value="Sonnenschutz">Sonnenschutz</option>
                <option value="Plissee">Plissee</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-300 mb-2">Produktname</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                placeholder="z.B. Sonnenschutz Plissee"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-300 mb-2">Beschreibung</label>
              <RichTextEditor
                value={editingProduct.description}
                onChange={(value) =>
                  setEditingProduct({ ...editingProduct, description: value })
                }
              />
            </div>

            {/* Features */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-300">Produktmerkmale</label>
                <button
                  onClick={addFeature}
                  className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
                >
                  <Plus size={16} />
                  Hinzufügen
                </button>
              </div>
              <div className="space-y-2">
                {editingProduct.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Merkmal eingeben"
                    />
                    <button
                      onClick={() => removeFeature(index)}
                      className="bg-red-500/20 text-red-400 px-3 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAdding(false);
                }}
                className="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
              >
                <Save size={20} />
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

