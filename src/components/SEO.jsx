import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO_CONFIG = {
  '/': {
    title: 'GuardFlex - Fliegengitter, Sonnenschutz & Plissee Lösungen | Schweiz',
    description: 'Maßgeschneiderte Fliegengitter-, Sonnenschutz- und Plissee-Lösungen aus der Schweiz. 100% Qualität garantiert. 2 Jahre Produkt- & Servicegarantie. Kostenloses Angebot!',
    keywords: 'Fliegengitter, Sonnenschutz, Plissee, Fensterschutz, Insektenschutz, Schweiz, GuardFlex, Honeycomb, Rollos, Jalousien',
    ogImage: 'https://guardflex.ch/og-image.png',
    canonical: 'https://guardflex.ch/'
  },
  '/products': {
    title: 'Produkte - Fliegengitter & Sonnenschutz | GuardFlex',
    description: 'Entdecken Sie unsere vielfältigen Produkte: Fliegengitter, Sonnenschutz, Plissee, Honeycomb und mehr. Maßgeschneiderte Lösungen für jedes Fenster.',
    keywords: 'Fliegengitter Produkte, Sonnenschutz Produkte, Plissee, Honeycomb, Rollos, Fensterschutz Produkte',
    ogImage: 'https://guardflex.ch/og-image-products.jpg',
    canonical: 'https://guardflex.ch/products'
  },
  '/services': {
    title: 'Dienstleistungen - Montage & Beratung | GuardFlex',
    description: 'Professionelle Montage, Beratung und Service für Fliegengitter und Sonnenschutz. Kostenlose Beratung vor Ort in der ganzen Schweiz.',
    keywords: 'Fliegengitter Montage, Sonnenschutz Service, Beratung, Installation, Schweiz',
    ogImage: 'https://guardflex.ch/og-image-services.jpg',
    canonical: 'https://guardflex.ch/services'
  },
  '/benefits': {
    title: 'Vorteile - Warum GuardFlex? | Qualität & Garantie',
    description: '100% Qualität garantiert. 2 Jahre Produkt- & Servicegarantie. Preisgarantie. Erfahren Sie, warum GuardFlex die beste Wahl ist.',
    keywords: 'Fliegengitter Vorteile, Qualität, Garantie, Service, Preisgarantie',
    ogImage: 'https://guardflex.ch/og-image-benefits.jpg',
    canonical: 'https://guardflex.ch/benefits'
  },
  '/gallery': {
    title: 'Galerie - Unsere Projekte | GuardFlex',
    description: 'Sehen Sie unsere erfolgreich abgeschlossenen Projekte. Fliegengitter, Sonnenschutz und Plissee Installationen in der ganzen Schweiz.',
    keywords: 'Fliegengitter Projekte, Referenzen, Galerie, Installationen, Beispiele',
    ogImage: 'https://guardflex.ch/og-image-gallery.jpg',
    canonical: 'https://guardflex.ch/gallery'
  },
  '/history': {
    title: 'Über Uns - Unsere Geschichte | GuardFlex',
    description: 'Erfahren Sie mehr über GuardFlex, unsere Geschichte, unsere Werte und unser Engagement für Qualität und Kundenzufriedenheit.',
    keywords: 'Über GuardFlex, Geschichte, Unternehmen, Werte, Qualität',
    ogImage: 'https://guardflex.ch/og-image-history.jpg',
    canonical: 'https://guardflex.ch/history'
  },
  '/contact': {
    title: 'Kontakt - Kostenloses Angebot | GuardFlex',
    description: 'Kontaktieren Sie uns für ein kostenloses Angebot. Kostenlose Beratung vor Ort. WhatsApp, E-Mail oder Telefon - wir sind für Sie da!',
    keywords: 'Kontakt, Angebot, Beratung, WhatsApp, E-Mail, Telefon',
    ogImage: 'https://guardflex.ch/og-image-contact.jpg',
    canonical: 'https://guardflex.ch/contact'
  }
};

export function SEO() {
  const location = useLocation();
  const seoData = SEO_CONFIG[location.pathname] || SEO_CONFIG['/'];

  useEffect(() => {
    // Update document title
    document.title = seoData.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seoData.keywords);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seoData.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', seoData.description);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', seoData.ogImage);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', seoData.canonical);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', seoData.title);
    }

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', seoData.description);
    }

    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', seoData.ogImage);
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seoData.canonical);

    // Add structured data (JSON-LD)
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredData);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'GuardFlex',
      url: 'https://guardflex.ch',
      logo: 'https://guardflex.ch/logo.png',
      description: seoData.description,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CH'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'German'
      },
      sameAs: [
        'https://www.instagram.com/guardflex',
        'https://www.facebook.com/guardflex'
      ]
    };

    if (location.pathname === '/') {
      jsonLd['@type'] = 'WebSite';
      jsonLd.potentialAction = {
        '@type': 'SearchAction',
        target: 'https://guardflex.ch/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      };
    } else if (location.pathname === '/products') {
      jsonLd['@type'] = 'Product';
      jsonLd.name = 'Fliegengitter & Sonnenschutz';
      jsonLd.description = seoData.description;
    } else if (location.pathname === '/contact') {
      jsonLd['@type'] = 'ContactPage';
    }

    structuredData.textContent = JSON.stringify(jsonLd);
  }, [location.pathname, seoData]);

  return null;
}

