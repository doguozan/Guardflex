import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { productCategories } from '../data/products';
import logo from '../assets/Logo Weis3.PNG';

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

  const menuLinkStyle = { fontSize: '16px', fontWeight: 500 };
  const navStyle = { ...menuLinkStyle, gap: '24px' };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
      style={{ overflow: 'visible', backgroundColor: '#ffffff' }}
    >
      <div className="site-container" style={{ overflow: 'visible' }}>
        <div
          className="flex justify-between items-center gap-4 h-20 w-full"
          style={{ overflow: 'visible' }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded py-1"
            aria-label="GuardFlex Startseite"
          >
            <img
              src={logo}
              alt=""
              width={60}
              height={60}
              className="h-[60px] w-[60px] shrink-0 object-contain brightness-0"
              decoding="async"
            />
            <span
              className="text-black font-bold sm:font-extrabold text-lg sm:text-xl md:text-2xl tracking-wide whitespace-nowrap truncate max-w-[40vw] sm:max-w-none"
              style={{
                color: '#000000',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              }}
            >
              GUARD - FLEX
            </span>
          </Link>

          <div className="flex items-center gap-2 shrink-0">
          {/* Desktop Navigation - Almanca Alfabetik Sıralama */}
          <nav className="hidden md:flex items-center" style={navStyle}>
            {/* Diğer Sayfalar - Alfabetik Sıraya Göre */}
            <Link
              to="/services"
              className="text-gray-700 hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Dienstleistungen
            </Link>
            <Link
              to="/gallery"
              className="text-gray-700 hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Galerie
            </Link>
            <Link
              to="/history"
              className="text-gray-700 hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Geschichte
            </Link>
            <Link
              to="/benefits"
              className="text-gray-700 hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Vorteile
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Kontakt
            </Link>
            {/* Produkte - Alt Menü ile */}
            <div className="relative" ref={dropdownRef} style={{ overflow: 'visible', zIndex: 50 }}>
              <button
                onClick={() => setIsProductsSubmenuOpen(!isProductsSubmenuOpen)}
                onMouseEnter={() => setIsProductsSubmenuOpen(true)}
                className="flex items-center gap-1 text-gray-700 hover:text-emerald-500 transition-colors whitespace-nowrap"
              >
                Produkte
                <ChevronDown 
                  size={14} 
                  className={`transition-transform ${isProductsSubmenuOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isProductsSubmenuOpen && (
                <div 
                  className="absolute top-full right-0 mt-2 border border-gray-200 rounded-lg shadow-lg min-w-[200px] py-2"
                  style={{ 
                    zIndex: 100,
                    backgroundColor: '#fff'
                  }}
                  onMouseEnter={() => setIsProductsSubmenuOpen(true)}
                  onMouseLeave={() => setIsProductsSubmenuOpen(false)}
                >
                  <div className="flex flex-col">
                    <Link
                      to="/products"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-500 transition-colors"
                      style={menuLinkStyle}
                      onClick={() => setIsProductsSubmenuOpen(false)}
                    >
                      Alle Produkte
                    </Link>
                    {productCategories.filter(cat => cat !== 'Alle').map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-500 transition-colors"
                        style={menuLinkStyle}
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
            className="md:hidden p-2 text-gray-900"
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label="Menü"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4" style={menuLinkStyle}>
              {/* Mobile Produkte Dropdown */}
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsProductsSubmenuOpen(!isProductsSubmenuOpen);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsProductsSubmenuOpen(!isProductsSubmenuOpen);
                  }}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-emerald-500 active:text-emerald-500 transition-colors text-left py-2"
                  type="button"
                >
                  Produkte
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${isProductsSubmenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isProductsSubmenuOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate('/products');
                        setIsProductsSubmenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate('/products');
                        setIsProductsSubmenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-emerald-500 active:text-emerald-500 transition-colors py-2"
                      style={menuLinkStyle}
                      type="button"
                    >
                      Alle Produkte
                    </button>
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
                        className="block w-full text-left text-gray-600 hover:text-emerald-500 active:text-emerald-500 transition-colors py-2"
                        style={menuLinkStyle}
                        type="button"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/services');
                  setIsMobileMenuOpen(false);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/services');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:text-emerald-500 active:text-emerald-500 transition-colors py-2"
                type="button"
              >
                Dienstleistungen
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/benefits');
                  setIsMobileMenuOpen(false);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/benefits');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:text-emerald-500 active:text-emerald-500 transition-colors py-2"
                type="button"
              >
                Vorteile
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/gallery');
                  setIsMobileMenuOpen(false);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/gallery');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:text-emerald-500 active:text-emerald-500 transition-colors py-2"
                type="button"
              >
                Galerie
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/history');
                  setIsMobileMenuOpen(false);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/history');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:text-emerald-500 active:text-emerald-500 transition-colors py-2"
                type="button"
              >
                Geschichte
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/contact');
                  setIsMobileMenuOpen(false);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/contact');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:text-emerald-500 active:text-emerald-500 transition-colors py-2"
                type="button"
              >
                Kontakt
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

