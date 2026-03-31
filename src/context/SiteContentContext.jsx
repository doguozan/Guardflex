import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../utils/api';
import { mergeSitePayload } from '../data/siteContentDefaults';

const SiteContentContext = createContext({
  site: mergeSitePayload(null),
  loading: true,
  error: null,
  refresh: async () => {},
});

export function SiteContentProvider({ children }) {
  const [site, setSite] = useState(() => mergeSitePayload(null));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await api.getSiteContent();
      setSite(mergeSitePayload(raw));
    } catch (e) {
      setError(e);
      setSite(mergeSitePayload(null));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <SiteContentContext.Provider value={{ site, loading, error, refresh }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
