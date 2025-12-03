import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { productCategories } from '../data/products';
import logo from '../assets/06e4e24f87a742479886d893331277b8ab950bb5.png';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsSubmenuOpen, setIsProductsSubmenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsSubmenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductsSubmenuOpen(false);
      }
    };

    if (isProductsSubmenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProductsSubmenuOpen]);

  const handleCategoryClick = (category) => {
    navigate('/products', { state: { category } });
    setIsProductsSubmenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black shadow-lg shadow-white/5' : 'bg-black/95 backdrop-blur-sm'
      }`}
      style={{ overflow: 'visible' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ overflow: 'visible' }}>
        <div className="flex justify-between items-center h-20" style={{ overflow: 'visible' }}>
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="FliegengitterPro Logo" 
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Almanca Alfabetik Sıralama */}
          <nav className="hidden md:flex items-center gap-4">
            {/* Diğer Sayfalar - Alfabetik Sıraya Göre */}
            <Link
              to="/services"
              className="text-gray-300 hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Dienstleistungen
            </Link>
            <Link
              to="/gallery"
              className="text-gray-300 hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Galerie
            </Link>
            <Link
              to="/history"
              className="text-gray-300 hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Geschichte
            </Link>
            <Link
              to="/benefits"
              className="text-gray-300 hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Vorteile
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Kontakt
            </Link>
            {/* Produkte - Alt Menü ile */}
            <div className="relative" ref={dropdownRef} style={{ overflow: 'visible', zIndex: 50 }}>
              <button
                onClick={() => setIsProductsSubmenuOpen(!isProductsSubmenuOpen)}
                onMouseEnter={() => setIsProductsSubmenuOpen(true)}
                className="flex items-center gap-1 text-gray-300 hover:text-emerald-500 transition-colors whitespace-nowrap"
              >
                Produkte
                <ChevronDown 
                  size={14} 
                  className={`transition-transform ${isProductsSubmenuOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isProductsSubmenuOpen && (
                <div 
                  className="absolute top-full right-0 mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl min-w-[200px] py-2"
                  style={{ 
                    zIndex: 100
                  }}
                  onMouseEnter={() => setIsProductsSubmenuOpen(true)}
                  onMouseLeave={() => setIsProductsSubmenuOpen(false)}
                >
                  <div className="flex flex-col">
                    <Link
                      to="/products"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-emerald-400 transition-colors"
                      onClick={() => setIsProductsSubmenuOpen(false)}
                    >
                      Alle Produkte
                    </Link>
                    {productCategories.filter(cat => cat !== 'Alle').map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-emerald-400 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              {/* Mobile Produkte Dropdown */}
              <div>
                <button
                  onClick={() => setIsProductsSubmenuOpen(!isProductsSubmenuOpen)}
                  className="flex items-center justify-between w-full text-gray-300 hover:text-emerald-500 transition-colors text-left"
                >
                  Produkte
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${isProductsSubmenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isProductsSubmenuOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link
                      to="/products"
                      className="block text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                      onClick={() => {
                        setIsProductsSubmenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Alle Produkte
                    </Link>
                    {productCategories.filter(cat => cat !== 'Alle').map((category) => (
                      <button
                        key={category}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCategoryClick(category);
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCategoryClick(category);
                        }}
                        className="block w-full text-left text-gray-400 hover:text-emerald-400 active:text-emerald-400 transition-colors text-sm py-2"
                        type="button"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/services"
                className="text-gray-300 hover:text-emerald-500 transition-colors text-left"
              >
                Dienstleistungen
              </Link>
              <Link
                to="/benefits"
                className="text-gray-300 hover:text-emerald-500 transition-colors text-left"
              >
                Vorteile
              </Link>
              <Link
                to="/gallery"
                className="text-gray-300 hover:text-emerald-500 transition-colors text-left"
              >
                Galerie
              </Link>
              <Link
                to="/history"
                className="text-gray-300 hover:text-emerald-500 transition-colors text-left"
              >
                Geschichte
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-emerald-500 transition-colors text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

