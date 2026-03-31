/** Fallback-Inhalte, wenn API fehlt oder Felder leer sind */

export const DEFAULT_SITE = {
  siteName: 'GuardFlex',
  hero: {
    headline:
      'Massgefertigte Lösungen für Insektenschutz, Sonnenschutz und Sichtschutz',
    title: '',
    description: '',
    image: '',
    features: [],
  },
  contactInfo: {
    email: 'guard.flex@hotmail.com',
    phone: '+41 765230726',
    address: 'Solothurn, Switzerland',
    whatsapp: '41765230726',
    formTitle: 'Kontaktieren Sie uns',
    formDescription:
      'Haben Sie Fragen oder möchten Sie ein kostenloses Angebot erhalten? Wir sind für Sie da!',
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/guardflex_/',
    facebook: 'https://facebook.com/fliegengitterpro',
    whatsapp: '41765230726',
  },
  cms: {
    services: null,
    benefits: null,
    benefitsSection: null,
    gallery: null,
    history: null,
    branding: null,
  },
  legal: {
    datenschutz: '',
    impressum: '',
    agb: '',
  },
};

export const LEGAL_PLACEHOLDERS = {
  datenschutz: `<h1>Datenschutzerklärung</h1><p>Bitte ergänzen Sie hier Ihre Datenschutzerklärung (Anwalt oder Vorlage für die Schweiz/EU).</p><p>Stand: ${new Date().getFullYear()}</p>`,
  impressum: `<h1>Impressum</h1><p><strong>GuardFlex</strong><br/>Solothurn, Switzerland<br/>E-Mail: guard.flex@hotmail.com<br/>Telefon: +41 765230726</p><p>Bitte vervollständigen Sie Angaben zu Rechtsform, UID-Nummer und weiteren lokalen Pflichtangaben.</p>`,
  agb: `<h1>Allgemeine Geschäftsbedingungen (AGB)</h1><p>Bitte fügen Sie hier Ihre AGB ein.</p>`,
};

export function mergeSitePayload(remote) {
  if (!remote || typeof remote !== 'object') {
    return {
      ...DEFAULT_SITE,
      hero: { ...DEFAULT_SITE.hero },
      contactInfo: { ...DEFAULT_SITE.contactInfo },
      socialMedia: { ...DEFAULT_SITE.socialMedia },
      cms: { ...DEFAULT_SITE.cms },
      legal: { ...DEFAULT_SITE.legal },
    };
  }
  const cms = { ...DEFAULT_SITE.cms, ...(remote.cms || {}) };
  return {
    ...DEFAULT_SITE,
    ...remote,
    hero: { ...DEFAULT_SITE.hero, ...(remote.hero || {}) },
    contactInfo: { ...DEFAULT_SITE.contactInfo, ...(remote.contactInfo || {}) },
    socialMedia: { ...DEFAULT_SITE.socialMedia, ...(remote.socialMedia || {}) },
    cms,
    legal: { ...DEFAULT_SITE.legal, ...(remote.legal || {}) },
  };
}
