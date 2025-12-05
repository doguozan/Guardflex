import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products, productCategories } from "../data/products";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { getProductImage } from "../utils/productImages";

export function ProductsPage() {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Header'dan gelen kategoriyi kontrol et
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  // Filtrelenmiş ürünleri getir
  const filteredProducts = selectedCategory === "Alle" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="pt-20 min-h-screen bg-black">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-gray-900 to-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-white mb-4">Unsere Produkte</h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Entdecken Sie unsere hochwertigen Fliegengitter-,
              Sonnenschutz- und Plissee-Lösungen.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Section - Minimalize ve Sağa Yaslı */}
          <div className="mb-8 flex justify-end">
            <div className="relative">
              {/* Filter Header - Tıklanabilir */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg hover:border-emerald-500 transition-all"
              >
                <Filter className="text-emerald-400" size={18} />
                <span className="text-white text-sm">
                  {selectedCategory !== "Alle" ? selectedCategory : "Filter"}
                </span>
                {isFilterOpen ? (
                  <ChevronUp className="text-emerald-400" size={16} />
                ) : (
                  <ChevronDown className="text-emerald-400" size={16} />
                )}
              </button>

              {/* Filter Content - Açılır/Kapanır - Dropdown */}
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-xl z-10 min-w-[200px] animate-in slide-in-from-top-2 duration-200">
                  <div className="flex flex-col gap-2">
                    {productCategories.map((category) => {
                      const categoryLabels = {
                        'Alle': 'Alle',
                        'Insektenschutz': 'Insektenschutz',
                        'Sonnenschutz': 'Sonnenschutz',
                        'Plissee': 'Plissee',
                        'Sonnenschutz': 'Sonnenschutz'
                      };
                      
                      return (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsFilterOpen(false);
                          }}
                          className={`px-4 py-2 rounded-lg transition-all text-sm text-left ${
                            selectedCategory === category
                              ? "bg-emerald-500 text-white"
                              : "text-gray-300 hover:bg-gray-800 hover:text-emerald-400"
                          }`}
                        >
                          {categoryLabels[category] || category}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:border-emerald-500 transition-all group"
              >
                <div className="aspect-square overflow-hidden bg-gray-800">
                  <img
                    src={getProductImage(product.image)}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <div className="text-emerald-400 text-sm mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-white mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <button className="text-emerald-500 hover:text-emerald-400 transition-colors">
                    Details anzeigen →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
              <h2 className="text-white text-lg sm:text-xl pr-4">
                {selectedProduct.name}
              </h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors flex-shrink-0"
              >
                <X className="text-white" size={24} />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Product Image */}
                <div className="bg-gray-800 rounded-lg overflow-hidden aspect-square">
                  <img
                    src={getProductImage(selectedProduct.image)}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Product Details */}
                <div>
                  <div className="inline-block bg-emerald-500/20 text-emerald-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 text-sm sm:text-base">
                    {selectedProduct.category}
                  </div>

                  <p className="text-gray-300 mb-6 text-sm sm:text-base">
                    {selectedProduct.description}
                  </p>

                  <h3 className="text-white mb-4 text-lg sm:text-xl">
                    Produktmerkmale
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {selectedProduct.features
                      .filter(feature => !feature.toLowerCase().includes('made in switzerland') && !feature.toLowerCase().includes('switzerland'))
                      .map(
                        (feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300">
                              {feature}
                            </span>
                          </li>
                        ),
                      )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

