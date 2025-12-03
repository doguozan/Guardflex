import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/06e4e24f87a742479886d893331277b8ab950bb5.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src={logo} 
                alt="FliegengitterPro Logo" 
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Ihr vertrauenswürdiger Partner für maßgeschneiderte Fliegengitter-, Sonnenschutz- und Plissee-Lösungen in der Schweiz.
            </p>
            <div className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" className="rounded">
                <rect width="32" height="32" fill="#FF0000"/>
                <rect x="13" y="6" width="6" height="20" fill="white"/>
                <rect x="6" y="13" width="20" height="6" fill="white"/>
              </svg>
              <span className="text-gray-400">Made in Switzerland</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  Produkte
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  Dienstleistungen
                </Link>
              </li>
              <li>
                <Link
                  to="/benefits"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  Vorteile
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  Galerie
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  Geschichte
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg mb-4">Folgen Sie uns</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://wa.me/41000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-[#25D366] rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <MessageCircle size={24} />
              </a>
            </div>
            <div className="space-y-2 text-gray-400">
              <p>📧 info@fliegengitter-pro.ch</p>
              <p>📞 +41 00 000 00 00</p>
              <p>📍 Zürich, Schweiz</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} FliegengitterPro. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6 text-sm">
              <button className="text-gray-400 hover:text-emerald-500 transition-colors">
                Datenschutz
              </button>
              <button className="text-gray-400 hover:text-emerald-500 transition-colors">
                Impressum
              </button>
              <button className="text-gray-400 hover:text-emerald-500 transition-colors">
                AGB
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

