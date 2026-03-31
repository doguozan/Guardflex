import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo Weis3.PNG';
import { useSiteContent } from '../context/SiteContentContext';

function digitsOnly(s) {
  return String(s || '').replace(/\D/g, '');
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { site } = useSiteContent();
  const sm = site.socialMedia || {};
  const ci = site.contactInfo || {};
  const waDigits = digitsOnly(ci.whatsapp || sm.whatsapp || '41765230726');

  return (
    <footer className="border-t border-gray-800" style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className="site-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img
                src={logo}
                alt="GuardFlex Logo"
                width={60}
                height={60}
                className="h-[60px] w-[60px] shrink-0 object-contain brightness-0 invert opacity-95"
                decoding="async"
              />
            </div>
            <p className="mb-4" style={{ color: '#fff' }}>
              Ihr vertrauenswürdiger Partner für massgeschneiderte Fliegengitter-, Sonnenschutz- und
              Plissee-Lösungen in der Schweiz.
            </p>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ color: '#fff' }}>
              Schnellzugriff
            </h3>
            <ul className="space-y-2" style={{ fontSize: '14px' }}>
              <li>
                <Link
                  to="/products"
                  className="hover:text-emerald-400 transition-colors"
                  style={{ color: '#fff' }}
                >
                  Produkte
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-emerald-400 transition-colors"
                  style={{ color: '#fff' }}
                >
                  Dienstleistungen
                </Link>
              </li>
              <li>
                <Link
                  to="/benefits"
                  className="hover:text-emerald-400 transition-colors"
                  style={{ color: '#fff' }}
                >
                  Vorteile
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-emerald-400 transition-colors"
                  style={{ color: '#fff' }}
                >
                  Galerie
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="hover:text-emerald-400 transition-colors"
                  style={{ color: '#fff' }}
                >
                  Geschichte
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-emerald-400 transition-colors"
                  style={{ color: '#fff' }}
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ color: '#fff' }}>
              Folgen Sie uns
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href={sm.instagram || 'https://www.instagram.com/guardflex_/'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-700 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram size={22} strokeWidth={1.5} />
              </a>
              <a
                href={sm.facebook || 'https://www.facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-700 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Facebook size={22} />
              </a>
              <a
                href={`https://wa.me/${waDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-700 hover:bg-[#25D366] text-white rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <MessageCircle size={22} strokeWidth={1.5} />
              </a>
            </div>
            <div className="space-y-2 flex flex-col gap-2" style={{ color: '#fff' }}>
              <p className="flex items-center gap-2">
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}
                >
                  mail
                </span>
                {ci.email || 'guard.flex@hotmail.com'}
              </p>
              <p className="flex items-center gap-2">
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}
                >
                  call
                </span>
                {ci.phone || '+41 765230726'}
              </p>
              <p className="flex items-center gap-2">
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
                {ci.address || 'Solothurn, Switzerland'}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm justify-center md:justify-start">
              <Link
                to="/datenschutz"
                className="hover:text-emerald-400 transition-colors"
                style={{ color: '#fff' }}
              >
                Datenschutz
              </Link>
              <Link
                to="/impressum"
                className="hover:text-emerald-400 transition-colors"
                style={{ color: '#fff' }}
              >
                Impressum
              </Link>
              <Link
                to="/agb"
                className="hover:text-emerald-400 transition-colors"
                style={{ color: '#fff' }}
              >
                AGB
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              © {currentYear} {site.siteName || 'GuardFlex'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
