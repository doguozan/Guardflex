import { useSiteContent } from '../context/SiteContentContext';
import { LEGAL_PLACEHOLDERS } from '../data/siteContentDefaults';

export function LegalPage({ kind }) {
  const { site, loading } = useSiteContent();
  const raw = site?.legal?.[kind]?.trim();
  const html = raw || LEGAL_PLACEHOLDERS[kind] || '<p>Inhalt folgt.</p>';

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="site-container max-w-3xl">
        {loading ? (
          <p className="text-gray-600 text-sm">Wird geladen…</p>
        ) : (
          <article
            className="[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_p]:mb-4 text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}
